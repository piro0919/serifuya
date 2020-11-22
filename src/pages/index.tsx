import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import "./style.module.scss";
import Layout from "components/templates/Layout";
import axios from "axios";
import { getListAll } from "api";

type Voice = {
  nameWithoutExtension: string;
};

const Pages: NextPage = () => {
  const [voices, setVoices] = useState<Voice[]>([]);

  useEffect(() => {
    const callback = async () => {
      const listAll = await getListAll();

      setVoices(
        listAll.map(({ name }) => ({
          nameWithoutExtension: name.replace(/\.[^/.]+$/, ""),
        }))
      );
    };

    callback();
  }, []);

  return (
    <Layout>
      <div styleName="hoge">
        {voices.map(({ nameWithoutExtension }) => (
          <div key={nameWithoutExtension}>{nameWithoutExtension}</div>
        ))}
      </div>
    </Layout>
  );
};

export default Pages;
