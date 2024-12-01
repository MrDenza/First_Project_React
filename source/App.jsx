// Второй файл
// import React from "react";

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { BrowserRouter } from 'react-router-dom';
import PagesRouter from './routes/PagesRouter.jsx';

import './App.css';
import "@radix-ui/themes/styles.css";
// eslint-disable-next-line no-unused-vars
import { Theme, Container, ThemePanel } from "@radix-ui/themes";
import { fonStyle } from "./elements/fonStyle.jsx"

function App() {

    return (

        <BrowserRouter>
            <Provider store={store}>
                <Theme accentColor="amber" grayColor="mauve" appearance="dark">
                    {fonStyle}
                     <Container size="4"  maxWidth="1920px"> {/*mx="30px" */}
                        <PagesRouter />
                        {/* <ThemePanel /> */}
                    </Container>
                </Theme>
            </Provider>
        </BrowserRouter>

    );

}

export default App;
