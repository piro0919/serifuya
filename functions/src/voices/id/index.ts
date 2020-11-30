import * as functions from 'firebase-functions';
import { storage as adminStorage } from 'firebase-admin/lib/storage';
import * as dayjs from "dayjs"

type voicesParams = {
  firestore: FirebaseFirestore.Firestore
  storage: adminStorage.Storage;
}

type ResBody = {
  downloadUrl: string;
  expires: string;
  name: any;
}

const id = ({ firestore, storage }: voicesParams) => async ({ method, params: { id: voicesId } }: functions.https.Request, response: functions.Response<ResBody>) => {
  if (method === "GET") {
    const docRef = firestore.collection("voices").doc(voicesId);
    const snapshot = await docRef.get();
    const name = snapshot.get("name")
    const expires = dayjs().add(3, "minute").toDate();
    const signedUrl = await storage.bucket().file(`voices/${name}.mp3`).getSignedUrl({
      expires,
      action: "read",
    })

    response.send({ name, downloadUrl: signedUrl[0], expires: expires.toString() });
  }
};

export default id;
