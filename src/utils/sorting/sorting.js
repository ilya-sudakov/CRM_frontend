const getFieldValues = (a, b, fieldName, fieldType) => {
  let firstValue, secondValue;
  switch (fieldType) {
    case 'dateString':
      firstValue = new Date(a);
      secondValue = new Date(b);
      break;
    case 'date':
      firstValue = new Date(a);
      secondValue = new Date(b);
      break;
    case 'object':
      firstValue = a[fieldName];
      secondValue = b[fieldName];
      break;
    case 'number':
      firstValue = a.toString();
      secondValue = b.toString();
      break;
    default:
      firstValue = a;
      secondValue = b;
      break;
  }
  return { firstValue, secondValue };
};

const getFieldType = (sortOptions, value) => {
  let fieldType = sortOptions.fieldType ?? typeof value;
  // if date string
  if (
    typeof value === 'string' &&
    value.length === 24 &&
    !isNaN(Date.parse(value)) &&
    !sortOptions.fieldType
  ) {
    fieldType = sortOptions.fieldType ?? 'date';
  }
  return fieldType;
};

const sortByValues = (firstValue, secondValue, direction) => {
  if (firstValue < secondValue) {
    return direction === 'desc' ? 1 : -1;
  }
  if (firstValue > secondValue) {
    return direction === 'desc' ? -1 : 1;
  }
  return 0;
};

const sortStrings = (firstValue, secondValue, direction) => {
  if (firstValue === undefined || secondValue === undefined) return 0;
  if (
    firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
    }) > 0
  ) {
    return direction === 'desc' ? -1 : 1;
  }
  if (
    firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
    }) < 0
  ) {
    return direction === 'desc' ? 1 : -1;
  }
  return 0;
};

export const sortByField = (
  data = [],
  sortOptions = {
    fieldName: 'id',
    direction: 'desc',
  },
) => {
  const direction = sortOptions.direction.toLowerCase();
  return data.sort((a, b) => {
    let firstValue, secondValue;
    let fieldType = getFieldType(sortOptions, a);
    //Если запрашиваем сортировку массива объектов по полю внутри объекта
    if (typeof a === 'object' && sortOptions.fieldType !== 'object') {
      fieldType = getFieldType(sortOptions, a[sortOptions.fieldName]);
      const values = getFieldValues(
        a[sortOptions.fieldName],
        b[sortOptions.fieldName],
        sortOptions.fieldName,
        fieldType,
      );
      firstValue = values.firstValue;
      secondValue = values.secondValue;
    } else {
      switch (fieldType) {
        case 'number':
          firstValue = a.toString();
          secondValue = b.toString();
          break;
        case 'dateString':
          firstValue = new Date(a);
          secondValue = new Date(b);
          break;
        case 'date':
          firstValue = new Date(a);
          secondValue = new Date(b);
          break;
        default:
          firstValue = a;
          secondValue = b;
          break;
      }
    }
    if (fieldType === 'date') {
      return sortByValues(firstValue, secondValue, direction);
    }
    return sortStrings(firstValue, secondValue, direction);
  });
};
