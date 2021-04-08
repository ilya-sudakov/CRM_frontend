(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{3446:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_10__=(__webpack_require__(26),__webpack_require__(130),__webpack_require__(79),__webpack_require__(160),__webpack_require__(149),__webpack_require__(198),__webpack_require__(50),__webpack_require__(159),__webpack_require__(196),__webpack_require__(0)),Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_13__=(__webpack_require__(3447),__webpack_require__(2830),__webpack_require__(2822)),Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(2835),Utils_Form_SelectItems_SelectItems_jsx__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(3105),Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(2971),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(197),_workshopVariables__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(2839),Utils_hooks__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(1001),_functions__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(2866),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(1),NewWorkshopOrder=function NewWorkshopOrder(props){var _useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_19__.a)(Object(_functions__WEBPACK_IMPORTED_MODULE_20__.j)(_workshopVariables__WEBPACK_IMPORTED_MODULE_18__.c[props.type].fullName)),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react__WEBPACK_IMPORTED_MODULE_10__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_10__.useEffect)((function(){document.title="Создание заказа ".concat(_workshopVariables__WEBPACK_IMPORTED_MODULE_18__.c[props.type].name)}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"new-workshop-order",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsxs)("div",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"main-form__title",children:"Создание заказа"})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_14__.a,{inputName:"Дата создания",required:!0,error:formErrors.date,name:"date",selected:Date.parse(formInputs.date),handleDateChange:function handleDateChange(date){return _handleInputChange("date",date)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_13__.a,{inputName:"Наименование",required:!0,error:formErrors.name,name:"name",handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("name",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_13__.a,{inputName:"Комплектация",name:"assembly",handleInputChange:function handleInputChange(_ref2){var target=_ref2.target;return _handleInputChange("assembly",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_14__.a,{inputName:"Дата поставки",required:!0,error:formErrors.deliverBy,name:"deliverBy",selected:Date.parse(formInputs.deliverBy),handleDateChange:function handleDateChange(date){return _handleInputChange("deliverBy",date)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_SelectItems_SelectItems_jsx__WEBPACK_IMPORTED_MODULE_15__.a,{inputName:"Продукция",userHasAccess:props.userHasAccess,defaultValue:formInputs.products,required:!0,onChange:function onChange(value){return _handleInputChange("products",value)},error:formErrors.products,errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"main-form__input_name",children:"Статус"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsxs)("select",{name:"status",onChange:function onChange(_ref3){var target=_ref3.target;return _handleInputChange("status",target.value)},value:formInputs.status,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("option",{value:"ordered",children:"Заказано"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("option",{value:"sent",children:"Отправлено"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("option",{value:"problem",children:"Проблема"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("option",{value:"completed",children:"Завершено"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{className:"main-form__submit main-form__submit--inverted",inverted:!0,onClick:function onClick(){return props.history.push(_workshopVariables__WEBPACK_IMPORTED_MODULE_18__.c[props.type].ordersRedirectURL)},text:"Вернуться назад"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{text:"Добавить запись",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){if(formIsValid()){setIsLoading(!0);var orderId=0;Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_16__.a)(Object.assign({},formInputs,{date:formInputs.date.getTime()/1e3,deliverBy:formInputs.deliverBy.getTime()/1e3})).then((function(res){return res.json()})).then((function(res){console.log(res.id),orderId=res.id,Promise.all(formInputs.products.map((function(product){return Object(Utils_RequestsAPI_Workshop_Orders_jsx__WEBPACK_IMPORTED_MODULE_16__.b)(Object.assign({},product,{equipmentId:orderId}))}))).then((function(){setIsLoading(!1),props.history.push(_workshopVariables__WEBPACK_IMPORTED_MODULE_18__.c[props.type].ordersRedirectURL)}))}))}}})]})]})})})};NewWorkshopOrder.displayName="NewWorkshopOrder",NewWorkshopOrder.__docgenInfo={description:"",methods:[],displayName:"NewWorkshopOrder"},__webpack_exports__.default=NewWorkshopOrder,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/WorkshopsComponents/WorkshopOrders/NewWorkshopOrder/NewWorkshopOrder.jsx"]={name:"NewWorkshopOrder",docgenInfo:NewWorkshopOrder.__docgenInfo,path:"src/components/MainPage/WorkshopsComponents/WorkshopOrders/NewWorkshopOrder/NewWorkshopOrder.jsx"})},3447:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3448);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3448:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports}}]);