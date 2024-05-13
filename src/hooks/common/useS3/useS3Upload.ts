import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useMemo, useCallback } from "react";
import { v1 as uuidv1 } from "uuid";

import { s3ClientConfig, bucketName } from "./config";

interface UploadToS3Props {
  accept?: string[] | string;
  files: FileList | null;
  path: string;
}

interface MutateOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

interface UploadToS3Function<TData, TError, TVariables> {
  (
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables>
  ): Promise<TData | void>;
}

function useS3Upload<
  TData = string[],
  TError = Error,
  TVariables extends UploadToS3Props = UploadToS3Props
>(): {
  uploadToS3: UploadToS3Function<TData, TError, TVariables>;
} {
  const s3Client = useMemo(() => new S3Client(s3ClientConfig), []);
  const uploadToS3 = useCallback(
    async (
      variables: TVariables,
      options?: MutateOptions<TData, TError, TVariables>
    ): Promise<TData | void> => {
      if (!variables.files) {
        const error = new Error("No files to upload.") as TError;
        if (options?.onError) {
          options.onError(error, variables);
          return;
        }
        throw error;
      }

      const acceptedTypes = Array.isArray(variables.accept) ? variables.accept : [variables.accept];
      const fileTypeRegex = acceptedTypes
        .filter((type) => type !== undefined)
        .map((type) => type && new RegExp(type.replace("*", ".*")));

      try {
        const urls: string[] = await Promise.all(
          Array.from(variables.files).map(async (file) => {
            if (!fileTypeRegex.some((regex) => regex && regex.test(file.type))) {
              throw new Error(`Unsupported file type: ${file.type}`);
            }
            const objectKey = `${variables.path}/${uuidv1().replace(/-/g, "")}.${file.type.split("/")[1]}`;
            const command = new PutObjectCommand({
              Bucket: bucketName,
              Key: objectKey,
              Body: file,
              ContentType: file.type
            });
            await s3Client.send(command);
            return `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
          })
        );

        options?.onSuccess?.(urls as TData, variables);
        options?.onSettled?.(urls as TData, null, variables);
        return urls as TData;
      } catch (err) {
        const error = err instanceof Error ? err : (new Error(String(err)) as TError);
        if (options?.onError) {
          options.onError(error as TError, variables);
          options?.onSettled?.(undefined, error as TError, variables);
          return;
        }
        options?.onSettled?.(undefined, error as TError, variables);
        throw error;
      }
    },
    [s3Client]
  );

  return { uploadToS3 };
}

export { useS3Upload };
