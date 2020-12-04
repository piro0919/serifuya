import React, { useCallback } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Top, { TopProps } from "components/organisms/Top";
import Head from "components/templates/Head";
import api from "api";
import { useRouter } from "next/dist/client/router";

export type PagesProps = Pick<TopProps, "current" | "total" | "voices">;

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
    <Layout>
      <Head />
      <Top
        current={current}
        handleChange={handleChange}
        total={total}
        voices={voices}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PagesProps> = async ({
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
      current,
      limit: 50,
      offset: (current - 1) * 50,
    },
  });
  const voices = data.map(({ id, name }) => ({ id, name }));

  return {
    props: {
      current,
      voices,
      total: parseInt(size, 10),
    },
  };
};

export default Pages;
