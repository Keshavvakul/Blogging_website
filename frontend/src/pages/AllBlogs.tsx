import { BlogCard } from "../components";
import { Appbar } from "../components";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { BlogSkeleton } from "../components/BlogSkeleton";

const AllBlogs = () => {
  const { loading, blogs } = useBlogs();
  const navigate = useNavigate();

  const navigateToEditor = () => {
    navigate("/editor");
  };

  if (loading) {
    return (
      <div>
        <div>
          <Appbar buttonName="Write" onClick={navigateToEditor} />
        </div>

        <div className="flex justify-center pr-96 mr-9">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Appbar buttonName="Write" onClick={navigateToEditor} />
      </div>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          authorName={blog.author.name}
          published={"Jun 29 2024"}
          title={blog.title}
          content={blog.content}
          id={blog.id}
        />
      ))}
    </div>
  );
};

export default AllBlogs;
