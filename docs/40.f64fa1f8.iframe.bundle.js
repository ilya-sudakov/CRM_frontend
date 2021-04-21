(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{2861:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return workshops})),__webpack_require__.d(__webpack_exports__,"b",(function(){return requestStatuses})),__webpack_require__.d(__webpack_exports__,"a",(function(){return productsStatuses}));var workshops={requests:{name:"Заявки",title:"",redirectURL:"/requests",type:"requests",fullName:"Заявки"},lemz:{name:"ЛЭМЗ",title:"ЛЭМЗ",redirectURL:"/lemz/workshop-lemz",ordersRedirectURL:"/lemz/workshop-orders",storageRedirectURL:"/lemz/workshop-storage",type:"lemz",fullName:"ЦехЛЭМЗ"},lepsari:{name:"Лепсари",title:"Лепсари",redirectURL:"/lepsari/workshop-lepsari",ordersRedirectURL:"/lepsari/workshop-orders",storageRedirectURL:"/lepsari/workshop-storage",type:"lepsari",fullName:"ЦехЛепсари"},ligovskiy:{name:"Лиговский",title:"Лиговский",redirectURL:"/ligovskiy/workshop",ordersRedirectURL:"/ligovskiy/workshop-orders",storageRedirectURL:"/ligovskiy/workshop-storage",type:"ligovskiy",fullName:"ЦехЛиговский"},null:{name:"Заявки",title:"",redirectURL:"/requests",type:"requests",fullName:"Заявки"}},requestStatuses=[{name:"Проблема/Материалы",oldName:"Проблема-материалы",className:"materials",access:["ROLE_ADMIN","ROLE_WORKSHOP"],visible:!1},{name:"Завершено",className:"completed",access:["ROLE_ADMIN"]},{name:"Отгружено",className:"shipped",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_MANAGER"]},{name:"Частично отгружено",className:"shipped-in-parts",access:[]},{name:"Готово к отгрузке",oldName:"Готово",className:"ready",access:["ROLE_ADMIN","ROLE_WORKSHOP"]},{name:"В производстве",className:"in-production",access:[]},{name:"Ожидание",className:"waiting",access:["ROLE_ADMIN","ROLE_MANAGER","ROLE_WORKSHOP"]},{name:"Приоритет",className:"priority",access:["ROLE_ADMIN"]}],productsStatuses=[{name:"В работе",oldName:null,className:"production",access:["ROLE_ADMIN","ROLE_WORKSHOP","ROLE_MANAGER"]},{name:"Завершено",className:"completed",access:["ROLE_ADMIN"]},{name:"Приоритет",className:"defect",access:["ROLE_ADMIN"]}]},2868:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"g",(function(){return getClients})),__webpack_require__.d(__webpack_exports__,"j",(function(){return searchClients})),__webpack_require__.d(__webpack_exports__,"d",(function(){return editNextContactDateClient})),__webpack_require__.d(__webpack_exports__,"h",(function(){return getClientsByCategoryAndType})),__webpack_require__.d(__webpack_exports__,"f",(function(){return getClientById})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addClient})),__webpack_require__.d(__webpack_exports__,"c",(function(){return editClient})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteClient})),__webpack_require__.d(__webpack_exports__,"i",(function(){return getInfoByINN})),__webpack_require__.d(__webpack_exports__,"e",(function(){return getBIKByINN}));__webpack_require__(2873),__webpack_require__(257),__webpack_require__(36);var axios__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(258),axios__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__),_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(10);function getClients(elements){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/client/?size="+elements,method:"GET"})}function searchClients(query,fields){var formattedFields=fields.filter((function(cur){return""!==cur&&cur})).join("&");return console.log("formatted",formattedFields,fields),Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.b)({url:"".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL,"/api/v1/client/search/").concat(formattedFields&&""!==formattedFields?"".concat(formattedFields,"/"):""),method:"POST",body:JSON.stringify(query)})}function editNextContactDateClient(date){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/client/date/",method:"POST",body:JSON.stringify(date)})}function getClientsByCategoryAndType(category_type,curPage,itemsPerPage,sortOrder,signal){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/client/category_type/client/?page="+(curPage-1)+"&sort="+sortOrder.curSort+","+sortOrder[sortOrder.curSort]+"&size="+itemsPerPage,method:"POST",body:JSON.stringify(category_type),signal:signal})}function getClientById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/client/"+id,method:"GET"})}function addClient(newClient){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.a)();return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL,"/api/v1/client"),newClient,headers)}function editClient(newClient,id){var headers=Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.a)();return axios__WEBPACK_IMPORTED_MODULE_3___default.a.put("".concat(Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL,"/api/v1/client/").concat(id),newClient,headers)}function deleteClient(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/client/"+id,method:"DELETE"})}function getInfoByINN(INN){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.c)({url:"https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party",method:"POST",body:JSON.stringify(INN)})}function getBIKByINN(INN){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_4__.c)({url:"https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank",method:"POST",body:JSON.stringify(INN)})}},2873:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(21),IndexedObject=__webpack_require__(481),toIndexedObject=__webpack_require__(167),arrayMethodIsStrict=__webpack_require__(478),nativeJoin=[].join,ES3_STRINGS=IndexedObject!=Object,STRICT_METHOD=arrayMethodIsStrict("join",",");$({target:"Array",proto:!0,forced:ES3_STRINGS||!STRICT_METHOD},{join:function join(separator){return nativeJoin.call(toIndexedObject(this),void 0===separator?",":separator)}})},2880:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"f",(function(){return getPageByRequest})),__webpack_require__.d(__webpack_exports__,"c",(function(){return filterRequestsByPage})),__webpack_require__.d(__webpack_exports__,"e",(function(){return filterRequestsByStatuses})),__webpack_require__.d(__webpack_exports__,"d",(function(){return filterRequestsBySearchQuery})),__webpack_require__.d(__webpack_exports__,"k",(function(){return printRequest})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteItem})),__webpack_require__.d(__webpack_exports__,"l",(function(){return printRequestsList})),__webpack_require__.d(__webpack_exports__,"a",(function(){return copySelectedRequest})),__webpack_require__.d(__webpack_exports__,"h",(function(){return getRequestsDefaultInputs})),__webpack_require__.d(__webpack_exports__,"i",(function(){return getRequestsEditingDefaultInputs})),__webpack_require__.d(__webpack_exports__,"g",(function(){return getRequestRedirectUrl})),__webpack_require__.d(__webpack_exports__,"j",(function(){return getWorkshopOrdersDefaultInputs}));var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__),Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_20__=(__webpack_require__(257),__webpack_require__(51),__webpack_require__(165),__webpack_require__(672),__webpack_require__(673),__webpack_require__(83),__webpack_require__(475),__webpack_require__(201),__webpack_require__(134),__webpack_require__(166),__webpack_require__(154),__webpack_require__(202),__webpack_require__(23),__webpack_require__(1017),__webpack_require__(1018),__webpack_require__(36),__webpack_require__(473),__webpack_require__(301),__webpack_require__(63)),Utils_pdfFunctions_js__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(2862),API_requests__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(1021),_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(2861),API_Products_Categories_js__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(482),getPageByRequest=function getPageByRequest(item){return"Завершено"===item.status?"completed":"Отгружено"===item.status||"Частично отгружено"===item.status?"shipped":("Завершено"!==item.status&&"Отгружено"!==item.status&&item.status,"open")},filterRequestsByPage=function filterRequestsByPage(data,page){return data.filter((function(item){return"Завершено"===page&&"Завершено"===item.status||("Отгружено"===page&&("Отгружено"===item.status||"Частично отгружено"===item.status)||"Открытые"===page&&"Завершено"!==item.status&&"Отгружено"!==item.status&&"Частично отгружено"!==item.status)}))},filterRequestsByStatuses=function filterRequestsByStatuses(data,statuses){return data.filter((function(item){var check=!1,noActiveStatuses=!0;return statuses.map((function(status){statuses.map((function(status){status.visible&&(noActiveStatuses=!1)})),(!0===noActiveStatuses||status.visible&&(status.name===item.status||status.oldName===item.status))&&(check=!0)})),check}))},filterRequestsBySearchQuery=function filterRequestsBySearchQuery(data,searchQuery){var query=searchQuery.toLowerCase();return data.filter((function(item){return 0!==item.requestProducts.length&&null!==item.requestProducts[0].name?item.requestProducts[0].name.toLowerCase().includes(query)||item.id.toString().includes(query)||Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_20__.f)(item.date).includes(query)||(item.codeWord||"").toLowerCase().includes(query)||item.status.toLowerCase().includes(query)||item.responsible.toLowerCase().includes(query)||Object(Utils_functions_jsx__WEBPACK_IMPORTED_MODULE_20__.f)(item.shippingDate).includes(query):item.status.toLowerCase().includes(query)}))},printRequest=function printRequest(request){var _request$client$name,_request$client;Object(Utils_pdfFunctions_js__WEBPACK_IMPORTED_MODULE_21__.f)(request.date,request.requestProducts,null!==(_request$client$name=null===(_request$client=request.client)||void 0===_request$client?void 0:_request$client.name)&&void 0!==_request$client$name?_request$client$name:request.codeWord,_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__.c[request.factory].name,request.id)},deleteItem=function deleteItem(id,loadRequests){Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.j)(id).then((function(res){return res.json()})).then((function(res){return Promise.all(res.requestProducts.map((function(product){return Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.d)(product.id)})))})).then((function(){return Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.e)(id)})).then((function(){return loadRequests()})).catch((function(error){console.log(error)}))},printRequestsList=function printRequestsList(setIsLoading,productsQuantities,fullName){var categories={};setIsLoading(!0),Object(API_Products_Categories_js__WEBPACK_IMPORTED_MODULE_24__.d)().then((function(res){return res.json()})).then((function(res){res.map((function(category){void 0===categories[category.category]&&(categories=Object.assign({},categories,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({},category.category,{}))),Object.entries(productsQuantities).map((function(product){category.products.map((function(categoryProduct){product[0]===categoryProduct.name&&(categories=Object.assign({},categories,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({},category.category,Object.assign({},categories[category.category],_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({},product[0],product[1])))))}))}))}))})).then((function(){setIsLoading(!1),Object(Utils_pdfFunctions_js__WEBPACK_IMPORTED_MODULE_21__.e)(categories,fullName)})).catch((function(error){console.log(error),setIsLoading(!1)}))},copySelectedRequest=function copySelectedRequest(id,requests,setIsLoading,loadData){var _requestToBeCopied$cl,_requestToBeCopied$sh;setIsLoading(!0);var requestToBeCopied=requests.find((function(item){return item.id===id})),newId=0;Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.b)({date:requestToBeCopied.date,products:requestToBeCopied.requestProducts,quantity:requestToBeCopied.quantity,clientId:null===(_requestToBeCopied$cl=requestToBeCopied.client)||void 0===_requestToBeCopied$cl?void 0:_requestToBeCopied$cl.id,sum:requestToBeCopied.sum,responsible:requestToBeCopied.responsible,status:requestToBeCopied.status,shippingDate:null!==(_requestToBeCopied$sh=requestToBeCopied.shippingDate)&&void 0!==_requestToBeCopied$sh?_requestToBeCopied$sh:new Date,comment:requestToBeCopied.comment,factory:requestToBeCopied.factory}).then((function(res){return res.json()})).then((function(res){return newId=res.id,Promise.all(requestToBeCopied.requestProducts.map((function(item){return Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.a)({requestId:res.id,quantity:item.quantity,packaging:item.packaging,status:item.status,name:item.name})})))})).then((function(){var _requestToBeCopied$cl2;return Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.c)(newId,null===(_requestToBeCopied$cl2=requestToBeCopied.client)||void 0===_requestToBeCopied$cl2?void 0:_requestToBeCopied$cl2.id)})).then((function(){setIsLoading(!1),loadData()})).catch((function(error){setIsLoading(!1),console.log(error)}))},getRequestsDefaultInputs=function getRequestsDefaultInputs(username,type){return[{name:"date",defaultValue:new Date,isRequired:!0,isValid:!0},{name:"responsible",defaultValue:username,isRequired:!0,isValid:!0},{name:"status",defaultValue:"Ожидание",isRequired:!0,isValid:!0},{name:"requestProducts",defaultValue:[],isRequired:!0},{name:"shippingDate",defaultValue:new Date((new Date).setDate((new Date).getDate()+7)),isRequired:!0,isValid:!0},{name:"comment",defaultValue:""},{name:"factory",defaultValue:type},{name:"sum",defaultValue:0},{name:"clientId",defaultValue:0,isRequired:!0}]},getRequestsEditingDefaultInputs=function getRequestsEditingDefaultInputs(username,type){var defaultInputs=getRequestsDefaultInputs(username,type);return defaultInputs=defaultInputs.map((function(input){return Object.assign({},input,{isValid:!0})})),defaultInputs=[].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(defaultInputs),[{name:"client",defaultValue:null,isRequired:!0,isValid:!0},{name:"oldProducts",defaultValue:[],isRequired:!0,isValid:!0}])},getRequestRedirectUrl=function getRequestRedirectUrl(history,splitPoint,type,inputs){var id=history.location.pathname.split(splitPoint)[1];return"".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__.c[type].redirectURL,"/").concat(getPageByRequest(inputs),"#").concat(id)},getWorkshopOrdersDefaultInputs=function getWorkshopOrdersDefaultInputs(factory){return[{name:"name",defaultValue:"",isRequired:!0},{name:"status",defaultValue:"ordered"},{name:"date",defaultValue:new Date,isRequired:!0,isValid:!0},{name:"deliverBy",defaultValue:new Date((new Date).setDate((new Date).getDate()+7)),isRequired:!0,isValid:!0},{name:"assembly",defaultValue:"ordered"},{name:"products",defaultValue:[{name:"",quantity:""}]},{name:"factoryName",defaultValue:factory}]}},3004:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__(473),__webpack_require__(301),__webpack_require__(165),__webpack_require__(23),__webpack_require__(0)),API_Clients__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__(3005),__webpack_require__(2868)),Components_Form_SelectFromButton_SelectFromButton_jsx__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(2866),Utils_hooks__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(472),Components_Table_Table_jsx__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(356),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(1),SelectClient=function SelectClient(props){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_6__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),closeWindow=_useState2[0],setCloseWindow=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_6__.useState)([]),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3,2),clients=_useState4[0],setClients=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_6__.useState)(0),_useState6=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5,2),id=_useState6[0],setId=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_6__.useState)(""),_useState8=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7,2),name=_useState8[0],setName=_useState8[1],_useState9=Object(react__WEBPACK_IMPORTED_MODULE_6__.useState)(!1),_useState10=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState9,2),isLoading=_useState10[0],setIsLoading=_useState10[1];Object(react__WEBPACK_IMPORTED_MODULE_6__.useEffect)((function(){}),[]);var _useSearchBar=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_10__.g)(void 0,[],(function(query){""===query&&setClients([]),query.length>2&&function loadClients(query){setIsLoading(!0),Object(API_Clients__WEBPACK_IMPORTED_MODULE_8__.j)({name:query,city:query,type:null},[selectedOption]).then((function(response){return response.json()})).then((function(response){console.log(response),setIsLoading(!1),setClients(response)})).catch((function(error){setIsLoading(!1),console.log(error)}))}(query)}),[{text:"Везде",value:""},{text:"Город",value:"city"}]),searchBar=_useSearchBar.searchBar,selectedOption=_useSearchBar.selectedOption,columns=[{text:"Название",value:"name"},{text:"Сайт",value:"site",link:{getURL:function getURL(_ref){var _site$split,site=_ref.site;return site&&(null==site||null===(_site$split=site.split("//"))||void 0===_site$split?void 0:_site$split.length)>1?site:"https://".concat(site)},isOutside:!0,newTab:!0},formatFn:function formatFn(_ref3){var site=_ref3.site;return site&&site.split("//").length>1?site.split("//")[1]:site}},{text:"Контакты",value:"contacts",formatFn:function formatContacts(_ref2){var contacts=_ref2.contacts;return(null==contacts?void 0:contacts.length)>0?(""!==contacts[0].name?"".concat(contacts[0].name,", "):"")+contacts[0].phoneNumber:"Не указаны контакт. данные"}},{text:"Комментарий",value:"comment"}],_useFormWindow=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_10__.b)("Выбор клиента",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment,{children:[searchBar,0===clients.length?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",{style:{padding:"10px 25px"},children:"Введите не менее 3 символов для начала поиска"}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Components_Table_Table_jsx__WEBPACK_IMPORTED_MODULE_11__.a,{columns:columns,data:clients,loading:{isLoading:isLoading},onClick:function clickClient(_ref4){var id=_ref4.id,name=_ref4.name;setId(id),setName(name),props.onChange(id),toggleFormWindow(),setCloseWindow(!closeWindow)},options:{fullSize:!0}})]}),[closeWindow]),formWindow=_useFormWindow.formWindow,toggleFormWindow=_useFormWindow.toggleFormWindow;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",{className:"select-client",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",{className:"select-client__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",{className:"select-client__input_name main-form__input_name--header",children:[props.inputName+(props.required?"*":""),!props.readonly&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Components_Form_SelectFromButton_SelectFromButton_jsx__WEBPACK_IMPORTED_MODULE_9__.a,{text:"Выбрать клиента",onClick:function onClick(){return toggleFormWindow()}})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",{className:"select-client__input_field",children:(0!==id||props.defaultValue)&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",{className:"select-client__searchbar",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("input",{type:"text",className:!0===props.error?"select-client__input select-client__input--error":"select-client__input",value:props.defaultValue&&""===name?props.defaultValue:name,placeholder:"Выберите клиента, нажав на кнопку 'Выбрать клиента'",disabled:!0})})})]}),!0===props.error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",{className:"select-client__error",onClick:props.setErrorsArr?function(){return props.setErrorsArr(Object.assign({},props.errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},props.name,!1)))}:null,children:"Поле не заполнено!"}),formWindow]})};SelectClient.displayName="SelectClient",SelectClient.__docgenInfo={description:"",methods:[],displayName:"SelectClient"},__webpack_exports__.a=SelectClient,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/Clients/SelectClients/SelectClients.jsx"]={name:"SelectClient",docgenInfo:SelectClient.__docgenInfo,path:"src/components/MainPage/Clients/SelectClients/SelectClients.jsx"})},3005:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(3006);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3006:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.select-client{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:25px}.select-client .select-client__input{display:flex;width:100%;justify-content:space-between;flex-direction:column;align-items:flex-start}.select-client .select-client__input .select-client__input_name{color:#666;flex:0 1 20%;width:100%}.select-client .select-client__input .select-client__input_name--row{display:flex;flex-direction:row;justify-content:flex-start;align-items:center}.select-client .select-client__input .select-client__input_name--row .main-form__link{margin-left:20px}.select-client .select-client__input .select-client__input_field{width:calc(90% - 20px);width:100%}.select-client .select-client__error{width:100%;box-sizing:border-box;margin-top:1px;font-size:0.75rem;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.select-client .select-client__error--hidden{display:none}.select-client .main-form__button{font-size:0.8rem}.select-client .select-client__searchbar{display:flex;flex-direction:row;margin-top:5px;position:relative;min-height:2rem}.select-client .select-client__searchbar .select-client__input{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;z-index:0;transition:100ms ease-in-out}.select-client .select-client__searchbar .select-client__input:hover{border-color:#888888}.select-client .select-client__searchbar .select-client__input:focus{border:1px solid #4293b6}.select-client .select-client__searchbar .select-client__input--error{border:1px solid #f73434 !important}.select-client .select-client__searchbar .select-client__search_button{border:0;flex:0 1 15%;background-color:#4293b6;color:#fff;border-radius:5px;outline:none;cursor:pointer;padding:5px 10px;font-size:80%;transition:0.2s ease-in-out}.select-client .select-client__searchbar .select-client__search_button:hover{background-color:#519fc0}.select-client .main-window__list{position:relative;width:calc(100% + 30px) !important;margin-left:-15px}.select-client .main-window__list .main-window__list-item{cursor:pointer}.select-client .main-window__list .main-window__list-item span{align-items:center}.select-client .main-window__list .main-window__list-item span:nth-child(1){flex:0 1 15%}.select-client .main-window__list .main-window__list-item span:nth-child(2){flex:0 1 10%;max-width:120px;overflow:hidden;text-overflow:ellipsis}.select-client .main-window__list .main-window__list-item span:nth-child(3){flex:0 1 15%}.select-client .main-window__list .main-window__list-item span:nth-child(4){flex:0 1 30%;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.select-client .searchbar{padding-bottom:10px;margin-bottom:0px}@media (max-width: 768px){.select-client .select-client__input{flex-wrap:wrap;flex-direction:column}.select-client .select-client__input .select-client__input_name{width:100%}.select-client .select-client__input .select-client__input_field{width:100%}.select-client .select-client__input .select-client__input_field input{padding:10px !important}}\n",""]),module.exports=exports},3290:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_13__=(__webpack_require__(51),__webpack_require__(165),__webpack_require__(134),__webpack_require__(83),__webpack_require__(166),__webpack_require__(154),__webpack_require__(202),__webpack_require__(473),__webpack_require__(301),__webpack_require__(1016),__webpack_require__(674),__webpack_require__(201),__webpack_require__(0)),Components_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_16__=(__webpack_require__(3291),__webpack_require__(2854),__webpack_require__(2859)),Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(2851),Components_Form_InputUser_InputUser_jsx__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(2938),Components_Form_InputProducts_InputProducts_jsx__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(3054),Components_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(153),_App_js__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(135),API_requests__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(1021),_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(2861),_Clients_SelectClients_SelectClients_jsx__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(3004),_functions_js__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(2880),Utils_hooks__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(472),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(1),EditRequest=function EditRequest(props){var _formInputs$client2,_useState=Object(react__WEBPACK_IMPORTED_MODULE_13__.useState)(1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState,2),requestId=_useState2[0],setRequestId=_useState2[1],userContext=Object(react__WEBPACK_IMPORTED_MODULE_13__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_21__.a),requestsDefaultInputs=Object(_functions_js__WEBPACK_IMPORTED_MODULE_25__.i)(userContext.userData.username,props.type),_useForm=Object(Utils_hooks__WEBPACK_IMPORTED_MODULE_26__.a)(requestsDefaultInputs),_handleInputChange=_useForm.handleInputChange,formInputs=_useForm.formInputs,formErrors=_useForm.formErrors,setFormErrors=_useForm.setFormErrors,formIsValid=_useForm.formIsValid,updateFormInputs=_useForm.updateFormInputs,errorWindow=_useForm.errorWindow,_useState3=Object(react__WEBPACK_IMPORTED_MODULE_13__.useState)(!1),_useState4=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1];return Object(react__WEBPACK_IMPORTED_MODULE_13__.useEffect)((function(){document.title="Редактирование заявки";var id=props.history.location.pathname.split("edit/")[1];isNaN(Number.parseInt(id))?(alert("Неправильный индекс заявки!"),props.history.push(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__.c[props.type].redirectURL)):(setRequestId(id),Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.j)(id).then((function(res){return res.json()})).then((function(oldRequest){updateFormInputs({date:oldRequest.date,oldProducts:oldRequest.requestProducts,requestProducts:oldRequest.requestProducts,quantity:oldRequest.quantity,responsible:oldRequest.responsible,status:oldRequest.status,shippingDate:null!==oldRequest.shippingDate?oldRequest.shippingDate:new Date,comment:oldRequest.comment,factory:oldRequest.factory,sum:oldRequest.sum,client:oldRequest.client,clientId:oldRequest.client?oldRequest.client.id:0})})).catch((function(error){console.log(error),alert("Неправильный индекс заявки!"),props.history.push(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__.c[props.type].redirectURL)})))}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"edit-request",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"main-form",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsxs)("form",{className:"main-form__form",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"main-form__title",children:"Редактирование заявки ".concat(_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__.c[props.type].title)})}),errorWindow,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsxs)("div",{className:"main-form__row",children:[userContext.userHasAccess(["ROLE_ADMIN","ROLE_MANAGER","ROLE_WORKSHOP"])&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_16__.a,{inputName:"Дата заявки",required:!0,error:formErrors.date,name:"date",selected:Date.parse(formInputs.date),handleDateChange:function handleDateChange(value){return _handleInputChange("date",value)},errorsArr:formErrors,setErrorsArr:setFormErrors,readOnly:userContext.userHasAccess(["ROLE_WORKSHOP"])}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_InputDate_InputDate_jsx__WEBPACK_IMPORTED_MODULE_16__.a,{inputName:"Дата отгрузки",name:"shippingDate",selected:Date.parse(formInputs.shippingDate),handleDateChange:function handleDateChange(value){return _handleInputChange("shippingDate",value)},errorsArr:formErrors,setErrorsArr:setFormErrors})]}),userContext.userHasAccess(["ROLE_ADMIN","ROLE_MANAGER","ROLE_WORKSHOP"])&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_InputProducts_InputProducts_jsx__WEBPACK_IMPORTED_MODULE_19__.a,{inputName:"Продукция",userHasAccess:userContext.userHasAccess,required:!0,options:!0,onChange:function onChange(products){return _handleInputChange("requestProducts",products)},searchPlaceholder:"Введите название продукта для поиска...",defaultValue:formInputs.requestProducts,error:formErrors.requestProducts,errorsArr:formErrors,setErrorsArr:setFormErrors,workshop:userContext.userHasAccess(["ROLE_WORKSHOP"])}),userContext.userHasAccess(["ROLE_ADMIN","ROLE_MANAGER","ROLE_WORKSHOP"])&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_InputUser_InputUser_jsx__WEBPACK_IMPORTED_MODULE_18__.a,{inputName:"Ответственный",userData:userContext.userData,required:!0,error:formErrors.responsible,defaultValue:formInputs.responsible,name:"responsible",handleUserChange:function handleUserChange(user){return _handleInputChange("responsible",user)},searchPlaceholder:"Введите имя пользователя для поиска...",errorsArr:formErrors,setErrorsArr:setFormErrors,readOnly:userContext.userHasAccess(["ROLE_WORKSHOP"])}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsxs)("div",{className:"main-form__item",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"main-form__input_name",children:"Статус*"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"main-form__input_field",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("select",{name:"status",onChange:function onChange(_ref){var target=_ref.target;return _handleInputChange("status",target.value)},value:formInputs.status,children:_workshopVariables_js__WEBPACK_IMPORTED_MODULE_23__.b.map((function(status){return userContext.userHasAccess(status.access)?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("option",{value:status.oldName===formInputs.status?status.oldName:status.name,children:status.name}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("option",{style:{display:"none"},children:status.name})}))})})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{inputName:"Комментарий",name:"comment",defaultValue:formInputs.comment,handleInputChange:function handleInputChange(_ref2){var target=_ref2.target;return _handleInputChange("comment",target.value)}}),userContext.userHasAccess(["ROLE_ADMIN","ROLE_MANAGER"])?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_InputText_InputText_jsx__WEBPACK_IMPORTED_MODULE_17__.a,{inputName:"Сумма",name:"sum",type:"number",defaultValue:formInputs.sum,handleInputChange:function handleInputChange(_ref3){var target=_ref3.target;return _handleInputChange("sum",target.value)},errorsArr:formErrors,setErrorsArr:setFormErrors}):null,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(_Clients_SelectClients_SelectClients_jsx__WEBPACK_IMPORTED_MODULE_24__.a,{inputName:"Клиент",userHasAccess:userContext.userHasAccess,defaultValue:0!==formInputs.clientId&&(null===(_formInputs$client2=formInputs.client)||void 0===_formInputs$client2?void 0:_formInputs$client2.name),required:!0,readOnly:userContext.userHasAccess(["ROLE_WORKSHOP"]),onChange:function onChange(value){return _handleInputChange("clientId",value)},error:formErrors.clientId,errorsArr:formErrors,setErrorsArr:setFormErrors}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)("div",{className:"main-form__input_hint",children:"* - поля, обязательные для заполнения"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_20__.a,{text:"Вернуться назад",className:"main-form__submit main-form__submit--inverted",inverted:!0,onClick:function onClick(){return props.history.push(Object(_functions_js__WEBPACK_IMPORTED_MODULE_25__.g)(props.history,"edit/",props.type,formInputs))}}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_27__.jsx)(Components_Form_Button_Button_jsx__WEBPACK_IMPORTED_MODULE_20__.a,{text:"Обновить данные",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){formIsValid()&&(setIsLoading(!0),Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.h)(formInputs,requestId).then((function(){var productsArr=formInputs.requestProducts.map((function(selected){var edited=!1,oldItem=null;if(formInputs.oldProducts.map((function(item){if(item.id===selected.id)return edited=!0,void(oldItem=item)})),oldItem!==selected)return edited?Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.g)({requestId:requestId,quantity:selected.quantity,status:selected.status,packaging:selected.packaging,name:selected.name},selected.id):Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.a)({requestId:requestId,quantity:selected.quantity,packaging:selected.packaging,status:selected.status,name:selected.name})}));return Promise.all(productsArr).then((function(){var productsArr=formInputs.oldProducts.map((function(item){var deleted=!0;return formInputs.requestProducts.map((function(selected){selected.id!==item.id||(deleted=!1)})),deleted&&Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.d)(item.id)}));return Promise.all(productsArr)}))})).then((function(){var _formInputs$client;if((null===(_formInputs$client=formInputs.client)||void 0===_formInputs$client?void 0:_formInputs$client.id)!==formInputs.clientId)return Object(API_requests__WEBPACK_IMPORTED_MODULE_22__.c)(requestId,formInputs.clientId)})).then((function(){return props.history.push(Object(_functions_js__WEBPACK_IMPORTED_MODULE_25__.g)(props.history,"edit/",props.type,formInputs))})).catch((function(error){setIsLoading(!1),console.log(error)})))}})]})]})})})};EditRequest.displayName="EditRequest",EditRequest.__docgenInfo={description:"",methods:[],displayName:"EditRequest"},__webpack_exports__.default=EditRequest,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/WorkshopsComponents/Forms/EditRequest/EditRequest.jsx"]={name:"EditRequest",docgenInfo:EditRequest.__docgenInfo,path:"src/components/MainPage/WorkshopsComponents/Forms/EditRequest/EditRequest.jsx"})},3291:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(3292);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3292:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports}}]);