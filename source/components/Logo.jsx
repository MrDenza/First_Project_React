import React, { Fragment, memo } from "react";
import { Box, Flex, Heading, Spinner } from "@radix-ui/themes";
import "./Logo.css";

function Logo(props) { 

    return ( 
        <Flex justify="center" align="center" wrap="wrap" width="80%" mx="auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="30vw" height="70%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>
            </svg>
            <Heading as="h1" size="9" trim="start" mt="2">MuSBoX</Heading>
            <Spinner size="3" />
        </Flex>
    );
}

export default memo(Logo);