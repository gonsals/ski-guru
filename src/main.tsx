import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/main.css";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
