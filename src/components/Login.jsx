import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../utils/authSlice';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs } from 'firebase/firestore';
import { updateHabits } from '../utils/habitsSlice';
import { useEffect } from 'react';

const Login = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the user is already logged in
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		if (isLoggedIn === 'true') {
			// Update the currentUser value using Redux
			dispatch(setCurrentUser(true));
			navigate('/');
		}
	}, [dispatch, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Set the login success flag in localStorage for Toastify
			localStorage.setItem('loginSuccess', 'true');

			// Set the logged in flag in localStorage
			localStorage.setItem('isLoggedIn', 'true');

			// Fetch habits data from Firestore
			const habitsCollection = collection(db, 'habits');
			const habitsSnapshot = await getDocs(habitsCollection);
			const habitsData = habitsSnapshot.docs.map((doc) => doc.data());

			// Update the habits in the Redux store
			dispatch(updateHabits(habitsData));

			navigate('/');
		} catch (error) {
			toast.error('Wrong email/password');
			setError(true);
		}
	};

	return (
		<div className='Login'>
			<h1 style={{ textAlign: 'center' }}>Habit Tracker Login </h1>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					style={{ marginTop: '24px' }}
					required
					name='email'
					placeholder='abc@xyz.com'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input type='password' required name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />

				<div>
					{' '}
					<button type='submit'>Login</button> <Link to='/SignUp'> dont have an account? Sign up</Link>
				</div>
			</form>
			<ToastContainer /> {/* Toast container component */}
		</div>
	);
};

export default Login;
