export const productsDefaultInputs = [
  { name: 'name', defaultValue: '', isRequired: true },
  { name: 'category', defaultValue: '', isRequired: true },
  { name: 'packages', defaultValue: [], isRequired: true },
  { name: 'photo', defaultValue: '', isRequired: true },
  // { name: "unit", defaultValue: 0, isRequired: true },
  { name: 'weight', defaultValue: '', isRequired: true },
  {
    name: 'productionLocation',
    defaultValue: 'ЦехЛЭМЗ',
    isRequired: true,
    isValid: true,
  },
  { name: 'comment', defaultValue: '' },
  { name: 'vendor', defaultValue: '' },
  { name: 'description', defaultValue: '' },
  { name: 'barcode', defaultValue: '' },
];

export const productCategoriesDefaultInputs = [
  { name: 'category', defaultValue: '', isRequired: true },
];
