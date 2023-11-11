import React from "react";

const InputFieldLabel = ({ htmlFor, labelText }) => {
  return (
    <label htmlFor style={{ marginBottom: "8px" }}>
      {labelText}
    </label>
  );
};

export default InputFieldLabel;
