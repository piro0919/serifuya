import Footer from "components/organisms/Footer";
import Header from "components/organisms/Header";
import React, { FC, useMemo } from "react";
import "./style.module.scss";
import { useWindowHeight } from "@react-hook/window-size";

const Layout: FC = ({ children }) => {
  const windowHeight = useWindowHeight();
  const style = useMemo(() => ({ minHeight: windowHeight }), [windowHeight]);

  return (
    <div style={style} styleName="layout">
      <div styleName="header-wrapper">
        <Header />
      </div>
      <main styleName="main">{children}</main>
      <div styleName="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
