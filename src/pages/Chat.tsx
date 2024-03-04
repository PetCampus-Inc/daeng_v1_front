import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";
import { useState, useEffect } from "react";
import { S3Client, GetObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";

const Chat = () => {
  const [imageUrl, setImageUrl] = useState("");

  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID as string;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string;

  const s3ClientConfig: S3ClientConfig = {
    region: awsRegion,
    credentials: {
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey
    }
  };

  const s3Client = new S3Client(s3ClientConfig);

  const bucketName = "pet-campus-s3";
  const objectKey = "test_images/test-pet.png";

  useEffect(() => {
    const fetchImage = async () => {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey
      });

      try {
        const response = await s3Client.send(command);
        const { Body } = response || {};
        if (Body instanceof ReadableStream) {
          const blob = await new Response(Body).blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Image fetch error:", error);
      }
    };

    fetchImage();
  }, [bucketName, objectKey]);

  return (
    <>
      <div>Chat</div>
      <div>
        {imageUrl && <img src={imageUrl} alt="S3 content" />}
        {imageUrl && (
          <a href={imageUrl} download={`${objectKey}.jpg`}>
            Download
          </a>
        )}
      </div>
      <NavBar type="admin" attendance={PATH.ADMIN_CHAT} />
    </>
  );
};

export default Chat;
