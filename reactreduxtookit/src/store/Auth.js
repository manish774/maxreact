import { createSlice } from '@reduxjs/toolkit';


const initialAuth = {isAuthenticate: false}
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuth,
  reducers:{
    login(state){
      state.isAuthenticate = true
    },
    logout(state){
      state.isAuthenticate = false
    }
  }
})
export const AuthActions = authSlice.actions;
export default authSlice;