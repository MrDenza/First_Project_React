// import React from "react";
import { memo } from "react";
import { Heading, Button, ScrollArea, Spinner } from "@radix-ui/themes";
import { icon1, icon2, icon3, icon4 } from '../../../../elements/iconMusic';
import "./ListMenu.css"
import { useNavigate } from "react-router-dom";
import { PAGE_HOME_ALBUM } from "../../../../routes/PagesRouter";

function ListMenu({ albumsList }) {
    
    const navigate = useNavigate();


    const openAlbum = (link) => {
        console.log(link);
        navigate(link);
    };

    const listBtnAlbums = albumsList ? (
        albumsList.map((elem) => {
            return (
                <Button
                    key={elem.id}
                    onClick={() => openAlbum(PAGE_HOME_ALBUM + "/" + elem.id)}
                    size="4"
                    variant="soft"
                >
                    {icon4}
                    {elem.name}
                </Button>
            );
        })
    ) : (
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <Spinner size="3"/>
        </div>
    );

    return (
        <aside className="list-menu__box">
            <div className="list-menu__box-nav">
                <Heading
                    className="list-menu__nav-title"
                    as="h2"
                    size="5"
                    weight="bold"
                    mb="3"
                >
                    Навигация
                </Heading>
                <div className="list-menu__nav">
                    <Button size="4" variant="soft">
                        {icon2}
                        <span>Актуальное</span>
                    </Button>
                    <Button size="4" variant="soft">
                        {icon3}
                        <span>Радио</span>
                    </Button>
                    <Button size="4" variant="soft">
                        {icon1}
                        <span>Мой плейлист</span>
                    </Button>
                </div>
            </div>
            <div className="list-menu__box-albums">
                <Heading
                    className="list-menu__box-albums-title"
                    as="h2"
                    size="5"
                    weight="bold"
                    mb="3"
                >
                    Альбомы
                </Heading>
                <div className="list-menu__box-scr-area">
                    <ScrollArea type="auto" scrollbars="both">
                        <div className={`list-menu__scr-list ${albumsList && "delay-m__type-3"}`}>
                            {listBtnAlbums}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </aside>
    );
}

export default memo(ListMenu); 
// style={{border: "1px solid red", boxSizing: "border-box"}}