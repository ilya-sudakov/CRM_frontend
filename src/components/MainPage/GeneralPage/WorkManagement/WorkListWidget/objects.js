export const workshopsList = [
  {
    name: 'ЦехЛЭМЗ',
    visibility: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
    active: true,
  },
  {
    name: 'ЦехЛепсари',
    visibility: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
    active: true,
  },
  {
    name: 'ЦехЛиговский',
    visibility: [
      'ROLE_ADMIN',
      'ROLE_LIGOVSKIY',
      'ROLE_DISPATCHER',
      'ROLE_MANAGER',
    ],
    active: true,
  },
  {
    name: 'Офис',
    visibility: [
      'ROLE_ADMIN',
      'ROLE_DISPATCHER',
      'ROLE_MANAGER',
      'ROLE_ENGINEER',
    ],
    active: true,
  },
];
