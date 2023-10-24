// a helper to format course duration

export default function formatCourseDuration(minutes) {
	let hours = Math.floor(minutes / 60);
	let mins = minutes - hours * 60;
	return hours <= 9
		? `0${hours}:${mins <= 9 ? `0${mins}` : mins}`
		: `${hours}:${mins <= 9 ? `0${mins}` : mins}`;
}
