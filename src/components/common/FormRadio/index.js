import React from "react";
import '../../../App.css'
import './style.scss';

export default function FormRadio ({id, title, required, value, className, defaultValue, inputType, isDisabled, isReadonly, onChange, onKeyUp, onKeyDown,name, checked, defaultChecked }) {
	return (
	<div className="form-field radio">
		<input className="formControl"
			value={(value ? value : defaultValue)}
			type={inputType}
			disabled={isDisabled}
			readOnly={isReadonly}
			onChange={onChange}
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
			name={name}
			checked={checked}
			defaultChecked ={defaultChecked }
			id={id}
			required={required}
			className={className}
		/>
		<label for={id}>
			{title}
		</label>
	</div>
	);
}