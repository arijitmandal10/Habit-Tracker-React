import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../utils/habitsSlice';
import { convertTo24HourFormat } from '../utils/helper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const HabitForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [frequency, setFrequency] = useState('daily');
	const [description, setDescription] = useState('');
	const [time, setTime] = useState(new Date());
	const [todayStatus, setTodayStatus] = useState('None');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formattedTime = convertTo24HourFormat(time);

		const newHabit = {
			id: uuidv4(),
			title,
			frequency,
			description,
			time: formattedTime,
			todayStatus,
			lastSixDaysStatus: Array(6).fill('none'),
		};

		try {
			// Add the habit to the Redux store
			dispatch(addHabit(newHabit));

			// Add the habit to Firestore
			await setDoc(doc(db, 'habits', newHabit.id), newHabit);
			console.log('Habit added to Firestore');
		} catch (error) {
			console.error('Error adding habit to Firestore:', error);
		}

		setTitle('');
		setFrequency('daily');
		setDescription('');
		setTime(new Date());
		setTodayStatus('None');

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
				<textarea placeholder='Description (optional)' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
			<button type='submit'>Submit</button>
		</form>
	);
};

export default HabitForm;
