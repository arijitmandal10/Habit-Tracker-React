import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habitsSlice';

const store = configureStore({
	reducer: {
		habits: habitsReducer,
		// other reducers...
	},
});

export default store;
