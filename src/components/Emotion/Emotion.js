import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  UPPERCASE_EMOTION_TYPE,
  UPPERCASE_FLOWER_TYPE,
} from "../../constants/emotion";

import Logout from "../Logout/Logout";
import Angry from "./Angry";
import Happy from "./Happy";
import Sad from "./Sad";

const EmotionType = styled.p`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000040;
  font-size: 40px;
`;

const FlowerType = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000040;
  font-size: 40px;
`;

function Emotion() {
  const { type, degree } = useParams();

  return (
    <>
      <Logout />
      <EmotionType>{UPPERCASE_EMOTION_TYPE[type]}</EmotionType>
      <FlowerType>{UPPERCASE_FLOWER_TYPE[type]}</FlowerType>
      {type === "happy" && <Happy emotionDegree={degree} />}
      {type === "sad" && <Sad emotionDegree={degree} />}
      {type === "angry" && <Angry emotionDegree={degree} />}
    </>
  );
}

export default Emotion;
