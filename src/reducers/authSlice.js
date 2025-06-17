import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../cookies";

const lodingSlice = createSlice({
	name: "auth",
	initialState: {
		access_token: "",
		refresh_token: "",
	},
	reducers: {
		LOGIN_SUCCESS(state, payload) {
			state.access_token = payload.access_token;
			state.refresh_token = payload.refresh_token;
			setCookie("access_token", payload.access_token);
			setCookie("refresh_token", payload.refresh_token);
		},
		LOGOUT(state) {
			state.access_token = "";
			state.refresh_token = "";
		},
	},
});

export default lodingSlice.reducer;
