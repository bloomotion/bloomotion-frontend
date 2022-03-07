import React, { useEffect } from "react";
import * as d3 from "d3";

import { CANVAS, SAD_COLOR, SAD_RADIUS } from "../../constants/emotion";

function Sad() {
  const width = CANVAS.width;
  const height = CANVAS.height;
  const randomDuration = d3.randomUniform(2000, 9000);
  const moveDistance = d3.randomUniform(50, -50);

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
      .attr("r", SAD_RADIUS[Math.floor(d3.randomUniform(0, 7)())])
      .style("fill", "transparent")
      .style("opacity", 0)
      .transition()
      .duration(randomDuration())
      .style("fill", SAD_COLOR[Math.floor(d3.randomUniform(0, 4)())])
      .style("opacity", 1)
      .transition()
      .duration(4000)
      .style("opacity", 0);
  }

  useEffect(() => {
    const svg = createSvg();

    function drawCircles() {
      for (let i = 0; i < 100; i++) {
        animateCircle(svg);
      }
    }

    drawCircles();

    setInterval(() => {
      drawCircles();
    }, 5000);
  }, []);

  return <div id="canvas"></div>;
}

export default Sad;
