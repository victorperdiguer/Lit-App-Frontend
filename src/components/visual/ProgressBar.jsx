import React from "react"
import "./ProgressBar.css";

const ProgressBar = ({steps}) => {
  let progress = [];
  for (let i = 0; i<10; i++) {
    i < steps ? progress.push(1) : progress.push(0);
  }
  return (
    <div className="progress-bar">
      {progress.map((step, i) => {
        return (
          step === 1 ? <div key={`step${i}`} className="progress-step-fill"></div> : <div key={`step${i}`} className="progress-step-empty"></div>
        )
      })}
    </div>
  )
};

export default ProgressBar;
