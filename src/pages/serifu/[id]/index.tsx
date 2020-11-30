import React, { useCallback, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Detail, { DetailProps } from "components/organisms/Detail";
import api from "api";
import "firebase/storage";
import Head, { HeadProps } from "components/templates/Head";
import FileSaver from "file-saver";

export type IdProps = {
  id: string;
  name: HeadProps["title"];
};

const Id: NextPage<IdProps> = ({ id, name }) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [expires, setExpires] = useState("");
  const handleClick = useCallback<DetailProps["handleClick"]>(() => {
    FileSaver.saveAs(downloadUrl, `${name}.mp3`);
  }, []);

  useEffect(() => {
    const callback = async () => {
      const {
        data: { downloadUrl, expires },
      } = await api.get(`/voices/${id}/url`);

      setDownloadUrl(downloadUrl);
      setExpires(expires);
    };

    callback();
  }, []);

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

export const getStaticProps: GetStaticProps<IdProps> = async ({
  params: { id },
}) => {
  const {
    data: { name },
  } = await api.get(`/voices/${id}`);

  return {
    props: {
      name,
      id: Array.isArray(id) ? "" : id,
    },
  };
};

type IdParams = {
  id: any;
};

export const getStaticPaths: GetStaticPaths<IdParams> = async () => {
  const { data } = await api.get("/voices");
  const paths = data.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

export default Id;
