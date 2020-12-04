import React, { useCallback, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Detail, { DetailProps } from "components/organisms/Detail";
import api from "api";
import "firebase/storage";
import Head, { HeadProps } from "components/templates/Head";
import FileSaver from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";

export type IdProps = {
  downloadUrl: DetailProps["src"];
  expires: string;
  name: HeadProps["title"];
};

const Id: NextPage<IdProps> = ({ downloadUrl, expires, name }) => {
  const handleClick = useCallback<DetailProps["handleClick"]>(() => {
    FileSaver.saveAs(downloadUrl, `${name}.mp3`);
  }, [downloadUrl, name]);

  useEffect(() => {
    toast.info(`${dayjs(expires).format("YYYY/MM/DD HH:mm:ss")} まで有効`);
  }, [expires]);

  return (
    <>
      <Layout>
        <Head title={name} />
        <Detail handleClick={handleClick} heading={name} src={downloadUrl} />
      </Layout>
      <ToastContainer position="bottom-right" style={{ fontSize: "1.4rem" }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IdProps> = async ({
  params: { id },
}) => {
  const {
    data: { downloadUrl, expires, name },
  } = await api.get(`/voices/${id}`);

  return {
    props: {
      downloadUrl,
      expires,
      name,
    },
  };
};

export default Id;
