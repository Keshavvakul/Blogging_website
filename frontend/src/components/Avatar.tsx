import React from "react";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  authorName: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ authorName, className }) => {
  return (
    <div
      className={twMerge(
        "relative inline-flex w-8 h-8 items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600",
        className,
      )}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {avatarInitials(authorName)}
      </span>
    </div>
  );
};

function avatarInitials(authorName: string) {
  const initials = authorName.charAt(0);
  return initials;
}
