import Footer from "components/organisms/Footer";
import Header from "components/organisms/Header";
import React, { FC, useMemo } from "react";
import "./style.module.scss";
import { useWindowHeight } from "@react-hook/window-size";
import NoSSR from "react-no-ssr";
import Image from "next/image";

const Layout: FC = ({ children }) => {
  const windowHeight = useWindowHeight();
  const style = useMemo(() => ({ minHeight: windowHeight }), [windowHeight]);

  return (
    <NoSSR>
      <div style={style} styleName="layout">
        <div styleName="header-wrapper">
          <div styleName="inner">
            <Header />
          </div>
        </div>
        <main styleName="main">{children}</main>
        <div styleName="footer-wrapper">
          <div styleName="inner">
            <Footer />
          </div>
        </div>
      </div>
      <div styleName="character-wrapper">
        <Image
          alt="character"
          height={2208}
          quality={100}
          src="/images/character.png"
          width={692}
        />
      </div>
    </NoSSR>
  );
};

export default Layout;
