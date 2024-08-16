import axios from "axios";
import { BACKEND_URL } from "../config";

export const publishBlog = async (title: string, content: string) => {
  try {
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
