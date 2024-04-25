import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { useState, useEffect, useMemo } from "react";

import { s3ClientConfig, bucketName } from "./config";

import type { TResult } from "./types";

interface S3FolderProps {
  folderPath: string;
}

// TODO: 사진 받아오는 방식 결정 필요함. 1. 백엔드에서 direct url을 주는 방식, 2. 폴더경로를 주는 방식
const useS3Download = ({ folderPath }: S3FolderProps) => {
  const [data, setData] = useState<TResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const s3Client = useMemo(() => new S3Client(s3ClientConfig), []);

  useEffect(() => {
    setIsLoading(true);
    const fetchFiles = async () => {
      try {
        // 폴더 내의 모든 객체 목록을 가져옵니다.
        const listCommand = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: folderPath // 폴더 경로 지정
        });
        const listResponse = await s3Client.send(listCommand);
        const files = listResponse.Contents;

        if (!files) throw new Error("No files found in the folder.");

        const urls = await Promise.all(
          files.map(async (file) => {
            try {
              const getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: file.Key ?? "" // FIXME: Key is possibly undefined 일때 더 나은 핸들링 필요!
              });
              const response = await s3Client.send(getObjectCommand);
              const data = await response.Body?.transformToByteArray();
              const blob = new Blob([data!], { type: file.Key?.split(".").pop() });
              const url = URL.createObjectURL(blob);
              return { url, error: null };
            } catch (err) {
              console.error("File download error:", err);
              return { url: "", error: "Failed to load file." };
            }
          })
        );

        setData(urls);
      } catch (err) {
        console.error("Folder fetch error:", err);
        setData([{ url: "", error: "Failed to load folder contents." }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [folderPath]);

  return { data, isLoading };
};

export default useS3Download;
