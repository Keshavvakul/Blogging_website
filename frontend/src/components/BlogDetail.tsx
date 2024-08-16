import { BlogsType } from "../hooks";
import parse from "html-react-parser";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const BlogDetail = ({ blog }: { blog: BlogsType }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const deleteBlogHandler = async () => {
    console.log("debugger 1");
    console.log(id);
    try {
      await axios
        .put(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          },
        )
        .then(() => {
          navigate("/allBlogs");
        });
    } catch (e) {
      alert("Problem deleting blog");
      console.log(e);
    }
  };
  return (
    <div className="px-16">
      <div className="grid grid-cols-12 w-full pt-10 max-w-screen-3xl">
        <div className="col-span-8 px-32">
          <div className="text-4xl font-extrabold">{blog.title}</div>
          <div className="pt-2 text-slate-500">Posted on August 24,2023</div>
          <div className="pt-2 text-lg text-slate-900 font-normal">
            {parse(blog.content)}
          </div>
        </div>
        <div className="">
          <div className="px-20 font-bold col-span-8 text-slate-600">
            Author
          </div>
          <div className=" px-32 font-bold text-2xl">{blog.author.name}</div>
          <div className="grid col-span-12 w-64 pl-32 pt-6">
            <Button buttonType="delete" onclick={deleteBlogHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
