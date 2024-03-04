import { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

interface S3ImageProps {
  s3Client: S3Client;
  bucketName: string;
  objectKey: string;
}

const useS3Image = ({ s3Client, bucketName, objectKey }: S3ImageProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: objectKey
        });
        const response = await s3Client.send(command);
        const data = await response.Body?.transformToByteArray();
        const blob = new Blob([data!], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);

        return () => URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Image fetch error:", err);
        setError("Failed to load image.");
      }
    };

    fetchImage();
  }, [bucketName, objectKey]);

  return { imageUrl, error };
};

export default useS3Image;
