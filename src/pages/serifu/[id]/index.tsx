import React, { useCallback, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Detail, { DetailProps } from "components/organisms/Detail";
import api from "lib/api";
import Seo, { SeoProps } from "components/templates/Seo";
import FileSaver from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import { getLngDict } from "lib/i18n";
import { useI18n } from "next-localization";
import withCreateComponentWithAuth, {
  CreateComponentWithAuthProps,
} from "hocs/withCreateComponentWithAuth";
import { parseCookies } from "nookies";

type ServerSideProps = Pick<DetailProps, "romaji"> & {
  downloadUrl: DetailProps["src"];
  expires: string;
  id: SeoProps["canonical"];
  name: SeoProps["title"];
};

export type IdProps = CreateComponentWithAuthProps & ServerSideProps;

const Id: NextPage<IdProps> = ({
  downloadUrl,
  expires,
  id,
  name,
  romaji,
  user,
}) => {
  const { t } = useI18n();
  const handleClick = useCallback<DetailProps["handleClick"]>(() => {
    if (user) {
      FileSaver.saveAs(downloadUrl, `${name}.mp3`);

      return;
    }

    toast.warn(t("common.pleaseSignIn"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadUrl, name, t("common.pleaseSignIn"), user]);

  useEffect(() => {
    toast.info(
      t("detail.validUntilTime", {
        time: dayjs(expires).format("YYYY/MM/DD HH:mm:ss"),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t("detail.validUntilTime")]);

  return (
    <>
      <Seo canonical={`/serifu/${id}`} title={name} />
      <Layout>
        <Detail
          handleClick={handleClick}
          heading={name}
          romaji={romaji}
          src={downloadUrl}
        />
      </Layout>
      <ToastContainer position="bottom-right" style={{ fontSize: "1.4rem" }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const { idToken } = parseCookies(ctx);
  const {
    locale,
    params: { id: paramsId },
  } = ctx;
  const lngDict = await getLngDict(locale);
  const id = Array.isArray(paramsId) ? "" : paramsId;
  const {
    data: { name, romaji },
  } = await api.get(`/voices/${id}`, {
    params: { locale },
  });

  if (!idToken) {
    return {
      props: {
        id,
        lngDict,
        name,
        romaji,
        downloadUrl: "",
        expires: "",
      },
    };
  }

  const {
    data: { downloadUrl, expires },
  } = await api.get(`/voices/${id}/download`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });

  return {
    props: {
      downloadUrl,
      expires,
      id,
      lngDict,
      name,
      romaji,
    },
  };
};

export default withCreateComponentWithAuth(Id);
