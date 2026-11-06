/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$3=t=>t,s$1=t$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

const DEFAULT_SUFFIXES = {
    status: "etat",
    status_code: "code_d_etat",
    ups_type: "type_d_ups",
    battery_charge: "charge_de_la_batterie",
    battery_low_pct: "consigne_de_batterie_faible",
    battery_runtime: "autonomie_de_la_batterie",
    battery_runtime_low: "autonomie_de_la_batterie_faible",
    battery_voltage: "tension_de_la_batterie",
    battery_voltage_nominal: "tension_nominale_de_la_batterie",
    battery_chemistry: "chimie_de_la_batterie",
    battery_mfr_date: "date_de_fabrication_de_la_batterie",
    self_test: "resultat_de_l_autotest",
    beeper: "etat_du_signal_sonore",
    load: "charge",
    power_real: "puissance_reelle_actuelle",
    power_nominal: ["puissance_reelle_nominale", "puissance_nominale"],
    input_voltage: "tension_d_entree",
    input_voltage_nominal: "tension_d_entree_nominale",
    input_sensitivity: "sensibilite_de_la_puissance_d_entree",
    transfer_low: "transfert_tension_basse",
    transfer_high: "transfert_tension_haute",
    output_voltage: "tension_de_sortie",
    output_voltage_nominal: "tension_de_sortie_nominale",
    output_frequency_nominal: "frequence_de_sortie_nominale",
    shutdown_delay: "delai_d_arret_de_l_onduleur",
    restart_delay: "charger_le_delai_de_redemarrage",
    load_off_timer: "minuterie_d_arret_de_la_charge",
    load_on_timer: "minuterie_de_demarrage_de_la_charge",
    load_restart_timer: "minuterie_de_redemarrage_de_la_charge",
    outlet_1_desc: "description_de_la_prise_powershare_outlet_1",
};
function resolveEntityId(key, prefix, overrides) {
    if (overrides?.[key])
        return overrides[key];
    const suffix = DEFAULT_SUFFIXES[key];
    if (Array.isArray(suffix)) {
        return suffix.map((s) => `sensor.${prefix}_${s}`);
    }
    return `sensor.${prefix}_${suffix}`;
}
function getEntity(hass, key, config) {
    const prefix = config.prefix ?? "";
    const ids = resolveEntityId(key, prefix, config.entities);
    if (Array.isArray(ids)) {
        for (const id of ids) {
            const e = hass.states[id];
            if (e && e.state !== "unavailable" && e.state !== "unknown")
                return e;
        }
        // return first even if unavailable so callers can decide
        const first = hass.states[ids[0]];
        return first;
    }
    return hass.states[ids];
}
function getEntityId(key, config) {
    const prefix = config.prefix ?? "";
    const ids = resolveEntityId(key, prefix, config.entities);
    return Array.isArray(ids) ? ids[0] : ids;
}
function getVal(hass, key, config) {
    const e = getEntity(hass, key, config);
    if (!e)
        return undefined;
    if (e.state === "unavailable" || e.state === "unknown")
        return undefined;
    return e.state;
}
function getNum(hass, key, config) {
    const v = getVal(hass, key, config);
    if (v === undefined)
        return undefined;
    const n = parseFloat(v);
    return isNaN(n) ? undefined : n;
}
function inferPrefix(entityEntries, deviceId) {
    const marker = "_charge_de_la_batterie";
    for (const entry of Object.values(entityEntries)) {
        if (entry.device_id === deviceId && entry.entity_id.endsWith(marker)) {
            return entry.entity_id.slice("sensor.".length, -marker.length);
        }
    }
    return "";
}

class NutUpsCardEditor extends i$2 {
    constructor() {
        super(...arguments);
        this._nutDevices = [];
    }
    setConfig(config) {
        this._config = { ...config };
    }
    updated(changed) {
        if (changed.has("hass") && this.hass) {
            this._nutDevices = this._detectNutDevices();
        }
    }
    _detectNutDevices() {
        const { devices, entities, areas } = this.hass;
        if (!devices || !entities)
            return [];
        const nutDeviceIds = new Set();
        for (const entry of Object.values(entities)) {
            if (entry.platform === "nut" && entry.device_id) {
                nutDeviceIds.add(entry.device_id);
            }
        }
        return [...nutDeviceIds].map((deviceId) => {
            const device = devices[deviceId];
            const prefix = inferPrefix(entities, deviceId);
            const area = device?.area_id ? areas?.[device.area_id]?.name ?? "" : "";
            return {
                deviceId,
                name: device?.name ?? deviceId,
                prefix,
                areaName: area,
            };
        });
    }
    _fire(config) {
        const merged = { ...this._config, ...config };
        this.dispatchEvent(new CustomEvent("config-changed", { bubbles: true, composed: true, detail: { config: merged } }));
    }
    _onDeviceChange(e) {
        const deviceId = e.target.value;
        if (!deviceId)
            return;
        const found = this._nutDevices.find((d) => d.deviceId === deviceId);
        if (!found)
            return;
        this._fire({
            prefix: found.prefix || this._config.prefix,
            name: this._config.name || found.name,
        });
    }
    _onInput(key) {
        return (e) => {
            const val = e.target.value;
            this._fire({ [key]: val });
        };
    }
    _onNumber(key) {
        return (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val))
                this._fire({ [key]: val });
        };
    }
    _onSection(key) {
        return (e) => {
            const val = e.target.value;
            this._fire({ sections: { ...this._config.sections, [key]: val } });
        };
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        const c = this._config;
        const currentDeviceId = this._nutDevices.find((d) => d.prefix === c.prefix)?.deviceId ?? "";
        return b `
      <div class="form">

        ${this._nutDevices.length > 0 ? b `
          <div class="row">
            <label>Appareil NUT</label>
            <select @change="${this._onDeviceChange}" .value="${currentDeviceId}">
              <option value="">— sélectionner —</option>
              ${this._nutDevices.map((d) => b `
                <option value="${d.deviceId}" ?selected="${d.deviceId === currentDeviceId}">
                  ${d.name}${d.areaName ? ` (${d.areaName})` : ""}
                </option>
              `)}
            </select>
            <p class="hint">Sélectionner un appareil remplit automatiquement le préfixe.</p>
          </div>` : A}

        <div class="row">
          <label>Nom *</label>
          <input type="text" .value="${c.name ?? ""}" @input="${this._onInput("name")}" placeholder="APC HAOS" />
        </div>

        <div class="row">
          <label>Préfixe des entités *</label>
          <input type="text" .value="${c.prefix ?? ""}" @input="${this._onInput("prefix")}" placeholder="myups" />
          <p class="hint">Préfixe des entity_id NUT, ex. <code>myups</code> → sensor.myups_charge_de_la_batterie</p>
        </div>

        <div class="row">
          <label>Sous-titre (modèle)</label>
          <input type="text" .value="${c.model ?? ""}" @input="${this._onInput("model")}" placeholder="Back-UPS 900G2" />
        </div>

        <div class="row">
          <label>Image (URL)</label>
          <input type="text" .value="${c.image ?? ""}" @input="${this._onInput("image")}" placeholder="/local/apc-back-ups.png" />
        </div>

        <div class="row">
          <label>Couleur d'accent</label>
          <input type="color" .value="${c.accent ?? "#3ecf6e"}" @input="${this._onInput("accent")}" />
        </div>

        <div class="row">
          <label>Alerte charge (%) — repère rouge sur la barre</label>
          <input type="number" min="1" max="100" .value="${String(c.load_alert ?? 85)}" @input="${this._onNumber("load_alert")}" />
        </div>

        <h3>Sections</h3>

        <div class="section-row">
          <div class="row">
            <label>Entrée / Sortie</label>
            <select @change="${this._onSection("input")}" .value="${c.sections?.input ?? "open"}">
              <option value="open">Ouvert</option>
              <option value="collapsed">Replié</option>
              <option value="hidden">Masqué</option>
            </select>
          </div>
          <div class="row">
            <label>Batterie</label>
            <select @change="${this._onSection("battery")}" .value="${c.sections?.battery ?? "open"}">
              <option value="open">Ouvert</option>
              <option value="collapsed">Replié</option>
              <option value="hidden">Masqué</option>
            </select>
          </div>
          <div class="row">
            <label>Minuteries</label>
            <select @change="${this._onSection("timers")}" .value="${c.sections?.timers ?? "collapsed"}">
              <option value="open">Ouvert</option>
              <option value="collapsed">Replié</option>
              <option value="hidden">Masqué</option>
            </select>
          </div>
        </div>

      </div>
    `;
    }
}
NutUpsCardEditor.styles = i$5 `
    .form { display: flex; flex-direction: column; gap: 16px; padding: 16px; }
    .row { display: flex; flex-direction: column; gap: 4px; }
    label { font-size: 13px; color: var(--secondary-text-color, #a6abb3); }
    select, input[type="text"], input[type="number"], input[type="color"] {
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #3a3d44);
      background: var(--card-background-color, #22242a);
      color: var(--primary-text-color, #e8eaed);
      font: inherit;
      font-size: 14px;
      box-sizing: border-box;
    }
    input[type="color"] { height: 38px; padding: 2px 6px; cursor: pointer; }
    .hint { font-size: 12px; color: var(--secondary-text-color, #a6abb3); margin-top: 2px; }
    .section-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
    h3 { font-size: 14px; font-weight: 600; margin: 8px 0 0; }
  `;
__decorate([
    n$1({ attribute: false })
], NutUpsCardEditor.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], NutUpsCardEditor.prototype, "_config", void 0);
__decorate([
    r()
], NutUpsCardEditor.prototype, "_nutDevices", void 0);
customElements.define("nut-ups-card-editor", NutUpsCardEditor);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

const cardStyles = i$5 `
  :host {
    --nut-accent: #3ecf6e;
    --nut-card-bg: var(--ha-card-background, #22242a);
    --nut-block-bg: #2b2e35;
    --nut-block-bg2: #212328;
    --nut-text: var(--primary-text-color, #e8eaed);
    --nut-text-secondary: var(--secondary-text-color, #a6abb3);
    --nut-track: var(--divider-color, #3a3d44);
    --nut-border: #2a2c31;
    --nut-separator: #33363c;
  }

  :host {
    display: block;
    width: 100%;
    container-type: inline-size;
    container-name: nut-card;
  }

  ha-card {
    width: 100%;
  }

  .card {
    background: linear-gradient(180deg, #22242a 0%, #18191d 100%);
    background: var(--nut-card-bg);
    border-radius: 16px;
    border: 1px solid var(--nut-border);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: inherit;
    color: var(--nut-text);
    width: 100%;
    box-sizing: border-box;
  }

  /* ── Header ─────────────────────────────────────── */
  .header {
    display: grid;
    grid-template-columns: min(210px, 40%) 1fr;
    align-items: center;
    gap: 16px;
  }

  .header img,
  .header svg {
    width: min(210px, 40vw);
    height: auto;
    max-height: 200px;
    object-fit: contain;
    display: block;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    text-align: right;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid #3a3d44;
    color: var(--nut-text);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
  }

  .pill-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .pill-dot.blink {
    animation: blink 1.4s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pill-dot.blink { animation: none; }
  }

  .pill-code {
    color: var(--nut-text-secondary);
    font-family: ui-monospace, monospace;
    font-size: 12px;
  }

  .ups-name {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.1;
  }

  .ups-model {
    font-size: 14px;
    color: var(--nut-text-secondary);
  }

  .runtime-label {
    font-size: 12px;
    color: var(--nut-text-secondary);
  }

  .runtime-value {
    font-size: 26px;
    font-weight: 700;
  }

  @container nut-card (max-width: 320px) {
    .header { grid-template-columns: 35% 1fr; gap: 10px; }
    .pill { font-size: 11px; padding: 4px 8px; gap: 5px; }
    .pill-dot { width: 8px; height: 8px; }
    .ups-name { font-size: 20px; }
    .ups-model { font-size: 12px; }
    .runtime-value { font-size: 18px; }
    .block-value { font-size: 18px; }
    .card { padding: 14px; gap: 12px; }
  }

  @container nut-card (max-width: 260px) {
    .header { grid-template-columns: 1fr; }
    .header img, .header svg { width: 80px; max-height: 80px; margin: 0 auto; }
    .header-info { align-items: center; text-align: center; }
  }

  /* ── Blocks ──────────────────────────────────────── */
  .block {
    background: linear-gradient(160deg, var(--nut-block-bg) 0%, var(--nut-block-bg2) 100%);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .block-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .block-title {
    font-size: 15px;
    font-weight: 500;
  }

  .block-value {
    font-size: 22px;
    font-weight: 700;
  }

  .block-value-sub {
    font-size: 13px;
    font-weight: 400;
    color: var(--nut-text-secondary);
  }

  /* ── Progress bar ────────────────────────────────── */
  .bar-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bar-track {
    position: relative;
    height: 10px;
    border-radius: 5px;
    background: var(--nut-track);
    overflow: visible;
  }

  .bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 5px;
  }

  .bar-marker {
    position: absolute;
    top: -4px;
    width: 2px;
    height: 18px;
  }

  .bar-legend {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--nut-text-secondary);
  }

  /* ── Collapsible ─────────────────────────────────── */
  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 44px;
    margin: -8px 0;
    padding: 0;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }

  .chevron {
    transition: transform 0.2s;
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .collapsible-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .separator {
    border-top: 1px solid var(--nut-separator);
    padding-top: 12px;
  }

  /* ── Grid de détails ─────────────────────────────── */
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
    font-size: 13px;
  }

  .detail-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .detail-label {
    color: var(--nut-text-secondary);
  }

  .detail-value {
    font-weight: 500;
    cursor: pointer;
  }

  .detail-value:hover {
    text-decoration: underline;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  /* ── Footer line ─────────────────────────────────── */
  .footer-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    border-top: 1px solid var(--nut-separator);
    padding-top: 12px;
  }

  .footer-label {
    color: var(--nut-text-secondary);
  }

  .footer-value {
    font-weight: 500;
    cursor: pointer;
  }

  .footer-value:hover {
    text-decoration: underline;
  }

  /* ── Clickable value ─────────────────────────────── */
  [data-entity] {
    cursor: pointer;
  }

  [data-entity]:hover {
    opacity: 0.8;
  }
`;

const LABEL_MAP = {
    OL: "En ligne",
    OB: "Sur batterie",
    LB: "Batterie faible",
    RB: "Batterie à remplacer",
    CHRG: "En charge",
    BYPASS: "Bypass",
    OVER: "Surcharge",
    TRIM: "Réduction tension",
    BOOST: "Augmentation tension",
    FSD: "Arrêt forcé",
    OFF: "Éteint",
};
function parseNutStatus(rawCode, accent) {
    if (!rawCode || rawCode === "unavailable" || rawCode === "unknown") {
        return { label: "Indisponible", color: "#a6abb3", blink: false };
    }
    const flags = rawCode.trim().toUpperCase().split(/\s+/);
    if (flags.includes("LB")) {
        return { label: "Batterie faible", color: "#ff6b5b", blink: true };
    }
    if (flags.includes("RB")) {
        return { label: "Batterie à remplacer", color: "#ff6b5b", blink: false };
    }
    if (flags.includes("OB")) {
        return { label: "Sur batterie", color: "#f5b84a", blink: true };
    }
    if (flags.includes("BYPASS")) {
        return { label: "Bypass", color: "#f5b84a", blink: false };
    }
    if (flags.includes("OVER")) {
        return { label: "Surcharge", color: "#f5b84a", blink: false };
    }
    if (flags.includes("TRIM")) {
        return { label: "Réduction tension", color: "#f5b84a", blink: false };
    }
    if (flags.includes("BOOST")) {
        return { label: "Augmentation tension", color: "#f5b84a", blink: false };
    }
    if (flags.includes("OL") && flags.includes("CHRG")) {
        return { label: "En ligne · charge", color: accent, blink: false };
    }
    if (flags.includes("OL")) {
        return { label: "En ligne", color: accent, blink: false };
    }
    const known = flags.map((f) => LABEL_MAP[f]).filter(Boolean);
    return {
        label: known.length ? known.join(" · ") : rawCode,
        color: "#a6abb3",
        blink: false,
    };
}
function formatRuntime(seconds) {
    if (seconds === undefined || isNaN(seconds))
        return "—";
    if (seconds < 0)
        return "—";
    if (seconds >= 3600) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h} h ${String(m).padStart(2, "0")}`;
    }
    return `${Math.floor(seconds / 60)} min`;
}
// HA/NUT may return a pre-formatted string like "47min 40s" or a plain number (minutes or seconds).
// unit: the entity's unit_of_measurement ("min", "s", or undefined)
function parseRuntimeState(state, unit) {
    if (!state || state === "unavailable" || state === "unknown")
        return undefined;
    // Already a formatted string like "47min 40s" or "1h 02min"
    const mixedMatch = state.match(/(?:(\d+)h\s*)?(?:(\d+)min)?\s*(?:(\d+)s)?/i);
    if (mixedMatch && (mixedMatch[1] || mixedMatch[2] || mixedMatch[3])) {
        const h = parseInt(mixedMatch[1] || "0", 10);
        const m = parseInt(mixedMatch[2] || "0", 10);
        const s = parseInt(mixedMatch[3] || "0", 10);
        return h * 3600 + m * 60 + s;
    }
    const n = parseFloat(state);
    if (isNaN(n))
        return undefined;
    // Plain number: interpret by unit
    if (unit === "min")
        return n * 60;
    return n; // assume seconds
}
function clamp(v, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
}
function barPos(value, low, high) {
    if (high <= low)
        return 0;
    return clamp(((value - low) / (high - low)) * 100);
}

const upsDefaultImage = w `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
     style="width:200px;height:200px;display:block"
     role="img" aria-label="UPS">
  <defs>
    <linearGradient id="batt-fb" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="var(--nut-accent,#3ecf6e)" stop-opacity="1"/>
      <stop offset="1" stop-color="var(--nut-accent,#3ecf6e)" stop-opacity="0.55"/>
    </linearGradient>
    <filter id="glow-fb" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="512" height="512" rx="114" fill="#18191d"/>
  <rect x="3" y="3" width="506" height="506" rx="111" fill="none" stroke="#fff" stroke-opacity="0.06" stroke-width="2"/>
  <ellipse cx="268" cy="406" rx="112" ry="10" fill="#000" opacity="0.45"/>
  <g stroke="#e8eaed" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="180,160 204,142 356,142 332,160" fill="#2a2d34"/>
    <polygon points="332,160 356,142 356,374 332,392" fill="#202227"/>
    <rect x="180" y="160" width="152" height="232" rx="6" fill="#1f2126"/>
    <line x1="341" y1="330" x2="347" y2="326" stroke-width="4" opacity="0.6"/>
    <line x1="341" y1="346" x2="347" y2="342" stroke-width="4" opacity="0.6"/>
    <line x1="341" y1="362" x2="347" y2="358" stroke-width="4" opacity="0.6"/>
  </g>
  <rect x="222" y="271" width="68" height="85" rx="6" fill="var(--nut-accent,#3ecf6e)" opacity="0.55" filter="url(#glow-fb)"/>
  <g stroke="#e8eaed" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="none">
    <rect x="242" y="214" width="28" height="10" rx="3" fill="#e8eaed"/>
    <rect x="212" y="224" width="88" height="142" rx="12" fill="#17181c"/>
  </g>
  <rect x="222" y="271" width="68" height="85" rx="6" fill="url(#batt-fb)"/>
  <line x1="222" y1="310" x2="290" y2="310" stroke="#17181c" stroke-width="4"/>
  <circle cx="256" cy="188" r="7" fill="var(--nut-accent,#3ecf6e)"/>
  <g stroke="#e8eaed" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M180 352 C 150 352, 156 300, 138 300"/>
    <rect x="100" y="282" width="38" height="36" rx="9" fill="#1f2126"/>
    <line x1="100" y1="292" x2="82" y2="292"/>
    <line x1="100" y1="308" x2="82" y2="308"/>
  </g>
</svg>`;

const CARD_VERSION = "0.2.0";
function sectionOpen(cfg, def) {
    const v = cfg ?? def;
    return v === "open";
}
class NutUpsCard extends i$2 {
    constructor() {
        super(...arguments);
        this._sections = { input: true, battery: true, timers: false };
        this._storageKey = "";
    }
    setConfig(config) {
        if (!config.name)
            throw new Error("nut-ups-card: 'name' est requis");
        if (!config.prefix && !config.entities) {
            throw new Error("nut-ups-card: 'prefix' ou 'entities' est requis");
        }
        this._config = config;
        this._storageKey = `nut-ups-card:${config.name}:${config.prefix ?? ""}`;
        this._sections = {
            input: sectionOpen(config.sections?.input, "open"),
            battery: sectionOpen(config.sections?.battery, "open"),
            timers: sectionOpen(config.sections?.timers, "collapsed"),
        };
        this._loadSections();
    }
    _loadSections() {
        try {
            const raw = localStorage.getItem(this._storageKey);
            if (raw) {
                const saved = JSON.parse(raw);
                this._sections = { ...this._sections, ...saved };
            }
        }
        catch { }
    }
    _saveSections() {
        try {
            localStorage.setItem(this._storageKey, JSON.stringify(this._sections));
        }
        catch { }
    }
    _toggle(key) {
        this._sections = { ...this._sections, [key]: !this._sections[key] };
        this._saveSections();
    }
    static getConfigElement() {
        return document.createElement("nut-ups-card-editor");
    }
    static getStubConfig() {
        return {
            name: "Mon UPS",
            prefix: "myups",
            accent: "#3ecf6e",
            load_alert: 85,
            sections: { input: "open", battery: "open", timers: "collapsed" },
        };
    }
    getCardSize() {
        return 8;
    }
    _fireMoreInfo(entityId) {
        this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
    }
    _clickHandler(entityId) {
        return (e) => {
            e.stopPropagation();
            this._fireMoreInfo(entityId);
        };
    }
    _accent() {
        return this._config.accent ?? "#3ecf6e";
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        const c = this._config;
        const h = this.hass;
        const accent = this._accent();
        // Status
        const statusCode = getVal(h, "status_code", c);
        const nutStatus = parseNutStatus(statusCode, accent);
        // Runtime — NUT may return a pre-formatted string ("47min 40s") or a number
        const runtimeEnt = getEntity(h, "battery_runtime", c);
        const runtimeSec = parseRuntimeState(runtimeEnt?.state, runtimeEnt?.attributes?.unit_of_measurement);
        const runtimeStr = formatRuntime(runtimeSec);
        // Model
        const model = c.model ?? getVal(h, "ups_type", c) ?? "";
        return b `
      <ha-card>
        <div class="card">
          ${this._renderHeader(nutStatus, statusCode, runtimeStr, model, accent)}
          ${this._renderBatteryCharge(accent)} ${this._renderLoad()} ${this._renderInputOutput()}
          ${this._renderBatteryDetails()} ${this._renderTimers()}
        </div>
      </ha-card>
    `;
    }
    _renderHeader(nutStatus, rawCode, runtimeStr, model, accent) {
        const c = this._config;
        return b `
      <div class="header">
        ${c.image ? b `<img src="${c.image}" alt="Onduleur ${c.name}" />` : upsDefaultImage}
        <div class="header-info">
          <div class="pill" style=${o({ background: nutStatus.color + "22" })}>
            <span
              class="pill-dot ${nutStatus.blink ? "blink" : ""}"
              style=${o({ background: nutStatus.color })}
            ></span>
            <span>${nutStatus.label}</span>
            ${rawCode ? b `<span class="pill-code">${rawCode}</span>` : A}
          </div>
          <div>
            <div class="ups-name">${c.name}</div>
            ${model ? b `<div class="ups-model">${model}</div>` : A}
          </div>
          <div>
            <div class="runtime-label">Autonomie</div>
            <div
              class="runtime-value"
              style=${o({ color: accent })}
              data-entity="${getEntityId("battery_runtime", c)}"
              @click="${this._clickHandler(getEntityId("battery_runtime", c))}"
            >
              ${runtimeStr}
            </div>
          </div>
        </div>
      </div>
    `;
    }
    _renderBatteryCharge(accent) {
        const c = this._config;
        const h = this.hass;
        const pct = getNum(h, "battery_charge", c);
        const low = getNum(h, "battery_low_pct", c) ?? 10;
        const pctDisplay = pct !== undefined ? `${Math.round(pct)} %` : "—";
        return b `
      <div class="block">
        <div class="block-header">
          <div class="block-title-row">
            ${batteryIcon(accent)}
            <span class="block-title">Charge de la batterie</span>
          </div>
          <span
            class="block-value"
            data-entity="${getEntityId("battery_charge", c)}"
            @click="${this._clickHandler(getEntityId("battery_charge", c))}"
            >${pctDisplay}</span
          >
        </div>
        ${pct !== undefined
            ? b ` <div class="bar-wrap">
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    style=${o({
                width: `${clamp(pct)}%`,
                background: `linear-gradient(90deg, ${accent}66 0%, ${accent} 100%)`,
            })}
                  ></div>
                  <div
                    class="bar-marker"
                    style=${o({ left: `${low}%`, background: "#ff7a6b" })}
                  ></div>
                </div>
                <div class="bar-legend">
                  <span>0 %</span>
                  <span>Seuil faible ${low} %</span>
                  <span>100 %</span>
                </div>
              </div>`
            : A}
      </div>
    `;
    }
    _renderLoad() {
        const c = this._config;
        const h = this.hass;
        const loadPct = getNum(h, "load", c);
        const powerReal = getNum(h, "power_real", c);
        const powerNominal = getNum(h, "power_nominal", c);
        const loadAlert = c.load_alert ?? 85;
        const loadDisplay = loadPct !== undefined ? `${Math.round(loadPct)} %` : "—";
        let powerStr = "";
        if (powerReal !== undefined) {
            powerStr = `· ${Math.round(powerReal)} W`;
        }
        else if (loadPct !== undefined && powerNominal !== undefined) {
            powerStr = `· ≈ ${Math.round((loadPct * powerNominal) / 100)} W`;
        }
        const nomLabel = powerNominal !== undefined
            ? `Nominale ${Math.round(powerNominal)} ${getEntity(h, "power_nominal", c)?.attributes?.unit_of_measurement ?? "W"}`
            : "";
        return b `
      <div class="block">
        <div class="block-header">
          <div class="block-title-row">
            ${loadIcon()}
            <span class="block-title">Charge (sortie)</span>
          </div>
          <span class="block-value">
            <span
              data-entity="${getEntityId("load", c)}"
              @click="${this._clickHandler(getEntityId("load", c))}"
              >${loadDisplay}</span
            >
            ${powerStr ? b `<span class="block-value-sub"> ${powerStr}</span>` : A}
          </span>
        </div>
        ${loadPct !== undefined
            ? b ` <div class="bar-wrap">
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    style=${o({
                width: `${clamp(loadPct)}%`,
                background: "linear-gradient(90deg, #2563c9 0%, #4aa3ff 100%)",
            })}
                  ></div>
                  <div
                    class="bar-marker"
                    style=${o({ left: `${loadAlert}%`, background: "#ff7a6b" })}
                  ></div>
                </div>
                <div class="bar-legend">
                  <span>0 %</span>
                  <span>Alerte ${loadAlert} %</span>
                  <span>${nomLabel}</span>
                </div>
              </div>`
            : A}
      </div>
    `;
    }
    _renderInputOutput() {
        const c = this._config;
        const h = this.hass;
        const cfg = c.sections?.input;
        if (cfg === "hidden")
            return A;
        const inputV = getNum(h, "input_voltage", c);
        const outputV = getNum(h, "output_voltage", c);
        const voltage = inputV ?? outputV;
        const isInput = inputV !== undefined;
        const title = isInput ? "Entrée secteur" : "Sortie";
        const voltageEntityKey = isInput ? "input_voltage" : "output_voltage";
        if (voltage === undefined)
            return A;
        const transferLow = getNum(h, "transfer_low", c);
        const transferHigh = getNum(h, "transfer_high", c);
        const nomV = isInput
            ? (getNum(h, "input_voltage_nominal", c) ?? 230)
            : (getNum(h, "output_voltage_nominal", c) ?? getNum(h, "input_voltage_nominal", c) ?? 230);
        const hasBar = transferLow !== undefined && transferHigh !== undefined;
        const inPos = hasBar ? barPos(voltage, transferLow, transferHigh) : 0;
        const nomPos = hasBar ? barPos(nomV, transferLow, transferHigh) : 50;
        const footerKey = isInput ? "input_sensitivity" : "output_frequency_nominal";
        const footerLabel = isInput ? "Sensibilité d'entrée" : "Fréquence nominale";
        const footerEntity = getEntity(h, footerKey, c);
        const footerVal = footerEntity?.state;
        const open = this._sections.input;
        return b `
      <div class="block" style="gap:12px">
        <button
          type="button"
          class="toggle-btn"
          aria-expanded="${open}"
          aria-label="Afficher ou masquer ${title}"
          @click="${() => this._toggle("input")}"
        >
          <span class="block-title-row">
            ${lightningIcon()}
            <span class="block-title">${title}</span>
          </span>
          <span style="display:flex;align-items:center;gap:12px">
            <span
              class="block-value"
              data-entity="${getEntityId(voltageEntityKey, c)}"
              @click="${this._clickHandler(getEntityId(voltageEntityKey, c))}"
              >${Math.round(voltage)} V</span
            >
            ${chevronIcon(open)}
          </span>
        </button>
        ${open
            ? b ` <div class="collapsible-content">
                ${hasBar
                ? b ` <div class="bar-track" style="margin-top:4px">
                          <div
                            class="bar-fill"
                            style=${o({
                    width: `${inPos}%`,
                    background: "linear-gradient(90deg, #c9761a 0%, #f5b84a 100%)",
                })}
                          ></div>
                          <div
                            class="bar-marker"
                            style=${o({ left: `${nomPos}%`, background: "#e8eaed" })}
                          ></div>
                        </div>
                        <div class="bar-legend">
                          <span>Bascule basse ${transferLow} V</span>
                          <span>Nominale ${nomV} V</span>
                          <span>Bascule haute ${transferHigh} V</span>
                        </div>`
                : A}
                ${footerVal
                ? b ` <div class="footer-row">
                        <span class="footer-label">${footerLabel}</span>
                        <span
                          class="footer-value"
                          data-entity="${getEntityId(footerKey, c)}"
                          @click="${this._clickHandler(getEntityId(footerKey, c))}"
                          >${footerVal}${footerEntity?.attributes?.unit_of_measurement ? " " + footerEntity.attributes.unit_of_measurement : ""}</span
                        >
                      </div>`
                : A}
              </div>`
            : A}
      </div>
    `;
    }
    _renderBatteryDetails() {
        const c = this._config;
        const h = this.hass;
        const cfg = c.sections?.battery;
        if (cfg === "hidden")
            return A;
        const vBat = getNum(h, "battery_voltage", c);
        const vBatNom = getNum(h, "battery_voltage_nominal", c);
        const chemistry = getVal(h, "battery_chemistry", c);
        const headerVal = vBat !== undefined
            ? b `${vBat.toFixed(1)}
          V${vBatNom !== undefined ? b `<span class="block-value-sub"> / ${vBatNom} V nom.</span>` : A}`
            : (chemistry ?? "Batterie");
        const open = this._sections.battery;
        const runtimeLow = getNum(h, "battery_runtime_low", c);
        const mfrDate = getVal(h, "battery_mfr_date", c);
        const selfTest = getVal(h, "self_test", c);
        const beeper = getVal(h, "beeper", c);
        return b `
      <div class="block" style="gap:12px">
        <button
          type="button"
          class="toggle-btn"
          aria-expanded="${open}"
          aria-label="Afficher ou masquer Batterie"
          @click="${() => this._toggle("battery")}"
        >
          <span class="block-title-row">
            ${batteryDetailIcon()}
            <span class="block-title">Batterie</span>
          </span>
          <span style="display:flex;align-items:center;gap:12px">
            <span class="block-value">${headerVal}</span>
            ${chevronIcon(open)}
          </span>
        </button>
        ${open
            ? b ` <div class="detail-grid separator">
                ${runtimeLow !== undefined
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Autonomie batterie faible</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("battery_runtime_low", c))}"
                          >${formatRuntime(runtimeLow)}</span
                        >
                      </div>`
                : A}
                ${chemistry
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Chimie</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("battery_chemistry", c))}"
                          >${chemistry}</span
                        >
                      </div>`
                : A}
                ${mfrDate
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Fabriquée le</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("battery_mfr_date", c))}"
                          >${mfrDate}</span
                        >
                      </div>`
                : A}
                ${selfTest
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Résultat de l'autotest</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("self_test", c))}"
                          >${selfTest}</span
                        >
                      </div>`
                : A}
                ${beeper
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Signal sonore</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("beeper", c))}"
                          >${beeper}</span
                        >
                      </div>`
                : A}
              </div>`
            : A}
      </div>
    `;
    }
    _renderTimers() {
        const c = this._config;
        const h = this.hass;
        const cfg = c.sections?.timers;
        if (cfg === "hidden")
            return A;
        const shutdownDelay = getVal(h, "shutdown_delay", c);
        const restartDelay = getVal(h, "restart_delay", c);
        const loadOff = getVal(h, "load_off_timer", c);
        const loadOn = getVal(h, "load_on_timer", c);
        const loadRestart = getVal(h, "load_restart_timer", c);
        const outlet1 = getVal(h, "outlet_1_desc", c);
        const hasAny = shutdownDelay ?? restartDelay ?? loadOff ?? loadOn ?? loadRestart ?? outlet1;
        if (!hasAny)
            return A;
        const title = outlet1 ? "Prises & minuteries" : "Minuteries";
        const open = this._sections.timers;
        const fmtTimer = (v) => v === undefined ? "—" : v === "-1" ? "inactive" : `${v} s`;
        return b `
      <div class="block" style="gap:12px">
        <button
          type="button"
          class="toggle-btn"
          aria-expanded="${open}"
          aria-label="Afficher ou masquer ${title}"
          @click="${() => this._toggle("timers")}"
        >
          <span class="block-title-row">
            ${timerIcon()}
            <span class="block-title">${title}</span>
          </span>
          ${chevronIcon(open)}
        </button>
        ${open
            ? b ` <div class="detail-grid separator">
                ${outlet1
                ? b ` <div class="detail-cell full-width">
                        <span class="detail-label">Prise PowerShare</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("outlet_1_desc", c))}"
                          >${outlet1}</span
                        >
                      </div>`
                : A}
                ${shutdownDelay !== undefined
                ? b ` <div class="detail-cell full-width">
                        <span class="detail-label">Délai d'arrêt onduleur</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("shutdown_delay", c))}"
                          >${fmtTimer(shutdownDelay)}</span
                        >
                      </div>`
                : A}
                ${restartDelay !== undefined
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Délai de redémarrage</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("restart_delay", c))}"
                          >${fmtTimer(restartDelay)}</span
                        >
                      </div>`
                : A}
                ${loadOff !== undefined
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Minuterie arrêt charge</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("load_off_timer", c))}"
                          >${fmtTimer(loadOff)}</span
                        >
                      </div>`
                : A}
                ${loadOn !== undefined
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Minuterie démarrage charge</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("load_on_timer", c))}"
                          >${fmtTimer(loadOn)}</span
                        >
                      </div>`
                : A}
                ${loadRestart !== undefined
                ? b ` <div class="detail-cell">
                        <span class="detail-label">Minuterie redémarrage charge</span>
                        <span
                          class="detail-value"
                          @click="${this._clickHandler(getEntityId("load_restart_timer", c))}"
                          >${fmtTimer(loadRestart)}</span
                        >
                      </div>`
                : A}
              </div>`
            : A}
      </div>
    `;
    }
}
NutUpsCard.styles = cardStyles;
__decorate([
    n$1({ attribute: false })
], NutUpsCard.prototype, "hass", void 0);
__decorate([
    r()
], NutUpsCard.prototype, "_config", void 0);
__decorate([
    r()
], NutUpsCard.prototype, "_sections", void 0);
// ── SVG icons ────────────────────────────────────────────────────────────────
function batteryIcon(accent) {
    return b `<svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="${accent}"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="7" width="16" height="10" rx="2"></rect>
    <path d="M21 11v2M6 10v4M9 10v4M12 10v4"></path>
  </svg>`;
}
function loadIcon() {
    return b `<svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4aa3ff"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22v-5M9 8V2M15 8V2M18 8v4a6 6 0 0 1-12 0V8z"></path>
  </svg>`;
}
function lightningIcon() {
    return b `<svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f5b84a"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"></path>
  </svg>`;
}
function batteryDetailIcon() {
    return b `<svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a6abb3"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="7" width="16" height="10" rx="2"></rect>
    <path d="M21 11v2M7 12h4M9 10v4"></path>
  </svg>`;
}
function timerIcon() {
    return b `<svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c4a5ff"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="13" r="8"></circle>
    <path d="M12 9v4l2 2M9 2h6"></path>
  </svg>`;
}
function chevronIcon(open) {
    return b `<svg
    class="chevron ${open ? "open" : ""}"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a6abb3"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>`;
}
// ── Registration ─────────────────────────────────────────────────────────────
customElements.define("nut-ups-card", NutUpsCard);
const _w = window;
_w.customCards = _w.customCards ?? [];
_w.customCards.push({
    type: "nut-ups-card",
    name: "NUT UPS Card",
    description: "Carte Lovelace pour onduleurs remontés par l'intégration NUT",
    preview: true,
    documentationURL: "https://github.com/an02H/ha-nut-ups-card",
});
console.info(`%c NUT UPS Card %c v${CARD_VERSION} `, "color:#3ecf6e;font-weight:bold", "color:#a6abb3");
