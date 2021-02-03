import React, { ComponentPropsWithoutRef, FC } from "react";
import "./style.module.scss";

export type ButtonProps = Pick<
  ComponentPropsWithoutRef<"button">,
  "disabled" | "onClick" | "style" | "type"
>;

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  style,
  type,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    style={style}
    styleName="button"
    type={type}
  >
    {children}
  </button>
);

export default Button;
