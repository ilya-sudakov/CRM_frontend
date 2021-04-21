(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{2851:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(165),__webpack_require__(23),__webpack_require__(2)),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(2852),__webpack_require__(1)),InputText=function InputText(_ref){var inputName=_ref.inputName,required=_ref.required,error=_ref.error,type=_ref.type,name=_ref.name,handleInputChange=_ref.handleInputChange,defaultValue=_ref.defaultValue,readOnly=_ref.readOnly,disabled=_ref.disabled,setErrorsArr=_ref.setErrorsArr,errorsArr=_ref.errorsArr;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"input_text__input",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__input_name",children:inputName+(required?"*":"")}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:!0===error?"input_text__input_field input_text__input_field--error":"input_text__input_field",children:"textarea"===type?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea",{name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input",{type:type||"text",name:name,autoComplete:"off",onChange:handleInputChange,value:defaultValue,readOnly:readOnly,disabled:disabled})})]}),error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"input_text__error",onClick:setErrorsArr?function(){return setErrorsArr(Object.assign({},errorsArr,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({},name,!1)))}:null,children:"Поле не заполнено!"})]})};InputText.displayName="InputText",InputText.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{inputName:{type:{name:"string"},required:!1,description:""},required:{type:{name:"bool"},required:!1,description:""},error:{type:{name:"bool"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},name:{type:{name:"string"},required:!1,description:""},handleInputChange:{type:{name:"func"},required:!1,description:""},defaultValue:{type:{name:"string"},required:!1,description:""},readOnly:{type:{name:"bool"},required:!1,description:""},disabled:{type:{name:"bool"},required:!1,description:""},setErrorsArr:{type:{name:"func"},required:!1,description:""},errorsArr:{type:{name:"object"},required:!1,description:""}}},__webpack_exports__.a=InputText,InputText.propTypes={inputName:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,required:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,error:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,type:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,handleInputChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,defaultValue:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,setErrorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,errorsArr:prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Form/InputText/InputText.jsx"]={name:"InputText",docgenInfo:InputText.__docgenInfo,path:"src/components/Form/InputText/InputText.jsx"})},2852:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(2853);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2853:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.input_text{width:calc(100% - 20px);display:flex;flex-direction:column;margin-bottom:20px}.input_text .input_text__error{width:100%;margin-top:1px;font-size:0.75rem;box-sizing:border-box;border:1px solid #d48282;background-color:#fadada;color:#ad1c1c;border-radius:3px;padding:5px 10px;transition:0.2s ease-in-out;cursor:pointer}.input_text .input_text__input{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;width:100%}.input_text .input_text__input .input_text__input_name{color:#666;padding-right:10px;flex:0 1 calc(20% - 10px);width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{display:flex;justify-content:center;width:calc(90% - 20px);position:relative;min-height:2rem;width:100%}.input_text .input_text__input .input_text__input_field input[type="text"],.input_text .input_text__input .input_text__input_field input[type="password"],.input_text .input_text__input .input_text__input_field input[type="number"],.input_text .input_text__input .input_text__input_field textarea{border:1px solid #bbbbbb;width:100%;padding:5px 10px;border-radius:3px;transition:100ms ease-in-out;box-sizing:border-box}.input_text .input_text__input .input_text__input_field input[type="text"]:hover,.input_text .input_text__input .input_text__input_field input[type="password"]:hover,.input_text .input_text__input .input_text__input_field input[type="number"]:hover,.input_text .input_text__input .input_text__input_field textarea:hover{border-color:#888888}.input_text .input_text__input .input_text__input_field input[type="text"]:focus,.input_text .input_text__input .input_text__input_field input[type="password"]:focus,.input_text .input_text__input .input_text__input_field input[type="number"]:focus,.input_text .input_text__input .input_text__input_field textarea:focus{border:1px solid #4293b6}.input_text .input_text__input .input_text__input_field input::-webkit-outer-spin-button,.input_text .input_text__input .input_text__input_field input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.input_text .input_text__input .input_text__input_field textarea{min-width:calc(100% - 20px);outline:none;min-height:100px;max-height:150px;resize:vertical}.input_text .input_text__input .input_text__input_field input[type="number"]{-moz-appearance:textfield}.input_text .input_text__input .input_text__input_field--error input[type="text"],.input_text .input_text__input .input_text__input_field--error input[type="number"],.input_text .input_text__input .input_text__input_field--error input[type="password"],.input_text .input_text__input .input_text__input_field--error textarea{border:1px solid #d48282 !important}@media (max-width: 768px){.input_text .input_text__input{flex-wrap:wrap;align-items:flex-start;flex-direction:column}.input_text .input_text__input .input_text__input_name{width:100%;margin-bottom:5px}.input_text .input_text__input .input_text__input_field{width:calc(100% - 0px)}.input_text .input_text__input .input_text__input_field input{padding:10px !important}}\n',""]),module.exports=exports},2937:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"d",(function(){return getFeedback})),__webpack_require__.d(__webpack_exports__,"e",(function(){return getFeedbackById})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteFeedbackById})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addFeedback})),__webpack_require__.d(__webpack_exports__,"c",(function(){return editFeedback}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getFeedback(){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/",method:"GET"})}function getFeedbackById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/"+id,method:"GET"})}function deleteFeedbackById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/"+id,method:"DELETE"})}function addFeedback(newFeedback){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/",method:"POST",body:JSON.stringify(newFeedback)})}function editFeedback(newFeedback,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/"+id,method:"PUT",body:JSON.stringify(newFeedback)})}},3052:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return getMessagesByDiscussionId})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addMessage})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteMessage}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getMessagesByDiscussionId(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/discussion/"+id,method:"GET"})}function addMessage(newMessage){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/message/",method:"POST",body:JSON.stringify(newMessage)})}function deleteMessage(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_URL+"/api/v1/feedback/message/"+id,method:"DELETE"})}},3505:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(3506);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3506:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}\n",""]),module.exports=exports},3507:function(module,exports,__webpack_require__){var api=__webpack_require__(45),content=__webpack_require__(3508);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},3508:function(module,exports,__webpack_require__){(exports=__webpack_require__(46)(!1)).push([module.i,':root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.feedback-chat{width:calc(100% - 25px);padding:15px 10px}.feedback-chat .feedback-chat__title{font-size:24px}.feedback-chat .feedback-chat__list{margin-top:5px;margin-top:15px;margin-bottom:15px;padding-left:3em;min-height:5rem;max-height:500px;overflow-y:auto}.feedback-chat .feedback-chat__list .feedback-chat__message{position:relative}.feedback-chat .feedback-chat__list .feedback-chat__message:first-of-type .feedback-chat__author{margin-top:0}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__img{position:absolute;top:0;left:-35px;width:30px;max-height:40px}.feedback-chat .feedback-chat__list .feedback-chat__message [data-letters]:before{content:attr(data-letters);display:inline-block;font-size:1em;width:2.5em;height:2.5em;line-height:2.5em;text-align:center;border-radius:50%;background-color:#4293b6;vertical-align:middle;margin-right:1em;color:white;position:absolute;top:5px;left:-3em}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__header{display:flex;justify-content:flex-start;margin-top:20px;align-items:center}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__header .feedback-chat__author{font-size:100%;margin-right:10px;line-height:1rem;color:#347591}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__header .feedback-chat__date{font-size:80%;line-height:1rem;color:#555555;margin-top:0.5px}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__text{margin-top:5px;font-size:85%;padding-right:150px}.feedback-chat .feedback-chat__input{width:100%;display:flex}.feedback-chat .feedback-chat__input input[type="text"]{flex:0 1 100%;padding:10px 15px;border:1px solid #bbbbbb;border-radius:5px;outline:none;height:1.25rem;border-top-right-radius:0;border-bottom-right-radius:0}.feedback-chat .feedback-chat__input input[type="text"]:hover{border-color:#999999}.feedback-chat .feedback-chat__input input[type="text"]:focus{border:1px solid #4293b6}.feedback-chat .feedback-chat__input .feedback-chat__button{flex:0 1 20%;max-width:150px;background-color:#4293b6;color:#fff;border-radius:5px;cursor:pointer;font-size:80%;transition:0.2s ease-in-out;display:flex;flex-direction:row;justify-content:center;align-items:center;border:1px solid transparent;border-top-left-radius:0;border-bottom-left-radius:0}.feedback-chat .feedback-chat__input .feedback-chat__button:hover{background-color:#519fc0;box-shadow:0 4px 4px rgba(0,0,0,0.22),0 0px 5px rgba(0,0,0,0.24)}.feedback-chat .feedback-chat__input .feedback-chat__button .feedback-chat__img{margin-left:5px;filter:brightness(3)}.feedback-chat .feedback-chat__divider{display:flex;position:relative;z-index:1;text-align:center;justify-content:center;align-items:center;transform:scale(1);transition:200ms ease-in-out;height:20px;width:fit-content;margin:0px auto;margin-bottom:15px;padding:5px 10px;border-radius:999px;color:#fff;font-size:90%;background-color:#4293b6;cursor:pointer}.feedback-chat .feedback-chat__divider .feedback-chat__img{width:35px;height:30px;max-height:35px;filter:brightness(3)}.feedback-chat .feedback-chat__divider--hidden{transform:scaleY(0);height:0;margin:0 auto}.feedback-chat .feedback-chat__img{width:25px}@media (max-width: 768px){.feedback-chat{width:calc(100% - 15px);padding:7.5px 7.5px}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__img{position:relative}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__date{position:relative}.feedback-chat .feedback-chat__list .feedback-chat__message .feedback-chat__text{padding-right:0;margin-bottom:10px}.feedback-chat .feedback-chat__button span{display:none}}\n',""]),module.exports=exports},3509:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/send.b9f436fc.svg"},3510:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/unread_messages__arrow-up.4017ec8f.svg"},3571:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var defineProperty=__webpack_require__(15),defineProperty_default=__webpack_require__.n(defineProperty),slicedToArray=__webpack_require__(7),slicedToArray_default=__webpack_require__.n(slicedToArray),react=(__webpack_require__(201),__webpack_require__(473),__webpack_require__(301),__webpack_require__(1016),__webpack_require__(674),__webpack_require__(165),__webpack_require__(23),__webpack_require__(0)),InputText=(__webpack_require__(3505),__webpack_require__(2854),__webpack_require__(2851)),send=(__webpack_require__(1025),__webpack_require__(51),__webpack_require__(476),__webpack_require__(3507),__webpack_require__(3509)),send_default=__webpack_require__.n(send),unread_messages_arrow_up=__webpack_require__(3510),unread_messages_arrow_up_default=__webpack_require__.n(unread_messages_arrow_up),functions=__webpack_require__(63),jsx_runtime=__webpack_require__(1),FeedbackChat_FeedbackChat_FeedbackChat=function FeedbackChat(props){var _props$messages4,_useState=Object(react.useState)(""),_useState2=slicedToArray_default()(_useState,2),newMessage=_useState2[0],setNewMessage=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=slicedToArray_default()(_useState3,2),showNewMessages=_useState4[0],setShowNewMessages=_useState4[1],_useState5=Object(react.useState)(!1),_useState6=slicedToArray_default()(_useState5,2),isLoaded=_useState6[0],setIsLoaded=_useState6[1];return Object(react.useEffect)((function(){var _props$messages,_props$messages2,list=document.getElementsByClassName("feedback-chat__list")[0];(list.scrollTop=list.scrollHeight,isLoaded||!1===props.isRead&&(setShowNewMessages(!0),setIsLoaded(!0)),props.messages.length>0&&(null===(_props$messages=props.messages[props.messages.length-1])||void 0===_props$messages?void 0:_props$messages.author)!==props.userData.username&&!0===showNewMessages&&isLoaded)&&(props.handleReadMessages(),console.log(null===(_props$messages2=props.messages[props.messages.length-1])||void 0===_props$messages2?void 0:_props$messages2.author),setTimeout((function(){setShowNewMessages(!1)}),5e3))}),[props.messages,props.isRead,isLoaded]),Object(jsx_runtime.jsxs)("div",{className:"feedback-chat",children:[Object(jsx_runtime.jsx)("div",{className:"feedback-chat__title",children:"Обсуждение"}),Object(jsx_runtime.jsx)("div",{children:"Всего сообщений: "+props.messages.length}),Object(jsx_runtime.jsxs)("div",{className:"feedback-chat__list",children:[0===props.messages.length&&Object(jsx_runtime.jsx)("div",{children:"Нет сообщений..."}),props.messages.sort((function(a,b){return new Date(a.date)<new Date(b.date)?-1:new Date(a.date)>new Date(b.date)?1:0})).map((function(message,index){var _props$messages3;return Object(jsx_runtime.jsxs)("div",{className:"feedback-chat__message",children:[(0===index||index>0&&props.messages[index-1].author!==message.author)&&Object(jsx_runtime.jsx)("div",{"data-letters":message.author[0]+message.author[1]+message.author[2]}),!(index>0&&Object(functions.i)(props.messages[index-1].date)===Object(functions.i)(message.date)&&(null===(_props$messages3=props.messages[index-1])||void 0===_props$messages3?void 0:_props$messages3.author)===message.author)&&Object(jsx_runtime.jsxs)("div",{className:"feedback-chat__header",children:[(0===index||index>0&&props.messages[index-1].author!==message.author)&&Object(jsx_runtime.jsx)("div",{className:"feedback-chat__author",children:message.author}),Object(jsx_runtime.jsx)("div",{className:"feedback-chat__date",children:(new Date).getDate()+"."+((new Date).getMonth()+1)==new Date(message.date).getDate()+"."+(new Date(message.date).getMonth()+1)?Object(functions.h)(message.date):Object(functions.i)(message.date)})]}),Object(jsx_runtime.jsx)("div",{className:"feedback-chat__text",children:message.text})]},message.id)})),(null===(_props$messages4=props.messages[props.messages.length-1])||void 0===_props$messages4?void 0:_props$messages4.author)!==props.userData.username&&0!==props.messages.length&&Object(jsx_runtime.jsxs)("div",{className:showNewMessages?"feedback-chat__divider":"feedback-chat__divider feedback-chat__divider--hidden",children:[Object(jsx_runtime.jsx)("span",{children:"Новые сообщения"}),Object(jsx_runtime.jsx)("img",{className:"feedback-chat__img",src:unread_messages_arrow_up_default.a})]})]}),Object(jsx_runtime.jsxs)("div",{className:"feedback-chat__input",children:[Object(jsx_runtime.jsx)("input",{type:"text",placeholder:"Напишите что-нибудь...",onChange:function onChange(event){var value=event.target.value;setNewMessage(value)},value:newMessage}),Object(jsx_runtime.jsxs)("button",{className:"feedback-chat__button",onClick:function onClick(event){event.preventDefault(),props.handleSubmit(newMessage),setNewMessage("")},children:[Object(jsx_runtime.jsx)("span",{children:"Отправить"}),Object(jsx_runtime.jsx)("img",{className:"feedback-chat__img",src:send_default.a,alt:""})]})]})]})};FeedbackChat_FeedbackChat_FeedbackChat.displayName="FeedbackChat",FeedbackChat_FeedbackChat_FeedbackChat.__docgenInfo={description:"",methods:[],displayName:"FeedbackChat"};var FeedbackPage_FeedbackChat_FeedbackChat=FeedbackChat_FeedbackChat_FeedbackChat;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/FeedbackPage/FeedbackChat/FeedbackChat.jsx"]={name:"FeedbackChat",docgenInfo:FeedbackChat_FeedbackChat_FeedbackChat.__docgenInfo,path:"src/components/MainPage/FeedbackPage/FeedbackChat/FeedbackChat.jsx"});var feedback=__webpack_require__(2937),messages=__webpack_require__(3052),Button=__webpack_require__(153),ViewFeedback_ViewFeedback_ViewFeedback=function ViewFeedback(props){var _useState=Object(react.useState)({date:new Date,subject:"",text:"",author:props.userData.username,status:"in-progress",messages:[],isRead:!0}),_useState2=slicedToArray_default()(_useState,2),formInputs=_useState2[0],setFormInputs=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=slicedToArray_default()(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],_useState5=Object(react.useState)(0),_useState6=slicedToArray_default()(_useState5,2),feedbackId=_useState6[0],setFeedbackId=_useState6[1];Object(react.useEffect)((function(){document.title="Просмотр обсуждения";var id=props.history.location.pathname.split("/feedback/view/")[1];setFeedbackId(id),isNaN(Number.parseInt(id))?(alert("Неправильный индекс обсуждения!"),props.history.push("/feedback")):loadData(id)}),[]);var loadData=function loadData(id){setIsLoading(!0),Object(feedback.e)(id).then((function(res){return res.json()})).then((function(res){return Object.assign({},formInputs,{date:res.date,subject:res.subject,text:res.text,author:res.author,status:res.status,isRead:res.isRead})})).then((function(temp){return Object(messages.c)(id).then((function(res){return res.json()})).then((function(res){setFormInputs(Object.assign({},temp,{messages:res||[]})),setIsLoading(!1)}))}))};return Object(jsx_runtime.jsx)("div",{className:"view-feedback",children:Object(jsx_runtime.jsx)("div",{className:"main-form",children:Object(jsx_runtime.jsxs)("form",{className:"main-form__form",children:[Object(jsx_runtime.jsx)("div",{className:"main-form__header main-form__header--full",children:Object(jsx_runtime.jsx)("div",{className:"main-form__title",children:"Просмотр обсуждения"})}),Object(jsx_runtime.jsx)(InputText.a,{inputName:"Дата",defaultValue:Object(functions.i)(formInputs.date),readOnly:!0}),Object(jsx_runtime.jsx)(InputText.a,{inputName:"Автор",defaultValue:formInputs.author,readOnly:!0}),Object(jsx_runtime.jsxs)("div",{className:"main-form__item",children:[Object(jsx_runtime.jsx)("div",{className:"main-form__input_name",children:"Статус"}),Object(jsx_runtime.jsx)("div",{className:"main-form__input_field",children:Object(jsx_runtime.jsxs)("select",{name:"status",onChange:function onChange(event){var value=event.target.value;console.log(formInputs),setFormInputs(Object.assign({},formInputs,{status:value})),Object(feedback.c)({date:new Date(formInputs.date).getTime()/1e3,subject:formInputs.subject,text:formInputs.text,author:formInputs.author,isRead:formInputs.isRead,status:value},feedbackId)},value:formInputs.status,disabled:!props.userHasAccess(["ROLE_ADMIN"])&&"disabled",children:[Object(jsx_runtime.jsx)("option",{value:"in-progress",children:"В процессе"}),Object(jsx_runtime.jsx)("option",{value:"completed",children:"Завершено"}),Object(jsx_runtime.jsx)("option",{value:"urgent",children:"Срочно"}),Object(jsx_runtime.jsx)("option",{value:"testing",children:"Тестирование"}),Object(jsx_runtime.jsx)("option",{value:"waiting",children:"Ожидание ответа"})]})})]}),Object(jsx_runtime.jsxs)("div",{className:"main-form__fieldset",children:[Object(jsx_runtime.jsx)("div",{className:"main-form__group-name",children:"Содержание"}),Object(jsx_runtime.jsx)(InputText.a,{inputName:"Тема",defaultValue:formInputs.subject,readOnly:!0}),Object(jsx_runtime.jsx)(InputText.a,{inputName:"Сообщение",type:"textarea",name:"text",defaultValue:formInputs.text,handleInputChange:function handleInputChange(e){var _e$target=e.target,name=_e$target.name,value=_e$target.value;setFormInputs(Object.assign({},formInputs,defineProperty_default()({},name,value)))},readOnly:!props.userHasAccess(["ROLE_ADMIN"])}),Object(jsx_runtime.jsx)(FeedbackPage_FeedbackChat_FeedbackChat,{messages:formInputs.messages,userData:props.userData,isRead:formInputs.isRead,handleReadMessages:function handleReadMessages(){return setIsLoading(!0),console.log("handleReadMessages",formInputs.isRead),Object(feedback.c)({date:new Date(formInputs.date).getTime()/1e3,subject:formInputs.subject,text:formInputs.text,author:formInputs.author,status:formInputs.status,isRead:!0},feedbackId).then((function(){return setIsLoading(!1)})).catch((function(){setIsLoading(!1),alert("Ошибка при изменении записи")}))},handleSubmit:function handleSubmit(message){return console.log("handleSubmit"),Object(messages.a)({author:props.userData.username,date:(new Date).getTime()/1e3,text:message,discussionId:feedbackId}).then((function(){return setFormInputs(Object.assign({},formInputs,{isRead:!1})),Object(feedback.c)({date:new Date(formInputs.date).getTime()/1e3,subject:formInputs.subject,text:formInputs.text,author:formInputs.author,status:formInputs.status,isRead:!1},feedbackId)})).then((function(){return loadData(feedbackId)}))}})]}),Object(jsx_runtime.jsxs)("div",{className:"main-form__buttons main-form__buttons--full",children:[Object(jsx_runtime.jsx)(Button.a,{text:"Вернуться назад",isLoading:isLoading,inverted:!0,className:"main-form__submit main-form__submit--inverted",onClick:function onClick(){return props.history.push("/feedback#".concat(feedbackId))}}),props.userHasAccess(["ROLE_ADMIN"])&&Object(jsx_runtime.jsx)(Button.a,{text:"Редактировать содержание",isLoading:isLoading,className:"main-form__submit",onClick:function handleSubmit(){console.log("handleEditSubmit"),setIsLoading(!0),console.log(formInputs),Object(feedback.c)({date:new Date(formInputs.date).getTime()/1e3,subject:formInputs.subject,text:formInputs.text,author:formInputs.author,status:formInputs.status,isRead:formInputs.isRead},feedbackId).then((function(){return setIsLoading(!1)})).catch((function(){setIsLoading(!1),alert("Ошибка при изменении записи")}))}})]})]})})})};ViewFeedback_ViewFeedback_ViewFeedback.displayName="ViewFeedback",ViewFeedback_ViewFeedback_ViewFeedback.__docgenInfo={description:"",methods:[],displayName:"ViewFeedback"};__webpack_exports__.default=ViewFeedback_ViewFeedback_ViewFeedback;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/FeedbackPage/ViewFeedback/ViewFeedback.jsx"]={name:"ViewFeedback",docgenInfo:ViewFeedback_ViewFeedback_ViewFeedback.__docgenInfo,path:"src/components/MainPage/FeedbackPage/ViewFeedback/ViewFeedback.jsx"})}}]);