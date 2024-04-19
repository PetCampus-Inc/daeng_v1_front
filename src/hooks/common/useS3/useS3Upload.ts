import { useState, useMemo } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v1 as uuidv1 } from "uuid";
import { s3ClientConfig, bucketName } from "./config";
import type { TResult } from "./types";

interface uploadToS3Props {
  accept?: string[] | string;
  files: FileList | null;
  path: string;
}

const useS3Upload = () => {
  const s3Client = useMemo(() => new S3Client(s3ClientConfig), []);

  const [uploadResults, setUploadResults] = useState<TResult[]>([]);

  const uploadToS3 = ({ accept = "image/*", files, path }: uploadToS3Props) => {
    if (!files) return;

    Array.from(files).forEach(async (file) => {
      if (accept.includes(file.type)) {
        const objectKey = `${path}/${uuidv1().replace("-", "")}.${file.type.split("/")[1]}`;

        try {
          const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            Body: file,
            ContentType: file.type
          });
          await s3Client.send(command);
          const url = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
          setUploadResults((prev) => [...prev, { url, error: null }]);
        } catch (err) {
          console.error("Upload error:", err);
          setUploadResults((prev) => [...prev, { url: "", error: "Failed to upload file." }]);
        }
      }
    });
  };

  return { uploadToS3, uploadResults };
};

export default useS3Upload;
