export const clientCategoriesDefaultInputs = [
  { name: 'name', defaultValue: '', isRequired: true },
  { name: 'visibility', defaultValue: 'all' },
];

export const clientsDefaultInputs = [
  {
    name: 'name',
    defaultValue: '',
    isRequired: true,
  },
  {
    name: 'legalEntity',
    defaultValue: [],
  },
  {
    name: 'contacts',
    defaultValue: [],
    isRequired: true,
  },
  {
    name: 'workHistory',
    defaultValue: [],
  },
  {
    name: 'site',
    defaultValue: '',
    isRequired: true,
  },
  {
    name: 'comment',
    defaultValue: '',
  },
  {
    name: 'city',
    defaultValue: '',
    isRequired: true,
  },
  {
    name: 'storageAddress',
    defaultValue: '',
  },
  {
    name: 'workCondition',
    defaultValue: '',
  },
  {
    name: 'price',
    defaultValue: '',
  },
  {
    name: 'discount',
    defaultValue: '',
  },
  {
    name: 'check',
    defaultValue: '',
  },
  {
    name: 'clientType',
    defaultValue: 'Активные',
  },
  {
    name: 'categoryId',
    defaultValue: 0,
    isRequired: true,
  },
  {
    name: 'categoryName',
    defaultValue: '',
  },
  {
    name: 'visibility',
    defaultValue: true,
  },
  {
    name: 'nextContactDate',
    defaultValue: new Date(new Date().setDate(new Date().getDate() + 7)),
  },
];
