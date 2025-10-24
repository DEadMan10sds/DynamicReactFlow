import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";

export function useGetInitialComponent({ byId = false }: { byId?: boolean } = {}) {

    const steps = useSelector((state: RootState) => state.operation.steps);
    const currentStep = useSelector((state: RootState) => state.operation.currentStep)

    const initialKey = byId ? steps.find(step => step.id === currentStep)?.elementKey : steps[currentStep].elementKey

    return initialKey
}