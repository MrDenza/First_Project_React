// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PagesRouter from "./routes/PagesRouter.jsx";

import "./App.css";
import "@radix-ui/themes/styles.css";
// eslint-disable-next-line no-unused-vars
import { Theme, Container, ThemePanel } from "@radix-ui/themes";
import { fonStyle } from "./elements/fonStyle.jsx";
import { setUserSettings } from "./redux/reducers/userData/userDataSlice.js";
import { useEffect, useState } from "react";

function App() {
    const dispatch = useDispatch();
    const userSettings = useSelector((state) => state.userData.userSettings);
    const [isLoadSettings, setIsLoadSettings] = useState(false);
    //! УДАЛИТЬ
    const musicLists = useSelector((state) => state.musicLists);
    const musicUser = useSelector((state) => state.musicUser);
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        setIsLoadSettings(true);
        const cacheSettings = localStorage.getItem("cacheSettings");
        if (cacheSettings) {
            dispatch(setUserSettings(JSON.parse(cacheSettings)));
        }
    }, [dispatch]); // Зависимость от dispatch

    if (!isLoadSettings) return null;

    return (
        <Theme accentColor={userSettings.colorTheme} appearance={userSettings.appearance} grayColor="slate" panelBackground="translucent">
            {fonStyle}
            <Container size="4" maxWidth="1920px" height="100vh">
                <div style={{ position: "absolute", zIndex: "100" }}>
                    <button onClick={() => console.log(userData)}>testUS</button>
                    <button onClick={() => console.log(musicUser)}>testMU</button>
                    <button onClick={() => console.log(musicLists)}>testML</button>
                </div>
                <PagesRouter />
                {/* <ThemePanel /> */}
            </Container>
        </Theme>
    );
}

export default App;
