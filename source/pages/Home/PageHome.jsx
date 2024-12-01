// import React from "react";
import { memo, useEffect } from "react";
import { eventFlow } from "../../modules/events/eventEmitter.js";
import { Card } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";

import { decoderErrors, getData } from "../../firebase/firebaseFunction.js";
import { FB_DB_MUSIC_LISTS, FB_DB_MUSIC_USERS, FB_DB_USERS_SETTINGS } from "../../firebase/firebase.js";

import { setLoadStateML, setResultLoadML } from "../../redux/reducers/musicLists/musicListsSlice.js";
import { setLoadStateMU, setResultLoadMU } from "../../redux/reducers/musicUser/musicUserSlice.js";
import { setLoadStateUD, setUserSettings } from "../../redux/reducers/userData/userDataSlice.js";

import LogoForPage from "./components/LogoForPage/LogoForPage.jsx";
import ListMenu from "./components/ListMenu/ListMenu.jsx";
import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx"
import BodyList from "./components/BodyList/BodyList.jsx";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.jsx";

import "./PageHome.css"

function PageHome() {

    const dispatch = useDispatch();
    const musicLists = useSelector((state) => state.musicLists);
    const musicUser = useSelector((state) => state.musicUser);
    const userData = useSelector((state) => state.userData);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoadStateML({ state: 1, error: null }));
                dispatch(setLoadStateMU({ state: 1, error: null }));
                dispatch(setLoadStateUD({ state: 1, error: null }));
                const [musicListsData, musicUserData, userDData] =
                    await Promise.all([
                        getData(FB_DB_MUSIC_LISTS), // Получаем данные музыкальных списков
                        getData(FB_DB_MUSIC_USERS + "/" + userData.user.uid), // Получаем данные пользователя
                        getData(FB_DB_USERS_SETTINGS + "/" + userData.user.uid), // Получаем настройки пользователя
                    ]);
                dispatch(
                    setResultLoadML({
                        state: 2,
                        error: null,
                        data: musicListsData,
                    })
                );
                dispatch(
                    setResultLoadMU({
                        state: 2,
                        error: null,
                        data: musicUserData,
                    })
                );
                dispatch(setLoadStateUD({ state: 2, error: null }));
                dispatch(setUserSettings(userDData));
            } catch (error) {
                dispatch(
                    setLoadStateML({
                        state: 3,
                        error: decoderErrors(error.code),
                    })
                );
                dispatch(
                    setLoadStateMU({
                        state: 3,
                        error: decoderErrors(error.code),
                    })
                );
                dispatch(
                    setLoadStateUD({
                        state: 3,
                        error: decoderErrors(error.code),
                    })
                );
                console.error("Ошибка при загрузке данных:", error.code);
            }
        };

        if (userData.user.uid) {
            fetchData();
        } else {
            //! ОШИБКА "НЕТ ПОЛЬЗОВАТЕЛЯ"
        }
    }, [dispatch, userData.user]);

    return (
        <main className="page-home__main">
            <div style={{position: "absolute", zIndex: "100"}}>
                <button onClick={() => console.log(userData)}>testUS</button>
                <button onClick={() => console.log(musicUser)}>testMU</button>
                <button onClick={() => console.log(musicLists)}>testML</button>
                <button onClick={() => eventFlow.emit("goPageSignIn")}>
                    singin
                </button>
            </div>
            <Card style={{ padding: "0", height: "100%", width: "100%" }}>
                <div className="page-home__box">
                    <LogoForPage></LogoForPage>
                    <ListMenu
                        albumsList={musicLists.musicAlbums.all}
                    ></ListMenu>
                    <HeaderPanel></HeaderPanel>
                    <BodyList></BodyList>
                    <MusicPlayer></MusicPlayer>
                </div>
            </Card>
        </main>
    );
    
};

export default memo(PageHome);