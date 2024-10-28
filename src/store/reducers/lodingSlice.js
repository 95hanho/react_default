import { createSlice } from "@reduxjs/toolkit";

const lodingSlice = createSlice({
	name: "loding",
	initialState: {
		ing: false,
	},
	reducers: {
		LODING_ON(state) {
			state.ing = true;
		},
		LODING_OFF(state) {
			state.ing = false;
		},
	},
});

export default lodingSlice.reducer;
