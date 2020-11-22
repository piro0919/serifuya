import Heading1 from "components/atoms/Heading1";
import React, { FC } from "react";
import "./style.module.scss";

const Header: FC = () => (
  <header styleName="header">
    <Heading1 />
  </header>
);

export default Header;
