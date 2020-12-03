import React, { useCallback, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import SerifuList, { SerifuListProps } from "components/organisms/SerifuList";
import Head from "components/templates/Head";
import api from "api";

type Voice = {
  id: string;
  name: any;
};

export type PagesProps = {
  voices: Voice[];
};

const Pages: NextPage<PagesProps> = ({ voices }) => {
  const [dataLength, setDataLength] = useState<SerifuListProps["dataLength"]>(
    voices.length
  );
  const [serifuListVoices, setSerifuListVoices] = useState<
    SerifuListProps["voices"]
  >(voices);
  const next = useCallback<SerifuListProps["next"]>(async () => {
    const { data } = await api.get("/voices", {
      params: {
        limit: 48,
        offset: dataLength,
      },
    });

    setSerifuListVoices((prevSerifuListVoices) =>
      prevSerifuListVoices.concat(data.map(({ id, name }) => ({ id, name })))
    );
  }, [dataLength]);

  useEffect(() => {
    setDataLength(serifuListVoices.length);
  }, [serifuListVoices]);

  return (
    <Layout>
      <Head />
      <SerifuList
        dataLength={dataLength}
        next={next}
        voices={serifuListVoices}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PagesProps> = async () => {
  const { data } = await api.get("/voices", {
    params: {
      limit: 48,
      offset: 0,
    },
  });
  const voices = data.map(({ id, name }) => ({ id, name }));

  return {
    props: {
      voices,
    },
  };
};

export default Pages;
