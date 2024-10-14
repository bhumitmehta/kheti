import React, { useState } from 'react';
import './InputField.css'; // Assuming the CSS is in a separate file

const InputField = ({ label, placeholder, onChange, value, type, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="input-field-container">
      <div className="input-field-element">
        <div className="group">
          <input
            type={type}
            className="input-field"
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className={isFocused || value ? 'label active' : 'label'}>
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default InputField;
