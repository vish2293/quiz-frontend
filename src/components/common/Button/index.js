import React from "react";
import '../../../App.css'
import './style.scss';

export default function Button ({id, className, isDisabled, isReadonly, buttonType, onClick, value, defaultValue,title}) {

	return (
		<div className="button">
			<button
				id={id}
				value={(value ? value : defaultValue)}
				type={buttonType}
				disabled={isDisabled}
				readOnly={isReadonly}
				className={className}
				onClick={onClick}
				value={(value ? value : defaultValue)}
			>
				{title}
			</button>
		</div>
	);
}
