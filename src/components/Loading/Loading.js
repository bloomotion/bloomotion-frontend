import React from "react";
import styled from "styled-components";

const LoadingGrid = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    animation: loading 1.2s linear infinite;
  }

  div:nth-child(1) {
    top: 8px;
    left: 8px;
    background-color: #ff6060;
    animation-delay: 0s;
  }

  div:nth-child(2) {
    top: 8px;
    left: 32px;
    background-color: #ffa160;
    animation-delay: -0.4s;
  }

  div:nth-child(3) {
    top: 8px;
    left: 56px;
    background-color: #fff860;
    animation-delay: -0.8s;
  }

  div:nth-child(4) {
    top: 32px;
    left: 8px;
    background-color: #7fff60;
    animation-delay: -0.4s;
  }

  div:nth-child(5) {
    top: 32px;
    left: 32px;
    background-color: #60e0ff;
    animation-delay: -0.8s;
  }

  div:nth-child(6) {
    top: 32px;
    left: 56px;
    background-color: #608eff;
    animation-delay: -1.2s;
  }

  div:nth-child(7) {
    top: 56px;
    left: 8px;
    background-color: #9660ff;
    animation-delay: -0.8s;
  }

  div:nth-child(8) {
    top: 56px;
    left: 32px;
    background-color: #ff60ff;
    animation-delay: -1.2s;
  }

  div:nth-child(9) {
    top: 56px;
    left: 56px;
    background-color: #ff6093;
    animation-delay: -1.6s;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;

const LoadingText = styled.p`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Loading() {
  return (
    <>
      <LoadingGrid>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingGrid>
      <LoadingText>잠시만 기다려 주세요</LoadingText>
    </>
  );
}

export default Loading;
