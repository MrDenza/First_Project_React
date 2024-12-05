// import React from "react";
import { memo } from "react";
import { Heading } from "@radix-ui/themes";
import { iconMusicLogo } from "../../elements/iconMusicLogo";
import "./InfoForAuth.css";

function Logo() {
    return (
        //<Flex justify="center" align="center" wrap="wrap" width="100%" height="100%" mx="auto">
        <div className="page-auth__logo">
            {iconMusicLogo}
            <Heading as="h1" size="9" trim="start" mt="2">
                MuSBoX
            </Heading>
        </div>
        //</Flex>
    );
}

export default memo(Logo);
