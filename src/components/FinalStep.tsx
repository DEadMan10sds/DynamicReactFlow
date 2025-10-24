import { useState } from "react"
import { UserStepsController } from "./UserStepsController";

export const FinalStep = () => {
    const [canEnd, setCanEnd] = useState<boolean>(false);

    function handleChange() {
        setCanEnd(!canEnd)
    }


    return <>
        <div className="flex gap-2">
            <h1>FinalStep</h1>
            <div className="flex gap-2 w-fit cursor-pointer" onClick={handleChange}>
                <input type="checkbox" value="canEnd" checked={canEnd} />
                <p>Puede finalizar</p>
            </div>
        </div>
        <UserStepsController canGoPrev={false} canGoNext={canEnd} />
    </>
}