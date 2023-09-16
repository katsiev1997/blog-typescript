import cls from "./Header.module.scss";
import React from "react";
import Button from "../Button/Button";
import { getAuthData } from "../../redux/selectors/auth/getAuthData";
import { User } from "../../redux/types/authTypes";
import { useSelector } from "react-redux";

const Header = () => {
  const authData: User | null = useSelector(getAuthData);
  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.headerWrap}>
          <div className={cls.headerLogo}></div>
          {authData ? (
            <div>
              <Button to="addPost">Добавить пост</Button>
            </div>
          ) : (
            <div className={cls.headerRight}>
              <Button to="/login">Войти</Button>
              <Button to="/signup" variant="outline">
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
