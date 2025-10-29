import React from "react";
import ReactDOM from "react-dom/client";
import {Authenticator} from "@aws-amplify/ui-react";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);