import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { authentication } from "./firebase-config";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(authentication, provider);
    const { displayName, email } = userCredential.user;
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      { displayName, email },
      {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      },
    );

    const { accessToken } = res.data.result;

    localStorage.setItem("accessToken", accessToken);

    return res.data.result.id;
  } catch (err) {
    console.error(err);
  }
}
