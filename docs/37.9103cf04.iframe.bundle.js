(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{2824:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(26),__webpack_require__(35),__webpack_require__(50),__webpack_require__(0)),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(2828),__webpack_require__(1)),PlaceholderLoading=function PlaceholderLoading(_ref){var _ref$items=_ref.items,items=void 0===_ref$items?3:_ref$items,itemClassName=_ref.itemClassName,_ref$minHeight=_ref.minHeight,minHeight=void 0===_ref$minHeight?"1.5rem":_ref$minHeight,placeholderContent=_ref.placeholderContent,wrapperClassName=_ref.wrapperClassName,_ref$itemStyles=_ref.itemStyles,itemStyles=void 0===_ref$itemStyles?{}:_ref$itemStyles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),elements=_useState2[0],setElements=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((function(){for(var temp=[],count=items,i=1;i<=count;i++)temp.push(Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading__item ".concat(itemClassName),style:Object.assign({minHeight:minHeight},itemStyles)}));setElements([].concat(temp))}),[]),placeholderContent?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:itemClassName,style:{minHeight:minHeight},children:placeholderContent},index)}))}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"placeholder-loading ".concat(wrapperClassName),children:elements.map((function(item){return item}))})};PlaceholderLoading.displayName="PlaceholderLoading",PlaceholderLoading.__docgenInfo={description:"",methods:[],displayName:"PlaceholderLoading",props:{items:{defaultValue:{value:"3",computed:!1},type:{name:"number"},required:!1,description:""},minHeight:{defaultValue:{value:"'1.5rem'",computed:!1},type:{name:"string"},required:!1,description:""},itemStyles:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""},itemClassName:{type:{name:"string"},required:!1,description:""},wrapperClassName:{type:{name:"string"},required:!1,description:""},placeholderContent:{type:{name:"any"},required:!1,description:""}}},__webpack_exports__.a=PlaceholderLoading,PlaceholderLoading.propTypes={items:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,minHeight:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,itemClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,wrapperClassName:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,placeholderContent:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,itemStyles:prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"]={name:"PlaceholderLoading",docgenInfo:PlaceholderLoading.__docgenInfo,path:"src/utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx"})},2827:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(26),__webpack_require__(0)),Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1003),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2831),__webpack_require__(1)),ControlPanel=function ControlPanel(props){var _props$styles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!0),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isHidden=_useState2[0],setIsHidden=_useState2[1];return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"control-panel",style:Object.assign({},null!==(_props$styles=props.styles)&&void 0!==_props$styles?_props$styles:{}),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__control-panel-wrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"control-panel__buttons",children:[props.sorting||null,props.content?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__button main-window__button--inverted main-window__button--filter",onClick:function onClick(){return setIsHidden((function(isHidden){return!isHidden}))},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{children:props.panelName||"Фильтры"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__.a,{className:"main-window__img ".concat(isHidden?"":"main-window__img--rotated")})]}):null,props.buttons||null,props.itemsCount?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"main-window__amount_table",children:props.itemsCount}):null]}),isHidden?null:props.content]})})};ControlPanel.displayName="ControlPanel",ControlPanel.__docgenInfo={description:"",methods:[],displayName:"ControlPanel"},__webpack_exports__.a=ControlPanel,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/MainWindow/ControlPanel/ControlPanel.jsx"]={name:"ControlPanel",docgenInfo:ControlPanel.__docgenInfo,path:"src/utils/MainWindow/ControlPanel/ControlPanel.jsx"})},2828:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2829);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2829:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,'@keyframes pulse-placeholder-loading{0%,100%{background-color:#e7e7e7}50%{background-color:#efefef}}@keyframes load{from{left:-150px}to{left:100%}}.placeholder-loading__item{height:1rem;background-color:#ddd;animation:pulse-placeholder-loading 1s infinite ease-in-out;position:relative;overflow:hidden;border-bottom:1px solid #bbb}.placeholder-loading__item::after{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}\n',""]),module.exports=exports},2831:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2832);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2832:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.control-panel{width:100%}.control-panel .main-window__control-panel-wrapper{padding-top:5px;padding-bottom:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__button{margin-top:5px;padding:8px 10px;font-size:85%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .switch{margin-top:5px;margin-right:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .searchbar{max-width:50%;margin-right:auto;padding:0;align-self:center;margin-left:-15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__amount_table{color:#666666;align-self:center;margin-top:5px;margin-left:auto}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window{padding:0}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel{width:max-content;margin-bottom:0;margin-right:10px;box-sizing:border-box;padding-top:calc(5px);position:relative;background-color:#ffffff}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel::before{width:100%;height:20px;position:absolute;content:\"Сортировка\";top:8px;left:10px;z-index:0;color:#777777;font-size:95%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px;padding-right:25px;padding-left:9px;height:100%;margin:0;box-sizing:border-box;min-width:150px;z-index:0;background-color:transparent;cursor:pointer;border:1px solid #cccccc;transition:background-color 100ms ease-in-out;-webkit-appearance:none;-moz-appearance:none;background:transparent;background-image:url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'></path></svg>\");background-repeat:no-repeat;background-position-x:100%;background-position-y:calc(50% + 2px)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter{border-color:#cccccc;justify-content:space-between;padding:8px 8px !important;padding-right:5px !important}.control-panel .main-window__control-panel-wrapper .main-window__button--filter span{margin-right:20px;font-size:95%}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img{filter:none;max-width:18px;margin-top:1px;margin-right:0;transition:200ms cubic-bezier(0.23, 1, 0.32, 1)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img path:nth-child(1){transition:200ms cubic-bezier(0.23, 1, 0.32, 1);fill:#333333}@media (max-width: 768px){.control-panel .main-window__control-panel-wrapper{padding-left:15px;padding-right:15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{width:calc(100% + 30px);padding:0 15px;box-sizing:border-box;flex-wrap:nowrap;margin-left:-15px;overflow:auto;white-space:nowrap}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px !important;padding-right:25px !important;padding-left:9px !important;max-width:240px}}\n",""]),module.exports=exports},2846:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/delete.1ad59e4c.svg"},2923:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"d",(function(){return getFeedback})),__webpack_require__.d(__webpack_exports__,"e",(function(){return getFeedbackById})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteFeedbackById})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addFeedback})),__webpack_require__.d(__webpack_exports__,"c",(function(){return editFeedback}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getFeedback(){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/",method:"GET"})}function getFeedbackById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/"+id,method:"GET"})}function deleteFeedbackById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/"+id,method:"DELETE"})}function addFeedback(newFeedback){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/",method:"POST",body:JSON.stringify(newFeedback)})}function editFeedback(newFeedback,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/"+id,method:"PUT",body:JSON.stringify(newFeedback)})}},3043:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return getMessagesByDiscussionId})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addMessage})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteMessage}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getMessagesByDiscussionId(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/discussion/"+id,method:"GET"})}function addMessage(newMessage){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/message/",method:"POST",body:JSON.stringify(newMessage)})}function deleteMessage(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/message/"+id,method:"DELETE"})}},3534:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_21__=(__webpack_require__(1002),__webpack_require__(658),__webpack_require__(461),__webpack_require__(296),__webpack_require__(1005),__webpack_require__(50),__webpack_require__(462),__webpack_require__(26),__webpack_require__(159),__webpack_require__(464),__webpack_require__(256),__webpack_require__(656),__webpack_require__(657),__webpack_require__(35),__webpack_require__(130),__webpack_require__(79),__webpack_require__(160),__webpack_require__(149),__webpack_require__(198),__webpack_require__(0)),_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_24__=(__webpack_require__(3535),__webpack_require__(1758),__webpack_require__(347)),Assets_chat_unread_messages_mail_icon_svg__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(3537),Assets_chat_unread_messages_mail_icon_svg__WEBPACK_IMPORTED_MODULE_25___default=__webpack_require__.n(Assets_chat_unread_messages_mail_icon_svg__WEBPACK_IMPORTED_MODULE_25__),Assets_tableview_delete_svg__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(2846),Assets_tableview_delete_svg__WEBPACK_IMPORTED_MODULE_26___default=__webpack_require__.n(Assets_tableview_delete_svg__WEBPACK_IMPORTED_MODULE_26__),react_router_dom__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(44),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(61),Utils_RequestsAPI_Feedback_feedback_js__WEBPACK_IMPORTED_MODULE_29__=__webpack_require__(2923),Utils_RequestsAPI_Feedback_messages_js__WEBPACK_IMPORTED_MODULE_30__=__webpack_require__(3043),Utils_MainWindow_FloatingPlus_FloatingPlus_jsx__WEBPACK_IMPORTED_MODULE_31__=__webpack_require__(661),Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_32__=__webpack_require__(2824),Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_33__=__webpack_require__(2827),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__=__webpack_require__(1),FeedbackPage=function FeedbackPage(props){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_21__.useState)(""),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),searchQuery=_useState2[0],setSearchQuery=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_21__.useState)([]),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),messages=_useState4[0],setMessages=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_21__.useState)(!0),_useState6=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5,2),isLoading=_useState6[0],setIsLoading=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_21__.useState)(!1),_useState8=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7,2),scrolledToPrev=_useState8[0],setScrolledToPrev=_useState8[1],_useState9=Object(react__WEBPACK_IMPORTED_MODULE_21__.useState)([{className:"waiting",name:"Ожидание ответа",visible:!0},{className:"in-progress",name:"В процессе",visible:!0},{className:"completed",name:"Завершенные",visible:!1},{className:"urgent",name:"Срочно",visible:!0},{className:"testing",name:"Тестирование",visible:!0}]),_useState10=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState9,2),statuses=_useState10[0],setStatuses=_useState10[1],_useState11=Object(react__WEBPACK_IMPORTED_MODULE_21__.useState)([{name:"Все",filteredRoles:[],active:!0},{name:"Руководитель",filteredRoles:["dev","Алексей","test"],active:!1},{name:"Диспетчер",filteredRoles:["Диспетчер"],active:!1},{name:"Менеджер",filteredRoles:["Иван","Менеджер1"],active:!1},{name:"Цеха",filteredRoles:["ЦехЛЭМЗ","ЦехЛепсари","ЦехЛиговский"],active:!1}]),_useState12=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState11,2),userCategories=_useState12[0],setUserCategories=_useState12[1];Object(react__WEBPACK_IMPORTED_MODULE_21__.useEffect)((function(){document.title="Обсуждения";var abortController=new AbortController;return loadData(abortController.signal),function cancel(){abortController.abort()}}),[]);var loadData=function loadData(signal){Object(Utils_RequestsAPI_Feedback_feedback_js__WEBPACK_IMPORTED_MODULE_29__.d)(signal).then((function(res){return res.json()})).then((function(res){setMessages(res),setIsLoading(!1)}))},prevRef=Object(react__WEBPACK_IMPORTED_MODULE_21__.useCallback)((function(node){var id=Number.parseInt(props.history.location.hash.split("#")[1]);messages&&!scrolledToPrev&&void 0!==messages.find((function(item){return item.id===id}))&&null!==node&&messages&&(console.log(node,messages.find((function(item){return item.id===id}))),Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_28__.w)(node,-800),setScrolledToPrev(!0))}),[messages]);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"feedback-page",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"main-window",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)(Utils_MainWindow_FloatingPlus_FloatingPlus_jsx__WEBPACK_IMPORTED_MODULE_31__.a,{linkTo:"/feedback/new",visibility:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_DISPATCHER","ROLE_MANAGER"]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__header main-window__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__title",children:"Обратная связь"})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)(_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{fullSize:!0,placeholder:"Введите запрос для поиска...",setSearchQuery:setSearchQuery}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)(Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_33__.a,{itemsCount:"Всего: ".concat(messages.length," записей"),content:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__info-panel",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"main-window__status-panel",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{children:"Фильтр по статусам: "}),statuses.map((function(status,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:(status.visible?"main-window__button":"main-window__button main-window__button--inverted")+" main-window__list-item--"+status.className,onClick:function onClick(){var temp=statuses;temp.splice(index,1,Object.assign({},status,{visible:!status.visible})),setStatuses(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(temp))},children:status.name},index)}))]})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"main-window__filter-pick",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{children:"Фильтр по категориям: "}),userCategories.map((function(category,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:category.active?"main-window__button":"main-window__button main-window__button--inverted",onClick:function onClick(){var temp;temp=userCategories.map((function(item,tempIndex){return index===tempIndex?Object.assign({},item,{active:!0}):Object.assign({},item,{active:!1})})),setUserCategories(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(temp))},children:category.name},index)}))]})]})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"main-window__list",children:[isLoading&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)(Utils_TableView_PlaceholderLoading_PlaceholderLoading_jsx__WEBPACK_IMPORTED_MODULE_32__.a,{itemClassName:"main-window__list-item",minHeight:"60px",items:10}),messages.filter((function(item){var temp=userCategories.find((function(category){return category.active}));return 0===temp.filteredRoles.length||temp.filteredRoles.includes(item.author)})).filter((function(item){if(item.author.toLowerCase().includes(searchQuery.toLowerCase())||Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_28__.g)(item.date).toLowerCase().includes(searchQuery.toLowerCase())||item.subject.toLowerCase().includes(searchQuery.toLowerCase())){var check=!1;return statuses.map((function(status){status.visible&&status.className===item.status&&(check=!0)})),check}})).sort((function(a,b){return a.date<b.date?1:a.date>b.date?-1:0})).map((function(item,index){if(item.author===props.userData.username||props.userHasAccess(["ROLE_ADMIN"]))return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_27__.a,{className:"main-window__list-item main-window__list-item--".concat(item.status," ").concat(!1===item.isRead?"main-window__list-item--unread":""),id:item.id,ref:Number.parseInt(props.history.location.hash.split("#")[1])===item.id?prevRef:null,to:"/feedback/view/"+item.id,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("span",{className:"feedback-page__avatar","data-username":item.author[0]+item.author[1]+item.author[2],children:item.author[0]+item.author[1]+item.author[2]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"main-window__list-col",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("span",{title:item.subject,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__mobile-text",children:"Тема: "}),item.subject]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("span",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"main-window__mobile-text",children:["Пользователь:"," "]}),item.author]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("span",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__mobile-text",children:"Дата: "}),Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_28__.j)(item.date)]}),!1===item.isRead&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsxs)("div",{className:"feedback-page__info-message",title:"Новые сообщения",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__mobile-text",children:"Новые сообщения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("img",{className:"main-window__img",src:Assets_chat_unread_messages_mail_icon_svg__WEBPACK_IMPORTED_MODULE_25___default.a,alt:""})]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__actions",children:props.userHasAccess(["ROLE_ADMIN"])&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("div",{className:"main-window__action",title:"Удаление чата",onClick:function onClick(event){event.preventDefault(),Object(Utils_RequestsAPI_Feedback_messages_js__WEBPACK_IMPORTED_MODULE_30__.c)(item.id).then((function(res){return res.json()})).then((function(res){return Promise.all(res.map((function(message){return Object(Utils_RequestsAPI_Feedback_messages_js__WEBPACK_IMPORTED_MODULE_30__.b)(message.id)})))})).then((function(){return Object(Utils_RequestsAPI_Feedback_feedback_js__WEBPACK_IMPORTED_MODULE_29__.b)(item.id)})).then((function(){return loadData()}))},children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_34__.jsx)("img",{className:"main-window__img",src:Assets_tableview_delete_svg__WEBPACK_IMPORTED_MODULE_26___default.a})})})]},index)}))]})]})})};FeedbackPage.displayName="FeedbackPage",FeedbackPage.__docgenInfo={description:"",methods:[],displayName:"FeedbackPage"},__webpack_exports__.default=FeedbackPage,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/FeedbackPage/FeedbackPage.jsx"]={name:"FeedbackPage",docgenInfo:FeedbackPage.__docgenInfo,path:"src/components/MainPage/FeedbackPage/FeedbackPage.jsx"})},3535:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3536);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3536:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.feedback-page{--urgent: #ca3e3e;--completed: #399639;--in-progress: #bdbd41;--testing: #28868a;--waiting: #864f7d}.feedback-page .main-window__status-panel{margin-bottom:0px}.feedback-page .main-window__status-panel .main-window__list-item--urgent::before{background-color:var(--urgent)}.feedback-page .main-window__status-panel .main-window__list-item--in-progress::before{background-color:var(--in-progress)}.feedback-page .main-window__status-panel .main-window__list-item--completed::before{background-color:var(--completed)}.feedback-page .main-window__status-panel .main-window__list-item--testing::before{background-color:var(--testing)}.feedback-page .main-window__status-panel .main-window__list-item--waiting::before{background-color:var(--waiting)}.feedback-page .main-window__list{width:100%;margin-top:-1px}.feedback-page .main-window__list .main-window__list-item{padding-left:25px;position:relative}.feedback-page .main-window__list .main-window__list-item--unread{background-color:#eaf3f5}.feedback-page .main-window__list .main-window__list-item--unread .main-window__list-col span:nth-child(1){color:#249b9b}.feedback-page .main-window__list .main-window__list-item--unread:hover{background-color:#c9e0e6}.feedback-page .main-window__list .main-window__list-item:not(.main-window__list-item--header){border-top:1px solid #aaaaaa;border-color:#dddddd !important}.feedback-page .main-window__list .main-window__list-item:not(.main-window__list-item--header) .feedback-page__avatar{--avatar-size: 50px;display:flex;flex-direction:row;justify-content:center;align-items:center;flex:0 1 var(--avatar-size);width:var(--avatar-size);height:var(--avatar-size);padding:0;border-radius:999px;color:#fff;font-size:120%;margin:0 0px;margin-right:-20px;color:#ffffffee;background:#00a3a2;background:linear-gradient(139deg, #00a3a2 0%, #28c2c2 67%)}.feedback-page .main-window__list .main-window__list-item:not(.main-window__list-item--header)::before{content:"";display:inline-block;position:absolute;width:10px;left:1px;top:-1px;border-top-left-radius:5px;border-bottom-left-radius:5px;background-color:#cccccc;width:8px;top:5px;left:5px;border-radius:25px;height:calc(100% - 10px)}.feedback-page .main-window__list .main-window__list-item:not(.main-window__list-item--header):nth-child(2){border-top:1px solid #aaaaaa}.feedback-page .main-window__list .main-window__list-item:hover .main-window__img:hover{filter:brightness(1)}.feedback-page .main-window__list .main-window__list-item .main-window__list-col{display:flex;flex-direction:column;width:calc(100% - 170px)}.feedback-page .main-window__list .main-window__list-item .main-window__list-col span{width:100%}.feedback-page .main-window__list .main-window__list-item .main-window__list-col span:nth-child(1){font-size:20px;max-width:calc(100% - 50px);white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}.feedback-page .main-window__list .main-window__list-item .main-window__list-col span:nth-child(2){font-size:110%}.feedback-page .main-window__list .main-window__list-item .main-window__list-col span:nth-child(3){font-size:100%;color:#555555;transition:100ms ease-in-out}.feedback-page .main-window__list .main-window__list-item--urgent:not(.main-window__list-item--header)::before{background-color:var(--urgent)}.feedback-page .main-window__list .main-window__list-item--in-progress:not(.main-window__list-item--header)::before{background-color:var(--in-progress)}.feedback-page .main-window__list .main-window__list-item--completed:not(.main-window__list-item--header)::before{background-color:var(--completed)}.feedback-page .main-window__list .main-window__list-item--testing:not(.main-window__list-item--header)::before{background-color:var(--testing)}.feedback-page .main-window__list .main-window__list-item--waiting:not(.main-window__list-item--header)::before{background-color:var(--waiting)}.feedback-page .feedback-page__info-message{position:absolute;display:flex;justify-content:center;align-items:center;top:calc(50%);right:80px;background-color:#4293b6;border-radius:25px;width:fit-content;padding:7.5px;top:calc(50% - 17px);transition:100ms ease-in-out;background-color:transparent;border:1px solid #4293b6}.feedback-page .feedback-page__info-message .main-window__img{width:20px}.feedback-page .main-window__list-item:hover .feedback-page__info-message{background-color:#ffffff}.feedback-page .main-window__actions{flex-direction:row !important;max-width:80px;min-width:0}.feedback-page .main-window__actions .main-window__img{width:22px}@media (max-width: 768px){.feedback-page{max-width:none;margin:0;box-shadow:none}.feedback-page .main-window{background-color:transparent;border-radius:5px;margin:0 !important;width:100% !important;box-shadow:none;padding:10px 0px}.feedback-page .main-window{width:calc(100% - 10px);margin:10px 5px}.feedback-page .main-window__info-panel{flex-direction:column;align-items:flex-end}.feedback-page .main-window__info-panel .feedback-page__status-wrapper{justify-content:flex-start}.feedback-page .main-window__info-panel .main-window__amount_table{margin-top:5px}.feedback-page .main-window__list .main-window__list-item{padding-left:55px}.feedback-page .main-window__list .main-window__list-item:hover .feedback-page__info-message .main-window__mobile-text{color:#000}.feedback-page .main-window__list .main-window__list-item .main-window__actions{max-width:none}.feedback-page .main-window__list .main-window__list-item .feedback-page__info-message{position:relative;font-size:85%;top:0;left:0;padding:5px 10px}.feedback-page .main-window__list .main-window__list-item .main-window__list-col{width:calc(100% - 30px)}.feedback-page .main-window__list .main-window__list-item span{font-size:14px !important;margin-bottom:1px}.feedback-page .main-window__list .main-window__list-item span:nth-child(1){font-size:16px !important;white-space:normal !important;text-overflow:unset !important;max-width:none !important;text-align:left !important;padding-left:5px}.feedback-page .main-window__list .main-window__list-item span:nth-child(1) .main-window__mobile-text{display:none}.feedback-page .main-window__list .main-window__list-item span:nth-child(2){text-align:left !important}.feedback-page .main-window__list .main-window__list-item span:nth-child(2) .main-window__mobile-text{display:none}.feedback-page .main-window__list .main-window__list-item span:nth-child(3){text-align:left !important}.feedback-page .main-window__list .main-window__list-item span:nth-child(3) .main-window__mobile-text{display:none}.feedback-page .main-window__list .main-window__list-item .feedback-page__avatar{position:absolute;top:5px;padding:0 !important;left:17px}}\n',""]),module.exports=exports},3537:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/unread_messages__mail_icon.7b177c1a.svg"}}]);