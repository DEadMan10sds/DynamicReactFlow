import type { JSX } from "react";
import type FlowBase from "../interfaces/FlowBase";
import { GuestHome } from "../components/GuestHome";

export class GuestFlow implements FlowBase {
    render(): JSX.Element {
        return <GuestHome />
    }
}