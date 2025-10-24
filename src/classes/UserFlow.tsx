import type { JSX } from "react";
import type FlowBase from "../interfaces/FlowBase";
import { UserHome } from "../components/UserHome";

export default class UserFlow implements FlowBase {
    render(): JSX.Element {
        return <UserHome />
    }
}