const getFieldValues = (a, b, fieldName, fieldType) => {
  let firstValue, secondValue;
  switch (fieldType) {
    case "dateString":
      firstValue = new Date(a);
      secondValue = new Date(b);
      break;
    case "object":
      firstValue = a[fieldName];
      secondValue = b[fieldName];
      break;
    case "number":
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

export const sortByField = (
  data = [],
  sortOptions = {
    fieldName: "id",
    direction: "desc",
  }
) => {
  const direction = sortOptions.direction.toLowerCase();
  return data.sort((a, b) => {
    let firstValue, secondValue;
    const fieldType = sortOptions.fieldType ?? typeof a;
    //Если запрашиваем сортировку массива объектов по полю внутри объекта
    if (typeof a === "object" && sortOptions.fieldType !== "object") {
      const values = getFieldValues(
        a[sortOptions.fieldName],
        b[sortOptions.fieldName],
        sortOptions.fieldName,
        sortOptions.fieldType
      );
      firstValue = values.firstValue;
      secondValue = values.secondValue;
    } else {
      switch (fieldType) {
        case "number":
          firstValue = a.toString();
          secondValue = b.toString();
          break;
        case "dateString":
          firstValue = new Date(a);
          secondValue = new Date(b);
          break;
        default:
          firstValue = a;
          secondValue = b;
          break;
      }
    }
    if (
      firstValue.localeCompare(secondValue, undefined, {
        numeric: true,
      }) < 0
    ) {
      return direction === "desc" ? -1 : 1;
    }
    if (
      firstValue.localeCompare(secondValue, undefined, {
        numeric: true,
      }) > 0
    ) {
      return direction === "desc" ? 1 : -1;
    }
    return 0;
  });
};
