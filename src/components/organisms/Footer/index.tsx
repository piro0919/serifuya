import { useI18n } from "next-localization";
import Link from "next/link";
import React, { FC } from "react";
import "./style.module.scss";

const Footer: FC = () => {
  const { t } = useI18n();

  return (
    <footer styleName="footer">
      <small>{`© 2020 ${t("common.title")}`}</small>
      <nav styleName="navigation">
        <Link href="/about">
          <a>{t("common.aboutSerifuya")}</a>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
