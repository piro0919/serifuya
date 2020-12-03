/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React, { FC } from "react";
import "./style.module.scss";

const Footer: FC = () => (
  <footer styleName="footer">
    <small>© 2020 せりふや</small>
    <nav styleName="navigation">
      <Link href="/about">
        <a>せりふやについて</a>
      </Link>
    </nav>
  </footer>
);

export default Footer;
