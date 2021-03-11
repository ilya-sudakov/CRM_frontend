import { useState, useEffect } from 'react';
import './SelectPriceItem.scss';
import FileUploader from 'Utils/Form/FileUploader/FileUploader.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import { getDataUri } from 'Utils/functions.jsx';
import NestedFormItem from 'Utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx';
import { defaultPriceItemObject } from './objects.js';

const SelectPriceItem = (props) => {
  const [selected, setSelected] = useState([defaultPriceItemObject]);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);
  const [groupImg1, setGroupImg1] = useState(null);
  const [groupImg2, setGroupImg2] = useState(null);
  const [groupImg3, setGroupImg3] = useState(null);
  const [groupImg4, setGroupImg4] = useState(null);
  const [footerImg, setFooterImg] = useState(null);

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([
        ...props.defaultValue.map((item) => ({ ...item, isMinimized: true })),
      ]);
      setDefaultValueLoaded(true);
    }
    if (props.groupImg1 !== undefined) setGroupImg1(props.groupImg1);
    if (props.groupImg2 !== undefined) setGroupImg2(props.groupImg2);
    if (props.groupImg3 !== undefined) setGroupImg3(props.groupImg3);
    if (props.groupImg4 !== undefined) setGroupImg4(props.groupImg4);
    if (props.footerImg !== undefined) setFooterImg(props.footerImg);
  }, [
    props.defaultValue,
    props.groupImg1,
    props.groupImg2,
    props.groupImg3,
    props.groupImg4,
    props.footerImg,
    selected,
  ]);

  const handleNewPriceItem = () => {
    //Открыть по дефолту форму
    setSelected([...selected, defaultPriceItemObject]);
    props.handlePriceItemChange([...selected, defaultPriceItemObject]);
  };

  const deletePriceItem = (index) => {
    let temp = selected;
    temp.splice(index, 1);
    setSelected([...temp]);
    props.handlePriceItemChange([...temp]);
  };

  const handleInputChange = (index, name, value) => {
    let temp = selected;
    let originalItem = selected[index];
    temp.splice(index, 1, {
      ...originalItem,
      [name]: value,
    });
    setSelected([...temp]);
    props.handlePriceItemChange([...temp]);
  };

  const getInputElement = (name, index, value, type = 'number') => {
    return (
      <input
        type={type}
        name={name}
        autoComplete="off"
        onChange={({ target }) => handleInputChange(index, name, target.value)}
        value={value}
        readOnly={props.readOnly}
      />
    );
  };

  const onImageDataChange = async (result, imgInfo) => {
    const downgraded =
      result !== '' ? await getDataUri(result, 'jpeg', 0.3) : '';
    imgInfo.setter(downgraded);
    props.handleImgChange(downgraded, imgInfo.itemName);
  };

  const getPhotoInputElement = (title, index, imgInfo) => {
    return (
      <div className="main-form__item">
        <div className="main-form__input_name">{title}</div>
        <div className="main-form__input_field">
          {!props.readOnly && (
            <FileUploader
              uniqueId={`file${index}${props.uniqueId}`}
              type="readAsDataURL"
              onChange={(result) => onImageDataChange(result[0], imgInfo)}
              defaultValue={
                imgInfo.previewImage && imgInfo.previewImage !== ''
                  ? [imgInfo.previewImage]
                  : undefined
              }
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="select-price-item">
      <div className="select-price-item__selected">
        {!props.readOnly && (
          <div className="price-list__images-wrapper">
            {getPhotoInputElement('Фотография 1', 1, {
              setter: (downgraded) => setGroupImg1(downgraded),
              itemName: 'groupImg1',
              previewImage: groupImg1,
            })}
            {getPhotoInputElement('Фотография 2', 2, {
              setter: (downgraded) => setGroupImg2(downgraded),
              itemName: 'groupImg2',
              previewImage: groupImg2,
            })}
            {getPhotoInputElement('Фотография 3', 3, {
              setter: (downgraded) => setGroupImg3(downgraded),
              itemName: 'groupImg3',
              previewImage: groupImg3,
            })}
            {getPhotoInputElement('Фотография 4', 4, {
              setter: (downgraded) => setGroupImg4(downgraded),
              itemName: 'groupImg4',
              previewImage: groupImg4,
            })}
            {getPhotoInputElement('Фотография снизу', 5, {
              setter: (downgraded) => setFooterImg(downgraded),
              itemName: 'footerImg',
              previewImage: footerImg,
            })}
          </div>
        )}
        {!props.readOnly && (
          <Button
            className="main-window__button"
            onClick={handleNewPriceItem}
            text="Добавить продукцию"
          />
        )}
        {selected.map((item, index) => (
          <NestedFormItem
            key={index}
            itemsLength={selected.length}
            handleDeleteItem={() => deletePriceItem(index)}
            isMinimizedDefault={true}
            headerItems={[
              {
                text: 'Артикул',
                value: item.number,
                placeholder: 'Введите артикул...',
                style: { flex: ' 0 1 15%' },
              },
              {
                text: 'Описание',
                value: item.description,
                placeholder: 'Введите описание...',
                style: { flex: ' 0 1 40%' },
              },
              {
                text: 'Розница',
                value: item.retailPrice,
                placeholder: 'Введите розн. цену...',
                style: { flex: ' 0 1 15%' },
              },
              {
                text: 'до 1500 шт.',
                value: item.lessThan1500Price,
                placeholder: 'Введите цену до 1500шт...',
                style: { flex: ' 0 1 15%' },
              },
              {
                text: 'до 5000 шт.',
                value: item.lessThan5000Price,
                placeholder: 'Введите цену до 5000шт...',
                style: { flex: ' 0 1 15%' },
              },
            ]}
            formInputs={[
              {
                name: 'Название',
                element: getInputElement('name', index, item.name, 'text'),
              },
              {
                name: 'Артикул',
                element: getInputElement('number', index, item.number, 'text'),
              },
              {
                name: 'Описание',
                element: getInputElement(
                  'description',
                  index,
                  item.description,
                  'text',
                ),
              },
              {
                name: 'Розница (рыночная цена)',
                element: getInputElement(
                  'retailMarketPrice',
                  index,
                  item.retailMarketPrice,
                ),
              },
              {
                name: 'Розница',
                element: getInputElement(
                  'retailPrice',
                  index,
                  item.retailPrice,
                ),
              },
              {
                name: 'До 1500 шт.',
                element: getInputElement(
                  'lessThan1500Price',
                  index,
                  item.lessThan1500Price,
                ),
              },
              {
                name: 'До 5000 шт.',
                element: getInputElement(
                  'lessThan5000Price',
                  index,
                  item.lessThan5000Price,
                ),
              },
              {
                name: 'Партнер',
                element: getInputElement(
                  'partnerPrice',
                  index,
                  item.partnerPrice,
                ),
              },
              {
                name: 'Дилер',
                element: getInputElement(
                  'dealerPrice',
                  index,
                  item.dealerPrice,
                ),
              },
              {
                name: 'Дистрибутор',
                element: getInputElement(
                  'distributorPrice',
                  index,
                  item.distributorPrice,
                ),
              },
              {
                name: 'Стопцена',
                element: getInputElement('stopPrice', index, item.stopPrice),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectPriceItem;
