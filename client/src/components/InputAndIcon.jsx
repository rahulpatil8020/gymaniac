import React from "react";
import FlexBetween from "./FlexBetween";
import { InputBase } from "@mui/material";

const InputAndIcon = ({
  backgroundColor,
  iconButton,
  placeholder,
  fullWidth,
  onChange,
  value,
  onKeyDown,
}) => {
  return (
    <FlexBetween
      backgroundColor={backgroundColor}
      borderRadius="9px"
      padding="0.1rem 1rem"
    >
      <InputBase
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
      {iconButton}
    </FlexBetween>
  );
};

export default InputAndIcon;
