import { useEffect, useState } from "react";
import { UserStepsController } from "./UserStepsController";

export const ScanMaterials = () => {
  const [materialsValidated, setMaterialsValidated] = useState<boolean>(false);

  function handleMaterialsValidated(valueToSet: boolean) {
    return () => {
      setMaterialsValidated(valueToSet);
    };
  }

  useEffect(() => {
    console.log("Set materials");
  }, [materialsValidated]);

  return (
    <>
      <h1>Scan Materials</h1>
      <button
        className="p-3 my-3 rounded-md border border-amber-800 bg-stone-800"
        onClick={handleMaterialsValidated(!materialsValidated)}
      >
        Validar materiales
      </button>
      <UserStepsController canGoPrev={false} canGoNext={materialsValidated} />
    </>
  );
};
