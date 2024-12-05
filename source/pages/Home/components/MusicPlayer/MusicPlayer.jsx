// import React from "react";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePlay } from "../../../../redux/reducers/appCache/appCacheSlice";

import "./MusicPlayer.css";
import { Box, Flex, IconButton, Skeleton, Slider, Text } from "@radix-ui/themes";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; // Добавляем ведущий ноль к секундам, если они меньше 10
};

function MusicPlayer() {
    const dispatch = useDispatch();
    const currentTrack = useSelector((state) => state.appCache.currentTrack);
    const isPlaying = useSelector((state) => state.appCache.isPlaying);
    const [volume, setVolume] = useState(1); // Устанавливаем начальную громкость на 100%

    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.uri; // Устанавливаем источник аудио
            audioRef.current.load(); // Загружаем аудио
            if (isPlaying) {
                audioRef.current.play().catch((error) => console.error("Ошибка воспроизведения:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentTrack, isPlaying]);

    // Обработчик обновления времени
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    // Устанавливаем обработчики событий
    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("timeupdate", handleTimeUpdate);
            return () => {
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
    }, []);

    const handlePlayPause = () => {
        dispatch(togglePlay());
    };
    const handleVolumeChange = (value) => {
        const newVolume = parseFloat(value / 100);
        setVolume(newVolume); // Обновляем состояние громкости
        if (audioRef.current) {
            audioRef.current.volume = newVolume; // Устанавливаем новую громкость для аудио
        }
    };
    if (!currentTrack) {
        return <p>Трек не выбран</p>; // Обработка случая, когда трек не выбран
    }

    const tabIndex = -1;
    return (
        <Box
            position="absolute"
            left="0"
            right="0"
            bottom="0"
            mb="5"
            height="64px"
            style={{
                borderRadius: "100px",
                boxShadow: "var(--shadow-6)",
                marginLeft: 200,
                marginRight: 200,
            }}
        >
            <Box
                width="100%"
                height="100%"
                position="absolute"
                overflow="hidden"
                style={{
                    borderRadius: "100px",
                    backgroundColor: "var(--color-floating-panel)",
                    filter: "saturate(0.5) brightness(1.1)",
                    WebkitBackdropFilter: "blur(24px)",
                    backdropFilter: "blur(24px)",
                }}
            />
            <Flex height="100%" justify="between" position="relative">
                <Flex gap="4" align="center" p="3">
                    <IconButton tabIndex={tabIndex} radius="full" size="3" onClick={handlePlayPause}>
                        {/*Плей кнопка*/}
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

                    {/* <Flex align="center" gap="4">
                        <IconButton tabIndex={tabIndex} color="gray" variant="ghost" radius="full" size="2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                                width="20"
                                height="20"
                                fill="currentcolor"
                                fillOpacity={0.7}
                            >
                                <path d="M 21 5 L 21 8 L 18.675781 8 C 16.670448 8 14.796256 9.00408 13.683594 10.671875 L 12 13.197266 L 10.316406 10.671875 C 9.2045791 9.0047337 7.329552 8 5.3242188 8 L 3 8 A 1.0001 1.0001 0 1 0 3 10 L 5.3242188 10 C 6.6628853 10 7.910171 10.668391 8.6523438 11.78125 L 10.798828 15 L 8.6523438 18.21875 C 7.910171 19.331609 6.6628854 20 5.3242188 20 L 3 20 A 1.0001 1.0001 0 1 0 3 22 L 5.3242188 22 C 7.3295521 22 9.2045792 20.995266 10.316406 19.328125 L 12 16.802734 L 13.683594 19.328125 C 14.796256 20.99592 16.670448 22 18.675781 22 L 21 22 L 21 25 L 27 21 L 21 17 L 21 20 L 18.675781 20 C 17.337115 20 16.090994 19.332955 15.347656 18.21875 L 13.201172 15 L 15.347656 11.78125 C 16.090994 10.667045 17.337115 10 18.675781 10 L 21 10 L 21 13 L 27 9 L 21 5 z" />
                            </svg>
                        </IconButton>
                        <IconButton tabIndex={tabIndex} color="gray" variant="ghost" radius="full" size="2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                                fill="currentcolor"
                                fillOpacity={0.7}
                                width="20"
                                height="20"
                            >
                                <path d="M 20 4 L 20 7 L 8 7 C 4.6983746 7 2 9.6983746 2 13 A 1.0001 1.0001 0 1 0 4 13 C 4 10.779625 5.7796254 9 8 9 L 20 9 L 20 12 L 27 8 L 20 4 z M 26.984375 15.986328 A 1.0001 1.0001 0 0 0 26 17 C 26 19.220375 24.220375 21 22 21 L 10 21 L 10 18 L 3 22 L 10 26 L 10 23 L 22 23 C 25.301625 23 28 20.301625 28 17 A 1.0001 1.0001 0 0 0 26.984375 15.986328 z" />
                            </svg>
                        </IconButton>
                    </Flex> */}
                </Flex>

                <Flex align="center" gap="3">
                    <IconButton tabIndex={tabIndex} color="gray" variant="ghost" radius="full" size="2">
                        {/* кнопка прошлый трек*/}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentcolor"
                            fillOpacity={0.7}
                            viewBox="0 0 30 30"
                            width="20"
                            height="20"
                            style={{ marginRight: 2 }}
                        >
                            <path d="M 14 6 A 1 1 0 0 0 13.408203 6.1953125 A 1 1 0 0 0 13.378906 6.2167969 L 2.4609375 14.15625 A 1 1 0 0 1 2.4589844 14.158203 L 2.4433594 14.169922 A 1 1 0 0 0 2 15 A 1 1 0 0 0 2.4492188 15.833984 L 13.40625 23.804688 A 1 1 0 0 0 14 24 A 1 1 0 0 0 15 23 A 1 1 0 0 0 15 22.996094 L 15 16.234375 L 25.40625 23.804688 A 1 1 0 0 0 26 24 A 1 1 0 0 0 27 23 A 1 1 0 0 0 27 22.996094 L 27 15 L 27 7.0039062 A 1 1 0 0 0 27 7 A 1 1 0 0 0 26 6 A 1 1 0 0 0 25.40625 6.1953125 A 1 1 0 0 0 25.378906 6.2167969 L 15 13.763672 L 15 7.0039062 A 1 1 0 0 0 15 7 A 1 1 0 0 0 14 6 z" />
                        </svg>
                    </IconButton>

                    <Flex align="center" gap="3">
                        <div style={{ borderRadius: "var(--radius-2)", width: "45px", height: "45px", overflow: "hidden" }}>
                            {/* фото */}
                            {currentTrack.photo ? (
                                <img
                                    className="player__img-track"
                                    width="100%"
                                    height="100%"
                                    alt={`Фото трека: ${currentTrack.title}`}
                                    src={currentTrack.photo}
                                />
                            ) : (
                                <Skeleton width="100%" height="100%" />
                            )}
                        </div>

                        <Box>
                            {/* название автор*/}
                            <Text size="1" as="div" weight="medium">
                                {currentTrack.title}
                            </Text>
                            <Text size="1" as="div" color="gray" mb="2">
                                {currentTrack.artist}
                            </Text>

                            <Box
                                position="relative"
                                height="4px"
                                width="320px"
                                style={{
                                    backgroundColor: "var(--gray-a5)",
                                    borderRadius: "var(--radius-1)",
                                }}
                            >
                                <Slider
                                    defaultValue={[currentTime * 100]}
                                    onValueChange={(value) => {
                                        console.log(currentTime);
                                        const newTime = (parseFloat(value) * duration) / 100;
                                        setCurrentTime(newTime);
                                        if (audioRef.current) {
                                            audioRef.current.currentTime = newTime; // Перематываем аудио
                                        }
                                    }}
                                />

                                <Box position="absolute" top="0" right="0" mt="-28px">
                                    <Text size="1" color="gray">
                                        {`${formatTime(currentTime.toFixed(2))} / ${formatTime(duration ? duration.toFixed(2) : 0)}`}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Flex>

                    <IconButton tabIndex={tabIndex} color="gray" variant="ghost" radius="full" size="2">
                        {/* кнопка след трек*/}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            width="20"
                            height="20"
                            fill="currentcolor"
                            fillOpacity={0.7}
                            style={{ marginLeft: 2 }}
                        >
                            <path d="M 4 6 A 1 1 0 0 0 3 7 A 1 1 0 0 0 3 7.0039062 L 3 15 L 3 22.996094 A 1 1 0 0 0 3 23 A 1 1 0 0 0 4 24 A 1 1 0 0 0 4.5917969 23.804688 L 4.59375 23.804688 A 1 1 0 0 0 4.6210938 23.783203 L 15 16.236328 L 15 22.996094 A 1 1 0 0 0 15 23 A 1 1 0 0 0 16 24 A 1 1 0 0 0 16.591797 23.804688 L 16.59375 23.804688 A 1 1 0 0 0 16.621094 23.783203 L 27.541016 15.841797 A 1 1 0 0 0 28 15 A 1 1 0 0 0 27.556641 14.169922 L 16.59375 6.1953125 A 1 1 0 0 0 16 6 A 1 1 0 0 0 15 7 A 1 1 0 0 0 15 7.0039062 L 15 13.765625 L 4.59375 6.1953125 A 1 1 0 0 0 4 6 z" />
                        </svg>
                    </IconButton>
                </Flex>

                <Flex align="center" gap="2" p="5">
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
                        onChange={handleVolumeChange}
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
                </Flex>
            </Flex>
            <audio ref={audioRef} />
        </Box>
    );
}

export default memo(MusicPlayer);
