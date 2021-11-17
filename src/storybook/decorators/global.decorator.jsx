import React from "react";
import { MemoryRouter } from "react-router-dom";

import "../../normalize.scss";

const GlobalDecorator = ({ children }) => (
  <MemoryRouter initialEntries={["/"]}>
    <div>{children}</div>
  </MemoryRouter>
);

export default GlobalDecorator;
