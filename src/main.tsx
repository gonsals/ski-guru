import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import AppRouter from "./router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCoP938TtXIZngJlbVWFPe45OL-_SF7quk",
    authDomain: "skiguru-ce4a4.firebaseapp.com",
    projectId: "skiguru-ce4a4",
    storageBucket: "skiguru-ce4a4.appspot.com",
    messagingSenderId: "644638437564",
    appId: "1:644638437564:web:d25e7512fbf7d18b4260b9",
    measurementId: "G-JZ53L4875N",
};

initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
    document.getElementById("root")
);
