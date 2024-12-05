// import React from "react";
import { memo } from "react";
import { Heading, Button, ScrollArea, Spinner } from "@radix-ui/themes";
import { iconPlay, iconSquares, iconRadio, iconAlbum } from "../../../../elements/iconPageHome";
import "./ListMenu.css";

import { PAGE_HOME_ALBUM, PAGE_HOME, PAGE_URI_RADIO } from "../../../../routes/PagesRouter";
import { eventFlow } from "../../../../modules/events/eventEmitter";

function ListMenu({ listAlbums, selectBtn }) {
    const openAlbum = (link) => {
        eventFlow.emit("setNavigate", link);
    };

    const listBtnAlbums = listAlbums ? (
        listAlbums.map((elem) => {
            return (
                <Button
                    key={elem.idAlbum}
                    onClick={() => openAlbum(PAGE_HOME_ALBUM + "/" + elem.idAlbum)}
                    size="4"
                    variant={+selectBtn === elem.idAlbum ? "soft" : "outline"}
                >
                    {iconAlbum}
                    {elem.titleAlbum}
                </Button>
            );
        })
    ) : (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Spinner size="3" />
        </div>
    );

    return (
        <aside className="list-menu__box">
            <div className="list-menu__box-nav">
                <Heading className="list-menu__nav-title" as="h2" size="5" weight="bold" mb="3">
                    Навигация
                </Heading>
                <div className="list-menu__nav">
                    <Button size="4" variant={selectBtn === PAGE_HOME ? "soft" : "outline"} onClick={() => openAlbum(PAGE_HOME)}>
                        {iconSquares}
                        <span>Актуальное</span>
                    </Button>
                    <Button size="4" variant={selectBtn === PAGE_URI_RADIO ? "soft" : "outline"} onClick={() => openAlbum(PAGE_URI_RADIO)}>
                        {iconRadio}
                        <span>Радио</span>
                    </Button>
                    <Button
                        size="4"
                        variant={selectBtn === "my" ? "soft" : "outline"}
                        onClick={() => openAlbum(PAGE_HOME_ALBUM + "/" + "my")}
                    >
                        {iconPlay}
                        <span>Мой плейлист</span>
                    </Button>
                </div>
            </div>
            <div className="list-menu__box-albums">
                <Heading className="list-menu__box-albums-title" as="h2" size="5" weight="bold" mb="3">
                    Альбомы
                </Heading>
                <div className="list-menu__box-scr-area">
                    <ScrollArea type="auto" scrollbars="both">
                        <div className={`list-menu__scr-list ${listAlbums && "delay-m__type-3"}`}>{listBtnAlbums}</div>
                    </ScrollArea>
                </div>
            </div>
        </aside>
    );
}

export default memo(ListMenu);
