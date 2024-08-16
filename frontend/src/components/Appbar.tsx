import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface AppbarProps {
  buttonName: string;
  onClick: () => void;
  className?: string;
}

export const Appbar: React.FC<AppbarProps> = ({
  buttonName,
  onClick,
  className,
}) => {
  return (
    <div
      className={twMerge("flex justify-between border-b px-12 py-4", className)}
    >
      <Link to={"/allBlogs"}>
        <div className="font-semibold text-2xl">Daily Blogs</div>
      </Link>
      <div className="flex gap-16">
        <motion.div whileTap={{ scale: 0.9 }} className="py-1">
          <button
            onClick={onClick}
            className="bg-green-500 rounded-2xl text-lg text-white w-20 h-9"
          >
            {buttonName}
          </button>
        </motion.div>
        <Avatar authorName="Vakul" className={"w-11 h-11"} />
      </div>
    </div>
  );
};
