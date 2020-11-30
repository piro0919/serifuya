import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";
import * as dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length && process.env.FIREBASE_CONFIG) {
  const { databaseURL, storageBucket, projectId } = JSON.parse(
    process.env.FIREBASE_CONFIG
  );

  admin.initializeApp({
    databaseURL,
    storageBucket,
    credential: admin.credential.cert({
      projectId,
      clientEmail: functions.config().serifuya.client_email,
      privateKey: functions.config().serifuya.private_key.replace(/\\n/g, "\n"),
    }),
  });
}

const app = express();
const main = express();

app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://serifuya.kk-web.link"
  );

  next();
});

type VoicesResBody = {
  id: string;
  name: any;
}[];

app.get(
  "/voices",
  async ({ method }: any, response: functions.Response<VoicesResBody>) => {
    if (method === "GET") {
      const firestore = admin.firestore();
      const collectionRef = firestore.collection("voices");
      const { docs } = await collectionRef
        .orderBy("name", "asc")
        .limit(0)
        .offset(0)
        .get();
      const body = docs.map((doc) => {
        const { id } = doc;

        return {
          id: id,
          name: doc.get("name"),
        };
      });

      response.send(body);
    }
  }
);

type VoicesIdResBody = {
  downloadUrl: string;
  expires: string;
  name: any;
};

app.get(
  "/voices/:id",
  async (
    { method, params: { id } }: any,
    response: functions.Response<VoicesIdResBody>
  ) => {
    if (method === "GET") {
      const firestore = admin.firestore();
      const docRef = firestore.collection("voices").doc(id);
      const snapshot = await docRef.get();
      const name = snapshot.get("name");
      const expires = dayjs().locale("ja").add(3, "minute").toDate();

      if (process.env.NODE_ENV === "development") {
        response.send({
          downloadUrl: "",
          expires: expires.toString(),
          name,
        });

        return;
      }

      const storage = admin.storage();
      const signedUrl = await storage
        .bucket()
        .file(`voices/${name}.mp3`)
        .getSignedUrl({
          expires,
          action: "read",
        });

      response.send({
        downloadUrl: signedUrl[0],
        expires: expires.toString(),
        name,
      });
    }
  }
);

main.use("", app);

export const api = functions.region("asia-northeast1").https.onRequest(main);
