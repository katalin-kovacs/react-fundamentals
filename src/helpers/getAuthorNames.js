export function getAuthorNames(courseAuthors, authorsFromStore) {
	let authNames = [];
	for (let i = 0; i < courseAuthors.length; i++) {
		for (let j = 0; j < authorsFromStore.length; j++) {
			if (authorsFromStore[j].id === courseAuthors[i]) {
				authNames.push(authorsFromStore[j].name);
			}
		}
	}
	return authNames.join(', ');
}
