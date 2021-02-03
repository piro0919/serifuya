import firebase from "firebase/app";
import "firebase/auth";
import withFirebaseAuth, {
  WrappedComponentProps,
} from "react-with-firebase-auth";

export type CreateComponentWithAuthProps = WrappedComponentProps;

const firebaseApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
const withCreateComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

export default withCreateComponentWithAuth;
