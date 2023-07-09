import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		currentUser: false,
	},
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
