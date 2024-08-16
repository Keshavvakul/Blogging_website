import { Appbar } from "../components";
import { BlogDetail } from "../components/BlogDetail";
import { SpecificBlogSkeleton } from "../components/SpecificBlogSkeleton";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const navigateToEditor = () => {
    navigate("/editor");
  };

  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({
    id: id as string,
  });

  if (loading) {
    return (
      <div>
        <div>
          <Appbar buttonName="write" onClick={navigateToEditor} />
        </div>

        <div>
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
          <SpecificBlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Appbar buttonName="write" onClick={navigateToEditor} />
      </div>
      {blog ? <BlogDetail blog={blog} /> : <p>No blog found</p>}
    </div>
  );
};

export default Blog;
