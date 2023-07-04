import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateHabit } from '../utils/habitsSlice';

const WeeklyView = () => {
	const habits = useSelector((state) => state.habits);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const dispatch = useDispatch();

	// Find the habit with the given ID
	const findHabit = (habitId) => {
		return habits.find((habit) => habit.id === habitId);
	};

	// Handle marking the habit status for a specific day
	const handleMarkStatus = (habitId, day, updatedStatus) => {
		const updatedHabit = findHabit(habitId);
		if (updatedHabit) {
			updatedHabit.status[day] = updatedStatus;
			dispatch(updateHabit(updatedHabit));
		}
	};

	// Handle changing the status for a specific day
	const handleStatusChange = (habitId, day, event) => {
		const updatedStatus = event.target.value;
		handleMarkStatus(habitId, day, updatedStatus);
	};

	// Render the habit status for a specific day
	const renderHabitStatus = (habitId, day) => {
		const habit = findHabit(habitId);
		if (habit && habit.status) {
			const status = habit.status[day];
			return (
				<select value={status} onChange={(event) => handleStatusChange(habitId, day, event)}>
					<option value='None'>None</option>
					<option value='Done'>Done</option>
					<option value='Not Done'>Not Done</option>
				</select>
			);
		}
		return null;
	};

	// Render the habit component
	const renderHabit = (habit) => {
		return (
			<div className='habit' key={habit.id}>
				<div className='habit-name'>{habit.title}</div>
				<div className='habit-status-container'>
					{renderHabitStatus(habit.id, 0)} {/* Today */}
					{Array.from(Array(6)).map((_, index) => (
						<div key={index} className='previous-day-habit-status'>
							{renderHabitStatus(habit.id, index + 1)} {/* Previous 6 days */}
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className='weekly-view'>
			<div className='date-picker'>
				<label htmlFor='selected-date'>Select Date:</label>
				<input
					type='date'
					id='selected-date'
					value={selectedDate.toISOString().substr(0, 10)}
					onChange={(e) => setSelectedDate(new Date(e.target.value))}
				/>
			</div>
			<div className='habits-list'>
				{habits && habits.length > 0 ? habits.map((habit) => renderHabit(habit)) : <p>No habits available.</p>}
			</div>
		</div>
	);
};

export default WeeklyView;
