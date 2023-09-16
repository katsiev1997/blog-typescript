import { FC, InputHTMLAttributes, useState } from "react";
import cls from "./Input.module.scss";
import Text from "../Text/Text";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  error = "",
}) => {
  const [show, setShow] = useState<boolean>(false);
  const onShow = () => {
    setShow(!show);
  };
  return (
    <div className={cls.field}>
      <input
        className={cls.input}
        type={type === "password" && show ? "text" : type}
        placeholder={placeholder}
        value={value || ""}
        name={name}
        onChange={onChange}
      />
      {type === "password" && (
        <span onClick={onShow} className={cls.show}>
          {show ? "Скрыть" : "Показать"}
        </span>
      )}

      {error && (
        <Text
          as="span"
          color="solid"
          size={12}
          weight={500}
          className={cls.error}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default Input;
