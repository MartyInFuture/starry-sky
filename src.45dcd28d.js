parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fx60":[function(require,module,exports) {

},{}],"BrLT":[function(require,module,exports) {
module.exports={starRadius:3,firstStarColor:"red",lastStarColor:"#DEA164",starColor:"#E4FBFF"};
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./scss/main.scss");var t=e(require("./config.json"));function e(t){return t&&t.__esModule?t:{default:t}}const n=document.querySelector("#canvas");function i(){const e={width:0,height:0};return e.width=parseInt(Math.random()*(document.documentElement.clientWidth-t.default.starRadius)+t.default.starRadius),e.height=parseInt(Math.random()*(document.documentElement.clientHeight-t.default.starRadius)+t.default.starRadius),e}function o(){n.width=document.documentElement.clientWidth,n.height=document.documentElement.clientHeight}n.style.backgroundColor="#111f28",o(),window.addEventListener("resize",o);const h=n.getContext("2d");let d=!0;const s=[];function a(e=10,n=i()){let o=t.default.starColor;if(d&&(n.position="first",o=t.default.firstStarColor,d=!1),1===e&&(n.position="last",o=t.default.lastStarColor),0===e)return!1;h.beginPath(),h.arc(n.width,n.height,3,0,2*Math.PI),h.fillStyle=o,h.fill(),n.average=parseInt((n.height+n.width)/2),n.isUsed=!1,s.push(n),a(--e)}function l(t){const e=n.getContext("2d");e.beginPath();const i=[...t],o=[i[0]];let h=0;const d=e=>{if(void 0===e)return!1;e.isUsed=!0;let n=Math.sqrt(Math.pow(document.documentElement.clientWidth,2)+Math.pow(document.documentElement.clientHeight,2)),s={};for(let o=0;o<t.length-1;o++)Math.sqrt(Math.pow(e.width-i[o].width,2)+Math.pow(e.height-i[o].height,2))<n&&!i[o].isUsed&&o!=t.length-1&&(n=Math.sqrt(Math.pow(e.width-i[o].width,2)+Math.pow(e.height-i[o].height,2)),s=i[o]);console.log(n),h+=n,null!=s.width&&o.push(s),d(i[i.indexOf(s)])};d(i[0]),o.push(i[i.length-1]);for(let n=0;n<o.length-1;n++)e.moveTo(o[n].width,o[n].height),e.lineTo(o[n+1].width,o[n+1].height),e.stroke()}a(5),l(s);
},{"./scss/main.scss":"fx60","./config.json":"BrLT"}]},{},["Focm"], null)
//# sourceMappingURL=/starry-sky/src.45dcd28d.js.map