(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{2549:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(100),__webpack_require__(310),__webpack_require__(263),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2556),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\TableView\\PlaceholderLoading\\PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src\\utils\\TableView\\PlaceholderLoading\\PlaceholderLoading.jsx"})},2556:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2557);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2557:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2558:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(100),__webpack_require__(0)),Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2566),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2563),__webpack_require__(1)),ControlPanel=function ControlPanel(props){var _props$styles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!0),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isHidden=_useState2[0],setIsHidden=_useState2[1];return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"control-panel",style:Object.assign({},null!==(_props$styles=props.styles)&&void 0!==_props$styles?_props$styles:{}),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__control-panel-wrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"control-panel__buttons",children:[props.sorting||null,props.content?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__button main-window__button--inverted main-window__button--filter",onClick:function onClick(){return setIsHidden((function(isHidden){return!isHidden}))},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{children:props.panelName||"Фильтры"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__.a,{className:"main-window__img ".concat(isHidden?"":"main-window__img--rotated")})]}):null,props.buttons||null,props.itemsCount?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"main-window__amount_table",children:props.itemsCount}):null]}),isHidden?null:props.content]})})};ControlPanel.displayName="ControlPanel",ControlPanel.__docgenInfo={description:"",methods:[],displayName:"ControlPanel"},__webpack_exports__.a=ControlPanel,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\MainWindow\\ControlPanel\\ControlPanel.jsx"]={name:"ControlPanel",docgenInfo:ControlPanel.__docgenInfo,path:"src\\utils\\MainWindow\\ControlPanel\\ControlPanel.jsx"})},2563:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2564);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2564:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.control-panel{width:100%}.control-panel .main-window__control-panel-wrapper{padding-top:5px;padding-bottom:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__button{margin-top:5px;padding:8px 10px;font-size:85%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .switch{margin-top:5px;margin-right:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .searchbar{max-width:50%;margin-right:auto;padding:0;align-self:center;margin-left:-15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__amount_table{color:#666666;align-self:center;margin-top:5px;margin-left:auto}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window{padding:0}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel{width:max-content;margin-bottom:0;margin-right:10px;box-sizing:border-box;padding-top:calc(5px);position:relative;background-color:#ffffff}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel::before{width:100%;height:20px;position:absolute;content:\"Сортировка\";top:8px;left:10px;z-index:0;color:#777777;font-size:95%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px;padding-right:25px;padding-left:9px;height:100%;margin:0;box-sizing:border-box;min-width:150px;z-index:0;background-color:transparent;cursor:pointer;border:1px solid #cccccc;transition:background-color 100ms ease-in-out;-webkit-appearance:none;-moz-appearance:none;background:transparent;background-image:url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'></path></svg>\");background-repeat:no-repeat;background-position-x:100%;background-position-y:calc(50% + 2px)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter{border-color:#cccccc;justify-content:space-between;padding:8px 8px !important;padding-right:5px !important}.control-panel .main-window__control-panel-wrapper .main-window__button--filter span{margin-right:20px;font-size:95%}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img{filter:none;max-width:18px;margin-top:1px;margin-right:0;transition:200ms cubic-bezier(0.23, 1, 0.32, 1)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img path:nth-child(1){transition:200ms cubic-bezier(0.23, 1, 0.32, 1);fill:#333333}@media (max-width: 768px){.control-panel .main-window__control-panel-wrapper{padding-left:15px;padding-right:15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{width:calc(100% + 30px);padding:0 15px;box-sizing:border-box;flex-wrap:nowrap;margin-left:-15px;overflow:auto;white-space:nowrap}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px !important;padding-right:25px !important;padding-left:9px !important;max-width:240px}}\n",""]),module.exports=exports},2573:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(42),DESCRIPTORS=__webpack_require__(101),global=__webpack_require__(35),has=__webpack_require__(131),isObject=__webpack_require__(116),defineProperty=__webpack_require__(132).f,copyConstructorProperties=__webpack_require__(1526),NativeSymbol=global.Symbol;if(DESCRIPTORS&&"function"==typeof NativeSymbol&&(!("description"in NativeSymbol.prototype)||void 0!==NativeSymbol().description)){var EmptyStringDescriptionStore={},SymbolWrapper=function Symbol(){var description=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),result=this instanceof SymbolWrapper?new NativeSymbol(description):void 0===description?NativeSymbol():NativeSymbol(description);return""===description&&(EmptyStringDescriptionStore[result]=!0),result};copyConstructorProperties(SymbolWrapper,NativeSymbol);var symbolPrototype=SymbolWrapper.prototype=NativeSymbol.prototype;symbolPrototype.constructor=SymbolWrapper;var symbolToString=symbolPrototype.toString,native="Symbol(test)"==String(NativeSymbol("test")),regexp=/^Symbol\((.*)\)[^)]+$/;defineProperty(symbolPrototype,"description",{configurable:!0,get:function description(){var symbol=isObject(this)?this.valueOf():this,string=symbolToString.call(symbol);if(has(EmptyStringDescriptionStore,symbol))return"";var desc=native?string.slice(7,-1):string.replace(regexp,"$1");return""===desc?void 0:desc}}),$({global:!0,forced:!0},{Symbol:SymbolWrapper})}},3388:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3389);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3389:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.log-list .main-window__header--full{margin-bottom:0 !important}\n",""]),module.exports=exports},3390:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3391);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3391:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.log-list-page__table{width:100%}.log-list-page__table .main-window__list-item{padding-top:10px;padding-bottom:10px}.log-list-page__table .main-window__list-item span:nth-child(1){flex:0 1 15%;max-width:150px}.log-list-page__table .main-window__list-item span:nth-child(2){flex:0 1 15%;max-width:150px}.log-list-page__table .main-window__list-item span:nth-child(3){flex:0 1 15%;max-width:250px}.log-list-page__table .main-window__list-item span:nth-child(4){flex:0 1 50%}@media (max-width: 768px){.log-list-page__table .main-window__list-item span{max-width:none !important}}\n",""]),module.exports=exports},3582:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var slicedToArray=__webpack_require__(17),slicedToArray_default=__webpack_require__.n(slicedToArray),react=(__webpack_require__(263),__webpack_require__(2579),__webpack_require__(604),__webpack_require__(0)),react_router_dom=(__webpack_require__(3388),__webpack_require__(1521),__webpack_require__(2554),__webpack_require__(2552),__webpack_require__(1525),__webpack_require__(2573),__webpack_require__(310),__webpack_require__(73)),functions=__webpack_require__(2546),PlaceholderLoading=__webpack_require__(2549),logItemsTypes=(__webpack_require__(3390),{requests:{name:"Заявки",originalName:"request"},clients:{name:"Клиенты",originalName:"clients"},login:{name:"Входы",originalName:"login"},rigging:{name:"Оснастка",originalName:"rigging"},riggingPart:{name:"Детали",originalName:"riggingPart"}}),logItemsRedirectLinks={request:"/requests/edit",clients:"/clients/edit",rigging:"/dispatcher/rigging/stamp/edit",riggingPart:"/dispatcher/rigging/stamp/edit"},jsx_runtime=__webpack_require__(1),TableView_TableView_TableView=function TableView(_ref){var _ref$data=_ref.data,data=void 0===_ref$data?[]:_ref$data,_ref$isLoading=_ref.isLoading,isLoading=void 0!==_ref$isLoading&&_ref$isLoading;return Object(jsx_runtime.jsx)("div",{className:"log-list-page__table",children:Object(jsx_runtime.jsxs)("div",{className:"main-window__list main-window__list--full",children:[Object(jsx_runtime.jsxs)("div",{className:"main-window__list-item main-window__list-item--header",children:[Object(jsx_runtime.jsx)("span",{children:"Время"}),Object(jsx_runtime.jsx)("span",{children:"Пользователь"}),Object(jsx_runtime.jsx)("span",{children:"Действие"}),Object(jsx_runtime.jsx)("span",{children:"Описание"})]}),isLoading?Object(jsx_runtime.jsx)(PlaceholderLoading.a,{itemClassName:"main-window__list-item",minHeight:"35px",items:10}):data.map((function(item){var _item$elementId,itemId=item.description.split("№")[1];return Object(jsx_runtime.jsxs)("div",{className:"main-window__list-item",children:[Object(jsx_runtime.jsxs)("span",{children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Время"}),"".concat(Object(functions.h)(item.date)," ").concat(Object(functions.i)(item.date)," ")]}),Object(jsx_runtime.jsxs)("span",{children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Пользователь"}),item.author]}),Object(jsx_runtime.jsxs)("span",{children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Действие"}),item.action]}),Object(jsx_runtime.jsx)("span",{children:logItemsRedirectLinks[item.type]?Object(jsx_runtime.jsxs)(react_router_dom.a,{className:"main-window__link",to:"".concat(logItemsRedirectLinks[item.type],"/").concat(null!==(_item$elementId=item.elementId)&&void 0!==_item$elementId?_item$elementId:itemId),children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Описание"}),item.description]}):Object(jsx_runtime.jsxs)("div",{children:[Object(jsx_runtime.jsx)("div",{className:"main-window__mobile-text",children:"Описание"}),item.description]})})]},item.id)}))]})})};TableView_TableView_TableView.displayName="TableView",TableView_TableView_TableView.__docgenInfo={description:"",methods:[],displayName:"TableView",props:{data:{defaultValue:{value:"[]",computed:!1},required:!1},isLoading:{defaultValue:{value:"false",computed:!1},required:!1}}};var LogListPage_TableView_TableView=TableView_TableView_TableView;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\LogListPage\\TableView\\TableView.jsx"]={name:"TableView",docgenInfo:TableView_TableView_TableView.__docgenInfo,path:"src\\components\\MainPage\\LogListPage\\TableView\\TableView.jsx"});var ControlPanel=__webpack_require__(2558),utilsAPI=__webpack_require__(605);var usePagination=__webpack_require__(2650),useSort=__webpack_require__(2594),hooks=__webpack_require__(2561),LogListPage_LogListPage_LogListPage=function LogListPage(){var _query$get,_useQuery=Object(hooks.c)(),query=_useQuery.query,pushParamToURL=_useQuery.pushParamToURL,_useState=Object(react.useState)(null!==(_query$get=query.get("category"))&&void 0!==_query$get?_query$get:"request"),_useState2=slicedToArray_default()(_useState,2),curCategory=_useState2[0],setCurCategory=_useState2[1],_useSort=Object(useSort.a)(data,{},[data]),sortOrder=_useSort.sortOrder,sortPanel=_useSort.sortPanel,_usePagination=Object(usePagination.a)((function(){return function getLogsListByType(){var type=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"request",size=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,page=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,sort=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{curSort:"date",date:"DESC"};return Object(utilsAPI.b)({url:"".concat("http://localhost:8443","/api/v1/log/").concat(type,"/?size=").concat(size,"&page=").concat(page,"&sort=").concat(sort.curSort,",").concat(sort[sort.curSort]),method:"GET"})}(curCategory,itemsPerPage,curPage-1,sortOrder)}),[curCategory,sortOrder,setCurPage,curPage],"dynamic"),curPage=_usePagination.curPage,setCurPage=_usePagination.setCurPage,itemsPerPage=_usePagination.itemsPerPage,data=_usePagination.data,isLoading=_usePagination.isLoading,pagination=_usePagination.pagination;return Object(jsx_runtime.jsx)("div",{className:"log-list",children:Object(jsx_runtime.jsxs)("div",{className:"main-window",children:[Object(jsx_runtime.jsxs)("div",{className:"main-window__header main-window__header--full",children:[Object(jsx_runtime.jsx)("div",{className:"main-window__title",children:"Логи"}),Object(jsx_runtime.jsx)("div",{className:"main-window__menu",children:Object.values(logItemsTypes).map((function(item){return Object(jsx_runtime.jsx)("div",{className:curCategory===item.originalName?"main-window__item--active main-window__item":"main-window__item",onClick:function onClick(){return function handleCategoryChange(item){setCurPage(1),pushParamToURL("page",1),pushParamToURL("category",item.originalName),setCurCategory(item.originalName)}(item)},children:item.name},item.id)}))})]}),Object(jsx_runtime.jsx)(ControlPanel.a,{sorting:sortPanel}),Object(jsx_runtime.jsx)(LogListPage_TableView_TableView,{data:data,isLoading:isLoading}),pagination]})})};LogListPage_LogListPage_LogListPage.displayName="LogListPage",LogListPage_LogListPage_LogListPage.__docgenInfo={description:"",methods:[],displayName:"LogListPage"};__webpack_exports__.default=LogListPage_LogListPage_LogListPage;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\LogListPage\\LogListPage.jsx"]={name:"LogListPage",docgenInfo:LogListPage_LogListPage_LogListPage.__docgenInfo,path:"src\\components\\MainPage\\LogListPage\\LogListPage.jsx"})}}]);