export const workshops = [
  {
    name: 'ЦехЛЭМЗ',
    active: true,
    minimized: true,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
  },
  {
    name: 'ЦехЛепсари',
    active: true,
    minimized: true,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
  },
  {
    name: 'ЦехЛиговский',
    active: true,
    minimized: true,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY', 'ROLE_DISPATCHER'],
  },
  {
    name: 'Офис',
    active: true,
    minimized: true,
    allowedRoles: [
      'ROLE_ADMIN',
      'ROLE_DISPATCHER',
      'ROLE_MANAGER',
      'ROLE_ENGINEER',
    ],
  },
];
