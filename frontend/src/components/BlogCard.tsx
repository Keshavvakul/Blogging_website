import React from "react";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  image: string;
  published: string;
  id: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  authorName,
  published,
  title,
  content,
  image,
  id,
}) => {
  return (
    <Link to={`/blog/${id}`}>
      <>
        <div className="justify-center flex p-4">
          <div
            className={`${image ? "cursor-pointer pl-96 -mr-36" : "cursor-pointer w-screen max-w-screen-md"}`}
          >
            <div className="flex flex-row">
              <div className="py-1">
                <Avatar authorName={authorName} />
              </div>
              <div className="pl-2 py-2 font-medium">{authorName}</div>
              <div className="pl-1.5 py-1">{dot()}</div>
              <div className="pl-1.5 py-2 text-slate-600">{published}</div>
            </div>
            <div className="text-2xl font-extrabold pt-1 pb-4 sm:pb-0">
              {title}
            </div>
            <div className="text-xl text-gray-600 font-semibold">
              {content.length > 100
                ? htmlToText(content.slice(0, 100)) + "..."
                : htmlToText(content)}
            </div>
            <div className="text-slate-500 pt-8">{`${Math.ceil(content.length / 100)} min read`}</div>
            <hr className="h-px mt-16 w-screen max-w-screen-lg bg-slate-200 border-0 dark:bg-slate-200" />
          </div>
          <div className={`${image ? "-ml-10" : "hidden"}`}>
            {image && <img src={image} alt="" width="300" height="300" />}
          </div>
        </div>
      </>
    </Link>
  );
};

function dot() {
  return (
    <div
      className="relative inline-flex items-center justify-center w-1 h-1
      overflow-hidden bg-slate-400 rounded-full dark:bg-slate-400"
    ></div>
  );
}
