"use strict";var _createClass=function(){function s(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}}();function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(){var e=function(){function e(t){_classCallCheck(this,e),this.callbacks={pending:[],fail:[],success:[]},this.instance=t,this.default=t.getAttribute("data-regular")||t.innerText,this.pending=t.getAttribute("data-pending")||null,this.fail=t.getAttribute("data-fail")||null,this.success=t.getAttribute("data-success")||null}return _createClass(e,[{key:"setStatus",value:function(t){return this.instance.setAttribute("data-status",t),this}},{key:"set",value:function(t){switch(t){case"pending":this.setStatus("pending"),this.instance.innerText=this.pending,this.trigger("pending",this);break;case"success":this.setStatus("success"),this.instance.innerText=this.success,this.trigger("success",this);break;case"fail":this.setStatus("fail"),this.instance.innerText=this.fail,this.trigger("fail",this);break;default:this.setStatus("regular"),this.instance.innerText=this.regular}return this}},{key:"trigger",value:function(t){for(var e=arguments.length,n=Array(1<e?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];return this.callbacks[t].forEach(function(t){return t.apply(void 0,n)}),this}},{key:"on",value:function(t,e){var n=[].concat(_toConsumableArray(this.callbacks[t]),[e]);return this.callbacks[t]=n,this}},{key:"onClick",value:function(e){var n=this;return this.instance.addEventListener("click",function(t){return e.bind(this)(t,n)}),this}}]),e}(),t=function(){function s(t,e){var n=this;_classCallCheck(this,s),this.action=t,this.forms=[],e.forEach(function(t){return n.add(t)}),this.callbacks={afterRequest:[],beforeRequest:[]},this.sended=!1}return _createClass(s,[{key:"getFormData",value:function(){return new FormData(this.forms[0].instance)}},{key:"sendRequest",value:function(){for(var i=this,t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(!this.sended){this.sended=!0;var s=new XMLHttpRequest,a=this.getSubmits();a.forEach(function(t){return t.set("pending")});var r=this.callbacks.beforeRequest;r.length&&r.forEach(function(t){return t.apply(void 0,e)});return s.addEventListener("load",function(){for(var e=this,t=arguments.length,n=Array(t),s=0;s<t;s++)n[s]=arguments[s];var r=i.callbacks.afterRequest;r.length&&r.forEach(function(t){return t.bind(e).apply(void 0,n)}),a.forEach(function(t){return t.set("success")})}),s.open("POST",this.action),s.send(this.getFormData()),this}}},{key:"getSubmits",value:function(){return this.forms.reduce(function(t,e){var n=e.submits;return[].concat(_toConsumableArray(t),_toConsumableArray(n))},[])}},{key:"on",value:function(t,e){if(!Object.keys(this.callbacks).includes(t))throw new Error("FormsRegister: dont have such event");var n=[].concat(_toConsumableArray(this.callbacks[t]),[e]);return this.callbacks[t]=n,this}},{key:"add",value:function(n){var s=this;if(!(n instanceof HTMLFormElement))throw new Error("FormsRegister: passed invalid form element");var t=Array.from(n.querySelectorAll('[type="submit"]')),r={instance:n,submits:t.length?t.map(function(t){return new e(t)}):null};return r.submits.forEach(function(e){return e.onClick(function(t){n.checkValidity()&&(t.preventDefault(),s.sendRequest(e,n,r))})}),this.forms=[].concat(_toConsumableArray(this.forms),[r]),this}}]),s}(),n=Array.from(document.forms).filter(function(t){return t.hasAttribute("data-form")}),s=new t(n.find(function(){return!0}).getAttribute("action"),n),r=s.getSubmits();r.forEach(function(t){return t.on("success",function(t){t.instance.classList.remove("form__submit--pending"),t.instance.classList.add("form__submit--disabled"),t.instance.disabled=!0})}),r.forEach(function(t){return t.on("pending",function(t){t.instance.classList.add("form__submit--pending")})}),s.on("afterRequest",function(){})}();
//# sourceMappingURL=main.js.map
