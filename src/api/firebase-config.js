import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkiB3van-1fo3auv2S2gaWg533rOx4jw4",
  authDomain: "bloomotion-d2afe.firebaseapp.com",
  projectId: "bloomotion-d2afe",
  storageBucket: "bloomotion-d2afe.appspot.com",
  messagingSenderId: "631384776126",
  appId: "1:631384776126:web:14821a477126b292e26def",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
