import AdminFlow from "../classes/AdminFlow";
import { GuestFlow } from "../classes/GuestFlow";
import UserFlow from "../classes/UserFlow";
import type FlowBase from "../interfaces/FlowBase";
import type { Role } from "../types/Role";

export default function createFlow(role: Role): FlowBase {
  switch (role) {
    case "admin":
      return new AdminFlow();
    case "user":
      return new UserFlow();
    default:
      return new GuestFlow();
  }
}
