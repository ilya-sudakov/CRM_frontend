export const sortEmployees = (employees) => {
  return employees.sort((a, b) => {
    a = a[1]
    b = b[1]
    if (a.employee.lastName < b.employee.lastName) {
      return -1
    }
    if (a.employee.lastName > b.employee.lastName) {
      return 1
    }
    return 0
  })
}

export const areWorkshopItemsMinimized = (workshopItems) => {
  return Object.values(workshopItems)[0]?.isMinimized
}
