import React from "react";
import PropTypes from "prop-types";
import '../../../App.css';
import './style.scss';

const ResultTable = ({ className, answers, correctAnswers, totalQuiz }) => {
  var result = [];
  for (let i = 1; i <= totalQuiz; i++) {
    let key = `ques_${i}`;
    result.push({ answer: answers[key], correctAnswer: correctAnswers[key] })
  }

  console.log(result);

  return (
    <table className={`result-table ${className}`}>
      <thead>
        <tr>
          <th>Question</th>
          <th>Your Answer</th>
          <th>Correct Answer</th>
        </tr>
      </thead>
      <tbody>
        {result.map((item, index) => {
          return <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.answer === 1 ? 'True' : item.answer === 0 ? 'False' : 'Not Answered'}</td>
            <td>{item.correctAnswer === 1 ? 'True' : item.correctAnswer === 0 ? 'False' : 'Not Answered'}</td>
          </tr>
        })}
      </tbody>
    </table>
  )
};

ResultTable.propTypes = {
  title: PropTypes.string,
};

export default ResultTable;
