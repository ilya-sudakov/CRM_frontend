export const clientsFormHeaderMenu = (name) => {
  return [
    { pageTitle: 'История работы', pageName: 'workHistory' },
    {
      pageTitle: `Данные ${name}а`,
      pageName: 'clientData',
    },
  ];
};
