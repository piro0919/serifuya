import React, { useCallback } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Top, { TopProps } from "components/organisms/Top";
import Seo from "components/templates/Seo";
import api from "lib/api";
import { useRouter } from "next/dist/client/router";
import { getLngDict } from "lib/i18n";

type ServerSideProps = Pick<TopProps, "current" | "total" | "voices">;

export type PagesProps = ServerSideProps;

const Pages: NextPage<PagesProps> = ({ current, total, voices }) => {
  const { push } = useRouter();
  const handleChange = useCallback<TopProps["handleChange"]>(
    (page) => {
      push({
        pathname: "/",
        query: {
          page,
        },
      });
    },
    [push]
  );

  return (
    <>
      <Seo />
      <Layout>
        <Top
          current={current}
          handleChange={handleChange}
          total={total}
          voices={voices}
        />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PagesProps> = async ({
  locale,
  query: { page },
}) => {
  if (Array.isArray(page)) {
    return {
      props: {
        current: 0,
        size: 0,
        voices: [],
      },
    };
  }

  const current = page ? parseInt(page, 10) : 1;
  const {
    data,
    headers: { size },
  } = await api.get("/voices", {
    params: {
      locale,
      limit: 50,
      offset: (current - 1) * 50,
    },
  });
  const voices = data.map(({ id, name }) => ({
    id,
    name,
  }));
  const lngDict = await getLngDict(locale);

  return {
    props: {
      current,
      lngDict,
      voices,
      total: parseInt(size, 10),
    },
  };
};

export default Pages;
