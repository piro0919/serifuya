import Footer from "components/organisms/Footer";
import Header from "components/organisms/Header";
import React, { FC, useMemo } from "react";
import "./style.module.scss";
import { useWindowHeight } from "@react-hook/window-size";
import NoSSR from "react-no-ssr";

const Layout: FC = ({ children }) => {
  const windowHeight = useWindowHeight();
  const style = useMemo(() => ({ minHeight: windowHeight }), [windowHeight]);

  return (
    <NoSSR>
      <div style={style} styleName="layout">
        <div styleName="header-wrapper">
          <Header />
        </div>
        <main styleName="main">{children}</main>
        <div styleName="footer-wrapper">
          <Footer />
        </div>
      </div>
    </NoSSR>
  );
};

export default Layout;
