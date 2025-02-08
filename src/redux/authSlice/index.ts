import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  role:localStorage.getItem('role') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.role = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.role =null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
