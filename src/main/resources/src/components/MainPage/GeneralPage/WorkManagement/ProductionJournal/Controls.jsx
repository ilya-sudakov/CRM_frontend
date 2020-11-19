import React from 'react'
import ChevronImg from '../../../../../../../../../assets/tableview/chevron-down.inline.svg'

export const WorkshopControls = ({
  workshop,
  areWorkshopItemsMinimized,
  handleMinimizeAllWorkshopItems,
}) => {
  return (
    <div className="production-journal__workshop-name">
      <span>{workshop[0]}</span>
      <div
        className="main-form__button main-form__button--inverted"
        style={{
          borderColor: 'transparent',
          color: '#555555',
        }}
        title={`${
          areWorkshopItemsMinimized ? 'Раскрыть' : 'Скрыть'
        } продукцию и чертежи`}
        onClick={() => handleMinimizeAllWorkshopItems(workshop[1])}
      >
        <ChevronImg
          className={`production-journal__img production-journal__img--chevron ${
            areWorkshopItemsMinimized ? 'main-window__img--rotated' : ''
          }`}
        />
        <span>
          {areWorkshopItemsMinimized
            ? 'Раскрыть'
            : 'Скрыть продукцию и чертежи'}
        </span>
      </div>
    </div>
  )
}

export const ReadOnlyModeControls = ({
  readOnlyMode,
  handleChangeReadOnlyMode,
}) => {
  return (
    <div
      className="main-form__button main-form__button--inverted"
      title={readOnlyMode ? 'Раскрыть' : 'Скрыть'}
      onClick={handleChangeReadOnlyMode}
    >
      {readOnlyMode ? 'Режим чтения' : 'Режим редактирования'}
    </div>
  )
}
