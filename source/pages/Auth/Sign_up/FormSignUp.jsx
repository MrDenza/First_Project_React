// import React from "react";
import { memo, useState, useEffect } from "react";
import { eventFlow } from "../../../modules/events/eventEmitter.js";
import { Box, Card, Flex, Heading, Text, TextField, Button, Callout } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { iconQuestion } from "../../../elements/iconPageAuth.jsx";
import "./FormSignUp.css";

function validEmail(email) {
    const REG_EMAIL =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return REG_EMAIL.test(email);
}

function validPass(pass) {
    const REG_PASS = /^(?=.*[0-9]{1,})(?=.*[a-zA-Z]{1,}).{6,}$/; // хотя бы одна цифра, хотя бы одна буква, минимальная длина 6
    return REG_PASS.test(pass);
}

function validPassRepeat(pass1, pass2) {
    return pass1 === pass2;
}

function FormSignUp({ loadStatus, errSignUp }) {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({ email: false, password: false, passwordRepeat: false });

    useEffect(() => {
        if (errors.email || errors.password || errors.passwordRepeat || errSignUp) {
            const errInfoElement = document.getElementById("err-info");
            errInfoElement?.scrollIntoView({ block: "start", behavior: "smooth" });
        }
    }, [errors, errSignUp]);

    useEffect(() => {
        // componentDidMount
        const changedData = (eo) => {
            eo = eo || window.event;
            if (email || password1 || password2) {
                eo.preventDefault();
                eo.returnValue = "Есть несохранённые данные!";
            }
        };
        (email || password1 || password2) && window.addEventListener("beforeunload", changedData);
        return () => {
            // componentWillUnmount
            window.removeEventListener("beforeunload", changedData);
        };
    }, [email, password1, password2]);

    const goPage = () => {
        eventFlow.emit("goPageSignIn");
    };

    const validateForm = () => {
        const newErrors = {
            email: !validEmail(email),
            password: !validPass(password1),
            passwordRepeat: !validPassRepeat(password1, password2),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const updateUser = (eo) => {
        eo.preventDefault();
        if (validateForm()) {
            eventFlow.emit("sendSignUpData", email, password1);
        }
    };

    return (
        <Box mx="auto" maxWidth="350px" minWidth="350px">
            <Form.Root onSubmit={updateUser} onReset={goPage}>
                <Card size="4">
                    <Heading as="h3" size="6" trim="start" mb="4" align="center">
                        Регистрация
                    </Heading>

                    <Box mb="5">
                        <Flex mb="1" justify="between" align="baseline">
                            <Text as="label" htmlFor="input-auth-login" size="2" weight="bold">
                                Эл. почта
                            </Text>
                        </Flex>
                        <TextField.Root
                            placeholder="Введите ваш email"
                            id="input-auth-login"
                            mb="1"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box mb="5">
                        <Flex align="baseline" justify="between" mb="1">
                            <Text as="label" size="2" weight="bold" htmlFor="input-auth-pass1">
                                Пароль
                            </Text>
                        </Flex>
                        <TextField.Root
                            type="password"
                            placeholder="Введите ваш пароль"
                            id="input-auth-pass1"
                            mb="1"
                            autoComplete="new-password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </Box>
                    <Box mb="5">
                        <Flex align="baseline" justify="between" mb="1">
                            <Text as="label" size="2" weight="bold" htmlFor="input-auth-pass2">
                                Повторите пароль
                            </Text>
                        </Flex>
                        <TextField.Root
                            type="password"
                            placeholder="Введите ваш пароль"
                            id="input-auth-pass2"
                            mb="1"
                            autoComplete="new-password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </Box>
                    {(errors.email || errors.password || errors.passwordRepeat || errSignUp) && (
                        <Callout.Root id="err-info">
                            <Callout.Text as="div" size="1">
                                {errors.email && (
                                    <Text as="div" className="sign-up__text">
                                        Проверьте Email {iconQuestion}
                                        <ul>
                                            <li>Формат: user@mail.by</li>
                                        </ul>
                                    </Text>
                                )}
                                {errors.password && (
                                    <Text as="div" className="sign-up__text">
                                        Некорректный пароль {iconQuestion}
                                        <ul>
                                            <li>Минимальная длина: 6 символов;</li>
                                            <li>Пароль должен содержать буквы (английские);</li>
                                            <li>Пароль должен содержать цифры.</li>
                                        </ul>
                                    </Text>
                                )}
                                {errors.passwordRepeat && (
                                    <Text as="div" className="sign-up__text">
                                        Пароли не совпадают! {iconQuestion}
                                    </Text>
                                )}
                                {errSignUp && (
                                    <Text as="div" className="sign-up__text">
                                        {errSignUp}
                                    </Text>
                                )}
                            </Callout.Text>
                        </Callout.Root>
                    )}
                    <Flex mt="6" justify="end" gap="3">
                        <Button variant="outline" style={{ width: "135px" }} type="reset" disabled={loadStatus}>
                            Авторизоваться
                        </Button>
                        <Button style={{ width: "135px" }} type="submit" loading={loadStatus}>
                            Создать аккаунт
                        </Button>
                    </Flex>
                </Card>
            </Form.Root>
        </Box>
    );
}

export default memo(FormSignUp);
