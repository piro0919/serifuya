import DownloadIcon from "components/atoms/DownloadIcon";
import Heading2, { Heading2Props } from "components/atoms/Heading2";
import React, { ComponentPropsWithoutRef, FC } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "./style.module.scss";

export type DetailProps = {
  handleClick: ComponentPropsWithoutRef<"button">["onClick"];
  heading: Heading2Props["children"];
  src: string;
};

const Detail: FC<DetailProps> = ({ handleClick, heading, src }) => (
  <div styleName="wrapper">
    <div styleName="heading2-wrapper">
      <Heading2>{heading}</Heading2>
      <button onClick={handleClick}>
        <DownloadIcon />
      </button>
    </div>
    <div styleName="player-wrapper">
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
