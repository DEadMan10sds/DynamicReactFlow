import { UserStepsController } from "./UserStepsController"

export const ScanMaterials = () => {
    return <>
        <h1>Scan Materials</h1>
        <UserStepsController canGoPrev={false} />
    </>
}