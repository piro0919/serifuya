import * as functions from "firebase-functions";
import * as express from "express";
import voices from "./voices";
import voicesId from "./voices/id";
import * as admin from "firebase-admin";

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
const firestore = admin.firestore();
const storage = admin.storage();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://serifuya.kk-web.link");

  next();
});

app.get("/voices", voices({ firestore }) as any);
app.get("/voices/:id", voicesId({ firestore, storage }) as any);

main.use("", app);

export const api = functions.region("asia-northeast1").https.onRequest(main);
