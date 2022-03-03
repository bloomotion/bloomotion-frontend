import axios from "axios";

export async function setUserEmotion(userId, emotion, confidence, flower) {
  try {
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
    console.error(err);
  }
}

export async function getUserEmotion(userId) {
  try {
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
