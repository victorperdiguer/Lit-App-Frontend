import React from "react"

const GenderSelect = ({onChange}) => {
  return (
    <div>
      <label>
        <input className="gender-male-button"
          name="gender"
          type="radio"
          value="male"
          onChange={onChange}
        />
        Male
      </label>
      <label>
        <input className="gender-female-button"
          name="gender"
          type="radio"
          value="female"
          onChange={onChange}
        />
        Female
      </label>
      <label>
        <input className="gender-other-button"
          name="gender"
          type="radio"
          value="other"
          onChange={onChange}
        />
        Other
      </label>
    </div>
  )
};

export default GenderSelect;
