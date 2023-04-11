import React from "react"

const AnswerButton = (props) => {
  const {answerName, answerSurname, answerGender} = props;
  return (
    <button className="answer-button" >
      {answerName} {answerSurname}
    </button>
  )
};

export default AnswerButton;
