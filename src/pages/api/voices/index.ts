import { IncomingMessage, ServerResponse } from "http";

const voices = ({ method }: IncomingMessage, res: ServerResponse) => {
  switch (method) {
    case "GET": {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("size", "96");
      res.end(
        JSON.stringify([
          { id: "k3ggW7SVHONoxjM8WpSj", name: "あさですよー" },
          { id: "H5xQATdYFGHEcpVq0Auj", name: "あそぼっ" },
          { id: "stdYOZXKdimbV4mBlHfT", name: "ありがとう" },
          { id: "my6dunWZmfygNdIrIXZp", name: "あーあ" },
          { id: "S8Nkz7nXwftp8XeucXZY", name: "あーよかった" },
          { id: "Xs0M91rP77Pn0H3y9X8I", name: "いかがでしょうか" },
          { id: "je1ql1zXjPZp9Xpi2Ehe", name: "いっくぞー" },
          { id: "0Sx2zmeOr8OhwFo09foH", name: "いってらっしゃい" },
          { id: "TKB78orfnAUqm9Lx2f81", name: "いつもありがとうございます" },
          { id: "WIIQGGGDOi7EgeUZxKUM", name: "いててててててて" },
          { id: "HgfahdDUKcvWXnMfdrrC", name: "いらっしゃい" },
          { id: "O5yfjqSvsjsSNW5pnp05", name: "いーい？" },
          { id: "RzY3uiQpC2DeJniTANtx", name: "うまい！" },
          { id: "lyvSbJWHBzUH0KJO08My", name: "うるさい！" },
          { id: "X5Rz4czgLvuKb844ge4a", name: "うれしいです" },
          { id: "0tIClwNpkiNs4L8wnoY8", name: "えっ" },
          { id: "zqqyq2b6nHB3Ti4d1KDl", name: "えーなんでー？" },
          { id: "px75EseKbYdyfeGOdxkk", name: "おいしー" },
          { id: "ZWT0dfMwoOVSS0QycBnh", name: "おうえんしてます" },
          { id: "Sq9tLQUpbVLV0GzQqONd", name: "おぉー" },
          { id: "G6u37hPTbrvLDCr5WoUR", name: "おかえりなさい" },
          { id: "FJSDgkSpxQD7icr5osOH", name: "おこまりごとはありませんか？" },
          { id: "rLOezQVMX7TAxM8XCcFX", name: "おしえて？" },
          { id: "R0S5y7zMmpZYfs9oAVJn", name: "おそいよー" },
          { id: "W28Xk60yUMTmWVvUd8EQ", name: "おつかれさまです" },
          { id: "QoL0hQg4BMklJGQwfYES", name: "おてすうおかけします" },
          { id: "QDqmnGU2iLEC9I6iDkmA", name: "おなかすいたなぁ" },
          { id: "8PDsHdRpdGOGFJngoSdP", name: "おねがいです" },
          { id: "HlvBvXTAXmwf0ncPbXNr", name: "おはよう" },
          { id: "waJLZq9MTatoyI3wawFc", name: "おはようございます" },
          { id: "FQcl4M6JC1aBepr9EyV6", name: "おまわりさーん" },
          { id: "M11HHtq1ygpZtcGskmA4", name: "おめでとうございます" },
          { id: "c7rIean98jJhWiWunmor", name: "おやすみなさい" },
          { id: "sgdygc9r2xSIibOPnv1M", name: "がんばってください" },
          { id: "isWIkWdNHwtLIxRT7o6V", name: "きめた！" },
          {
            id: "Ie9DtdIosoMwEe4eXnRN",
            name: "きょうもいちにちおつかれさまです",
          },
          { id: "fL8Rpnlu0gSS1lOeWyBv", name: "げんき？" },
          { id: "agerRh2HgphRPgTxPXjg", name: "こちらをごらんください" },
          { id: "WUtcOROlGdT9neIcSEnM", name: "こっちこっち" },
          { id: "8fOesoIqdpCRMHHNVkAM", name: "これたべてもいーい？" },
          { id: "kCleX6FGLrSpWazSzwpX", name: "これなにー？" },
          { id: "RLpLrLIbM7YLmPKaw78F", name: "こんにちは" },
          { id: "Rk13woOmxPayeyF9HQzJ", name: "こんばんは" },
          { id: "Osa0R22XEshCqXuqQTro", name: "ごかくにんおねがいします" },
          { id: "cgz7sfMwqBOEfQZegYhr", name: "ごちそうさま" },
          { id: "ulc55GoPKK7QGjBMJEky", name: "ごめんごめん" },
          { id: "5cfDQ2PkVx94x7D3al82", name: "ごめんなさい" },
          { id: "2kj6uTJ7rN33oZbSp7EM", name: "さぁどうぞ" },
          { id: "zBb5PvuAnEJfiVPH0Prn", name: "さようならー" },
          { id: "ZnGT493852XpaACUokzq", name: "さんきゅー" },
        ])
      );

      break;
    }
    default: {
      break;
    }
  }
};

export default voices;
