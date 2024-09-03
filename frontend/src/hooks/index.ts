import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { fetchGetPresignedUrls } from "../utility/getBulkPresignedUrls";

export interface BlogsType {
  id: string;
  title: string;
  content: string;
  blogImagePath?: string[];
  presignedImageUrl: any;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<BlogsType[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/:${id}`, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        setBlog(response.data.getBlogs);
      })
      .catch((e) => {
        alert("Error passing inputs please check");
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogsType[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        return fetchGetPresignedUrls(response.data.bulkBlogs);
      })
      .then((blogWithPresignedUrl) => {
        if (blogWithPresignedUrl) {
          console.log("blogWithPresignedUrl", blogWithPresignedUrl);
          setBlogs(blogWithPresignedUrl);
        } else {
          setBlogs([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
