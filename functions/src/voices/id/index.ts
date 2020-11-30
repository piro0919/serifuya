import * as functions from "firebase-functions";

type voicesParams = {
  firestore: FirebaseFirestore.Firestore;
};

type ResBody = {
  name: any;
};

const id = ({ firestore }: voicesParams) => async (
  { method, params: { id: voicesId } }: functions.https.Request,
  response: functions.Response<ResBody>
) => {
  if (method === "GET") {
    const docRef = firestore.collection("voices").doc(voicesId);
    const snapshot = await docRef.get();
    const name = snapshot.get("name");

    response.send({
      name,
    });
  }
};

export default id;
