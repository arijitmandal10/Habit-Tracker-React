import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setPasswordMatch(false);
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setPasswordMatch(true);
				console.log(user);
				toast.success('User registered successfully!', {
					onClose: () => navigate('/Login'), // Navigate to next page after toast is closed
				});
			})
			.catch((error) => {
				const errorMessage = error.message;
				toast.error(errorMessage);
				setErrorMessage(errorMessage);
			});
	};

	return (
		<>
			{' '}
			<ToastContainer />
			<div className='Login'>
				<h1 style={{ textAlign: 'center' }}>Habit Tracker Sign up </h1>
				<form onSubmit={handleSubmit}>
					<input
						type='email'
						style={{ marginTop: '24px' }}
						required
						name='email'
						placeholder='abc@xyz.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input type='password' required name='password' placeholder='password' onChange={handlePasswordChange} />
					<input
						type='password'
						required
						name='confirm password'
						placeholder='confirm password'
						onChange={handleConfirmPasswordChange}
					/>
					{!passwordMatch && !errorMessage && <p>Passwords do not match!! 😥</p>}
					{/* {errorMessage && <p>{errorMessage.includes('auth/email-already-in-use') ? 'auth/email-already-in-use' : errorMessage}</p>} */}

					<div>
						<button type='submit'>Sign Up</button>
						<Link to='/Login'>Have an account? Login</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignUp;
