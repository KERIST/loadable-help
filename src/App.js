import React from "react";

import LoadablePage from "./pages/loadable.page";

import "./App.scss";

function App({ serverData }) {
  return (
    <div className="App">
      <LoadablePage serverData={serverData} />
    </div>
  );
}

export default App;
