import { FinalStep } from "../components/FinalStep";
import { ScanMaterials } from "../components/ScanMaterials";
import { ScanTag } from "../components/ScanTag";

const ComponentMap: Record<string, React.ComponentType<unknown>> = {
    scanTag: ScanTag,
    scanMaterials: ScanMaterials,
    finalStep: FinalStep
}


export default ComponentMap