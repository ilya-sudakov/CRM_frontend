(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{2573:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(42),DESCRIPTORS=__webpack_require__(101),global=__webpack_require__(35),has=__webpack_require__(131),isObject=__webpack_require__(116),defineProperty=__webpack_require__(132).f,copyConstructorProperties=__webpack_require__(1526),NativeSymbol=global.Symbol;if(DESCRIPTORS&&"function"==typeof NativeSymbol&&(!("description"in NativeSymbol.prototype)||void 0!==NativeSymbol().description)){var EmptyStringDescriptionStore={},SymbolWrapper=function Symbol(){var description=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),result=this instanceof SymbolWrapper?new NativeSymbol(description):void 0===description?NativeSymbol():NativeSymbol(description);return""===description&&(EmptyStringDescriptionStore[result]=!0),result};copyConstructorProperties(SymbolWrapper,NativeSymbol);var symbolPrototype=SymbolWrapper.prototype=NativeSymbol.prototype;symbolPrototype.constructor=SymbolWrapper;var symbolToString=symbolPrototype.toString,native="Symbol(test)"==String(NativeSymbol("test")),regexp=/^Symbol\((.*)\)[^)]+$/;defineProperty(symbolPrototype,"description",{configurable:!0,get:function description(){var symbol=isObject(this)?this.valueOf():this,string=symbolToString.call(symbol);if(has(EmptyStringDescriptionStore,symbol))return"";var desc=native?string.slice(7,-1):string.replace(regexp,"$1");return""===desc?void 0:desc}}),$({global:!0,forced:!0},{Symbol:SymbolWrapper})}},2606:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/no_img.60f1f667.png"},2625:function(module,__webpack_exports__,__webpack_require__){"use strict";var Assets_priceList_no_img_png__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2606),Assets_priceList_no_img_png__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(Assets_priceList_no_img_png__WEBPACK_IMPORTED_MODULE_0__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(2629),__webpack_require__(1)),ImgLoader=function ImgLoader(props){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"img-loader",children:props.imgSrc||""===props.imgSrc?""===props.imgSrc&&props.noPhotoTemplate?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img",{className:props.imgClass,src:Assets_priceList_no_img_png__WEBPACK_IMPORTED_MODULE_0___default.a,alt:""}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img",{className:props.imgClass,src:props.imgSrc,alt:"",loading:"lazy"}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"img-loader__img--placeholder ".concat(props.imgClass)})})};ImgLoader.displayName="ImgLoader",ImgLoader.__docgenInfo={description:"",methods:[],displayName:"ImgLoader"},__webpack_exports__.a=ImgLoader,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\TableView\\ImgLoader\\ImgLoader.jsx"]={name:"ImgLoader",docgenInfo:ImgLoader.__docgenInfo,path:"src\\utils\\TableView\\ImgLoader\\ImgLoader.jsx"})},2629:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2630);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2630:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}@keyframes pulse{0%{border-color:#dbdbdb;background-color:#dbdbdb}50%{border-color:#c5c5c5;background-color:#c5c5c5}100%{border-color:#dbdbdb;background-color:#dbdbdb}}@keyframes load{from{background:linear-gradient(to right, transparent 0%, #fafafa 50%, transparent 100%);left:-150px}to{background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);left:100%}}.img-loader .img-loader__img--placeholder{width:80px;height:80px;position:relative;border-radius:5px;animation:pulse 1s infinite ease-in-out;position:relative;overflow:hidden}.img-loader .img-loader__img--placeholder::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}.img-loader .sk-circle{width:80px;height:80px;position:relative}.img-loader .sk-circle .sk-child{width:100%;height:100%;position:absolute;left:0;top:0}.img-loader .sk-circle .sk-child:before{content:"";display:block;margin:0 auto;width:15%;height:15%;background-color:#4293b6;border-radius:100%;-webkit-animation:sk-circleBounceDelay 1.2s infinite ease-in-out both;animation:sk-circleBounceDelay 1.2s infinite ease-in-out both}.img-loader .sk-circle .sk-circle2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.img-loader .sk-circle .sk-circle3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.img-loader .sk-circle .sk-circle4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.img-loader .sk-circle .sk-circle5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.img-loader .sk-circle .sk-circle6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.img-loader .sk-circle .sk-circle7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.img-loader .sk-circle .sk-circle8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.img-loader .sk-circle .sk-circle9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.img-loader .sk-circle .sk-circle10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.img-loader .sk-circle .sk-circle11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.img-loader .sk-circle .sk-circle12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.img-loader .sk-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.img-loader .sk-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.img-loader .sk-circle .sk-circle4:before{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.img-loader .sk-circle .sk-circle5:before{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.img-loader .sk-circle .sk-circle6:before{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.img-loader .sk-circle .sk-circle7:before{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.img-loader .sk-circle .sk-circle8:before{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.img-loader .sk-circle .sk-circle9:before{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.img-loader .sk-circle .sk-circle10:before{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.img-loader .sk-circle .sk-circle11:before{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.img-loader .sk-circle .sk-circle12:before{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@-webkit-keyframes sk-circleBounceDelay{0%,80%,100%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-circleBounceDelay{0%,80%,100%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.img-loader .lds-roller{display:inline-block;position:relative;width:80px;height:80px}.img-loader .lds-roller div{animation:lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;transform-origin:40px 40px}.img-loader .lds-roller div:after{content:" ";display:block;position:absolute;width:7px;height:7px;border-radius:50%;background:#4293b6;margin:-4px 0 0 -4px}.img-loader .lds-roller div:nth-child(1){animation-delay:-0.036s}.img-loader .lds-roller div:nth-child(1):after{top:63px;left:63px}.img-loader .lds-roller div:nth-child(2){animation-delay:-0.072s}.img-loader .lds-roller div:nth-child(2):after{top:68px;left:56px}.img-loader .lds-roller div:nth-child(3){animation-delay:-0.108s}.img-loader .lds-roller div:nth-child(3):after{top:71px;left:48px}.img-loader .lds-roller div:nth-child(4){animation-delay:-0.144s}.img-loader .lds-roller div:nth-child(4):after{top:72px;left:40px}.img-loader .lds-roller div:nth-child(5){animation-delay:-0.18s}.img-loader .lds-roller div:nth-child(5):after{top:71px;left:32px}.img-loader .lds-roller div:nth-child(6){animation-delay:-0.216s}.img-loader .lds-roller div:nth-child(6):after{top:68px;left:24px}.img-loader .lds-roller div:nth-child(7){animation-delay:-0.252s}.img-loader .lds-roller div:nth-child(7):after{top:63px;left:17px}.img-loader .lds-roller div:nth-child(8){animation-delay:-0.288s}.img-loader .lds-roller div:nth-child(8):after{top:56px;left:12px}@keyframes lds-roller{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}\n',""]),module.exports=exports},3395:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(949),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(419),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(606),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__),react__WEBPACK_IMPORTED_MODULE_15__=(__webpack_require__(2554),__webpack_require__(2552),__webpack_require__(263),__webpack_require__(2562),__webpack_require__(2555),__webpack_require__(604),__webpack_require__(1525),__webpack_require__(2573),__webpack_require__(947),__webpack_require__(946),__webpack_require__(100),__webpack_require__(0)),Utils_RequestsAPI_Products_js__WEBPACK_IMPORTED_MODULE_18__=(__webpack_require__(3396),__webpack_require__(2560),__webpack_require__(2689)),Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(2548),_SelectCategory_SelectCategory_jsx__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(3038),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(2546),Utils_TableView_ImgLoader_ImgLoader_jsx__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(2625),Utils_Form_FileUploader_FileUploader_jsx__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(2620),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(264),_PackagingPage_SelectPackaging_SelectPackaging_jsx__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(2741),Utils_RequestsAPI_Products_packaging_js__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(2600),Utils_hooks__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(2561),_objects__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(2638),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__=__webpack_require__(1),EditProduct=function EditProduct(props){var _useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_27__.a)(_objects__WEBPACK_IMPORTED_MODULE_28__.b),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,updateFormInputs=_useForm.updateFormInputs,formIsValid=_useForm.formIsValid,errorWindow=_useForm.errorWindow,_useState=Object(react__WEBPACK_IMPORTED_MODULE_15__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_15__.useEffect)((function(){document.title="Редактирование продукта";var id=props.history.location.pathname.split("/products/edit/")[1];isNaN(Number.parseInt(id))?(alert("Неправильный индекс заявки!"),props.history.push("/products")):Object(Utils_RequestsAPI_Products_js__WEBPACK_IMPORTED_MODULE_18__.d)(id).then((function(res){return res.json()})).then((function(oldProduct){updateFormInputs({name:oldProduct.name,weight:oldProduct.weight,packages:oldProduct.packings,description:oldProduct.description,barcode:oldProduct.barcode,vendor:oldProduct.vendor,productionLocation:oldProduct.productionLocation,category:oldProduct.category,comment:oldProduct.comment,photo:oldProduct.photo})})).catch((function(error){console.log(error),alert("Неправильный индекс заявки!"),props.history.push("/products")}))}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("form",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__title",children:"Редактирование продукции"})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__input_name",children:"Фотография"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("div",{className:"main-form__product_img",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_TableView_ImgLoader_ImgLoader_jsx__WEBPACK_IMPORTED_MODULE_22__.a,{imgClass:"",imgSrc:formInputs.photo,noPhotoTemplate:!0}),""!==formInputs.photo&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__submit",onClick:function onClick(){return Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_21__.s)(formInputs.photo,formInputs.name+".jpeg")},children:"Скачать картинку"})]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Наименование",required:!0,error:formErrors.name,name:"name",defaultValue:formInputs.name,handleInputChange:function handleInputChange(_ref){var target=_ref.target;return _handleInputChange("name",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_SelectCategory_SelectCategory_jsx__WEBPACK_IMPORTED_MODULE_20__.a,{inputName:"Категория",required:!0,error:formErrors.category,defaultValue:formInputs.category,name:"category",handleCategoryChange:function handleCategoryChange(category){return _handleInputChange("category",category)},errorsArr:formErrors,setErrorsArr:setFormErrors,readOnly:!0}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("div",{className:"main-form__fieldset",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__group-name",children:"Характеристика продукции"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Вес изделия",required:!0,error:formErrors.weight,defaultValue:formInputs.weight,name:"weight",type:"number",handleInputChange:function handleInputChange(_ref2){var target=_ref2.target;return _handleInputChange("weight",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Артикул",defaultValue:formInputs.vendor,name:"vendor",type:"text",handleInputChange:function handleInputChange(_ref3){var target=_ref3.target;return _handleInputChange("vendor",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Описание",type:"text",defaultValue:formInputs.description,name:"description",handleInputChange:function handleInputChange(_ref4){var target=_ref4.target;return _handleInputChange("description",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Штрихкод",type:"text",defaultValue:formInputs.barcode,name:"barcode",handleInputChange:function handleInputChange(_ref5){var target=_ref5.target;return _handleInputChange("barcode",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_PackagingPage_SelectPackaging_SelectPackaging_jsx__WEBPACK_IMPORTED_MODULE_25__.a,{required:!0,onChange:function onChange(packages){return _handleInputChange("packages",packages)},defaultValue:formInputs.packages,errorName:"packages",errorsArr:formErrors,setErrorsArr:setFormErrors,error:formErrors.packages})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Комментарий",name:"comment",defaultValue:formInputs.comment,handleInputChange:function handleInputChange(_ref6){var target=_ref6.target;return _handleInputChange("comment",target.value)}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__input_name",children:"Место производства*"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("select",{name:"productionLocation",onChange:function onChange(_ref7){var target=_ref7.target;return _handleInputChange("productionLocation",target.value)},value:formInputs.productionLocation,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("option",{children:"ЦехЛЭМЗ"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("option",{children:"ЦехЛиговский"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("option",{children:"ЦехЛепсари"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__input_name",children:"Фотография"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_FileUploader_FileUploader_jsx__WEBPACK_IMPORTED_MODULE_23__.a,{onChange:function(){var _ref8=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark((function _callee(result){var downgraded;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(""===result[0]||!result[0]){_context.next=6;break}return _context.next=3,Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_21__.m)(result[0],"jpeg",.3);case 3:_context.t0=_context.sent,_context.next=7;break;case 6:_context.t0="";case 7:downgraded=_context.t0,_handleInputChange("photo",downgraded);case 9:case"end":return _context.stop()}}),_callee)})));return function(_x){return _ref8.apply(this,arguments)}}(),type:"readAsDataURL",defaultValue:""!==formInputs.photo?[formInputs.photo]:[],error:formErrors.photo,hideError:function hideError(){return setFormErrors(Object.assign({},formErrors,{photo:!1}))}})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{className:"main-form__submit main-form__submit--inverted",inverted:!0,onClick:function onClick(){return props.history.push("/products")},text:"Вернуться назад"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{text:"Изменить данные",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){if(console.log(formInputs),formIsValid()){setIsLoading(!0);var id=props.history.location.pathname.split("/products/edit/")[1];Object(Utils_RequestsAPI_Products_js__WEBPACK_IMPORTED_MODULE_18__.c)(formInputs,id).then((function(){return Object(Utils_RequestsAPI_Products_packaging_js__WEBPACK_IMPORTED_MODULE_26__.d)(id)})).then((function(){return Object(Utils_RequestsAPI_Products_packaging_js__WEBPACK_IMPORTED_MODULE_26__.b)({packings:_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(formInputs.packages.map((function(item){return item.id})))},id)})).then((function(){return props.history.push("/products")})).catch((function(){setIsLoading(!1),alert("Ошибка при добавлении записи")}))}}})]})]})})};EditProduct.displayName="EditProduct",EditProduct.__docgenInfo={description:"",methods:[],displayName:"EditProduct"},__webpack_exports__.default=EditProduct,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\Products\\EditProduct\\EditProduct.jsx"]={name:"EditProduct",docgenInfo:EditProduct.__docgenInfo,path:"src\\components\\MainPage\\Products\\EditProduct\\EditProduct.jsx"})},3396:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3397);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3397:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports}}]);