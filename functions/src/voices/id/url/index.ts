import * as functions from "firebase-functions";
import { storage as adminStorage } from "firebase-admin/lib/storage";
import * as dayjs from "dayjs";

type voicesParams = {
  firestore: FirebaseFirestore.Firestore;
  storage: adminStorage.Storage;
};

type ResBody = {
  downloadUrl: string;
  expires: string;
};

const url = ({ firestore, storage }: voicesParams) => async (
  { method, params: { id } }: functions.https.Request,
  response: functions.Response<ResBody>
) => {
  if (method === "GET") {
    const docRef = firestore.collection("voices").doc(id);
    const snapshot = await docRef.get();
    const name = snapshot.get("name");
    const expires = dayjs().locale("ja").add(3, "minute").toDate();
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
  }
};

export default url;
