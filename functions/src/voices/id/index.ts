import * as functions from 'firebase-functions';

type ResBody = {
  name: any;
}

const id = (firestore: FirebaseFirestore.Firestore) => async ({ method, params: { id: voicesId } }: functions.https.Request, response: functions.Response<ResBody>) => {
  if (method === "GET") {
    const docRef = firestore.collection("voices").doc(voicesId);
    const snapshot = await docRef.get();

    response.send({ name: snapshot.get("name") });
  }
};

export default id;
