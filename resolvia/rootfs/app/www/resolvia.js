/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{(()=>{if(typeof window>"u"||window.__selectSheet)return;let o=window.__selectSheet={theme:null,icon:null,isOpen:()=>!!e},e=null,t=0,s=null,a=`
select:not([multiple]){pointer-events:none}
.ss-wrap{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-end;justify-content:center;font-family:var(--ss-font);-webkit-tap-highlight-color:transparent}
dialog.ss-wrap{width:auto;height:auto;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;color:inherit;overflow:visible}
dialog.ss-wrap::backdrop{background:transparent}
.ss-back{position:absolute;inset:0;background:var(--ss-scrim);opacity:0;transition:opacity .18s}
.ss-sheet{position:relative;width:100%;max-width:560px;max-height:min(72vh,640px);display:flex;flex-direction:column;background:var(--ss-bg);color:var(--ss-fg);border-radius:28px 28px 0 0;box-shadow:0 -8px 32px rgba(0,0,0,.25);transform:translateY(100%);transition:transform .2s cubic-bezier(.2,.8,.2,1);padding-bottom:env(safe-area-inset-bottom)}
.ss-wrap.out{pointer-events:none}
.ss-wrap.in .ss-back{opacity:1}
.ss-wrap.in .ss-sheet{transform:none}
.ss-grab{width:40px;height:4px;border-radius:2px;background:var(--ss-line2);margin:10px auto 2px;flex:none}
.ss-head{display:flex;align-items:center;gap:10px;padding:6px 10px 8px 16px;flex:none}
.ss-ic{display:grid;place-items:center;flex:none;width:32px;height:32px;border-radius:9px;background:var(--ss-soft);color:var(--ss-a)}
.ss-ic svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
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
`,i='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',r='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',l='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',c=()=>{if(document.getElementById("ss-css"))return;let v=document.createElement("style");v.id="ss-css",v.textContent=a,(document.head||document.documentElement).appendChild(v)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();let d=v=>v.parentNode&&v.parentNode.host&&v.parentNode.nodeType===11?v.parentNode.host:v.parentNode||(v.host?v.host:null),h=v=>{let $=/rgba?\(([^)]+)\)/.exec(v||"");if(!$)return null;let S=$[1].split(/[ ,/]+/).filter(Boolean).map(Number);return{r:S[0],g:S[1],b:S[2],a:S.length>3?S[3]:1}},p=({r:v,g:$,b:S})=>(.2126*v+.7152*$+.0722*S)/255,f=(v,$)=>{let S=h(v)||(/^#([0-9a-f]{6})$/i.test(v)?{r:parseInt(v.slice(1,3),16),g:parseInt(v.slice(3,5),16),b:parseInt(v.slice(5,7),16)}:{r:100,g:160,b:240});return`rgba(${S.r},${S.g},${S.b},${$})`};function g(v){let $=getComputedStyle(v),S=P=>{for(let B of P){let q=$.getPropertyValue(B).trim();if(q)return q}return""},I=null;for(let P=v;P&&P.nodeType===1;P=d(P)){let B=h(getComputedStyle(P).backgroundColor);if(B&&B.a>.5){I=p(B)<.45;break}}I===null&&(I=!!(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches));let R=o.theme&&o.theme()||{};I=R.dark??I;let z=R.accent||S(["--rv-accent","--a","--accent","--cor"])||"#64b5f6",L=R.bg||S(["--rv-surface","--surface","--card"]),K=R.fg||S(["--rv-text","--text","--fg","--ink"]),U=R.muted||S(["--rv-muted","--muted","--mut"]);return{"--ss-bg":L||(I?"#1b2229":"#ffffff"),"--ss-fg":K||(I?"#e8edf3":"#141a22"),"--ss-mut":U||(I?"#9aa6b4":"#5b6573"),"--ss-line2":I?"rgba(255,255,255,.18)":"rgba(0,0,0,.14)","--ss-a":z,"--ss-soft":f(z,I?.22:.16),"--ss-soft2":I?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)","--ss-scrim":S(["--rv-scrim","--scrim"])||"rgba(0,0,0,.45)","--ss-font":$.fontFamily||"system-ui, sans-serif"}}function w(v){let $=v.getAttribute("aria-label");if($)return $;let S=v.getRootNode(),I=v.getAttribute("aria-labelledby");if(I&&S.getElementById){let z=I.split(/\s+/).map(L=>(S.getElementById(L)||{}).textContent||"").join(" ").trim();if(z)return z}if(v.id&&S.querySelector){let z=S.querySelector(`label[for="${CSS.escape(v.id)}"]`);if(z)return z.textContent.trim()}let R=v.closest("label, .field");if(R){let z=R.querySelector(".flabel, .label, legend, b, span");if(z&&!z.contains(v))return z.textContent.trim()}return""}function b(v){try{let z=o.icon&&o.icon(v);if(z)return z}catch{}let $=v.getRootNode(),S=[],I=v.getAttribute("aria-labelledby");I&&$.getElementById&&I.split(/\s+/).forEach(z=>S.push($.getElementById(z))),v.id&&$.querySelector&&S.push($.querySelector(`label[for="${CSS.escape(v.id)}"]`));let R=v.closest("label, .field, .campo");R&&S.push(R.querySelector("label, .lbl, .flabel, .label, legend, b, span"));for(let z of S){let L=z&&!z.contains(v)&&z.querySelector("svg");if(L)return L.outerHTML}return l}function k(v){let $=v.closest?v.closest("dialog"):null;if(!$||!$.open)return!1;try{return $.matches(":modal")}catch{return!0}}function y(v){if(e||!v||v.disabled||v.multiple)return;let $=k(v),S=document.createElement($?"dialog":"div");S.className="ss-wrap";for(let[P,B]of Object.entries(g(v)))S.style.setProperty(P,B);let I=w(v),R=document.createElement("div");R.className="ss-sheet",R.setAttribute("role","dialog"),R.setAttribute("aria-modal","true"),I&&R.setAttribute("aria-label",I),R.innerHTML=`<div class="ss-grab"></div><div class="ss-head"><span class="ss-ic" aria-hidden="true">${b(v)}</span><b></b><button type="button" class="ss-x" aria-label="Fechar">${i}</button></div><div class="ss-list" role="listbox"></div>`,R.querySelector(".ss-head b").textContent=I;let z=R.querySelector(".ss-list"),L=null,K=P=>{let B=document.createElement("button");B.type="button",B.className=`ss-opt${P.selected?" on":""}`,B.setAttribute("role","option"),B.setAttribute("aria-selected",P.selected?"true":"false"),B.disabled=P.disabled,B.innerHTML=`<span></span>${r}`,B.firstChild.textContent=P.label||P.textContent,B.addEventListener("click",()=>_(P.value)),P.selected&&(L=B),z.appendChild(B)};for(let P of v.children)if(P.tagName==="OPTGROUP"){let B=document.createElement("div");B.className="ss-group",B.textContent=P.label,z.appendChild(B);for(let q of P.children)q.tagName==="OPTION"&&!q.hidden&&K(q)}else P.tagName==="OPTION"&&!P.hidden&&K(P);let U=document.createElement("div");if(U.className="ss-back",S.append(U,R),document.body.appendChild(S),e={sel:v,wrap:S,pending:null,closing:!1},$){try{S.showModal()}catch{}S.addEventListener("cancel",P=>{P.preventDefault(),x()})}U.addEventListener("click",()=>x()),R.querySelector(".ss-x").addEventListener("click",()=>x()),S.addEventListener("keydown",P=>{if(P.key==="Escape")P.preventDefault(),P.stopPropagation(),x();else if(P.key==="ArrowDown"||P.key==="ArrowUp"){let B=[...z.querySelectorAll(".ss-opt:not(:disabled)")],q=B.indexOf(document.activeElement),X=B[Math.max(0,Math.min(B.length-1,q+(P.key==="ArrowDown"?1:-1)))];X&&(P.preventDefault(),X.focus())}});try{history.pushState(history.state,"")}catch{}requestAnimationFrame(()=>{S.classList.add("in"),L?(L.scrollIntoView({block:"center"}),L.focus({preventScroll:!0})):R.querySelector(".ss-x").focus({preventScroll:!0})})}function x(v=null){if(!e||e.closing)return;e.closing=!0,e.pending=v;let $=e,S=()=>{if(e!==$)return;e=null,$.wrap.open&&$.wrap.close(),$.wrap.classList.remove("in"),$.wrap.classList.add("out"),setTimeout(()=>$.wrap.remove(),220);let I=$.sel;$.pending!==null&&I.value!==$.pending&&(I.value=$.pending,I.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),I.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));try{I.focus({preventScroll:!0})}catch{}};if($.finish=S,$.byBack)return S();history.back(),setTimeout(S,400)}let _=v=>x(v);window.addEventListener("popstate",v=>{if(e){if(v.stopImmediatePropagation(),e.closing)return e.finish&&e.finish();e.byBack=!0,x()}});function A(v){let $=v.composedPath?v.composedPath():[v.target],S=$[0];if(S&&S.tagName==="SELECT")return S;if(typeof v.clientX!="number")return null;for(let I of $.slice(0,6)){if(!I||I.nodeType!==1||I===document.body||I===document.documentElement)break;for(let R of I.querySelectorAll("select")){if(R.disabled||R.multiple)continue;let z=R.getBoundingClientRect();if(z.width&&v.clientX>=z.left&&v.clientX<=z.right&&v.clientY>=z.top&&v.clientY<=z.bottom&&T(R,v.clientX,v.clientY))return R}}return null}function T(v,$,S){let I=v.style.getPropertyValue("pointer-events");v.style.setProperty("pointer-events","auto","important");let R=null;try{let z=v.getRootNode();R=(z.elementFromPoint?z:document).elementFromPoint($,S)}catch{}return I?v.style.setProperty("pointer-events",I):v.style.removeProperty("pointer-events"),R===v}let E=v=>{let $=v.composedPath?v.composedPath()[0]:v.target;return $&&$.tagName==="SELECT"&&!$.disabled&&!$.multiple?$:null};window.addEventListener("touchstart",v=>{let $=v.touches[0];s=$?{x:$.clientX,y:$.clientY}:null},{capture:!0,passive:!0}),window.addEventListener("touchend",v=>{let $=E(v);if(!$||e)return;let S=v.changedTouches[0];s&&S&&Math.hypot(S.clientX-s.x,S.clientY-s.y)>10||(v.preventDefault(),t=Date.now(),y($))},{capture:!0,passive:!1}),window.addEventListener("mousedown",v=>{E(v)&&v.preventDefault()},!0),window.addEventListener("click",v=>{if(e)return;let $=A(v);$&&(v.preventDefault(),v.stopPropagation(),Date.now()-t>600&&y($))},!0),window.addEventListener("keydown",v=>{let $=E(v);!$||e||(v.key==="Enter"||v.key===" "||v.key==="F4"||v.altKey&&(v.key==="ArrowDown"||v.key==="ArrowUp"))&&(v.preventDefault(),y($))},!0),o.open=y,o.close=()=>x()})();(()=>{if(window.__textareas)return;let o=()=>`textareas:${(document.title||"app").split(/[·|-]/)[0].trim()}:`,e=p=>p.dataset.size||p.id||p.name||p.getAttribute("aria-label")||p.placeholder||"",t=p=>{try{return Number(localStorage.getItem(o()+p))||0}catch{return 0}},s=(p,f)=>{try{localStorage.setItem(o()+p,String(Math.round(f)))}catch{}},a=new WeakMap,i=typeof ResizeObserver=="function"?new ResizeObserver(p=>p.forEach(({target:f})=>{let g=parseFloat(f.style.height);!g||g===f.__tsSet||(clearTimeout(a.get(f)),a.set(f,setTimeout(()=>{let w=e(f),b=parseFloat(f.style.height);w&&b&&s(w,b),f.__tsSet=b},400)))})):null,r=p=>{if(!(p instanceof HTMLTextAreaElement)||p.dataset.size==="off"||p.__tsDone)return;p.__tsDone=!0,p.style.resize="vertical";let f=e(p),g=f&&t(f);g&&(p.style.height=`${g}px`,p.__tsSet=g),i&&i.observe(p)},l=new WeakSet,c=p=>{!p||p.nodeType!==1||(p.tagName==="TEXTAREA"&&r(p),p.shadowRoot&&d(p.shadowRoot),p.querySelectorAll&&(p.querySelectorAll("textarea").forEach(r),p.querySelectorAll("*").forEach(f=>f.shadowRoot&&d(f.shadowRoot))))};function d(p){l.has(p)||(l.add(p),new MutationObserver(f=>f.forEach(g=>g.addedNodes.forEach(c))).observe(p,{childList:!0,subtree:!0}),p.querySelectorAll("textarea").forEach(r),p.querySelectorAll("*").forEach(f=>f.shadowRoot&&d(f.shadowRoot)))}window.__textareas={fit:r,keyOf:e};let h=()=>d(document.body||document.documentElement);document.body?h():document.addEventListener("DOMContentLoaded",h)})();var gi={prazos:"/prazos",listas:"/minhas-listas"};function cs(o=typeof window>"u"?null:window,e=gi){let t=s=>{let a=new URL(s.location.href),i=e[a.searchParams.get("aba")];return i?(a.searchParams.delete("aba"),s.history.replaceState(s.history.state,"",a.href),i):null};if(!o)return null;try{let s=t(o);if(s)return s;if(o.parent&&o.parent!==o)return t(o.parent)}catch{}return null}var Ke=globalThis,Ot=Ke.ShadowRoot&&(Ke.ShadyCSS===void 0||Ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Tt=Symbol(),ds=new WeakMap,Je=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.i,t=this.t;if(Ot&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ds.get(t)),e===void 0&&((this.i=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ds.set(t,e))}return e}toString(){return this.cssText}},oe=o=>new Je(typeof o=="string"?o:o+"",void 0,Tt),rt=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,a,i)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[i+1],o[0]);return new Je(t,o,Tt)},vi=(o,e)=>{if(Ot)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=Ke.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,o.appendChild(s)}},hs=Ot?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return oe(t)})(o):o,{is:bi,defineProperty:xi,getOwnPropertyDescriptor:_i,getOwnPropertyNames:wi,getOwnPropertySymbols:$i,getPrototypeOf:yi}=Object,nt=globalThis,ps=nt.trustedTypes,ki=ps?ps.emptyScript:"",Ai=nt.reactiveElementPolyfillSupport,Pe=(o,e)=>o,Et={toAttribute(o,e){switch(e){case Boolean:o=o?ki:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},qs=(o,e)=>!bi(o,e),us={attribute:!0,type:String,converter:Et,reflect:!1,useDefault:!1,hasChanged:qs};Symbol.metadata??=Symbol("metadata"),nt.litPropertyMetadata??=new WeakMap;var fe=class extends HTMLElement{static addInitializer(e){this.o(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(e,t=us){if(t.state&&(t.attribute=!1),this.o(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&xi(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:i}=_i(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let l=a?.call(this);i?.call(this,r),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??us}static o(){if(this.hasOwnProperty(Pe("elementProperties")))return;let e=yi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Pe("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(Pe("properties"))){let t=this.properties,s=[...wi(t),...$i(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this.u=new Map;for(let[t,s]of this.elementProperties){let a=this.p(t,s);a!==void 0&&this.u.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(hs(a))}else e!==void 0&&t.push(hs(e));return t}static p(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this.P??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this.P?.delete(e)}$(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this.v=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vi(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.P?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}C(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor.p(e,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:Et).toAttribute(t,s.type);this.m=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this.m=null}}_$AK(e,t){let s=this.constructor,a=s.u.get(e);if(a!==void 0&&this.m!==a){let i=s.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Et;this.m=a;let l=r.fromAttribute(t,i.type);this[a]=l??this.T?.get(a)??l,this.m=null}}requestUpdate(e,t,s,a=!1,i){if(e!==void 0){let r=this.constructor;if(a===!1&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??qs)(i,t)||s.useDefault&&s.reflect&&i===this.T?.get(e)&&!this.hasAttribute(r.p(e,s))))return;this.M(e,t,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(e,t,{useDefault:s,reflect:a,wrapped:i},r){s&&!(this.T??=new Map).has(e)&&(this.T.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this.m!==e&&(this.A??=new Set).add(e))}async k(){this.isUpdatePending=!0;try{await this.S}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,i]of this.v)this[a]=i;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:r}=i,l=this[a];r!==!0||this._$AL.has(a)||l===void 0||this.M(a,void 0,i,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this.P?.forEach(s=>s.hostUpdate?.()),this.update(t)):this.U()}catch(s){throw e=!1,this.U(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this.P?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(e){return!0}update(e){this.A&&=this.A.forEach(t=>this.C(t,this[t])),this.U()}updated(e){}firstUpdated(e){}};fe.elementStyles=[],fe.shadowRootOptions={mode:"open"},fe[Pe("elementProperties")]=new Map,fe[Pe("finalized")]=new Map,Ai?.({ReactiveElement:fe}),(nt.reactiveElementVersions??=[]).push("2.1.2");var It=globalThis,ms=o=>o,Xe=It.trustedTypes,fs=Xe?Xe.createPolicy("lit-html",{createHTML:o=>o}):void 0,zt="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,Rt="?"+pe,Si=`<${Rt}>`,$e=document,Le=()=>$e.createComment(""),Fe=o=>o===null||typeof o!="object"&&typeof o!="function",Pt=Array.isArray,Cs=o=>Pt(o)||typeof o?.[Symbol.iterator]=="function",At=`[ 	
\f\r]`,Re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gs=/-->/g,vs=/>/g,_e=RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bs=/'/g,xs=/"/g,Os=/^(?:script|style|textarea|title)$/i,Dt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=Dt(1),Mi=Dt(2),Po=Dt(3),W=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),_s=new WeakMap,we=$e.createTreeWalker($e,129);function Ts(o,e){if(!Pt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return fs!==void 0?fs.createHTML(e):e}var Is=(o,e)=>{let t=o.length-1,s=[],a,i=e===2?"<svg>":e===3?"<math>":"",r=Re;for(let l=0;l<t;l++){let c=o[l],d,h,p=-1,f=0;for(;f<c.length&&(r.lastIndex=f,h=r.exec(c),h!==null);)f=r.lastIndex,r===Re?h[1]==="!--"?r=gs:h[1]!==void 0?r=vs:h[2]!==void 0?(Os.test(h[2])&&(a=RegExp("</"+h[2],"g")),r=_e):h[3]!==void 0&&(r=_e):r===_e?h[0]===">"?(r=a??Re,p=-1):h[1]===void 0?p=-2:(p=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?_e:h[3]==='"'?xs:bs):r===xs||r===bs?r=_e:r===gs||r===vs?r=Re:(r=_e,a=void 0);let g=r===_e&&o[l+1].startsWith("/>")?" ":"";i+=r===Re?c+Si:p>=0?(s.push(d),c.slice(0,p)+zt+c.slice(p)+pe+g):c+pe+(p===-2?l:g)}return[Ts(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Ne=class o{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,r=0,l=e.length-1,c=this.parts,[d,h]=Is(e,t);if(this.el=o.createElement(d,s),we.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=we.nextNode())!==null&&c.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(zt)){let f=h[r++],g=a.getAttribute(p).split(pe),w=/([.?@])?(.*)/.exec(f);c.push({type:1,index:i,name:w[2],strings:g,ctor:w[1]==="."?Ge:w[1]==="?"?Ze:w[1]==="@"?et:ke}),a.removeAttribute(p)}else p.startsWith(pe)&&(c.push({type:6,index:i}),a.removeAttribute(p));if(Os.test(a.tagName)){let p=a.textContent.split(pe),f=p.length-1;if(f>0){a.textContent=Xe?Xe.emptyScript:"";for(let g=0;g<f;g++)a.append(p[g],Le()),we.nextNode(),c.push({type:2,index:++i});a.append(p[f],Le())}}}else if(a.nodeType===8)if(a.data===Rt)c.push({type:2,index:i});else{let p=-1;for(;(p=a.data.indexOf(pe,p+1))!==-1;)c.push({type:7,index:i}),p+=pe.length-1}i++}}static createElement(e,t){let s=$e.createElement("template");return s.innerHTML=e,s}};function ye(o,e,t=o,s){if(e===W)return e;let a=s!==void 0?t.N?.[s]:t.O,i=Fe(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(o),a._$AT(o,t,s)),s!==void 0?(t.N??=[])[s]=a:t.O=a),a!==void 0&&(e=ye(o,a._$AS(o,e.values),a,s)),e}var Qe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??$e).importNode(t,!0);we.currentNode=a;let i=we.nextNode(),r=0,l=0,c=s[0];for(;c!==void 0;){if(r===c.index){let d;c.type===2?d=new lt(i,i.nextSibling,this,e):c.type===1?d=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(d=new tt(i,this,e)),this._$AV.push(d),c=s[++l]}r!==c?.index&&(i=we.nextNode(),r++)}return we.currentNode=$e,a}V(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},lt=class zs{get _$AU(){return this._$AM?._$AU??this.D}constructor(e,t,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ye(this,e,t),Fe(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==W&&this.L(e):e._$litType$!==void 0?this.j(e):e.nodeType!==void 0?this.I(e):Cs(e)?this.H(e):this.L(e)}B(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}I(e){this._$AH!==e&&(this._$AR(),this._$AH=this.B(e))}L(e){this._$AH!==u&&Fe(this._$AH)?this._$AA.nextSibling.data=e:this.I($e.createTextNode(e)),this._$AH=e}j(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ne.createElement(Ts(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(t);else{let i=new Qe(a,this),r=i.R(this.options);i.V(t),this.I(r),this._$AH=i}}_$AC(e){let t=_s.get(e.strings);return t===void 0&&_s.set(e.strings,t=new Ne(e)),t}H(e){Pt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let i of e)a===t.length?t.push(s=new zs(this.B(Le()),this.B(Le()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ms(e).nextSibling;ms(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this.D=e,this._$AP?.(e))}},ke=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,a){let i=this.strings,r=!1;if(i===void 0)e=ye(this,e,t,0),r=!Fe(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{let l=e,c,d;for(e=i[0],c=0;c<i.length-1;c++)d=ye(this,l[s+c],t,c),d===W&&(d=this._$AH[c]),r||=!Fe(d)||d!==this._$AH[c],d===u?e=u:e!==u&&(e+=(d??"")+i[c+1]),this._$AH[c]=d}r&&!a&&this.W(e)}W(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ge=class extends ke{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===u?void 0:e}},Ze=class extends ke{constructor(){super(...arguments),this.type=4}W(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},et=class extends ke{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=ye(this,e,t,0)??u)===W)return;let s=this._$AH,a=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},tt=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){ye(this,e)}},Ei={q:zt,J:pe,Z:Rt,F:1,G:Is,K:Qe,X:Cs,Y:ye,tt:lt,st:ke,it:Ze,et,ht:Ge,ot:tt},qi=It.litHtmlPolyfillSupport;qi?.(Ne,lt),(It.litHtmlVersions??=[]).push("3.3.3");var Rs=(o,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let i=t?.renderBefore??null;s._$litPart$=a=new lt(e.insertBefore(Le(),i),i,void 0,t??{})}return a._$AI(o),a},Lt=globalThis;var ve=class extends fe{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.rt=Rs(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return W}};ve._$litElement$=!0,ve.finalized=!0,Lt.litElementHydrateSupport?.({LitElement:ve});var Ci=Lt.litElementPolyfillSupport;Ci?.({LitElement:ve});(Lt.litElementVersions??=[]).push("4.2.2");var{tt:Oi}=Ei,ws=o=>o,Ti=o=>o===null||typeof o!="object"&&typeof o!="function";var $s=(o,e)=>e===void 0?o?._$litType$!==void 0:o?._$litType$===e,Ii=o=>o?._$litType$?.h!=null;var Ps=o=>o.strings===void 0,ys=()=>document.createComment(""),ge=(o,e,t)=>{let s=o._$AA.parentNode,a=e===void 0?o._$AB:e._$AA;if(t===void 0){let i=s.insertBefore(ys(),a),r=s.insertBefore(ys(),a);t=new Oi(i,r,o,o.options)}else{let i=t._$AB.nextSibling,r=t._$AM,l=r!==o;if(l){let c;t._$AQ?.(o),t._$AM=o,t._$AP!==void 0&&(c=o._$AU)!==r._$AU&&t._$AP(c)}if(i!==a||l){let c=t._$AA;for(;c!==i;){let d=ws(c).nextSibling;ws(s).insertBefore(c,a),c=d}}}return t},me=(o,e,t=o)=>(o._$AI(e,t),o),zi={},He=(o,e=zi)=>o._$AH=e,qt=o=>o._$AH,St=o=>{o._$AR(),o._$AA.remove()},Ds=o=>{o._$AR()};var G=o=>(...e)=>({_$litDirective$:o,values:e}),ee=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this.nt=e,this._$AM=t,this.ct=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var De=(o,e)=>{let t=o._$AN;if(t===void 0)return!1;for(let s of t)s._$AO?.(e,!1),De(s,e);return!0},st=o=>{let e,t;do{if((e=o._$AM)===void 0)break;t=e._$AN,t.delete(o),o=e}while(t?.size===0)},Ls=o=>{for(let e;e=o._$AM;o=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(o))break;t.add(o),Di(e)}};function Ri(o){this._$AN!==void 0?(st(this),this._$AM=o,Ls(this)):this._$AM=o}function Pi(o,e=!1,t=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(e)if(Array.isArray(s))for(let i=t;i<s.length;i++)De(s[i],!1),st(s[i]);else s!=null&&(De(s,!1),st(s));else De(this,o)}var Di=o=>{o.type==2&&(o._$AP??=Pi,o._$AQ??=Ri)},Be=class extends ee{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),Ls(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(De(this,e),st(this))}setValue(e){if(Ps(this.nt))this.nt._$AI(e,this);else{let t=[...this.nt._$AH];t[this.ct]=e,this.nt._$AI(t,this,0)}}disconnected(){}reconnected(){}};var at=class{constructor(e){this.lt=e}disconnect(){this.lt=void 0}reconnect(e){this.lt=e}deref(){return this.lt}},it=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(e=>this.dt=e)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var ot=class extends Be{constructor(){super(...arguments),this.ft=new at(this),this.vt=new it}render(e,t){return W}update(e,[t,s]){if(this.isConnected||this.disconnected(),t===this.yt)return W;this.yt=t;let a=0,{ft:i,vt:r}=this;return(async(l,c)=>{for await(let d of l)if(await c(d)===!1)return})(t,async l=>{for(;r.get();)await r.get();let c=i.deref();if(c!==void 0){if(c.yt!==t)return!1;s!==void 0&&(l=s(l,a)),c.commitValue(l,a),a++}return!0}),W}commitValue(e,t){this.setValue(e)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Do=G(ot),Lo=G(class extends ot{constructor(o){if(super(o),o.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(o,e){return this.rt=o,super.update(o,e)}commitValue(o,e){e===0&&Ds(this.rt);let t=ge(this.rt);me(t,o)}}),ks=o=>Ii(o)?o._$litType$.h:o.strings,Fo=G(class extends ee{constructor(o){super(o),this.bt=new WeakMap}render(o){return[o]}update(o,[e]){let t=$s(this.gt)?ks(this.gt):null,s=$s(e)?ks(e):null;if(t!==null&&(s===null||t!==s)){let a=qt(o).pop(),i=this.bt.get(t);if(i===void 0){let r=document.createDocumentFragment();i=Rs(u,r),i.setConnected(!1),this.bt.set(t,i)}He(i,[a]),ge(i,void 0,a)}if(s!==null){if(t===null||t!==s){let a=this.bt.get(s);if(a!==void 0){let i=qt(a).pop();Ds(o),ge(o,void 0,i),He(o,[i])}}this.gt=e}else this.gt=void 0;return this.render(e)}});var No=G(class extends ee{constructor(o){if(super(o),o.type!==1||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){if(this.wt===void 0){this.wt=new Set,o.strings!==void 0&&(this._t=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in e)e[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(e)}let t=o.element.classList;for(let s of this.wt)s in e||(t.remove(s),this.wt.delete(s));for(let s in e){let a=!!e[s];a===this.wt.has(s)||this._t?.has(s)||(a?(t.add(s),this.wt.add(s)):(t.remove(s),this.wt.delete(s)))}return W}}),Li={},Ho=G(class extends ee{constructor(){super(...arguments),this.St=Li}render(o,e){return e()}update(o,[e,t]){if(Array.isArray(e)){if(Array.isArray(this.St)&&this.St.length===e.length&&e.every((s,a)=>s===this.St[a]))return W}else if(this.St===e)return W;return this.St=Array.isArray(e)?Array.from(e):e,this.render(e,t)}});var Bo=G(class extends ee{constructor(){super(...arguments),this.key=u}render(o,e){return this.key=o,e}update(o,[e,t]){return e!==this.key&&(He(o),this.key=e),t}}),Fs=G(class extends ee{constructor(o){if(super(o),o.type!==3&&o.type!==1&&o.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ps(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===W||e===u)return e;let t=o.element,s=o.name;if(o.type===3){if(e===t[s])return W}else if(o.type===4){if(!!e===t.hasAttribute(s))return W}else if(o.type===1&&t.getAttribute(s)===e+"")return W;return He(o),e}});var Mt=new WeakMap,Vo=G(class extends Be{render(o){return u}update(o,[e]){let t=e!==this.lt;return t&&this.$t(void 0),(t||this.Tt!==this.xt)&&(this.lt=e,this.Et=o.options?.host,this.$t(this.xt=o.element)),u}$t(o){if(this.lt!==void 0)if(this.isConnected||(o=void 0),typeof this.lt=="function"){let e=this.Et??globalThis,t=Mt.get(e);t===void 0&&(t=new WeakMap,Mt.set(e,t)),t.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),t.set(this.lt,o),o!==void 0&&this.lt.call(this.Et,o)}else this.lt.value=o}get Tt(){return typeof this.lt=="function"?Mt.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),As=(o,e,t)=>{let s=new Map;for(let a=e;a<=t;a++)s.set(o[a],a);return s},re=G(class extends ee{constructor(o){if(super(o),o.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(o,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let a=[],i=[],r=0;for(let l of o)a[r]=s?s(l,r):r,i[r]=t(l,r),r++;return{values:i,keys:a}}render(o,e,t){return this.Ct(o,e,t).values}update(o,[e,t,s]){let a=qt(o),{values:i,keys:r}=this.Ct(e,t,s);if(!Array.isArray(a))return this.Pt=r,i;let l=this.Pt??=[],c=[],d,h,p=0,f=a.length-1,g=0,w=i.length-1;for(;p<=f&&g<=w;)if(a[p]===null)p++;else if(a[f]===null)f--;else if(l[p]===r[g])c[g]=me(a[p],i[g]),p++,g++;else if(l[f]===r[w])c[w]=me(a[f],i[w]),f--,w--;else if(l[p]===r[w])c[w]=me(a[p],i[w]),ge(o,c[w+1],a[p]),p++,w--;else if(l[f]===r[g])c[g]=me(a[f],i[g]),ge(o,a[p],a[f]),f--,g++;else if(d===void 0&&(d=As(r,g,w),h=As(l,p,f)),d.has(l[p]))if(d.has(l[f])){let b=h.get(r[g]),k=b!==void 0?a[b]:null;if(k===null){let y=ge(o,a[p]);me(y,i[g]),c[g]=y}else c[g]=me(k,i[g]),ge(o,a[p],k),a[b]=null;g++}else St(a[f]),f--;else St(a[p]),p++;for(;g<=w;){let b=ge(o,c[w+1]);me(b,i[g]),c[g++]=b}for(;p<=f;){let b=a[p++];b!==null&&St(b)}return this.Pt=r,He(o,c),W}}),Ns="important",Fi=" !"+Ns,jo=G(class extends ee{constructor(o){if(super(o),o.type!==1||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((e,t)=>{let s=o[t];return s==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(o,[e]){let{style:t}=o.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(e)),this.render(e);for(let s of this.Mt)e[s]==null&&(this.Mt.delete(s),s.includes("-")?t.removeProperty(s):t[s]=null);for(let s in e){let a=e[s];if(a!=null){this.Mt.add(s);let i=typeof a=="string"&&a.endsWith(Fi);s.includes("-")||i?t.setProperty(s,i?a.slice(0,-11):a,i?Ns:""):t[s]=a}}return W}}),Uo=G(class extends ee{constructor(o){if(super(o),o.type!==2)throw Error("templateContent can only be used in child bindings")}render(o){return this.At===o?W:(this.At=o,document.importNode(o.content,!0))}}),Ce=class extends ee{constructor(e){if(super(e),this.gt=u,e.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this.kt=void 0,this.gt=e;if(e===W)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.gt)return this.kt;this.gt=e;let t=[e];return t.raw=t,this.kt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Ce.directiveName="unsafeHTML",Ce.resultType=1;var Wo=G(Ce);var Ve=class extends Ce{};Ve.directiveName="unsafeSVG",Ve.resultType=2;var Y=G(Ve),Ss=o=>!Ti(o)&&typeof o.then=="function",Ms=1073741823;var Ct=class extends Be{constructor(){super(...arguments),this.Ot=Ms,this.Ut=[],this.ft=new at(this),this.vt=new it}render(...e){return e.find(t=>!Ss(t))??W}update(e,t){let s=this.Ut,a=s.length;this.Ut=t;let i=this.ft,r=this.vt;this.isConnected||this.disconnected();for(let l=0;l<t.length&&!(l>this.Ot);l++){let c=t[l];if(!Ss(c))return this.Ot=l,c;l<a&&c===s[l]||(this.Ot=Ms,a=0,Promise.resolve(c).then(async d=>{for(;r.get();)await r.get();let h=i.deref();if(h!==void 0){let p=h.Ut.indexOf(c);p>-1&&p<h.Ot&&(h.Ot=p,h.setValue(d))}}))}return W}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Yo=G(Ct);var Ni=Symbol.for(""),Hi=o=>{if(o?.r===Ni)return o?._$litStatic$};var Es=new Map,Hs=o=>(e,...t)=>{let s=t.length,a,i,r=[],l=[],c,d=0,h=!1;for(;d<s;){for(c=e[d];d<s&&(i=t[d],(a=Hi(i))!==void 0);)c+=a+e[++d],h=!0;d!==s&&l.push(i),r.push(c),d++}if(d===s&&r.push(e[s]),h){let p=r.join("$$lit$$");(e=Es.get(p))===void 0&&(r.raw=r,Es.set(p,e=r)),t=l}return o(e,...t)},Ko=Hs(n),Jo=Hs(Mi);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var N={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',copy:'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-bar":'<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 16h8" /><path d="M7 11h12" /><path d="M7 6h3" />',"calendar-off":'<path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" /><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" /><path d="M16 2v4" /><path d="M3 10h7" /><path d="M21 10h-5.5" /><path d="m2 2 20 20" />',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',"chevron-up":'<path d="m18 15-6-6-6 6"/>',sunrise:'<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',ban:'<circle cx="12" cy="12" r="10"/><path d="M4.929 4.929 19.07 19.071"/>',paperclip:'<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>',"file-text":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',"door-open":'<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>',"hard-hat":'<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',"message-circle":'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />',layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',receipt:'<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>',hourglass:'<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',"user-round":'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'};var Bs="https://github.com/diegozapella63",Bi=[["CronologIA","cronologia-ha","calendar-days","Agenda da fam\xEDlia, rem\xE9dios, rotinas e placar."],["ResolvIA","resolvia-ha","list-checks","Listas de tarefas com prazos, pontos e repeti\xE7\xE3o."],["GerencIA","gerencia-ha","wallet","Finan\xE7as da casa: caixa, cart\xF5es e investimentos."],["InventarIA","inventario-ha","package","Invent\xE1rio da casa: c\xF4modos, itens e valores."],["EconomIA","economia-ha","receipt","Lista de compras com o melhor pre\xE7o perto de casa."],["MemorIA","memoria-ha","book-open","Cadernos de anota\xE7\xE3o que abrem na hora certa."],["CorrerIA","correria-ha","message-circle","Pergunte e pe\xE7a a qualquer app, no chat ou no WhatsApp."]],Oe=o=>n`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N.info)}</svg>`,Vi=o=>n`<span class="ab-wm">${o.slice(0,-2)}<span>${o.slice(-2)}</span></span>`,Vs=(o,e,t)=>n`<a class=${t} href=${o} target="_blank" rel="noopener">${e}</a>`;function js({app:o,version:e}){return n`<div class="about">
    <div class="about-hero">
      <span class="ab-mark" aria-hidden="true">${Oe("zap")}</span>
      <h2 class="ab-name">Correr<span>IA</span> Code</h2>
      <p class="ab-what">desenvolvimento de softwares</p>
      <p class="ab-tag">Feito na correria, rodado pela IA.</p>
    </div>

    <div class="panel about-why">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${Oe("hourglass")}</span><h2>Por que CorrerIA?</h2></div>
      <p>Porque eu sou um programador sem tempo: vivo na correria. Então eu uso a IA para rodar tudo isso aqui. Ela escreve, testa e publica; eu dou as ideias e reclamo dos botões tortos.</p>
    </div>

    <div class="panel">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${Oe("layers")}</span><h2>Os apps</h2></div>
      <ul class="about-apps" aria-label="Os apps">
        ${Bi.map(([t,s,a,i])=>n`<li>
            ${Vs(`${Bs}/${s}`,n`<span class="mais-ic" aria-hidden="true">${Oe(a)}</span>
                <span class="mb"><b class="ab-app">${Vi(t)}${t===o?n`<em class="ab-here">Este app · v${e}</em>`:""}</b><span>${i}</span></span>
                ${Oe("external-link")}`,`ab-row${t===o?" here":""}`)}
          </li>`)}
      </ul>
    </div>

    ${Vs(Bs,n`${Oe("external-link")}Meu GitHub`,"btn primary ab-github")}
  </div>`}var Us=rt`
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
`;var Ws="./fonts/barlow-400.woff2";var Ys="./fonts/barlow-500.woff2";var Ks="./fonts/barlow-600.woff2";var Js="./fonts/barlow-condensed-500.woff2";var Xs="./fonts/barlow-condensed-600.woff2";var Qs="./fonts/barlow-condensed-700.woff2";var Gs='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',Zs=`"RV Barlow", ${Gs}`,ea=`"RV Barlow Condensed", ${Gs}`;function ta(){if(document.getElementById("resolvia-fonts"))return;let o=(t,s,a)=>`@font-face{font-family:"${t}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,e=document.createElement("style");e.id="resolvia-fonts",e.textContent=[o("RV Barlow",Ws,400),o("RV Barlow",Ys,500),o("RV Barlow",Ks,"600 900"),o("RV Barlow Condensed",Js,500),o("RV Barlow Condensed",Xs,600),o("RV Barlow Condensed",Qs,"700 900")].join(`
`),document.head.appendChild(e)}var Ft=()=>n`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var Xi="(min-width: 1000px)";function sa(o,e=""){if(!o.touches||o.touches.length!==1||window.matchMedia&&window.matchMedia(Xi).matches)return null;let t=o.touches[0];if(t.clientX<24||t.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${e?`, ${e}`:""}`;for(let a of o.composedPath()){if(a===o.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let i=getComputedStyle(a);if((i.overflowX==="auto"||i.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:t.clientX,y:t.clientY,at:Date.now()}}function aa(o,e){if(!e||!o.changedTouches||!o.changedTouches.length)return 0;let t=o.changedTouches[0],s=t.clientX-e.x,a=t.clientY-e.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-e.at>800?0:s<0?1:-1}async function ct(o,e,t){for(let a=0;a<30&&o._view().name!==e;a++)await new Promise(i=>setTimeout(i,16));await o.updateComplete;let s=o.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${t>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var ia=rt`
  :host {
    --rv-body: ${oe(Zs)};
    --rv-display: ${oe(ea)};
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
  textarea,
  select {
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
  .mais-ic.late {
    background: var(--rv-late-soft);
    color: var(--rv-late);
  }
  /* Casa ou Bens (2.62.0): before the rooms of an item, two halves of the same size */
  .seg.where {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .seg.where button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .seg.where .i {
    width: 18px;
    height: 18px;
  }
  /* Agora › Ordem dos cards (2.60.0): the line at the end of Agora and the list in the sheet, like the CronologIA */
  .now-order {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 48px;
    padding: 10px 4px 14px;
    color: var(--rv-muted);
    font-weight: 600;
    font-size: 14px;
  }
  .now-order .i {
    width: 18px;
    height: 18px;
  }
  .now-cards {
    list-style: none;
    margin: 0;
    padding: 0 2px;
  }
  .now-cards .row {
    gap: 12px;
    padding: 6px 0;
  }
  .now-cards .row:first-child {
    border-top: 0;
  }
  .now-cards .row.off .label {
    color: var(--rv-muted);
  }
  .now-cards .icon-btn:disabled {
    opacity: 0.3;
  }
  .now-reset {
    width: 100%;
    margin-top: 12px;
  }
  .mais-ic .i {
    width: 21px;
    height: 21px;
    stroke-width: 1.9;
  }
  /* every card with a heading folds: a tap on the heading, the arrow at the end (kept on the device) */
  .panel.dobra > .mais-head {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .panel.dobra > .mais-head::after {
    content: "";
    flex: none;
    width: 20px;
    height: 20px;
    margin-left: auto;
    background: var(--rv-muted);
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 20px no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 20px no-repeat;
    transition: transform 0.2s;
  }
  .panel.dobra > .mais-head:has(> .mh-count)::after {
    margin-left: 0;
  }
  .panel.dobra.fechada > .mais-head::after {
    transform: rotate(-90deg);
  }
  .panel.dobra.fechada > :not(.mais-head) {
    display: none !important;
  }
  .panel.dobra.fechada > .mais-head {
    padding-bottom: 16px;
  }
  /* 2.67.0: the fields of choices of a window fold with a tap on the title (the arrow at the end); closed, only the
     chosen chips (or the chosen equipment) show */
  .sheet .field.dobravel > .flabel {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .sheet .field.dobravel > .flabel::after {
    content: "";
    flex: none;
    width: 18px;
    height: 18px;
    margin-left: auto;
    background: var(--rv-muted);
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
    transition: transform 0.2s;
  }
  .sheet .field.dobravel.shut > .flabel::after {
    transform: rotate(-90deg);
  }
  .sheet .field.dobravel.shut > :not(.flabel) {
    display: none !important;
  }
  .sheet .field.dobravel > .flabel:focus-visible {
    outline: 2px solid var(--rv-accent);
    outline-offset: 2px;
    border-radius: 8px;
  }
  .panel.dobra > .mais-head:focus-visible {
    outline: 2px solid var(--rv-accent);
    outline-offset: 2px;
    border-radius: 10px;
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
  /* Buscar: how many, and Selecionar (2.51.0); selecting: X, how many, Todos/Nenhum */
  .res-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: -8px 2px 12px;
    min-height: 40px;
  }
  .res-head .page-sub {
    margin: 0;
  }
  .res-head .text-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .res-head .text-btn .i {
    width: 18px;
    height: 18px;
  }
  .res-head.sel-head {
    justify-content: flex-start;
  }
  .res-head .res-n {
    flex: 1;
    min-width: 0;
    font-size: 17px;
  }
  .item.selecting.locked {
    cursor: default;
    opacity: 0.55;
  }
  .chip-row.ext-row.bulk-ext {
    grid-template-columns: 1fr 1fr;
  }
  .chip-row.ext-row.bulk-ext .keep {
    grid-column: 1 / -1;
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
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 2px 0;
    background: none;
    border: 0;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: var(--rv-text-2);
    margin: 0 0 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  /* 2.67.0: Incluir folds with a tap (the arrow at the end); closed, only the ones on; open again on each visit */
  .filters-label::after {
    content: "";
    flex: none;
    width: 18px;
    height: 18px;
    margin-left: auto;
    background: var(--rv-muted);
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
    transition: transform 0.2s;
  }
  .filters-label[aria-expanded="false"]::after {
    transform: rotate(-90deg);
  }
  .filters.shut,
  .incluir.shut {
    display: none;
  }
  /* 2.68.0: Incluir › De quem é, a person's lists (with the ones of everyone) */
  .filters-sub {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: -6px 0 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--rv-text-2);
  }
  /* Buscar: the name of each list folds it (2.67.1) */
  .panel > .overline.fold-over {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: none;
    border: 0;
    text-align: left;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .panel > .overline.fold-over::after {
    content: "";
    flex: none;
    width: 18px;
    height: 18px;
    margin-left: auto;
    background: var(--rv-muted);
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
    transition: transform 0.2s;
  }
  .panel > .overline.fold-over[aria-expanded="false"] {
    padding-bottom: 16px;
  }
  .panel > .overline.fold-over[aria-expanded="false"]::after {
    transform: rotate(-90deg);
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

  /* Opções › Prazos › Avisar o que vence hoje, the piece of every app of the family (the model is the GerencIA):
     the time in a box of the app (half to half an hour, no AM/PM) in the first of two equal halves (the second is for
     "A cada", where an app has it), a button for each person of the house (the same size, side by side) and Testar no
     meu celular with the whole width under them */
  .due-alert {
    padding: 4px 0 6px;
  }
  .due-alert .field {
    margin: 10px 0 0;
  }
  .alert-when {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .alert-when > * {
    min-width: 0;
  }
  .due-alert .remind-test {
    width: 100%;
    margin-top: 14px;
  }
  .due-who {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .due-who .dw {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 0;
    min-height: 44px;
    padding: 8px 12px;
    border-radius: 14px;
    border: 1.5px solid var(--rv-line-strong);
    background: var(--rv-surface-2);
    color: var(--rv-text);
    font-size: 15px;
    text-align: center;
  }
  .due-who .dw .i {
    width: 17px;
    height: 17px;
    flex: none;
    color: var(--rv-muted);
  }
  .due-who .dw b {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }
  .due-who .dw span {
    color: var(--rv-muted);
    font-size: 13px;
    white-space: nowrap;
  }
  .due-who .dw.on {
    border-color: var(--rv-accent);
    background: color-mix(in srgb, var(--rv-accent) 16%, var(--rv-surface-2));
  }
  .due-who .dw.on .i {
    color: var(--rv-accent-ink);
  }
  .due-who .dw.off b {
    opacity: 0.75;
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

  /* Outro horário: the box of the times, out of sight (the button opens it in the sheet of selectsheet.js) */
  .time-box {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    clip-path: inset(50%);
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
  /* 2.70.0: Sem cor and Sem ícone, the first choice of each */
  .sw.none {
    background: var(--rv-surface-2);
    color: var(--rv-muted);
    --c: var(--rv-text-2);
  }
  .sw.none .i {
    stroke-width: 2;
    width: 22px;
    height: 22px;
  }
  .side-tile.sem {
    background: none;
  }
  .row .tile.sem {
    background: var(--rv-surface-2);
    box-shadow: inset 0 0 0 1.5px var(--rv-line-strong);
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
  /* Adicionar: only the + (2.61.0, every app of the family): the button stands out already, no text under it */
  .tab.fab {
    color: var(--rv-text);
    font-weight: 600;
    justify-content: center;
  }
  .tab.fab .pill {
    width: 62px;
    height: 44px;
    border-radius: 15px;
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    display: grid;
    place-items: center;
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
  .field input[type="text"] {
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
  /* 2.71.0: o PDF lido (Escolher fotos ou PDF) */
  .thumbs .thumb-pdf {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1px solid var(--rv-line);
    color: var(--rv-accent-ink, var(--rv-accent));
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
  /* the text of each item: all of it, growing with the text (2.63.0: was one line, cut) */
  .imp-row .imp-text {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font: inherit;
    font-size: 16px;
    line-height: 1.35;
    color: var(--rv-text);
    padding: 10px 0;
    resize: none;
    field-sizing: content;
  }
  .imp-row.off .imp-text {
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
    display: inline-flex;
    align-items: center;
    gap: 6px;
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
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--rv-accent);
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 8px;
  }
  :host([dark]) .toast button {
    color: var(--rv-accent-ink-light);
  }
  .toast button .i,
  .cam-done .i {
    width: 18px;
    height: 18px;
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
  /* ---------- IA do Home Assistant ---------- */
  /* Opções › Atalho no celular: the steps and the path with Copiar beside it */
  .shortcut .steps {
    margin: 0 0 14px;
    padding-left: 22px;
    color: var(--rv-text-2);
    font-size: 14px;
    line-height: 1.5;
  }
  .shortcut .steps b {
    color: var(--rv-text);
    font-weight: 600;
  }
  .shortcut .field {
    margin-bottom: 0;
  }
  /* the path on the whole width (never cut, also at 320 px), Copiar under it */
  .copy-row {
    display: grid;
    gap: 8px;
  }
  .copy-row input[type="text"] {
    min-width: 0;
    font-family: ui-monospace, monospace;
    font-size: 14px;
  }
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
    /* a long name ends in "…" before the arrow (the whole name is in the sheet) */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  /* Verificar de novo (IA, Falar, InventarIA): the width of the card on the phone, like the buttons of Dados (2.60.0) */
  .ai-actions:not(.start-acts) .btn {
    flex: 1 1 100%;
    width: 100%;
    min-height: 50px;
  }
  @media (min-width: 1000px) {
    .ai-actions:not(.start-acts) .btn {
      flex: none;
      width: 250px;
    }
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
  /* Nome (n), as in every app of the family */
  .inact-head .label .count {
    color: var(--rv-muted);
    font-variant-numeric: tabular-nums;
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
  /* Dados: the buttons of the family (the GerencIA is the model): the width of the card on the phone (250 px from
     1000 px on), the same height, the icon beside the text; Criar backup full, the others with a border, Apagar tudo red */
  .opts .btn,
  #dados .opts .btn,
  #dados .sec-actions .btn {
    flex: 1 1 100%;
    width: 100%;
    min-height: 50px;
    font-size: 15px;
    padding: 0 18px;
    justify-content: center;
    white-space: nowrap;
  }
  @media (min-width: 1000px) {
    .opts .btn,
    #dados .opts .btn,
    #dados .sec-actions .btn {
      flex: none;
      width: 250px;
    }
  }
  #dados .sec-actions .btn.danger {
    color: var(--rv-late);
    border-color: color-mix(in srgb, var(--rv-late) 55%, transparent);
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
  .tabs-wrap {
    position: sticky;
    top: 0;
    z-index: 4;
    margin: 0 0 14px;
  }
  .more-tabs {
    position: relative;
    margin: 0;
    box-shadow: 0 0 0 6px var(--rv-bg);
  }
  .tabs-fim {
    position: absolute;
    top: 1px;
    bottom: 1px;
    z-index: 1;
    width: 48px;
    display: none;
    align-items: center;
    pointer-events: none;
    color: var(--rv-text);
  }
  .tabs-fim.dir {
    right: 1px;
    justify-content: flex-end;
    padding-right: 6px;
    border-radius: 0 12px 12px 0;
    background: linear-gradient(to right, transparent, var(--rv-surface-2) 62%);
  }
  .tabs-fim.esq {
    left: 1px;
    padding-left: 6px;
    border-radius: 12px 0 0 12px;
    background: linear-gradient(to left, transparent, var(--rv-surface-2) 62%);
  }
  .tabs-fim .i {
    width: 18px;
    height: 18px;
  }
  .tabs-wrap.tem-dir > .tabs-fim.dir,
  .tabs-wrap.tem-esq > .tabs-fim.esq {
    display: flex;
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
    /* the app name is on the sidebar: the header keeps "Olá, Davi" */
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
  /* ---------- one height, the same in every app of the family (50 px): buttons, fields, boxes of choice and the
     choices in buttons (the tabs of Configurações, Tema, the Prazo and the filters). Out of it: the buttons with only
     an icon, the tiles of the AI, the rows of the lists, the switches and the colors. */
  .btn,
  .btn.sm {
    min-height: 50px;
  }
  .select,
  .field input[type="text"],
  .field input.num,
  .search-box {
    min-height: 50px;
  }
  .seg {
    min-height: 50px;
    align-items: stretch;
  }
  .seg button {
    padding-top: 0;
    padding-bottom: 0;
  }
  .pick,
  .chip-row.grid .pick,
  .filters .pick {
    min-height: 50px;
  }
  .chip-row.grid .pick {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  /* Adicionar item…: the box of 50, with the + inside */
  .quick form {
    min-height: 50px;
    padding: 3px 4px 3px 16px;
  }
  .quick input {
    padding: 0;
    align-self: stretch;
  }
  .quick .add-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  /* 2.65.0 (padrão da família): toda linha com título tem o ícone antes dele; entre as opções de uma seção não há linha
     (o ícone marca onde cada uma começa); as listas de dados (com o quadradinho do ícone) continuam com a linha */
  .label:has(> .lbl-ic), .flabel:has(> .lbl-ic) {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lbl-ic {
    flex: none;
    width: 18px;
    height: 18px;
    color: var(--rv-accent-ink, var(--rv-accent));
  }
  .row .grow:has(> .label > .lbl-ic) > .hint {
    padding-left: 26px;
    white-space: normal;
  }
  .panel > .row:not(:has(> .tile)):not(:has(> .em-icon)):not(.inact-head) {
    border-top: 0;
  }
  /* as sub-opções (o estado das Recompensas, a IA do Usar IA, o Horário, o Quem recebe e o Testar do Avisar no
     celular): num quadro recuado, logo abaixo da chave, para ver de qual opção são */
  .sub-op {
    padding: 0 0 14px 26px;
  }
  .sub-box {
    padding: 12px 14px 14px;
    border: 1px solid var(--rv-line);
    border-radius: 14px;
    background: var(--rv-surface-2);
  }
  .sub-box > .ai-state {
    padding: 0;
    background: none;
  }
  .sub-box > .field:first-child,
  .sub-box > .alert-when:first-child .field {
    margin-top: 0;
  }
  .sub-box .steps-box {
    margin-top: 14px;
  }
  @media (max-width: 360px) {
    .sub-op {
      padding-left: 10px;
    }
    .sub-box {
      padding: 10px;
    }
  }
  /* o título de cada tela e de cada janela com o ícone */
  .page-title:has(> .page-ic) {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .page-title > .page-ic {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }
  .page-title > .page-ic .i {
    width: 23px;
    height: 23px;
  }
  .sheet-head h3:has(> .sh-ic) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sh-ic {
    flex: none;
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 9px;
    background: var(--rv-accent-soft);
    color: var(--rv-accent-ink, var(--rv-accent));
  }
  /* os botões de texto (Limpar, Todos, Nenhum, Ver IA…) com o ícone antes */
  .text-btn:has(> .i) {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .text-btn > .i {
    width: 16px;
    height: 16px;
    flex: none;
  }
  .text-btn.inline:has(> .i) {
    display: inline-flex;
    vertical-align: middle;
  }
  .pick > .i + span {
    min-width: 0;
  }
  .sub-box.sensor-list {
    padding: 4px 14px;
  }
  .sub-box.sensor-list > .sensor-row:first-child {
    border-top: 0;
  }
  .sub-box .sensor-row code {
    background: var(--rv-bg);
    overflow-wrap: anywhere;
  }
  .sub-box > .ai-actions {
    margin-top: 12px;
  }
`;var oa=["dom","seg","ter","qua","qui","sex","s\xE1b"],ra={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es",conversa:"Conversa"},na={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},be=o=>String(o).padStart(2,"0"),Nt=o=>`${o.getFullYear()}-${be(o.getMonth()+1)}-${be(o.getDate())}`,dt=o=>{let[e,t,s]=o.split("-").map(Number);return new Date(e,t-1,s)},da=o=>String(Math.round(o*10)/10).replace(".",","),la=o=>o>=1e3?`${da(o/1e3)} mil`:String(Math.round(o||0)),ca=o=>`${o} ${o===1?"chamada":"chamadas"}`,Qi=(o,e={})=>e[o]||(o||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",Gi=(o,e)=>{let t=new Date(o);if(!Number.isFinite(t.getTime()))return"";let s=`${be(t.getHours())}:${be(t.getMinutes())}`;return Nt(t)===Nt(e)?`hoje ${s}`:`${be(t.getDate())}/${be(t.getMonth()+1)} ${s}`};function Zi(o){let e=o.join(" ").toLowerCase();return/google|gemini/.test(e)?n`Consumo exato e cota: <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener">Google Cloud Console</a>.`:/openai|chatgpt|gpt/.test(e)?n`Consumo exato e custo: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener">platform.openai.com/usage</a>.`:/anthropic|claude/.test(e)?n`Consumo exato e custo: <a href="https://platform.claude.com/usage" target="_blank" rel="noopener">Claude Console</a>.`:"O consumo exato fica no painel do provedor da IA."}function ha({u:o,day:e,onDay:t,head:s,app:a,using:i="",names:r={}}){if(!o||!o.hoje)return n`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let l=new Date,c=Nt(l),d=x=>x.cota?n`<span class="s alert">${x.cota} ${x.cota>1?"vezes":"vez"} sem cota</span>`:x.erros?n`<span class="s alert">${x.erros} com erro</span>`:n`<span class="s">≈ ${la(x.tokens)} tokens</span>`,h=(x,_)=>n`<div class="uso-tile"><span class="k">${x}</span><span class="v">${_.chamadas||0}</span>${d(_)}</div>`,p=o.dias||[],f=Math.max(1,...p.map(x=>x.chamadas||0)),g=p.find(x=>x.dia===e)||p.find(x=>x.dia===c)||{dia:c,chamadas:0,erros:0,cota:0},w=x=>x.dia===c?"hoje":oa[dt(x.dia).getDay()],b=o.semana&&o.semana.tipos||{},k=[...Object.keys(o.mes&&o.mes.ias||{}),...Object.keys(o.semana&&o.semana.ias||{}),i],y=o.ultimas||[];return n`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${h("Hoje",o.hoje)}${h("7 dias",o.semana)}${h("Este m\xEAs",o.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${p.map(x=>{let _=x.chamadas?Math.max(4,Math.round(x.chamadas/f*100)):0;return n`<button type="button" class="uso-bar ${x.dia===c?"today":""}" aria-pressed=${x.dia===g.dia?"true":"false"} aria-label="${w(x)}: ${ca(x.chamadas)}" @click=${()=>t(x.dia)}><i style="height:${_}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${p.map(x=>n`<span>${w(x)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${g.dia===c?"Hoje":`${oa[dt(g.dia).getDay()]}, ${be(dt(g.dia).getDate())}/${be(dt(g.dia).getMonth()+1)}`}: <b>${ca(g.chamadas)}</b>${g.erros?`, ${g.erros} com erro`:""}${g.cota?`, ${g.cota} sem cota`:""}.</p>
    ${Object.keys(b).length?n`<ul class="uso-kinds">${Object.keys(b).sort((x,_)=>b[_]-b[x]).map(x=>n`<li>${ra[x]||x} <b>${b[x]}</b></li>`)}</ul>`:u}
    <details class="uso-last">
      <summary><svg class="uso-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg><span>Últimas chamadas${y.length?` (${y.length})`:""}</span><svg class="uso-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
      <ul>
        ${y.length?y.map(x=>n`<li><b>${ra[x.tipo]||x.tipo}</b><span>${Qi(x.ia,r)}</span>${na[x.resultado]?n`<span class="r-err">${na[x.resultado]}</span>`:u}
                <span class="t">${da(x.segundos)} s · ≈ ${la(x.tokens)} tokens${x.imagens?` \xB7 ${x.imagens} ${x.imagens>1?"imagens":"imagem"}`:""} · ${Gi(x.quando,l)}</span></li>`):n`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    <p class="uso-note">${Zi(k)}</p>
  </div>`}var pa=`
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
  .uso-last summary { display: flex; align-items: center; gap: 8px; list-style: none; font-size: 14.5px; font-weight: 600; color: var(--rv-accent-ink); cursor: pointer; padding: 6px 0; }
  .uso-last summary::-webkit-details-marker { display: none; }
  .uso-last summary .uso-ic { width: 18px; height: 18px; flex: none; }
  .uso-last summary .uso-chev { width: 18px; height: 18px; flex: none; margin-left: auto; color: var(--rv-muted); transition: transform 0.2s; }
  .uso-last[open] summary .uso-chev { transform: rotate(180deg); }
  .uso-last ul { list-style: none; margin: 0; padding: 0; }
  .uso-last li { display: flex; flex-wrap: wrap; gap: 2px 10px; align-items: baseline; font-size: 13px; padding: 7px 0; border-top: 1px solid var(--rv-line); color: var(--rv-muted); }
  .uso-last li b { color: var(--rv-text); font-weight: 600; }
  .uso-last li .r-err { color: var(--rv-late); font-weight: 600; }
  .uso-last li .t { flex-basis: 100%; font-size: 12.5px; }
  .uso-note { font-size: 13px; line-height: 1.5; color: var(--rv-muted); margin: 0 0 10px; }
  .uso-note:last-child { margin-bottom: 16px; }
  .uso-note a { color: var(--rv-accent-ink); }
  .uso-note code { font-size: 12px; }
`;var eo=/[̀-ͯ]/g,ua=o=>o.normalize("NFD").replace(eo,"").toLowerCase()||o.toLowerCase(),ht=o=>[...String(o||"")].map(ua).join("");function to(o,{room:e=null,query:t=""}={}){let s=ht(t).split(/\s+/).filter(Boolean),a=c=>ht(`${c.nome} ${c.zona||""} ${c.roomName||""}`),i=c=>s.every(d=>a(c).includes(d)),r=c=>{if(!s.length)return 0;let d=ht(c.nome);return d.startsWith(s[0])?0:d.includes(s[0])?1:2},l=o.filter(i).sort((c,d)=>r(c)-r(d)||c.nome.localeCompare(d.nome,"pt-BR"));return e?{inRoom:l.filter(c=>c.roomId===e),others:s.length?l.filter(c=>c.roomId!==e):[]}:{inRoom:[],others:s.length?l:[]}}function so(o,e,t){let s=ht(t).split(/\s+/).filter(Boolean)[0];if(!s)return e;let a=[...e],i=a.map(ua),r=-1,l=-1;for(let c=0;c<a.length&&r<0;c++){let d="";for(let h=c;h<a.length;h++){if(d+=i[h],d===s){r=c,l=h+1;break}if(!s.startsWith(d))break}}return r<0?e:o`${a.slice(0,r).join("")}<mark>${a.slice(r,l).join("")}</mark>${a.slice(l).join("")}`}function je({lit:o,icon:e,items:t,room:s=null,roomName:a="",value:i=null,query:r="",more:l=!1,onQuery:c,onPick:d,onMore:h,onRemove:p,onAdd:f,adding:g=!1,autofocus:w=!1,bens:b=!1}){let{html:k,nothing:y}=o,x=(T,E)=>k`<div class="eq-sel">
      <span class="eq-ic">${e("package")}</span>
      <span class="eq-tx"><b>${T.nome}</b><small>${[T.zona,T.roomName].filter(Boolean).join(" \xB7 ")||"Sem c\xF4modo"}</small></span>
      <button type="button" class="icon-btn mini" aria-label="Tirar ${T.nome}" @click=${E}>${e("x")}</button>
    </div>`;if(Array.isArray(i)){let T=i.map($=>t.find(S=>S.id===$)).filter(Boolean),E=T.map($=>x($,()=>p($.id)));if(T.length&&!g)return k`<div class="eq-pick">${E}<button type="button" class="eq-more eq-add" @click=${()=>f()}>${e("plus")}${b?"Outro bem":"Outro equipamento"}</button></div>`;let v=t.filter($=>!i.includes($.id));return k`<div class="eq-pick">${E}${A(v,T.length>0||w)}</div>`}let _=i?t.find(T=>T.id===i):null;if(_)return x(_,()=>d(null));return A(t,w);function A(T,E){let{inRoom:v,others:$}=to(T,{room:s,query:r}),S=l?40:6,I=(U,P)=>k`<button type="button" class="eq-row" @click=${()=>d(U.id)}>
    <span class="eq-ic">${e("package")}</span>
    <span class="eq-tx"><b>${so(k,U.nome,r)}</b>${[U.zona,P?U.roomName:""].filter(Boolean).length?k`<small>${[U.zona,P?U.roomName:""].filter(Boolean).join(" \xB7 ")}</small>`:y}</span>
  </button>`,R=v.slice(0,S),z=$.slice(0,Math.max(0,S-R.length)),L=v.length+$.length-R.length-z.length,K=y;return!r&&!s?K=k`<p class="eq-hint">Escolha o cômodo ou busque entre ${T.length} ${T.length===1?"equipamento":"equipamentos"}.</p>`:!r&&s&&!v.length?K=k`<p class="eq-hint">${b?"Nenhum bem no InventarIA.":`Nenhum equipamento em ${a}. Busque nos outros c\xF4modos.`}</p>`:r&&!v.length&&!$.length&&(K=k`<p class="eq-hint">Nada com “${r}”.</p>`),k`<div class="eq-pick">
    <label class="eq-search">${e("search")}<input type="search" .value=${r} placeholder=${s?`Buscar em ${a}\u2026`:"Buscar equipamento\u2026"} aria-label="Buscar equipamento" ?autofocus=${E} @input=${U=>c(U.target.value)} /></label>
    ${R.length?k`<div class="eq-list">${R.map(U=>I(U,!1))}</div>`:y}
    ${z.length?k`${s?k`<div class="eq-head">Em outros cômodos</div>`:y}<div class="eq-list">${z.map(U=>I(U,!0))}</div>`:y}
    ${L>0?k`<button type="button" class="eq-more" @click=${()=>h()}>${e("chevron-down")}Mostrar mais ${L}</button>`:y}
    ${K}
  </div>`}}var ma=`
  .eq-pick { display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px; }
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
  .eq-sel { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 10px 6px 10px 12px; border-radius: 14px; border: 1.5px solid var(--rv-accent); background: var(--rv-accent-soft); }
  .eq-sel .eq-ic { background: var(--rv-accent); color: var(--rv-on-accent, #fff); }
  .eq-pick > .eq-pick { gap: 8px; }
  .eq-more, .eq-add { display: inline-flex; align-items: center; gap: 6px; }
  .eq-more .i, .eq-add .i { width: 16px; height: 16px; flex: none; }
`;var Ht="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",ao="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function fa(o,e=new Date){let t=o.filter(a=>a.id!=="grafite"),s=Math.floor(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/864e5);return t[(s%t.length+t.length)%t.length]}function ga({theme:o,onTheme:e,icon:t}){return n`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Sistema","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,i])=>n`<button type="button" class=${o===s?"on":""} role="radio" aria-checked=${o===s?"true":"false"} @click=${()=>e(s)}>${t(i)}<span>${a}</span></button>`)}
  </div>`}function va({palette:o,value:e,onPick:t}){return n`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${o.map(s=>n`<button type="button" class="tsw ${e===s.id?"on":""}" role="radio" aria-checked=${e===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>t(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${Ht}></path><path class="sw-gap" d=${Ht}></path><path class="sw-fill" d=${Ht+ao}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var ba=`
  .seg.themes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; margin: 2px 0 18px; }
  .seg.themes { min-height: 50px; }
  .seg.themes button { display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 7px; height: auto; min-height: 0; padding: 0 6px; font-size: 15px; }
  .seg.themes button .i { width: 18px; height: 18px; margin: 0; flex: none; }
  @media (max-width: 380px) { .seg.themes button .i { display: none; } }
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
`;var M={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},O=(o,e)=>((o||0)&e)===e,ue=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"verde",label:"Verde",fill:"#8BD45F",ink:"#3F7A17"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"turquesa",label:"Turquesa",fill:"#3CCBDA",ink:"#0B7285"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"indigo",label:"\xCDndigo",fill:"#8F9BFF",ink:"#3D4BC2"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"grafite",label:"Grafite",fill:"#B5B9C2",ink:"#4E5560"}],xa=["vermelho","coral","rosa","laranja","lilas","ouro"],io={framboesa:"#E8508A"},_a=o=>{let e=parseInt(o.replace("#",""),16);return[e>>16&255,e>>8&255,e&255]};function oo(o){let[e,t,s]=_a(o),a=ue[0],i=1/0;for(let r of ue){let[l,c,d]=_a(r.fill),h=(e-l)**2+(t-c)**2+(s-d)**2;h<i&&([a,i]=[r,h])}return a}var Ae=o=>{let e=ue.find(s=>s.id===o);if(e||typeof o!="string")return e;let t=io[o]||(/^#[0-9a-f]{6}$/i.test(o)?o:null);return t?oo(t):void 0},Vt=o=>Ae(xa[o%xa.length]);function ut(o,e){let t=o.replace("#",""),s=parseInt(t.length===3?t.replace(/./g,a=>a+a):t,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${e})`}var jt={id:"sem",label:"Sem cor",fill:"",ink:"",none:!0};function j(o,e,t="c"){return o&&o.none?`--${t}:var(--rv-text-2);--${t}i:var(--rv-text-2);--${t}s:var(--rv-surface-2);`:`--${t}:${o.fill};--${t}i:${e?o.fill:o.ink};--${t}s:${ut(o.fill,e?.17:.15)};`}var H=o=>(o||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),wa=o=>Array.from(o||"",e=>{if(e.length!==1)return e;let t=e.normalize("NFD")[0]||e;return t.toLowerCase().length===1?t.toLowerCase():e}).join(""),C=(o,e,t)=>`${o} ${o===1?e:t}`,$a=o=>String(o||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),D=(o,e=38)=>o.length>e?o.slice(0,e-1).trimEnd()+"\u2026":o;function ya(o,e){let t=o.states[e],s=t&&t.attributes&&t.attributes.friendly_name||e.split(".")[1].replace(/_/g," "),a=o.entities&&o.entities[e],i=a&&a.device_id&&o.devices?o.devices[a.device_id]:void 0,r=i?i.name_by_user||i.name:void 0,l=s,c=r||null;return r&&s.toLowerCase().startsWith(r.toLowerCase()+" ")&&(l=s.slice(r.length+1)),l=l.charAt(0).toUpperCase()+l.slice(1),{name:l,group:c}}var ro=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/\bpets?\b|cachorro|dog\b/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function Ut(o){let e=H(o);for(let[t,s]of ro)if(t.test(e))return s;return"list-checks"}var ka=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],no=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],lo=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],pt=o=>String(o).padStart(2,"0"),xe=o=>`${o.getFullYear()}-${pt(o.getMonth()+1)}-${pt(o.getDate())}`,co=o=>`${pt(o.getHours())}:${pt(o.getMinutes())}`;function mt(o){let[e,t,s]=o.split("-").map(Number);return new Date(e,t-1,s)}function Bt(o,e){let t=new Date(o.getFullYear(),o.getMonth(),o.getDate());return t.setDate(t.getDate()+e),t}function te(o){if(!o)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(o)){let t=mt(o);return{date:o,time:null,at:new Date(t.getFullYear(),t.getMonth(),t.getDate(),23,59,59)}}let e=new Date(o);return isNaN(e)?null:{date:xe(e),time:co(e),at:e}}function Wt(o,e=new Date){let t=mt(o),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return Math.round((t-s)/864e5)}function ft(o,e=new Date){let t=mt(o),s=`${t.getDate()} ${lo[t.getMonth()]}`;return t.getFullYear()===e.getFullYear()?s:`${s} ${t.getFullYear()}`}function se(o,e=new Date){let t=te(o);if(!t)return null;let s=Wt(t.date,e),a=t.at<e,i;s===0?i="Hoje":s===1?i="Amanh\xE3":s===-1?i="Ontem":s>1&&s<7?i=no[mt(t.date).getDay()]:i=ft(t.date,e),t.time&&(i+=`, ${t.time}`);let r=a?"late":s===0?"today":s<=2?"soon":"later";return{...t,diff:s,overdue:a,text:i,tone:r}}function Yt(o=new Date){let e=o.getDay(),t=(6-e+7)%7||7,s=(1-e+7)%7||7,a=[{label:"Hoje",date:xe(o)},{label:"Amanh\xE3",date:xe(Bt(o,1))}];return t>1&&a.push({label:"S\xE1bado",date:xe(Bt(o,t))}),s>1&&a.push({label:"Pr\xF3x. semana",date:xe(Bt(o,s))}),a}function Kt(o=null){let e=Array.from({length:48},(t,s)=>`${String(s>>1).padStart(2,"0")}:${s%2?"30":"00"}`);return/^([01]\d|2[0-3]):[0-5]\d$/.test(o||"")&&!e.includes(o)&&(e.push(o),e.sort()),e}function Aa(o,e=new Date){let t=e.getHours(),s=t>=5&&t<12?"Bom dia":t>=12&&t<18?"Boa tarde":"Boa noite",a=(o||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var ho=/\bhttps?:\/\/[^\s<>"'`]+/gi;function po(o){let e;try{e=new URL(o)}catch{return{label:o,icon:"link"}}let t=e.hostname.replace(/^www\./,""),s=e.pathname.split("/").filter(Boolean);if(t==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${t} \u203A ${a}`,icon:"link"}:{label:t,icon:"link"}}function Sa(o){let e=[],t=0,s=o||"";for(let a of s.matchAll(ho)){let i=a[0],r=i.match(/[.,;:!?)\]}]+$/);r&&(i=i.slice(0,-r[0].length)),a.index>t&&e.push({text:s.slice(t,a.index)}),e.push({url:i,...po(i)}),t=a.index+i.length}return t<s.length&&e.push({text:s.slice(t)}),e}var uo=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-](?!\d)|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,mo=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function Jt(o){let e=(o||"").split(/\r?\n/).map(a=>a.replace(mo,"").trim()).filter(Boolean);e.length===1&&/[,;]|\se\s/i.test(e[0])&&(e=e[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let t=new Set,s=[];for(let a of e){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(uo,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let i=a.toLowerCase();t.has(i)||(t.add(i),s.push(a.slice(0,255)))}return s}async function Xt(o,e=1800){let t=s=>new Promise((a,i)=>{let r=new FileReader;r.onload=()=>a(String(r.result).split(",")[1]||""),r.onerror=()=>i(r.error),r.readAsDataURL(s)});try{let s=await createImageBitmap(o,{imageOrientation:"from-image"}),a=Math.min(1,e/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),s.close&&s.close();let r=await new Promise(l=>i.toBlob(l,"image/jpeg",.86));return{mime:"image/jpeg",data:await t(r),url:URL.createObjectURL(r)}}catch{return{mime:o.type||"image/jpeg",data:await t(o),url:URL.createObjectURL(o)}}}var ne=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,fo=o=>o>1048576?`${(o/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(o/1024))} KB`,go={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar","antes-de-apagar":"antes de apagar"},Ma=o=>class extends o{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(e){let t=new Date(e),s=a=>String(a).padStart(2,"0");return`${s(t.getDate())}/${s(t.getMonth()+1)}/${t.getFullYear()} \xE0s ${s(t.getHours())}:${s(t.getMinutes())}`}async _loadBackups(){let e=this._data();if(e){try{this._backups=await e.backups()}catch(t){this._backups={available:!1,error:t.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let e=await this._data().createBackup();this._showToast(`Backup salvo em ${e.folder}/${e.name}`),this._haptic("success"),await this._loadBackups()}catch(e){this._showToast(`N\xE3o consegui criar o backup. ${e.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(e,t){let s=this._data();(!s||!s.url(e))&&(t.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(e,t){let s=e.added||e.added===0?`${t}: ${e.added?C(e.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${C(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${t}: ${C(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return e.missing&&e.missing.length&&(s+=`. ${e.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${e.missing.join(", ")}`),e.unsupported&&(s+=`. ${C(e.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),e.failed&&(s+=`. ${C(e.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let e=this.renderRoot.querySelector("#rv-data-import");e&&(e.value="",e.click())}_onDataImport(e){let t=e.target.files&&e.target.files[0];e.target.value="",t&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${D(t.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(t);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(e){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(e.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let t=await this._data().restoreBackup(e.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(t,"Backup restaurado"))}catch(t){this._showToast(t.message)}}})}_confirmErase(){this._openSheet("confirm",{title:"Come\xE7ar do zero?",text:"Apaga as repeti\xE7\xF5es, os pontos, os c\xF4modos, os equipamentos e quem faz de cada tarefa. Os itens das listas e os ajustes continuam. Antes, o app guarda uma c\xF3pia em Vers\xF5es anteriores.",label:"Apagar tudo",run:async()=>{this._closeSheet();try{await this._data().erase(),await this._loadPrefs(),this._haptic("warning"),this._showToast("Pronto: come\xE7ando do zero. A c\xF3pia est\xE1 em Vers\xF5es anteriores.")}catch(e){this._showToast(`N\xE3o consegui apagar. ${e.message}`)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let e=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:e})}catch(e){this._sheet==="versions"&&(this._form={...this._form,error:e.message})}}_confirmRestoreVersion(e){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(e.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(e.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(t){this._showToast(t.message)}}})}_renderVersions(){let e=this._form;return n`
        <div class="sheet-head">
          <h3 class="display">${ne("archive-restore","sh-ic")}Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${ne("x")}</button>
        </div>
        ${e.error?n`<div class="imp-error">${ne("circle-alert")}<span>${e.error}</span></div>`:e.list==null?n`<div class="imp-loading"><span class="spin">${ne("loader-circle")}</span><span>Carregando…</span></div>`:e.list.length?n`<div class="data-list">
                  ${e.list.map(t=>n`<div class="data-item">
                      <div><b>${this._dateTime(t.when)}</b><span>${C(t.lists,"lista personalizada","listas personalizadas")} · ${C(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${go[t.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(t)}>${ne("archive-restore")}Restaurar</button>
                    </div>`)}
                </div>`:n`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let e=this._data();if(!e)return u;let t=this._backups,s=(a,i,r,l)=>n`<li>
        <div class="ot"><b>${i}</b><span>${r}</span></div>
        <a class="btn outline sm" href=${e.url(a)||"#"} download @click=${c=>this._exportData(a,c)}>${ne("download")}${l}</a>
      </li>`;return n`<div id="dados">
        <div class="panel">
          ${this._secHead("download","Exportar")}
          <ul class="opts">
            ${s("csv","Planilha (CSV)","Abre no Excel e no Google Planilhas, com um item por linha.","Baixar CSV")}
            ${s("json","Dados completos (JSON)","Todos os campos, para backup ou para outro sistema.","Baixar JSON")}
            ${s("zip","Tudo (ZIP)","Todas as listas com os itens (prazo, notas e conclu\xEDdos), a planilha e os ajustes do app num arquivo s\xF3.","Baixar ZIP")}
          </ul>
        </div>
        <div class="panel">
          ${this._secHead("archive","Backup na pasta share",n`Cópia completa em <code>share/resolvia</code>.`)}
          <div class="btn-row sec-actions">
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||t&&t.available===!1} @click=${()=>this._createBackup()}>${ne("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${t&&t.available===!1?n`<p class="data-note">A pasta share não está disponível para o app.</p>`:u}
          ${t&&t.backups&&t.backups.length?n`<div class="data-list">
                ${t.backups.slice(0,8).map(a=>n`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${fo(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${ne("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:u}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Um .zip ou .json exportado pelo ResolvIA, sem duplicar.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${ne("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","Uma c\xF3pia dos ajustes e das repeti\xE7\xF5es a cada 10 minutos de uso e antes de importar, restaurar ou apagar. Ficam as 3 mais recentes.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${ne("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",n`Os itens ficam nas listas do Home Assistant; os ajustes, em <code>/data/resolvia.json</code>.`)}
        </div>
        <div class="panel" id="zerar">
          ${this._secHead("trash","Come\xE7ar do zero","Apaga as repeti\xE7\xF5es, os pontos, os c\xF4modos, os equipamentos e quem faz. Os itens das listas e os ajustes continuam.")}
          <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmErase()}>${ne("trash")}Apagar tudo</button></div>
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var de=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,Ea=[5,10,20,30,50],Se=o=>String(o||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),qa=o=>{let e=/\[cr:[0-9a-f]{8}\]/.exec(String(o||""));return e?e[0]:""},vo={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},Ca=o=>class extends o{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let e=this._pts;return!!(e&&e.on&&e.placar&&e.placar.ativo)}_rawPoints(e,t){let s=this._pts&&this._pts.points&&this._pts.points[e];return s&&s[$a(t)]||0}_mirrored(e,t){let s=this._pts&&this._pts.espelho&&this._pts.espelho[e];return t&&s&&s[t]||null}_pointsOf(e,t,s=null){let a=this._mirrored(e,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(e,t):0}async _setTaskPoints(e,t,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:e,summary:t,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(`N\xE3o consegui salvar os pontos: ${i.message}`)}}async _setPointsOn(e){await this._saveAppPrefs({points_on:e?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(e,t,s,a,i=null){let r;try{r=await this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!0,...i?{quem:i}:{}})}catch(d){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${d.message}`,a);return}if(r&&r.ask){this._openSheet("who",{title:t.summary,points:r.points,participantes:r.participantes,run:d=>{this._closeSheet(!0),d?this._givePoints(e,t,s,a,d):this._showToast(s,a)}});return}if(!r||!r.points){this._showToast(s,a);return}let l=`Resolvido por ${r.who} \xB7 +${r.points}`,c=(r.participantes||[]).filter(d=>d!==r.who);if(c.length===1){let d=c[0];this._showToast(l,{label:`Foi ${d}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:r.key,quem:d}).then(()=>this._showToast(`Pontos para ${d}`)).catch(h=>this._showToast(h.message))})}else this._showToast(l,a)}_takePoints(e,t){!this._mirrored(e.id,t.uid)&&(!this._rawPoints(e.id,t.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!1}).catch(()=>{})}_renderPointsTag(e,t){let s=this._pointsOf(e,t.summary,t.uid);return s?n`<span class="tag pts" title="${s} pontos para quem concluir">${de("trophy")}+${s}</span>`:u}_renderPointsField(e){if(e.mirrored)return u;if(!(this._pts&&this._pts.on))return u;let t=this._pts.placar,s=e.points||0,a=e.pointsCustom||s>0&&!Ea.includes(s);return n`<div class="field">
        <span class="flabel">${de("trophy","lbl-ic")}Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>${de("x")}<span>Sem pontos</span></button>
          ${Ea.map(i=>n`<button class="pick ${s===i&&!a?"on":""}" @click=${()=>this._setForm({points:i,pointsCustom:!1})}>${de("trophy")}<span>+${i}</span></button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${de("trophy")}<span>Outro</span></button>
        </div>
        ${a?n`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${i=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(i.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:u}
        ${s?n`<div class="field-hint">${de("trophy")}<span>${t&&t.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${t.participantes.join(" \xD7 ")}).`:t&&t.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA.":"O placar do CronologIA est\xE1 desligado."}</span></div>`:u}
      </div>`}_renderWhoSheet(){let e=this._form;return n`
        <div class="sheet-head">
          <h3 class="display">${de("trophy","sh-ic")}Quem fez?</h3>
          <button class="icon-btn" @click=${()=>e.run("")} aria-label="Fechar">${de("x")}</button>
        </div>
        <p class="sheet-note top">${D(e.title||"",40)} · <b>+${e.points} pontos</b></p>
        <div class="who-grid">
          ${(e.participantes||[]).map(t=>n`<button class="who-btn" @click=${()=>e.run(t)}><span class="who-av">${(t||"?").trim().charAt(0).toUpperCase()}</span><b>${t}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>e.run("")}>${de("x")}Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let e=this._pts;if(!e)return u;let t=e.placar,s=!!e.on,a=Object.values(e.points||{}).reduce((l,c)=>l+Object.keys(c).length,0),i=n`<div class="row switch-row">
          <div class="grow">
            <div class="label">${de("trophy","lbl-ic")}Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${C(a,"tarefa vale","tarefas valem")} pontos.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D.":"Desligado."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${l=>this._setPointsOn(l.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return n`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
          ${i}
        </div>`;let r=t?t.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${t.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Configura\xE7\xF5es \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:t.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${t.versao}`.trim(),text:`${t.participantes.join(" \xD7 ")} \xB7 fecha ${vo[t.periodo]||"toda semana"}. ${t.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${t.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${t.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return n`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
        ${i}
        <div class="sub-op"><div class="sub-box"><div class="ai-state ${r.tone}"><span class="dot"></span><div><b>${r.title}</b><span>${r.text}</span></div></div></div></div>
      </div>`}};var Z=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,bo=864e5,Oa=5,xo=2;function Qt(o){return o<14?C(o,"dia","dias"):o<60?C(Math.floor(o/7),"semana","semanas"):o<730?C(Math.floor(o/30),"m\xEAs","meses"):C(Math.floor(o/365),"ano","anos")}var Ta=o=>o.icon==="shopping-cart",Gt=[{id:"late",title:"Atrasados",icon:"triangle-alert",test:o=>o.overdue},{id:"today",title:"Hoje",icon:"calendar",test:o=>o.diff===0},{id:"tomorrow",title:"Amanh\xE3",icon:"sunrise",test:o=>o.diff===1},{id:"week",title:"Pr\xF3ximos 7 dias",icon:"calendar-days",test:o=>o.diff>1&&o.diff<7},{id:"later",title:"Mais adiante",icon:"hourglass",test:()=>!0}],Me=["late","today","start","tomorrow","week","later","coming","shopping"];function _o(o){let e=(Array.isArray(o)?o:[]).filter((t,s,a)=>Me.includes(t)&&a.indexOf(t)===s);for(let t of Me){if(e.includes(t))continue;let s=Me.slice(0,Me.indexOf(t)).reverse().find(a=>e.includes(a));e.splice(s?e.indexOf(s)+1:0,0,t)}return e}var wo={late:["triangle-alert","Atrasados"],today:["calendar","Hoje"],start:["flag","Comece por aqui"],tomorrow:["sunrise","Amanh\xE3"],week:["calendar-days","Pr\xF3ximos 7 dias"],later:["hourglass","Mais adiante"],coming:["repeat","Voltam sozinhas"],shopping:["shopping-cart","Compras"]},Ia=o=>class extends o{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let e=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=e.ages||{},this._aiAsking||(this._aiPick=e.ai||null),this._aiBusy=!!e.busy||!!this._aiAsking,clearTimeout(this._aiPoll),e.busy&&!this._aiAsking&&(this._aiPoll=setTimeout(()=>this._loadSuggest(),3e3))}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(e,t,s=new Date){if(this._sinceDate(e,t))return Math.max(0,-Wt(te(t.due).date,s));let a=this._ages&&this._ages[e.id]&&t.uid?this._ages[e.id][t.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/bo)):null}_sinceDate(e,t){return!e.canDue&&!!t.due&&!!te(t.due)}_suggestLists(){return this._visible().filter(e=>!e.unavailable&&e.items&&O(e.features,M.UPDATE))}_suggestions(e=new Set){let t=new Date,s=[],a=[],i=0,r=0;for(let d of this._suggestLists()){let h=d.items.filter(p=>p.status!=="completed");if(h.length){if(i+=h.length,r++,Ta(d)){let p=h.map(f=>this._ageOf(d,f,t)).filter(f=>f!=null);a.push({l:d,n:h.length,oldest:p.length?Math.max(...p):null});continue}h.forEach((p,f)=>{if(e.has(p))return;let g=[],w=0,b=this._ageOf(d,p,t);b!=null&&b>=3&&(w+=Math.min(b,60)/3,g.push(this._sinceDate(d,p)?`Assim h\xE1 ${Qt(b)}`:`Na lista h\xE1 ${Qt(b)}`)),h.length===1?(w+=8,g.push("\xC9 o \xFAltimo da lista")):h.length===2&&(w+=4,g.push("Faltam 2 para zerar a lista"));let k=this._pointsOf(d.id,p.summary,p.uid);k&&(w+=3+Math.min(k,50)/10),this._ruleFor(d.id,p)&&(w+=4,g.push("Voltou para fazer"));let y=d.canDue&&p.due?se(p.due,t):null;if(y&&y.diff<=0){w+=y.diff<0?6:5;let x=this._mirrored(d.id,p.uid);g.push(x?`${x.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${y.diff<0?"atrasada":"para hoje"}`:y.diff<0?"A data j\xE1 passou":"Tem data para hoje")}f===0&&(w+=1.5),g.length||g.push(k?"Vale pontos":f===0?"Primeiro da lista":`${f+1}\xBA da lista`),s.push({l:d,i:p,idx:f,score:w,why:g.join(" \xB7 ")})})}}s.sort((d,h)=>h.score-d.score||d.idx-h.idx);let l=[],c=new Map;for(let d of s){if(d.score<=0)continue;let h=c.get(d.l.id)||0;if(!(h>=xo)&&(c.set(d.l.id,h+1),l.push(d),l.length>=Oa))break}for(let d of s){if(l.length>=Oa)break;l.includes(d)||l.push(d)}return a.sort((d,h)=>h.n-d.n),{top:l,shopping:a,pending:i,lists:r}}async _askAi(){if(this._aiBusy)return;let e=new Date,t=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let i=this._ruleFor(s.id,a);t.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,e),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:i?i.days:0,compras:Ta(s),comodo:this._roomIdsOf(s.id,a.summary).map(r=>this._roomName(r)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(s.id,a.summary).map(r=>(this._equipOf(r)||{}).nome).filter(Boolean).join(", "),externo:(r=>r===!0?"sim":r||"")(this._externalOf(s.id,a.summary))})}if(t.length){this._aiBusy=!0,this._aiAsking=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:t.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiAsking=!1,this._aiBusy=!1,this.requestUpdate()}}async _clearAi(){this._aiPick=null,this._aiErr=null,this.requestUpdate();try{await this.hass.callWS({type:"resolvia/ai/suggest/clear"})}catch{}}_aiRows(){let e=this._aiPick,t=[];for(let s of e&&e.picks||[]){let a=s.key.indexOf("|"),i=this._list(s.key.slice(0,a)),r=i&&i.items&&i.items.find(l=>l.uid===s.key.slice(a+1));i&&r&&!i.hidden&&(r.status!=="completed"||this._recent.has(r.uid))&&t.push({l:i,i:r,why:s.motivo||"Escolhido pela IA",ai:!0})}return t}_renderStart(e){let t=this._aiOn()&&!!this.hass.resolvia,s=t?this._aiInfo():null,a=t?this._aiPick:null,i=a?this._aiRows():[],r=i.length>0,l=r?i:e.top;if(!l.length&&!t)return u;let c=!!this._aiBusy;return n`<div class="panel items start ${r?"by-ai":""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${Z(r?"sparkles":"flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${l.length}</small></div>
        ${r?n`<p class="start-by">${Z("sparkles")}<span>Escolhidos pela IA.</span></p>`:u}
        ${re(l,d=>d.l.id+(d.i.uid||d.i.summary),d=>this._renderItem(d.l,d.i,{showList:!0,why:d.why,whyIcon:d.ai?"sparkles":null}))}
        ${a&&!r?n`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>`:u}
        ${t&&!s.ready&&s.reason?n`<p class="ai-note">${s.reason}</p>`:u}
        ${this._aiErr?n`<p class="ai-note err">${this._aiErr}</p>`:u}
        ${t?n`<div class="ai-actions start-acts">
              <button class="btn ${r?"outline":"primary"} sm ai-ask" ?disabled=${c||!s.ready} @click=${()=>this._askAi()}>
                ${Z(c?"loader-circle":"sparkles",c?"ai-spin":"")}${c?"Pensando\u2026":r?"Sugerir de novo":"Sugerir com IA"}
              </button>
              ${a&&!c?n`<button class="btn outline sm" @click=${()=>this._clearAi()}>${Z("rotate-ccw")}Voltar ao automático</button>`:u}
            </div>`:u}
      </div>`}_nowKey(){let e=this.hass&&this.hass.user;return e&&(e.id||e.name)||""}_nowOrder(){return _o((this._app("now_order",null)||{})[this._nowKey()])}_saveNowOrder(e){let t={...this._app("now_order",null)||{}};e&&e.join()!==Me.join()?t[this._nowKey()]=e:delete t[this._nowKey()],this._saveAppPrefs({now_order:Object.keys(t).length?t:null})}_moveNowCard(e,t){let s=this._nowOrder(),a=s.indexOf(e),i=a+t;a<0||i<0||i>=s.length||([s[a],s[i]]=[s[i],s[a]],this._saveNowOrder(s))}_renderCardsSheet(){let e=this._nowOrder(),t=this._nowShown||{},s=!this._dueOn(),a=r=>s&&(r==="coming"||Gt.some(l=>l.id===r))?"Controlar prazos desligado":r==="coming"&&this._repeatOn&&!this._repeatOn()?"Repeti\xE7\xE3o desligada":t[r]?"":"Sem nada agora",i=e.join()!==Me.join();return n`
        <div class="sheet-head">
          <h3 class="display">${Z("grip-vertical","sh-ic")}Ordem dos cards</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${Z("x")}</button>
        </div>
        <p class="sheet-note top">A ordem da Agora, só para você.</p>
        <ol class="now-cards">
          ${e.map((r,l)=>{let[c,d]=wo[r],h=a(r);return n`<li class="row nc-row ${h?"off":""}" data-card=${r}>
              <span class="mais-ic ${r==="late"?"late":""}" aria-hidden="true">${Z(c)}</span>
              <div class="grow"><div class="label">${d}</div>${h?n`<div class="hint">${h}</div>`:u}</div>
              <button class="icon-btn" ?disabled=${l===0} @click=${()=>this._moveNowCard(r,-1)} aria-label="Subir ${d}">${Z("chevron-up")}</button>
              <button class="icon-btn" ?disabled=${l===e.length-1} @click=${()=>this._moveNowCard(r,1)} aria-label="Descer ${d}">${Z("chevron-down")}</button>
            </li>`})}
        </ol>
        ${i?n`<button class="btn outline now-reset" @click=${()=>this._saveNowOrder(null)}>${Z("rotate-ccw")}Voltar à ordem de sempre</button>`:u}
      `}_renderSuggest(){let e=this._dueSections(),t=this._suggestions(new Set(e.rows.map(l=>l.i))),s=[];t.pending&&s.push(`${C(t.pending,"pendente","pendentes")} em ${C(t.lists,"lista","listas")}`),e.late&&s.push(C(e.late,"atrasado","atrasados")),e.today&&s.push(`${e.today} para hoje`);let a=t.pending||e.comingN,r={...e.cards||{},start:t.pending?this._renderStart(t):u,coming:e.coming||u,shopping:t.shopping.length?n`<div class="panel" data-card="shopping">
              <div class="mais-head"><span class="mais-ic" aria-hidden="true">${Z("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${t.shopping.length}</small></div>
              ${t.shopping.map(l=>n`<button class="list-card" style=${j(l.l.color,this._dark)} @click=${()=>this._go(`/lista/${l.l.id}`)}>
                  <span class="tile">${Z(l.l.icon)}</span>
                  <span class="lc-main">
                    <span class="lc-title">${l.l.name}</span>
                    <span class="lc-meta"><span>${l.oldest!=null&&l.oldest>=3?`O mais antigo est\xE1 h\xE1 ${Qt(l.oldest)}`:C(l.n,"item para comprar","itens para comprar")}</span></span>
                  </span>
                  <span class="lc-num">${l.n}</span>
                </button>`)}
            </div>`:u};return this._nowShown=Object.fromEntries(Me.map(l=>[l,!!r[l]&&r[l]!==u])),n`
        <section class="page">
          ${this._renderPageHead("Agora",{text:s.length?s.join(" \xB7 "):"Nada pendente",tone:e.late?"late":""})}
          ${a?n`${this._nowOrder().map(l=>r[l]||u)}
                <button class="add-line now-order" @click=${()=>this._openSheet("cards")}>${Z("sliders-horizontal")}Ordem dos cards</button>`:n`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${Z("circle-check")}</div>
                  <h3>Tudo em dia</h3>
                </div>
              </div>`}
        </section>
      `}};var J=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,gt=o=>String(o||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),Ee=o=>Array.isArray(o)?o:o?[o]:[],za=(o,e)=>Ee(o).join("|")===Ee(e).join("|"),Ra=o=>class extends o{async _loadRooms(e="resolvia/rooms/get"){if(!(!this.hass||!this.hass.resolvia)){try{this._rooms=await this.hass.callWS({type:e})}catch{this._rooms=this._rooms||null}this.requestUpdate()}}_roomsOn(){let e=this._rooms;return!!(e&&e.on&&e.comodos&&e.comodos.length)}_roomList(){return this._rooms&&this._rooms.comodos||[]}_bensId(){let e=this._roomList().find(t=>t.tipo==="bens");return e?e.id:null}_houseRooms(){let e=this._bensId();return this._roomList().filter(t=>t.id!==e)}_inBens(e){let t=this._bensId();if(!t)return!1;if(e.where)return e.where==="bens";let s=this._equipsOn()?e.equips||[]:[];return s.length?this._roomsOfEquips(s).includes(t):this._pickedRooms(e).includes(t)}_renderWhere(e){let t=this._bensId();if(!t||!(this._roomsOn()||this._equipsOn()))return u;let s=this._inBens(e),a=this._equipsOn()?e.equips||[]:[],i=r=>{if(r===s)return;let l=a.filter(c=>(this._equipOf(c)||{}).comodo===t===r);this._setForm({where:r?"bens":"casa",equips:l,equipQ:"",equipMore:!1,equipAdding:!1,...r?{room:t,rooms:[t]}:{room:null,rooms:[]}})};return n`<div class="field where-field">
        <div class="seg where" role="group" aria-label="Casa ou Bens">
          <button class=${s?"":"on"} aria-pressed=${s?"false":"true"} @click=${()=>i(!1)}>${J("house")}<span>Casa</span></button>
          <button class=${s?"on":""} aria-pressed=${s?"true":"false"} @click=${()=>i(!0)}>${J("car")}<span>Bens</span></button>
        </div>
      </div>`}_equipsOn(){let e=this._rooms;return!!(e&&e.equips_on&&e.itens&&e.itens.length)}_equipList(){return this._rooms&&this._rooms.itens||[]}_equipOf(e){return e&&this._equipList().find(t=>t.id===e)||null}_equipIdsOf(e,t){if(!this._equipsOn())return[];let s=this._rooms.emap&&this._rooms.emap[e];return Ee(s&&s[gt(t)]).filter(a=>this._equipOf(a))}_equipIdOf(e,t){return this._equipIdsOf(e,t)[0]||null}_roomsOfEquips(e){let t=Ee(e).map(s=>(this._equipOf(s)||{}).comodo).filter(s=>s&&this._roomList().some(a=>a.id===s));return[...new Set(t)]}async _setTaskEquip(e,t,s,a=null){if(this._equipsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/equips/set",entity_id:e,summary:t,equips:Ee(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o equipamento")}}_renderEquipTag(e,t){let s=this._equipIdsOf(e,t.summary).map(a=>this._equipOf(a));return s.length?s.length>1?n`<span class="tag room" title=${s.map(a=>a.nome).join(", ")}>${J("package")}Vários equipamentos</span>`:n`<span class="tag room" title=${s[0].nome}>${J("package")}${D(s[0].nome,26)}</span>`:u}_equipItems(e=null){let t=this._bensId(),s=this._equipList().map(i=>({id:i.id,nome:i.nome,zona:i.zona,roomId:i.comodo,roomName:this._roomName(i.comodo)||""}));if(!e||!t)return s;let a=this._inBens(e);return s.filter(i=>i.roomId===t===a)}_renderEquipField(e){if(!this._equipsOn())return u;let t=e.equips||[],s=this._inBens(e),a=s?this._bensId():this._roomsOn()?t.length?this._roomsOfEquips(t)[0]||null:this._allRooms(this._pickedRooms(e))?null:e.room:null;return n`<div class="field">
        <span class="flabel">${J(s?"car":"package","lbl-ic")}${s?t.length>1?"Bens":"Bem":t.length>1?"Equipamentos":"Equipamento"}</span>
        ${je({lit:{html:n,nothing:u},icon:J,items:this._equipItems(e),bens:s,room:a,roomName:a&&this._roomName(a)||"",value:t,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:i=>this._setForm({equipQ:i,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:i=>this._setForm({equips:[...t,i],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:i=>{let r=t.filter(c=>c!==i),l=this._roomsOfEquips(t);this._setForm({equips:r,...s?{where:"bens"}:{},...!r.length&&this._roomsOn()?{room:l[0]||e.room||null,rooms:l.length?l:e.room?[e.room]:[]}:{}})}})}
      </div>`}_formRooms(e){if(!this._roomsOn())return[];let t=this._equipsOn()?e.equips||[]:[];return t.length?this._roomsOfEquips(t):this._pickedRooms(e)}_pickedRooms(e){return(Array.isArray(e.rooms)?e.rooms:e.room?[e.room]:[]).filter(s=>this._roomList().some(a=>a.id===s))}async _saveTaskPlace(e,t,s,a=null){let i=this._formRooms(s),r=this._equipsOn()?s.equips||[]:[];(!za(i,s.roomsOrig||[])||a&&(s.roomsOrig||[]).length)&&await this._setTaskRoom(e,t,i,a),(!za(r,s.equipsOrig||[])||a&&(s.equipsOrig||[]).length)&&await this._setTaskEquip(e,t,r,a)}_placeText(e,t,{rooms:s=!0,equips:a=!0}={}){let i=s?this._roomIdsOf(e,t).map(l=>this._roomName(l)):[],r=a?this._equipIdsOf(e,t).map(l=>this._equipOf(l)):[];return[...i,...r.flatMap(l=>[l.nome,l.zona||""])].filter(Boolean).join(" ")}_roomIdsOf(e,t){if(!this._roomsOn())return[];let s=this._rooms.map&&this._rooms.map[e];return Ee(s&&s[gt(t)]).filter(a=>this._roomList().some(i=>i.id===a))}_roomIdOf(e,t){return this._roomIdsOf(e,t)[0]||null}_roomName(e){let t=this._roomList().find(s=>s.id===e);return t?t.nome:null}_allRooms(e){let t=this._houseRooms();return t.length>1&&t.every(s=>(e||[]).includes(s.id))}async _setTaskRoom(e,t,s,a=null){if(this._roomsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/rooms/set",entity_id:e,summary:t,rooms:Ee(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o c\xF4modo")}}_renderRoomTag(e,t){if(this._equipIdsOf(e,t.summary).length>1)return u;let s=this._roomIdsOf(e,t.summary),a=s.map(i=>this._roomName(i)).join(", ");return this._allRooms(s)?n`<span class="tag room" title=${a}>${J("house")}Todos os cômodos</span>`:s.length>1?n`<span class="tag room" title=${a}>${J("door-open")}Vários cômodos</span>`:s.length?n`<span class="tag room">${J(s[0]===this._bensId()?"car":"door-open")}${D(this._roomName(s[0]),22)}</span>`:u}_renderRoomField(e,t=!0){let s=t?this._renderWhere(e):u;if(!this._roomsOn()||this._inBens(e))return s;let a=this._equipsOn()&&(e.equips||[]).length>0,i=a?this._roomsOfEquips(e.equips):this._pickedRooms(e),r=d=>{let h=i.includes(d)?i.filter(p=>p!==d):[...i,d];this._setForm({rooms:h,room:h[0]||null})},l=this._houseRooms().map(d=>d.id),c=!a&&this._allRooms(i);return n`${s}<div class="field">
        <span class="flabel">${J("door-open","lbl-ic")}${i.length>1?"C\xF4modos":"C\xF4modo"}</span>
        <div class="chip-row grid ${a?"locked":""}">
          <button class="pick ${i.length?"":"on"}" ?disabled=${a} @click=${()=>this._setForm({room:null,rooms:[]})}>${J("x")}<span>Nenhum</span></button>
          ${l.length>1?n`<button class="pick room all-rooms ${c?"on":""}" aria-pressed=${c?"true":"false"} ?disabled=${a} @click=${()=>this._setForm(c?{room:null,rooms:[]}:{rooms:l,room:l[0]})}>${J("house")}<span>Todos</span></button>`:u}
          ${this._houseRooms().map(d=>n`<button class="pick room ${i.includes(d.id)?"on":""}" aria-pressed=${i.includes(d.id)?"true":"false"} ?disabled=${a} @click=${()=>r(d.id)}>${J("door-open")}<span>${D(d.nome,22)}</span></button>`)}
        </div>
        ${a?n`<span class="field-hint">${J("lock")}<span>Vem ${e.equips.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:u}
      </div>`}_renderRoomsPanel(){if(!this.hass.resolvia)return u;let e=this._rooms||{},t=this._app("rooms_on",!1)===!0,s=this._app("equips_on",!1)===!0,a=(e.comodos||[]).length,i=(e.itens||[]).length,r=(d,h,p,f)=>n`<div class="row switch-row">
        <div class="grow"><div class="label">${J(d==="Usar c\xF4modos"?"house":"cpu","lbl-ic")}${d}</div><div class="hint" style="white-space:normal">${h?p:"Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${h} @change=${g=>f(g.target.checked)} aria-label=${d} /><span class="track"></span></label>
      </div>`,l=u;if(t||s){let d=[t&&a?C(a,"c\xF4modo","c\xF4modos"):"",s&&i?C(i,"equipamento","equipamentos"):""].filter(Boolean).join(" \xB7 "),h=this._roomsBusy?"off":d?e.erro?"warn":"ok":"bad",p=this._roomsBusy?"Verificando\u2026":d||(e.encontrado?"Nada cadastrado":"InventarIA n\xE3o encontrado"),f=this._roomsBusy?"":e.erro||(d?t&&a?e.comodos.map(g=>g.nome).join(", "):"":e.encontrado?"Cadastre os c\xF4modos e os itens no InventarIA.":"Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");l=n`<div class="sub-op"><div class="sub-box"><div class="ai-state ${h}"><span class="dot"></span><div><b>${p}</b>${f?n`<span>${f}</span>`:u}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${()=>this._refreshRooms()}>${J("rotate-ccw")}Verificar de novo</button></div></div></div>`}let c=this._aiOn()?", e a IA sugere qual":"";return n`<div class="panel" id="comodos">
        ${this._secHead("house","InventarIA","Para ligar uma tarefa a um c\xF4modo ou a um equipamento da casa.")}
        ${r("Usar c\xF4modos",t,`Cada tarefa pode ter um c\xF4modo${c}.`,d=>this._toggleRooms(d))}
        ${r("Usar equipamentos",s,`Cada tarefa pode ser de um equipamento ou m\xF3vel${c}.`,d=>this._toggleEquips(d))}
        ${l}
      </div>`}async _toggleEquips(e){await this._saveAppPrefs({equips_on:e?!0:null}),await this._refreshRooms()}async _toggleRooms(e){await this._saveAppPrefs({rooms_on:e?!0:null}),await this._refreshRooms()}async _refreshRooms(){this._roomsBusy=!0,this.requestUpdate(),await this._loadRooms("resolvia/rooms/refresh"),this._roomsBusy=!1,this.requestUpdate()}};var ae={quick:!1,editing:null,menu:!1},Pa=4;async function vt(o,e=[]){let t=e.slice(),s=i=>new Promise((r,l)=>{let c=new FileReader;c.onload=()=>r(String(c.result).split(",")[1]||""),c.onerror=()=>l(c.error),c.readAsDataURL(i)}),a=[];for(let i of Array.from(o||[])){if(i.type==="application/pdf"||/\.pdf$/i.test(i.name||"")){if(i.size>15*1024*1024){a.push("Arquivo grande demais (at\xE9 15 MB).");continue}t=[{nome:i.name||"arquivo.pdf",pdf:!0,mime:"application/pdf",data:await s(i),url:""}];continue}if(i.type&&!/^image\//.test(i.type)){a.push("Escolha uma foto ou um PDF.");continue}if(t.length>=Pa||t.some(l=>l.pdf))if(t.some(l=>l.pdf))t=[];else{a.push(`At\xE9 ${Pa} arquivos por mensagem.`);break}try{let l=await createImageBitmap(i,{imageOrientation:"from-image"}),c=Math.min(1,1600/Math.max(l.width,l.height)),d=document.createElement("canvas");d.width=Math.max(1,Math.round(l.width*c)),d.height=Math.max(1,Math.round(l.height*c));let h=d.getContext("2d");h.fillStyle="#fff",h.fillRect(0,0,d.width,d.height),h.drawImage(l,0,0,d.width,d.height),l.close&&l.close();let p=await new Promise(f=>d.toBlob(f,"image/jpeg",.86));t.push({nome:i.name||`Foto ${t.length+1}.jpg`,pdf:!1,mime:"image/jpeg",data:await s(p),url:URL.createObjectURL(p)})}catch{a.push("N\xE3o deu para abrir esta foto. Use JPG ou PNG.")}}return{files:t,error:a[0]||""}}function $o(o,e=[]){try{let t=JSON.parse(localStorage.getItem(`${o}-perguntas`)||"null");if(Array.isArray(t))return t.filter(s=>typeof s=="string"&&s.trim())}catch{}return e}function Da(o,e){try{e==null?localStorage.removeItem(`${o}-perguntas`):localStorage.setItem(`${o}-perguntas`,JSON.stringify(e))}catch{}}function La({lit:o,icon:e,app:t="",messages:s=[],draft:a="",busy:i=!1,error:r="",voice:l=null,examples:c=[],files:d=[],onDraft:h,onSend:p,onMic:f,onAction:g,onAll:w,onClear:b,onClose:k,onAttach:y=null,onFileRemove:x=()=>{},onRedraw:_=()=>{}}){let{html:A,nothing:T}=o,E=()=>{let q=(a||"").trim();(q||d.length)&&!i&&p(q)},v=t?$o(t,c):c,$=q=>(Object.assign(ae,q),_()),S=q=>{$({quick:!1}),p(q)},I=()=>{let q=ae.editing;if(q){let X=F=>{let he=(q.draft||"").trim(),ce=F&&F.closest(".chat-ed-new")&&F.closest(".chat-ed-new").querySelector("input");ce&&(ce.value=""),he&&$({editing:{list:[...q.list,he],draft:""}})};return A`<div class="chat-ed">
        <span class="chat-ed-h">${e("pencil")}Perguntas prontas</span>
        ${q.list.map((F,he)=>A`<div class="chat-ed-row"><span>${F}</span><button type="button" class="icon-btn" aria-label=${`Tirar \u201C${F}\u201D`} @click=${()=>$({editing:{...q,list:q.list.filter((ce,kt)=>kt!==he)}})}>${e("x")}</button></div>`)}
        <div class="chat-ed-new">
          <input type="text" maxlength="120" .value=${q.draft||""} placeholder="Nova pergunta" aria-label="Nova pergunta" enterkeyhint="done"
            @input=${F=>q.draft=F.target.value} @keydown=${F=>{F.key==="Enter"&&(F.preventDefault(),X(F.target))}} />
          <button type="button" class="btn outline sm" @click=${F=>X(F.currentTarget)}>${e("plus")}Adicionar</button>
        </div>
        <div class="chat-ed-acts">
          <button type="button" class="btn outline sm" @click=${()=>(Da(t,null),$({editing:{list:c.slice(),draft:""}}))}>${e("rotate-ccw")}Padrão</button>
          <button type="button" class="btn primary sm" @click=${()=>{let F=q.list.concat((q.draft||"").trim()?[(q.draft||"").trim()]:[]);Da(t,F.join(`
`)===c.join(`
`)?null:F),$({editing:null})}}>${e("check")}Pronto</button>
        </div>
      </div>`}return A`<div class="chat-ex">${v.map(X=>A`<button type="button" class="pick" @click=${()=>S(X)}>${e("sparkles")}<span>${X}</span></button>`)}</div>
      ${t?A`<button type="button" class="text-btn chat-ed-open" @click=${()=>$({editing:{list:v.slice(),draft:""}})}>${e("pencil")}Editar perguntas</button>`:T}`},R=(q,X,F,he)=>A`<div class="chat-act ${F.state||"todo"}">
    <span class="chat-act-ic">${e(F.state==="done"?"check":F.state==="failed"?"circle-alert":F.icon||"sparkles")}</span>
    <span class="chat-act-tx">${F.label}${F.note?A`<small>${F.note}</small>`:T}</span>
    ${F.state==="done"?A`<span class="chat-act-ok">Feito</span>`:F.state==="doing"?A`<span class="chat-act-ok">…</span>`:A`<button type="button" class="btn primary sm" @click=${()=>g(X,he)}>${e(F.state==="failed"?"rotate-ccw":"check")}${F.state==="failed"?"Tentar de novo":"Fazer"}</button>`}
  </div>`,z=(q,X)=>{let F=(q.actions||[]).filter(ce=>ce.state!=="done"&&ce.state!=="doing").length,he=q.role==="user"&&Array.isArray(q.anexos)?q.anexos:[];return A`<div class="chat-msg ${q.role==="user"?"me":"ia"}">
      ${q.text||he.length?A`<div class="chat-bubble">${he.map(ce=>A`<span class="chat-arq">${e("paperclip")}${ce}</span>`)}${q.text||""}</div>`:T}
      ${(q.actions||[]).length?A`<div class="chat-acts">
            ${q.actions.map((ce,kt)=>R(q,X,ce,kt))}
            ${F>1?A`<button type="button" class="btn outline sm chat-all" @click=${()=>w(X)}>${e("check")}Fazer todas (${F})</button>`:T}
          </div>`:T}
    </div>`},L=l&&l.on,K=!!y&&!L,U=K&&ae.menu,P=q=>($({menu:!1}),y(q)),B=!!(l&&l.ready)&&(L||!(a||"").trim()&&!d.length);return A`<div class="chat">
    <div class="chat-head">
      <span class="chat-title">${e("message-circle")}Conversa</span>
      ${s.length?A`<button type="button" class="text-btn chat-nova" aria-label="Nova conversa" @click=${()=>b()}>${e("plus")}<span>Nova conversa</span></button>`:T}
      <button type="button" class="icon-btn" aria-label="Fechar" @click=${()=>k()}>${e("x")}</button>
    </div>
    <div class="chat-log">
      ${s.length?s.map(z):v.length||t?A`<div class="chat-empty">${I()}</div>`:T}
      ${i?A`<div class="chat-msg ia"><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>`:T}
      ${r?A`<div class="chat-error">${e("circle-alert")}<span>${r}</span></div>`:T}
    </div>
    ${s.length&&(ae.quick||ae.editing)?A`<div class="chat-quick">${I()}</div>`:T}
    ${U?A`<div class="chat-menu" role="menu">
          <button type="button" class="chat-op" role="menuitem" @click=${()=>P("camera")}>${e("camera")}Tirar foto</button>
          <button type="button" class="chat-op" role="menuitem" @click=${()=>P("fotos")}>${e("images")}Escolher fotos</button>
          <button type="button" class="chat-op" role="menuitem" @click=${()=>P("arquivo")}>${e("file-text")}Escolher arquivo</button>
        </div>`:T}
    ${d.length?A`<div class="chat-files">${d.map((q,X)=>A`<div class="chat-file">${q.pdf?A`<span class="chat-pdf">${e("file-text")}</span>`:A`<img src=${q.url} alt="" />`}<span class="chat-file-n">${q.nome}</span><button type="button" class="icon-btn" aria-label=${`Tirar ${q.nome}`} @click=${()=>x(X)}>${e("x")}</button></div>`)}</div>`:T}
    <form class="chat-input" @submit=${q=>(q.preventDefault(),E())}>
      ${K?A`<button type="button" class="icon-btn chat-clip ${U?"on":""}" aria-label="Anexar" title="Anexar" aria-expanded=${U?"true":"false"} ?disabled=${i} @click=${()=>$({menu:!ae.menu,quick:!1,editing:null})}>${e("paperclip")}</button>`:T}
      <textarea rows="1" data-size="off" .value=${a} placeholder=${L?"Ouvindo\u2026":"Pergunte o que quiser"} aria-label="Mensagem para a IA" ?disabled=${L}
        @input=${q=>h(q.target.value)}
        @keydown=${q=>{q.key==="Enter"&&!q.shiftKey&&!q.isComposing&&(q.preventDefault(),E())}}></textarea>
      ${s.length&&(v.length||t)&&!L?A`<button type="button" class="icon-btn chat-qbtn ${ae.quick||ae.editing?"on":""}" aria-label="Perguntas prontas" aria-expanded=${ae.quick||ae.editing?"true":"false"} title="Perguntas prontas" @click=${()=>$({quick:!(ae.quick||ae.editing),editing:null,menu:!1})}>${e("sparkles")}</button>`:T}
      ${B?A`<button type="button" class="icon-btn chat-mic ${L?"on":""}" aria-label=${L?"Pronto: enviar o que falei":"Falar"} ?disabled=${i||l.starting} @click=${()=>f()}>${e(L?"check":"mic")}</button>`:A`<button type="submit" class="icon-btn chat-send" aria-label="Enviar" ?disabled=${i||L||!((a||"").trim()||d.length)}>${e("send")}</button>`}
    </form>
  </div>`}var Fa=`
  .chat { display: flex; flex-direction: column; height: min(78vh, 680px); margin: -4px -4px 0; }
  .chat-head { display: flex; align-items: center; gap: 10px; padding: 0 0 10px; }
  .chat-title { display: inline-flex; align-items: center; gap: 8px; flex: 1; font-weight: 700; font-size: 18px; }
  .chat-title .i { width: 30px; height: 30px; padding: 6px; border-radius: 9px; background: var(--rv-accent-soft); color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-head .text-btn { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
  @media (max-width: 340px) { .chat-nova span { display: none; } }
  .chat-head .text-btn .i { width: 16px; height: 16px; }
  .chat-log { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding: 6px 2px 12px; overscroll-behavior: contain; }
  .chat-empty { margin: auto 0 0; color: var(--rv-muted); font-size: 15px; line-height: 1.45; }
  .chat-empty p { margin: 0 0 12px; }
  .chat-ex { display: flex; flex-wrap: wrap; gap: 8px; }
  .chat-ex .pick { font-size: 14px; padding: 8px 12px; min-height: 0; display: inline-flex; align-items: center; gap: 6px; }
  .chat-ex .pick .i { width: 16px; height: 16px; flex: none; color: var(--rv-accent-ink, var(--rv-accent)); }
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
  .chat-act .btn.sm { min-height: 36px; padding: 0 14px; gap: 6px; }
  .chat-act .btn.sm .i, .chat-all .i { width: 16px; height: 16px; }
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
  .chat-qbtn.on, .chat-clip.on { background: var(--rv-accent-soft); color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-input textarea::placeholder { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chat-menu { display: grid; gap: 2px; margin-top: 8px; padding: 6px; border-radius: 16px; border: 1.5px solid var(--rv-line); }
  .chat-op { display: flex; align-items: center; gap: 12px; min-height: 50px; padding: 0 12px; border-radius: 12px; font: inherit; font-size: 16px; color: var(--rv-text); text-align: left; background: none; border: 0; cursor: pointer; }
  .chat-op:active { background: var(--rv-accent-soft); }
  .chat-op .i { width: 20px; height: 20px; color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-files { display: grid; gap: 6px; margin-top: 8px; }
  .chat-file { display: flex; align-items: center; gap: 10px; padding: 4px 4px 4px 6px; border-radius: 12px; border: 1.5px solid var(--rv-line); font-size: 14px; }
  .chat-file img, .chat-file .chat-pdf { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; flex: none; display: grid; place-items: center; color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-file-n { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chat-file .icon-btn { width: 36px; height: 36px; flex: none; }
  .chat-arq { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 14px; }
  .chat-arq .i { width: 15px; height: 15px; flex: none; }
  .chat-quick { max-height: 42vh; overflow-y: auto; padding: 10px 2px; border-top: 1px solid var(--rv-line); }
  .chat-ed-open { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; }
  .chat-ed-open .i { width: 16px; height: 16px; }
  .chat-ed { display: grid; gap: 8px; color: var(--rv-text); }
  .chat-ed-h { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; }
  .chat-ed-h .i { width: 18px; height: 18px; color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-ed-row { display: flex; align-items: center; gap: 8px; padding: 4px 0 4px 12px; border-radius: 12px; border: 1.5px solid var(--rv-line); font-size: 14.5px; }
  .chat-ed-row span { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  .chat-ed-row .icon-btn { width: 40px; height: 40px; flex: none; }
  .chat-ed-new { display: flex; gap: 8px; }
  .chat-ed-new input { flex: 1; min-width: 0; min-height: 44px; padding: 0 12px; border-radius: 12px; border: 1.5px solid var(--rv-line-strong, var(--rv-line)); background: var(--rv-input-bg, transparent); color: var(--rv-text); font: inherit; font-size: 15px; }
  .chat-ed-new input:focus { outline: none; border-color: var(--rv-accent); }
  .chat-ed-acts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .chat-ed .btn.sm { min-height: 44px; justify-content: center; gap: 6px; }
  .chat-ed .btn.sm .i { width: 16px; height: 16px; }
`;var Te=class{constructor(e){this.onLevel=e,this.chunks=[],this.length=0,this.rate=16e3}async start(){let e=navigator.mediaDevices;if(!e||!e.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await e.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let t=window.AudioContext||window.webkitAudioContext;try{this.ctx=new t({sampleRate:16e3})}catch{this.ctx=new t}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let i=0;for(let r=0;r<a.length;r+=4)i+=a[r]*a[r];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(i/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let e=new Float32Array(this.length),t=0;for(let r of this.chunks)e.set(r,t),t+=r.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(e.length/s),i=new Int16Array(a);for(let r=0;r<a;r++){let l=Math.floor(r*s),c=Math.max(l+1,Math.min(e.length,Math.floor((r+1)*s))),d=0;for(let p=l;p<c;p++)d+=e[p];let h=Math.max(-1,Math.min(1,d/(c-l)));i[r]=h<0?h*32768:h*32767}return i}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let e of this.stream.getTracks())e.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function bt(o){let e=o&&o.name||"";return e==="NotAllowedError"||e==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":e==="NotFoundError"||e==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":e==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":e==="NoApi"?window.isSecureContext===!1?"O microfone aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), o celular e o navegador n\xE3o deixam usar o microfone, nem pelo app do Home Assistant.":"Este navegador n\xE3o deixa usar o microfone aqui.":`N\xE3o consegui abrir o microfone (${o&&o.message||e||"erro"}).`}var Na=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,Ha=o=>o.status==="completed",Ba="resolvia-conversa",Va=o=>class extends o{_chatState(){if(!this._chat){let e=[];try{e=JSON.parse(sessionStorage.getItem(Ba)||"[]")}catch{}this._chat={messages:Array.isArray(e)?e:[],draft:"",busy:!1,error:"",rec:null,files:[]}}return this._chat}_setChat(e){if(this._chat={...this._chatState(),...e},"messages"in e)try{sessionStorage.setItem(Ba,JSON.stringify(this._chat.messages.slice(-30)))}catch{}this.requestUpdate()}_renderChatBtn(){return!this._aiOn()||!this.hass.resolvia?u:n`<button class="mic-top chat-top" aria-label="Conversar com a IA" title="Conversar com a IA" @click=${()=>this._openChat()}>${Na("message-circle")}</button>`}_openChat(){this._openSheet("chat",{}),this._chatScroll=!0,this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".chat-input textarea");e&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches&&e.focus()})}_renderChatSheet(){let e=this._chatState(),t=this._voice||{};return La({lit:{html:n,nothing:u},icon:Na,app:"resolvia",onRedraw:()=>this.requestUpdate(),messages:e.messages,draft:e.draft,busy:e.busy,error:e.error,voice:{ready:!!t.ready&&this._micOk(),on:e.rec==="on",starting:e.rec==="starting"},examples:this._chatExamples(),onDraft:s=>this._setChat({draft:s}),onSend:s=>this._chatSend(s),onMic:()=>this._chatMic(),onAction:(s,a)=>this._chatDo(s,a),onAll:s=>this._chatDoAll(s),onClear:()=>this._setChat({messages:[],error:""}),onClose:()=>this._closeSheet(),files:e.files||[],onAttach:s=>this._chatAttach(s),onFileRemove:s=>this._setChat({files:(e.files||[]).filter((a,i)=>i!==s)})})}_chatAttach(e){if(e==="camera")return this._openCamera({chat:!0});let t=document.createElement("input");t.type="file",t.accept=e==="fotos"?"image/*":"image/*,application/pdf",t.multiple=e==="fotos"&&!this._isHaAndroid(),t.style.display="none",t.addEventListener("change",()=>{let s=Array.from(t.files||[]);t.remove(),s.length&&this._chatAddFiles(s)}),document.body.appendChild(t),t.click()}async _chatAddFiles(e){let{files:t,error:s}=await vt(e,this._chatState().files||[]);this._setChat({files:t,error:s}),this._chatScroll=!0}_chatAddShots(e){let t=(this._chatState().files||[]).filter(a=>!a.pdf),s=[...t,...e.map((a,i)=>({nome:`Foto ${t.length+i+1}.jpg`,pdf:!1,mime:a.mime||"image/jpeg",data:a.data,url:a.url}))].slice(0,4);this._setChat({files:s,error:""}),this._sheet!=="chat"&&this._openChat()}_micOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_chatExamples(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?[`O que \xE9 mais urgente em ${D(t.name,24)}?`,"Por onde eu come\xE7o hoje?"]:[]}return[...this._dueOn()?["O que est\xE1 atrasado?"]:[],"Por onde eu come\xE7o hoje?","Adiciona leite na lista de compras"]}_chatScreen(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?`a lista "${t.name}"`:"uma lista"}return e.name==="search"?this._query?`Buscar, procurando "${this._query}"`:"Buscar":e.name==="lists"?"Listas (todas as listas, com o que falta em cada uma)":e.name==="more"?"Mais (o menu: Listas, Gr\xE1ficos, Configura\xE7\xF5es e Sobre)":e.name==="sobre"?"Mais \u203A Sobre (CorrerIA Code, quem faz o app, os outros apps da fam\xEDlia e o GitHub)":e.name==="listas"?"Mais \u203A Listas (nome, cor, \xEDcone e quais listas aparecem)":e.name==="graficos"?`Mais \u203A Gr\xE1ficos (gr\xE1ficos das ${this._chartsLine().replace(/\.$/,"").toLowerCase()})`:e.name==="config"?"Mais \u203A Configura\xE7\xF5es (integra\xE7\xF5es, dados, apar\xEAncia e op\xE7\xF5es do app: prazos, exibi\xE7\xE3o, quem faz e repeti\xE7\xE3o)":this._dueOn()?"Agora, o in\xEDcio (o que est\xE1 atrasado, o que vence hoje e nos pr\xF3ximos dias e por onde come\xE7ar)":"Agora, o in\xEDcio (por onde come\xE7ar)"}_chatContext(){let e=this._view(),t=this._visible().slice(),s=e.name==="list"?this._list(e.id):null;s&&!t.includes(s)&&t.unshift(s),t.sort((i,r)=>+(r===s)-+(i===s));let a=new Date;return{tela:this._chatScreen(),listas:t.map(i=>{let r=(i.items||[]).filter(l=>!Ha(l));return{id:i.id,nome:i.name,adicionar:O(i.features,M.CREATE)&&!i.unavailable,prazos:!i.noDue&&O(i.features,M.DUE_DATE),pendentes:r.length,itens:r.slice(0,i===s?120:40).map(l=>{let c=te(l.due),d=c?se(l.due,a):null;return{texto:l.summary||"",prazo:c&&!i.noDue?c.date:null,atrasado:!!(d&&d.tone==="late"&&!i.noDue),pontos:this._pointsOf&&this._pointsOf(i.id,l.summary,l.uid)||0,comodo:this._roomIdsOf(i.id,l.summary).map(h=>this._roomName(h)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(i.id,l.summary).map(h=>(this._equipOf(h)||{}).nome).filter(Boolean).join(", "),externo:(h=>h===!0?"sim":h||"")(this._externalOf(i.id,l.summary))}})}})}}async _chatSend(e){let t=this._chatState();if(t.busy)return;let s=t.files||[],a=s.length?{role:"user",text:e,anexos:s.map(r=>r.nome)}:{role:"user",text:e},i=[...t.messages,a];this._setChat({messages:i,draft:"",busy:!0,error:"",files:[]}),this._chatScroll=!0;try{let r={messages:i.map(d=>({role:d.role,text:d.text||(d.actions||[]).map(h=>h.label).join("; "),...d.anexos?{anexos:d.anexos}:{}})),context:this._chatContext()},l=s.length?await this.hass.resolvia.chat({...r,files:s.map(d=>({data:d.data,mime:d.mime,nome:d.nome}))}):await this.hass.callWS({type:"resolvia/ai/chat",...r});for(let d of s)d.url&&URL.revokeObjectURL(d.url);let c=(l.actions||[]).map(d=>({...d,label:this._chatLabel(d),icon:d.tipo==="concluir"?"check":"plus",state:"todo"}));this._setChat({messages:[...this._chatState().messages,{role:"ia",text:l.reply||"",actions:c}],busy:!1})}catch(r){this._setChat({busy:!1,error:r.message||"A IA n\xE3o respondeu. Tente de novo.",...s.length?{files:s,messages:this._chatState().messages.filter(l=>l!==a)}:{}})}this._chatScroll=!0}_chatLabel(e){return e.tipo==="concluir"?`Concluir "${D(e.item,60)}" em ${D(e.nome,30)}`:`Adicionar "${D(e.item,60)}" em ${D(e.nome,30)}${e.prazo?` \xB7 prazo ${e.prazo.slice(8,10)}/${e.prazo.slice(5,7)}`:""}`}_setAction(e,t,s){let a=this._chatState().messages.map((i,r)=>r===e?{...i,actions:i.actions.map((l,c)=>c===t?{...l,...s}:l)}:i);this._setChat({messages:a})}async _chatDo(e,t){let s=((this._chatState().messages[e]||{}).actions||[])[t];if(!s||s.state==="done"||s.state==="doing")return;this._setAction(e,t,{state:"doing",note:""});let a=this._list(s.lista),i=!1,r="";if(!a)r="Lista n\xE3o encontrada.";else if(s.tipo==="adicionar")i=await this._addFull(a,{summary:s.item,description:"",date:s.prazo||null,time:null});else{let l=(a.items||[]).find(c=>!Ha(c)&&H(c.summary)===H(s.item));l?(await this._toggle(a,l),i=!0):r="Esse item n\xE3o est\xE1 mais pendente."}this._setAction(e,t,{state:i?"done":"failed",note:i?"":r||"N\xE3o deu certo."})}async _chatDoAll(e){let t=(this._chatState().messages[e]||{}).actions||[];for(let s=0;s<t.length;s++)t[s].state!=="done"&&await this._chatDo(e,s)}async _chatMic(){let e=this._chatState();if(e.rec==="on"){let s=this._chatRec;if(this._chatRec=null,clearTimeout(this._chatRecTimer),!s)return this._setChat({rec:null});let a=s.stop();if(this._setChat({rec:null}),a.length<16e3*.4)return this._setChat({error:"N\xE3o ouvi nada. Toque no microfone e fale."});this._setChat({busy:!0,error:""});try{let i=await this.hass.resolvia.voiceText(a);this._setChat({busy:!1}),i&&i.text&&this._chatSend(i.text)}catch(i){this._setChat({busy:!1,error:i.message||"N\xE3o consegui transcrever."})}return}if(e.rec)return;let t=new Te(()=>{});this._chatRec=t,this._setChat({rec:"starting",error:""});try{await t.start()}catch(s){return t.cancel(),this._chatRec=null,this._setChat({rec:null,error:bt(s)})}if(this._chatRec!==t)return t.cancel();this._setChat({rec:"on"}),this._chatRecTimer=setTimeout(()=>this._chatState().rec==="on"&&this._chatMic(),120*1e3)}_chatStop(){clearTimeout(this._chatRecTimer),this._chatRec&&this._chatRec.cancel(),this._chatRec=null,this._chat&&this._chat.rec&&(this._chat={...this._chat,rec:null})}_chatAfterRender(){if(!this._chatScroll||this._sheet!=="chat")return;this._chatScroll=!1;let e=this.renderRoot.querySelector(".chat-log");e&&(e.scrollTop=e.scrollHeight)}};var Ue=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,Ie=o=>o===!0?!0:typeof o=="string"&&o.trim()?o.replace(/\s+/g," ").trim().slice(0,60):null,ja=o=>class extends o{async _loadExternal(){if(!(!this.hass||!this.hass.resolvia)){try{this._ext=(await this.hass.callWS({type:"resolvia/external/get"})).ext||{}}catch{this._ext=this._ext||{}}this.requestUpdate()}}_extOn(){return!this._app("ext_off",!1)}_externalRaw(e,t){let s=this._ext&&this._ext[e];return Ie(s&&s[gt(t)])}_externalOf(e,t){return this._extOn()?this._externalRaw(e,t):null}_externalText(e,t){let s=this._externalOf(e,t);return s?s===!0?"Servi\xE7o externo":`Servi\xE7o externo ${s}`:""}async _setTaskExternal(e,t,s,a=null){if(!(!this.hass||!this.hass.resolvia))try{this._ext=(await this.hass.callWS({type:"resolvia/external/set",entity_id:e,summary:t,value:Ie(s),...a!=null?{previous_summary:a}:{}})).ext||{},this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar quem faz")}}async _saveTaskExternal(e,t,s,a=null){let i=Ie(s.ext),r=Ie(s.extOrig);(i!==r||a&&r)&&await this._setTaskExternal(e,t,i,a)}_renderExternalOption(e){let t=this._extOn();return n`<div class="panel" id="quem-faz">
        ${this._secHead("hard-hat","Quem faz")}
        <div class="row switch-row">
          <div class="grow"><div class="label">${Ue("hard-hat","lbl-ic")}Serviços externos</div><div class="hint" style="white-space:normal">${t?"Quem faz em cada tarefa: voc\xEAs ou algu\xE9m de fora.":"Desligado."}</div></div>
          ${e(t,"Servi\xE7os externos",s=>this._saveAppPrefs({ext_off:s.target.checked?null:!0}))}
        </div>
      </div>`}_renderExternalTag(e,t){let s=this._externalOf(e,t.summary);return s?n`<span class="tag ext">${Ue("hard-hat")}${s===!0?"Servi\xE7o externo":D(s,26)}</span>`:u}_renderExternalField(e,t=M.DUE_DATE|M.DESCRIPTION){if(!this._extOn())return u;let s=Ie(e.ext);return!s&&!O(t,M.DUE_DATE)&&!O(t,M.DUE_DATETIME)&&!O(t,M.DESCRIPTION)?u:n`<div class="field">
        <span class="flabel">${Ue("hard-hat","lbl-ic")}Quem faz</span>
        <div class="chip-row ext-row">
          <button class="pick ${s?"":"on"}" @click=${()=>this._setForm({ext:null})}>${Ue("house")}<span>Nós mesmos</span></button>
          <button class="pick ${s?"on":""}" @click=${()=>this._setForm({ext:s||!0})}>${Ue("hard-hat")}<span>Serviço externo</span></button>
        </div>
        ${s?n`<input type="text" class="ext-who" maxlength="60" .value=${s===!0?"":s} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
              @input=${a=>this._setForm({ext:Ie(a.target.value)||!0})} />`:u}
      </div>`}};var xt=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,Ya=6,Ua=[{key:"late",label:"Atrasados",icon:"circle-alert"},{key:"today",label:"Hoje",icon:"clock"},{key:"week",label:"Pr\xF3ximos 7 dias",icon:"calendar-days"},{key:"later",label:"Mais adiante",icon:"calendar"},{key:"none",label:"Sem prazo",icon:"calendar-off"}],yo=o=>o.status==="completed";function _t(o){return o.map((e,t)=>[e,t]).filter(([e])=>e.n>0).sort((e,t)=>t[0].n-e[0].n||e[1]-t[1]).map(([e])=>e)}function Wa(o,e=!1,t=Ya){if(e||o.length<=t+1)return{shown:o,more:0,moreN:0};let s=o.slice(t);return{shown:o.slice(0,t),more:s.length,moreN:s.reduce((a,i)=>a+i.n,0)}}function ko(o,e=new Date){let t=se(o,e);return t?t.overdue?"late":t.diff===0?"today":t.diff<7?"week":"later":"none"}var ts=(o,e)=>o&&e?Math.max(1,Math.round(o/e*100)):0;function Ao({lists:o=[],due:e=!0,rooms:t=null,equips:s=null,roomsOf:a=()=>[],equipsOf:i=()=>[],extOf:r=()=>null,now:l=new Date}={}){let c=new Set((t||[]).map(E=>E.id)),d=new Map((s||[]).map(E=>[E.id,E])),h=new Map,p=new Map,f=new Map,g=Object.fromEntries(Ua.map(E=>[E.key,0])),w=(E,v)=>E.set(v,(E.get(v)||0)+1),b=0,k=0,y=0,x=0,_=0,A=!1,T=o.map(E=>{let v=(E.items||[]).filter(I=>!yo(I)),$=E.items?v.length:Number(E.pending)||0;b+=$;let S=e&&!E.noDue;S&&v.length&&(A=!0);for(let I of v){let R=s?[...new Set(i(E.id,I.summary))].filter(L=>d.has(L)):[];if(s&&(R.length?R.forEach(L=>w(p,L)):y++),t){let L=new Set([...a(E.id,I.summary),...R.map(K=>d.get(K).comodo)].filter(K=>c.has(K)));L.size?L.forEach(K=>w(h,K)):k++}let z=r(E.id,I.summary);if(!z)x++;else if(_++,typeof z=="string"){let L=f.get(H(z))||{name:z,n:0};L.n++,f.set(H(z),L)}S&&g[ko(I.due,l)]++}return{id:E.id,name:E.name,color:E.color,icon:E.icon,n:$}});return{pending:b,lists:_t(T),rooms:t?{rows:_t(t.map(E=>({id:E.id,name:E.nome,n:h.get(E.id)||0}))),none:k}:null,equips:s?{rows:_t(s.map(E=>({id:E.id,name:E.nome,room:E.room||"",n:p.get(E.id)||0}))),none:y}:null,due:A?Ua.map(E=>({...E,n:g[E.key]})).filter(E=>E.n):null,ext:_?{house:x,ext:_,who:_t([...f.values()])}:null}}var So=o=>o.length>1?`${o.slice(0,-1).join(", ")} e ${o[o.length-1]}`:o[0],Ka=o=>class extends o{_chartsLine(){return`Pend\xEAncias por ${So(["lista",this._roomsOn()&&"c\xF4modo",this._equipsOn()&&"equipamento",this._dueOn()&&"prazo"].filter(Boolean))}.`}_chartsData(e=new Date){let t=this._roomsOn();return Ao({lists:this._visible(),due:this._dueOn(),rooms:t?this._roomList():null,equips:this._equipsOn()?this._equipList().map(s=>({...s,room:t&&this._roomName(s.comodo)||""})):null,roomsOf:(s,a)=>this._roomIdsOf(s,a),equipsOf:(s,a)=>this._equipIdsOf(s,a),extOf:(s,a)=>this._externalOf(s,a),now:e})}_chartsSearch(e,t){this._haptic("light"),this._query=e,this._searchDone=!1,t==="rooms"&&(this._searchRooms=!0),t==="equips"&&(this._searchEquips=!0),t==="ext"&&(this._searchExt=!0),this._go("/buscar")}_chartsOpen(e){return!!(this._chartsFolds&&this._chartsFolds[e])}_chartsToggle(e){this._chartsFolds={...this._chartsFolds||{},[e]:!this._chartsOpen(e)},this.requestUpdate()}_gPanel(e,t,s,a){return n`<div class="panel g-panel" id="g-${e}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${xt(t)}</span><h2>${s}</h2></div>
        ${a}
      </div>`}_gSplit(e,t){return t.length<2?u:n`<div class="g-split" role="img" aria-label="${e}: ${t.map(s=>`${s.name} ${s.n}`).join(", ")}">
        ${t.map(s=>n`<i class=${s.cls||""} style="flex:${s.n} 1 0;${s.style||""}" title="${s.name}: ${s.n}"></i>`)}
      </div>`}_gRow({name:e,sub:t="",n:s,max:a,pct:i=null,tile:r="",cls:l="",style:c="",go:d=null,label:h=""}){let p=n`${r?n`<span class="g-tile">${xt(r)}</span>`:u}
        <span class="g-name"><b>${e}</b>${t?n`<small>${t}</small>`:u}</span>
        <span class="g-n">${s}</span>
        <span class="g-bar"><i style="width:${ts(s,a)}%"></i></span>
        ${i!=null?n`<span class="g-pct">${i}%</span>`:u}`,f=`g-row ${r?"":"bare"} ${i!=null?"with-pct":""} ${l}`;return d?n`<button class=${f} style=${c} aria-label=${h||e} @click=${d}>${p}</button>`:n`<div class=${f} style=${c}>${p}</div>`}_gMore(e,t,s,a){if(t.length<=Ya+1)return u;let i=this._chartsOpen(e);return n`<button class="g-more ${i?"open":""}" aria-expanded=${i?"true":"false"} @click=${()=>this._chartsToggle(e)}>
        <span class="g-more-t">${i?"Ver menos":`+${C(s.more,a[0],a[1])}`}</span>${i?u:n`<span class="g-n">${s.moreN}</span>`}${xt("chevron-down","chev")}
      </button>`}_gLists(e){let t=Wa(e,this._chartsOpen("lists")),s=i=>j(i.color,this._dark),a=[...t.shown.map(i=>({name:i.name,n:i.n,style:s(i)})),...t.more?[{name:`+${C(t.more,"lista","listas")}`,n:t.moreN,cls:"k-rest"}]:[]];return this._gPanel("listas","list-checks","Por lista",n`${this._gSplit("Pendentes por lista",a)}
          ${t.shown.map(i=>this._gRow({name:i.name,n:i.n,max:e[0].n,tile:i.icon,style:s(i),go:()=>this._go(`/lista/${i.id}`),label:`${i.name}: ${C(i.n,"pendente","pendentes")}`}))}
          ${this._gMore("lists",e,t,["lista","listas"])}`)}_gPlaces(e,t,s,a,i){let[r,l,c]=i;if(!a.rows.length)return this._gPanel(e,t,s,n`<p class="panel-lead g-empty">${l}</p>`);let d=Wa(a.rows,this._chartsOpen(e));return this._gPanel(e,t,s,n`${d.shown.map(h=>this._gRow({name:h.name,sub:h.room||"",n:h.n,max:a.rows[0].n,go:()=>this._chartsSearch(h.name,e),label:`${h.name}: ${C(h.n,"pendente","pendentes")}`}))}
          ${this._gMore(e,a.rows,d,c)}
          ${a.none?n`<p class="g-foot">${r}: <b>${a.none}</b></p>`:u}`)}_gDue(e){let t=e.reduce((a,i)=>a+i.n,0),s=Math.max(...e.map(a=>a.n));return this._gPanel("prazos","calendar-clock","Por prazo",n`${this._gSplit("Pendentes por prazo",e.map(a=>({name:a.label,n:a.n,cls:`k-${a.key}`})))}
          ${e.map(a=>this._gRow({name:a.label,n:a.n,max:s,pct:ts(a.n,t),tile:a.icon,cls:`k-${a.key}`,go:a.key==="none"?null:()=>this._go(""),label:`${a.label}: ${C(a.n,"pendente","pendentes")}`}))}`)}_gWho(e){let t=e.house+e.ext,s=e.who.length?e.who[0].name+(e.who.length>1?` +${e.who.length-1}`:""):"",a=[{key:"house",name:"N\xF3s mesmos",n:e.house,icon:"house"},{key:"ext",name:"Servi\xE7o externo",n:e.ext,icon:"hard-hat",sub:s,go:()=>this._chartsSearch("Servi\xE7o externo","ext")}].filter(i=>i.n);return this._gPanel("quem","hard-hat","Quem faz",n`${this._gSplit("Quem faz",a.map(i=>({name:i.name,n:i.n,cls:`k-${i.key}`})))}
          ${a.map(i=>this._gRow({name:i.name,sub:i.sub,n:i.n,max:Math.max(e.house,e.ext),pct:ts(i.n,t),tile:i.icon,cls:`k-${i.key}`,go:i.go,label:`${i.name}: ${C(i.n,"pendente","pendentes")}`}))}`)}_renderCharts(){let e=this._chartsData(),t={text:e.pending?`${C(e.pending,"pendente","pendentes")} em ${C(e.lists.length,"lista","listas")}`:"Nada pendente"};return n`<section class="page">
        ${this._renderPageHead("Gr\xE1ficos",t,!0)}
        ${e.pending?n`<div class="g-grid">
              ${this._gLists(e.lists)}
              ${e.rooms?this._gPlaces("rooms","door-open","Por c\xF4modo",e.rooms,["Sem c\xF4modo","Nenhuma pend\xEAncia com c\xF4modo.",["c\xF4modo","c\xF4modos"]]):u}
              ${e.equips?this._gPlaces("equips","package","Por equipamento",e.equips,["Sem equipamento","Nenhuma pend\xEAncia com equipamento.",["equipamento","equipamentos"]]):u}
              ${e.due?this._gDue(e.due):u}
              ${e.ext?this._gWho(e.ext):u}
            </div>`:n`<div class="panel">
              <div class="empty">
                <div class="em-icon">${xt("chart-bar")}</div>
                <h3>Tudo resolvido</h3>
                <p>Nenhum item pendente nas listas.</p>
              </div>
            </div>`}
      </section>`}},Ja=`
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
`;var Mo=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,wt=o=>String(o).padStart(2,"0"),$t=o=>`${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`;function Eo(o,e=new Date){let t=new Date(o&&o.em);if(!o||Number.isNaN(t.getTime()))return"";let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()-1),a=$t(t)===$t(e)?"hoje":$t(t)===$t(s)?"ontem":`em ${wt(t.getDate())}/${wt(t.getMonth()+1)}`;return`${o.cliente} usou ${a} \xE0s ${wt(t.getHours())}:${wt(t.getMinutes())}.`}var Xa=o=>class extends o{async _loadCorreria(){if(!(!this.hass||!this.hass.resolvia)){try{this._correria=await this.hass.callWS({type:"resolvia/correria/get"})}catch{this._correria=null}this.requestUpdate()}}async _setCorreria(e){this._haptic("light"),await this._saveAppPrefs({correria_on:e?!0:null}),await this._loadCorreria()}_renderCorreriaPanel(){if(!this.hass.resolvia)return u;let e=this._app("correria_on",!1)===!0,t=Eo(this._correria&&this._correria.ultimo);return n`<div class="panel" id="correria">
        ${this._secHead("zap","CorrerIA","O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini.")}
        <div class="row switch-row">
          <div class="grow"><div class="label">${Mo("zap","lbl-ic")}Usar com o CorrerIA</div><div class="hint" style="white-space:normal">${e?"Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas.":"Desligado."}</div></div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._setCorreria(s.target.checked)} aria-label="Usar com o CorrerIA" /><span class="track"></span></label>
        </div>
        ${e?n`<div class="sub-op"><div class="sub-box"><div class="ai-state ${t?"ok":""}"><span class="dot"></span><div>${t?n`<b>${t}</b>`:n`<b>Nenhum uso ainda</b><span>Conecte no app CorrerIA.</span>`}</div></div></div></div>`:u}
      </div>`}};var Ga=["janeiro","fevereiro","mar\xE7o","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],Qa=["D","S","T","Q","Q","S","S"],qo=["domingo","segunda","ter\xE7a","quarta","quinta","sexta","s\xE1bado"],Co=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],qe=o=>String(o).padStart(2,"0"),Za=(o,e,t)=>`${o}-${qe(e)}-${qe(t)}`;function ei(o,e=new Date){return/^\d{4}-\d{2}/.test(o||"")?o.slice(0,7):`${e.getFullYear()}-${qe(e.getMonth()+1)}`}function ss(o,e){let[t,s]=o.split("-").map(Number),a=new Date(t,s-1+e,1);return`${a.getFullYear()}-${qe(a.getMonth()+1)}`}function as(o){let[e,t]=o.split("-").map(Number),s=Ga[t-1];return`${s.charAt(0).toUpperCase()}${s.slice(1)} de ${e}`}function Oo(o){let[e,t,s]=o.split("-").map(Number);return`${qo[new Date(e,t-1,s).getDay()]}, ${s} de ${Ga[t-1]} de ${e}`}function To(o,e=0){let[t,s]=o.split("-").map(Number),a=(new Date(t,s-1,1).getDay()-e+7)%7,i=new Date(t,s,0).getDate(),r=Array.from({length:a},()=>null);for(let l=1;l<=i;l++)r.push(Za(t,s,l));for(;r.length%7;)r.push(null);return r}function ti({icon:o,month:e,value:t,today:s,onPick:a,onMonth:i,min:r="",max:l="",weekStart:c=0,months:d=!1,onMonths:h=null}){let[p]=e.split("-").map(Number),f=y=>(!r||y>=r)&&(!l||y<=l),g=(y,x,_)=>n`<button type="button" class="icon-btn cal-nav" aria-label=${x} ?disabled=${!_} @click=${()=>i(ss(e,y))}>${o(y<0?"chevron-left":"chevron-right")}</button>`;if(d&&h){let y=x=>(!l||`${p}-${qe(x+1)}-01`<=l)&&(!r||Za(p,x+1,new Date(p,x+1,0).getDate())>=r);return n`<div class="cal" role="group" aria-label="Escolher o mês">
      <div class="cal-head">
        ${g(-12,"Ano anterior",!r||Number(r.slice(0,4))<p)}
        <button type="button" class="cal-title" aria-label="Voltar aos dias" @click=${()=>h(!1)}>${p}</button>
        ${g(12,"Pr\xF3ximo ano",!l||Number(l.slice(0,4))>p)}
      </div>
      <div class="cal-months">
        ${Co.map((x,_)=>{let A=`${p}-${qe(_+1)}`,T=!!t&&t.slice(0,7)===A;return n`<button type="button" class="cal-month ${T?"on":""} ${s&&s.slice(0,7)===A?"today":""}" aria-pressed=${T?"true":"false"} ?disabled=${!y(_)} @click=${()=>(i(A),h(!1))}>${x}</button>`})}
      </div>
    </div>`}let w=ss(e,-1),b=`${w}-${qe(new Date(Number(w.slice(0,4)),Number(w.slice(5,7)),0).getDate())}`,k=`${ss(e,1)}-01`;return n`<div class="cal" role="group" aria-label="Escolher a data">
    <div class="cal-head" data-month=${e}>
      ${g(-1,"M\xEAs anterior",!r||b>=r)}
      ${h?n`<button type="button" class="cal-title" aria-live="polite" aria-label=${`${as(e)}: escolher o m\xEAs`} @click=${()=>h(!0)}>${as(e)}</button>`:n`<b class="cal-title" aria-live="polite">${as(e)}</b>`}
      ${g(1,"Pr\xF3ximo m\xEAs",!l||k<=l)}
    </div>
    <div class="cal-grid">
      ${Qa.map((y,x)=>n`<span class="cal-wd" aria-hidden="true">${Qa[(x+c)%7]}</span>`)}
      ${To(e,c).map(y=>y?n`<button type="button" class="cal-day ${y===t?"on":""} ${y===s?"today":""}" data-d=${y} aria-pressed=${y===t?"true":"false"} aria-current=${y===s?"date":u} aria-label=${Oo(y)} ?disabled=${!f(y)} @click=${()=>a(y)}>${Number(y.slice(8))}</button>`:n`<span class="cal-gap"></span>`)}
    </div>
  </div>`}var si=`
  .cal {
    margin-top: 2px;
    padding: 8px 8px 10px;
    border-radius: 18px;
    border: 1.5px solid var(--rv-line-strong);
    background: var(--rv-bg);
  }
  .cal-head {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
  }
  .cal-title {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--rv-text);
  }
  button.cal-title:hover {
    background: color-mix(in srgb, var(--rv-text) 7%, transparent);
  }
  .cal .cal-nav:disabled,
  .cal-day:disabled,
  .cal-month:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .cal-months {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    padding: 4px 2px 2px;
  }
  .cal-month {
    min-height: 44px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    color: var(--rv-text);
  }
  .cal-month:hover:not(:disabled):not(.on) {
    background: color-mix(in srgb, var(--rv-text) 7%, transparent);
  }
  .cal-month.today {
    box-shadow: inset 0 0 0 1.5px var(--rv-accent);
    color: var(--rv-accent-ink);
    font-weight: 600;
  }
  .cal-month.on {
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 700;
    box-shadow: none;
  }
  .cal .cal-nav {
    width: 40px;
    height: 40px;
    margin: 0;
    display: grid;
    place-items: center;
    flex: none;
    color: var(--rv-text-2);
  }
  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    row-gap: 2px;
  }
  .cal-wd {
    padding: 4px 0 6px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--rv-muted);
  }
  .cal-day {
    justify-self: center;
    width: min(100%, 42px);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
    color: var(--rv-text);
  }
  .cal-day:hover:not(:disabled) {
    background: color-mix(in srgb, var(--rv-text) 7%, transparent);
  }
  .cal-day.today {
    box-shadow: inset 0 0 0 1.5px var(--rv-accent);
    color: var(--rv-accent-ink);
    font-weight: 600;
  }
  .cal-day.on {
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 700;
    box-shadow: none;
  }
`;var is="2.73.0",ai="resolvia.theme",os="resolvia.prefs",yt="resolvia.lastList",m=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y(N[o]||N["list-checks"])}</svg>`,ii={Agora:"clock",Buscar:"search","Minhas listas":"list-todo",Mais:"ellipsis",Listas:"list-checks",Gr\u00E1ficos:"chart-bar",Configura\u00E7\u00F5es:"sliders-horizontal",Sobre:"info"},ie={get(o,e){try{let t=localStorage.getItem(o);return t==null?e:JSON.parse(t)}catch{return e}},set(o,e){try{localStorage.setItem(o,JSON.stringify(e))}catch{}}},Q=o=>o.status==="completed",oi=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],V=o=>o.uid||o.summary,ri="resolvia-fechadas",ni=o=>{if(!o)return"";let e=o.querySelector(":scope > .mais-head h2");return o.id||o.dataset&&o.dataset.card||(e?e.textContent.trim():"")},li="resolvia-campos",ci="resolvia-incluir-fechado",Io="resolvia-busca-quem",di=o=>{let e=o&&o.querySelector(":scope > .flabel");return e?e.textContent.trim().replace(/\s*\(.*\)$/,"").replace(/s$/,""):""},zo=(o="")=>/^Apagar/.test(o)?"trash":/^Restaurar/.test(o)?"archive-restore":/^Importar/.test(o)?"upload":/^Limpar/.test(o)?"brush-cleaning":/^Desligar/.test(o)?"toggle-right":"circle-alert",hi=o=>({Hoje:"sun",Amanh\u00E3:"sunrise",Ontem:"undo-2"})[o]||"calendar-days",We=["listas","graficos","config","sobre"],le="08:00",rs=class extends Xa(Ka(ja(Va(Ra(Ia(Ca(Ma(ve)))))))){static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_alertPeople:{state:!0},_people:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_searchRooms:{state:!0},_searchEquips:{state:!0},_searchExt:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_folds:{state:!0},_sel:{state:!0},_bsel:{state:!0},_rules:{state:!0},_cam:{state:!0},_rooms:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[ia,Us,oe(pa),oe(ba),oe(ma),oe(Fa),oe(Ja),oe(si)];constructor(){super(),this._searchShut=new Set,this._incluirShut=ie.get(ci,!1)===!0,this._searchWho=null,ie.set(Io,null),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._searchRooms=!0,this._searchEquips=!0,this._searchExt=!0,this._theme=ie.get(ai,"auto"),this._doneOpen={},this._folds={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),ta(),this._today=new Date().toDateString(),this._dayTimer=setInterval(()=>{let e=new Date().toDateString();e!==this._today&&(this._today=e,this.requestUpdate())},6e4),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=e=>{if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey||this._sheet)return;let t=e.composedPath&&e.composedPath()[0]||e.target;t&&t.closest&&t.closest("input, textarea, select, [contenteditable]")||(e.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let e=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(e){this._focusSearch=!1,e.focus({preventScroll:!0});try{e.setSelectionRange(e.value.length,e.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._dayTimer),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,e]of this._subs)this._unsub(e);this._subs.clear();for(let[,e]of this._recent)clearTimeout(e);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(e=>e&&e()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this.hass||t.themes!==this.hass.themes||t.entities!==this.hass.entities||t.devices!==this.hass.devices||t.user!==this.hass.user||t.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(i=>i.startsWith("todo.")),a=Object.keys(t.states).filter(i=>i.startsWith("todo."));return s.length!==a.length?!0:s.some(i=>t.states[i]!==this.hass.states[i])}willUpdate(e){e.has("route")&&this.route&&(this._path=this.route.path||""),e.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints(),this._loadRooms(),this._loadExternal()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(e.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}_markTabs(){let e=this.renderRoot&&this.renderRoot.querySelector(".tabs-wrap > .more-tabs");if(e&&(e.parentElement.classList.toggle("tem-esq",e.scrollLeft>2),e.parentElement.classList.toggle("tem-dir",e.scrollLeft+e.clientWidth<e.scrollWidth-2),window.ResizeObserver&&(!this._tabsRo||this._tabsRo.t!==e))){this._tabsRo&&this._tabsRo.ro.disconnect();let t=new ResizeObserver(()=>this._markTabs());t.observe(e),e.querySelectorAll("button").forEach(s=>t.observe(s)),this._tabsRo={t:e,ro:t}}}updated(e){this.toggleAttribute("dark",this._dark),this._markTabs(),this._applyFolds(),this._applyFieldFolds(),this._chatAfterRender();let t=this._view();if(t.old!=null&&e.has("_path")){this._go(t.old,!0,history.state&&history.state.rvUp?{rvUp:!0}:null);return}if(e.has("_path")&&t.name==="config"){let s=this.renderRoot.querySelector(".more-tabs"),a=s&&s.querySelector("button.on");if(a){let r=a.offsetLeft,l=r+a.offsetWidth;r<s.scrollLeft?s.scrollLeft=r-8:l>s.scrollLeft+s.clientWidth&&(s.scrollLeft=l-s.clientWidth+8)}let i=this._configTab();i==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadRooms(),this._loadExternal(),this._loadUsage(),this._loadCorreria()),i==="dados"&&this._loadBackups()}e.has("_path")&&this._view().name==="search"&&this._searchShut.size&&(this._searchShut.clear(),this.requestUpdate()),this._view().name==="search"&&(this._focusSearch||e.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="home"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}_closedCards(){if(!this._fechadas)try{this._fechadas=new Set(JSON.parse(localStorage.getItem(ri)||"[]"))}catch{this._fechadas=new Set}return this._fechadas}_applyFolds(){let e=this.renderRoot;if(!e||!e.querySelectorAll)return;let t=this._closedCards();for(let s of e.querySelectorAll(".panel > .mais-head")){let a=s.parentElement,i=ni(a);if(!i)continue;let r=t.has(i);a.classList.add("dobra"),a.classList.toggle("fechada",r),s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-expanded",r?"false":"true")}}_closedFields(){if(!this._camposFechados)try{this._camposFechados=new Set(JSON.parse(localStorage.getItem(li)||"[]"))}catch{this._camposFechados=new Set}return this._camposFechados}_applyFieldFolds(){let e=this.renderRoot;if(!e||!e.querySelectorAll)return;let t=this._closedFields();for(let s of e.querySelectorAll(".sheet .field")){let a=s.querySelector(":scope > .flabel");if(!a||!s.querySelector(":scope > .chip-row, :scope > .imp-tiles, :scope > .eq-pick"))continue;let i=di(s);if(!i)continue;let r=t.has(i);s.classList.add("dobravel"),s.classList.toggle("shut",r),a.setAttribute("role","button"),a.setAttribute("tabindex","0"),a.setAttribute("aria-expanded",r?"false":"true")}}_toggleField(e){let t=di(e.parentElement);if(!t)return;let s=this._closedFields();s.has(t)?s.delete(t):s.add(t);try{localStorage.setItem(li,JSON.stringify([...s]))}catch{}this._haptic("light"),this._applyFieldFolds()}_toggleFold(e){let t=ni(e.parentElement);if(!t)return;let s=this._closedCards();s.has(t)?s.delete(t):s.add(t);try{localStorage.setItem(ri,JSON.stringify([...s]))}catch{}this._haptic("light"),this._applyFolds()}firstUpdated(){this._checkHeight();let e=a=>{let i=a.target.closest&&a.target.closest(".panel.dobra > .mais-head");return i&&!a.target.closest("button, a, input, select, textarea, label")?i:null},t=a=>a.target.closest&&a.target.closest(".sheet .field.dobravel > .flabel")||null;this.renderRoot.addEventListener("click",a=>{let i=e(a);i&&this._toggleFold(i);let r=t(a);r&&this._toggleField(r)}),this.renderRoot.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" ")return;let i=e(a),r=!i&&t(a);!i&&!r||(a.preventDefault(),i?this._toggleFold(i):this._toggleField(r))});let s=cs();s&&!this._inHA()&&this._go(s,s==="/prazos")}_checkHeight(){if(this.hasAttribute("vh"))return;let e=this.getBoundingClientRect().height;(e>window.innerHeight+4||e<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(e=>e.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let e=this._todoIds();for(let t of e)this._subs.has(t)||this._subscribe(t);for(let[t,s]of[...this._subs])if(!e.includes(t)){this._unsub(s),this._subs.delete(t),this._polling.delete(t);let a=new Map(this._items);a.delete(t),this._items=a}}_subscribe(e){let t=this.hass.connection.subscribeMessage(s=>this._setItems(e,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:e}).catch(()=>(this._polling.add(e),this._fetchItems(e),null));this._subs.set(e,t)}_unsub(e){Promise.resolve(e).then(t=>typeof t=="function"&&t()).catch(()=>{})}async _fetchItems(e){try{let t=await this.hass.callWS({type:"todo/item/list",entity_id:e});this._setItems(e,t&&t.items||[])}catch{this._setItems(e,this._items.get(e)||[])}}_refreshPolled(e){if(!(!e||!this._polling.size))for(let t of this._polling)e.states[t]!==this.hass.states[t]&&this._fetchItems(t)}_setItems(e,t){let s=new Map(this._items);s.set(e,t),this._items=s}_patchItem(e,t,s){let a=this._items.get(e);a&&this._setItems(e,a.map(i=>V(i)===t?{...i,...s}:i))}_computeLists(){let e=this._prefs&&this._prefs.lists||{},t=!this._dueOn(),a=this._todoIds().map(i=>{let r=this.hass.states[i],l=ya(this.hass,i);return{id:i,st:r,meta:l}});return a.sort((i,r)=>(i.meta.group||"").localeCompare(r.meta.group||"","pt-BR")||i.meta.name.localeCompare(r.meta.name,"pt-BR")),a.map(({id:i,st:r,meta:l},c)=>{let d=e[i]||{},h=this._items.get(i),p=h?h.filter(A=>!Q(A)):null,f=p?p.length:Number(r.state)||0,g=h?h.length-p.length:0,w=d.color==="sem"?jt:Ae(d.color)||Vt(c),b=r.attributes.supported_features||0,k=O(b,M.DUE_DATE)||O(b,M.DUE_DATETIME),y=!k||d.dates_info===!0,x=y||t,_=p&&!x?p.map(A=>se(A.due)).filter(Boolean):[];return{id:i,name:d.name||l.name,origName:l.name,group:l.group,color:w,colorId:d.color||null,autoColor:Vt(c),icon:d.icon==="sem"?null:d.icon||Ut(`${l.name} ${l.group||""} ${i}`),iconPref:d.icon||null,hidden:!!d.hidden,owner:d.owner||null,features:b,canDue:k,appDue:!!r.attributes.resolvia_prazo,datesInfo:y,noDue:x,hasDates:!!(h&&h.some(A=>A.due)),unavailable:r.state==="unavailable"||r.state==="unknown",items:h,pending:f,done:g,late:_.filter(A=>A.overdue).length,today:_.filter(A=>!A.overdue&&A.diff===0).length}})}_list(e){return this._L.find(t=>t.id===e)}_visible(){return this._L.filter(e=>!e.hidden)}_app(e,t){let s=this._prefs&&this._prefs.app?this._prefs.app[e]:void 0;return s===void 0?t:s}_accentDaily(){return this._app("accent_daily",!0)!==!1}_accent(){return this._accentDaily()?fa(ue,new Date):Ae(this._app("accent","vermelho"))||ue[0]}async _loadPrefs(){try{let e=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:e.lists||{},app:e.app||{}},this._prefsRemote=!0}catch{this._prefs=ie.get(os,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(e,t){let s={...this._prefs.lists},a={...s[e]||{}};for(let[i,r]of Object.entries(t))r===null||r===""?delete a[i]:a[i]=r;if(Object.keys(a).length?s[e]=a:delete s[e],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let i=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:e,prefs:t});this._prefs={lists:i.lists||{},app:i.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else ie.set(os,this._prefs)}async _saveAppPrefs(e){let t={...this._prefs.app};for(let[s,a]of Object.entries(e))a===null||a===""?delete t[s]:t[s]=a;if(this._prefs={...this._prefs,app:t},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:e});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else ie.set(os,this._prefs)}_setTheme(e){this._theme=e,ie.set(ai,e)}_inHA(){return!!this.route}_view(){let e=(this._path||"").replace(/\/+$/,""),t;if(t=e.match(/^\/lista\/(todo\.[^/]+)$/))return{name:"list",id:decodeURIComponent(t[1])};if(e==="/minhas-listas")return{name:"lists"};if(e==="/prazos"||e==="/sugestoes")return{name:"home",old:""};if(e==="/buscar")return{name:"search"};if(e==="/mais")return{name:"more"};if(e==="/listas")return{name:"listas"};if(e==="/graficos")return{name:"graficos"};if(e==="/sobre")return{name:"sobre"};if(t=e.match(/^\/config(?:\/(integracoes|dados|aparencia|opcoes))?$/))return{name:"config",tab:t[1]||"integracoes"};if(e==="/repeticoes")return{name:"config",tab:"opcoes",old:"/config/opcoes"};if(t=e.match(/^\/mais\/(repeticoes|integracoes|ia|dados|aparencia|opcoes)$/)){let s=t[1]==="ia"?"integracoes":t[1]==="repeticoes"?"opcoes":t[1];return{name:"config",tab:s,old:this._configPath(s)}}return{name:"home"}}_configPath(e){return e==="integracoes"?"/config":`/config/${e}`}_go(e,t=!1,s=null){this._sheet&&this._closeSheet(!0);let a=(history.state&&history.state.rvDepth||0)+(t?0:1),i={...s||{},rvDepth:a};if(this._inHA()){let l=`/${this.panel&&this.panel.url_path||"resolvia"}${e}`;t?history.replaceState(i,"",l):history.pushState(i,"",l),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:t}}))}else i.rvPath=e,t?history.replaceState(i,""):history.pushState(i,""),this._path=e;let r=this.renderRoot&&this.renderRoot.querySelector("main");r&&r.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_fromMenu(){return We.includes(this._view().name)&&!!(history.state&&history.state.rvUp)}_toMenu(){this._fromMenu()?history.back():this._go("/mais",!0)}_openFromMenu(e){if(this._haptic("light"),e==="relatorio")return this._openReport();this._go(e,!1,{rvUp:!0})}_openReport(){let e=this.hass&&this.hass.resolvia;if(!e||!e.report)return this._showToast("Na pr\xE9via o relat\xF3rio n\xE3o abre. No app, ele abre pronto para imprimir.");let t=new URLSearchParams({tema:this._dark?"escuro":"claro",cor:this._accent().fill});location.href=e.report(t.toString())}_onSwipeStart(e){this._sw=this._sheet||this._cam?null:sa(e)}_onSwipeEnd(e){let t=aa(e,this._sw);if(this._sw=null,!t||this._sheet)return;let s=[["home",""],["search","/buscar"],["lists","/minhas-listas"],["more","/mais"]],a=this._view().name;if(a==="list"){if(t>0)return;this._haptic("light"),this._back(),ct(this,"lists",t);return}if(We.includes(a)){if(t>0)return;this._haptic("light"),this._toMenu(),ct(this,"more",t);return}let i=s.findIndex(([l])=>l===a),r=i+t;i<0||r<0||r>=s.length||(this._haptic("light"),this._goTab(s[r][1]),ct(this,s[r][0],t))}_goTab(e){let t=this._view().name;if(We.includes(t)){if(e==="/mais")return this._toMenu();if(this._fromMenu())return e===""?history.go(-2):(this._afterPop=e,history.back())}if(e===""){if(t==="home"){let a=this.renderRoot.querySelector("main");a&&a.scrollTo({top:0});return}let s=history.state&&history.state.rvDepth||0;s>0?(this._afterPop="",history.go(-s)):this._go("",!0);return}this._go(e,t!=="home"&&t!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"");let e=this._afterPop;this._afterPop=null,e!=null&&this._go(e,!0)}_openSheet(e,t=null){let s=!!this._sheet;if(this._sheet=e,this._form=t,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(e=!1){this._sheet&&(this._stopVoice(),this._chatStop(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(e?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/config"),this.updateComplete.then(()=>{let e=this.renderRoot.querySelector("#leitura-ia");e&&e.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(e){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(e);history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(e){if(this.env&&this.env.haptic)return this.env.haptic(e);window.dispatchEvent(new CustomEvent("haptic",{detail:e}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(e=>this._rules=e&&e.rules||[],{type:"resolvia/recurring/subscribe"}).then(e=>(this._rulesOk=!0,e)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let e=this._app("repeat_on",void 0);return e===void 0?this._rules.length>0:e===!0}_ruleFor(e,t){return!t||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===e&&s.uid&&s.uid===t.uid)||t.status!=="completed"&&this._rules.find(s=>s.entity_id===e&&!s.uid&&s.match===t.summary)||null}_everyLabel(e){return e===1?"todo dia":e===7?"toda semana":e===14?"a cada 2 semanas":e===30?"todo m\xEAs":`a cada ${e} dias`}_returnLabel(e){let t=new Date(e),s=se(xe(t));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(e,t=Date.now()){let s=new Date(t);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+e).getTime()}_setRule(e,{uid:t,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:e,uid:t||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(e,t=null){clearTimeout(this._toastTimer),this._toast={text:e,action:t,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,t?4500:Math.min(8e3,Math.max(2600,e.length*55)))}async _call(e,t,s){try{return await this.hass.callService("todo",e,t,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",e,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(e,t){if(!O(e.features,M.UPDATE))return;let s=V(t),a=!Q(t),i=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(e.id,s,{status:i}),!await this._call("update_item",{item:s,status:i},e.id)){this._patchItem(e.id,s,{status:t.status});return}let l=this._pointsOf(e.id,t.summary,t.uid),c=this._mirrored(e.id,t.uid);if(a){let d=this._ruleFor(e.id,t),h=d?` \xB7 volta ${this._returnLabel(this._reopenAt(d.days))}`:"",p={label:"Desfazer",run:()=>{this._patchItem(e.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},e.id),(l||c)&&this._takePoints(e,t)}};l?this._givePoints(e,t,`Resolvido: ${D(t.summary,18)}`,p):this._showToast(`Resolvido: ${D(t.summary,d?22:30)}${h}${c?" \xB7 volta com a pr\xF3xima data":""}`,p)}else(l||c)&&this._takePoints(e,t)}_quickAdd(e,t){e.preventDefault();let s=e.currentTarget.querySelector("input");this._addLines(t,[s.value],s)}_onQuickPaste(e,t){let s=e.clipboardData&&e.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(e.preventDefault(),this._addLines(t,s.split(/\r?\n/),e.currentTarget))}async _addLines(e,t,s){let a=t.map(r=>r.trim()).filter(Boolean);if(!a.length)return;let i=s.value;s.value="",s.focus(),this._haptic("light");for(let r of a)if(!await this._call("add_item",{item:r},e.id)){s.value=i||r;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(e,t,s,a){let i=e.features;return t?s&&O(i,M.DUE_DATETIME)?{due_datetime:`${t} ${s}:00`}:O(i,M.DUE_DATE)?{due_date:t}:O(i,M.DUE_DATETIME)?{due_datetime:`${t} ${s||"09:00"}:00`}:{}:a?O(i,M.DUE_DATE)?{due_date:null}:O(i,M.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(e,{summary:t,description:s,date:a,time:i}){let r={item:t,...this._dueFields(e,a,i,!1)};return s&&O(e.features,M.DESCRIPTION)&&(r.description=s),this._call("add_item",r,e.id)}_openAdd(e){let t=this._visible().filter(i=>O(i.features,M.CREATE)&&!i.unavailable),s=ie.get(yt,null),a=e&&this._list(e)&&O(this._list(e).features,M.CREATE)&&e||t.find(i=>i.id===s)&&s||t[0]&&t[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1,room:null,equips:[],ext:null}),this.updateComplete.then(()=>{let i=this.renderRoot.querySelector(".sheet textarea");i&&i.focus()})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(e=!0){let t=this.hass&&this.hass.resolvia;if(!(!t||!t.aiStatus)&&!(!e&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await t.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(e,t="ai_entity"){await this._saveAppPrefs({[t]:e||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let e=this._aiInfo();return ha({u:this._usage,day:this._usageDay,onDay:t=>(this._usageDay=t,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","As chamadas do app para a IA. Os tokens s\xE3o estimados."),app:"ResolvIA",using:e.using&&e.using.id||"",names:Object.fromEntries((e.entities||[]).map(t=>[t.id,t.name]))})}_dueOn(){return!this._app("due_off",!1)}_notesOn(){return!this._app("notes_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(e){let t=a=>{let i=a&&this._list(a);return i&&O(i.features,M.CREATE)&&!i.unavailable?a:null},s=this._visible().filter(a=>O(a.features,M.CREATE)&&!a.unavailable);return t(e)||t(ie.get(yt,null))||s[0]&&s[0].id||null}_openImport(e,t="pick"){let s=this._importTarget(e);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:t==="text"?"text":t==="voice"?"voice":"pick",rec:t==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),t==="photos"&&this._pickFiles("photos"),t==="scan"&&this._openCamera(),t==="text"&&this._focusImportText(),t==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(e=!1){try{this._voice=await this.hass.resolvia.voiceStatus(e)}catch(t){this._voice={ready:!1,reason:t.message}}this.requestUpdate()}async _chooseVoice(e){await this._saveAppPrefs({voice_engine:e||null}),await this._loadVoice(!0),this._showToast("Fala para texto atualizada")}_renderVoicePanel(){let e=this._voice,t=this._app("voice_engine","")||"",s=e&&e.options||[],a=!e||this._voiceChecking,i=a?"off":e.ready&&!e.missing?"ok":e.ready?"warn":"bad",r=a?"Verificando\u2026":e.ready?"Pronto para ouvir":"Sem fala para texto",l=a?"":e.ready?`Transcreve com ${e.name}.${e.missing?" O escolhido n\xE3o foi encontrado: usando o autom\xE1tico.":""}`:e.reason||"",c=async()=>{this._voiceChecking=!0,this.requestUpdate(),await this._loadVoice(!0),this._voiceChecking=!1,this.requestUpdate()};return n`<div class="panel" id="falar">
      ${this._secHead("mic","Falar","Quem transforma a fala em texto. N\xE3o muda o assistente de voz do Home Assistant.")}
      <div class="ai-state ${i}"><span class="dot"></span><div><b>${r}</b>${l?n`<span>${l}</span>`:u}</div></div>
      ${s.length||t?n`<label class="field" style="margin:14px 0 0">
            <span class="flabel">${m("mic","lbl-ic")}Fala para texto</span>
            <select class="select" aria-label="Fala para texto" @change=${d=>this._chooseVoice(d.target.value)}>
              <option value="" ?selected=${!t}>Automático${e&&e.auto?`: ${e.auto.name}`:""}</option>
              ${s.map(d=>n`<option value=${d.id} ?selected=${d.id===t}>${d.name}</option>`)}
              ${t&&!s.some(d=>d.id===t)?n`<option value=${t} selected>${t} (não encontrado)</option>`:u}
            </select>
          </label>`:u}
      <div class="ai-actions"><button class="btn outline" ?disabled=${a} @click=${c}>${m("rotate-ccw")}Verificar de novo</button></div>
      ${e&&!e.ready?n`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>Com o Home Assistant Cloud, a fala para texto já vem pronta.</li>
              <li>Sem ele, instale um motor de fala: o app Whisper (local, de graça) com a integração Wyoming, ou a fala para texto de uma IA como Google Gemini ou OpenAI.</li>
              <li>Volte aqui, toque em Verificar de novo e escolha o motor na lista.</li>
            </ol>
          </div>`:u}
    </div>`}_renderMicBtn(e=null){return!this._aiOn()||!this._voice||!this._voice.ready?u:n`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(e,"voice")}>${m("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let e=new Te(t=>this._voiceLevel=t);this._rec=e;try{await e.start()}catch(t){e.cancel(),this._rec===e&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:bt(t)});return}if(this._rec!==e||!this._form||this._form.step!=="voice")return e.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==e)return clearInterval(this._recTimer);let t=e.seconds();this._setForm({secs:t,level:this._voiceLevel||0}),t>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let e=this._rec;if(!e)return;clearInterval(this._recTimer),this._rec=null;let t=e.stop();if(t.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(t);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(e){let t=this._form,s=this._voice||{},a=t.rec==="on",i=Math.floor((t.secs||0)/60),r=String(Math.floor((t.secs||0)%60)).padStart(2,"0"),l=this._list(t.target);return n`
      ${e("Falar")}
      <div class="voice ${a?"on":""}">
        <button class="voice-mic" style="--lvl:${a?(t.level||0).toFixed(2):0}" aria-label=${a?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>a?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${m(a?"check":"mic")}
        </button>
        <div class="voice-state">${a?n`<b>Ouvindo…</b> <span class="voice-time">${i}:${r}</span>`:t.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${a?"Toque de novo quando terminar.":n`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${l?n`<p class="voice-hint">Vai para <b>${l.name}</b> (dá para trocar na revisão).</p>`:u}
      </div>
      ${t.error?n`<div class="imp-error">${m("circle-alert")}<span>${t.error}</span></div>`:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>${m("x")}Cancelar</button>
        <button class="btn primary" ?disabled=${!a} @click=${()=>this._finishVoice()}>${m("sparkles")}Pronto</button>
      </div>
      ${s.ready?u:n`<p class="sheet-note">${s.reason||""}</p>`}
    `}_focusImportText(){this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".sheet textarea");e&&e.focus()})}_pickFiles(e){let t=this.renderRoot.querySelector(e==="scan"?"#rv-scan":"#rv-photos");t&&(t.value="",t.click())}_releaseImages(){let e=this._form;if(e&&e.images)for(let t of e.images)t.url&&URL.revokeObjectURL(t.url)}_camOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(e){let t=r=>r.type==="application/pdf"||/\.pdf$/i.test(r.name||""),s=[...e.target.files||[]].filter(r=>!r.type||r.type.startsWith("image/")||t(r)).slice(0,6);if(e.target.value="",s.some(t)&&(s=[s.find(t)]),!s.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let a=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:a?"review":"pick"});let i=[];for(let r of s)if(t(r)){let{files:l}=await vt([r]);l[0]&&i.push({mime:"application/pdf",data:l[0].data,url:"",pdf:!0,nome:l[0].nome})}else i.push(await Xt(r));this._readImages(i,a)}_readImages(e,t){if(this._sheet!=="import"||!e.length)return;let s=t?[...this._form.images||[],...e]:(this._releaseImages(),e);this._setForm({step:"loading",images:s,prevStep:t?"review":"pick",loadingText:e.some(a=>a.pdf)?"Lendo o PDF com IA\u2026":e.length>1?`Lendo ${e.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:e,appending:t})}async _runExtract({text:e,images:t,appending:s=!1}){let a=this._importToken=Date.now(),i=this._list(this._form.target),r=()=>a===this._importToken&&this._sheet==="import",l=s?this._form.items||[]:[],c=(d,h=[],p=[],f=[])=>{let g=new Set(l.map(k=>k.text.trim().toLowerCase())),w=(k,y)=>y||k&&this._roomsOn()&&(this._equipOf(k)||{}).comodo||null,b=d.map((k,y)=>({text:k,on:!0,list:h[y]||null,room:w(f[y],p[y]),equip:f[y]||null})).filter(k=>!g.has(k.text.trim().toLowerCase()));return[...l,...b]};try{let d=await this.hass.resolvia.extract({text:e,images:t?t.map(({data:p,mime:f})=>({data:p,mime:f})):void 0,list_name:i?i.name:void 0,lists:this._importTargets().map(p=>({id:p.id,name:p.name}))});if(!r())return;let h=d.items||[];if(!h.length){let p=e?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:p}):this._setForm({step:e?"text":"pick",error:p});return}this._haptic("success"),this._setForm({step:"review",items:c(h,d.lists||[],d.rooms||[],d.equips||[]),provider:d.provider||null,note:null,error:null})}catch(d){if(!r())return;if(e){let h=Jt(e);if(h.length){this._setForm({step:"review",items:c(h),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:d.message||"Algo deu errado"}):this._setForm({step:e?"text":"pick",error:d.message||"Algo deu errado"})}}async _openCamera(e={}){let t=navigator.mediaDevices,s=!!e.chat,a=!s&&!!(this._form&&this._form.step==="review");if(!t||!t.getUserMedia){this._cam={status:"error",shots:[],chat:s,appending:a,flash:0,error:window.isSecureContext===!1?"A c\xE2mera aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher.":"Este navegador n\xE3o deixa o app usar a c\xE2mera. Escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher."};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}return}this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:a,chat:s,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let i=await t.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){i.getTracks().forEach(d=>d.stop());return}this._stream=i;let r=i.getVideoTracks()[0],l=r&&r.getCapabilities?r.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!l.torch},await this.updateComplete;let c=this.renderRoot.querySelector(".cam video");c&&(c.srcObject=i,c.play().catch(()=>{}))}catch(i){if(!this._cam)return;let r=i&&(i.name==="NotAllowedError"||i.name==="SecurityError");this._cam={...this._cam,status:"error",error:r?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(e=>e.stop()),this._stream=null}_closeCamera(e=!1){if(!this._cam)return;this._stopStream();let t=this._cam.shots||[];if(!this._cam.used)for(let s of t)URL.revokeObjectURL(s.url);this._cam=null,!e&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let e=this._stream&&this._stream.getVideoTracks()[0];if(!e)return;let t=!this._cam.torch;try{await e.applyConstraints({advanced:[{torch:t}]}),this._cam={...this._cam,torch:t}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let e=this.renderRoot.querySelector(".cam video");if(!e||!e.videoWidth||!this._cam||this._cam.shots.length>=6)return;let t=1800,s=Math.min(1,t/Math.max(e.videoWidth,e.videoHeight)),a=document.createElement("canvas");a.width=Math.round(e.videoWidth*s),a.height=Math.round(e.videoHeight*s),a.getContext("2d").drawImage(e,0,0,a.width,a.height);let i=await new Promise(l=>a.toBlob(l,"image/jpeg",.86));if(!i||!this._cam)return;let r=await Xt(i,t);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,r],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let e=this._cam.shots,t=this._cam.appending,s=this._cam.chat;if(this._cam={...this._cam,used:!0},this._closeCamera(),s)return this._chatAddShots(e);this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(e,t&&this._form.step==="review")}_cameraFallback(){let e=this._cam&&this._cam.appending;if(this._cam&&this._cam.chat)return this._closeCamera(),this._chatAttach("fotos");this._closeCamera(),e&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let e=this._cam;if(!e)return u;let t=e.shots.length;return n`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${e.flash?n`<div class="cam-flash" .key=${e.flash}></div>`:u}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${m("x")}</button>
          <span class="cam-title">${e.chat?"Tirar foto":"Digitalizar com IA"}</span>
          ${e.torchOk?n`<button class="cam-btn ${e.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${m("zap")}</button>`:n`<span class="cam-btn ghost"></span>`}
        </div>
        ${e.status==="error"?n`<div class="cam-msg">
              ${m("camera")}
              <p>${e.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${m("images")}Escolher foto</button>
            </div>`:n`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${e.status==="starting"?"Abrindo a c\xE2mera\u2026":t?`${C(t,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${e.shots.slice(-3).map(s=>n`<img src=${s.url} alt="" />`)}${t>3?n`<span>+${t-3}</span>`:u}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${e.status!=="live"||t>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!t} @click=${()=>this._useShots()}>${m("check")}Pronto${t?` (${t})`:""}</button>
        </div>
      </div>
    `}_readText(){let e=(this._form.text||"").trim();if(!e){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:e});return}let t=Jt(e);t.length?this._setForm({step:"review",items:t.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}_clipOk(){return!!(navigator.clipboard&&navigator.clipboard.readText)&&!this._clipFailed}async _pasteClipboard(){let e="";try{e=await navigator.clipboard.readText()}catch{this._clipFailed=!0,this._focusImportText(),this._showToast("Este aparelho n\xE3o deixa o app ler o que foi copiado. Toque e segure no campo e escolha Colar."),this.requestUpdate();return}if(!e){this._focusImportText(),this._showToast("N\xE3o h\xE1 nada copiado.");return}this._setForm({text:e,error:null})}_setImportItem(e,t){let s=this._form.items.slice();s[e]={...s[e],...t},this._setForm({items:s})}_importTargets(){let e=this._form||{};return this._L.filter(t=>O(t.features,M.CREATE)&&!t.unavailable&&(!t.hidden||t.id===e.target))}_importListOf(e){let t=this._importTargets();return e.list&&t.some(s=>s.id===e.list)&&e.list||this._form.target}async _importAdd(){let e=this._form,t=this._list(e.target),s=e.items.filter(l=>l.on&&l.text.trim()).map(l=>({...l,dest:this._importListOf(l)}));if(!t||!s.length)return;ie.set(yt,t.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0,i=new Set;for(let l of s)if(await this._call("add_item",{item:l.text.trim()},l.dest))a++,i.add(l.dest),l.room&&this._roomsOn()&&await this._setTaskRoom(l.dest,l.text.trim(),l.room==="*"?this._houseRooms().map(c=>c.id):l.room),l.equip&&this._equipsOn()&&await this._setTaskEquip(l.dest,l.text.trim(),l.equip);else break;if(!a)return;let r=i.size===1?this._list([...i][0]):null;this._showToast(`${C(a,"item adicionado","itens adicionados")} ${r?`em ${D(r.name,24)}`:`em ${i.size} listas`}`)}_openEdit(e,t){let s=te(t.due),a=this._ruleFor(e.id,t),i=a?a.days:0;this._openSheet("item",{mode:"edit",listId:e.id,key:V(t),target:e.id,summary:t.summary||"",description:Se(t.description),hadNotes:!!Se(t.description).trim(),mirrored:this._mirrored(e.id,t.uid),due:t.due||null,date:s?s.date:null,time:s?s.time:null,repeat:i,repeatOrig:i,repeatCustom:!!i&&!oi.some(r=>r.days===i),points:this._rawPoints(e.id,t.summary),pointsOrig:this._rawPoints(e.id,t.summary),room:this._roomIdOf(e.id,t.summary),rooms:this._roomIdsOf(e.id,t.summary),roomsOrig:this._roomIdsOf(e.id,t.summary),equips:this._equipIdsOf(e.id,t.summary),equipsOrig:this._equipIdsOf(e.id,t.summary),ext:this._externalRaw(e.id,t.summary),extOrig:this._externalRaw(e.id,t.summary)}),this._loadPoints()}_setForm(e){this._form={...this._form,...e}}async _saveItem(){let e=this._form,t=(e.summary||"").trim();if(!t){let h=this.renderRoot.querySelector(".sheet textarea");h&&h.focus();return}let s=(e.description||"").trim(),a=this._list(e.target);if(e.mode==="add"){if(!a)return;ie.set(yt,a.id),this._closeSheet(),this._haptic("light");let h=await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time});h&&e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),h&&e.points&&await this._setTaskPoints(a.id,t,e.points),h&&await this._saveTaskPlace(a.id,t,e),h&&await this._saveTaskExternal(a.id,t,e),h&&this._view().id!==a.id&&this._showToast(`Adicionado em ${D(a.name,28)}`);return}let i=this._list(e.listId),r=i&&i.items&&i.items.find(h=>V(h)===e.key);if(!i||!r){this._closeSheet();return}if(a&&a.id!==i.id){this._closeSheet(),await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time})&&(e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),e.repeatOrig&&await this._setRule(i.id,{uid:r.uid,summary:r.summary,days:null}),e.points&&await this._setTaskPoints(a.id,t,e.points),e.pointsOrig&&await this._setTaskPoints(i.id,r.summary,0),await this._saveTaskPlace(a.id,t,{...e,roomsOrig:[],equipsOrig:[]}),(e.roomsOrig||[]).length&&await this._setTaskRoom(i.id,r.summary,null),(e.equipsOrig||[]).length&&await this._setTaskEquip(i.id,r.summary,null),await this._saveTaskExternal(a.id,t,{...e,extOrig:null}),e.extOrig&&await this._setTaskExternal(i.id,r.summary,null),await this._call("remove_item",{item:[e.key]},i.id),this._showToast(`Movido para ${D(a.name,28)}`));return}let l={item:e.key};if(t!==r.summary&&(l.rename=t),O(i.features,M.DESCRIPTION)&&s!==Se(r.description)){let h=qa(r.description);l.description=h?`${s}${s?" ":""}${h}`:s||null}let c=te(r.due);((c?c.date:null)!==(e.date||null)||(c?c.time:null)!==(e.time||null))&&Object.assign(l,this._dueFields(i,e.date,e.time,!0)),this._closeSheet(),((e.points||0)!==(e.pointsOrig||0)||e.pointsOrig&&t!==r.summary)&&await this._setTaskPoints(i.id,t,e.points||0,t!==r.summary?r.summary:null),await this._saveTaskPlace(i.id,t,e,t!==r.summary?r.summary:null),await this._saveTaskExternal(i.id,t,e,t!==r.summary?r.summary:null),(e.repeat||0)!==(e.repeatOrig||0)&&(await this._setRule(i.id,{uid:r.uid,summary:t,days:e.repeat}),e.repeat&&this._showToast(`Repete ${this._everyLabel(e.repeat)} depois de concluir`)),Object.keys(l).length>1&&(l.rename&&this._patchItem(i.id,e.key,{summary:t}),await this._call("update_item",l,i.id))}async _deleteItem(){let e=this._form,t=this._list(e.listId),s=t&&t.items&&t.items.find(r=>V(r)===e.key);if(this._closeSheet(),!t||!s)return;if(this._setItems(t.id,t.items.filter(r=>V(r)!==e.key)),this._haptic("warning"),!await this._call("remove_item",{item:[e.key]},t.id)){this._setItems(t.id,t.items);return}let i=te(s.due);this._showToast("Item apagado",O(t.features,M.CREATE)?{label:"Desfazer",run:()=>this._addFull(t,{summary:s.summary,description:s.description,date:i?i.date:null,time:i?i.time:null})}:null)}_confirmClearDone(e){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${C(e.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${e.done===1?"":"s"} de \u201C${e.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},e.id)&&this._showToast("Conclu\xEDdos apagados")}})}_formColor(e,t){return e.color==="sem"?jt:Ae(e.color)||t.autoColor||t.color}_openCustomize(e){this._openSheet("customize",{listId:e.id,name:e.name===e.origName?"":e.name,color:e.colorId,icon:e.iconPref,hidden:e.hidden,deadlines:!e.datesInfo,owner:e.owner||""}),this._people===void 0&&this._loadPeople()}async _loadPeople(){if(!this._peopleLoading){this._peopleLoading=!0;try{this._people=this._prefsRemote?await this.hass.callWS({type:"resolvia/people"}):[]}catch{this._people=[]}this._peopleLoading=!1,this.requestUpdate()}}async _saveCustomize(){let e=this._form,t=this._list(e.listId);this._closeSheet(),await this._saveListPrefs(e.listId,{name:(e.name||"").trim()||null,color:e.color||null,icon:e.icon||null,hidden:e.hidden?!0:null,dates_info:t&&t.canDue&&!e.deadlines?!0:null,owner:(e.owner||"").trim()||null})}_dragStart(e,t,s){if(e.pointerType==="mouse"&&e.button!==0)return;e.preventDefault();let a=e.currentTarget,i=a.closest(".item"),l=[...i.parentElement.querySelectorAll(":scope > .item[data-drag]")],c=l.indexOf(i);if(c<0)return;let d=this.renderRoot.querySelector("main"),h=l.map(_=>_.getBoundingClientRect()),p=d.scrollTop,f=h.map(_=>_.top+_.height/2+p),g=h[c].height,w={y:e.clientY,target:c,raf:0,lastY:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}i.classList.add("dragging"),l.forEach((_,A)=>A!==c&&_.classList.add("shifting")),this._haptic("selection");let b=()=>{let _=w.lastY-w.y+(d.scrollTop-p);i.style.transform=`translateY(${_}px)`;let A=f[c]+_,T=0;for(let E=0;E<l.length;E++)E!==c&&f[E]<A&&T++;T!==w.target&&(w.target=T,this._haptic("selection")),l.forEach((E,v)=>{if(v===c)return;let $=0;c<T&&v>c&&v<=T&&($=-g),T<c&&v>=T&&v<c&&($=g),E.style.transform=$?`translateY(${$}px)`:""})},k=()=>{let _=d.getBoundingClientRect(),A=70,T=0;w.lastY<_.top+A?T=-Math.ceil((_.top+A-w.lastY)/6):w.lastY>_.bottom-A&&(T=Math.ceil((w.lastY-(_.bottom-A))/6)),T&&(d.scrollTop+=T,b()),w.raf=requestAnimationFrame(k)};w.raf=requestAnimationFrame(k);let y=_=>{w.lastY=_.clientY,b()},x=()=>{cancelAnimationFrame(w.raf),a.removeEventListener("pointermove",y),a.removeEventListener("pointerup",x),a.removeEventListener("pointercancel",x),l.forEach(_=>{_.classList.remove("shifting","dragging"),_.style.transform=""}),w.target!==c&&this._commitMove(t,s,l.map(_=>_.dataset.key),c,w.target)};a.addEventListener("pointermove",y),a.addEventListener("pointerup",x),a.addEventListener("pointercancel",x)}async _commitMove(e,t,s,a,i){let r=s.slice(),[l]=r.splice(a,1);r.splice(i,0,l);let c=i===0?void 0:r[i-1],d=e.items.slice(),h=d.findIndex(w=>V(w)===l),[p]=d.splice(h,1),f=c?d.findIndex(w=>V(w)===c):-1;d.splice(f+1,0,p),this._setItems(e.id,d);let g={type:"todo/item/move",entity_id:e.id,uid:l};c&&(g.previous_uid=c);try{await this.hass.callWS(g)}catch{this._setItems(e.id,e.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return u;let e=this._dark,t=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,i=a?a.color:t,r=`--rv-accent:${i.fill};--rv-accent-ink:${e?i.fill:i.ink};--rv-accent-soft:${ut(i.fill,e?.18:.14)};--rv-accent-ink-light:${i.ink};`,l;return s.name==="list"?l=this._renderList(s.id):s.name==="lists"?l=this._renderLists():s.name==="search"?l=this._renderSearch():s.name==="more"?l=this._renderMore():s.name==="listas"?l=this._renderMoreScreen("Listas",this._listsStatus(),this._renderListsTab()):s.name==="graficos"?l=this._renderCharts():s.name==="sobre"?l=this._renderMoreScreen("Sobre",null,js({app:"ResolvIA",version:is})):s.name==="config"?l=this._renderConfig():l=this._renderSuggest(),n`
      <div class="root" style=${r}>
        <div class="app">
          ${!this.env||this.env.topbar?n`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${m("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:u}
          ${this.hass.connected===!1?n`<div class="offline">${m("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:u}
          ${this._renderSide(s)}
          <main @touchstart=${c=>this._onSwipeStart(c)} @touchend=${c=>this._onSwipeEnd(c)}>${l}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()?n`<input id="rv-photos" class="sr" type="file" accept="image/*,application/pdf" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${c=>this._onFiles(c)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${c=>this._onFiles(c)} />`:u}
      </div>
    `}_renderNav(e){let t=this._dueOn()?this._visible().reduce((i,r)=>i+r.late+r.today,0):0,s=e.name==="list"?"lists":We.includes(e.name)?"more":e.name,a=(i,r,l,c,d=0)=>n`
      <button class="tab ${s===i?"on":""}" @click=${()=>this._goTab(r)} aria-label=${l}>
        ${m(c)}<span>${l}</span>
        ${d?n`<span class="badge">${d>99?"99+":d}</span>`:u}
      </button>
    `;return n`
      <nav>
        <div class="tabs">
          ${a("home","","Agora","clock",t)} ${a("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(e.name==="list"?e.id:null)} aria-label="Adicionar item">
            <span class="pill">${m("plus")}</span>
          </button>
          ${a("lists","/minhas-listas","Listas","list-checks")} ${a("more","/mais","Mais","ellipsis")}
        </div>
      </nav>
    `}_renderSide(e){let t=this._byPending(this._visible()),s=this._dueOn()?t.reduce((r,l)=>r+l.late+l.today,0):0,a=We.includes(e.name)?"more":e.name,i=(r,l,c,d,h=0,p="")=>n`<button class="side-link" aria-current=${a===r?"page":"false"} @click=${()=>this._goTab(l)}>
      ${m(d)}<span>${c}</span>${h?n`<span class="side-badge">${h>99?"99+":h}</span>`:u}${p?n`<kbd>${p}</kbd>`:u}
    </button>`;return n`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${Ft()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${i("home","","Agora","clock",s)} ${i("search","/buscar","Buscar","search",0,"/")}
        ${i("lists","/minhas-listas","Listas","list-checks")} ${i("more","/mais","Mais","ellipsis")}
      </div>
      ${t.length?n`<div class="side-h"><span>Listas</span><small>${t.length}</small></div>
            <div class="side-lists">
              ${t.map(r=>n`<button class="side-list" aria-current=${e.name==="list"&&e.id===r.id?"page":"false"} style=${j(r.color,this._dark)} @click=${()=>this._go(`/lista/${r.id}`)}>
                  ${r.icon?n`<span class="side-tile">${m(r.icon)}</span>`:n`<span class="side-tile sem"></span>`}<span class="sl-name">${r.name}</span><span class="sl-num">${r.pending||""}</span>
                </button>`)}
            </div>`:u}
      <div class="side-foot">ResolvIA ${is}</div>
    </aside>`}_renderTopActs(){return n`<div class="top-acts">
      ${this._renderChatBtn()}${this._renderMicBtn()}
      ${this._canImport()?n`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${m("scan-text")}Ler com IA</button>`:u}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${m("plus")}Adicionar item</button>
    </div>`}_renderPageHead(e,t,s=!1){let a=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],r=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:t;return n`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${Ft()}Resolv<span>IA</span></span>${a?n`<span class="sep"> · </span>Olá, ${a}`:""}</p>${this._renderChatBtn()}${this._renderMicBtn()}${this._renderTopActs()}</div>
      ${s?n`<button class="uplink" @click=${()=>this._toMenu()}>${m("chevron-left")}Mais</button>`:u}
      <h1 class="page-title">${ii[e]?n`<span class="mais-ic page-ic" aria-hidden="true">${m(ii[e])}</span>`:u}${e}</h1>
      ${r?n`<p class="status"><span class="dot ${r.tone||""}" aria-hidden="true"></span><span>${r.text}</span></p>`:u}
    </header>`}_byPending(e){return[...e].sort((t,s)=>s.pending-t.pending)}_renderLists(){let e=this._byPending(this._visible()),t=this._L.filter(h=>h.hidden),s=e.reduce((h,p)=>h+p.pending,0),a=e.reduce((h,p)=>h+p.late,0),i=e.reduce((h,p)=>h+p.today,0),r=e.filter(h=>h.pending>0).length,l=[];s&&l.push(`em ${C(r,"lista","listas")}`),i&&l.push(`${i} pra hoje`),a&&l.push(`${C(a,"atrasado","atrasados")}`);let c=this._app("group_by_device",!0),d=[];if(c){for(let p of e){let f=p.group||"",g=d.find(w=>w.name===f);g||d.push(g={name:f,lists:[]}),g.lists.push(p)}let h=p=>p.lists.reduce((f,g)=>f+g.pending,0);d.sort((p,f)=>h(f)-h(p)||(p.name?1:0)-(f.name?1:0))}else d.push({name:null,lists:e});return n`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${C(e.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>n`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${Aa(this.hass.user&&this.hass.user.name)}</div>
            ${s?n`<div class="hero-big">${s}<small>${s===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${l.join(" \xB7 ")}</div>`:n`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>
        ${this._L.length?this._renderHomeFacts(e):u}
        </div>

        ${this._L.length?this._renderHomeSearch():u}

        ${this._L.length===0?n`<div class="panel">
              <div class="empty">
                <div class="em-icon">${m("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:n`
              <div class="groups ${d.length>1?"two":""}">
              ${d.map(h=>{let p=c?h.name||(d.length>1?"Listas locais":"Listas"):"Listas",f=c&&(h.name||d.length>1);return n`
                  <div class="panel grp">
                    <div class="grp-head ${f?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${m(h.name?"layout-list":"list-checks")}</span><h2 class="overline">${p}</h2><small>${h.lists.length}</small></div>
                    ${h.lists.map(g=>this._renderListCard(g,!c))}
                  </div>
                `})}
              </div>
              ${t.length?n`<div class="panel grp inact-grp">${this._renderFold("listas",t,h=>this._renderListCard(h,!c))}</div>`:u}
            `}
        ${this.hass.user&&this.hass.user.is_admin?n`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${m("list-plus")}<span>Nova lista</span>
            </button>`:u}
      </section>
    `}_renderHomeSearch(){let e=this._visible().reduce((t,s)=>t+(s.items&&s.items.length||0),0);return n`<form class="search-box home-search" role="search" @submit=${t=>{t.preventDefault(),this._query=t.target.q.value.trim(),this._toSearch()}}>
      ${m("search")}
      <input type="search" name="q" placeholder=${e?`Buscar entre ${C(e,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${t=>{t.target.value.trim()&&(this._query=t.target.value,t.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(e,t){let s=e.pending+e.done,a=s?Math.round(e.done/s*100):0,i=[];return e.unavailable?i.push(n`<span>Indisponível</span>`):e.items?(i.push(n`<span>${e.pending?C(e.pending,"pendente","pendentes"):"Tudo resolvido"}${e.done?` \xB7 ${e.done} ${e.done===1?"feito":"feitos"}`:""}</span>`),e.late?i.push(n`<span class="tag late">${m("circle-alert")}${e.late}</span>`):e.today&&i.push(n`<span class="tag today">${m("clock")}${e.today} hoje</span>`)):i.push(n`<span>Carregando…</span>`),n`
      <button class="list-card ${e.unavailable?"off":""}" style=${j(e.color,this._dark)} @click=${()=>this._go(`/lista/${e.id}`)}>
        ${e.icon?n`<span class="tile">${m(e.icon)}</span>`:u}
        <span class="lc-main">
          <span class="lc-title">${e.name}</span>
          <span class="lc-meta">${t&&e.group?n`<span>${e.group} ·</span>`:u}${i}</span>
          ${s?n`<span class="bar"><i style="width:${a}%"></i></span>`:u}
        </span>
        <span class="lc-num ${e.pending?"":"zero"}">${e.pending||m("circle-check")}</span>
      </button>
    `}_renderList(e){let t=this._list(e);if(!t)return n`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${m("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>${m("house")}Voltar para o início</button>
      </section>`;let s=O(t.features,M.CREATE)&&!t.unavailable,a=O(t.features,M.UPDATE),i=O(t.features,M.MOVE),r=O(t.features,M.DELETE),l=t.items,c=l?l.filter(g=>!Q(g)||this._recent.has(V(g))):[],d=l?l.filter(g=>Q(g)&&!this._recent.has(V(g))):[],h=l?l.length:0,p=this._doneOpen[e]!==void 0?this._doneOpen[e]:this._app("show_done",!1);return this._selOn(e)?this._renderSelecting(t,c.filter(g=>!Q(g))):n`
      <section class="page" style=${j(t.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${m("chevron-left")}</button>
          <div class="dh-text">
            ${t.group?n`<div class="overline">${t.group}</div>`:u}
            <h1 class="display">${t.name}</h1>
          </div>
          ${this._renderChatBtn()}${this._renderMicBtn(t.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:t.id})} aria-label="Opções da lista">${m("ellipsis")}</button>
        </div>

        ${h?n`<div class="progress">
              <span>${t.done} de ${h} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(t.done/h*100)}%"></i></span>
            </div>`:u}
        ${s?n`<div class="quick">
              <form @submit=${g=>this._quickAdd(g,t)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${g=>this._onQuickPaste(g,t)} />
                ${this._canImport()?n`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(t.id)}>${m("scan-text")}</button>`:u}
                <button class="add-btn" type="submit" aria-label="Adicionar">${m("plus")}</button>
              </form>
            </div>`:u}
        ${t.unavailable?n`<div class="panel"><div class="empty"><div class="em-icon">${m("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:l?c.length?n`<div class="panel items">
                  ${re(c,V,g=>this._renderItem(t,g,{draggable:i&&a&&!Q(g),selectable:r&&!Q(g)}))}
                </div>`:n`<div class="panel">
                  <div class="empty">
                    ${h?n`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:n`<div class="em-icon">${m(t.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:n`<div class="panel">${[70,52,84].map(g=>n`<div class="skeleton" style="width:${g}%"></div>`)}</div>`}
        ${d.length?n`
              <div class="done-head">
                <button class="done-toggle ${p?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[e]:!p}} aria-expanded=${p?"true":"false"}>
                  Concluídos <span class="count">(${d.length})</span>${m("chevron-down")}
                </button>
                ${r?n`<button class="text-btn" @click=${()=>this._confirmClearDone(t)}>${m("trash")}Limpar</button>`:u}
              </div>
              ${p?n`<div class="panel items">${re(d,V,g=>this._renderItem(t,g))}</div>`:u}
            `:u}
        ${!a&&l&&l.length?n`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:u}
      </section>
    `}_selOn(e){return!!(this._sel&&this._sel.listId===e&&this._sel.path===this._path)}_startSelect(e,t=null){this._sel={listId:e.id,path:this._path,keys:new Set(t?[V(t)]:[])},this._haptic("light")}_toggleSel(e){let t=new Set(this._sel.keys),s=V(e);t.has(s)?t.delete(s):t.add(s),this._sel={...this._sel,keys:t}}_endSelect(){this._sel=null}_renderSelecting(e,t){let s=t.filter(i=>this._sel.keys.has(V(i))).length,a=s===t.length&&t.length>0;return n`
      <section class="page selecting-page" style=${j(e.color,this._dark)}>
        <div class="detail-head sel-head">
          <button class="icon-btn" @click=${()=>this._endSelect()} aria-label="Cancelar seleção">${m("x")}</button>
          <div class="dh-text">
            <div class="overline">${e.name}</div>
            <h1 class="display">${s?`${s} ${s===1?"selecionado":"selecionados"}`:"Selecionar"}</h1>
          </div>
          <button class="text-btn" @click=${()=>this._sel={...this._sel,keys:a?new Set:new Set(t.map(V))}}>${m(a?"x":"square-check-big")}${a?"Nenhum":"Todos"}</button>
        </div>
        <div class="panel items">${re(t,V,i=>this._renderItem(e,i,{selecting:!0,selected:this._sel.keys.has(V(i))}))}</div>
        <div class="sel-bar">
          <button class="btn primary" ?disabled=${!s} @click=${()=>this._openSheet("move",{listId:e.id})}>${m("arrow-right-left")}Mover para outra lista</button>
        </div>
      </section>
    `}_renderMoveSheet(){let e=this._list(this._form.listId);if(!e||!this._sel)return u;let t=this._sel.keys.size,s=this._L.filter(a=>a.id!==e.id&&O(a.features,M.CREATE)&&!a.unavailable&&!a.hidden);return n`
      <div class="sheet-head">
        <h3 class="display">${m("arrow-right-left","sh-ic")}Mover ${t} ${t===1?"item":"itens"} para</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
      </div>
      ${s.length?n`<div class="chip-row grid">${s.map(a=>n`<button class="pick list" style=${j(a.color,this._dark)} @click=${()=>this._moveSelected(a.id)}><span class="dot"></span><span>${D(a.name,26)}</span></button>`)}</div>`:n`<p class="page-sub">Nenhuma outra lista aceita itens novos.</p>`}
    `}async _moveItem(e,t,s,a=null){let i=t.summary||"",r=a?a.date?a:null:te(t.due);if(!await this._addFull(s,{summary:i,description:Se(t.description),date:r?r.date:null,time:r?r.time:null}))return!1;let c=this._ruleFor(e.id,t);c&&c.days&&(await this._setRule(s.id,{summary:i,days:c.days}),await this._setRule(e.id,{uid:t.uid,summary:i,days:null}));let d=this._rawPoints(e.id,i);d&&(await this._setTaskPoints(s.id,i,d),await this._setTaskPoints(e.id,i,0));let h=this._roomIdsOf(e.id,i),p=this._equipIdsOf(e.id,i);h.length&&(await this._setTaskRoom(s.id,i,h),await this._setTaskRoom(e.id,i,null)),p.length&&(await this._setTaskEquip(s.id,i,p),await this._setTaskEquip(e.id,i,null));let f=this._externalRaw(e.id,i);return f&&(await this._setTaskExternal(s.id,i,f),await this._setTaskExternal(e.id,i,null)),!0}async _moveSelected(e){let t=this._list(this._sel.listId),s=this._list(e);if(!t||!s)return;let a=(t.items||[]).filter(r=>this._sel.keys.has(V(r)));this._closeSheet(),this._endSelect();let i=[];for(let r of a)await this._moveItem(t,r,s)&&i.push(r);i.length&&await this._call("remove_item",{item:i.map(V)},t.id),this._haptic("light"),this._showToast(i.length===a.length?`${i.length} ${i.length===1?"item movido":"itens movidos"} para ${D(s.name,28)}`:`Movidos ${i.length} de ${a.length} para ${D(s.name,28)}`)}_renderText(e,t){return Sa(e).map(s=>s.url?n`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${m(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,t))}_highlight(e,t){if(!t)return e;let s=wa(e),a=H(t);if(!a)return e;let i=[],r=0,l;for(;(l=s.indexOf(a,r))!==-1;)l>r&&i.push(e.slice(r,l)),i.push(n`<mark>${e.slice(l,l+a.length)}</mark>`),r=l+a.length;return r<e.length&&i.push(e.slice(r)),i}_renderItem(e,t,s={}){let a=Q(t),i=!a&&se(t.due),r=O(e.features,M.UPDATE),l=this._ruleFor(e.id,t),c=l?a&&l.reopen_at?n`<span class="tag rep">${m("repeat")}volta ${this._returnLabel(l.reopen_at)}</span>`:n`<span class="tag rep">${m("repeat")}${this._everyLabel(l.days)}</span>`:u;if(s.selecting){let d=!!s.selected;return n`
        <div class="item selecting ${d?"picked":""} ${s.locked?"locked":""}" data-key=${V(t)} style=${s.showList?j(e.color,this._dark):""} title=${s.locked||""}
          @click=${()=>s.locked?this._showToast(s.locked):s.onToggle?s.onToggle():this._toggleSel(t)}>
          <span class="check sel ${d?"on":""}" role="checkbox" aria-checked=${d?"true":"false"} aria-disabled=${s.locked?"true":"false"} aria-label="Selecionar ${t.summary||""}">${m(s.locked?"lock":"check")}</span>
          <div class="it-body">
            <div class="it-text">${t.summary||""}</div>
            ${this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?n`<div class="chips">${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}</div>`:u}
          </div>
        </div>
      `}return n`
      <div class="item ${a?"done":""}" data-key=${V(t)} ?data-drag=${s.draggable} style=${s.showList?j(e.color,this._dark):""} @contextmenu=${s.onHold?d=>(d.preventDefault(),s.onHold()):s.selectable?d=>(d.preventDefault(),this._startSelect(e,t)):null}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!r} @click=${()=>this._toggle(e,t)}>
          ${m("check")}
        </button>
        <div class="it-body" @click=${()=>r&&this._openEdit(e,t)}>
          <div class="it-text">${this._renderText(t.summary||"",s.query)}</div>
          ${Se(t.description)?n`<div class="it-desc">${this._renderText(Se(t.description),s.query)}</div>`:u}
          ${s.why?n`<div class="it-why">${m(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:u}
          ${i||s.showList||l||this._pointsOf(e.id,t.summary,t.uid)||this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?n`<div class="chips">
                ${s.showList?n`<span class="tag list">${e.icon?m(e.icon):u}${D(e.name,24)}</span>`:u}
                ${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}
                ${i?e.noDue?n`<span class="tag info" title=${e.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${m("clock-fading")}${i.text}</span>`:n`<span class="tag ${i.tone==="late"?"late":i.tone==="today"?"today":""}">${m(i.time?"clock":"calendar")}${i.text}</span>`:u}
                ${c} ${this._renderPointsTag(e.id,t)}
              </div>`:u}
        </div>
        ${s.draggable?n`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${d=>this._dragStart(d,e,t)} @click=${d=>d.preventDefault()}>${m("grip-vertical")}</button>`:u}
      </div>
    `}_dueRows(e=this._visible()){let t=[];for(let s of e)if(!s.noDue)for(let a of s.items||[]){if(Q(a)&&!this._recent.has(V(a)))continue;let i=se(a.due);i&&t.push({l:s,i:a,d:i})}return t.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(e){let t=this._dueOn()?this._dueRows(e):[],s=t.filter(h=>h.d.overdue),a=t.filter(h=>!h.d.overdue&&h.d.diff===0),i=t.find(h=>!h.d.overdue&&h.d.diff>0),r=[...e].filter(h=>h.pending>0).sort((h,p)=>p.pending-h.pending)[0],l=e.reduce((h,p)=>h+p.done,0),c=[],d=(h,p,f,g,w,b)=>c.push({ic:h,tone:p,label:f,value:g,right:w,go:b});return this._dueOn()&&(d("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._goTab(""):null),d("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._goTab(""):null),d("calendar-clock","","Pr\xF3ximo prazo",i?i.i.summary:"Sem prazos marcados",i?i.d.text:"",i?()=>this._go(`/lista/${i.l.id}`):null)),d("list-checks","","Mais cheia",r?r.name:"Tudo resolvido",r?C(r.pending,"pendente","pendentes"):"",r?()=>this._go(`/lista/${r.id}`):null),this._dueOn()||d("circle-check","","Resolvidos",C(l,"item feito","itens feitos"),"",null),n`<dl class="facts">
      ${c.map(h=>n`<div class="fact-row ${h.go?"go":""}" role=${h.go?"link":"group"} tabindex=${h.go?"0":"-1"} @click=${h.go||(()=>{})} @keydown=${p=>h.go&&p.key==="Enter"&&h.go()}>
          <dt><span class="sec-ic ${h.tone}" aria-hidden="true">${m(h.ic)}</span>${h.label}</dt>
          <dd>${h.value}</dd>
          <dd class="fv ${h.tone}">${h.right}</dd>
        </div>`)}
    </dl>`}_cardHead(e,t,s,a=""){return n`<div class="mais-head due-head"><span class="mais-ic ${a}" aria-hidden="true">${m(e)}</span><h2>${t}</h2><small class="mh-count">${s}</small></div>`}_dueSections(){let e=this._visible(),t=this._dueOn()?this._dueRows(e):[],s=new Set,a=Gt.map(c=>{let d=t.filter(h=>!s.has(h)&&c.test(h.d));return d.forEach(h=>s.add(h)),{...c,rows:d}}),i=c=>c.rows.length?n`<div class="panel items due-group" data-card=${c.id}>
            ${this._cardHead(c.icon,c.title,c.rows.length,c.id==="late"?"late":"")}
            ${re(c.rows,d=>d.l.id+V(d.i),d=>this._renderItem(d.l,d.i,{showList:!0}))}
          </div>`:u,r=(this._dueOn()&&this._repeatOn()?this._rules:[]).filter(c=>c.reopen_at).map(c=>{let d=this._list(c.entity_id),h=d&&d.items&&c.uid?d.items.find(p=>p.uid===c.uid):null;return{r:c,l:d,item:h}}).filter(c=>c.l&&!c.l.hidden).sort((c,d)=>c.r.reopen_at-d.r.reopen_at),l=r.length?n`<div class="panel items due-group" data-card="coming">
          ${this._cardHead("repeat","Voltam sozinhas",r.length)}
          ${re(r,c=>c.r.id,c=>c.item?this._renderItem(c.l,c.item,{showList:!0}):n`<div class="item done" style=${j(c.l.color,this._dark)}>
                    <span class="check on">${m("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${c.l.id}`)}>
                      <div class="it-text">${c.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${c.l.icon?m(c.l.icon):u}${D(c.l.name,24)}</span>
                        <span class="tag rep">${m("repeat")}volta ${this._returnLabel(c.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:u;return{cards:Object.fromEntries(a.map(c=>[c.id,i(c)])),coming:l,comingN:r.length,rows:t,late:t.filter(c=>c.d.overdue).length,today:t.filter(c=>!c.d.overdue&&c.d.diff===0).length}}_renderSearchWho(){let e=this._searchPeople();if(!e.length)return u;let t=this._searchWhoNow(),s=a=>{this._haptic("light"),this._searchWho=a,this.requestUpdate()};return n`<span class="filters-sub" id="incluir-quem">${m("user-round","lbl-ic")}De quem é</span>
      <div class="filters who-filter" role="radiogroup" aria-labelledby="incluir-quem">${["",...e].map(a=>{let i=a?H(t)===H(a):!t;return n`<button class="pick ${i?"on":""}" role="radio" aria-checked=${i?"true":"false"} @click=${()=>s(a)}>${m(a?"user-round":"users")}<span>${a||"Todos"}</span></button>`})}</div>`}_searchToggle(e,t,s,a){return n`<button class="pick ${s?"on":""}" aria-pressed=${s?"true":"false"} @click=${a}>${m(e)}<span>${t}</span></button>`}_searchPeople(){let e=new Map;for(let t of this._visible())t.owner&&!e.has(H(t.owner))&&e.set(H(t.owner),t.owner);return[...e.values()].sort((t,s)=>t.localeCompare(s,"pt-BR"))}_searchWhoNow(){let e=this._searchPeople();if(this._searchWho==null){let s=H((this.hass&&this.hass.user&&this.hass.user.name||"").trim());return e.find(a=>H(a)===s||s.split(/\s+/)[0]===H(a).split(/\s+/)[0])||""}let t=this._searchWho;return t&&e.some(s=>H(s)===H(t))?t:""}_searchLists(){let e=this._searchWhoNow();return this._visible().filter(t=>!e||!t.owner||H(t.owner)===H(e))}_renderSearch(){let e=this._query.trim(),t=H(e),s=this._bselOn(),a=[],i=0,r=this._roomsOn()&&this._searchRooms,l=this._equipsOn()&&this._searchEquips,c=this._extOn()&&this._searchExt,d=(b,k)=>r||l?H(this._placeText(b.id,k.summary,{rooms:r,equips:l})).includes(t):!1,h=(b,k)=>!t||H(k.summary).includes(t)||H(k.description).includes(t)||d(b,k)||c&&H(this._externalText(b.id,k.summary)).includes(t);for(let b of this._searchLists()){let k=(b.items||[]).filter(y=>(this._searchDone&&!s||!Q(y))&&h(b,y));k.length&&(k.sort((y,x)=>Number(Q(y))-Number(Q(x))),a.push({l:b,hits:k}),i+=k.length)}let p=a.flatMap(({l:b,hits:k})=>k.filter(y=>!this._bulkLocked(b,y)).map(y=>this._bkey(b,y))),f=s?this._bulkRows().length:0,g=s&&p.length>0&&p.every(b=>this._bsel.keys.has(b)),w=s?n`<div class="res-head sel-head">
          <button class="icon-btn" @click=${()=>this._endBulk()} aria-label="Cancelar seleção">${m("x")}</button>
          <b class="res-n">${f?`${f} ${f===1?"selecionado":"selecionados"}`:"Selecionar"}</b>
          <button class="text-btn" ?disabled=${!p.length} @click=${()=>this._bsel={...this._bsel,keys:g?new Set:new Set([...this._bsel.keys,...p])}}>${m(g?"x":"square-check-big")}${g?"Nenhum":"Todos"}</button>
        </div>`:n`<div class="res-head">
          <p class="page-sub">${t?C(i,"resultado","resultados"):this._searchDone?C(i,"item","itens"):C(i,"pendente","pendentes")}</p>
          ${i?n`<button class="text-btn" @click=${()=>this._startBulk()}>${m("square-check-big")}Selecionar</button>`:u}
        </div>`;return n`
      <section class="page ${s?"selecting-page":""}">
        ${this._renderPageHead("Buscar",{text:`Em ${C(this._searchLists().length,"lista","listas")}`})}
        <label class="search-box">
          ${m("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${b=>this._query=b.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?n`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${m("x")}</button>`:u}
        </label>
        <button type="button" class="filters-label" id="incluir" aria-expanded=${this._incluirShut?"false":"true"} @click=${()=>{this._haptic("light"),this._incluirShut=!this._incluirShut,ie.set(ci,this._incluirShut),this.requestUpdate()}}>${m("sliders-horizontal","lbl-ic")}Incluir</button>
        <div class="incluir ${this._incluirShut?"shut":""}">
        <div class="filters" role="group" aria-labelledby="incluir">
          ${s?u:this._searchToggle("circle-check","Conclu\xEDdos",this._searchDone,()=>this._searchDone=!this._searchDone)}
          ${""}
          ${this._extOn()?this._searchToggle("hard-hat","Servi\xE7os externos",this._searchExt,()=>this._searchExt=!this._searchExt):u}
          ${this._rooms&&this._rooms.encontrado&&this._roomsOn()?this._searchToggle("door-open","C\xF4modos",this._searchRooms,()=>this._searchRooms=!this._searchRooms):u}
          ${this._rooms&&this._rooms.encontrado&&this._equipsOn()?this._searchToggle("package","Equipamentos",this._searchEquips,()=>this._searchEquips=!this._searchEquips):u}
        </div>
        ${this._renderSearchWho()}
        </div>
        ${a.length?n`${w}
              ${a.map(({l:b,hits:k})=>{let y=this._searchShut.has(b.id);return n`
                  <div class="panel items search-list" style=${j(b.color,this._dark)}>
                    <button type="button" class="overline fold-over" aria-expanded=${y?"false":"true"} @click=${()=>{this._haptic("light"),y?this._searchShut.delete(b.id):this._searchShut.add(b.id),this.requestUpdate()}}><span>${b.name}${b.group?` \xB7 ${b.group}`:""}${y?` (${k.length})`:""}</span></button>
                    ${y?u:re(k,V,x=>s?this._renderItem(b,x,{selecting:!0,selected:this._bsel.keys.has(this._bkey(b,x)),locked:this._bulkLocked(b,x),onToggle:()=>this._toggleBulk(b,x)}):this._renderItem(b,x,{query:e,onHold:Q(x)||this._bulkLocked(b,x)?null:()=>this._startBulk(b,x)}))}
                  </div>
                `})}
              ${s?n`<div class="sel-bar">
                    <button class="btn primary" ?disabled=${!f} @click=${()=>this._openBulk()}>${m("pencil")}${f?`Alterar ${f} ${f===1?"item":"itens"}`:"Alterar"}</button>
                  </div>`:u}`:t?n`<div class="panel"><div class="empty"><div class="em-icon">${m("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${D(e,30)}”.</p></div></div>`:n`<div class="panel"><div class="empty"><div class="em-icon">${m("circle-check")}</div><h3>Nada pendente</h3><p>Tudo resolvido nas listas.</p></div></div>`}
      </section>
    `}_bkey(e,t){return`${e.id}|${V(t)}`}_bselOn(){return!!(this._bsel&&this._bsel.path===this._path)}_bulkLocked(e,t){return this._mirrored(e.id,t.uid)?"Vem do CronologIA: mude por l\xE1.":""}_startBulk(e=null,t=null){this._bsel={path:this._path,keys:new Set(e&&t?[this._bkey(e,t)]:[])},this._haptic("light")}_toggleBulk(e,t){let s=new Set(this._bsel.keys),a=this._bkey(e,t);s.has(a)?s.delete(a):s.add(a),this._bsel={...this._bsel,keys:s}}_endBulk(){this._bsel=null}_bulkRows(){if(!this._bsel)return[];let e=[];for(let t of this._visible())for(let s of t.items||[])!Q(s)&&this._bsel.keys.has(this._bkey(t,s))&&!this._bulkLocked(t,s)&&e.push({l:t,i:s});return e}_openBulk(){this._openSheet("bulk",{setDue:!1,date:null,time:null,setRooms:!1,rooms:[],setEquips:!1,equips:[],equipQ:"",equipMore:!1,equipAdding:!1,setExt:!1,ext:null,target:null})}_renderBulkSheet(){let e=this._form,t=this._bulkRows(),s=t.length;if(!e||!s)return u;let a=this._dueOn()&&t.some(({l:_})=>O(_.features,M.DUE_DATE)||O(_.features,M.DUE_DATETIME)),i=t.some(({l:_})=>O(_.features,M.DUE_DATETIME)),r=Yt(),l=r.some(_=>_.date===e.date),c=(_,A)=>n`<button class="pick keep ${_?"on":""}" aria-pressed=${_?"true":"false"} @click=${A}>${m("lock")}<span>Manter</span></button>`,d=this._equipsOn(),h=e.setEquips?e.equips||[]:[],p=d&&h.length>0,f=p?this._roomsOfEquips(h):e.rooms||[],g=this._houseRooms().map(_=>_.id),w=!p&&e.setRooms&&this._allRooms(f),b=_=>{let A=f.includes(_)?f.filter(T=>T!==_):[...f,_];this._setForm({setRooms:!0,rooms:A})},k=e.setExt?e.ext:null,y=this._L.filter(_=>O(_.features,M.CREATE)&&!_.unavailable&&!_.hidden),x=e.setDue||e.setRooms||e.setEquips||e.setExt||!!e.target;return n`
      <div class="sheet-head">
        <h3 class="display">${m("pencil","sh-ic")}Alterar ${s} ${s===1?"item":"itens"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
      </div>
      ${a?n`<div class="field" data-f="prazo">
            <span class="flabel">${m("calendar","lbl-ic")}Prazo</span>
            <div class="chip-row grid">
              ${c(!e.setDue,()=>this._setForm({setDue:!1,date:null,time:null,cal:null}))}
              ${r.map(_=>n`<button class="pick ${e.setDue&&e.date===_.date?"on":""}" @click=${()=>this._setForm({setDue:!0,date:_.date,cal:null})}>${m(hi(_.label))}<span>${_.label}</span></button>`)}
              <button class="pick ${e.setDue&&e.date&&!l?"on":""}" aria-expanded=${e.cal?"true":"false"} @click=${()=>this._toggleCal()}>
                ${m("calendar")}<span>${e.setDue&&e.date&&!l?ft(e.date):"Outra data"}</span>
              </button>
              <button class="pick ${e.setDue&&!e.date?"on":""}" @click=${()=>this._setForm({setDue:!0,date:null,time:null,cal:null})}>${m("x")}<span>Sem prazo</span></button>
            </div>
            ${e.cal?this._renderCal(e.setDue?e.date:null,_=>this._setForm({setDue:!0,date:_,cal:null})):u}
          </div>`:u}
      ${a&&i&&e.setDue&&e.date?n`<div class="field" data-f="horario">
            <span class="flabel">${m("clock","lbl-ic")}Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${m("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===le?"on":""}" @click=${()=>this._setForm({time:le})}>${m("clock")}<span>${le}</span></button>
              <button class="pick time-other ${e.time&&e.time!==le?"on":""}" @click=${()=>this._pickTime("#rv-bulk-time")}>
                ${m("clock-fading")}<span>${e.time&&e.time!==le?e.time:"Outro hor\xE1rio"}</span>
              </button>
            </div>
            ${this._timeBox("rv-bulk-time",e.time)}
          </div>`:u}
      ${this._roomsOn()?n`<div class="field" data-f="comodo">
            <span class="flabel">${m("door-open","lbl-ic")}Cômodo</span>
            <div class="chip-row grid ${p?"locked":""}">
              ${c(!e.setRooms&&!p,()=>this._setForm({setRooms:!1,rooms:[]}))}
              <button class="pick ${e.setRooms&&!f.length&&!p?"on":""}" ?disabled=${p} @click=${()=>this._setForm({setRooms:!0,rooms:[]})}>${m("x")}<span>Nenhum</span></button>
              ${g.length>1?n`<button class="pick room all-rooms ${w?"on":""}" ?disabled=${p} @click=${()=>this._setForm(w?{setRooms:!0,rooms:[]}:{setRooms:!0,rooms:g})}>${m("house")}<span>Todos</span></button>`:u}
              ${this._houseRooms().map(_=>n`<button class="pick room ${(e.setRooms||p)&&f.includes(_.id)?"on":""}" aria-pressed=${(e.setRooms||p)&&f.includes(_.id)?"true":"false"} ?disabled=${p} @click=${()=>b(_.id)}>${m("door-open")}<span>${D(_.nome,22)}</span></button>`)}
            </div>
            ${p?n`<span class="field-hint">${m("lock")}<span>Vem ${h.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:u}
          </div>`:u}
      ${d?n`<div class="field" data-f="equipamento">
            <span class="flabel">${m("package","lbl-ic")}${h.length>1?"Equipamentos":"Equipamento"}</span>
            <div class="chip-row grid">
              ${c(!e.setEquips,()=>this._setForm({setEquips:!1,equips:[],equipAdding:!1}))}
              <button class="pick ${e.setEquips&&!h.length?"on":""}" @click=${()=>this._setForm({setEquips:!0,equips:[],equipAdding:!1})}>${m("x")}<span>Nenhum</span></button>
            </div>
            ${je({lit:{html:n,nothing:u},icon:m,items:this._equipItems(),room:h.length?this._roomsOfEquips(h)[0]||null:this._roomsOn()&&e.setRooms&&f.length===1?f[0]:null,roomName:h.length?this._roomName(this._roomsOfEquips(h)[0])||"":this._roomsOn()&&e.setRooms&&f.length===1&&this._roomName(f[0])||"",value:h,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:_=>this._setForm({equipQ:_,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:_=>this._setForm({setEquips:!0,equips:[...h,_],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:_=>this._setForm({equips:h.filter(A=>A!==_)})})}
          </div>`:u}
      ${this._extOn()?n`<div class="field" data-f="quem-faz">
            <span class="flabel">${m("hard-hat","lbl-ic")}Quem faz</span>
            <div class="chip-row ext-row bulk-ext">
              ${c(!e.setExt,()=>this._setForm({setExt:!1,ext:null}))}
              <button class="pick ${e.setExt&&!k?"on":""}" @click=${()=>this._setForm({setExt:!0,ext:null})}>${m("house")}<span>Nós mesmos</span></button>
              <button class="pick ${e.setExt&&k?"on":""}" @click=${()=>this._setForm({setExt:!0,ext:k||!0})}>${m("hard-hat")}<span>Serviço externo</span></button>
            </div>
            ${e.setExt&&k?n`<input type="text" class="ext-who" maxlength="60" .value=${k===!0?"":k} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
                  @input=${_=>this._setForm({ext:_.target.value.replace(/\s+/g," ").trim().slice(0,60)||!0})} />`:u}
          </div>`:u}
      ${y.length>1?n`<div class="field" data-f="lista">
            <span class="flabel">${m("list-todo","lbl-ic")}Lista</span>
            <div class="chip-row grid">
              ${c(!e.target,()=>this._setForm({target:null}))}
              ${y.map(_=>n`<button class="pick list ${e.target===_.id?"on":""}" style=${j(_.color,this._dark)} @click=${()=>this._setForm({target:_.id})}><span class="dot"></span><span>${D(_.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        <button class="btn primary" ?disabled=${!x} @click=${()=>this._applyBulk()}>${m("check")}Aplicar</button>
      </div>
    `}async _applyBulk(){let e=this._form,t=this._bulkRows();if(this._closeSheet(),this._endBulk(),!t.length)return;let s=e.target?this._list(e.target):null,a=e.setDue&&this._dueOn()?{date:e.date||null,time:e.date&&e.time||null}:null,r=this._equipsOn()&&e.setEquips?e.equips||[]:null,l=this._roomsOn()?r&&r.length?this._roomsOfEquips(r):e.setRooms?e.rooms||[]:null:null,c=new Map,d=0;this._haptic("light");for(let{l:p,i:f}of t){let g=f.summary||"",w=!1;if(r&&await this._setTaskEquip(p.id,g,r),l){let k=r?[]:this._equipIdsOf(p.id,g),y=this._roomsOfEquips(k);k.length&&y.join("|")!==[...l].join("|")?w=!0:await this._setTaskRoom(p.id,g,l)}e.setExt&&this._extOn()&&await this._setTaskExternal(p.id,g,e.ext||null);let b=O(p.features,M.DUE_DATE)||O(p.features,M.DUE_DATETIME);if(a&&!b&&(w=!0),s&&s.id!==p.id){if(O(p.features,M.DELETE)&&await this._moveItem(p,f,s,a&&b?a:null)){c.has(p.id)||c.set(p.id,[]),c.get(p.id).push(V(f)),w||d++;continue}w=!0}if(a&&b&&O(p.features,M.UPDATE)){let k=te(f.due);if((k?k.date:null)!==a.date||(k?k.time:null)!==a.time){let y=this._dueFields(p,a.date,a.time,!0);Object.keys(y).length&&await this._call("update_item",{item:V(f),...y},p.id)}}w||d++}for(let[p,f]of c)await this._call("remove_item",{item:f},p);let h=t.length;this._showToast(d===h?`${h} ${h===1?"item alterado":"itens alterados"}`:`${d} de ${h} itens alterados: o resto n\xE3o aceita a mudan\xE7a`)}_configTabs(){return[...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks","integra\xE7\xF5es"]]:[],...this._data()?[["dados","Dados","archive","dados e backup"]]:[],["aparencia","Apar\xEAncia","palette","apar\xEAncia"],["opcoes","Op\xE7\xF5es","toggle-right","op\xE7\xF5es"]]}_configTab(){let e=this._configTabs(),t=this._view().tab;return e.some(s=>s[0]===t)?t:e[0][0]}_moreRows(){let e=this._configTabs().map(s=>s[3]),t=`${e.slice(0,-1).join(", ")} e ${e[e.length-1]}.`;return[["/listas","list-checks","Listas","Nome, cor, \xEDcone e quais aparecem."],["/graficos","chart-bar","Gr\xE1ficos",this._chartsLine()],["relatorio","clipboard-list","Relat\xF3rio de pend\xEAncias","Para imprimir ou salvar em PDF."],["/config","sliders-horizontal","Configura\xE7\xF5es",t[0].toUpperCase()+t.slice(1)],["/sobre","info","Sobre","CorrerIA Code, os apps e o GitHub."]]}_secHead(e,t,s=null){return n`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${m(e)}</span><h2>${t}</h2></div>${s?n`<p class="panel-lead">${s}</p>`:u}`}_renderFoot(){return n`<p class="foot"><b>ResolvIA</b><br />v${is} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>`}_renderMore(){return n`
      <section class="page">
        ${this._renderPageHead("Mais",null)}
        <div class="panel more-menu" role="navigation" aria-label="Mais">
          <ul>
            ${this._moreRows().map(([e,t,s,a])=>n`<li>
                <button class="more-row" @click=${()=>this._openFromMenu(e)}>
                  <span class="mais-ic" aria-hidden="true">${m(t)}</span>
                  <span class="mb"><b>${s}</b><span>${a}</span></span>
                  ${m("chevron-right","chev")}
                </button>
              </li>`)}
          </ul>
        </div>
        ${this._renderFoot()}
      </section>
    `}_renderMoreScreen(e,t,s){return n`
      <section class="page">
        ${this._renderPageHead(e,t,!0)}
        ${s}
      </section>
    `}_listsStatus(){let e=this._L.filter(t=>t.hidden).length;return{text:this._L.length?`${C(this._L.length,"lista","listas")}${e?` \xB7 ${C(e,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}_renderConfig(){let e=this._configTabs(),t=this._configTab(),s=i=>{i!==t&&(this._haptic("light"),this._go(this._configPath(i),!0,history.state&&history.state.rvUp?{rvUp:!0}:null))},a;return t==="integracoes"?a=n`${this._renderRewardsPanel()} ${this._renderRoomsPanel()} ${this._renderCorreriaPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this.hass.resolvia.voiceStatus&&this._aiOn()?this._renderVoicePanel():u} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():u} ${this._renderSensorsPanel()}`:t==="dados"?a=this._renderDataPanel():t==="aparencia"?a=this._renderAppearanceTab():a=this._renderOptionsTab(),n`
      <section class="page">
        ${this._renderPageHead("Configura\xE7\xF5es",null,!0)}
        <div class="tabs-wrap"><div class="seg compact more-tabs" role="tablist" aria-label="Seções de Configurações" @scroll=${()=>this._markTabs()}>
          ${e.map(([i,r,l])=>n`<button class=${t===i?"on":""} role="tab" aria-selected=${t===i?"true":"false"} @click=${()=>s(i)}>${m(l)}<span>${r}</span></button>`)}
        </div><span class="tabs-fim esq" aria-hidden="true">${m("chevron-left")}</span><span class="tabs-fim dir" aria-hidden="true">${m("chevron-right")}</span></div>
        <div role="tabpanel" aria-label=${e.find(i=>i[0]===t)[1]}>${a}</div>
        ${this._renderFoot()}
      </section>
    `}_renderFold(e,t,s,a="Inativas"){if(!t.length)return u;let i=!!this._folds[e];return n`<button class="row inact-head ${i?"open":""}" data-fold=${e} aria-expanded=${i?"true":"false"} @click=${()=>this._folds={...this._folds,[e]:!i}}>
        <span class="tile muted">${m("eye-off")}</span>
        <span class="grow"><div class="label">${a} <span class="count">(${t.length})</span></div></span>
        ${m("chevron-down","chev")}
      </button>
      ${i?re(t,r=>r.id,s):u}`}_renderListsTab(){let e=(a,i,r)=>n`<label class="switch"><input type="checkbox" role="switch" .checked=${a} @change=${r} aria-label=${i} /><span class="track"></span></label>`,t=this._L.filter(a=>a.hidden),s=a=>n`
      <div class="row ${a.hidden?"inact":""}" style=${j(a.color,this._dark)}>
        <button class="tile ${a.icon?"":"sem"}" @click=${()=>this._openCustomize(a)} aria-label="Personalizar ${a.name}">${a.icon?m(a.icon):u}</button>
        <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(a)}>
          <div class="label">${a.name}</div>
          <div class="hint">${a.group||a.id}</div>
        </button>
        ${e(!a.hidden,`Mostrar ${a.name}`,i=>this._saveListPrefs(a.id,{hidden:i.target.checked?null:!0}))}
      </div>
    `;return n`
        <div class="panel lists-panel">
          <p class="panel-lead">Toque numa lista para personalizar.</p>
          ${this._L.length?re(this._L.filter(a=>!a.hidden),a=>a.id,s):n`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
          ${this._renderFold("mais-listas",t,s)}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?n`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${j(this._accent(),this._dark)}>${m("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${m("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${j(Ae("grafite"),this._dark)}>${m("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${m("chevron-right")}
              </button>
            </div>`:u}

    `}_renderRulesPanels(){if(!this._rulesOk)return u;let e=this._repeatOn();return n`<div class="panel" id="repeticao">
              ${this._secHead("repeat","Repeti\xE7\xE3o")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">${m("repeat","lbl-ic")}Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${e?"O item volta sozinho N dias depois de feito.":"Desligado."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._toggleRepeat(t)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!e&&!this._rules.length?u:n`<div class="panel ${e?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!e&&this._rules.length?n`<p class="panel-lead">Não voltam mais sozinhas. Apague para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${m("trash")}Apagar ${C(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:u}
              ${this._rules.length?this._rules.map(t=>{let s=this._list(t.entity_id);return s?n`<div class="row" style=${j(s.color,this._dark)}>
                      <span class="tile">${m("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${t.summary||t.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(t.days)}${e?t.reopen_at?` \xB7 volta ${this._returnLabel(t.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(t.entity_id,{uid:t.uid,summary:t.match||t.summary,days:null})}>${m("x")}</button>
                    </div>`:u}):n`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir”.</div></div>`}
            </div>`}`}_toggleRepeat(e){let t=e.target.checked;if(t||!this._rules.length)return this._saveAppPrefs({repeat_on:t});e.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(e){let t=this._rules.length;this._openSheet("confirm",{title:e?"Desligar a repeti\xE7\xE3o?":"Apagar as repeti\xE7\xF5es?",text:`${C(t,"tarefa se repete","tarefas se repetem")}. ${e?"Ao desligar, essas repeti\xE7\xF5es s\xE3o apagadas":"Elas ser\xE3o apagadas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:e?"Apagar e desligar":`Apagar ${C(t,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),e&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${C(t,"repeti\xE7\xE3o apagada","repeti\xE7\xF5es apagadas")}${e?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let e=(s,a,i)=>n`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${i} aria-label=${a} /><span class="track"></span></label>`,t=this._dueOn();return n`
        <div class="panel">
          ${this._secHead("calendar-clock","Prazos")}
          <div class="row">
            <div class="grow"><div class="label">${m("calendar-clock","lbl-ic")}Controlar prazos</div><div class="hint" style="white-space:normal">${t?"O que vence fica vermelho e aparece em Agora.":"Datas s\xF3 como informa\xE7\xE3o."}</div></div>
            ${e(t,"Controlar prazos",s=>this._saveAppPrefs({due_off:s.target.checked?null:!0}))}
          </div>
          ${t?this._renderDueAlert(e):u}
        </div>
        <div class="panel">
          ${this._secHead("layout-list","Exibi\xE7\xE3o")}
          <div class="row">
            <div class="grow"><div class="label">${m("layers","lbl-ic")}Agrupar por dispositivo</div><div class="hint">Ex.: as listas da Alexa juntas</div></div>
            ${e(this._app("group_by_device",!0),"Agrupar por dispositivo",s=>this._saveAppPrefs({group_by_device:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">${m("list-checks","lbl-ic")}Concluídos abertos</div><div class="hint">Mostra os concluídos sem precisar tocar</div></div>
            ${e(this._app("show_done",!1),"Conclu\xEDdos abertos",s=>this._saveAppPrefs({show_done:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">${m("notebook-pen","lbl-ic")}Notas</div><div class="hint" style="white-space:normal">${this._notesOn()?"Campo de notas em cada item.":"Desligado."}</div></div>
            ${e(this._notesOn(),"Notas",s=>this._saveAppPrefs({notes_off:s.target.checked?null:!0}))}
          </div>
        </div>
        ${this._renderExternalOption(e)}
        ${this._renderRulesPanels()}
        ${this._renderShortcut()}
    `}_renderShortcut(){let e=this.hass&&this.hass.resolvia&&this.hass.resolvia.atalho;return e?n`<div class="panel shortcut">
      ${this._secHead("smartphone","Atalho no celular","Um \xEDcone na tela inicial do celular que abre o ResolvIA direto.")}
      <ol class="steps">
        <li>No app do Home Assistant: <b>Configurações › Aplicativo complementar › Gerenciar atalhos</b>.</li>
        <li>Em <b>Atalho fixado</b>, escolha o tipo <b>Painel</b> e cole o <b>Caminho</b> abaixo.</li>
      </ol>
      <label class="field">
        <span class="flabel">${m("smartphone","lbl-ic")}Caminho</span>
        <span class="copy-row"
          ><input type="text" id="rv-atalho" readonly .value=${e} @focus=${t=>t.target.select()} /><button
            type="button"
            class="btn outline"
            @click=${()=>this._copyShortcut()}
          >
            ${m("copy")}Copiar
          </button></span
        >
      </label>
    </div>`:u}async _copyShortcut(){let e=this.renderRoot.querySelector("#rv-atalho");try{await navigator.clipboard.writeText(e.value),this._showToast("Caminho copiado")}catch{e.focus(),e.select(),this._showToast("Toque e segure no texto para copiar")}}_renderDueAlert(e){let t=this._app("due_alert",!1)===!0,s=/^\d{2}:\d{2}$/.test(this._app("due_alert_time",""))?this._app("due_alert_time"):"08:00",a=this._alertPeople;t&&a===void 0&&this._loadAlertPeople();let i=(a||[]).find(p=>p.me),r=p=>p.length>1?`${p.slice(0,-1).join(", ")} e ${p.at(-1)}`:p[0],l=this._alertChosen(),c=p=>!l||l.includes(p.id),d=(a||[]).filter(p=>c(p)&&!p.phone).map(p=>p.name),h=a?i?i.phone?"":"Sem celular ligado a voc\xEA no Home Assistant.":"Voc\xEA n\xE3o \xE9 uma pessoa da casa no Home Assistant.":"";return n`<div class="row">
        <div class="grow"><div class="label">${m("bell","lbl-ic")}Avisar o que vence hoje</div><div class="hint" style="white-space:normal">${t?"Cada pessoa recebe as listas dela e as de todos.":"Desligado."}</div></div>
        ${e(t,"Avisar o que vence hoje",p=>this._saveAppPrefs({due_alert:p.target.checked?!0:null}))}
      </div>
      ${t?n`<div class="sub-op"><div class="sub-box due-alert">
            <div class="alert-when">
              <label class="field">
                <span class="flabel">${m("clock","lbl-ic")}Horário</span>
                <select class="select remind-time" aria-label="Horário do aviso" .value=${Fs(s)} @change=${p=>/^\d{2}:\d{2}$/.test(p.target.value)&&this._saveAppPrefs({due_alert_time:p.target.value})}>
                  ${Kt(s).map(p=>n`<option value=${p} ?selected=${p===s}>${p}</option>`)}
                </select>
              </label>
            </div>
            <div class="field">
              <span class="flabel">${m("users","lbl-ic")}Quem recebe</span>
              ${a==null?n`<p class="field-hint">${a===null?"N\xE3o consegui ver as pessoas da casa.":"Procurando as pessoas da casa\u2026"}</p>`:a.length?n`<div class="due-who" role="group" aria-label="Quem recebe">${a.map(p=>n`<button type="button" class="dw ${c(p)?"on":""} ${p.phone?"":"off"}" aria-pressed=${c(p)?"true":"false"} @click=${()=>this._toggleAlertPerson(p)}>${m("user-round")}<b>${p.name}</b>${p.phone?u:n`<span>sem celular</span>`}</button>`)}</div>
                    ${d.length?n`<p class="field-hint">${m("info")}<span>Sem celular para ${r(d)}: ligue o celular à pessoa no Home Assistant.</span></p>`:l&&!a.some(c)?n`<p class="field-hint">${m("info")}<span>Escolha quem recebe.</span></p>`:u}`:n`<p class="field-hint">${m("info")}<span>Nenhuma pessoa da casa no Home Assistant.</span></p>`}
            </div>
            <button class="btn outline remind-test" ?disabled=${!i||!i.phone} title=${h} @click=${()=>this._testDueAlert()}>${m("send")}Testar no meu celular</button>
          </div></div>`:u}`}_alertChosen(){let e=this._app("due_alert_people",null);return Array.isArray(e)?e:null}_toggleAlertPerson(e){let t=(this._alertPeople||[]).map(i=>i.id).filter(Boolean),s=this._alertChosen()||t,a=s.includes(e.id)?s.filter(i=>i!==e.id):[...s,e.id];this._haptic("light"),this._saveAppPrefs({due_alert_people:t.every(i=>a.includes(i))?null:a})}async _loadAlertPeople(){if(this._alertPeopleLoading)return this._alertPeople;this._alertPeopleLoading=!0;try{this._alertPeople=this._prefsRemote?await this.hass.callWS({type:"resolvia/due_alert/people"}):[]}catch{this._alertPeople=null}return this._alertPeopleLoading=!1,this.requestUpdate(),this._alertPeople}async _testDueAlert(){try{let e=await this.hass.callWS({type:"resolvia/due_alert/test"});this._showToast(e&&e.today?"Aviso enviado para o seu celular. Toque nele para abrir Agora.":"Aviso enviado para o seu celular (nada vence hoje).")}catch(e){this._showToast(`N\xE3o foi: ${e.message}`)}}_renderAppearanceTab(){let e=this._accentDaily(),t=e?this._accent().id:(Ae(this._app("accent","vermelho"))||ue[0]).id;return n`
        <div class="panel">
          ${this._secHead("contrast","Tema","Cada aparelho guarda a sua escolha.")}
          ${ga({theme:this._theme,onTheme:s=>this._setTheme(s),icon:m})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Vale para todos os aparelhos.")}
          <div class="row switch-row daily-row">
            <div class="grow"><div class="label">${m("calendar","lbl-ic")}Cor do dia</div><div class="hint">Muda a cor do app todo dia.</div></div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._saveAppPrefs({accent_daily:s.target.checked?null:!1})} aria-label="Cor do dia" /><span class="track"></span></label>
          </div>
          ${va({palette:ue,value:t,onPick:s=>this._saveAppPrefs({accent:s==="vermelho"?null:s,accent_daily:!1})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return u;let e=this._app("sensors_on",!1)===!0;return n`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">${m("activity","lbl-ic")}Criar sensores</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: nenhum sensor no Home Assistant."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._saveAppPrefs({sensors_on:t.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${e?n`<div class="sub-op"><div class="sub-box sensor-list">
            ${[["sensor.resolvia_atrasados","tarefas atrasadas, com cada uma nos atributos"],["sensor.resolvia_vence_hoje","o que vence hoje, com o hor\xE1rio"],["binary_sensor.resolvia_compras","ligado com algo para comprar, com os itens"],["sensor.resolvia_ia_hoje","chamadas de IA hoje, com erros, cota e tokens estimados"]].map(([t,s])=>n`<div class="sensor-row"><code>${t}</code><span>${s}</span></div>`)}
          </div></div>`:u}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return u;let e=this._aiOn(),t=n`<div class="row switch-row">
        <div class="grow"><div class="label">${m("sparkles","lbl-ic")}Usar IA</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: sem leitura por IA, sem Falar."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${h=>this._saveAppPrefs({ai_off:h.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!e)return n`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","IA","Separa os itens de mensagens, prints, fotos e PDFs, e conversa.")}
        ${t}
      </div>`;let s=this._aiInfo(),a=s.entities||[],i=this._app("ai_entity",""),r=this._app("ai_photos",""),l=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",c=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",d="";return s.ready&&s.using&&(d=`Usando ${s.using.name}${i?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(d+=` Para fotos, ${s.photos.name}.`)),s.reason&&(d=`${d} ${s.reason}`.trim()),n`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","IA","Separa os itens de mensagens, prints, fotos e PDFs, e conversa.")}
      ${t}
      <div class="sub-op"><div class="sub-box">
      <div class="ai-state ${l}"><span class="dot"></span><div><b>${c}</b>${d?n`<span>${d}</span>`:u}</div></div>
      ${a.length||i||r?n`<label class="field" style="margin:14px 0 0">
              <span class="flabel">${m("message-circle","lbl-ic")}Para conversar</span>
              <select class="select" aria-label="IA para conversar" @change=${h=>this._chooseAi(h.target.value)}>
                <option value="" ?selected=${!i}>Padrão do Home Assistant</option>
                ${a.map(h=>n`<option value=${h.id} ?selected=${h.id===i}>${h.name}${h.available?"":" (indispon\xEDvel)"}</option>`)}
                ${i&&!a.some(h=>h.id===i)?n`<option value=${i} selected>${i} (não encontrada)</option>`:u}
              </select>
            </label>
            <label class="field" style="margin:14px 0 0">
              <span class="flabel">${m("scan-text","lbl-ic")}Para ler fotos e PDFs</span>
              <select class="select" aria-label="IA para ler fotos e PDFs" @change=${h=>this._chooseAi(h.target.value,"ai_photos")}>
                <option value="" ?selected=${!r}>Igual à de conversar</option>
                ${a.filter(h=>h.images||h.id===r).map(h=>n`<option value=${h.id} ?selected=${h.id===r}>${h.name}${h.available?"":" (indispon\xEDvel)"}</option>`)}
                ${r&&!a.some(h=>h.id===r)?n`<option value=${r} selected>${r} (não encontrada)</option>`:u}
              </select>
            </label>`:u}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${()=>this._refreshAi()}>${m("rotate-ccw")}Verificar de novo</button></div>
      ${s.ready&&s.images?u:n`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
      </div></div>
    </div>`}_renderSheet(){if(!this._sheet)return u;let e=u;return this._sheet==="item"?e=this._renderItemSheet():this._sheet==="listmenu"?e=this._renderListMenu():this._sheet==="customize"?e=this._renderCustomize():this._sheet==="confirm"?e=this._renderConfirm():this._sheet==="import"?e=this._renderImportSheet():this._sheet==="versions"?e=this._renderVersions():this._sheet==="who"?e=this._renderWhoSheet():this._sheet==="move"?e=this._renderMoveSheet():this._sheet==="bulk"?e=this._renderBulkSheet():this._sheet==="chat"?e=this._renderChatSheet():this._sheet==="cards"&&(e=this._renderCardsSheet()),n`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${t=>t.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${e}
      </div>
    `}_sheetStyle(){let e=this._form||{},t=this._list(e.target||e.listId),s=this._sheet==="customize"&&t?this._formColor(e,t):t&&t.color;return!s||s.none?s?j(s,this._dark):"":`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${ut(s.fill,this._dark?.18:.14)};${j(s,this._dark)}`}_renderMirroredSheet(e){let t=this._form,s=t.mirrored,a=this._pointsOf(e.id,t.summary,t.key),i=se(t.due),r=O(e.features,M.DELETE);return n`
      <div class="sheet-head">
        <h3 class="display">${m(s.tipo==="rotina"?"house":"wrench","sh-ic")}${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
      </div>
      <div class="ro-item">
        <b>${t.summary}</b>
        <div class="ro-tags">
          ${i?n`<span class="tag ${e.noDue?"info":i.tone}">${m("calendar")}${i.text}</span>`:u}
          ${a?n`<span class="tag pts">${m("trophy")}+${a}</span>`:u}
          <span class="tag">${D(e.name,24)}</span>
        </div>
        ${t.description?n`<p>${t.description}</p>`:u}
      </div>
      <p class="sheet-note with-icon">${m("calendar-clock")}<span>Vem do CronologIA: concluir aqui marca como feito lá${a?` (${a} pontos)`:""}. Para editar, use o CronologIA.</span></p>
      <div class="sheet-actions">
        ${r?n`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Apagar">${m("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._closeSheet()}>${m("check")}Fechar</button>
      </div>
    `}_toggleCal(){let e=this._form;e&&(this._setForm({cal:e.cal?null:ei(e.date),calMonths:!1}),this._form.cal&&this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet .cal");t&&t.scrollIntoView({block:"nearest",behavior:"smooth"})}))}_renderCal(e,t){let s=this._form;return ti({icon:m,month:s.cal,value:e,today:xe(new Date),onPick:t,onMonth:a=>this._setForm({cal:a}),months:!!s.calMonths,onMonths:a=>this._setForm({calMonths:a})})}_timeBox(e,t){return n`<select id=${e} class="time-box" tabindex="-1" aria-label="Horário" @focus=${s=>{let a=s.target.parentNode.querySelector(".time-other");a&&a.focus({preventScroll:!0})}} @change=${s=>this._setForm({time:s.target.value||null})}>
      <option value="" hidden></option>
      ${Kt(t).map(s=>n`<option value=${s}>${s}</option>`)}
    </select>`}_pickTime(e){let t=this.renderRoot.querySelector(e),s=window.__selectSheet;!t||!s||!s.open||(t.value=this._form&&this._form.time||"",s.open(t),!t.value&&requestAnimationFrame(()=>requestAnimationFrame(()=>{let a=[...document.querySelectorAll(".ss-wrap .ss-opt")].find(i=>i.textContent.trim()===le);a&&a.scrollIntoView({block:"center"})})))}_renderItemSheet(){let e=this._form,t=this._list(e.listId),s=this._list(e.target)||t;if(!t||!s)return u;if(e.mirrored&&e.mode==="edit")return this._renderMirroredSheet(t);let a=s.features,i=O(a,M.DESCRIPTION),r=this._dueOn()&&(O(a,M.DUE_DATE)||O(a,M.DUE_DATETIME)),l=O(a,M.DUE_DATETIME),c=e.mode==="edit"&&O(t.features,M.DELETE),d=Yt(),h=d.some(f=>f.date===e.date),p=e.mode==="add"?this._L.filter(f=>O(f.features,M.CREATE)&&!f.unavailable&&(!f.hidden||f.id===e.target)):O(t.features,M.DELETE)?this._L.filter(f=>f.id===t.id||O(f.features,M.CREATE)&&!f.unavailable&&!f.hidden):[];return n`
      <div class="sheet-head">
        <h3 class="display">${m(e.mode==="add"?"plus":"pencil","sh-ic")}${e.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
      </div>
      ${e.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(e.target,"text"),photos:()=>this._openImport(e.target,"photos"),scan:()=>this._openImport(e.target,"scan")}):u}
      <label class="field">
        <span class="flabel">${m("pencil","lbl-ic")}Item</span>
        <textarea rows="2" .value=${e.summary} @input=${f=>this._setForm({summary:f.target.value})} @keydown=${f=>f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${i&&(this._notesOn()||e.hadNotes)?n`<label class="field">
            <span class="flabel">${m("notebook-pen","lbl-ic")}Notas</span>
            <textarea rows="3" .value=${e.description} @input=${f=>this._setForm({description:f.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:u}
      ${this._renderWhere(e)}
      ${r?n`<div class="field">
            <span class="flabel">${m("calendar","lbl-ic")}Prazo</span>
            <div class="chip-row grid">
              ${d.map(f=>n`<button class="pick ${e.date===f.date?"on":""}" @click=${()=>this._setForm({date:e.date===f.date?null:f.date,cal:null})}>${m(hi(f.label))}<span>${f.label}</span></button>`)}
              <button class="pick ${e.date&&!h?"on":""}" aria-expanded=${e.cal?"true":"false"} @click=${()=>this._toggleCal()}>
                ${m("calendar")}<span>${e.date&&!h?ft(e.date):"Outra data"}</span>
              </button>
              ${e.date?n`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null,cal:null})}>${m("x")}<span>Sem prazo</span></button>`:u}
            </div>
            ${e.cal?this._renderCal(e.date,f=>this._setForm({date:f,cal:null})):u}
            ${s.appDue&&e.date?n`<p class="field-hint app-due">${m("info")}<span>Guardado no ResolvIA: a lista não aceita data.</span></p>`:u}
          </div>`:u}
      ${r&&l&&e.date?n`<div class="field">
            <span class="flabel">${m("clock","lbl-ic")}Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${m("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===le?"on":""}" @click=${()=>this._setForm({time:le})}>${m("clock")}<span>${le}</span></button>
              <button class="pick time-other ${e.time&&e.time!==le?"on":""}" @click=${()=>this._pickTime("#rv-time")}>
                ${m("clock-fading")}<span>${e.time&&e.time!==le?e.time:"Outro hor\xE1rio"}</span>
              </button>
            </div>
            ${this._timeBox("rv-time",e.time)}
          </div>`:u}
      ${this._rulesOk&&this._repeatOn()&&!e.mirrored&&(O(a,M.UPDATE)||O(a,M.CREATE))?n`<div class="field">
            <span class="flabel">${m("repeat","lbl-ic")}Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${e.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>${m("x")}<span>Não</span></button>
              ${oi.map(f=>n`<button class="pick ${e.repeat===f.days&&!e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:f.days,repeatCustom:!1})}>${m("repeat")}<span>${f.label}</span></button>`)}
              <button class="pick ${e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:e.repeat||4})}>${m("repeat")}<span>Outro</span></button>
            </div>
            ${e.repeatCustom?n`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(e.repeat||"")} @input=${f=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(f.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:u}
            ${e.repeat?n`<div class="field-hint">${m("repeat")}<span>Volta sozinha ${e.repeat===1?"no dia seguinte":`em ${e.repeat} dias`} depois de concluída.</span></div>`:u}
          </div>`:u}
      ${this._renderRoomField(e,!1)}
      ${this._renderEquipField(e)}
      ${this._renderExternalField(e,s.appDue?a&~(M.DUE_DATE|M.DUE_DATETIME):a)}
      ${this._renderPointsField(e)}
      ${p.length>1?n`<div class="field">
            <span class="flabel">${m("list-todo","lbl-ic")}Lista</span>
            <div class="chip-row grid">
              ${p.map(f=>n`<button class="pick list ${e.target===f.id?"on":""}" style=${j(f.color,this._dark)} @click=${()=>this._setForm({target:f.id})}><span class="dot"></span><span>${D(f.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        ${c?n`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Apagar">${m("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._saveItem()}>${m(e.mode==="add"?"plus":e.target!==e.listId?"arrow-right-left":"check")}${e.mode==="add"?"Adicionar":e.target!==e.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(e,{label:t=!0}={}){let s=this._aiInfo(),a=this._camOk(),i=(r,l,c,d=!1,h="")=>n`<button type="button" class="imp-tile ${h?"no-cam":""}" ?disabled=${d} @click=${e[r]}>${m(l)}<span>${c}</span>${h?n`<small>${h}</small>`:u}</button>`;return n`<div class="field imp-field">
        ${t?n`<span class="flabel">${m("sparkles","lbl-ic")}Trazer de mensagem ou foto</span>`:u}
        <div class="imp-tiles">
          ${i("text","clipboard-paste","Colar mensagem")}
          ${i("photos","images","Escolher fotos ou PDF",!s.images)}
          ${i("scan","scan-text","Digitalizar com\xA0IA",!s.images,a?"":"Precisa de https")}
        </div>
        ${s.images&&!a?n`<p class="imp-help">Em http a câmera não abre aqui: tire a foto pelo celular e use Escolher fotos ou PDF.</p>`:u}
      </div>
      ${s.ready?u:n`<div class="ai-box">${m("scan-text")}<span>Sem IA configurada, a mensagem é separada por linhas e vírgulas. Para ler fotos, configure a IA do Home Assistant em Mais › Configurações › Integrações.</span></div>`}`}_renderImportSheet(){let e=this._form,t=this._aiInfo(),s=(l,c)=>n`<div class="sheet-head">
      ${c?n`<button class="icon-btn back" @click=${c} aria-label="Voltar">${m("chevron-left")}</button>`:u}
      <h3 class="display">${m({Falar:"mic","Lendo\u2026":"scan-text","Revisar itens":"list-checks"}[l]||"list-plus","sh-ic")}${l}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},i=e.error?n`<div class="imp-error">${m("circle-alert")}<span>${e.error}</span></div>`:u,r=e.images&&e.images.length?n`<div class="thumbs">${e.images.map(l=>l.pdf?n`<span class="thumb-pdf" title=${l.nome||"PDF"}>${m("file-text")}</span>`:n`<img src=${l.url} alt="" />`)}</div>`:u;if(e.step==="voice")return this._renderVoiceStep(s);if(e.step==="text")return n`
        ${s(e.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">${m("message-square-text","lbl-ic")}Mensagem</span>
          <textarea rows="7" .value=${e.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${l=>this._setForm({text:l.target.value,error:null})}></textarea>
        </label>
        ${i}
        <div class="sheet-actions">
          ${this._clipOk()?n`<button class="btn outline" @click=${()=>this._pasteClipboard()}>${m("clipboard-paste")}Colar</button>`:u}
          <button class="btn primary" ?disabled=${!(e.text||"").trim()} @click=${()=>this._readText()}>${m(t.ready?"sparkles":"list-checks")}Separar itens</button>
        </div>
        ${t.ready?u:n`<p class="sheet-note">Sem IA configurada: separo por linhas, vírgulas e “e”.</p>`}
      `;if(e.step==="loading")return n`
        ${s("Lendo\u2026")}
        ${r}
        <div class="imp-loading">
          <span class="spin">${m("loader-circle")}</span>
          <span>${e.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>e.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>${m("x")}Cancelar</button></div>
      `;if(e.step==="review"){let l=this._list(e.target),c=e.items.filter(f=>f.on&&f.text.trim()).length,d=this._importTargets(),h=d.length>1,p=new Set(e.items.filter(f=>f.on&&f.text.trim()).map(f=>this._importListOf(f)));return n`
        ${s("Revisar itens",a)}
        ${r}
        ${e.heard?n`<p class="heard">${m("mic")}<span>“${e.heard}”</span></p>`:u}
        <p class="sheet-note top">${C(e.items.length,"item encontrado","itens encontrados")}.</p>
        ${e.note?n`<div class="imp-error soft">${m("sparkles")}<span>${e.note}</span></div>`:u}
        <div class="imp-list">
          ${e.items.map((f,g)=>{let w=this._list(this._importListOf(f));return n`<div class="imp-row ${f.on?"":"off"} ${h||this._roomsOn()||this._equipsOn()?"has-dest":""}">
              <button class="check ${f.on?"on":""}" role="checkbox" aria-checked=${f.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(g,{on:!f.on})}>${m("check")}</button>
              <textarea class="imp-text" rows="1" data-size="off" .value=${f.text} aria-label="Item" @keydown=${b=>b.key==="Enter"&&!b.shiftKey&&b.preventDefault()} @input=${b=>this._setImportItem(g,{text:b.target.value})}></textarea>
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:e.items.filter((b,k)=>k!==g)})}>${m("x")}</button>
              ${h||this._roomsOn()||this._equipsOn()?n`<div class="imp-chips">
              ${h&&w?n`<label class="imp-dest" style=${j(w.color,this._dark)}>
                    <span class="dot"></span><span class="dname">${D(w.name,30)}</span>${m("chevron-down")}
                    <select aria-label="Lista de ${f.text}" @change=${b=>this._setImportItem(g,{list:b.target.value})}>
                      ${d.map(b=>n`<option value=${b.id} ?selected=${b.id===w.id}>${b.name}</option>`)}
                    </select>
                  </label>`:u}
              ${this._roomsOn()?n`<label class="imp-dest imp-room ${f.room?"":"none"}">
                    ${m(f.room==="*"?"house":"door-open")}<span class="dname">${f.room==="*"?"Todos os c\xF4modos":f.room?D(this._roomName(f.room)||"",30):"C\xF4modo"}</span>${m("chevron-down")}
                    <select aria-label="Cômodo de ${f.text}" @change=${b=>this._setImportItem(g,{room:b.target.value||null})}>
                      <option value="" ?selected=${!f.room}>Nenhum</option>
                      ${this._houseRooms().length>1?n`<option value="*" ?selected=${f.room==="*"}>Todos os cômodos</option>`:u}
                      ${this._houseRooms().map(b=>n`<option value=${b.id} ?selected=${b.id===f.room}>${b.nome}</option>`)}
                    </select>
                  </label>`:u}
              ${this._equipsOn()?n`<button type="button" class="imp-dest imp-room imp-equip ${f.equip?"":"none"} ${e.eqFor===g?"open":""}" aria-expanded=${e.eqFor===g?"true":"false"} aria-label="Equipamento de ${f.text}" @click=${()=>this._setForm({eqFor:e.eqFor===g?null:g,eqQ:"",eqMore:!1})}>
                    ${m("package")}<span class="dname">${f.equip?D((this._equipOf(f.equip)||{}).nome||"",30):"Equipamento"}</span>${m("chevron-down")}
                  </button>`:u}
                  </div>`:u}
              ${e.eqFor===g&&this._equipsOn()?n`<div class="imp-eq">${je({lit:{html:n,nothing:u},icon:m,items:this._equipItems(),room:this._roomsOn()&&f.room!=="*"?f.room:null,roomName:this._roomsOn()&&f.room&&f.room!=="*"&&this._roomName(f.room)||"",value:null,query:e.eqQ||"",more:!!e.eqMore,autofocus:!0,onQuery:b=>this._setForm({eqQ:b,eqMore:!1}),onMore:()=>this._setForm({eqMore:!0}),onPick:b=>{let k=this._equipOf(b),y=k&&k.comodo&&this._roomsOn()&&this._roomList().some(x=>x.id===k.comodo)?k.comodo:f.room;this._setImportItem(g,{equip:b,room:y}),this._setForm({eqFor:null,eqQ:""})}})}
                  ${f.equip?n`<button type="button" class="eq-more" @click=${()=>(this._setImportItem(g,{equip:null}),this._setForm({eqFor:null}))}>${m("x")}Sem equipamento</button>`:u}
                </div>`:u}
            </div>`})}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...e.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let f=this.renderRoot.querySelectorAll(".imp-row input");f.length&&f[f.length-1].focus()})}}>${m("plus")}<span>Adicionar linha</span></button>
        </div>
        ${t.images?n`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${m("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${m("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:u}
        ${h?n`<div class="field">
              <span class="flabel">${m("list-todo","lbl-ic")}Todos em</span>
              <div class="chip-row grid">
                ${d.map(f=>n`<button class="pick list ${p.size===1&&p.has(f.id)?"on":""}" style=${j(f.color,this._dark)} @click=${()=>this._setForm({target:f.id,items:e.items.map(g=>({...g,list:f.id}))})}><span class="dot"></span><span>${D(f.name,26)}</span></button>`)}
              </div>
            </div>`:u}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!c} @click=${()=>this._importAdd()}>
            ${m("plus")}${c?`Adicionar ${C(c,"item","itens")}`:"Nenhum item marcado"}${c&&p.size>1?` em ${p.size} listas`:c&&p.size===1&&this._list([...p][0])?` em ${D(this._list([...p][0]).name,18)}`:""}
          </button>
        </div>
      `}return n`
      ${s("Importar itens")}
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${t.images?u:n`<div class="imp-error soft">${m("sparkles")}<span>${t.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>${m("sparkles")}Ver IA</button></span></div>`}
      ${i}
    `}_renderListMenu(){let e=this._list(this._form.listId);return e?n`
      <div class="sheet-head">
        <h3 class="display">${m(e.icon||"list-todo","sh-ic")}${e.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
      </div>
      ${O(e.features,M.DELETE)&&(e.items||[]).some(t=>!Q(t))?n`<button class="menu-row" @click=${()=>(this._closeSheet(),this._startSelect(e))}>${m("square-check-big")}Selecionar itens<span class="sub">para mover de lista</span></button>`:u}
      <button class="menu-row" @click=${()=>this._openCustomize(e)}>${m("palette")}Personalizar<span class="sub">${e.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(e.id,{hidden:e.hidden?null:!0}))}>${m(e.hidden?"eye":"eye-off")}${e.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?n`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${e.id}`)}>${m("external-link")}Abrir na tela padrão do HA</button>`:u}
      ${O(e.features,M.DELETE)&&e.done?n`<button class="menu-row danger" @click=${()=>this._confirmClearDone(e)}>${m("brush-cleaning")}Limpar concluídos<span class="sub">${e.done}</span></button>`:u}
    `:u}_renderCustomize(){let e=this._form,t=this._list(e.listId);if(!t)return u;let s=this._formColor(e,t),a=e.icon==="sem"?null:e.icon||Ut(`${t.origName} ${t.group||""} ${t.id}`);return n`
      <div class="sheet-head">
        <h3 class="display">${m("sliders-horizontal","sh-ic")}Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${m("x")}</button>
      </div>
      <div class="preview-tile" style=${j(s,this._dark)}>
        ${a?n`<span class="tile">${m(a)}</span>`:u}
        <span class="lc-main"><span class="lc-title">${(e.name||"").trim()||t.origName}</span><span class="lc-meta">${t.group||t.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">${m("pencil","lbl-ic")}Nome</span>
        <textarea rows="1" .value=${e.name} placeholder=${t.origName} @input=${i=>this._setForm({name:i.target.value})} @keydown=${i=>i.key==="Enter"&&!i.shiftKey&&i.preventDefault()}></textarea>
      </label>
      <div class="field">
        <span class="flabel">${m("palette","lbl-ic")}Cor</span>
        <div class="swatches">
          <button class="sw none ${s.none?"on":""}" aria-label="Sem cor" title="Sem cor" @click=${()=>this._setForm({color:"sem"})}>${m("ban")}</button>
          ${ue.map(i=>n`<button class="sw ${s.id===i.id?"on":""}" style="--c:${i.fill}" aria-label=${i.label} @click=${()=>this._setForm({color:i.id})}>${s.id===i.id?m("check"):u}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">${m("blocks","lbl-ic")}Ícone</span>
        <div class="icon-grid" style=${j(s,this._dark)}>
          <button class="ig none ${a?"":"on"}" aria-label="Sem ícone" title="Sem ícone" @click=${()=>this._setForm({icon:"sem"})}>${m("ban")}</button>
          ${ka.map(i=>n`<button class="ig ${a===i?"on":""}" aria-label=${i} @click=${()=>this._setForm({icon:i})}>${m(i)}</button>`)}
        </div>
      </div>
      ${this._renderOwnerPick(e)}
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">${m("eye","lbl-ic")}Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!e.hidden} @change=${i=>this._setForm({hidden:!i.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?t.canDue?n`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">${m("calendar-clock","lbl-ic")}Prazos</div>
              <div class="hint" style="white-space:normal">${e.deadlines?"Vencidos ficam vermelhos e aparecem em Agora.":"Datas s\xF3 como informa\xE7\xE3o."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e.deadlines} @change=${i=>this._setForm({deadlines:i.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:t.hasDates?n`<p class="sheet-note with-icon">${m("info")}<span>Esta lista não aceita prazo: as datas vêm da integração, só como informação.</span></p>`:u:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:t.canDue,owner:""})}>${m("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>${m("check")}Salvar</button>
      </div>
    `}_renderOwnerPick(e){let t=this._people||[],s=e.owner&&!t.some(a=>H(a)===H(e.owner))?[...t,e.owner]:t;return s.length?n`<div class="field">
      <span class="flabel">${m("user-round","lbl-ic")}De quem é</span>
      <div class="chip-row grid owner-pick" role="radiogroup" aria-label="De quem é">
        ${["",...s].map(a=>{let i=a?H(e.owner||"")===H(a):!e.owner;return n`<button class="pick ${i?"on":""}" role="radio" aria-checked=${i?"true":"false"} @click=${()=>this._setForm({owner:a})}>${m(a?"user-round":"users")}<span>${a||"Todos"}</span></button>`})}
      </div>
      ${e.owner&&this._dueOn()&&this._app("due_alert",!1)===!0?n`<span class="field-hint">${m("info")}<span>O aviso de prazos vai só para o celular de ${e.owner}.</span></span>`:u}
    </div>`:u}_renderConfirm(){let e=this._form,t=e.icon||zo(e.label);return n`
      <div class="sheet-head"><h3 class="display">${m(t,"sh-ic")}${e.title}</h3></div>
      <p class="confirm-text">${e.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>${m("x")}Cancelar</button>
        <button class="btn primary" @click=${()=>e.run()}>${m(t)}${e.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return u;let e=this._toast;return n`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${e.text}</span>
      ${e.action?n`<button @click=${()=>{this._toast=null,e.action.run()}}>${m(e.action.icon||(e.action.label==="Desfazer"?"undo-2":"arrow-right"))}${e.action.label}</button>`:u}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",rs);var ns=class{constructor(e,t){this.url=e,this.onStatus=t,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let e=new WebSocket(this.url);this.ws=e,e.onopen=()=>{this.open=!0,this.backoff=1e3;let t=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))e.send(s);if(this.onStatus&&this.onStatus(!0),t)for(let s of this.reconnectHandlers)s()},e.onmessage=t=>{let s;try{s=JSON.parse(t.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let i=new Error(s.error&&s.error.message||"Falhou");i.code=s.error&&s.error.code,a.reject(i)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},e.onclose=()=>{let t=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),t&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(e){this.reconnectHandlers.push(e)}_send(e){let t=JSON.stringify(e);this.open?this.ws.send(t):this.queue.push(t)}sendMessagePromise(e){let t=this.nextId++;return new Promise((s,a)=>{this.pending.set(t,{resolve:s,reject:a}),this._send({...e,id:t})})}subscribeMessage(e,t){let s={cb:e,msg:t,id:null,first:null};this.subs.add(s);let a=new Promise((i,r)=>{s.first={resolve:i,reject:r}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(e){let t=this.nextId++;e.id=t,this.byId.set(t,e),this.pending.set(t,{resolve:()=>{e.first&&e.first.resolve(),e.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(t),this.subs.delete(e),e.first&&e.first.reject(s),e.first=null)}}),this.ws.send(JSON.stringify({...e.msg,id:t}))}};function ui(){try{if(window.parent===window)return null;let o=window.parent.document.querySelector("home-assistant");return o&&o.hass||null}catch{return null}}var Ye=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function pi(){let o=ui();return o&&o.themes&&typeof o.themes.darkMode=="boolean"?o.themes.darkMode:!!(Ye&&Ye.matches)}function mi(){return{topbar:!(window.parent!==window),haptic(e){try{let t=window.parent;t!==window&&t.dispatchEvent(new t.CustomEvent("haptic",{detail:e}))}catch{}},openInHA(e){try{let t=window.parent;if(t!==window&&t.document){t.history.pushState(null,"",e),t.dispatchEvent(new t.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(e,"_top")}}}async function fi(o){let e=new URL("ws",location.href);e.protocol=location.protocol==="https:"?"wss:":"ws:";let t=null,s=c=>{t={...t,...c},o(t)},a=new ns(e.href,c=>t&&s({connected:c})),i=await a.sendMessagePromise({type:"resolvia/bootstrap"}),r=ui();t={states:i.states||{},entities:i.entities||{},devices:i.devices||{},user:{name:r&&r.user&&r.user.name||i.user&&i.user.name||"",is_admin:r&&r.user?!!r.user.is_admin:!0},themes:{darkMode:pi()},language:"pt-BR",connected:!0,version:i.version,resolvia:{ai:i.ai||{ready:!1,images:!1,entities:[]},atalho:i.atalho||null,aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:(c=!1)=>a.sendMessagePromise({type:"resolvia/voice/status",...c?{fresh:!0}:{}}),async voiceText(c){let d=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:c.buffer.slice(c.byteOffset,c.byteOffset+c.byteLength)}),h=await d.json().catch(()=>({}));if(!d.ok){let p=new Error(h.error||`Erro ${d.status}`);throw p.code=h.code,p}return h},async chat(c){let d=await fetch(new URL("api/chat",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(c)}),h=await d.json().catch(()=>({}));if(!d.ok){let p=new Error(h.error||`Erro ${d.status}`);throw p.code=h.code,p}return h},async extract(c){let d=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(c)}),h=await d.json().catch(()=>({}));if(!d.ok){let p=new Error(h.error||`Erro ${d.status}`);throw p.code=h.code,p}return h},report:c=>new URL(`relatorio?${c}`,location.href).href,data:{url:c=>new URL(`api/export/${c}`,location.href).href,async import(c){let d=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(c.name||"")},body:c}),h=await d.json().catch(()=>({}));if(!d.ok)throw new Error(h.error||`Erro ${d.status}`);return h},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:c=>a.sendMessagePromise({type:"resolvia/versions/restore",name:c}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:c=>a.sendMessagePromise({type:"resolvia/backups/restore",name:c}),erase:()=>a.sendMessagePromise({type:"resolvia/data/erase"})}},connection:a,callWS:c=>a.sendMessagePromise(c),callService:(c,d,h,p)=>a.sendMessagePromise({type:"call_service",domain:c,service:d,service_data:h||{},target:p})},a.subscribeMessage(c=>{let d={...t.states};c.new_state?d[c.entity_id]=c.new_state:delete d[c.entity_id],s({states:d})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let c=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:c.states||{},entities:c.entities||{},devices:c.devices||{}})}catch{}});let l=()=>{let c=pi();t&&c!==t.themes.darkMode&&s({themes:{...t.themes,darkMode:c}})};return setInterval(l,1500),Ye&&Ye.addEventListener&&Ye.addEventListener("change",l),t}var ls=document.getElementById("app"),ze=document.createElement("resolvia-panel");ze.env=mi();ze.narrow=window.innerWidth<870;window.addEventListener("resize",()=>ze.narrow=window.innerWidth<870);fi(o=>{ze.hass=o}).then(o=>{ze.hass=o,ls.replaceChildren(ze)}).catch(o=>{ls.innerHTML="";let e=document.createElement("div");e.id="boot",e.textContent=`N\xE3o consegui iniciar o ResolvIA: ${o.message}. Recarregue a p\xE1gina.`,ls.appendChild(e)});})();
