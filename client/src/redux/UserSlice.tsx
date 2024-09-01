import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  email: string | null;
  isAuthenticated: boolean | null;
  role: "user" | "admin" | null;
};

const initialState: InitialStateType = {
  email: null,
  isAuthenticated: null,
  role: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<InitialStateType>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
