import CheckBox from 'Components/Form/CheckBox/CheckBox.jsx';
import FileUploader from 'Components/Form/FileUploader/FileUploader.jsx';

const CategoryHeader = ({
  category,
  setCategories,
  categories,
  categoryIndex,
}) => {
  return (
    <div className="main-form__item main-form__item--header">
      <CheckBox
        checked={category.active}
        name="category"
        onChange={(value) => {
          let originalList = categories;
          originalList.splice(categoryIndex, 1, {
            ...category,
            active: value,
          });
          setCategories([...originalList]);
        }}
        text={category.name}
      />
      <div className="main-form__input_field">
        <FileUploader
          uniqueId={'categoryImg' + categoryIndex}
          type="readAsDataURL"
          onChange={(result) => {
            let originalList = categories;
            originalList.splice(categoryIndex, 1, {
              ...category,
              img: result[0],
            });
            setCategories([...originalList]);
          }}
          defaultValue={category.img !== '' ? [category.img] : undefined}
        />
      </div>
    </div>
  );
};

export default CategoryHeader;
