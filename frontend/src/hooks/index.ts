import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface BlogsType {
  id: any;
  title: any;
  content: any;
  author: {
    name: any;
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
        setBlogs(response.data.bulkBlogs);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};
