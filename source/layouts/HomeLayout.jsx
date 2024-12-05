//import React from "react";
import { useEffect, useState, useCallback, Fragment } from "react";
import { eventFlow } from "../modules/events/eventEmitter.js";

import { useNavigate } from "react-router-dom";
import DelayMount from "../components/DelayMount.jsx";
import PageHome from "../pages/Home/PageHome.jsx";

const HomeLayout = () => {
    const navigate = useNavigate();
    const [isVisibleElem, setIsVisibleElem] = useState(true);

    const handleSetNavigate = useCallback(
        (path) => {
            navigate(path);
        },
        [navigate]
    );

    const handleSetVisible = useCallback(
        (isVis) => {
            setIsVisibleElem(isVis);
        },
        [setIsVisibleElem]
    );

    useEffect(() => {
        eventFlow.on("setNavigate", handleSetNavigate);
        eventFlow.on("setVisible", handleSetVisible);
        return () => {
            eventFlow.removeListener("setNavigate", handleSetNavigate);
            eventFlow.removeListener("setVisible", handleSetVisible);
        };
    }, [handleSetNavigate, handleSetVisible]);

    return (
        <Fragment>
            <DelayMount
                component={PageHome}
                visible={isVisibleElem}
                delay={1000}
                mountClass="delay-m__type-2"
                unmountClass="delay-unm__type-2"
            ></DelayMount>
        </Fragment>
    );
};

export default HomeLayout;
