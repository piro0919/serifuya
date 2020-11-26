import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import { useRouter } from "next/router";
import Detail from "components/organisms/Detail";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
import getConfig from "next/config";

export type IdProps = {
  name: any;
};

const Id: NextPage<IdProps> = ({ name }) => {
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const callback = async () => {
      if (Array.isArray(name) || !name) {
        return;
      }

      const {
        publicRuntimeConfig: {
          API_KEY,
          APP_ID,
          AUTH_DOMAIN,
          DATABASE_URL,
          MEASUREMENT_ID,
          MESSAGING_SENDER_ID,
          PROJECT_ID,
          STORAGE_BUCKET,
        },
      } = getConfig();
      const firebaseConfig = {
        apiKey: API_KEY,
        appId: APP_ID,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        measurementId: MEASUREMENT_ID,
        messagingSenderId: MESSAGING_SENDER_ID,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const storage = firebase.storage();
      const storageRef = storage.ref("voices");
      const downloadUrl = await storageRef
        .child(`${name}.mp3`)
        .getDownloadURL();

      setDownloadUrl(downloadUrl);
    };

    callback();
  }, [name, setDownloadUrl]);

  return (
    <Layout>
      <Detail heading={name} src={downloadUrl} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IdProps> = async ({
  params: { id },
}) => {
  const {
    data: { name },
  } = await axios.get(`http://localhost:3000/api/voices/${id}`);

  return {
    props: {
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
