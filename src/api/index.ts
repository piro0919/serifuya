import firebase from 'firebase/app';
import 'firebase/storage';
import getConfig from 'next/config'


const { publicRuntimeConfig: { API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } } = getConfig();

const firebaseConfig = {
  apiKey: API_KEY,
  appId: APP_ID,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  measurementId: MEASUREMENT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export type ListAll = {
  name: string;
}[];

export const getListAll = async (): Promise<ListAll> => {
  const storageRef = storage.ref("voices")
  const listAll = await storageRef.listAll();

  return listAll.items.map(({ name }) => ({ name }))
};

export const getDownloadURL = async (): Promise<any> => {
  const storageRef = storage.ref("voices")

  return storageRef.child("voices/あさですよー.mp3").getDownloadURL()
}
