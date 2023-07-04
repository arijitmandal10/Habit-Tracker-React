import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteHabit } from '../utils/habitsSlice';

const HabitCard = ({ id, title, frequency, description, time }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteHabit(id));
	};

	return (
		<div className='habit-card'>
			<div className='position'>
				<h3>{title}</h3>
				<caption>{time}</caption>
			</div>

			<div className='hr'></div>
			<div className='position'>
				<p style={{ minWidth: '110px' }}>{description}</p> |<p>{frequency}</p> |
				<div className='buttons'>
					<button>Update</button> &nbsp;
					<button onClick={handleDelete}>Delete</button>
				</div>
			</div>
		</div>
	);
};

export default HabitCard;
