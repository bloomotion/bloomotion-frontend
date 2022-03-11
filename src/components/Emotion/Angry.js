import React, { useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  ANGRY_AREACHART_VERTICAL_WIDTH,
  ANGRY_CIRCLE_COLOR_CODE,
  ANGRY_COLORS_CODE,
  CANVAS,
} from "../../constants/emotion";
import { calculateEmotionDegree } from "../../utils/emotion";

const AreaChartContainer = styled.div`
  position: relative;

  .positionAbsolute {
    position: absolute;
  }
`;

function Angry({ emotionDegree }) {
  const width = CANVAS.width;
  const height = CANVAS.height;
  const svgArray = [];
  const array = Array.from(Array(12).keys());
  const colors = calculateEmotionDegree(ANGRY_COLORS_CODE, emotionDegree);
  const circleColor = calculateEmotionDegree(
    ANGRY_CIRCLE_COLOR_CODE,
    emotionDegree,
  )[0];
  const chartArea = d3
    .area()
    .x((d, i) => i * 200)
    .y0(900)
    .y1((d) => 700 - d)
    .curve(d3.curveBasis);

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

  function createPath(max, min) {
    const array = [];

    for (let i = 0; i < 12; i++) {
      const randomNum = Math.floor(Math.random() * max + min);

      array.push(randomNum);
    }

    return array;
  }

  function animateAreaChart(to, from, index, svg) {
    const targetSvg = svg.selectAll("path").data([array]).join("path");

    repeat();

    function repeat() {
      targetSvg
        .transition()
        .duration(2000)
        .attr("d", chartArea(createPath(to, from)))
        .attr("fill", colors[index])
        .on("end", repeat);
    }
  }

  function animateCircle(svg) {
    const data = [
      {
        x: d3.randomUniform(0, width)(),
        y: d3.randomUniform(0, height)(),
        r: d3.randomUniform(20, 80)(),
      },
    ];

    const circle = svg.append("circle").data(data);
    const direction = [true, false];
    const randomDirection = Math.floor(d3.randomUniform(0, 2)());
    let isXEnd = direction[randomDirection];
    let isYEnd = direction[randomDirection];

    circle
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .style("fill", circleColor);

    repeat();

    function repeat() {
      circle
        .transition()
        .duration(10)
        .attr("cx", (d) => {
          if (d.x + d.r >= width) {
            isXEnd = true;
          }
          if (d.x - d.r < 0) {
            isXEnd = false;
          }
          if (isXEnd) {
            return (d.x = d.x - 5);
          }
          if (!isXEnd) {
            return (d.x = d.x + 5);
          }
        })
        .attr("cy", (d) => {
          if (d.y + d.r >= height) {
            isYEnd = true;
          }
          if (d.y - d.r < 0) {
            isYEnd = false;
          }
          if (isYEnd) {
            return (d.y = d.y - 5);
          }
          if (!isYEnd) {
            return (d.y = d.y + 5);
          }
        })
        .on("end", repeat);
    }
  }

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      svgArray.push(createSvg(i));
    }

    for (let i = 0; i < 5; i++) {
      animateAreaChart(
        ANGRY_AREACHART_VERTICAL_WIDTH[i].to,
        ANGRY_AREACHART_VERTICAL_WIDTH[i].from,
        i,
        svgArray[i],
      );

      animateCircle(svgArray[i]);
    }

    return () => {
      d3.select("#canvas").remove();
    };
  }, []);

  return <AreaChartContainer id="canvas"></AreaChartContainer>;
}

export default Angry;

Angry.propTypes = {
  emotionDegree: PropTypes.string,
};
