(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{3478:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(1517),__webpack_require__(1518);var react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(963),react_router_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(73),react_router_dom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(169),Assets_sidemenu_plus_inline_svg__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2622),_PageNotFound_PageNotFound_jsx__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(3479),__webpack_require__(1521),__webpack_require__(2720)),_PageLoading_PageLoading_jsx__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(962),_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(2640),Utils_hooks_uiComponents_useTitleHeader_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(2627),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(1),LEMZ=function LEMZ(props){var menuItems=[{pageName:"/lemz/workshop-lemz",isActive:props.location.pathname.includes("/lemz/workshop-lemz"),pageTitle:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment,{children:["Очередь производства",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.a,{to:"/lemz/workshop-lemz/new",className:"main-window__addButton",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Assets_sidemenu_plus_inline_svg__WEBPACK_IMPORTED_MODULE_6__.a,{className:"main-window__img",alt:""})})]}),link:"/lemz/workshop-lemz"},{pageName:"/lemz/workshop-storage",isActive:props.location.pathname.includes("/lemz/workshop-storage"),pageTitle:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment,{children:["Склад",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.a,{to:"/lemz/workshop-storage/new",className:"main-window__addButton",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Assets_sidemenu_plus_inline_svg__WEBPACK_IMPORTED_MODULE_6__.a,{className:"main-window__img",alt:""})})]}),link:"/lemz/workshop-storage"},{pageName:"/lemz/workshop-orders",isActive:props.location.pathname.includes("/lemz/workshop-orders"),pageTitle:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment,{children:["Комплектация Цеха",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.a,{to:"/lemz/workshop-orders/new",className:"main-window__addButton",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Assets_sidemenu_plus_inline_svg__WEBPACK_IMPORTED_MODULE_6__.a,{className:"main-window__img",alt:""})})]}),link:"/lemz/workshop-orders"}],titleHeader=Object(Utils_hooks_uiComponents_useTitleHeader_js__WEBPACK_IMPORTED_MODULE_12__.a)("Цех ЛЭМЗ",menuItems,"/lemz/workshop-lemz").titleHeader;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",{className:"lemz",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div",{className:"main-window",children:[titleHeader,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",{className:"main-window__content",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react__WEBPACK_IMPORTED_MODULE_2__.Suspense,{fallback:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PageLoading_PageLoading_jsx__WEBPACK_IMPORTED_MODULE_10__.a,{}),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.e,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{exact:!0,path:"/lemz/workshop-lemz/new",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.I,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_MANAGER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{path:"/lemz/workshop-lemz/edit/",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.i,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_MANAGER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{path:"/lemz/workshop-lemz/ship/",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.bb,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_MANAGER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{path:"/lemz/workshop-lemz/",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.pb,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_ENGINEER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{exact:!0,path:"/lemz/workshop-storage",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.eb,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_ENGINEER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{exact:!0,path:"/lemz/workshop-storage/new",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.J,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_MANAGER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{path:"/lemz/workshop-storage/edit/",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.j,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_MANAGER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{exact:!0,path:"/lemz/workshop-orders",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.ob,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_DISPATCHER","ROLE_ENGINEER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{exact:!0,path:"/lemz/workshop-orders/new",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.O,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_ENGINEER","ROLE_LEMZ"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_PrivateRoute_PrivateRoute_jsx__WEBPACK_IMPORTED_MODULE_3__.a,{path:"/lemz/workshop-orders/edit/",component:_lazyImports_jsx__WEBPACK_IMPORTED_MODULE_11__.o,type:"lemz",allowedRoles:["ROLE_ADMIN","ROLE_DISPATCHER","ROLE_ENGINEER","ROLE_LEPSARI"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.c,{component:_PageNotFound_PageNotFound_jsx__WEBPACK_IMPORTED_MODULE_9__.a})]})})})]})})};LEMZ.displayName="LEMZ",LEMZ.__docgenInfo={description:"",methods:[],displayName:"LEMZ"},__webpack_exports__.default=LEMZ,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MainPage\\LEMZ\\LEMZ.jsx"]={name:"LEMZ",docgenInfo:LEMZ.__docgenInfo,path:"src\\components\\MainPage\\LEMZ\\LEMZ.jsx"})},3479:function(module,exports,__webpack_require__){var api=__webpack_require__(64),content=__webpack_require__(3480);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3480:function(module,exports,__webpack_require__){(exports=__webpack_require__(65)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.lemz .main-window{padding:10px 0}.lemz .main-window__header{z-index:1}.lemz .main-window__header--hidden{transform:scaleY(0);height:0;margin-bottom:0}.lemz .control-panel{width:calc(100% + 25px)}.lemz .searchbar{border-top-right-radius:0px;border-top-left-radius:0px;text-align:left;margin-top:-5px;padding-top:5px;width:calc(100% + 25px) !important;border:0}.lemz .main-window__content{width:calc(100% - 25px);padding:5px 0;border-bottom-left-radius:10px;border-bottom-right-radius:10px;transition:0.2s ease-in-out;padding-top:0}.lemz .main-window__content .searchbar{background-color:#ffffff;border-top-left-radius:0;border-top-right-radius:0;margin-bottom:10px}.lemz .main-window__content .main-window{padding-top:0}.lemz .main-window__content .main-window .title-header{width:calc(100% + 25px)}.lemz .main-window__content .main-form .main-form__form{width:calc(100% - 40px)}.lemz .main-window__content .tableview-workshops{width:calc(100% + 25px)}@media (max-width: 768px){.lemz .main-window .main-window__header{margin-bottom:5px}.lemz .main-window .main-window__header .main-window__title{margin-bottom:10px !important}}@media (max-width: 425px){.lemz .main-window__header .main-window__menu .main-window__item{padding:10px 25px !important}}\n",""]),module.exports=exports}}]);