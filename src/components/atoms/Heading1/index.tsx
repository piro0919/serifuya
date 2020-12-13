import { useI18n } from "next-localization";
import React, { FC } from "react";
import "./style.module.scss";

const Heading1: FC = () => {
  const { t } = useI18n();

  return <h1 styleName="heading1">{t("common.title")}</h1>;
};

export default Heading1;
