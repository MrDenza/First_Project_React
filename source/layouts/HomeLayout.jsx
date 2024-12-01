// import React from "react";
import { useEffect, useState, useRef, useCallback } from 'react';
import { eventFlow } from "../modules/events/eventEmitter.js";
// import { Grid } from "@radix-ui/themes";
import { useNavigate } from 'react-router-dom';
import DelayMount from "../components/DelayMount.jsx"
import PageHome from '../pages/Home/PageHome.jsx';
import {
    PAGE_URI_SIGNIN,
    // PAGE_URI_SIGNUP,
    // PAGE_HOME,
} from "../routes/PagesRouter.jsx";


const HomeLayout = () => {
    const navigate = useNavigate();
    // const [isVisibleLogo, setIsVisibleLogo] = useState(true);
    const [isVisibleElem, setIsVisibleElem] = useState(true);
    const timerRef = useRef(null);

    const updatePageUri = useCallback(
        (newUri) => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                navigate(newUri);
            }, 1000);
        },
        [navigate]
    );
    
    const handleGoPageSignIn = useCallback(() => {
        setIsVisibleElem(false);
        updatePageUri(PAGE_URI_SIGNIN);
    }, [updatePageUri]);
    
    useEffect(() => {
        eventFlow.on("goPageSignIn", handleGoPageSignIn);
        // eventFlow.on("goPageSignUp", handleGoPageSignUp);
        // eventFlow.on("goPageHome", handleGoPageHome);
        return () => {
            clearTimeout(timerRef.current);
            eventFlow.removeListener("goPageSignIn", handleGoPageSignIn);
            // eventFlow.removeListener("goPageSignUp", handleGoPageSignUp);
            // eventFlow.removeListener("goPageHome", handleGoPageHome);
        };
    }, [handleGoPageSignIn]);
    
    // const handleGoPageSignUp = () => {
    //     setIsVisibleElem(false);
    //     updatePageUri(PAGE_URI_SIGNUP);
    // };

    // const handleGoPageHome = () => {
    //     setIsVisibleElem(false);
    //     setIsVisibleLogo(false);
    //     updatePageUri(PAGE_HOME);
    // };

    useEffect(() => {
        if (isVisibleElem) return; // Если элемент видим, ничего не делаем
        const timer = setTimeout(() => {
            setIsVisibleElem(true); // Устанавливаем обратно видимость элемента после завершения анимации
        }, 1000); // Должно совпадать с длительностью анимации

        return () => clearTimeout(timer); // Очистка таймера
    }, [isVisibleElem]); // Зависимость от isVisibleElem

    return (
            <DelayMount
                component={PageHome}
                visible={isVisibleElem}
                delay={1000}
                mountClass="delay-m__type-2"
                unmountClass="delay-unm__type-2"
            ></DelayMount>

    );
};

export default HomeLayout;
