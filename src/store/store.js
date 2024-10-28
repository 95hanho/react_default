import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loding from "../store/reducers/lodingSlice";

const rootReducer = combineReducers({ loding });

const store = configureStore({
	reducer: rootReducer,
});

export default store;
