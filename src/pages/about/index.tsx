import React from "react";
import { NextPage } from "next";
import Layout from "components/templates/Layout";
import Head from "components/templates/Head";
import AboutComponent from "components/organisms/About";

const About: NextPage = () => (
  <Layout>
    <Head title="せりふやについて" />
    <AboutComponent />
  </Layout>
);

export default About;
