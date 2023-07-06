# Habit Tracker

Habit Tracker is a web application that allows users to track their habits on a daily basis. Users can add multiple habits, mark them as done or not done for each day, and view their habit history for the past seven days.

## Features

- Add multiple habits to track, such as reading a book or going to the gym.
- Track each habit every day and choose from three statuses: Done, Not Done, or None.
- View all current habits in a user-friendly interface.
- View a weekly summary of each habit, showing the status for each of the previous six days.
- Update the status of habits for today or any previous day.
- Toggle between the three statuses for each habit.

## Folder Structure

The project follows the following folder structure:

- `node_modules`: Contains the project's dependencies.
- `public`: Contains the public assets and the main HTML file.
- `src`: Contains the source code of the application.
  - `components`: Contains React components used in the application.
    - `ErrorPage.jsx`: Renders an error page when an error occurs.
    - `HabitCard.jsx`: Renders a single habit card with its details.
    - `Habits.jsx`: Renders the list of all habits.
    - `WeeklyHabits.jsx`: Renders the weekly view of habits.
    - `HabitForm.jsx`: Renders a form to add new habits.
    - `Navbar.jsx`: Renders the navigation bar.
  - `utils`: Contains utility files used in the application.
    - `store.js`: Manages the Redux store configuration.
    - `habitSlice.js`: Contains Redux slice for managing habits.
- `App.js`: The root component of the application.
- `index.css`: Contains global CSS styles.
- `index.js`: The entry point of the application.
- `package-lock.json`: Auto-generated file for package dependencies.
- `package.json`: Contains project metadata and dependencies.

## Technologies Used

- React.js: JavaScript library for building user interfaces.
- Redux: State management library for JavaScript applications.

## Libraries and Hooks

- [React Router](https://reactrouter.com/): Library for routing in React applications.
- [Redux Toolkit](https://redux-toolkit.js.org/): Official package for efficient Redux development.
- [React Redux](https://react-redux.js.org/): Official React bindings for Redux.
- [date-fns](https://date-fns.org/): Library for date manipulation in JavaScript.
- [react-datepicker](https://github.com/Hacker0x01/react-datepicker): Customizable date picker component for React applications.
- [uuid](https://github.com/uuidjs/uuid): Library for generating unique IDs.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): DOM bindings for React Router.

## Screenshots

![Habit Tracker Home](![habit-tracker-2](https://github.com/arijitmandal10/Habit-Tracker-React/assets/114182784/83ac6648-c9e4-4e0f-ad22-617c5270373d)
)
*Home screen of Habit Tracker, showing the list of current habits.*

![Habit Tracker Weekly View]![habit-tracker-3](https://github.com/arijitmandal10/Habit-Tracker-React/assets/114182784/ea76e5d6-ed29-499a-8156-f2b70592bdf0)
)
*Weekly view of Habit Tracker, displaying the status of habits for the past seven days.*

![Habit Tracker Add Habit Form](![habit-tracker 1](https://github.com/arijitmandal10/Habit-Tracker-React/assets/114182784/550ca0f6-812c-4b7b-a78e-58d41d6cf32e)
)
*Add Habit form of Habit Tracker, allowing users to add a new habit.*

## Getting Started

To run the project locally, follow these steps:

1. Make sure you have Node.js installed on your machine.
2. Clone this repository to your local machine or download the source code.
3. Open a terminal or command prompt and navigate to the project directory.
4. Run `npm install` to install the dependencies.
5. Afterthe installation is complete, run `npm start` to start the development server.
6. Open `http://localhost:3000` in your web browser to view the application.

## Contributing

Contributions to the Habit Tracker project are welcome! If you find any bugs or have suggestions for improvement, please submit an issue or a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

