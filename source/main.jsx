// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
//import './normalize.css'
import "./main.css";
import App from "./App.jsx";
//import reportWebVitals from './reportWebVitals';

(function init100vh() {
    function setHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setHeight();
    window.addEventListener("resize", setHeight);
})();

createRoot(document.getElementById("root")).render(
    //<StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    //</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ---->>> reportWebVitals();
