import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './utils/store';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from './components/ErrorPage';
import Habits from './components/Habits';
import HabitForm from './components/HabitForm';
import WeeklyView from './components/WeeklyView';

const AppLayout = () => {
	return (
		<Provider store={store}>
			{' '}
			<Navbar />
			<Outlet />
		</Provider>
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
	]);

	return <RouterProvider router={router} />;
}

export default App;
