import * as functions from "firebase-functions";
import * as express from "express";
import voices from "./voices";
import voicesId from "./voices/id";
import * as admin from "firebase-admin";

const app = express();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: "piyo",
      privateKey: "moge",
      projectId: "serifuya-1f5b4",
    }),
    databaseURL: "fuga",
    storageBucket: "hoge",
  });
}

const firestore = admin.firestore();
const storage = admin.storage();

app.get("/voices", voices({ firestore }) as any);
app.get("/voices/:id", voicesId({ firestore, storage }) as any);

const main = express();

main.use("", app);

export const api = functions.region("asia-northeast1").https.onRequest(main);
