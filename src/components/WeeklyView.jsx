import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, addDays } from 'date-fns';
import { updateHabitStatus } from '../utils/habitsSlice'; // Import the action to update todayStatus

const WeeklyView = () => {
	const habits = useSelector((state) => state.habits);
	const today = new Date();
	const lastSixDays = [...Array(6)].map((_, index) => {
		const date = addDays(today, -6 + index); // Get the previous six days starting from today
		return {
			date,
			dayOfWeek: format(date, 'EEE'),
		};
	});

	const dispatch = useDispatch();

	const handleChange = (habitId, dayIndex, status) => {
		// Perform your update action here using Redux
		console.log(`Habit ID: ${habitId}, Day Index: ${dayIndex}, Status: ${status}`);
	};

	const handleStatusChange = (habitId, status) => {
		// Dispatch the action to update todayStatus
		dispatch(updateHabitStatus(habitId, status));
	};

	return (
		<div className='weekly-view'>
			<div className='days-row'>
				{lastSixDays.map((day) => (
					<div key={day.date.getTime()} className='day-label'>
						<span className='fw-600'>{format(day.date, 'MMMM d')}</span>
						<div className='hr2'></div>
						<span className='fw-100'>{day.dayOfWeek}</span>
					</div>
				))}
				<div className='day-label'>
					<span className='fw-600'>{format(today, 'MMMM d')}</span>
					<div className='hr2'></div>
					<span className='fw-100'>{format(today, 'EEE')}</span>
				</div>
			</div>
			<div className='habit-list'>
				{habits.map((habit) => (
					<div key={habit.id} className='habit-card p-w-15'>
						<div className='habit-info'>
							<h3>{habit.title}</h3>
							<p>{habit.time}</p>
						</div>
						<div className='hr'></div>
						<div className='habit-status-row'>
							{lastSixDays.map((day, index) => (
								<div key={day.date.getTime()} className='habit-status'>
									<select className='fit-content' onChange={(e) => handleChange(habit.id, index, e.target.value)}>
										<option value='none'>none</option>
										<option value='done'>done</option>
										<option value='not done'>not done</option>
									</select>
								</div>
							))}

							<select
								className='fit-content today-select'
								value={habit.todayStatus}
								onChange={(e) => handleStatusChange(habit.id, e.target.value)}
							>
								<option value={habit.todayStatus}>{habit.todayStatus}</option>
								<option value='Done'>Done</option>
								<option value='Not Done'>Not Done</option>
							</select>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WeeklyView;
