// import React from "react";
import { memo, useEffect } from "react";

import { Card } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";

import { decoderErrors, getData } from "../../firebase/firebaseFunction.js";
import { FB_DB_MUSIC_LISTS, FB_DB_MUSIC_USERS, FB_DB_USERS_DATA } from "../../firebase/firebase.js";

import { setLoadStateML, setResultLoadML } from "../../redux/reducers/musicLists/musicListsSlice.js";
import { setLoadStateMU, setResultLoadMU } from "../../redux/reducers/musicUser/musicUserSlice.js";
import { setLoadStateUD, setUserSettings } from "../../redux/reducers/userData/userDataSlice.js";

import LogoForPage from "./components/LogoForPage/LogoForPage.jsx";
import ListMenu from "./components/ListMenu/ListMenu.jsx";
import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx";
import BodyList from "./components/BodyList/BodyList.jsx";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.jsx";

import "./PageHome.css";
import { useLocation, useParams } from "react-router-dom";

function PageHome() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams(); //id, modeview, filter

    const musicLists = useSelector((state) => state.musicLists.listAlbums);
    const userInfo = useSelector((state) => state.userData.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoadStateML({ state: 1, error: null }));
                dispatch(setLoadStateMU({ state: 1, error: null }));
                dispatch(setLoadStateUD({ state: 1, error: null }));
                const [musicListsData, musicUserData, userDData] = await Promise.all([
                    getData(FB_DB_MUSIC_LISTS),
                    getData(FB_DB_MUSIC_USERS + "/" + userInfo.uid),
                    getData(FB_DB_USERS_DATA + "/" + userInfo.uid),
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
                localStorage.setItem("cacheSettings", JSON.stringify(userDData));
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
                ///console.error("Ошибка при загрузке данных:", error.code);
            }
        };

        if (userInfo.uid) {
            fetchData();
        } else {
            //! ОШИБКА "НЕТ ПОЛЬЗОВАТЕЛЯ"
        }
    }, [dispatch, userInfo]);

    return (
        <main className="page-home__main">
            <Card style={{ padding: "0", height: "100%", width: "100%" }}>
                <div className="page-home__box">
                    <LogoForPage />
                    <HeaderPanel userName={userInfo.email.split("@")[0]} />
                    <ListMenu listAlbums={musicLists} selectBtn={params.id || location.pathname} />
                    <BodyList />
                    <MusicPlayer />
                </div>
            </Card>
        </main>
    );
}

export default memo(PageHome);
