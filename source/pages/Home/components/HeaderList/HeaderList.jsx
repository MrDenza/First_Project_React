//import React from 'react'

import { memo } from "react";
import { Heading, Card, Skeleton } from "@radix-ui/themes";
import "./HeaderList.css";

function HeaderList({ children, dopText = [], photo, className }) {
    const arrText = dopText.map((elem, i) => {
        return <p key={i}>{elem}</p>;
    });

    return (
        <Card>
            <div className={`header__box-title ${className}`}>
                <div className="header__box-img">
                    {photo ? <img className="header__img-alb" alt="Фото раздела" src={photo} /> : <Skeleton width="100%" height="100%" />}
                </div>

                <div>
                    <Heading as="h2" size="7" weight="bold" className="header__title-alb">
                        {children}
                    </Heading>
                    {arrText}
                </div>
            </div>
        </Card>
    );
}

export default memo(HeaderList);
