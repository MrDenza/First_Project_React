// import React from "react";
import { useEffect, memo, useCallback } from "react";
import { eventFlow } from "../../modules/events/eventEmitter.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoadStateUD, setUserAuth, setResultLoadUD } from "../../redux/reducers/userData/userDataSlice.js";
import { decoderErrors } from "../../firebase/firebaseFunction.js";
import { FB_AUTH } from "../../firebase/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import FormSignIn from "./Sign_in/FormSignIn.jsx";
import FormSignUp from "./Sign_up/FormSignUp.jsx";


const PageAuth = ({ isSignUp }) => {

    const dispatch = useDispatch();
    const userSettings = useSelector((state) => state.userData);

    const handleAuth = useCallback(
        async (email, pass) => {
            try {
                dispatch(setLoadStateUD({ state: 1, error: null }));
                let data;
                if (isSignUp) {
                    data = await createUserWithEmailAndPassword(
                        FB_AUTH,
                        email,
                        pass
                    );
                } else {
                    data = await signInWithEmailAndPassword(
                        FB_AUTH,
                        email,
                        pass
                    );
                }

                if (data) {
                    let user = data.user;
                    let userData = {
                        email: user.email,
                        uid: user.uid,
                    };
                    localStorage.setItem(
                        "userKeyData",
                        JSON.stringify(user.stsTokenManager.accessToken)
                    );
                    dispatch(
                        setResultLoadUD({
                            state: 2,
                            error: null,
                            data: userData,
                        })
                    );
                    dispatch(setUserAuth(true));
                    eventFlow.emit("goPageHome");
                }
            } catch (error) {
                dispatch(
                    setLoadStateUD({
                        state: 3,
                        error: decoderErrors(error.code),
                    })
                );
            }
        },
        [dispatch, isSignUp]
    );

    const handleSendAuthData = useCallback(
        (email, pass) => handleAuth(email, pass),
        [handleAuth]
    );

    useEffect(() => {
        eventFlow.on(
            isSignUp ? "sendSignUpData" : "sendSignInData",
            handleSendAuthData
        );
        return () => {
            eventFlow.removeListener(
                isSignUp ? "sendSignUpData" : "sendSignInData",
                handleSendAuthData
            );
        };
    }, [handleSendAuthData, isSignUp]);

    return (
        <div>
            {isSignUp ? (
                <FormSignUp
                    loadStatus={userSettings.dataLoadState === 1}
                    errSignUp={userSettings.dataLoadError}
                />
            ) : (
                <FormSignIn
                    loadStatus={userSettings.dataLoadState === 1}
                    errSignIn={userSettings.dataLoadError}
                />
            )}
        </div>
    );
};

export default memo(PageAuth);
