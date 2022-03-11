import React, { useEffect } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

import { CANVAS, SAD_COLORS_CODE } from "../../constants/emotion";
import { calculateEmotionDegree } from "../../utils/emotion";

function Sad({ emotionDegree }) {
  const width = CANVAS.width;
  const height = CANVAS.height;
  const randomDuration = d3.randomUniform(2000, 9000);
  const moveDistance = d3.randomUniform(50, -50);
  const colors = calculateEmotionDegree(SAD_COLORS_CODE, emotionDegree);

  function createSvg() {
    const svg = d3
      .select("#canvas")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent")
      .on("mouseover", (e) => {
        if (e.target.nodeName === "circle") {
          const circle = d3.select(e.target);

          circle
            .transition()
            .duration(400)
            .attr(
              "transform",
              `translate(${moveDistance()}, ${moveDistance()})`,
            )
            .transition()
            .duration(randomDuration())
            .style("opacity", 0);
        }
      });

    return svg;
  }

  function animateCircle(svg) {
    svg
      .append("circle")
      .attr("cx", d3.randomUniform(0, width)())
      .attr("cy", d3.randomUniform(0, height)())
      .attr("r", d3.randomUniform(30, 100)())
      .style("fill", "transparent")
      .style("opacity", 0)
      .transition()
      .duration(randomDuration())
      .style("fill", colors[Math.floor(d3.randomUniform(0, 5)())])
      .style("opacity", 1)
      .transition()
      .duration(4000)
      .style("opacity", 0);
  }

  useEffect(() => {
    const svg = createSvg();

    function drawCircles() {
      for (let i = 0; i < 110; i++) {
        animateCircle(svg);
      }
    }

    drawCircles();

    const repeat = setInterval(() => {
      drawCircles();
    }, 5000);

    return () => {
      clearInterval(repeat);
      d3.select("#canvas").remove();
    };
  }, []);

  return <div id="canvas"></div>;
}

export default Sad;

Sad.propTypes = {
  emotionDegree: PropTypes.string,
};
