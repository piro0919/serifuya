import * as functions from 'firebase-functions';

type ResBody = {
  id: string;
  name: any;
}[]

const voices = (firestore: FirebaseFirestore.Firestore) => async ({ method }: functions.https.Request, response: functions.Response<ResBody>) => {
  if (method === "GET") {
    const collectionRef = firestore.collection("voices");
    const { docs } = await collectionRef.orderBy('name', "asc").limit(0).offset(8).get();
    const body = docs.map((doc) => {
      const { id } = doc;

      return {
        id: id,
        name: doc.get("name"),
      }
    })

    response.send(body);
  }
};

export default voices;
