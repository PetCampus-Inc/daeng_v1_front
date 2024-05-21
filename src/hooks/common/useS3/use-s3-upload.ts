import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { XhrHttpHandler } from "@aws-sdk/xhr-http-handler";
import { useCallback, useMemo, useState } from "react";
import { v1 as uuidv1 } from "uuid";

import { s3ClientConfig, bucketName } from "./config";

import type { MutateOptions, UploadToS3Function } from "./types";

interface UploadToS3Props {
  accept?: string[] | string;
  files: FileList | null;
  path: string;
}

interface UseS3UploadReturn<TData, TError, TVariables> {
  uploadToS3: UploadToS3Function<TData, TError, TVariables>;
  progress: number;
  uploaded: number;
  isLoading: boolean;
}

export function useS3Upload<
  TData = string[],
  TError = Error,
  TVariables extends UploadToS3Props = UploadToS3Props
>(): UseS3UploadReturn<TData, TError, TVariables> {
  const s3Client = useMemo(
    () => new S3Client({ requestHandler: new XhrHttpHandler({}), ...s3ClientConfig }),
    []
  );
  const [progress, setProgress] = useState(0); // 업로드 진행률
  const [uploaded, setUploaded] = useState(0); // 파일 업로드 수
  const [isLoading, setIsLoading] = useState(false); // 업로드 진행 중 상태

  const uploadToS3 = useCallback(
    async (variables: TVariables, options?: MutateOptions<TData, TError, TVariables>) => {
      const { files, path } = variables;
      if (!files || files.length === 0) {
        throw new Error("No files to upload.");
      }

      const urls: string[] = [];
      setUploaded(0);
      setIsLoading(true);

      for (const file of Array.from(files)) {
        setProgress(0);

        const key = `${path}/${uuidv1().replace(/-/g, "")}.${file.type.split("/")[1]}`;

        const uploader = new Upload({
          client: s3Client,
          params: {
            Bucket: bucketName,
            Key: key,
            Body: file
          },
          partSize: 5 * 1024 * 1024, // 5 MB
          leavePartsOnError: false // 실패 시 파트 삭제 여부
        });

        uploader.on("httpUploadProgress", ({ loaded = 0, total = 0 }) => {
          const currentProgress = Math.floor((loaded / total) * 100);
          setProgress(currentProgress);
        });

        try {
          await uploader.done();
          urls.push(`https://${bucketName}.s3.amazonaws.com/${key}`);
          setUploaded((prev) => prev + 1);
          setIsLoading(false);
        } catch (error) {
          if (options?.onError) {
            options.onError(error as TError, variables);
          } else {
            throw error;
          }
        }
      }

      if (urls.length > 0) {
        options?.onSuccess?.(urls as TData, variables);
        options?.onSettled?.(urls as TData, null, variables);
      }
    },
    [s3Client]
  );

  return { uploadToS3, progress, uploaded, isLoading };
}
