import type { JSX } from "react";
import { Link } from "react-router-dom";

export type AsideLinkProperties = {
  text: string;
  icon?: JSX.Element;
  color?: string;
  path: string;
};

export const AsideLink = ({
  text,
  icon,
  color = "amber-800",
  path,
}: AsideLinkProperties) => {
  console.log(color);
  return (
    <Link
      to={path}
      className={`flex gap-3 w-full items-center rounded-sm p-1 cursor-pointer border  hover:border-amber-800 border-transparent transition`}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
};
