import Button, { ButtonProps } from "components/atoms/Button";
import Heading2 from "components/atoms/Heading2";
import Input, { InputProps } from "components/atoms/Input";
import Textarea, { TextareaProps } from "components/atoms/Textarea";
import React, { ComponentPropsWithoutRef, FC, forwardRef } from "react";
import "./style.module.scss";

export type AboutProps = Pick<InputProps, "ref"> &
  Pick<TextareaProps, "ref"> &
  Pick<ButtonProps, "disabled"> & {
    handleSubmit: ComponentPropsWithoutRef<"form">["onSubmit"];
  };

const About: FC<AboutProps> = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  Omit<AboutProps, "ref">
>(({ disabled, handleSubmit }, ref) => (
  <div styleName="wrapper">
    <article styleName="article">
      <Heading2>素材のご利用について</Heading2>
      <ul>
        <li>ボイス素材は全て無料でご使用いただけます</li>
        <li>著作権は放棄しておりません</li>
        <li>ボイス素材の再配布はご遠慮ください</li>
        <li>公序良俗に反するサイト、法律に違反する使用はご遠慮ください</li>
        <li>反社会的勢力や違法行為に関わる使用はご遠慮ください</li>
        <li>その他、不適切な使用はご遠慮ください</li>
      </ul>
    </article>
    <article styleName="article">
      <Heading2>リクエスト、お仕事について</Heading2>
      <p>
        ボイス素材のリクエストや、声に関するお仕事を募集しております。
        <br />
        コンタクトフォームよりお気軽にご連絡ください。
      </p>
    </article>
    <article styleName="article">
      <Heading2>コンタクト</Heading2>
      <form onSubmit={handleSubmit}>
        <div styleName="form-inner">
          <div styleName="form-labels-wrapper">
            <label styleName="label">
              名前
              <Input name="name" ref={ref} />
            </label>
            <label styleName="label">
              メールアドレス
              <Input name="email" ref={ref} type="email" />
            </label>
            <label styleName="label">
              件名
              <Input name="subject" ref={ref} />
            </label>
            <label styleName="label">
              内容
              <Textarea name="body" ref={ref} />
            </label>
          </div>
          <Button disabled={disabled} type="submit">
            送信
          </Button>
        </div>
      </form>
    </article>
  </div>
));

export default About;
