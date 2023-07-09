import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './utils/store';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Error from './components/ErrorPage';
import Habits from './components/Habits';
import HabitForm from './components/HabitForm';
import WeeklyView from './components/WeeklyView';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import SignUp from './components/SignUp';

const AppLayout = () => {
	const currentUser = useSelector((state) => state.auth.currentUser);
	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to='/Login' />;
	};
	return (
		<RequireAuth>
			<Navbar />
			<Outlet />
		</RequireAuth>
	);
};

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <AppLayout />,
			errorElement: <Error />,
			children: [
				{
					path: '/',
					element: <Habits />,
				},
				{
					path: '/HabitForm',
					element: <HabitForm />,
				},
				{
					path: '/WeeklyView',
					element: <WeeklyView />,
				},
			],
		},
		{
			path: '/Login',
			element: <Login />,
		},
		{
			path: '/SignUp',
			element: <SignUp />,
		},
	]);

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
