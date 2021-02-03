import Button from "components/atoms/Button";
import Heading1 from "components/atoms/Heading1";
import LocaleToggle from "components/atoms/LocaleToggle";
import ShareIcons from "components/molecules/ShareIcons";
import withCreateComponentWithAuth, {
  CreateComponentWithAuthProps,
} from "hocs/withCreateComponentWithAuth";
import Link from "next/link";
import React, { FC, useEffect, useMemo } from "react";
import "./style.module.scss";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useI18n } from "next-localization";
import { destroyCookie, setCookie } from "nookies";

export type HeaderProps = CreateComponentWithAuthProps;

const Header: FC<HeaderProps> = ({
  loading,
  signInWithGoogle,
  signOut,
  user,
}) => {
  const { t } = useI18n();
  const button = useMemo(
    () => {
      const style = { width: "112px" };
      if (loading) {
        return (
          <Button style={style}>
            <ScaleLoader color="#222" height={8} width={4} />
          </Button>
        );
      }

      return user ? (
        <Button onClick={signOut} style={style}>
          {t("common.signOut")}
        </Button>
      ) : (
        <Button onClick={signInWithGoogle} style={style}>
          {t("common.signIn")}
        </Button>
      );
    } /* eslint-disable react-hooks/exhaustive-deps */,
    [
      loading,
      signInWithGoogle,
      signOut,
      t("common.signIn"),
      t("common.signOut"),
      user,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );

  useEffect(() => {
    if (!user) {
      destroyCookie(null, "idToken");

      return;
    }

    user.getIdToken(true).then((idToken) => {
      setCookie(null, "idToken", idToken, {});
    });
  }, [user]);

  return (
    <header styleName="header">
      <Link href="/">
        <a>
          <Heading1 />
        </a>
      </Link>
      <div styleName="settings-wrapper">
        <LocaleToggle />
        <ShareIcons />
        {button}
      </div>
    </header>
  );
};

export default withCreateComponentWithAuth(Header);
