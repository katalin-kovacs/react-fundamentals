// a helper to get current date in the correct format

export function getCurrentDate() {
	let today = new Date();
	let date = `${today.getDate()}/${
		today.getMonth() + 1
	}/${today.getFullYear()}`;
	return date;
}
