import React, { useState, useEffect } from "react";
import Title from "../../components/common/Title";
import SubTitle from "../../components/common/SubTitle";
import QuizTitle from "../../components/common/QuizTitle";
import Question from "../../components/common/Question";
import FormRadio from "../../components/common/FormRadio";
import Button from "../../components/common/Button";
import ResultTable from "../../components/common/ResultTable";
import { API_CONSTANTS } from "../../consts";
import axios from "axios";

export default function Quiz(props) {
      const [currentQuiz, setCurrentQuiz] = useState(1);
      const [totalQuiz, setTotalQuiz] = useState(10);
      const [currentQuestion, setQuestion] = useState({ data: {} });
      const [isFinished, setIsFinished] = useState(0);
      const [answers, setAnswers] = useState({});
      const [correctAnswers, setCorrectAnswers] = useState([]);
      const [currentAnswer, setCurrentAnswer] = useState(-1);
      const [result, setResult] = useState(0);
      const [loader, setLoader] = useState(0);

      useEffect(() => {
            /* Generate result if the quiz is over */
            if (isFinished === 1) {
                  generateResult();
            }

            /* Get next question only if the current question is less than total questions */
            if (currentQuiz <= totalQuiz && !isFinished) {
                  let getQuestionAPI = `${API_CONSTANTS.API_URL}${API_CONSTANTS.GET_QUESTION}/${currentQuiz}`;
                  var config = {
                        method: 'get',
                        url: getQuestionAPI,
                  };
                  axios(config)
                        .then((response) => {
                              
                              if (typeof response.data.data !== 'undefined') {
                                    setQuestion(response.data);
                                    setTotalQuiz(response.data.total_questions);
                                    let key = `ques_${currentQuiz}`;

                                    /* Set correct answers to keep track */
                                    setCorrectAnswers({ ...correctAnswers, [key]: response.data.data.in_correct_answer });
                                    getCurrentChecked();
                                    setLoader(0);
                              }
                        })
                        .catch(function (error) {
                              
                        });
            }

      }, [currentQuiz, totalQuiz, isFinished]);

      /**
       * Set the next question by setting the current answer and calling an API.
       */
      function setNextQuestion() {
            if (totalQuiz >= currentQuiz) {
                  let key = `ques_${currentQuiz}`;
                  setAnswers({ ...answers, [key]: currentAnswer });
                  setCurrentAnswer(-1);

                  if (totalQuiz > currentQuiz) {
                        setLoader(1);
                        
                        setCurrentQuiz(currentQuiz + 1);
                  } else {
                        
                        setIsFinished(1);
                  }
                  
            }
      }

      /**
       * Set the previous question by setting the current answer and calling an API.
       */
      function setPrevQuestion() {
            if (currentQuiz > 1) {
                  let key = `ques_${currentQuiz}`;
                  setAnswers({ ...answers, [key]: currentAnswer });
                  setCurrentAnswer(-1);
                  setLoader(1);
                  setCurrentQuiz(currentQuiz - 1);
            }
      }

      /**
       * Set the current answer from the checked option for the current question.
       */
      function getCurrentChecked() {
            if (currentQuiz >= 1 && totalQuiz >= currentQuiz) {
                  setCurrentAnswer(correctAnswers[`ques_${currentQuiz}`]);
            }
      }

      /**
       * Generate the result, show a table and call an API to save data.
       */
      function generateResult() {
            let count = 0;
            for (let i = 1; i <= totalQuiz; i++) {
                  let key = `ques_${i}`;
                  if( answers[key] === correctAnswers[key] ){
                        count++;
                  }
            }
            
            setResult( count );

            let setResultAPI = `${API_CONSTANTS.API_URL}${API_CONSTANTS.SET_RESULT}`;
            var config = {
                  method: 'post',
                  url: setResultAPI,
                  params:{
                        score: count
                  }
            };
            axios(config)
                  .then((response) => {
                        
                  })
                  .catch(function (error) {
                        
                  });
      }

      return (
            (!isFinished ?
                  <div className="main_quiz">
                        <QuizTitle title="Quiz" currentQuiz={currentQuiz} totalQuiz={currentQuestion.total_questions} />
                        <Question mainTitle={`Select true or false:`} questions={currentQuestion.data.st_question} />
                        <FormRadio id="true" inputType="radio" className="rdo_true" title="True" value={1} name="selected_answer" checked={currentAnswer === 1} onChange={() => setCurrentAnswer(1)} />
                        <FormRadio id="false" inputType="radio" className="rdo_false" title="False" value={0} name="selected_answer" checked={currentAnswer === 0} onChange={() => setCurrentAnswer(0)} />
                        <div className="action-btn">
                              {(currentQuiz > 1) ? <Button title="Previous Question" className={"btn_prev"} onClick={setPrevQuestion} isDisabled={loader ? 1 : 0} /> : ''}
                              {(currentQuiz < totalQuiz) ? <Button title="Next Question" className={"btn_next"} onClick={setNextQuestion} isDisabled={loader ? 1 : 0} /> : <Button title="Submit" className={"btn_result"} onClick={setNextQuestion} />}
                        </div>
                  </div> : <div className="main_quiz">
                        <Title title="Results" />
                        <SubTitle title={`Your Score: ${result}/${totalQuiz}`} />
                        <ResultTable totalQuiz={totalQuiz} answers={answers} correctAnswers={correctAnswers}></ResultTable>
                  </div>)
      );

}

