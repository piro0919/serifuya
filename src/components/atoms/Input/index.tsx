import React, { ComponentPropsWithRef, FC, forwardRef } from "react";
import "./style.module.scss";

export type InputProps = Pick<
  ComponentPropsWithRef<"input">,
  "name" | "ref" | "type"
>;

const Input: FC<InputProps> = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "ref">
>(({ name, type }, ref) => (
  <input name={name} ref={ref} styleName="input" type={type} />
));

export default Input;
