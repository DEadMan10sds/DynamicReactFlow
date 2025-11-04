import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  prevStep,
  resetCurrentStep,
} from "../reducer/Operations/Operation";
import type { RootState } from "../store/Store";

export const UserStepsController = ({
  canGoNext = true,
  canGoPrev = true,
}: {
  canGoNext?: boolean;
  canGoPrev?: boolean;
}) => {
  const dispatch = useDispatch();
  const currentStep: number = useSelector(
    (state: RootState) => state.operation.currentStep
  );
  const steps: number = useSelector(
    (state: RootState) => state.operation.steps.length
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {canGoPrev && (
        <button
          className="border-slate-300 border bg-slate-600 "
          onClick={() => dispatch(prevStep())}
        >
          Anterior
        </button>
      )}
      {canGoNext && (
        <button
          className="p-3 my-3 rounded-md border border-amber-800 bg-stone-800"
          onClick={() =>
            currentStep < steps - 1
              ? dispatch(nextStep())
              : dispatch(resetCurrentStep())
          }
        >
          Siguiente
        </button>
      )}
    </div>
  );
};
