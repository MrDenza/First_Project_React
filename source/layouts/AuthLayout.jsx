// // import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { eventFlow } from "../modules/events/eventEmitter.js";
import { Outlet, useNavigate } from "react-router-dom";
import { PAGE_URI_SIGNUP, PAGE_URI_SIGNIN, PAGE_HOME } from "../routes/PagesRouter.jsx";

import { useDispatch } from "react-redux";
import { setLoadStateUD } from "../redux/reducers/userData/userDataSlice.js";

import InfoForAuth from "../pages/Auth/InfoForAuth";
import DelayMount from "../components/DelayMount";
import "./AuthLayout.css";

const AuthLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isVisibleLogo, setIsVisibleLogo] = useState(true);
    const [isVisibleElem, setIsVisibleElem] = useState(true);
    const timerRef = useRef(null);

    const updatePageUri = useCallback(
        (newUri) => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                dispatch(
                    setLoadStateUD({
                        state: 0,
                        error: null,
                    })
                );
                navigate(newUri);
            }, 1000);
        },
        [navigate, dispatch]
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
        eventFlow.on("goPageSignIn", handleGoPageSignIn);
        eventFlow.on("goPageSignUp", handleGoPageSignUp);
        eventFlow.on("goPageHome", handleGoPageHome);
        return () => {
            clearTimeout(timerRef.current);
            eventFlow.removeListener("goPageSignIn", handleGoPageSignIn);
            eventFlow.removeListener("goPageSignUp", handleGoPageSignUp);
            eventFlow.removeListener("goPageHome", handleGoPageHome);
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
        <div className="page-auth__layout">
            <DelayMount
                component={InfoForAuth}
                visible={isVisibleLogo}
                delay={1000}
                mountClass="delay-m__type-2"
                unmountClass="delay-unm__type-2"
                className="page-auth__logo-box"
            />
            <DelayMount
                component={Outlet}
                visible={isVisibleElem}
                delay={1000}
                mountClass="delay-m__type-2"
                unmountClass="delay-unm__type-2"
                className="page-auth__form-box"
            />
        </div>
    );
};

export default AuthLayout;
