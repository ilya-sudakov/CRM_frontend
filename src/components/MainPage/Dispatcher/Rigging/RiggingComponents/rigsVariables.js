export const rigTypes = {
  stamp: {
    name: 'штамп',
    redirectURL: '/dispatcher/rigging/stamp',
    type: 'stamp',
    // type: null,
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

export const riggingTypeList = {
  cuttingDimensions: {
    prev: null,
  },
  milling: {
    prev: 'cuttingDimensions',
  },
  harding: {
    prev: 'milling',
  },
  grinding: {
    prev: 'harding',
  },
  erosion: {
    prev: 'grinding',
  },
  controll: {
    prev: 'erosion',
  },
}

export const checkRiggingTypesInputs = (inputs, type = 'controll') => {
  let check = true
  let curType = riggingTypeList[type].prev
  while (curType !== null) {
    if (inputs[curType] === '' || inputs[curType] === null) {
      check = false
      return
    }
    curType = riggingTypeList[curType].prev
  }
  return check
}

export const workshopsLocations = {
  lemz: {
    name: 'ЦехЛЭМЗ',
  },
  lepsari: {
    name: 'ЦехЛепсари',
  },
  ligovskiy: {
    name: 'ЦехЛиговский',
  },
}
