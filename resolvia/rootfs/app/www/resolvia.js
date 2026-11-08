/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{(()=>{if(typeof window>"u"||window.__selectSheet)return;let r=window.__selectSheet={theme:null,isOpen:()=>!!e},e=null,t=0,s=null,a=`
select:not([multiple]){pointer-events:none}
.ss-wrap{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-end;justify-content:center;font-family:var(--ss-font);-webkit-tap-highlight-color:transparent}
.ss-back{position:absolute;inset:0;background:var(--ss-scrim);opacity:0;transition:opacity .18s}
.ss-sheet{position:relative;width:100%;max-width:560px;max-height:min(72vh,640px);display:flex;flex-direction:column;background:var(--ss-bg);color:var(--ss-fg);border-radius:28px 28px 0 0;box-shadow:0 -8px 32px rgba(0,0,0,.25);transform:translateY(100%);transition:transform .2s cubic-bezier(.2,.8,.2,1);padding-bottom:env(safe-area-inset-bottom)}
.ss-wrap.out{pointer-events:none}
.ss-wrap.in .ss-back{opacity:1}
.ss-wrap.in .ss-sheet{transform:none}
.ss-grab{width:40px;height:4px;border-radius:2px;background:var(--ss-line2);margin:10px auto 2px;flex:none}
.ss-head{display:flex;align-items:center;gap:8px;padding:6px 10px 8px 20px;flex:none}
.ss-head b{flex:1;font-size:17px;font-weight:600;line-height:1.25;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.ss-x{width:40px;height:40px;border-radius:50%;border:0;background:transparent;color:var(--ss-mut);display:grid;place-items:center;cursor:pointer;flex:none}
.ss-x:hover{background:var(--ss-soft2)}
.ss-x svg,.ss-opt svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.ss-list{overflow-y:auto;overscroll-behavior:contain;padding:0 10px 12px}
.ss-group{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ss-mut);padding:12px 12px 4px}
.ss-opt{display:flex;align-items:center;gap:12px;width:100%;min-height:50px;padding:10px 12px;border:0;border-radius:14px;background:transparent;color:inherit;font:inherit;font-size:16px;line-height:1.3;text-align:left;cursor:pointer}
.ss-opt span{flex:1;min-width:0;overflow-wrap:anywhere}
.ss-opt:hover,.ss-opt:focus-visible{background:var(--ss-soft2);outline:none}
.ss-opt.on{background:var(--ss-soft);font-weight:600}
.ss-opt.on svg{color:var(--ss-a)}
.ss-opt:not(.on) svg{visibility:hidden}
.ss-opt:disabled{opacity:.45;cursor:default}
@media (min-width:700px){.ss-wrap{align-items:center}.ss-sheet{max-width:440px;border-radius:28px;transform:translateY(16px) scale(.98);opacity:0;transition:transform .16s,opacity .16s}.ss-wrap.in .ss-sheet{opacity:1}.ss-grab{display:none}.ss-head{padding-top:14px}}
@media (prefers-reduced-motion:reduce){.ss-back,.ss-sheet{transition:none}}
`,i='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',o='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',c=()=>{if(document.getElementById("ss-css"))return;let f=document.createElement("style");f.id="ss-css",f.textContent=a,(document.head||document.documentElement).appendChild(f)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();let d=f=>f.parentNode&&f.parentNode.host&&f.parentNode.nodeType===11?f.parentNode.host:f.parentNode||(f.host?f.host:null),n=f=>{let x=/rgba?\(([^)]+)\)/.exec(f||"");if(!x)return null;let _=x[1].split(/[ ,/]+/).filter(Boolean).map(Number);return{r:_[0],g:_[1],b:_[2],a:_.length>3?_[3]:1}},p=({r:f,g:x,b:_})=>(.2126*f+.7152*x+.0722*_)/255,u=(f,x)=>{let _=n(f)||(/^#([0-9a-f]{6})$/i.test(f)?{r:parseInt(f.slice(1,3),16),g:parseInt(f.slice(3,5),16),b:parseInt(f.slice(5,7),16)}:{r:100,g:160,b:240});return`rgba(${_.r},${_.g},${_.b},${x})`};function g(f){let x=getComputedStyle(f),_=E=>{for(let P of E){let G=x.getPropertyValue(P).trim();if(G)return G}return""},$=null;for(let E=f;E&&E.nodeType===1;E=d(E)){let P=n(getComputedStyle(E).backgroundColor);if(P&&P.a>.5){$=p(P)<.45;break}}$===null&&($=!!(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches));let C=r.theme&&r.theme()||{};$=C.dark??$;let q=C.accent||_(["--rv-accent","--a","--accent","--cor"])||"#64b5f6",N=C.bg||_(["--rv-surface","--surface","--card"]),B=C.fg||_(["--rv-text","--text","--fg","--ink"]),z=C.muted||_(["--rv-muted","--muted","--mut"]);return{"--ss-bg":N||($?"#1b2229":"#ffffff"),"--ss-fg":B||($?"#e8edf3":"#141a22"),"--ss-mut":z||($?"#9aa6b4":"#5b6573"),"--ss-line2":$?"rgba(255,255,255,.18)":"rgba(0,0,0,.14)","--ss-a":q,"--ss-soft":u(q,$?.22:.16),"--ss-soft2":$?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)","--ss-scrim":_(["--rv-scrim","--scrim"])||"rgba(0,0,0,.45)","--ss-font":x.fontFamily||"system-ui, sans-serif"}}function m(f){let x=f.getAttribute("aria-label");if(x)return x;let _=f.getRootNode(),$=f.getAttribute("aria-labelledby");if($&&_.getElementById){let q=$.split(/\s+/).map(N=>(_.getElementById(N)||{}).textContent||"").join(" ").trim();if(q)return q}if(f.id&&_.querySelector){let q=_.querySelector(`label[for="${CSS.escape(f.id)}"]`);if(q)return q.textContent.trim()}let C=f.closest("label, .field");if(C){let q=C.querySelector(".flabel, .label, legend, b, span");if(q&&!q.contains(f))return q.textContent.trim()}return""}function w(f){if(e||!f||f.disabled||f.multiple)return;let x=document.createElement("div");x.className="ss-wrap";for(let[z,E]of Object.entries(g(f)))x.style.setProperty(z,E);let _=m(f),$=document.createElement("div");$.className="ss-sheet",$.setAttribute("role","dialog"),$.setAttribute("aria-modal","true"),_&&$.setAttribute("aria-label",_),$.innerHTML=`<div class="ss-grab"></div><div class="ss-head"><b></b><button type="button" class="ss-x" aria-label="Fechar">${i}</button></div><div class="ss-list" role="listbox"></div>`,$.querySelector(".ss-head b").textContent=_;let C=$.querySelector(".ss-list"),q=null,N=z=>{let E=document.createElement("button");E.type="button",E.className=`ss-opt${z.selected?" on":""}`,E.setAttribute("role","option"),E.setAttribute("aria-selected",z.selected?"true":"false"),E.disabled=z.disabled,E.innerHTML=`<span></span>${o}`,E.firstChild.textContent=z.label||z.textContent,E.addEventListener("click",()=>k(z.value)),z.selected&&(q=E),C.appendChild(E)};for(let z of f.children)if(z.tagName==="OPTGROUP"){let E=document.createElement("div");E.className="ss-group",E.textContent=z.label,C.appendChild(E);for(let P of z.children)P.tagName==="OPTION"&&!P.hidden&&N(P)}else z.tagName==="OPTION"&&!z.hidden&&N(z);let B=document.createElement("div");B.className="ss-back",x.append(B,$),document.body.appendChild(x),e={sel:f,wrap:x,pending:null,closing:!1},B.addEventListener("click",()=>b()),$.querySelector(".ss-x").addEventListener("click",()=>b()),x.addEventListener("keydown",z=>{if(z.key==="Escape")z.preventDefault(),b();else if(z.key==="ArrowDown"||z.key==="ArrowUp"){let E=[...C.querySelectorAll(".ss-opt:not(:disabled)")],P=E.indexOf(document.activeElement),G=E[Math.max(0,Math.min(E.length-1,P+(z.key==="ArrowDown"?1:-1)))];G&&(z.preventDefault(),G.focus())}});try{history.pushState(history.state,"")}catch{}requestAnimationFrame(()=>{x.classList.add("in"),q?(q.scrollIntoView({block:"center"}),q.focus({preventScroll:!0})):$.querySelector(".ss-x").focus({preventScroll:!0})})}function b(f=null){if(!e||e.closing)return;e.closing=!0,e.pending=f;let x=e,_=()=>{if(e!==x)return;e=null,x.wrap.classList.remove("in"),x.wrap.classList.add("out"),setTimeout(()=>x.wrap.remove(),220);let $=x.sel;x.pending!==null&&$.value!==x.pending&&($.value=x.pending,$.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),$.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));try{$.focus({preventScroll:!0})}catch{}};if(x.finish=_,x.byBack)return _();history.back(),setTimeout(_,400)}let k=f=>b(f);window.addEventListener("popstate",f=>{if(e){if(f.stopImmediatePropagation(),e.closing)return e.finish&&e.finish();e.byBack=!0,b()}});function I(f){let x=f.composedPath?f.composedPath():[f.target],_=x[0];if(_&&_.tagName==="SELECT")return _;if(typeof f.clientX!="number")return null;for(let $ of x.slice(0,6)){if(!$||$.nodeType!==1||$===document.body||$===document.documentElement)break;for(let C of $.querySelectorAll("select")){if(C.disabled||C.multiple)continue;let q=C.getBoundingClientRect();if(q.width&&f.clientX>=q.left&&f.clientX<=q.right&&f.clientY>=q.top&&f.clientY<=q.bottom&&y(C,f.clientX,f.clientY))return C}}return null}function y(f,x,_){let $=f.style.getPropertyValue("pointer-events");f.style.setProperty("pointer-events","auto","important");let C=null;try{let q=f.getRootNode();C=(q.elementFromPoint?q:document).elementFromPoint(x,_)}catch{}return $?f.style.setProperty("pointer-events",$):f.style.removeProperty("pointer-events"),C===f}let S=f=>{let x=f.composedPath?f.composedPath()[0]:f.target;return x&&x.tagName==="SELECT"&&!x.disabled&&!x.multiple?x:null};window.addEventListener("touchstart",f=>{let x=f.touches[0];s=x?{x:x.clientX,y:x.clientY}:null},{capture:!0,passive:!0}),window.addEventListener("touchend",f=>{let x=S(f);if(!x||e)return;let _=f.changedTouches[0];s&&_&&Math.hypot(_.clientX-s.x,_.clientY-s.y)>10||(f.preventDefault(),t=Date.now(),w(x))},{capture:!0,passive:!1}),window.addEventListener("mousedown",f=>{S(f)&&f.preventDefault()},!0),window.addEventListener("click",f=>{if(e)return;let x=I(f);x&&(f.preventDefault(),f.stopPropagation(),Date.now()-t>600&&w(x))},!0),window.addEventListener("keydown",f=>{let x=S(f);!x||e||(f.key==="Enter"||f.key===" "||f.key==="F4"||f.altKey&&(f.key==="ArrowDown"||f.key==="ArrowUp"))&&(f.preventDefault(),w(x))},!0),r.open=w,r.close=()=>b()})();var Ra={prazos:"/prazos",listas:"/minhas-listas"};function Bt(r=typeof window>"u"?null:window,e=Ra){let t=s=>{let a=new URL(s.location.href),i=e[a.searchParams.get("aba")];return i?(a.searchParams.delete("aba"),s.history.replaceState(s.history.state,"",a.href),i):null};if(!r)return null;try{let s=t(r);if(s)return s;if(r.parent&&r.parent!==r)return t(r.parent)}catch{}return null}var Pe=globalThis,vt=Pe.ShadowRoot&&(Pe.ShadyCSS===void 0||Pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xt=Symbol(),jt=new WeakMap,Re=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==xt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.i,t=this.t;if(vt&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=jt.get(t)),e===void 0&&((this.i=e=new CSSStyleSheet).replaceSync(this.cssText),s&&jt.set(t,e))}return e}toString(){return this.cssText}},J=r=>new Re(typeof r=="string"?r:r+"",void 0,xt),Ye=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((s,a,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[i+1],r[0]);return new Re(t,r,xt)},La=(r,e)=>{if(vt)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=Pe.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,r.appendChild(s)}},Wt=vt?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return J(t)})(r):r,{is:Da,defineProperty:Ha,getOwnPropertyDescriptor:Na,getOwnPropertyNames:Fa,getOwnPropertySymbols:Va,getPrototypeOf:Ua}=Object,Ke=globalThis,Yt=Ke.trustedTypes,Ba=Yt?Yt.emptyScript:"",ja=Ke.reactiveElementPolyfillSupport,Ae=(r,e)=>r,mt={toAttribute(r,e){switch(e){case Boolean:r=r?Ba:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ds=(r,e)=>!Da(r,e),Kt={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:ds};Symbol.metadata??=Symbol("metadata"),Ke.litPropertyMetadata??=new WeakMap;var te=class extends HTMLElement{static addInitializer(e){this.o(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(e,t=Kt){if(t.state&&(t.attribute=!1),this.o(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Ha(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:i}=Na(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:a,set(o){let c=a?.call(this);i?.call(this,o),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Kt}static o(){if(this.hasOwnProperty(Ae("elementProperties")))return;let e=Ua(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ae("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(Ae("properties"))){let t=this.properties,s=[...Fa(t),...Va(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this.u=new Map;for(let[t,s]of this.elementProperties){let a=this.p(t,s);a!==void 0&&this.u.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(Wt(a))}else e!==void 0&&t.push(Wt(e));return t}static p(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this.P??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this.P?.delete(e)}$(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this.v=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return La(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.P?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}C(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor.p(e,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:mt).toAttribute(t,s.type);this.m=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this.m=null}}_$AK(e,t){let s=this.constructor,a=s.u.get(e);if(a!==void 0&&this.m!==a){let i=s.getPropertyOptions(a),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:mt;this.m=a;let c=o.fromAttribute(t,i.type);this[a]=c??this.T?.get(a)??c,this.m=null}}requestUpdate(e,t,s,a=!1,i){if(e!==void 0){let o=this.constructor;if(a===!1&&(i=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??ds)(i,t)||s.useDefault&&s.reflect&&i===this.T?.get(e)&&!this.hasAttribute(o.p(e,s))))return;this.M(e,t,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(e,t,{useDefault:s,reflect:a,wrapped:i},o){s&&!(this.T??=new Map).has(e)&&(this.T.set(e,o??t??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this.m!==e&&(this.A??=new Set).add(e))}async k(){this.isUpdatePending=!0;try{await this.S}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,i]of this.v)this[a]=i;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:o}=i,c=this[a];o!==!0||this._$AL.has(a)||c===void 0||this.M(a,void 0,i,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this.P?.forEach(s=>s.hostUpdate?.()),this.update(t)):this.U()}catch(s){throw e=!1,this.U(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this.P?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(e){return!0}update(e){this.A&&=this.A.forEach(t=>this.C(t,this[t])),this.U()}updated(e){}firstUpdated(e){}};te.elementStyles=[],te.shadowRootOptions={mode:"open"},te[Ae("elementProperties")]=new Map,te[Ae("finalized")]=new Map,ja?.({ReactiveElement:te}),(Ke.reactiveElementVersions??=[]).push("2.1.2");var bt=globalThis,Xt=r=>r,Le=bt.trustedTypes,Jt=Le?Le.createPolicy("lit-html",{createHTML:r=>r}):void 0,_t="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+Q,Wa=`<${wt}>`,ce=document,Se=()=>ce.createComment(""),Te=r=>r===null||typeof r!="object"&&typeof r!="function",$t=Array.isArray,ps=r=>$t(r)||typeof r?.[Symbol.iterator]=="function",pt=`[ 	
\f\r]`,ke=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qt=/-->/g,Zt=/>/g,ne=RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gt=/'/g,es=/"/g,hs=/^(?:script|style|textarea|title)$/i,yt=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),l=yt(1),Ya=yt(2),Ui=yt(3),H=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ts=new WeakMap,le=ce.createTreeWalker(ce,129);function us(r,e){if(!$t(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Jt!==void 0?Jt.createHTML(e):e}var ms=(r,e)=>{let t=r.length-1,s=[],a,i=e===2?"<svg>":e===3?"<math>":"",o=ke;for(let c=0;c<t;c++){let d=r[c],n,p,u=-1,g=0;for(;g<d.length&&(o.lastIndex=g,p=o.exec(d),p!==null);)g=o.lastIndex,o===ke?p[1]==="!--"?o=Qt:p[1]!==void 0?o=Zt:p[2]!==void 0?(hs.test(p[2])&&(a=RegExp("</"+p[2],"g")),o=ne):p[3]!==void 0&&(o=ne):o===ne?p[0]===">"?(o=a??ke,u=-1):p[1]===void 0?u=-2:(u=o.lastIndex-p[2].length,n=p[1],o=p[3]===void 0?ne:p[3]==='"'?es:Gt):o===es||o===Gt?o=ne:o===Qt||o===Zt?o=ke:(o=ne,a=void 0);let m=o===ne&&r[c+1].startsWith("/>")?" ":"";i+=o===ke?d+Wa:u>=0?(s.push(n),d.slice(0,u)+_t+d.slice(u)+Q+m):d+Q+(u===-2?c:m)}return[us(r,i+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Ee=class r{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,o=0,c=e.length-1,d=this.parts,[n,p]=ms(e,t);if(this.el=r.createElement(n,s),le.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=le.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(_t)){let g=p[o++],m=a.getAttribute(u).split(Q),w=/([.?@])?(.*)/.exec(g);d.push({type:1,index:i,name:w[2],strings:m,ctor:w[1]==="."?He:w[1]==="?"?Ne:w[1]==="@"?Fe:pe}),a.removeAttribute(u)}else u.startsWith(Q)&&(d.push({type:6,index:i}),a.removeAttribute(u));if(hs.test(a.tagName)){let u=a.textContent.split(Q),g=u.length-1;if(g>0){a.textContent=Le?Le.emptyScript:"";for(let m=0;m<g;m++)a.append(u[m],Se()),le.nextNode(),d.push({type:2,index:++i});a.append(u[g],Se())}}}else if(a.nodeType===8)if(a.data===wt)d.push({type:2,index:i});else{let u=-1;for(;(u=a.data.indexOf(Q,u+1))!==-1;)d.push({type:7,index:i}),u+=Q.length-1}i++}}static createElement(e,t){let s=ce.createElement("template");return s.innerHTML=e,s}};function de(r,e,t=r,s){if(e===H)return e;let a=s!==void 0?t.N?.[s]:t.O,i=Te(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(r),a._$AT(r,t,s)),s!==void 0?(t.N??=[])[s]=a:t.O=a),a!==void 0&&(e=de(r,a._$AS(r,e.values),a,s)),e}var De=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??ce).importNode(t,!0);le.currentNode=a;let i=le.nextNode(),o=0,c=0,d=s[0];for(;d!==void 0;){if(o===d.index){let n;d.type===2?n=new Xe(i,i.nextSibling,this,e):d.type===1?n=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(n=new Ve(i,this,e)),this._$AV.push(n),d=s[++c]}o!==d?.index&&(i=le.nextNode(),o++)}return le.currentNode=ce,a}V(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},Xe=class fs{get _$AU(){return this._$AM?._$AU??this.D}constructor(e,t,s,a){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=de(this,e,t),Te(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==H&&this.L(e):e._$litType$!==void 0?this.j(e):e.nodeType!==void 0?this.I(e):ps(e)?this.H(e):this.L(e)}B(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}I(e){this._$AH!==e&&(this._$AR(),this._$AH=this.B(e))}L(e){this._$AH!==h&&Te(this._$AH)?this._$AA.nextSibling.data=e:this.I(ce.createTextNode(e)),this._$AH=e}j(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ee.createElement(us(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(t);else{let i=new De(a,this),o=i.R(this.options);i.V(t),this.I(o),this._$AH=i}}_$AC(e){let t=ts.get(e.strings);return t===void 0&&ts.set(e.strings,t=new Ee(e)),t}H(e){$t(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let i of e)a===t.length?t.push(s=new fs(this.B(Se()),this.B(Se()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=Xt(e).nextSibling;Xt(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this.D=e,this._$AP?.(e))}},pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,a){let i=this.strings,o=!1;if(i===void 0)e=de(this,e,t,0),o=!Te(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{let c=e,d,n;for(e=i[0],d=0;d<i.length-1;d++)n=de(this,c[s+d],t,d),n===H&&(n=this._$AH[d]),o||=!Te(n)||n!==this._$AH[d],n===h?e=h:e!==h&&(e+=(n??"")+i[d+1]),this._$AH[d]=n}o&&!a&&this.W(e)}W(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},He=class extends pe{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===h?void 0:e}},Ne=class extends pe{constructor(){super(...arguments),this.type=4}W(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},Fe=class extends pe{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=de(this,e,t,0)??h)===H)return;let s=this._$AH,a=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==h&&(s===h||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ve=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){de(this,e)}},Ka={q:_t,J:Q,Z:wt,F:1,G:ms,K:De,X:ps,Y:de,tt:Xe,st:pe,it:Ne,et:Fe,ht:He,ot:Ve},Xa=bt.litHtmlPolyfillSupport;Xa?.(Ee,Xe),(bt.litHtmlVersions??=[]).push("3.3.3");var gs=(r,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let i=t?.renderBefore??null;s._$litPart$=a=new Xe(e.insertBefore(Se(),i),i,void 0,t??{})}return a._$AI(r),a},kt=globalThis;var ae=class extends te{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.rt=gs(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return H}};ae._$litElement$=!0,ae.finalized=!0,kt.litElementHydrateSupport?.({LitElement:ae});var Ja=kt.litElementPolyfillSupport;Ja?.({LitElement:ae});(kt.litElementVersions??=[]).push("4.2.2");var{tt:Qa}=Ka,ss=r=>r,Za=r=>r===null||typeof r!="object"&&typeof r!="function";var as=(r,e)=>e===void 0?r?._$litType$!==void 0:r?._$litType$===e,Ga=r=>r?._$litType$?.h!=null;var vs=r=>r.strings===void 0,is=()=>document.createComment(""),se=(r,e,t)=>{let s=r._$AA.parentNode,a=e===void 0?r._$AB:e._$AA;if(t===void 0){let i=s.insertBefore(is(),a),o=s.insertBefore(is(),a);t=new Qa(i,o,r,r.options)}else{let i=t._$AB.nextSibling,o=t._$AM,c=o!==r;if(c){let d;t._$AQ?.(r),t._$AM=r,t._$AP!==void 0&&(d=r._$AU)!==o._$AU&&t._$AP(d)}if(i!==a||c){let d=t._$AA;for(;d!==i;){let n=ss(d).nextSibling;ss(s).insertBefore(d,a),d=n}}}return t},ee=(r,e,t=r)=>(r._$AI(e,t),r),ei={},Ce=(r,e=ei)=>r._$AH=e,ft=r=>r._$AH,ht=r=>{r._$AR(),r._$AA.remove()},xs=r=>{r._$AR()};var U=r=>(...e)=>({_$litDirective$:r,values:e}),W=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this.nt=e,this._$AM=t,this.ct=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var Me=(r,e)=>{let t=r._$AN;if(t===void 0)return!1;for(let s of t)s._$AO?.(e,!1),Me(s,e);return!0},Ue=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},bs=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),ai(e)}};function ti(r){this._$AN!==void 0?(Ue(this),this._$AM=r,bs(this)):this._$AM=r}function si(r,e=!1,t=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(e)if(Array.isArray(s))for(let i=t;i<s.length;i++)Me(s[i],!1),Ue(s[i]);else s!=null&&(Me(s,!1),Ue(s));else Me(this,r)}var ai=r=>{r.type==2&&(r._$AP??=si,r._$AQ??=ti)},Ie=class extends W{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),bs(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Me(this,e),Ue(this))}setValue(e){if(vs(this.nt))this.nt._$AI(e,this);else{let t=[...this.nt._$AH];t[this.ct]=e,this.nt._$AI(t,this,0)}}disconnected(){}reconnected(){}};var Be=class{constructor(e){this.lt=e}disconnect(){this.lt=void 0}reconnect(e){this.lt=e}deref(){return this.lt}},je=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(e=>this.dt=e)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var We=class extends Ie{constructor(){super(...arguments),this.ft=new Be(this),this.vt=new je}render(e,t){return H}update(e,[t,s]){if(this.isConnected||this.disconnected(),t===this.yt)return H;this.yt=t;let a=0,{ft:i,vt:o}=this;return(async(c,d)=>{for await(let n of c)if(await d(n)===!1)return})(t,async c=>{for(;o.get();)await o.get();let d=i.deref();if(d!==void 0){if(d.yt!==t)return!1;s!==void 0&&(c=s(c,a)),d.commitValue(c,a),a++}return!0}),H}commitValue(e,t){this.setValue(e)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Bi=U(We),ji=U(class extends We{constructor(r){if(super(r),r.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(r,e){return this.rt=r,super.update(r,e)}commitValue(r,e){e===0&&xs(this.rt);let t=se(this.rt);ee(t,r)}}),rs=r=>Ga(r)?r._$litType$.h:r.strings,Wi=U(class extends W{constructor(r){super(r),this.bt=new WeakMap}render(r){return[r]}update(r,[e]){let t=as(this.gt)?rs(this.gt):null,s=as(e)?rs(e):null;if(t!==null&&(s===null||t!==s)){let a=ft(r).pop(),i=this.bt.get(t);if(i===void 0){let o=document.createDocumentFragment();i=gs(h,o),i.setConnected(!1),this.bt.set(t,i)}Ce(i,[a]),se(i,void 0,a)}if(s!==null){if(t===null||t!==s){let a=this.bt.get(s);if(a!==void 0){let i=ft(a).pop();xs(r),se(r,void 0,i),Ce(r,[i])}}this.gt=e}else this.gt=void 0;return this.render(e)}});var Yi=U(class extends W{constructor(r){if(super(r),r.type!==1||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){if(this.wt===void 0){this.wt=new Set,r.strings!==void 0&&(this._t=new Set(r.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in e)e[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(e)}let t=r.element.classList;for(let s of this.wt)s in e||(t.remove(s),this.wt.delete(s));for(let s in e){let a=!!e[s];a===this.wt.has(s)||this._t?.has(s)||(a?(t.add(s),this.wt.add(s)):(t.remove(s),this.wt.delete(s)))}return H}}),ii={},Ki=U(class extends W{constructor(){super(...arguments),this.St=ii}render(r,e){return e()}update(r,[e,t]){if(Array.isArray(e)){if(Array.isArray(this.St)&&this.St.length===e.length&&e.every((s,a)=>s===this.St[a]))return H}else if(this.St===e)return H;return this.St=Array.isArray(e)?Array.from(e):e,this.render(e,t)}});var Xi=U(class extends W{constructor(){super(...arguments),this.key=h}render(r,e){return this.key=r,e}update(r,[e,t]){return e!==this.key&&(Ce(r),this.key=e),t}}),Ji=U(class extends W{constructor(r){if(super(r),r.type!==3&&r.type!==1&&r.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!vs(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===H||e===h)return e;let t=r.element,s=r.name;if(r.type===3){if(e===t[s])return H}else if(r.type===4){if(!!e===t.hasAttribute(s))return H}else if(r.type===1&&t.getAttribute(s)===e+"")return H;return Ce(r),e}});var ut=new WeakMap,Qi=U(class extends Ie{render(r){return h}update(r,[e]){let t=e!==this.lt;return t&&this.$t(void 0),(t||this.Tt!==this.xt)&&(this.lt=e,this.Et=r.options?.host,this.$t(this.xt=r.element)),h}$t(r){if(this.lt!==void 0)if(this.isConnected||(r=void 0),typeof this.lt=="function"){let e=this.Et??globalThis,t=ut.get(e);t===void 0&&(t=new WeakMap,ut.set(e,t)),t.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),t.set(this.lt,r),r!==void 0&&this.lt.call(this.Et,r)}else this.lt.value=r}get Tt(){return typeof this.lt=="function"?ut.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),os=(r,e,t)=>{let s=new Map;for(let a=e;a<=t;a++)s.set(r[a],a);return s},K=U(class extends W{constructor(r){if(super(r),r.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(r,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let a=[],i=[],o=0;for(let c of r)a[o]=s?s(c,o):o,i[o]=t(c,o),o++;return{values:i,keys:a}}render(r,e,t){return this.Ct(r,e,t).values}update(r,[e,t,s]){let a=ft(r),{values:i,keys:o}=this.Ct(e,t,s);if(!Array.isArray(a))return this.Pt=o,i;let c=this.Pt??=[],d=[],n,p,u=0,g=a.length-1,m=0,w=i.length-1;for(;u<=g&&m<=w;)if(a[u]===null)u++;else if(a[g]===null)g--;else if(c[u]===o[m])d[m]=ee(a[u],i[m]),u++,m++;else if(c[g]===o[w])d[w]=ee(a[g],i[w]),g--,w--;else if(c[u]===o[w])d[w]=ee(a[u],i[w]),se(r,d[w+1],a[u]),u++,w--;else if(c[g]===o[m])d[m]=ee(a[g],i[m]),se(r,a[u],a[g]),g--,m++;else if(n===void 0&&(n=os(o,m,w),p=os(c,u,g)),n.has(c[u]))if(n.has(c[g])){let b=p.get(o[m]),k=b!==void 0?a[b]:null;if(k===null){let I=se(r,a[u]);ee(I,i[m]),d[m]=I}else d[m]=ee(k,i[m]),se(r,a[u],k),a[b]=null;m++}else ht(a[g]),g--;else ht(a[u]),u++;for(;m<=w;){let b=se(r,d[w+1]);ee(b,i[m]),d[m++]=b}for(;u<=g;){let b=a[u++];b!==null&&ht(b)}return this.Pt=o,Ce(r,d),H}}),_s="important",ri=" !"+_s,Zi=U(class extends W{constructor(r){if(super(r),r.type!==1||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{let s=r[t];return s==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(r,[e]){let{style:t}=r.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(e)),this.render(e);for(let s of this.Mt)e[s]==null&&(this.Mt.delete(s),s.includes("-")?t.removeProperty(s):t[s]=null);for(let s in e){let a=e[s];if(a!=null){this.Mt.add(s);let i=typeof a=="string"&&a.endsWith(ri);s.includes("-")||i?t.setProperty(s,i?a.slice(0,-11):a,i?_s:""):t[s]=a}}return H}}),Gi=U(class extends W{constructor(r){if(super(r),r.type!==2)throw Error("templateContent can only be used in child bindings")}render(r){return this.At===r?H:(this.At=r,document.importNode(r.content,!0))}}),ve=class extends W{constructor(e){if(super(e),this.gt=h,e.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===h||e==null)return this.kt=void 0,this.gt=e;if(e===H)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.gt)return this.kt;this.gt=e;let t=[e];return t.raw=t,this.kt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};ve.directiveName="unsafeHTML",ve.resultType=1;var er=U(ve);var Oe=class extends ve{};Oe.directiveName="unsafeSVG",Oe.resultType=2;var F=U(Oe),ns=r=>!Za(r)&&typeof r.then=="function",ls=1073741823;var gt=class extends Ie{constructor(){super(...arguments),this.Ot=ls,this.Ut=[],this.ft=new Be(this),this.vt=new je}render(...e){return e.find(t=>!ns(t))??H}update(e,t){let s=this.Ut,a=s.length;this.Ut=t;let i=this.ft,o=this.vt;this.isConnected||this.disconnected();for(let c=0;c<t.length&&!(c>this.Ot);c++){let d=t[c];if(!ns(d))return this.Ot=c,d;c<a&&d===s[c]||(this.Ot=ls,a=0,Promise.resolve(d).then(async n=>{for(;o.get();)await o.get();let p=i.deref();if(p!==void 0){let u=p.Ut.indexOf(d);u>-1&&u<p.Ot&&(p.Ot=u,p.setValue(n))}}))}return H}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},tr=U(gt);var oi=Symbol.for(""),ni=r=>{if(r?.r===oi)return r?._$litStatic$};var cs=new Map,ws=r=>(e,...t)=>{let s=t.length,a,i,o=[],c=[],d,n=0,p=!1;for(;n<s;){for(d=e[n];n<s&&(i=t[n],(a=ni(i))!==void 0);)d+=a+e[++n],p=!0;n!==s&&c.push(i),o.push(d),n++}if(n===s&&o.push(e[s]),p){let u=o.join("$$lit$$");(e=cs.get(u))===void 0&&(o.raw=o,cs.set(u,e=o)),t=c}return r(e,...t)},sr=ws(l),ar=ws(Ya);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var R={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-bar":'<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 16h8" /><path d="M7 11h12" /><path d="M7 6h3" />',"calendar-off":'<path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" /><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" /><path d="M16 2v4" /><path d="M3 10h7" /><path d="M21 10h-5.5" /><path d="m2 2 20 20" />',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',"door-open":'<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>',"hard-hat":'<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',"message-circle":'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />',layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',receipt:'<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>',hourglass:'<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',"user-round":'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'};var $s="https://github.com/diegozapella63",li=[["CronologIA","cronologia-ha","calendar-days","Agenda da fam\xEDlia, rem\xE9dios, rotinas e placar."],["ResolvIA","resolvia-ha","list-checks","Listas de tarefas com prazos, pontos e repeti\xE7\xE3o."],["GerencIA","gerencia-ha","wallet","Finan\xE7as da casa: caixa, cart\xF5es e investimentos."],["InventarIA","inventario-ha","package","Invent\xE1rio da casa: c\xF4modos, itens e valores."],["EconomIA","economia-ha","receipt","Lista de compras com o melhor pre\xE7o perto de casa."],["MemorIA","memoria-ha","book-open","Cadernos de anota\xE7\xE3o que abrem na hora certa."],["CorrerIA","correria-ha","message-circle","Chat com todos os apps: pergunte e pe\xE7a, tamb\xE9m pelo WhatsApp."]],xe=r=>l`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R.info)}</svg>`,ci=r=>l`<span class="ab-wm">${r.slice(0,-2)}<span>${r.slice(-2)}</span></span>`,ys=(r,e,t)=>l`<a class=${t} href=${r} target="_blank" rel="noopener">${e}</a>`;function ks({app:r,version:e}){return l`<div class="about">
    <div class="about-hero">
      <span class="ab-mark" aria-hidden="true">${xe("zap")}</span>
      <h2 class="ab-name">Correr<span>IA</span> Code</h2>
      <p class="ab-what">desenvolvimento de softwares</p>
      <p class="ab-tag">Feito na correria, rodado pela IA.</p>
    </div>

    <div class="panel about-why">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${xe("hourglass")}</span><h2>Por que CorrerIA?</h2></div>
      <p>Porque eu sou um programador sem tempo: vivo na correria. Então eu uso a IA para rodar tudo isso aqui. Ela escreve, testa e publica; eu dou as ideias e reclamo dos botões tortos.</p>
    </div>

    <div class="panel">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${xe("layers")}</span><h2>Os apps</h2></div>
      <ul class="about-apps" aria-label="Os apps">
        ${li.map(([t,s,a,i])=>l`<li>
            ${ys(`${$s}/${s}`,l`<span class="mais-ic" aria-hidden="true">${xe(a)}</span>
                <span class="mb"><b class="ab-app">${ci(t)}${t===r?l`<em class="ab-here">Este app · v${e}</em>`:""}</b><span>${i}</span></span>
                ${xe("external-link")}`,`ab-row${t===r?" here":""}`)}
          </li>`)}
      </ul>
    </div>

    ${ys($s,l`${xe("external-link")}Meu GitHub`,"btn primary ab-github")}
  </div>`}var As=Ye`
  .about-hero {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 30px 20px 26px;
    margin-bottom: 18px;
    border-radius: 22px;
    border: 1px solid var(--rv-line);
    background:
      radial-gradient(120% 90% at 50% 0%, var(--rv-accent-soft), transparent 70%),
      var(--rv-surface);
  }
  .ab-mark {
    display: inline-grid;
    place-items: center;
    width: 58px;
    height: 58px;
    border-radius: 18px;
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    transform: rotate(-8deg);
    box-shadow: 0 10px 24px -12px var(--rv-accent);
  }
  .ab-mark .i {
    width: 30px;
    height: 30px;
    fill: currentColor;
    stroke-width: 1.4;
  }
  .ab-name {
    margin: 16px 0 4px;
    font-family: var(--rv-display);
    font-size: 34px;
    font-weight: 700;
    line-height: 1.05;
    color: var(--rv-text);
  }
  .ab-name span,
  .ab-wm span {
    color: var(--rv-accent-ink);
  }
  .ab-what {
    margin: 0;
    color: var(--rv-muted);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  @media (max-width: 360px) {
    .ab-what {
      font-size: 11px;
      letter-spacing: 0.06em;
    }
  }
  .ab-tag {
    margin: 14px 0 0;
    color: var(--rv-text);
    font-size: 16px;
    font-style: italic;
  }
  .about-why p {
    margin: 0 0 16px;
    color: var(--rv-text);
    font-size: 15.5px;
    line-height: 1.55;
  }
  .about-apps {
    list-style: none;
    margin: 0 0 6px;
    padding: 0;
  }
  .ab-row {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 68px;
    padding: 10px 0;
    color: inherit;
    text-decoration: none;
    border-top: 1px solid var(--rv-line);
  }
  .about-apps > li:first-child > .ab-row {
    border-top: 0;
  }
  .ab-row .mb {
    flex: 1;
    min-width: 0;
    display: grid;
    gap: 2px;
  }
  .ab-row b {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 8px;
    font-family: var(--rv-display);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
  }
  .ab-row .mb > span {
    color: var(--rv-muted);
    font-size: 14px;
    line-height: 1.35;
  }
  .ab-row > .i {
    flex: none;
    width: 18px;
    height: 18px;
    color: var(--rv-faint);
  }
  .ab-here {
    font-family: var(--rv-body, inherit);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    color: var(--rv-accent-ink);
    background: var(--rv-accent-soft);
    border-radius: 999px;
    padding: 2px 8px;
  }
  @media (hover: hover) {
    .ab-row:hover b {
      color: var(--rv-accent-ink);
    }
  }
  .ab-github {
    display: flex;
    width: 100%;
    margin: 4px 0 8px;
    text-decoration: none;
  }
  .ab-github .i {
    width: 19px;
    height: 19px;
  }
`;var Ms="./fonts/barlow-400.woff2";var Ss="./fonts/barlow-500.woff2";var Ts="./fonts/barlow-600.woff2";var Es="./fonts/barlow-condensed-500.woff2";var Cs="./fonts/barlow-condensed-600.woff2";var Is="./fonts/barlow-condensed-700.woff2";var Os='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',qs=`"RV Barlow", ${Os}`,zs=`"RV Barlow Condensed", ${Os}`;function Ps(){if(document.getElementById("resolvia-fonts"))return;let r=(t,s,a)=>`@font-face{font-family:"${t}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,e=document.createElement("style");e.id="resolvia-fonts",e.textContent=[r("RV Barlow",Ms,400),r("RV Barlow",Ss,500),r("RV Barlow",Ts,"600 900"),r("RV Barlow Condensed",Es,500),r("RV Barlow Condensed",Cs,600),r("RV Barlow Condensed",Is,"700 900")].join(`
`),document.head.appendChild(e)}var At=()=>l`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var gi="(min-width: 1000px)";function Rs(r,e=""){if(!r.touches||r.touches.length!==1||window.matchMedia&&window.matchMedia(gi).matches)return null;let t=r.touches[0];if(t.clientX<24||t.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${e?`, ${e}`:""}`;for(let a of r.composedPath()){if(a===r.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let i=getComputedStyle(a);if((i.overflowX==="auto"||i.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:t.clientX,y:t.clientY,at:Date.now()}}function Ls(r,e){if(!e||!r.changedTouches||!r.changedTouches.length)return 0;let t=r.changedTouches[0],s=t.clientX-e.x,a=t.clientY-e.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-e.at>800?0:s<0?1:-1}async function Je(r,e,t){for(let a=0;a<30&&r._view().name!==e;a++)await new Promise(i=>setTimeout(i,16));await r.updateComplete;let s=r.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${t>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var Ds=Ye`
  :host {
    --rv-body: ${J(qs)};
    --rv-display: ${J(zs)};
    --rv-bg: #fbf6f4;
    --rv-surface: #ffffff;
    --rv-surface-2: #f6eeec;
    --rv-line: #eee2df;
    --rv-line-strong: #dccbc7;
    --rv-text: #231a1b;
    --rv-text-2: #4a3f40;
    --rv-muted: #7b6d6e;
    --rv-faint: #ab9c9d;
    --rv-nav: #ffffff;
    --rv-scrim: rgba(35, 20, 22, 0.42);
    --rv-shadow: 0 18px 50px rgba(70, 25, 25, 0.18);
    --rv-on-accent: #1d0f10;
    --rv-late: #d92d20;
    --rv-late-soft: rgba(217, 45, 32, 0.1);
    --rv-today: #b45309;
    --rv-today-soft: rgba(245, 158, 11, 0.14);
    /* Serviço externo: a color of its own (not the late red, the today amber, the points gold) */
    --rv-ext: #4f46e5;
    --rv-ext-soft: rgba(79, 70, 229, 0.12);
    --rv-skeleton: #efe5e3;
    --rv-header-bg: var(--app-header-background-color, #fbf6f4);
    --rv-header-fg: var(--app-header-text-color, #231a1b);
    --rv-nav-h: 68px;
    --rv-side-w: 272px;
    color-scheme: light;
    display: block;
    height: 100%;
    position: relative;
    font-family: var(--rv-body);
    color: var(--rv-text);
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    line-height: 1.5;
  }
  :host([dark]) {
    --rv-bg: #171213;
    --rv-surface: #201819;
    --rv-surface-2: #2a2122;
    --rv-line: #332a2b;
    --rv-line-strong: #463a3b;
    --rv-text: #f5eeee;
    --rv-text-2: #dbd0d0;
    --rv-muted: #a59798;
    --rv-faint: #716465;
    --rv-nav: #1d1617;
    --rv-scrim: rgba(0, 0, 0, 0.6);
    --rv-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
    --rv-late: #ff6b5e;
    --rv-late-soft: rgba(255, 107, 94, 0.14);
    --rv-today: #ffb547;
    --rv-today-soft: rgba(255, 181, 71, 0.14);
    --rv-ext: #a5b4fc;
    --rv-ext-soft: rgba(129, 140, 248, 0.18);
    --rv-skeleton: #2a2223;
    --rv-header-bg: var(--app-header-background-color, #130f10);
    --rv-header-fg: var(--app-header-text-color, #f5eeee);
    color-scheme: dark;
  }
  :host([vh]) {
    height: 100vh;
    height: 100dvh;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
  button:disabled {
    cursor: default;
  }
  input,
  textarea {
    font: inherit;
    color: inherit;
  }
  :focus-visible {
    outline: 2px solid var(--rv-accent-ink);
    outline-offset: 2px;
  }
  .i {
    width: 22px;
    height: 22px;
    flex: none;
    display: block;
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  /* ---------- shell ---------- */
  .root {
    display: contents;
  }
  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--rv-bg);
    overflow: hidden;
  }
  .topbar {
    flex: none;
    height: var(--header-height, 56px);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px 0 4px;
    background: var(--rv-header-bg);
    color: var(--rv-header-fg);
  }
  .topbar .title {
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 0;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--rv-display);
  }
  .topbar .title b {
    font-weight: 700;
  }
  .icon-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex: none;
  }
  .icon-btn:active {
    background: rgba(127, 127, 127, 0.16);
  }
  main {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
  }
  .page {
    max-width: 720px;
    margin: 0 auto;
    padding: 18px 18px 36px;
    animation: rv-in 0.28s ease both;
  }
  @keyframes rv-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
  }

  .display {
    font-family: var(--rv-display);
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.05;
    margin: 0;
  }
  .page-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 2px 2px 12px;
  }
  .page-head h1 {
    font-size: 21px;
    font-weight: 600;
    line-height: 1.2;
  }
  .page-sub {
    color: var(--rv-muted);
    font-size: 16px;
    line-height: 1.5;
    margin: -8px 2px 20px;
  }
  .overline {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--rv-muted);
  }

  /* ---------- hero (spiral notebook page) ---------- */
  .hero {
    position: relative;
    margin: 28px 4px 30px;
    transform: rotate(-1.4deg);
  }
  .hero-card {
    position: relative;
    background-color: var(--rv-accent);
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0 33px,
      rgba(0, 0, 0, 0.075) 33px 34.5px
    );
    background-position: 0 30px;
    color: var(--rv-on-accent);
    border-radius: 8px 8px 8px 8px;
    padding: 36px 22px 20px 28px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%);
    min-height: 160px;
  }
  .hero-card::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 18px;
    width: 2px;
    background: rgba(0, 0, 0, 0.12);
  }
  .hero-fold {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.28) 0 50%, transparent 50%);
    border-radius: 0 0 0 6px;
    filter: drop-shadow(-2px -2px 3px rgba(0, 0, 0, 0.12));
  }
  .rings {
    position: absolute;
    left: 26px;
    right: 26px;
    top: -14px;
    display: flex;
    justify-content: space-between;
    z-index: 2;
    pointer-events: none;
  }
  .ring {
    position: relative;
    width: 12px;
    height: 34px;
  }
  .ring::before {
    /* the hole punched in the page */
    content: "";
    position: absolute;
    left: 1px;
    top: 21px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--rv-bg);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.35);
  }
  .ring::after {
    /* the wire loop */
    content: "";
    position: absolute;
    left: 2px;
    top: 0;
    width: 8px;
    height: 27px;
    border-radius: 6px;
    border: 2.5px solid var(--rv-text-2);
    border-bottom-color: transparent;
    opacity: 0.85;
  }
  .hero-kicker {
    font-weight: 500;
    font-size: 15px;
    opacity: 0.75;
    margin-bottom: 8px;
  }
  .hero-big {
    font-family: var(--rv-display);
    font-weight: 700;
    font-size: clamp(48px, 14vw, 76px);
    line-height: 0.95;
    letter-spacing: 0;
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
    font-variant-numeric: tabular-nums;
  }
  .hero-big small {
    font-size: 25px;
    letter-spacing: 0;
    font-weight: 600;
  }
  .hero-sub {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.78;
  }
  .stamp {
    position: absolute;
    right: 20px;
    top: 40px;
    transform: rotate(9deg);
    border: 3.5px solid currentColor;
    border-radius: 10px;
    padding: 4px 10px 3px;
    font-family: var(--rv-display);
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 1.5px;
    opacity: 0.32;
    color: var(--rv-on-accent);
    animation: rv-stamp 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) both;
  }
  @keyframes rv-stamp {
    from {
      transform: rotate(9deg) scale(1.6);
      opacity: 0;
    }
  }

  /* ---------- cards / panels ---------- */
  .sec-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 0 2px 12px;
  }
  .sec-head h2 {
    font-size: 25px;
    font-weight: 600;
    line-height: 1.1;
  }
  .text-btn {
    color: var(--rv-accent-ink);
    font-weight: 600;
    font-size: 14px;
    padding: 8px 4px;
  }
  .panel {
    background: var(--rv-surface);
    border: 1px solid var(--rv-line);
    border-radius: 22px;
    padding: 6px 18px;
    margin-bottom: 18px;
  }
  .panel > .overline {
    padding: 16px 0 6px;
  }
  /* the heading of a group of lists: on the phone, the small overline; the icon and count are for the computer */
  .grp-head {
    display: flex;
    align-items: center;
    padding: 16px 0 6px;
  }
  .grp-head.desk-only,
  .grp-head .sec-ic,
  .grp-head small {
    display: none;
  }
  .grp-head h2 {
    margin: 0;
  }
  .grp-head + .list-card {
    border-top: 0;
  }
  /* computer only: the actions at the top right and the numbers beside the notebook */
  .top-acts,
  .facts {
    display: none;
  }
  /* Mais: section headings like the InventarIA (icon in a soft square + big title) */
  .mais-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 0 10px;
  }
  .mais-head h2 {
    margin: 0;
    font-family: var(--rv-display);
    font-size: 23px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0.005em;
    color: var(--rv-text);
  }
  .mais-ic {
    display: grid;
    place-items: center;
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 11px;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink);
  }
  .mais-ic .i {
    width: 21px;
    height: 21px;
    stroke-width: 1.9;
  }
  .mais-head .mh-count {
    margin-left: auto;
    font-size: 14px;
    color: var(--rv-muted);
    font-variant-numeric: tabular-nums;
  }
  .mais-head + .item,
  .mais-head + .list-card {
    border-top: 0;
  }
  .mais-head + .panel-lead {
    margin-top: 0;
  }
  /* Mais: the menu (Listas, Configurações), like the InventarIA */
  .more-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .more-row {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    min-height: 76px;
    padding: 12px 0;
    border-top: 1px solid var(--rv-line);
    text-align: left;
  }
  .more-menu li:first-child .more-row {
    border-top: 0;
  }
  .more-row .mb {
    flex: 1;
    min-width: 0;
    display: grid;
    gap: 2px;
  }
  .more-row b {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.25;
  }
  .more-row .mb span {
    color: var(--rv-muted);
    font-size: 14px;
    line-height: 1.35;
  }
  .more-row .chev {
    width: 20px;
    height: 20px;
    color: var(--rv-muted);
  }
  /* a screen of Mais: "‹ Mais" above the title, back to the menu */
  .uplink {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 36px;
    margin: 12px 0 0 -6px;
    padding: 6px 10px 6px 4px;
    border-radius: 10px;
    color: var(--rv-text-2);
    font-weight: 500;
  }
  .uplink .i {
    width: 18px;
    height: 18px;
  }
  .uplink:active {
    background: var(--rv-surface-2);
  }
  @media (hover: hover) {
    .uplink:hover {
      background: var(--rv-surface-2);
      color: var(--rv-text);
    }
  }
  /* Mais › Listas: the line about tapping goes above the lists */
  .lists-panel > .panel-lead:first-child {
    margin: 14px 0 4px;
  }
  .sec-actions {
    padding-bottom: 16px;
  }
  .panel > .panel-lead:last-child {
    margin-bottom: 18px;
  }
  .panel-title {
    font-size: 25px;
    padding: 18px 0 2px;
    font-weight: 600;
    line-height: 1.1;
  }

  .list-card {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 14px 0;
    text-align: left;
    border-top: 1px solid var(--rv-line);
  }
  .panel > .overline + .list-card,
  .panel > .list-card:first-child {
    border-top: 0;
  }
  .list-card.off {
    opacity: 0.5;
  }
  .tile {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: var(--cs);
    color: var(--ci);
    flex: none;
  }
  .tile .i {
    width: 21px;
    height: 21px;
  }
  .lc-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .lc-title {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lc-meta {
    font-size: 14px;
    color: var(--rv-muted);
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .bar {
    height: 5px;
    border-radius: 3px;
    background: var(--rv-surface-2);
    overflow: hidden;
    margin-top: 4px;
  }
  .bar > i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--c, var(--rv-accent));
    transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .lc-num {
    font-family: var(--rv-display);
    font-weight: 600;
    font-size: 19px;
    line-height: 1;
    min-width: 26px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .lc-num.zero {
    color: var(--ci);
  }
  .lc-num .i {
    width: 20px;
    height: 20px;
    margin-left: auto;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid var(--rv-line-strong);
    border-radius: 8px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--rv-text-2);
    white-space: nowrap;
  }
  .tag .i {
    width: 13px;
    height: 13px;
  }
  .tag.late {
    border-color: transparent;
    background: var(--rv-late-soft);
    color: var(--rv-late);
  }
  .tag.today {
    border-color: transparent;
    background: var(--rv-today-soft);
    color: var(--rv-today);
  }
  .tag.pts {
    border-color: transparent;
    background: color-mix(in srgb, #e0a100 18%, transparent);
    color: #b07d00;
    font-variant-numeric: tabular-nums;
  }
  :host([dark]) .tag.pts {
    color: #f2c14e;
  }
  .who-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }
  .who-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 10px;
    border-radius: 16px;
    background: var(--rv-surface-2);
    font-size: 16px;
  }
  .who-btn:active {
    transform: scale(0.97);
  }
  .who-av {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink);
    font-family: var(--rv-display, inherit);
    font-weight: 700;
    font-size: 22px;
  }
  .tag.info {
    border-color: transparent;
    background: var(--rv-surface-2);
    color: var(--rv-muted);
  }
  .tag.rep {
    border-color: transparent;
    background: var(--rv-surface-2);
    color: var(--rv-text-2);
  }
  .item.done .tag.rep {
    background: var(--cs, var(--rv-accent-soft));
    color: var(--ci, var(--rv-accent-ink));
  }
  .field-hint {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--rv-muted);
    margin-top: 2px;
  }
  .field-hint .i {
    width: 17px;
    height: 17px;
    margin-top: 1px;
    color: var(--rv-accent-ink);
  }
  .field input.num {
    width: 84px;
    border: 1.5px solid var(--rv-line-strong);
    background: var(--rv-bg);
    border-radius: 12px;
    padding: 9px 12px;
    font-size: 16px;
    outline: 0;
    text-align: center;
  }
  .field input.num:focus {
    border-color: var(--rv-accent);
  }
  .offline {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 9px 16px;
    font-size: 15px;
    font-weight: 500;
    background: var(--rv-late-soft);
    color: var(--rv-late);
  }
  .offline .i {
    width: 17px;
    height: 17px;
  }
  .tag.room {
    background: color-mix(in srgb, var(--rv-muted) 14%, transparent);
    color: var(--rv-text-2);
  }
  /* Serviço externo: someone from outside does it; its own color, so it stands out from the room and the items */
  .tag.ext {
    background: var(--rv-ext-soft);
    color: var(--rv-ext);
    border-color: color-mix(in srgb, var(--rv-ext) 35%, transparent);
  }
  .chip-row.ext-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .chip-row.ext-row .pick {
    justify-content: center;
  }
  .ext-who {
    width: 100%;
    margin-top: 10px;
  }
  .tag.list {
    border-color: transparent;
    background: var(--cs);
    color: var(--ci);
  }

  /* ---------- list detail ---------- */
  .detail-head {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin: -6px -8px 6px -12px;
  }
  .detail-head .dh-text {
    flex: 1;
    min-width: 0;
    padding-top: 6px;
  }
  .detail-head h1 {
    font-size: clamp(34px, 9vw, 46px);
    overflow-wrap: anywhere;
    font-weight: 700;
    line-height: 1;
  }
  .detail-head .overline {
    margin-bottom: 6px;
  }
  .progress {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 8px 2px 16px;
    font-size: 14px;
    color: var(--rv-muted);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .progress .bar {
    flex: 1;
    margin: 0;
    height: 6px;
  }

  .quick {
    position: sticky;
    top: 0;
    z-index: 3;
    margin: 0 -18px 14px;
    padding: 6px 18px 10px;
    background: linear-gradient(var(--rv-bg) 78%, transparent);
  }
  .quick form {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--rv-surface);
    border: 1.5px solid var(--rv-line-strong);
    border-radius: 18px;
    padding: 6px 6px 6px 16px;
    transition: border-color 0.15s;
  }
  .quick form:focus-within {
    border-color: var(--rv-accent);
  }
  .quick input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font-size: 16px;
    padding: 10px 0;
  }
  .quick input::placeholder {
    color: var(--rv-faint);
  }
  .add-btn {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    display: grid;
    place-items: center;
    flex: none;
    transition: transform 0.12s;
  }
  .add-btn:active {
    transform: scale(0.92);
  }

  .panel.items {
    padding-top: 2px;
    padding-bottom: 2px;
  }
  /* ---------- Sugestões ---------- */
  .it-why {
    display: flex;
    gap: 6px;
    align-items: flex-start;
    margin-top: 4px;
    font-size: 13.5px;
    line-height: 1.35;
    color: var(--rv-text);
  }
  .it-why .i {
    width: 15px;
    height: 15px;
    flex: none;
    margin-top: 1px;
    color: var(--rv-accent-ink);
  }
  .suggest-ai,
  .panel.start {
    padding-bottom: 14px;
  }
  /* Comece por aqui chosen by the AI: who chose it and when */
  .start-by {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin: -2px 0 6px;
    font-size: 13.5px;
    line-height: 1.45;
    color: var(--rv-text-2);
  }
  .start-by .i {
    width: 16px;
    height: 16px;
    flex: none;
    margin-top: 2px;
    color: var(--rv-accent-ink);
  }
  /* the same size, side by side when they fit, one under the other on the phone */
  .ai-actions.start-acts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 13em), 1fr));
    gap: 8px;
  }
  .start-acts .btn {
    width: 100%;
  }
  .ai-note {
    font-size: 13px;
    color: var(--rv-muted);
    margin: 10px 0 0;
    line-height: 1.4;
  }
  .ai-note.err {
    color: var(--rv-late);
  }
  .ai-actions {
    display: flex;
    padding-top: 12px;
  }
  .ai-actions .btn {
    flex: 1;
  }
  .ai-spin {
    animation: rv-spin 0.9s linear infinite;
  }
  .suggest-foot {
    display: flex;
    gap: 8px;
    margin: -4px 6px 16px;
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--rv-muted);
  }
  .suggest-foot .i {
    width: 15px;
    height: 15px;
    flex: none;
    margin-top: 1px;
  }
  .item {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 13px 0;
    border-top: 1px solid var(--rv-line);
  }
  .items > .item:first-child,
  .panel > .overline + .item {
    border-top: 0;
  }
  .item.dragging {
    z-index: 2;
    background: var(--rv-surface);
    border-radius: 14px;
    box-shadow: var(--rv-shadow), 0 0 0 10px var(--rv-surface);
    border-top-color: transparent;
    transition: none !important;
  }
  .item.shifting {
    transition: transform 0.18s ease;
  }
  .check {
    width: 24px;
    height: 24px;
    margin-top: -1px;
    border-radius: 9px;
    border: 2.2px solid var(--rv-line-strong);
    display: grid;
    place-items: center;
    flex: none;
    color: transparent;
    position: relative;
    transition: background 0.18s, border-color 0.18s, transform 0.12s;
  }
  .check::after {
    /* bigger touch target */
    content: "";
    position: absolute;
    inset: -10px;
  }
  .check .i {
    width: 16px;
    height: 16px;
    stroke-width: 3.2;
  }
  .check:active {
    transform: scale(0.88);
  }
  .check.on {
    background: var(--c, var(--rv-accent));
    border-color: var(--c, var(--rv-accent));
    color: var(--rv-on-accent);
    animation: rv-pop 0.32s cubic-bezier(0.2, 1.8, 0.4, 1);
  }
  @keyframes rv-pop {
    40% {
      transform: scale(1.18);
    }
  }
  /* Selecionar: round marks, the row tinted when picked, Mover at the bottom */
  .check.sel {
    border-radius: 50%;
  }
  .item.selecting {
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
  }
  .item.selecting.picked {
    background: color-mix(in srgb, var(--c, var(--rv-accent)) 10%, transparent);
  }
  .sel-head .text-btn {
    align-self: center;
  }
  .sel-bar {
    position: sticky;
    bottom: calc(var(--rv-nav-h) + 12px + env(safe-area-inset-bottom, 0px));
    z-index: 5;
    padding-top: 12px;
  }
  .sel-bar .btn {
    width: 100%;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  }
  .it-body {
    flex: 1;
    min-width: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .it-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    overflow-wrap: anywhere;
    transition: color 0.2s;
  }
  .item.done .it-text {
    color: var(--rv-faint);
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
  }
  .it-desc {
    font-size: 14px;
    color: var(--rv-muted);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: anywhere;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .lnk {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    max-width: 100%;
    vertical-align: bottom;
    color: var(--ci, var(--rv-accent-ink));
    font-weight: 600;
    text-decoration: none;
    background: var(--cs, var(--rv-accent-soft));
    border-radius: 8px;
    padding: 1px 8px 1px 6px;
    margin: 1px 0;
  }
  .lnk span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lnk .i {
    width: 14px;
    height: 14px;
  }
  .item.done .lnk {
    opacity: 0.6;
  }
  mark {
    background: var(--rv-accent-soft);
    color: inherit;
    border-radius: 4px;
    padding: 0 1px;
  }
  .grip {
    width: 36px;
    height: 36px;
    margin: -5px -8px -5px 0;
    display: grid;
    place-items: center;
    color: var(--rv-faint);
    touch-action: none;
    cursor: grab;
    flex: none;
  }
  .grip:active {
    cursor: grabbing;
  }

  .done-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px 2px 10px;
  }
  .done-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--rv-display);
    font-weight: 600;
    font-size: 25px;
    line-height: 1.1;
  }
  .done-toggle .count {
    color: var(--rv-muted);
  }
  .done-toggle .i {
    transition: transform 0.2s;
    color: var(--rv-muted);
  }
  .done-toggle.open .i {
    transform: rotate(180deg);
  }

  .empty {
    text-align: center;
    padding: 34px 20px 30px;
    color: var(--rv-muted);
  }
  .empty .big-stamp {
    display: inline-block;
    transform: rotate(-6deg);
    border: 4px solid var(--rv-accent-ink);
    color: var(--rv-accent-ink);
    border-radius: 12px;
    padding: 6px 16px 4px;
    font-family: var(--rv-display);
    font-weight: 700;
    font-size: 28px;
    letter-spacing: 2px;
    margin-bottom: 16px;
    animation: rv-stamp2 0.5s cubic-bezier(0.2, 1.6, 0.4, 1) both;
  }
  @keyframes rv-stamp2 {
    from {
      transform: rotate(-6deg) scale(1.7);
      opacity: 0;
    }
  }
  .empty .em-icon {
    width: 50px;
    height: 50px;
    border-radius: 18px;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink);
    display: grid;
    place-items: center;
    margin: 0 auto 14px;
  }
  .empty h3 {
    color: var(--rv-text);
    font-family: var(--rv-display);
    font-size: 22px;
    font-weight: 600;
    margin: 0 0 6px;
    line-height: 1.1;
  }
  .empty p {
    margin: 0 auto;
    max-width: 340px;
    line-height: 1.5;
    font-size: 16px;
  }

  .skeleton {
    height: 18px;
    border-radius: 6px;
    margin: 20px 0;
    background: linear-gradient(90deg, var(--rv-skeleton), var(--rv-surface-2), var(--rv-skeleton));
    background-size: 200% 100%;
    animation: rv-shimmer 1.2s linear infinite;
  }
  @keyframes rv-shimmer {
    to {
      background-position: -200% 0;
    }
  }

  /* ---------- search ---------- */
  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--rv-surface);
    border: 1.5px solid var(--rv-line-strong);
    border-radius: 18px;
    padding: 4px 6px 4px 16px;
    margin-bottom: 14px;
    color: var(--rv-muted);
  }
  .search-box:focus-within {
    border-color: var(--rv-accent);
  }
  .search-box input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font-size: 16px;
    padding: 12px 0;
    color: var(--rv-text);
  }
  .search-box input::-webkit-search-cancel-button {
    display: none;
  }
  /* the box of the home (like the InventarIA): typing opens Buscar */
  .home-search {
    margin: 0 0 16px;
  }
  kbd {
    flex: none;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    color: var(--rv-muted);
    border: 1px solid var(--rv-line-strong);
    border-bottom-width: 2px;
    border-radius: 5px;
    padding: 3px 6px;
    background: var(--rv-surface);
  }
  .home-search kbd {
    margin-right: 10px;
  }
  .side-link kbd {
    margin-left: auto;
  }
  @media (pointer: coarse) {
    kbd {
      display: none;
    }
  }
  /* Buscar › Incluir: buttons of the same width, two by row */
  .filters-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--rv-text-2);
    margin: 0 0 8px;
  }
  .filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 0 0 18px;
  }
  .filters .pick {
    justify-content: center;
    min-width: 0;
    min-height: 42px;
    white-space: normal;
    text-align: center;
    line-height: 1.2;
  }
  /* an odd one at the end (only Cômodos or only Equipamentos on) takes the whole row */
  .filters .pick:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  /* Opções › Prazos › Avisar o que vence hoje: the time and Testar side by side, the same height, then the phones */
  .due-alert {
    padding: 4px 0 6px;
  }
  .due-alert .field {
    margin: 10px 0 0;
  }
  .remind-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .remind-row input.remind-time {
    width: 100%;
    min-width: 0;
    height: 100%;
    min-height: 44px;
    padding: 0 8px;
    font: inherit;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
    border-radius: 12px;
    border: 1px solid var(--rv-line-strong);
    background: var(--rv-surface);
    color: var(--rv-text);
    color-scheme: inherit;
  }
  .remind-row .remind-test {
    margin: 0;
    min-height: 44px;
  }
  /* Quem recebe: each person of the house (the phones are the ones tied to them in Home Assistant) */
  .due-who {
    display: grid;
    gap: 6px;
  }
  .due-who .dw {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 6px 12px;
    border-radius: 12px;
    background: var(--rv-surface-2, var(--rv-accent-soft));
    font-size: 15px;
  }
  .due-who .dw .i {
    width: 17px;
    height: 17px;
    flex: none;
    color: var(--rv-accent-ink);
  }
  .due-who .dw b {
    font-weight: 600;
  }
  .due-who .dw span {
    margin-left: auto;
    color: var(--rv-muted);
    font-size: 13.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .due-who .dw.off {
    opacity: 0.6;
  }
  .due-who .dw.off .i {
    color: var(--rv-muted);
  }

  /* ---------- chips / pickers ---------- */
  .pick {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1.5px solid var(--rv-line-strong);
    border-radius: 12px;
    padding: 8px 13px;
    font-size: 14px;
    font-weight: 500;
    color: var(--rv-text-2);
    white-space: nowrap;
    max-width: 100%;
    position: relative;
  }
  .pick > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pick .i {
    width: 16px;
    height: 16px;
  }
  .pick.on {
    background: var(--rv-accent);
    border-color: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 600;
  }
  .pick.list .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--c);
    flex: none;
  }
  .pick.list.on {
    background: var(--cs);
    border-color: var(--c);
    color: var(--rv-text);
  }
  .pick.ghost {
    border-style: dashed;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  /* the choices of a form (Prazo, Repetir, Lista): buttons of the same width, like the EconomIA */
  /* Cômodo locked by the equipment: the rooms of the items stay marked, the others fade */
  .chip-row.locked .pick:disabled {
    cursor: default;
    opacity: 0.4;
  }
  .chip-row.locked .pick.on:disabled {
    opacity: 1;
  }
  .chip-row.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 9.5em), 1fr));
    gap: 8px;
  }
  .chip-row.grid .pick {
    justify-content: center;
    min-height: 44px;
    padding: 8px 10px;
    text-align: center;
    white-space: normal;
    line-height: 1.2;
    min-width: 0;
  }
  .chip-row.grid .pick > span {
    overflow: visible;
    text-overflow: clip;
  }
  .hidden-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    pointer-events: none;
  }

  /* ---------- settings ---------- */
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 0;
    border-top: 1px solid var(--rv-line);
    width: 100%;
    text-align: left;
    min-height: 54px;
  }
  .panel > .overline + .row,
  .panel > .row:first-child {
    border-top: 0;
  }
  .row.col {
    flex-direction: column;
    align-items: stretch;
  }
  .row .grow {
    flex: 1;
    min-width: 0;
  }
  .row .label {
    font-size: 16px;
    font-weight: 500;
  }
  .row .hint {
    font-size: 14px;
    color: var(--rv-muted);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .row .tile {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
  .row .tile .i {
    width: 20px;
    height: 20px;
  }
  .seg {
    display: flex;
    background: var(--rv-surface-2);
    border-radius: 14px;
    padding: 4px;
    gap: 4px;
  }
  .seg button {
    flex: 1;
    padding: 9px 6px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    color: var(--rv-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .seg button .i {
    width: 17px;
    height: 17px;
  }
  .seg button.on {
    background: var(--rv-surface);
    color: var(--rv-text);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    font-weight: 600;
  }
  :host([dark]) .seg button.on {
    background: var(--rv-line-strong);
  }
  .switch {
    position: relative;
    width: 50px;
    height: 30px;
    flex: none;
  }
  .switch input {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: pointer;
    z-index: 1;
  }
  .switch .track {
    position: absolute;
    inset: 0;
    border-radius: 15px;
    background: var(--rv-line-strong);
    transition: background 0.18s;
  }
  .switch .track::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1);
  }
  .switch input:checked + .track {
    background: var(--rv-accent);
  }
  .switch input:checked + .track::after {
    transform: translateX(20px);
  }
  .switch input:focus-visible + .track {
    outline: 2px solid var(--rv-accent-ink);
    outline-offset: 2px;
  }
  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .sw {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--c);
    display: grid;
    place-items: center;
    color: var(--rv-on-accent);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
    transition: transform 0.12s;
  }
  .sw.on {
    box-shadow: 0 0 0 3px var(--rv-surface), 0 0 0 5px var(--c);
  }
  .sw .i {
    width: 19px;
    height: 19px;
    stroke-width: 3;
  }
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(46px, 1fr));
    gap: 8px;
  }
  .ig {
    aspect-ratio: 1;
    border-radius: 13px;
    display: grid;
    place-items: center;
    color: var(--rv-muted);
    background: var(--rv-surface-2);
  }
  .ig.on {
    background: var(--cs);
    color: var(--ci);
    box-shadow: inset 0 0 0 2px var(--c);
  }
  .foot {
    text-align: center;
    color: var(--rv-faint);
    font-size: 13px;
    margin: 26px 0 8px;
    line-height: 1.6;
  }
  .foot b {
    font-family: var(--rv-display);
    font-size: 19px;
    color: var(--rv-muted);
    letter-spacing: 0.3px;
    font-weight: 600;
  }

  /* ---------- bottom nav ---------- */
  nav {
    flex: none;
    background: var(--rv-nav);
    border-top: 1px solid var(--rv-line);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  nav .tabs {
    max-width: 600px;
    margin: 0 auto;
    height: var(--rv-nav-h);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
  }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
    color: var(--rv-muted);
    padding: 8px 0;
    position: relative;
  }
  .tab .i {
    width: 23px;
    height: 23px;
  }
  .tab.on {
    color: var(--rv-text);
    font-weight: 600;
  }
  .tab.on .i {
    color: var(--rv-accent-ink);
  }
  .tab .badge {
    position: absolute;
    top: 0;
    left: calc(50% + 5px);
    min-width: 22px;
    height: 20px;
    padding: 0 6px;
    border-radius: 11px;
    background: var(--rv-late);
    color: #fff;
    font-family: var(--rv-display);
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 2px var(--rv-nav);
    box-sizing: border-box;
  }
  .tab.fab {
    color: var(--rv-text);
    font-weight: 600;
  }
  .tab.fab .pill {
    width: 58px;
    height: 38px;
    border-radius: 14px;
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    display: grid;
    place-items: center;
    margin-top: -4px;
    transition: transform 0.12s;
  }
  .tab.fab:active .pill {
    transform: scale(0.92);
  }
  .tab.fab .pill .i {
    width: 24px;
    height: 24px;
    stroke-width: 2.4;
  }

  /* ---------- sheet ---------- */
  .scrim {
    position: fixed;
    inset: 0;
    background: var(--rv-scrim);
    z-index: 20;
    animation: rv-fade 0.2s ease both;
  }
  @keyframes rv-fade {
    from {
      opacity: 0;
    }
  }
  .sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 21;
    max-width: 640px;
    margin: 0 auto;
    max-height: 90%;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: var(--rv-surface);
    border-radius: 28px 28px 0 0;
    padding: 10px 20px calc(22px + env(safe-area-inset-bottom, 0px));
    box-shadow: var(--rv-shadow);
    animation: rv-up 0.3s cubic-bezier(0.2, 0.9, 0.25, 1) both;
  }
  @keyframes rv-up {
    from {
      transform: translateY(100%);
    }
  }
  .grab {
    width: 42px;
    height: 5px;
    border-radius: 3px;
    background: var(--rv-line-strong);
    margin: 0 auto 12px;
  }
  .sheet-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 14px;
  }
  .sheet-head h3 {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.15;
  }
  .sheet-head .icon-btn {
    width: 42px;
    height: 42px;
    margin-right: -8px;
    color: var(--rv-muted);
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
  }
  .field > .flabel {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    color: var(--rv-text-2);
  }
  .field textarea,
  .field input[type="text"],
  .field input[type="time"] {
    width: 100%;
    border: 1.5px solid var(--rv-line-strong);
    background: var(--rv-bg);
    border-radius: 14px;
    padding: 12px 14px;
    font-size: 16px;
    outline: 0;
    resize: none;
    line-height: 1.4;
  }
  .field textarea:focus,
  .field input:focus {
    border-color: var(--rv-accent);
  }
  .field .time-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }
  .field .time-row input {
    width: auto;
    padding: 9px 12px;
    font-size: 16px;
  }
  .field .time-row .tl {
    color: var(--rv-muted);
    font-weight: 500;
    font-size: 14px;
  }
  .sheet-actions {
    display: flex;
    gap: 10px;
    margin-top: 8px;
  }
  .btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 15px;
    padding: 0 18px;
    transition: transform 0.12s;
  }
  .btn:active {
    transform: scale(0.97);
  }
  .btn.primary {
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 600;
  }
  .btn.outline {
    border: 1.5px solid var(--rv-line-strong);
  }
  .btn.danger {
    flex: none;
    color: var(--rv-late);
    border: 1.5px solid var(--rv-line-strong);
  }
  .menu-row {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 13px 4px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    border-top: 1px solid var(--rv-line);
  }
  .menu-row:first-of-type {
    border-top: 0;
  }
  .menu-row .i {
    color: var(--rv-muted);
  }
  .menu-row.danger,
  .menu-row.danger .i {
    color: var(--rv-late);
  }
  .menu-row .sub {
    margin-left: auto;
    color: var(--rv-muted);
    font-weight: 400;
    font-size: 14px;
  }
  .preview-tile {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 18px;
    background: var(--rv-bg);
    margin-bottom: 18px;
  }
  .preview-tile .lc-title {
    font-size: 17px;
  }
  .confirm-text {
    color: var(--rv-text-2);
    font-size: 16px;
    line-height: 1.5;
    margin: -4px 0 20px;
  }

  /* ---------- import ---------- */
  .imp-btn {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    flex: none;
    color: var(--rv-accent-ink);
    background: var(--rv-accent-soft);
  }
  .imp-btn .i {
    width: 20px;
    height: 20px;
  }
  /* Colar mensagem / Escolher fotos / Digitalizar com IA: dashed tiles like the InventarIA */
  .imp-field {
    margin-bottom: 12px;
  }
  .imp-tiles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  /* Digitalizar without camera (http): says so on the tile */
  .imp-tile.no-cam {
    border-style: dotted;
    color: var(--rv-muted);
  }
  .imp-tile.no-cam small {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--rv-late, var(--rv-muted));
  }
  .imp-tile {
    aspect-ratio: 1;
    border-radius: 12px;
    border: 1.5px dashed var(--rv-line-strong);
    background: transparent;
    color: var(--rv-text);
    display: grid;
    place-items: center;
    align-content: center;
    gap: 8px;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    text-align: center;
    text-wrap: balance;
  }
  .imp-tile .i {
    width: 22px;
    height: 22px;
    color: var(--rv-text-2);
  }
  .imp-tile:hover:not([disabled]),
  .imp-tile:focus-visible {
    border-color: var(--rv-text-2);
    background: var(--rv-surface-2);
  }
  .imp-tile[disabled] {
    opacity: 0.45;
  }
  .imp-help {
    margin: 10px 0 0;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--rv-muted);
  }
  .ai-box {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 14px;
    border-radius: 12px;
    background: var(--rv-surface-2);
    border: 1px solid var(--rv-line);
    font-size: 14px;
    line-height: 1.5;
    color: var(--rv-muted);
    margin-bottom: 18px;
  }
  .ai-box .i {
    flex: none;
    width: 17px;
    height: 17px;
    margin-top: 2px;
    color: var(--rv-text-2);
  }
  .sheet-lead {
    margin: -4px 2px 16px;
    font-size: 15px;
    line-height: 1.5;
    color: var(--rv-muted);
  }
  .panel.paused .row:not(.switch-row) {
    opacity: 0.55;
  }
  .imp-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: -4px 0 18px;
  }
  .imp-strip button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 11px 6px;
    border-radius: 14px;
    background: var(--rv-surface-2);
    font-size: 13px;
    font-weight: 500;
    color: var(--rv-text-2);
  }
  .imp-strip span {
    text-wrap: balance;
    text-align: center;
    line-height: 1.3;
  }
  .imp-strip .i {
    width: 21px;
    height: 21px;
    color: var(--rv-accent-ink);
  }
  .imp-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 14px;
  }
  .imp-opt {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 13px 14px;
    border-radius: 16px;
    border: 1.5px solid var(--rv-line-strong);
    text-align: left;
  }
  .imp-opt:disabled {
    opacity: 0.45;
  }
  .imp-opt > .i {
    color: var(--rv-faint);
    width: 18px;
    height: 18px;
  }
  .imp-ic {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink);
    flex: none;
  }
  .imp-ic .i {
    width: 21px;
    height: 21px;
  }
  .imp-tx {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .imp-tx b {
    font-size: 16px;
    font-weight: 600;
  }
  .imp-tx small {
    font-size: 13px;
    color: var(--rv-muted);
  }
  .imp-error {
    display: flex;
    gap: 9px;
    align-items: flex-start;
    padding: 11px 13px;
    border-radius: 13px;
    background: var(--rv-late-soft);
    color: var(--rv-late);
    font-size: 13px;
    line-height: 1.45;
    margin-bottom: 14px;
  }
  .imp-error.soft {
    background: var(--rv-surface-2);
    color: var(--rv-text-2);
  }
  .imp-error .i {
    width: 17px;
    height: 17px;
    margin-top: 1px;
    flex: none;
  }
  .imp-error.soft .i {
    color: var(--rv-accent-ink);
  }
  .thumbs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    margin: -2px 0 14px;
    padding-bottom: 2px;
  }
  .thumbs img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 12px;
    flex: none;
    border: 1px solid var(--rv-line);
  }
  .imp-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 26px 0 30px;
    color: var(--rv-muted);
    font-weight: 500;
    font-size: 15px;
  }
  .spin {
    color: var(--rv-accent-ink);
    animation: rv-spin 0.9s linear infinite;
  }
  .spin .i {
    width: 34px;
    height: 34px;
  }
  @keyframes rv-spin {
    to {
      transform: rotate(360deg);
    }
  }
  .imp-list {
    border: 1px solid var(--rv-line);
    border-radius: 16px;
    padding: 4px 6px 10px 12px;
    margin-bottom: 18px;
  }
  .imp-row {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--rv-line);
    padding: 4px 0;
  }
  .imp-row .check {
    width: 22px;
    height: 22px;
    border-radius: 7px;
    margin: 0;
  }
  .imp-row .check .i {
    width: 14px;
    height: 14px;
  }
  .imp-row input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font-size: 16px;
    padding: 10px 0;
  }
  .imp-row.off input {
    color: var(--rv-faint);
    text-decoration: line-through;
  }
  /* the list of each item: a chip under the text, a native picker over it */
  .imp-row.has-dest {
    flex-wrap: wrap;
    row-gap: 0;
    padding-bottom: 10px;
  }
  .imp-row.has-dest input {
    padding-bottom: 4px;
  }
  /* a line break before the list chip, so the chip keeps its own width */
  .imp-row.has-dest::after {
    content: "";
    flex-basis: 100%;
    height: 0;
    order: 5;
  }
  .imp-dest {
    position: relative;
    order: 10;
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    max-width: calc(100% - 32px);
    margin-left: 32px;
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--cs);
    color: var(--ci);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;
  }
  .imp-dest .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c);
    flex: none;
  }
  .imp-dest .dname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .imp-dest .i {
    width: 14px;
    height: 14px;
    flex: none;
  }
  .imp-dest select {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    font-size: 16px;
  }
  .imp-dest:focus-within {
    outline: 2px solid var(--c);
    outline-offset: 1px;
  }
  /* the room chip: neutral, beside the list chip */
  .imp-dest.imp-room {
    --c: var(--rv-muted);
    --cs: color-mix(in srgb, var(--rv-muted) 14%, transparent);
    --ci: var(--rv-text-2);
  }
  /* list, room and equipment under the text: they wrap, all with the indent of the text */
  .imp-chips {
    order: 10;
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-left: 32px;
    box-sizing: border-box;
    min-width: 0;
  }
  /* the equipment of a row: the search opens under it */
  .imp-eq {
    order: 11;
    flex-basis: 100%;
    padding: 8px 0 2px 32px;
    box-sizing: border-box;
    display: grid;
    gap: 6px;
  }
  button.imp-dest {
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    border: 0;
  }
  .imp-dest.open {
    outline: 2px solid var(--c);
    outline-offset: 1px;
  }
  .imp-chips .imp-dest {
    margin-left: 0;
    max-width: 100%;
    order: 0;
  }
  .imp-dest.imp-room.none {
    opacity: 0.75;
  }
  .imp-row.off .imp-dest {
    opacity: 0.5;
  }
  .icon-btn.mini {
    width: 36px;
    height: 36px;
    color: var(--rv-faint);
  }
  .icon-btn.mini .i {
    width: 18px;
    height: 18px;
  }
  .imp-list .add-row {
    margin-top: 10px;
  }
  .sheet-note {
    color: var(--rv-muted);
    font-size: 13px;
    line-height: 1.5;
    margin: 12px 2px 0;
  }
  .sheet-note.with-icon {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .sheet-note.with-icon .i {
    flex: none;
    width: 16px;
    height: 16px;
    margin-top: 2px;
  }
  .sheet-note.top {
    margin: -6px 2px 14px;
  }
  .ro-item {
    border: 1px solid var(--rv-line);
    background: var(--rv-surface-2);
    border-radius: 14px;
    padding: 14px;
    display: grid;
    gap: 8px;
  }
  .ro-item b {
    font-size: 17px;
    line-height: 1.35;
    color: var(--rv-text);
    overflow-wrap: anywhere;
  }
  .ro-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ro-item p {
    margin: 0;
    font-size: 14px;
    line-height: 1.45;
    color: var(--rv-muted);
    white-space: pre-line;
    overflow-wrap: anywhere;
  }
  .sheet-head .back {
    width: 40px;
    height: 40px;
    margin-left: -10px;
    margin-right: -6px;
    color: var(--rv-text);
  }
  .sheet-head h3 {
    flex: 1;
  }
  .btn:disabled {
    opacity: 0.5;
  }

  /* ---------- page header (same values as EconomIA / InventarIA) ---------- */
  .brand-head {
    margin: 2px 2px 18px;
  }
  .eyebrow {
    margin: 0;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--rv-muted);
    font-weight: 600;
  }
  .brand {
    font-family: var(--rv-display);
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
    color: var(--rv-text);
  }
  .brand span {
    color: var(--rv-accent-ink);
  }
  /* the icon of the app before its name */
  .app-ic {
    display: inline-block;
    width: 1.15em;
    height: 1.15em;
    margin-right: 0.28em;
    vertical-align: -0.2em;
    color: var(--rv-text);
    overflow: visible;
  }
  .page-title {
    font-family: var(--rv-display);
    font-size: clamp(34px, 8vw, 46px);
    font-weight: 700;
    line-height: 1.02;
    margin: 4px 0 0;
    text-wrap: balance;
  }
  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 10px;
    margin: 12px 0 0;
    color: var(--rv-muted);
    font-size: 14px;
  }
  .status .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
    background: var(--rv-accent);
    box-shadow: 0 0 0 3px var(--rv-accent-soft);
  }
  .status .dot.late {
    background: var(--rv-late);
    box-shadow: 0 0 0 3px var(--rv-late-soft);
  }
  .status .dot.off {
    background: var(--rv-faint);
    box-shadow: 0 0 0 3px rgba(127, 127, 127, 0.18);
  }

  /* ---------- camera ("Digitalizar com IA") ---------- */
  .cam {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    animation: rv-fade 0.2s ease both;
  }
  .cam video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cam-flash {
    position: absolute;
    inset: 0;
    background: #fff;
    animation: rv-flash 0.35s ease-out both;
    pointer-events: none;
  }
  @keyframes rv-flash {
    from {
      opacity: 0.85;
    }
    to {
      opacity: 0;
    }
  }
  .cam-top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(10px + env(safe-area-inset-top, 0px)) 12px 10px;
    background: linear-gradient(rgba(0, 0, 0, 0.55), transparent);
  }
  .cam-title {
    font-family: var(--rv-display);
    font-weight: 600;
    font-size: 21px;
  }
  .cam-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
  }
  .cam-btn.on {
    background: #ffd54a;
    color: #1d0f10;
  }
  .cam-btn.ghost {
    background: none;
  }
  .cam-frame {
    position: relative;
    flex: 1;
    margin: 18px 26px 6px;
    pointer-events: none;
  }
  .cam-frame i {
    position: absolute;
    width: 38px;
    height: 38px;
    border: 4px solid rgba(255, 255, 255, 0.92);
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
  }
  .cam-frame i:nth-child(1) {
    top: 0;
    left: 0;
    border-right: 0;
    border-bottom: 0;
    border-radius: 14px 0 0 0;
  }
  .cam-frame i:nth-child(2) {
    top: 0;
    right: 0;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 14px 0 0;
  }
  .cam-frame i:nth-child(3) {
    bottom: 0;
    left: 0;
    border-right: 0;
    border-top: 0;
    border-radius: 0 0 0 14px;
  }
  .cam-frame i:nth-child(4) {
    bottom: 0;
    right: 0;
    border-left: 0;
    border-top: 0;
    border-radius: 0 0 14px 0;
  }
  .cam-hint {
    position: relative;
    text-align: center;
    margin: 6px 24px 10px;
    font-size: 15px;
    font-weight: 500;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  }
  .cam-msg {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 0 32px;
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
  }
  .cam-msg > .i {
    width: 44px;
    height: 44px;
    opacity: 0.8;
  }
  .cam-msg .btn {
    flex: none;
  }
  .cam-bottom {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 12px;
    padding: 18px 20px calc(22px + env(safe-area-inset-bottom, 0px));
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  }
  .cam-shots {
    display: flex;
    align-items: center;
  }
  .cam-shots img {
    width: 44px;
    height: 56px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #fff;
    margin-right: -18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
  .cam-shots span {
    margin-left: 24px;
    font-weight: 600;
    font-size: 14px;
  }
  .cam-shutter {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 4px solid #fff;
    display: grid;
    place-items: center;
  }
  .cam-shutter span {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--rv-accent);
    transition: transform 0.1s;
  }
  .cam-shutter:active span {
    transform: scale(0.88);
  }
  .cam-shutter:disabled {
    opacity: 0.4;
  }
  .cam-done {
    justify-self: end;
    padding: 12px 16px;
    border-radius: 14px;
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 600;
    font-size: 15px;
  }
  .cam-done:disabled {
    background: rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.6);
  }
  .more-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: -6px 0 18px;
  }

  /* ---------- toast ---------- */
  .toast {
    position: fixed;
    left: 50%;
    bottom: calc(var(--rv-nav-h) + 16px + env(safe-area-inset-bottom, 0px));
    transform: translateX(-50%);
    z-index: 30;
    display: flex;
    align-items: center;
    gap: 14px;
    max-width: min(560px, calc(100% - 28px));
    width: max-content;
    padding: 12px 12px 12px 18px;
    border-radius: 16px;
    background: #2b2223;
    color: #f5eeee;
    font-size: 15px;
    font-weight: 500;
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.35);
    animation: rv-toast 0.28s cubic-bezier(0.2, 1.3, 0.4, 1) both;
  }
  :host([dark]) .toast {
    background: #f5eeee;
    color: #231a1b;
  }
  @keyframes rv-toast {
    from {
      opacity: 0;
      transform: translate(-50%, 14px);
    }
  }
  .toast span {
    min-width: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.35;
  }
  .toast button {
    flex: none;
    color: var(--rv-accent);
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 8px;
  }
  :host([dark]) .toast button {
    color: var(--rv-accent-ink-light);
  }
  /* with a sheet open, the bottom is the sheet's buttons (Salvar, Limpar…): the toast goes to the top */
  .toast.has-sheet {
    top: calc(16px + env(safe-area-inset-top, 0px));
    bottom: auto;
  }

  @media (min-width: 700px) {
    .page {
      padding-top: 30px;
    }
    .hero {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
  /* ---------- Leitura por IA ---------- */
  .panel-lead {
    margin: 0 0 14px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--rv-muted);
  }
  .ai-state {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px 14px;
    border-radius: 14px;
    background: var(--rv-surface-2);
  }
  .ai-state .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 6px;
    flex: none;
    background: var(--rv-faint);
  }
  .ai-state.ok .dot {
    background: #2fb67c;
    box-shadow: 0 0 0 3px rgba(47, 182, 124, 0.2);
  }
  .ai-state.warn .dot {
    background: #e8a317;
    box-shadow: 0 0 0 3px rgba(232, 163, 23, 0.2);
  }
  .ai-state.bad .dot {
    background: var(--rv-late);
    box-shadow: 0 0 0 3px var(--rv-late-soft);
  }
  .ai-state b {
    display: block;
    font-weight: 600;
  }
  .ai-state span {
    display: block;
    font-size: 14px;
    color: var(--rv-muted);
    line-height: 1.45;
  }
  /* the boxes open the sheet of selectsheet.js, never the window of the phone */
  select:not([multiple]) {
    pointer-events: none;
  }
  .select {
    width: 100%;
    font: inherit;
    font-size: 16px;
    color: var(--rv-text);
    background-color: var(--rv-surface-2);
    border: 1.5px solid var(--rv-line-strong);
    border-radius: 14px;
    padding: 12px 40px 12px 14px;
    appearance: none;
    -webkit-appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, var(--rv-muted) 50%), linear-gradient(135deg, var(--rv-muted) 50%, transparent 50%);
    background-position: calc(100% - 20px) 52%, calc(100% - 14px) 52%;
    background-size: 6px 6px;
    background-repeat: no-repeat;
  }
  .select:focus {
    outline: 0;
    border-color: var(--rv-accent);
  }
  .ai-actions {
    display: flex;
    margin: 14px 0 6px;
  }
  .ai-actions .btn {
    flex: none;
  }
  .steps-box {
    margin: 10px 0 14px;
    font-size: 14px;
  }
  .steps {
    margin: 6px 0 0;
    padding-left: 20px;
    color: var(--rv-text-2);
    line-height: 1.5;
  }
  .steps li + li {
    margin-top: 4px;
  }
  .text-btn.inline {
    display: inline;
    padding: 0 0 0 4px;
    font-size: inherit;
  }
  .data-row {
    padding: 14px 0;
    border-top: 1px solid var(--rv-line);
  }
  .data-row > b {
    display: block;
    font-weight: 600;
  }
  .data-row > p {
    margin: 2px 0 10px;
    font-size: 14px;
    line-height: 1.45;
    color: var(--rv-muted);
  }
  .btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .btn.sm {
    flex: none;
    min-height: 40px;
    font-size: 14px;
    padding: 0 14px;
    border-radius: 12px;
    gap: 6px;
    text-decoration: none;
    color: var(--rv-text);
  }
  .btn.sm .i {
    width: 18px;
    height: 18px;
  }
  .btn.primary.sm {
    color: var(--rv-on-accent);
  }
  /* Exportar (like the InventarIA): one line per file, with a border between them */
  .opts {
    list-style: none;
    margin: 0 0 6px;
    padding: 0;
    border-top: 1px solid var(--rv-line);
  }
  .opts > li {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--rv-line);
  }
  .opts .ot {
    flex: 1;
    min-width: min(100%, 13em);
  }
  .opts .ot b {
    display: block;
    font-weight: 600;
    font-size: 15px;
  }
  .opts .ot span {
    display: block;
    margin-top: 2px;
    font-size: 13.5px;
    line-height: 1.4;
    color: var(--rv-muted);
  }
  /* Mais › Listas: the lists turned off, folded at the end */
  .inact-head {
    width: 100%;
    text-align: left;
  }
  .inact-head .tile.muted {
    background: color-mix(in srgb, var(--rv-muted) 16%, transparent);
    color: var(--rv-muted);
  }
  .inact-head .label .count {
    display: inline-block;
    min-width: 1.6em;
    margin-left: 6px;
    padding: 0 7px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--rv-muted) 16%, transparent);
    color: var(--rv-muted);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    vertical-align: 2px;
  }
  .inact-head .chev {
    color: var(--rv-muted);
    transition: transform 0.2s;
  }
  .inact-head.open .chev {
    transform: rotate(180deg);
  }
  .row.inact .label {
    color: var(--rv-text-2);
  }
  /* Dados: every button the same width; on the phone it goes under its text, all lined up */
  .opts > li {
    flex-wrap: wrap;
  }
  .opts .btn,
  #dados .sec-actions .btn {
    flex: none;
    width: 11.5em;
    max-width: 100%;
    justify-content: center;
    white-space: nowrap;
  }
  /* Sensores no Home Assistant: the entities, one per line */
  .sensor-list {
    display: grid;
    gap: 2px;
    padding: 4px 0 14px;
  }
  .sensor-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 10px;
    padding: 8px 0;
    border-top: 1px solid var(--rv-line);
    font-size: 13.5px;
    color: var(--rv-muted);
  }
  .sensor-row code {
    font-size: 13px;
    padding: 1px 6px;
    border-radius: 6px;
    background: var(--rv-surface-2);
    color: var(--rv-text);
  }
  .data-note {
    margin: 8px 0 0;
    font-size: 13px;
    color: var(--rv-late);
  }
  .data-list {
    margin-top: 10px;
  }
  .data-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid var(--rv-line);
  }
  .data-item > div {
    flex: 1;
    min-width: 0;
  }
  .data-item b {
    display: block;
    font-weight: 600;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }
  .data-item span {
    display: block;
    font-size: 13px;
    color: var(--rv-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sheet .data-item span {
    white-space: normal;
  }
  .data-row code {
    font-size: 13px;
    padding: 1px 5px;
    border-radius: 6px;
    background: var(--rv-line);
  }

  /* ---------- Mais › Configurações: tabs at the top (same as the CronologIA) ---------- */
  .seg.compact button {
    font-size: 14px;
    gap: 5px;
  }
  .seg.compact .i {
    width: 16px;
    height: 16px;
  }
  .more-tabs {
    position: sticky;
    top: 0;
    z-index: 4;
    margin: 0 0 14px;
    box-shadow: 0 0 0 6px var(--rv-bg);
  }
  /* the tabs keep their width and the bar scrolls sideways when the screen is too narrow */
  .more-tabs {
    overflow-x: auto;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
  }
  .more-tabs::-webkit-scrollbar {
    display: none;
  }
  .more-tabs button {
    flex: 1 0 auto;
    padding-left: 6px;
    padding-right: 6px;
    white-space: nowrap;
  }
  /* the icons only where there is room for them */
  @media (max-width: 600px) {
    .more-tabs .i {
      display: none;
    }
  }
  /* phones: smaller so the four fit (below ~340 px the bar scrolls sideways) */
  @media (max-width: 440px) {
    .more-tabs {
      gap: 1px;
    }
    .more-tabs button {
      font-size: 13px;
      padding-left: 4px;
      padding-right: 4px;
    }
  }

  /* ---------- computador (1000 px ou mais): barra lateral no lugar das abas, como no InventarIA ---------- */
  .side {
    display: none;
  }
  .side-brand {
    font-family: var(--rv-display);
    font-size: 25px;
    font-weight: 700;
    line-height: 1;
    padding: 4px 10px 18px;
    color: var(--rv-text);
  }
  .side-brand span {
    color: var(--rv-accent-ink);
  }
  .side-add {
    flex: none;
    width: 100%;
    height: 46px;
    margin: 0 0 14px;
  }
  .side-nav,
  .side-lists {
    display: grid;
    gap: 2px;
  }
  .side-link,
  .side-list,
  .side-cal {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 40px;
    padding: 8px 10px;
    border-radius: 10px;
    text-align: left;
    color: var(--rv-text);
    font-weight: 500;
  }
  .side-link .i {
    width: 20px;
    height: 20px;
    flex: none;
    color: var(--rv-muted);
  }
  .side-link:hover,
  .side-list:hover,
  .side-cal:hover {
    background: var(--rv-surface-2);
  }
  .side-link[aria-current="page"],
  .side-list[aria-current="page"] {
    background: var(--rv-surface);
    box-shadow: inset 3px 0 0 var(--rv-accent);
    font-weight: 600;
  }
  .side-link[aria-current="page"] .i {
    color: var(--rv-accent-ink);
  }
  .side-badge {
    margin-left: auto;
    min-width: 22px;
    height: 20px;
    padding: 0 6px;
    border-radius: 11px;
    background: var(--rv-late);
    color: #fff;
    font-family: var(--rv-display);
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .side-h {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 22px 10px 8px;
  }
  .side-h span {
    font-family: var(--rv-display);
    font-size: 17px;
    font-weight: 600;
    color: var(--rv-text);
  }
  .side-h small {
    font-size: 13px;
    color: var(--rv-muted);
  }
  .side-list,
  .side-cal {
    min-height: 38px;
    padding: 5px 10px;
    font-weight: 400;
  }
  .side-tile {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    flex: none;
    background: var(--cs);
    color: var(--ci);
  }
  .side-tile .i {
    width: 15px;
    height: 15px;
  }
  .sl-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sl-num {
    font-family: var(--rv-display);
    font-size: 15px;
    font-weight: 500;
    color: var(--rv-muted);
    font-variant-numeric: tabular-nums;
  }
  .side-foot {
    margin-top: auto;
    padding: 18px 10px 0;
    font-size: 13px;
    color: var(--rv-faint);
  }
  @media (min-width: 1000px) {
    .app {
      position: relative;
      padding-left: var(--rv-side-w);
    }
    .side {
      position: absolute;
      inset: 0 auto 0 0;
      width: var(--rv-side-w);
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 22px 14px 18px;
      overflow-y: auto;
      border-right: 1px solid var(--rv-line);
      background: var(--rv-bg);
      scrollbar-width: thin;
    }
    nav {
      display: none;
    }
    .page {
      max-width: 880px;
      padding: 30px 40px 56px;
    }
    /* the app name is on the sidebar: the header keeps "Olá, Diego" */
    .eyebrow .brand,
    .eyebrow .sep {
      display: none;
    }
    /* outside Home Assistant: the name is already on the sidebar */
    .topbar {
      display: none;
    }
    /* the sheets become a window in the middle of the screen */
    .sheet {
      left: var(--rv-side-w);
      top: 0;
      bottom: 0;
      height: fit-content;
      max-height: 86%;
      margin: auto;
      border-radius: 24px;
      padding-bottom: 22px;
      animation-name: rv-pop;
    }
    .sheet .grab {
      display: none;
    }
    /* a wide sheet: the import tiles stop being squares */
    .imp-tile {
      aspect-ratio: auto;
      min-height: 96px;
    }
    .toast,
    .toast.has-sheet {
      left: calc(50% + var(--rv-side-w) / 2);
      top: auto;
      bottom: 24px;
    }
  }
  @keyframes rv-pop {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.98);
    }
  }
  /*
   * Computador, like the InventarIA: wider, sections on the page instead of cards (a big title with
   * its icon and lines between the rows), the notebook with the numbers beside it, two groups side by side
   * and the actions at the top right.
   */
  @media (min-width: 1000px) {
    .page {
      max-width: 1040px;
      padding: 28px 40px 72px;
    }
    .head-row {
      min-height: 44px;
    }
    .page > .brand-head {
      margin-bottom: 26px;
    }
    .top-acts {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: none;
    }
    .top-acts .btn {
      min-height: 40px;
      border-radius: 10px;
      padding: 0 16px;
    }
    .mic-top {
      margin: 0;
      width: 40px;
      height: 40px;
    }
    /* the microphone goes with the actions (the one by the title is for the phone) */
    .head-row > .mic-top {
      display: none;
    }
    .page .panel {
      background: none;
      border: 0;
      border-radius: 0;
      padding: 0;
      margin: 0 0 36px;
    }
    /* the menu Mais: a line above and between the rows, like the InventarIA */
    .more-menu ul {
      border-top: 1px solid var(--rv-line);
    }
    .more-row,
    .more-menu li:first-child .more-row {
      border-top: 0;
      border-bottom: 1px solid var(--rv-line);
      padding: 12px 8px;
      transition: background 0.15s;
    }
    .more-row:hover {
      background: var(--rv-surface-2);
    }
    /* the small headings of the sections become titles, like the InventarIA */
    .page .panel > .overline {
      padding: 0 0 10px;
      border-bottom: 1px solid var(--rv-line);
      font-family: var(--rv-display);
      font-size: 22px;
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: 0.005em;
      text-transform: none;
      color: var(--rv-text);
    }
    .grp-head,
    .grp-head.desk-only {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 0 12px;
      border-bottom: 1px solid var(--rv-line);
    }
    .grp-head .sec-ic {
      display: grid;
    }
    .grp-head h2 {
      flex: 1;
      min-width: 0;
      font-family: var(--rv-display);
      font-size: 25px;
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: 0.005em;
      text-transform: none;
      color: var(--rv-text);
    }
    .grp-head small {
      display: block;
      color: var(--rv-muted);
      font-size: 14px;
    }
    .sec-ic {
      place-items: center;
      flex: none;
      width: 38px;
      height: 38px;
      border-radius: 11px;
      background: var(--rv-accent-soft);
      color: var(--rv-accent-ink);
    }
    .sec-ic .i {
      width: 21px;
      height: 21px;
    }
    .list-card {
      padding: 13px 8px 14px;
      border-top: 0;
      border-bottom: 1px solid var(--rv-line);
      border-radius: 0;
      transition: background 0.15s;
    }
    .list-card:hover {
      background: var(--rv-surface-2);
    }
    .lc-title {
      font-size: 17px;
      font-weight: 500;
    }
    .groups.two {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 40px;
      align-items: start;
    }
    /* the notebook and, beside it, the numbers */
    .home-top {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
      gap: 40px;
      align-items: center;
      margin: 6px 0 4px;
    }
    .home-top .hero {
      margin: 30px 4px 18px;
      max-width: 540px;
    }
    .facts {
      display: grid;
      margin: 0;
      border-top: 1px solid var(--rv-line);
    }
    .fact-row {
      display: grid;
      grid-template-columns: 150px minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      padding: 9px 4px;
      border-bottom: 1px solid var(--rv-line);
    }
    .fact-row.go {
      cursor: pointer;
    }
    .fact-row.go:hover {
      background: var(--rv-surface-2);
    }
    .fact-row dt {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--rv-muted);
      font-size: 14px;
    }
    .fact-row .sec-ic {
      display: grid;
      width: 32px;
      height: 32px;
      border-radius: 9px;
    }
    .fact-row .sec-ic .i {
      width: 18px;
      height: 18px;
    }
    .fact-row .sec-ic.late {
      background: var(--rv-late-soft);
      color: var(--rv-late);
    }
    .fact-row .sec-ic.today {
      background: var(--rv-today-soft);
      color: var(--rv-today);
    }
    .fact-row dd {
      margin: 0;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
    .fact-row .fv {
      font-family: var(--rv-display);
      font-size: 18px;
      font-weight: 600;
      text-align: right;
    }
    .fact-row .fv.late {
      color: var(--rv-late);
    }
    .page .home-search {
      margin-top: 22px;
      margin-bottom: 40px;
    }
  }
  /* Falar: the microphone, with a ring that follows the voice */
  .voice {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 18px 8px 8px;
    text-align: center;
  }
  .voice-mic {
    position: relative;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    box-shadow: 0 6px 22px var(--rv-accent-soft);
  }
  .voice-mic .i {
    position: relative;
    width: 40px;
    height: 40px;
  }
  .voice-ring {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: var(--rv-accent-soft);
    transform: scale(calc(0.85 + var(--lvl, 0) * 0.45));
    transition: transform 0.12s ease-out;
  }
  .voice.on .voice-ring {
    animation: rv-breathe 1.6s ease-in-out infinite;
  }
  @keyframes rv-breathe {
    50% {
      opacity: 0.6;
    }
  }
  .voice-state {
    font-family: var(--rv-display);
    font-size: 21px;
    font-weight: 600;
    margin-top: 6px;
  }
  .voice-time {
    color: var(--rv-muted);
    font-variant-numeric: tabular-nums;
  }
  .voice-hint {
    margin: 0;
    max-width: 34ch;
    color: var(--rv-muted);
    font-size: 14px;
    line-height: 1.45;
  }
  /* the review after Falar: what was heard */
  .heard {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 4px 0 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--rv-surface-2);
    font-size: 14.5px;
    line-height: 1.4;
  }
  .heard .i {
    flex: none;
    width: 17px;
    height: 17px;
    margin-top: 2px;
    color: var(--rv-accent-ink);
  }

  /* Falar: the microphone at the top right of every screen */
  .head-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 26px;
  }
  .head-row .eyebrow {
    flex: 1;
    min-width: 0;
  }
  .mic-top {
    flex: none;
    width: 44px;
    height: 44px;
    margin: -6px -2px -6px 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink);
  }
  .mic-top .i {
    width: 22px;
    height: 22px;
  }
  .mic-top:active {
    transform: scale(0.94);
  }

  /* Falar: the microphone at the top right of every screen */
  .head-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 26px;
  }
  .head-row .eyebrow {
    flex: 1;
    min-width: 0;
  }
  .mic-top {
    flex: none;
    width: 44px;
    height: 44px;
    margin: -6px -2px -6px 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink);
  }
  .mic-top .i {
    width: 22px;
    height: 22px;
  }
  .mic-top:active {
    transform: scale(0.94);
  }

  /* the box of Agora: typing opens the search (Calendário › Lista) */
  .home-search {
    margin: 0 0 16px;
  }
  kbd {
    flex: none;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    color: var(--rv-muted);
    border: 1px solid var(--rv-line-strong);
    border-bottom-width: 2px;
    border-radius: 5px;
    padding: 3px 6px;
    background: var(--rv-surface);
  }
  .home-search kbd {
    margin-right: 10px;
  }
  .side-link kbd {
    margin-left: auto;
  }
  @media (pointer: coarse) {
    kbd {
      display: none;
    }
  }
  .detail-head .mic-top {
    margin: 0;
  }
`;var Hs=["dom","seg","ter","qua","qui","sex","s\xE1b"],Ns={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es",conversa:"Conversa"},Fs={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},ie=r=>String(r).padStart(2,"0"),Mt=r=>`${r.getFullYear()}-${ie(r.getMonth()+1)}-${ie(r.getDate())}`,Qe=r=>{let[e,t,s]=r.split("-").map(Number);return new Date(e,t-1,s)},Bs=r=>String(Math.round(r*10)/10).replace(".",","),Vs=r=>r>=1e3?`${Bs(r/1e3)} mil`:String(Math.round(r||0)),Us=r=>`${r} ${r===1?"chamada":"chamadas"}`,vi=(r,e={})=>e[r]||(r||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",xi=(r,e)=>{let t=new Date(r);if(!Number.isFinite(t.getTime()))return"";let s=`${ie(t.getHours())}:${ie(t.getMinutes())}`;return Mt(t)===Mt(e)?`hoje ${s}`:`${ie(t.getDate())}/${ie(t.getMonth()+1)} ${s}`};function bi(r){let e=r.join(" ").toLowerCase();return/google|gemini/.test(e)?l`Consumo exato e cota: <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener">Google Cloud Console</a>.`:/openai|chatgpt|gpt/.test(e)?l`Consumo exato e custo: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener">platform.openai.com/usage</a>.`:/anthropic|claude/.test(e)?l`Consumo exato e custo: <a href="https://platform.claude.com/usage" target="_blank" rel="noopener">Claude Console</a>.`:"O consumo exato fica no painel do provedor da IA."}function js({u:r,day:e,onDay:t,head:s,app:a,using:i="",names:o={}}){if(!r||!r.hoje)return l`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let c=new Date,d=Mt(c),n=y=>y.cota?l`<span class="s alert">${y.cota} ${y.cota>1?"vezes":"vez"} sem cota</span>`:y.erros?l`<span class="s alert">${y.erros} com erro</span>`:l`<span class="s">≈ ${Vs(y.tokens)} tokens</span>`,p=(y,S)=>l`<div class="uso-tile"><span class="k">${y}</span><span class="v">${S.chamadas||0}</span>${n(S)}</div>`,u=r.dias||[],g=Math.max(1,...u.map(y=>y.chamadas||0)),m=u.find(y=>y.dia===e)||u.find(y=>y.dia===d)||{dia:d,chamadas:0,erros:0,cota:0},w=y=>y.dia===d?"hoje":Hs[Qe(y.dia).getDay()],b=r.semana&&r.semana.tipos||{},k=[...Object.keys(r.mes&&r.mes.ias||{}),...Object.keys(r.semana&&r.semana.ias||{}),i],I=r.ultimas||[];return l`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${p("Hoje",r.hoje)}${p("7 dias",r.semana)}${p("Este m\xEAs",r.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${u.map(y=>{let S=y.chamadas?Math.max(4,Math.round(y.chamadas/g*100)):0;return l`<button type="button" class="uso-bar ${y.dia===d?"today":""}" aria-pressed=${y.dia===m.dia?"true":"false"} aria-label="${w(y)}: ${Us(y.chamadas)}" @click=${()=>t(y.dia)}><i style="height:${S}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${u.map(y=>l`<span>${w(y)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${m.dia===d?"Hoje":`${Hs[Qe(m.dia).getDay()]}, ${ie(Qe(m.dia).getDate())}/${ie(Qe(m.dia).getMonth()+1)}`}: <b>${Us(m.chamadas)}</b>${m.erros?`, ${m.erros} com erro`:""}${m.cota?`, ${m.cota} sem cota`:""}.</p>
    ${Object.keys(b).length?l`<ul class="uso-kinds">${Object.keys(b).sort((y,S)=>b[S]-b[y]).map(y=>l`<li>${Ns[y]||y} <b>${b[y]}</b></li>`)}</ul>`:h}
    <details class="uso-last">
      <summary>Últimas chamadas</summary>
      <ul>
        ${I.length?I.map(y=>l`<li><b>${Ns[y.tipo]||y.tipo}</b><span>${vi(y.ia,o)}</span>${Fs[y.resultado]?l`<span class="r-err">${Fs[y.resultado]}</span>`:h}
                <span class="t">${Bs(y.segundos)} s · ≈ ${Vs(y.tokens)} tokens${y.imagens?` \xB7 ${y.imagens} ${y.imagens>1?"imagens":"imagem"}`:""} · ${xi(y.quando,c)}</span></li>`):l`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    <p class="uso-note">${bi(k)}</p>
  </div>`}var Ws=`
  .uso-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 4px 0 12px; }
  .uso-tile { background: var(--rv-bg); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .uso-tile .k { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rv-muted); }
  .uso-tile .v { font-family: var(--rv-display); font-weight: 700; font-size: 30px; line-height: 1.05; color: var(--rv-text); font-variant-numeric: tabular-nums; }
  .uso-tile .s { font-size: 12.5px; color: var(--rv-muted); line-height: 1.3; }
  .uso-tile .s.alert { color: var(--rv-late); font-weight: 600; }
  .uso-chart { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 2px; align-items: end; height: 118px; padding-top: 6px; border-bottom: 1px solid var(--rv-line); }
  .uso-bar { display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 100%; background: none; border: 0; padding: 0 4px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .uso-bar i { display: block; width: 100%; max-width: 26px; min-height: 2px; border-radius: 4px 4px 0 0; background: var(--rv-accent); opacity: 0.45; }
  .uso-bar.today i, .uso-bar[aria-pressed="true"] i { opacity: 1; }
  .uso-bar:focus-visible { outline: 2px solid var(--rv-accent); outline-offset: 2px; border-radius: 4px; }
  .uso-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 2px; font-size: 12px; color: var(--rv-muted); text-align: center; padding-top: 4px; }
  .uso-cap { font-size: 13.5px; color: var(--rv-muted); margin: 0; padding: 8px 0 10px; }
  .uso-cap b { color: var(--rv-text); font-weight: 600; }
  .uso-kinds { display: flex; flex-wrap: wrap; gap: 5px; padding: 0 0 10px; margin: 0; list-style: none; }
  .uso-kinds li { font-size: 12.5px; padding: 2px 8px; border: 1px solid var(--rv-line); border-radius: 6px; color: var(--rv-muted); }
  .uso-kinds b { color: var(--rv-text); font-weight: 600; }
  .uso-last { padding: 2px 0 8px; }
  .uso-last summary { font-size: 14.5px; font-weight: 600; color: var(--rv-accent-ink); cursor: pointer; padding: 6px 0; }
  .uso-last ul { list-style: none; margin: 0; padding: 0; }
  .uso-last li { display: flex; flex-wrap: wrap; gap: 2px 10px; align-items: baseline; font-size: 13px; padding: 7px 0; border-top: 1px solid var(--rv-line); color: var(--rv-muted); }
  .uso-last li b { color: var(--rv-text); font-weight: 600; }
  .uso-last li .r-err { color: var(--rv-late); font-weight: 600; }
  .uso-last li .t { flex-basis: 100%; font-size: 12.5px; }
  .uso-note { font-size: 13px; line-height: 1.5; color: var(--rv-muted); margin: 0 0 10px; }
  .uso-note:last-child { margin-bottom: 16px; }
  .uso-note a { color: var(--rv-accent-ink); }
  .uso-note code { font-size: 12px; }
`;var _i=/[̀-ͯ]/g,Ys=r=>r.normalize("NFD").replace(_i,"").toLowerCase()||r.toLowerCase(),Ze=r=>[...String(r||"")].map(Ys).join("");function wi(r,{room:e=null,query:t=""}={}){let s=Ze(t).split(/\s+/).filter(Boolean),a=d=>Ze(`${d.nome} ${d.zona||""} ${d.roomName||""}`),i=d=>s.every(n=>a(d).includes(n)),o=d=>{if(!s.length)return 0;let n=Ze(d.nome);return n.startsWith(s[0])?0:n.includes(s[0])?1:2},c=r.filter(i).sort((d,n)=>o(d)-o(n)||d.nome.localeCompare(n.nome,"pt-BR"));return e?{inRoom:c.filter(d=>d.roomId===e),others:s.length?c.filter(d=>d.roomId!==e):[]}:{inRoom:[],others:s.length?c:[]}}function $i(r,e,t){let s=Ze(t).split(/\s+/).filter(Boolean)[0];if(!s)return e;let a=[...e],i=a.map(Ys),o=-1,c=-1;for(let d=0;d<a.length&&o<0;d++){let n="";for(let p=d;p<a.length;p++){if(n+=i[p],n===s){o=d,c=p+1;break}if(!s.startsWith(n))break}}return o<0?e:r`${a.slice(0,o).join("")}<mark>${a.slice(o,c).join("")}</mark>${a.slice(c).join("")}`}function Ge({lit:r,icon:e,items:t,room:s=null,roomName:a="",value:i=null,query:o="",more:c=!1,onQuery:d,onPick:n,onMore:p,onRemove:u,onAdd:g,adding:m=!1,autofocus:w=!1}){let{html:b,nothing:k}=r,I=(f,x)=>b`<div class="eq-sel">
      <span class="eq-ic">${e("package")}</span>
      <span class="eq-tx"><b>${f.nome}</b><small>${[f.zona,f.roomName].filter(Boolean).join(" \xB7 ")||"Sem c\xF4modo"}</small></span>
      <button type="button" class="icon-btn mini" aria-label="Tirar ${f.nome}" @click=${x}>${e("x")}</button>
    </div>`;if(Array.isArray(i)){let f=i.map($=>t.find(C=>C.id===$)).filter(Boolean),x=f.map($=>I($,()=>u($.id)));if(f.length&&!m)return b`<div class="eq-pick">${x}<button type="button" class="eq-more eq-add" @click=${()=>g()}>${e("plus")}Outro equipamento</button></div>`;let _=t.filter($=>!i.includes($.id));return b`<div class="eq-pick">${x}${S(_,f.length>0||w)}</div>`}let y=i?t.find(f=>f.id===i):null;if(y)return I(y,()=>n(null));return S(t,w);function S(f,x){let{inRoom:_,others:$}=wi(f,{room:s,query:o}),C=c?40:6,q=(P,G)=>b`<button type="button" class="eq-row" @click=${()=>n(P.id)}>
    <span class="eq-ic">${e("package")}</span>
    <span class="eq-tx"><b>${$i(b,P.nome,o)}</b>${[P.zona,G?P.roomName:""].filter(Boolean).length?b`<small>${[P.zona,G?P.roomName:""].filter(Boolean).join(" \xB7 ")}</small>`:k}</span>
  </button>`,N=_.slice(0,C),B=$.slice(0,Math.max(0,C-N.length)),z=_.length+$.length-N.length-B.length,E=k;return!o&&!s?E=b`<p class="eq-hint">Escolha o cômodo ou busque entre ${f.length} ${f.length===1?"equipamento":"equipamentos"}.</p>`:!o&&s&&!_.length?E=b`<p class="eq-hint">Nenhum equipamento em ${a}. Busque nos outros cômodos.</p>`:o&&!_.length&&!$.length&&(E=b`<p class="eq-hint">Nada com “${o}”.</p>`),b`<div class="eq-pick">
    <label class="eq-search">${e("search")}<input type="search" .value=${o} placeholder=${s?`Buscar em ${a}\u2026`:"Buscar equipamento\u2026"} aria-label="Buscar equipamento" ?autofocus=${x} @input=${P=>d(P.target.value)} /></label>
    ${N.length?b`<div class="eq-list">${N.map(P=>q(P,!1))}</div>`:k}
    ${B.length?b`${s?b`<div class="eq-head">Em outros cômodos</div>`:k}<div class="eq-list">${B.map(P=>q(P,!0))}</div>`:k}
    ${z>0?b`<button type="button" class="eq-more" @click=${()=>p()}>Mostrar mais ${z}</button>`:k}
    ${E}
  </div>`}}var Ks=`
  .eq-pick { display: grid; gap: 8px; }
  .eq-search { display: flex; align-items: center; gap: 10px; padding: 0 14px; min-height: 48px; border-radius: 14px; border: 1.5px solid var(--rv-line-strong, var(--rv-line)); background: var(--rv-input-bg, transparent); color: var(--rv-muted); }
  .eq-search:focus-within { border-color: var(--rv-accent); color: var(--rv-accent-ink); }
  .eq-search .i { width: 18px; height: 18px; flex: none; }
  .eq-search input { flex: 1; min-width: 0; border: 0 !important; outline: 0; background: none !important; padding: 12px 0 !important; font: inherit; font-size: 16px; color: var(--rv-text); box-shadow: none !important; }
  .eq-search input::-webkit-search-cancel-button { filter: grayscale(1); }
  .eq-list { display: grid; border: 1px solid var(--rv-line); border-radius: 14px; overflow: hidden; }
  .eq-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 12px; text-align: left; border-top: 1px solid var(--rv-line); background: none; color: var(--rv-text); }
  .eq-row:first-child { border-top: 0; }
  .eq-row:active, .eq-row:hover { background: var(--rv-accent-soft); }
  .eq-ic { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; flex: none; background: color-mix(in srgb, var(--rv-muted) 14%, transparent); color: var(--rv-text-2, var(--rv-muted)); }
  .eq-ic .i { width: 18px; height: 18px; }
  .eq-tx { display: flex; flex-direction: column; min-width: 0; flex: 1; }
  .eq-tx b { font-weight: 600; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eq-tx small { font-size: 12.5px; color: var(--rv-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eq-tx mark { background: none; color: var(--rv-accent-ink); font-weight: 700; }
  .eq-head { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rv-muted); padding: 4px 2px 0; }
  .eq-more { justify-self: start; padding: 4px 2px; font-weight: 600; font-size: 14px; color: var(--rv-accent-ink); background: none; }
  .eq-hint { margin: 0; padding: 2px; font-size: 13px; color: var(--rv-muted); }
  .eq-sel { display: flex; align-items: center; gap: 12px; padding: 10px 6px 10px 12px; border-radius: 14px; border: 1.5px solid var(--rv-accent); background: var(--rv-accent-soft); }
  .eq-sel .eq-ic { background: var(--rv-accent); color: var(--rv-on-accent, #fff); }
  .eq-pick > .eq-pick { gap: 8px; }
  .eq-add { display: inline-flex; align-items: center; gap: 6px; }
  .eq-add .i { width: 16px; height: 16px; }
`;var St="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",yi="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function Xs(r,e=new Date){let t=r.filter(a=>a.id!=="grafite"),s=Math.floor(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/864e5);return t[(s%t.length+t.length)%t.length]}function Js({theme:r,onTheme:e,icon:t}){return l`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Autom\xE1tico","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,i])=>l`<button type="button" class=${r===s?"on":""} role="radio" aria-checked=${r===s?"true":"false"} @click=${()=>e(s)}>${t(i)}<span>${a}</span></button>`)}
  </div>`}function Qs({palette:r,value:e,onPick:t}){return l`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${r.map(s=>l`<button type="button" class="tsw ${e===s.id?"on":""}" role="radio" aria-checked=${e===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>t(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${St}></path><path class="sw-gap" d=${St}></path><path class="sw-fill" d=${St+yi}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var Zs=`
  .seg.themes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; margin: 2px 0 18px; }
  .seg.themes button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; height: auto; min-height: 66px; padding: 10px 4px 9px; font-size: 15px; }
  .seg.themes button .i { width: 22px; height: 22px; margin: 0; }
  .seg.themes button.on .i { color: var(--rv-accent-ink); }
  .tag-swatches { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px; margin: 0 -6px 14px; }
  .tsw { --sw-bg: var(--rv-surface); position: relative; display: grid; justify-items: center; gap: 4px; padding: 8px 2px 7px; border-radius: 10px; background: var(--sw-bg); cursor: pointer; -webkit-tap-highlight-color: transparent; min-width: 0; }
  @media (hover: hover) { .tsw:hover { --sw-bg: var(--rv-surface-2); } }
  .tsw svg { width: 48px; height: 36px; overflow: visible; }
  .tsw .sw-fill { fill: var(--a); fill-rule: evenodd; stroke: color-mix(in srgb, var(--a) 80%, #000); stroke-width: 1; }
  .tsw .sw-ring, .tsw .sw-gap, .tsw .sw-check { fill: none; stroke-linejoin: round; stroke-linecap: round; visibility: hidden; }
  .tsw .sw-ring { stroke: var(--rv-text); stroke-width: 7; }
  .tsw .sw-gap { stroke: var(--sw-bg); stroke-width: 3.6; }
  .tsw .sw-check { stroke: rgba(20, 20, 20, 0.85); stroke-width: 2.4; }
  .tsw span { font-size: 13px; line-height: 1.2; color: var(--rv-muted); white-space: nowrap; letter-spacing: -0.01em; }
  @media (max-width: 420px) { .tsw span { font-size: 12px; } .tag-swatches { margin: 0 -10px 14px; gap: 2px; } }
  .tsw.on .sw-ring, .tsw.on .sw-gap, .tsw.on .sw-check { visibility: visible; }
  .tsw.on span { color: var(--rv-text); font-weight: 600; }
  .tsw:focus-visible { outline: 2px solid var(--rv-accent); outline-offset: 0; }
`;var M={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},T=(r,e)=>((r||0)&e)===e,ue=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"framboesa",label:"Framboesa",fill:"#E8508A",ink:"#A3124F"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"grafite",label:"Grafite",fill:"#B9ADAE",ink:"#5E5253"}],Gs=["vermelho","coral","rosa","laranja","framboesa","ouro"],be=r=>ue.find(e=>e.id===r),ea=r=>be(Gs[r%Gs.length]);function tt(r,e){let t=r.replace("#",""),s=parseInt(t.length===3?t.replace(/./g,a=>a+a):t,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${e})`}function D(r,e,t="c"){return`--${t}:${r.fill};--${t}i:${e?r.fill:r.ink};--${t}s:${tt(r.fill,e?.17:.15)};`}var V=r=>(r||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),ta=r=>Array.from(r||"",e=>{if(e.length!==1)return e;let t=e.normalize("NFD")[0]||e;return t.toLowerCase().length===1?t.toLowerCase():e}).join(""),A=(r,e,t)=>`${r} ${r===1?e:t}`,sa=r=>String(r||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),O=(r,e=38)=>r.length>e?r.slice(0,e-1).trimEnd()+"\u2026":r;function aa(r,e){let t=r.states[e],s=t&&t.attributes&&t.attributes.friendly_name||e.split(".")[1].replace(/_/g," "),a=r.entities&&r.entities[e],i=a&&a.device_id&&r.devices?r.devices[a.device_id]:void 0,o=i?i.name_by_user||i.name:void 0,c=s,d=o||null;return o&&s.toLowerCase().startsWith(o.toLowerCase()+" ")&&(c=s.slice(o.length+1)),c=c.charAt(0).toUpperCase()+c.slice(1),{name:c,group:d}}var ki=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/\bpets?\b|cachorro|dog\b/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function Et(r){let e=V(r);for(let[t,s]of ki)if(t.test(e))return s;return"list-checks"}var ia=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],Ai=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],Mi=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],et=r=>String(r).padStart(2,"0"),he=r=>`${r.getFullYear()}-${et(r.getMonth()+1)}-${et(r.getDate())}`,Si=r=>`${et(r.getHours())}:${et(r.getMinutes())}`;function st(r){let[e,t,s]=r.split("-").map(Number);return new Date(e,t-1,s)}function Tt(r,e){let t=new Date(r.getFullYear(),r.getMonth(),r.getDate());return t.setDate(t.getDate()+e),t}function X(r){if(!r)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(r)){let t=st(r);return{date:r,time:null,at:new Date(t.getFullYear(),t.getMonth(),t.getDate(),23,59,59)}}let e=new Date(r);return isNaN(e)?null:{date:he(e),time:Si(e),at:e}}function Ct(r,e=new Date){let t=st(r),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return Math.round((t-s)/864e5)}function It(r,e=new Date){let t=st(r),s=`${t.getDate()} ${Mi[t.getMonth()]}`;return t.getFullYear()===e.getFullYear()?s:`${s} ${t.getFullYear()}`}function Y(r,e=new Date){let t=X(r);if(!t)return null;let s=Ct(t.date,e),a=t.at<e,i;s===0?i="Hoje":s===1?i="Amanh\xE3":s===-1?i="Ontem":s>1&&s<7?i=Ai[st(t.date).getDay()]:i=It(t.date,e),t.time&&(i+=`, ${t.time}`);let o=a?"late":s===0?"today":s<=2?"soon":"later";return{...t,diff:s,overdue:a,text:i,tone:o}}function ra(r=new Date){let e=r.getDay(),t=(6-e+7)%7||7,s=(1-e+7)%7||7,a=[{label:"Hoje",date:he(r)},{label:"Amanh\xE3",date:he(Tt(r,1))}];return t>1&&a.push({label:"S\xE1bado",date:he(Tt(r,t))}),s>1&&a.push({label:"Pr\xF3x. semana",date:he(Tt(r,s))}),a}function oa(r,e=new Date){let t=e.getHours(),s=t>=5&&t<12?"Bom dia":t>=12&&t<18?"Boa tarde":"Boa noite",a=(r||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var Ti=/\bhttps?:\/\/[^\s<>"'`]+/gi;function Ei(r){let e;try{e=new URL(r)}catch{return{label:r,icon:"link"}}let t=e.hostname.replace(/^www\./,""),s=e.pathname.split("/").filter(Boolean);if(t==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${t} \u203A ${a}`,icon:"link"}:{label:t,icon:"link"}}function na(r){let e=[],t=0,s=r||"";for(let a of s.matchAll(Ti)){let i=a[0],o=i.match(/[.,;:!?)\]}]+$/);o&&(i=i.slice(0,-o[0].length)),a.index>t&&e.push({text:s.slice(t,a.index)}),e.push({url:i,...Ei(i)}),t=a.index+i.length}return t<s.length&&e.push({text:s.slice(t)}),e}var Ci=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-](?!\d)|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,Ii=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function Ot(r){let e=(r||"").split(/\r?\n/).map(a=>a.replace(Ii,"").trim()).filter(Boolean);e.length===1&&/[,;]|\se\s/i.test(e[0])&&(e=e[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let t=new Set,s=[];for(let a of e){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(Ci,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let i=a.toLowerCase();t.has(i)||(t.add(i),s.push(a.slice(0,255)))}return s}async function qt(r,e=1800){let t=s=>new Promise((a,i)=>{let o=new FileReader;o.onload=()=>a(String(o.result).split(",")[1]||""),o.onerror=()=>i(o.error),o.readAsDataURL(s)});try{let s=await createImageBitmap(r,{imageOrientation:"from-image"}),a=Math.min(1,e/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),s.close&&s.close();let o=await new Promise(c=>i.toBlob(c,"image/jpeg",.86));return{mime:"image/jpeg",data:await t(o),url:URL.createObjectURL(o)}}catch{return{mime:r.type||"image/jpeg",data:await t(r),url:URL.createObjectURL(r)}}}var re=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,Oi=r=>r>1048576?`${(r/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(r/1024))} KB`,qi={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar"},la=r=>class extends r{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(e){let t=new Date(e),s=a=>String(a).padStart(2,"0");return`${s(t.getDate())}/${s(t.getMonth()+1)}/${t.getFullYear()} \xE0s ${s(t.getHours())}:${s(t.getMinutes())}`}async _loadBackups(){let e=this._data();if(e){try{this._backups=await e.backups()}catch(t){this._backups={available:!1,error:t.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let e=await this._data().createBackup();this._showToast(`Backup salvo em ${e.folder}/${e.name}`),this._haptic("success"),await this._loadBackups()}catch(e){this._showToast(`N\xE3o consegui criar o backup. ${e.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(e,t){let s=this._data();(!s||!s.url(e))&&(t.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(e,t){let s=e.added||e.added===0?`${t}: ${e.added?A(e.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${A(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${t}: ${A(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return e.missing&&e.missing.length&&(s+=`. ${e.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${e.missing.join(", ")}`),e.unsupported&&(s+=`. ${A(e.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),e.failed&&(s+=`. ${A(e.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let e=this.renderRoot.querySelector("#rv-data-import");e&&(e.value="",e.click())}_onDataImport(e){let t=e.target.files&&e.target.files[0];e.target.value="",t&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${O(t.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(t);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(e){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(e.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let t=await this._data().restoreBackup(e.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(t,"Backup restaurado"))}catch(t){this._showToast(t.message)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let e=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:e})}catch(e){this._sheet==="versions"&&(this._form={...this._form,error:e.message})}}_confirmRestoreVersion(e){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(e.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(e.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(t){this._showToast(t.message)}}})}_renderVersions(){let e=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${re("x")}</button>
        </div>
        ${e.error?l`<div class="imp-error">${re("circle-alert")}<span>${e.error}</span></div>`:e.list==null?l`<div class="imp-loading"><span class="spin">${re("loader-circle")}</span><span>Carregando…</span></div>`:e.list.length?l`<div class="data-list">
                  ${e.list.map(t=>l`<div class="data-item">
                      <div><b>${this._dateTime(t.when)}</b><span>${A(t.lists,"lista personalizada","listas personalizadas")} · ${A(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${qi[t.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(t)}>Restaurar</button>
                    </div>`)}
                </div>`:l`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let e=this._data();if(!e)return h;let t=this._backups,s=(a,i,o,c)=>l`<li>
        <div class="ot"><b>${i}</b><span>${o}</span></div>
        <a class="btn outline sm" href=${e.url(a)||"#"} download @click=${d=>this._exportData(a,d)}>${re("download")}${c}</a>
      </li>`;return l`<div id="dados">
        <div class="panel">
          ${this._secHead("download","Exportar")}
          <ul class="opts">
            ${s("csv","Planilha (CSV)","Abre no Excel e no Google Planilhas, com um item por linha.","Baixar CSV")}
            ${s("json","Dados completos (JSON)","Todos os campos, para backup ou para outro sistema.","Baixar JSON")}
            ${s("zip","Tudo (ZIP)","Todas as listas com os itens (prazo, notas e conclu\xEDdos), a planilha e os ajustes do app num arquivo s\xF3.","Baixar ZIP")}
          </ul>
        </div>
        <div class="panel">
          ${this._secHead("archive","Backup na pasta share",l`Cópia completa em <code>share/resolvia</code>.`)}
          <div class="btn-row sec-actions">
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||t&&t.available===!1} @click=${()=>this._createBackup()}>${re("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${t&&t.available===!1?l`<p class="data-note">A pasta share não está disponível para o app.</p>`:h}
          ${t&&t.backups&&t.backups.length?l`<div class="data-list">
                ${t.backups.slice(0,8).map(a=>l`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${Oi(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${re("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:h}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Um .zip ou .json exportado pelo ResolvIA, sem duplicar.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${re("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","Uma c\xF3pia dos ajustes e das repeti\xE7\xF5es a cada 10 minutos de uso e antes de importar ou restaurar. Ficam as 3 mais recentes.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${re("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",l`Os itens ficam nas listas do Home Assistant; os ajustes, em <code>/data/resolvia.json</code>.`)}
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var at=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,ca=[5,10,20,30,50],me=r=>String(r||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),da=r=>{let e=/\[cr:[0-9a-f]{8}\]/.exec(String(r||""));return e?e[0]:""},zi={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},pa=r=>class extends r{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let e=this._pts;return!!(e&&e.on&&e.placar&&e.placar.ativo)}_rawPoints(e,t){let s=this._pts&&this._pts.points&&this._pts.points[e];return s&&s[sa(t)]||0}_mirrored(e,t){let s=this._pts&&this._pts.espelho&&this._pts.espelho[e];return t&&s&&s[t]||null}_pointsOf(e,t,s=null){let a=this._mirrored(e,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(e,t):0}async _setTaskPoints(e,t,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:e,summary:t,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(`N\xE3o consegui salvar os pontos: ${i.message}`)}}async _setPointsOn(e){await this._saveAppPrefs({points_on:e?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(e,t,s,a,i=null){let o;try{o=await this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!0,...i?{quem:i}:{}})}catch(n){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${n.message}`,a);return}if(o&&o.ask){this._openSheet("who",{title:t.summary,points:o.points,participantes:o.participantes,run:n=>{this._closeSheet(!0),n?this._givePoints(e,t,s,a,n):this._showToast(s,a)}});return}if(!o||!o.points){this._showToast(s,a);return}let c=`Resolvido por ${o.who} \xB7 +${o.points}`,d=(o.participantes||[]).filter(n=>n!==o.who);if(d.length===1){let n=d[0];this._showToast(c,{label:`Foi ${n}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:o.key,quem:n}).then(()=>this._showToast(`Pontos para ${n}`)).catch(p=>this._showToast(p.message))})}else this._showToast(c,a)}_takePoints(e,t){!this._mirrored(e.id,t.uid)&&(!this._rawPoints(e.id,t.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!1}).catch(()=>{})}_renderPointsTag(e,t){let s=this._pointsOf(e,t.summary,t.uid);return s?l`<span class="tag pts" title="${s} pontos para quem concluir">${at("trophy")}+${s}</span>`:h}_renderPointsField(e){if(e.mirrored)return h;if(!(this._pts&&this._pts.on))return h;let t=this._pts.placar,s=e.points||0,a=e.pointsCustom||s>0&&!ca.includes(s);return l`<div class="field">
        <span class="flabel">Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>Sem pontos</button>
          ${ca.map(i=>l`<button class="pick ${s===i&&!a?"on":""}" @click=${()=>this._setForm({points:i,pointsCustom:!1})}>+${i}</button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${at("trophy")}<span>Outro</span></button>
        </div>
        ${a?l`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${i=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(i.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:h}
        ${s?l`<div class="field-hint">${at("trophy")}<span>${t&&t.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${t.participantes.join(" \xD7 ")}).`:t&&t.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA.":"O placar do CronologIA est\xE1 desligado."}</span></div>`:h}
      </div>`}_renderWhoSheet(){let e=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">Quem fez?</h3>
          <button class="icon-btn" @click=${()=>e.run("")} aria-label="Fechar">${at("x")}</button>
        </div>
        <p class="sheet-note top">${O(e.title||"",40)} · <b>+${e.points} pontos</b></p>
        <div class="who-grid">
          ${(e.participantes||[]).map(t=>l`<button class="who-btn" @click=${()=>e.run(t)}><span class="who-av">${(t||"?").trim().charAt(0).toUpperCase()}</span><b>${t}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>e.run("")}>Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let e=this._pts;if(!e)return h;let t=e.placar,s=!!e.on,a=Object.values(e.points||{}).reduce((c,d)=>c+Object.keys(d).length,0),i=l`<div class="row switch-row">
          <div class="grow">
            <div class="label">Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${A(a,"tarefa vale","tarefas valem")} pontos.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D.":"Desligado."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${c=>this._setPointsOn(c.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return l`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
          ${i}
        </div>`;let o=t?t.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${t.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Configura\xE7\xF5es \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:t.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${t.versao}`.trim(),text:`${t.participantes.join(" \xD7 ")} \xB7 fecha ${zi[t.periodo]||"toda semana"}. ${t.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${t.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${t.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return l`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
        ${i}
        <div class="ai-state ${o.tone}" style="margin-bottom:16px"><span class="dot"></span><div><b>${o.title}</b><span>${o.text}</span></div></div>
      </div>`}};var fe=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,Pi=864e5,ha=5,Ri=2;function zt(r){return r<14?A(r,"dia","dias"):r<60?A(Math.floor(r/7),"semana","semanas"):r<730?A(Math.floor(r/30),"m\xEAs","meses"):A(Math.floor(r/365),"ano","anos")}var ua=r=>r.icon==="shopping-cart",ma=r=>class extends r{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let e=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=e.ages||{},this._aiAsking||(this._aiPick=e.ai||null),this._aiBusy=!!e.busy||!!this._aiAsking,clearTimeout(this._aiPoll),e.busy&&!this._aiAsking&&(this._aiPoll=setTimeout(()=>this._loadSuggest(),3e3))}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(e,t,s=new Date){if(this._sinceDate(e,t))return Math.max(0,-Ct(X(t.due).date,s));let a=this._ages&&this._ages[e.id]&&t.uid?this._ages[e.id][t.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/Pi)):null}_sinceDate(e,t){return!e.canDue&&!!t.due&&!!X(t.due)}_suggestLists(){return this._visible().filter(e=>!e.unavailable&&e.items&&T(e.features,M.UPDATE))}_suggestions(e=new Set){let t=new Date,s=[],a=[],i=0,o=0;for(let n of this._suggestLists()){let p=n.items.filter(u=>u.status!=="completed");if(p.length){if(i+=p.length,o++,ua(n)){let u=p.map(g=>this._ageOf(n,g,t)).filter(g=>g!=null);a.push({l:n,n:p.length,oldest:u.length?Math.max(...u):null});continue}p.forEach((u,g)=>{if(e.has(u))return;let m=[],w=0,b=this._ageOf(n,u,t);b!=null&&b>=3&&(w+=Math.min(b,60)/3,m.push(this._sinceDate(n,u)?`Assim h\xE1 ${zt(b)}`:`Na lista h\xE1 ${zt(b)}`)),p.length===1?(w+=8,m.push("\xC9 o \xFAltimo da lista")):p.length===2&&(w+=4,m.push("Faltam 2 para zerar a lista"));let k=this._pointsOf(n.id,u.summary,u.uid);k&&(w+=3+Math.min(k,50)/10),this._ruleFor(n.id,u)&&(w+=4,m.push("Voltou para fazer"));let I=n.canDue&&u.due?Y(u.due,t):null;if(I&&I.diff<=0){w+=I.diff<0?6:5;let y=this._mirrored(n.id,u.uid);m.push(y?`${y.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${I.diff<0?"atrasada":"para hoje"}`:I.diff<0?"A data j\xE1 passou":"Tem data para hoje")}g===0&&(w+=1.5),m.length||m.push(k?"Vale pontos":g===0?"Primeiro da lista":`${g+1}\xBA da lista`),s.push({l:n,i:u,idx:g,score:w,why:m.join(" \xB7 ")})})}}s.sort((n,p)=>p.score-n.score||n.idx-p.idx);let c=[],d=new Map;for(let n of s){if(n.score<=0)continue;let p=d.get(n.l.id)||0;if(!(p>=Ri)&&(d.set(n.l.id,p+1),c.push(n),c.length>=ha))break}for(let n of s){if(c.length>=ha)break;c.includes(n)||c.push(n)}return a.sort((n,p)=>p.n-n.n),{top:c,shopping:a,pending:i,lists:o}}async _askAi(){if(this._aiBusy)return;let e=new Date,t=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let i=this._ruleFor(s.id,a);t.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,e),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:i?i.days:0,compras:ua(s),comodo:this._roomIdsOf(s.id,a.summary).map(o=>this._roomName(o)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(s.id,a.summary).map(o=>(this._equipOf(o)||{}).nome).filter(Boolean).join(", "),externo:(o=>o===!0?"sim":o||"")(this._externalOf(s.id,a.summary))})}if(t.length){this._aiBusy=!0,this._aiAsking=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:t.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiAsking=!1,this._aiBusy=!1,this.requestUpdate()}}async _clearAi(){this._aiPick=null,this._aiErr=null,this.requestUpdate();try{await this.hass.callWS({type:"resolvia/ai/suggest/clear"})}catch{}}_aiRows(){let e=this._aiPick,t=[];for(let s of e&&e.picks||[]){let a=s.key.indexOf("|"),i=this._list(s.key.slice(0,a)),o=i&&i.items&&i.items.find(c=>c.uid===s.key.slice(a+1));i&&o&&!i.hidden&&(o.status!=="completed"||this._recent.has(o.uid))&&t.push({l:i,i:o,why:s.motivo||"Escolhido pela IA",ai:!0})}return t}_renderStart(e){let t=this._aiOn()&&!!this.hass.resolvia,s=t?this._aiInfo():null,a=t?this._aiPick:null,i=a?this._aiRows():[],o=i.length>0,c=o?i:e.top;if(!c.length&&!t)return h;let d=!!this._aiBusy;return l`<div class="panel items start ${o?"by-ai":""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${fe(o?"sparkles":"flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${c.length}</small></div>
        ${o?l`<p class="start-by">${fe("sparkles")}<span>Escolhidos pela IA.</span></p>`:h}
        ${K(c,n=>n.l.id+(n.i.uid||n.i.summary),n=>this._renderItem(n.l,n.i,{showList:!0,why:n.why,whyIcon:n.ai?"sparkles":null}))}
        ${a&&!o?l`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>`:h}
        ${t&&!s.ready&&s.reason?l`<p class="ai-note">${s.reason}</p>`:h}
        ${this._aiErr?l`<p class="ai-note err">${this._aiErr}</p>`:h}
        ${t?l`<div class="ai-actions start-acts">
              <button class="btn ${o?"outline":"primary"} sm ai-ask" ?disabled=${d||!s.ready} @click=${()=>this._askAi()}>
                ${fe(d?"loader-circle":"sparkles",d?"ai-spin":"")}${d?"Pensando\u2026":o?"Sugerir de novo":"Sugerir com IA"}
              </button>
              ${a&&!d?l`<button class="btn outline sm" @click=${()=>this._clearAi()}>${fe("rotate-ccw")}Voltar ao automático</button>`:h}
            </div>`:h}
      </div>`}_renderSuggest(){let e=this._dueSections(),t=this._suggestions(new Set(e.rows.map(i=>i.i))),s=[];t.pending&&s.push(`${A(t.pending,"pendente","pendentes")} em ${A(t.lists,"lista","listas")}`),e.late&&s.push(A(e.late,"atrasado","atrasados")),e.today&&s.push(`${e.today} para hoje`);let a=t.pending||e.comingN;return l`
        <section class="page">
          ${this._renderPageHead("Sugest\xF5es",{text:s.length?s.join(" \xB7 "):"Nada pendente",tone:e.late?"late":""})}
          ${a?l`
                ${e.soon}
                ${t.pending?this._renderStart(t):h}
                ${e.later}
                ${e.coming}
                ${t.shopping.length?l`<div class="panel">
                      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${fe("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${t.shopping.length}</small></div>
                      ${t.shopping.map(i=>l`<button class="list-card" style=${D(i.l.color,this._dark)} @click=${()=>this._go(`/lista/${i.l.id}`)}>
                          <span class="tile">${fe(i.l.icon)}</span>
                          <span class="lc-main">
                            <span class="lc-title">${i.l.name}</span>
                            <span class="lc-meta"><span>${i.oldest!=null&&i.oldest>=3?`O mais antigo est\xE1 h\xE1 ${zt(i.oldest)}`:A(i.n,"item para comprar","itens para comprar")}</span></span>
                          </span>
                          <span class="lc-num">${i.n}</span>
                        </button>`)}
                    </div>`:h}
              `:l`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${fe("lightbulb")}</div>
                  <h3>Nada para sugerir</h3>
                  <p>Todas as listas estão em dia. Quando aparecer algo pendente, as sugestões aparecem aqui.</p>
                </div>
              </div>`}
        </section>
      `}};var oe=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,it=r=>String(r||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),ge=r=>Array.isArray(r)?r:r?[r]:[],fa=(r,e)=>ge(r).join("|")===ge(e).join("|"),ga=r=>class extends r{async _loadRooms(e="resolvia/rooms/get"){if(!(!this.hass||!this.hass.resolvia)){try{this._rooms=await this.hass.callWS({type:e})}catch{this._rooms=this._rooms||null}this.requestUpdate()}}_roomsOn(){let e=this._rooms;return!!(e&&e.on&&e.comodos&&e.comodos.length)}_roomList(){return this._rooms&&this._rooms.comodos||[]}_equipsOn(){let e=this._rooms;return!!(e&&e.equips_on&&e.itens&&e.itens.length)}_equipList(){return this._rooms&&this._rooms.itens||[]}_equipOf(e){return e&&this._equipList().find(t=>t.id===e)||null}_equipIdsOf(e,t){if(!this._equipsOn())return[];let s=this._rooms.emap&&this._rooms.emap[e];return ge(s&&s[it(t)]).filter(a=>this._equipOf(a))}_equipIdOf(e,t){return this._equipIdsOf(e,t)[0]||null}_roomsOfEquips(e){let t=ge(e).map(s=>(this._equipOf(s)||{}).comodo).filter(s=>s&&this._roomList().some(a=>a.id===s));return[...new Set(t)]}async _setTaskEquip(e,t,s,a=null){if(this._equipsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/equips/set",entity_id:e,summary:t,equips:ge(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o equipamento")}}_renderEquipTag(e,t){let s=this._equipIdsOf(e,t.summary).map(a=>this._equipOf(a));return s.length?l`<span class="tag room" title=${s[0].nome}>${oe("package")}${O(s[0].nome,26)}</span>${s.length>1?l`<span class="tag room" title=${s.slice(1).map(a=>a.nome).join(", ")}>+${s.length-1}</span>`:h}`:h}_equipItems(){return this._equipList().map(e=>({id:e.id,nome:e.nome,zona:e.zona,roomId:e.comodo,roomName:this._roomName(e.comodo)||""}))}_renderEquipField(e){if(!this._equipsOn())return h;let t=e.equips||[],s=this._roomsOn()?t.length?this._roomsOfEquips(t)[0]||null:this._allRooms(this._pickedRooms(e))?null:e.room:null;return l`<div class="field">
        <span class="flabel">${t.length>1?"Equipamentos":"Equipamento"}</span>
        ${Ge({lit:{html:l,nothing:h},icon:oe,items:this._equipItems(),room:s,roomName:s&&this._roomName(s)||"",value:t,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:a=>this._setForm({equipQ:a,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:a=>this._setForm({equips:[...t,a],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:a=>{let i=t.filter(c=>c!==a),o=this._roomsOfEquips(t);this._setForm({equips:i,...!i.length&&this._roomsOn()?{room:o[0]||e.room||null,rooms:o.length?o:e.room?[e.room]:[]}:{}})}})}
      </div>`}_formRooms(e){if(!this._roomsOn())return[];let t=this._equipsOn()?e.equips||[]:[];return t.length?this._roomsOfEquips(t):this._pickedRooms(e)}_pickedRooms(e){return(Array.isArray(e.rooms)?e.rooms:e.room?[e.room]:[]).filter(s=>this._roomList().some(a=>a.id===s))}async _saveTaskPlace(e,t,s,a=null){let i=this._formRooms(s),o=this._equipsOn()?s.equips||[]:[];(!fa(i,s.roomsOrig||[])||a&&(s.roomsOrig||[]).length)&&await this._setTaskRoom(e,t,i,a),(!fa(o,s.equipsOrig||[])||a&&(s.equipsOrig||[]).length)&&await this._setTaskEquip(e,t,o,a)}_placeText(e,t,{rooms:s=!0,equips:a=!0}={}){let i=s?this._roomIdsOf(e,t).map(c=>this._roomName(c)):[],o=a?this._equipIdsOf(e,t).map(c=>this._equipOf(c)):[];return[...i,...o.flatMap(c=>[c.nome,c.zona||""])].filter(Boolean).join(" ")}_roomIdsOf(e,t){if(!this._roomsOn())return[];let s=this._rooms.map&&this._rooms.map[e];return ge(s&&s[it(t)]).filter(a=>this._roomList().some(i=>i.id===a))}_roomIdOf(e,t){return this._roomIdsOf(e,t)[0]||null}_roomName(e){let t=this._roomList().find(s=>s.id===e);return t?t.nome:null}_allRooms(e){let t=this._roomList();return t.length>1&&t.every(s=>(e||[]).includes(s.id))}async _setTaskRoom(e,t,s,a=null){if(this._roomsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/rooms/set",entity_id:e,summary:t,rooms:ge(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o c\xF4modo")}}_renderRoomTag(e,t){if(this._equipIdsOf(e,t.summary).length>1)return h;let s=this._roomIdsOf(e,t.summary);return this._allRooms(s)?l`<span class="tag room" title=${s.map(a=>this._roomName(a)).join(", ")}>${oe("house")}Todos os cômodos</span>`:s.length?l`${s.map(a=>l`<span class="tag room">${oe("door-open")}${O(this._roomName(a),22)}</span>`)}`:h}_renderRoomField(e){if(!this._roomsOn())return h;let t=this._equipsOn()&&(e.equips||[]).length>0,s=t?this._roomsOfEquips(e.equips):this._pickedRooms(e),a=c=>{let d=s.includes(c)?s.filter(n=>n!==c):[...s,c];this._setForm({rooms:d,room:d[0]||null})},i=this._roomList().map(c=>c.id),o=!t&&this._allRooms(s);return l`<div class="field">
        <span class="flabel">${s.length>1?"C\xF4modos":"C\xF4modo"}</span>
        <div class="chip-row grid ${t?"locked":""}">
          <button class="pick ${s.length?"":"on"}" ?disabled=${t} @click=${()=>this._setForm({room:null,rooms:[]})}>Nenhum</button>
          ${i.length>1?l`<button class="pick room all-rooms ${o?"on":""}" aria-pressed=${o?"true":"false"} ?disabled=${t} @click=${()=>this._setForm(o?{room:null,rooms:[]}:{rooms:i,room:i[0]})}>${oe("house")}<span>Todos</span></button>`:h}
          ${this._roomList().map(c=>l`<button class="pick room ${s.includes(c.id)?"on":""}" aria-pressed=${s.includes(c.id)?"true":"false"} ?disabled=${t} @click=${()=>a(c.id)}>${oe("door-open")}<span>${O(c.nome,22)}</span></button>`)}
        </div>
        ${t?l`<span class="field-hint">${oe("lock")}<span>Vem ${e.equips.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:h}
      </div>`}_renderRoomsPanel(){if(!this.hass.resolvia)return h;let e=this._rooms||{},t=this._app("rooms_on",!1)===!0,s=this._app("equips_on",!1)===!0,a=(e.comodos||[]).length,i=(e.itens||[]).length,o=(n,p,u,g)=>l`<div class="row switch-row">
        <div class="grow"><div class="label">${n}</div><div class="hint" style="white-space:normal">${p?u:"Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${p} @change=${m=>g(m.target.checked)} aria-label=${n} /><span class="track"></span></label>
      </div>`,c=h;if(t||s){let n=[t&&a?A(a,"c\xF4modo","c\xF4modos"):"",s&&i?A(i,"equipamento","equipamentos"):""].filter(Boolean).join(" \xB7 "),p=this._roomsBusy?"off":n?e.erro?"warn":"ok":"bad",u=this._roomsBusy?"Verificando\u2026":n||(e.encontrado?"Nada cadastrado":"InventarIA n\xE3o encontrado"),g=this._roomsBusy?"":e.erro||(n?t&&a?e.comodos.map(m=>m.nome).join(", "):"":e.encontrado?"Cadastre os c\xF4modos e os itens no InventarIA.":"Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");c=l`<div class="ai-state ${p}"><span class="dot"></span><div><b>${u}</b>${g?l`<span>${g}</span>`:h}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${()=>this._refreshRooms()}>${oe("rotate-ccw")}Verificar de novo</button></div>`}let d=this._aiOn()?", e a IA sugere qual":"";return l`<div class="panel" id="comodos">
        ${this._secHead("house","InventarIA","Para ligar uma tarefa a um c\xF4modo ou a um equipamento da casa.")}
        ${o("Usar c\xF4modos",t,`Cada tarefa pode ter um c\xF4modo${d}.`,n=>this._toggleRooms(n))}
        ${o("Usar equipamentos",s,`Cada tarefa pode ser de um equipamento ou m\xF3vel${d}.`,n=>this._toggleEquips(n))}
        ${c}
      </div>`}async _toggleEquips(e){await this._saveAppPrefs({equips_on:e?!0:null}),await this._refreshRooms()}async _toggleRooms(e){await this._saveAppPrefs({rooms_on:e?!0:null}),await this._refreshRooms()}async _refreshRooms(){this._roomsBusy=!0,this.requestUpdate(),await this._loadRooms("resolvia/rooms/refresh"),this._roomsBusy=!1,this.requestUpdate()}};function va({lit:r,icon:e,messages:t=[],draft:s="",busy:a=!1,error:i="",voice:o=null,examples:c=[],onDraft:d,onSend:n,onMic:p,onAction:u,onAll:g,onClear:m,onClose:w}){let{html:b,nothing:k}=r,I=()=>{let x=(s||"").trim();x&&!a&&n(x)},y=(x,_,$,C)=>b`<div class="chat-act ${$.state||"todo"}">
    <span class="chat-act-ic">${e($.state==="done"?"check":$.state==="failed"?"circle-alert":$.icon||"sparkles")}</span>
    <span class="chat-act-tx">${$.label}${$.note?b`<small>${$.note}</small>`:k}</span>
    ${$.state==="done"?b`<span class="chat-act-ok">Feito</span>`:$.state==="doing"?b`<span class="chat-act-ok">…</span>`:b`<button type="button" class="btn primary sm" @click=${()=>u(_,C)}>${$.state==="failed"?"Tentar de novo":"Fazer"}</button>`}
  </div>`,S=(x,_)=>{let $=(x.actions||[]).filter(C=>C.state!=="done"&&C.state!=="doing").length;return b`<div class="chat-msg ${x.role==="user"?"me":"ia"}">
      ${x.text?b`<div class="chat-bubble">${x.text}</div>`:k}
      ${(x.actions||[]).length?b`<div class="chat-acts">
            ${x.actions.map((C,q)=>y(x,_,C,q))}
            ${$>1?b`<button type="button" class="btn outline sm chat-all" @click=${()=>g(_)}>Fazer todas (${$})</button>`:k}
          </div>`:k}
    </div>`},f=o&&o.on;return b`<div class="chat">
    <div class="chat-head">
      <span class="chat-title">${e("message-circle")}Conversa</span>
      ${t.length?b`<button type="button" class="text-btn" @click=${()=>m()}>Nova</button>`:k}
      <button type="button" class="icon-btn" aria-label="Fechar" @click=${()=>w()}>${e("x")}</button>
    </div>
    <div class="chat-log">
      ${t.length?t.map(S):b`<div class="chat-empty">
            <p>Pergunte sobre esta tela ou sobre qualquer assunto. Se pedir para mudar algo, eu mostro antes de fazer.</p>
            ${c.length?b`<div class="chat-ex">${c.map(x=>b`<button type="button" class="pick" @click=${()=>n(x)}>${x}</button>`)}</div>`:k}
          </div>`}
      ${a?b`<div class="chat-msg ia"><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>`:k}
      ${i?b`<div class="chat-error">${e("circle-alert")}<span>${i}</span></div>`:k}
    </div>
    <form class="chat-input" @submit=${x=>(x.preventDefault(),I())}>
      <textarea rows="1" .value=${s} placeholder=${f?"Ouvindo\u2026":"Escreva aqui\u2026"} aria-label="Mensagem para a IA" ?disabled=${f}
        @input=${x=>d(x.target.value)}
        @keydown=${x=>{x.key==="Enter"&&!x.shiftKey&&!x.isComposing&&(x.preventDefault(),I())}}></textarea>
      ${o&&o.ready?b`<button type="button" class="icon-btn chat-mic ${f?"on":""}" aria-label=${f?"Pronto: enviar o que falei":"Falar"} ?disabled=${a||o.starting} @click=${()=>p()}>${e(f?"check":"mic")}</button>`:k}
      <button type="submit" class="icon-btn chat-send" aria-label="Enviar" ?disabled=${a||f||!(s||"").trim()}>${e("send")}</button>
    </form>
  </div>`}var xa=`
  .chat { display: flex; flex-direction: column; height: min(78vh, 680px); margin: -4px -4px 0; }
  .chat-head { display: flex; align-items: center; gap: 10px; padding: 0 0 10px; }
  .chat-title { display: inline-flex; align-items: center; gap: 8px; flex: 1; font-weight: 700; font-size: 18px; }
  .chat-title .i { width: 20px; height: 20px; color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-log { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding: 6px 2px 12px; overscroll-behavior: contain; }
  .chat-empty { margin: auto 0; color: var(--rv-muted); font-size: 15px; line-height: 1.45; }
  .chat-empty p { margin: 0 0 12px; }
  .chat-ex { display: flex; flex-wrap: wrap; gap: 8px; }
  .chat-ex .pick { font-size: 14px; padding: 8px 12px; min-height: 0; }
  .chat-msg { display: flex; flex-direction: column; gap: 6px; max-width: 88%; }
  .chat-msg.me { align-self: flex-end; align-items: flex-end; }
  .chat-msg.ia { align-self: flex-start; }
  .chat-bubble { padding: 10px 14px; border-radius: 18px; font-size: 15.5px; line-height: 1.42; white-space: pre-wrap; overflow-wrap: anywhere; }
  .chat-msg.me .chat-bubble { background: var(--rv-accent); color: var(--rv-on-accent, #fff); border-bottom-right-radius: 6px; }
  .chat-msg.ia .chat-bubble { background: color-mix(in srgb, var(--rv-muted) 14%, transparent); color: var(--rv-text); border-bottom-left-radius: 6px; }
  .chat-bubble.typing { display: inline-flex; gap: 5px; padding: 14px 16px; }
  .chat-bubble.typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--rv-muted); animation: chat-dot 1.2s infinite ease-in-out; }
  .chat-bubble.typing i:nth-child(2) { animation-delay: 0.15s; }
  .chat-bubble.typing i:nth-child(3) { animation-delay: 0.3s; }
  @keyframes chat-dot { 0%, 80%, 100% { opacity: 0.25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
  .chat-acts { display: grid; gap: 8px; width: 100%; min-width: min(300px, 80vw); }
  .chat-act { display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 10px; border-radius: 14px; border: 1.5px solid var(--rv-line); }
  .chat-act.done { opacity: 0.7; }
  .chat-act.failed { border-color: var(--rv-late, #e5484d); }
  .chat-act-ic { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; flex: none; background: var(--rv-accent-soft); color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-act-ic .i { width: 16px; height: 16px; }
  .chat-act-tx { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 14.5px; font-weight: 600; }
  .chat-act-tx small { font-weight: 400; font-size: 12.5px; color: var(--rv-muted); }
  .chat-act-ok { font-size: 13px; font-weight: 600; color: var(--rv-muted); padding: 0 8px; }
  .chat-act .btn.sm { min-height: 36px; padding: 0 14px; }
  .chat-all { justify-self: start; }
  .chat-error { display: flex; gap: 8px; align-items: flex-start; font-size: 14px; color: var(--rv-late, #e5484d); }
  .chat-error .i { width: 18px; height: 18px; flex: none; }
  .chat-input { display: flex; align-items: flex-end; gap: 8px; padding-top: 10px; border-top: 1px solid var(--rv-line); }
  .chat-input textarea { flex: 1; min-width: 0; resize: none; max-height: 120px; min-height: 46px; padding: 12px 14px; border-radius: 16px; border: 1.5px solid var(--rv-line-strong, var(--rv-line)); background: var(--rv-input-bg, transparent); color: var(--rv-text); font: inherit; font-size: 16px; line-height: 1.35; field-sizing: content; }
  .chat-input textarea:focus { outline: none; border-color: var(--rv-accent); }
  .chat-input .icon-btn { width: 46px; height: 46px; flex: none; border-radius: 14px; }
  .chat-send { background: var(--rv-accent); color: var(--rv-on-accent, #fff); }
  .chat-send:disabled { opacity: 0.4; }
  .chat-mic.on { background: var(--rv-late, #e5484d); color: #fff; }
`;var _e=class{constructor(e){this.onLevel=e,this.chunks=[],this.length=0,this.rate=16e3}async start(){let e=navigator.mediaDevices;if(!e||!e.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await e.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let t=window.AudioContext||window.webkitAudioContext;try{this.ctx=new t({sampleRate:16e3})}catch{this.ctx=new t}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let i=0;for(let o=0;o<a.length;o+=4)i+=a[o]*a[o];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(i/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let e=new Float32Array(this.length),t=0;for(let o of this.chunks)e.set(o,t),t+=o.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(e.length/s),i=new Int16Array(a);for(let o=0;o<a;o++){let c=Math.floor(o*s),d=Math.max(c+1,Math.min(e.length,Math.floor((o+1)*s))),n=0;for(let u=c;u<d;u++)n+=e[u];let p=Math.max(-1,Math.min(1,n/(d-c)));i[o]=p<0?p*32768:p*32767}return i}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let e of this.stream.getTracks())e.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function rt(r){let e=r&&r.name||"";return e==="NotAllowedError"||e==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":e==="NotFoundError"||e==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":e==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":e==="NoApi"?window.isSecureContext===!1?"O microfone aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), o celular e o navegador n\xE3o deixam usar o microfone, nem pelo app do Home Assistant.":"Este navegador n\xE3o deixa usar o microfone aqui.":`N\xE3o consegui abrir o microfone (${r&&r.message||e||"erro"}).`}var ba=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,_a=r=>r.status==="completed",wa="resolvia-conversa",$a=r=>class extends r{_chatState(){if(!this._chat){let e=[];try{e=JSON.parse(sessionStorage.getItem(wa)||"[]")}catch{}this._chat={messages:Array.isArray(e)?e:[],draft:"",busy:!1,error:"",rec:null}}return this._chat}_setChat(e){if(this._chat={...this._chatState(),...e},"messages"in e)try{sessionStorage.setItem(wa,JSON.stringify(this._chat.messages.slice(-30)))}catch{}this.requestUpdate()}_renderChatBtn(){return!this._aiOn()||!this.hass.resolvia?h:l`<button class="mic-top chat-top" aria-label="Conversar com a IA" title="Conversar com a IA" @click=${()=>this._openChat()}>${ba("message-circle")}</button>`}_openChat(){this._openSheet("chat",{}),this._chatScroll=!0,this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".chat-input textarea");e&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches&&e.focus()})}_renderChatSheet(){let e=this._chatState(),t=this._voice||{};return va({lit:{html:l,nothing:h},icon:ba,messages:e.messages,draft:e.draft,busy:e.busy,error:e.error,voice:{ready:!!t.ready&&this._micOk(),on:e.rec==="on",starting:e.rec==="starting"},examples:this._chatExamples(),onDraft:s=>this._setChat({draft:s}),onSend:s=>this._chatSend(s),onMic:()=>this._chatMic(),onAction:(s,a)=>this._chatDo(s,a),onAll:s=>this._chatDoAll(s),onClear:()=>this._setChat({messages:[],error:""}),onClose:()=>this._closeSheet()})}_micOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_chatExamples(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?[`O que \xE9 mais urgente em ${O(t.name,24)}?`,"Por onde eu come\xE7o hoje?"]:[]}return[...this._dueOn()?["O que est\xE1 atrasado?"]:[],"Por onde eu come\xE7o hoje?","Adiciona leite na lista de compras"]}_chatScreen(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?`a lista "${t.name}"`:"uma lista"}return e.name==="search"?this._query?`Buscar, procurando "${this._query}"`:"Buscar":e.name==="lists"?"Listas (todas as listas, com o que falta em cada uma)":e.name==="more"?"Mais (o menu: Listas, Gr\xE1ficos, Configura\xE7\xF5es e Sobre)":e.name==="sobre"?"Mais \u203A Sobre (CorrerIA Code, quem faz o app, os outros apps da fam\xEDlia e o GitHub)":e.name==="listas"?"Mais \u203A Listas (nome, cor, \xEDcone e quais listas aparecem)":e.name==="graficos"?`Mais \u203A Gr\xE1ficos (gr\xE1ficos das ${this._chartsLine().replace(/\.$/,"").toLowerCase()})`:e.name==="config"?"Mais \u203A Configura\xE7\xF5es (integra\xE7\xF5es, dados, apar\xEAncia e op\xE7\xF5es do app: prazos, exibi\xE7\xE3o, quem faz e repeti\xE7\xE3o)":this._dueOn()?"Sugest\xF5es, o in\xEDcio (o que est\xE1 atrasado, o que vence hoje e nos pr\xF3ximos dias e por onde come\xE7ar)":"Sugest\xF5es, o in\xEDcio (por onde come\xE7ar)"}_chatContext(){let e=this._view(),t=this._visible().slice(),s=e.name==="list"?this._list(e.id):null;s&&!t.includes(s)&&t.unshift(s),t.sort((i,o)=>+(o===s)-+(i===s));let a=new Date;return{tela:this._chatScreen(),listas:t.map(i=>{let o=(i.items||[]).filter(c=>!_a(c));return{id:i.id,nome:i.name,adicionar:T(i.features,M.CREATE)&&!i.unavailable,prazos:!i.noDue&&T(i.features,M.DUE_DATE),pendentes:o.length,itens:o.slice(0,i===s?120:40).map(c=>{let d=X(c.due),n=d?Y(c.due,a):null;return{texto:c.summary||"",prazo:d&&!i.noDue?d.date:null,atrasado:!!(n&&n.tone==="late"&&!i.noDue),pontos:this._pointsOf&&this._pointsOf(i.id,c.summary,c.uid)||0,comodo:this._roomIdsOf(i.id,c.summary).map(p=>this._roomName(p)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(i.id,c.summary).map(p=>(this._equipOf(p)||{}).nome).filter(Boolean).join(", "),externo:(p=>p===!0?"sim":p||"")(this._externalOf(i.id,c.summary))}})}})}}async _chatSend(e){let t=this._chatState();if(t.busy)return;let s=[...t.messages,{role:"user",text:e}];this._setChat({messages:s,draft:"",busy:!0,error:""}),this._chatScroll=!0;try{let a=await this.hass.callWS({type:"resolvia/ai/chat",messages:s.map(o=>({role:o.role,text:o.text||(o.actions||[]).map(c=>c.label).join("; ")})),context:this._chatContext()}),i=(a.actions||[]).map(o=>({...o,label:this._chatLabel(o),icon:o.tipo==="concluir"?"check":"plus",state:"todo"}));this._setChat({messages:[...this._chatState().messages,{role:"ia",text:a.reply||"",actions:i}],busy:!1})}catch(a){this._setChat({busy:!1,error:a.message||"A IA n\xE3o respondeu. Tente de novo."})}this._chatScroll=!0}_chatLabel(e){return e.tipo==="concluir"?`Concluir "${O(e.item,60)}" em ${O(e.nome,30)}`:`Adicionar "${O(e.item,60)}" em ${O(e.nome,30)}${e.prazo?` \xB7 prazo ${e.prazo.slice(8,10)}/${e.prazo.slice(5,7)}`:""}`}_setAction(e,t,s){let a=this._chatState().messages.map((i,o)=>o===e?{...i,actions:i.actions.map((c,d)=>d===t?{...c,...s}:c)}:i);this._setChat({messages:a})}async _chatDo(e,t){let s=((this._chatState().messages[e]||{}).actions||[])[t];if(!s||s.state==="done"||s.state==="doing")return;this._setAction(e,t,{state:"doing",note:""});let a=this._list(s.lista),i=!1,o="";if(!a)o="Lista n\xE3o encontrada.";else if(s.tipo==="adicionar")i=await this._addFull(a,{summary:s.item,description:"",date:s.prazo||null,time:null});else{let c=(a.items||[]).find(d=>!_a(d)&&V(d.summary)===V(s.item));c?(await this._toggle(a,c),i=!0):o="Esse item n\xE3o est\xE1 mais pendente."}this._setAction(e,t,{state:i?"done":"failed",note:i?"":o||"N\xE3o deu certo."})}async _chatDoAll(e){let t=(this._chatState().messages[e]||{}).actions||[];for(let s=0;s<t.length;s++)t[s].state!=="done"&&await this._chatDo(e,s)}async _chatMic(){let e=this._chatState();if(e.rec==="on"){let s=this._chatRec;if(this._chatRec=null,clearTimeout(this._chatRecTimer),!s)return this._setChat({rec:null});let a=s.stop();if(this._setChat({rec:null}),a.length<16e3*.4)return this._setChat({error:"N\xE3o ouvi nada. Toque no microfone e fale."});this._setChat({busy:!0,error:""});try{let i=await this.hass.resolvia.voiceText(a);this._setChat({busy:!1}),i&&i.text&&this._chatSend(i.text)}catch(i){this._setChat({busy:!1,error:i.message||"N\xE3o consegui transcrever."})}return}if(e.rec)return;let t=new _e(()=>{});this._chatRec=t,this._setChat({rec:"starting",error:""});try{await t.start()}catch(s){return t.cancel(),this._chatRec=null,this._setChat({rec:null,error:rt(s)})}if(this._chatRec!==t)return t.cancel();this._setChat({rec:"on"}),this._chatRecTimer=setTimeout(()=>this._chatState().rec==="on"&&this._chatMic(),120*1e3)}_chatStop(){clearTimeout(this._chatRecTimer),this._chatRec&&this._chatRec.cancel(),this._chatRec=null,this._chat&&this._chat.rec&&(this._chat={...this._chat,rec:null})}_chatAfterRender(){if(!this._chatScroll||this._sheet!=="chat")return;this._chatScroll=!1;let e=this.renderRoot.querySelector(".chat-log");e&&(e.scrollTop=e.scrollHeight)}};var Lt=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,we=r=>r===!0?!0:typeof r=="string"&&r.trim()?r.replace(/\s+/g," ").trim().slice(0,60):null,ya=r=>class extends r{async _loadExternal(){if(!(!this.hass||!this.hass.resolvia)){try{this._ext=(await this.hass.callWS({type:"resolvia/external/get"})).ext||{}}catch{this._ext=this._ext||{}}this.requestUpdate()}}_extOn(){return!this._app("ext_off",!1)}_externalRaw(e,t){let s=this._ext&&this._ext[e];return we(s&&s[it(t)])}_externalOf(e,t){return this._extOn()?this._externalRaw(e,t):null}_externalText(e,t){let s=this._externalOf(e,t);return s?s===!0?"Servi\xE7o externo":`Servi\xE7o externo ${s}`:""}async _setTaskExternal(e,t,s,a=null){if(!(!this.hass||!this.hass.resolvia))try{this._ext=(await this.hass.callWS({type:"resolvia/external/set",entity_id:e,summary:t,value:we(s),...a!=null?{previous_summary:a}:{}})).ext||{},this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar quem faz")}}async _saveTaskExternal(e,t,s,a=null){let i=we(s.ext),o=we(s.extOrig);(i!==o||a&&o)&&await this._setTaskExternal(e,t,i,a)}_renderExternalOption(e){let t=this._extOn();return l`<div class="panel" id="quem-faz">
        ${this._secHead("hard-hat","Quem faz")}
        <div class="row switch-row">
          <div class="grow"><div class="label">Serviços externos</div><div class="hint" style="white-space:normal">${t?"Quem faz em cada tarefa: voc\xEAs ou algu\xE9m de fora.":"Desligado."}</div></div>
          ${e(t,"Servi\xE7os externos",s=>this._saveAppPrefs({ext_off:s.target.checked?null:!0}))}
        </div>
      </div>`}_renderExternalTag(e,t){let s=this._externalOf(e,t.summary);return s?l`<span class="tag ext">${Lt("hard-hat")}${s===!0?"Servi\xE7o externo":O(s,26)}</span>`:h}_renderExternalField(e,t=M.DUE_DATE|M.DESCRIPTION){if(!this._extOn())return h;let s=we(e.ext);return!s&&!T(t,M.DUE_DATE)&&!T(t,M.DUE_DATETIME)&&!T(t,M.DESCRIPTION)?h:l`<div class="field">
        <span class="flabel">Quem faz</span>
        <div class="chip-row ext-row">
          <button class="pick ${s?"":"on"}" @click=${()=>this._setForm({ext:null})}>${Lt("house")}<span>Nós mesmos</span></button>
          <button class="pick ${s?"on":""}" @click=${()=>this._setForm({ext:s||!0})}>${Lt("hard-hat")}<span>Serviço externo</span></button>
        </div>
        ${s?l`<input type="text" class="ext-who" maxlength="60" .value=${s===!0?"":s} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
              @input=${a=>this._setForm({ext:we(a.target.value)||!0})} />`:h}
      </div>`}};var ot=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,Ma=6,ka=[{key:"late",label:"Atrasados",icon:"circle-alert"},{key:"today",label:"Hoje",icon:"clock"},{key:"week",label:"Pr\xF3ximos 7 dias",icon:"calendar-days"},{key:"later",label:"Mais adiante",icon:"calendar"},{key:"none",label:"Sem prazo",icon:"calendar-off"}],Li=r=>r.status==="completed";function nt(r){return r.map((e,t)=>[e,t]).filter(([e])=>e.n>0).sort((e,t)=>t[0].n-e[0].n||e[1]-t[1]).map(([e])=>e)}function Aa(r,e=!1,t=Ma){if(e||r.length<=t+1)return{shown:r,more:0,moreN:0};let s=r.slice(t);return{shown:r.slice(0,t),more:s.length,moreN:s.reduce((a,i)=>a+i.n,0)}}function Di(r,e=new Date){let t=Y(r,e);return t?t.overdue?"late":t.diff===0?"today":t.diff<7?"week":"later":"none"}var Dt=(r,e)=>r&&e?Math.max(1,Math.round(r/e*100)):0;function Hi({lists:r=[],due:e=!0,rooms:t=null,equips:s=null,roomsOf:a=()=>[],equipsOf:i=()=>[],extOf:o=()=>null,now:c=new Date}={}){let d=new Set((t||[]).map(_=>_.id)),n=new Map((s||[]).map(_=>[_.id,_])),p=new Map,u=new Map,g=new Map,m=Object.fromEntries(ka.map(_=>[_.key,0])),w=(_,$)=>_.set($,(_.get($)||0)+1),b=0,k=0,I=0,y=0,S=0,f=!1,x=r.map(_=>{let $=(_.items||[]).filter(N=>!Li(N)),C=_.items?$.length:Number(_.pending)||0;b+=C;let q=e&&!_.noDue;q&&$.length&&(f=!0);for(let N of $){let B=s?[...new Set(i(_.id,N.summary))].filter(E=>n.has(E)):[];if(s&&(B.length?B.forEach(E=>w(u,E)):I++),t){let E=new Set([...a(_.id,N.summary),...B.map(P=>n.get(P).comodo)].filter(P=>d.has(P)));E.size?E.forEach(P=>w(p,P)):k++}let z=o(_.id,N.summary);if(!z)y++;else if(S++,typeof z=="string"){let E=g.get(V(z))||{name:z,n:0};E.n++,g.set(V(z),E)}q&&m[Di(N.due,c)]++}return{id:_.id,name:_.name,color:_.color,icon:_.icon,n:C}});return{pending:b,lists:nt(x),rooms:t?{rows:nt(t.map(_=>({id:_.id,name:_.nome,n:p.get(_.id)||0}))),none:k}:null,equips:s?{rows:nt(s.map(_=>({id:_.id,name:_.nome,room:_.room||"",n:u.get(_.id)||0}))),none:I}:null,due:f?ka.map(_=>({..._,n:m[_.key]})).filter(_=>_.n):null,ext:S?{house:y,ext:S,who:nt([...g.values()])}:null}}var Ni=r=>r.length>1?`${r.slice(0,-1).join(", ")} e ${r[r.length-1]}`:r[0],Sa=r=>class extends r{_chartsLine(){return`Pend\xEAncias por ${Ni(["lista",this._roomsOn()&&"c\xF4modo",this._equipsOn()&&"equipamento",this._dueOn()&&"prazo"].filter(Boolean))}.`}_chartsData(e=new Date){let t=this._roomsOn();return Hi({lists:this._visible(),due:this._dueOn(),rooms:t?this._roomList():null,equips:this._equipsOn()?this._equipList().map(s=>({...s,room:t&&this._roomName(s.comodo)||""})):null,roomsOf:(s,a)=>this._roomIdsOf(s,a),equipsOf:(s,a)=>this._equipIdsOf(s,a),extOf:(s,a)=>this._externalOf(s,a),now:e})}_chartsSearch(e,t){this._haptic("light"),this._query=e,this._searchDone=!1,t==="rooms"&&(this._searchRooms=!0),t==="equips"&&(this._searchEquips=!0),t==="ext"&&(this._searchExt=!0),this._go("/buscar")}_chartsOpen(e){return!!(this._chartsFolds&&this._chartsFolds[e])}_chartsToggle(e){this._chartsFolds={...this._chartsFolds||{},[e]:!this._chartsOpen(e)},this.requestUpdate()}_gPanel(e,t,s,a){return l`<div class="panel g-panel" id="g-${e}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${ot(t)}</span><h2>${s}</h2></div>
        ${a}
      </div>`}_gSplit(e,t){return t.length<2?h:l`<div class="g-split" role="img" aria-label="${e}: ${t.map(s=>`${s.name} ${s.n}`).join(", ")}">
        ${t.map(s=>l`<i class=${s.cls||""} style="flex:${s.n} 1 0;${s.style||""}" title="${s.name}: ${s.n}"></i>`)}
      </div>`}_gRow({name:e,sub:t="",n:s,max:a,pct:i=null,tile:o="",cls:c="",style:d="",go:n=null,label:p=""}){let u=l`${o?l`<span class="g-tile">${ot(o)}</span>`:h}
        <span class="g-name"><b>${e}</b>${t?l`<small>${t}</small>`:h}</span>
        <span class="g-n">${s}</span>
        <span class="g-bar"><i style="width:${Dt(s,a)}%"></i></span>
        ${i!=null?l`<span class="g-pct">${i}%</span>`:h}`,g=`g-row ${o?"":"bare"} ${i!=null?"with-pct":""} ${c}`;return n?l`<button class=${g} style=${d} aria-label=${p||e} @click=${n}>${u}</button>`:l`<div class=${g} style=${d}>${u}</div>`}_gMore(e,t,s,a){if(t.length<=Ma+1)return h;let i=this._chartsOpen(e);return l`<button class="g-more ${i?"open":""}" aria-expanded=${i?"true":"false"} @click=${()=>this._chartsToggle(e)}>
        <span class="g-more-t">${i?"Ver menos":`+${A(s.more,a[0],a[1])}`}</span>${i?h:l`<span class="g-n">${s.moreN}</span>`}${ot("chevron-down","chev")}
      </button>`}_gLists(e){let t=Aa(e,this._chartsOpen("lists")),s=i=>D(i.color,this._dark),a=[...t.shown.map(i=>({name:i.name,n:i.n,style:s(i)})),...t.more?[{name:`+${A(t.more,"lista","listas")}`,n:t.moreN,cls:"k-rest"}]:[]];return this._gPanel("listas","list-checks","Por lista",l`${this._gSplit("Pendentes por lista",a)}
          ${t.shown.map(i=>this._gRow({name:i.name,n:i.n,max:e[0].n,tile:i.icon,style:s(i),go:()=>this._go(`/lista/${i.id}`),label:`${i.name}: ${A(i.n,"pendente","pendentes")}`}))}
          ${this._gMore("lists",e,t,["lista","listas"])}`)}_gPlaces(e,t,s,a,i){let[o,c,d]=i;if(!a.rows.length)return this._gPanel(e,t,s,l`<p class="panel-lead g-empty">${c}</p>`);let n=Aa(a.rows,this._chartsOpen(e));return this._gPanel(e,t,s,l`${n.shown.map(p=>this._gRow({name:p.name,sub:p.room||"",n:p.n,max:a.rows[0].n,go:()=>this._chartsSearch(p.name,e),label:`${p.name}: ${A(p.n,"pendente","pendentes")}`}))}
          ${this._gMore(e,a.rows,n,d)}
          ${a.none?l`<p class="g-foot">${o}: <b>${a.none}</b></p>`:h}`)}_gDue(e){let t=e.reduce((a,i)=>a+i.n,0),s=Math.max(...e.map(a=>a.n));return this._gPanel("prazos","calendar-clock","Por prazo",l`${this._gSplit("Pendentes por prazo",e.map(a=>({name:a.label,n:a.n,cls:`k-${a.key}`})))}
          ${e.map(a=>this._gRow({name:a.label,n:a.n,max:s,pct:Dt(a.n,t),tile:a.icon,cls:`k-${a.key}`,go:a.key==="none"?null:()=>this._go(""),label:`${a.label}: ${A(a.n,"pendente","pendentes")}`}))}`)}_gWho(e){let t=e.house+e.ext,s=e.who.length?e.who[0].name+(e.who.length>1?` +${e.who.length-1}`:""):"",a=[{key:"house",name:"N\xF3s mesmos",n:e.house,icon:"house"},{key:"ext",name:"Servi\xE7o externo",n:e.ext,icon:"hard-hat",sub:s,go:()=>this._chartsSearch("Servi\xE7o externo","ext")}].filter(i=>i.n);return this._gPanel("quem","hard-hat","Quem faz",l`${this._gSplit("Quem faz",a.map(i=>({name:i.name,n:i.n,cls:`k-${i.key}`})))}
          ${a.map(i=>this._gRow({name:i.name,sub:i.sub,n:i.n,max:Math.max(e.house,e.ext),pct:Dt(i.n,t),tile:i.icon,cls:`k-${i.key}`,go:i.go,label:`${i.name}: ${A(i.n,"pendente","pendentes")}`}))}`)}_renderCharts(){let e=this._chartsData(),t={text:e.pending?`${A(e.pending,"pendente","pendentes")} em ${A(e.lists.length,"lista","listas")}`:"Nada pendente"};return l`<section class="page">
        ${this._renderPageHead("Gr\xE1ficos",t,!0)}
        ${e.pending?l`<div class="g-grid">
              ${this._gLists(e.lists)}
              ${e.rooms?this._gPlaces("rooms","door-open","Por c\xF4modo",e.rooms,["Sem c\xF4modo","Nenhuma pend\xEAncia com c\xF4modo.",["c\xF4modo","c\xF4modos"]]):h}
              ${e.equips?this._gPlaces("equips","package","Por equipamento",e.equips,["Sem equipamento","Nenhuma pend\xEAncia com equipamento.",["equipamento","equipamentos"]]):h}
              ${e.due?this._gDue(e.due):h}
              ${e.ext?this._gWho(e.ext):h}
            </div>`:l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${ot("chart-bar")}</div>
                <h3>Tudo resolvido</h3>
                <p>Nenhum item pendente nas listas.</p>
              </div>
            </div>`}
      </section>`}},Ta=`
  .g-panel { padding-bottom: 12px; }
  .g-split { display: flex; gap: 2px; height: 12px; margin: 0 0 12px; }
  .g-split i { display: block; min-width: 4px; background: var(--c, var(--rv-accent)); }
  .g-split i:first-child { border-radius: 6px 0 0 6px; }
  .g-split i:last-child { border-radius: 0 6px 6px 0; }
  .g-split i:only-child { border-radius: 6px; }
  .g-row { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; grid-template-rows: auto auto; column-gap: 12px; row-gap: 7px; align-items: center;
    width: calc(100% + 16px); margin: 0 -8px; padding: 9px 8px; border-radius: 12px; text-align: left; color: var(--rv-text); }
  .g-row.bare { grid-template-columns: minmax(0, 1fr) auto; }
  .g-tile { grid-row: 1 / 3; width: 34px; height: 34px; border-radius: 11px; display: grid; place-items: center; background: var(--cs, var(--rv-surface-2)); color: var(--ci, var(--rv-text-2)); }
  .g-tile .i { width: 18px; height: 18px; }
  /* the word beside the name (the room of an equipment, who does it) shows whole or not at all: it wraps to a hidden line */
  .g-name { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 8px; min-width: 0; height: 20px; overflow: hidden; }
  .g-name b { flex: 0 1 auto; max-width: 100%; min-width: 0; font-size: 15.5px; font-weight: 600; line-height: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .g-name small { flex: none; font-size: 13px; line-height: 20px; color: var(--rv-muted); white-space: nowrap; }
  .g-n { font-family: var(--rv-display); font-size: 20px; font-weight: 600; line-height: 1; text-align: right; font-variant-numeric: tabular-nums; }
  .g-bar { grid-column: 2 / -1; height: 8px; border-radius: 4px; background: var(--rv-surface-2); overflow: hidden; }
  .g-row.bare .g-bar { grid-column: 1 / -1; }
  .g-row.with-pct .g-bar { grid-column: 2 / 3; }
  .g-row.bare.with-pct .g-bar { grid-column: 1 / 2; }
  .g-bar i { display: block; height: 100%; border-radius: 4px; background: var(--c, var(--rv-accent)); }
  .g-pct { font-size: 12.5px; line-height: 1; color: var(--rv-muted); text-align: right; font-variant-numeric: tabular-nums; }
  button.g-row:active { background: var(--rv-surface-2); }
  button.g-row:active .g-bar { background: var(--rv-surface); }
  .g-more { display: flex; align-items: center; gap: 10px; width: calc(100% + 16px); min-height: 44px; margin: 0 -8px; padding: 8px; border-radius: 12px; color: var(--rv-accent-ink); font-size: 14.5px; font-weight: 600; }
  .g-more-t { flex: 1; text-align: left; }
  .g-more .g-n { color: var(--rv-muted); font-size: 18px; }
  .g-more .chev { width: 18px; height: 18px; color: var(--rv-muted); transition: transform 0.2s; }
  .g-more.open .chev { transform: rotate(180deg); }
  .g-more:active { background: var(--rv-surface-2); }
  .g-foot { margin: 4px 0 6px; font-size: 13.5px; color: var(--rv-muted); }
  .g-foot b { color: var(--rv-text); font-weight: 600; font-variant-numeric: tabular-nums; }
  .g-empty { margin: 0 0 8px; }
  /* the colors of Prazos (late red, today amber), then greys going quiet; never the accent (the Cor do dia can be red) */
  :host { --g-today: #f59e0b; --g-week: #7b6d6e; --g-later: #ab9c9d; --g-none: #d9cbc8; }
  :host([dark]) { --g-today: var(--rv-today); --g-week: #a59798; --g-later: #7d7071; --g-none: #594d4e; }
  .k-rest { --c: var(--g-later); }
  .k-late { --c: var(--rv-late); --cs: var(--rv-late-soft); --ci: var(--rv-late); }
  .k-today { --c: var(--g-today); --cs: var(--rv-today-soft); --ci: var(--rv-today); }
  .k-week { --c: var(--g-week); }
  .k-later { --c: var(--g-later); }
  .k-none { --c: var(--g-none); --ci: var(--rv-muted); }
  .k-house { --c: var(--g-later); }
  .k-ext { --c: var(--rv-ext); --cs: var(--rv-ext-soft); --ci: var(--rv-ext); }
  @media (hover: hover) {
    button.g-row:hover, .g-more:hover { background: var(--rv-surface-2); }
    button.g-row:hover .g-bar { background: var(--rv-surface); }
  }
  @media (min-width: 1000px) {
    /* two columns, each chart whole in one of them (no holes under a short one) */
    .g-grid { column-count: 2; column-gap: 48px; }
    .g-grid > .g-panel { break-inside: avoid; display: flow-root; }
  }
`;var lt=r=>String(r).padStart(2,"0"),ct=r=>`${r.getFullYear()}-${r.getMonth()}-${r.getDate()}`;function Fi(r,e=new Date){let t=new Date(r&&r.em);if(!r||Number.isNaN(t.getTime()))return"";let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()-1),a=ct(t)===ct(e)?"hoje":ct(t)===ct(s)?"ontem":`em ${lt(t.getDate())}/${lt(t.getMonth()+1)}`;return`${r.cliente} usou ${a} \xE0s ${lt(t.getHours())}:${lt(t.getMinutes())}.`}var Ea=r=>class extends r{async _loadCorreria(){if(!(!this.hass||!this.hass.resolvia)){try{this._correria=await this.hass.callWS({type:"resolvia/correria/get"})}catch{this._correria=null}this.requestUpdate()}}async _setCorreria(e){this._haptic("light"),await this._saveAppPrefs({correria_on:e?!0:null}),await this._loadCorreria()}_renderCorreriaPanel(){if(!this.hass.resolvia)return h;let e=this._app("correria_on",!1)===!0,t=Fi(this._correria&&this._correria.ultimo);return l`<div class="panel" id="correria">
        ${this._secHead("zap","CorrerIA","O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini.")}
        <div class="row switch-row">
          <div class="grow"><div class="label">Usar com o CorrerIA</div><div class="hint" style="white-space:normal">${e?"Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas.":"Desligado."}</div></div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._setCorreria(s.target.checked)} aria-label="Usar com o CorrerIA" /><span class="track"></span></label>
        </div>
        ${e?l`<div class="ai-state ${t?"ok":""}" style="margin-bottom:16px"><span class="dot"></span><div>${t?l`<b>${t}</b>`:l`<b>Nenhum uso ainda</b><span>Conecte no app CorrerIA.</span>`}</div></div>`:h}
      </div>`}};var Ht="2.50.0",Ca="resolvia.theme",Nt="resolvia.prefs",dt="resolvia.lastList",v=(r,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${F(R[r]||R["list-checks"])}</svg>`,Z={get(r,e){try{let t=localStorage.getItem(r);return t==null?e:JSON.parse(t)}catch{return e}},set(r,e){try{localStorage.setItem(r,JSON.stringify(e))}catch{}}},j=r=>r.status==="completed",Ia=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],L=r=>r.uid||r.summary,qe=["listas","graficos","config","sobre"],$e="08:00",Ft=class extends Ea(Sa(ya($a(ga(ma(pa(la(ae)))))))){static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_alertPeople:{state:!0},_people:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_searchRooms:{state:!0},_searchEquips:{state:!0},_searchExt:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_sel:{state:!0},_rules:{state:!0},_cam:{state:!0},_rooms:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[Ds,As,J(Ws),J(Zs),J(Ks),J(xa),J(Ta)];constructor(){super(),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._searchRooms=!0,this._searchEquips=!0,this._searchExt=!0,this._theme=Z.get(Ca,"auto"),this._doneOpen={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),Ps(),this._today=new Date().toDateString(),this._dayTimer=setInterval(()=>{let e=new Date().toDateString();e!==this._today&&(this._today=e,this.requestUpdate())},6e4),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=e=>{if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey||this._sheet)return;let t=e.composedPath&&e.composedPath()[0]||e.target;t&&t.closest&&t.closest("input, textarea, select, [contenteditable]")||(e.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let e=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(e){this._focusSearch=!1,e.focus({preventScroll:!0});try{e.setSelectionRange(e.value.length,e.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._dayTimer),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,e]of this._subs)this._unsub(e);this._subs.clear();for(let[,e]of this._recent)clearTimeout(e);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(e=>e&&e()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this.hass||t.themes!==this.hass.themes||t.entities!==this.hass.entities||t.devices!==this.hass.devices||t.user!==this.hass.user||t.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(i=>i.startsWith("todo.")),a=Object.keys(t.states).filter(i=>i.startsWith("todo."));return s.length!==a.length?!0:s.some(i=>t.states[i]!==this.hass.states[i])}willUpdate(e){e.has("route")&&this.route&&(this._path=this.route.path||""),e.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints(),this._loadRooms(),this._loadExternal()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(e.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}updated(e){this.toggleAttribute("dark",this._dark),this._chatAfterRender();let t=this._view();if(t.old!=null&&e.has("_path")){this._go(t.old,!0,history.state&&history.state.rvUp?{rvUp:!0}:null);return}if(e.has("_path")&&t.name==="config"){let s=this.renderRoot.querySelector(".more-tabs"),a=s&&s.querySelector("button.on");if(a){let o=a.offsetLeft,c=o+a.offsetWidth;o<s.scrollLeft?s.scrollLeft=o-8:c>s.scrollLeft+s.clientWidth&&(s.scrollLeft=c-s.clientWidth+8)}let i=this._configTab();i==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadRooms(),this._loadExternal(),this._loadUsage(),this._loadCorreria()),i==="dados"&&this._loadBackups()}this._view().name==="search"&&(this._focusSearch||e.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="home"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}firstUpdated(){this._checkHeight();let e=Bt();e&&!this._inHA()&&this._go(e,e==="/prazos")}_checkHeight(){if(this.hasAttribute("vh"))return;let e=this.getBoundingClientRect().height;(e>window.innerHeight+4||e<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(e=>e.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let e=this._todoIds();for(let t of e)this._subs.has(t)||this._subscribe(t);for(let[t,s]of[...this._subs])if(!e.includes(t)){this._unsub(s),this._subs.delete(t),this._polling.delete(t);let a=new Map(this._items);a.delete(t),this._items=a}}_subscribe(e){let t=this.hass.connection.subscribeMessage(s=>this._setItems(e,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:e}).catch(()=>(this._polling.add(e),this._fetchItems(e),null));this._subs.set(e,t)}_unsub(e){Promise.resolve(e).then(t=>typeof t=="function"&&t()).catch(()=>{})}async _fetchItems(e){try{let t=await this.hass.callWS({type:"todo/item/list",entity_id:e});this._setItems(e,t&&t.items||[])}catch{this._setItems(e,this._items.get(e)||[])}}_refreshPolled(e){if(!(!e||!this._polling.size))for(let t of this._polling)e.states[t]!==this.hass.states[t]&&this._fetchItems(t)}_setItems(e,t){let s=new Map(this._items);s.set(e,t),this._items=s}_patchItem(e,t,s){let a=this._items.get(e);a&&this._setItems(e,a.map(i=>L(i)===t?{...i,...s}:i))}_computeLists(){let e=this._prefs&&this._prefs.lists||{},t=!this._dueOn(),a=this._todoIds().map(i=>{let o=this.hass.states[i],c=aa(this.hass,i);return{id:i,st:o,meta:c}});return a.sort((i,o)=>(i.meta.group||"").localeCompare(o.meta.group||"","pt-BR")||i.meta.name.localeCompare(o.meta.name,"pt-BR")),a.map(({id:i,st:o,meta:c},d)=>{let n=e[i]||{},p=this._items.get(i),u=p?p.filter(f=>!j(f)):null,g=u?u.length:Number(o.state)||0,m=p?p.length-u.length:0,w=be(n.color)||ea(d),b=o.attributes.supported_features||0,k=T(b,M.DUE_DATE)||T(b,M.DUE_DATETIME),I=!k||n.dates_info===!0,y=I||t,S=u&&!y?u.map(f=>Y(f.due)).filter(Boolean):[];return{id:i,name:n.name||c.name,origName:c.name,group:c.group,color:w,colorId:n.color||null,icon:n.icon||Et(`${c.name} ${c.group||""} ${i}`),iconPref:n.icon||null,hidden:!!n.hidden,owner:n.owner||null,features:b,canDue:k,datesInfo:I,noDue:y,hasDates:!!(p&&p.some(f=>f.due)),unavailable:o.state==="unavailable"||o.state==="unknown",items:p,pending:g,done:m,late:S.filter(f=>f.overdue).length,today:S.filter(f=>!f.overdue&&f.diff===0).length}})}_list(e){return this._L.find(t=>t.id===e)}_visible(){return this._L.filter(e=>!e.hidden)}_app(e,t){let s=this._prefs&&this._prefs.app?this._prefs.app[e]:void 0;return s===void 0?t:s}_accentDaily(){return this._app("accent_daily",!0)!==!1}_accent(){return this._accentDaily()?Xs(ue,new Date):be(this._app("accent","vermelho"))||ue[0]}async _loadPrefs(){try{let e=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:e.lists||{},app:e.app||{}},this._prefsRemote=!0}catch{this._prefs=Z.get(Nt,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(e,t){let s={...this._prefs.lists},a={...s[e]||{}};for(let[i,o]of Object.entries(t))o===null||o===""?delete a[i]:a[i]=o;if(Object.keys(a).length?s[e]=a:delete s[e],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let i=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:e,prefs:t});this._prefs={lists:i.lists||{},app:i.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else Z.set(Nt,this._prefs)}async _saveAppPrefs(e){let t={...this._prefs.app};for(let[s,a]of Object.entries(e))a===null||a===""?delete t[s]:t[s]=a;if(this._prefs={...this._prefs,app:t},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:e});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else Z.set(Nt,this._prefs)}_setTheme(e){this._theme=e,Z.set(Ca,e)}_inHA(){return!!this.route}_view(){let e=(this._path||"").replace(/\/+$/,""),t;if(t=e.match(/^\/lista\/(todo\.[^/]+)$/))return{name:"list",id:decodeURIComponent(t[1])};if(e==="/minhas-listas")return{name:"lists"};if(e==="/prazos"||e==="/sugestoes")return{name:"home",old:""};if(e==="/buscar")return{name:"search"};if(e==="/mais")return{name:"more"};if(e==="/listas")return{name:"listas"};if(e==="/graficos")return{name:"graficos"};if(e==="/sobre")return{name:"sobre"};if(t=e.match(/^\/config(?:\/(integracoes|dados|aparencia|opcoes))?$/))return{name:"config",tab:t[1]||"integracoes"};if(e==="/repeticoes")return{name:"config",tab:"opcoes",old:"/config/opcoes"};if(t=e.match(/^\/mais\/(repeticoes|integracoes|ia|dados|aparencia|opcoes)$/)){let s=t[1]==="ia"?"integracoes":t[1]==="repeticoes"?"opcoes":t[1];return{name:"config",tab:s,old:this._configPath(s)}}return{name:"home"}}_configPath(e){return e==="integracoes"?"/config":`/config/${e}`}_go(e,t=!1,s=null){this._sheet&&this._closeSheet(!0);let a=(history.state&&history.state.rvDepth||0)+(t?0:1),i={...s||{},rvDepth:a};if(this._inHA()){let c=`/${this.panel&&this.panel.url_path||"resolvia"}${e}`;t?history.replaceState(i,"",c):history.pushState(i,"",c),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:t}}))}else i.rvPath=e,t?history.replaceState(i,""):history.pushState(i,""),this._path=e;let o=this.renderRoot&&this.renderRoot.querySelector("main");o&&o.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_fromMenu(){return qe.includes(this._view().name)&&!!(history.state&&history.state.rvUp)}_toMenu(){this._fromMenu()?history.back():this._go("/mais",!0)}_openFromMenu(e){if(this._haptic("light"),e==="relatorio")return this._openReport();this._go(e,!1,{rvUp:!0})}_openReport(){let e=this.hass&&this.hass.resolvia;if(!e||!e.report)return this._showToast("Na pr\xE9via o relat\xF3rio n\xE3o abre. No app, ele abre pronto para imprimir.");let t=new URLSearchParams({tema:this._dark?"escuro":"claro",cor:this._accent().fill});location.href=e.report(t.toString())}_onSwipeStart(e){this._sw=this._sheet||this._cam?null:Rs(e)}_onSwipeEnd(e){let t=Ls(e,this._sw);if(this._sw=null,!t||this._sheet)return;let s=[["home",""],["search","/buscar"],["lists","/minhas-listas"],["more","/mais"]],a=this._view().name;if(a==="list"){if(t>0)return;this._haptic("light"),this._back(),Je(this,"lists",t);return}if(qe.includes(a)){if(t>0)return;this._haptic("light"),this._toMenu(),Je(this,"more",t);return}let i=s.findIndex(([c])=>c===a),o=i+t;i<0||o<0||o>=s.length||(this._haptic("light"),this._goTab(s[o][1]),Je(this,s[o][0],t))}_goTab(e){let t=this._view().name;if(qe.includes(t)){if(e==="/mais")return this._toMenu();if(this._fromMenu())return e===""?history.go(-2):(this._afterPop=e,history.back())}if(e===""){if(t==="home"){let a=this.renderRoot.querySelector("main");a&&a.scrollTo({top:0});return}let s=history.state&&history.state.rvDepth||0;s>0?(this._afterPop="",history.go(-s)):this._go("",!0);return}this._go(e,t!=="home"&&t!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"");let e=this._afterPop;this._afterPop=null,e!=null&&this._go(e,!0)}_openSheet(e,t=null){let s=!!this._sheet;if(this._sheet=e,this._form=t,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(e=!1){this._sheet&&(this._stopVoice(),this._chatStop(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(e?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/config"),this.updateComplete.then(()=>{let e=this.renderRoot.querySelector("#leitura-ia");e&&e.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(e){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(e);history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(e){if(this.env&&this.env.haptic)return this.env.haptic(e);window.dispatchEvent(new CustomEvent("haptic",{detail:e}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(e=>this._rules=e&&e.rules||[],{type:"resolvia/recurring/subscribe"}).then(e=>(this._rulesOk=!0,e)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let e=this._app("repeat_on",void 0);return e===void 0?this._rules.length>0:e===!0}_ruleFor(e,t){return!t||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===e&&s.uid&&s.uid===t.uid)||t.status!=="completed"&&this._rules.find(s=>s.entity_id===e&&!s.uid&&s.match===t.summary)||null}_everyLabel(e){return e===1?"todo dia":e===7?"toda semana":e===14?"a cada 2 semanas":e===30?"todo m\xEAs":`a cada ${e} dias`}_returnLabel(e){let t=new Date(e),s=Y(he(t));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(e,t=Date.now()){let s=new Date(t);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+e).getTime()}_setRule(e,{uid:t,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:e,uid:t||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(e,t=null){clearTimeout(this._toastTimer),this._toast={text:e,action:t,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,t?4500:Math.min(8e3,Math.max(2600,e.length*55)))}async _call(e,t,s){try{return await this.hass.callService("todo",e,t,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",e,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(e,t){if(!T(e.features,M.UPDATE))return;let s=L(t),a=!j(t),i=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(e.id,s,{status:i}),!await this._call("update_item",{item:s,status:i},e.id)){this._patchItem(e.id,s,{status:t.status});return}let c=this._pointsOf(e.id,t.summary,t.uid),d=this._mirrored(e.id,t.uid);if(a){let n=this._ruleFor(e.id,t),p=n?` \xB7 volta ${this._returnLabel(this._reopenAt(n.days))}`:"",u={label:"Desfazer",run:()=>{this._patchItem(e.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},e.id),(c||d)&&this._takePoints(e,t)}};c?this._givePoints(e,t,`Resolvido: ${O(t.summary,18)}`,u):this._showToast(`Resolvido: ${O(t.summary,n?22:30)}${p}${d?" \xB7 volta com a pr\xF3xima data":""}`,u)}else(c||d)&&this._takePoints(e,t)}_quickAdd(e,t){e.preventDefault();let s=e.currentTarget.querySelector("input");this._addLines(t,[s.value],s)}_onQuickPaste(e,t){let s=e.clipboardData&&e.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(e.preventDefault(),this._addLines(t,s.split(/\r?\n/),e.currentTarget))}async _addLines(e,t,s){let a=t.map(o=>o.trim()).filter(Boolean);if(!a.length)return;let i=s.value;s.value="",s.focus(),this._haptic("light");for(let o of a)if(!await this._call("add_item",{item:o},e.id)){s.value=i||o;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(e,t,s,a){let i=e.features;return t?s&&T(i,M.DUE_DATETIME)?{due_datetime:`${t} ${s}:00`}:T(i,M.DUE_DATE)?{due_date:t}:T(i,M.DUE_DATETIME)?{due_datetime:`${t} ${s||"09:00"}:00`}:{}:a?T(i,M.DUE_DATE)?{due_date:null}:T(i,M.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(e,{summary:t,description:s,date:a,time:i}){let o={item:t,...this._dueFields(e,a,i,!1)};return s&&T(e.features,M.DESCRIPTION)&&(o.description=s),this._call("add_item",o,e.id)}_openAdd(e){let t=this._visible().filter(i=>T(i.features,M.CREATE)&&!i.unavailable),s=Z.get(dt,null),a=e&&this._list(e)&&T(this._list(e).features,M.CREATE)&&e||t.find(i=>i.id===s)&&s||t[0]&&t[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1,room:null,equips:[],ext:null}),this.updateComplete.then(()=>{let i=this.renderRoot.querySelector(".sheet textarea");i&&i.focus()})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(e=!0){let t=this.hass&&this.hass.resolvia;if(!(!t||!t.aiStatus)&&!(!e&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await t.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(e){await this._saveAppPrefs({ai_entity:e||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let e=this._aiInfo();return js({u:this._usage,day:this._usageDay,onDay:t=>(this._usageDay=t,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","As chamadas do app para a IA. Os tokens s\xE3o estimados."),app:"ResolvIA",using:e.using&&e.using.id||"",names:Object.fromEntries((e.entities||[]).map(t=>[t.id,t.name]))})}_dueOn(){return!this._app("due_off",!1)}_notesOn(){return!this._app("notes_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(e){let t=a=>{let i=a&&this._list(a);return i&&T(i.features,M.CREATE)&&!i.unavailable?a:null},s=this._visible().filter(a=>T(a.features,M.CREATE)&&!a.unavailable);return t(e)||t(Z.get(dt,null))||s[0]&&s[0].id||null}_openImport(e,t="pick"){let s=this._importTarget(e);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:t==="text"?"text":t==="voice"?"voice":"pick",rec:t==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),t==="photos"&&this._pickFiles("photos"),t==="scan"&&this._openCamera(),t==="text"&&this._focusImportText(),t==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(e=!1){try{this._voice=await this.hass.resolvia.voiceStatus(e)}catch(t){this._voice={ready:!1,reason:t.message}}this.requestUpdate()}async _chooseVoice(e){await this._saveAppPrefs({voice_engine:e||null}),await this._loadVoice(!0),this._showToast("Fala para texto atualizada")}_renderVoicePanel(){let e=this._voice,t=this._app("voice_engine","")||"",s=e&&e.options||[],a=!e||this._voiceChecking,i=a?"off":e.ready&&!e.missing?"ok":e.ready?"warn":"bad",o=a?"Verificando\u2026":e.ready?"Pronto para ouvir":"Sem fala para texto",c=a?"":e.ready?`Transcreve com ${e.name}.${e.missing?" O escolhido n\xE3o foi encontrado: usando o autom\xE1tico.":""}`:e.reason||"",d=async()=>{this._voiceChecking=!0,this.requestUpdate(),await this._loadVoice(!0),this._voiceChecking=!1,this.requestUpdate()};return l`<div class="panel" id="falar">
      ${this._secHead("mic","Falar","Quem transforma a fala em texto. N\xE3o muda o assistente de voz do Home Assistant.")}
      <div class="ai-state ${i}"><span class="dot"></span><div><b>${o}</b>${c?l`<span>${c}</span>`:h}</div></div>
      ${s.length||t?l`<label class="field" style="margin:14px 0 0">
            <span class="flabel">Fala para texto</span>
            <select class="select" aria-label="Fala para texto" @change=${n=>this._chooseVoice(n.target.value)}>
              <option value="" ?selected=${!t}>Automático${e&&e.auto?`: ${e.auto.name}`:""}</option>
              ${s.map(n=>l`<option value=${n.id} ?selected=${n.id===t}>${n.name}</option>`)}
              ${t&&!s.some(n=>n.id===t)?l`<option value=${t} selected>${t} (não encontrado)</option>`:h}
            </select>
          </label>`:h}
      <div class="ai-actions"><button class="btn outline" ?disabled=${a} @click=${d}>${v("rotate-ccw")}Verificar de novo</button></div>
      ${e&&!e.ready?l`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>Com o Home Assistant Cloud, a fala para texto já vem pronta.</li>
              <li>Sem ele, instale um motor de fala: o app Whisper (local, de graça) com a integração Wyoming, ou a fala para texto de uma IA como Google Gemini ou OpenAI.</li>
              <li>Volte aqui, toque em Verificar de novo e escolha o motor na lista.</li>
            </ol>
          </div>`:h}
    </div>`}_renderMicBtn(e=null){return!this._aiOn()||!this._voice||!this._voice.ready?h:l`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(e,"voice")}>${v("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let e=new _e(t=>this._voiceLevel=t);this._rec=e;try{await e.start()}catch(t){e.cancel(),this._rec===e&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:rt(t)});return}if(this._rec!==e||!this._form||this._form.step!=="voice")return e.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==e)return clearInterval(this._recTimer);let t=e.seconds();this._setForm({secs:t,level:this._voiceLevel||0}),t>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let e=this._rec;if(!e)return;clearInterval(this._recTimer),this._rec=null;let t=e.stop();if(t.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(t);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(e){let t=this._form,s=this._voice||{},a=t.rec==="on",i=Math.floor((t.secs||0)/60),o=String(Math.floor((t.secs||0)%60)).padStart(2,"0"),c=this._list(t.target);return l`
      ${e("Falar")}
      <div class="voice ${a?"on":""}">
        <button class="voice-mic" style="--lvl:${a?(t.level||0).toFixed(2):0}" aria-label=${a?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>a?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${v(a?"check":"mic")}
        </button>
        <div class="voice-state">${a?l`<b>Ouvindo…</b> <span class="voice-time">${i}:${o}</span>`:t.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${a?"Toque de novo quando terminar.":l`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${c?l`<p class="voice-hint">Vai para <b>${c.name}</b> (dá para trocar na revisão).</p>`:h}
      </div>
      ${t.error?l`<div class="imp-error">${v("circle-alert")}<span>${t.error}</span></div>`:h}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" ?disabled=${!a} @click=${()=>this._finishVoice()}>${v("sparkles")}Pronto</button>
      </div>
      ${s.ready?h:l`<p class="sheet-note">${s.reason||""}</p>`}
    `}_focusImportText(){this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".sheet textarea");e&&e.focus()})}_pickFiles(e){let t=this.renderRoot.querySelector(e==="scan"?"#rv-scan":"#rv-photos");t&&(t.value="",t.click())}_releaseImages(){let e=this._form;if(e&&e.images)for(let t of e.images)t.url&&URL.revokeObjectURL(t.url)}_camOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(e){let t=[...e.target.files||[]].filter(i=>!i.type||i.type.startsWith("image/")).slice(0,6);if(e.target.value="",!t.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let s=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:s?"review":"pick"});let a=[];for(let i of t)a.push(await qt(i));this._readImages(a,s)}_readImages(e,t){if(this._sheet!=="import"||!e.length)return;let s=t?[...this._form.images||[],...e]:(this._releaseImages(),e);this._setForm({step:"loading",images:s,prevStep:t?"review":"pick",loadingText:e.length>1?`Lendo ${e.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:e,appending:t})}async _runExtract({text:e,images:t,appending:s=!1}){let a=this._importToken=Date.now(),i=this._list(this._form.target),o=()=>a===this._importToken&&this._sheet==="import",c=s?this._form.items||[]:[],d=(n,p=[],u=[],g=[])=>{let m=new Set(c.map(k=>k.text.trim().toLowerCase())),w=(k,I)=>I||k&&this._roomsOn()&&(this._equipOf(k)||{}).comodo||null,b=n.map((k,I)=>({text:k,on:!0,list:p[I]||null,room:w(g[I],u[I]),equip:g[I]||null})).filter(k=>!m.has(k.text.trim().toLowerCase()));return[...c,...b]};try{let n=await this.hass.resolvia.extract({text:e,images:t?t.map(({data:u,mime:g})=>({data:u,mime:g})):void 0,list_name:i?i.name:void 0,lists:this._importTargets().map(u=>({id:u.id,name:u.name}))});if(!o())return;let p=n.items||[];if(!p.length){let u=e?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:u}):this._setForm({step:e?"text":"pick",error:u});return}this._haptic("success"),this._setForm({step:"review",items:d(p,n.lists||[],n.rooms||[],n.equips||[]),provider:n.provider||null,note:null,error:null})}catch(n){if(!o())return;if(e){let p=Ot(e);if(p.length){this._setForm({step:"review",items:d(p),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:n.message||"Algo deu errado"}):this._setForm({step:e?"text":"pick",error:n.message||"Algo deu errado"})}}async _openCamera(){let e=navigator.mediaDevices,t=!!(this._form&&this._form.step==="review");if(!e||!e.getUserMedia){this._cam={status:"error",shots:[],appending:t,flash:0,error:window.isSecureContext===!1?"A c\xE2mera aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher.":"Este navegador n\xE3o deixa o app usar a c\xE2mera. Escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher."};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}return}this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:t,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let s=await e.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){s.getTracks().forEach(c=>c.stop());return}this._stream=s;let a=s.getVideoTracks()[0],i=a&&a.getCapabilities?a.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!i.torch},await this.updateComplete;let o=this.renderRoot.querySelector(".cam video");o&&(o.srcObject=s,o.play().catch(()=>{}))}catch(s){if(!this._cam)return;let a=s&&(s.name==="NotAllowedError"||s.name==="SecurityError");this._cam={...this._cam,status:"error",error:a?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(e=>e.stop()),this._stream=null}_closeCamera(e=!1){if(!this._cam)return;this._stopStream();let t=this._cam.shots||[];if(!this._cam.used)for(let s of t)URL.revokeObjectURL(s.url);this._cam=null,!e&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let e=this._stream&&this._stream.getVideoTracks()[0];if(!e)return;let t=!this._cam.torch;try{await e.applyConstraints({advanced:[{torch:t}]}),this._cam={...this._cam,torch:t}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let e=this.renderRoot.querySelector(".cam video");if(!e||!e.videoWidth||!this._cam||this._cam.shots.length>=6)return;let t=1800,s=Math.min(1,t/Math.max(e.videoWidth,e.videoHeight)),a=document.createElement("canvas");a.width=Math.round(e.videoWidth*s),a.height=Math.round(e.videoHeight*s),a.getContext("2d").drawImage(e,0,0,a.width,a.height);let i=await new Promise(c=>a.toBlob(c,"image/jpeg",.86));if(!i||!this._cam)return;let o=await qt(i,t);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,o],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let e=this._cam.shots,t=this._cam.appending;this._cam={...this._cam,used:!0},this._closeCamera(),this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(e,t&&this._form.step==="review")}_cameraFallback(){let e=this._cam&&this._cam.appending;this._closeCamera(),e&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let e=this._cam;if(!e)return h;let t=e.shots.length;return l`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${e.flash?l`<div class="cam-flash" .key=${e.flash}></div>`:h}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${v("x")}</button>
          <span class="cam-title">Digitalizar com IA</span>
          ${e.torchOk?l`<button class="cam-btn ${e.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${v("zap")}</button>`:l`<span class="cam-btn ghost"></span>`}
        </div>
        ${e.status==="error"?l`<div class="cam-msg">
              ${v("camera")}
              <p>${e.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${v("images")}Escolher foto</button>
            </div>`:l`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${e.status==="starting"?"Abrindo a c\xE2mera\u2026":t?`${A(t,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${e.shots.slice(-3).map(s=>l`<img src=${s.url} alt="" />`)}${t>3?l`<span>+${t-3}</span>`:h}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${e.status!=="live"||t>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!t} @click=${()=>this._useShots()}>Pronto${t?` (${t})`:""}</button>
        </div>
      </div>
    `}_readText(){let e=(this._form.text||"").trim();if(!e){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:e});return}let t=Ot(e);t.length?this._setForm({step:"review",items:t.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}_clipOk(){return!!(navigator.clipboard&&navigator.clipboard.readText)&&!this._clipFailed}async _pasteClipboard(){let e="";try{e=await navigator.clipboard.readText()}catch{this._clipFailed=!0,this._focusImportText(),this._showToast("Este aparelho n\xE3o deixa o app ler o que foi copiado. Toque e segure no campo e escolha Colar."),this.requestUpdate();return}if(!e){this._focusImportText(),this._showToast("N\xE3o h\xE1 nada copiado.");return}this._setForm({text:e,error:null})}_setImportItem(e,t){let s=this._form.items.slice();s[e]={...s[e],...t},this._setForm({items:s})}_importTargets(){let e=this._form||{};return this._L.filter(t=>T(t.features,M.CREATE)&&!t.unavailable&&(!t.hidden||t.id===e.target))}_importListOf(e){let t=this._importTargets();return e.list&&t.some(s=>s.id===e.list)&&e.list||this._form.target}async _importAdd(){let e=this._form,t=this._list(e.target),s=e.items.filter(c=>c.on&&c.text.trim()).map(c=>({...c,dest:this._importListOf(c)}));if(!t||!s.length)return;Z.set(dt,t.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0,i=new Set;for(let c of s)if(await this._call("add_item",{item:c.text.trim()},c.dest))a++,i.add(c.dest),c.room&&this._roomsOn()&&await this._setTaskRoom(c.dest,c.text.trim(),c.room==="*"?this._roomList().map(d=>d.id):c.room),c.equip&&this._equipsOn()&&await this._setTaskEquip(c.dest,c.text.trim(),c.equip);else break;if(!a)return;let o=i.size===1?this._list([...i][0]):null;this._showToast(`${A(a,"item adicionado","itens adicionados")} ${o?`em ${O(o.name,24)}`:`em ${i.size} listas`}`)}_openEdit(e,t){let s=X(t.due),a=this._ruleFor(e.id,t),i=a?a.days:0;this._openSheet("item",{mode:"edit",listId:e.id,key:L(t),target:e.id,summary:t.summary||"",description:me(t.description),hadNotes:!!me(t.description).trim(),mirrored:this._mirrored(e.id,t.uid),due:t.due||null,date:s?s.date:null,time:s?s.time:null,repeat:i,repeatOrig:i,repeatCustom:!!i&&!Ia.some(o=>o.days===i),points:this._rawPoints(e.id,t.summary),pointsOrig:this._rawPoints(e.id,t.summary),room:this._roomIdOf(e.id,t.summary),rooms:this._roomIdsOf(e.id,t.summary),roomsOrig:this._roomIdsOf(e.id,t.summary),equips:this._equipIdsOf(e.id,t.summary),equipsOrig:this._equipIdsOf(e.id,t.summary),ext:this._externalRaw(e.id,t.summary),extOrig:this._externalRaw(e.id,t.summary)}),this._loadPoints()}_setForm(e){this._form={...this._form,...e}}async _saveItem(){let e=this._form,t=(e.summary||"").trim();if(!t){let p=this.renderRoot.querySelector(".sheet textarea");p&&p.focus();return}let s=(e.description||"").trim(),a=this._list(e.target);if(e.mode==="add"){if(!a)return;Z.set(dt,a.id),this._closeSheet(),this._haptic("light");let p=await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time});p&&e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),p&&e.points&&await this._setTaskPoints(a.id,t,e.points),p&&await this._saveTaskPlace(a.id,t,e),p&&await this._saveTaskExternal(a.id,t,e),p&&this._view().id!==a.id&&this._showToast(`Adicionado em ${O(a.name,28)}`);return}let i=this._list(e.listId),o=i&&i.items&&i.items.find(p=>L(p)===e.key);if(!i||!o){this._closeSheet();return}if(a&&a.id!==i.id){this._closeSheet(),await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time})&&(e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),e.repeatOrig&&await this._setRule(i.id,{uid:o.uid,summary:o.summary,days:null}),e.points&&await this._setTaskPoints(a.id,t,e.points),e.pointsOrig&&await this._setTaskPoints(i.id,o.summary,0),await this._saveTaskPlace(a.id,t,{...e,roomsOrig:[],equipsOrig:[]}),(e.roomsOrig||[]).length&&await this._setTaskRoom(i.id,o.summary,null),(e.equipsOrig||[]).length&&await this._setTaskEquip(i.id,o.summary,null),await this._saveTaskExternal(a.id,t,{...e,extOrig:null}),e.extOrig&&await this._setTaskExternal(i.id,o.summary,null),await this._call("remove_item",{item:[e.key]},i.id),this._showToast(`Movido para ${O(a.name,28)}`));return}let c={item:e.key};if(t!==o.summary&&(c.rename=t),T(i.features,M.DESCRIPTION)&&s!==me(o.description)){let p=da(o.description);c.description=p?`${s}${s?" ":""}${p}`:s||null}let d=X(o.due);((d?d.date:null)!==(e.date||null)||(d?d.time:null)!==(e.time||null))&&Object.assign(c,this._dueFields(i,e.date,e.time,!0)),this._closeSheet(),((e.points||0)!==(e.pointsOrig||0)||e.pointsOrig&&t!==o.summary)&&await this._setTaskPoints(i.id,t,e.points||0,t!==o.summary?o.summary:null),await this._saveTaskPlace(i.id,t,e,t!==o.summary?o.summary:null),await this._saveTaskExternal(i.id,t,e,t!==o.summary?o.summary:null),(e.repeat||0)!==(e.repeatOrig||0)&&(await this._setRule(i.id,{uid:o.uid,summary:t,days:e.repeat}),e.repeat&&this._showToast(`Repete ${this._everyLabel(e.repeat)} depois de concluir`)),Object.keys(c).length>1&&(c.rename&&this._patchItem(i.id,e.key,{summary:t}),await this._call("update_item",c,i.id))}async _deleteItem(){let e=this._form,t=this._list(e.listId),s=t&&t.items&&t.items.find(o=>L(o)===e.key);if(this._closeSheet(),!t||!s)return;if(this._setItems(t.id,t.items.filter(o=>L(o)!==e.key)),this._haptic("warning"),!await this._call("remove_item",{item:[e.key]},t.id)){this._setItems(t.id,t.items);return}let i=X(s.due);this._showToast("Item exclu\xEDdo",T(t.features,M.CREATE)?{label:"Desfazer",run:()=>this._addFull(t,{summary:s.summary,description:s.description,date:i?i.date:null,time:i?i.time:null})}:null)}_confirmClearDone(e){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${A(e.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${e.done===1?"":"s"} de \u201C${e.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},e.id)&&this._showToast("Conclu\xEDdos apagados")}})}_openCustomize(e){this._openSheet("customize",{listId:e.id,name:e.name===e.origName?"":e.name,color:e.colorId,icon:e.iconPref,hidden:e.hidden,deadlines:!e.datesInfo,owner:e.owner||""}),this._people===void 0&&this._loadPeople()}async _loadPeople(){if(!this._peopleLoading){this._peopleLoading=!0;try{this._people=this._prefsRemote?await this.hass.callWS({type:"resolvia/people"}):[]}catch{this._people=[]}this._peopleLoading=!1,this.requestUpdate()}}async _saveCustomize(){let e=this._form,t=this._list(e.listId);this._closeSheet(),await this._saveListPrefs(e.listId,{name:(e.name||"").trim()||null,color:e.color||null,icon:e.icon||null,hidden:e.hidden?!0:null,dates_info:t&&t.canDue&&!e.deadlines?!0:null,owner:(e.owner||"").trim()||null})}_dragStart(e,t,s){if(e.pointerType==="mouse"&&e.button!==0)return;e.preventDefault();let a=e.currentTarget,i=a.closest(".item"),c=[...i.parentElement.querySelectorAll(":scope > .item[data-drag]")],d=c.indexOf(i);if(d<0)return;let n=this.renderRoot.querySelector("main"),p=c.map(S=>S.getBoundingClientRect()),u=n.scrollTop,g=p.map(S=>S.top+S.height/2+u),m=p[d].height,w={y:e.clientY,target:d,raf:0,lastY:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}i.classList.add("dragging"),c.forEach((S,f)=>f!==d&&S.classList.add("shifting")),this._haptic("selection");let b=()=>{let S=w.lastY-w.y+(n.scrollTop-u);i.style.transform=`translateY(${S}px)`;let f=g[d]+S,x=0;for(let _=0;_<c.length;_++)_!==d&&g[_]<f&&x++;x!==w.target&&(w.target=x,this._haptic("selection")),c.forEach((_,$)=>{if($===d)return;let C=0;d<x&&$>d&&$<=x&&(C=-m),x<d&&$>=x&&$<d&&(C=m),_.style.transform=C?`translateY(${C}px)`:""})},k=()=>{let S=n.getBoundingClientRect(),f=70,x=0;w.lastY<S.top+f?x=-Math.ceil((S.top+f-w.lastY)/6):w.lastY>S.bottom-f&&(x=Math.ceil((w.lastY-(S.bottom-f))/6)),x&&(n.scrollTop+=x,b()),w.raf=requestAnimationFrame(k)};w.raf=requestAnimationFrame(k);let I=S=>{w.lastY=S.clientY,b()},y=()=>{cancelAnimationFrame(w.raf),a.removeEventListener("pointermove",I),a.removeEventListener("pointerup",y),a.removeEventListener("pointercancel",y),c.forEach(S=>{S.classList.remove("shifting","dragging"),S.style.transform=""}),w.target!==d&&this._commitMove(t,s,c.map(S=>S.dataset.key),d,w.target)};a.addEventListener("pointermove",I),a.addEventListener("pointerup",y),a.addEventListener("pointercancel",y)}async _commitMove(e,t,s,a,i){let o=s.slice(),[c]=o.splice(a,1);o.splice(i,0,c);let d=i===0?void 0:o[i-1],n=e.items.slice(),p=n.findIndex(w=>L(w)===c),[u]=n.splice(p,1),g=d?n.findIndex(w=>L(w)===d):-1;n.splice(g+1,0,u),this._setItems(e.id,n);let m={type:"todo/item/move",entity_id:e.id,uid:c};d&&(m.previous_uid=d);try{await this.hass.callWS(m)}catch{this._setItems(e.id,e.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return h;let e=this._dark,t=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,i=a?a.color:t,o=`--rv-accent:${i.fill};--rv-accent-ink:${e?i.fill:i.ink};--rv-accent-soft:${tt(i.fill,e?.18:.14)};--rv-accent-ink-light:${i.ink};`,c;return s.name==="list"?c=this._renderList(s.id):s.name==="lists"?c=this._renderLists():s.name==="search"?c=this._renderSearch():s.name==="more"?c=this._renderMore():s.name==="listas"?c=this._renderMoreScreen("Listas",this._listsStatus(),this._renderListsTab()):s.name==="graficos"?c=this._renderCharts():s.name==="sobre"?c=this._renderMoreScreen("Sobre",null,ks({app:"ResolvIA",version:Ht})):s.name==="config"?c=this._renderConfig():c=this._renderSuggest(),l`
      <div class="root" style=${o}>
        <div class="app">
          ${!this.env||this.env.topbar?l`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${v("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:h}
          ${this.hass.connected===!1?l`<div class="offline">${v("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:h}
          ${this._renderSide(s)}
          <main @touchstart=${d=>this._onSwipeStart(d)} @touchend=${d=>this._onSwipeEnd(d)}>${c}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()?l`<input id="rv-photos" class="sr" type="file" accept="image/*" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${d=>this._onFiles(d)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${d=>this._onFiles(d)} />`:h}
      </div>
    `}_renderNav(e){let t=this._dueOn()?this._visible().reduce((i,o)=>i+o.late+o.today,0):0,s=e.name==="list"?"lists":qe.includes(e.name)?"more":e.name,a=(i,o,c,d,n=0)=>l`
      <button class="tab ${s===i?"on":""}" @click=${()=>this._goTab(o)} aria-label=${c}>
        ${v(d)}<span>${c}</span>
        ${n?l`<span class="badge">${n>99?"99+":n}</span>`:h}
      </button>
    `;return l`
      <nav>
        <div class="tabs">
          ${a("home","","Sugest\xF5es","lightbulb",t)} ${a("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(e.name==="list"?e.id:null)} aria-label="Adicionar item">
            <span class="pill">${v("plus")}</span><span>Adicionar</span>
          </button>
          ${a("lists","/minhas-listas","Listas","list-checks")} ${a("more","/mais","Mais","ellipsis")}
        </div>
      </nav>
    `}_renderSide(e){let t=this._byPending(this._visible()),s=this._dueOn()?t.reduce((o,c)=>o+c.late+c.today,0):0,a=qe.includes(e.name)?"more":e.name,i=(o,c,d,n,p=0,u="")=>l`<button class="side-link" aria-current=${a===o?"page":"false"} @click=${()=>this._goTab(c)}>
      ${v(n)}<span>${d}</span>${p?l`<span class="side-badge">${p>99?"99+":p}</span>`:h}${u?l`<kbd>${u}</kbd>`:h}
    </button>`;return l`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${At()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${i("home","","Sugest\xF5es","lightbulb",s)} ${i("search","/buscar","Buscar","search",0,"/")}
        ${i("lists","/minhas-listas","Listas","list-checks")} ${i("more","/mais","Mais","ellipsis")}
      </div>
      ${t.length?l`<div class="side-h"><span>Listas</span><small>${t.length}</small></div>
            <div class="side-lists">
              ${t.map(o=>l`<button class="side-list" aria-current=${e.name==="list"&&e.id===o.id?"page":"false"} style=${D(o.color,this._dark)} @click=${()=>this._go(`/lista/${o.id}`)}>
                  <span class="side-tile">${v(o.icon)}</span><span class="sl-name">${o.name}</span><span class="sl-num">${o.pending||""}</span>
                </button>`)}
            </div>`:h}
      <div class="side-foot">ResolvIA ${Ht}</div>
    </aside>`}_renderTopActs(){return l`<div class="top-acts">
      ${this._renderChatBtn()}${this._renderMicBtn()}
      ${this._canImport()?l`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${v("scan-text")}Ler com IA</button>`:h}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${v("plus")}Adicionar item</button>
    </div>`}_renderPageHead(e,t,s=!1){let a=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],o=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:t;return l`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${At()}Resolv<span>IA</span></span>${a?l`<span class="sep"> · </span>Olá, ${a}`:""}</p>${this._renderChatBtn()}${this._renderMicBtn()}${this._renderTopActs()}</div>
      ${s?l`<button class="uplink" @click=${()=>this._toMenu()}>${v("chevron-left")}Mais</button>`:h}
      <h1 class="page-title">${e}</h1>
      ${o?l`<p class="status"><span class="dot ${o.tone||""}" aria-hidden="true"></span><span>${o.text}</span></p>`:h}
    </header>`}_byPending(e){return[...e].sort((t,s)=>s.pending-t.pending)}_renderLists(){let e=this._byPending(this._visible()),t=e.reduce((n,p)=>n+p.pending,0),s=e.reduce((n,p)=>n+p.late,0),a=e.reduce((n,p)=>n+p.today,0),i=e.filter(n=>n.pending>0).length,o=[];t&&o.push(`em ${A(i,"lista","listas")}`),a&&o.push(`${a} pra hoje`),s&&o.push(`${A(s,"atrasado","atrasados")}`);let c=this._app("group_by_device",!0),d=[];if(c){for(let p of e){let u=p.group||"",g=d.find(m=>m.name===u);g||d.push(g={name:u,lists:[]}),g.lists.push(p)}let n=p=>p.lists.reduce((u,g)=>u+g.pending,0);d.sort((p,u)=>n(u)-n(p)||(p.name?1:0)-(u.name?1:0))}else d.push({name:null,lists:e});return l`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${A(e.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>l`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${oa(this.hass.user&&this.hass.user.name)}</div>
            ${t?l`<div class="hero-big">${t}<small>${t===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${o.join(" \xB7 ")}</div>`:l`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>
        ${this._L.length?this._renderHomeFacts(e):h}
        </div>

        ${this._L.length?this._renderHomeSearch():h}

        ${this._L.length===0?l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${v("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:l`
              <div class="groups ${d.length>1?"two":""}">
              ${d.map(n=>{let p=c?n.name||(d.length>1?"Listas locais":"Listas"):"Listas",u=c&&(n.name||d.length>1);return l`
                  <div class="panel grp">
                    <div class="grp-head ${u?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${v(n.name?"layout-list":"list-checks")}</span><h2 class="overline">${p}</h2><small>${n.lists.length}</small></div>
                    ${n.lists.map(g=>this._renderListCard(g,!c))}
                  </div>
                `})}
              </div>
            `}
        ${this.hass.user&&this.hass.user.is_admin?l`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${v("list-plus")}<span>Nova lista</span>
            </button>`:h}
      </section>
    `}_renderHomeSearch(){let e=this._visible().reduce((t,s)=>t+(s.items&&s.items.length||0),0);return l`<form class="search-box home-search" role="search" @submit=${t=>{t.preventDefault(),this._query=t.target.q.value.trim(),this._toSearch()}}>
      ${v("search")}
      <input type="search" name="q" placeholder=${e?`Buscar entre ${A(e,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${t=>{t.target.value.trim()&&(this._query=t.target.value,t.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(e,t){let s=e.pending+e.done,a=s?Math.round(e.done/s*100):0,i=[];return e.unavailable?i.push(l`<span>Indisponível</span>`):e.items?(i.push(l`<span>${e.pending?A(e.pending,"pendente","pendentes"):"Tudo resolvido"}${e.done?` \xB7 ${e.done} ${e.done===1?"feito":"feitos"}`:""}</span>`),e.late?i.push(l`<span class="tag late">${v("circle-alert")}${e.late}</span>`):e.today&&i.push(l`<span class="tag today">${v("clock")}${e.today} hoje</span>`)):i.push(l`<span>Carregando…</span>`),l`
      <button class="list-card ${e.unavailable?"off":""}" style=${D(e.color,this._dark)} @click=${()=>this._go(`/lista/${e.id}`)}>
        <span class="tile">${v(e.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${e.name}</span>
          <span class="lc-meta">${t&&e.group?l`<span>${e.group} ·</span>`:h}${i}</span>
          ${s?l`<span class="bar"><i style="width:${a}%"></i></span>`:h}
        </span>
        <span class="lc-num ${e.pending?"":"zero"}">${e.pending||v("circle-check")}</span>
      </button>
    `}_renderList(e){let t=this._list(e);if(!t)return l`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${v("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>Voltar para o início</button>
      </section>`;let s=T(t.features,M.CREATE)&&!t.unavailable,a=T(t.features,M.UPDATE),i=T(t.features,M.MOVE),o=T(t.features,M.DELETE),c=t.items,d=c?c.filter(m=>!j(m)||this._recent.has(L(m))):[],n=c?c.filter(m=>j(m)&&!this._recent.has(L(m))):[],p=c?c.length:0,u=this._doneOpen[e]!==void 0?this._doneOpen[e]:this._app("show_done",!1);return this._selOn(e)?this._renderSelecting(t,d.filter(m=>!j(m))):l`
      <section class="page" style=${D(t.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${v("chevron-left")}</button>
          <div class="dh-text">
            ${t.group?l`<div class="overline">${t.group}</div>`:h}
            <h1 class="display">${t.name}</h1>
          </div>
          ${this._renderChatBtn()}${this._renderMicBtn(t.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:t.id})} aria-label="Opções da lista">${v("ellipsis")}</button>
        </div>

        ${p?l`<div class="progress">
              <span>${t.done} de ${p} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(t.done/p*100)}%"></i></span>
            </div>`:h}
        ${s?l`<div class="quick">
              <form @submit=${m=>this._quickAdd(m,t)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${m=>this._onQuickPaste(m,t)} />
                ${this._canImport()?l`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(t.id)}>${v("scan-text")}</button>`:h}
                <button class="add-btn" type="submit" aria-label="Adicionar">${v("plus")}</button>
              </form>
            </div>`:h}
        ${t.unavailable?l`<div class="panel"><div class="empty"><div class="em-icon">${v("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:c?d.length?l`<div class="panel items">
                  ${K(d,L,m=>this._renderItem(t,m,{draggable:i&&a&&!j(m),selectable:o&&!j(m)}))}
                </div>`:l`<div class="panel">
                  <div class="empty">
                    ${p?l`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:l`<div class="em-icon">${v(t.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:l`<div class="panel">${[70,52,84].map(m=>l`<div class="skeleton" style="width:${m}%"></div>`)}</div>`}
        ${n.length?l`
              <div class="done-head">
                <button class="done-toggle ${u?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[e]:!u}} aria-expanded=${u?"true":"false"}>
                  Concluídos <span class="count">· ${n.length}</span>${v("chevron-down")}
                </button>
                ${o?l`<button class="text-btn" @click=${()=>this._confirmClearDone(t)}>Limpar</button>`:h}
              </div>
              ${u?l`<div class="panel items">${K(n,L,m=>this._renderItem(t,m))}</div>`:h}
            `:h}
        ${!a&&c&&c.length?l`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:h}
      </section>
    `}_selOn(e){return!!(this._sel&&this._sel.listId===e&&this._sel.path===this._path)}_startSelect(e,t=null){this._sel={listId:e.id,path:this._path,keys:new Set(t?[L(t)]:[])},this._haptic("light")}_toggleSel(e){let t=new Set(this._sel.keys),s=L(e);t.has(s)?t.delete(s):t.add(s),this._sel={...this._sel,keys:t}}_endSelect(){this._sel=null}_renderSelecting(e,t){let s=t.filter(i=>this._sel.keys.has(L(i))).length,a=s===t.length&&t.length>0;return l`
      <section class="page selecting-page" style=${D(e.color,this._dark)}>
        <div class="detail-head sel-head">
          <button class="icon-btn" @click=${()=>this._endSelect()} aria-label="Cancelar seleção">${v("x")}</button>
          <div class="dh-text">
            <div class="overline">${e.name}</div>
            <h1 class="display">${s?`${s} ${s===1?"selecionado":"selecionados"}`:"Selecionar"}</h1>
          </div>
          <button class="text-btn" @click=${()=>this._sel={...this._sel,keys:a?new Set:new Set(t.map(L))}}>${a?"Nenhum":"Todos"}</button>
        </div>
        <div class="panel items">${K(t,L,i=>this._renderItem(e,i,{selecting:!0,selected:this._sel.keys.has(L(i))}))}</div>
        <div class="sel-bar">
          <button class="btn primary" ?disabled=${!s} @click=${()=>this._openSheet("move",{listId:e.id})}>${v("arrow-right-left")}Mover para outra lista</button>
        </div>
      </section>
    `}_renderMoveSheet(){let e=this._list(this._form.listId);if(!e||!this._sel)return h;let t=this._sel.keys.size,s=this._L.filter(a=>a.id!==e.id&&T(a.features,M.CREATE)&&!a.unavailable&&!a.hidden);return l`
      <div class="sheet-head">
        <h3 class="display">Mover ${t} ${t===1?"item":"itens"} para</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${v("x")}</button>
      </div>
      ${s.length?l`<div class="chip-row grid">${s.map(a=>l`<button class="pick list" style=${D(a.color,this._dark)} @click=${()=>this._moveSelected(a.id)}><span class="dot"></span><span>${O(a.name,26)}</span></button>`)}</div>`:l`<p class="page-sub">Nenhuma outra lista aceita itens novos.</p>`}
    `}async _moveItem(e,t,s){let a=t.summary||"",i=X(t.due);if(!await this._addFull(s,{summary:a,description:me(t.description),date:i?i.date:null,time:i?i.time:null}))return!1;let c=this._ruleFor(e.id,t);c&&c.days&&(await this._setRule(s.id,{summary:a,days:c.days}),await this._setRule(e.id,{uid:t.uid,summary:a,days:null}));let d=this._rawPoints(e.id,a);d&&(await this._setTaskPoints(s.id,a,d),await this._setTaskPoints(e.id,a,0));let n=this._roomIdsOf(e.id,a),p=this._equipIdsOf(e.id,a);n.length&&(await this._setTaskRoom(s.id,a,n),await this._setTaskRoom(e.id,a,null)),p.length&&(await this._setTaskEquip(s.id,a,p),await this._setTaskEquip(e.id,a,null));let u=this._externalRaw(e.id,a);return u&&(await this._setTaskExternal(s.id,a,u),await this._setTaskExternal(e.id,a,null)),!0}async _moveSelected(e){let t=this._list(this._sel.listId),s=this._list(e);if(!t||!s)return;let a=(t.items||[]).filter(o=>this._sel.keys.has(L(o)));this._closeSheet(),this._endSelect();let i=[];for(let o of a)await this._moveItem(t,o,s)&&i.push(o);i.length&&await this._call("remove_item",{item:i.map(L)},t.id),this._haptic("light"),this._showToast(i.length===a.length?`${i.length} ${i.length===1?"item movido":"itens movidos"} para ${O(s.name,28)}`:`Movidos ${i.length} de ${a.length} para ${O(s.name,28)}`)}_renderText(e,t){return na(e).map(s=>s.url?l`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${v(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,t))}_highlight(e,t){if(!t)return e;let s=ta(e),a=V(t);if(!a)return e;let i=[],o=0,c;for(;(c=s.indexOf(a,o))!==-1;)c>o&&i.push(e.slice(o,c)),i.push(l`<mark>${e.slice(c,c+a.length)}</mark>`),o=c+a.length;return o<e.length&&i.push(e.slice(o)),i}_renderItem(e,t,s={}){let a=j(t),i=!a&&Y(t.due),o=T(e.features,M.UPDATE),c=this._ruleFor(e.id,t),d=c?a&&c.reopen_at?l`<span class="tag rep">${v("repeat")}volta ${this._returnLabel(c.reopen_at)}</span>`:l`<span class="tag rep">${v("repeat")}${this._everyLabel(c.days)}</span>`:h;if(s.selecting){let n=!!s.selected;return l`
        <div class="item selecting ${n?"picked":""}" data-key=${L(t)} @click=${()=>this._toggleSel(t)}>
          <span class="check sel ${n?"on":""}" role="checkbox" aria-checked=${n?"true":"false"} aria-label="Selecionar ${t.summary||""}">${v("check")}</span>
          <div class="it-body">
            <div class="it-text">${t.summary||""}</div>
            ${this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?l`<div class="chips">${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}</div>`:h}
          </div>
        </div>
      `}return l`
      <div class="item ${a?"done":""}" data-key=${L(t)} ?data-drag=${s.draggable} style=${s.showList?D(e.color,this._dark):""} @contextmenu=${s.selectable?n=>(n.preventDefault(),this._startSelect(e,t)):null}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!o} @click=${()=>this._toggle(e,t)}>
          ${v("check")}
        </button>
        <div class="it-body" @click=${()=>o&&this._openEdit(e,t)}>
          <div class="it-text">${this._renderText(t.summary||"",s.query)}</div>
          ${me(t.description)?l`<div class="it-desc">${this._renderText(me(t.description),s.query)}</div>`:h}
          ${s.why?l`<div class="it-why">${v(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:h}
          ${i||s.showList||c||this._pointsOf(e.id,t.summary,t.uid)||this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?l`<div class="chips">
                ${s.showList?l`<span class="tag list">${v(e.icon)}${O(e.name,24)}</span>`:h}
                ${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}
                ${i?e.noDue?l`<span class="tag info" title=${e.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${v("clock-fading")}${i.text}</span>`:l`<span class="tag ${i.tone==="late"?"late":i.tone==="today"?"today":""}">${v(i.time?"clock":"calendar")}${i.text}</span>`:h}
                ${d} ${this._renderPointsTag(e.id,t)}
              </div>`:h}
        </div>
        ${s.draggable?l`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${n=>this._dragStart(n,e,t)} @click=${n=>n.preventDefault()}>${v("grip-vertical")}</button>`:h}
      </div>
    `}_dueRows(e=this._visible()){let t=[];for(let s of e)if(!s.noDue)for(let a of s.items||[]){if(j(a)&&!this._recent.has(L(a)))continue;let i=Y(a.due);i&&t.push({l:s,i:a,d:i})}return t.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(e){let t=this._dueOn()?this._dueRows(e):[],s=t.filter(p=>p.d.overdue),a=t.filter(p=>!p.d.overdue&&p.d.diff===0),i=t.find(p=>!p.d.overdue&&p.d.diff>0),o=[...e].filter(p=>p.pending>0).sort((p,u)=>u.pending-p.pending)[0],c=e.reduce((p,u)=>p+u.done,0),d=[],n=(p,u,g,m,w,b)=>d.push({ic:p,tone:u,label:g,value:m,right:w,go:b});return this._dueOn()&&(n("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._goTab(""):null),n("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._goTab(""):null),n("calendar-clock","","Pr\xF3ximo prazo",i?i.i.summary:"Sem prazos marcados",i?i.d.text:"",i?()=>this._go(`/lista/${i.l.id}`):null)),n("list-checks","","Mais cheia",o?o.name:"Tudo resolvido",o?A(o.pending,"pendente","pendentes"):"",o?()=>this._go(`/lista/${o.id}`):null),this._dueOn()||n("circle-check","","Resolvidos",A(c,"item feito","itens feitos"),"",null),l`<dl class="facts">
      ${d.map(p=>l`<div class="fact-row ${p.go?"go":""}" role=${p.go?"link":"group"} tabindex=${p.go?"0":"-1"} @click=${p.go||(()=>{})} @keydown=${u=>p.go&&u.key==="Enter"&&p.go()}>
          <dt><span class="sec-ic ${p.tone}" aria-hidden="true">${v(p.ic)}</span>${p.label}</dt>
          <dd>${p.value}</dd>
          <dd class="fv ${p.tone}">${p.right}</dd>
        </div>`)}
    </dl>`}_dueSections(){let e=this._visible(),t=this._dueOn()?this._dueRows(e):[],s=[{title:"Atrasados",test:n=>n.overdue,soon:!0},{title:"Hoje",test:n=>n.diff===0,soon:!0},{title:"Amanh\xE3",test:n=>n.diff===1},{title:"Pr\xF3ximos 7 dias",test:n=>n.diff>1&&n.diff<7},{title:"Mais adiante",test:()=>!0}],a=new Set,i=s.map(n=>{let p=t.filter(u=>!a.has(u)&&n.test(u.d));return p.forEach(u=>a.add(u)),{...n,rows:p}}).filter(n=>n.rows.length),o=n=>l`
      <div class="panel items due-group">
        <div class="overline" style=${n.title==="Atrasados"?"color:var(--rv-late)":""}>${n.title} · ${n.rows.length}</div>
        ${K(n.rows,p=>p.l.id+L(p.i),p=>this._renderItem(p.l,p.i,{showList:!0}))}
      </div>
    `,c=(this._dueOn()&&this._repeatOn()?this._rules:[]).filter(n=>n.reopen_at).map(n=>{let p=this._list(n.entity_id),u=p&&p.items&&n.uid?p.items.find(g=>g.uid===n.uid):null;return{r:n,l:p,item:u}}).filter(n=>n.l&&!n.l.hidden).sort((n,p)=>n.r.reopen_at-p.r.reopen_at),d=c.length?l`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${c.length}</div>
          ${K(c,n=>n.r.id,n=>n.item?this._renderItem(n.l,n.item,{showList:!0}):l`<div class="item done" style=${D(n.l.color,this._dark)}>
                    <span class="check on">${v("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${n.l.id}`)}>
                      <div class="it-text">${n.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${v(n.l.icon)}${O(n.l.name,24)}</span>
                        <span class="tag rep">${v("repeat")}volta ${this._returnLabel(n.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:h;return{soon:i.filter(n=>n.soon).map(o),later:i.filter(n=>!n.soon).map(o),coming:d,comingN:c.length,rows:t,late:t.filter(n=>n.d.overdue).length,today:t.filter(n=>!n.d.overdue&&n.d.diff===0).length}}_searchToggle(e,t,s,a){return l`<button class="pick ${s?"on":""}" aria-pressed=${s?"true":"false"} @click=${a}>${v(e)}<span>${t}</span></button>`}_renderSearch(){let e=this._query.trim(),t=V(e),s=[],a=0,i=this._roomsOn()&&this._searchRooms,o=this._equipsOn()&&this._searchEquips,c=this._extOn()&&this._searchExt,d=(n,p)=>i||o?V(this._placeText(n.id,p.summary,{rooms:i,equips:o})).includes(t):!1;if(t)for(let n of this._visible()){let p=(n.items||[]).filter(u=>(this._searchDone||!j(u))&&(V(u.summary).includes(t)||V(u.description).includes(t)||d(n,u)||c&&V(this._externalText(n.id,u.summary)).includes(t)));p.length&&(p.sort((u,g)=>Number(j(u))-Number(j(g))),s.push({l:n,hits:p}),a+=p.length)}return l`
      <section class="page">
        ${this._renderPageHead("Buscar",{text:`Em ${A(this._visible().length,"lista","listas")}`})}
        <label class="search-box">
          ${v("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${n=>this._query=n.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?l`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${v("x")}</button>`:h}
        </label>
        <div class="filters-label" id="incluir">Incluir</div>
        <div class="filters" role="group" aria-labelledby="incluir">
          ${this._searchToggle("circle-check","Conclu\xEDdos",this._searchDone,()=>this._searchDone=!this._searchDone)}
          ${""}
          ${this._extOn()?this._searchToggle("hard-hat","Servi\xE7os externos",this._searchExt,()=>this._searchExt=!this._searchExt):h}
          ${this._rooms&&this._rooms.encontrado&&this._roomsOn()?this._searchToggle("door-open","C\xF4modos",this._searchRooms,()=>this._searchRooms=!this._searchRooms):h}
          ${this._rooms&&this._rooms.encontrado&&this._equipsOn()?this._searchToggle("package","Equipamentos",this._searchEquips,()=>this._searchEquips=!this._searchEquips):h}
        </div>
        ${t?s.length?l`<p class="page-sub" style="margin-top:0">${A(a,"resultado","resultados")}</p>
                ${s.map(({l:n,hits:p})=>l`
                    <div class="panel items" style=${D(n.color,this._dark)}>
                      <div class="overline">${n.name}${n.group?` \xB7 ${n.group}`:""}</div>
                      ${K(p,L,u=>this._renderItem(n,u,{query:e}))}
                    </div>
                  `)}`:l`<div class="panel"><div class="empty"><div class="em-icon">${v("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${O(e,30)}”.</p></div></div>`:l`<p class="page-sub" style="margin-top:0">Procure por qualquer palavra, em todas as listas.</p>`}
      </section>
    `}_configTabs(){return[...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks","integra\xE7\xF5es"]]:[],...this._data()?[["dados","Dados","archive","dados e backup"]]:[],["aparencia","Apar\xEAncia","palette","apar\xEAncia"],["opcoes","Op\xE7\xF5es","toggle-right","op\xE7\xF5es"]]}_configTab(){let e=this._configTabs(),t=this._view().tab;return e.some(s=>s[0]===t)?t:e[0][0]}_moreRows(){let e=this._configTabs().map(s=>s[3]),t=`${e.slice(0,-1).join(", ")} e ${e[e.length-1]}.`;return[["/listas","list-checks","Listas","Nome, cor, \xEDcone e quais aparecem."],["/graficos","chart-bar","Gr\xE1ficos",this._chartsLine()],["relatorio","clipboard-list","Relat\xF3rio de pend\xEAncias","Para imprimir ou salvar em PDF."],["/config","sliders-horizontal","Configura\xE7\xF5es",t[0].toUpperCase()+t.slice(1)],["/sobre","info","Sobre","CorrerIA Code, os apps e o GitHub."]]}_secHead(e,t,s=null){return l`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${v(e)}</span><h2>${t}</h2></div>${s?l`<p class="panel-lead">${s}</p>`:h}`}_renderFoot(){return l`<p class="foot"><b>ResolvIA</b><br />v${Ht} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>`}_renderMore(){return l`
      <section class="page">
        ${this._renderPageHead("Mais",null)}
        <div class="panel more-menu" role="navigation" aria-label="Mais">
          <ul>
            ${this._moreRows().map(([e,t,s,a])=>l`<li>
                <button class="more-row" @click=${()=>this._openFromMenu(e)}>
                  <span class="mais-ic" aria-hidden="true">${v(t)}</span>
                  <span class="mb"><b>${s}</b><span>${a}</span></span>
                  ${v("chevron-right","chev")}
                </button>
              </li>`)}
          </ul>
        </div>
        ${this._renderFoot()}
      </section>
    `}_renderMoreScreen(e,t,s){return l`
      <section class="page">
        ${this._renderPageHead(e,t,!0)}
        ${s}
      </section>
    `}_listsStatus(){let e=this._L.filter(t=>t.hidden).length;return{text:this._L.length?`${A(this._L.length,"lista","listas")}${e?` \xB7 ${A(e,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}_renderConfig(){let e=this._configTabs(),t=this._configTab(),s=i=>{i!==t&&(this._haptic("light"),this._go(this._configPath(i),!0,history.state&&history.state.rvUp?{rvUp:!0}:null))},a;return t==="integracoes"?a=l`${this._renderRewardsPanel()} ${this._renderRoomsPanel()} ${this._renderCorreriaPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this.hass.resolvia.voiceStatus&&this._aiOn()?this._renderVoicePanel():h} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():h} ${this._renderSensorsPanel()}`:t==="dados"?a=this._renderDataPanel():t==="aparencia"?a=this._renderAppearanceTab():a=this._renderOptionsTab(),l`
      <section class="page">
        ${this._renderPageHead("Configura\xE7\xF5es",null,!0)}
        <div class="seg compact more-tabs" role="tablist" aria-label="Seções de Configurações">
          ${e.map(([i,o,c])=>l`<button class=${t===i?"on":""} role="tab" aria-selected=${t===i?"true":"false"} @click=${()=>s(i)}>${v(c)}<span>${o}</span></button>`)}
        </div>
        <div role="tabpanel" aria-label=${e.find(i=>i[0]===t)[1]}>${a}</div>
        ${this._renderFoot()}
      </section>
    `}_renderListsTab(){let e=(a,i,o)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${a} @change=${o} aria-label=${i} /><span class="track"></span></label>`,t=this._L.filter(a=>a.hidden),s=a=>l`
      <div class="row ${a.hidden?"inact":""}" style=${D(a.color,this._dark)}>
        <button class="tile" @click=${()=>this._openCustomize(a)} aria-label="Personalizar ${a.name}">${v(a.icon)}</button>
        <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(a)}>
          <div class="label">${a.name}</div>
          <div class="hint">${a.group||a.id}</div>
        </button>
        ${e(!a.hidden,`Mostrar ${a.name}`,i=>this._saveListPrefs(a.id,{hidden:i.target.checked?null:!0}))}
      </div>
    `;return l`
        <div class="panel lists-panel">
          <p class="panel-lead">Toque numa lista para personalizar.</p>
          ${this._L.length?K(this._L.filter(a=>!a.hidden),a=>a.id,s):l`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
          ${t.length?l`<button class="row inact-head ${this._inactOpen?"open":""}" aria-expanded=${this._inactOpen?"true":"false"} @click=${()=>(this._inactOpen=!this._inactOpen,this.requestUpdate())}>
                  <span class="tile muted">${v("eye-off")}</span>
                  <span class="grow"><div class="label">Inativas <span class="count">${t.length}</span></div></span>
                  ${v("chevron-down","chev")}
                </button>
                ${this._inactOpen?K(t,a=>a.id,s):h}`:h}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?l`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${D(this._accent(),this._dark)}>${v("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${v("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${D(ue[9],this._dark)}>${v("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${v("chevron-right")}
              </button>
            </div>`:h}

    `}_renderRulesPanels(){if(!this._rulesOk)return h;let e=this._repeatOn();return l`<div class="panel" id="repeticao">
              ${this._secHead("repeat","Repeti\xE7\xE3o")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${e?"O item volta sozinho N dias depois de feito.":"Desligado."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._toggleRepeat(t)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!e&&!this._rules.length?h:l`<div class="panel ${e?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!e&&this._rules.length?l`<p class="panel-lead">Não voltam mais sozinhas. Exclua para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${v("trash")}Excluir ${A(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:h}
              ${this._rules.length?this._rules.map(t=>{let s=this._list(t.entity_id);return s?l`<div class="row" style=${D(s.color,this._dark)}>
                      <span class="tile">${v("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${t.summary||t.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(t.days)}${e?t.reopen_at?` \xB7 volta ${this._returnLabel(t.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(t.entity_id,{uid:t.uid,summary:t.match||t.summary,days:null})}>${v("x")}</button>
                    </div>`:h}):l`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir”.</div></div>`}
            </div>`}`}_toggleRepeat(e){let t=e.target.checked;if(t||!this._rules.length)return this._saveAppPrefs({repeat_on:t});e.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(e){let t=this._rules.length;this._openSheet("confirm",{title:e?"Desligar a repeti\xE7\xE3o?":"Excluir as repeti\xE7\xF5es?",text:`${A(t,"tarefa se repete","tarefas se repetem")}. ${e?"Ao desligar, essas repeti\xE7\xF5es s\xE3o exclu\xEDdas":"Elas ser\xE3o exclu\xEDdas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:e?"Excluir e desligar":`Excluir ${A(t,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),e&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${A(t,"repeti\xE7\xE3o exclu\xEDda","repeti\xE7\xF5es exclu\xEDdas")}${e?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let e=(s,a,i)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${i} aria-label=${a} /><span class="track"></span></label>`,t=this._dueOn();return l`
        <div class="panel">
          ${this._secHead("calendar-clock","Prazos")}
          <div class="row">
            <div class="grow"><div class="label">Controlar prazos</div><div class="hint" style="white-space:normal">${t?"O que vence fica vermelho e aparece em Sugest\xF5es.":"Datas s\xF3 como informa\xE7\xE3o."}</div></div>
            ${e(t,"Controlar prazos",s=>this._saveAppPrefs({due_off:s.target.checked?null:!0}))}
          </div>
          ${t?this._renderDueAlert(e):h}
        </div>
        <div class="panel">
          ${this._secHead("layout-list","Exibi\xE7\xE3o")}
          <div class="row">
            <div class="grow"><div class="label">Agrupar por dispositivo</div><div class="hint">Ex.: as listas da Alexa juntas</div></div>
            ${e(this._app("group_by_device",!0),"Agrupar por dispositivo",s=>this._saveAppPrefs({group_by_device:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">Concluídos abertos</div><div class="hint">Mostra os concluídos sem precisar tocar</div></div>
            ${e(this._app("show_done",!1),"Conclu\xEDdos abertos",s=>this._saveAppPrefs({show_done:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">Notas</div><div class="hint" style="white-space:normal">${this._notesOn()?"Campo de notas em cada item.":"Desligado."}</div></div>
            ${e(this._notesOn(),"Notas",s=>this._saveAppPrefs({notes_off:s.target.checked?null:!0}))}
          </div>
        </div>
        ${this._renderExternalOption(e)}
        ${this._renderRulesPanels()}
    `}_renderDueAlert(e){let t=this._app("due_alert",!1)===!0,s=/^\d{2}:\d{2}$/.test(this._app("due_alert_time",""))?this._app("due_alert_time"):"08:00",a=this._alertPeople;t&&a===void 0&&this._loadAlertPeople();let i=(a||[]).find(n=>n.me),o=n=>n.length>1?`${n.slice(0,-1).join(", ")} e ${n.at(-1)}`:n[0],c=(a||[]).filter(n=>!n.phone).map(n=>n.name),d=a?i?i.phone?"":"Sem celular ligado a voc\xEA no Home Assistant.":"Voc\xEA n\xE3o \xE9 uma pessoa da casa no Home Assistant.":"";return l`<div class="row">
        <div class="grow"><div class="label">Avisar o que vence hoje</div><div class="hint" style="white-space:normal">${t?"Cada pessoa recebe as listas dela e as de todos.":"Desligado."}</div></div>
        ${e(t,"Avisar o que vence hoje",n=>this._saveAppPrefs({due_alert:n.target.checked?!0:null}))}
      </div>
      ${t?l`<div class="due-alert">
            <div class="field">
              <span class="flabel">Horário</span>
              <div class="remind-row">
                <input type="time" class="remind-time" .value=${s} aria-label="Horário do aviso" @change=${n=>/^\d{2}:\d{2}$/.test(n.target.value)&&this._saveAppPrefs({due_alert_time:n.target.value})} />
                <button class="btn outline remind-test" ?disabled=${!i||!i.phone} title=${d} aria-label="Testar no meu celular" @click=${()=>this._testDueAlert()}>${v("send")}Testar</button>
              </div>
            </div>
            <div class="field">
              <span class="flabel">Quem recebe</span>
              ${a==null?l`<p class="field-hint">${a===null?"N\xE3o consegui ver as pessoas da casa.":"Procurando as pessoas da casa\u2026"}</p>`:a.length?l`<div class="due-who">${a.map(n=>l`<div class="dw ${n.phone?"":"off"}">${v("user-round")}<b>${n.name}</b>${n.phone?h:l`<span>sem celular</span>`}</div>`)}</div>
                    ${c.length?l`<p class="field-hint">${v("info")}<span>Sem celular para ${o(c)}: ligue o celular à pessoa no Home Assistant.</span></p>`:h}`:l`<p class="field-hint">${v("info")}<span>Nenhuma pessoa da casa no Home Assistant.</span></p>`}
            </div>
          </div>`:h}`}async _loadAlertPeople(){if(this._alertPeopleLoading)return this._alertPeople;this._alertPeopleLoading=!0;try{this._alertPeople=this._prefsRemote?await this.hass.callWS({type:"resolvia/due_alert/people"}):[]}catch{this._alertPeople=null}return this._alertPeopleLoading=!1,this.requestUpdate(),this._alertPeople}async _testDueAlert(){try{let e=await this.hass.callWS({type:"resolvia/due_alert/test"});this._showToast(e&&e.today?"Aviso enviado para o seu celular. Toque nele para abrir Sugest\xF5es.":"Aviso enviado para o seu celular (nada vence hoje).")}catch(e){this._showToast(`N\xE3o foi: ${e.message}`)}}_renderAppearanceTab(){let e=this._accentDaily(),t=e?this._accent().id:this._app("accent","vermelho");return l`
        <div class="panel">
          ${this._secHead("contrast","Tema","Cada aparelho guarda a sua escolha.")}
          ${Js({theme:this._theme,onTheme:s=>this._setTheme(s),icon:v})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Vale para todos os aparelhos.")}
          <div class="row switch-row daily-row">
            <div class="grow"><div class="label">Cor do dia</div><div class="hint">Muda a cor do app todo dia.</div></div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._saveAppPrefs({accent_daily:s.target.checked?null:!1})} aria-label="Cor do dia" /><span class="track"></span></label>
          </div>
          ${Qs({palette:ue,value:t,onPick:s=>this._saveAppPrefs({accent:s==="vermelho"?null:s,accent_daily:!1})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return h;let e=this._app("sensors_on",!1)===!0;return l`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">Criar sensores</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: nenhum sensor no Home Assistant."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._saveAppPrefs({sensors_on:t.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${e?l`<div class="sensor-list"><div class="sensor-row"><code>sensor.resolvia_ia_hoje</code><span>chamadas de IA hoje, com erros, cota e tokens estimados</span></div></div>`:h}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return h;let e=this._aiOn(),t=l`<div class="row switch-row">
        <div class="grow"><div class="label">Usar IA</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: sem leitura por IA, sem Falar."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${n=>this._saveAppPrefs({ai_off:n.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!e)return l`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens, prints e fotos.")}
        ${t}
      </div>`;let s=this._aiInfo(),a=s.entities||[],i=this._app("ai_entity",""),o=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",c=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",d="";return s.ready&&s.using&&(d=`Usando ${s.using.name}${i?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(d+=` Para fotos, ${s.photos.name}.`)),s.reason&&(d=`${d} ${s.reason}`.trim()),l`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens, prints e fotos, com a IA do Home Assistant.")}
      ${t}
      <div class="ai-state ${o}"><span class="dot"></span><div><b>${c}</b>${d?l`<span>${d}</span>`:h}</div></div>
      ${a.length||i?l`<label class="field" style="margin:14px 0 0">
            <span class="flabel">IA usada pelo app</span>
            <select class="select" aria-label="IA usada pelo app" @change=${n=>this._chooseAi(n.target.value)}>
              <option value="" ?selected=${!i}>Padrão do Home Assistant</option>
              ${a.map(n=>l`<option value=${n.id} ?selected=${n.id===i}>${n.name}${n.images?"":" (s\xF3 texto)"}${n.available?"":" (indispon\xEDvel)"}</option>`)}
              ${i&&!a.some(n=>n.id===i)?l`<option value=${i} selected>${i} (não encontrada)</option>`:h}
            </select>
          </label>`:h}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${()=>this._refreshAi()}>${v("rotate-ccw")}Verificar de novo</button></div>
      ${s.ready&&s.images?h:l`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
    </div>`}_renderSheet(){if(!this._sheet)return h;let e=h;return this._sheet==="item"?e=this._renderItemSheet():this._sheet==="listmenu"?e=this._renderListMenu():this._sheet==="customize"?e=this._renderCustomize():this._sheet==="confirm"?e=this._renderConfirm():this._sheet==="import"?e=this._renderImportSheet():this._sheet==="versions"?e=this._renderVersions():this._sheet==="who"?e=this._renderWhoSheet():this._sheet==="move"?e=this._renderMoveSheet():this._sheet==="chat"&&(e=this._renderChatSheet()),l`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${t=>t.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${e}
      </div>
    `}_sheetStyle(){let e=this._form||{},t=this._list(e.target||e.listId),s=this._sheet==="customize"&&be(e.color)||t&&t.color;return s?`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${tt(s.fill,this._dark?.18:.14)};${D(s,this._dark)}`:""}_renderMirroredSheet(e){let t=this._form,s=t.mirrored,a=this._pointsOf(e.id,t.summary,t.key),i=Y(t.due),o=T(e.features,M.DELETE);return l`
      <div class="sheet-head">
        <h3 class="display">${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${v("x")}</button>
      </div>
      <div class="ro-item">
        <b>${t.summary}</b>
        <div class="ro-tags">
          ${i?l`<span class="tag ${e.noDue?"info":i.tone}">${v("calendar")}${i.text}</span>`:h}
          ${a?l`<span class="tag pts">${v("trophy")}+${a}</span>`:h}
          <span class="tag">${O(e.name,24)}</span>
        </div>
        ${t.description?l`<p>${t.description}</p>`:h}
      </div>
      <p class="sheet-note with-icon">${v("calendar-clock")}<span>Vem do CronologIA: concluir aqui marca como feito lá${a?` (${a} pontos)`:""}. Para editar, use o CronologIA.</span></p>
      <div class="sheet-actions">
        ${o?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${v("trash")}</button>`:h}
        <button class="btn primary" @click=${()=>this._closeSheet()}>Fechar</button>
      </div>
    `}_renderItemSheet(){let e=this._form,t=this._list(e.listId),s=this._list(e.target)||t;if(!t||!s)return h;if(e.mirrored&&e.mode==="edit")return this._renderMirroredSheet(t);let a=s.features,i=T(a,M.DESCRIPTION),o=this._dueOn()&&(T(a,M.DUE_DATE)||T(a,M.DUE_DATETIME)),c=T(a,M.DUE_DATETIME),d=e.mode==="edit"&&T(t.features,M.DELETE),n=ra(),p=n.some(m=>m.date===e.date),u=e.mode==="add"?this._L.filter(m=>T(m.features,M.CREATE)&&!m.unavailable&&(!m.hidden||m.id===e.target)):T(t.features,M.DELETE)?this._L.filter(m=>T(m.features,M.CREATE)&&!m.unavailable&&(!m.hidden||m.id===t.id)):[],g=m=>{let w=this.renderRoot.querySelector(m);if(w)try{w.showPicker()}catch{w.focus(),w.click()}};return l`
      <div class="sheet-head">
        <h3 class="display">${e.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${v("x")}</button>
      </div>
      ${e.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(e.target,"text"),photos:()=>this._openImport(e.target,"photos"),scan:()=>this._openImport(e.target,"scan")}):h}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${e.summary} @input=${m=>this._setForm({summary:m.target.value})} @keydown=${m=>m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${i&&(this._notesOn()||e.hadNotes)?l`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${e.description} @input=${m=>this._setForm({description:m.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:h}
      ${o?l`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row grid">
              ${n.map(m=>l`<button class="pick ${e.date===m.date?"on":""}" @click=${()=>this._setForm({date:e.date===m.date?null:m.date})}>${m.label}</button>`)}
              <button class="pick ${e.date&&!p?"on":""}" @click=${()=>g("#rv-date")}>
                ${v("calendar")}<span>${e.date&&!p?It(e.date):"Outra data"}</span>
                <input id="rv-date" class="hidden-input" type="date" tabindex="-1" .value=${e.date||""} @change=${m=>this._setForm({date:m.target.value||null})} />
              </button>
              ${e.date?l`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null})}>${v("x")}<span>Sem prazo</span></button>`:h}
            </div>
          </div>`:h}
      ${o&&c&&e.date?l`<div class="field">
            <span class="flabel">Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${v("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===$e?"on":""}" @click=${()=>this._setForm({time:$e})}>${v("clock")}<span>${$e}</span></button>
              <button class="pick ${e.time&&e.time!==$e?"on":""}" @click=${()=>g("#rv-time")}>
                ${v("clock-fading")}<span>${e.time&&e.time!==$e?e.time:"Outro hor\xE1rio"}</span>
                <input id="rv-time" class="hidden-input" type="time" tabindex="-1" .value=${e.time||$e} @change=${m=>this._setForm({time:m.target.value||null})} />
              </button>
            </div>
          </div>`:h}
      ${this._rulesOk&&this._repeatOn()&&!e.mirrored&&(T(a,M.UPDATE)||T(a,M.CREATE))?l`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${e.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>Não</button>
              ${Ia.map(m=>l`<button class="pick ${e.repeat===m.days&&!e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:m.days,repeatCustom:!1})}>${m.label}</button>`)}
              <button class="pick ${e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:e.repeat||4})}>${v("repeat")}<span>Outro</span></button>
            </div>
            ${e.repeatCustom?l`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(e.repeat||"")} @input=${m=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(m.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:h}
            ${e.repeat?l`<div class="field-hint">${v("repeat")}<span>Volta sozinha ${e.repeat===1?"no dia seguinte":`em ${e.repeat} dias`} depois de concluída.</span></div>`:h}
          </div>`:h}
      ${this._renderRoomField(e)}
      ${this._renderEquipField(e)}
      ${this._renderExternalField(e,a)}
      ${this._renderPointsField(e)}
      ${u.length>1?l`<div class="field">
            <span class="flabel">${e.mode==="add"?"Lista":"Lista (mover)"}</span>
            <div class="chip-row grid">
              ${u.map(m=>l`<button class="pick list ${e.target===m.id?"on":""}" style=${D(m.color,this._dark)} @click=${()=>this._setForm({target:m.id})}><span class="dot"></span><span>${O(m.name,26)}</span></button>`)}
            </div>
          </div>`:h}
      <div class="sheet-actions">
        ${d?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${v("trash")}</button>`:h}
        <button class="btn primary" @click=${()=>this._saveItem()}>${e.mode==="add"?"Adicionar":e.target!==e.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(e,{label:t=!0}={}){let s=this._aiInfo(),a=this._isHaAndroid(),i=this._camOk(),o=(c,d,n,p=!1,u="")=>l`<button type="button" class="imp-tile ${u?"no-cam":""}" ?disabled=${p} @click=${e[c]}>${v(d)}<span>${n}</span>${u?l`<small>${u}</small>`:h}</button>`;return l`<div class="field imp-field">
        ${t?l`<span class="flabel">Trazer de mensagem ou foto</span>`:h}
        <div class="imp-tiles">
          ${o("text","clipboard-paste","Colar mensagem")}
          ${o("photos","images","Escolher fotos",!s.images)}
          ${o("scan","scan-text","Digitalizar com\xA0IA",!s.images,i?"":"Precisa de https")}
        </div>
        ${s.images&&!i?l`<p class="imp-help">Em http a câmera não abre aqui: tire a foto pelo celular e use Escolher fotos.</p>`:a&&s.images?l`<p class="imp-help">No app do Home Assistant, a galeria manda uma foto por vez.</p>`:h}
      </div>
      ${s.ready?h:l`<div class="ai-box">${v("scan-text")}<span>Sem IA configurada, a mensagem é separada por linhas e vírgulas. Para ler fotos, configure a Leitura por IA em Mais › Configurações › Integrações.</span></div>`}`}_renderImportSheet(){let e=this._form,t=this._aiInfo(),s=(c,d)=>l`<div class="sheet-head">
      ${d?l`<button class="icon-btn back" @click=${d} aria-label="Voltar">${v("chevron-left")}</button>`:h}
      <h3 class="display">${c}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${v("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},i=e.error?l`<div class="imp-error">${v("circle-alert")}<span>${e.error}</span></div>`:h,o=e.images&&e.images.length?l`<div class="thumbs">${e.images.map(c=>l`<img src=${c.url} alt="" />`)}</div>`:h;if(e.step==="voice")return this._renderVoiceStep(s);if(e.step==="text")return l`
        ${s(e.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${e.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${c=>this._setForm({text:c.target.value,error:null})}></textarea>
        </label>
        ${i}
        <div class="sheet-actions">
          ${this._clipOk()?l`<button class="btn outline" @click=${()=>this._pasteClipboard()}>${v("clipboard-paste")}Colar</button>`:h}
          <button class="btn primary" ?disabled=${!(e.text||"").trim()} @click=${()=>this._readText()}>${t.ready?v("sparkles"):h}Separar itens</button>
        </div>
        ${t.ready?h:l`<p class="sheet-note">Sem IA configurada: separo por linhas, vírgulas e “e”.</p>`}
      `;if(e.step==="loading")return l`
        ${s("Lendo\u2026")}
        ${o}
        <div class="imp-loading">
          <span class="spin">${v("loader-circle")}</span>
          <span>${e.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>e.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>Cancelar</button></div>
      `;if(e.step==="review"){let c=this._list(e.target),d=e.items.filter(g=>g.on&&g.text.trim()).length,n=this._importTargets(),p=n.length>1,u=new Set(e.items.filter(g=>g.on&&g.text.trim()).map(g=>this._importListOf(g)));return l`
        ${s("Revisar itens",a)}
        ${o}
        ${e.heard?l`<p class="heard">${v("mic")}<span>“${e.heard}”</span></p>`:h}
        <p class="sheet-note top">${A(e.items.length,"item encontrado","itens encontrados")}.</p>
        ${e.note?l`<div class="imp-error soft">${v("sparkles")}<span>${e.note}</span></div>`:h}
        <div class="imp-list">
          ${e.items.map((g,m)=>{let w=this._list(this._importListOf(g));return l`<div class="imp-row ${g.on?"":"off"} ${p||this._roomsOn()||this._equipsOn()?"has-dest":""}">
              <button class="check ${g.on?"on":""}" role="checkbox" aria-checked=${g.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(m,{on:!g.on})}>${v("check")}</button>
              <input type="text" .value=${g.text} aria-label="Item" @input=${b=>this._setImportItem(m,{text:b.target.value})} />
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:e.items.filter((b,k)=>k!==m)})}>${v("x")}</button>
              ${p||this._roomsOn()||this._equipsOn()?l`<div class="imp-chips">
              ${p&&w?l`<label class="imp-dest" style=${D(w.color,this._dark)}>
                    <span class="dot"></span><span class="dname">${O(w.name,30)}</span>${v("chevron-down")}
                    <select aria-label="Lista de ${g.text}" @change=${b=>this._setImportItem(m,{list:b.target.value})}>
                      ${n.map(b=>l`<option value=${b.id} ?selected=${b.id===w.id}>${b.name}</option>`)}
                    </select>
                  </label>`:h}
              ${this._roomsOn()?l`<label class="imp-dest imp-room ${g.room?"":"none"}">
                    ${v(g.room==="*"?"house":"door-open")}<span class="dname">${g.room==="*"?"Todos os c\xF4modos":g.room?O(this._roomName(g.room)||"",30):"C\xF4modo"}</span>${v("chevron-down")}
                    <select aria-label="Cômodo de ${g.text}" @change=${b=>this._setImportItem(m,{room:b.target.value||null})}>
                      <option value="" ?selected=${!g.room}>Nenhum</option>
                      ${this._roomList().length>1?l`<option value="*" ?selected=${g.room==="*"}>Todos os cômodos</option>`:h}
                      ${this._roomList().map(b=>l`<option value=${b.id} ?selected=${b.id===g.room}>${b.nome}</option>`)}
                    </select>
                  </label>`:h}
              ${this._equipsOn()?l`<button type="button" class="imp-dest imp-room imp-equip ${g.equip?"":"none"} ${e.eqFor===m?"open":""}" aria-expanded=${e.eqFor===m?"true":"false"} aria-label="Equipamento de ${g.text}" @click=${()=>this._setForm({eqFor:e.eqFor===m?null:m,eqQ:"",eqMore:!1})}>
                    ${v("package")}<span class="dname">${g.equip?O((this._equipOf(g.equip)||{}).nome||"",30):"Equipamento"}</span>${v("chevron-down")}
                  </button>`:h}
                  </div>`:h}
              ${e.eqFor===m&&this._equipsOn()?l`<div class="imp-eq">${Ge({lit:{html:l,nothing:h},icon:v,items:this._equipItems(),room:this._roomsOn()&&g.room!=="*"?g.room:null,roomName:this._roomsOn()&&g.room&&g.room!=="*"&&this._roomName(g.room)||"",value:null,query:e.eqQ||"",more:!!e.eqMore,autofocus:!0,onQuery:b=>this._setForm({eqQ:b,eqMore:!1}),onMore:()=>this._setForm({eqMore:!0}),onPick:b=>{let k=this._equipOf(b),I=k&&k.comodo&&this._roomsOn()&&this._roomList().some(y=>y.id===k.comodo)?k.comodo:g.room;this._setImportItem(m,{equip:b,room:I}),this._setForm({eqFor:null,eqQ:""})}})}
                  ${g.equip?l`<button type="button" class="eq-more" @click=${()=>(this._setImportItem(m,{equip:null}),this._setForm({eqFor:null}))}>Sem equipamento</button>`:h}
                </div>`:h}
            </div>`})}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...e.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let g=this.renderRoot.querySelectorAll(".imp-row input");g.length&&g[g.length-1].focus()})}}>${v("plus")}<span>Adicionar linha</span></button>
        </div>
        ${t.images?l`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${v("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${v("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:h}
        ${p?l`<div class="field">
              <span class="flabel">Todos em</span>
              <div class="chip-row grid">
                ${n.map(g=>l`<button class="pick list ${u.size===1&&u.has(g.id)?"on":""}" style=${D(g.color,this._dark)} @click=${()=>this._setForm({target:g.id,items:e.items.map(m=>({...m,list:g.id}))})}><span class="dot"></span><span>${O(g.name,26)}</span></button>`)}
              </div>
            </div>`:h}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!d} @click=${()=>this._importAdd()}>
            ${d?`Adicionar ${A(d,"item","itens")}`:"Nenhum item marcado"}${d&&u.size>1?` em ${u.size} listas`:d&&u.size===1&&this._list([...u][0])?` em ${O(this._list([...u][0]).name,18)}`:""}
          </button>
        </div>
      `}return l`
      ${s("Importar itens")}
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${t.images?h:l`<div class="imp-error soft">${v("sparkles")}<span>${t.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>Ver Leitura por IA</button></span></div>`}
      ${i}
    `}_renderListMenu(){let e=this._list(this._form.listId);return e?l`
      <div class="sheet-head">
        <h3 class="display">${e.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${v("x")}</button>
      </div>
      ${T(e.features,M.DELETE)&&(e.items||[]).some(t=>!j(t))?l`<button class="menu-row" @click=${()=>(this._closeSheet(),this._startSelect(e))}>${v("square-check-big")}Selecionar itens<span class="sub">para mover de lista</span></button>`:h}
      <button class="menu-row" @click=${()=>this._openCustomize(e)}>${v("palette")}Personalizar<span class="sub">${e.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(e.id,{hidden:e.hidden?null:!0}))}>${v(e.hidden?"eye":"eye-off")}${e.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?l`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${e.id}`)}>${v("external-link")}Abrir na tela padrão do HA</button>`:h}
      ${T(e.features,M.DELETE)&&e.done?l`<button class="menu-row danger" @click=${()=>this._confirmClearDone(e)}>${v("brush-cleaning")}Limpar concluídos<span class="sub">${e.done}</span></button>`:h}
    `:h}_renderCustomize(){let e=this._form,t=this._list(e.listId);if(!t)return h;let s=be(e.color)||t.color,a=e.icon||Et(`${t.origName} ${t.group||""} ${t.id}`);return l`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${v("x")}</button>
      </div>
      <div class="preview-tile" style=${D(s,this._dark)}>
        <span class="tile">${v(a)}</span>
        <span class="lc-main"><span class="lc-title">${(e.name||"").trim()||t.origName}</span><span class="lc-meta">${t.group||t.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">Nome</span>
        <input type="text" .value=${e.name} placeholder=${t.origName} @input=${i=>this._setForm({name:i.target.value})} />
      </label>
      <div class="field">
        <span class="flabel">Cor</span>
        <div class="swatches">
          ${ue.map(i=>l`<button class="sw ${s.id===i.id?"on":""}" style="--c:${i.fill}" aria-label=${i.label} @click=${()=>this._setForm({color:i.id})}>${s.id===i.id?v("check"):h}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${D(s,this._dark)}>
          ${ia.map(i=>l`<button class="ig ${a===i?"on":""}" aria-label=${i} @click=${()=>this._setForm({icon:i})}>${v(i)}</button>`)}
        </div>
      </div>
      ${this._renderOwnerPick(e)}
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!e.hidden} @change=${i=>this._setForm({hidden:!i.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?t.canDue?l`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">Prazos</div>
              <div class="hint" style="white-space:normal">${e.deadlines?"Vencidos ficam vermelhos e aparecem em Sugest\xF5es.":"Datas s\xF3 como informa\xE7\xE3o."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e.deadlines} @change=${i=>this._setForm({deadlines:i.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:t.hasDates?l`<p class="sheet-note with-icon">${v("info")}<span>Esta lista não aceita prazo: as datas vêm da integração, só como informação.</span></p>`:h:h}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:t.canDue,owner:""})}>${v("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>Salvar</button>
      </div>
    `}_renderOwnerPick(e){let t=this._people||[],s=e.owner&&!t.some(a=>V(a)===V(e.owner))?[...t,e.owner]:t;return s.length?l`<div class="field">
      <span class="flabel">De quem é</span>
      <div class="chip-row grid owner-pick" role="radiogroup" aria-label="De quem é">
        ${["",...s].map(a=>{let i=a?V(e.owner||"")===V(a):!e.owner;return l`<button class="pick ${i?"on":""}" role="radio" aria-checked=${i?"true":"false"} @click=${()=>this._setForm({owner:a})}>${v(a?"user-round":"users")}<span>${a||"Todos"}</span></button>`})}
      </div>
      ${e.owner&&this._dueOn()&&this._app("due_alert",!1)===!0?l`<span class="field-hint">${v("info")}<span>O aviso de prazos vai só para o celular de ${e.owner}.</span></span>`:h}
    </div>`:h}_renderConfirm(){let e=this._form;return l`
      <div class="sheet-head"><h3 class="display">${e.title}</h3></div>
      <p class="confirm-text">${e.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${()=>e.run()}>${e.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return h;let e=this._toast;return l`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${e.text}</span>
      ${e.action?l`<button @click=${()=>{this._toast=null,e.action.run()}}>${e.action.label}</button>`:h}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",Ft);var Vt=class{constructor(e,t){this.url=e,this.onStatus=t,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let e=new WebSocket(this.url);this.ws=e,e.onopen=()=>{this.open=!0,this.backoff=1e3;let t=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))e.send(s);if(this.onStatus&&this.onStatus(!0),t)for(let s of this.reconnectHandlers)s()},e.onmessage=t=>{let s;try{s=JSON.parse(t.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let i=new Error(s.error&&s.error.message||"Falhou");i.code=s.error&&s.error.code,a.reject(i)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},e.onclose=()=>{let t=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),t&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(e){this.reconnectHandlers.push(e)}_send(e){let t=JSON.stringify(e);this.open?this.ws.send(t):this.queue.push(t)}sendMessagePromise(e){let t=this.nextId++;return new Promise((s,a)=>{this.pending.set(t,{resolve:s,reject:a}),this._send({...e,id:t})})}subscribeMessage(e,t){let s={cb:e,msg:t,id:null,first:null};this.subs.add(s);let a=new Promise((i,o)=>{s.first={resolve:i,reject:o}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(e){let t=this.nextId++;e.id=t,this.byId.set(t,e),this.pending.set(t,{resolve:()=>{e.first&&e.first.resolve(),e.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(t),this.subs.delete(e),e.first&&e.first.reject(s),e.first=null)}}),this.ws.send(JSON.stringify({...e.msg,id:t}))}};function qa(){try{if(window.parent===window)return null;let r=window.parent.document.querySelector("home-assistant");return r&&r.hass||null}catch{return null}}var ze=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function Oa(){let r=qa();return r&&r.themes&&typeof r.themes.darkMode=="boolean"?r.themes.darkMode:!!(ze&&ze.matches)}function za(){return{topbar:!(window.parent!==window),haptic(e){try{let t=window.parent;t!==window&&t.dispatchEvent(new t.CustomEvent("haptic",{detail:e}))}catch{}},openInHA(e){try{let t=window.parent;if(t!==window&&t.document){t.history.pushState(null,"",e),t.dispatchEvent(new t.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(e,"_top")}}}async function Pa(r){let e=new URL("ws",location.href);e.protocol=location.protocol==="https:"?"wss:":"ws:";let t=null,s=d=>{t={...t,...d},r(t)},a=new Vt(e.href,d=>t&&s({connected:d})),i=await a.sendMessagePromise({type:"resolvia/bootstrap"}),o=qa();t={states:i.states||{},entities:i.entities||{},devices:i.devices||{},user:{name:o&&o.user&&o.user.name||i.user&&i.user.name||"",is_admin:o&&o.user?!!o.user.is_admin:!0},themes:{darkMode:Oa()},language:"pt-BR",connected:!0,version:i.version,resolvia:{ai:i.ai||{ready:!1,images:!1,entities:[]},aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:(d=!1)=>a.sendMessagePromise({type:"resolvia/voice/status",...d?{fresh:!0}:{}}),async voiceText(d){let n=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:d.buffer.slice(d.byteOffset,d.byteOffset+d.byteLength)}),p=await n.json().catch(()=>({}));if(!n.ok){let u=new Error(p.error||`Erro ${n.status}`);throw u.code=p.code,u}return p},async extract(d){let n=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(d)}),p=await n.json().catch(()=>({}));if(!n.ok){let u=new Error(p.error||`Erro ${n.status}`);throw u.code=p.code,u}return p},report:d=>new URL(`relatorio?${d}`,location.href).href,data:{url:d=>new URL(`api/export/${d}`,location.href).href,async import(d){let n=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(d.name||"")},body:d}),p=await n.json().catch(()=>({}));if(!n.ok)throw new Error(p.error||`Erro ${n.status}`);return p},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:d=>a.sendMessagePromise({type:"resolvia/versions/restore",name:d}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:d=>a.sendMessagePromise({type:"resolvia/backups/restore",name:d})}},connection:a,callWS:d=>a.sendMessagePromise(d),callService:(d,n,p,u)=>a.sendMessagePromise({type:"call_service",domain:d,service:n,service_data:p||{},target:u})},a.subscribeMessage(d=>{let n={...t.states};d.new_state?n[d.entity_id]=d.new_state:delete n[d.entity_id],s({states:n})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let d=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:d.states||{},entities:d.entities||{},devices:d.devices||{}})}catch{}});let c=()=>{let d=Oa();t&&d!==t.themes.darkMode&&s({themes:{...t.themes,darkMode:d}})};return setInterval(c,1500),ze&&ze.addEventListener&&ze.addEventListener("change",c),t}var Ut=document.getElementById("app"),ye=document.createElement("resolvia-panel");ye.env=za();ye.narrow=window.innerWidth<870;window.addEventListener("resize",()=>ye.narrow=window.innerWidth<870);Pa(r=>{ye.hass=r}).then(r=>{ye.hass=r,Ut.replaceChildren(ye)}).catch(r=>{Ut.innerHTML="";let e=document.createElement("div");e.id="boot",e.textContent=`N\xE3o consegui iniciar o ResolvIA: ${r.message}. Recarregue a p\xE1gina.`,Ut.appendChild(e)});})();
