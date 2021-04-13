(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{2844:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return workshops})),__webpack_require__.d(__webpack_exports__,"b",(function(){return requestStatuses})),__webpack_require__.d(__webpack_exports__,"a",(function(){return productsStatuses}));var workshops={requests:{name:"Заявки",title:"",redirectURL:"/requests",type:"requests",fullName:"Заявки"},lemz:{name:"ЛЭМЗ",title:"ЛЭМЗ",redirectURL:"/lemz/workshop-lemz",ordersRedirectURL:"/lemz/workshop-orders",storageRedirectURL:"/lemz/workshop-storage",type:"lemz",fullName:"ЦехЛЭМЗ"},lepsari:{name:"Лепсари",title:"Лепсари",redirectURL:"/lepsari/workshop-lepsari",ordersRedirectURL:"/lepsari/workshop-orders",storageRedirectURL:"/lepsari/workshop-storage",type:"lepsari",fullName:"ЦехЛепсари"},ligovskiy:{name:"Лиговский",title:"Лиговский",redirectURL:"/ligovskiy/workshop",ordersRedirectURL:"/ligovskiy/workshop-orders",storageRedirectURL:"/ligovskiy/workshop-storage",type:"ligovskiy",fullName:"ЦехЛиговский"},null:{name:"Заявки",title:"",redirectURL:"/requests",type:"requests",fullName:"Заявки"}},requestStatuses=[{name:"Проблема/Материалы",oldName:"Проблема-материалы",className:"materials",access:["ROLE_ADMIN","ROLE_WORKSHOP"],visible:!1},{name:"Завершено",className:"completed",access:["ROLE_ADMIN"]},{name:"Отгружено",className:"shipped",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_MANAGER"]},{name:"Частично отгружено",className:"shipped-in-parts",access:[]},{name:"Готово к отгрузке",oldName:"Готово",className:"ready",access:["ROLE_ADMIN","ROLE_WORKSHOP"]},{name:"В производстве",className:"in-production",access:[]},{name:"Ожидание",className:"waiting",access:["ROLE_ADMIN","ROLE_MANAGER","ROLE_WORKSHOP"]},{name:"Приоритет",className:"priority",access:["ROLE_ADMIN"]}],productsStatuses=[{name:"В работе",oldName:null,className:"production",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_MANAGER"]},{name:"Завершено",className:"completed",access:["ROLE_ADMIN"]},{name:"Приоритет",className:"defect",access:["ROLE_ADMIN"]}]},2947:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"h",(function(){return getOrdersByName})),__webpack_require__.d(__webpack_exports__,"g",(function(){return getOrderById})),__webpack_require__.d(__webpack_exports__,"c",(function(){return deleteOrder})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addOrder})),__webpack_require__.d(__webpack_exports__,"e",(function(){return editOrder})),__webpack_require__.d(__webpack_exports__,"b",(function(){return addProductToOrder})),__webpack_require__.d(__webpack_exports__,"f",(function(){return editProductInOrder})),__webpack_require__.d(__webpack_exports__,"d",(function(){return deleteProductFromOrder}));__webpack_require__(23);var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(10);function getOrdersByName(orderName,signal){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment/name/",method:"POST",body:JSON.stringify(Object.assign({},orderName,{signal:signal}))})}function getOrderById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment/"+id,method:"GET"})}function deleteOrder(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment/"+id,method:"DELETE"})}function addOrder(order){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment/",method:"POST",body:JSON.stringify(order)})}function editOrder(order,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment/"+id,method:"PUT",body:JSON.stringify(order)})}function addProductToOrder(product){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment_product/",method:"POST",body:JSON.stringify(product)})}function editProductInOrder(product,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment_product/"+id,method:"PUT",body:JSON.stringify(product)})}function deleteProductFromOrder(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_1__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/equipment_product/"+id,method:"DELETE"})}},3442:function(module,exports,__webpack_require__){var api=__webpack_require__(44),content=__webpack_require__(3443);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3443:function(module,exports,__webpack_require__){(exports=__webpack_require__(45)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.workshop-orders{--ordered: #3ecaca;--completed: #399639;--sent: #bdbd41;--problem: #c23737}.workshop-orders .control-panel{margin-top:-10px;border-top:1px solid #dddddd}.workshop-orders .control-panel .main-window__control-panel-wrapper .main-window__info-panel{margin-bottom:0}.workshop-orders .control-panel .main-window__control-panel-wrapper .main-window__status-panel{margin-bottom:0}.workshop-orders .main-window__status-panel .main-window__button::before{content:"";display:inline-block;position:absolute;width:10px;height:10px;left:5px;-moz-border-radius:7.5px;-webkit-border-radius:7.5px;border-radius:7.5px;background-color:#cccccc}.workshop-orders .main-window__status-panel .main-window__list-item--ordered::before{background-color:var(--ordered)}.workshop-orders .main-window__status-panel .main-window__list-item--sent::before{background-color:var(--sent)}.workshop-orders .main-window__status-panel .main-window__list-item--completed::before{background-color:var(--completed)}.workshop-orders .main-window__status-panel .main-window__list-item--problem::before{background-color:var(--problem)}.workshop-orders .main-window__status-panel .main-window__button--inverted{color:#555555}.workshop-orders .main-window__list .main-window__list-item{padding-left:25px;position:relative}.workshop-orders .main-window__list .main-window__list-item:not(.main-window__list-item--header)::before{content:"";display:inline-block;position:absolute;width:7px;height:calc(100% - 10px);left:10px;background-color:#cccccc;border-radius:999px}.workshop-orders .main-window__list .main-window__list-item:not(.main-window__list-item--header) span:nth-child(5)::before{content:"";display:inline-block;position:absolute;width:10px;height:30px;top:calc(50% - 15px);border-radius:5px;left:0px;background-color:#cccccc;background-color:#cccccc}.workshop-orders .main-window__list .main-window__list-item .main-window__list-col{display:flex;flex-direction:column}.workshop-orders .main-window__list .main-window__list-item .main-window__list-col .workshop-orders__products{display:flex;flex-direction:row;align-items:center;margin-bottom:5px}.workshop-orders .main-window__list .main-window__list-item .main-window__list-col .workshop-orders__products div:nth-child(1){margin-right:10px}.workshop-orders .main-window__list .main-window__list-item .main-window__list-col .workshop-orders__products div:nth-child(2){font-size:90%;font-style:italic}.workshop-orders .main-window__list .main-window__list-item .main-window__list-col .workshop-orders__products:last-child{margin-bottom:0}.workshop-orders .main-window__list .main-window__list-item span:nth-child(1){flex:0 1 10%;max-width:80px}.workshop-orders .main-window__list .main-window__list-item span:nth-child(3){flex:0 1 30%}.workshop-orders .main-window__list .main-window__list-item span:nth-child(4){flex:0 1 15%;font-size:90%}.workshop-orders .main-window__list .main-window__list-item span:nth-child(5){flex:0 1 10%;min-height:100%;align-self:stretch;display:flex;font-size:90%;max-width:100px;position:relative;padding-left:20px}.workshop-orders .main-window__list .main-window__list-item span:nth-child(6){max-width:100px;margin-right:10px}.workshop-orders .main-window__list .main-window__list-item .main-window__actions{flex-direction:row}.workshop-orders .main-window__list .main-window__list-item--ordered:not(.main-window__list-item--header)::before{background-color:var(--ordered) !important}.workshop-orders .main-window__list .main-window__list-item--sent:not(.main-window__list-item--header)::before{background-color:var(--sent) !important}.workshop-orders .main-window__list .main-window__list-item--completed:not(.main-window__list-item--header)::before{background-color:var(--completed) !important}.workshop-orders .main-window__list .main-window__list-item--problem:not(.main-window__list-item--header)::before{background-color:var(--problem) !important}@media (max-width: 768px){.workshop-orders .main-window__info-panel{flex-direction:column}.workshop-orders .main-window__info-panel .main-window__amount_table{width:100%;text-align:right}.workshop-orders .main-window__list .main-window__list-item span:nth-child(1){max-width:100% !important}.workshop-orders .main-window__list .main-window__list-item span:nth-child(3) .main-window__list-col{align-items:flex-end}.workshop-orders .main-window__list .main-window__list-item span:nth-child(4){font-size:100% !important}.workshop-orders .main-window__list .main-window__list-item span:nth-child(5){max-width:100% !important;padding-left:0 !important;padding-right:20px;font-size:100% !important;width:calc(100% - 15px)}.workshop-orders .main-window__list .main-window__list-item span:nth-child(5)::before{top:calc(50% - 10px) !important;height:20px !important;border-radius:5px !important;left:auto !important;right:5px}.workshop-orders .main-window__list .main-window__list-item span:nth-child(6){max-width:100% !important;margin-right:0 !important}}\n',""]),module.exports=exports},3597:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var toConsumableArray=__webpack_require__(18),toConsumableArray_default=__webpack_require__.n(toConsumableArray),slicedToArray=__webpack_require__(7),slicedToArray_default=__webpack_require__.n(slicedToArray),react=(__webpack_require__(131),__webpack_require__(80),__webpack_require__(163),__webpack_require__(151),__webpack_require__(199),__webpack_require__(50),__webpack_require__(255),__webpack_require__(660),__webpack_require__(661),__webpack_require__(162),__webpack_require__(465),__webpack_require__(23),__webpack_require__(35),__webpack_require__(0)),SearchBar=(__webpack_require__(3442),__webpack_require__(348)),functions=__webpack_require__(61),Orders=__webpack_require__(2947),FloatingButton=__webpack_require__(664),ControlPanel=__webpack_require__(663),App=__webpack_require__(132),Table=(__webpack_require__(470),__webpack_require__(198),__webpack_require__(349)),styled_components_browser_esm=__webpack_require__(26),jsx_runtime=__webpack_require__(1),Table_Tableview=function Tableview(_ref){var data=_ref.data,isLoading=_ref.isLoading,deleteItem=_ref.deleteItem,userHasAccess=_ref.userHasAccess,link=_ref.link,loadData=_ref.loadData,ProductsWrapper=styled_components_browser_esm.b.div.withConfig({displayName:"Table__ProductsWrapper",componentId:"sc-1tcz5v2-0"})(["display:flex;flex-direction:column;"]),ProductRow=styled_components_browser_esm.b.div.withConfig({displayName:"Table__ProductRow",componentId:"sc-1tcz5v2-1"})(["display:flex;&:not(:last-child){margin-bottom:5px;}span{&:first-child{margin-right:5px;}&:last-child{color:#777;}}"]),columns=[{text:"Дата создания",value:"date",formatFn:function formatFn(_ref2){var date=_ref2.date;return Object(functions.f)(date)}},{text:"Название",value:"name"},{text:"Продукция",value:"products",formatFn:function formatFn(_ref3){var products=_ref3.products;return Object(jsx_runtime.jsx)(ProductsWrapper,{children:products.map((function(product){return Object(jsx_runtime.jsxs)(ProductRow,{children:[Object(jsx_runtime.jsx)("span",{children:product.name}),Object(jsx_runtime.jsxs)("span",{children:[" (",Object(functions.a)(product.quantity)," шт.)"]})]},product.id)}))})}},{text:"Комплектация",value:"assembly"},{text:"Статус",value:"status",status:{onChange:function onChange(value,item){return function handleStatusChange(item,value){return Object(Orders.e)(Object.assign({},item,{date:new Date(item.date).getTime()/1e3,deliverBy:new Date(item.deliverBy).getTime()/1e3,status:value}),item.id).then((function(){return loadData()}))}(item,value)},options:[{text:"Заказано",value:"ordered"},{text:"Отправлено",value:"sent"},{text:"Проблема",value:"problem"},{text:"Завершено",value:"completed"}]}},{text:"Дата поставки",value:"name",formatFn:function formatFn(_ref4){var deliverBy=_ref4.deliverBy;return Object(functions.f)(deliverBy)},badge:{isVisibleFn:function isVisibleFn(_ref5){var deliverBy=_ref5.deliverBy,status=_ref5.status;return new Date(deliverBy)<new Date&&"completed"!==status},type:"error"}}];return Object(jsx_runtime.jsx)(Table.a,{data:data,columns:columns,actions:function actions(item){return[{elementType:"edit",title:"Редактировать запись",link:"".concat(link,"/edit/").concat(item.id)},{elementType:"delete",title:"Удаление записи",onClick:function onClick(){return deleteItem(item)},isRendered:userHasAccess(["ROLE_ADMIN"])}]},loading:{isLoading:isLoading}})};Table_Tableview.displayName="Tableview",Table_Tableview.__docgenInfo={description:"",methods:[],displayName:"Tableview"};var WorkshopOrders_Table=Table_Tableview;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/WorkshopsComponents/WorkshopOrders/Table.jsx"]={name:"Tableview",docgenInfo:Table_Tableview.__docgenInfo,path:"src/components/MainPage/WorkshopsComponents/WorkshopOrders/Table.jsx"});var sorting=__webpack_require__(298),workshopVariables=__webpack_require__(2844),WorkshopOrders_WorkshopOrders_WorkshopOrders=function WorkshopOrders(props){var _useState=Object(react.useState)(!0),_useState2=slicedToArray_default()(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=Object(react.useState)(""),_useState4=slicedToArray_default()(_useState3,2),searchQuery=_useState4[0],setSearchQuery=_useState4[1],_useState5=Object(react.useState)([]),_useState6=slicedToArray_default()(_useState5,2),orders=_useState6[0],setOrders=_useState6[1],userContext=Object(react.useContext)(App.a),_useState7=Object(react.useState)([{className:"sent",name:"Отправлено",visible:!0},{className:"completed",name:"Завершено",visible:!1},{className:"ordered",name:"Заказано",visible:!0},{className:"problem",name:"Проблема",visible:!0}]),_useState8=slicedToArray_default()(_useState7,2),statuses=_useState8[0],setStatuses=_useState8[1],loadData=function loadData(signal){return setIsLoading(!0),Object(Orders.h)({name:workshopVariables.c[props.type].fullName},signal).then((function(res){return res.json()})).then((function(res){setOrders(res),setIsLoading(!1)})).catch((function(error){console.log(error),setIsLoading(!1)}))};return Object(react.useState)((function(){document.title="Комплектация ".concat(workshopVariables.c[props.type].name);var abortController=new AbortController;return loadData(abortController.signal),setIsLoading(!1),function cancel(){abortController.abort()}}),[]),Object(jsx_runtime.jsx)("div",{className:"workshop-orders",children:Object(jsx_runtime.jsxs)("div",{className:"main-window",children:[Object(jsx_runtime.jsx)(SearchBar.a,{fullSize:!0,placeholder:"Введите запрос для поиска...",setSearchQuery:setSearchQuery}),Object(jsx_runtime.jsx)(FloatingButton.a,{linkTo:"".concat(workshopVariables.c[props.type].ordersRedirectURL,"/new"),visibility:["ROLE_ADMIN","ROLE_ENGINEER","ROLE_LEMZ"]}),Object(jsx_runtime.jsx)(ControlPanel.a,{itemsCount:"Всего: ".concat(orders.length," записей"),content:Object(jsx_runtime.jsx)("div",{className:"main-window__info-panel",children:Object(jsx_runtime.jsxs)("div",{className:"main-window__status-panel",children:[Object(jsx_runtime.jsx)("div",{children:"Фильтр по статусам: "}),statuses.map((function(status,index){return Object(jsx_runtime.jsx)("div",{className:"main-window__button ".concat(status.visible?"":"main-window__button--inverted"," main-window__list-item--").concat(status.className),onClick:function onClick(){return function handleStatusClick(index,status){var temp=statuses;temp.splice(index,1,Object.assign({},status,{visible:!status.visible})),setStatuses(toConsumableArray_default()(temp))}(index,status)},children:status.name},index)}))]})})}),Object(jsx_runtime.jsx)(WorkshopOrders_Table,{data:Object(sorting.a)(function filterOrders(data){return data.filter((function(item){if(item.name.toLowerCase().includes(searchQuery.toLowerCase())||Object(functions.f)(item.deliverBy).toLowerCase().includes(searchQuery.toLowerCase())||item.assembly.toLowerCase().includes(searchQuery.toLowerCase())){var check=!1;return statuses.map((function(status){status.visible&&status.className===item.status&&(check=!0)})),check}}))}(orders),{fieldName:"date",direction:"asc"}),link:workshopVariables.c[props.type].ordersRedirectURL,isLoading:isLoading,deleteItem:function deleteItem(item){Promise.all(item.products.map((function(product){return Object(Orders.d)(product.id)}))).then((function(){return Object(Orders.c)(item.id)})).then((function(){return loadData()}))},userHasAccess:userContext.userHasAccess,loadData:loadData})]})})};WorkshopOrders_WorkshopOrders_WorkshopOrders.displayName="WorkshopOrders",WorkshopOrders_WorkshopOrders_WorkshopOrders.__docgenInfo={description:"",methods:[],displayName:"WorkshopOrders"};__webpack_exports__.default=WorkshopOrders_WorkshopOrders_WorkshopOrders;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/WorkshopsComponents/WorkshopOrders/WorkshopOrders.jsx"]={name:"WorkshopOrders",docgenInfo:WorkshopOrders_WorkshopOrders_WorkshopOrders.__docgenInfo,path:"src/components/MainPage/WorkshopsComponents/WorkshopOrders/WorkshopOrders.jsx"})}}]);