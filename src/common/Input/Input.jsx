import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<>
			<label className={props.labelClassName} htmlFor={props.id}>
				{props.labelText}
				{props.labelExtras}
			</label>
			<input
				className={props.className}
				type={props.type}
				id={props.id}
				placeholder={props.inputPlaceholder}
				value={props.inputValue}
				onChange={props.onChange}
				minLength={props.inputMinLength}
				min={props.min}
				required={props.required}
			></input>
		</>
	);
}

Input.propTypes = {
	className: PropTypes.string,
	htmlFor: PropTypes.string,
	labelText: PropTypes.string,
	labelExtras: PropTypes.object,
	labelClassName: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	minLength: PropTypes.string,
	min: PropTypes.number,
	required: PropTypes.bool,
};

export default Input;
