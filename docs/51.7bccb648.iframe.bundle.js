(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{3011:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/work_time_icon.43fae195.svg"},3573:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(50),__webpack_require__(1004),__webpack_require__(159);var react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),_App_js__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__(3574),__webpack_require__(1758),__webpack_require__(131)),Assets_sidemenu_tasks_svg__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(3576),Assets_sidemenu_tasks_svg__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(Assets_sidemenu_tasks_svg__WEBPACK_IMPORTED_MODULE_7__),Assets_sidemenu_client_svg__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(3577),Assets_sidemenu_client_svg__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(Assets_sidemenu_client_svg__WEBPACK_IMPORTED_MODULE_8__),Assets_sidemenu_list_svg__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(3578),Assets_sidemenu_list_svg__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(Assets_sidemenu_list_svg__WEBPACK_IMPORTED_MODULE_9__),Assets_sidemenu_box_svg__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(3579),Assets_sidemenu_box_svg__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(Assets_sidemenu_box_svg__WEBPACK_IMPORTED_MODULE_10__),Assets_sidemenu_play_list_svg__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(3580),Assets_sidemenu_play_list_svg__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(Assets_sidemenu_play_list_svg__WEBPACK_IMPORTED_MODULE_11__),Assets_sidemenu_supplier_icon_svg__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(3581),Assets_sidemenu_supplier_icon_svg__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(Assets_sidemenu_supplier_icon_svg__WEBPACK_IMPORTED_MODULE_12__),Assets_sidemenu_work_time_icon_svg__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(3011),Assets_sidemenu_work_time_icon_svg__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(Assets_sidemenu_work_time_icon_svg__WEBPACK_IMPORTED_MODULE_13__),Assets_statistics_stats_alt_svg__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(3582),Assets_statistics_stats_alt_svg__WEBPACK_IMPORTED_MODULE_14___default=__webpack_require__.n(Assets_statistics_stats_alt_svg__WEBPACK_IMPORTED_MODULE_14__),Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(197),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(1),EtceteraPage=function EtceteraPage(props){var userContext=Object(react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_6__.a);Object(react__WEBPACK_IMPORTED_MODULE_3__.useEffect)((function(){document.title="Разное"}),[]);var menuItems={"Клиенты":[{linkTo:"/clients/categories",name:"Категории клиентов",access:["ROLE_ADMIN"],icon:Assets_sidemenu_client_svg__WEBPACK_IMPORTED_MODULE_8___default.a},{linkTo:"/clients/categories",name:"Категории поставщиков",access:["ROLE_ADMIN"],icon:Assets_sidemenu_supplier_icon_svg__WEBPACK_IMPORTED_MODULE_12___default.a}],"Учет времени":[{linkTo:"/work-management",name:"Отчет производства",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_DISPATCHER","ROLE_ENGINEER","ROLE_MANAGER"],icon:Assets_sidemenu_work_time_icon_svg__WEBPACK_IMPORTED_MODULE_13___default.a},{linkTo:"/report-table",name:"Табель",access:["ROLE_ADMIN","ROLE_DISPATCHER","ROLE_MANAGER","ROLE_WORKSHOP","ROLE_ENGINEER"],icon:Assets_sidemenu_tasks_svg__WEBPACK_IMPORTED_MODULE_7___default.a}],"Производство":[{linkTo:"/packaging",name:"Упаковка",access:["ROLE_ADMIN"],icon:Assets_sidemenu_box_svg__WEBPACK_IMPORTED_MODULE_10___default.a},{linkTo:"/rigging-list",name:"Очередь инстр. производства",access:["ROLE_ADMIN","ROLE_WORKSHOP"],icon:Assets_sidemenu_list_svg__WEBPACK_IMPORTED_MODULE_9___default.a},{linkTo:"/work-list",name:"Виды работ",access:["ROLE_ADMIN","ROLE_DISPATCHER","ROLE_ENGINEER"],icon:Assets_sidemenu_play_list_svg__WEBPACK_IMPORTED_MODULE_11___default.a}],"Статистика":[{linkTo:"/statistics",name:"Статистика",access:["ROLE_ADMIN"],icon:Assets_statistics_stats_alt_svg__WEBPACK_IMPORTED_MODULE_14___default.a}]};return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"etcetera-page",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{className:"main-window",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"main-window__header main-window__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"main-window__title",children:"Остальное"})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div",{className:"etcetera-page__buttons",children:Object.entries(menuItems).map((function(category,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div",{className:"excetera-page__category",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span",{className:"excetera-page__category-name",children:category[0]}),category[1].map((function(item){if(userContext.userHasAccess(item.access))return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(Utils_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_15__.a,{onClick:function onClick(){props.history.push(item.linkTo)},imgSrc:item.icon,text:item.name,className:"main-window__button"})}))]},index)}))})]})})};EtceteraPage.displayName="EtceteraPage",EtceteraPage.__docgenInfo={description:"",methods:[],displayName:"EtceteraPage"},__webpack_exports__.default=EtceteraPage,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/EtceteraPage/EtceteraPage.jsx"]={name:"EtceteraPage",docgenInfo:EtceteraPage.__docgenInfo,path:"src/components/MainPage/EtceteraPage/EtceteraPage.jsx"})},3574:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3575);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3575:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.etcetera-page .main-window__title{width:100%;padding:0;box-sizing:border-box;text-align:left}.etcetera-page__buttons{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;width:100%;box-sizing:border-box;padding:0 40px}.etcetera-page__buttons .main-window__button{margin-top:5px}.etcetera-page__buttons .main-window__button .button__img{filter:brightness(3) !important}.etcetera-page__buttons .excetera-page__category{display:flex;flex-direction:column;margin-right:10px;margin-bottom:10px}.etcetera-page__buttons .excetera-page__category .excetera-page__category-name{color:#333333;padding:2.5px 0px;width:fit-content;border-bottom:2px solid #bbbbbb;margin-bottom:2px;font-size:115%}\n",""]),module.exports=exports},3576:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/tasks.c92f3d8c.svg"},3577:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/client.2fb99b7b.svg"},3578:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/list.a4fc348c.svg"},3579:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/box.bfc27377.svg"},3580:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/play_list.5f149275.svg"},3581:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/supplier_icon.0eeb02e5.svg"},3582:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/stats-alt.0c8fc51e.svg"}}]);