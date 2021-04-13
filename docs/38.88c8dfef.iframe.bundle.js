(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{2851:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(165),__webpack_require__(23),__webpack_require__(2)),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2852),__webpack_require__(1)),InputText=function InputText(_ref){var inputName=_ref.inputName,required=_ref.required,error=_ref.error,type=_ref.type,name=_ref.name,handleInputChange=_ref.handleInputChange,defaultValue=_ref.defaultValue,readOnly=_ref.readOnly,disabled=_ref.disabled,setErrorsArr=_ref.setErrorsArr,errorsArr=_ref.errorsArr;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__input_name",children:inputName+(required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:!0===error?"input_text__input_field input_text__input_field--error":"input_text__input_field",children:"textarea"===type?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea",{name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input",{type:type||"text",name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled})})]}),error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__error",onClick:setErrorsArr?function(){return setErrorsArr(Object.assign({},errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},name,!1)))}:null,children:"Поле не заполнено!"})]})};InputText.displayName="InputText",InputText.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleInputChange:{type:{name:"func"},required:!1,description:""},defaultValue:{type:{name:"string"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},disabled:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputText,InputText.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,handleInputChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,defaultValue:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/Form/InputText/InputText.jsx"]={name:"InputText",docgenInfo:InputText.__docgenInfo,path:"src/utils/Form/InputText/InputText.jsx"})},2852:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(2853);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2853:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_text{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_text .input_text__error{width:100%;margin-top:1px;font-size:0.75rem;box-sizing:border-box;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_text .input_text__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_text .input_text__input .input_text__input_name{color:#666;padding-right:10px;flex:0 1 calc(20% - 10px);width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;min-height:2rem;width:100%}.input_text .input_text__input .input_text__input_field input[type="text"],.input_text .input_text__input .input_text__input_field input[type="password"],.input_text .input_text__input .input_text__input_field input[type="number"],.input_text .input_text__input .input_text__input_field textarea{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;transition:100ms ease-in-out;box-sizing:border-box}.input_text .input_text__input .input_text__input_field input[type="text"]:hover,.input_text .input_text__input .input_text__input_field input[type="password"]:hover,.input_text .input_text__input .input_text__input_field input[type="number"]:hover,.input_text .input_text__input .input_text__input_field textarea:hover{border-color:#888888}.input_text .input_text__input .input_text__input_field input[type="text"]:focus,.input_text .input_text__input .input_text__input_field input[type="password"]:focus,.input_text .input_text__input .input_text__input_field input[type="number"]:focus,.input_text .input_text__input .input_text__input_field textarea:focus{border:1px solid #4293b6}.input_text .input_text__input .input_text__input_field input::-webkit-outer-spin-button,.input_text .input_text__input .input_text__input_field input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.input_text .input_text__input .input_text__input_field textarea{min-width:calc(100% - 20px);outline:none;min-height:100px;max-height:150px;resize:vertical}.input_text .input_text__input .input_text__input_field input[type="number"]{-moz-appearance:textfield}.input_text .input_text__input .input_text__input_field--error input[type="text"],.input_text .input_text__input .input_text__input_field--error input[type="number"],.input_text .input_text__input .input_text__input_field--error input[type="password"],.input_text .input_text__input .input_text__input_field--error textarea{border:1px solid #d48282 !important}@media (max-width: 768px){.input_text .input_text__input{flex-wrap:wrap;align-items:flex-start;flex-direction:column}.input_text .input_text__input .input_text__input_name{width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{width:calc(100% - 0px)}.input_text .input_text__input .input_text__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2859:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),react_datepicker__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(23),__webpack_require__(165),__webpack_require__(201),__webpack_require__(2882)),react_datepicker__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_4__),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),date_fns_locale_ru__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2885),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(2881),__webpack_require__(2864),__webpack_require__(1)),InputDate=function InputDate(props){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"input_date",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"input_date__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"input_date__input_name",children:props.inputName+(props.required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:!0===props.error?"input_date__input_field input_date__input_field--error":"input_date__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(react_datepicker__WEBPACK_IMPORTED_MODULE_4___default.a,Object.assign({},props,{onChange:props.handleDateChange,disabledKeyboardNavigation:!0,dateFormat:props.showMonthYearPicker?"MM.yyyy":"dd.MM.yyyy",locale:date_fns_locale_ru__WEBPACK_IMPORTED_MODULE_6__.a}))})]}),!0===props.error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"input_date__error",onClick:props.setErrorsArr?function(){return props.setErrorsArr(Object.assign({},props.errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},props.name,!1)))}:null,children:"Поле не заполнено!"})]})};InputDate.displayName="InputDate",InputDate.__docgenInfo={description:"",methods:[],displayName:"InputDate",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleDateChange:{type:{name:"func"},required:!1,description:""},selected:{type:{name:"instanceOf",value:"Date"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},showMonthYearPicker:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputDate,InputDate.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,handleDateChange:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,selected:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.instanceOf(Date),readOnly:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,showMonthYearPicker:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/Form/InputDate/InputDate.jsx"]={name:"InputDate",docgenInfo:InputDate.__docgenInfo,path:"src/utils/Form/InputDate/InputDate.jsx"})},2864:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(2865);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2865:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_date{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_date .input_date__error{width:100%;box-sizing:border-box;margin-top:1px;font-size:0.75rem;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_date .input_date__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_date .input_date__input .input_date__input_name{color:#666;flex:0 1 calc(20% - 10px);padding-right:10px;width:100%;margin-bottom:5px}.input_date .input_date__input .input_date__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;width:100%}.input_date .input_date__input .input_date__input_field .react-datepicker-wrapper{width:100%}.input_date .input_date__input .input_date__input_field .react-datepicker-wrapper .react-datepicker{z-index:999}.input_date .input_date__input .input_date__input_field .react-datepicker-wrapper .react-datepicker .react-datepicker__day--selected{background-color:#4293b6 !important}.input_date .input_date__input .input_date__input_field .react-datepicker-popper{z-index:999}.input_date .input_date__input .input_date__input_field input[type="text"],.input_date .input_date__input .input_date__input_field input[type="password"]{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;box-sizing:border-box;transition:100ms ease-in-out;min-height:2rem}.input_date .input_date__input .input_date__input_field input[type="text"]:hover,.input_date .input_date__input .input_date__input_field input[type="password"]:hover{border-color:#888888}.input_date .input_date__input .input_date__input_field input[type="text"]:focus,.input_date .input_date__input .input_date__input_field input[type="password"]:focus{border:1px solid #4293b6}.input_date .input_date__input .input_date__input_field--error input[type="text"],.input_date .input_date__input .input_date__input_field--error input[type="password"]{border:1px solid #d48282 !important}.input_date .input_date__input .input_date__input_field:focus{border:1px solid #4293b6}@media (max-width: 768px){.input_date .input_date__input{flex-wrap:wrap;flex-direction:column;align-items:flex-start}.input_date .input_date__input .input_date__input_name{width:100%;margin-bottom:5px}.input_date .input_date__input .input_date__input_field{width:100%}.input_date .input_date__input .input_date__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2965:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"e",(function(){return getTransportations})),__webpack_require__.d(__webpack_exports__,"d",(function(){return getTransportationById})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteTransportation})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addTransportation})),__webpack_require__.d(__webpack_exports__,"c",(function(){return editTransportation}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getTransportations(signal){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/shipping/",method:"GET",signal:signal})}function getTransportationById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/shipping/"+id,method:"GET"})}function deleteTransportation(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/shipping/"+id,method:"DELETE"})}function addTransportation(newTransportation){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/shipping/",method:"POST",body:JSON.stringify(newTransportation)})}function editTransportation(newTransportation,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/shipping/"+id,method:"PUT",body:JSON.stringify(newTransportation)})}},3045:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return transportationDefaultInputs}));__webpack_require__(201);var transportationDefaultInputs=[{name:"date",defaultValue:new Date,isRequired:!0,isValid:!0},{name:"cargo",defaultValue:"",isRequired:!0},{name:"quantity",defaultValue:""},{name:"sender",defaultValue:"ЦехЛЭМЗ",isRequired:!0,isValid:!0},{name:"recipient",defaultValue:"ЦехЛЭМЗ",isRequired:!0,isValid:!0},{name:"driver",defaultValue:"",isRequired:!0}]},3434:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),API_transportation__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(3435),__webpack_require__(2854),__webpack_require__(2965)),Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2851),Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2859),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(153),Utils_hooks__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(1015),_objects_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(3045),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(1),NewTransportation=function NewTransportation(props){var _useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_8__.a)(_objects_js__WEBPACK_IMPORTED_MODULE_9__.a),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function(){document.title="Создание записи транспортировки"}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("form",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__title",children:"Новая запись транспортировки"})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_6__.a,{inputName:"Дата",required:!0,error:formErrors.date,name:"date",selected:formInputs.date,handleDateChange:function handleDateChange(value){return _handleInputChange("date",value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div",{className:"main-form__fieldset",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__group-name",children:"Данные о грузе"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Товар",required:!0,error:formErrors.cargo,name:"cargo",handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("cargo",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Кол-во",name:"quantity",handleInputChange:function handleInputChange(_ref2){var target=_ref2.target;return _handleInputChange("quantity",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div",{className:"main-form__row",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__input_name",children:"Откуда*"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("select",{name:"sender",onChange:function onChange(_ref3){var target=_ref3.target;return _handleInputChange("sender",target.value)},defaultValue:formInputs.sender,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("option",{value:"ЦехЛЭМЗ",children:"ЦехЛЭМЗ"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("option",{value:"ЦехЛепсари",children:"ЦехЛепсари"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("option",{value:"ЦехЛиговский",children:"ЦехЛиговский"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__input_name",children:"Куда*"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("select",{name:"recipient",onChange:function onChange(_ref4){var target=_ref4.target;return _handleInputChange("recipient",target.value)},defaultValue:formInputs.recipient,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("option",{value:"ЦехЛЭМЗ",children:"ЦехЛЭМЗ"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("option",{value:"ЦехЛепсари",children:"ЦехЛепсари"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("option",{value:"ЦехЛиговский",children:"ЦехЛиговский"})]})})]})]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Водитель",required:!0,error:formErrors.driver,name:"driver",handleInputChange:function handleInputChange(_ref5){var target=_ref5.target;return _handleInputChange("driver",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input",{className:"main-form__submit main-form__submit--inverted",type:"submit",onClick:function onClick(){return props.history.push("/dispatcher/transportation")},value:"Вернуться назад"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_7__.a,{text:"Добавить запись",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){formIsValid()&&(setIsLoading(!0),Object(API_transportation__WEBPACK_IMPORTED_MODULE_4__.a)(formInputs).then((function(){return props.history.push("/dispatcher/transportation")})).catch((function(error){setIsLoading(!1),alert("Ошибка при добавлении записи"),console.log(error)})))}})]})]})})};NewTransportation.displayName="NewTransportation",NewTransportation.__docgenInfo={description:"",methods:[],displayName:"NewTransportation"},__webpack_exports__.default=NewTransportation,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/Dispatcher/Transportation/NewTransportation/NewTransportation.jsx"]={name:"NewTransportation",docgenInfo:NewTransportation.__docgenInfo,path:"src/components/MainPage/Dispatcher/Transportation/NewTransportation/NewTransportation.jsx"})},3435:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(3436);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3436:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports}}]);