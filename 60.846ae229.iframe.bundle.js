(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{2549:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(100),__webpack_require__(310),__webpack_require__(263),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2556),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\TableView\\PlaceholderLoading\\PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src\\utils\\TableView\\PlaceholderLoading\\PlaceholderLoading.jsx"})},2556:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2557);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2557:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2573:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(42),DESCRIPTORS=__webpack_require__(101),global=__webpack_require__(35),has=__webpack_require__(131),isObject=__webpack_require__(116),defineProperty=__webpack_require__(132).f,copyConstructorProperties=__webpack_require__(1526),NativeSymbol=global.Symbol;if(DESCRIPTORS&&"function"==typeof NativeSymbol&&(!("description"in NativeSymbol.prototype)||void 0!==NativeSymbol().description)){var EmptyStringDescriptionStore={},SymbolWrapper=function Symbol(){var description=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),result=this instanceof SymbolWrapper?new NativeSymbol(description):void 0===description?NativeSymbol():NativeSymbol(description);return""===description&&(EmptyStringDescriptionStore[result]=!0),result};copyConstructorProperties(SymbolWrapper,NativeSymbol);var symbolPrototype=SymbolWrapper.prototype=NativeSymbol.prototype;symbolPrototype.constructor=SymbolWrapper;var symbolToString=symbolPrototype.toString,native="Symbol(test)"==String(NativeSymbol("test")),regexp=/^Symbol\((.*)\)[^)]+$/;defineProperty(symbolPrototype,"description",{configurable:!0,get:function description(){var symbol=isObject(this)?this.valueOf():this,string=symbolToString.call(symbol);if(has(EmptyStringDescriptionStore,symbol))return"";var desc=native?string.slice(7,-1):string.replace(regexp,"$1");return""===desc?void 0:desc}}),$({global:!0,forced:!0},{Symbol:SymbolWrapper})}},2597:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(310);var prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(2598),__webpack_require__(73)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),Widget=function Widget(_ref){var _ref$title=_ref.title,title=void 0===_ref$title?"":_ref$title,_ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$content=_ref.content,content=void 0===_ref$content?null:_ref$content,linkTo=_ref.linkTo,_ref$subTitle=_ref.subTitle,subTitle=void 0===_ref$subTitle?"":_ref$subTitle,_ref$customHeader=_ref.customHeader,customHeader=void 0===_ref$customHeader?null:_ref$customHeader,_ref$miniWidget=_ref.miniWidget,miniWidget=void 0!==_ref$miniWidget&&_ref$miniWidget,_ref$icon=_ref.icon,icon=void 0===_ref$icon?null:_ref$icon;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget ".concat(null!=className?className:""," ").concat(miniWidget?"widget--mini":""),children:[null!=customHeader?customHeader:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget__title",children:[!miniWidget&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__sub-title",children:subTitle}),linkTo?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.a,{to:linkTo.address,title:linkTo.text,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__content",children:content})]})};Widget.displayName="Widget",Widget.__docgenInfo={description:"",methods:[],displayName:"Widget",props:{title:{defaultValue:{value:"''",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},content:{defaultValue:{value:"null",computed:!1},required:!1},subTitle:{defaultValue:{value:"''",computed:!1},required:!1},customHeader:{defaultValue:{value:"null",computed:!1},required:!1},miniWidget:{defaultValue:{value:"false",computed:!1},required:!1},icon:{defaultValue:{value:"null",computed:!1},required:!1}}},__webpack_exports__.a=Widget,Widget.proptypes={title:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,linkTo:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,subTitle:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,customHeader:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,miniWidget:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,icon:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\GeneralPage\\Widget\\Widget.jsx"]={name:"Widget",docgenInfo:Widget.__docgenInfo,path:"src\\components\\MainPage\\GeneralPage\\Widget\\Widget.jsx"})},2598:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2599);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2599:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.widget{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;box-sizing:border-box;position:relative;width:100%;background-color:#fff;border:1px solid #cccccc;border-radius:10px;padding:9px 26px;padding-top:15px;min-width:300px;max-width:600px;max-height:360px;margin-bottom:15px;margin-right:15px}.widget--mini{max-width:none;height:fit-content;max-height:Max(calc(33.33vh - 62px), 120px)}.widget--mini .widget__content{height:fit-content}.widget--mini:last-child{margin-bottom:0}.widget__title{display:flex;flex-direction:row-reverse;justify-content:flex-start;align-items:center;font-size:1.25rem;position:relative;margin-bottom:5px;width:100%}.widget__title .widget__sub-title{font-size:0.9rem;color:#444}.widget__title>a{color:#333;margin-right:auto;transition:100ms ease-in-out;font-weight:500}.widget__title>a:hover{color:#bbb}.widget__title>span{display:flex;align-items:center;margin-right:auto;font-weight:500}.widget__title>span .main-window__img{filter:none !important}.widget__content{width:100%;height:100%;overflow-y:auto;box-sizing:border-box;padding-right:4px}.widget__content::-webkit-scrollbar-track,.widget__content *::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar,.widget__content *::-webkit-scrollbar{width:8px;border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar-thumb,.widget__content *::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:#ddd}@media (max-width: 1350px){.widget{max-width:500px}}@media (max-width: 768px){.widget{max-width:100%;width:100%;margin-right:0;padding:15px 20px;padding-bottom:10px}}@media (max-width: 500px){.widget{max-height:calc(360px + 50px)}.widget__title{margin-top:2px;position:initial}.widget__title .main-window__button{position:absolute;margin-top:0;bottom:9px;left:20px}}\n",""]),module.exports=exports},3565:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(419),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),_Widget_Widget_jsx__WEBPACK_IMPORTED_MODULE_13__=(__webpack_require__(945),__webpack_require__(944),__webpack_require__(1522),__webpack_require__(263),__webpack_require__(1525),__webpack_require__(2573),__webpack_require__(946),__webpack_require__(948),__webpack_require__(1520),__webpack_require__(604),__webpack_require__(3566),__webpack_require__(2597)),react__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(0),axios__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(2582),axios__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_15__),Utils_sorting_sorting_js__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(2559),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(2546),Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(2549),_App_js__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(420),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(1),UpdateLogWidget=function UpdateLogWidget(){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_14__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),updatesList=_useState2[0],setUpdatesList=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_14__.useState)(!0),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],userHasAccess=Object(react__WEBPACK_IMPORTED_MODULE_14__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_19__.a).userHasAccess,visibilityItems={all:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_DISPATCHER","ROLE_MANAGER","ROLE_ENGINEER"],hidden:[],admin:["ROLE_ADMIN"],manager:["ROLE_ADMIN","ROLE_MANAGER"],workshop:["ROLE_ADMIN","ROLE_WORKSHOP"],dispatcher:["ROLE_ADMIN","ROLE_DISPATCHER"],engineer:["ROLE_ADMIN","ROLE_ENGINEER"]};return Object(react__WEBPACK_IMPORTED_MODULE_14__.useEffect)((function(){return function getUpdateLogList(){return axios__WEBPACK_IMPORTED_MODULE_15___default.a.get("https://firestore.googleapis.com/v1/projects/osfixupdatelog/databases/(default)/documents/updates/").then((function(_ref){var documents=_ref.data.documents,sortedByDate=Object(Utils_sorting_sorting_js__WEBPACK_IMPORTED_MODULE_16__.a)(documents.filter((function(document){var _document$fields,_document$fields$visi;return userHasAccess(visibilityItems[null==document||null===(_document$fields=document.fields)||void 0===_document$fields||null===(_document$fields$visi=_document$fields.visibility)||void 0===_document$fields$visi?void 0:_document$fields$visi.stringValue])&&Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_17__.f)(new Date(null==document?void 0:document.createTime),new Date)<=5})),{fieldName:"createTime",direction:"desc"});if(sortedByDate.length<4)return setUpdatesList(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(sortedByDate)),setIsLoading(!1);var lastFourUpdates=sortedByDate.splice(0,3);setUpdatesList(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(lastFourUpdates)),setIsLoading(!1)})).catch((function(error){setIsLoading(!1),console.log(error)}))}()}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_Widget_Widget_jsx__WEBPACK_IMPORTED_MODULE_13__.a,{className:"update-log-widget",title:"Обновления",miniWidget:!0,content:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(UpdateList,{updates:updatesList,isLoading:isLoading})})};UpdateLogWidget.displayName="UpdateLogWidget",UpdateLogWidget.__docgenInfo={description:"",methods:[],displayName:"UpdateLogWidget"},__webpack_exports__.default=UpdateLogWidget;var UpdateList=function UpdateList(_ref2){var updates=_ref2.updates,_ref2$isLoading=_ref2.isLoading,isLoading=void 0!==_ref2$isLoading&&_ref2$isLoading;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("div",{className:"update-log-widget__list",children:[!isLoading&&0===updates.length&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{className:"update-log-widget__title",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span",{children:"Нет последних обновлений"})}),isLoading?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_18__.a,{}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment,{children:updates.map((function(update){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(UpdateItem,{update:update},update.createTime)}))})]})};UpdateList.displayName="UpdateList";var UpdateItem=function UpdateItem(_ref3){var _update$fields,_update$fields$descri,_update$fields2,_update$fields2$list,_update$fields2$list$,_update$fields3,_update$fields3$name,update=_ref3.update,description=null==update||null===(_update$fields=update.fields)||void 0===_update$fields||null===(_update$fields$descri=_update$fields.description)||void 0===_update$fields$descri?void 0:_update$fields$descri.stringValue,list=null==update||null===(_update$fields2=update.fields)||void 0===_update$fields2||null===(_update$fields2$list=_update$fields2.list)||void 0===_update$fields2$list||null===(_update$fields2$list$=_update$fields2$list.arrayValue)||void 0===_update$fields2$list$?void 0:_update$fields2$list$.values,name=null==update||null===(_update$fields3=update.fields)||void 0===_update$fields3||null===(_update$fields3$name=_update$fields3.name)||void 0===_update$fields3$name?void 0:_update$fields3$name.stringValue;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("div",{className:"update-log-widget__title",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span",{children:name}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span",{children:"Обновление от ".concat(Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_17__.g)(null==update?void 0:update.createTime))})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{className:"update-log-widget__group",children:null==list?void 0:list.map((function(update){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{children:null==update?void 0:update.stringValue},null==update?void 0:update.stringValue)}))}),description?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{className:"update-log-widget__description",children:description}):null]})};"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\GeneralPage\\UpdateLogWidget\\UpdateLogWidget.jsx"]={name:"UpdateLogWidget",docgenInfo:UpdateLogWidget.__docgenInfo,path:"src\\components\\MainPage\\GeneralPage\\UpdateLogWidget\\UpdateLogWidget.jsx"})},3566:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3567);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3567:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,'.update-log-widget{font-size:1rem}.update-log-widget .widget__content{padding-right:0}.update-log-widget__list{padding-right:4px;padding-bottom:5px}.update-log-widget__list .update-log-widget__title{display:flex;flex-direction:column;margin-bottom:10px}.update-log-widget__list .update-log-widget__title:not(:first-child){margin-top:30px}.update-log-widget__list .update-log-widget__title span{font-size:0.95rem}.update-log-widget__list .update-log-widget__title span:nth-child(2){font-size:0.8rem;color:#aaa}.update-log-widget__list .update-log-widget__group{font-size:0.8rem}.update-log-widget__list .update-log-widget__group>div{position:relative;padding-left:12px;color:#666}.update-log-widget__list .update-log-widget__group>div:not(:last-child){margin-bottom:10px}.update-log-widget__list .update-log-widget__group>div::before{content:"";position:absolute;left:0;top:0.3rem;background-color:#ddd;width:6px;height:6px;border-radius:999px}.update-log-widget__list .update-log-widget__description{font-size:0.8rem;color:#333;margin-top:8px}\n',""]),module.exports=exports}}]);