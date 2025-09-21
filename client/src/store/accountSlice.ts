import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



interface AccountState {
  value: User | null;
}

interface User {
  id: number;
  name: string;
  role: string;
}

const initialState: AccountState = {
  value: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;
