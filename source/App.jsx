// Второй файл
import React from "react";

import { Provider } from 'react-redux';
import { store } from './redux/store'

import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './routes/PagesRouter.jsx';

import './App.css';
import "@radix-ui/themes/styles.css";
import { Theme, Container, ThemePanel } from "@radix-ui/themes";
import { fonStyle } from "./components/elements/fonStyle.jsx"

//import { withBackground } from "./components/with/withBackground.jsx"
//const DoubleButtonWithCB = withBackground(DoubleButton);

//import { initializeApp } from "firebase/app"; // ! импортировать только нужные библиотеки https://firebase.google.com/docs/web/setup#available-libraries
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//const FBC = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG); // Firebase configuration
// Initialize Firebase
//const app = initializeApp(FBC);
//const auth = getAuth();

function App() {

    return (

        <BrowserRouter>
            <Provider store={store}>
                <Theme accentColor="amber" grayColor="mauve" appearance="dark">
                    {fonStyle}
                    <Container size="4" mx="30px" maxWidth="1860px">
                        <PagesRouter />
                        {/* <ThemePanel /> */}
                    </Container>
                </Theme>
            </Provider>
        </BrowserRouter>
    );

}

export default App;
