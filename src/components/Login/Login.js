import React, { useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";

import { signInWithGoogle } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

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

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = d3
      .select("#container")
      .append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
      .style("background-color", "black")
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

  const handleLogin = async () => {
    const userId = await signInWithGoogle();

    navigate(`/users/${userId}/photo`);
  };

  return (
    <>
      <div id="container"></div>
      <LoginButton onClick={handleLogin}>login</LoginButton>
    </>
  );
}

export default Login;
