// import React from "react";
import { memo } from "react";
import { Heading } from "@radix-ui/themes";
import { iconMusicLogo } from "../../elements/iconMusicLogo";
import "./InfoForAuth.css";

function Logo() {
    return (
        <div className="page-auth__logo">
            {iconMusicLogo}
            <Heading as="h1" size="9" trim="start" mt="2">
                MuSBoX
            </Heading>
        </div>
    );
}

export default memo(Logo);
