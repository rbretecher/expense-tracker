import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default async () => {
  if (process.env.DEV) {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    firebase.initializeApp(firebaseConfig);
  } else {
    const response = await fetch('/__/firebase/init.json');
    firebase.initializeApp(await response.json());
  }
};
