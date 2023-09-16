import { Button, Card, Input, Text } from "../../components";
import { AuthStateUserData } from "../../utils/typescript";
import { validAuthData } from "../../utils/validation";
import cls from "./auth.module.scss";
import axios from "axios";

import React from "react";

const SignUpPage = () => {
  const [userData, setUserData] = React.useState<AuthStateUserData>({
    username: "",
    password: "",
    cf_password: "",
  });
  const [errors, setErrors] = React.useState<AuthStateUserData>({
    username: "",
    password: "",
    cf_password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: any = validAuthData(userData);

    console.log(Object.values(errors));

    if (errors.status !== 200) {
      return setErrors(errors);
    }

    delete userData.cf_password;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        userData
      );
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  console.log(errors);

  return (
    <div className={cls.auth}>
      <Card className={cls.card}>
        <Text as="h2">Регистрация</Text>
        <form noValidate onSubmit={onSubmit} className={cls.authForm}>
          <Input
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={userData.username}
            error={errors.username}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={userData.password}
            error={errors.password}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            name="cf_password"
            onChange={handleChange}
            value={userData.cf_password}
            error={errors.cf_password ? errors.cf_password : ""}
          />

          <Button max type="submit" variant="default">
            Зарегистрироваться
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
