import ShareEmailIcon from "components/atoms/ShareEmailIcon";
import ShareFacebookIcon from "components/atoms/ShareFacebookIcon";
import ShareHatenaIcon from "components/atoms/ShareHatenaIcon";
import ShareLineIcon from "components/atoms/ShareLineIcon";
import ShareTwitterIcon from "components/atoms/ShareTwitterIcon";
import { useRouter } from "next/router";
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
      <div>
        <TwitterShareButton url={url}>
          <ShareTwitterIcon />
        </TwitterShareButton>
      </div>
      <div>
        <FacebookShareButton url={url}>
          <ShareFacebookIcon />
        </FacebookShareButton>
      </div>
      <div>
        <EmailShareButton url={url}>
          <ShareEmailIcon />
        </EmailShareButton>
      </div>
      <div>
        <LineShareButton url={url}>
          <ShareLineIcon />
        </LineShareButton>
      </div>
      <div>
        <HatenaShareButton url={url}>
          <ShareHatenaIcon />
        </HatenaShareButton>
      </div>
    </div>
  );
};

export default ShareIcons;
