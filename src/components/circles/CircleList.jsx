import React from "react";
import CircleCard from "./CircleCard";
import "./CircleComponents.css";

const CircleList = ({filteredCircles, userCircles, handleJoinQuit}) => {
  return (
    <div className="circle-list">
      {filteredCircles.map((circle) => (
        <CircleCard
          key={circle._id}
          circle={circle}
          userCircles={userCircles}
          handleJoinQuit={handleJoinQuit}
        />
      ))}
    </div>
  );
};

export default CircleList;