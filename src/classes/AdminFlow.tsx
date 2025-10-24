import type { JSX } from "react";
import type FlowBase from "../interfaces/FlowBase";

export default class AdminFlow implements FlowBase {
    render(): JSX.Element {
        return <h2>This is the admin flow</h2>
    }
}