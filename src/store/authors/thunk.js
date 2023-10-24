import { addNewAuthorService } from '../../services';
import { saveNewAuthor } from '../authors/actionCreators';

export const thunkSaveNewAuthor = (newAuthor) => {
	return async (dispatch) => {
		let data = await addNewAuthorService(newAuthor);

		if (data.successful) {
			dispatch(saveNewAuthor(data.result));
		}
	};
};
