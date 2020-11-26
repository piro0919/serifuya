import Heading1 from "components/atoms/Heading1";
import ShareIcons from "components/molecules/ShareIcons";
import Link from "next/link";
import React, { FC } from "react";
import "./style.module.scss";

const Header: FC = () => (
  <header styleName="header">
    <Link href="/">
      <a>
        <Heading1 />
      </a>
    </Link>
    <div>
      <ShareIcons />
    </div>
  </header>
);

export default Header;
