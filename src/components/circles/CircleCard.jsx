import React from "react";

const CircleCard = ({ circle, userCircles, handleJoinQuit }) => {
  const isUserMember = userCircles.some((userCircle) => userCircle._id === circle._id);
  return (
    <div className="circle-card">
      <h3>{circle.name}</h3>
      <p>Admins: {circle.admins.length}</p>
      {isUserMember ? (
        <button onClick={() => handleJoinQuit(circle._id, "quit")}>Quit</button>
      ) : (
        <button onClick={() => handleJoinQuit(circle._id, "join")}>Join</button>
      )}
    </div>
  );
};

export default CircleCard;