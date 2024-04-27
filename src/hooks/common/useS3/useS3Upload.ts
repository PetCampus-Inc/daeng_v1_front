import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useMemo, useState, useCallback } from "react";
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

function useS3Upload<
  TData = string[],
  TError = Error,
  TVariables extends UploadToS3Props = UploadToS3Props
>(): {
  uploadToS3: (
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables>
  ) => Promise<TData | { error: TError }>;
  isLoading: boolean;
  data: TData | null;
  error: TError | null;
} {
  const s3Client = useMemo(() => new S3Client(s3ClientConfig), []);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const uploadToS3 = useCallback(
    async (
      variables: TVariables,
      options?: MutateOptions<TData, TError, TVariables>
    ): Promise<TData | { error: TError }> => {
      setIsLoading(true);
      setError(null);

      if (!variables.files) {
        const error = new Error("No files to upload.");
        setError(error as TError);
        options?.onError?.(error as TError, variables);
        setIsLoading(false);
        return { error: error as TError };
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

        setData(urls as TData);
        options?.onSettled?.(urls as TData, null, variables);
        return urls as TData;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error as TError);
        options?.onError?.(error as TError, variables);
        options?.onSettled?.(undefined, err as TError, variables);
        return { error: error as TError };
      } finally {
        setIsLoading(false);
      }
    },
    [s3Client]
  );

  return { uploadToS3, isLoading, data, error };
}

export { useS3Upload };
