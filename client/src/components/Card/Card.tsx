import { FC, ReactNode } from "react";
import cls from "./Card.module.scss";

type PaddingTypes = 15 | 20 | 30;

interface CardProps {
  padding?: PaddingTypes;
  text?: string;
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, padding = 30, className = ""}) => {
  const paddingClasses: Record<PaddingTypes, string> = {
    15: cls.padding15,
    20: cls.padding20,
    30: cls.padding30,
  };
  console.log(paddingClasses[padding]);

  return (
    <div className={`${cls.card} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
