import React from "react";
import PropTypes from "prop-types";
import '../../../App.css';
import './style.scss';

const Title = ({ title, ...attrs }) => {
  
  return (
	<div className={`title`}>
		<h2>{title} </h2>
	</div>
  )
};

Title.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
};

export default Title;
