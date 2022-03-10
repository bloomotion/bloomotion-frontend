import axios from "axios";

import { ACCESS_TOKEN } from "../constants/auth";
import { UNREGISTERED_USER } from "../constants/emotion";

export async function setUserEmotion(userId, emotion, confidence, flower) {
  try {
    axios.defaults.headers.common[ACCESS_TOKEN] =
      localStorage.getItem(ACCESS_TOKEN);

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/emotion`,
      { emotion, confidence, flower },
      {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      },
    );

    return res.data;
  } catch (err) {
    throw new Error(UNREGISTERED_USER);
  }
}
