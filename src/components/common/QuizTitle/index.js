import React from "react";
import PropTypes from "prop-types";
import '../../../App.css';
import './style.scss';

const QuizTitle = ({ title, currentQuiz, totalQuiz, ...attrs }) => {
  
  return (
	<div className="quiz-title">
		<h2>{title} {currentQuiz} of {totalQuiz}</h2>
	</div>
  )
};

QuizTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
   currentQuiz: PropTypes.number
};

export default QuizTitle;
