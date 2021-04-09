(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{2830:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(26),__webpack_require__(0)),Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1003),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2832),__webpack_require__(1)),ControlPanel=function ControlPanel(props){var _props$styles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!0),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isHidden=_useState2[0],setIsHidden=_useState2[1];return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"control-panel",style:Object.assign({},null!==(_props$styles=props.styles)&&void 0!==_props$styles?_props$styles:{}),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__control-panel-wrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"control-panel__buttons",children:[props.sorting||null,props.content?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__button main-window__button--inverted main-window__button--filter",onClick:function onClick(){return setIsHidden((function(isHidden){return!isHidden}))},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{children:props.panelName||"Фильтры"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__.a,{className:"main-window__img ".concat(isHidden?"":"main-window__img--rotated")})]}):null,props.buttons||null,props.itemsCount?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"main-window__amount_table",children:props.itemsCount}):null]}),isHidden?null:props.content]})})};ControlPanel.displayName="ControlPanel",ControlPanel.__docgenInfo={description:"",methods:[],displayName:"ControlPanel"},__webpack_exports__.a=ControlPanel,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/MainWindow/ControlPanel/ControlPanel.jsx"]={name:"ControlPanel",docgenInfo:ControlPanel.__docgenInfo,path:"src/utils/MainWindow/ControlPanel/ControlPanel.jsx"})},2831:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(26),__webpack_require__(35),__webpack_require__(50),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2834),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"})},2832:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2833);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2833:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.control-panel{width:100%}.control-panel .main-window__control-panel-wrapper{padding-top:5px;padding-bottom:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__button{margin-top:5px;padding:8px 10px;font-size:85%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .switch{margin-top:5px;margin-right:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .searchbar{max-width:50%;margin-right:auto;padding:0;align-self:center;margin-left:-15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__amount_table{color:#666666;align-self:center;margin-top:5px;margin-left:auto}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window{padding:0}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel{width:max-content;margin-bottom:0;margin-right:10px;box-sizing:border-box;padding-top:calc(5px);position:relative;background-color:#ffffff}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel::before{width:100%;height:20px;position:absolute;content:\"Сортировка\";top:8px;left:10px;z-index:0;color:#777777;font-size:95%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px;padding-right:25px;padding-left:9px;height:100%;margin:0;box-sizing:border-box;min-width:150px;z-index:0;background-color:transparent;cursor:pointer;border:1px solid #cccccc;transition:background-color 100ms ease-in-out;-webkit-appearance:none;-moz-appearance:none;background:transparent;background-image:url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'></path></svg>\");background-repeat:no-repeat;background-position-x:100%;background-position-y:calc(50% + 2px)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter{border-color:#cccccc;justify-content:space-between;padding:8px 8px !important;padding-right:5px !important}.control-panel .main-window__control-panel-wrapper .main-window__button--filter span{margin-right:20px;font-size:95%}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img{filter:none;max-width:18px;margin-top:1px;margin-right:0;transition:200ms cubic-bezier(0.23, 1, 0.32, 1)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img path:nth-child(1){transition:200ms cubic-bezier(0.23, 1, 0.32, 1);fill:#333333}@media (max-width: 768px){.control-panel .main-window__control-panel-wrapper{padding-left:15px;padding-right:15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{width:calc(100% + 30px);padding:0 15px;box-sizing:border-box;flex-wrap:nowrap;margin-left:-15px;overflow:auto;white-space:nowrap}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px !important;padding-right:25px !important;padding-left:9px !important;max-width:240px}}\n",""]),module.exports=exports},2834:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2835);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2835:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2838:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/edit.efe0dc2a.svg"},2850:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/ok.2ad21b54.svg"},2921:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"d",(function(){return getLTDList})),__webpack_require__.d(__webpack_exports__,"c",(function(){return getLTDById})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addLTD})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteLTD}));__webpack_require__(35);var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(10),axios__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(256),axios__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);function getLTDList(){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/plc/"),headers)}function getLTDById(id){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/plc/").concat(id),headers)}function addLTD(newLtd){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/plc/"),newLtd,headers)}function deleteLTD(id){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.a)();return axios__WEBPACK_IMPORTED_MODULE_2___default.a.delete("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL,"/api/v1/plc/").concat(id),headers)}},3034:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(50),__webpack_require__(159);var react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),Utils_TableView_TableActions_TableActions_jsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1011),Utils_TableView_TableActions_Actions_DeleteItemAction_jsx__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(664),Assets_tableview_edit_svg__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2838),Assets_tableview_edit_svg__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(Assets_tableview_edit_svg__WEBPACK_IMPORTED_MODULE_5__),Assets_tableview_ok_svg__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2850),Assets_tableview_ok_svg__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(Assets_tableview_ok_svg__WEBPACK_IMPORTED_MODULE_6__),Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(2831),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(3035),__webpack_require__(1)),TableView=function TableView(_ref){var data=_ref.data,deleteItem=_ref.deleteItem,userHasAccess=_ref.userHasAccess,_ref$onSelect=_ref.onSelect,onSelect=void 0!==_ref$onSelect&&_ref$onSelect,_ref$isLoading=_ref.isLoading,isLoading=void 0!==_ref$isLoading&&_ref$isLoading,setShowWindow=_ref.setShowWindow,selectedLtd=_ref.selectedLtd;return Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){setShowWindow&&setShowWindow(!1)}),[selectedLtd]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"ltd-tableview",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"main-window__list main-window__list--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"main-window__list-item main-window__list-item--header",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{children:"Название"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{children:"Адрес"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{children:"ИНН"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"main-window__table-actions"})]}),isLoading?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_7__.a,{itemClassName:"main-window__list-item",minHeight:"30px",items:3}):data.map((function(item){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"main-window__list-item",onClick:onSelect?function(){return onSelect(item)}:null,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{children:item.name}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{children:item.legalAddress}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{children:item.inn}),onSelect?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"main-window__table-actions",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img",{onClick:function onClick(){return onSelect(item)},className:"main-window__img",src:Assets_tableview_ok_svg__WEBPACK_IMPORTED_MODULE_6___default.a})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(Utils_TableView_TableActions_TableActions_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{actionsList:[{title:"Редактирование",link:"/ltd-list/edit/".concat(item.id),imgSrc:Assets_tableview_edit_svg__WEBPACK_IMPORTED_MODULE_5___default.a,isRendered:userHasAccess(["ROLE_ADMIN","ROLE_MANAGER"])},{customElement:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(Utils_TableView_TableActions_Actions_DeleteItemAction_jsx__WEBPACK_IMPORTED_MODULE_4__.a,{title:"Удаление заявки",onClick:function onClick(){return deleteItem(item.id)}}),isRendered:!!deleteItem&&userHasAccess(["ROLE_ADMIN"])}]})]},item.id)}))]})})};TableView.displayName="TableView",TableView.__docgenInfo={description:"",methods:[],displayName:"TableView",props:{onSelect:{defaultValue:{value:"false",computed:!1},required:!1},isLoading:{defaultValue:{value:"false",computed:!1},required:!1}}},__webpack_exports__.a=TableView,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/PriceList/LtdListPage/TableView/TableView.jsx"]={name:"TableView",docgenInfo:TableView.__docgenInfo,path:"src/components/MainPage/PriceList/LtdListPage/TableView/TableView.jsx"})},3035:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3036);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3036:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,".ltd-tableview{width:100%}.ltd-tableview .main-window__list-item:not(.main-window__list-item--header){cursor:pointer}.ltd-tableview .main-window__list-item:not(.main-window__list-item--header) span{padding-top:15px;padding-bottom:15px}.ltd-tableview .main-window__list-item span:nth-child(1){flex:0 1 20%}.ltd-tableview .main-window__list-item span:nth-child(2){flex:0 1 40%}.ltd-tableview .main-window__list-item span:nth-child(3){flex:0 1 10%}\n",""]),module.exports=exports},3521:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(255),__webpack_require__(159),__webpack_require__(657),__webpack_require__(658),__webpack_require__(79),__webpack_require__(465),__webpack_require__(197),__webpack_require__(0)),Utils_hooks_usePagination_usePagination_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(1019),Utils_hooks_useSort_useSort_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1012),Utils_MainWindow_FloatingButton_FloatingButton_jsx__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(662),Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(2830),API_PriceList_lts_list_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(2921),_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(348),_App_js__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(132),_TableView_TableView_jsx__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(3034),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__=(__webpack_require__(3522),__webpack_require__(1)),LtdListPage=function LtdListPage(){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_9__.useState)(""),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),searchQuery=_useState2[0],setSearchQuery=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_9__.useState)([]),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),ltdData=_useState4[0],setLtdData=_useState4[1],userContext=Object(react__WEBPACK_IMPORTED_MODULE_9__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_16__.a),_useState5=Object(react__WEBPACK_IMPORTED_MODULE_9__.useState)(!0),_useState6=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5,2),isLoading=_useState6[0],setIsLoading=_useState6[1],_useSort=Object(Utils_hooks_useSort_useSort_js__WEBPACK_IMPORTED_MODULE_11__.a)(ltdData,{sortOrder:{curSort:"name",name:"asc"},sortOptions:[{value:"name asc",text:"По названию (А-Я)"},{value:"name desc",text:"По названию (Я-А)"}],ignoreURL:!1},[ltdData]),sortPanel=_useSort.sortPanel,sortedData=_useSort.sortedData,sortOrder=_useSort.sortOrder,_usePagination=Object(Utils_hooks_usePagination_usePagination_js__WEBPACK_IMPORTED_MODULE_10__.a)((function(){return filterSearchQuery(sortedData)}),[searchQuery,sortOrder,sortedData],"static"),pagination=_usePagination.pagination,data=_usePagination.data,filterSearchQuery=function filterSearchQuery(data){var query=searchQuery.toLowerCase();return data.filter((function(item){var _item$name,_item$inn,_item$kpp;return(null===(_item$name=item.name)||void 0===_item$name?void 0:_item$name.toLowerCase().includes(query))||(null===(_item$inn=item.inn)||void 0===_item$inn?void 0:_item$inn.toLowerCase().includes(query))||(null===(_item$kpp=item.kpp)||void 0===_item$kpp?void 0:_item$kpp.toLowerCase().includes(query))||item.id.toString().includes(query)}))};Object(react__WEBPACK_IMPORTED_MODULE_9__.useEffect)((function(){document.title="Список ООО",loadLTDList()}),[]);var loadLTDList=function loadLTDList(){Object(API_PriceList_lts_list_js__WEBPACK_IMPORTED_MODULE_14__.d)().then((function(res){setLtdData(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(res.data)),setIsLoading(!1)})).catch((function(error){setIsLoading(!1),console.log(error)}))};return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div",{className:"ltd-list",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div",{className:"main-window",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div",{className:"main-window__header main-window__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div",{className:"main-window__title",children:"Список ООО"})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(Utils_MainWindow_FloatingButton_FloatingButton_jsx__WEBPACK_IMPORTED_MODULE_12__.a,{visibility:["ROLE_ADMIN","ROLE_MANAGER"],linkTo:"/ltd-list/new"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_15__.a,{fullSize:!0,placeholder:"Введите название продукции для поиска...",setSearchQuery:setSearchQuery}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_13__.a,{sorting:sortPanel,itemsCount:"Всего: ".concat(ltdData.length," записей")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_TableView_TableView_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{data:data,deleteItem:function deleteItem(id){Object(API_PriceList_lts_list_js__WEBPACK_IMPORTED_MODULE_14__.b)(id).then((function(){return loadLTDList()}))},userHasAccess:userContext.userHasAccess,isLoading:isLoading}),pagination]})})};LtdListPage.displayName="LtdListPage",LtdListPage.__docgenInfo={description:"",methods:[],displayName:"LtdListPage"},__webpack_exports__.default=LtdListPage,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/PriceList/LtdListPage/LtdListPage.jsx"]={name:"LtdListPage",docgenInfo:LtdListPage.__docgenInfo,path:"src/components/MainPage/PriceList/LtdListPage/LtdListPage.jsx"})},3522:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3523);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3523:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,"",""]),module.exports=exports}}]);