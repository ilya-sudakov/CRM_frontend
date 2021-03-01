import React from "react";

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
          uniqueId={"categoryImg" + categoryIndex}
          onChange={(result) => {
            let originalList = categories;
            originalList.splice(categoryIndex, 1, {
              ...category,
              img: result,
            });
            setCategories([...originalList]);
          }}
          previewImage={category.img}
        />
      </div>
    </div>
  );
};

export default CategoryHeader;
