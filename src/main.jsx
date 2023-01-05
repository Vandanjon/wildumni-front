import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserExport from "./assets/contexts/UserContext";

import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserExport.ContextProvider>
            <App />
        </UserExport.ContextProvider>
    </React.StrictMode>
);
