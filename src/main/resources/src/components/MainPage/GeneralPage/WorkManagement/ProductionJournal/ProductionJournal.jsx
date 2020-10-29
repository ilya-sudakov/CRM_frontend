import React, { useState, useEffect, useContext } from 'react'
import './ProductionJournal.scss'
import '../../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import SelectEmployeeNew from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployeeNew.jsx'
import SelectWork from '../SelectWork/SelectWork.jsx'
import ChevronImg from '../../../../../../../../../assets/tableview/chevron-down.inline.svg'
import { getCategoriesNames } from '../../../../../utils/RequestsAPI/Products/Categories.jsx'
import {
  getProductById,
  getProductsByCategory,
  getProductsByLocation,
} from '../../../../../utils/RequestsAPI/Products.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { getEmployees } from '../../../../../utils/RequestsAPI/Employees.jsx'
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import {
  addDraftToRecordedWork,
  addProductToRecordedWork,
  addRecordedWork,
  deleteDraftFromRecordedWork,
  deleteProductFromRecordedWork,
  editRecordedWork,
  getRecordedWorkByDay,
} from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import { getStamp } from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import { getPressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import { getMachine } from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import { getParts } from '../../../../../utils/RequestsAPI/Parts.jsx'
import { getWork } from '../../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx'
import { dateDiffInDays } from '../../../../../utils/functions.jsx'
import { UserContext } from '../../../../../App.js'

const ProductionJournal = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    lemz: {},
    lepsari: {},
    ligovskiy: {},
    office: {},
    readOnly: false,
  })
  const [workTimeErrors, setWorkTimeErrors] = useState({
    date: false,
    employee: false,
    works: false,
  })
  const [validInputs, setValidInputs] = useState({
    date: true,
    employee: true,
    works: true,
  })
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [drafts, setDrafts] = useState([])
  const [employees, setEmployees] = useState([])
  const [works, setWorks] = useState([])
  const [employeesMap, setEmployeesMap] = useState({})
  const userContext = useContext(UserContext)

  const ROLE_LEMZ = {
    ЦехЛЭМЗ: 'lemz',
  }
  const isLemz = userContext.userHasAccess(['ROLE_LEMZ'])

  const ROLE_LEPSARI = {
    ЦехЛепсари: 'lepsari',
  }
  const isLepsari = userContext.userHasAccess(['ROLE_LEPSARI'])

  const ROLE_LIGOVSKIY = {
    ЦехЛиговский: 'ligovskiy',
  }
  const isLigovskiy = userContext.userHasAccess(['ROLE_LIGOVSKIY'])
  const isAdmin =
    userContext.userHasAccess(['ROLE_ADMIN']) ||
    userContext.userHasAccess(['ROLE_DISPATCHER'])
  const ROLE_ADMIN = {
    ЦехЛЭМЗ: 'lemz',
    ЦехЛепсари: 'lepsari',
    ЦехЛиговский: 'ligovskiy',
    Офис: 'office',
  }

  const [workshops, setWorkshops] = useState(
    isAdmin
      ? ROLE_ADMIN
      : isLemz
      ? ROLE_LEMZ
      : isLepsari
      ? ROLE_LEPSARI
      : isLigovskiy
      ? ROLE_LIGOVSKIY
      : ROLE_ADMIN,
  )

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'date':
        setValidInputs({
          ...validInputs,
          date: value !== null,
        })
        break
      case 'works':
        setValidInputs({
          ...validInputs,
          works: value !== null,
        })
        break
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== '',
          })
        }
        break
    }
  }

  const handleSubmit = () => {
    // setIsLoading(true)
    console.log(worktimeInputs)
    // alert('Тест формы')

    setIsLoading(true)
    // console.log(worktimeInputs);
    Object.entries(workshops).map((workshop) => {
      const employeesList = Object.entries(worktimeInputs[workshop[1]])
      Promise.all(
        employeesList.map((employee) => {
          return employee[1].works.map(async (item, index) => {
            const temp = Object.assign({
              day: worktimeInputs.date.getDate(),
              month: worktimeInputs.date.getMonth() + 1,
              year: worktimeInputs.date.getFullYear(),
              employeeId: employee[1].employee.id,
              workListId: item.workId,
              hours: item.hours,
            })

            //Удаление элементов
            await Promise.all(
              employee[1].originalWorks.map((originalWork) => {
                const item = employee[1].works.find(
                  (workItem) => workItem.id === originalWork.id,
                )
                if (originalWork.id && item === undefined) {
                  console.log('deleting element', employee[1])
                  return Promise.all(
                    originalWork.product.map((product) => {
                      return deleteProductFromRecordedWork(
                        originalWork.id,
                        product.id,
                      )
                    }),
                  )
                    .then(() => {
                      return Promise.all(
                        originalWork.draft.map((draft) => {
                          return deleteDraftFromRecordedWork(
                            originalWork.id,
                            draft.partId,
                            draft.partType,
                          )
                        }),
                      )
                    })
                    .then(() => deleteRecordedWork(originalWork.id))
                }
              }),
            )

            if (item.isOld) {
              //если часы не совпадают, то редактируем
              const originalItem = employee[1].originalWorks.find(
                (originalWork) => item.id === originalWork.id,
              )

              if (originalItem && item.hours !== originalItem.hours) {
                await editRecordedWork(temp, item.id)
              }

              //Продукция
              //delete removed products
              Promise.all(
                originalItem.product.map((originalProduct) => {
                  if (
                    item.product.find(
                      (product) => product.id === originalProduct.id,
                    ) === undefined
                  ) {
                    console.log('delete product', originalProduct)
                    return deleteProductFromRecordedWork(
                      item.id,
                      originalProduct.product.id,
                    )
                  }
                }),
              )

              //add new products
              Promise.all(
                item.product.map((product) => {
                  if (
                    originalItem.product.find(
                      (originalProduct) => product.id === originalProduct.id,
                    ) === undefined
                  ) {
                    console.log('add product', product)
                    return addProductToRecordedWork(
                      item.id,
                      product.id,
                      product.quantity,
                      {
                        name: product.name,
                      },
                    )
                  }
                }),
              )

              //update edited products
              Promise.all(
                originalItem.product.map((originalProduct) => {
                  const product = item.product.find(
                    (product) => product.id === originalProduct.id,
                  )
                  if (
                    product !== undefined &&
                    (originalProduct.quantity !== product.quantity ||
                      originalProduct.name !== product.name)
                  ) {
                    console.log('edit product', product)
                    return deleteProductFromRecordedWork(
                      item.id,
                      originalProduct.product.id,
                    ).then(() =>
                      addProductToRecordedWork(
                        item.id,
                        product.product.id,
                        product.quantity,
                        {
                          name: product.name,
                        },
                      ),
                    )
                  }
                }),
              )

              //Чертежи
              //delete removed drafts
              Promise.all(
                originalItem.draft.map((originalDraft) => {
                  if (
                    item.draft.find(
                      (draft) => draft.id === originalDraft.id,
                    ) === undefined
                  ) {
                    console.log('delete draft', originalDraft)
                    return deleteDraftFromRecordedWork(
                      item.id,
                      originalDraft.partId,
                      originalDraft.partType,
                    )
                  }
                }),
              )

              //add new drafts
              Promise.all(
                item.draft.map((draft) => {
                  if (
                    originalItem.draft.find(
                      (originalDraft) => draft.id === originalDraft.id,
                    ) === undefined
                  ) {
                    console.log('add draft', draft)
                    return addDraftToRecordedWork(
                      item.id,
                      draft.partId,
                      draft.partType,
                      draft.quantity,
                      draft.name,
                    )
                  }
                }),
              )

              //update edited drafts
              Promise.all(
                originalItem.draft.map((originalDraft) => {
                  const draft = item.draft.find(
                    (draft) => draft.id === originalDraft.id,
                  )
                  if (
                    draft !== undefined &&
                    originalDraft.quantity !== draft.quantity
                  ) {
                    console.log('edit draft', draft)
                    return deleteDraftFromRecordedWork(
                      item.id,
                      draft.partId,
                      draft.partType,
                    ).then(() =>
                      addDraftToRecordedWork(
                        item.id,
                        draft.partId,
                        draft.partType,
                        draft.quantity,
                        draft.name,
                      ),
                    )
                  }
                }),
              )
            }

            //if item is new, then just add it
            if (
              !item.isOld &&
              item.workId !== null &&
              item.isOld !== undefined
            ) {
              console.log('adding item', item)
              return addRecordedWork(temp)
                .then((res) => res.json())
                .then((res) => {
                  return Promise.all(
                    item.product.map((product) => {
                      return addProductToRecordedWork(
                        res.id,
                        product.id,
                        product.quantity,
                        {
                          name: product.name,
                        },
                      )
                    }),
                  )
                })
                .then(() => {
                  return Promise.all(
                    item.draft.map((draft) => {
                      return addDraftToRecordedWork(
                        itemId,
                        draft.partId,
                        draft.type,
                        draft.quantity,
                      )
                    }),
                  )
                })
                .catch((error) => {
                  alert('Ошибка при добавлении записи')
                  setIsLoading(false)
                  // setShowError(true);
                  console.log(error)
                })
            }

            // Promise.all(editedInputs).then(() => {})
          })
        }),
      ).then(() => {
        props.history.push('/')
      })
    })
  }

  useEffect(() => {
    document.title = 'Дневник производства'
    const abortController = new AbortController()

    let employees = []

    if (works.length === 0) {
      loadWorkItems(abortController.signal)
    }
    if (products.length === 0) {
      loadProducts(abortController.signal)
    }
    if (drafts.length === 0) {
      loadDrafts(abortController.signal)
    }
    loadEmployees(abortController.signal)
      .then((res) => {
        employees = res
        setIsLoading(true)
        return getRecordedWorkByDay(
          worktimeInputs.date.getMonth() + 1,
          worktimeInputs.date.getDate(),
          abortController.signal,
        )
      })
      .then((res) => res.json())
      .then(async (res) => {
        const combinedWorks = await combineWorksForSamePeople(res)
        combineOriginalAndNewWorks(combinedWorks, employees)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

    return function cancel() {
      abortController.abort()
    }
  }, [worktimeInputs.date])

  const combineWorksForSamePeople = (works) => {
    // let newEmployeesWorkMap = [];
    let newEmployeesMap = {}
    return Promise.all(
      works.map((work) => {
        const { id } = work.employee
        const workList = {
          workId: work.workList.id,
          workType: work.workList.typeOfWork,
          workName: work.workList.work,
        }
        if (newEmployeesMap[id] !== undefined) {
          return (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [id]: {
              ...newEmployeesMap[id],
              works: [
                ...newEmployeesMap[id].works,
                {
                  ...work,
                  ...workList,
                  isOld: true,
                  product: work.workControlProduct.map((product) => {
                    return {
                      ...product,
                      name: product.product.name,
                      status: product.product.status,
                    }
                  }),
                  draft: work.partsWorks,
                },
              ],
            },
          }))
        } else {
          return (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [id]: {
              employee: work.employee,
              works: [
                {
                  ...work,
                  ...workList,
                  isOld: true,
                  product: work.workControlProduct.map((product) => {
                    return {
                      ...product,
                      name: product.product.name,
                      status: product.product.status,
                    }
                  }),
                  draft: work.partsWorks,
                },
              ],
            },
          }))
        }
      }),
    )
      .then(() => {
        console.log(newEmployeesMap)
        setEmployeesMap(newEmployeesMap)
        return newEmployeesMap
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const combineOriginalAndNewWorks = (works, employees) => {
    setIsLoading(true)
    let newWorkshops = {}
    Object.entries(workshops).map((workshop) => {
      let newWorkshopValues = {}
      const curWorkshopEmployees = Object.entries(employees[workshop[1]])
      curWorkshopEmployees.map((employee) => {
        // console.log(employee[0])
        if (works[employee[0]] !== undefined) {
          return (newWorkshopValues = {
            ...newWorkshopValues,
            [employee[0]]: {
              ...employee[1],
              originalWorks: works[employee[0]].works,
              works: works[employee[0]].works,
            },
          })
        }
        return (newWorkshopValues = {
          ...newWorkshopValues,
          [employee[0]]: {
            ...employee[1],
            works: employees[workshop[1]][employee[0]].works,
          },
        })
      })
      return (newWorkshops = {
        ...newWorkshops,
        [workshop[1]]: newWorkshopValues,
      })
    })
    setIsLoading(false)
    console.log(newWorkshops)
    setWorkTimeInputs({
      ...worktimeInputs,
      ...newWorkshops,
    })
  }

  useEffect(() => {}, [worktimeInputs])

  const loadProducts = (signal) => {
    getCategoriesNames(signal) //Только категории
      .then((res) => res.json())
      .then((res) => {
        const categoriesArr = res
        setCategories(res)
        let productsArr = []
        if (
          userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_DISPATCHER',
            'ROLE_ENGINEER',
            'ROLE_MANAGER',
          ])
        ) {
          Promise.all(
            categoriesArr.map((item) => {
              let category = {
                category: item.category,
              }
              return getProductsByCategory(category, signal) //Продукция по категории
                .then((res) => res.json())
                .then((res) => {
                  res.map((item) => productsArr.push(item))
                  setProducts([...productsArr])
                })
            }),
          ).then(() => {
            //Загружаем картинки по отдельности для каждой продукции
            Promise.all(
              productsArr.map((item, index) => {
                getProductById(item.id, signal)
                  .then((res) => res.json())
                  .then((res) => {
                    // console.log(res);
                    productsArr.splice(index, 1, res)
                    setProducts([...productsArr])
                  })
              }),
            ).then(() => {
              console.log('all images downloaded')
            })
          })
        } else {
          getProductsByLocation(
            {
              productionLocation: userContext.userHasAccess(['ROLE_LIGOVSKIY'])
                ? 'ЦехЛиговский'
                : userContext.userHasAccess(['ROLE_LEMZ'])
                ? 'ЦехЛЭМЗ'
                : userContext.userHasAccess(['ROLE_LEPSARI']) && 'ЦехЛепсари',
            },
            signal,
          )
            .then((res) => res.json())
            .then((res) => {
              res.map((item) => productsArr.push(item))
              setProducts([...productsArr])
              Promise.all(
                productsArr.map((item, index) => {
                  getProductById(item.id, signal)
                    .then((res) => res.json())
                    .then((res) => {
                      // console.log(res);
                      productsArr.splice(index, 1, res)
                      setProducts([...productsArr])
                    })
                }),
              ).then(() => {
                console.log('all images downloaded')
              })
            })
        }
      })
  }

  async function loadDrafts(signal) {
    let newDrafts = []
    getStamp(signal)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.stampParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: 'Stamp',
            })
          })
        })
        // console.log(newDrafts);
        return setDrafts([...newDrafts])
      })
      .then(() => getPressForm(signal))
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.pressParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: 'Press',
            })
          })
        })
        return setDrafts([...newDrafts])
      })
      .then(() => getMachine(signal))
      .then((response) => response.json())
      .then((response) => {
        // console.log(response)
        response.map((item) => {
          return item.benchParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: 'Bench',
            })
          })
        })
        return setDrafts([...newDrafts])
        // console.log(newDrafts)
      })
      .then(() => getParts(signal))
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        res.map((item) => {
          return item.detailParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: 'Detail',
            })
          })
        })
        // console.log(newDrafts)
        return setDrafts([...newDrafts])
      })
  }

  const loadEmployees = async (signal) => {
    setIsLoading(true)
    return await getEmployees(signal)
      .then((res) => res.json())
      .then((res) => {
        setEmployees(res)
        let newWorkshopEmployees = {}
        return Promise.all(
          Object.entries(workshops).map((workshop) => {
            let filteredEmployees = {}
            res
              .filter(
                (item) =>
                  item.workshop === workshop[0] && item.relevance !== 'Уволен',
              )
              .map((employee) => {
                // console.log(employee)
                return (filteredEmployees = {
                  ...filteredEmployees,
                  [employee.id]: {
                    isMinimized: false,
                    employee: employee,
                    works: [
                      //uncomment to get one work as a default
                      // {
                      //   isOld: false,
                      //   product: [],
                      //   draft: [],
                      //   workName: '',
                      //   workType: '',
                      //   workId: null,
                      //   hours: 0,
                      //   comment: '',
                      // },
                    ],
                    originalWorks: [],
                    totalHours: 0,
                  },
                })
              })
            return (newWorkshopEmployees = {
              ...newWorkshopEmployees,
              [workshop[1]]: filteredEmployees,
            })
          }),
        ).then(() => {
          setWorkTimeInputs({
            ...worktimeInputs,
            ...newWorkshopEmployees,
          })
          return newWorkshopEmployees
        })
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        return setIsLoading(false)
      })
  }

  const loadWorkItems = async (signal) => {
    setIsLoading(true)
    return getWork(signal)
      .then((res) => res.json())
      .then((res) => {
        return setWorks(
          res.map((work) => {
            return {
              // work.work, work.id, work.typeOfWork
              value: work.id,
              label: work.work,
              typeOfWork: work.typeOfWork,
            }
          }),
        )
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  return (
    <div className="production-journal">
      <div className="main-form">
        <form className="main-form__form main-form__form--full">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Дневник производства</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputDate
            inputName="Дата"
            error={Date.parse(workTimeErrors.date)}
            name="date"
            // disabled
            selected={worktimeInputs.date}
            handleDateChange={(date) => {
              const readOnly = Math.abs(dateDiffInDays(new Date(), date)) > 3
              validateField('date', date)
              setWorkTimeInputs({
                ...worktimeInputs,
                date: date,
                readOnly: readOnly,
              })
              setWorkTimeErrors({
                ...workTimeErrors,
                date: false,
              })
            }}
            errorsArr={workTimeErrors}
            setErrorsArr={setWorkTimeErrors}
          />
          {Object.entries(workshops).map((workshop, index) => (
            <>
              <div className="production-journal__workshop-name">
                <span>{workshop[0]}</span>
                <div
                  className="main-form__button main-form__button--inverted"
                  style={{
                    borderColor: 'transparent',
                    color: '#555555',
                  }}
                  title={`${
                    Object.values(worktimeInputs[workshop[1]])[0]?.isMinimized
                      ? 'Раскрыть'
                      : 'Скрыть'
                  } продукцию и чертежи`}
                  onClick={() => {
                    setWorkTimeInputs((worktimeInputs) => {
                      const isFirstObjectMinimized = Object.values(
                        worktimeInputs[workshop[1]],
                      )[0].isMinimized

                      let newWorkshopData = worktimeInputs[workshop[1]]
                      Object.entries(worktimeInputs[workshop[1]]).map(
                        (employee) => {
                          newWorkshopData[
                            employee[0]
                          ].isMinimized = !isFirstObjectMinimized
                        },
                      )
                      return {
                        ...worktimeInputs,
                        [workshop[1]]: {
                          ...newWorkshopData,
                        },
                      }
                    })
                  }}
                >
                  <ChevronImg
                    className={`production-journal__img production-journal__img--chevron ${
                      Object.values(worktimeInputs[workshop[1]])[0]?.isMinimized
                        ? 'main-window__img--rotated'
                        : ''
                    }`}
                  />
                  <span>
                    {Object.values(worktimeInputs[workshop[1]])[0]?.isMinimized
                      ? 'Раскрыть'
                      : 'Скрыть продукцию и чертежи'}
                  </span>
                </div>
              </div>
              {isLoading ? (
                <PlaceholderLoading
                  wrapperClassName="production-journal__list"
                  itemClassName="main-form__item--placeholder"
                  minHeight="1.5rem"
                  items={5}
                />
              ) : (
                <div className="production-journal__list">
                  {Object.entries(worktimeInputs[workshop[1]])
                    .sort((a, b) => {
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
                    .map((workItem, workIndex) => (
                      <>
                        <div className="main-form__row" key={workIndex}>
                          <FormRow
                            workTimeErrors={workTimeErrors}
                            setWorkTimeErrors={setWorkTimeErrors}
                            worktimeInputs={worktimeInputs}
                            setWorkTimeInputs={setWorkTimeInputs}
                            employees={employees}
                            workItem={workItem[1]}
                            workshop={workshop}
                            workIndex={workIndex}
                            categories={categories}
                            products={products}
                            drafts={drafts}
                            readOnly={worktimeInputs.readOnly}
                            works={works}
                            employeesMap={employeesMap}
                          />
                        </div>
                      </>
                    ))}
                </div>
              )}
            </>
          ))}

          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push('/work-management')}
              value="Вернуться назад"
            />
            <Button
              text="Сохранить данные"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductionJournal

const FormRow = ({
  setWorkTimeInputs,
  products,
  categories,
  drafts,
  works,
  worktimeInputs,
  workItem,
  workshop,
  employeesMap,
  readOnly,
}) => {
  return (
    <>
      <div
        className={`main-form__item main-form__item--employee ${
          workItem.totalHours === 0 ? 'main-form__item--error' : ''
        }`}
        data-position={workItem.employee.position}
        data-hours={
          workItem.totalHours > 0 ? `${workItem.totalHours} ч` : `Нет записи!`
        }
      >
        <input
          type="text"
          className="main-form__input_field"
          value={`${workItem.employee.lastName} ${workItem.employee.name} ${workItem.employee.middleName}`}
          readOnly
        ></input>
      </div>
      <div className="production-journal__works-list">
        {!readOnly ? (
          <div
            className="main-form__button main-form__button--inverted"
            style={{
              borderColor: 'transparent',
              fontSize: '28px',
              color: '#888888',
            }}
            title="Добавить запись о работе"
            onClick={() => {
              setWorkTimeInputs((worktimeInputs) => {
                return {
                  ...worktimeInputs,
                  [workshop[1]]: {
                    ...worktimeInputs[workshop[1]],
                    [workItem.employee.id]: {
                      ...workItem,
                      works: [
                        ...workItem.works,
                        {
                          product: [],
                          isOld: false,
                          draft: [],
                          workName: '',
                          workType: '',
                          workId: null,
                          hours: 0,
                          comment: '',
                        },
                      ],
                    },
                  },
                }
              })
            }}
          >
            +
          </div>
        ) : null}
        {workItem.works.length > 0 ? (
          <div
            className="main-form__button main-form__button--inverted"
            style={{
              borderColor: 'transparent',
              color: '#555555',
            }}
            title={`${
              workItem.isMinimized ? 'Раскрыть' : 'Скрыть'
            } продукцию и чертежи`}
            onClick={() => {
              setWorkTimeInputs((worktimeInputs) => {
                return {
                  ...worktimeInputs,
                  [workshop[1]]: {
                    ...worktimeInputs[workshop[1]],
                    [workItem.employee.id]: {
                      ...workItem,
                      isMinimized: !workItem.isMinimized,
                    },
                  },
                }
              })
            }}
          >
            <ChevronImg
              className={`production-journal__img production-journal__img--chevron ${
                workItem.isMinimized ? 'main-window__img--rotated' : ''
              }`}
            />
          </div>
        ) : null}
        <JournalForm
          setWorkTimeInputs={setWorkTimeInputs}
          worktimeInputs={worktimeInputs}
          workItem={workItem}
          workshop={workshop}
          categories={categories}
          products={products}
          works={works}
          drafts={drafts}
          readOnly={readOnly}
          employeesMap={employeesMap}
        />
      </div>
    </>
  )
}

const JournalForm = ({
  setWorkTimeInputs,
  workItem,
  workshop,
  products,
  categories,
  drafts,
  works,
  employeesMap,
  readOnly,
}) => {
  return (
    <div
      className={`production-journal__form ${
        workItem.isMinimized ? 'production-journal__form--minimized' : ''
      }`}
    >
      {/* Создание работы */}
      <div className="main-form__item">
        <div className="main-form__input_field">
          {/* {console.log(workItem)} */}
          <SelectWork
            handleWorkChange={(value) => {
              setWorkTimeInputs((worktimeInputs) => {
                return {
                  ...worktimeInputs,
                  [workshop[1]]: {
                    ...worktimeInputs[workshop[1]],
                    [workItem.employee.id]: {
                      ...workItem,
                      works: value,
                    },
                  },
                }
              })
            }}
            totalHours={workItem.totalHours}
            newDesign
            defaultConfig={[
              {
                isOld: false,
                product: [],
                draft: [],
                workName: '',
                workType: '',
                workId: null,
                hours: 0,
                comment: '',
              },
            ]}
            setTotalHours={(value) => {
              setWorkTimeInputs((worktimeInputs) => {
                return {
                  ...worktimeInputs,
                  [workshop[1]]: {
                    ...worktimeInputs[workshop[1]],
                    [workItem.employee.id]: {
                      ...workItem,
                      totalHours: value,
                    },
                  },
                }
              })
            }}
            categories={categories}
            products={products}
            drafts={drafts}
            workItems={works}
            defaultValue={workItem.works}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  )
}
