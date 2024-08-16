import React, { ChangeEvent } from "react";

type Auth = {
  label: string;
  placeholder?: string;
  isPass: boolean;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Auth: React.FC<Auth> = ({
  label,
  placeholder,
  isPass,
  onchange,
}) => {
  return (
    <div className="flex justify-center flex-col h-16">
      <div className="flex flex-col w-1/3 items-end gap-1">
        <label
          className={`w-fit ovedrflow text-lg px-4 font-semibold py-2 
          ${label.length > 7 ? "w-4/12" : ""}`}
        >
          {label}
        </label>
      </div>
      <div className="grid grid-rows-2 justify-center">
        <input
          placeholder={placeholder}
          type={isPass ? `password` : `text`}
          onChange={onchange}
          className="w-full py-1 text-lg px-3 bg-transparent border-2 border-gray-200 
            rounded-md pr-3 flex items-center outline-none focus:border-gray-200"
        />
      </div>
    </div>
  );
};
