import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    ReactDOM.render(<App data={data} />, document.getElementById("root"));
  });
