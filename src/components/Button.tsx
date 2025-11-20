import type React from "react";
type ButtonProps = {
  text: string;
  variant?: "danger" | "secondary" | "default" | "custom";
  color?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "default",
  color = "#000",
  ...props
}) => {
  const variantColors = {
    danger: "#b91c1c", // red-700
    secondary: "#1d4ed8", // blue-700
    default: "#b45309", // amber-700
    custom: color,
  };

  return (
    <button
      {...props}
      style={
        {
          "--border-color": variantColors[variant],
        } as React.CSSProperties
      }
      className="
        cursor-pointer mt-4 relative p-4 outer-neo
        before:absolute before:inset-x-0 before:bottom-0 before:h-1
        before:bg-linear-to-r before:from-transparent before:to-transparent
        before:via-(--border-color)
        before:opacity-30 hover:before:opacity-100
        before:transition-opacity before:duration-150
      "
    >
      {text}
    </button>
  );
};
