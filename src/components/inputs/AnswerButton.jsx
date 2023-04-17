import React from "react"
import "./AnswerButton.css"

const AnswerButton = ({name, surname, gender, value, onClick}) => {
  return (
    <div className="answer-button-container">
      <button value={value} onClick={onClick} className={`answer-button button-${gender}`}>
        {name} {surname}
      </button>
    </div>
  )
};

export default AnswerButton;
