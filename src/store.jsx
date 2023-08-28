import { configureStore } from "@reduxjs/toolkit";
import blog from "./slices/blogslice";
import user from "./slices/userslice";
import loading from "./slices/loaderslice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key : "root",
    version : 1,
    storage,
};

const reducer = combineReducers({
    blog : blog,
    user : user,
    loading : loading,
});

const persistReducers = persistReducer(persistConfig,reducer);

const store = configureStore({
    reducer : persistReducers,
});

export default store;