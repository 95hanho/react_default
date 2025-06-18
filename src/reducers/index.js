import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loding from "./lodingSlice";

const rootReducer = combineReducers({ loding });

const store = configureStore({
	reducer: rootReducer,
});

export default store;
