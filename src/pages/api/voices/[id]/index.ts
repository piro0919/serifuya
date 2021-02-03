import { IncomingMessage, ServerResponse } from "http";

const id = ({ method, ...req }: IncomingMessage, res: ServerResponse) => {
  switch (method) {
    case "GET": {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          downloadUrl: "",
          expires: "Thu Dec 17 2020 19:37:58 GMT+0000 (協定世界時)",
          name: "あさですよー",
          romaji: null,
        })
      );

      break;
    }
    default: {
      break;
    }
  }
};

export default id;
