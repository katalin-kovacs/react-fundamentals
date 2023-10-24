import { SAVE_NEW_AUTHOR, GET_AUTHORS } from './actionTypes';

export const saveNewAuthor = (newAuthor) => ({
	type: SAVE_NEW_AUTHOR,
	payload: newAuthor,
});

export const getAuthors = (authors) => ({
	type: GET_AUTHORS,
	payload: authors,
});
