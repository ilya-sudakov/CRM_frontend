//Получение строки типа 'дд.мм.ГГГГ' из объекта Date
export const formatDateString = (dateString) => {
  // const testDate = new Date(Date.parse(dateString));
  const temp = new Date(dateString)
  const testDate = new Date(
    temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate(),
  )
  return (
    (testDate.getDate() < 10 ? '0' + testDate.getDate() : testDate.getDate()) +
    '.' +
    (testDate.getMonth() + 1 < 10
      ? '0' + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1) +
    '.' +
    testDate.getFullYear()
  )
}

export const formatDateStringNoYear = (dateString) => {
  // console.log(dateString);
  const temp = new Date(dateString)
  const testDate = new Date(
    temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate(),
  )
  return (
    (testDate.getDate() < 10 ? '0' + testDate.getDate() : testDate.getDate()) +
    '.' +
    (testDate.getMonth() + 1 < 10
      ? '0' + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1)
  )
}

export const formatDateStringWithTime = (dateString) => {
  const testDate = new Date(dateString)
  return (
    (testDate.getDate() < 10 ? '0' + testDate.getDate() : testDate.getDate()) +
    '.' +
    (testDate.getMonth() + 1 < 10
      ? '0' + (testDate.getMonth() + 1)
      : testDate.getMonth() + 1) +
    '.' +
    testDate.getFullYear() +
    ' ' +
    (testDate.getHours() < 10
      ? '0' + testDate.getHours()
      : testDate.getHours()) +
    ':' +
    (testDate.getMinutes() < 10
      ? '0' + testDate.getMinutes()
      : testDate.getMinutes())
  )
}

export const formatDateStringToTime = (dateString) => {
  const testDate = new Date(dateString)
  return (
    (testDate.getHours() < 10
      ? '0' + testDate.getHours()
      : testDate.getHours()) +
    ':' +
    (testDate.getMinutes() < 10
      ? '0' + testDate.getMinutes()
      : testDate.getMinutes())
  )
}

//Определение склонения слова в зависимости от остатка числа
//к которому оно относится
export const numberToString = (number, wordForms) => {
  number = Math.abs(number) % 100
  let remainder = number % 10
  if (number > 10 && number < 20) {
    return wordForms[2]
  }
  if (remainder > 1 && remainder < 5) {
    return wordForms[1]
  }
  if (remainder == 1) {
    return wordForms[0]
  }
  return wordForms[2]
}

//Функция для скачивания переданной картинки
export const imgToBlobDownload = (imageSrc, imageName) => {
  var img = new Image()
  img.src = imageSrc
  var c = document.createElement('canvas')
  var ctx = c.getContext('2d')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  ctx.drawImage(img, 0, 0)
  c.toBlob(
    function (blob) {
      // получаем содержимое как JPEG Blob
      let link = document.createElement('a')
      link.download = imageName
      link.href = URL.createObjectURL(blob)
      link.click()
      // удаляем ссылку на Blo
      URL.revokeObjectURL(link.href)
    },
    'image/jpeg',
    1,
  )
  img.crossOrigin = '' // if from different origin
  img.src = 'url-to-image'
}

//Получение URI из полученной картинки
export function getDataUri(url, extension, quality) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = () => {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      var dataURL = canvas.toDataURL(
        extension ? 'image/' + extension : 'image/png',
        quality ? quality : 0.92,
      )
      resolve(dataURL)
    }
    img.onerror = (error) => {
      reject(error)
    }
    img.src = url
  })
}

//Функция для изменения порядка сортировки
export const changeSortOrder = (event) => {
  const name = event.target.value.split(' ')[0]
  const order = event.target.value.split(' ')[1]
  return Object.assign({
    curSort: name,
    [name]: order,
  })
}

//Получение списка работ сотрудников из полученного массива
export const getAllProductsFromWorkCount = (works) => {
  let parts = {}
  works.map((work) => {
    // console.log(work)
    work.workControlProduct.map((product) => {
      if (parts[product.product.id] === undefined) {
        return (parts = Object.assign({
          ...parts,
          [product.product.id]: {
            product: product.product,
            name: product.product.name,
            quantity: Number.parseFloat(product.quantity),
          },
        }))
      } else {
        return (parts = Object.assign({
          ...parts,
          [product.product.id]: {
            ...parts[product.product.id],
            quantity:
              Number.parseFloat(parts[product.product.id].quantity) +
              Number.parseFloat(product.quantity),
          },
        }))
      }
    })
  })
  // console.log(parts)
  return parts
}

export const getAllDraftsFromWorkCount = (works) => {
  let parts = {}
  works.map((work) => {
    // console.log(work)
    work.workControlDrafts.map((draft) => {
      if (parts[draft.draft.id] === undefined) {
        return (parts = Object.assign({
          ...parts,
          [draft.draft.id]: {
            name: draft.draft.name,
            quantity: Number.parseFloat(draft.quantity),
          },
        }))
      } else {
        return (parts = Object.assign({
          ...parts,
          [draft.draft.id]: {
            ...parts[draft.draft.id],
            quantity:
              Number.parseFloat(parts[draft.draft.id].quantity) +
              Number.parseFloat(draft.quantity),
          },
        }))
      }
    })
  })
  // console.log(parts)
  return parts
}

//Получить случайный цвет формата hex
export const getRandomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

//Сложить два цвета
export const addHexColor = (color1, color2) => {
  var hexStr = (parseInt(color1, 16) + parseInt(color2, 16)).toString(16)
  while (hexStr.length < 6) {
    hexStr = '0' + hexStr
  }
  return hexStr
}

//Добавить разделитель пробел для полученной строки
export const addSpaceDelimiter = (str) => {
  return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}
