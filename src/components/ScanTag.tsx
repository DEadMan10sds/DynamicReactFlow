import { useBarcodeScanner } from "../hooks/useBarcodeScanner";
import { UserStepsController } from "./UserStepsController";

export const ScanTag = () => {
  const { scanned } = useBarcodeScanner();

  return (
    <>
      <h1>Scan</h1>
      <p>{scanned}</p>
      <UserStepsController canGoPrev={false} canGoNext={scanned === "q"} />
    </>
  );
};
