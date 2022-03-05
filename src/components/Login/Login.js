import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";

import { getLoggedInUser, signInWithGoogle } from "../../api/auth";
import { CANVAS } from "../../constants/emotion";

const LoginButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
`;

const Notification = styled.p`
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  color: red;
`;

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const userId = await signInWithGoogle();

      navigate(`/users/${userId}/photo`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(async () => {
    try {
      const userId = await getLoggedInUser();

      if (userId) {
        navigate(`/users/${userId}/photo`);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }

    const canvas = d3
      .select("#container")
      .append("svg")
      .attr("width", CANVAS.width)
      .attr("height", CANVAS.height)
      .style("background-color", "#000000")
      .on("mousemove", circleDrawing);

    let hue = 0;

    function circleDrawing(event) {
      const mouseCoordinate = d3.pointer(event);

      canvas
        .insert("circle")
        .attr("cx", mouseCoordinate[0])
        .attr("cy", mouseCoordinate[1])
        .attr("r", 0.0001)
        .style("stroke", d3.hsl(hue > 360 ? (hue = 0) : hue++, 1, 0.5))
        .style("stroke-opacity", 1)
        .style("stroke-width", 2.5)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 130)
        .style("stroke-opacity", 0)
        .remove();
    }
  }, []);

  return (
    <>
      <div id="container"></div>
      <LoginButton onClick={handleLogin}>login</LoginButton>
      <Notification>{errorMessage}</Notification>
    </>
  );
}

export default Login;
