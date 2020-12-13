import { useRouter } from "next/dist/client/router";
import React, { FC, useCallback, useMemo } from "react";
import Switch, { ReactSwitchProps } from "react-switch";
import "./style.module.scss";

const LocaleToggle: FC = () => {
  const { asPath, locale, push } = useRouter();
  const checked = useMemo<ReactSwitchProps["checked"]>(() => locale === "ja", [
    locale,
  ]);
  const handleChange = useCallback<ReactSwitchProps["onChange"]>(
    (checked) => {
      push(asPath, asPath, { locale: checked ? "ja" : "en" });
    },
    [asPath, push]
  );

  return (
    <Switch
      checked={checked}
      checkedIcon={<div styleName="icon">ja</div>}
      handleDiameter={18}
      height={24}
      offColor="#868686"
      onChange={handleChange}
      onColor="#868686"
      uncheckedIcon={<div styleName="icon">en</div>}
      width={44}
    />
  );
};

export default LocaleToggle;
