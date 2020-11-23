import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import "./style.module.scss";
import Layout from "components/templates/Layout";
import axios from "axios";
import { getListAll } from "api";
import Link from "next/link";

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
      <ul styleName="hoge">
        {voices.map(({ nameWithoutExtension }) => (
          <li key={nameWithoutExtension}>
            <Link href={`/serifu/${nameWithoutExtension}`}>
              <a>{nameWithoutExtension}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Pages;
