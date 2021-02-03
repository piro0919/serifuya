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

const firebaseAppAuth = admin.auth();
const firestore = admin.firestore();
const storage = admin.storage();
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
    { query: { limit = "0", locale, offset = "0" } }: express.Request,
    response: express.Response<VoicesResBody>
  ) => {
    const collectionRef = firestore.collection("voices");
    const { size } = await collectionRef.get();
    const { docs } = await collectionRef
      .orderBy("name", "asc")
      .limit(parseInt(limit as string, 10))
      .offset(parseInt(offset as string, 10))
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
  name: any;
  romaji?: any;
};

app.get(
  "/voices/:id",
  async (
    { params: { id }, query: { locale } }: express.Request,
    response: express.Response<VoicesIdResBody>
  ) => {
    const docRef = firestore.collection("voices").doc(id);
    const snapshot = await docRef.get();
    const name = snapshot.get("name");
    const nameEn = snapshot.get("name_en");
    const romaji =
      locale === "en" ? wanakana.toRomaji(snapshot.get("name")) : null;

    response.send({
      romaji,
      name: locale === "en" ? nameEn : name,
    });
  }
);

type VoicesIdDownloadResBody = {
  downloadUrl: string;
  expires: string;
};

app.get(
  "/voices/:id/download",
  async (
    { headers: { authorization }, params: { id } }: express.Request,
    response: express.Response<VoicesIdDownloadResBody>
  ) => {
    if (!authorization) {
      response.sendStatus(401);

      return;
    }

    const idToken = authorization.split(" ")[1];
    const expires = dayjs().locale("ja").add(3, "minute").toDate();

    firebaseAppAuth
      .verifyIdToken(idToken)
      .then(async () => {
        const docRef = firestore.collection("voices").doc(id);
        const snapshot = await docRef.get();
        const name = snapshot.get("name");
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
        });
      })
      .catch(() => {
        response.sendStatus(400);
      });
  }
);

app.post(
  "/mail",
  async (
    { body: { body, email, name, subject } }: express.Request,
    res: express.Response
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
