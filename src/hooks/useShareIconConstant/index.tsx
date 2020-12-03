import { useMemo } from "react";

const useShareIconConstant = () => {
  const shareIconConstant = useMemo(
    () => ({
      round: true,
      size: 24,
    }),
    []
  );

  return shareIconConstant;
};

export default useShareIconConstant;
