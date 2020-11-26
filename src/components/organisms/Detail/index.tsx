import Heading2, { Heading2Props } from "components/atoms/Heading2";
import React, { FC } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "./style.module.scss";

export type DetailProps = {
  heading: Heading2Props["children"];
  src: string;
};

const Detail: FC<DetailProps> = ({ heading, src }) => (
  <div styleName="wrapper">
    <div styleName="heading2-wrapper">
      <Heading2>{heading}</Heading2>
    </div>
    <div>
      <H5AudioPlayer
        autoPlay={true}
        customAdditionalControls={[]}
        showJumpControls={false}
        src={src}
      />
    </div>
  </div>
);

export default Detail;
