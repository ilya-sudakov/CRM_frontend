(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{2549:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(17),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(100),__webpack_require__(310),__webpack_require__(263),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2556),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\utils\\TableView\\PlaceholderLoading\\PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src\\utils\\TableView\\PlaceholderLoading\\PlaceholderLoading.jsx"})},2556:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2557);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2557:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2573:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(42),DESCRIPTORS=__webpack_require__(101),global=__webpack_require__(35),has=__webpack_require__(131),isObject=__webpack_require__(116),defineProperty=__webpack_require__(132).f,copyConstructorProperties=__webpack_require__(1526),NativeSymbol=global.Symbol;if(DESCRIPTORS&&"function"==typeof NativeSymbol&&(!("description"in NativeSymbol.prototype)||void 0!==NativeSymbol().description)){var EmptyStringDescriptionStore={},SymbolWrapper=function Symbol(){var description=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),result=this instanceof SymbolWrapper?new NativeSymbol(description):void 0===description?NativeSymbol():NativeSymbol(description);return""===description&&(EmptyStringDescriptionStore[result]=!0),result};copyConstructorProperties(SymbolWrapper,NativeSymbol);var symbolPrototype=SymbolWrapper.prototype=NativeSymbol.prototype;symbolPrototype.constructor=SymbolWrapper;var symbolToString=symbolPrototype.toString,native="Symbol(test)"==String(NativeSymbol("test")),regexp=/^Symbol\((.*)\)[^)]+$/;defineProperty(symbolPrototype,"description",{configurable:!0,get:function description(){var symbol=isObject(this)?this.valueOf():this,string=symbolToString.call(symbol);if(has(EmptyStringDescriptionStore,symbol))return"";var desc=native?string.slice(7,-1):string.replace(regexp,"$1");return""===desc?void 0:desc}}),$({global:!0,forced:!0},{Symbol:SymbolWrapper})}},2597:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(310);var prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(2598),__webpack_require__(73)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),Widget=function Widget(_ref){var _ref$title=_ref.title,title=void 0===_ref$title?"":_ref$title,_ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$content=_ref.content,content=void 0===_ref$content?null:_ref$content,linkTo=_ref.linkTo,_ref$subTitle=_ref.subTitle,subTitle=void 0===_ref$subTitle?"":_ref$subTitle,_ref$customHeader=_ref.customHeader,customHeader=void 0===_ref$customHeader?null:_ref$customHeader,_ref$miniWidget=_ref.miniWidget,miniWidget=void 0!==_ref$miniWidget&&_ref$miniWidget,_ref$icon=_ref.icon,icon=void 0===_ref$icon?null:_ref$icon;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget ".concat(null!=className?className:""," ").concat(miniWidget?"widget--mini":""),children:[null!=customHeader?customHeader:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget__title",children:[!miniWidget&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__sub-title",children:subTitle}),linkTo?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.a,{to:linkTo.address,title:linkTo.text,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__content",children:content})]})};Widget.displayName="Widget",Widget.__docgenInfo={description:"",methods:[],displayName:"Widget",props:{title:{defaultValue:{value:"''",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},content:{defaultValue:{value:"null",computed:!1},required:!1},subTitle:{defaultValue:{value:"''",computed:!1},required:!1},customHeader:{defaultValue:{value:"null",computed:!1},required:!1},miniWidget:{defaultValue:{value:"false",computed:!1},required:!1},icon:{defaultValue:{value:"null",computed:!1},required:!1}}},__webpack_exports__.a=Widget,Widget.proptypes={title:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,linkTo:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,subTitle:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,customHeader:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,miniWidget:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,icon:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\GeneralPage\\Widget\\Widget.jsx"]={name:"Widget",docgenInfo:Widget.__docgenInfo,path:"src\\components\\MainPage\\GeneralPage\\Widget\\Widget.jsx"})},2598:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(2599);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2599:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.widget{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;box-sizing:border-box;position:relative;width:100%;background-color:#fff;border:1px solid #cccccc;border-radius:10px;padding:9px 26px;padding-top:15px;min-width:300px;max-width:600px;max-height:360px;margin-bottom:15px;margin-right:15px}.widget--mini{max-width:none;height:fit-content;max-height:Max(calc(33.33vh - 62px), 120px)}.widget--mini .widget__content{height:fit-content}.widget--mini:last-child{margin-bottom:0}.widget__title{display:flex;flex-direction:row-reverse;justify-content:flex-start;align-items:center;font-size:1.25rem;position:relative;margin-bottom:5px;width:100%}.widget__title .widget__sub-title{font-size:0.9rem;color:#444}.widget__title>a{color:#333;margin-right:auto;transition:100ms ease-in-out;font-weight:500}.widget__title>a:hover{color:#bbb}.widget__title>span{display:flex;align-items:center;margin-right:auto;font-weight:500}.widget__title>span .main-window__img{filter:none !important}.widget__content{width:100%;height:100%;overflow-y:auto;box-sizing:border-box;padding-right:4px}.widget__content::-webkit-scrollbar-track,.widget__content *::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar,.widget__content *::-webkit-scrollbar{width:8px;border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar-thumb,.widget__content *::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:#ddd}@media (max-width: 1350px){.widget{max-width:500px}}@media (max-width: 768px){.widget{max-width:100%;width:100%;margin-right:0;padding:15px 20px;padding-bottom:10px}}@media (max-width: 500px){.widget{max-height:calc(360px + 50px)}.widget__title{margin-top:2px;position:initial}.widget__title .main-window__button{position:absolute;margin-top:0;bottom:9px;left:20px}}\n",""]),module.exports=exports},3043:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var slicedToArray=__webpack_require__(17),slicedToArray_default=__webpack_require__.n(slicedToArray),react=__webpack_require__(0),Widget=(__webpack_require__(3295),__webpack_require__(2597)),prop_types=(__webpack_require__(263),__webpack_require__(945),__webpack_require__(1525),__webpack_require__(2573),__webpack_require__(950),__webpack_require__(604),__webpack_require__(2)),prop_types_default=__webpack_require__.n(prop_types),react_router_dom=__webpack_require__(73),sorting=__webpack_require__(2559),PlaceholderLoading=__webpack_require__(2549),jsx_runtime=__webpack_require__(1),NotificationsList_NotificationsList=function NotificationsList(_ref){var notifications=_ref.notifications,isLoading=_ref.isLoading,type=_ref.type;return Object(jsx_runtime.jsx)("div",{className:"notifications__list",children:isLoading?Object(jsx_runtime.jsx)(PlaceholderLoading.a,{minHeight:"2rem",itemClassName:"notifications__list-item"}):notifications.length>0?{birthday:["Сегодня","Через 1 дн.","Через 2 дн.","Через 3 дн.","1 дн. назад","2 дн. назад","3 дн. назад"],documents:["Просроченные документы","Не указаны сроки документов"]}[type].map((function(typeItem){var filteredNotifications=notifications.filter((function(notification){return notification.description===typeItem}));return 0===filteredNotifications.length?null:Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[Object(jsx_runtime.jsx)("div",{className:"notifications__category",children:typeItem}),Object(sorting.a)(filteredNotifications,{fieldName:"name",direction:"asc"}).map((function(notification){return Object(jsx_runtime.jsx)(NotificationsList_ListItem,{item:notification},notification.id)}))]})})):Object(jsx_runtime.jsx)("div",{className:"main-window__info-text",children:"Нет уведомлений"})})};NotificationsList_NotificationsList.displayName="NotificationsList",NotificationsList_NotificationsList.__docgenInfo={description:"",methods:[],displayName:"NotificationsList",props:{notifications:{type:{name:"array"},required:!1,description:""},isLoading:{type:{name:"bool"},required:!1,description:""}}};var Notifications_NotificationsList_NotificationsList=NotificationsList_NotificationsList,NotificationsList_ListItem=function ListItem(_ref2){var item=_ref2.item;return Object(jsx_runtime.jsx)("div",{className:"notifications__list-item ".concat(item.read?"":"notifications__list-item--unread"),children:Object(jsx_runtime.jsx)(react_router_dom.a,{to:item.link,className:"notifications__list-wrapper",children:Object(jsx_runtime.jsx)("span",{children:item.name})})})};NotificationsList_ListItem.displayName="ListItem",NotificationsList_NotificationsList.propTypes={notifications:prop_types_default.a.array,isLoading:prop_types_default.a.bool},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\GeneralPage\\Notifications\\NotificationsList\\NotificationsList.jsx"]={name:"NotificationsList",docgenInfo:NotificationsList_NotificationsList.__docgenInfo,path:"src\\components\\MainPage\\GeneralPage\\Notifications\\NotificationsList\\NotificationsList.jsx"});var useEmployeesNotifications=__webpack_require__(2760),NotificationsWidget_NotificationsWidget=function NotificationsWidget(_ref){var _ref$type=_ref.type,type=void 0===_ref$type?"birthday":_ref$type,_useState=Object(react.useState)([]),_useState2=slicedToArray_default()(_useState,2),notifications=_useState2[0],setNotifications=_useState2[1],_useEmployeesNotifica=Object(useEmployeesNotifications.a)(type),employees=_useEmployeesNotifica.employees,isLoadingEmployees=_useEmployeesNotifica.isLoadingEmployees;return Object(react.useEffect)((function(){console.log(employees),setNotifications(employees)}),[employees]),employees.length>0||isLoadingEmployees?Object(jsx_runtime.jsx)(Widget.a,{className:"notifications-widget",title:{birthday:{title:"Дни рождения"},documents:{title:"Документы"}}[type].title,subTitle:"Сотрудники",linkTo:{address:"/dispatcher/employees",text:"Перейти"},miniWidget:!0,content:Object(jsx_runtime.jsx)(Notifications_NotificationsList_NotificationsList,{notifications:notifications,isLoading:isLoadingEmployees,type:type})}):null};NotificationsWidget_NotificationsWidget.__docgenInfo={description:"",methods:[],displayName:"NotificationsWidget",props:{type:{defaultValue:{value:"'birthday'",computed:!1},required:!1}}};__webpack_exports__.default=NotificationsWidget_NotificationsWidget;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\GeneralPage\\Notifications\\NotificationsWidget.jsx"]={name:"NotificationsWidget",docgenInfo:NotificationsWidget_NotificationsWidget.__docgenInfo,path:"src\\components\\MainPage\\GeneralPage\\Notifications\\NotificationsWidget.jsx"})},3295:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3296);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3296:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.notifications__list{display:flex;flex-direction:column}.notifications__list .notifications__category{color:#999;padding-bottom:3px;font-size:0.95rem}.notifications__list .notifications__category:not(:first-child){padding-top:5px}.notifications__list .notifications__list-item{display:flex;flex-direction:row;justify-content:space-between;position:relative;margin-bottom:5px;padding:5px 5px;padding-left:20px;align-items:center;font-size:1rem;border-radius:3px;box-sizing:border-box;transition:100ms ease-in-out}.notifications__list .notifications__list-item::before{position:absolute;left:4px;top:calc(50% - 4px);content:"";background-color:#ddd;border-radius:999px;width:8px;height:8px}.notifications__list .notifications__list-item:hover{background-color:#eee}.notifications__list .notifications__list-item--unread::after{position:absolute;right:10px;top:calc(50% - 6px);content:"";background-color:#4293b6;border-radius:999px;width:12px;height:12px}.notifications__list .notifications__list-item:last-child{margin-bottom:0}.notifications__list .notifications__list-item .main-window__img{filter:invert(0);margin-right:0;width:24px}.notifications__list .notifications__list-item .notifications__list-wrapper{display:flex;flex-direction:column;width:100%;color:#000000;font-size:0.9rem}.notifications__list .notifications__list-item .notifications__list-wrapper div,.notifications__list .notifications__list-item .notifications__list-wrapper span{cursor:pointer;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;color:#000000}.notifications__list .notifications__list-item .notifications__list-wrapper div:nth-child(2),.notifications__list .notifications__list-item .notifications__list-wrapper span:nth-child(2){color:#777777;font-size:0.95rem}.notifications__list .notifications__list-item .notifications__list-wrapper:hover div:nth-child(1){text-decoration:underline}\n',""]),module.exports=exports}}]);