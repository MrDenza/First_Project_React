// import React from "react";
import { Heading } from "@radix-ui/themes";
import { iconMusicLogo } from "../../../../elements/iconMusicLogo";
import "./LogoForPage.css";

function LogoForPage() {
    return (
        <div className="logo-for-page__box">
		    <div className="logo-for-page__img">
				{iconMusicLogo}
			</div>
			<Heading as="h1" size="6" trim="start" mt="2">MuSBoX</Heading>
		</div>
    )
}

export default LogoForPage