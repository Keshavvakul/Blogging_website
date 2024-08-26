import axios from "axios";
import { BACKEND_URL, S3BACKEND_URL } from "../config";
import { v4 as uuidv4 } from "uuid";
import { base64ToBlob } from "../utility/base64Utility";

const fileNameArray: string[] = [];

export const publishBlog = async (
  title: string,
  content: string,
  imageArray: string[],
) => {
  try {
    console.log("inside publish blog");
    console.log(imageArray);
    console.log(imageArray.length);

    if (imageArray.length !== 0) {
      const fileData = imageArray.map((image, index) => {
        if (typeof image !== "string") {
          throw new Error(`Invalid base64 image at index at index ${index}`);
        }

        const contentType = image.split(";")[0].split(":")[1];
        const fileName = `project-uploads/blog-images/image-${uuidv4()}.${contentType.split("/")[1]}`;

        console.log("file name is ", fileName);
        console.log("content type is ", contentType);

        fileNameArray.push(fileName);

        return { contentType, fileName };
      });

      console.log("fileNameArray is: ", fileNameArray);

      const presignedPutUrlsResponse = await axios.post(
        `${S3BACKEND_URL}/api/v1/s3/presigned-url/put`,
        {
          filesData: fileData,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
        },
      );
      const { preSignedUrls } = presignedPutUrlsResponse.data;
      console.log("presigned urls are: ", preSignedUrls);

      for (let i = 0; i < imageArray.length; i++) {
        const base64Image = imageArray[i];
        const url = preSignedUrls[i];
        console.log("url and contentType are", url, fileData[i].contentType);

        await axios.put(
          url,
          base64ToBlob(base64Image, fileData[i].contentType),
        );

        console.log("image posted successfully");
      }
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
