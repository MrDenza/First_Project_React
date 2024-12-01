// import React from "react";
import { memo } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute.jsx';
import PageTitle from './PageTitle.jsx'

import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';

import PageHome from '../pages/Home/PageHome';
import PageAuth from '../pages/Auth/PageAuth.jsx';

export const PAGE_URI_SIGNUP = '/auth/sign-up';
export const PAGE_URI_SIGNIN = '/auth/sign-in';
export const PAGE_HOME = '/home';
export const PAGE_HOME_ALBUM = "/home/album";

function PagesRouter() {
    return (
        <Routes>
            {/* <Route
                exact
                path="/"
                element={<PageStart />}
            ></Route> */}

            <Route element={<ProtectedRoute uriLogin={PAGE_URI_SIGNIN} />}>
                <Route
                    path="/home"
                    element={
                        <>
                            <PageTitle title={"MuSBoX - Web Player"} />
                            <HomeLayout />
                        </>
                    }
                >
                    <Route
                        index
                        path=""
                        element={
                            <>
                                {/* <PageTitle title={"MuSBoX - Web Player"} /> */}
                                <PageHome />
                            </>
                        }
                    />
                    <Route
                        index
                        path="album"
                        element={
                            <>
                                {/* <PageTitle title={"MuSBoX - Web Player"} /> */}
                                <PageHome />
                            </>
                        }
                    />
                    <Route
                        index
                        path="album/:id"
                        element={
                            <>
                                {/* <PageTitle title={"MuSBoX - Web Player"} /> */}
                                <PageHome />
                            </>
                        }
                    />
                </Route>
            </Route>

            <Route
                path="/auth"
                element={
                    <>
                        <AuthLayout />
                    </>
                }
            >
                <Route
                    path="sign-in"
                    element={
                        <>
                            <PageTitle title={"MuSBoX - Авторизация"} />
                            <PageAuth isSignUp={false} />
                        </>
                    }
                />
                <Route
                    path="sign-up"
                    element={
                        <>
                            <PageTitle title={"MuSBoX - Регистрация"} />
                            <PageAuth isSignUp={true} />
                        </>
                    }
                />
                <Route
                    index
                    path="*"
                    element={<Navigate to={PAGE_URI_SIGNIN} replace />}
                />
            </Route>
            <Route path="*" element={<Navigate to={PAGE_HOME} />} />
        </Routes>
    );
}

export default memo(PagesRouter);