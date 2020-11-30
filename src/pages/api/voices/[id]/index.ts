import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";

type ResBody = {
  downloadUrl: string;
  expires: string;
  name: any;
}

const id = async ({ method, query: { id } }: NextApiRequest, res: NextApiResponse<ResBody>) => {
  if (method === 'GET') {
    const { data } = await axios.get(
      `http://localhost:5001/serifuya-1f5b4/asia-northeast1/api/voices/${id}`
    );

    res.status(200).send(data)
  }
}

export default id;
