import React from "react"

const QuestionCard = (props) => {
  const { question } = props;
  return (
    <div className="question-card">
      <h3>{question}</h3>
      <button></button>
    </div>
  )
};

export default QuestionCard;
