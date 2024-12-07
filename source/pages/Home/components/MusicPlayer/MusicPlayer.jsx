// import React from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { IconButton, Skeleton, Slider, Text } from "@radix-ui/themes";

import { useDispatch, useSelector } from "react-redux";
import { togglePlay } from "../../../../redux/reducers/appCache/appCacheSlice";

import "./MusicPlayer.css";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const tabIndex = -1;

function MusicPlayer() {
    const dispatch = useDispatch();
    const currentTrack = useSelector((state) => state.appCache.currentTrack);
    const isPlaying = useSelector((state) => state.appCache.isPlaying);
    const [volume, setVolume] = useState(1); // 1 = 100%
    const audioRef = useRef(new Audio());
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.uri;
            audioRef.current.load();
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            setDuration(0);
            if (isPlaying) {
                audioRef.current.play().catch((error) => console.error("Ошибка воспроизведения:", error));
            }
        }
        // eslint-disable-next-line
    }, [currentTrack]); // [isPlaying] не ставить!

    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            if (duration === 0 && audioRef.current.duration) {
                setDuration(audioRef.current.duration);
            }
        }
    }, [duration]);

    const handleLoadedMetadata = useCallback(() => {
        if (audioRef.current.duration) {
            setDuration(audioRef.current.duration);
        }
    }, []);

    const handleTrackEnd = useCallback(() => {
        dispatch(togglePlay());
        setCurrentTime(0);
    }, [dispatch]);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("timeupdate", handleTimeUpdate);
            audioElement.addEventListener("ended", handleTrackEnd);
            audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
            return () => {
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
                audioElement.removeEventListener("ended", handleTrackEnd);
                audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [handleLoadedMetadata, handleTimeUpdate, handleTrackEnd]);

    const handlePlayPause = () => {
        if (currentTrack && Object.keys(currentTrack).length > 0) {
            if (isPlaying) {
                dispatch(togglePlay());
                audioRef.current.pause();
            } else {
                dispatch(togglePlay());
                audioRef.current.play().catch((error) => console.error("Ошибка воспроизведения:", error));
            }
        }
    };

    const handleVolumeChange = (value) => {
        const newVolume = parseFloat(value / 100);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="music-player__container">
            <div className="music-player__box-player">
                <div className="music-player__player">
                    <div className="music-player__left-box">
                        <div className="music-player__img-box">
                            {currentTrack.photo ? (
                                <img className="music-player__img" alt={`Фото трека: ${currentTrack.title}`} src={currentTrack.photo} />
                            ) : (
                                <Skeleton width="100%" height="100%" />
                            )}
                        </div>
                        <IconButton tabIndex={tabIndex} radius="full" size="3" onClick={handlePlayPause} className="music-player__btn-play">
                            {isPlaying ? (
                                <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentcolor"
                                    viewBox="0 0 30 30"
                                    width="20"
                                    height="20"
                                    style={{ marginRight: -2 }}
                                >
                                    <path d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z" />
                                </svg>
                            )}
                        </IconButton>
                    </div>

                    <div className="music-player__center-box">
                        <div className="music-player__info-box cell_text-overflow">
                            <span className="music-player__text">
                                {currentTrack.title && currentTrack.artist
                                    ? `${currentTrack.title} - ${currentTrack.artist}`
                                    : currentTrack.title || currentTrack.artist || ""}
                            </span>
                        </div>
                        <div className="music-player__time-box">
                            <Text size="1" color="gray">
                                {formatTime(currentTime.toFixed(2))}
                            </Text>
                            <Slider
                                className="music-player__time-line"
                                value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                                onValueChange={(value) => {
                                    const newTime = (parseFloat(value) * duration) / 100;
                                    setCurrentTime(newTime);
                                    if (audioRef.current) {
                                        audioRef.current.currentTime = newTime;
                                    }
                                }}
                            />
                            <Text size="1" color="gray">
                                {formatTime(duration ? duration.toFixed(2) : 0)}
                            </Text>
                        </div>
                    </div>

                    <div className="music-player__right-box">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 1.5C8 1.31062 7.893 1.13749 7.72361 1.05279C7.55421 0.968093 7.35151 0.986371 7.2 1.1L3.33333 4H1.5C0.671573 4 0 4.67158 0 5.5V9.5C0 10.3284 0.671573 11 1.5 11H3.33333L7.2 13.9C7.35151 14.0136 7.55421 14.0319 7.72361 13.9472C7.893 13.8625 8 13.6894 8 13.5V1.5ZM3.8 4.9L7 2.5V12.5L3.8 10.1C3.71345 10.0351 3.60819 10 3.5 10H1.5C1.22386 10 1 9.77614 1 9.5V5.5C1 5.22386 1.22386 5 1.5 5H3.5C3.60819 5 3.71345 4.96491 3.8 4.9ZM10.083 5.05577C9.96066 4.87185 9.71235 4.82195 9.52843 4.94432C9.3445 5.06669 9.2946 5.31499 9.41697 5.49892C10.2207 6.70693 10.2207 8.29303 9.41697 9.50104C9.2946 9.68496 9.3445 9.93326 9.52843 10.0556C9.71235 10.178 9.96066 10.1281 10.083 9.94418C11.0653 8.46773 11.0653 6.53222 10.083 5.05577Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <Slider
                            tabIndex={tabIndex}
                            defaultValue={[volume * 100]}
                            variant="soft"
                            color="gray"
                            radius="full"
                            size="2"
                            onValueChange={handleVolumeChange}
                            style={{ width: 80 }}
                        />
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.46968 1.05085C7.64122 1.13475 7.75 1.30904 7.75 1.5V13.5C7.75 13.691 7.64122 13.8653 7.46968 13.9492C7.29813 14.0331 7.09377 14.0119 6.94303 13.8947L3.2213 11H1.5C0.671571 11 0 10.3284 0 9.5V5.5C0 4.67158 0.671573 4 1.5 4H3.2213L6.94303 1.10533C7.09377 0.988085 7.29813 0.966945 7.46968 1.05085ZM6.75 2.52232L3.69983 4.89468C3.61206 4.96294 3.50405 5 3.39286 5H1.5C1.22386 5 1 5.22386 1 5.5V9.5C1 9.77615 1.22386 10 1.5 10H3.39286C3.50405 10 3.61206 10.0371 3.69983 10.1053L6.75 12.4777V2.52232ZM10.2784 3.84804C10.4623 3.72567 10.7106 3.77557 10.833 3.95949C12.2558 6.09798 12.2558 8.90199 10.833 11.0405C10.7106 11.2244 10.4623 11.2743 10.2784 11.1519C10.0944 11.0296 10.0445 10.7813 10.1669 10.5973C11.4111 8.72728 11.4111 6.27269 10.1669 4.40264C10.0445 4.21871 10.0944 3.97041 10.2784 3.84804ZM12.6785 1.43044C12.5356 1.2619 12.2832 1.24104 12.1147 1.38386C11.9462 1.52667 11.9253 1.77908 12.0681 1.94762C14.7773 5.14488 14.7773 9.85513 12.0681 13.0524C11.9253 13.2209 11.9462 13.4733 12.1147 13.6161C12.2832 13.759 12.5356 13.7381 12.6785 13.5696C15.6406 10.0739 15.6406 4.92612 12.6785 1.43044Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
                <audio ref={audioRef} />
            </div>
        </div>
    );
}

export default memo(MusicPlayer);
