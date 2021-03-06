import React, { useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";

import { CANVAS, HAPPY_COLOR_CODE } from "../../constants/emotion";
import { calculateEmotionDegree } from "../../utils/emotion";

const AreaChartContainer = styled.div`
  position: absolute;

  .positionAbsolute {
    position: absolute;
  }
`;

function Happy({ emotionDegree }) {
  const width = CANVAS.width;
  const height = CANVAS.height;
  const svgArray = [];
  const randomCoordinateX = (d) => d3.randomNormal(d, 350)();
  const randomCoordinateY = d3.randomNormal(height / 2, 250);
  const randomX = d3.randomNormal(width / 2, 100);
  const randomSize = d3.randomUniform(30, 130);
  const colors = calculateEmotionDegree(HAPPY_COLOR_CODE, emotionDegree);

  function createSvg(index) {
    const newSvg = d3
      .select("#canvas")
      .append("svg")
      .attr("id", `svg${index}`)
      .attr("class", "positionAbsolute")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent");

    return newSvg;
  }

  function animateCircles(svg) {
    const standardX = randomX();
    const data = d3.range(100).map(function () {
      return { x: randomCoordinateX(standardX), y: randomCoordinateY() };
    });
    const circles = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d3.randomUniform(200, 1200)())
      .attr("cy", d3.randomUniform(100, 800)());

    circles
      .data(data)
      .style("fill", "transparent")
      .transition()
      .ease(d3.easeExp)
      .duration(2000)
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("r", randomSize)
      .attr("opacity", 1)
      .style("fill", () => colors[Math.floor(d3.randomUniform(0, 6)())])
      .transition()
      .ease(d3.easeExp)
      .duration(4000)
      .attr("opacity", 0)
      .attr("cx", function (d) {
        if (d.x > standardX) {
          return d.x + (d.x - standardX);
        }

        return d.x - (standardX - d.x);
      })
      .attr("cy", function (d) {
        if (d.y > height / 2) {
          return d.y + (d.y - height / 2);
        }

        return d.y - (height / 2 - d.y);
      })
      .attr("r", 0);
  }

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      svgArray.push(createSvg(i));
    }

    animateCircles(svgArray[0]);

    setTimeout(() => {
      animateCircles(svgArray[1]);
    }, 3500);

    const repeatAnimateCircles1 = setInterval(() => {
      animateCircles(svgArray[0]);
    }, 7000);

    const repeatAnimateCircles2 = setTimeout(() => {
      setInterval(() => {
        animateCircles(svgArray[1]);
      }, 7000);
    }, 3500);

    return () => {
      clearInterval(repeatAnimateCircles1);
      clearInterval(repeatAnimateCircles2);
      d3.select("#canvas").remove();
    };
  }, []);

  return <AreaChartContainer id="canvas"></AreaChartContainer>;
}

export default Happy;

Happy.propTypes = {
  emotionDegree: PropTypes.string,
};
