import { getMainTasks } from '../../../../utils/RequestsAPI/MainTasks.jsx'

export const filterTasks = (tasks) => {
  return tasks.filter((task) => task.condition !== 'Выполнено')
}

export const getTasksList = async () => {
  let tasks = []
  await getMainTasks()
    .then((res) => res.json())
    .then((res) => {
      return (tasks = res)
    })
    .catch((err) => {
      return console.error(err)
    })
  return tasks
}
