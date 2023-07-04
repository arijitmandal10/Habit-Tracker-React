import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
	name: 'habits',
	initialState: [],
	reducers: {
		addHabit: (state, action) => {
			state.push(action.payload);
		},
		deleteHabit: (state, action) => {
			const habitId = action.payload;
			return state.filter((habit) => habit.id !== habitId);
		},
		updateHabit: (state, action) => {
			const updatedHabit = action.payload;
			const index = state.findIndex((habit) => habit.id === updatedHabit.id);
			if (index !== -1) {
				state[index] = updatedHabit;
			}
		},
	},
});

export const { addHabit, deleteHabit, updateHabit } = habitsSlice.actions;

export default habitsSlice.reducer;
