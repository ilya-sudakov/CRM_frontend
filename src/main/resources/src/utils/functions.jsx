import { animateScroll as scroll } from "react-scroll";

//Получение строки типа 'дд.мм.ГГГГ' из объекта Date
export const formatDateString = (dateString) => {
  const temp = new Date(dateString);
  const testDate = new Date(
    temp.getFullYear() + "/" + (temp.getMonth() + 1) + "/" + temp.getDate()
  );
  return `${
    testDate.getDate() < 10 ? "0" + testDate.getDate() : testDate.getDate()
  }.${
    testDate.getMonth() + 1 < 10
      ? "0" + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1
  }.${testDate.getFullYear()}`;
};

export const formatDateStringNoDate = (dateString) => {
  const temp = new Date(dateString);
  const testDate = new Date(
    temp.getFullYear() + "/" + (temp.getMonth() + 1) + "/" + temp.getDate()
  );
  return (
    (testDate.getMonth() + 1 < 10
      ? "0" + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1) +
    "." +
    testDate.getFullYear()
  );
};

export const formatDateStringNoYear = (dateString) => {
  const temp = new Date(dateString);
  const testDate = new Date(
    temp.getFullYear() + "/" + (temp.getMonth() + 1) + "/" + temp.getDate()
  );
  return (
    (testDate.getDate() < 10 ? "0" + testDate.getDate() : testDate.getDate()) +
    "." +
    (testDate.getMonth() + 1 < 10
      ? "0" + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1)
  );
};

export const formatDateStringToTime = (dateString) => {
  const testDate = new Date(dateString);
  return (
    (testDate.getHours() < 10
      ? "0" + testDate.getHours()
      : testDate.getHours()) +
    ":" +
    (testDate.getMinutes() < 10
      ? "0" + testDate.getMinutes()
      : testDate.getMinutes())
  );
};

export const formatDateStringWithTime = (dateString) => {
  const testDate = new Date(dateString);
  return `${formatDateString(testDate)} ${formatDateStringToTime(testDate)}`;
};

//Определение склонения слова в зависимости от остатка числа
//к которому оно относится
export const numberToString = (number, wordForms) => {
  number = Math.abs(number) % 100;
  let remainder = number % 10;
  if (number > 10 && number < 20) {
    return wordForms[2];
  }
  if (remainder > 1 && remainder < 5) {
    return wordForms[1];
  }
  if (remainder == 1) {
    return wordForms[0];
  }
  return wordForms[2];
};

//Функция для скачивания переданной картинки
export const imgToBlobDownload = (imageSrc, imageName) => {
  let img = new Image();
  img.src = imageSrc;
  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
  c.toBlob(
    function (blob) {
      // получаем содержимое как JPEG Blob
      let link = document.createElement("a");
      link.download = imageName;
      link.href = URL.createObjectURL(blob);
      link.click();
      // удаляем ссылку на Blo
      URL.revokeObjectURL(link.href);
    },
    "image/jpeg",
    1
  );
  img.crossOrigin = ""; // if from different origin
  img.src = "url-to-image";
};

//Получение URI из полученной картинки
export function getDataUri(url, extension, quality) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL(
        extension ? "image/" + extension : "image/png",
        quality ? quality : 0.92
      );
      resolve(dataURL);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = url;
  });
}

//Функция для изменения порядка сортировки
export const changeSortOrder = (event) => {
  const name = event.target.value.split(" ")[0];
  const order = event.target.value.split(" ")[1];
  return Object.assign({
    curSort: name,
    [name]: order,
  });
};

//Получение списка работ сотрудников из полученного массива
export const getAllProductsFromWorkCount = (works) => {
  let parts = {};
  works.map((work) => {
    // console.log(work)
    work.workControlProduct.map((product) => {
      if (parts[product.product.id] === undefined) {
        return (parts = Object.assign({
          ...parts,
          [product.product.id]: {
            product: product.product,
            name: product.product.name,
            quantity: Number.parseFloat(product.quantity),
          },
        }));
      } else {
        return (parts = Object.assign({
          ...parts,
          [product.product.id]: {
            ...parts[product.product.id],
            quantity:
              Number.parseFloat(parts[product.product.id].quantity) +
              Number.parseFloat(product.quantity),
          },
        }));
      }
    });
  });
  // console.log(parts)
  return parts;
};

export const getAllDraftsFromWorkCount = (works) => {
  let parts = { Stamp: {}, Press: {}, Detail: {}, Bench: {} };
  const Stamp = {},
    Press = {},
    Detail = {},
    Bench = {};
  works.map((work) => {
    const draftTypes = ["Stamp", "Press", "Detail", "Bench"];
    // console.log(work)
    draftTypes.map((draftType) => {
      return work.partsWorks.map((draft) => {
        if (draft.partType === draftType) {
          if (parts[draftType][draft.partId] === undefined) {
            return (parts[draftType] = Object.assign({
              ...parts[draftType],
              [draft.partId]: {
                name: draft.name,
                partType: draft.partType,
                partId: draft.partId,
                quantity: Number.parseFloat(draft.quantity),
              },
            }));
          } else {
            return (parts[draftType] = Object.assign({
              ...parts[draftType],
              [draft.partId]: {
                ...parts[draftType][draft.partId],
                quantity:
                  Number.parseFloat(parts[draftType][draft.partId].quantity) +
                  Number.parseFloat(draft.quantity),
              },
            }));
          }
        }
      });
    });
  });
  let newParts = [];
  Object.values(parts).map((draftType) => {
    Object.values(draftType).map((draft) => {
      newParts.push(draft);
    });
  });
  return newParts;
};

export const getDatesAndWorkItems = (works) => {
  let newData = Object.assign({
    ЦехЛЭМЗ: {},
    ЦехЛепсари: {},
    ЦехЛиговский: {},
    Офис: {},
  });
  works.map((item) => {
    const curDate = new Date(item.year, item.month - 1, item.day);
    const curWorkshop = item.employee.workshop;
    if (newData[curWorkshop][curDate] === undefined) {
      newData = Object.assign({
        ...newData,
        [curWorkshop]: {
          ...newData[curWorkshop],
          [curDate]: {
            [item.employee.id]: {
              employee: item.employee,
              year: item.year,
              month: item.month,
              day: item.day,
              workshop: item.employee.workshop,
              isOpen: false,
              works: [
                {
                  id: item.id,
                  hours: item.hours,
                  workList: item.workList,
                  workControlProduct: item.workControlProduct,
                  partsWorks: item.partsWorks,
                },
              ],
            },
          },
        },
      });
    } else {
      if (newData[curWorkshop][curDate][item.employee.id] === undefined) {
        newData = Object.assign({
          ...newData,
          [curWorkshop]: {
            ...newData[curWorkshop],
            [curDate]: {
              ...newData[curWorkshop][curDate],
              [item.employee.id]: {
                employee: item.employee,
                year: item.year,
                month: item.month,
                day: item.day,
                workshop: item.employee.workshop,
                isOpen: false,
                works: [
                  {
                    id: item.id,
                    hours: item.hours,
                    workList: item.workList,
                    workControlProduct: item.workControlProduct,
                    partsWorks: item.partsWorks,
                  },
                ],
              },
            },
          },
        });
      } else {
        newData = Object.assign({
          ...newData,
          [curWorkshop]: {
            ...newData[curWorkshop],
            [curDate]: {
              ...newData[curWorkshop][curDate],
              [item.employee.id]: {
                ...newData[curWorkshop][curDate][item.employee.id],
                works: [
                  ...newData[curWorkshop][curDate][item.employee.id].works,
                  {
                    id: item.id,
                    hours: item.hours,
                    workList: item.workList,
                    workControlProduct: item.workControlProduct,
                    partsWorks: item.partsWorks,
                  },
                ],
              },
            },
          },
        });
      }
    }
  });
  return newData;
};

//Получить случайный цвет формата hex
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const randomMinMaxInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Получить случайный цвет формата HSL
export const getRandomNiceColor = () => {
  return `hsl(${randomMinMaxInteger(0, 360)},${randomMinMaxInteger(
    42,
    98
  )}%,${randomMinMaxInteger(40, 90)}%)`;
};

export const getRandomColorShades = (numOfShades = 10) => {
  const shades = [];
  const hue = 180; //test

  for (var i = 0; i < numOfShades; i++) {
    const hsl = `hsl(${Math.abs(hue - i)}, 100%, 32%)`;
    shades.push(hsl);
  }

  return shades;
};

//Сложить два цвета
export const addHexColor = (color1, color2) => {
  var hexStr = (parseInt(color1, 16) + parseInt(color2, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  }
  return hexStr;
};

//Добавить разделитель пробел для полученной строки
export const addSpaceDelimiter = (str) => {
  return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};

export const sortRequestsByDates = (requests) => {
  let dates = {};
  requests.map((request) => {
    let curDate = new Date(request.date);
    curDate = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate()
    );
    if (dates[curDate] !== undefined) {
      dates = {
        ...dates,
        [curDate]: [...dates[curDate], request],
      };
    } else {
      dates = {
        ...dates,
        [curDate]: [request],
      };
    }
  });
  return dates;
};

export const getDatesFromRequests = (requests) => {
  let dates = [];
  requests.map((request) => {
    const curDate = formatDateString(request.date);
    if (
      dates.find((date) => formatDateString(date) === curDate) === undefined
    ) {
      dates.push(request.date);
    }
  });
  return dates.sort((a, b) => {
    if (a < b) {
      return 1;
    }
    return -1;
  });
};

export const createLabelForProduct = () => {
  // we create a canvas element
  let canvas = document.createElement("canvas");
  let height = 100;
  let width = 100;
};

export const getQuantityOfProductsFromRequests = (requests) => {
  let products = {};
  requests.map((request) => {
    if (request.status !== "Завершено" && request.status !== "completed") {
      return request.requestProducts.map((product) => {
        if (product.status !== "completed") {
          return (products = {
            ...products,
            [product.name]:
              products[product.name] === undefined
                ? Number.parseFloat(product.quantity)
                : Number.parseFloat(product.quantity) +
                  Number.parseFloat(products[product.name]),
          });
        }
      });
    }
  });
  // console.log(products)
  return products;
};

export const dateDiffInDays = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const scrollToElement = (element, offset = 0) => {
  const headerOffset = -70;
  //default header offset is 60 px
  const y =
    element.getBoundingClientRect().top +
    window.pageYOffset +
    headerOffset +
    offset;
  scroll.scrollTo(y);
};

export const roundUpWorkHours = (hours) => {
  return Math.floor(hours * 100) / 100;
};

export const saveCanvasAsImage = (canvas, fileName) => {
  canvas.toBlob(
    function (blob) {
      // получаем содержимое как JPEG Blob
      let link = document.createElement("a");
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
      // удаляем ссылку на Blo
      URL.revokeObjectURL(link.href);
    },
    "image/jpeg",
    1
  );
};

export const changeVisibilityOfListItem = (list, index) => {
  index = Number.parseInt(index);
  return list.map((element) =>
    element.id == index ? { id: index, hidden: !element.hidden } : element
  );
};

export const getEmployeeNameText = (employee) => {
  return `${employee.lastName} ${employee.name} ${employee.middleName}`;
};
