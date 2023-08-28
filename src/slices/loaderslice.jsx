import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading : false,
}

const loading = createSlice({
    name : "loading",
    initialState,
    reducers : {
        setloader(state,action){
            state.loading = !state.loading;
        }
    }
})

export default loading.reducer;

export const {setloader} = loading.actions;