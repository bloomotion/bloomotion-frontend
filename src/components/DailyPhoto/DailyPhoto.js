import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as faceapi from "face-api.js";

import { setUserEmotion } from "../../api/emotion";
import Logout from "../Logout/Logout";
import { VIDEO_SIZE } from "../../constants/dailyPhoto";
import { TYPE } from "../../constants/emotion";
import Loading from "../Loading/Loading";

const DailyPhotoWrapper = styled.div`
  position: relative;
`;

const PhotoBackGround = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 5%);
  background-color: #000000;
  width: 1400px;
  height: 720px;
`;

const VideoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 36px;
  transform: translateX(-50%);
`;

const VideoContainer = styled.video`
  transform: rotateY(180deg);
`;

const VideoButtonWrapper = styled.div`
  .outButton {
    position: absolute;
    bottom: 20px;
    left: 580px;
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border: none;
    border-radius: 50%;
  }

  .inButton {
    position: absolute;
    bottom: 23.5px;
    left: 583.5px;
    width: 43px;
    height: 43px;
    background-color: #ffffff;
    border: 2px solid #1c1c1c;
    border-radius: 50%;
    cursor: pointer;
  }

  .inButton:hover {
    background-color: #1c1c1c;
  }
`;

const CanvasWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 36px;
  transform: translateX(-50%);
`;

const CanvasContainer = styled.canvas`
  transform: rotateY(180deg);
`;

const Notification = styled.p`
  position: absolute;
  bottom: 0px;
  left: 20px;
  color: #ffffff;
`;

const PhotoButtonWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;

  button {
    width: 90px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #ffffff;
    background: none;
    font-size: 20px;
    color: #ffffff;
    transition: all 0.3s ease;
    overflow: hidden;
    cursor: pointer;
  }

  button:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

function DailyPhoto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: VIDEO_SIZE.width, height: VIDEO_SIZE.height },
      });

      setIsLoading(false);

      const video = videoRef.current;

      video.srcObject = stream;
      video.play();
    } catch (err) {
      console.error(err);
    }
  };

  const takePhoto = () => {
    const width = VIDEO_SIZE.width;
    const height = VIDEO_SIZE.height;
    const video = videoRef.current;
    const photo = photoRef.current;

    setErrorMessage("");

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
        setErrorMessage("얼굴 인식을 할 수 없습니다. 다시 촬영해 주세요.");

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

      navigate(`/users/${id}/emotion/${strongestEmotion}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const submitPhoto = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      await handleImage();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <>
      <Logout />
      {isLoading && <Loading />}
      {!isLoading && (
        <DailyPhotoWrapper>
          <PhotoBackGround />
          <VideoWrapper>
            <VideoContainer ref={videoRef}></VideoContainer>
            <VideoButtonWrapper>
              <button className="outButton" />
              <button className="inButton" onClick={takePhoto} />
            </VideoButtonWrapper>
          </VideoWrapper>
          <CanvasWrapper>
            <CanvasContainer ref={photoRef} />
            {hasPhoto && (
              <>
                {errorMessage.length !== 0 && (
                  <Notification>{errorMessage}</Notification>
                )}
                <PhotoButtonWrapper>
                  <button onClick={closePhoto}>retake</button>
                  <button onClick={submitPhoto}>submit</button>
                </PhotoButtonWrapper>
              </>
            )}
          </CanvasWrapper>
        </DailyPhotoWrapper>
      )}
    </>
  );
}

export default DailyPhoto;
