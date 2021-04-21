(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{2851:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(165),__webpack_require__(23),__webpack_require__(2)),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2852),__webpack_require__(1)),InputText=function InputText(_ref){var inputName=_ref.inputName,required=_ref.required,error=_ref.error,type=_ref.type,name=_ref.name,handleInputChange=_ref.handleInputChange,defaultValue=_ref.defaultValue,readOnly=_ref.readOnly,disabled=_ref.disabled,setErrorsArr=_ref.setErrorsArr,errorsArr=_ref.errorsArr;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__input_name",children:inputName+(required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:!0===error?"input_text__input_field input_text__input_field--error":"input_text__input_field",children:"textarea"===type?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea",{name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input",{type:type||"text",name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled})})]}),error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__error",onClick:setErrorsArr?function(){return setErrorsArr(Object.assign({},errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},name,!1)))}:null,children:"Поле не заполнено!"})]})};InputText.displayName="InputText",InputText.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleInputChange:{type:{name:"func"},required:!1,description:""},defaultValue:{type:{name:"string"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},disabled:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputText,InputText.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,handleInputChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,defaultValue:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Form/InputText/InputText.jsx"]={name:"InputText",docgenInfo:InputText.__docgenInfo,path:"src/components/Form/InputText/InputText.jsx"})},2852:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(2853);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2853:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_text{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_text .input_text__error{width:100%;margin-top:1px;font-size:0.75rem;box-sizing:border-box;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_text .input_text__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_text .input_text__input .input_text__input_name{color:#666;padding-right:10px;flex:0 1 calc(20% - 10px);width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;min-height:2rem;width:100%}.input_text .input_text__input .input_text__input_field input[type="text"],.input_text .input_text__input .input_text__input_field input[type="password"],.input_text .input_text__input .input_text__input_field input[type="number"],.input_text .input_text__input .input_text__input_field textarea{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;transition:100ms ease-in-out;box-sizing:border-box}.input_text .input_text__input .input_text__input_field input[type="text"]:hover,.input_text .input_text__input .input_text__input_field input[type="password"]:hover,.input_text .input_text__input .input_text__input_field input[type="number"]:hover,.input_text .input_text__input .input_text__input_field textarea:hover{border-color:#888888}.input_text .input_text__input .input_text__input_field input[type="text"]:focus,.input_text .input_text__input .input_text__input_field input[type="password"]:focus,.input_text .input_text__input .input_text__input_field input[type="number"]:focus,.input_text .input_text__input .input_text__input_field textarea:focus{border:1px solid #4293b6}.input_text .input_text__input .input_text__input_field input::-webkit-outer-spin-button,.input_text .input_text__input .input_text__input_field input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.input_text .input_text__input .input_text__input_field textarea{min-width:calc(100% - 20px);outline:none;min-height:100px;max-height:150px;resize:vertical}.input_text .input_text__input .input_text__input_field input[type="number"]{-moz-appearance:textfield}.input_text .input_text__input .input_text__input_field--error input[type="text"],.input_text .input_text__input .input_text__input_field--error input[type="number"],.input_text .input_text__input .input_text__input_field--error input[type="password"],.input_text .input_text__input .input_text__input_field--error textarea{border:1px solid #d48282 !important}@media (max-width: 768px){.input_text .input_text__input{flex-wrap:wrap;align-items:flex-start;flex-direction:column}.input_text .input_text__input .input_text__input_name{width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{width:calc(100% - 0px)}.input_text .input_text__input .input_text__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2861:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return workshops})),__webpack_require__.d(__webpack_exports__,"b",(function(){return requestStatuses})),__webpack_require__.d(__webpack_exports__,"a",(function(){return productsStatuses}));var workshops={requests:{name:"Заявки",title:"",redirectURL:"/requests",type:"requests",fullName:"Заявки"},lemz:{name:"ЛЭМЗ",title:"ЛЭМЗ",redirectURL:"/lemz/workshop-lemz",ordersRedirectURL:"/lemz/workshop-orders",storageRedirectURL:"/lemz/workshop-storage",type:"lemz",fullName:"ЦехЛЭМЗ"},lepsari:{name:"Лепсари",title:"Лепсари",redirectURL:"/lepsari/workshop-lepsari",ordersRedirectURL:"/lepsari/workshop-orders",storageRedirectURL:"/lepsari/workshop-storage",type:"lepsari",fullName:"ЦехЛепсари"},ligovskiy:{name:"Лиговский",title:"Лиговский",redirectURL:"/ligovskiy/workshop",ordersRedirectURL:"/ligovskiy/workshop-orders",storageRedirectURL:"/ligovskiy/workshop-storage",type:"ligovskiy",fullName:"ЦехЛиговский"},null:{name:"Заявки",title:"",redirectURL:"/requests",type:"requests",fullName:"Заявки"}},requestStatuses=[{name:"Проблема/Материалы",oldName:"Проблема-материалы",className:"materials",access:["ROLE_ADMIN","ROLE_WORKSHOP"],visible:!1},{name:"Завершено",className:"completed",access:["ROLE_ADMIN"]},{name:"Отгружено",className:"shipped",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_MANAGER"]},{name:"Частично отгружено",className:"shipped-in-parts",access:[]},{name:"Готово к отгрузке",oldName:"Готово",className:"ready",access:["ROLE_ADMIN","ROLE_WORKSHOP"]},{name:"В производстве",className:"in-production",access:[]},{name:"Ожидание",className:"waiting",access:["ROLE_ADMIN","ROLE_MANAGER","ROLE_WORKSHOP"]},{name:"Приоритет",className:"priority",access:["ROLE_ADMIN"]}],productsStatuses=[{name:"В работе",oldName:null,className:"production",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_MANAGER"]},{name:"Завершено",className:"completed",access:["ROLE_ADMIN"]},{name:"Приоритет",className:"defect",access:["ROLE_ADMIN"]}]},2898:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return defaultPrintObject})),__webpack_require__.d(__webpack_exports__,"b",(function(){return pages})),__webpack_require__.d(__webpack_exports__,"c",(function(){return requstsSortOptions})),__webpack_require__.d(__webpack_exports__,"d",(function(){return workshopStorageDefaultInputs}));var _defaultPrintObject,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),defaultPrintObject=(_defaultPrintObject={},_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"id",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"date",{visible:!1}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"products",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"client",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"responsible",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"status",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"date-shipping",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"comment",{visible:!0}),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_defaultPrintObject,"price",{visible:!0}),_defaultPrintObject),pages={open:{name:"Открытые"},shipped:{name:"Отгружено"},completed:{name:"Завершено"}},requstsSortOptions=[{value:"date desc",text:"По дате (убыв.)"},{value:"date asc",text:"По дате (возр.)"},{value:"sum desc",text:"По сумме (убыв.)"},{value:"sum asc",text:"По сумме (возр.)"},{value:"shippingDate desc",text:"По даты отгрузки (убыв.)"},{value:"shippingDate asc",text:"По даты отгрузки (возр.)"}],workshopStorageDefaultInputs=[{name:"number",defaultValue:"",isRequired:!0},{name:"name",defaultValue:"",isRequired:!0},{name:"quantity",defaultValue:"",isRequired:!0},{name:"comment",defaultValue:"",isRequired:!0}]},2963:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return getStorage})),__webpack_require__.d(__webpack_exports__,"d",(function(){return getStorageById})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteStorage})),__webpack_require__.d(__webpack_exports__,"a",(function(){return createStorage})),__webpack_require__.d(__webpack_exports__,"e",(function(){return updateStorage}));__webpack_require__(36);var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(10),axios__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(259),axios__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);function getStorage(workshop){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/").concat(workshop,"_storage/"),headers)}function getStorageById(workshop,id){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/").concat(workshop,"_storage/").concat(id),headers)}function deleteStorage(workshop,id){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.delete("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/").concat(workshop,"_storage/").concat(id),headers)}function createStorage(workshop,data){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/").concat(workshop,"_storage/"),data,headers)}function updateStorage(workshop,data,id){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.put("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/").concat(workshop,"_storage/").concat(id),data,headers)}},3424:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(165),__webpack_require__(0)),Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(3425),__webpack_require__(2854),__webpack_require__(2851)),API_Workshop_storage_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2963),Components_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(153),_workshopVariables_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(2861),Utils_hooks__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(1015),_objects__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(2898),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1),NewPart=function NewPart(props){var _useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_9__.a)(_objects__WEBPACK_IMPORTED_MODULE_10__.d),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){document.title="Добавление детали на склад"}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("form",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"main-form__title",children:"Новая деталь"})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Название",required:!0,error:formErrors.name,name:"name",handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("name",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Номер",required:!0,error:formErrors.number,name:"number",type:"number",handleInputChange:function handleInputChange(_ref2){var target=_ref2.target;return _handleInputChange("number",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Количество",required:!0,error:formErrors.quantity,name:"quantity",handleInputChange:function handleInputChange(_ref3){var target=_ref3.target;return _handleInputChange("quantity",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_5__.a,{inputName:"Комментарий",required:!0,error:formErrors.comment,name:"comment",handleInputChange:function handleInputChange(_ref4){var target=_ref4.target;return _handleInputChange("comment",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Components_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_7__.a,{className:"main-form__submit main-form__submit--inverted",inverted:!0,onClick:function onClick(){return props.history.push(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_8__.c[props.type].storageRedirectURL)},text:"Вернуться назад"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Components_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_7__.a,{text:"Добавить запись",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){formIsValid()&&(setIsLoading(!0),Object(API_Workshop_storage_js__WEBPACK_IMPORTED_MODULE_6__.a)(props.type,formInputs).then((function(){return props.history.push(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_8__.c[props.type].storageRedirectURL)})).catch((function(error){setIsLoading(!1),alert("Ошибка при добавлении записи"),console.log(error)})))}})]})]})})};NewPart.displayName="NewPart",NewPart.__docgenInfo={description:"",methods:[],displayName:"NewPart"},__webpack_exports__.default=NewPart,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/WorkshopsComponents/Storage/NewStorage/NewStorage.jsx"]={name:"NewPart",docgenInfo:NewPart.__docgenInfo,path:"src/components/MainPage/WorkshopsComponents/Storage/NewStorage/NewStorage.jsx"})},3425:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(3426);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3426:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,"",""]),module.exports=exports}}]);