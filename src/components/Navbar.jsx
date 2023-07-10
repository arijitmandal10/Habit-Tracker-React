import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	// const navigate = useNavigate();
	const [isWeeklyView, setIsWeeklyView] = useState(false);

	const handleToggleView = () => {
		setIsWeeklyView((prevState) => !prevState);
	};

	const handleLogout = () => {
		// Remove the isLoggedIn flag from local storage
		localStorage.removeItem('isLoggedIn');
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
				<Link to='/Login'>
					{' '}
					<button onClick={handleLogout}>Logout</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
