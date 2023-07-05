import React from 'react';
import { useSelector } from 'react-redux';
import HabitCard from './HabitCard';

const Habits = () => {
	const habits = useSelector((state) => state.habits);

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
