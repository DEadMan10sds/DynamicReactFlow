import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";
import { useGetInitialComponent } from "../hooks/useGetInitialComponent";
import ComponentMap from "../common/ComponentMap";

export const UserHome = () => {
  const currStep = useSelector(
    (state: RootState) => state.operation.currentStep
  );
  const elementKey = useGetInitialComponent();
  const CurrentComponent = elementKey && ComponentMap[elementKey];

  return (
    <div className="p-4 rounded-md bg-stone-900 border border-stone-800 inset-shadow-lg inset-shadow-green-600 min-w-lg">
      <div className="w-full flex justify-between">
        <h1>Bienvenido Usuario - Componente principal usuario</h1>
        <p className="text-end">Paso: {currStep}</p>
      </div>

      <div className="my-2 flex- items-center">
        {CurrentComponent && <CurrentComponent />}
      </div>
    </div>
  );
};
