import { addSpaceDelimiter } from "../functions.jsx";

export const tooltipLabelRubles = (tooltipItem, data) => {
  let label = data.datasets[tooltipItem.datasetIndex].label || "";
  if (label) label += ": ";
  label += `${addSpaceDelimiter(
    Number.parseInt(Math.round(tooltipItem.yLabel * 100) / 100)
  )} ₽`;
  return label;
};
