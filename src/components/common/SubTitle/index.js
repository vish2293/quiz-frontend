import React from "react";
import PropTypes from "prop-types";
import '../../../App.css';
import './style.scss';

const SubTitle = ({ title, ...attrs }) => {
  
  return (
	<div className={`sub-title`}>
		<h2>{title} </h2>
	</div>
  )
};

SubTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
};

export default SubTitle;
