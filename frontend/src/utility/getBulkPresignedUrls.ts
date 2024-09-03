import { S3BACKEND_URL } from "../config";
import axios from "axios";
import { BlogsType } from "../hooks";

export const fetchGetPresignedUrls = async (blogs: BlogsType[]) => {
  const imageKeys = blogs
    .filter((blog) => blog.blogImagePath && blog.blogImagePath.length > 0)
    .map((blog) => blog.blogImagePath![0]);

  if (imageKeys.length == 0) {
    return blogs;
  }

  try {
    const url = await axios.post(
      `${S3BACKEND_URL}/api/v1/s3/presigned-url/get`,
      {
        objectKey: imageKeys,
      },
      {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      },
    );

    const preSignedUrls = url.data.getSignedUrls;

    const updatedBlog = blogs.map((blog) => {
      if (blog.blogImagePath && blog.blogImagePath.length > 0) {
        const presignedUrl = preSignedUrls.shift();
        return {
          ...blog,
          presignedImageUrl: presignedUrl,
        };
      }
      return blog;
    });

    console.log(updatedBlog);
    return updatedBlog;
  } catch (e) {
    console.log(e);
  }
};
