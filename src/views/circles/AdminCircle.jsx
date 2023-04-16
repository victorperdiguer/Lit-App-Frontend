import React, { useEffect, useState } from "react";
import questionService from "../../services/questionService";
import circleService from "../../services/circleService";

const AdminCircle = () => {
  const [adminCircles, setAdminCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionFilter, setQuestionFilter] = useState("pending");

  // Fetch the circles that the user is an admin of
  const getCircles = async () => {
    try {
      const response = await circleService.getMyCirclesAdmin();
      setAdminCircles(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCircles();
  }, []);

  // Fetch questions for the selected circle based on the selected filter
  const fetchQuestions = async () => {
    if (selectedCircle) {
      try {
        const response = await questionService.getQuestionsByCircleAndStatus(
          selectedCircle,
          questionFilter
        );
        setQuestions(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedCircle, questionFilter]);

  // Render a list of admin circles, allowing the user to select a circle
  const renderAdminCircles = () => {
    return (
      <select
        value={selectedCircle}
        onChange={(e) => setSelectedCircle(e.target.value)}
      >
        <option value="" disabled>
          Select a circle
        </option>
        {adminCircles.map((circle) => (
          <option key={circle._id} value={circle._id}>
            {circle.name}
          </option>
        ))}
      </select>
    );
  };

  // Render a list of questions for the selected circle
  const renderQuestions = () => {
    return questions.map((question) => (
      <div key={question._id}>
        <p>{question.text}</p>
        {questionFilter !== "approved" && (
          <button onClick={() => handleApproveQuestion(question._id)}>
            Approve
          </button>
        )}
        {questionFilter !== "rejected" && (
          <button onClick={() => handleRejectQuestion(question._id)}>
            Reject
          </button>
        )}
      </div>
    ));
  };

  const handleApproveQuestion = (questionId) => {
    // Approve question using questionService.validateQuestion
    // Update the questions state after approving the question
  };

  const handleRejectQuestion = (questionId) => {
    // Reject question using questionService.validateQuestion
    // Update the questions state after rejecting the question
  };

  return (
    <div>
      <h2>Admin Circle Management</h2>
      {renderAdminCircles()}
      <select
        value={questionFilter}
        onChange={(e) => setQuestionFilter(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      {renderQuestions()}
    </div>
  );
};

export default AdminCircle;