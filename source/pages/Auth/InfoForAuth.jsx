// import React from "react";
import { memo } from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { iconMusicLogo } from "../../elements/iconMusicLogo";

function Logo() { 

    return ( 
        <Flex justify="center" align="center" wrap="wrap" width="80%" mx="auto">
            {iconMusicLogo}
            <Heading as="h1" size="9" trim="start" mt="2">MuSBoX</Heading>
        </Flex>
    );
}

export default memo(Logo);