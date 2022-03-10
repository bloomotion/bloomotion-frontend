import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { authentication } from "./firebase-config";
import { ACCESS_TOKEN, SERVER_ERROR } from "../constants/auth";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(authentication, provider);
    const { email } = userCredential.user;
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      { email },
      {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      },
    );

    const { accessToken } = res.data.result;

    localStorage.setItem(ACCESS_TOKEN, accessToken);

    axios.defaults.headers.common[ACCESS_TOKEN] =
      localStorage.getItem(ACCESS_TOKEN);

    return res.data.result.id;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getLoggedInUser() {
  try {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return;
    }

    axios.defaults.headers.common[ACCESS_TOKEN] =
      localStorage.getItem(ACCESS_TOKEN);

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/login/verification`,
      {
        withCredentials: true,
      },
    );

    return res.data.result.id;
  } catch (err) {
    throw new Error(SERVER_ERROR);
  }
}
