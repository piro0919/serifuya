import useShareIconConstant from "hooks/useShareIconConstant";
import React, { FC } from "react";
import { EmailIcon } from "react-share";

const ShareEmailIcon: FC = () => {
  const { round, size } = useShareIconConstant();

  return <EmailIcon round={round} size={size} />;
};

export default ShareEmailIcon;
