import React, { useCallback } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Detail, { DetailProps } from "components/organisms/Detail";
import api from "api";
import "firebase/storage";
import Head, { HeadProps } from "components/templates/Head";
import FileSaver from "file-saver";

export type IdProps = Pick<DetailProps, "expires"> & {
  downloadUrl: DetailProps["src"];
  name: HeadProps["title"];
};

const Id: NextPage<IdProps> = ({ downloadUrl, expires, name }) => {
  const handleClick = useCallback<DetailProps["handleClick"]>(() => {
    FileSaver.saveAs(downloadUrl, `${name}.mp3`);
  }, [downloadUrl, name]);

  return (
    <Layout>
      <Head title={name} />
      <Detail
        expires={expires}
        handleClick={handleClick}
        heading={name}
        src={downloadUrl}
      />
    </Layout>
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
