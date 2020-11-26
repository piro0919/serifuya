import { useMemo } from "react";

const useShareIconConstant = () => {
  const shareIconConstant = useMemo(
    () => ({
      round: true,
      size: 28,
    }),
    []
  );

  return shareIconConstant;
};

export default useShareIconConstant;
