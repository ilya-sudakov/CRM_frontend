import React, { useEffect } from "react";
import "./InputProducts.scss";
import SelectNew from "../../../components/MainPage/Select/SelectNew.jsx";

const InputProductsNew = (props) => {
  useEffect(() => {}, [props.products]);
  return (
    <div className="input_products input_products--new">
      <SelectNew {...props} numberInput />
    </div>
  );
};

export default InputProductsNew;
