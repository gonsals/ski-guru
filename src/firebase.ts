import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCoP938TtXIZngJlbVWFPe45OL-_SF7quk",
    authDomain: "skiguru-ce4a4.firebaseapp.com",
    projectId: "skiguru-ce4a4",
    storageBucket: "skiguru-ce4a4.appspot.com",
    messagingSenderId: "644638437564",
    appId: "1:644638437564:web:071a9f36b7bf21864260b9",
    measurementId: "G-B40QJ02F6C",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
