// import React from "react";
import { memo, useCallback, useEffect, useState, useRef } from "react";
import { eventFlow } from "../../../../modules/events/eventEmitter";
import { ScrollArea } from "@radix-ui/themes";

import { useLocation, useParams } from "react-router-dom";
import { PAGE_HOME, PAGE_URI_RADIO } from "../../../../routes/PagesRouter";

import { useDispatch, useSelector } from "react-redux";
import { addNewTrack, delTrackMU } from "../../../../redux/reducers/musicUser/musicUserSlice";
import { setCurrentTrack } from "../../../../redux/reducers/appCache/appCacheSlice";

import { updateData } from "../../../../firebase/firebaseFunction";
import { FB_DB_MUSIC_USERS } from "../../../../firebase/firebase";

import CollectionList from "../CollectionList/CollectionList";
import TrackList from "../TrackList/TrackList";
import "./BodyList.css";

function BodyList() {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const accessSendData = useRef(null);
    const isCollection = location.pathname === PAGE_HOME;
    const musicUser = useSelector((state) => state.musicUser);
    const userUid = useSelector((state) => state.userData.user.uid);
    const musicLists = useSelector((state) => state.musicLists);
    const idPlayTrack = useSelector((state) => state.appCache.idPlayTrack);
    const [prevListIdTrack, setPrevListIdTrack] = useState(musicUser.listIdTrack);

    const handleAddTrack = useCallback(
        (newElem) => {
            accessSendData.current = true;
            dispatch(addNewTrack(newElem));
        },
        [dispatch]
    );

    const handleDelTrack = useCallback(
        (id) => {
            accessSendData.current = true;
            dispatch(delTrackMU(id));
        },
        [dispatch]
    );

    const handlePlayTrack = useCallback(
        (track) => {
            dispatch(setCurrentTrack(track));
        },
        [dispatch]
    );

    useEffect(() => {
        if (prevListIdTrack.length !== musicUser.listIdTrack.length && accessSendData.current === true) {
            updateData(`${FB_DB_MUSIC_USERS}/${userUid}/musicList`, musicUser.userMusicList);
            accessSendData.current = false;
        }
        setPrevListIdTrack(musicUser.listIdTrack);
    }, [musicUser.listIdTrack, prevListIdTrack, accessSendData, musicUser.userMusicList, userUid]);

    useEffect(() => {
        eventFlow.on("addTrack", handleAddTrack);
        eventFlow.on("delTrack", handleDelTrack);
        eventFlow.on("playTrack", handlePlayTrack);
        return () => {
            eventFlow.removeListener("addTrack", handleAddTrack);
            eventFlow.removeListener("delTrack", handleDelTrack);
            eventFlow.removeListener("playTrack", handlePlayTrack);
        };
    }, [handleAddTrack, handleDelTrack, handlePlayTrack]);

    const dataList = (uri = location.pathname, id = params.id) => {
        if (id) {
            if (id === "my") {
                return musicUser.userMusicList || {};
            }
            return (
                musicLists.musicAlbums.find((elem) => {
                    return elem.idAlbum === +id;
                }) || {}
            );
        }
        switch (uri) {
            case PAGE_HOME:
                return musicLists.listAlbums || {};
            case PAGE_URI_RADIO:
                return musicLists.radioList[0] || {};
            default:
                return {};
        }
    };

    return (
        <div className="body-list__box delay-m__type-2">
            <ScrollArea type="auto" scrollbars="vertical">
                {isCollection ? (
                    <CollectionList dataList={dataList()} />
                ) : (
                    <TrackList
                        isEdit={params.id === "my"}
                        dataList={dataList()}
                        likeTrackList={musicUser.listIdTrack}
                        modeview={params.modeview}
                        pageView={params.page}
                        idPlayTrack={idPlayTrack}
                    />
                )}
            </ScrollArea>
        </div>
    );
}

export default memo(BodyList);
