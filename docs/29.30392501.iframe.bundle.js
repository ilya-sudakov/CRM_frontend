(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{2822:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(159),__webpack_require__(26),__webpack_require__(2)),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2825),__webpack_require__(1)),InputText=function InputText(_ref){var inputName=_ref.inputName,required=_ref.required,error=_ref.error,type=_ref.type,name=_ref.name,handleInputChange=_ref.handleInputChange,defaultValue=_ref.defaultValue,readOnly=_ref.readOnly,disabled=_ref.disabled,setErrorsArr=_ref.setErrorsArr,errorsArr=_ref.errorsArr;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__input_name",children:inputName+(required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:!0===error?"input_text__input_field input_text__input_field--error":"input_text__input_field",children:"textarea"===type?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea",{name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input",{type:type||"text",name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled})})]}),error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__error",onClick:setErrorsArr?function(){return setErrorsArr(Object.assign({},errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},name,!1)))}:null,children:"Поле не заполнено!"})]})};InputText.displayName="InputText",InputText.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleInputChange:{type:{name:"func"},required:!1,description:""},defaultValue:{type:{name:"string"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},disabled:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputText,InputText.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,handleInputChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,defaultValue:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/Form/InputText/InputText.jsx"]={name:"InputText",docgenInfo:InputText.__docgenInfo,path:"src/utils/Form/InputText/InputText.jsx"})},2824:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(26),__webpack_require__(35),__webpack_require__(50),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2828),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"})},2825:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2826);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2826:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_text{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_text .input_text__error{width:100%;margin-top:1px;font-size:0.75rem;box-sizing:border-box;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_text .input_text__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_text .input_text__input .input_text__input_name{color:#666;padding-right:10px;flex:0 1 calc(20% - 10px);width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;min-height:2rem;width:100%}.input_text .input_text__input .input_text__input_field input[type="text"],.input_text .input_text__input .input_text__input_field input[type="password"],.input_text .input_text__input .input_text__input_field input[type="number"],.input_text .input_text__input .input_text__input_field textarea{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;transition:100ms ease-in-out;box-sizing:border-box}.input_text .input_text__input .input_text__input_field input[type="text"]:hover,.input_text .input_text__input .input_text__input_field input[type="password"]:hover,.input_text .input_text__input .input_text__input_field input[type="number"]:hover,.input_text .input_text__input .input_text__input_field textarea:hover{border-color:#888888}.input_text .input_text__input .input_text__input_field input[type="text"]:focus,.input_text .input_text__input .input_text__input_field input[type="password"]:focus,.input_text .input_text__input .input_text__input_field input[type="number"]:focus,.input_text .input_text__input .input_text__input_field textarea:focus{border:1px solid #4293b6}.input_text .input_text__input .input_text__input_field input::-webkit-outer-spin-button,.input_text .input_text__input .input_text__input_field input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.input_text .input_text__input .input_text__input_field textarea{min-width:calc(100% - 20px);outline:none;min-height:100px;max-height:150px;resize:vertical}.input_text .input_text__input .input_text__input_field input[type="number"]{-moz-appearance:textfield}.input_text .input_text__input .input_text__input_field--error input[type="text"],.input_text .input_text__input .input_text__input_field--error input[type="number"],.input_text .input_text__input .input_text__input_field--error input[type="password"],.input_text .input_text__input .input_text__input_field--error textarea{border:1px solid #d48282 !important}@media (max-width: 768px){.input_text .input_text__input{flex-wrap:wrap;align-items:flex-start;flex-direction:column}.input_text .input_text__input .input_text__input_name{width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{width:calc(100% - 0px)}.input_text .input_text__input .input_text__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2827:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(26),__webpack_require__(0)),Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1003),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2831),__webpack_require__(1)),ControlPanel=function ControlPanel(props){var _props$styles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!0),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isHidden=_useState2[0],setIsHidden=_useState2[1];return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"control-panel",style:Object.assign({},null!==(_props$styles=props.styles)&&void 0!==_props$styles?_props$styles:{}),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__control-panel-wrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"control-panel__buttons",children:[props.sorting||null,props.content?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__button main-window__button--inverted main-window__button--filter",onClick:function onClick(){return setIsHidden((function(isHidden){return!isHidden}))},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{children:props.panelName||"Фильтры"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__.a,{className:"main-window__img ".concat(isHidden?"":"main-window__img--rotated")})]}):null,props.buttons||null,props.itemsCount?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"main-window__amount_table",children:props.itemsCount}):null]}),isHidden?null:props.content]})})};ControlPanel.displayName="ControlPanel",ControlPanel.__docgenInfo={description:"",methods:[],displayName:"ControlPanel"},__webpack_exports__.a=ControlPanel,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/MainWindow/ControlPanel/ControlPanel.jsx"]={name:"ControlPanel",docgenInfo:ControlPanel.__docgenInfo,path:"src/utils/MainWindow/ControlPanel/ControlPanel.jsx"})},2828:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2829);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2829:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2831:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2832);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2832:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.control-panel{width:100%}.control-panel .main-window__control-panel-wrapper{padding-top:5px;padding-bottom:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__button{margin-top:5px;padding:8px 10px;font-size:85%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .switch{margin-top:5px;margin-right:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .searchbar{max-width:50%;margin-right:auto;padding:0;align-self:center;margin-left:-15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__amount_table{color:#666666;align-self:center;margin-top:5px;margin-left:auto}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window{padding:0}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel{width:max-content;margin-bottom:0;margin-right:10px;box-sizing:border-box;padding-top:calc(5px);position:relative;background-color:#ffffff}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel::before{width:100%;height:20px;position:absolute;content:\"Сортировка\";top:8px;left:10px;z-index:0;color:#777777;font-size:95%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px;padding-right:25px;padding-left:9px;height:100%;margin:0;box-sizing:border-box;min-width:150px;z-index:0;background-color:transparent;cursor:pointer;border:1px solid #cccccc;transition:background-color 100ms ease-in-out;-webkit-appearance:none;-moz-appearance:none;background:transparent;background-image:url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'></path></svg>\");background-repeat:no-repeat;background-position-x:100%;background-position-y:calc(50% + 2px)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter{border-color:#cccccc;justify-content:space-between;padding:8px 8px !important;padding-right:5px !important}.control-panel .main-window__control-panel-wrapper .main-window__button--filter span{margin-right:20px;font-size:95%}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img{filter:none;max-width:18px;margin-top:1px;margin-right:0;transition:200ms cubic-bezier(0.23, 1, 0.32, 1)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img path:nth-child(1){transition:200ms cubic-bezier(0.23, 1, 0.32, 1);fill:#333333}@media (max-width: 768px){.control-panel .main-window__control-panel-wrapper{padding-left:15px;padding-right:15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{width:calc(100% + 30px);padding:0 15px;box-sizing:border-box;flex-wrap:nowrap;margin-left:-15px;overflow:auto;white-space:nowrap}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px !important;padding-right:25px !important;padding-left:9px !important;max-width:240px}}\n",""]),module.exports=exports},2834:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/edit.efe0dc2a.svg"},2846:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/delete.1ad59e4c.svg"},2928:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return clientCategoriesDefaultInputs})),__webpack_require__.d(__webpack_exports__,"b",(function(){return clientsDefaultInputs}));__webpack_require__(196);var clientCategoriesDefaultInputs=[{name:"name",defaultValue:"",isRequired:!0},{name:"visibility",defaultValue:"all"}],clientsDefaultInputs=[{name:"name",defaultValue:"",isRequired:!0},{name:"legalEntity",defaultValue:[]},{name:"contacts",defaultValue:[],isRequired:!0},{name:"workHistory",defaultValue:[]},{name:"site",defaultValue:"",isRequired:!0},{name:"comment",defaultValue:""},{name:"city",defaultValue:"",isRequired:!0},{name:"storageAddress",defaultValue:""},{name:"workCondition",defaultValue:""},{name:"price",defaultValue:""},{name:"discount",defaultValue:""},{name:"check",defaultValue:""},{name:"clientType",defaultValue:"Активные"},{name:"categoryId",defaultValue:0,isRequired:!0},{name:"categoryName",defaultValue:""},{name:"visibility",defaultValue:!0},{name:"nextDateContact",defaultValue:new Date((new Date).setDate((new Date).getDate()+7))},{name:"taxes",defaultValue:!1},{name:"priceId",defaultValue:0}]},3403:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3404);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3404:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.client-categories .main-window__header .main-window__title{display:flex;flex-direction:row;flex-wrap:wrap}.client-categories .main-window__header .main-window__title .main-window__button{font-size:60%;margin-left:15px}.client-categories .main-window .main-window__list .main-window__list-item span:nth-of-type(1){flex:0 1 50%}.client-categories .main-window .main-window__list .main-window__list-item span:nth-child(2){flex:0 1 35%}.client-categories .main-window .main-window__actions{flex-direction:row !important;flex:0 1 8% !important;flex-wrap:wrap}.client-categories .main-window .main-window__actions .main-window__action{padding:5px;margin-bottom:0;margin-right:5px;display:flex;align-items:center;justify-content:center}.client-categories .main-window .main-window__actions .main-window__action .main-window__img{transition:transform 100ms ease-in-out}.client-categories .main-window .main-window__actions .main-window__action:last-child{margin-right:0px}\n",""]),module.exports=exports},3405:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3406);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3406:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,"",""]),module.exports=exports},3407:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3408);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3408:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,"",""]),module.exports=exports},3596:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var slicedToArray=__webpack_require__(7),slicedToArray_default=__webpack_require__.n(slicedToArray),react=(__webpack_require__(26),__webpack_require__(159),__webpack_require__(50),__webpack_require__(256),__webpack_require__(656),__webpack_require__(657),__webpack_require__(0)),edit=(__webpack_require__(3403),__webpack_require__(2834)),edit_default=__webpack_require__.n(edit),tableview_delete=__webpack_require__(2846),delete_default=__webpack_require__.n(tableview_delete),SearchBar=(__webpack_require__(1758),__webpack_require__(347)),Categories=__webpack_require__(2955),FormWindow=__webpack_require__(199),hooks=(__webpack_require__(3405),__webpack_require__(2830),__webpack_require__(1001)),InputText=__webpack_require__(2822),Button=__webpack_require__(197),objects=__webpack_require__(2928),jsx_runtime=__webpack_require__(1),NewClientCategory_NewClientCategory_NewClientCategory=function NewClientCategory(props){var _useForm=Object(hooks.a)(objects.a),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react.useState)(!1),_useState2=slicedToArray_default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];return Object(jsx_runtime.jsx)("div",{className:"new-client-category",children:Object(jsx_runtime.jsx)("div",{className:"main-form",children:Object(jsx_runtime.jsxs)("form",{className:"main-form__form",children:[errorWindow,Object(jsx_runtime.jsx)(InputText.a,{inputName:"Название категории",required:!0,error:formErrors.name,defaultValue:formInputs.name,name:"name",handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("name",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(jsx_runtime.jsxs)("div",{className:"main-form__item",children:[Object(jsx_runtime.jsx)("div",{className:"main-form__input_name",children:"Видимость*"}),Object(jsx_runtime.jsx)("div",{className:"main-form__input_field",children:Object(jsx_runtime.jsxs)("select",{name:"visibility",onChange:function onChange(_ref2){var target=_ref2.target;return _handleInputChange("visibility",target.value)},defaultValue:formInputs.visibility,children:[Object(jsx_runtime.jsx)("option",{value:"all",children:"Все"}),Object(jsx_runtime.jsx)("option",{value:"adminOnly",children:"Только руководитель"})]})})]}),Object(jsx_runtime.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(jsx_runtime.jsx)("div",{className:"main-form__buttons main-form__buttons--full",children:Object(jsx_runtime.jsx)(Button.a,{text:"Добавить категорию",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){console.log(formInputs),formIsValid()&&(setIsLoading(!0),props.addCategory(formInputs).then((function(){setIsLoading(!1),props.onSubmit(),props.setShowWindow(!props.showWindow)})).catch((function(error){setIsLoading(!1),alert("Ошибка при добавлении записи"),console.log(error)})))}})})]})})})};NewClientCategory_NewClientCategory_NewClientCategory.displayName="NewClientCategory",NewClientCategory_NewClientCategory_NewClientCategory.__docgenInfo={description:"",methods:[],displayName:"NewClientCategory"};var ClientCategories_NewClientCategory_NewClientCategory=NewClientCategory_NewClientCategory_NewClientCategory;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/Clients/ClientCategories/NewClientCategory/NewClientCategory.jsx"]={name:"NewClientCategory",docgenInfo:NewClientCategory_NewClientCategory_NewClientCategory.__docgenInfo,path:"src/components/MainPage/Clients/ClientCategories/NewClientCategory/NewClientCategory.jsx"});var toConsumableArray=__webpack_require__(18),toConsumableArray_default=__webpack_require__.n(toConsumableArray),EditClientCategory_EditClientCategory_EditClientCategory=(__webpack_require__(35),__webpack_require__(3407),function EditClientCategory(props){var _useForm=Object(hooks.a)([].concat(toConsumableArray_default()(objects.a),[{name:"id",defaultValue:0},{name:"type",defaultValue:""}])),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,updateFormInputs=_useForm.updateFormInputs,errorWindow=_useForm.errorWindow,_useState=Object(react.useState)(!1),_useState2=slicedToArray_default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];return Object(react.useEffect)((function(){console.log(props.category),null!==props.category&&updateFormInputs({id:props.category.id,name:props.category.name,visibility:props.category.visibility,type:props.category.type})}),[props.category]),Object(jsx_runtime.jsx)("div",{className:"edit-client-category",children:Object(jsx_runtime.jsx)("div",{className:"main-form",children:Object(jsx_runtime.jsxs)("form",{className:"main-form__form",children:[errorWindow,Object(jsx_runtime.jsx)(InputText.a,{inputName:"Название категории",required:!0,error:formErrors.name,defaultValue:formInputs.name,name:"name",handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("name",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(jsx_runtime.jsxs)("div",{className:"main-form__item",children:[Object(jsx_runtime.jsx)("div",{className:"main-form__input_name",children:"Видимость*"}),Object(jsx_runtime.jsx)("div",{className:"main-form__input_field",children:Object(jsx_runtime.jsxs)("select",{name:"visibility",onChange:function onChange(_ref2){var target=_ref2.target;return _handleInputChange("visibility",target.value)},value:formInputs.visibility,children:[Object(jsx_runtime.jsx)("option",{value:"all",children:"Все"}),Object(jsx_runtime.jsx)("option",{value:"adminOnly",children:"Только руководитель"})]})})]}),Object(jsx_runtime.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(jsx_runtime.jsx)("div",{className:"main-form__buttons main-form__buttons--full",children:Object(jsx_runtime.jsx)(Button.a,{text:"Редактировать категорию",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){setIsLoading(!0),console.log(formInputs),formIsValid()&&props.editCategory(formInputs,formInputs.id).then((function(){setIsLoading(!1),props.onSubmit(),props.setShowWindow(!props.showWindow)})).catch((function(error){setIsLoading(!1),alert("Ошибка при редактировании записи"),console.log(error)}))}})})]})})})});EditClientCategory_EditClientCategory_EditClientCategory.displayName="EditClientCategory",EditClientCategory_EditClientCategory_EditClientCategory.__docgenInfo={description:"",methods:[],displayName:"EditClientCategory"};var ClientCategories_EditClientCategory_EditClientCategory=EditClientCategory_EditClientCategory_EditClientCategory;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/Clients/ClientCategories/EditClientCategory/EditClientCategory.jsx"]={name:"EditClientCategory",docgenInfo:EditClientCategory_EditClientCategory_EditClientCategory.__docgenInfo,path:"src/components/MainPage/Clients/ClientCategories/EditClientCategory/EditClientCategory.jsx"});var FloatingPlus=__webpack_require__(661),PlaceholderLoading=__webpack_require__(2824),ControlPanel=__webpack_require__(2827),sorting=__webpack_require__(297),ClientCategories_ClientCategories_ClientCategories=function ClientCategories(props){var _useState=Object(react.useState)(!0),_useState2=slicedToArray_default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=Object(react.useState)(""),_useState4=slicedToArray_default()(_useState3,2),searchQuery=_useState4[0],setSearchQuery=_useState4[1],_useState5=Object(react.useState)(!1),_useState6=slicedToArray_default()(_useState5,2),showWindow=_useState6[0],setShowWindow=_useState6[1],_useState7=Object(react.useState)([]),_useState8=slicedToArray_default()(_useState7,2),categories=_useState8[0],setCategories=_useState8[1],_useState9=Object(react.useState)("new"),_useState10=slicedToArray_default()(_useState9,2),curForm=_useState10[0],setCurForm=_useState10[1],_useState11=Object(react.useState)(null),_useState12=slicedToArray_default()(_useState11,2),editCategory=_useState12[0],setEditCategory=_useState12[1],clientTypes={clients:{name:"клиент",getCategoriesFunction:function getCategoriesFunction(){return Object(Categories.d)()},addCategoryFunction:function addCategoryFunction(newCategory){return Object(Categories.a)(Object.assign({},newCategory,{type:null}))},editCategoryFunction:function editCategoryFunction(newCategory,id){return Object(Categories.c)(newCategory,id)},deleteCategoryFunction:function deleteCategoryFunction(id){return Object(Categories.b)(id)},visibility:["ROLE_ADMIN","ROLE_MANAGER"]},suppliers:{name:"поставщик",getCategoriesFunction:function getCategoriesFunction(){return Object(Categories.e)()},addCategoryFunction:function addCategoryFunction(newCategory){return Object(Categories.a)(Object.assign({},newCategory,{type:"supplier"}))},editCategoryFunction:function editCategoryFunction(newCategory,id){return Object(Categories.c)(newCategory,id)},deleteCategoryFunction:function deleteCategoryFunction(id){return Object(Categories.b)(id)},visibility:["ROLE_ADMIN"]}};Object(react.useEffect)((function(){loadData()}),[props.type]);var loadData=function loadData(){clientTypes[props.type].getCategoriesFunction().then((function(res){return res.json()})).then((function(res){console.log(res),setCategories(res),setIsLoading(!1)}))};return Object(jsx_runtime.jsx)("div",{className:"client-categories",children:Object(jsx_runtime.jsxs)("div",{className:"main-window",children:[Object(jsx_runtime.jsx)(FloatingPlus.a,{onClick:function onClick(){setCurForm("new"),setShowWindow(!showWindow)},visibility:clientTypes[props.type].visibility}),Object(jsx_runtime.jsx)("div",{className:"main-window__header main-window__header--full",children:Object(jsx_runtime.jsxs)("div",{className:"main-window__title",children:[Object(jsx_runtime.jsx)("span",{children:"Категории ".concat(clientTypes[props.type].name,"ов")}),props.userHasAccess(clientTypes[props.type].visibility)&&Object(jsx_runtime.jsx)("div",{className:"main-window__button",onClick:function onClick(){setCurForm("new"),setShowWindow(!showWindow)},children:"Создать категорию"})]})}),Object(jsx_runtime.jsx)(FormWindow.a,{title:"new"===curForm?"Создание категории":"Редактирование категории",content:Object(jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"new"===curForm?Object(jsx_runtime.jsx)(ClientCategories_NewClientCategory_NewClientCategory,{onSubmit:loadData,showWindow:showWindow,addCategory:clientTypes[props.type].addCategoryFunction,setShowWindow:setShowWindow}):Object(jsx_runtime.jsx)(ClientCategories_EditClientCategory_EditClientCategory,{onSubmit:loadData,showWindow:showWindow,setShowWindow:setShowWindow,category:editCategory,editCategory:clientTypes[props.type].editCategoryFunction})}),showWindow:showWindow,setShowWindow:setShowWindow}),Object(jsx_runtime.jsx)(SearchBar.a,{fullSize:!0,placeholder:"Введите запрос для поиска...",setSearchQuery:setSearchQuery}),Object(jsx_runtime.jsx)(ControlPanel.a,{itemsCount:"Всего: ".concat(categories.length," записей")}),Object(jsx_runtime.jsxs)("div",{className:"main-window__list main-window__list--full",children:[Object(jsx_runtime.jsxs)("div",{className:"main-window__list-item main-window__list-item--header",children:[Object(jsx_runtime.jsx)("span",{children:"Название"}),Object(jsx_runtime.jsx)("span",{children:"Видимость"}),Object(jsx_runtime.jsx)("div",{className:"main-window__actions",children:"Действия"})]}),isLoading&&Object(jsx_runtime.jsx)(PlaceholderLoading.a,{itemClassName:"main-window__list-item",minHeight:"20px",items:2}),Object(sorting.a)(categories.filter((function(item){return item.name.toLowerCase().includes(searchQuery.toLowerCase())})),{fieldName:"name",direction:"asc"}).map((function(item){return Object(jsx_runtime.jsxs)("div",{className:"main-window__list-item",children:[Object(jsx_runtime.jsxs)("span",{children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Название: "}),item.name]}),Object(jsx_runtime.jsxs)("span",{children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Видимость: "}),item.visibility]}),Object(jsx_runtime.jsxs)("div",{className:"main-window__actions",children:[Object(jsx_runtime.jsx)("div",{className:"main-window__action",onClick:function onClick(){setEditCategory(item),setCurForm("edit"),setShowWindow(!showWindow)},children:Object(jsx_runtime.jsx)("img",{className:"main-window__img",src:edit_default.a})}),props.userHasAccess(["ROLE_ADMIN"])&&Object(jsx_runtime.jsx)("div",{className:"main-window__action",onClick:function onClick(){return function deleteItem(id){clientTypes[props.type].deleteCategoryFunction(id).then((function(){loadData()})).catch((function(error){alert("Ошибка при удалении записи! Убедитесь что в категории нет клиентов"),console.log(error)}))}(item.id)},children:Object(jsx_runtime.jsx)("img",{className:"main-window__img",src:delete_default.a})})]})]},item.id)}))]})]})})};ClientCategories_ClientCategories_ClientCategories.displayName="ClientCategories",ClientCategories_ClientCategories_ClientCategories.__docgenInfo={description:"",methods:[],displayName:"ClientCategories"};__webpack_exports__.default=ClientCategories_ClientCategories_ClientCategories;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/Clients/ClientCategories/ClientCategories.jsx"]={name:"ClientCategories",docgenInfo:ClientCategories_ClientCategories_ClientCategories.__docgenInfo,path:"src/components/MainPage/Clients/ClientCategories/ClientCategories.jsx"})}}]);