import React from "react";
import "../../views/circles/Circle.css";
import "./CircleComponents.css";

const MemberCard = ({ member, handleKickMember }) => {
  return (
    <div className="admin-review-members">
      <p>{member.name} {member.surname}</p>
      <button className="button-reject" onClick={() => handleKickMember(member._id)}>
        Kick
      </button>
    </div>
  );
};

export default MemberCard;