(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{2858:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(35);var prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(2859),__webpack_require__(44)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),Widget=function Widget(_ref){var _ref$title=_ref.title,title=void 0===_ref$title?"":_ref$title,_ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$content=_ref.content,content=void 0===_ref$content?null:_ref$content,linkTo=_ref.linkTo,_ref$subTitle=_ref.subTitle,subTitle=void 0===_ref$subTitle?"":_ref$subTitle,_ref$customHeader=_ref.customHeader,customHeader=void 0===_ref$customHeader?null:_ref$customHeader,_ref$miniWidget=_ref.miniWidget,miniWidget=void 0!==_ref$miniWidget&&_ref$miniWidget,_ref$icon=_ref.icon,icon=void 0===_ref$icon?null:_ref$icon;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget ".concat(null!=className?className:""," ").concat(miniWidget?"widget--mini":""),children:[null!=customHeader?customHeader:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"widget__title",children:[!miniWidget&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__sub-title",children:subTitle}),linkTo?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.a,{to:linkTo.address,title:linkTo.text,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[icon,title]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"widget__content",children:content})]})};Widget.displayName="Widget",Widget.__docgenInfo={description:"",methods:[],displayName:"Widget",props:{title:{defaultValue:{value:"''",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},content:{defaultValue:{value:"null",computed:!1},required:!1},subTitle:{defaultValue:{value:"''",computed:!1},required:!1},customHeader:{defaultValue:{value:"null",computed:!1},required:!1},miniWidget:{defaultValue:{value:"false",computed:!1},required:!1},icon:{defaultValue:{value:"null",computed:!1},required:!1}}},__webpack_exports__.a=Widget,Widget.proptypes={title:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,linkTo:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,subTitle:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,customHeader:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,miniWidget:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,icon:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/GeneralPage/Widget/Widget.jsx"]={name:"Widget",docgenInfo:Widget.__docgenInfo,path:"src/components/MainPage/GeneralPage/Widget/Widget.jsx"})},2859:function(module,exports,__webpack_require__){var api=__webpack_require__(48),content=__webpack_require__(2860);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},2860:function(module,exports,__webpack_require__){(exports=__webpack_require__(49)(!1)).push([module.i,":root{--accent-color--light: #f8f1f1;--accent-color--contrast: #16c79a;--main-color: #4293b6;--main-color--dark: #19456b}.widget{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;box-sizing:border-box;position:relative;width:100%;background-color:#fff;border:1px solid #cccccc;border-radius:10px;padding:9px 26px;padding-top:15px;min-width:300px;max-width:600px;max-height:360px;margin-bottom:15px;margin-right:15px}.widget--mini{max-width:none;height:fit-content;max-height:Max(calc(33.33vh - 62px), 120px)}.widget--mini .widget__content{height:fit-content}.widget--mini:last-child{margin-bottom:0}.widget__title{display:flex;flex-direction:row-reverse;justify-content:flex-start;align-items:center;font-size:1.25rem;position:relative;margin-bottom:5px;width:100%}.widget__title .widget__sub-title{font-size:0.9rem;color:#444}.widget__title>a{color:#333;margin-right:auto;transition:100ms ease-in-out;font-weight:500}.widget__title>a:hover{color:#bbb}.widget__title>span{display:flex;align-items:center;margin-right:auto;font-weight:500}.widget__title>span .main-window__img{filter:none !important}.widget__content{width:100%;height:100%;overflow-y:auto;box-sizing:border-box;padding-right:4px}.widget__content::-webkit-scrollbar-track,.widget__content *::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar,.widget__content *::-webkit-scrollbar{width:8px;border-radius:10px;background-color:#f9f9f9}.widget__content::-webkit-scrollbar-thumb,.widget__content *::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:#ddd}@media (max-width: 1350px){.widget{max-width:500px}}@media (max-width: 768px){.widget{max-width:100%;width:100%;margin-right:0;padding:15px 20px;padding-bottom:10px}}@media (max-width: 500px){.widget{max-height:calc(360px + 50px)}.widget__title{margin-top:2px;position:initial}.widget__title .main-window__button{position:absolute;margin-top:0;bottom:9px;left:20px}}\n",""]),module.exports=exports},2923:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"d",(function(){return getFeedback})),__webpack_require__.d(__webpack_exports__,"e",(function(){return getFeedbackById})),__webpack_require__.d(__webpack_exports__,"b",(function(){return deleteFeedbackById})),__webpack_require__.d(__webpack_exports__,"a",(function(){return addFeedback})),__webpack_require__.d(__webpack_exports__,"c",(function(){return editFeedback}));var _utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(10);function getFeedback(){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/",method:"GET"})}function getFeedbackById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/"+id,method:"GET"})}function deleteFeedbackById(id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/"+id,method:"DELETE"})}function addFeedback(newFeedback){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/",method:"POST",body:JSON.stringify(newFeedback)})}function editFeedback(newFeedback,id){return Object(_utilsAPI_jsx__WEBPACK_IMPORTED_MODULE_0__.b)({url:Object({NODE_ENV:"production",NODE_PATH:[],STORYBOOK:"true",PUBLIC_URL:"."}).API_BASE_URL+"/api/v1/feedback/"+id,method:"PUT",body:JSON.stringify(newFeedback)})}},3597:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _path,_path2,_path3,slicedToArray=__webpack_require__(7),slicedToArray_default=__webpack_require__.n(slicedToArray),react=(__webpack_require__(26),__webpack_require__(196),__webpack_require__(1013),__webpack_require__(0)),styled_components_browser_esm=__webpack_require__(25),Widget=__webpack_require__(2858),feedback_inline=__webpack_require__(3062);function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var talk_bubbles_line_inline_path,talk_bubbles_line_inline_path2,talk_bubbles_line_inline_path3,question_circle_outlined_inline=function SvgQuestionCircleOutlinedinline(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 1024 1024",style:{msTransform:"rotate(360deg)",WebkitTransform:"rotate(360deg)"},transform:"rotate(360)"},props),_path||(_path=react.createElement("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z",fill:"#626262"})),_path2||(_path2=react.createElement("path",{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z",fill:"#626262"})),_path3||(_path3=react.createElement("path",{fill:"rgba(0, 0, 0, 0)",d:"M0 0h1024v1024H0z"})))};function talk_bubbles_line_inline_extends(){return(talk_bubbles_line_inline_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var talk_bubbles_line_inline=function SvgTalkBubblesLineinline(props){return react.createElement("svg",talk_bubbles_line_inline_extends({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 36 36",style:{msTransform:"rotate(360deg)",WebkitTransform:"rotate(360deg)"},transform:"rotate(360)"},props),talk_bubbles_line_inline_path||(talk_bubbles_line_inline_path=react.createElement("path",{d:"M23 26a1 1 0 01-1 1H8c-.22 0-.43.2-.61.33L4 30V14a1 1 0 011-1h3.86v-2H5a3 3 0 00-3 3v18a1 1 0 00.56.89 1 1 0 001-.1L8.71 29h13.44A2.77 2.77 0 0025 26.13V25h-2z",className:"talk-bubbles-line_inline_svg__clr-i-outline talk-bubbles-line_inline_svg__clr-i-outline-path-1",fill:"#626262"})),talk_bubbles_line_inline_path2||(talk_bubbles_line_inline_path2=react.createElement("path",{d:"M31 4H14a3 3 0 00-3 3v12a3 3 0 003 3h13.55l4.78 3.71a1 1 0 001 .11 1 1 0 00.57-.9V7A3 3 0 0031 4zm1 18.94l-3.5-2.73a1 1 0 00-.61-.21H14a1 1 0 01-1-1V7a1 1 0 011-1h17a1.1 1.1 0 011 1.06z",className:"talk-bubbles-line_inline_svg__clr-i-outline talk-bubbles-line_inline_svg__clr-i-outline-path-2",fill:"#626262"})),talk_bubbles_line_inline_path3||(talk_bubbles_line_inline_path3=react.createElement("path",{fill:"rgba(0, 0, 0, 0)",d:"M0 0h36v36H0z"})))},feedback=__webpack_require__(2923),App=__webpack_require__(131),react_router_dom=__webpack_require__(44),jsx_runtime=__webpack_require__(1),StyledWidget=Object(styled_components_browser_esm.b)(Widget.a).withConfig({displayName:"FeedbackWidget__StyledWidget",componentId:"sc-14tlkt-0"})(["font-size:0.9rem;.widget__content{padding-right:0;}"]),Title=styled_components_browser_esm.b.div.withConfig({displayName:"FeedbackWidget__Title",componentId:"sc-14tlkt-1"})(["margin-top:5px;margin-bottom:10px;color:#555;"]),Button=styled_components_browser_esm.b.div.withConfig({displayName:"FeedbackWidget__Button",componentId:"sc-14tlkt-2"})(["display:flex;align-items:center;justify-content:",";box-sizing:border-box;margin-bottom:10px;border:",";border-radius:5px;width:100%;padding:8px 12px;background-color:",";transition:100ms ease-in-out;cursor:pointer;font-size:0.85rem;color:",";&:hover{background-color:",";}svg{margin-right:8px;min-width:20px;}@media (max-width:768px){padding:5px 10px;}"],(function(props){return props.submit?"center":"flex-start"}),(function(props){return props.submit?"1px solid transparent":"1px solid #ccc"}),(function(props){return props.submit?"#247fa7":"#fff"}),(function(props){return props.submit?"#fff":"#555"}),(function(props){return props.submit?"#298FBC":"#eee"})),ButtonWrapper=styled_components_browser_esm.b.div.withConfig({displayName:"FeedbackWidget__ButtonWrapper",componentId:"sc-14tlkt-3"})(["display:flex;div{width:50%;margin-bottom:0 !important;text-align:center;&:first-child{margin-right:10px;}}"]),TextInput=styled_components_browser_esm.b.textarea.withConfig({displayName:"FeedbackWidget__TextInput",componentId:"sc-14tlkt-4"})(["width:100%;resize:none;box-sizing:border-box;border:1px solid #ccc;border-radius:5px;min-height:80px;padding:5px 10px;margin-bottom:5px;outline:none;"]),FeedbackWidget_FeedbackWidget=function FeedbackWidget(){var _useState=Object(react.useState)({isLoading:!1,type:""}),_useState2=slicedToArray_default()(_useState,2),formInputs=_useState2[0],setFormInputs=_useState2[1],_useState3=Object(react.useState)("startPage"),_useState4=slicedToArray_default()(_useState3,2),curPage=_useState4[0],setCurPage=_useState4[1],pages={startPage:Object(jsx_runtime.jsx)(FeedbackWidget_StartPage,{setFormInputs:setFormInputs,setCurPage:setCurPage}),formPage:Object(jsx_runtime.jsx)(FeedbackWidget_FormPage,{formInputs:formInputs,setFormInputs:setFormInputs,setCurPage:setCurPage}),messagePage:Object(jsx_runtime.jsx)(FeedbackWidget_MessagePage,{setCurPage:setCurPage,formInputs:formInputs})};return Object(react.useEffect)((function(){}),[curPage]),Object(jsx_runtime.jsx)(StyledWidget,{className:"feedback-widget",title:"Обратная связь",linkTo:{address:"/feedback",text:"Перейти"},content:Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[Object(jsx_runtime.jsx)(Title,{children:"Вы можете поделиться с нами своим мнением"}),Object(jsx_runtime.jsx)("div",{children:pages[curPage]})]})})};FeedbackWidget_FeedbackWidget.displayName="FeedbackWidget",FeedbackWidget_FeedbackWidget.__docgenInfo={description:"",methods:[],displayName:"FeedbackWidget"};__webpack_exports__.default=FeedbackWidget_FeedbackWidget;var FeedbackWidget_StartPage=function StartPage(_ref){var setCurPage=_ref.setCurPage,setFormInputs=_ref.setFormInputs,handleClick=function handleClick(){var type=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return setFormInputs({type:type}),setCurPage("formPage")};return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[Object(jsx_runtime.jsxs)(Button,{onClick:function onClick(){return handleClick("Сообщение об ошибке")},children:[Object(jsx_runtime.jsx)(feedback_inline.a,{fill:"#777",width:20,height:20,viewBox:"0 0 24 24"}),Object(jsx_runtime.jsx)("span",{children:"Сообщить об ошибке"})]}),Object(jsx_runtime.jsxs)(Button,{onClick:function onClick(){return handleClick("Предложение по улучшению")},children:[Object(jsx_runtime.jsx)(talk_bubbles_line_inline,{fill:"#777",width:20,height:20}),Object(jsx_runtime.jsx)("span",{children:"У вас есть предложение по улучшению"})]}),Object(jsx_runtime.jsxs)(Button,{onClick:function onClick(){return handleClick("Вопрос")},children:[Object(jsx_runtime.jsx)(question_circle_outlined_inline,{fill:"#777",width:20,height:20}),Object(jsx_runtime.jsx)("span",{children:"Задать вопрос"})]})]})},FeedbackWidget_FormPage=function FormPage(_ref2){var setCurPage=_ref2.setCurPage,formInputs=_ref2.formInputs,setFormInputs=_ref2.setFormInputs,userData=Object(react.useContext)(App.a).userData,_useState5=Object(react.useState)(""),_useState6=slicedToArray_default()(_useState5,2),message=_useState6[0],setMessage=_useState6[1],StyledButton=Object(styled_components_browser_esm.b)(Button).withConfig({displayName:"FeedbackWidget__StyledButton",componentId:"sc-14tlkt-5"})(["justify-content:center;"]);return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[Object(jsx_runtime.jsx)(TextInput,{value:message,onChange:function onChange(_ref4){var target=_ref4.target;return setMessage(target.value)},placeholder:"Текст вашего сообщения...",autoComplete:"off"}),Object(jsx_runtime.jsxs)(ButtonWrapper,{children:[Object(jsx_runtime.jsx)(StyledButton,{onClick:function onClick(){return setCurPage("startPage")},inverted:!0,children:Object(jsx_runtime.jsx)("span",{children:"Вернуться назад"})}),Object(jsx_runtime.jsx)(Button,{onClick:function handleSubmit(){setFormInputs((function(formInputs){return Object.assign({},formInputs,{isLoading:!0})})),Object(feedback.a)({date:Math.ceil((new Date).getTime()/1e3),subject:"".concat(formInputs.type," - из виджета"),text:message,author:userData.username,status:"in-progress"}).then((function(res){return res.json()})).then((function(_ref3){var id=_ref3.id;setFormInputs((function(formInputs){return Object.assign({},formInputs,{id:id,isLoading:!1})})),setCurPage("messagePage")}))},submit:!0,children:Object(jsx_runtime.jsx)("span",{children:"Отправить"})})]})]})},FeedbackWidget_MessagePage=function MessagePage(_ref5){var setCurPage=_ref5.setCurPage,formInputs=_ref5.formInputs;Object(react.useEffect)((function(){if(!formInputs.isLoading){var timeout=setTimeout((function(){return setCurPage("startPage")}),6e3);return function(){timeout&&clearTimeout(timeout)}}}),[formInputs]);var StyledButton=Object(styled_components_browser_esm.b)(Button).withConfig({displayName:"FeedbackWidget__StyledButton",componentId:"sc-14tlkt-6"})(["border-color:",";color:",";"],(function(props){return props.isLoading?"#ccc":"#6bdc59"}),(function(props){return props.isLoading?"#555":"#1e9e09"}));return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[Object(jsx_runtime.jsx)(StyledButton,{onClick:function onClick(){return setCurPage("startPage")},isLoading:formInputs.isLoading,children:Object(jsx_runtime.jsx)("span",{children:formInputs.isLoading?"Отправляем сообщение...":"Успешно отправлено, спасибо за отзыв!"})}),!formInputs.isLoading&&Object(jsx_runtime.jsx)(react_router_dom.a,{to:"/feedback/view/".concat(formInputs.id),target:"_blank",children:Object(jsx_runtime.jsx)(Button,{children:Object(jsx_runtime.jsx)("span",{children:"Просмотреть ваше сообщение"})})})]})};"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MainPage/GeneralPage/FeedbackWidget/FeedbackWidget.jsx"]={name:"FeedbackWidget",docgenInfo:FeedbackWidget_FeedbackWidget.__docgenInfo,path:"src/components/MainPage/GeneralPage/FeedbackWidget/FeedbackWidget.jsx"})}}]);