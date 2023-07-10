// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { format, addDays, startOfDay, endOfDay } from 'date-fns';
// import { updateHabitStatus, updateHabitStatusForDay } from '../utils/habitsSlice';
// import { db } from '../firebase';
// import { collection, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

// const WeeklyView = () => {
// 	const dispatch = useDispatch();
// 	const habits = useSelector((state) => state.habits);
// 	const today = new Date();
// 	const lastSixDays = [...Array(6)].map((_, index) => {
// 		const date = addDays(today, -6 + index);
// 		return {
// 			date,
// 			dayOfWeek: format(date, 'EEE'),
// 		};
// 	});

// 	useEffect(() => {
// 		const unsubscribe = onSnapshot(collection(db, 'habits'), (snapshot) => {
// 			const updatedHabits = snapshot.docs.map((doc) => ({
// 				id: doc.id,
// 				...doc.data(),
// 			}));
// 			dispatch(updateHabitStatus(updatedHabits));
// 		});

// 		return () => unsubscribe();
// 	}, [dispatch]);

// 	const handleChange = async (habitId, dayIndex, status) => {
// 		try {
// 			await updateDoc(doc(db, 'habits', habitId), {
// 				[`lastSixDaysStatus.${dayIndex}`]: status,
// 			});
// 			console.log('Habit status updated in Firestore');
// 		} catch (error) {
// 			console.error('Error updating habit status in Firestore:', error);
// 		}
// 	};

// 	const handleStatusChange = async (habitId, status) => {
// 		try {
// 			await updateDoc(doc(db, 'habits', habitId), {
// 				todayStatus: status,
// 			});
// 			console.log('Habit status updated in Firestore');
// 		} catch (error) {
// 			console.error('Error updating habit status in Firestore:', error);
// 		}
// 	};

// 	return (
// 		<div className='weekly-view'>
// 			<div className='days-row'>
// 				{lastSixDays.map((day) => (
// 					<div key={day.date.getTime()} className='day-label'>
// 						<span className='fw-600'>{format(day.date, 'MMMM d')}</span>
// 						<div className='hr2'></div>
// 						<span className='fw-100'>{day.dayOfWeek}</span>
// 					</div>
// 				))}
// 				<div className='day-label'>
// 					<span className='fw-600'>{format(today, 'MMMM d')}</span>
// 					<div className='hr2'></div>
// 					<span className='fw-100'>{format(today, 'EEE')}</span>
// 				</div>
// 			</div>
// 			<div className='habit-list'>
// 				{habits.map((habit) => (
// 					<div key={habit.id} className='habit-card p-w-15'>
// 						<div className='habit-info'>
// 							<h3>{habit.title}</h3>
// 							<p>{habit.time}</p>
// 						</div>
// 						<div className='hr'></div>
// 						<div className='habit-status-row'>
// 							{lastSixDays.map((day, index) => (
// 								<div key={day.date.getTime()} className='habit-status'>
// 									<select
// 										className='fit-content'
// 										value={habit.lastSixDaysStatus[index]}
// 										onChange={(e) => handleChange(habit.id, index, e.target.value)}
// 									>
// 										<option value='none'>none</option>
// 										<option value='done'>done</option>
// 										<option value='not done'>not done</option>
// 									</select>
// 								</div>
// 							))}
// 							<select
// 								className='fit-content today-select'
// 								value={habit.todayStatus}
// 								onChange={(e) => handleStatusChange(habit.id, e.target.value)}
// 							>
// 								<option value={habit.todayStatus}>{habit.todayStatus}</option>
// 								<option value='Done'>Done</option>
// 								<option value='Not Done'>Not Done</option>
// 							</select>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default WeeklyView;

// WeeklyView.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, addDays } from 'date-fns';
import { updateHabitStatus, updateHabitStatusForDay } from '../utils/habitsSlice';
import { db } from '../firebase';
import { collection, doc, getDocs, updateDoc, onSnapshot, query, where } from 'firebase/firestore';

const WeeklyView = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.currentUser);
	const habits = useSelector((state) => state.habits);
	const today = new Date();
	const lastSixDays = [...Array(6)].map((_, index) => {
		const date = addDays(today, -6 + index);
		return {
			date,
			dayOfWeek: format(date, 'EEE'),
		};
	});

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, 'habits'),
			(snapshot) => {
				const updatedHabits = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				dispatch(updateHabitStatus(updatedHabits));
			},
			{
				userEmail: currentUser.email, // Fetch habits associated with the current user
			},
		);

		return () => unsubscribe();
	}, [dispatch, currentUser]);

	const handleChange = async (habitId, dayIndex, status) => {
		try {
			await updateDoc(doc(db, 'habits', habitId), {
				[`lastSixDaysStatus.${dayIndex}`]: status,
			});
			console.log('Habit status updated in Firestore');
		} catch (error) {
			console.error('Error updating habit status in Firestore:', error);
		}
	};

	const handleStatusChange = async (habitId, status) => {
		try {
			await updateDoc(doc(db, 'habits', habitId), {
				todayStatus: status,
			});
			console.log('Habit status updated in Firestore');
		} catch (error) {
			console.error('Error updating habit status in Firestore:', error);
		}
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
									<select
										className='fit-content'
										value={habit.lastSixDaysStatus[index]}
										onChange={(e) => handleChange(habit.id, index, e.target.value)}
									>
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
