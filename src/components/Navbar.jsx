import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();
	const [isWeeklyView, setIsWeeklyView] = useState(false);

	const handleToggleView = () => {
		setIsWeeklyView((prevState) => !prevState);
	};

	return (
		<nav>
			<Link to='/HabitForm'>
				<button>+</button>
			</Link>
			<h3>Habit Tracker</h3>
			<button onClick={handleToggleView}>
				{isWeeklyView ? <Link to='/'>Change View</Link> : <Link to='/WeeklyView'>Change View</Link>}
			</button>
		</nav>
	);
};

export default Navbar;
