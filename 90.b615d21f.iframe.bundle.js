(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{3408:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(419),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_16__=(__webpack_require__(310),__webpack_require__(100),__webpack_require__(944),__webpack_require__(947),__webpack_require__(946),__webpack_require__(1519),__webpack_require__(948),__webpack_require__(1520),__webpack_require__(263),__webpack_require__(2554),__webpack_require__(2552),__webpack_require__(2562),__webpack_require__(2555),__webpack_require__(604),__webpack_require__(0)),Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__=(__webpack_require__(3409),__webpack_require__(2560),__webpack_require__(2548)),Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(2572),Utils_Form_SelectItems_SelectItems_jsx__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(3039),Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(2742),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(264),_workshopVariables__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(2574),_App_js__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(420),_functions__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(2616),Utils_hooks__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(2561),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(1),EditWorkshopOrder=function EditWorkshopOrder(props){var _useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_27__.a)([].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(Object(_functions__WEBPACK_IMPORTED_MODULE_26__.j)(_workshopVariables__WEBPACK_IMPORTED_MODULE_24__.c[props.type].fullName)),[{name:"oldProducts",defaultValue:[]}])),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,updateFormInputs=_useForm.updateFormInputs,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react__WEBPACK_IMPORTED_MODULE_16__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_16__.useState)(0),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3,2),id=_useState4[0],setId=_useState4[1],userContext=Object(react__WEBPACK_IMPORTED_MODULE_16__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_25__.a);return Object(react__WEBPACK_IMPORTED_MODULE_16__.useEffect)((function(){document.title="Редактирование заказа";var id=props.history.location.pathname.split("".concat(_workshopVariables__WEBPACK_IMPORTED_MODULE_24__.c[props.type].ordersRedirectURL,"/edit/"))[1];isNaN(Number.parseInt(id))?(alert("Неправильный индекс заказа!"),props.history.push(_workshopVariables__WEBPACK_IMPORTED_MODULE_24__.c[props.type].ordersRedirectURL)):(setId(id),Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_22__.g)(id).then((function(res){return res.json()})).then((function(res){updateFormInputs(Object.assign({},formInputs,{oldProducts:res.products},res))})))}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"new-workshop-order",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsxs)("div",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"main-form__title",children:"Редактирование заказа"})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_20__.a,{inputName:"Дата создания",required:!0,error:formErrors.date,name:"date",selected:Date.parse(formInputs.date),handleDateChange:function handleDateChange(date){return _handleInputChange("date",date)},errorsArr:formErrors,setErrorsArr:setFormErrors,readOnly:!userContext.userHasAccess(["ROLE_ADMIN"])}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Наименование",required:!0,error:formErrors.name,defaultValue:formInputs.name,name:"name",handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("name",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors,readOnly:!userContext.userHasAccess(["ROLE_ADMIN"])}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Комплектация",name:"assembly",handleInputChange:function handleInputChange(_ref2){var target=_ref2.target;return _handleInputChange("assembly",target.value)},readOnly:!userContext.userHasAccess(["ROLE_ADMIN"])}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_20__.a,{inputName:"Дата поставки",required:!0,error:formErrors.deliverBy,name:"deliverBy",selected:Date.parse(formInputs.deliverBy),handleDateChange:function handleDateChange(date){return _handleInputChange("deliverBy",date)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_SelectItems_SelectItems_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{inputName:"Продукция",userHasAccess:props.userHasAccess,defaultValue:formInputs.products,readOnly:!userContext.userHasAccess(["ROLE_ADMIN"]),required:!0,onChange:function onChange(value){return _handleInputChange("products",value)},error:formErrors.products,errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"main-form__input_name",children:"Статус"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsxs)("select",{name:"status",onChange:function onChange(_ref3){var target=_ref3.target;return _handleInputChange("status",target.value)},value:formInputs.status,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("option",{value:"ordered",children:"Заказано"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("option",{value:"sent",children:"Отправлено"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("option",{value:"problem",children:"Проблема"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("option",{value:"completed",children:"Завершено"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_23__.a,{className:"main-form__submit main-form__submit--inverted",inverted:!0,onClick:function onClick(){return props.history.push(_workshopVariables__WEBPACK_IMPORTED_MODULE_24__.c[props.type].ordersRedirectURL)},text:"Вернуться назад"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_28__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_23__.a,{text:"Редактировать запись",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){formIsValid()&&(setIsLoading(!0),Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_22__.e)(Object.assign({},formInputs,{date:new Date(formInputs.date).getTime()/1e3,deliverBy:new Date(formInputs.deliverBy).getTime()/1e3}),id).then((function(){Promise.all(formInputs.products.map((function(selected){var edited=!1;return formInputs.oldProducts.map((function(item){item.id!==selected.id||(edited=!0)})),edited?Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_22__.f)(Object.assign({},selected,{equipmentId:id}),selected.id):Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_22__.b)(Object.assign({equipmentId:id},selected))}))).then((function(){Promise.all(formInputs.oldProducts.map((function(item){var deleted=!0;return formInputs.products.map((function(selected){selected.id!==item.id||(deleted=!1)})),deleted&&Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_22__.d)(item.id)}))).then((function(){setIsLoading(!1),props.history.push("/lemz/workshop-orders")}))}))})))}})]})]})})})};EditWorkshopOrder.displayName="EditWorkshopOrder",EditWorkshopOrder.__docgenInfo={description:"",methods:[],displayName:"EditWorkshopOrder"},__webpack_exports__.default=EditWorkshopOrder,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\WorkshopsComponents\\WorkshopOrders\\EditWorkshopOrder\\EditWorkshopOrder.jsx"]={name:"EditWorkshopOrder",docgenInfo:EditWorkshopOrder.__docgenInfo,path:"src\\components\\MainPage\\WorkshopsComponents\\WorkshopOrders\\EditWorkshopOrder\\EditWorkshopOrder.jsx"})},3409:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3410);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3410:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports}}]);