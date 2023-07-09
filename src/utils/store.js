import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habitsSlice';
import authReducer from './authSlice';

const store = configureStore({
	reducer: {
		habits: habitsReducer,
		auth: authReducer,
		// other reducers...
	},
});

export default store;
