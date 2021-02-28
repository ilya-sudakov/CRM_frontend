export const getPriceListColumnValue = (column, item) => {
  return column.property === "partnerPrice"
    ? item.partnerName
    : column.property === "dealerPrice"
    ? item.dealerName
    : column.property === "distributorPrice" && item.distributorName;
};
