import { useDispatch } from "react-redux"
import { setRole } from "../reducer/User/User";

export const ChangeRole = () => {

    const dispatch = useDispatch();

    return <div className="flex gap-4">
        <button onClick={() => dispatch(setRole("admin"))}>Admin</button>
        <button onClick={() => dispatch(setRole("user"))}>user</button>
    </div>
}