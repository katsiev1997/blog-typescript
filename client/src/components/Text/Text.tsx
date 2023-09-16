import { FC, ReactNode } from "react";
import cls from "./Text.module.scss";

type AsTypes = "h2" | "h1" | "span" | "p";
type ColorTypes = "solid" | "default";
type SizesType = 24 | 16 | 12;
type FwType = 700 | 500 | 400;

interface TextProps {
  children: ReactNode;
  as?: AsTypes;
  size?: SizesType;
  weight?: FwType;
  color?: ColorTypes;
  className?: string;
}

const sizeClasses: Record<SizesType, string> = {
  24: cls.size24,
  16: cls.size16,
  12: cls.size12,
};
const fwClasses: Record<FwType, string> = {
  700: cls.fw700,
  500: cls.fw500,
  400: cls.fw400,
};
const colorClasses: Record<ColorTypes, string> = {
  solid: cls.solid,
  default: cls.default,
};

const Text: FC<TextProps> = ({
  children,
  as = "h2",
  size = 24,
  weight = 700,
  color = "default",
  className = "",
}) => {
  const getTag: Record<AsTypes, JSX.Element> = {
    h2: (
      <h2
        className={`${className} ${sizeClasses[size]} ${fwClasses[weight]} ${colorClasses[color]}`}
      >
        {children}
      </h2>
    ),
    h1: (
      <h1
        className={`${className} ${sizeClasses[size]} ${fwClasses[weight]} ${colorClasses[color]}`}
      >
        {children}
      </h1>
    ),
    span: (
      <span
        className={`${className} ${sizeClasses[size]} ${fwClasses[weight]} ${colorClasses[color]}`}
      >
        {children}
      </span>
    ),
    p: (
      <p
        className={`${className} ${sizeClasses[size]} ${fwClasses[weight]} ${colorClasses[color]}`}
      >
        {children}
      </p>
    ),
  };
  return getTag[as];
};

export default Text;
