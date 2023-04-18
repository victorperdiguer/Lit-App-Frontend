import React from "react";
import "./CircleComponents.css";

const CircleCard = ({ circle, userCircles, handleJoinQuit }) => {
  const isUserMember = userCircles.some((userCircle) => userCircle._id === circle._id);
  return (
    <div className="circle-card">
      <h3>{circle.name}</h3>
      {isUserMember ? (
        <button className="circle-card-button button-quit" onClick={() => handleJoinQuit(circle._id, "quit")}>Quit</button>
      ) : (
        <button className="circle-card-button button-join" onClick={() => handleJoinQuit(circle._id, "join")}>Join</button>
      )}
    </div>
  );
};

export default CircleCard;