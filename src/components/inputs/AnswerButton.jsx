import React from "react"

const AnswerButton = ({name, surname, gender, value, onClick}) => {
  return (
    <div className="answer-button-container">
      <button value={value} onClick={onClick} className={`answer-button ${gender}`}>
        {name} {surname}
      </button>
    </div>
  )
};

export default AnswerButton;
