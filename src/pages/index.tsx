// import React from "react";
// import { GetServerSideProps, NextPage } from "next";
// import Layout from "components/templates/Layout";
// import SerifuList from "components/organisms/SerifuList";
// import Head from "components/templates/Head";
// import api from "api";

// type Voice = {
//   id: string;
//   name: any;
// };

// export type PagesProps = {
//   voices: Voice[];
// };

// const Pages: NextPage<PagesProps> = ({ voices }) => (
//   <Layout>
//     <Head />
//     <SerifuList voices={voices} />
//   </Layout>
// );

// export const getServerSideProps: GetServerSideProps<PagesProps> = async () => {
//   const { data } = await api.get("/voices");
//   const voices = data.map(({ id, name }) => ({ id, name }));

//   return {
//     props: {
//       voices,
//     },
//   };
// };

// export default Pages;

import React from "react";
import { NextPage } from "next";

const Pages: NextPage = () => <div>a</div>;

export default Pages;
