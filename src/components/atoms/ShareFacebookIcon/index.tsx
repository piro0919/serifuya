import useShareIconConstant from "hooks/useShareIconConstant";
import React, { FC } from "react";
import { FacebookIcon } from "react-share";

const ShareFacebookIcon: FC = () => {
  const { round, size } = useShareIconConstant();

  return <FacebookIcon round={round} size={size} />;
};

export default ShareFacebookIcon;
