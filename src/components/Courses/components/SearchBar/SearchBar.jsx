import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

function SearchBar(props) {
	return (
		<form className={props.className} onSubmit={props.onSubmit}>
			<Input
				className='form-control'
				type='search'
				id='search'
				inputPlaceholder={props.inputPlaceholder}
				inputValue={props.inputValue}
				onChange={props.onChange}
			/>
			<Button
				className='btn btn-primary mx-2'
				type='submit'
				buttonText='Search'
			/>
		</form>
	);
}

SearchBar.propTypes = {
	className: PropTypes.string,
	inputValue: PropTypes.string,
	onSubmit: PropTypes.func,
	inputPlaceholder: PropTypes.string,
};

export default SearchBar;
