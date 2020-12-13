import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";
import * as dotenv from "dotenv";
import * as wanakana from "wanakana";

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
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV === "development"
      ? functions.config().serifuya.access_control_allow_origin_development
      : functions.config().serifuya.access_control_allow_origin_production
  );

  next();
});

type VoicesResBody = {
  id: string;
  name: any;
}[];

app.get(
  "/voices",
  async (
    { query: { limit = "0", locale, offset = "0" } }: any,
    response: functions.Response<VoicesResBody>
  ) => {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection("voices");
    const { size } = await collectionRef.get();
    const { docs } = await collectionRef
      .orderBy("name", "asc")
      .limit(parseInt(limit, 10))
      .offset(parseInt(offset, 10))
      .get();
    const body = docs.map((doc) => {
      const { id } = doc;

      return {
        id: id,
        name: doc.get(locale === "en" ? "name_en" : "name"),
      };
    });

    response.set("size", size.toString());
    response.send(body);
  }
);

type VoicesIdResBody = {
  downloadUrl: string;
  expires: string;
  name: any;
  romaji?: any;
};

app.get(
  "/voices/:id",
  async (
    { params: { id }, query: { locale }, ...a }: any,
    response: functions.Response<VoicesIdResBody>
  ) => {
    const firestore = admin.firestore();
    const docRef = firestore.collection("voices").doc(id);
    const snapshot = await docRef.get();
    const name = snapshot.get("name");
    const nameEn = snapshot.get("name_en");
    const expires = dayjs().locale("ja").add(3, "minute").toDate();
    const romaji =
      locale === "en" ? wanakana.toRomaji(snapshot.get("name")) : null;

    if (process.env.NODE_ENV === "development") {
      response.send({
        downloadUrl: "",
        expires: expires.toString(),
        name,
        romaji,
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
      romaji,
      downloadUrl: signedUrl[0],
      expires: expires.toString(),
      name: locale === "en" ? nameEn : name,
    });
  }
);

app.post(
  "/mail",
  async (
    { body: { body, email, name, subject } }: any,
    res: functions.Response
  ) => {
    const send = require("gmail-send")({
      pass: functions.config().serifuya.password,
      user: functions.config().serifuya.user,
    });

    send(
      {
        from: `${name} <${email}>`,
        html: body.replace(/\n/g, "<br />"),
        subject: `[serifuya] ${subject}`,
        to: `piro <${functions.config().serifuya.user}>`,
      },
      (err: any) => res.status(err ? 550 : 200).send()
    );
  }
);

main.use("", app);

export const api = functions.region("asia-northeast1").https.onRequest(main);
