import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userStatus: false,
    userData : null
}

const authSlice = createSlice({
    name:"author",
    initialState,
    reducers:{
        login:(state,action) =>{
            state.userStatus = true,
            state.userData = action.payload;
        },
        logout:(state)=>{
            state.userStatus = false,
            state.userData = null;
        }
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;