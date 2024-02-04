import React, { useEffect } from "react";
import { sendMsgToOpenAI } from "./openai";

const Atlas = () => {
  let suggestions;
  useEffect(() => {
    suggestions = sendMsgToOpenAI("Give me a good workout plan");
  }, []);
  return <div>{suggestions}</div>;
};

export default Atlas;
