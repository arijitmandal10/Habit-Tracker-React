import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../utils/authSlice';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				localStorage.setItem('loginSuccess', 'true');
				dispatch(setCurrentUser(true)); // Update the currentUser value using Redux

				navigate('/');
			})

			.catch((error) => {
				toast.error('Wrong email/password');
				setError(true);
			});
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
