import React, { useState } from "react";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        />
        {type === "password" && (
          <button type="button" onClick={toggleShowPassword}>
            Show pass
          </button>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};

export default TextField;
