import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateHabitStatus, deleteHabit } from '../utils/habitsSlice';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const HabitCard = ({ id, title, frequency, description, time }) => {
	const dispatch = useDispatch();
	const habit = useSelector((state) => state.habits.find((habit) => habit.id === id));
	const [isDeleted, setIsDeleted] = useState(false);

	const handleStatusChange = async (event) => {
		const newStatus = event.target.value;
		dispatch(updateHabitStatus({ habitId: id, status: newStatus }));

		try {
			// Update the habit status in Firestore
			await updateDoc(doc(db, 'habits', id), { todayStatus: newStatus });
			console.log(habit);
			console.log('Habit status updated in Firestore');
		} catch (error) {
			console.error('Error updating habit status in Firestore:', error);
		}
	};

	const handleDelete = async () => {
		try {
			// Delete the habit from Firestore
			await deleteDoc(doc(db, 'habits', id));
			console.log('Habit deleted from Firestore');

			// Dispatch the delete action to Redux store
			dispatch(deleteHabit(id)); // Remove the habit from the Redux store by dispatching the deleteHabit action with the habitId

			setIsDeleted(true); // Update the state to trigger a re-render of the component
		} catch (error) {
			console.error('Error deleting habit from Firestore:', error);
		}
	};

	if (isDeleted) {
		return null; // Return null to prevent the component from being rendered
	}

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
				<select style={{ marginLeft: '29.5%' }} value={habit?.todayStatus} onChange={handleStatusChange}>
					<option value={habit?.todayStatus}>{habit?.todayStatus}</option>
					<option value='Done'>Done</option>
					<option value='Not Done'>Not Done</option>
				</select>
			</label>
		</div>
	);
};

export default HabitCard;
