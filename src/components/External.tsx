import { useSelector } from "react-redux"
import { type RootState } from '../store/Store';

export const External = () => {
    const userName = useSelector((state: RootState) => state.user.name)


    return <div className="rounded-xl bg-gray-800 text-white">
        This is an external component {userName}
    </div>
}