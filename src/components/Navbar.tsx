import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/Store";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducer/Auth/Auth";
//import { ChangeRole } from "./ChangeRole";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector((state: RootState) => state.operation);

  return (
    <div className="flex justify-between py-2 px-8 mb-4 border-b border-stone-700">
      <h1 className="text-4xl font-bold my-5">
        {name ? name : "Sin Operación"}
      </h1>
      <button
        className="cursor-pointer"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};
