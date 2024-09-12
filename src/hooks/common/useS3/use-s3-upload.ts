import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { XhrHttpHandler } from "@aws-sdk/xhr-http-handler";
import { useCallback, useMemo, useState } from "react";
import { v1 as uuidv1 } from "uuid";

import { s3ClientConfig, bucketName } from "./config";

interface UploadToS3Props {
  /** 업로드할 파일의 확장자 제한 */
  accept?: string[] | string;
  /** 업로드할 파일리스트 */
  files: FileList | null;
  /** s3 버킷 경로 */
  path: string;
}

export interface UploadOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

export interface UploadToS3Function<TData, TError, TVariables> {
  (variables: TVariables, options?: UploadOptions<TData, TError, TVariables>): Promise<TData>;
}

interface UseS3UploadReturn<TData, TError, TVariables> {
  /** s3로 업로드 요청하는 함수 */
  uploadToS3: UploadToS3Function<TData, TError, TVariables>;
  /** 현재 진행률 */
  progress: number;
  /** 업로드된 파일 수 */
  uploaded: number;
  /** 업로드 중인지 여부 */
  isLoading: boolean;
}

/**
 * S3에 파일을 업로드하기 위한 훅입니다.
 */
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
    async (
      variables: TVariables,
      options?: UploadOptions<TData, TError, TVariables>
    ): Promise<TData> => {
      const { files, path } = variables;
      if (!files || files.length === 0) {
        throw new Error("업로드할 파일이 없습니다.");
      }

      const results: string[] = [];
      setUploaded(0);
      setIsLoading(true);

      try {
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
            const url = `https://${bucketName}.s3.amazonaws.com/${key}`;
            results.push(url);
            setUploaded((prev) => prev + 1);
          } catch (error) {
            if (options?.onError) {
              options.onError(error as TError, variables);
            }
          }
        }
      } finally {
        setIsLoading(false);
      }

      if (results.length > 0) {
        options?.onSuccess?.(results as TData, variables);
      }
      options?.onSettled?.(results as TData, null, variables);

      return results as TData;
    },
    [s3Client]
  );

  return { uploadToS3, progress, uploaded, isLoading };
}
