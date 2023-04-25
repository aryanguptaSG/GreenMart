import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkZs7t-Oso-mY2KsMOuQK3_9koiKrw2rU",
    authDomain: "greenmart-123.firebaseapp.com",
    databaseURL: "https://greenmart-123-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "greenmart-123",
    storageBucket: "greenmart-123.appspot.com",
    messagingSenderId: "926114960755",
    appId: "1:926114960755:web:47abd11145b5719f0be106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const realDb = getDatabase(app);
export const storage = getStorage(app);