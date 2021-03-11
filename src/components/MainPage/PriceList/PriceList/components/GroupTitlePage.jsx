import { getDataUri } from 'Utils/functions.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';
import ChevronSVG from 'Assets/tableview/chevron-down.inline.svg';
import FileUploader from 'Utils/Form/FileUploader/FileUploader.jsx';

const GroupTitlePage = ({ titlePage, setTitlePage }) => {
  const handleActivateTitlePageGroup = (value) => {
    return setTitlePage({
      ...titlePage,
      active: value,
    });
  };

  const handleMinimizeTitlePageGroup = () => {
    return setTitlePage({
      ...titlePage,
      isMinimized: !titlePage.isMinimized,
    });
  };

  const getTitlePagePhotoInputElement = (title, index, name) => {
    return (
      <div className="main-form__item">
        <div className="main-form__input_name">{title}</div>
        <div className="main-form__input_field">
          <FileUploader
            uniqueId={`fileTitlePage${index}`}
            onChange={async (result) => {
              const downgraded =
                result !== '' ? await getDataUri(result, 'jpeg', 0.3) : '';
              setTitlePage({
                ...titlePage,
                [name]: downgraded,
              });
            }}
            defaultValue={titlePage[name] !== '' ? [titlePage[name]] : null}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="main-form__item main-form__item--header">
        <CheckBox
          checked={titlePage.active}
          name="titleList"
          onChange={handleActivateTitlePageGroup}
          text="Титульная страница"
        />
        <ChevronSVG
          className={`main-window__img`}
          style={{ transform: `rotate(${titlePage.isMinimized ? 0 : 180}deg)` }}
          title={`${
            titlePage.isMinimized ? 'Раскрыть' : 'Скрыть'
          } Титульный лист`}
          onClick={handleMinimizeTitlePageGroup}
        />
      </div>
      {!titlePage.isMinimized && titlePage.active ? (
        <div className="price-list__title-page-wrapper">
          <InputText
            inputName="Получатель"
            name="to"
            defaultValue={titlePage.to}
            handleInputChange={(event) => {
              setTitlePage({
                ...titlePage,
                to: event.target.value,
              });
            }}
          />
          <div className="price-list__images-wrapper">
            {getTitlePagePhotoInputElement('Фотография 1', 1, 'img1')}
            {getTitlePagePhotoInputElement('Фотография 2', 2, 'img2')}
            {getTitlePagePhotoInputElement('Фотография 3', 3, 'img3')}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GroupTitlePage;
