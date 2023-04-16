import React from "react";

const CircleForm = ({handleSubmit, circleName, setCircleName}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="circleName">Circle Name</label>
      <input
        type="text"
        id="circleName"
        name="circleName"
        value={circleName}
        onChange={(e) => setCircleName(e.target.value)}
        required
      />
      <button type="submit">Create Circle</button>
    </form>
  );
};

export default CircleForm;