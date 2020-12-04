import React, { ComponentPropsWithoutRef, FC } from "react";
import "./style.module.scss";

export type ButtonProps = Pick<
  ComponentPropsWithoutRef<"button">,
  "disabled" | "type"
>;

const Button: FC<ButtonProps> = ({ children, disabled, type }) => (
  <button disabled={disabled} styleName="button" type={type}>
    {children}
  </button>
);

export default Button;
