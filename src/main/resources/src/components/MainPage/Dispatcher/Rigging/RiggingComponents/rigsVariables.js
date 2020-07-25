export const rigTypes = {
  stamp: {
    name: 'штамп',
    redirectURL: '/dispatcher/rigging/stamp',
    type: 'stamp',
    title: 'Штамп',
  },
  machine: {
    name: 'станок',
    redirectURL: '/dispatcher/rigging/machine',
    type: 'machine',
    title: 'Станок',
  },
  pressForm: {
    name: 'пресс-форма',
    redirectURL: '/dispatcher/rigging/press-form',
    type: 'pressForm',
    title: 'Пресс-форма',
  },
  parts: {
    name: 'запчасти',
    redirectURL: '/dispatcher/rigging/parts',
    type: 'parts',
    title: 'Запчасти',
  },
}

export const rigStatuses = {
  production: {
    name: 'В производстве',
    className: 'production',
  },
  completed: {
    name: 'Завершено',
    className: 'completed',
  },
  defect: {
    name: 'Приоритет',
    className: 'defect',
  },
}
