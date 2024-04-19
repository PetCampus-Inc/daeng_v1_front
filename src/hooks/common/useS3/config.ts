import { S3ClientConfig } from "@aws-sdk/client-s3";

const awsRegion = process.env.REACT_APP_AWS_REGION;
const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID as string;
const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string;
export const bucketName = process.env.REACT_APP_AWS_BUCKET;

export const s3ClientConfig: S3ClientConfig = {
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey
  }
};
