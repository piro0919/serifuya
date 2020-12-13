import Button, { ButtonProps } from "components/atoms/Button";
import Heading2 from "components/atoms/Heading2";
import Input, { InputProps } from "components/atoms/Input";
import Textarea, { TextareaProps } from "components/atoms/Textarea";
import React, {
  ComponentPropsWithoutRef,
  FC,
  forwardRef,
  Fragment,
  useMemo,
} from "react";
import "./style.module.scss";
import uniqid from "uniqid";
import { useI18n } from "next-localization";

export type AboutProps = Pick<InputProps, "ref"> &
  Pick<TextareaProps, "ref"> &
  Pick<ButtonProps, "disabled"> & {
    handleSubmit: ComponentPropsWithoutRef<"form">["onSubmit"];
  };

const About: FC<AboutProps> = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  Omit<AboutProps, "ref">
>(({ disabled, handleSubmit }, ref) => {
  const { t } = useI18n();
  const aboutTheUseOfMaterialsText = useMemo(
    () =>
      t("about.aboutTheUseOfMaterialsText")
        .split("\n")
        .map((text, index) => (
          <Fragment key={uniqid()}>
            {index ? <br /> : null}
            {text}
          </Fragment>
        )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t("about.aboutTheUseOfMaterialsText")]
  );
  const aboutRequestAndWorkText = useMemo(
    () =>
      t("about.aboutRequestAndWorkText")
        .split("\n")
        .map((text, index) => (
          <Fragment key={uniqid()}>
            {index ? <br /> : null}
            {text}
          </Fragment>
        )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t("about.aboutRequestAndWorkText")]
  );

  return (
    <div styleName="wrapper">
      <article styleName="article">
        <Heading2>{t("about.aboutTheUseOfMaterials")}</Heading2>
        <p>{aboutTheUseOfMaterialsText}</p>
      </article>
      <article styleName="article">
        <Heading2>{t("about.aboutRequestAndWork")}</Heading2>
        <p>{aboutRequestAndWorkText}</p>
      </article>
      <article styleName="article">
        <Heading2>{t("about.contact")}</Heading2>
        <form onSubmit={handleSubmit}>
          <div styleName="form-inner">
            <div styleName="form-labels-wrapper">
              <label styleName="label">
                {t("about.name")}
                <Input name="name" ref={ref} />
              </label>
              <label styleName="label">
                {t("about.emailAddress")}
                <Input name="email" ref={ref} type="email" />
              </label>
              <label styleName="label">
                {t("about.subject")}
                <Input name="subject" ref={ref} />
              </label>
              <label styleName="label">
                {t("about.message")}
                <Textarea name="body" ref={ref} />
              </label>
            </div>
            <Button disabled={disabled} type="submit">
              {t("about.submit")}
            </Button>
          </div>
        </form>
      </article>
    </div>
  );
});

export default About;
