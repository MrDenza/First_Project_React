// Второй файл
import React from "react";
//import { Provider } from 'react-redux';
//import { store } from './redux/store'
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4y08rA6vQnPazm6QpqAlIFEquxRMW7HA",
  authDomain: "my-project-jsx-72502.firebaseapp.com",
  projectId: "my-project-jsx-72502",
  storageBucket: "my-project-jsx-72502.firebasestorage.app",
  messagingSenderId: "593778910270",
  appId: "1:593778910270:web:1de92e1a9e515e258c9d6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
        

    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const signupEmailInput = document.getElementById("signupEmail");
    const signupPasswordInput = document.getElementById("signupPassword");
    const signinEmailInput = document.getElementById("signinEmail");
    const signinPasswordInput = document.getElementById("signinPassword");
    const message = document.getElementById("message");

    signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        message.textContent = "Account created successfully!";
    
    } catch (error) {
        message.textContent = error.message;
    }
    });


    signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signinEmailInput.value;
    const password = signinPasswordInput.value;

    try {
    
        await signInWithEmailAndPassword(auth, email, password);
        message.textContent = "Logged in successfully!";

    } catch (error) {
        message.textContent = error.message;
    }
    });
    return (
        //<Provider store={store}>
        //</Provider>
        <div>
                <h1>Firebase Authentication Example</h1>
            <div id="signup">
            <h2>Sign Up</h2>
            <form id="signupForm">
                <label for="signupEmail">Email:</label>
                <input type="email" id="signupEmail" required />
                <label for="signupPassword">Password:</label>
                <input type="password" id="signupPassword" required />
                <button type="submit">Sign Up</button>
            </form>
            </div>
            <div id="signin">
            <h2>Sign In</h2>
            <form id="signinForm">
                <label for="signinEmail">Email:</label>
                <input type="email" id="signinEmail" required />
                <label for="signinPassword">Password:</label>
                <input type="password" id="signinPassword" required />
                <button type="submit">Sign In</button>
            </form>
            </div>
            <div id="message"></div>
        </div>
    );
    
}

export default App;
