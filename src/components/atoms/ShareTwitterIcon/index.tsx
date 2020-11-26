import React, { FC } from "react";
import { TwitterIcon } from "react-share";
import useShareIconConstant from "hooks/useShareIconConstant";

const ShareTwitterIcon: FC = () => {
  const { round, size } = useShareIconConstant();

  return <TwitterIcon round={round} size={size} />;
};

export default ShareTwitterIcon;
