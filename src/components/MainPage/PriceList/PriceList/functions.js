import axios from 'axios';
import XLSX from 'xlsx';

export const getPriceListColumnValue = (column, item) => {
  return column.property === 'partnerPrice'
    ? item.partnerName
    : column.property === 'dealerPrice'
    ? item.dealerName
    : column.property === 'distributorPrice' && item.distributorName;
};

const getPriceListDefaultParsedObject = (item) => ({
  id: item.id,
  groupImg1: '',
  groupImg2: '',
  groupImg3: '',
  groupImg4: '',
  footerImg: '',
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

const getPriceListParsedProduct = (item) => ({
  id: item.id,
  number: item.number,
  name: item.name,
  description: item.productDescription,
  units: item.units,
  lessThan1500Price: item.firstPrice ? item.firstPrice.toFixed(2) : 0,
  lessThan5000Price: item.secondPrice ? item.secondPrice.toFixed(2) : 0,
  cost: item.cost ? item.cost.toFixed(2) : 0,
  retailMarketPrice: item.retailMarketPrice
    ? item.retailMarketPrice.toFixed(2)
    : 0,
  retailPrice: item.retailPrice ? item.retailPrice.toFixed(2) : 0,
  firstPrice: item.firstPrice ? item.firstPrice.toFixed(2) : 0,
  secondPrice: item.secondPrice ? item.secondPrice.toFixed(2) : 0,
  partnerPrice: item.partnerPrice ? item.partnerPrice.toFixed(2) : 0,
  dealerPrice: item.dealerPrice ? item.dealerPrice.toFixed(2) : 0,
  distributorPrice: item.distributorPrice
    ? item.distributorPrice.toFixed(2)
    : 0,
  onSale: item.onSale === 'да' ? true : false,
});

export const parseExcelData = (result) => {
  let data = new Uint8Array(result);
  let wb = XLSX.read(data, { type: 'array' });
  var firstSheetName = wb.SheetNames[0];
  let firstSheet = wb.Sheets[firstSheetName];
  var excelRows = XLSX.utils.sheet_to_json(firstSheet);
  if (excelRows.length === 0) {
    return alert('Файл пустой либо заполнен некорректно!');
  }
  const disclaimer = excelRows[excelRows.length - 1].id;
  const titlePage = {
    to: excelRows[0].titlePage,
    date: excelRows[1].titlePage,
    slogan: excelRows[2].titlePage,
    list: excelRows[3].titlePage.split('/'),
    active: true,
    isMinimized: true,
  };
  let parsedData = [];
  let tempNumber = '000';
  let groupData = null;
  let startId = 0,
    endId = 0;
  for (let index = 3; index < excelRows.length; index++) {
    let item = excelRows[index];
    if (item.id === 1) {
      startId = index;
      endId = index;
      groupData = getPriceListDefaultParsedObject(item);
      tempNumber = item.number.substring(0, 3);
    }
    let products = [];
    for (let i = startId; i < endId; i++) {
      products.push(getPriceListParsedProduct(excelRows[i]));
    }
    if (item.number) {
      if (item.number.includes(tempNumber)) {
        endId++;
      } else {
        parsedData.push({
          ...groupData,
          products,
        });
        console.log(startId, index, item, excelRows[index]);
        groupData = getPriceListDefaultParsedObject(item);
        startId = index;
        endId = index + 1;
        tempNumber = item.number.substring(0, 3);
      }
    } else {
      parsedData.push({
        ...groupData,
        products,
      });
      break;
    }
  }
  console.log(parsedData);
  return { parsedData, disclaimer, titlePage };
};

export const getExcelFileBlob = async (url, filename, type = 'blob') => {
  let headers = {
    'Content-Disposition': `attachment; filename=${encodeURIComponent(
      filename,
    )}`,
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  return await axios
    .get(url, {
      headers: headers,
      responseType: 'arraybuffer',
    })
    .then(({ data }) =>
      type === 'blob'
        ? new Blob([data], {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
          })
        : data,
    )
    .catch((error) => console.log(error));
};
