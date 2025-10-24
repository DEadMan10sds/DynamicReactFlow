import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../types/Role";
import type UserState from "../../interfaces/UserState";

const initialState: UserState = {
  role: "user",
  name: "Invitado",
};

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setRole, setName } = UserReducer.actions;
export default UserReducer.reducer;
