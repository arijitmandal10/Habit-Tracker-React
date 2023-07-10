import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import HabitCard from './HabitCard';

const Habits = () => {
	const [habits, setHabits] = useState([]);

	useEffect(() => {
		const fetchHabits = async () => {
			try {
				const habitsCollection = collection(db, 'habits');
				const habitsSnapshot = await getDocs(habitsCollection);
				const habitsData = habitsSnapshot.docs.map((doc) => doc.data());
				setHabits(habitsData);
				// toast.success('Login successful');
			} catch (error) {
				console.error('Error fetching habits from Firestore:', error);
				toast.error('Error fetching habits from Firestore');
			}
		};

		fetchHabits();
	}, []);

	useEffect(() => {
		const loginSuccess = localStorage.getItem('loginSuccess');
		if (loginSuccess) {
			toast.success('Login Successful');
			localStorage.removeItem('loginSuccess'); // Remove the login success flag from localStorage
		}
	}, []);

	return (
		<div className='habit-list'>
			{habits && habits.length === 0 ? (
				<h1>No Habits to keep track!! ☹️</h1>
			) : (
				habits.map((habit) => <HabitCard key={habit.id} {...habit} />)
			)}
		</div>
	);
};

export default Habits;
