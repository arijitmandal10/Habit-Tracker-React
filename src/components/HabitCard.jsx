// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteHabit } from '../utils/habitsSlice';

// const HabitCard = ({ id, title, frequency, description, time }) => {
// 	const dispatch = useDispatch();

// 	const handleDelete = () => {
// 		dispatch(deleteHabit(id));
// 	};

// 	return (
// 		<div className='habit-card'>
// 			<div className='position'>
// 				<h3>{title}</h3>
// 				<caption>{time}</caption>
// 			</div>

// 			<div className='hr'></div>
// 			<div className='position'>
// 				<p style={{ minWidth: '110px' }}>{description}</p> |<p>{frequency}</p> |
// 				<div className='buttons'>
// 					<button>Update</button> &nbsp;
// 					<button onClick={handleDelete}>Delete</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default HabitCard;

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteHabit, updateHabit } from '../utils/habitsSlice';

const HabitCard = ({ id, title, frequency, description, time, status }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteHabit(id));
	};

	const handleChangeStatus = (event) => {
		const updatedStatus = event.target.value;
		dispatch(updateHabit({ id, status: updatedStatus, title, description, time })); // Include the title in the updateHabit action
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
					<p style={{ minWidth: '110px' }}>{description}</p> |<p>{frequency}</p> |{/* <button>Update</button> &nbsp; */}
					<button onClick={handleDelete}>Delete</button>
				</div>
			</div>
			<label>
				<select style={{ marginLeft: '29.5%' }} value={status} onChange={handleChangeStatus}>
					<option value='None'>None</option>
					<option value='Done'>Done</option>
					<option value='Not Done'>Not Done</option>
				</select>
			</label>
		</div>
	);
};

export default HabitCard;
