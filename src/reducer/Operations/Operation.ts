import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  steps: [
    { id: 0, name: "Registrar Producto", elementKey: "scanTag" },
    {
      id: 1,
      name: "Registrar Componentes",
      elementKey: "scanMaterials",
    },
    {
      id: 3,
      name: "Validación de Calidad",
      elementKey: "finalStep",
    },
  ],
};

const OperationReducer = createSlice({
  name: "operation",
  initialState,
  reducers: {
    resetSteps(state) {
      state.steps = initialState.steps.map((s) => ({ ...s }));
    },
    resetCurrentStep(state) {
      state.currentStep = 0;
    },
    nextStep(state) {
      state.currentStep = Math.min(
        state.currentStep + 1,
        state.steps.length - 1
      );
    },
    prevStep(state) {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
  },
});

export const { resetSteps, nextStep, prevStep, resetCurrentStep } =
  OperationReducer.actions;
export default OperationReducer.reducer;
