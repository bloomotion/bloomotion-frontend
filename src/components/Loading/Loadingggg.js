import React from "react";
import styled from "styled-components";

const LoadingRing = styled.div`
  display: inline-block;
  margin-left: 47%;
  margin-top: 20%;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #000000 transparent #000000 transparent;
    animation: loading-ring 1.2s linear infinite;
  }

  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loadinggggg() {
  return <LoadingRing />;
}

export default Loadinggggg;
