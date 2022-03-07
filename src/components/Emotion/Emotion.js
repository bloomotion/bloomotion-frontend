import React from "react";
import { useParams } from "react-router-dom";

import Logout from "../Logout/Logout";
import Angry from "./Angry";
import Happy from "./Happy";
import Sad from "./Sad";

function Emotion() {
  const { state } = useParams();

  return (
    <>
      <Logout />
      {state === "happy" && <Happy />}
      {state === "sad" && <Sad />}
      {state === "angry" && <Angry />}
    </>
  );
}

export default Emotion;
