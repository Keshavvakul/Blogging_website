type ButtonTextType = {
  buttonType: string;
  onclick: () => void;
};

export const Button: React.FC<ButtonTextType> = ({ buttonType, onclick }) => {
  return (
    <button
      className="w-1/2 rounded-md cursor-pointer bg-green-500 px-2  text-white
              h-12 text-lg "
      onClick={onclick}
    >
      {buttonType}
    </button>
  );
};
