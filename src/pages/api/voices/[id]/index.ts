import api from "pages/api";
import { NextApiRequest, NextApiResponse } from "next";

type ResBody = {
  downloadUrl: string;
  expires: string;
  name: any;
};

const id = async (
  { method, query: { id } }: NextApiRequest,
  res: NextApiResponse<ResBody>
) => {
  if (method === "GET") {
    const { data } = await api.get(`/voices/${id}`);

    res.status(200).send(data);
  }
};

export default id;
