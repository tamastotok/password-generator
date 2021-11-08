import React, { useState, useEffect } from "react";

function CheckBox({ name, getCheckboxStatus }) {
  const [value, setValue] = useState(false);

  const handleChange = () => {
    setValue(!value);
  };

  useEffect(() => {
    getCheckboxStatus(name, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

export default CheckBox;
