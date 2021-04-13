(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{2837:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(23),__webpack_require__(35),__webpack_require__(50),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2839),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"})},2839:function(module,exports,__webpack_require__){var api=__webpack_require__(44),content=__webpack_require__(2840);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2840:function(module,exports,__webpack_require__){(exports=__webpack_require__(45)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2858:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(35);var prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(2859),__webpack_require__(46)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),Widget=function Widget(_ref){var _ref$title=_ref.title,title=void 0===_ref$title?"":_ref$title,_ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$content=_ref.content,content=void 0===_ref$content?null:_ref$content,linkTo=_ref.linkTo,_ref$subTitle=_ref.subTitle,subTitle=void 0===_ref$subTitle?"":_ref$subTitle,_ref$customHeader=_ref.customHeader,customHeader=void 0===_ref$customHeader?null:_ref$customHeader,_ref$miniWidget=_ref.miniWidget,miniWidget=void 0!==_ref$miniWidget&&_ref$miniWidget,_ref$icon=_ref.icon,icon=void 0===_ref$icon?null:_ref$icon;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget ".concat(null!=className?className:""," ").concat(miniWidget?"widget--mini":""),children:[null!=customHeader?customHeader:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget__title",children:[!miniWidget&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__sub-title",children:subTitle}),linkTo?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.a,{to:linkTo.address,title:linkTo.text,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__content",children:content})]})};Widget.displayName="Widget",Widget.__docgenInfo={description:"",methods:[],displayName:"Widget",props:{title:{defaultValue:{value:"''",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},content:{defaultValue:{value:"null",computed:!1},required:!1},subTitle:{defaultValue:{value:"''",computed:!1},required:!1},customHeader:{defaultValue:{value:"null",computed:!1},required:!1},miniWidget:{defaultValue:{value:"false",computed:!1},required:!1},icon:{defaultValue:{value:"null",computed:!1},required:!1}}},__webpack_exports__.a=Widget,Widget.proptypes={title:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,linkTo:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,subTitle:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,customHeader:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,miniWidget:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,icon:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/GeneralPage/Widget/Widget.jsx"]={name:"Widget",docgenInfo:Widget.__docgenInfo,path:"src/components/MainPage/GeneralPage/Widget/Widget.jsx"})},2859:function(module,exports,__webpack_require__){var api=__webpack_require__(44),content=__webpack_require__(2860);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2860:function(module,exports,__webpack_require__){(exports=__webpack_require__(45)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.widget{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;box-sizing:border-box;position:relative;width:100%;background-color:#fff;border:1px solid #ddd;border-radius:10px;padding:9px 26px;padding-top:15px;min-width:300px;max-width:600px;max-height:360px;margin-bottom:15px;margin-right:15px}.widget--mini{max-width:none;height:fit-content;max-height:Max(calc(33.33vh - 62px), 120px)}.widget--mini .widget__content{height:fit-content}.widget--mini:last-child{margin-bottom:0}.widget__title{display:flex;flex-direction:row-reverse;justify-content:flex-start;align-items:center;font-size:1.25rem;position:relative;margin-bottom:5px;width:100%}.widget__title .widget__sub-title{font-size:0.9rem;color:#444}.widget__title>a{color:#333;margin-right:auto;transition:100ms ease-in-out;font-weight:500}.widget__title>a:hover{color:#bbb}.widget__title>span{display:flex;align-items:center;margin-right:auto;font-weight:500}.widget__title>span .main-window__img{filter:none !important}.widget__content{width:100%;height:100%;overflow-y:auto;box-sizing:border-box;padding-right:4px}.widget__content::-webkit-scrollbar-track,.widget__content *::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar,.widget__content *::-webkit-scrollbar{width:8px;border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar-thumb,.widget__content *::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:#ddd}@media (max-width: 1350px){.widget{max-width:500px}}@media (max-width: 768px){.widget{max-width:100%;width:100%;margin-right:0;padding:15px 20px;padding-bottom:10px}}@media (max-width: 500px){.widget{max-height:calc(360px + 50px)}.widget__title{margin-top:2px;position:initial}.widget__title .main-window__button{position:absolute;margin-top:0;bottom:9px;left:20px}}\n",""]),module.exports=exports},2887:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return getPreviousQuarterDates})),__webpack_require__.d(__webpack_exports__,"b",(function(){return getPreviousMonthDates})),__webpack_require__.d(__webpack_exports__,"a",(function(){return getDaysArray}));__webpack_require__(198);var getPreviousQuarterDates=function getPreviousQuarterDates(date,value){var startDate,endDate,today=date,quarter=Math.floor(today.getMonth()/3);switch(value){case"current":startDate=new Date(today.getFullYear(),3*quarter,1),endDate=new Date(startDate.getFullYear(),startDate.getMonth()+3,0);break;default:startDate=new Date(today.getFullYear(),3*quarter-3,1),endDate=new Date(startDate.getFullYear(),startDate.getMonth()+3,0)}return{startDate:startDate,endDate:endDate}},getPreviousMonthDates=function getPreviousMonthDates(date,value){var startDate,endDate,today=date,month=today.getMonth();switch(value){case"current":startDate=new Date(today.getFullYear(),month,1),endDate=new Date(startDate.getFullYear(),startDate.getMonth()+1,0);break;default:startDate=new Date(today.getFullYear(),month-1,1),endDate=new Date(startDate.getFullYear(),startDate.getMonth()+1,0)}return{startDate:startDate,endDate:endDate}},getDaysArray=function getDaysArray(start,end){for(var arr=[],dt=new Date(start);dt<=end;dt.setDate(dt.getDate()+1))arr.push(new Date(dt));return arr}},3550:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),_Widget_Widget_jsx__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__(198),__webpack_require__(35),__webpack_require__(255),__webpack_require__(50),__webpack_require__(162),__webpack_require__(3551),__webpack_require__(2858)),react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(0),_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(1009),Utils_helpers_time_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(2887),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(61),Utils_hooks_useRequestsData__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(1054),Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(2837),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(1),StatisticsWidget=function StatisticsWidget(){var _useRequestsData=Object(Utils_hooks_useRequestsData__WEBPACK_IMPORTED_MODULE_13__.a)(),requests=_useRequestsData.requests,isLoading=_useRequestsData.isLoading,_useState=Object(react__WEBPACK_IMPORTED_MODULE_9__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),statistics=_useState2[0],setStatistics=_useState2[1],getRequestsQuantity=Object(react__WEBPACK_IMPORTED_MODULE_9__.useCallback)((function(prevDate,curDate,periods){if(0===requests.length)return null;var _getRequestQuantitySt=Object(_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__.g)(requests,{startDate:curDate.startDate,endDate:curDate.endDate},{startDate:prevDate.startDate,endDate:prevDate.endDate}),_getRequestQuantitySt2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_getRequestQuantitySt,2),prevPeriodQuantity=_getRequestQuantitySt2[0],curPeriodQuantity=_getRequestQuantitySt2[1];return{name:"Заказы",prevPeriod:{name:periods.prevPeriod,value:"".concat(prevPeriodQuantity," зак.")},curPeriod:{name:periods.curPeriod,value:"".concat(curPeriodQuantity," зак.")},difference:Object(_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__.c)(prevPeriodQuantity,curPeriodQuantity)}}),[requests]),getRequestsIncome=Object(react__WEBPACK_IMPORTED_MODULE_9__.useCallback)((function(prevDate,curDate,periods){if(0===requests.length)return null;var _getRequestIncomeStat=Object(_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__.f)(requests,{startDate:curDate.startDate,endDate:curDate.endDate},{startDate:prevDate.startDate,endDate:prevDate.endDate}),_getRequestIncomeStat2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_getRequestIncomeStat,2),prevPeriodQuantity=_getRequestIncomeStat2[0],curPeriodQuantity=_getRequestIncomeStat2[1];return{name:"Доход",prevPeriod:{name:periods.prevPeriod,value:"".concat(Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_12__.a)(prevPeriodQuantity)," ₽")},curPeriod:{name:periods.curPeriod,value:"".concat(Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_12__.a)(curPeriodQuantity)," ₽")},difference:Object(_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__.c)(prevPeriodQuantity,curPeriodQuantity)}}),[requests]);return Object(react__WEBPACK_IMPORTED_MODULE_9__.useEffect)((function(){0!==requests.length&&function getAllStats(){var statsList=[],curDateWeek=Object(_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__.d)(new Date,"current"),prevDateWeek=Object(_StatisticsPage_functions__WEBPACK_IMPORTED_MODULE_10__.d)(new Date),curDateMonth=Object(Utils_helpers_time_js__WEBPACK_IMPORTED_MODULE_11__.b)(new Date,"current"),prevDateMonth=Object(Utils_helpers_time_js__WEBPACK_IMPORTED_MODULE_11__.b)(new Date);statsList.push(getRequestsQuantity(prevDateWeek,curDateWeek,{prevPeriod:"Пред. неделя",curPeriod:"Тек. неделя"})),statsList.push(getRequestsQuantity(prevDateMonth,curDateMonth,{prevPeriod:"Пред. месяц",curPeriod:"Тек. месяц"})),statsList.push(getRequestsIncome(prevDateMonth,curDateMonth,{prevPeriod:"Пред. месяц",curPeriod:"Тек. месяц"})),setStatistics((function(statistics){return[].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(statistics),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(statsList.filter((function(stat){return null!==stat&&stat}))))}))}()}),[requests]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_Widget_Widget_jsx__WEBPACK_IMPORTED_MODULE_8__.a,{className:"statistics-widget",title:"Статистика",subTitle:"Эта неделя",miniWidget:!0,linkTo:{address:"/statistics",text:"Перейти"},content:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(StatisticsList,{statistics:statistics,isLoading:isLoading})})};StatisticsWidget.displayName="StatisticsWidget",StatisticsWidget.__docgenInfo={description:"",methods:[],displayName:"StatisticsWidget"},__webpack_exports__.default=StatisticsWidget;var StatisticsList=function StatisticsList(_ref){var statistics=_ref.statistics,isLoading=_ref.isLoading;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div",{className:"statistics-widget__list",children:isLoading||0===statistics.length?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_14__.a,{}):statistics.map((function(_ref2){var name=_ref2.name,prevPeriod=_ref2.prevPeriod,curPeriod=_ref2.curPeriod,difference=_ref2.difference;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div",{className:"statistics-widget__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div",{className:"list__item list__item--name",children:name}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div",{className:"list__item list__item--period",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span",{children:prevPeriod.name}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span",{children:"vs."}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span",{children:curPeriod.name})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div",{className:"list__item list__item--value",children:prevPeriod.value}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div",{className:"list__item list__item--value",children:curPeriod.value}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div",{className:"list__item list__item--difference list__item--".concat(difference>=0?"positive":"negative"),children:"".concat(difference,"%")})]},name)}))})};StatisticsList.displayName="StatisticsList","undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/GeneralPage/StatisticsWidget/StatisticsWidget.jsx"]={name:"StatisticsWidget",docgenInfo:StatisticsWidget.__docgenInfo,path:"src/components/MainPage/GeneralPage/StatisticsWidget/StatisticsWidget.jsx"})},3551:function(module,exports,__webpack_require__){var api=__webpack_require__(44),content=__webpack_require__(3552);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3552:function(module,exports,__webpack_require__){(exports=__webpack_require__(45)(!1)).push([module.i,'.statistics-widget{font-size:1rem}.statistics-widget .widget__content{padding-right:0}.statistics-widget__list{display:flex;flex-direction:column;padding-right:4px;padding-bottom:5px}.statistics-widget__list .placeholder-loading__item{border:1px solid #ddd}.statistics-widget__list .placeholder-loading__item:not(:last-child){border-bottom-color:transparent}.statistics-widget__list .placeholder-loading__item:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.statistics-widget__list .placeholder-loading__item:last-child{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.statistics-widget__list .statistics-widget__item{display:flex;justify-content:flex-start;align-items:center;width:100%;font-size:0.9rem;color:#555}.statistics-widget__list .statistics-widget__item:not(:last-child){margin-bottom:5px}.statistics-widget__list .statistics-widget__item .list__item{flex:0 1 17.5%}.statistics-widget__list .statistics-widget__item .list__item:not(:last-child){margin-right:10px}.statistics-widget__list .statistics-widget__item .list__item--name{width:100%;flex:auto;max-width:60px}.statistics-widget__list .statistics-widget__item .list__item--period{flex:30%;white-space:nowrap;font-size:0.8rem}.statistics-widget__list .statistics-widget__item .list__item--period span:not(:last-child){margin-right:5px}.statistics-widget__list .statistics-widget__item .list__item--period span:not(:nth-child(2)){color:#247fa7}.statistics-widget__list .statistics-widget__item .list__item--value{white-space:nowrap;flex:0 1 50px;max-height:50px;color:#777;font-size:0.8rem}.statistics-widget__list .statistics-widget__item .list__item--difference{position:relative;padding-left:15px;text-align:left;min-width:50px;max-width:70px}.statistics-widget__list .statistics-widget__item .list__item--difference::before{content:"";position:absolute;left:0;top:calc(50% - 3px);border:6px solid transparent;border-top-color:#ccc}.statistics-widget__list .statistics-widget__item .list__item--positive{color:#0acf97}.statistics-widget__list .statistics-widget__item .list__item--positive::before{border-top-color:transparent;border-bottom-color:#0acf97;top:calc(50% - 9px)}.statistics-widget__list .statistics-widget__item .list__item--negative{color:#fa5c7c}.statistics-widget__list .statistics-widget__item .list__item--negative::before{border-top-color:#fa5c7c}\n',""]),module.exports=exports}}]);