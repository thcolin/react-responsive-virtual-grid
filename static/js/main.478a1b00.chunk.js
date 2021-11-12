/*! For license information please see main.478a1b00.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-responsive-virtual-grid-example"]=this["webpackJsonpreact-responsive-virtual-grid-example"]||[]).push([[0],{10:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(3),a=r.n(i),c=r(4),u=r(1),s=r.n(u);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function f(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}function p(e,t){return e(t={exports:{}},t.exports),t.exports}var h="function"===typeof Symbol&&Symbol.for,d=h?Symbol.for("react.element"):60103,m=h?Symbol.for("react.portal"):60106,y=h?Symbol.for("react.fragment"):60107,b=h?Symbol.for("react.strict_mode"):60108,w=h?Symbol.for("react.profiler"):60114,v=h?Symbol.for("react.provider"):60109,g=h?Symbol.for("react.context"):60110,O=h?Symbol.for("react.async_mode"):60111,j=h?Symbol.for("react.concurrent_mode"):60111,S=h?Symbol.for("react.forward_ref"):60112,E=h?Symbol.for("react.suspense"):60113,x=h?Symbol.for("react.suspense_list"):60120,M=h?Symbol.for("react.memo"):60115,$=h?Symbol.for("react.lazy"):60116,P=h?Symbol.for("react.block"):60121,k=h?Symbol.for("react.fundamental"):60117,C=h?Symbol.for("react.responder"):60118,R=h?Symbol.for("react.scope"):60119;function T(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case d:switch(e=e.type){case O:case j:case y:case w:case b:case E:return e;default:switch(e=e&&e.$$typeof){case g:case S:case $:case M:case v:return e;default:return t}}case m:return t}}}function _(e){return T(e)===j}var q={AsyncMode:O,ConcurrentMode:j,ContextConsumer:g,ContextProvider:v,Element:d,ForwardRef:S,Fragment:y,Lazy:$,Memo:M,Portal:m,Profiler:w,StrictMode:b,Suspense:E,isAsyncMode:function(e){return _(e)||T(e)===O},isConcurrentMode:_,isContextConsumer:function(e){return T(e)===g},isContextProvider:function(e){return T(e)===v},isElement:function(e){return"object"===typeof e&&null!==e&&e.$$typeof===d},isForwardRef:function(e){return T(e)===S},isFragment:function(e){return T(e)===y},isLazy:function(e){return T(e)===$},isMemo:function(e){return T(e)===M},isPortal:function(e){return T(e)===m},isProfiler:function(e){return T(e)===w},isStrictMode:function(e){return T(e)===b},isSuspense:function(e){return T(e)===E},isValidElementType:function(e){return"string"===typeof e||"function"===typeof e||e===y||e===j||e===w||e===b||e===E||e===x||"object"===typeof e&&null!==e&&(e.$$typeof===$||e.$$typeof===M||e.$$typeof===v||e.$$typeof===g||e.$$typeof===S||e.$$typeof===k||e.$$typeof===C||e.$$typeof===R||e.$$typeof===P)},typeOf:T},F=(p((function(e,t){0})),p((function(e){e.exports=q})),Object.getOwnPropertySymbols),L=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;function I(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}})()&&Object.assign;var W="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function A(e,t,r,n,o){}A.resetWarningCache=function(){0};Function.call.bind(Object.prototype.hasOwnProperty);function H(){}function N(){}N.resetWarningCache=H;var B=p((function(e){e.exports=function(){function e(e,t,r,n,o,i){if(i!==W){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:N,resetWarningCache:H};return r.PropTypes=r,r}()})),D=function(e){var t=e.cell,r=e.total,o=e.viewportRowOffset,i=void 0===o?4:o,a=e.onRender,c=e.container,u=Math.max(2,2*Math.round(i/2)),f=function(e){void 0===e&&(e=100);var t="object"===typeof window,r=Object(n.useMemo)((function(){return s()(e)}),[e]);function o(){return{width:t?window.innerWidth:void 0,height:t?window.innerHeight:void 0}}var i=Object(n.useState)(o),a=i[0],c=i[1];return Object(n.useEffect)((function(){if(!t)return!1;function e(){o()!==a&&r((function(){return c(o())}))}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[r]),a}(),p=function(e){void 0===e&&(e=16);var t="object"===typeof window,r=Object(n.useMemo)((function(){return s()(e)}),[e]);function o(){return window.scrollY}var i=Object(n.useState)(o),a=i[0],c=i[1];return Object(n.useEffect)((function(){if(!t)return!1;function e(){o()!==a&&r((function(){return c(o())}))}return window.addEventListener("scroll",e),function(){return window.removeEventListener("scroll",e)}}),[r]),a}(),h=Math.max(0,p-c.offsetTop||0),d=Object(n.useMemo)((function(){var e={},n={},o={};return o.width=c.clientWidth||f.width,e.total=Math.floor(o.width/t.width),n.total=Math.ceil(r/e.total),o.height=n.total*t.height,e.height=o.height,e.width=Math.floor(o.width/e.total),n.height=t.height,n.width=o.width,{columns:e,rows:n,layout:o,viewport:{columns:l(l({},e),{},{total:e.total}),rows:l(l({},n),{},{total:Math.ceil(f.height/n.height)+u})},container:{position:"relative",height:o.height+"px"}}}),[t.height,t.width,f.height,f.width,u,r,null===c||void 0===c?void 0:c.offsetTop]),m=Object(n.useMemo)((function(){for(var e,t,n=[],o=Math.max(0,Math.floor(h/d.rows.height)-u/2)*d.columns.total,i=Math.min(r,o+d.viewport.rows.total*d.viewport.columns.total);o<i;o++)e=Math.min(d.rows.total,Math.floor(o/d.columns.total)),t=o%d.columns.total,n.push({key:e+"-"+t,index:o,style:{position:"absolute",height:d.rows.height,width:d.columns.width,transform:"translate3d("+t*d.columns.width+"px, "+e*d.rows.height+"px, 0px)"}});return"function"===typeof a&&a(n),n}),[h,u,r,d]);return{display:d,raw:m}},J=function(e){var t=e.render,r=f(e,["render"]),i=Object(n.useState)({}),a=i[0],c=i[1],u=D(l(l({},r),{},{container:a})),s=u.raw,p=u.display;return o.a.createElement("div",{ref:function(e){return c(e)},style:p.container},s.map((function(e){var r=e.key,n=f(e,["key"]);return o.a.createElement(t,l({key:r},n))})))};J.propTypes={cell:B.shape({height:B.number.isRequired,width:B.number.isRequired}).isRequired,total:B.number.isRequired,onRender:B.func,viewportRowOffset:B.number,render:B.func.isRequired};var U=J,V=function(e){var t=e.style,r=e.index;return o.a.createElement("div",{style:Object(c.a)({backgroundColor:"gainsboro"},t)},o.a.createElement("img",{src:"https://picsum.photos/id/".concat(r,"/304/160"),alt:"Pcisum placeholder #".concat(r),style:{objectFit:"cover"},width:"100%",height:"100%",loading:"lazy"}))},Y=function(e){Object.assign({},e);return o.a.createElement("section",null,o.a.createElement("header",{style:{height:"10em",background:"tan"}},o.a.createElement("h1",null,"Header")),o.a.createElement("div",{style:{margin:"2em"}},o.a.createElement("h2",null,"Anywhere, in any Container"),o.a.createElement(U,{total:4e3,cell:{height:304,width:160},render:V,viewportRowOffset:10})),o.a.createElement("footer",{style:{height:"10em",background:"thistle"}},o.a.createElement("p",null,"Footer")))};a.a.render(o.a.createElement(Y,null),document.getElementById("root"))},5:function(e,t,r){e.exports=r(10)}},[[5,1,2]]]);
//# sourceMappingURL=main.478a1b00.chunk.js.map