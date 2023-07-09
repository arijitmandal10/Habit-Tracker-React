import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
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

			<div>
				{' '}
				<button onClick={handleToggleView}>
					{isWeeklyView ? <Link to='/'>Change View</Link> : <Link to='/WeeklyView'>Change View</Link>}
				</button>
				<Link to='/Login'>Logout</Link>
			</div>
		</nav>
	);
};

export default Navbar;
