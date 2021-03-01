export const getPriceListColumnValue = (column, item) => {
  return column.property === "partnerPrice"
    ? item.partnerName
    : column.property === "dealerPrice"
    ? item.dealerName
    : column.property === "distributorPrice" && item.distributorName;
};

export const getPriceListDefaultParsedObject = (item) => ({
  id: item.id,
  groupImg1: "",
  groupImg2: "",
  groupImg3: "",
  groupImg4: "",
  footerImg: "",
  number: item.number,
  category: item.category,
  name: item.groupName,
  description: item.description,
  infoText: item.infoText,
  linkAddress: item.linkAddress,
  locationType: item.locationType,
  priceHeader: item.priceHeader,
  retailName: item.retailName,
  firstPriceName: item.firstPriceName,
  secondPriceName: item.secondPriceName,
  dealerName: item.dealerName,
  distributorName: item.distributorName,
  partnerName: item.partnerName,
  active: true,
  isMinimized: true,
  proprietaryItemText1: item.proprietaryItemText1,
  proprietaryItemText2: item.proprietaryItemText2,
});

export const getPriceListParsedProduct = (item) => ({
  id: item.id,
  number: item.number,
  name: item.name,
  description: item.productDescription,
  units: item.units,
  lessThan1500Price: item.firstPrice ? roundUpWorkHours(item.firstPrice) : 0,
  lessThan5000Price: item.secondPrice ? roundUpWorkHours(item.secondPrice) : 0,
  cost: item.cost ? roundUpWorkHours(item.cost) : 0,
  retailMarketPrice: item.retailMarketPrice
    ? roundUpWorkHours(item.retailMarketPrice)
    : 0,
  retailPrice: item.retailPrice ? roundUpWorkHours(item.retailPrice) : 0,
  firstPrice: item.firstPrice ? roundUpWorkHours(item.firstPrice) : 0,
  secondPrice: item.secondPrice ? roundUpWorkHours(item.secondPrice) : 0,
  partnerPrice: item.partnerPrice ? roundUpWorkHours(item.partnerPrice) : 0,
  dealerPrice: item.dealerPrice ? roundUpWorkHours(item.dealerPrice) : 0,
  distributorPrice: item.distributorPrice
    ? roundUpWorkHours(item.distributorPrice)
    : 0,
  onSale: item.onSale === "да" ? true : false,
});
