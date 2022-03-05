import axios from "axios";

import { ACCESS_TOKEN } from "../constants/auth";

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
    throw new Error("등록되지 않은 사용자 입니다. 다시 로그인 해주세요.");
  }
}

export async function getUserEmotion(userId) {
  try {
    axios.defaults.headers.common[ACCESS_TOKEN] =
      localStorage.getItem(ACCESS_TOKEN);

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/emotion`,
      {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      },
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
}
