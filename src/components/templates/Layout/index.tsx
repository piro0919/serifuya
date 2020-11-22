import Footer from "components/organisms/Footer";
import Header from "components/organisms/Header";
import React, { FC } from "react";
import "./style.module.scss";

const Layout: FC = ({ children }) => (
  <div styleName="layout">
    <div styleName="header-wrapper">
      <Header />
    </div>
    <main styleName="main">{children}</main>
    <div styleName="footer-wrapper">
      <Footer />
    </div>
  </div>
);

export default Layout;
