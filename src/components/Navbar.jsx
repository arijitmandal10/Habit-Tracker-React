import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();
	const [heading, setHeading] = useState('Detail View');

	const handleAddButtonClick = () => {
		setHeading('Add New Habit');
	};

	// Check the current location to determine the heading text
	React.useEffect(() => {
		if (location.pathname === '/HabitForm') {
			setHeading('Add New Habit');
		} else {
			setHeading('Detail View');
		}
	}, [location.pathname]);

	return (
		<nav>
			<Link to='/HabitForm'>
				<button onClick={handleAddButtonClick}>➕</button>
			</Link>
			<h3>{heading}</h3>
			<h3>
				<Link to='/WeeklyView'>Week View</Link>
			</h3>

			<h3>
				{' '}
				<Link to='./'>Home</Link>{' '}
			</h3>
		</nav>
	);
};

export default Navbar;
