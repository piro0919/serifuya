import React, { FC } from "react";
import { HatenaIcon } from "react-share";
import useShareIconConstant from "hooks/useShareIconConstant";

const ShareHatenaIcon: FC = () => {
  const { round, size } = useShareIconConstant();

  return <HatenaIcon round={round} size={size} />;
};

export default ShareHatenaIcon;
