// import React from "react";
import { memo, useState, useEffect } from "react";
import { eventFlow } from '../../../modules/events/eventEmitter';
import { Box, Card, Flex, Heading, Text, TextField, Button, Callout } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { iconQuestion } from "../../../elements/iconQuestion";
import "./FormSignIn.css";

function validEmail(email) {
	const REG_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return REG_EMAIL.test(email);
}

function FormSignIn({ loadStatus, errSignIn }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errLoginForms, setErrLoginForms] = useState(false);

	useEffect(() => {
		if (errLoginForms || errSignIn) {
			const errInfoElement = document.getElementById('err-info');
			errInfoElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
		}
	}, [errLoginForms, errSignIn]);

	const goPage = () => {
		eventFlow.emit("goPageSignUp");
	}

	const updateUser = (eo) => {
		eo.preventDefault();
		if (validEmail(email) && password.length > 0) {
			setErrLoginForms(false);
			eventFlow.emit("sendSignInData", email, password);
		} else {
			setErrLoginForms(true);
		}
	};

	return (
		<Box mx="auto" maxWidth="350px" minWidth="350px">
			<Form.Root onSubmit={updateUser} onReset={goPage}>
				<Card size="4">
					<Heading as="h3" size="6" trim="start" mb="4" align='center'>
						Авторизация
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Box>
					
                    {(errLoginForms || errSignIn) && (
                        <Callout.Root id='err-info'>
                            <Callout.Text as="div" size="1">
								{(errLoginForms) && (
									<Text as="div" className="sign-in__text">
										Проверьте правильность заполненных полей &quot;Эл. почта&quot; и &quot;Пароль&quot;. {iconQuestion}
									</Text>
								)}

								{(errSignIn) && (
									<Text as="div" className="sign-in__text">
										{errSignIn}
									</Text>
								)}
                            </Callout.Text>
                        </Callout.Root>
					)}
				 <Flex mt="6" justify="end" gap="3">
					 <Button variant="outline" style={{ width: "135px" }} type="reset" disabled={loadStatus}>
						 Создать аккаунт
					 </Button>

					 <Button style={{ width: "135px" }} type="submit" loading={loadStatus}>
						 Авторизоваться
					 </Button>
				 </Flex>
			 </Card>
		 </Form.Root>
	  </Box>
   );
}

export default memo(FormSignIn);