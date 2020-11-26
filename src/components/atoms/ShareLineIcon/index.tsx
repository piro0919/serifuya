import React, { FC } from "react";
import { LineIcon } from "react-share";
import useShareIconConstant from "hooks/useShareIconConstant";

const ShareLineIcon: FC = () => {
  const { round, size } = useShareIconConstant();

  return <LineIcon round={round} size={size} />;
};

export default ShareLineIcon;
