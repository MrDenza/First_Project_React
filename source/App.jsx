// import React from "react";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Theme, Container, ThemePanel } from "@radix-ui/themes";
import PagesRouter from "./routes/PagesRouter.jsx";

import { useDispatch, useSelector } from "react-redux";
import { setUserSettings } from "./redux/reducers/userData/userDataSlice.js";

import { fonStyle } from "./elements/fonStyle.jsx";
import "@radix-ui/themes/styles.css";
import "./App.css";

function App() {
    const dispatch = useDispatch();
    const userSettings = useSelector((state) => state.userData.userSettings);
    const [isLoadSettings, setIsLoadSettings] = useState(false);

    useEffect(() => {
        setIsLoadSettings(true);
        const cacheSettings = localStorage.getItem("cacheSettings");
        if (cacheSettings) {
            dispatch(setUserSettings(JSON.parse(cacheSettings)));
        }
    }, [dispatch]);

    if (!isLoadSettings) return null;

    return (
        <Theme accentColor={userSettings.colorTheme} appearance={userSettings.appearance} grayColor="slate" panelBackground="translucent">
            {fonStyle}
            <Container size="4" maxWidth="1920px" height="100vh">
                <PagesRouter />
                {/* <ThemePanel /> */}
            </Container>
        </Theme>
    );
}

export default App;
