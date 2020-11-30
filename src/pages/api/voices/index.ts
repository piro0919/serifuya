import { NextApiRequest, NextApiResponse } from "next";
import api from "pages/api";

type ResBody = {
  id: string;
  name: any;
}[];

const voices = async (
  { method }: NextApiRequest,
  res: NextApiResponse<ResBody>
) => {
  if (method === "GET") {
    const { data } = await api.get("voices");

    res.status(200).send(data);
  }
};

export default voices;
