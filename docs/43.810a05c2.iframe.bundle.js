(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{2837:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(21),$reduce=__webpack_require__(2844).left,arrayMethodIsStrict=__webpack_require__(659),CHROME_VERSION=__webpack_require__(466),IS_NODE=__webpack_require__(465);$({target:"Array",proto:!0,forced:!arrayMethodIsStrict("reduce")||!IS_NODE&&CHROME_VERSION>79&&CHROME_VERSION<83},{reduce:function reduce(callbackfn){return $reduce(this,callbackfn,arguments.length,arguments.length>1?arguments[1]:void 0)}})},2844:function(module,exports,__webpack_require__){var aFunction=__webpack_require__(298),toObject=__webpack_require__(162),IndexedObject=__webpack_require__(660),toLength=__webpack_require__(161),createMethod=function(IS_RIGHT){return function(that,callbackfn,argumentsLength,memo){aFunction(callbackfn);var O=toObject(that),self=IndexedObject(O),length=toLength(O.length),index=IS_RIGHT?length-1:0,i=IS_RIGHT?-1:1;if(argumentsLength<2)for(;;){if(index in self){memo=self[index],index+=i;break}if(index+=i,IS_RIGHT?index<0:length<=index)throw TypeError("Reduce of empty array with no initial value")}for(;IS_RIGHT?index>=0:length>index;index+=i)index in self&&(memo=callbackfn(memo,self[index],index,O));return memo}};module.exports={left:createMethod(!1),right:createMethod(!0)}},2858:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(35);var prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(2859),__webpack_require__(44)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),Widget=function Widget(_ref){var _ref$title=_ref.title,title=void 0===_ref$title?"":_ref$title,_ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$content=_ref.content,content=void 0===_ref$content?null:_ref$content,linkTo=_ref.linkTo,_ref$subTitle=_ref.subTitle,subTitle=void 0===_ref$subTitle?"":_ref$subTitle,_ref$customHeader=_ref.customHeader,customHeader=void 0===_ref$customHeader?null:_ref$customHeader,_ref$miniWidget=_ref.miniWidget,miniWidget=void 0!==_ref$miniWidget&&_ref$miniWidget,_ref$icon=_ref.icon,icon=void 0===_ref$icon?null:_ref$icon;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget ".concat(null!=className?className:""," ").concat(miniWidget?"widget--mini":""),children:[null!=customHeader?customHeader:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget__title",children:[!miniWidget&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__sub-title",children:subTitle}),linkTo?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.a,{to:linkTo.address,title:linkTo.text,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__content",children:content})]})};Widget.displayName="Widget",Widget.__docgenInfo={description:"",methods:[],displayName:"Widget",props:{title:{defaultValue:{value:"''",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},content:{defaultValue:{value:"null",computed:!1},required:!1},subTitle:{defaultValue:{value:"''",computed:!1},required:!1},customHeader:{defaultValue:{value:"null",computed:!1},required:!1},miniWidget:{defaultValue:{value:"false",computed:!1},required:!1},icon:{defaultValue:{value:"null",computed:!1},required:!1}}},__webpack_exports__.a=Widget,Widget.proptypes={title:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,linkTo:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,subTitle:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,customHeader:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,miniWidget:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,icon:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/GeneralPage/Widget/Widget.jsx"]={name:"Widget",docgenInfo:Widget.__docgenInfo,path:"src/components/MainPage/GeneralPage/Widget/Widget.jsx"})},2859:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2860);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2860:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.widget{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;box-sizing:border-box;position:relative;width:100%;background-color:#fff;border:1px solid #cccccc;border-radius:10px;padding:9px 26px;padding-top:15px;min-width:300px;max-width:600px;max-height:360px;margin-bottom:15px;margin-right:15px}.widget--mini{max-width:none;height:fit-content;max-height:Max(calc(33.33vh - 62px), 120px)}.widget--mini .widget__content{height:fit-content}.widget--mini:last-child{margin-bottom:0}.widget__title{display:flex;flex-direction:row-reverse;justify-content:flex-start;align-items:center;font-size:1.25rem;position:relative;margin-bottom:5px;width:100%}.widget__title .widget__sub-title{font-size:0.9rem;color:#444}.widget__title>a{color:#333;margin-right:auto;transition:100ms ease-in-out;font-weight:500}.widget__title>a:hover{color:#bbb}.widget__title>span{display:flex;align-items:center;margin-right:auto;font-weight:500}.widget__title>span .main-window__img{filter:none !important}.widget__content{width:100%;height:100%;overflow-y:auto;box-sizing:border-box;padding-right:4px}.widget__content::-webkit-scrollbar-track,.widget__content *::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar,.widget__content *::-webkit-scrollbar{width:8px;border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar-thumb,.widget__content *::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:#ddd}@media (max-width: 1350px){.widget{max-width:500px}}@media (max-width: 768px){.widget{max-width:100%;width:100%;margin-right:0;padding:15px 20px;padding-bottom:10px}}@media (max-width: 500px){.widget{max-height:calc(360px + 50px)}.widget__title{margin-top:2px;position:initial}.widget__title .main-window__button{position:absolute;margin-top:0;bottom:9px;left:20px}}\n",""]),module.exports=exports},2877:function(module,__webpack_exports__,__webpack_require__){"use strict";var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(2878),__webpack_require__(1)),TableLoading=function TableLoading(_ref){var isLoading=_ref.isLoading;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"table-loading ".concat(isLoading?"":"table-loading--hidden"),children:isLoading&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"table-loading__circle"})})};TableLoading.displayName="TableLoading",TableLoading.__docgenInfo={description:"",methods:[],displayName:"TableLoading",props:{isLoading:{type:{name:"bool"},required:!1,description:""}}},__webpack_exports__.a=TableLoading,TableLoading.propTypes={isLoading:prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/TableView/TableLoading/TableLoading.jsx"]={name:"TableLoading",docgenInfo:TableLoading.__docgenInfo,path:"src/utils/TableView/TableLoading/TableLoading.jsx"})},2878:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2879);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2879:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.table-loading{background-color:rgba(255,255,255,0.4);position:absolute;top:0;left:0;width:100%;height:100%;min-height:200px;z-index:1;border-radius:5px}.table-loading--hidden{width:0;height:0}.table-loading__circle{display:block;position:absolute;top:50%;left:50%;height:50px;width:50px;margin:-25px 0 0 -25px;border:4px rgba(70,93,102,0.2) solid;border-top:4px rgba(70,93,102,0.5) solid;border-radius:50%;-webkit-animation:spin4 1s infinite linear;animation:spin4 1s infinite linear}@-webkit-keyframes spin4{from{-webkit-transform:rotate(359deg);transform:rotate(359deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes spin4{from{-webkit-transform:rotate(359deg);transform:rotate(359deg);-webkit-transform:rotate(359deg);transform:rotate(359deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg);-webkit-transform:rotate(0deg);transform:rotate(0deg)}}\n",""]),module.exports=exports},3564:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3565);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3565:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.graph-widget{min-height:298px}.graph-widget__date{color:#777777;font-size:0.8rem;width:100%;text-align:left}.graph-widget__button{padding:5px 10px;font-size:0.85rem;white-space:nowrap}.graph-widget__button:first-child{margin-left:auto;margin-right:0}.graph-widget__button:last-child{margin-right:0}.graph-widget__header{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;width:100%;margin-bottom:10px}.graph-widget__header .graph-widget__title{font-size:20px;text-align:center;display:flex;flex-wrap:wrap;align-items:center;margin-right:auto;width:fit-content;transition:100ms ease-in-out;font-weight:500}.graph-widget__header .graph-widget__title span{font-weight:400}.graph-widget__chart-wrapper--placeholder .graph-widget__loading-panel{height:250px;width:100%;border-radius:5px;animation:pulse 1s infinite ease-in-out;margin-bottom:10px}.graph-widget__chart-wrapper .graph-widget__chart{height:100%;min-height:225px;max-height:300px}@media (max-width: 768px){.graph-widget{max-height:fit-content}.graph-widget__chart-wrapper .graph-widget__header .graph-widget__button{padding:5px 5px}.graph-widget .main-window__mobile-text{display:none}}@media (max-width: 500px){.graph-widget{padding-bottom:50px}.graph-widget__header{justify-content:flex-end;justify-content:center;position:absolute;bottom:10px;left:0}.graph-widget__header .graph-widget__title{display:none}.graph-widget .main-window__mobile-text{display:flex !important;width:100%;margin:0;font-size:120%;flex-wrap:wrap;margin-bottom:5px;font-weight:500}.graph-widget .main-window__mobile-text span{font-weight:normal}.graph-widget__chart-wrapper{width:100%;padding:5px 0px;padding-top:15px;padding-bottom:10px;max-height:380px}.graph-widget__chart-wrapper .graph-widget__chart{max-height:300px}}\n",""]),module.exports=exports},3598:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var toConsumableArray=__webpack_require__(18),toConsumableArray_default=__webpack_require__.n(toConsumableArray),slicedToArray=__webpack_require__(7),slicedToArray_default=__webpack_require__.n(slicedToArray),react=(__webpack_require__(50),__webpack_require__(462),__webpack_require__(26),__webpack_require__(2837),__webpack_require__(196),__webpack_require__(1013),__webpack_require__(0)),functions=__webpack_require__(61),TableLoading=__webpack_require__(2877),Button=__webpack_require__(197),work_control=__webpack_require__(467),graphs=__webpack_require__(994),App=__webpack_require__(131),getDateFromWeekdayIndex=(__webpack_require__(3564),function getDateFromWeekdayIndex(dayIndex,weekOffset){return new Date((new Date).setDate((new Date).getDate()+-7*weekOffset-new Date((new Date).setDate((new Date).getDate()+-7*weekOffset)).getDay()+dayIndex))}),workshopsDefaultValue=[{label:"ЦехЛЭМЗ",backgroundColor:"#1b4e6bbb",data:[],borderWidth:1},{label:"ЦехЛепсари",backgroundColor:"#5c63a2bb",data:[],borderWidth:1},{label:"ЦехЛиговский",backgroundColor:"#c068a8bb",data:[],borderWidth:1},{label:"Офис",backgroundColor:"#ec7176bb",data:[],borderWidth:1}],weekdays=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],graphOptions={cornerRadius:2.5,fullCornerRadius:!1,responsive:!0,maintainAspectRatio:(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>500,animation:{easing:"easeInOutCirc"},tooltips:{mode:"index"},legend:{position:(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>500?"right":"bottom",labels:{usePointStyle:!0}},scales:{yAxes:[{gridLines:{display:!1},ticks:{display:!((window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>500),beginAtZero:!0},stacked:!0,scaleLabel:{display:!1,labelString:"Часы",fontStyle:"italic"}}],xAxes:[{gridLines:{display:!1},ticks:{display:(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>500},maxBarThickness:80,stacked:!0,scaleLabel:{display:!1,labelString:"Дни недели",fontStyle:"italic"}}]}},Widget=__webpack_require__(2858),jsx_runtime=__webpack_require__(1),GraphWidget_GraphWidget_GraphWidget=function GraphWidget(){var _useState=Object(react.useState)(0),_useState2=slicedToArray_default()(_useState,2),weekOffset=_useState2[0],setWeekOffset=_useState2[1],_useState3=Object(react.useState)(null),_useState4=slicedToArray_default()(_useState3,2),graph=_useState4[0],setGraph=_useState4[1],_useState5=Object(react.useState)(!1),_useState6=slicedToArray_default()(_useState5,2),isLoading=_useState6[0],setIsLoading=_useState6[1],_useState7=Object(react.useState)(!1),_useState8=slicedToArray_default()(_useState7,2),canvasLoaded=_useState8[0],setCanvasLoaded=_useState8[1],userContext=Object(react.useContext)(App.a),_useState9=Object(react.useState)(workshopsDefaultValue),workshops=slicedToArray_default()(_useState9,1)[0];return Object(react.useEffect)((function(){var abortController=new AbortController,week=function getWeekdaysListWithOffset(){for(var offset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,curDay=new Date((new Date).setDate((new Date).getDate()+-7*offset)),week=[],i=1;i<=(0===offset?0===(new Date).getDay()?7:(new Date).getDay():7);i++){var first=curDay.getDate()-curDay.getDay()+i,day=new Date(curDay.setDate(first));week.push(day)}return week}(weekOffset);return workshops.map((function(workshop,index){workshops.splice(index,1,Object.assign({},workshop,{data:[]}))})),setIsLoading(!0),Object(work_control.h)(week[0].getDate(),week[0].getMonth()+1,week[0].getFullYear(),week[week.length-1].getDate(),week[week.length-1].getMonth()+1,week[week.length-1].getFullYear(),abortController.signal).then((function(res){return res.json()})).then((function(res){if(week.map((function(day){return workshops.map((function(workshop,index){var temp=workshops,oldData=workshop.data;return oldData.push(res.reduce((function(sum,cur){return workshop.label===cur.employee.workshop&&new Date(day).getDate()===new Date(cur.year,cur.month-1,cur.day).getDate()?Math.ceil(10*(sum+cur.hours))/10:sum}),0)),temp.splice(index,1,Object.assign({},workshop,{data:oldData}))}))})),console.log(workshops),userContext.userHasAccess(["ROLE_ADMIN"])){!canvasLoaded&&Object(graphs.b)("graph-widget__chart-wrapper","graph-widget__chart"),setCanvasLoaded(!0);var options={type:(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>500?"bar":"horizontalBar",data:{labels:toConsumableArray_default()(week.map((function(day,index){return weekdays[index]}))),datasets:toConsumableArray_default()(workshops)},options:graphOptions};setTimeout((function(){setIsLoading(!1),canvasLoaded&&graph.destroy(),setGraph(Object(graphs.a)(options))}),150)}})),function cancel(){abortController.abort()}}),[weekOffset,workshops]),Object(jsx_runtime.jsx)(Widget.a,{className:"graph-widget",customHeader:Object(jsx_runtime.jsxs)("div",{className:"graph-widget__header",children:[Object(jsx_runtime.jsxs)("div",{className:"graph-widget__title",children:[Object(jsx_runtime.jsx)("span",{className:"graph-widget__date",children:Object(functions.h)(getDateFromWeekdayIndex(1,weekOffset))+" - "+Object(functions.h)(getDateFromWeekdayIndex(7,weekOffset))}),"Сводка за неделю"]}),Object(jsx_runtime.jsx)(Button.a,{text:"Пред. неделя",className:"graph-widget__button",isLoading:0!==weekOffset&&isLoading,onClick:function onClick(){return setWeekOffset(weekOffset+1)},inverted:!0}),Object(jsx_runtime.jsx)(Button.a,{text:"Тек. неделя",className:"graph-widget__button",isLoading:0===weekOffset&&isLoading,onClick:function onClick(){return setWeekOffset(0)},inverted:!0})]}),content:Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[Object(jsx_runtime.jsxs)("div",{className:"main-window__mobile-text",children:[Object(jsx_runtime.jsx)("span",{className:"graph-widget__date",children:Object(functions.h)(getDateFromWeekdayIndex(1,weekOffset))+" - "+Object(functions.h)(getDateFromWeekdayIndex(7,weekOffset))}),"Сводка за неделю"]}),Object(jsx_runtime.jsx)(TableLoading.a,{isLoading:isLoading}),Object(jsx_runtime.jsx)("div",{className:"graph-widget__chart-wrapper"})]})})};GraphWidget_GraphWidget_GraphWidget.displayName="GraphWidget",GraphWidget_GraphWidget_GraphWidget.__docgenInfo={description:"",methods:[],displayName:"GraphWidget"};__webpack_exports__.default=GraphWidget_GraphWidget_GraphWidget;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/GeneralPage/GraphWidget/GraphWidget.jsx"]={name:"GraphWidget",docgenInfo:GraphWidget_GraphWidget_GraphWidget.__docgenInfo,path:"src/components/MainPage/GeneralPage/GraphWidget/GraphWidget.jsx"})}}]);