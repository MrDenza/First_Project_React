// import React from "react";
import { memo } from "react";
import { eventFlow } from "../../../../modules/events/eventEmitter";
import { DropdownMenu, Avatar, Text, AlertDialog, Button, Flex } from "@radix-ui/themes";
import { PAGE_HOME_ALBUM } from "../../../../routes/PagesRouter";

import { updateData } from "../../../../firebase/firebaseFunction";
import { FB_DB_USERS_DATA } from "../../../../firebase/firebase";

import { useDispatch, useSelector } from "react-redux";
import { resetStateUD, setAppearance, setColorTheme } from "../../../../redux/reducers/userData/userDataSlice";
import { resetStateML } from "../../../../redux/reducers/musicLists/musicListsSlice";
import { resetStateMU } from "../../../../redux/reducers/musicUser/musicUserSlice";
import { resetCache } from "../../../../redux/reducers/appCache/appCacheSlice";

import "./HeaderPanel.css";

const LIST_APPEARANCE = [
    { idT: 0, name: "Светлая", value: "light" },
    { idT: 1, name: "Тёмная", value: "dark" },
];

const LIST_COLOR_THEME = [
    { idC: 1, name: "Желтый", value: "yellow" },
    { idC: 2, name: "Оранжевый", value: "amber" },
    { idC: 3, name: "Красный", value: "tomato" },
    { idC: 4, name: "Розовый", value: "crimson" },
    { idC: 5, name: "Фиолетовый", value: "purple" },
    { idC: 6, name: "Синий", value: "blue" },
    { idC: 7, name: "Зеленый", value: "green" },
    { idC: 8, name: "Лайм", value: "lime" },
    { idC: 9, name: "Голубой", value: "sky" },
    { idC: 10, name: "Серый", value: "gray" },
];

function HeaderPanel({ userName }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);

    const setNavigate = (link) => {
        eventFlow.emit("setNavigate", link);
    };

    const setNewColor = (value) => {
        dispatch(setColorTheme(value));
        updateData(`${FB_DB_USERS_DATA}/${userData.user.uid}/settings/colorTheme`, value);
    };

    const setNewAppearance = (value) => {
        dispatch(setAppearance(value));
        updateData(`${FB_DB_USERS_DATA}/${userData.user.uid}/settings/appearance`, value);
    };

    const exitUser = (key) => {
        eventFlow.emit("setVisible", false);
        setTimeout(() => {
            localStorage.removeItem("userKeyData");
            dispatch(resetStateML(key));
            dispatch(resetStateMU(key));
            dispatch(resetStateUD(key));
            dispatch(resetCache(key));
        }, 1000);
    };

    const btnColors = LIST_COLOR_THEME.map((elem) => {
        return (
            <DropdownMenu.Item key={elem.idC} color={elem.value} onClick={() => setNewColor(elem.value)}>
                {elem.value === userData.userSettings.colorTheme && "•"} {elem.name}
            </DropdownMenu.Item>
        );
    });
    const btnTheme = LIST_APPEARANCE.map((elem) => {
        return (
            <DropdownMenu.Item key={elem.idT} onClick={() => setNewAppearance(elem.value)}>
                {elem.value === userData.userSettings.appearance && "•"} {elem.name}
            </DropdownMenu.Item>
        );
    });

    return (
        <div className="header-panel__box">
            <Text className="header-panel__text-user" size="4">
                Пользователь: {userName}
            </Text>
            <DropdownMenu.Root>
                <AlertDialog.Root>
                    <DropdownMenu.Trigger style={{ cursor: "pointer" }}>
                        <Avatar
                            src="https://demotivation.ru/wp-content/uploads/2021/12/image_562610131056464036330.jpg"
                            fallback="U"
                            title="Аватарка пользователя"
                            className="header-panel__user-img"
                        />
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content>
                        <DropdownMenu.Item disabled>Профиль</DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => setNavigate(PAGE_HOME_ALBUM + "/my")}>Мой плейлист</DropdownMenu.Item>

                        <DropdownMenu.Separator />

                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>Тема</DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent>{btnTheme}</DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>Цвет темы</DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent>{btnColors}</DropdownMenu.SubContent>
                        </DropdownMenu.Sub>

                        <DropdownMenu.Separator />

                        <AlertDialog.Trigger>
                            <DropdownMenu.Item color="red">Выход</DropdownMenu.Item>
                        </AlertDialog.Trigger>
                    </DropdownMenu.Content>

                    <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Выход</AlertDialog.Title>
                        <AlertDialog.Description size="2">Вы уверены что хотите выйти?</AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                    Нет
                                </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button variant="solid" color="red" onClick={() => exitUser(true)}>
                                    Да
                                </Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            </DropdownMenu.Root>
        </div>
    );
}

export default memo(HeaderPanel);
