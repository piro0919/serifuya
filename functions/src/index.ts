import * as functions from 'firebase-functions';
import * as express from 'express';
import voices from "./voices";
import voicesId from "./voices/id";
import * as admin from "firebase-admin";

const app = express();
const { firebase } = functions.config()

if (!admin.apps.length) {
  admin.initializeApp(firebase)
}

const firestore = admin.firestore();

app.get("/voices", voices(firestore) as any)
app.get("/voices/:id", voicesId(firestore) as any)

const main = express();

main.use('', app);

export const api = functions.region("asia-northeast1").https.onRequest(main);
