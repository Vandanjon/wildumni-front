import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConnectedUserContextProvider } from "./contexts/connectedUserContext";

import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ConnectedUserContextProvider>
            <App />
        </ConnectedUserContextProvider>
    </React.StrictMode>
);
