import React from 'react'
import ChevronImg from '../../../../../../../../../assets/tableview/chevron-down.inline.svg'
import Switch from '../../../../../utils/Form/Switch/Switch.jsx'

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
    <Switch
      checked={readOnlyMode}
      handleChange={handleChangeReadOnlyMode}
      text="Режим чтения"
      styles={{ marginRight: 'auto', marginLeft: '10px', marginBottom: '20px' }}
    />
  )
}
