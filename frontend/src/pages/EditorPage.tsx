import ReactQuill, { Quill } from "react-quill";
import { Appbar } from "../components";
import React, { memo, useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../styles/styles.css";
import "react-quill/dist/quill.bubble.css";
import { publishBlog } from "../services/api";
import { useNavigate } from "react-router-dom";


interface ImageHandlerTypes {
  quillRef: React.RefObject<ReactQuill>;
  setImagePreviewArray: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ImagePreviewProps {
  imagePreviewArray: string[];
}

const imageHandler = ({
  quillRef,
  setImagePreviewArray,
}: ImageHandlerTypes) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  console.log("input in image handler ",input);

  input.onchange = async () => {
    const file = input.files ? input.files[0] : null;
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      console.log("Reader in image handler : ", reader);

      reader.onload = (e) => {
        console.log("reader.onload called inside image handler");
        const imageResult = e.target?.result as string;

        if (imageResult) {
          setImagePreviewArray((prevArray) => [...prevArray, imageResult]);
        }

        console.log("image result is: ,", imageResult);
        if (imageResult && quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          if (range) {
            const span = document.createElement("span");
            span.style.display = "none";
            quill.insertEmbed(range.index, "block", span);
          }
        }
      };
    }
  };
};

Quill.register("modules/handlers", imageHandler);

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  ["image"],
  ["clean"],
  ["link"],
];

const ImagePreview = memo(({ imagePreviewArray }: ImagePreviewProps) => {
  return (
    <>
      <div className="flex justify-center pr-96">
        <div className="flex justify-center flex-wrap gap-4">
          {/*console.log("image preview array is: ", imagePreviewArray)*/}
          {imagePreviewArray.map((preview, index) => (
            <img
              className="max-w-3xl "
              key={index}
              src={preview}
              alt={`Image Preview ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
});
const Editor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imagePreviewArray, setImagePreviewArray] = useState<string[]>([]);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => imageHandler({ quillRef, setImagePreviewArray }),
        },
      },
    }),
    [],
  );

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handlePublish = async () => {
    try {
      const result = await publishBlog(title, content, imagePreviewArray);
      console.log("Post Published", result);
      navigate(`/blog/${result.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="">
        <Appbar
          buttonName="Publish"
          className="px-40"
          onClick={handlePublish}
        />
        <div className="ml-96 max-w-screen-xl py-8 px-40">
          <input
            type="text"
            placeholder="Title"
            onChange={handleTitleChange}
            className="text-4xl pb-5 focus:outline-none"
          />
          <ReactQuill
            ref={quillRef}
            value={content}
            theme="snow"
            modules={modules}
            placeholder="Tell your story..."
            onChange={handleContentChange}
          />
        </div>
      </div>
      <div>
        <ImagePreview imagePreviewArray={imagePreviewArray} />
      </div>
    </>
  );
};

export default Editor;
