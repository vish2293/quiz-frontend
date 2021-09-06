import React from "react";
import PropTypes from "prop-types";
import '../../../App.css';
import './style.scss';

const Question = ({ questions, mainTitle, ...attrs }) => {
  return (
    <div className="quiz-title">
      <h4>{mainTitle}</h4>
      <p>{questions}</p>
    </div>
  )
};

Question.propTypes = {
  /**
   * The page title.
   */
   mainTitle: PropTypes.string,
  /**
   * The page subtitle.
   */
   questions: PropTypes.string
};

export default Question;
