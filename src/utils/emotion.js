export function calculateEmotionDegree(colors, degree) {
  const rgbaColors = colors.map((color) => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${
      degree >= 0.7 ? "0.85" : degree >= 0.4 ? "0.65" : "0.45"
    })`;
  });

  return rgbaColors;
}
