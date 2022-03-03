import React, { useEffect } from "react";
import * as d3 from "d3";

function Angry() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const radiusData = [30, 40, 50, 60, 70, 90, 100];
    const colorData = ["#6E00FF90", "#FF00F390", "#FFFEBB90", "#FF005290"];
    const randomDuration = d3.randomUniform(2000, 9000);
    const moveDistance = d3.randomUniform(50, -50);
    const svg = d3
      .select("#svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent")
      .on("mouseover", (e) => {
        if (e.target.nodeName === "circle") {
          const a = d3.select(e.target);
          a.transition()
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

    drawCircles();

    setInterval(() => {
      drawCircles();
    }, 5000);

    function drawCircles() {
      for (let i = 0; i < 100; i++) {
        animatecircle();
      }
    }

    function animatecircle() {
      svg
        .append("circle")
        .attr("cx", d3.randomUniform(0, width)())
        .attr("cy", d3.randomUniform(0, height)())
        .attr("r", radiusData[Math.floor(d3.randomUniform(0, 7)())])
        .style("fill", "transparent")
        .style("opacity", 0)
        .call(
          d3
            .drag()
            .on("start", function () {
              d3.select(this).raise();
            })
            .on("drag", function (e) {
              d3.select(this).attr("cx", e.x).attr("cy", e.y);
            })
            .on("end", function () {
              d3.select(this).raise().style("stroke", "none");
            }),
        )
        .transition()
        .duration(randomDuration())
        .style("fill", colorData[Math.floor(d3.randomUniform(0, 4)())])
        .style("opacity", 1)
        .transition()
        .duration(4000)
        .style("opacity", 0);
    }
  }, []);

  return <svg id="svg"></svg>;
}

export default Angry;
