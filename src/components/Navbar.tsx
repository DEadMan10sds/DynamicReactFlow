import { useDispatch } from "react-redux";
import { setRole } from "../reducer/User/User";
import type { Role } from "../types/Role";

interface navbarRole {
  text: string;
  value: Role;
}

const roles: navbarRole[] = [
  {
    text: "Admin",
    value: "admin",
  },
  {
    text: "User",
    value: "user",
  },
];

export const Navbar = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full flex justify-between">
        <h1 className="p-4 text-4xl font-bold my-5">This is the navbar</h1>

        <div className="flex gap-3">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => {
                dispatch(setRole(role.value));
              }}
            >
              {role.text}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">{children}</div>
    </>
  );
};
