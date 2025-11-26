import type { JSX } from "react";
import type FlowBase from "../interfaces/FlowBase";
import { AdminSettings } from "../pages/AdminSettings";
import { Link } from "react-router-dom";

export default class AdminFlow implements FlowBase {
  asideLinks(): JSX.Element {
    return (
      <div className="flex flex-col gap-3">
        <Link to="/users">Usuarios</Link>
        <Link to="/settings">Configuración</Link>
      </div>
    );
  }

  settings(): JSX.Element {
    return <AdminSettings />;
  }

  home(): JSX.Element {
    return <></>;
  }
}
