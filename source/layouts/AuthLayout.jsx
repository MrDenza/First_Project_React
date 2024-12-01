// // import React from "react";
import { useEffect, useState, useRef, useCallback } from 'react';
import { eventFlow } from "../modules/events/eventEmitter.js";
import { Grid } from "@radix-ui/themes";
import { Outlet, useNavigate } from 'react-router-dom';
import InfoForAuth from '../pages/Auth/InfoForAuth';
import DelayMount from "../components/DelayMount"
import { PAGE_URI_SIGNUP, PAGE_URI_SIGNIN, PAGE_HOME } from "../routes/PagesRouter.jsx";

const AuthLayout = () => {
    const navigate = useNavigate();
    // const outlet = useOutlet();
    // useEffect(() => {
    //     if (!outlet) {
    //         navigate(PAGE_URI_SIGNIN);
    //     }
    // }, [outlet, navigate]);

    const [isVisibleLogo, setIsVisibleLogo] = useState(true);
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

    const handleGoPageSignUp = useCallback(() => {
        setIsVisibleElem(false);
        updatePageUri(PAGE_URI_SIGNUP);
    }, [updatePageUri]);

    const handleGoPageHome = useCallback(() => {
        setIsVisibleElem(false);
        setIsVisibleLogo(false);
        updatePageUri(PAGE_HOME);
    }, [updatePageUri]);

    useEffect(() => {
        eventFlow.on('goPageSignIn', handleGoPageSignIn);
        eventFlow.on('goPageSignUp', handleGoPageSignUp);
        eventFlow.on('goPageHome', handleGoPageHome);
        return () => {
            clearTimeout(timerRef.current);
            eventFlow.removeListener('goPageSignIn', handleGoPageSignIn);
            eventFlow.removeListener('goPageSignUp', handleGoPageSignUp);
            eventFlow.removeListener('goPageHome', handleGoPageHome);
        };
    }, [handleGoPageHome, handleGoPageSignIn, handleGoPageSignUp]);

    useEffect(() => {
        if (isVisibleElem) return;
        const timer = setTimeout(() => {
            setIsVisibleElem(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isVisibleElem]);

    return (
        <Grid
            height="100vh"
            align="center"
            justify="center"
            columns="repeat(auto-fill, minmax(345px, 50%))"
        >
            <DelayMount
                component={InfoForAuth}
                visible={isVisibleLogo}
                delay={1000}
                mountClass="delay-m__type-2"
                unmountClass="delay-unm__type-2"
            />
            <DelayMount
                component={Outlet}
                visible={isVisibleElem}
                delay={1000}
                mountClass="delay-m__type-2"
                unmountClass="delay-unm__type-2"
            />
        </Grid>
    );
};

export default AuthLayout;