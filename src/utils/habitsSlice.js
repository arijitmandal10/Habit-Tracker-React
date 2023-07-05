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
		updateHabitStatus: (state, action) => {
			const { habitId, status } = action.payload;
			const habitIndex = state.findIndex((habit) => habit.id === habitId);
			if (habitIndex !== -1) {
				state[habitIndex].todayStatus = status;
			}
		},
		updateLastSixDaysStatus: (state, action) => {
			const { habitId, updatedStatus } = action.payload;
			const habit = state.find((habit) => habit.id === habitId);
			if (habit) {
				habit.lastSixDaysStatus = updatedStatus;
			}
		},
	},
});

export const { addHabit, deleteHabit, updateHabitStatus, updateLastSixDaysStatus } = habitsSlice.actions;
export default habitsSlice.reducer;
