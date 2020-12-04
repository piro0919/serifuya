import React, { ComponentPropsWithRef, FC, forwardRef } from "react";
import "./style.module.scss";

export type TextareaProps = Pick<
  ComponentPropsWithRef<"textarea">,
  "name" | "ref"
>;

const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaProps, "ref">
>(({ name }, ref) => <textarea name={name} ref={ref} styleName="textarea" />);

export default Textarea;
