import React from "react";
import { Text1Styles } from "./text1.styles";

const Text1 = ({ children }) => {
  const onClick = (e) => {
    e.preventDefault();

    console.log(e.target);
  };

  return <Text1Styles onClick={onClick}>{children}</Text1Styles>;
};

export default Text1;
