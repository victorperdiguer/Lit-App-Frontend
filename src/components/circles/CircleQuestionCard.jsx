import React from "react";
import "../../views/circles/Circle.css";
import "./CircleComponents.css";

const CircleQuestionCard = ({ question, questionFilter, handleApproveQuestion, handleRejectQuestion }) => {
  return (
    <div className="admin-review-questions">
      <p>{question.question}</p>
      <div>
      {questionFilter !== "approved" && (
        <button className="button-approve" onClick={() => handleApproveQuestion(question._id)}>
          Approve
        </button>
      )}
      {questionFilter !== "rejected" && (
        <button className="button-reject" onClick={() => handleRejectQuestion(question._id)}>
          Reject
        </button>
      )}
    </div>
    </div>
  );
};

export default CircleQuestionCard;