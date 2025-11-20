import type React from "react";

type ButtonProps = {
  text: string;
  variant?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "",
  ...props
}) => {
  let style: string = "";

  //Lookup for improvement
  switch (variant) {
    case "danger":
      style =
        "mt-4 relative p-4 outer-neo before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-gradient-to-r before:from-transparent before:via-red-700 before:to-transparent        before:opacity-30 hover:before:opacity-100        before:transition-opacity before:duration-150";
      break;
    case "secondary":
      style =
        "mt-4 relative p-4 outer-neo before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-gradient-to-r before:from-transparent before:via-gray-700 before:to-transparent        before:opacity-30 hover:before:opacity-100        before:transition-opacity before:duration-150";
      break;
    default:
      style =
        "mt-4 relative p-4 outer-neo before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-gradient-to-r before:from-transparent before:via-amber-700 before:to-transparent        before:opacity-30 hover:before:opacity-100        before:transition-opacity before:duration-150";
      break;
  }

  return (
    <button className={style} {...props}>
      {text}
    </button>
  );
};

/**
 * Similar function but has tons of logic to make color dynamic -> Tailwind 4 doesn't support dynamic classes for pseudo elements  
 import React, { useState } from "react";

type ButtonProps = {
  text: string;
  color?: string;
  hoverColor?: string;
  pulse?: boolean;
  showBorder?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  text,
  color = "#FF8800",
  hoverColor = "#FFA500",
  pulse = false,
  showBorder = true,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const baseGradient = `linear-gradient(to right, transparent, ${color}, transparent)`;
  const hoverGradient = `linear-gradient(to right, transparent, ${hoverColor}, transparent)`;

  return (
    <button
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-4 mt-3 cursor-pointer outer-neo ${
        pulse ? "animate-pulse" : ""
      }`}
      style={{ position: "relative" }}
    >
      {text}
      {showBorder && (
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "4px",
            borderRadius: "2px",
            background: hovered ? hoverGradient : baseGradient,
            opacity: hovered ? 1 : 0.3,
            transition: "opacity 0.5s ease, background 0.5s ease",
          }}
        />
      )}
    </button>
  );
};

 */
