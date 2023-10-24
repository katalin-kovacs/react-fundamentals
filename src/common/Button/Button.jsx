import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
	return (
		<button
			value={props.value}
			type={props.type}
			onClick={props.onClick}
			className={props.className}
		>
			{props.buttonText}
		</button>
	);
}

Button.propTypes = {
	value: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	buttonText: PropTypes.string,
};

export default Button;
