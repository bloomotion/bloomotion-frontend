import React, { useEffect } from "react";
import * as d3 from "d3";

function Happy() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const svg = d3
      .select("#svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent");
    const randomCoordinateX = (d) => d3.randomNormal(d, 250)();
    const randomCoordinateY = d3.randomNormal(height / 2, 200);
    const randomX = d3.randomNormal(width / 2, 100);
    const randomSize = d3.randomUniform(30, 80);
    const color = [
      "#FFEF0098",
      "#F4FF0098",
      "#BF570098",
      "#FFF30098",
      "#4E1F0098",
      "#CCF20098",
    ];

    setInterval(() => {
      animateCircles();
    }, 6000);

    animateCircles();

    function animateCircles() {
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
        .style("fill", () => color[Math.floor(d3.randomUniform(0, 6)())])
        .transition()
        .ease(d3.easeExp)
        .duration(3000)
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
  }, []);

  return <svg id="svg"></svg>;
}

export default Happy;
