(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{2848:function(module,exports,__webpack_require__){var aFunction=__webpack_require__(299),toObject=__webpack_require__(162),IndexedObject=__webpack_require__(661),toLength=__webpack_require__(161),createMethod=function(IS_RIGHT){return function(that,callbackfn,argumentsLength,memo){aFunction(callbackfn);var O=toObject(that),self=IndexedObject(O),length=toLength(O.length),index=IS_RIGHT?length-1:0,i=IS_RIGHT?-1:1;if(argumentsLength<2)for(;;){if(index in self){memo=self[index],index+=i;break}if(index+=i,IS_RIGHT?index<0:length<=index)throw TypeError("Reduce of empty array with no initial value")}for(;IS_RIGHT?index>=0:length>index;index+=i)index in self&&(memo=callbackfn(memo,self[index],index,O));return memo}};module.exports={left:createMethod(!1),right:createMethod(!0)}},2871:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/chevron-down.d0a0493c.svg"},2937:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/print.2602d8cf.png"},3324:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_11__=(__webpack_require__(1006),__webpack_require__(35),__webpack_require__(50),__webpack_require__(26),__webpack_require__(255),__webpack_require__(159),__webpack_require__(462),__webpack_require__(297),__webpack_require__(463),__webpack_require__(0)),Assets_print_png__WEBPACK_IMPORTED_MODULE_14__=(__webpack_require__(3325),__webpack_require__(1760),__webpack_require__(2937)),Assets_print_png__WEBPACK_IMPORTED_MODULE_14___default=__webpack_require__.n(Assets_print_png__WEBPACK_IMPORTED_MODULE_14__),_TableView_TableView_jsx__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(2969),_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(348),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(198),Utils_MainWindow_FloatingButton_FloatingButton_jsx__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(662),API_requests__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(1009),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(61),Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(2830),_objects_js__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(2883),Assets_tableview_chevron_down_svg__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(2871),Assets_tableview_chevron_down_svg__WEBPACK_IMPORTED_MODULE_23___default=__webpack_require__.n(Assets_tableview_chevron_down_svg__WEBPACK_IMPORTED_MODULE_23__),Utils_hooks_useSort_useSort_js__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(1012),Utils_hooks_uiComponents_useTitleHeader__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(1013),Utils_sorting_sorting__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(298),_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(2843),_functions_js__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(2864),Utils_hooks_useFormWindow__WEBPACK_IMPORTED_MODULE_29__=__webpack_require__(343),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__=__webpack_require__(1),WorkshopRequests=function WorkshopRequests(props){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),requests=_useState2[0],setRequests=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)([]),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),dates=_useState4[0],setDates=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)({}),_useState6=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5,2),productsQuantities=_useState6[0],setProductsQuantities=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)(""),_useState8=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7,2),searchQuery=_useState8[0],setSearchQuery=_useState8[1],_useState9=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)(!1),_useState10=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState9,2),isLoading=_useState10[0],setIsLoading=_useState10[1],_useState11=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)("requests"===props.type),_useState12=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState11,2),isMinimized=_useState12[0],setIsMinimized=_useState12[1],_useState13=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)("lemz"),_useState14=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState13,2),toWorkshop=_useState14[0],setToWorkshop=_useState14[1],_useState15=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)(0),_useState16=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState15,2),requestId=_useState16[0],setRequestId=_useState16[1],_useFormWindow=Object(Utils_hooks_useFormWindow__WEBPACK_IMPORTED_MODULE_29__.a)("Перенос заявки в план производства",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.Fragment,{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_name",children:"Подразделение"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("select",{name:"workshop",onChange:function onChange(_ref){var target=_ref.target;return setToWorkshop(target.value)},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"lemz",children:"ЦехЛЭМЗ"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("option",{value:"lepsari",children:"ЦехЛепсари"})]})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-form__buttons main-form__buttons--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{className:"main-form__submit",isLoading:isLoading,onClick:function handleTransferRequest(){setIsLoading(!0);var request=requests.find((function(item){return item.id===requestId}));Object(API_requests__WEBPACK_IMPORTED_MODULE_19__.m)(request.id,toWorkshop).then((function(res){return res.json()})).then((function(){setIsLoading(!1),setShowWindow(!1),props.history.push("/".concat(toWorkshop,"/workshop-").concat(toWorkshop,"/").concat(Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.f)(request),"#").concat(request.id)),window.location.reload()})).catch((function(error){console.log(error),alert("Ошибка при копировании записи"),setIsLoading(!1)}))},text:"Перенести в цех"})})]})})}),[]),formWindow=_useFormWindow.formWindow,showWindow=_useFormWindow.showWindow,setShowWindow=_useFormWindow.setShowWindow,_useSort=Object(Utils_hooks_useSort_useSort_js__WEBPACK_IMPORTED_MODULE_24__.a)([],{ignoreURL:!1,sortOrder:{curSort:"date",date:"desc"},sortOptions:_objects_js__WEBPACK_IMPORTED_MODULE_22__.c}),sortOrder=_useSort.sortOrder,sortPanel=_useSort.sortPanel,_useState17=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)([{filter:["lemz","lepsari",null,"requests"],fullName:"Все",visible:!0},{filter:["lemz"],fullName:"ЦехЛЭМЗ",visible:!1},{filter:["lepsari"],fullName:"ЦехЛепсари",visible:!1},{filter:[null,"requests"],fullName:"Не перенесенные",visible:!1}]),_useState18=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState17,2),workshopsFilter=_useState18[0],setWorkshopsFilter=_useState18[1];Object(react__WEBPACK_IMPORTED_MODULE_11__.useEffect)((function(){document.title="Заявки - ".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.c[props.type].fullName);var abortController=new AbortController;return loadRequests(abortController.signal),function cancel(){abortController.abort()}}),[]);var loadRequests=function loadRequests(signal){return setIsLoading(!0),("requests"===props.type?Object(API_requests__WEBPACK_IMPORTED_MODULE_19__.k)(signal):Object(API_requests__WEBPACK_IMPORTED_MODULE_19__.l)(props.type,signal)).then((function(res){return res.json()})).then((function(requests){setRequests(requests),setProductsQuantities(Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_20__.p)(requests)),setDates(Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_20__.n)(requests)),setIsLoading(!1)}))},_useState19=Object(react__WEBPACK_IMPORTED_MODULE_11__.useState)(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.b.map((function(status){return Object.assign({},status,{visible:!1})}))),_useState20=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState19,2),statuses=_useState20[0],setStatuses=_useState20[1],filterRequestsByWorkshop=function filterRequestsByWorkshop(data){return data.filter((function(item){return item.factory===props.type}))},getCategoriesCount=function getCategoriesCount(category){return Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.c)("requests"===props.type?requests:filterRequestsByWorkshop(requests),category).length},pageNameInURL=props.location.pathname.split("".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.c[props.type].redirectURL,"/"))[1],menuItems=[{pageName:"open",pageTitle:"Открытые",count:getCategoriesCount("Открытые"),link:"".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.c[props.type].redirectURL,"/open")},{pageName:"shipped",pageTitle:"Отгружено",count:getCategoriesCount("Отгружено"),link:"".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.c[props.type].redirectURL,"/shipped")},{pageName:"completed",pageTitle:"Завершено",link:"".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.c[props.type].redirectURL,"/completed")}],_useTitleHeader=Object(Utils_hooks_uiComponents_useTitleHeader__WEBPACK_IMPORTED_MODULE_25__.a)("requests"===props.type?"Заявки":void 0,menuItems,void 0!==_objects_js__WEBPACK_IMPORTED_MODULE_22__.b[pageNameInURL]?pageNameInURL:"open"),curPage=_useTitleHeader.curPage,titleHeader=_useTitleHeader.titleHeader,handleItemClick=function handleItemClick(array,setArray,item,index){var temp=array.map((function(item){return Object.assign({},item,{visible:!1})}));temp.splice(index,1,Object.assign({},item,{visible:!item.visible})),setArray(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(temp))};return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"workshop-requests",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-window",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_MainWindow_FloatingButton_FloatingButton_jsx__WEBPACK_IMPORTED_MODULE_18__.a,{onClick:function onClick(){return setIsMinimized(!isMinimized)},iconSrc:Assets_tableview_chevron_down_svg__WEBPACK_IMPORTED_MODULE_23___default.a,title:"Свернуть заявки",visibility:["ROLE_ADMIN","ROLE_WORKSHOP"],iconStyles:{transform:isMinimized?"rotate(180deg)":""}}),"requests"===props.type?titleHeader:null,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_16__.a,{fullSize:!0,placeholder:"Введите название продукции для поиска...",setSearchQuery:setSearchQuery}),"requests"!==props.type?titleHeader:null,"requests"===props.type&&formWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_21__.a,{itemsCount:"Всего: ".concat(requests.length," записей"),buttons:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{text:"Печать списка",isLoading:isLoading,imgSrc:Assets_print_png__WEBPACK_IMPORTED_MODULE_14___default.a,inverted:!0,className:"main-window__button main-window__button--inverted",onClick:function onClick(){return Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.l)(setIsLoading,productsQuantities,_workshopVariables_js__WEBPACK_IMPORTED_MODULE_27__.c[props.type].fullName)}}),content:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-window__status-panel",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{children:"Фильтр по статусам: "}),statuses.map((function(status,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:(status.visible?"main-window__button":"main-window__button main-window__button--inverted")+" main-window__list-item--"+status.className,onClick:function onClick(){return handleItemClick(statuses,setStatuses,status,index)},children:status.name},index)}))]}),"requests"===props.type&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsxs)("div",{className:"main-window__filter-pick",style:{marginTop:"10px"},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{children:"Фильтр по цехам: "}),workshopsFilter.map((function(workshop,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)("div",{className:"main-window__button ".concat(workshop.visible?"":"main-window__button--inverted"),onClick:function onClick(){return handleItemClick(workshopsFilter,setWorkshopsFilter,workshop,index)},children:workshop.fullName},index)}))]})]}),sorting:sortPanel}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_30__.jsx)(_TableView_TableView_jsx__WEBPACK_IMPORTED_MODULE_15__.a,{data:function filterRequests(requests){return Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.d)(Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.e)(Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.c)("requests"===props.type?requests:filterRequestsByWorkshop(requests),_objects_js__WEBPACK_IMPORTED_MODULE_22__.b[curPage].name),statuses),searchQuery)}(requests),workshopName:props.type,isLoading:isLoading,sortOrder:sortOrder,loadData:loadRequests,isMinimized:isMinimized,dates:Object(Utils_sorting_sorting__WEBPACK_IMPORTED_MODULE_26__.a)(dates,{fieldName:sortOrder.curSort,direction:sortOrder[sortOrder.curSort]}),searchQuery:searchQuery,deleteItem:function deleteItem(id){return Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.b)(id,loadRequests)},transferRequest:function transferRequestId(id){setRequestId(id),setShowWindow(!showWindow)},copyRequest:function copyRequest(id){return Object(_functions_js__WEBPACK_IMPORTED_MODULE_28__.a)(id,requests,setIsLoading,loadRequests)}})]})})};WorkshopRequests.displayName="WorkshopRequests",WorkshopRequests.__docgenInfo={description:"",methods:[],displayName:"WorkshopRequests"},__webpack_exports__.default=WorkshopRequests,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/WorkshopsComponents/WorkshopRequests/WorkshopRequests.jsx"]={name:"WorkshopRequests",docgenInfo:WorkshopRequests.__docgenInfo,path:"src/components/MainPage/WorkshopsComponents/WorkshopRequests/WorkshopRequests.jsx"})},3325:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3326);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3326:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.workshop-requests{--shipped: #b8c493;--priority: #e29c9c;--completed: #98dda6;--ready: #7fd192;--in-production: #e3e4cb;--waiting: #95ddc5;--problem: #d6574e;--materials: #dfc38b}.workshop-requests .control-panel{margin-top:-5px}.workshop-requests .control-panel .main-window__control-panel-wrapper{padding-top:10px;padding-bottom:15px}.workshop-requests .main-window__status-panel{margin-bottom:0px;padding-left:25px}.workshop-requests .main-window__status-panel .main-window__list-item--shipped::before{background-color:var(--shipped)}.workshop-requests .main-window__status-panel .main-window__list-item--in-production::before{background-color:var(--in-production)}.workshop-requests .main-window__status-panel .main-window__list-item--completed::before{background-color:var(--completed)}.workshop-requests .main-window__status-panel .main-window__list-item--priority::before{background-color:var(--priority)}.workshop-requests .main-window__status-panel .main-window__list-item--waiting::before{background-color:var(--waiting)}.workshop-requests .main-window__status-panel .main-window__list-item--ready::before{background-color:var(--ready)}.workshop-requests .main-window__status-panel .main-window__list-item--problem::before{background-color:var(--problem)}.workshop-requests .main-window__status-panel .main-window__list-item--materials::before{background-color:var(--materials)}.workshop-requests .main-window__status-panel .main-window__amount_table{margin:0;font-size:100%}.workshop-requests .main-window__status-panel .button{margin:0;margin-left:auto;margin-right:10px;padding:10px 15px;margin-top:5px;font-size:100%}.workshop-requests .main-window__status-panel .button::before{display:none}.workshop-requests .searchbar{background-color:#fff;margin-bottom:0 !important;border-bottom-left-radius:0;border-bottom-right-radius:0}.workshop-requests .main-window__status-panel .main-window__button{white-space:nowrap}.workshop-requests .main-window__info-panel{margin-bottom:-15px}@media (max-width: 768px){.workshop-requests .main-window__info-panel{margin-bottom:5px}.workshop-requests .searchbar{width:calc(100% + 25px) !important}}\n",""]),module.exports=exports}}]);