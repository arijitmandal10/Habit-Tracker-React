import React from 'react';
import { useSelector } from 'react-redux';
import HabitCard from './HabitCard';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Habits = () => {
	const habits = useSelector((state) => state.habits);

	useEffect(() => {
		const loginSuccess = localStorage.getItem('loginSuccess');
		if (loginSuccess) {
			toast.success('Login Successful');
			localStorage.removeItem('loginSuccess'); // Remove the login success flag from localStorage
		}
	}, []);

	return (
		<div className='habit-list'>
			<ToastContainer />
			{habits && habits.length === 0 ? (
				<h1>No Habits to keep track!! ☹️</h1>
			) : (
				habits.map((habit) => <HabitCard key={habit.id} {...habit} />)
			)}
		</div>
	);
};

export default Habits;
