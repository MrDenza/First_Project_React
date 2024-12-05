// import React from "react";
import { useEffect, useState, memo, Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth, setResultLoadUD } from "../redux/reducers/userData/userDataSlice";

const ProtectedRoute = ({ uriLogin }) => {
    const dispatch = useDispatch();
    const userIsAuth = useSelector((state) => state.userData.userIsAuth);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

    const checkUserAuth = () => {
        const userKeyData = localStorage.getItem("userKeyData");
        if (!userKeyData) return false;

        const payload = JSON.parse(atob(userKeyData.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        console.log(`Осталось сессии: ${((payload.exp - currentTime) / 60).toFixed(2)} минут`);

        return payload.exp > currentTime
            ? {
                  email: payload.email,
                  uid: payload.user_id,
              }
            : null;
    };

    useEffect(() => {
        if (!userIsAuth) {
            const userData = checkUserAuth();
            if (userData) {
                dispatch(
                    setResultLoadUD({
                        state: 2,
                        error: null,
                        data: userData,
                    })
                );
                dispatch(setUserAuth(true));
            } else {
                dispatch(setUserAuth(false));
            }
        }
        setIsLoading(false);
    }, [dispatch, userIsAuth]);

    if (isLoading) {
        return <Fragment></Fragment>;
    }

    return userIsAuth ? <Outlet /> : <Navigate to={uriLogin} />;
};

export default memo(ProtectedRoute);
