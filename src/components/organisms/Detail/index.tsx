/* eslint-disable jsx-a11y/anchor-is-valid */
import DownloadIcon from "components/atoms/DownloadIcon";
import Heading2, { Heading2Props } from "components/atoms/Heading2";
import React, { ComponentPropsWithoutRef, FC } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "./style.module.scss";
import ReactTooltip from "react-tooltip";
import dayjs from "dayjs";

export type DetailProps = {
  expires: string;
  handleClick: ComponentPropsWithoutRef<"button">["onClick"];
  heading: Heading2Props["children"];
  src: string;
};

const Detail: FC<DetailProps> = ({ expires, handleClick, heading, src }) => (
  <div styleName="wrapper">
    <div styleName="heading2-wrapper">
      <Heading2>{heading}</Heading2>
      <a data-for="expires" data-tip={true}>
        <button onClick={handleClick}>
          <DownloadIcon />
        </button>
      </a>
      <ReactTooltip effect="solid" id="expires" place="left">
        <span styleName="expires">{`${dayjs(expires).format(
          "YYYY/MM/DD HH:mm:ss"
        )} まで有効`}</span>
      </ReactTooltip>
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
