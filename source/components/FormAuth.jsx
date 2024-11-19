import React, { Fragment, memo, useState, useRef, useEffect } from "react";
import { Box, Card, Flex, Heading, Text, Container, TextField, Link, Button } from "@radix-ui/themes";
import "./FormAuth.css";

function FormAuth(props) {
    
    //const [$3, set$3] = useState($4);

    // мы можем использовать useRef чтобы сохранять что-то своё,
    // не вызывая перерендер компонента
    const myRef = useRef(0);


    useEffect(() => {
        //componentDidMount
        return () => {
            // componentWillUnmount
        }
    }, []);

    return (
		

		<Box maxWidth="400px" mx="auto">
        <Card size="4">
			<Heading as="h3" size="6" trim="start" mb="4" align='center'>
				Авторизация
			</Heading>

			<Box mb="5">
				<Flex mb="1">
					<Text
						as="label"
						htmlFor="input-auth-login"
						size="2"
						weight="bold"
					>
					    Эл. почта
					</Text>
				</Flex>
				<TextField.Root
					placeholder="Введите ваш email"
					id="input-auth-login"
				/>
			</Box>

			<Box mb="5" position="relative">
				<Flex align="baseline" justify="between" mb="1">
					<Text
						as="label"
						size="2"
						weight="bold"
						htmlFor="input-auth-pass"
					>
					    Пароль
					</Text>
					<Link
						href="#"
						size="2"
						onClick={(e) => e.preventDefault()}
					>
						Забыли пароль?
					</Link>
				</Flex>
				<TextField.Root
					placeholder="Введите ваш пароль"
					id="input-auth-pass"
				/>
			</Box>

			<Flex mt="6" justify="end" gap="3">
				<Button variant="outline">
					Создать аккаунт
				</Button>
				<Button>
                    Авторизоваться
                </Button>
			</Flex>
		</Card>
		</Box>
    );
}

export default memo(FormAuth);