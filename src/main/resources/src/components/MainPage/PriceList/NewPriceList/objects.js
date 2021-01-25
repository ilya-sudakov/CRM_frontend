import category1Img from "../../../../../../../../assets/priceList/крепеж_для_деревянных_досок.png";
import category2Img from "../../../../../../../../assets/priceList/крепеж_для_дпк_досок.png";
import category3Img from "../../../../../../../../assets/priceList/крепежные_элементы.png";
import categoryImg from "../../../../../../../../assets/priceList/default_category.png";
import locationType1Img from "../../../../../../../../assets/priceList/Фасад.png";
import locationType2Img from "../../../../../../../../assets/priceList/Терраса.png";
import { formatDateString } from "../../../../utils/functions.jsx";

export const defaultCategories = [
  {
    name: "Крепеж для деревянных досок",
    img: category1Img,
    active: true,
  },
  {
    name: "Крепеж для ДПК досок",
    img: category2Img,
    active: true,
  },
  {
    name: "Крепежные элементы",
    img: category3Img,
    active: true,
  },
  {
    name: "Продукция для подконструкций",
    img: categoryImg,
    active: true,
  },
  {
    name: "Крепеж для НВФ",
    img: categoryImg,
    active: true,
  },
];

export const locationTypes = [
  {
    name: "Фасад",
    img: locationType1Img,
  },
  {
    name: "Терраса",
    img: locationType2Img,
  },
];

export const defaultOptionalColumns = [
  {
    id: 1,
    property: "partnerPrice",
    name: "Опт 1",
    active: false,
  },
  {
    id: 2,
    property: "dealerPrice",
    name: "Опт 2",
    active: false,
  },
  {
    id: 3,
    property: "distributorPrice",
    name: "Опт 3",
    active: false,
  },
];

export const defaultTitlePage = {
  to: "",
  date: formatDateString(new Date()),
  slogan: "",
  list: [],
  active: true,
  img1: "",
  img2: "",
  img3: "",
};

export const pdfHeaderCompanyContacts = [
  {
    text: "ООО «ОСФИКС»\n",
    link: "https://www.osfix.ru",
    bold: true,
    fontSize: 10,
    margin: [0, 0, 0, 2],
  },
  {
    text: "Лиговский пр., 52, Санкт-Петербург, 191040\n",
    link: "https://yandex.ru/maps/-/CKUrY0Ih",
    fontSize: 10,
    lineHeight: 1.1,
  },
  {
    text: "www.osfix.ru\n",
    fontSize: 10,
    link: "https://www.osfix.ru",
    lineHeight: 1.1,
  },
  { text: "info@osfix.ru\n", fontSize: 10, lineHeight: 1.1 },
  {
    text: "+7 (812) 449-10-09\n",
    link: "tel:+78124491009",
    fontSize: 10,
    lineHeight: 1.1,
  },
];
