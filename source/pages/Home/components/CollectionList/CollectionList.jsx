//import React from 'react'
import { memo } from "react";
import { eventFlow } from "../../../../modules/events/eventEmitter";
import { Card, Inset, Text, Strong, Skeleton } from "@radix-ui/themes";
import { PAGE_HOME_ALBUM } from "../../../../routes/PagesRouter";

import HeaderList from "../HeaderList/HeaderList";
import "./CollectionList.css";

function CollectionList({ dataList }) {
    const openAlbum = (path) => {
        console.log(path);
        eventFlow.emit("setNavigate", path);
    };

    const listCollestion = dataList.map((elem) => {
        return (
            <div key={elem.idAlbum} onClick={() => openAlbum(PAGE_HOME_ALBUM + "/" + elem.idAlbum)} className="collect-list__box-elem">
                <Card size="2">
                    <Inset clip="padding-box" side="top" pb="current" className="collect-list__img-box">
                        {elem.photoAlbum ? (
                            <img src={elem.photoAlbum} alt={"Сборка: " + elem.titleAlbum} className="collect-list__img-pos" />
                        ) : (
                            <Skeleton width="100%" height="100%" />
                        )}
                    </Inset>
                    <Text as="p" size="4">
                        <Strong>{elem.titleAlbum}</Strong>
                    </Text>
                    <span>{"Номер альбома: " + elem.idAlbum}</span>
                </Card>
            </div>
        );
    });

    return (
        <div className="collect-list__box">
            <HeaderList photo="https://abrakadabra.fun/uploads/posts/2022-02/1644672322_22-abrakadabra-fun-p-oblozhka-dlya-treka-vk-64.jpg">
                Популярные сборники
            </HeaderList>

            <div className="collect-list__box-list">{listCollestion}</div>
        </div>
    );
}

export default memo(CollectionList);
