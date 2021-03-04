import category1Img from 'Assets/priceList/крепеж_для_деревянных_досок.png';
import category2Img from 'Assets/priceList/крепеж_для_дпк_досок.png';
import category3Img from 'Assets/priceList/крепежные_элементы.png';
import categoryImg from 'Assets/priceList/default_category.png';
import locationType1Img from 'Assets/priceList/Фасад.png';
import locationType2Img from 'Assets/priceList/Терраса.png';
import { formatDateString } from 'Utils/functions.jsx';

export const defaultCategories = [
  {
    name: 'Крепеж для деревянных досок',
    img: category1Img,
    active: true,
  },
  {
    name: 'Крепеж для ДПК досок',
    img: category2Img,
    active: true,
  },
  {
    name: 'Крепежные элементы',
    img: category3Img,
    active: true,
  },
  {
    name: 'Продукция для подконструкций',
    img: categoryImg,
    active: true,
  },
  {
    name: 'Крепеж для НВФ',
    img: categoryImg,
    active: true,
  },
];

export const locationTypes = [
  {
    name: 'Фасад',
    img: locationType1Img,
  },
  {
    name: 'Терраса',
    img: locationType2Img,
  },
];

export const defaultOptionalColumns = [
  {
    id: 1,
    property: 'partnerPrice',
    name: 'Опт 1',
    active: false,
  },
  {
    id: 2,
    property: 'dealerPrice',
    name: 'Опт 2',
    active: false,
  },
  {
    id: 3,
    property: 'distributorPrice',
    name: 'Опт 3',
    active: false,
  },
];

export const defaultTitlePage = {
  to: '',
  date: formatDateString(new Date()),
  slogan: '',
  list: [],
  active: true,
  isMinimized: true,
  img1: '',
  img2: '',
  img3: '',
};

export const pdfHeaderCompanyContacts = {
  name: 'ООО «ОСФИКС»',
  site: 'https://www.osfix.ru',
  legalAddress: 'Лиговский пр., 52, Санкт-Петербург, 191040',
  email: 'info@osfix.ru',
  phone: '+7 (812) 449-10-09',
};
