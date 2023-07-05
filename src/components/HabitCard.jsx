import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateHabitStatus, deleteHabit } from '../utils/habitsSlice';

const HabitCard = ({ id, title, frequency, description, time }) => {
	const dispatch = useDispatch();
	const habits = useSelector((state) => state.habits);
	const habit = useSelector((state) => state.habits.find((habit) => habit.id === id));
	console.log(habits);

	const handleStatusChange = (event) => {
		const newStatus = event.target.value;
		dispatch(updateHabitStatus({ habitId: id, status: newStatus }));
		console.log(habits);
	};

	const handleDelete = () => {
		dispatch(deleteHabit(id));
	};

	return (
		<div style={{ marginBottom: '36px' }}>
			<div className='habit-card'>
				<div className='position'>
					<h3>{title}</h3>
					<caption>{time}</caption>
				</div>
				<div className='hr'></div>
				<div className='position'>
					<p style={{ minWidth: '110px' }}>{description}</p> |<p>{frequency}</p> |<button onClick={handleDelete}>Delete</button>
				</div>
			</div>
			<label>
				<select style={{ marginLeft: '29.5%' }} value={habit.todayStatus} onChange={handleStatusChange}>
					<option value={habit.todayStatus}>{habit.todayStatus}</option>
					<option value='Done'>Done</option>
					<option value='Not Done'>Not Done</option>
				</select>
			</label>
		</div>
	);
};

export default HabitCard;
