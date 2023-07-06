import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
	name: 'habits',
	initialState: [],
	reducers: {
		addHabit: (state, action) => {
			const newHabit = {
				id: action.payload.id,
				title: action.payload.title,
				time: action.payload.time,
				frequency: action.payload.frequency,
				todayStatus: 'none',
				lastSixDaysStatus: Array(6).fill('none'), // Initialize the array with 'none' values
			};
			state.push(newHabit);
		},
		updateHabitStatusForDay: (state, action) => {
			const { habitId, dayIndex, status } = action.payload;
			const habit = state.find((habit) => habit.id === habitId);
			if (habit) {
				habit.lastSixDaysStatus[dayIndex] = status;
			}
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
	},
});

export const { addHabit, deleteHabit, updateHabitStatus, updateHabitStatusForDay } = habitsSlice.actions;
export default habitsSlice.reducer;
