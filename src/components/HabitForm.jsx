// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addHabit } from '../utils/habitsSlice';
// import { convertTo24HourFormat } from '../utils/helper';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// const HabitForm = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const [title, setTitle] = useState('');
// 	const [frequency, setFrequency] = useState('daily');
// 	const [description, setDescription] = useState('');
// 	const [time, setTime] = useState(new Date());

// 	const handleSubmit = (event) => {
// 		event.preventDefault();

// 		const formattedTime = convertTo24HourFormat(time);

// 		const newHabit = {
// 			id: uuidv4(),
// 			title,
// 			frequency,
// 			description,
// 			time: formattedTime,
// 		};

// 		dispatch(addHabit(newHabit));

// 		setTitle('');
// 		setFrequency('daily');
// 		setDescription('');
// 		setTime(new Date());

// 		// Navigate to the home page after submitting the form
// 		navigate('/');
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<label>
// 				<input placeholder='Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
// 			</label>
// 			<label>
// 				<select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
// 					<option value='daily'>Daily</option>
// 					<option value='weekly'>Weekly</option>
// 					<option value='monthly'>Monthly</option>
// 				</select>
// 			</label>
// 			<label>
// 				<textarea placeholder='description (optional)' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
// 			</label>
// 			<label>
// 				<DatePicker
// 					selected={time}
// 					onChange={(date) => setTime(date)}
// 					showTimeSelect
// 					showTimeSelectOnly
// 					timeIntervals={15}
// 					timeCaption='Time'
// 					dateFormat='h:mm aa'
// 				/>
// 			</label>
// 			<button type='submit'>Submit</button>
// 		</form>
// 	);
// };

// export default HabitForm;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../utils/habitsSlice';
import { convertTo24HourFormat } from '../utils/helper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const HabitForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [frequency, setFrequency] = useState('daily');
	const [description, setDescription] = useState('');
	const [time, setTime] = useState(new Date());
	const [status, setStatus] = useState('None'); // New piece of state

	const handleSubmit = (event) => {
		event.preventDefault();

		const formattedTime = convertTo24HourFormat(time);

		const newHabit = {
			id: uuidv4(),
			title,
			frequency,
			description,
			time: formattedTime,
			status: status, // Include the status in the new habit object
		};

		dispatch(addHabit(newHabit));

		setTitle('');
		setFrequency('daily');
		setDescription('');
		setTime(new Date());
		setStatus('None'); // Reset the status state

		// Navigate to the home page after submitting the form
		navigate('/');
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input placeholder='Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
			</label>
			<label>
				<select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
					<option value='daily'>Daily</option>
					<option value='weekly'>Weekly</option>
					<option value='monthly'>Monthly</option>
				</select>
			</label>
			<label>
				<textarea placeholder='description (optional)' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
			</label>
			<label>
				<DatePicker
					selected={time}
					onChange={(date) => setTime(date)}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption='Time'
					dateFormat='h:mm aa'
				/>
			</label>
			{/* <label>
				Status: 
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value='None'>None</option>
					<option value='Done'>Done</option>
					<option value='Not Done'>Not Done</option>
				</select>
			</label> */}
			<button type='submit'>Submit</button>
		</form>
	);
};

export default HabitForm;
