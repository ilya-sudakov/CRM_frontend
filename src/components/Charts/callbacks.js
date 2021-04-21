import { addSpaceDelimiter } from 'Utils/functions';

export const tooltipLabelRubles = (tooltipItem, data) => {
  let label = data.datasets[tooltipItem.datasetIndex].label || '';
  if (label) label += ': ';
  label += `${addSpaceDelimiter(
    Number.parseInt(Math.round(tooltipItem.yLabel * 100) / 100),
  )} ₽`;
  return label;
};

export const tooltipLabelPercent = (tooltipItem, data) => {
  let label = data.datasets[tooltipItem.datasetIndex].label || '';
  if (label) label += ': ';
  label += `${addSpaceDelimiter(Math.round(tooltipItem.yLabel * 100) / 100)}%`;
  return label;
};
