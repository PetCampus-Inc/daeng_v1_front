import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand
} from "@aws-sdk/client-s3";
import { useCallback, useMemo } from "react";
import { v1 as uuidv1 } from "uuid";

import { s3ClientConfig, bucketName } from "./config";

import type { MutateOptions, UploadToS3Function } from "./types";

interface UploadToS3Props {
  accept?: string[] | string;
  files: FileList | null;
  path: string;
}

function useMultipartS3Upload<
  TData = string[],
  TError = Error,
  TVariables extends UploadToS3Props = UploadToS3Props
>(): {
  uploadToS3: UploadToS3Function<TData, TError, TVariables>;
} {
  const s3Client = useMemo(() => new S3Client(s3ClientConfig), []);

  const uploadToS3 = useCallback(
    async (variables: TVariables, options?: MutateOptions<TData, TError, TVariables>) => {
      const { files, path } = variables;
      if (!files || files.length === 0) {
        throw new Error("No files to upload.");
      }

      const uploads = Array.from(files).map(async (file) => {
        const key = `${path}/${uuidv1().replace(/-/g, "")}.${file.type.split("/")[1]}`;
        let UploadId = undefined;

        try {
          const createCommand = new CreateMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: file.type
          });

          const createResult = await s3Client.send(createCommand);
          UploadId = createResult.UploadId;

          const partSize = 5 * 1024 * 1024; // 5 MB per part
          const parts = [];
          for (let i = 0; i < file.size; i += partSize) {
            const partNumber = Math.floor(i / partSize) + 1;
            const part = file.slice(i, i + partSize);

            const uploadPartCommand = new UploadPartCommand({
              Bucket: bucketName,
              Key: key,
              PartNumber: partNumber,
              UploadId,
              Body: part
            });

            const partResult = await s3Client.send(uploadPartCommand);
            parts.push({ ETag: partResult.ETag, PartNumber: partNumber });
          }

          const completeCommand = new CompleteMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            UploadId,
            MultipartUpload: { Parts: parts }
          });

          await s3Client.send(completeCommand);
          return `https://${bucketName}.s3.amazonaws.com/${key}`;
        } catch (error) {
          if (UploadId) {
            const abortCommand = new AbortMultipartUploadCommand({
              Bucket: bucketName,
              Key: key,
              UploadId
            });
            await s3Client.send(abortCommand);
          }
          throw error; // Rethrow to handle in the upper catch block
        }
      });

      try {
        const urls = await Promise.all(uploads);
        options?.onSuccess?.(urls as TData, variables);
        options?.onSettled?.(urls as TData, null, variables);
      } catch (error) {
        options?.onError?.(error as TError, variables);
        options?.onSettled?.(undefined, error as TError, variables);
      }
    },
    [s3Client]
  );

  return { uploadToS3 };
}

export { useMultipartS3Upload };
