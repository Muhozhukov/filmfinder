import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TUserState = {
  userName: string | null;
  isLogin: boolean;
};
const initialState: TUserState = {
  userName: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userName: string }>) => {
      state.userName = action.payload.userName;
      state.isLogin = true;
    },
    logout: (state) => {
      state.userName = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
