import type React from "react";

type ButtonProps = {
  text: string;
  color?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  text,
  color = "via-amber-700",
  ...props
}) => {
  return (
    <button
      className={`relative p-4
        mt-5
              outer-neo
           before:absolute before:inset-x-0 before:bottom-0 before:h-1
           before:bg-gradient-to-r before:from-transparent before:${color} before:to-transparent
           before:opacity-30 hover:before:opacity-100
           before:transition-opacity before:duration-150`}
      {...props}
    >
      {text}
    </button>
  );
};
