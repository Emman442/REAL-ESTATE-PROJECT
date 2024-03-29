import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = true;
      state.error = null;
    },
    signInFailure: (state) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserStart: (state, action) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = true;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {signInFailure, signInSuccess, signInStart, updateUserFailure, updateUserSuccess, updateUserStart}=userSlice.actions
export default userSlice.reducer