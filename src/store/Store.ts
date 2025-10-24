import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../reducer/User/User";
import OperationReducer from "../reducer/Operations/Operation";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    operation: OperationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
