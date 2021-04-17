export const defaultJournalWorkshops = {
  lemz: { active: true, name: 'ЦехЛЭМЗ', engName: 'lemz' },
  lepsari: { active: true, name: 'ЦехЛепсари', engName: 'lepsari' },
  ligovskiy: { active: true, name: 'ЦехЛиговский', engName: 'ligovskiy' },
  office: { active: true, name: 'Офис', engName: 'office' },
};

export const productionJournalDefaultInputs = [
  { name: 'date', defaultValue: new Date(), isRequired: true, isValid: true },
  {
    name: 'employee',
    defaultValue: null,
    isRequired: true,
  },
  {
    name: 'works',
    defaultValue: [],
    isRequired: true,
  },
  {
    name: 'originalWorks',
    defaultValue: [],
  },
  { name: 'addSelectedDaysWork', defaultValue: null },
  { name: 'deleteSelectedDaysWork', defaultValue: null },
  { name: 'hideWindow', defaultValue: null },
  { name: 'title', defaultValue: null },
  { name: 'updateSelectedDaysWork', defaultValue: null },
  { name: 'workshop', defaultValue: null },
  { name: 'day', defaultValue: null },
  { name: 'type', defaultValue: 'new' },
];
