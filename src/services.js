export async function loginAuth(body) {
	const response = await fetch('http://localhost:3000/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	const data = await response.json();

	if (!data.successful) {
		throw new Error(data.result);
	} else {
		return data;
	}
}

export async function getAllCourses() {
	const response = await fetch('http://localhost:3000/courses/all', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await response.json();

	if (!data.successful) {
		throw new Error(data.result);
	} else {
		return data;
	}
}

export async function getAllAuthors() {
	const response = await fetch('http://localhost:3000/authors/all', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await response.json();

	if (!data.successful) {
		throw new Error(data.result);
	} else {
		return data;
	}
}

export async function logoutService(userToken) {
	const response = await fetch('http://localhost:3000/logout', {
		method: 'DELETE',
		headers: {
			Authorization: userToken,
			'Content-Type': 'application/json',
		},
	});

	if (response.statusText !== 'OK') {
		throw new Error('Something went wrong :(');
	}
}

export async function getCurrentUser() {
	const response = await fetch('http://localhost:3000/users/me', {
		method: 'GET',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	if (data.error) {
		throw new Error(data.message);
	} else {
		return data;
	}
}

export async function deleteCourseService(id) {
	const response = await fetch(`http://localhost:3000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	if (data.error) {
		throw new Error(data.message);
	} else {
		return data;
	}
}

export async function addNewAuthorService(newAuthor) {
	const response = await fetch('http://localhost:3000/authors/add', {
		method: 'POST',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newAuthor),
	});
	const data = await response.json();

	if (!data.successful) {
		throw new Error(data.message);
	} else {
		return data;
	}
}

export async function addNewCourseService(newCourse) {
	const response = await fetch('http://localhost:3000/courses/add', {
		method: 'POST',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newCourse),
	});
	const data = await response.json();

	if (data.error) {
		throw new Error(data.message);
	} else {
		return data;
	}
}

export async function updateCourseService(courseData) {
	const response = await fetch(
		`http://localhost:3000/courses/${courseData.id}`,
		{
			method: 'PUT',
			headers: {
				Authorization: localStorage.getItem('userToken'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(courseData),
		}
	);
	const data = await response.json();

	return data;
}
