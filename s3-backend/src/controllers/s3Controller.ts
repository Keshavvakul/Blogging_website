import { Request, Response } from "express";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface FileData {
  fileName: string;
  contentType: string;
}

const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});

export const generatePutUrl = async (req: Request, res: Response) => {
  const { filesData } = req.body;
  console.log("logging file data", filesData);

  // Checking is fileData is array or not
  if (!Array.isArray(filesData)) {
    return res.status(400).json({ message: "Invalid file data" });
  }

  try {
    const preSignedUrls = await Promise.all(
      filesData.map(async ({ fileName, contentType }: FileData) => {
        const command = new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          ContentType: contentType,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 500 });
        return url;
      }),
    );

    res.status(200).json({ preSignedUrls });
  } catch (e) {
    console.log("Error generating url", e);
    res.status(500).json({ message: "Error generating presigned URLs" });
  }
};

export const generateGetUrl = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { objectKey } = req.body;
  console.log(objectKey);

  // Checking if the objectKey is array or not
  if (!Array.isArray(objectKey)) {
    return res.status(400).json({ message: "Invalid file data" });
  }

  try {
    const getSignedUrls = await Promise.all(
      objectKey.map(async (key) => {
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: key,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
        return url;
      }),
    );
    res.status(200).json({ getSignedUrls });
  } catch (e) {
    console.log("Error in generating get url", e);
    res.json({ message: "Error generating get url" });
  }
};
