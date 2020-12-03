import ShareEmailIcon from "components/atoms/ShareEmailIcon";
import ShareFacebookIcon from "components/atoms/ShareFacebookIcon";
import ShareHatenaIcon from "components/atoms/ShareHatenaIcon";
import ShareLineIcon from "components/atoms/ShareLineIcon";
import ShareTwitterIcon from "components/atoms/ShareTwitterIcon";
import React, { FC, useEffect, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";
import "./style.module.scss";

const ShareIcons: FC = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const {
      location: { href },
    } = window;

    setUrl(href);
  }, []);

  return (
    <div styleName="wrapper">
      <TwitterShareButton url={url}>
        <ShareTwitterIcon />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <ShareFacebookIcon />
      </FacebookShareButton>
      <EmailShareButton url={url}>
        <ShareEmailIcon />
      </EmailShareButton>
      <LineShareButton url={url}>
        <ShareLineIcon />
      </LineShareButton>
      <HatenaShareButton url={url}>
        <ShareHatenaIcon />
      </HatenaShareButton>
    </div>
  );
};

export default ShareIcons;
