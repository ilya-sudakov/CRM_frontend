export const employeesDefaultInputs = [
  { name: 'name', defaultValue: '', isRequired: true },
  { name: 'lastName', defaultValue: '', isRequired: true },
  { name: 'middleName', defaultValue: '', isRequired: true },
  {
    name: 'dateOfBirth',
    defaultValue: new Date(),
    isRequired: true,
    isValid: true,
  },
  { name: 'patentExpirationDate', defaultValue: null },
  {
    name: 'registrationExpirationDate',
    defaultValue: null,
  },
  { name: 'citizenship', defaultValue: '', isRequired: true },
  { name: 'position', defaultValue: '', isRequired: true },
  {
    name: 'workshop',
    defaultValue: 'ЦехЛЭМЗ',
    isRequired: true,
    isValid: true,
  },
  { name: 'passportScan1', defaultValue: '' },
  { name: 'comment', defaultValue: '' },
  {
    name: 'relevance',
    defaultValue: 'Работает',
    isRequired: true,
    isValid: true,
  },
];
