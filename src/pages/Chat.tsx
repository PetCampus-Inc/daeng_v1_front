import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import useS3Image from "hooks/common/useS3Image";

const Chat = () => {
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

  const { imageUrl } = useS3Image({ s3Client, bucketName, objectKey });

  return (
    <>
      <div>Chat</div>
      {imageUrl && <img src={imageUrl} alt="S3 content" />}
      {imageUrl && (
        <a href={imageUrl} download={`${objectKey}.jpg`}>
          다운로드
        </a>
      )}
    </>
  );
};

export default Chat;
