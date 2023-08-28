import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {},
}

const user = createSlice({
    name : "user",
    initialState,
    reducers : {
        set(state,action){
            state.user = action.payload.user;
        },
        addblogtouser(state,action){
            state.user.blogs = action.payload.blog;
        },
    }
})

export default user.reducer;

export const {set,addblogtouser} = user.actions;