import { useState, useRef } from "react";

function Slider({ getSliderValue }) {
  const [value, setValue] = useState(4);
  const lengthRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (lengthRef.current) {
      lengthRef.current.value = e.target.value;
    }
    getSliderValue(e.target.value);
  };

  const setPasswordLength = (e) => {
    if (e.key === "Enter") {
      getSliderValue(lengthRef.current.value);
    }
  };

  return (
    <div className="slider-container">
      <label htmlFor="length">Length</label>
      <div className="slider-inputs">
        <input
          onKeyPress={setPasswordLength}
          type="number"
          name="length"
          defaultValue={value}
          ref={lengthRef}
        />
        <input
          type="range"
          name="range"
          min="4"
          max="32"
          defaultValue={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Slider;
