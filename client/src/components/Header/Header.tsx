import cls from "./Header.module.scss";
import React from "react";
import Button from "../Button/Button";
import { getAuthData } from "../../redux/selectors/auth/getAuthData";
import { User } from "../../redux/types/authTypes";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log(123);
  };

  const authData: User | null = useSelector(getAuthData);
  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.headerWrap}>
          <div className={cls.headerLogo}></div>
          {authData ? (
            <div className={cls.authData}>
              <Button to="addPost">Добавить пост</Button>
              <div onClick={onOpen} className={cls.dropDown}>
                {authData.avatar ? (
                  <img src={authData.avatar} alt="" />
                ) : (
                  <div className={cls.avatar}>
                    {authData.username.slice(0, 1)}
                    {isOpen && (
                      <ul>
                        <li>Профиль</li>
                        <li onClick={() => handleLogout()}>Выход</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
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
