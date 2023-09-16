import { AuthStateUserData } from "./typescript";

export const validAuthData = (userData: AuthStateUserData) => {
  const { username, password, cf_password } = userData;
  const errors: Record<string, string> = {
    username: "",
    password: "",
    cf_password: "",
  };
  if (username.length < 3 || username.length > 12) {
    return {
      ...errors,
      username: "Ошибка в поле username...",
    };
  }
  if (password.length < 6) {
    return {
      ...errors,
      password: "Минимум 6 символов",
    };
  } else if (cf_password && password !== cf_password) {
    return {
      ...errors,
      cf_password: "Пароли не совпадают",
    };
  }

  return {
    username: "",
    password: "",
    cf_password: "",
    status: 200,
  };
};
