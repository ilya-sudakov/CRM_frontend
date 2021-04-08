(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{2827:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(26),__webpack_require__(0)),Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1003),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2831),__webpack_require__(1)),ControlPanel=function ControlPanel(props){var _props$styles,_useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!0),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),isHidden=_useState2[0],setIsHidden=_useState2[1];return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"control-panel",style:Object.assign({},null!==(_props$styles=props.styles)&&void 0!==_props$styles?_props$styles:{}),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__control-panel-wrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"control-panel__buttons",children:[props.sorting||null,props.content?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"main-window__button main-window__button--inverted main-window__button--filter",onClick:function onClick(){return setIsHidden((function(isHidden){return!isHidden}))},children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{children:props.panelName||"Фильтры"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Assets_tableview_chevron_down_inline_svg__WEBPACK_IMPORTED_MODULE_3__.a,{className:"main-window__img ".concat(isHidden?"":"main-window__img--rotated")})]}):null,props.buttons||null,props.itemsCount?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"main-window__amount_table",children:props.itemsCount}):null]}),isHidden?null:props.content]})})};ControlPanel.displayName="ControlPanel",ControlPanel.__docgenInfo={description:"",methods:[],displayName:"ControlPanel"},__webpack_exports__.a=ControlPanel,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/MainWindow/ControlPanel/ControlPanel.jsx"]={name:"ControlPanel",docgenInfo:ControlPanel.__docgenInfo,path:"src/utils/MainWindow/ControlPanel/ControlPanel.jsx"})},2831:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2832);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2832:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.control-panel{width:100%}.control-panel .main-window__control-panel-wrapper{padding-top:5px;padding-bottom:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__button{margin-top:5px;padding:8px 10px;font-size:85%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .switch{margin-top:5px;margin-right:10px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .searchbar{max-width:50%;margin-right:auto;padding:0;align-self:center;margin-left:-15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__amount_table{color:#666666;align-self:center;margin-top:5px;margin-left:auto}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window{padding:0}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel{width:max-content;margin-bottom:0;margin-right:10px;box-sizing:border-box;padding-top:calc(5px);position:relative;background-color:#ffffff}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel::before{width:100%;height:20px;position:absolute;content:\"Сортировка\";top:8px;left:10px;z-index:0;color:#777777;font-size:95%}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px;padding-right:25px;padding-left:9px;height:100%;margin:0;box-sizing:border-box;min-width:150px;z-index:0;background-color:transparent;cursor:pointer;border:1px solid #cccccc;transition:background-color 100ms ease-in-out;-webkit-appearance:none;-moz-appearance:none;background:transparent;background-image:url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'></path></svg>\");background-repeat:no-repeat;background-position-x:100%;background-position-y:calc(50% + 2px)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter{border-color:#cccccc;justify-content:space-between;padding:8px 8px !important;padding-right:5px !important}.control-panel .main-window__control-panel-wrapper .main-window__button--filter span{margin-right:20px;font-size:95%}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img{filter:none;max-width:18px;margin-top:1px;margin-right:0;transition:200ms cubic-bezier(0.23, 1, 0.32, 1)}.control-panel .main-window__control-panel-wrapper .main-window__button--filter .main-window__img path:nth-child(1){transition:200ms cubic-bezier(0.23, 1, 0.32, 1);fill:#333333}@media (max-width: 768px){.control-panel .main-window__control-panel-wrapper{padding-left:15px;padding-right:15px}.control-panel .main-window__control-panel-wrapper .control-panel__buttons{width:calc(100% + 30px);padding:0 15px;box-sizing:border-box;flex-wrap:nowrap;margin-left:-15px;overflow:auto;white-space:nowrap}.control-panel .main-window__control-panel-wrapper .control-panel__buttons .main-window__sort-panel select{padding-top:18px !important;padding-right:25px !important;padding-left:9px !important;max-width:240px}}\n",""]),module.exports=exports},2836:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(21),DESCRIPTORS=__webpack_require__(80),global=__webpack_require__(31),has=__webpack_require__(100),isObject=__webpack_require__(87),defineProperty=__webpack_require__(132).f,copyConstructorProperties=__webpack_require__(1760),NativeSymbol=global.Symbol;if(DESCRIPTORS&&"function"==typeof NativeSymbol&&(!("description"in NativeSymbol.prototype)||void 0!==NativeSymbol().description)){var EmptyStringDescriptionStore={},SymbolWrapper=function Symbol(){var description=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),result=this instanceof SymbolWrapper?new NativeSymbol(description):void 0===description?NativeSymbol():NativeSymbol(description);return""===description&&(EmptyStringDescriptionStore[result]=!0),result};copyConstructorProperties(SymbolWrapper,NativeSymbol);var symbolPrototype=SymbolWrapper.prototype=NativeSymbol.prototype;symbolPrototype.constructor=SymbolWrapper;var symbolToString=symbolPrototype.toString,native="Symbol(test)"==String(NativeSymbol("test")),regexp=/^Symbol\((.*)\)[^)]+$/;defineProperty(symbolPrototype,"description",{configurable:!0,get:function description(){var symbol=isObject(this)?this.valueOf():this,string=symbolToString.call(symbol);if(has(EmptyStringDescriptionStore,symbol))return"";var desc=native?string.slice(7,-1):string.replace(regexp,"$1");return""===desc?void 0:desc}}),$({global:!0,forced:!0},{Symbol:SymbolWrapper})}},2882:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"f",(function(){return getMainTasks})),__webpack_require__.d(__webpack_exports__,"e",(function(){return getMainTaskById})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteMainTask})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addMainTask})),__webpack_require__.d(__webpack_exports__,"c",(function(){return editMainTask})),__webpack_require__.d(__webpack_exports__,"d",(function(){return editTaskStatus}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getMainTasks(signal){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/mainTask/",method:"GET",signal:signal})}function getMainTaskById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/mainTask/"+id,method:"GET"})}function deleteMainTask(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/mainTask/"+id,method:"DELETE"})}function addMainTask(newTask){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/mainTask/",method:"POST",body:JSON.stringify(newTask)})}function editMainTask(newTask,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/mainTask/"+id,method:"PUT",body:JSON.stringify(newTask)})}function editTaskStatus(newStatus,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/mainTask/condition/"+id,method:"PUT",body:JSON.stringify(newStatus)})}},2953:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return filterCompletedTasks})),__webpack_require__.d(__webpack_exports__,"c",(function(){return filterTasksUsers})),__webpack_require__.d(__webpack_exports__,"b",(function(){return filterSearchQuery})),__webpack_require__.d(__webpack_exports__,"d",(function(){return getTasksDefaultInputs}));__webpack_require__(256),__webpack_require__(50),__webpack_require__(1004),__webpack_require__(656),__webpack_require__(657),__webpack_require__(79),__webpack_require__(463),__webpack_require__(196),__webpack_require__(1759),__webpack_require__(2836);var Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(61),filterCompletedTasks=function filterCompletedTasks(tasks,curPage){return tasks.filter((function(task){return"В процессе"===curPage&&"Выполнено"!==task.condition||"Завершено"===curPage&&"Выполнено"===task.condition}))},filterTasksUsers=function filterTasksUsers(tasks,taskUsers){return tasks.filter((function(item){var check=!1,noActiveStatuses=!0;return Object.entries(taskUsers).map((function(user){Object.entries(taskUsers).map((function(user){user[1]&&(noActiveStatuses=!1)})),(!0===noActiveStatuses||user[1]&&user[0]===item.responsible)&&(check=!0)})),check}))},filterSearchQuery=function filterSearchQuery(data,searchQuery){var query=searchQuery.toLowerCase();return data.filter((function(item){return item.id.toString().includes(query)||item.description.toLowerCase().includes(query)||item.responsible.toLowerCase().includes(query)||item.status.toLowerCase().includes(query)||Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_10__.g)(item.dateCreated).includes(query)||Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_10__.g)(item.dateControl).includes(query)}))},getTasksDefaultInputs=function getTasksDefaultInputs(){var username=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return[{name:"dateCreated",defaultValue:new Date,isRequired:!0,isValid:!0},{name:"dateControl",defaultValue:new Date((new Date).setDate((new Date).getDate()+7)),isRequired:!0,isValid:!0},{name:"description",defaultValue:"",isRequired:!0},{name:"responsible",defaultValue:username,isRequired:!0,isValid:!0},{name:"status",defaultValue:""},{name:"condition",defaultValue:"В процессе"}]}},3473:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(50),__webpack_require__(26),__webpack_require__(256),__webpack_require__(1004),__webpack_require__(196),__webpack_require__(0)),_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_10__=(__webpack_require__(3474),__webpack_require__(1758),__webpack_require__(347)),Utils_RequestsAPI_MainTasks_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(2882),Utils_MainWindow_FloatingPlus_FloatingPlus_jsx__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(661),Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(2827),_App_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(131),Utils_hooks_useSort_useSort__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(1007),_functions__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(2953),Utils_hooks__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(1001),Components_Table_Table_jsx__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(350),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(61),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(1),GeneralTasks=function GeneralTasks(props){var userContext=Object(react__WEBPACK_IMPORTED_MODULE_7__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_14__.a),_useState=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)([]),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),generalTasks=_useState2[0],setGeneralTasks=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(""),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),searchQuery=_useState4[0],setSearchQuery=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(!1),_useState6=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5,2),isLoading=_useState6[0],setIsLoading=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)({}),_useState8=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7,2),taskUsers=_useState8[0],setTaskUsers=_useState8[1];Object(react__WEBPACK_IMPORTED_MODULE_7__.useEffect)((function(){document.title="Основные задачи";var abortController=new AbortController;return loadTasks(abortController.signal),function cancel(){abortController.abort()}}),[]);var loadTasks=function loadTasks(signal){return setIsLoading(!0),Object(Utils_RequestsAPI_MainTasks_js__WEBPACK_IMPORTED_MODULE_11__.f)(signal).then((function(res){return res.json()})).then((function(res){setIsLoading(!1),getUsers(res),setGeneralTasks(res)})).catch((function(error){setIsLoading(!1),console.log(error)}))},getUsers=function getUsers(tasks){var users={};tasks.map((function(task){void 0===users[task.responsible]&&""!==task.responsible&&null!==task.responsible&&(users=Object.assign({},users,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},task.responsible,!1)))})),setTaskUsers(users)},_useTitleHeader=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_17__.g)("Основные задачи",[{pageName:"В процессе",pageTitle:"В процессе"},{pageName:"Завершено",pageTitle:"Завершено"}],"В процессе"),titleHeader=_useTitleHeader.titleHeader,curPage=_useTitleHeader.curPage,_useSort=Object(Utils_hooks_useSort_useSort__WEBPACK_IMPORTED_MODULE_15__.a)(function filterTasks(tasks){var filteredSearch=Object(_functions__WEBPACK_IMPORTED_MODULE_16__.b)(tasks,searchQuery),filteredCompletedTasks=Object(_functions__WEBPACK_IMPORTED_MODULE_16__.a)(filteredSearch,curPage);return Object(_functions__WEBPACK_IMPORTED_MODULE_16__.c)(filteredCompletedTasks,taskUsers).filter((function(task){return props.userHasAccess(["ROLE_ADMIN"])||props.userData.username===task.responsible}))}(generalTasks),{ignoreURL:!1,sortOrder:{curSort:"dateCreated",dateCreated:"asc"},sortOptions:[{value:"dateCreated asc",text:"По дате постановки (убыв.)"},{value:"dateCreated desc",text:"По дате постановки (возр.)"},{value:"dateControl asc",text:"По дате контроля (убыв.)"},{value:"dateControl desc",text:"По дате контроля (возр.)"}]},[generalTasks,curPage,taskUsers,searchQuery]),sortPanel=_useSort.sortPanel,sortedData=_useSort.sortedData,columns=[{text:"Дата постановки",value:"dateCreated",width:"12%",maxWidth:"100px",formatFn:function formatFn(_ref2){var dateCreated=_ref2.dateCreated;return Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_19__.g)(dateCreated)}},{text:"Описание",value:"description",width:"30%"},{text:"Ответственный",value:"responsible",width:"15%"},{text:"Дата контроля",value:"dateControl",width:"12%",maxWidth:"120px",badge:{type:"error",isVisibleFn:function isVisibleFn(date){return new Date(date)<new Date}},formatFn:function formatFn(_ref3){var dateControl=_ref3.dateControl;return Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_19__.g)(dateControl)}},{text:"Состояние",value:"status",width:"20%"},{text:"Статус",value:"condition",width:"15%",maxWidth:"120px",status:{onChange:function onChange(value,item){return function handleConditionChange(value,_ref){var id=_ref.id;Object(Utils_RequestsAPI_MainTasks_js__WEBPACK_IMPORTED_MODULE_11__.d)({condition:value},id).then((function(){loadTasks()})).catch((function(error){console.log(error)}))}(value,item)},options:[{text:"Материалы",type:"materials"},{text:"Выполнено",type:"completed"},{text:"В процессе",type:"in-process"},{text:"Отложено",type:"delayed"},{text:"Проблема",type:"problem"}]}}];return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{className:"general_tasks",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("div",{className:"main-window",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Utils_MainWindow_FloatingPlus_FloatingPlus_jsx__WEBPACK_IMPORTED_MODULE_12__.a,{linkTo:"/dispatcher/general-tasks/new",visibility:["ROLE_ADMIN","ROLE_DISPATCHER","ROLE_ENGINEER"]}),titleHeader,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_SearchBar_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_10__.a,{placeholder:"Введите описание задачи для поиска...",setSearchQuery:setSearchQuery,fullSize:!0}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Utils_MainWindow_ControlPanel_ControlPanel_jsx__WEBPACK_IMPORTED_MODULE_13__.a,{itemsCount:"Всего: ".concat(generalTasks.length," записей"),sorting:sortPanel,content:userContext.userHasAccess(["ROLE_ADMIN"])?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{className:"main-window__info-panel",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("div",{className:"main-window__filter-pick",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{children:"Фильтр по пользователям: "}),Object.entries(taskUsers).map((function(user,index){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div",{className:user[1]?"main-window__button":"main-window__button main-window__button--inverted",onClick:function onClick(){return function handleFilterUserClick(user){return setTaskUsers((function(taskUsers){var newUsers=taskUsers;return Object.entries(taskUsers).map((function(oldTask){newUsers=Object.assign({},newUsers,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},oldTask[0],!1))})),Object.assign({},newUsers,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},user[0],!user[1]))}))}(user)},children:user[0]},index)}))]})}):null}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Components_Table_Table_jsx__WEBPACK_IMPORTED_MODULE_18__.a,{columns:columns,data:sortedData,loading:{isLoading:isLoading},actions:function actions(item,index){return[{elementType:"edit",title:"Редактирование задачи",link:"/dispatcher/general-tasks/edit/".concat(item.id),isRendered:userContext.userHasAccess(["ROLE_ADMIN","ROLE_DISPATCHER","ROLE_ENGINEER","ROLE_WORKSHOP"])},{elementType:"delete",title:"Удаление задачи",onClick:function onClick(){return function deleteItem(id){Object(Utils_RequestsAPI_MainTasks_js__WEBPACK_IMPORTED_MODULE_11__.b)(id).then((function(){return loadTasks()}))}(item.id)},isRendered:userContext.userHasAccess(["ROLE_ADMIN"])}]}})]})})};GeneralTasks.displayName="GeneralTasks",GeneralTasks.__docgenInfo={description:"",methods:[],displayName:"GeneralTasks"},__webpack_exports__.default=GeneralTasks,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/Dispatcher/GeneralTasks/GeneralTasks.jsx"]={name:"GeneralTasks",docgenInfo:GeneralTasks.__docgenInfo,path:"src/components/MainPage/Dispatcher/GeneralTasks/GeneralTasks.jsx"})},3474:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(3475);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3475:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.general_tasks{--completed: #52d66c;--in-progress: #94bbe2;--delayed: #e79ecb;--problem: #da756e;--materials: #d4ad5e}.general_tasks .main-window__title{text-align:left;width:100%;padding:0 25px;box-sizing:border-box;margin-bottom:0px}.general_tasks .searchbar{width:calc(100% - 25px);text-align:left}.general_tasks .main-window__info-panel{margin-bottom:0}.general_tasks .main-window__filter-pick{margin-top:12px}.general_tasks .main-window__status-panel .main-window__list-item--completed::before{background-color:var(--completed)}.general_tasks .main-window__status-panel .main-window__list-item--delayed::before{background-color:var(--delayed)}.general_tasks .main-window__status-panel .main-window__list-item--materials::before{background-color:var(--materials)}.general_tasks .main-window__status-panel .main-window__list-item--in-progress::before{background-color:var(--in-progress)}.general_tasks .main-window__status-panel .main-window__list-item--problem::before{background-color:var(--problem)}\n",""]),module.exports=exports}}]);