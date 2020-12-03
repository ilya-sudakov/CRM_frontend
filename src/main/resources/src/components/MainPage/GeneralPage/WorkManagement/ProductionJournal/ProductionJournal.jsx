import React, { useState, useEffect, useContext } from 'react'
import './ProductionJournal.scss'
import '../../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import {
  addDraftToRecordedWork,
  addProductToRecordedWork,
  addRecordedWork,
  deleteDraftFromRecordedWork,
  deleteProductFromRecordedWork,
  deleteRecordedWork,
  editRecordedWork,
  getRecordedWorkByDay,
} from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import UserContext from '../../../../../App.js'
import { ReadOnlyModeControls, WorkshopControls } from './Controls.jsx'
import EmployeeData from './FormComponents.jsx'
import {
  sortEmployees,
  areWorkshopItemsMinimized,
  combineOriginalAndNewWorks,
  combineWorksForSamePeople,
} from './helpers.js'
import { loadDrafts, loadEmployees, loadWorkItems } from './fetchData.js'
import useProductsList from '../../../../../utils/hooks/useProductsList/useProductsList.js'

const ProductionJournal = (props) => {
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [categories, setCategories] = useState([])
  // const [products, setProducts] = useState([])
  const { products, categories, isLoadingProducts } = useProductsList()
  const [drafts, setDrafts] = useState([])
  const [employees, setEmployees] = useState([])
  const [works, setWorks] = useState([])
  const [employeesMap, setEmployeesMap] = useState({})
  const userContext = useContext(UserContext)
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    lemz: {},
    lepsari: {},
    ligovskiy: {},
    office: {},
    readOnly: false,
    readOnlyMode: userContext.userHasAccess(['ROLE_ADMIN']) ? true : false,
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

  const ROLE_MANAGER = {
    Офис: 'office',
  }
  const isManager = userContext.userHasAccess(['ROLE_MANAGER'])

  const isAdmin =
    userContext.userHasAccess(['ROLE_ADMIN']) ||
    userContext.userHasAccess(['ROLE_DISPATCHER']) ||
    userContext.userHasAccess(['ROLE_ENGINEER'])
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
      : isManager
      ? ROLE_MANAGER
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
                        product.product.id,
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
                      originalProduct.id,
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
                    originalProduct.quantity !==
                      Number.parseFloat(product.quantity)
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
                    console.log('delete draft', originalDraft, originalItem)
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
                      draft.type,
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
                  console.log('edit draft opportunity', originalDraft, draft)
                  if (
                    draft !== undefined &&
                    originalDraft.quantity !== Number.parseFloat(draft.quantity)
                  ) {
                    console.log('edit draft success', draft)
                    return deleteDraftFromRecordedWork(
                      item.id,
                      originalDraft.partId,
                      originalDraft.partType ??
                        drafts.find((item) => draft.partId === item.id)?.type,
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
                  Promise.all(
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
                  return res.id
                })
                .then((id) => {
                  return Promise.all(
                    item.draft.map((draft) => {
                      return addDraftToRecordedWork(
                        id,
                        draft.partId,
                        draft.type,
                        draft.quantity,
                        draft.name,
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
        // window.location.reload()
      })
    })
  }

  useEffect(() => {
    document.title = 'Дневник производства'
    const abortController = new AbortController()

    let employees = []

    if (works.length === 0) {
      loadWorkItems(abortController.signal, setIsLoading, setWorks)
    }
    if (drafts.length === 0) {
      loadDrafts(abortController.signal, setDrafts)
    }
    loadEmployees(
      abortController.signal,
      setIsLoading,
      setEmployees,
      setWorkTimeInputs,
      worktimeInputs,
      workshops,
    )
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
        const combinedWorks = await combineWorksForSamePeople(
          res,
          setEmployeesMap,
          setIsLoading,
        )
        combineOriginalAndNewWorks(
          combinedWorks,
          employees,
          setIsLoading,
          workshops,
          setWorkTimeInputs,
          worktimeInputs,
        )
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

    return function cancel() {
      abortController.abort()
    }
  }, [worktimeInputs.date])

  useEffect(() => {}, [worktimeInputs])

  const handleMinimizeAllWorkshopItems = (workshop) => {
    setWorkTimeInputs((worktimeInputs) => {
      const isFirstObjectMinimized = Object.values(worktimeInputs[workshop])[0]
        .isMinimized

      let newWorkshopData = worktimeInputs[workshop]
      Object.entries(worktimeInputs[workshop]).map((employee) => {
        newWorkshopData[employee[0]].isMinimized = !isFirstObjectMinimized
      })
      return {
        ...worktimeInputs,
        [workshop]: {
          ...newWorkshopData,
        },
      }
    })
  }

  const handleChangeReadOnlyMode = () => {
    setWorkTimeInputs((worktimeInputs) => {
      return {
        ...worktimeInputs,
        readOnlyMode: !worktimeInputs.readOnlyMode,
      }
    })
  }

  const handleDateChange = (date) => {
    //readonly для записей старше чем 3 дня
    //const readOnly = Math.abs(dateDiffInDays(new Date(), date)) > 3
    const readOnly = false

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
            handleDateChange={handleDateChange}
            errorsArr={workTimeErrors}
            setErrorsArr={setWorkTimeErrors}
            readOnly={isLoading || isLoadingProducts}
          />
          <ReadOnlyModeControls
            readOnlyMode={worktimeInputs.readOnlyMode}
            handleChangeReadOnlyMode={handleChangeReadOnlyMode}
          />
          {Object.entries(workshops).map((workshop) => (
            <>
              <WorkshopControls
                workshop={workshop}
                areWorkshopItemsMinimized={areWorkshopItemsMinimized(
                  worktimeInputs[workshop[1]],
                )}
                handleMinimizeAllWorkshopItems={handleMinimizeAllWorkshopItems}
              />
              {isLoading || isLoadingProducts ? (
                <PlaceholderLoading
                  wrapperClassName="production-journal__list"
                  itemClassName="main-form__item--placeholder"
                  minHeight="1.5rem"
                  items={5}
                />
              ) : (
                <div className="production-journal__list">
                  {sortEmployees(
                    Object.entries(worktimeInputs[workshop[1]]),
                  ).map((workItem, workIndex) => (
                    <div className="main-form__row" key={workIndex}>
                      <EmployeeData
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
                        readOnlyMode={worktimeInputs.readOnlyMode}
                        works={works}
                        employeesMap={employeesMap}
                      />
                    </div>
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
              isLoading={isLoading || isLoadingProducts}
              className="main-form__submit main-form__submit--floating"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductionJournal
