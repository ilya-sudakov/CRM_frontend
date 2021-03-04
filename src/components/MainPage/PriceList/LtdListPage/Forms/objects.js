export const ltdListDefaultInputObject = {
  name: false,
  legalAddress: false,
  mailingAddress: false,
  phone: false,
  site: false,
  inn: false,
  kpp: false,
  email: false,
  ogrn: false,
  okpo: false,
  okved: false,
  checkingAccount: false,
  bank: false,
  correspondentAccount: false,
  bik: false,
  generalDirector: false,
  accountant: false,
  logo: false,
};

export const ltdListDefaultInputObjectValues = {
  name: '',
  shortName: '',
  legalAddress: '',
  mailingAddress: '',
  phone: '',
  site: '',
  inn: '',
  kpp: '',
  ogrn: '',
  okpo: '',
  okved: '',
  email: '',
  checkingAccount: '',
  bank: '',
  correspondentAccount: '',
  bik: '',
  generalDirector: '',
  accountant: '',
  logo: '',
};

export const ltdListDefaultInputs = [
  { name: 'name', defaultValue: '', isRequired: true },
  { name: 'shortName', defaultValue: '' },
  { name: 'legalAddress', defaultValue: '', isRequired: true },
  { name: 'mailingAddress', defaultValue: '', isRequired: true },
  { name: 'phone', defaultValue: '', isRequired: true },
  { name: 'site', defaultValue: '', isRequired: true },
  { name: 'inn', defaultValue: '', isRequired: true },
  { name: 'kpp', defaultValue: '', isRequired: true },
  { name: 'ogrn', defaultValue: '', isRequired: true },
  { name: 'okpo', defaultValue: '', isRequired: true },
  { name: 'okved', defaultValue: '', isRequired: true },
  { name: 'email', defaultValue: '', isRequired: true },
  { name: 'checkingAccount', defaultValue: '', isRequired: true },
  { name: 'bank', defaultValue: '', isRequired: true },
  { name: 'correspondentAccount', defaultValue: '', isRequired: true },
  { name: 'bik', defaultValue: '', isRequired: true },
  { name: 'generalDirector', defaultValue: '', isRequired: true },
  { name: 'accountant', defaultValue: '', isRequired: true },
  { name: 'logo', defaultValue: '', isRequired: true },
];

export const ltdFormNameInputs = [
  { name: 'name', inputName: 'Наименование', required: true },
  { name: 'shortName', inputName: 'Краткое наименование' },
];

export const ltdFormAddressInputs = [
  { name: 'legalAddress', inputName: 'Юридический адрес', required: true },
  { name: 'mailingAddress', inputName: 'Почтовый адрес', required: true },
  { name: 'site', inputName: 'Сайт', required: true },
];

export const ltdFormContactsInputs = [
  { name: 'phone', inputName: 'Телефон', required: true },
  { name: 'email', inputName: 'E-mail', required: true },
];

export const ltdFormBankInputs = [
  { name: 'checkingAccount', inputName: 'Расчетный счет №', required: true },
  { name: 'bank', inputName: 'Банк', required: true },
  {
    name: 'correspondentAccount',
    inputName: 'Корреспондентский счет',
    required: true,
  },
  { name: 'bik', inputName: 'БИК', required: true },
];

export const ltdFormEmployeesInputs = [
  {
    name: 'generalDirector',
    inputName: 'Генеральный директор',
    required: true,
  },
  { name: 'accountant', inputName: 'Главный бухгалтер', required: true },
];
