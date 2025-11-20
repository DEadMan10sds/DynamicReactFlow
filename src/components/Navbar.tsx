import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../reducer/User/User";
import type { Role } from "../types/Role";
import type { RootState } from "../store/Store";

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
  const currentRole = useSelector((state: RootState) => state.user.role);

  return (
    <>
      <div className="w-full flex justify-between p-7">
        <h1 className=" text-4xl font-bold my-5">This is the navbar</h1>

        <div className="flex gap-3">
          {roles.map((role) => (
            <button
              className={`h-fit my-auto transition-all ${
                role.value === currentRole
                  ? "border-b-2 border-white"
                  : "border-b-transparent"
              }`}
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
