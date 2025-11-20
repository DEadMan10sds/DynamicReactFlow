import { useSelector } from "react-redux";
import type { RootState } from "./store/Store";
import createFlow from "./common/CreateFlow";
import type { Role } from "./types/Role";
import { Navbar } from "./components/Navbar";

function Home() {
  const role: Role = useSelector((state: RootState) => state.user.role as Role);
  const flow = createFlow(role);

  return (
    <div className="bg-stone-950 h-screen">
      <Navbar>{flow.render()}</Navbar>
    </div>
  );
}

export default Home;
