import { Button, Card, Input, Text } from "../../components";
import { AuthStateUserData } from "../../utils/typescript";
import { validAuthData } from "../../utils/validation";
import cls from "./auth.module.scss";

import React from "react";
import { login } from "../../redux/actions/authAction";
import { StateSchema, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getAuthError } from "../../redux/selectors/auth/getAuthError";

const LoginPage = () => {
  const [userData, setUserData] = React.useState<AuthStateUserData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<AuthStateUserData>({
    username: "",
    password: "",
    cf_password: "",
  });

  const dispatch = useAppDispatch()
  const authError = useSelector(getAuthError)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: any = validAuthData(userData);


    if (errors.status !== 200) {
      return setErrors(errors);
    }

    dispatch(login(userData))

    delete userData.cf_password;

  };
  return (
    <div className={cls.auth}>
      <Card className={cls.card}>
        {/* <h2>Регистрация</h2> */}
        <Text as="h2">Вход</Text>
        {authError && <Text as="span" size={12} weight={500} color="solid">{authError}</Text>}
        <form onSubmit={onSubmit} noValidate className={cls.authForm}>
          <Input
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            error={errors.password}
          />
          <Button max type="submit" variant="default">
            Войти
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
