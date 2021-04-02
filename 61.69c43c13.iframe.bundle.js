(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{2548:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(72),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(604),__webpack_require__(100),__webpack_require__(2)),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2550),__webpack_require__(1)),InputText=function InputText(_ref){var inputName=_ref.inputName,required=_ref.required,error=_ref.error,type=_ref.type,name=_ref.name,handleInputChange=_ref.handleInputChange,defaultValue=_ref.defaultValue,readOnly=_ref.readOnly,disabled=_ref.disabled,setErrorsArr=_ref.setErrorsArr,errorsArr=_ref.errorsArr;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__input_name",children:inputName+(required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:!0===error?"input_text__input_field input_text__input_field--error":"input_text__input_field",children:"textarea"===type?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea",{name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input",{type:type||"text",name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled})})]}),error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__error",onClick:setErrorsArr?function(){return setErrorsArr(Object.assign({},errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},name,!1)))}:null,children:"Поле не заполнено!"})]})};InputText.displayName="InputText",InputText.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleInputChange:{type:{name:"func"},required:!1,description:""},defaultValue:{type:{name:"string"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},disabled:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputText,InputText.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,handleInputChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,defaultValue:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\Form\\InputText\\InputText.jsx"]={name:"InputText",docgenInfo:InputText.__docgenInfo,path:"src\\utils\\Form\\InputText\\InputText.jsx"})},2550:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2551);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2551:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_text{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_text .input_text__error{width:100%;margin-top:1px;font-size:0.75rem;box-sizing:border-box;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_text .input_text__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_text .input_text__input .input_text__input_name{color:#666;padding-right:10px;flex:0 1 calc(20% - 10px);width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;min-height:2rem;width:100%}.input_text .input_text__input .input_text__input_field input[type="text"],.input_text .input_text__input .input_text__input_field input[type="password"],.input_text .input_text__input .input_text__input_field input[type="number"],.input_text .input_text__input .input_text__input_field textarea{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;transition:100ms ease-in-out;box-sizing:border-box}.input_text .input_text__input .input_text__input_field input[type="text"]:hover,.input_text .input_text__input .input_text__input_field input[type="password"]:hover,.input_text .input_text__input .input_text__input_field input[type="number"]:hover,.input_text .input_text__input .input_text__input_field textarea:hover{border-color:#888888}.input_text .input_text__input .input_text__input_field input[type="text"]:focus,.input_text .input_text__input .input_text__input_field input[type="password"]:focus,.input_text .input_text__input .input_text__input_field input[type="number"]:focus,.input_text .input_text__input .input_text__input_field textarea:focus{border:1px solid #4293b6}.input_text .input_text__input .input_text__input_field input::-webkit-outer-spin-button,.input_text .input_text__input .input_text__input_field input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.input_text .input_text__input .input_text__input_field textarea{min-width:calc(100% - 20px);outline:none;min-height:100px;max-height:150px;resize:vertical}.input_text .input_text__input .input_text__input_field input[type="number"]{-moz-appearance:textfield}.input_text .input_text__input .input_text__input_field--error input[type="text"],.input_text .input_text__input .input_text__input_field--error input[type="number"],.input_text .input_text__input .input_text__input_field--error input[type="password"],.input_text .input_text__input .input_text__input_field--error textarea{border:1px solid #d48282 !important}@media (max-width: 768px){.input_text .input_text__input{flex-wrap:wrap;align-items:flex-start;flex-direction:column}.input_text .input_text__input .input_text__input_name{width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{width:calc(100% - 0px)}.input_text .input_text__input .input_text__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2572:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(72),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),react_datepicker__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(100),__webpack_require__(604),__webpack_require__(944),__webpack_require__(2603)),react_datepicker__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_4__),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),date_fns_locale_ru__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2604),date_fns_locale_ru__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(date_fns_locale_ru__WEBPACK_IMPORTED_MODULE_6__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(2602),__webpack_require__(2580),__webpack_require__(1)),InputDate=function InputDate(props){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"input_date",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"input_date__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"input_date__input_name",children:props.inputName+(props.required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:!0===props.error?"input_date__input_field input_date__input_field--error":"input_date__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(react_datepicker__WEBPACK_IMPORTED_MODULE_4___default.a,Object.assign({},props,{onChange:props.handleDateChange,disabledKeyboardNavigation:!0,dateFormat:props.showMonthYearPicker?"MM.yyyy":"dd.MM.yyyy",locale:date_fns_locale_ru__WEBPACK_IMPORTED_MODULE_6___default.a}))})]}),!0===props.error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"input_date__error",onClick:props.setErrorsArr?function(){return props.setErrorsArr(Object.assign({},props.errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},props.name,!1)))}:null,children:"Поле не заполнено!"})]})};InputDate.displayName="InputDate",InputDate.__docgenInfo={description:"",methods:[],displayName:"InputDate",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleDateChange:{type:{name:"func"},required:!1,description:""},selected:{type:{name:"instanceOf",value:"Date"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},showMonthYearPicker:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputDate,InputDate.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,handleDateChange:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,selected:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.instanceOf(Date),readOnly:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,showMonthYearPicker:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\Form\\InputDate\\InputDate.jsx"]={name:"InputDate",docgenInfo:InputDate.__docgenInfo,path:"src\\utils\\Form\\InputDate\\InputDate.jsx"})},2580:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2581);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2581:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_date{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_date .input_date__error{width:100%;box-sizing:border-box;margin-top:1px;font-size:0.75rem;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_date .input_date__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_date .input_date__input .input_date__input_name{color:#666;flex:0 1 calc(20% - 10px);padding-right:10px;width:100%;margin-bottom:5px}.input_date .input_date__input .input_date__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;width:100%}.input_date .input_date__input .input_date__input_field .react-datepicker-wrapper{width:100%}.input_date .input_date__input .input_date__input_field .react-datepicker-wrapper .react-datepicker{z-index:999}.input_date .input_date__input .input_date__input_field .react-datepicker-wrapper .react-datepicker .react-datepicker__day--selected{background-color:#4293b6 !important}.input_date .input_date__input .input_date__input_field .react-datepicker-popper{z-index:999}.input_date .input_date__input .input_date__input_field input[type="text"],.input_date .input_date__input .input_date__input_field input[type="password"]{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;box-sizing:border-box;transition:100ms ease-in-out;min-height:2rem}.input_date .input_date__input .input_date__input_field input[type="text"]:hover,.input_date .input_date__input .input_date__input_field input[type="password"]:hover{border-color:#888888}.input_date .input_date__input .input_date__input_field input[type="text"]:focus,.input_date .input_date__input .input_date__input_field input[type="password"]:focus{border:1px solid #4293b6}.input_date .input_date__input .input_date__input_field--error input[type="text"],.input_date .input_date__input .input_date__input_field--error input[type="password"]{border:1px solid #d48282 !important}.input_date .input_date__input .input_date__input_field:focus{border:1px solid #4293b6}@media (max-width: 768px){.input_date .input_date__input{flex-wrap:wrap;flex-direction:column;align-items:flex-start}.input_date .input_date__input .input_date__input_name{width:100%;margin-bottom:5px}.input_date .input_date__input .input_date__input_field{width:100%}.input_date .input_date__input .input_date__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2816:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return employeesDefaultInputs}));__webpack_require__(944);var employeesDefaultInputs=[{name:"name",defaultValue:"",isRequired:!0},{name:"lastName",defaultValue:"",isRequired:!0},{name:"middleName",defaultValue:"",isRequired:!0},{name:"dateOfBirth",defaultValue:new Date,isRequired:!0,isValid:!0},{name:"patentExpirationDate",defaultValue:null},{name:"registrationExpirationDate",defaultValue:null},{name:"citizenship",defaultValue:"",isRequired:!0},{name:"position",defaultValue:"",isRequired:!0},{name:"workshop",defaultValue:"ЦехЛЭМЗ",isRequired:!0,isValid:!0},{name:"employeePhotos",defaultValue:""},{name:"comment",defaultValue:""},{name:"relevance",defaultValue:"Работает",isRequired:!0,isValid:!0}]},3448:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(949),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(606),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_17__=(__webpack_require__(944),__webpack_require__(100),__webpack_require__(2749),__webpack_require__(1519),__webpack_require__(2554),__webpack_require__(2552),__webpack_require__(2562),__webpack_require__(2555),__webpack_require__(947),__webpack_require__(946),__webpack_require__(948),__webpack_require__(1520),__webpack_require__(263),__webpack_require__(604),__webpack_require__(0)),Utils_RequestsAPI_Employees_jsx__WEBPACK_IMPORTED_MODULE_20__=(__webpack_require__(3449),__webpack_require__(2560),__webpack_require__(2623)),Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(2548),Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(2572),Utils_Form_FileUploader_FileUploader_jsx__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(2620),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(264),Utils_hooks__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(2561),_objects__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(2816),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(2546),date_fns__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(1516),axios__WEBPACK_IMPORTED_MODULE_29__=__webpack_require__(2582),axios__WEBPACK_IMPORTED_MODULE_29___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_29__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__=__webpack_require__(1),EditEmployee=function EditEmployee(props){var _useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_25__.a)(_objects__WEBPACK_IMPORTED_MODULE_26__.a),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,updateFormInputs=_useForm.updateFormInputs,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react__WEBPACK_IMPORTED_MODULE_17__.useState)(1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),employeeId=_useState2[0],setEmployeeId=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_17__.useState)(!1),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],formatDateObjects=function formatDateObjects(date){return null==date?void 0:Object(date_fns__WEBPACK_IMPORTED_MODULE_28__.a)(new Date(date),"yyyy-MM-dd")};return Object(react__WEBPACK_IMPORTED_MODULE_17__.useEffect)((function(){document.title="Редактирование сотрудника";var id=props.history.location.pathname.split("/dispatcher/employees/edit/")[1];isNaN(Number.parseInt(id))?(alert("Неправильный индекс сотрудника!"),props.history.push("/dispatcher/employees")):(setEmployeeId(id),Object(Utils_RequestsAPI_Employees_jsx__WEBPACK_IMPORTED_MODULE_20__.d)(id).then((function(res){return res.json()})).then(function(){var _ref=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark((function _callee(data){var _data$dateOfBirth,fileList;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return fileList=[],_context.next=3,Promise.all(data.employeePhotos.map((function(item){return axios__WEBPACK_IMPORTED_MODULE_29___default.a.get(item.url,{responseType:"blob"}).then((function(_ref2){var data=_ref2.data;return fileList.push(new File([data],item.url.split("downloadFile/")[1],{type:data.type}))})).catch((function(error){return console.log(error)}))})));case 3:console.log(fileList),updateFormInputs(Object.assign({},data,{dateOfBirth:null!==(_data$dateOfBirth=data.dateOfBirth)&&void 0!==_data$dateOfBirth?_data$dateOfBirth:new Date,employeePhotos:fileList}));case 5:case"end":return _context.stop()}}),_callee)})));return function(_x){return _ref.apply(this,arguments)}}()).catch((function(error){console.log(error),alert("Неправильный индекс сотрудника!"),props.history.push("/dispatcher/employees")})))}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("form",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__title",children:"Редактирование сотрудника"})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__fieldset",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__group-name",children:"Имя сотрудника"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__row",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Имя",required:!0,error:formErrors.name,defaultValue:formInputs.name,name:"name",errorsArr:formErrors,setErrorsArr:setFormErrors,handleInputChange:function handleInputChange(_ref3){var target=_ref3.target;return _handleInputChange("name",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Фамилия",required:!0,error:formErrors.lastName,defaultValue:formInputs.lastName,errorsArr:formErrors,setErrorsArr:setFormErrors,name:"lastName",handleInputChange:function handleInputChange(_ref4){var target=_ref4.target;return _handleInputChange("lastName",target.value)}})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Отчество",required:!0,error:formErrors.middleName,name:"middleName",errorsArr:formErrors,setErrorsArr:setFormErrors,defaultValue:formInputs.middleName,handleInputChange:function handleInputChange(_ref5){var target=_ref5.target;return _handleInputChange("middleName",target.value)}})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__row",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_22__.a,{inputName:"Дата рождения",required:!0,error:formErrors.dateOfBirth,name:"dateOfBirth",selected:Date.parse(formInputs.dateOfBirth),handleDateChange:function handleDateChange(date){return _handleInputChange("dateOfBirth",date)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Гражданство",required:!0,error:formErrors.citizenship,name:"citizenship",errorsArr:formErrors,setErrorsArr:setFormErrors,defaultValue:formInputs.citizenship,handleInputChange:function handleInputChange(_ref6){var target=_ref6.target;return _handleInputChange("citizenship",target.value)}})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__fieldset",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__group-name",children:"Подразделение"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__row",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_name",children:"Цех*"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("select",{name:"workshop",onChange:function onChange(_ref7){var target=_ref7.target;return _handleInputChange("workshop",target.value)},value:formInputs.workshop,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"ЦехЛЭМЗ",children:"ЦехЛЭМЗ"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"ЦехЛепсари",children:"ЦехЛепсари"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"ЦехЛиговский",children:"ЦехЛиговский"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"Офис",children:"Офис"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Должность",required:!0,error:formErrors.position,name:"position",defaultValue:formInputs.position,errorsArr:formErrors,setErrorsArr:setFormErrors,handleInputChange:function handleInputChange(_ref8){var target=_ref8.target;return _handleInputChange("position",target.value)}})]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_name",children:"Документы"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_FileUploader_FileUploader_jsx__WEBPACK_IMPORTED_MODULE_23__.a,{onChange:function onChange(files){return _handleInputChange("employeePhotos",files)},multipleFiles:!0,defaultValue:formInputs.employeePhotos})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Комментарий",name:"comment",defaultValue:formInputs.comment,handleInputChange:function handleInputChange(_ref9){var target=_ref9.target;return _handleInputChange("comment",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_22__.a,{inputName:"Срок патента (при наличии)",name:"patentExpirationDate",selected:Date.parse(formInputs.patentExpirationDate),handleDateChange:function handleDateChange(date){return _handleInputChange("patentExpirationDate",date)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_22__.a,{inputName:"Срок регистрации (при наличии)",name:"registrationExpirationDate",selected:Date.parse(formInputs.registrationExpirationDate),handleDateChange:function handleDateChange(date){return _handleInputChange("registrationExpirationDate",date)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_name",children:"Актуальность*"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("select",{name:"relevance",onChange:function onChange(_ref10){var target=_ref10.target;return _handleInputChange("relevance",target.value)},value:formInputs.relevance,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"Работает",children:"Работает"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"Уволен",children:"Уволен"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{className:"main-form__submit main-form__submit--inverted",inverted:!0,onClick:function onClick(){return props.history.push("/dispatcher/employees")},text:"Вернуться назад"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{text:"Удалить запись",isLoading:isLoading,className:"main-form__submit",onClick:function handleDeleteItem(){Object(Utils_RequestsAPI_Employees_jsx__WEBPACK_IMPORTED_MODULE_20__.b)(employeeId).then((function(){return props.history.push("/dispatcher/employees")})).catch((function(error){setIsLoading(!1),alert("Ошибка при добавлении записи"),console.log(error)}))}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{text:"Редактировать запись",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){if(formIsValid()){if(null===formInputs.patentExpirationDate&&null!==formInputs.registrationExpirationDate||null===formInputs.registrationExpirationDate&&null!==formInputs.patentExpirationDate)return alert("Необходимо заполнить оба поля сроков патента и регистрации, либо оставить их пустыми!");setIsLoading(!0);var employeeData=Object.assign({},formInputs,{files:Array.from(formInputs.employeePhotos),employeePhotos:void 0,dateOfBirth:formatDateObjects(formInputs.dateOfBirth),patentExpirationDate:formatDateObjects(formInputs.patentExpirationDate),registrationExpirationDate:formatDateObjects(formInputs.registrationExpirationDate)});console.log(employeeData);var formData=Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_27__.d)(employeeData);return Object(Utils_RequestsAPI_Employees_jsx__WEBPACK_IMPORTED_MODULE_20__.c)(formData,employeeId).then((function(){return props.history.push("/dispatcher/employees")})).catch((function(error){setIsLoading(!1),alert("Ошибка при добавлении записи"),console.log(error)}))}}})]})]})})};EditEmployee.displayName="EditEmployee",EditEmployee.__docgenInfo={description:"",methods:[],displayName:"EditEmployee"},__webpack_exports__.default=EditEmployee,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\Dispatcher\\Employees\\EditEmployee\\EditEmployee.jsx"]={name:"EditEmployee",docgenInfo:EditEmployee.__docgenInfo,path:"src\\components\\MainPage\\Dispatcher\\Employees\\EditEmployee\\EditEmployee.jsx"})},3449:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3450);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3450:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports}}]);