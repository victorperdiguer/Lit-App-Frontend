import React, { useEffect, useState } from "react";
import questionService from "../../services/questionService";
import circleService from "../../services/circleService";
import CircleQuestionCard from "../../components/circles/CircleQuestionCard";
import MemberCard from "../../components/circles/MemberCard";
import "./Circle.css";

const AdminCircle = () => {
  const [adminCircles, setAdminCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [members, setMembers] = useState([]);
  const [questionFilter, setQuestionFilter] = useState("pending");
  const [view, setView] = useState("");

  // Fetch the circles that the user is an admin of
  const getCircles = async () => {
    try {
      const response = await circleService.getMyCirclesAdmin();
      setAdminCircles(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    if (selectedCircle) {
      try {
        const response = await circleService.getCircleUsers(selectedCircle);
        setMembers(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCircles();
  }, []);

  useEffect(() => {
    if (view === "members") {
      getMembers();
    }
  }, [selectedCircle, view]);

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
        className="admin-circle-select"
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
      <CircleQuestionCard
        key={question._id}
        question={question}
        questionFilter={questionFilter}
        handleApproveQuestion={handleApproveQuestion}
        handleRejectQuestion={handleRejectQuestion}
      />
    ));
  };

  // Render a list of members for the selected circle
  const renderMembers = () => {
    return members.map((member) => (
      <MemberCard key={member._id} member={member} handleKick={handleKickMember} />
    ));
  };

  const handleKickMember = (memberId) => {
    // Kick member using circleService
    // Update the members state after kicking the member
  };

  const handleApproveQuestion = async (questionId) => {
    // Approve question using questionService.validateQuestion
    try {
      await questionService.validateQuestion(questionId, {newStatus: 'approved'});
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectQuestion = async (questionId) => {
    // Reject question using questionService.validateQuestion
    try {
      await questionService.validateQuestion(questionId, {newStatus: 'rejected'});
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Circle Management</h2>
      {renderAdminCircles()}
      {selectedCircle && (
        <div className="admin-circle-container">
          <button className="admin-circle-button" onClick={() => setView("questions")}>Questions</button>
          <button className="admin-circle-button" onClick={() => setView("members")}>Members</button>
        </div>
      )}
      {view === "questions" && (
        <div className="admin-questions-view">
          <select
            className="admin-circle-select"
            value={questionFilter}
            onChange={(e) => setQuestionFilter(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {renderQuestions()}
        </div>
      )}
      {view === "members" && renderMembers()}
    </div>
  );
};

export default AdminCircle;