import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import SerifuList from "components/organisms/SerifuList";
import Head from "components/templates/Head";
import axios from "axios";

type Voice = {
  id: string;
  name: any;
};

export type PagesProps = {
  voices: Voice[];
};

const Pages: NextPage<PagesProps> = ({ voices }) => (
  <Layout>
    <Head />
    <SerifuList voices={voices} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps<PagesProps> = async () => {
  const { data } = await axios.get(
    `https://asia-northeast1-serifuya-1f5b4.cloudfunctions.net/api/voices`
  );
  const voices = data.map(({ id, name }) => ({ id, name }));

  return {
    props: {
      voices,
    },
  };
};

export default Pages;
