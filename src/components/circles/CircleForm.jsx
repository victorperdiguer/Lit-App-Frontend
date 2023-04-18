import React from "react";

const CircleForm = ({handleSubmit, circleName, setCircleName}) => {
  return (
    <form onSubmit={handleSubmit} className="circle-form">
      <input
        type="text"
        id="circleName"
        name="circleName"
        value={circleName}
        onChange={(e) => setCircleName(e.target.value)}
        placeholder="Name of the circle"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CircleForm;