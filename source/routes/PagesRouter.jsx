import React from "react";
import { Route, Routes} from "react-router-dom";

import { PageStart } from "../pages/PageStart";
import { PageAuth } from "../pages/PageAuth";

export const PagesRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<PageAuth/>}/>
            
        </Routes>
    );
};