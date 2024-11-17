// В данном случае мы не используем бандлеры, поэтому в импорте нужно указывать ссылки на веб-ресурсы Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Это конфигурация Firebase, у каждого проекта она своя. Её нужно скопировать из консоли вашего проекта
const firebaseConfig = {
  apiKey: "AIzaSyD4y08rA6vQnPazm6QpqAlIFEquxRMW7HA",
  authDomain: "my-project-jsx-72502.firebaseapp.com",
  projectId: "my-project-jsx-72502",
  storageBucket: "my-project-jsx-72502.firebasestorage.app",
  messagingSenderId: "593778910270",
  appId: "1:593778910270:web:1de92e1a9e515e258c9d6f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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