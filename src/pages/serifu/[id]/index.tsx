import React, { useCallback } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Detail, { DetailProps } from "components/organisms/Detail";
import axios from "axios";
import "firebase/storage";
import Head, { HeadProps } from "components/templates/Head";
import FileSaver from "file-saver";

export type IdProps = {
  downloadUrl: DetailProps["src"];
  name: HeadProps["title"];
};

const Id: NextPage<IdProps> = ({ expires, downloadUrl, name }) => {
  const handleClick = useCallback<DetailProps["handleClick"]>(() => {
    FileSaver.saveAs(downloadUrl, "hoge.mp3");
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
    data: { downloadUrl, expires, name },
  } = await axios.get(`http://localhost:3000/api/voices/${id}`);

  return {
    props: {
      expires,
      downloadUrl,
      name,
    },
  };
};

type IdParams = {
  id: any;
};

export const getStaticPaths: GetStaticPaths<IdParams> = async () => {
  const { data } = await axios.get("http://localhost:3000/api/voices");
  const paths = data.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

export default Id;
