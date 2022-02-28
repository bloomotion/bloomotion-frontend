import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

import { videoSize } from "../../constants/dailyPhoto";
import { setUserEmotion } from "../../api/emotion";
import { TYPE } from "../../constants/flower";
import { useParams } from "react-router-dom";

const DailyPhotoWrapper = styled.div`
  position: relative;
`;

const VideoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
`;

const VideoContainer = styled.video`
  transform: rotateY(180deg);
`;

const VideoButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 440px;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
`;

const CanvasContainer = styled.canvas`
  transform: rotateY(180deg);
`;

const Notification = styled.p`
  position: absolute;
  bottom: 10px;
  left: 20px;
  color: #ffffff;
`;

const PhotoButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;

  button {
    margin-right: 10px;
    border: none;
    background-color: #000000;
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
  }
`;

function DailyPhoto() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasExpression, setHasExpression] = useState(true);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: videoSize.width, height: videoSize.height },
      })
      .then((stream) => {
        const video = videoRef.current;

        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = videoSize.width;
    const height = videoSize.height;
    const video = videoRef.current;
    const photo = photoRef.current;

    setHasExpression(true);

    photo.width = width;
    photo.height = height;
    photo.style.display = "block";

    const ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    const photo = photoRef.current;
    const ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    photo.style.display = "none";
    setHasPhoto(false);
  };

  const handleImage = async () => {
    try {
      const detections = await faceapi
        .detectSingleFace(
          photoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        )
        .withFaceExpressions();

      if (!detections) {
        setHasExpression(false);

        return;
      }

      const expressionTypes = Object.keys(detections.expressions);
      let confidence = 0.000001;
      let strongestEmotion;

      expressionTypes.forEach((type) => {
        if (confidence < detections.expressions[type]) {
          confidence = detections.expressions[type];
          strongestEmotion = type;
        }
      });

      await setUserEmotion(
        id,
        strongestEmotion,
        confidence,
        TYPE[strongestEmotion],
      );
    } catch (err) {
      console.error(err);
    }
  };

  const submitPhoto = async () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ])
      .then(handleImage)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <DailyPhotoWrapper>
      <VideoWrapper>
        <VideoContainer ref={videoRef}></VideoContainer>
        <VideoButton onClick={takePhoto} />
      </VideoWrapper>
      <CanvasWrapper>
        <CanvasContainer ref={photoRef} />
        {hasPhoto && (
          <>
            {!hasExpression && (
              <Notification>
                얼굴 인식을 할 수 없습니다. 다시 촬영해 주세요.
              </Notification>
            )}
            <PhotoButtonWrapper>
              <button onClick={closePhoto}>retake</button>
              <button onClick={submitPhoto}>submit</button>
            </PhotoButtonWrapper>
          </>
        )}
      </CanvasWrapper>
    </DailyPhotoWrapper>
  );
}

export default DailyPhoto;
