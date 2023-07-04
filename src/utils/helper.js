export const convertTo24HourFormat = (time) => {
	const hours = time.getHours();
	const minutes = time.getMinutes();
	const period = hours >= 12 ? 'PM' : 'AM';

	let formattedHours = hours % 12;
	formattedHours = formattedHours === 0 ? 12 : formattedHours;

	const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;

	return formattedTime;
};
