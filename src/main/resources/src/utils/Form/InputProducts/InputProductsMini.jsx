import React, { useEffect } from "react";
import "./InputProducts.scss";
import SelectMini from "../../../components/MainPage/Select/SelectMini.jsx";

const InputProductsMini = (props) => {
  useEffect(() => {}, [props.products]);
  return (
    <div className="input_products input_products--new">
      <SelectMini {...props} numberInput />
    </div>
  );
};

export default InputProductsMini;
