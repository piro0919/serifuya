import React, { useCallback, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Detail, { DetailProps } from "components/organisms/Detail";
import api from "api";
import Seo, { SeoProps } from "components/templates/Seo";
import FileSaver from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import { getLngDict } from "lib/i18n";
import { useI18n } from "next-localization";

export type IdProps = Pick<DetailProps, "romaji"> & {
  downloadUrl: DetailProps["src"];
  expires: string;
  id: SeoProps["canonical"];
  name: SeoProps["title"];
};

const Id: NextPage<IdProps> = ({ downloadUrl, expires, id, name, romaji }) => {
  const { t } = useI18n();
  const handleClick = useCallback<DetailProps["handleClick"]>(() => {
    FileSaver.saveAs(downloadUrl, `${name}.mp3`);
  }, [downloadUrl, name]);

  useEffect(() => {
    toast.info(
      t("detail.toastMessage", {
        time: dayjs(expires).format("YYYY/MM/DD HH:mm:ss"),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t("detail.toastMessage")]);

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

export const getServerSideProps: GetServerSideProps<IdProps> = async ({
  locale,
  params: { id },
}) => {
  const {
    data: { downloadUrl, expires, name, romaji },
  } = await api.get(`/voices/${id}`, { params: { locale } });
  const lngDict = await getLngDict(locale);

  return {
    props: {
      downloadUrl,
      expires,
      lngDict,
      name,
      romaji,
      id: Array.isArray(id) ? "" : id,
    },
  };
};

export default Id;
