/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{(()=>{if(typeof window>"u"||window.__selectSheet)return;let o=window.__selectSheet={theme:null,isOpen:()=>!!e},e=null,t=0,s=null,a=`
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
`,i='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',r='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',c=()=>{if(document.getElementById("ss-css"))return;let f=document.createElement("style");f.id="ss-css",f.textContent=a,(document.head||document.documentElement).appendChild(f)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();let d=f=>f.parentNode&&f.parentNode.host&&f.parentNode.nodeType===11?f.parentNode.host:f.parentNode||(f.host?f.host:null),l=f=>{let b=/rgba?\(([^)]+)\)/.exec(f||"");if(!b)return null;let y=b[1].split(/[ ,/]+/).filter(Boolean).map(Number);return{r:y[0],g:y[1],b:y[2],a:y.length>3?y[3]:1}},p=({r:f,g:b,b:y})=>(.2126*f+.7152*b+.0722*y)/255,h=(f,b)=>{let y=l(f)||(/^#([0-9a-f]{6})$/i.test(f)?{r:parseInt(f.slice(1,3),16),g:parseInt(f.slice(3,5),16),b:parseInt(f.slice(5,7),16)}:{r:100,g:160,b:240});return`rgba(${y.r},${y.g},${y.b},${b})`};function m(f){let b=getComputedStyle(f),y=T=>{for(let P of T){let ie=b.getPropertyValue(P).trim();if(ie)return ie}return""},q=null;for(let T=f;T&&T.nodeType===1;T=d(T)){let P=l(getComputedStyle(T).backgroundColor);if(P&&P.a>.5){q=p(P)<.45;break}}q===null&&(q=!!(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches));let z=o.theme&&o.theme()||{};q=z.dark??q;let C=z.accent||y(["--rv-accent","--a","--accent","--cor"])||"#64b5f6",B=z.bg||y(["--rv-surface","--surface","--card"]),W=z.fg||y(["--rv-text","--text","--fg","--ink"]),N=z.muted||y(["--rv-muted","--muted","--mut"]);return{"--ss-bg":B||(q?"#1b2229":"#ffffff"),"--ss-fg":W||(q?"#e8edf3":"#141a22"),"--ss-mut":N||(q?"#9aa6b4":"#5b6573"),"--ss-line2":q?"rgba(255,255,255,.18)":"rgba(0,0,0,.14)","--ss-a":C,"--ss-soft":h(C,q?.22:.16),"--ss-soft2":q?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)","--ss-scrim":y(["--rv-scrim","--scrim"])||"rgba(0,0,0,.45)","--ss-font":b.fontFamily||"system-ui, sans-serif"}}function v(f){let b=f.getAttribute("aria-label");if(b)return b;let y=f.getRootNode(),q=f.getAttribute("aria-labelledby");if(q&&y.getElementById){let C=q.split(/\s+/).map(B=>(y.getElementById(B)||{}).textContent||"").join(" ").trim();if(C)return C}if(f.id&&y.querySelector){let C=y.querySelector(`label[for="${CSS.escape(f.id)}"]`);if(C)return C.textContent.trim()}let z=f.closest("label, .field");if(z){let C=z.querySelector(".flabel, .label, legend, b, span");if(C&&!C.contains(f))return C.textContent.trim()}return""}function w(f){let b=f.closest?f.closest("dialog"):null;if(!b||!b.open)return!1;try{return b.matches(":modal")}catch{return!0}}function x(f){if(e||!f||f.disabled||f.multiple)return;let b=w(f),y=document.createElement(b?"dialog":"div");y.className="ss-wrap";for(let[T,P]of Object.entries(m(f)))y.style.setProperty(T,P);let q=v(f),z=document.createElement("div");z.className="ss-sheet",z.setAttribute("role","dialog"),z.setAttribute("aria-modal","true"),q&&z.setAttribute("aria-label",q),z.innerHTML=`<div class="ss-grab"></div><div class="ss-head"><b></b><button type="button" class="ss-x" aria-label="Fechar">${i}</button></div><div class="ss-list" role="listbox"></div>`,z.querySelector(".ss-head b").textContent=q;let C=z.querySelector(".ss-list"),B=null,W=T=>{let P=document.createElement("button");P.type="button",P.className=`ss-opt${T.selected?" on":""}`,P.setAttribute("role","option"),P.setAttribute("aria-selected",T.selected?"true":"false"),P.disabled=T.disabled,P.innerHTML=`<span></span>${r}`,P.firstChild.textContent=T.label||T.textContent,P.addEventListener("click",()=>k(T.value)),T.selected&&(B=P),C.appendChild(P)};for(let T of f.children)if(T.tagName==="OPTGROUP"){let P=document.createElement("div");P.className="ss-group",P.textContent=T.label,C.appendChild(P);for(let ie of T.children)ie.tagName==="OPTION"&&!ie.hidden&&W(ie)}else T.tagName==="OPTION"&&!T.hidden&&W(T);let N=document.createElement("div");if(N.className="ss-back",y.append(N,z),document.body.appendChild(y),e={sel:f,wrap:y,pending:null,closing:!1},b){try{y.showModal()}catch{}y.addEventListener("cancel",T=>{T.preventDefault(),_()})}N.addEventListener("click",()=>_()),z.querySelector(".ss-x").addEventListener("click",()=>_()),y.addEventListener("keydown",T=>{if(T.key==="Escape")T.preventDefault(),T.stopPropagation(),_();else if(T.key==="ArrowDown"||T.key==="ArrowUp"){let P=[...C.querySelectorAll(".ss-opt:not(:disabled)")],ie=P.indexOf(document.activeElement),Jt=P[Math.max(0,Math.min(P.length-1,ie+(T.key==="ArrowDown"?1:-1)))];Jt&&(T.preventDefault(),Jt.focus())}});try{history.pushState(history.state,"")}catch{}requestAnimationFrame(()=>{y.classList.add("in"),B?(B.scrollIntoView({block:"center"}),B.focus({preventScroll:!0})):z.querySelector(".ss-x").focus({preventScroll:!0})})}function _(f=null){if(!e||e.closing)return;e.closing=!0,e.pending=f;let b=e,y=()=>{if(e!==b)return;e=null,b.wrap.open&&b.wrap.close(),b.wrap.classList.remove("in"),b.wrap.classList.add("out"),setTimeout(()=>b.wrap.remove(),220);let q=b.sel;b.pending!==null&&q.value!==b.pending&&(q.value=b.pending,q.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),q.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));try{q.focus({preventScroll:!0})}catch{}};if(b.finish=y,b.byBack)return y();history.back(),setTimeout(y,400)}let k=f=>_(f);window.addEventListener("popstate",f=>{if(e){if(f.stopImmediatePropagation(),e.closing)return e.finish&&e.finish();e.byBack=!0,_()}});function A(f){let b=f.composedPath?f.composedPath():[f.target],y=b[0];if(y&&y.tagName==="SELECT")return y;if(typeof f.clientX!="number")return null;for(let q of b.slice(0,6)){if(!q||q.nodeType!==1||q===document.body||q===document.documentElement)break;for(let z of q.querySelectorAll("select")){if(z.disabled||z.multiple)continue;let C=z.getBoundingClientRect();if(C.width&&f.clientX>=C.left&&f.clientX<=C.right&&f.clientY>=C.top&&f.clientY<=C.bottom&&$(z,f.clientX,f.clientY))return z}}return null}function $(f,b,y){let q=f.style.getPropertyValue("pointer-events");f.style.setProperty("pointer-events","auto","important");let z=null;try{let C=f.getRootNode();z=(C.elementFromPoint?C:document).elementFromPoint(b,y)}catch{}return q?f.style.setProperty("pointer-events",q):f.style.removeProperty("pointer-events"),z===f}let M=f=>{let b=f.composedPath?f.composedPath()[0]:f.target;return b&&b.tagName==="SELECT"&&!b.disabled&&!b.multiple?b:null};window.addEventListener("touchstart",f=>{let b=f.touches[0];s=b?{x:b.clientX,y:b.clientY}:null},{capture:!0,passive:!0}),window.addEventListener("touchend",f=>{let b=M(f);if(!b||e)return;let y=f.changedTouches[0];s&&y&&Math.hypot(y.clientX-s.x,y.clientY-s.y)>10||(f.preventDefault(),t=Date.now(),x(b))},{capture:!0,passive:!1}),window.addEventListener("mousedown",f=>{M(f)&&f.preventDefault()},!0),window.addEventListener("click",f=>{if(e)return;let b=A(f);b&&(f.preventDefault(),f.stopPropagation(),Date.now()-t>600&&x(b))},!0),window.addEventListener("keydown",f=>{let b=M(f);!b||e||(f.key==="Enter"||f.key===" "||f.key==="F4"||f.altKey&&(f.key==="ArrowDown"||f.key==="ArrowUp"))&&(f.preventDefault(),x(b))},!0),o.open=x,o.close=()=>_()})();var Ja={prazos:"/prazos",listas:"/minhas-listas"};function Qt(o=typeof window>"u"?null:window,e=Ja){let t=s=>{let a=new URL(s.location.href),i=e[a.searchParams.get("aba")];return i?(a.searchParams.delete("aba"),s.history.replaceState(s.history.state,"",a.href),i):null};if(!o)return null;try{let s=t(o);if(s)return s;if(o.parent&&o.parent!==o)return t(o.parent)}catch{}return null}var Le=globalThis,_t=Le.ShadowRoot&&(Le.ShadyCSS===void 0||Le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),Zt=new WeakMap,Fe=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.i,t=this.t;if(_t&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=Zt.get(t)),e===void 0&&((this.i=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Zt.set(t,e))}return e}toString(){return this.cssText}},J=o=>new Fe(typeof o=="string"?o:o+"",void 0,$t),Je=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,a,i)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[i+1],o[0]);return new Fe(t,o,$t)},Qa=(o,e)=>{if(_t)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=Le.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,o.appendChild(s)}},Gt=_t?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return J(t)})(o):o,{is:Za,defineProperty:Ga,getOwnPropertyDescriptor:ei,getOwnPropertyNames:ti,getOwnPropertySymbols:si,getPrototypeOf:ai}=Object,Qe=globalThis,es=Qe.trustedTypes,ii=es?es.emptyScript:"",oi=Qe.reactiveElementPolyfillSupport,Se=(o,e)=>o,vt={toAttribute(o,e){switch(e){case Boolean:o=o?ii:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},vs=(o,e)=>!Za(o,e),ts={attribute:!0,type:String,converter:vt,reflect:!1,useDefault:!1,hasChanged:vs};Symbol.metadata??=Symbol("metadata"),Qe.litPropertyMetadata??=new WeakMap;var re=class extends HTMLElement{static addInitializer(e){this.o(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(e,t=ts){if(t.state&&(t.attribute=!1),this.o(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Ga(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:i}=ei(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let c=a?.call(this);i?.call(this,r),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ts}static o(){if(this.hasOwnProperty(Se("elementProperties")))return;let e=ai(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Se("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(Se("properties"))){let t=this.properties,s=[...ti(t),...si(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this.u=new Map;for(let[t,s]of this.elementProperties){let a=this.p(t,s);a!==void 0&&this.u.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(Gt(a))}else e!==void 0&&t.push(Gt(e));return t}static p(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this.P??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this.P?.delete(e)}$(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this.v=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qa(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.P?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}C(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor.p(e,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:vt).toAttribute(t,s.type);this.m=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this.m=null}}_$AK(e,t){let s=this.constructor,a=s.u.get(e);if(a!==void 0&&this.m!==a){let i=s.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:vt;this.m=a;let c=r.fromAttribute(t,i.type);this[a]=c??this.T?.get(a)??c,this.m=null}}requestUpdate(e,t,s,a=!1,i){if(e!==void 0){let r=this.constructor;if(a===!1&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??vs)(i,t)||s.useDefault&&s.reflect&&i===this.T?.get(e)&&!this.hasAttribute(r.p(e,s))))return;this.M(e,t,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(e,t,{useDefault:s,reflect:a,wrapped:i},r){s&&!(this.T??=new Map).has(e)&&(this.T.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this.m!==e&&(this.A??=new Set).add(e))}async k(){this.isUpdatePending=!0;try{await this.S}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,i]of this.v)this[a]=i;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:r}=i,c=this[a];r!==!0||this._$AL.has(a)||c===void 0||this.M(a,void 0,i,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this.P?.forEach(s=>s.hostUpdate?.()),this.update(t)):this.U()}catch(s){throw e=!1,this.U(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this.P?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(e){return!0}update(e){this.A&&=this.A.forEach(t=>this.C(t,this[t])),this.U()}updated(e){}firstUpdated(e){}};re.elementStyles=[],re.shadowRootOptions={mode:"open"},re[Se("elementProperties")]=new Map,re[Se("finalized")]=new Map,oi?.({ReactiveElement:re}),(Qe.reactiveElementVersions??=[]).push("2.1.2");var wt=globalThis,ss=o=>o,Ne=wt.trustedTypes,as=Ne?Ne.createPolicy("lit-html",{createHTML:o=>o}):void 0,yt="$lit$",ee=`lit$${Math.random().toFixed(9).slice(2)}$`,kt="?"+ee,ri=`<${kt}>`,me=document,qe=()=>me.createComment(""),Te=o=>o===null||typeof o!="object"&&typeof o!="function",At=Array.isArray,xs=o=>At(o)||typeof o?.[Symbol.iterator]=="function",mt=`[ 	
\f\r]`,Me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,is=/-->/g,os=/>/g,he=RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rs=/'/g,ns=/"/g,bs=/^(?:script|style|textarea|title)$/i,Mt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=Mt(1),ni=Mt(2),co=Mt(3),F=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ls=new WeakMap,ue=me.createTreeWalker(me,129);function _s(o,e){if(!At(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return as!==void 0?as.createHTML(e):e}var $s=(o,e)=>{let t=o.length-1,s=[],a,i=e===2?"<svg>":e===3?"<math>":"",r=Me;for(let c=0;c<t;c++){let d=o[c],l,p,h=-1,m=0;for(;m<d.length&&(r.lastIndex=m,p=r.exec(d),p!==null);)m=r.lastIndex,r===Me?p[1]==="!--"?r=is:p[1]!==void 0?r=os:p[2]!==void 0?(bs.test(p[2])&&(a=RegExp("</"+p[2],"g")),r=he):p[3]!==void 0&&(r=he):r===he?p[0]===">"?(r=a??Me,h=-1):p[1]===void 0?h=-2:(h=r.lastIndex-p[2].length,l=p[1],r=p[3]===void 0?he:p[3]==='"'?ns:rs):r===ns||r===rs?r=he:r===is||r===os?r=Me:(r=he,a=void 0);let v=r===he&&o[c+1].startsWith("/>")?" ":"";i+=r===Me?d+ri:h>=0?(s.push(l),d.slice(0,h)+yt+d.slice(h)+ee+v):d+ee+(h===-2?c:v)}return[_s(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Oe=class o{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,r=0,c=e.length-1,d=this.parts,[l,p]=$s(e,t);if(this.el=o.createElement(l,s),ue.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=ue.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(yt)){let m=p[r++],v=a.getAttribute(h).split(ee),w=/([.?@])?(.*)/.exec(m);d.push({type:1,index:i,name:w[2],strings:v,ctor:w[1]==="."?Ve:w[1]==="?"?Be:w[1]==="@"?Ue:ge}),a.removeAttribute(h)}else h.startsWith(ee)&&(d.push({type:6,index:i}),a.removeAttribute(h));if(bs.test(a.tagName)){let h=a.textContent.split(ee),m=h.length-1;if(m>0){a.textContent=Ne?Ne.emptyScript:"";for(let v=0;v<m;v++)a.append(h[v],qe()),ue.nextNode(),d.push({type:2,index:++i});a.append(h[m],qe())}}}else if(a.nodeType===8)if(a.data===kt)d.push({type:2,index:i});else{let h=-1;for(;(h=a.data.indexOf(ee,h+1))!==-1;)d.push({type:7,index:i}),h+=ee.length-1}i++}}static createElement(e,t){let s=me.createElement("template");return s.innerHTML=e,s}};function fe(o,e,t=o,s){if(e===F)return e;let a=s!==void 0?t.N?.[s]:t.O,i=Te(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(o),a._$AT(o,t,s)),s!==void 0?(t.N??=[])[s]=a:t.O=a),a!==void 0&&(e=fe(o,a._$AS(o,e.values),a,s)),e}var He=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??me).importNode(t,!0);ue.currentNode=a;let i=ue.nextNode(),r=0,c=0,d=s[0];for(;d!==void 0;){if(r===d.index){let l;d.type===2?l=new Ze(i,i.nextSibling,this,e):d.type===1?l=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(l=new je(i,this,e)),this._$AV.push(l),d=s[++c]}r!==d?.index&&(i=ue.nextNode(),r++)}return ue.currentNode=me,a}V(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},Ze=class ws{get _$AU(){return this._$AM?._$AU??this.D}constructor(e,t,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=fe(this,e,t),Te(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==F&&this.L(e):e._$litType$!==void 0?this.j(e):e.nodeType!==void 0?this.I(e):xs(e)?this.H(e):this.L(e)}B(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}I(e){this._$AH!==e&&(this._$AR(),this._$AH=this.B(e))}L(e){this._$AH!==u&&Te(this._$AH)?this._$AA.nextSibling.data=e:this.I(me.createTextNode(e)),this._$AH=e}j(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Oe.createElement(_s(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(t);else{let i=new He(a,this),r=i.R(this.options);i.V(t),this.I(r),this._$AH=i}}_$AC(e){let t=ls.get(e.strings);return t===void 0&&ls.set(e.strings,t=new Oe(e)),t}H(e){At(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let i of e)a===t.length?t.push(s=new ws(this.B(qe()),this.B(qe()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ss(e).nextSibling;ss(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this.D=e,this._$AP?.(e))}},ge=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,a){let i=this.strings,r=!1;if(i===void 0)e=fe(this,e,t,0),r=!Te(e)||e!==this._$AH&&e!==F,r&&(this._$AH=e);else{let c=e,d,l;for(e=i[0],d=0;d<i.length-1;d++)l=fe(this,c[s+d],t,d),l===F&&(l=this._$AH[d]),r||=!Te(l)||l!==this._$AH[d],l===u?e=u:e!==u&&(e+=(l??"")+i[d+1]),this._$AH[d]=l}r&&!a&&this.W(e)}W(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ve=class extends ge{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===u?void 0:e}},Be=class extends ge{constructor(){super(...arguments),this.type=4}W(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},Ue=class extends ge{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=fe(this,e,t,0)??u)===F)return;let s=this._$AH,a=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},je=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){fe(this,e)}},li={q:yt,J:ee,Z:kt,F:1,G:$s,K:He,X:xs,Y:fe,tt:Ze,st:ge,it:Be,et:Ue,ht:Ve,ot:je},ci=wt.litHtmlPolyfillSupport;ci?.(Oe,Ze),(wt.litHtmlVersions??=[]).push("3.3.3");var ys=(o,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let i=t?.renderBefore??null;s._$litPart$=a=new Ze(e.insertBefore(qe(),i),i,void 0,t??{})}return a._$AI(o),a},St=globalThis;var le=class extends re{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.rt=ys(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return F}};le._$litElement$=!0,le.finalized=!0,St.litElementHydrateSupport?.({LitElement:le});var di=St.litElementPolyfillSupport;di?.({LitElement:le});(St.litElementVersions??=[]).push("4.2.2");var{tt:pi}=li,cs=o=>o,hi=o=>o===null||typeof o!="object"&&typeof o!="function";var ds=(o,e)=>e===void 0?o?._$litType$!==void 0:o?._$litType$===e,ui=o=>o?._$litType$?.h!=null;var ks=o=>o.strings===void 0,ps=()=>document.createComment(""),ne=(o,e,t)=>{let s=o._$AA.parentNode,a=e===void 0?o._$AB:e._$AA;if(t===void 0){let i=s.insertBefore(ps(),a),r=s.insertBefore(ps(),a);t=new pi(i,r,o,o.options)}else{let i=t._$AB.nextSibling,r=t._$AM,c=r!==o;if(c){let d;t._$AQ?.(o),t._$AM=o,t._$AP!==void 0&&(d=o._$AU)!==r._$AU&&t._$AP(d)}if(i!==a||c){let d=t._$AA;for(;d!==i;){let l=cs(d).nextSibling;cs(s).insertBefore(d,a),d=l}}}return t},oe=(o,e,t=o)=>(o._$AI(e,t),o),mi={},Ce=(o,e=mi)=>o._$AH=e,xt=o=>o._$AH,ft=o=>{o._$AR(),o._$AA.remove()},As=o=>{o._$AR()};var j=o=>(...e)=>({_$litDirective$:o,values:e}),Y=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this.nt=e,this._$AM=t,this.ct=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var Ee=(o,e)=>{let t=o._$AN;if(t===void 0)return!1;for(let s of t)s._$AO?.(e,!1),Ee(s,e);return!0},We=o=>{let e,t;do{if((e=o._$AM)===void 0)break;t=e._$AN,t.delete(o),o=e}while(t?.size===0)},Ms=o=>{for(let e;e=o._$AM;o=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(o))break;t.add(o),vi(e)}};function fi(o){this._$AN!==void 0?(We(this),this._$AM=o,Ms(this)):this._$AM=o}function gi(o,e=!1,t=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(e)if(Array.isArray(s))for(let i=t;i<s.length;i++)Ee(s[i],!1),We(s[i]);else s!=null&&(Ee(s,!1),We(s));else Ee(this,o)}var vi=o=>{o.type==2&&(o._$AP??=gi,o._$AQ??=fi)},Ie=class extends Y{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),Ms(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ee(this,e),We(this))}setValue(e){if(ks(this.nt))this.nt._$AI(e,this);else{let t=[...this.nt._$AH];t[this.ct]=e,this.nt._$AI(t,this,0)}}disconnected(){}reconnected(){}};var Ye=class{constructor(e){this.lt=e}disconnect(){this.lt=void 0}reconnect(e){this.lt=e}deref(){return this.lt}},Ke=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(e=>this.dt=e)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var Xe=class extends Ie{constructor(){super(...arguments),this.ft=new Ye(this),this.vt=new Ke}render(e,t){return F}update(e,[t,s]){if(this.isConnected||this.disconnected(),t===this.yt)return F;this.yt=t;let a=0,{ft:i,vt:r}=this;return(async(c,d)=>{for await(let l of c)if(await d(l)===!1)return})(t,async c=>{for(;r.get();)await r.get();let d=i.deref();if(d!==void 0){if(d.yt!==t)return!1;s!==void 0&&(c=s(c,a)),d.commitValue(c,a),a++}return!0}),F}commitValue(e,t){this.setValue(e)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},po=j(Xe),ho=j(class extends Xe{constructor(o){if(super(o),o.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(o,e){return this.rt=o,super.update(o,e)}commitValue(o,e){e===0&&As(this.rt);let t=ne(this.rt);oe(t,o)}}),hs=o=>ui(o)?o._$litType$.h:o.strings,uo=j(class extends Y{constructor(o){super(o),this.bt=new WeakMap}render(o){return[o]}update(o,[e]){let t=ds(this.gt)?hs(this.gt):null,s=ds(e)?hs(e):null;if(t!==null&&(s===null||t!==s)){let a=xt(o).pop(),i=this.bt.get(t);if(i===void 0){let r=document.createDocumentFragment();i=ys(u,r),i.setConnected(!1),this.bt.set(t,i)}Ce(i,[a]),ne(i,void 0,a)}if(s!==null){if(t===null||t!==s){let a=this.bt.get(s);if(a!==void 0){let i=xt(a).pop();As(o),ne(o,void 0,i),Ce(o,[i])}}this.gt=e}else this.gt=void 0;return this.render(e)}});var mo=j(class extends Y{constructor(o){if(super(o),o.type!==1||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){if(this.wt===void 0){this.wt=new Set,o.strings!==void 0&&(this._t=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in e)e[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(e)}let t=o.element.classList;for(let s of this.wt)s in e||(t.remove(s),this.wt.delete(s));for(let s in e){let a=!!e[s];a===this.wt.has(s)||this._t?.has(s)||(a?(t.add(s),this.wt.add(s)):(t.remove(s),this.wt.delete(s)))}return F}}),xi={},fo=j(class extends Y{constructor(){super(...arguments),this.St=xi}render(o,e){return e()}update(o,[e,t]){if(Array.isArray(e)){if(Array.isArray(this.St)&&this.St.length===e.length&&e.every((s,a)=>s===this.St[a]))return F}else if(this.St===e)return F;return this.St=Array.isArray(e)?Array.from(e):e,this.render(e,t)}});var go=j(class extends Y{constructor(){super(...arguments),this.key=u}render(o,e){return this.key=o,e}update(o,[e,t]){return e!==this.key&&(Ce(o),this.key=e),t}}),Ss=j(class extends Y{constructor(o){if(super(o),o.type!==3&&o.type!==1&&o.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!ks(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===F||e===u)return e;let t=o.element,s=o.name;if(o.type===3){if(e===t[s])return F}else if(o.type===4){if(!!e===t.hasAttribute(s))return F}else if(o.type===1&&t.getAttribute(s)===e+"")return F;return Ce(o),e}});var gt=new WeakMap,vo=j(class extends Ie{render(o){return u}update(o,[e]){let t=e!==this.lt;return t&&this.$t(void 0),(t||this.Tt!==this.xt)&&(this.lt=e,this.Et=o.options?.host,this.$t(this.xt=o.element)),u}$t(o){if(this.lt!==void 0)if(this.isConnected||(o=void 0),typeof this.lt=="function"){let e=this.Et??globalThis,t=gt.get(e);t===void 0&&(t=new WeakMap,gt.set(e,t)),t.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),t.set(this.lt,o),o!==void 0&&this.lt.call(this.Et,o)}else this.lt.value=o}get Tt(){return typeof this.lt=="function"?gt.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),us=(o,e,t)=>{let s=new Map;for(let a=e;a<=t;a++)s.set(o[a],a);return s},Q=j(class extends Y{constructor(o){if(super(o),o.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(o,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let a=[],i=[],r=0;for(let c of o)a[r]=s?s(c,r):r,i[r]=t(c,r),r++;return{values:i,keys:a}}render(o,e,t){return this.Ct(o,e,t).values}update(o,[e,t,s]){let a=xt(o),{values:i,keys:r}=this.Ct(e,t,s);if(!Array.isArray(a))return this.Pt=r,i;let c=this.Pt??=[],d=[],l,p,h=0,m=a.length-1,v=0,w=i.length-1;for(;h<=m&&v<=w;)if(a[h]===null)h++;else if(a[m]===null)m--;else if(c[h]===r[v])d[v]=oe(a[h],i[v]),h++,v++;else if(c[m]===r[w])d[w]=oe(a[m],i[w]),m--,w--;else if(c[h]===r[w])d[w]=oe(a[h],i[w]),ne(o,d[w+1],a[h]),h++,w--;else if(c[m]===r[v])d[v]=oe(a[m],i[v]),ne(o,a[h],a[m]),m--,v++;else if(l===void 0&&(l=us(r,v,w),p=us(c,h,m)),l.has(c[h]))if(l.has(c[m])){let x=p.get(r[v]),_=x!==void 0?a[x]:null;if(_===null){let k=ne(o,a[h]);oe(k,i[v]),d[v]=k}else d[v]=oe(_,i[v]),ne(o,a[h],_),a[x]=null;v++}else ft(a[m]),m--;else ft(a[h]),h++;for(;v<=w;){let x=ne(o,d[w+1]);oe(x,i[v]),d[v++]=x}for(;h<=m;){let x=a[h++];x!==null&&ft(x)}return this.Pt=r,Ce(o,d),F}}),Es="important",bi=" !"+Es,xo=j(class extends Y{constructor(o){if(super(o),o.type!==1||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((e,t)=>{let s=o[t];return s==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(o,[e]){let{style:t}=o.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(e)),this.render(e);for(let s of this.Mt)e[s]==null&&(this.Mt.delete(s),s.includes("-")?t.removeProperty(s):t[s]=null);for(let s in e){let a=e[s];if(a!=null){this.Mt.add(s);let i=typeof a=="string"&&a.endsWith(bi);s.includes("-")||i?t.setProperty(s,i?a.slice(0,-11):a,i?Es:""):t[s]=a}}return F}}),bo=j(class extends Y{constructor(o){if(super(o),o.type!==2)throw Error("templateContent can only be used in child bindings")}render(o){return this.At===o?F:(this.At=o,document.importNode(o.content,!0))}}),$e=class extends Y{constructor(e){if(super(e),this.gt=u,e.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this.kt=void 0,this.gt=e;if(e===F)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.gt)return this.kt;this.gt=e;let t=[e];return t.raw=t,this.kt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};$e.directiveName="unsafeHTML",$e.resultType=1;var _o=j($e);var ze=class extends $e{};ze.directiveName="unsafeSVG",ze.resultType=2;var H=j(ze),ms=o=>!hi(o)&&typeof o.then=="function",fs=1073741823;var bt=class extends Ie{constructor(){super(...arguments),this.Ot=fs,this.Ut=[],this.ft=new Ye(this),this.vt=new Ke}render(...e){return e.find(t=>!ms(t))??F}update(e,t){let s=this.Ut,a=s.length;this.Ut=t;let i=this.ft,r=this.vt;this.isConnected||this.disconnected();for(let c=0;c<t.length&&!(c>this.Ot);c++){let d=t[c];if(!ms(d))return this.Ot=c,d;c<a&&d===s[c]||(this.Ot=fs,a=0,Promise.resolve(d).then(async l=>{for(;r.get();)await r.get();let p=i.deref();if(p!==void 0){let h=p.Ut.indexOf(d);h>-1&&h<p.Ot&&(p.Ot=h,p.setValue(l))}}))}return F}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},$o=j(bt);var _i=Symbol.for(""),$i=o=>{if(o?.r===_i)return o?._$litStatic$};var gs=new Map,qs=o=>(e,...t)=>{let s=t.length,a,i,r=[],c=[],d,l=0,p=!1;for(;l<s;){for(d=e[l];l<s&&(i=t[l],(a=$i(i))!==void 0);)d+=a+e[++l],p=!0;l!==s&&c.push(i),r.push(d),l++}if(l===s&&r.push(e[s]),p){let h=r.join("$$lit$$");(e=gs.get(h))===void 0&&(r.raw=r,gs.set(h,e=r)),t=c}return o(e,...t)},wo=qs(n),yo=qs(ni);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var D={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-bar":'<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 16h8" /><path d="M7 11h12" /><path d="M7 6h3" />',"calendar-off":'<path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" /><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" /><path d="M16 2v4" /><path d="M3 10h7" /><path d="M21 10h-5.5" /><path d="m2 2 20 20" />',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',"door-open":'<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>',"hard-hat":'<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',"message-circle":'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />',layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',receipt:'<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>',hourglass:'<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',"user-round":'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'};var Ts="https://github.com/diegozapella63",wi=[["CronologIA","cronologia-ha","calendar-days","Agenda da fam\xEDlia, rem\xE9dios, rotinas e placar."],["ResolvIA","resolvia-ha","list-checks","Listas de tarefas com prazos, pontos e repeti\xE7\xE3o."],["GerencIA","gerencia-ha","wallet","Finan\xE7as da casa: caixa, cart\xF5es e investimentos."],["InventarIA","inventario-ha","package","Invent\xE1rio da casa: c\xF4modos, itens e valores."],["EconomIA","economia-ha","receipt","Lista de compras com o melhor pre\xE7o perto de casa."],["MemorIA","memoria-ha","book-open","Cadernos de anota\xE7\xE3o que abrem na hora certa."],["CorrerIA","correria-ha","message-circle","Pergunte e pe\xE7a a qualquer app, no chat ou no WhatsApp."]],we=o=>n`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D.info)}</svg>`,yi=o=>n`<span class="ab-wm">${o.slice(0,-2)}<span>${o.slice(-2)}</span></span>`,Os=(o,e,t)=>n`<a class=${t} href=${o} target="_blank" rel="noopener">${e}</a>`;function Cs({app:o,version:e}){return n`<div class="about">
    <div class="about-hero">
      <span class="ab-mark" aria-hidden="true">${we("zap")}</span>
      <h2 class="ab-name">Correr<span>IA</span> Code</h2>
      <p class="ab-what">desenvolvimento de softwares</p>
      <p class="ab-tag">Feito na correria, rodado pela IA.</p>
    </div>

    <div class="panel about-why">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${we("hourglass")}</span><h2>Por que CorrerIA?</h2></div>
      <p>Porque eu sou um programador sem tempo: vivo na correria. Então eu uso a IA para rodar tudo isso aqui. Ela escreve, testa e publica; eu dou as ideias e reclamo dos botões tortos.</p>
    </div>

    <div class="panel">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${we("layers")}</span><h2>Os apps</h2></div>
      <ul class="about-apps" aria-label="Os apps">
        ${wi.map(([t,s,a,i])=>n`<li>
            ${Os(`${Ts}/${s}`,n`<span class="mais-ic" aria-hidden="true">${we(a)}</span>
                <span class="mb"><b class="ab-app">${yi(t)}${t===o?n`<em class="ab-here">Este app · v${e}</em>`:""}</b><span>${i}</span></span>
                ${we("external-link")}`,`ab-row${t===o?" here":""}`)}
          </li>`)}
      </ul>
    </div>

    ${Os(Ts,n`${we("external-link")}Meu GitHub`,"btn primary ab-github")}
  </div>`}var Is=Je`
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
`;var zs="./fonts/barlow-400.woff2";var Ps="./fonts/barlow-500.woff2";var Rs="./fonts/barlow-600.woff2";var Ds="./fonts/barlow-condensed-500.woff2";var Ls="./fonts/barlow-condensed-600.woff2";var Fs="./fonts/barlow-condensed-700.woff2";var Ns='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',Hs=`"RV Barlow", ${Ns}`,Vs=`"RV Barlow Condensed", ${Ns}`;function Bs(){if(document.getElementById("resolvia-fonts"))return;let o=(t,s,a)=>`@font-face{font-family:"${t}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,e=document.createElement("style");e.id="resolvia-fonts",e.textContent=[o("RV Barlow",zs,400),o("RV Barlow",Ps,500),o("RV Barlow",Rs,"600 900"),o("RV Barlow Condensed",Ds,500),o("RV Barlow Condensed",Ls,600),o("RV Barlow Condensed",Fs,"700 900")].join(`
`),document.head.appendChild(e)}var Et=()=>n`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var Ti="(min-width: 1000px)";function Us(o,e=""){if(!o.touches||o.touches.length!==1||window.matchMedia&&window.matchMedia(Ti).matches)return null;let t=o.touches[0];if(t.clientX<24||t.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${e?`, ${e}`:""}`;for(let a of o.composedPath()){if(a===o.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let i=getComputedStyle(a);if((i.overflowX==="auto"||i.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:t.clientX,y:t.clientY,at:Date.now()}}function js(o,e){if(!e||!o.changedTouches||!o.changedTouches.length)return 0;let t=o.changedTouches[0],s=t.clientX-e.x,a=t.clientY-e.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-e.at>800?0:s<0?1:-1}async function Ge(o,e,t){for(let a=0;a<30&&o._view().name!==e;a++)await new Promise(i=>setTimeout(i,16));await o.updateComplete;let s=o.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${t>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var Ws=Je`
  :host {
    --rv-body: ${J(Hs)};
    --rv-display: ${J(Vs)};
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
  /* ---------- IA do Home Assistant ---------- */
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
`;var Ys=["dom","seg","ter","qua","qui","sex","s\xE1b"],Ks={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es",conversa:"Conversa"},Xs={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},ce=o=>String(o).padStart(2,"0"),qt=o=>`${o.getFullYear()}-${ce(o.getMonth()+1)}-${ce(o.getDate())}`,et=o=>{let[e,t,s]=o.split("-").map(Number);return new Date(e,t-1,s)},Zs=o=>String(Math.round(o*10)/10).replace(".",","),Js=o=>o>=1e3?`${Zs(o/1e3)} mil`:String(Math.round(o||0)),Qs=o=>`${o} ${o===1?"chamada":"chamadas"}`,Oi=(o,e={})=>e[o]||(o||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",Ci=(o,e)=>{let t=new Date(o);if(!Number.isFinite(t.getTime()))return"";let s=`${ce(t.getHours())}:${ce(t.getMinutes())}`;return qt(t)===qt(e)?`hoje ${s}`:`${ce(t.getDate())}/${ce(t.getMonth()+1)} ${s}`};function Ii(o){let e=o.join(" ").toLowerCase();return/google|gemini/.test(e)?n`Consumo exato e cota: <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener">Google Cloud Console</a>.`:/openai|chatgpt|gpt/.test(e)?n`Consumo exato e custo: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener">platform.openai.com/usage</a>.`:/anthropic|claude/.test(e)?n`Consumo exato e custo: <a href="https://platform.claude.com/usage" target="_blank" rel="noopener">Claude Console</a>.`:"O consumo exato fica no painel do provedor da IA."}function Gs({u:o,day:e,onDay:t,head:s,app:a,using:i="",names:r={}}){if(!o||!o.hoje)return n`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let c=new Date,d=qt(c),l=A=>A.cota?n`<span class="s alert">${A.cota} ${A.cota>1?"vezes":"vez"} sem cota</span>`:A.erros?n`<span class="s alert">${A.erros} com erro</span>`:n`<span class="s">≈ ${Js(A.tokens)} tokens</span>`,p=(A,$)=>n`<div class="uso-tile"><span class="k">${A}</span><span class="v">${$.chamadas||0}</span>${l($)}</div>`,h=o.dias||[],m=Math.max(1,...h.map(A=>A.chamadas||0)),v=h.find(A=>A.dia===e)||h.find(A=>A.dia===d)||{dia:d,chamadas:0,erros:0,cota:0},w=A=>A.dia===d?"hoje":Ys[et(A.dia).getDay()],x=o.semana&&o.semana.tipos||{},_=[...Object.keys(o.mes&&o.mes.ias||{}),...Object.keys(o.semana&&o.semana.ias||{}),i],k=o.ultimas||[];return n`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${p("Hoje",o.hoje)}${p("7 dias",o.semana)}${p("Este m\xEAs",o.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${h.map(A=>{let $=A.chamadas?Math.max(4,Math.round(A.chamadas/m*100)):0;return n`<button type="button" class="uso-bar ${A.dia===d?"today":""}" aria-pressed=${A.dia===v.dia?"true":"false"} aria-label="${w(A)}: ${Qs(A.chamadas)}" @click=${()=>t(A.dia)}><i style="height:${$}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${h.map(A=>n`<span>${w(A)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${v.dia===d?"Hoje":`${Ys[et(v.dia).getDay()]}, ${ce(et(v.dia).getDate())}/${ce(et(v.dia).getMonth()+1)}`}: <b>${Qs(v.chamadas)}</b>${v.erros?`, ${v.erros} com erro`:""}${v.cota?`, ${v.cota} sem cota`:""}.</p>
    ${Object.keys(x).length?n`<ul class="uso-kinds">${Object.keys(x).sort((A,$)=>x[$]-x[A]).map(A=>n`<li>${Ks[A]||A} <b>${x[A]}</b></li>`)}</ul>`:u}
    <details class="uso-last">
      <summary>Últimas chamadas</summary>
      <ul>
        ${k.length?k.map(A=>n`<li><b>${Ks[A.tipo]||A.tipo}</b><span>${Oi(A.ia,r)}</span>${Xs[A.resultado]?n`<span class="r-err">${Xs[A.resultado]}</span>`:u}
                <span class="t">${Zs(A.segundos)} s · ≈ ${Js(A.tokens)} tokens${A.imagens?` \xB7 ${A.imagens} ${A.imagens>1?"imagens":"imagem"}`:""} · ${Ci(A.quando,c)}</span></li>`):n`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    <p class="uso-note">${Ii(_)}</p>
  </div>`}var ea=`
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
`;var zi=/[̀-ͯ]/g,ta=o=>o.normalize("NFD").replace(zi,"").toLowerCase()||o.toLowerCase(),tt=o=>[...String(o||"")].map(ta).join("");function Pi(o,{room:e=null,query:t=""}={}){let s=tt(t).split(/\s+/).filter(Boolean),a=d=>tt(`${d.nome} ${d.zona||""} ${d.roomName||""}`),i=d=>s.every(l=>a(d).includes(l)),r=d=>{if(!s.length)return 0;let l=tt(d.nome);return l.startsWith(s[0])?0:l.includes(s[0])?1:2},c=o.filter(i).sort((d,l)=>r(d)-r(l)||d.nome.localeCompare(l.nome,"pt-BR"));return e?{inRoom:c.filter(d=>d.roomId===e),others:s.length?c.filter(d=>d.roomId!==e):[]}:{inRoom:[],others:s.length?c:[]}}function Ri(o,e,t){let s=tt(t).split(/\s+/).filter(Boolean)[0];if(!s)return e;let a=[...e],i=a.map(ta),r=-1,c=-1;for(let d=0;d<a.length&&r<0;d++){let l="";for(let p=d;p<a.length;p++){if(l+=i[p],l===s){r=d,c=p+1;break}if(!s.startsWith(l))break}}return r<0?e:o`${a.slice(0,r).join("")}<mark>${a.slice(r,c).join("")}</mark>${a.slice(c).join("")}`}function Pe({lit:o,icon:e,items:t,room:s=null,roomName:a="",value:i=null,query:r="",more:c=!1,onQuery:d,onPick:l,onMore:p,onRemove:h,onAdd:m,adding:v=!1,autofocus:w=!1}){let{html:x,nothing:_}=o,k=(M,f)=>x`<div class="eq-sel">
      <span class="eq-ic">${e("package")}</span>
      <span class="eq-tx"><b>${M.nome}</b><small>${[M.zona,M.roomName].filter(Boolean).join(" \xB7 ")||"Sem c\xF4modo"}</small></span>
      <button type="button" class="icon-btn mini" aria-label="Tirar ${M.nome}" @click=${f}>${e("x")}</button>
    </div>`;if(Array.isArray(i)){let M=i.map(y=>t.find(q=>q.id===y)).filter(Boolean),f=M.map(y=>k(y,()=>h(y.id)));if(M.length&&!v)return x`<div class="eq-pick">${f}<button type="button" class="eq-more eq-add" @click=${()=>m()}>${e("plus")}Outro equipamento</button></div>`;let b=t.filter(y=>!i.includes(y.id));return x`<div class="eq-pick">${f}${$(b,M.length>0||w)}</div>`}let A=i?t.find(M=>M.id===i):null;if(A)return k(A,()=>l(null));return $(t,w);function $(M,f){let{inRoom:b,others:y}=Pi(M,{room:s,query:r}),q=c?40:6,z=(T,P)=>x`<button type="button" class="eq-row" @click=${()=>l(T.id)}>
    <span class="eq-ic">${e("package")}</span>
    <span class="eq-tx"><b>${Ri(x,T.nome,r)}</b>${[T.zona,P?T.roomName:""].filter(Boolean).length?x`<small>${[T.zona,P?T.roomName:""].filter(Boolean).join(" \xB7 ")}</small>`:_}</span>
  </button>`,C=b.slice(0,q),B=y.slice(0,Math.max(0,q-C.length)),W=b.length+y.length-C.length-B.length,N=_;return!r&&!s?N=x`<p class="eq-hint">Escolha o cômodo ou busque entre ${M.length} ${M.length===1?"equipamento":"equipamentos"}.</p>`:!r&&s&&!b.length?N=x`<p class="eq-hint">Nenhum equipamento em ${a}. Busque nos outros cômodos.</p>`:r&&!b.length&&!y.length&&(N=x`<p class="eq-hint">Nada com “${r}”.</p>`),x`<div class="eq-pick">
    <label class="eq-search">${e("search")}<input type="search" .value=${r} placeholder=${s?`Buscar em ${a}\u2026`:"Buscar equipamento\u2026"} aria-label="Buscar equipamento" ?autofocus=${f} @input=${T=>d(T.target.value)} /></label>
    ${C.length?x`<div class="eq-list">${C.map(T=>z(T,!1))}</div>`:_}
    ${B.length?x`${s?x`<div class="eq-head">Em outros cômodos</div>`:_}<div class="eq-list">${B.map(T=>z(T,!0))}</div>`:_}
    ${W>0?x`<button type="button" class="eq-more" @click=${()=>p()}>Mostrar mais ${W}</button>`:_}
    ${N}
  </div>`}}var sa=`
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
`;var Tt="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",Di="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function aa(o,e=new Date){let t=o.filter(a=>a.id!=="grafite"),s=Math.floor(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/864e5);return t[(s%t.length+t.length)%t.length]}function ia({theme:o,onTheme:e,icon:t}){return n`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Sistema","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,i])=>n`<button type="button" class=${o===s?"on":""} role="radio" aria-checked=${o===s?"true":"false"} @click=${()=>e(s)}>${t(i)}<span>${a}</span></button>`)}
  </div>`}function oa({palette:o,value:e,onPick:t}){return n`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${o.map(s=>n`<button type="button" class="tsw ${e===s.id?"on":""}" role="radio" aria-checked=${e===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>t(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${Tt}></path><path class="sw-gap" d=${Tt}></path><path class="sw-fill" d=${Tt+Di}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var ra=`
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
`;var S={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},O=(o,e)=>((o||0)&e)===e,te=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"verde",label:"Verde",fill:"#8BD45F",ink:"#3F7A17"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"turquesa",label:"Turquesa",fill:"#3CCBDA",ink:"#0B7285"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"indigo",label:"\xCDndigo",fill:"#8F9BFF",ink:"#3D4BC2"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"grafite",label:"Grafite",fill:"#B5B9C2",ink:"#4E5560"}],na=["vermelho","coral","rosa","laranja","lilas","ouro"],Li={framboesa:"#E8508A"},la=o=>{let e=parseInt(o.replace("#",""),16);return[e>>16&255,e>>8&255,e&255]};function Fi(o){let[e,t,s]=la(o),a=te[0],i=1/0;for(let r of te){let[c,d,l]=la(r.fill),p=(e-c)**2+(t-d)**2+(s-l)**2;p<i&&([a,i]=[r,p])}return a}var pe=o=>{let e=te.find(s=>s.id===o);if(e||typeof o!="string")return e;let t=Li[o]||(/^#[0-9a-f]{6}$/i.test(o)?o:null);return t?Fi(t):void 0},ca=o=>pe(na[o%na.length]);function at(o,e){let t=o.replace("#",""),s=parseInt(t.length===3?t.replace(/./g,a=>a+a):t,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${e})`}function L(o,e,t="c"){return`--${t}:${o.fill};--${t}i:${e?o.fill:o.ink};--${t}s:${at(o.fill,e?.17:.15)};`}var V=o=>(o||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),da=o=>Array.from(o||"",e=>{if(e.length!==1)return e;let t=e.normalize("NFD")[0]||e;return t.toLowerCase().length===1?t.toLowerCase():e}).join(""),E=(o,e,t)=>`${o} ${o===1?e:t}`,pa=o=>String(o||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),I=(o,e=38)=>o.length>e?o.slice(0,e-1).trimEnd()+"\u2026":o;function ha(o,e){let t=o.states[e],s=t&&t.attributes&&t.attributes.friendly_name||e.split(".")[1].replace(/_/g," "),a=o.entities&&o.entities[e],i=a&&a.device_id&&o.devices?o.devices[a.device_id]:void 0,r=i?i.name_by_user||i.name:void 0,c=s,d=r||null;return r&&s.toLowerCase().startsWith(r.toLowerCase()+" ")&&(c=s.slice(r.length+1)),c=c.charAt(0).toUpperCase()+c.slice(1),{name:c,group:d}}var Ni=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/\bpets?\b|cachorro|dog\b/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function Ct(o){let e=V(o);for(let[t,s]of Ni)if(t.test(e))return s;return"list-checks"}var ua=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],Hi=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],Vi=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],st=o=>String(o).padStart(2,"0"),de=o=>`${o.getFullYear()}-${st(o.getMonth()+1)}-${st(o.getDate())}`,Bi=o=>`${st(o.getHours())}:${st(o.getMinutes())}`;function it(o){let[e,t,s]=o.split("-").map(Number);return new Date(e,t-1,s)}function Ot(o,e){let t=new Date(o.getFullYear(),o.getMonth(),o.getDate());return t.setDate(t.getDate()+e),t}function K(o){if(!o)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(o)){let t=it(o);return{date:o,time:null,at:new Date(t.getFullYear(),t.getMonth(),t.getDate(),23,59,59)}}let e=new Date(o);return isNaN(e)?null:{date:de(e),time:Bi(e),at:e}}function It(o,e=new Date){let t=it(o),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return Math.round((t-s)/864e5)}function ot(o,e=new Date){let t=it(o),s=`${t.getDate()} ${Vi[t.getMonth()]}`;return t.getFullYear()===e.getFullYear()?s:`${s} ${t.getFullYear()}`}function X(o,e=new Date){let t=K(o);if(!t)return null;let s=It(t.date,e),a=t.at<e,i;s===0?i="Hoje":s===1?i="Amanh\xE3":s===-1?i="Ontem":s>1&&s<7?i=Hi[it(t.date).getDay()]:i=ot(t.date,e),t.time&&(i+=`, ${t.time}`);let r=a?"late":s===0?"today":s<=2?"soon":"later";return{...t,diff:s,overdue:a,text:i,tone:r}}function zt(o=new Date){let e=o.getDay(),t=(6-e+7)%7||7,s=(1-e+7)%7||7,a=[{label:"Hoje",date:de(o)},{label:"Amanh\xE3",date:de(Ot(o,1))}];return t>1&&a.push({label:"S\xE1bado",date:de(Ot(o,t))}),s>1&&a.push({label:"Pr\xF3x. semana",date:de(Ot(o,s))}),a}function Pt(o=null){let e=Array.from({length:48},(t,s)=>`${String(s>>1).padStart(2,"0")}:${s%2?"30":"00"}`);return/^([01]\d|2[0-3]):[0-5]\d$/.test(o||"")&&!e.includes(o)&&(e.push(o),e.sort()),e}function ma(o,e=new Date){let t=e.getHours(),s=t>=5&&t<12?"Bom dia":t>=12&&t<18?"Boa tarde":"Boa noite",a=(o||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var Ui=/\bhttps?:\/\/[^\s<>"'`]+/gi;function ji(o){let e;try{e=new URL(o)}catch{return{label:o,icon:"link"}}let t=e.hostname.replace(/^www\./,""),s=e.pathname.split("/").filter(Boolean);if(t==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${t} \u203A ${a}`,icon:"link"}:{label:t,icon:"link"}}function fa(o){let e=[],t=0,s=o||"";for(let a of s.matchAll(Ui)){let i=a[0],r=i.match(/[.,;:!?)\]}]+$/);r&&(i=i.slice(0,-r[0].length)),a.index>t&&e.push({text:s.slice(t,a.index)}),e.push({url:i,...ji(i)}),t=a.index+i.length}return t<s.length&&e.push({text:s.slice(t)}),e}var Wi=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-](?!\d)|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,Yi=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function Rt(o){let e=(o||"").split(/\r?\n/).map(a=>a.replace(Yi,"").trim()).filter(Boolean);e.length===1&&/[,;]|\se\s/i.test(e[0])&&(e=e[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let t=new Set,s=[];for(let a of e){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(Wi,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let i=a.toLowerCase();t.has(i)||(t.add(i),s.push(a.slice(0,255)))}return s}async function Dt(o,e=1800){let t=s=>new Promise((a,i)=>{let r=new FileReader;r.onload=()=>a(String(r.result).split(",")[1]||""),r.onerror=()=>i(r.error),r.readAsDataURL(s)});try{let s=await createImageBitmap(o,{imageOrientation:"from-image"}),a=Math.min(1,e/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),s.close&&s.close();let r=await new Promise(c=>i.toBlob(c,"image/jpeg",.86));return{mime:"image/jpeg",data:await t(r),url:URL.createObjectURL(r)}}catch{return{mime:o.type||"image/jpeg",data:await t(o),url:URL.createObjectURL(o)}}}var se=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,Ki=o=>o>1048576?`${(o/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(o/1024))} KB`,Xi={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar","antes-de-apagar":"antes de apagar"},ga=o=>class extends o{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(e){let t=new Date(e),s=a=>String(a).padStart(2,"0");return`${s(t.getDate())}/${s(t.getMonth()+1)}/${t.getFullYear()} \xE0s ${s(t.getHours())}:${s(t.getMinutes())}`}async _loadBackups(){let e=this._data();if(e){try{this._backups=await e.backups()}catch(t){this._backups={available:!1,error:t.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let e=await this._data().createBackup();this._showToast(`Backup salvo em ${e.folder}/${e.name}`),this._haptic("success"),await this._loadBackups()}catch(e){this._showToast(`N\xE3o consegui criar o backup. ${e.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(e,t){let s=this._data();(!s||!s.url(e))&&(t.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(e,t){let s=e.added||e.added===0?`${t}: ${e.added?E(e.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${E(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${t}: ${E(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return e.missing&&e.missing.length&&(s+=`. ${e.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${e.missing.join(", ")}`),e.unsupported&&(s+=`. ${E(e.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),e.failed&&(s+=`. ${E(e.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let e=this.renderRoot.querySelector("#rv-data-import");e&&(e.value="",e.click())}_onDataImport(e){let t=e.target.files&&e.target.files[0];e.target.value="",t&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${I(t.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(t);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(e){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(e.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let t=await this._data().restoreBackup(e.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(t,"Backup restaurado"))}catch(t){this._showToast(t.message)}}})}_confirmErase(){this._openSheet("confirm",{title:"Come\xE7ar do zero?",text:"Apaga as repeti\xE7\xF5es, os pontos, os c\xF4modos, os equipamentos e quem faz de cada tarefa. Os itens das listas e os ajustes continuam. Antes, o app guarda uma c\xF3pia em Vers\xF5es anteriores.",label:"Apagar tudo",run:async()=>{this._closeSheet();try{await this._data().erase(),await this._loadPrefs(),this._haptic("warning"),this._showToast("Pronto: come\xE7ando do zero. A c\xF3pia est\xE1 em Vers\xF5es anteriores.")}catch(e){this._showToast(`N\xE3o consegui apagar. ${e.message}`)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let e=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:e})}catch(e){this._sheet==="versions"&&(this._form={...this._form,error:e.message})}}_confirmRestoreVersion(e){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(e.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(e.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(t){this._showToast(t.message)}}})}_renderVersions(){let e=this._form;return n`
        <div class="sheet-head">
          <h3 class="display">Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${se("x")}</button>
        </div>
        ${e.error?n`<div class="imp-error">${se("circle-alert")}<span>${e.error}</span></div>`:e.list==null?n`<div class="imp-loading"><span class="spin">${se("loader-circle")}</span><span>Carregando…</span></div>`:e.list.length?n`<div class="data-list">
                  ${e.list.map(t=>n`<div class="data-item">
                      <div><b>${this._dateTime(t.when)}</b><span>${E(t.lists,"lista personalizada","listas personalizadas")} · ${E(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${Xi[t.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(t)}>Restaurar</button>
                    </div>`)}
                </div>`:n`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let e=this._data();if(!e)return u;let t=this._backups,s=(a,i,r,c)=>n`<li>
        <div class="ot"><b>${i}</b><span>${r}</span></div>
        <a class="btn outline sm" href=${e.url(a)||"#"} download @click=${d=>this._exportData(a,d)}>${se("download")}${c}</a>
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
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||t&&t.available===!1} @click=${()=>this._createBackup()}>${se("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${t&&t.available===!1?n`<p class="data-note">A pasta share não está disponível para o app.</p>`:u}
          ${t&&t.backups&&t.backups.length?n`<div class="data-list">
                ${t.backups.slice(0,8).map(a=>n`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${Ki(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${se("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:u}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Um .zip ou .json exportado pelo ResolvIA, sem duplicar.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${se("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","Uma c\xF3pia dos ajustes e das repeti\xE7\xF5es a cada 10 minutos de uso e antes de importar, restaurar ou apagar. Ficam as 3 mais recentes.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${se("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",n`Os itens ficam nas listas do Home Assistant; os ajustes, em <code>/data/resolvia.json</code>.`)}
        </div>
        <div class="panel" id="zerar">
          ${this._secHead("trash","Come\xE7ar do zero","Apaga as repeti\xE7\xF5es, os pontos, os c\xF4modos, os equipamentos e quem faz. Os itens das listas e os ajustes continuam.")}
          <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmErase()}>${se("trash")}Apagar tudo</button></div>
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var rt=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,va=[5,10,20,30,50],ve=o=>String(o||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),xa=o=>{let e=/\[cr:[0-9a-f]{8}\]/.exec(String(o||""));return e?e[0]:""},Ji={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},ba=o=>class extends o{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let e=this._pts;return!!(e&&e.on&&e.placar&&e.placar.ativo)}_rawPoints(e,t){let s=this._pts&&this._pts.points&&this._pts.points[e];return s&&s[pa(t)]||0}_mirrored(e,t){let s=this._pts&&this._pts.espelho&&this._pts.espelho[e];return t&&s&&s[t]||null}_pointsOf(e,t,s=null){let a=this._mirrored(e,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(e,t):0}async _setTaskPoints(e,t,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:e,summary:t,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(`N\xE3o consegui salvar os pontos: ${i.message}`)}}async _setPointsOn(e){await this._saveAppPrefs({points_on:e?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(e,t,s,a,i=null){let r;try{r=await this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!0,...i?{quem:i}:{}})}catch(l){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${l.message}`,a);return}if(r&&r.ask){this._openSheet("who",{title:t.summary,points:r.points,participantes:r.participantes,run:l=>{this._closeSheet(!0),l?this._givePoints(e,t,s,a,l):this._showToast(s,a)}});return}if(!r||!r.points){this._showToast(s,a);return}let c=`Resolvido por ${r.who} \xB7 +${r.points}`,d=(r.participantes||[]).filter(l=>l!==r.who);if(d.length===1){let l=d[0];this._showToast(c,{label:`Foi ${l}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:r.key,quem:l}).then(()=>this._showToast(`Pontos para ${l}`)).catch(p=>this._showToast(p.message))})}else this._showToast(c,a)}_takePoints(e,t){!this._mirrored(e.id,t.uid)&&(!this._rawPoints(e.id,t.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!1}).catch(()=>{})}_renderPointsTag(e,t){let s=this._pointsOf(e,t.summary,t.uid);return s?n`<span class="tag pts" title="${s} pontos para quem concluir">${rt("trophy")}+${s}</span>`:u}_renderPointsField(e){if(e.mirrored)return u;if(!(this._pts&&this._pts.on))return u;let t=this._pts.placar,s=e.points||0,a=e.pointsCustom||s>0&&!va.includes(s);return n`<div class="field">
        <span class="flabel">Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>Sem pontos</button>
          ${va.map(i=>n`<button class="pick ${s===i&&!a?"on":""}" @click=${()=>this._setForm({points:i,pointsCustom:!1})}>+${i}</button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${rt("trophy")}<span>Outro</span></button>
        </div>
        ${a?n`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${i=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(i.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:u}
        ${s?n`<div class="field-hint">${rt("trophy")}<span>${t&&t.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${t.participantes.join(" \xD7 ")}).`:t&&t.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA.":"O placar do CronologIA est\xE1 desligado."}</span></div>`:u}
      </div>`}_renderWhoSheet(){let e=this._form;return n`
        <div class="sheet-head">
          <h3 class="display">Quem fez?</h3>
          <button class="icon-btn" @click=${()=>e.run("")} aria-label="Fechar">${rt("x")}</button>
        </div>
        <p class="sheet-note top">${I(e.title||"",40)} · <b>+${e.points} pontos</b></p>
        <div class="who-grid">
          ${(e.participantes||[]).map(t=>n`<button class="who-btn" @click=${()=>e.run(t)}><span class="who-av">${(t||"?").trim().charAt(0).toUpperCase()}</span><b>${t}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>e.run("")}>Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let e=this._pts;if(!e)return u;let t=e.placar,s=!!e.on,a=Object.values(e.points||{}).reduce((c,d)=>c+Object.keys(d).length,0),i=n`<div class="row switch-row">
          <div class="grow">
            <div class="label">Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${E(a,"tarefa vale","tarefas valem")} pontos.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D.":"Desligado."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${c=>this._setPointsOn(c.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return n`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
          ${i}
        </div>`;let r=t?t.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${t.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Configura\xE7\xF5es \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:t.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${t.versao}`.trim(),text:`${t.participantes.join(" \xD7 ")} \xB7 fecha ${Ji[t.periodo]||"toda semana"}. ${t.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${t.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${t.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return n`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
        ${i}
        <div class="ai-state ${r.tone}" style="margin-bottom:16px"><span class="dot"></span><div><b>${r.title}</b><span>${r.text}</span></div></div>
      </div>`}};var xe=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,Qi=864e5,_a=5,Zi=2;function Lt(o){return o<14?E(o,"dia","dias"):o<60?E(Math.floor(o/7),"semana","semanas"):o<730?E(Math.floor(o/30),"m\xEAs","meses"):E(Math.floor(o/365),"ano","anos")}var $a=o=>o.icon==="shopping-cart",wa=o=>class extends o{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let e=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=e.ages||{},this._aiAsking||(this._aiPick=e.ai||null),this._aiBusy=!!e.busy||!!this._aiAsking,clearTimeout(this._aiPoll),e.busy&&!this._aiAsking&&(this._aiPoll=setTimeout(()=>this._loadSuggest(),3e3))}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(e,t,s=new Date){if(this._sinceDate(e,t))return Math.max(0,-It(K(t.due).date,s));let a=this._ages&&this._ages[e.id]&&t.uid?this._ages[e.id][t.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/Qi)):null}_sinceDate(e,t){return!e.canDue&&!!t.due&&!!K(t.due)}_suggestLists(){return this._visible().filter(e=>!e.unavailable&&e.items&&O(e.features,S.UPDATE))}_suggestions(e=new Set){let t=new Date,s=[],a=[],i=0,r=0;for(let l of this._suggestLists()){let p=l.items.filter(h=>h.status!=="completed");if(p.length){if(i+=p.length,r++,$a(l)){let h=p.map(m=>this._ageOf(l,m,t)).filter(m=>m!=null);a.push({l,n:p.length,oldest:h.length?Math.max(...h):null});continue}p.forEach((h,m)=>{if(e.has(h))return;let v=[],w=0,x=this._ageOf(l,h,t);x!=null&&x>=3&&(w+=Math.min(x,60)/3,v.push(this._sinceDate(l,h)?`Assim h\xE1 ${Lt(x)}`:`Na lista h\xE1 ${Lt(x)}`)),p.length===1?(w+=8,v.push("\xC9 o \xFAltimo da lista")):p.length===2&&(w+=4,v.push("Faltam 2 para zerar a lista"));let _=this._pointsOf(l.id,h.summary,h.uid);_&&(w+=3+Math.min(_,50)/10),this._ruleFor(l.id,h)&&(w+=4,v.push("Voltou para fazer"));let k=l.canDue&&h.due?X(h.due,t):null;if(k&&k.diff<=0){w+=k.diff<0?6:5;let A=this._mirrored(l.id,h.uid);v.push(A?`${A.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${k.diff<0?"atrasada":"para hoje"}`:k.diff<0?"A data j\xE1 passou":"Tem data para hoje")}m===0&&(w+=1.5),v.length||v.push(_?"Vale pontos":m===0?"Primeiro da lista":`${m+1}\xBA da lista`),s.push({l,i:h,idx:m,score:w,why:v.join(" \xB7 ")})})}}s.sort((l,p)=>p.score-l.score||l.idx-p.idx);let c=[],d=new Map;for(let l of s){if(l.score<=0)continue;let p=d.get(l.l.id)||0;if(!(p>=Zi)&&(d.set(l.l.id,p+1),c.push(l),c.length>=_a))break}for(let l of s){if(c.length>=_a)break;c.includes(l)||c.push(l)}return a.sort((l,p)=>p.n-l.n),{top:c,shopping:a,pending:i,lists:r}}async _askAi(){if(this._aiBusy)return;let e=new Date,t=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let i=this._ruleFor(s.id,a);t.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,e),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:i?i.days:0,compras:$a(s),comodo:this._roomIdsOf(s.id,a.summary).map(r=>this._roomName(r)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(s.id,a.summary).map(r=>(this._equipOf(r)||{}).nome).filter(Boolean).join(", "),externo:(r=>r===!0?"sim":r||"")(this._externalOf(s.id,a.summary))})}if(t.length){this._aiBusy=!0,this._aiAsking=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:t.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiAsking=!1,this._aiBusy=!1,this.requestUpdate()}}async _clearAi(){this._aiPick=null,this._aiErr=null,this.requestUpdate();try{await this.hass.callWS({type:"resolvia/ai/suggest/clear"})}catch{}}_aiRows(){let e=this._aiPick,t=[];for(let s of e&&e.picks||[]){let a=s.key.indexOf("|"),i=this._list(s.key.slice(0,a)),r=i&&i.items&&i.items.find(c=>c.uid===s.key.slice(a+1));i&&r&&!i.hidden&&(r.status!=="completed"||this._recent.has(r.uid))&&t.push({l:i,i:r,why:s.motivo||"Escolhido pela IA",ai:!0})}return t}_renderStart(e){let t=this._aiOn()&&!!this.hass.resolvia,s=t?this._aiInfo():null,a=t?this._aiPick:null,i=a?this._aiRows():[],r=i.length>0,c=r?i:e.top;if(!c.length&&!t)return u;let d=!!this._aiBusy;return n`<div class="panel items start ${r?"by-ai":""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${xe(r?"sparkles":"flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${c.length}</small></div>
        ${r?n`<p class="start-by">${xe("sparkles")}<span>Escolhidos pela IA.</span></p>`:u}
        ${Q(c,l=>l.l.id+(l.i.uid||l.i.summary),l=>this._renderItem(l.l,l.i,{showList:!0,why:l.why,whyIcon:l.ai?"sparkles":null}))}
        ${a&&!r?n`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>`:u}
        ${t&&!s.ready&&s.reason?n`<p class="ai-note">${s.reason}</p>`:u}
        ${this._aiErr?n`<p class="ai-note err">${this._aiErr}</p>`:u}
        ${t?n`<div class="ai-actions start-acts">
              <button class="btn ${r?"outline":"primary"} sm ai-ask" ?disabled=${d||!s.ready} @click=${()=>this._askAi()}>
                ${xe(d?"loader-circle":"sparkles",d?"ai-spin":"")}${d?"Pensando\u2026":r?"Sugerir de novo":"Sugerir com IA"}
              </button>
              ${a&&!d?n`<button class="btn outline sm" @click=${()=>this._clearAi()}>${xe("rotate-ccw")}Voltar ao automático</button>`:u}
            </div>`:u}
      </div>`}_renderSuggest(){let e=this._dueSections(),t=this._suggestions(new Set(e.rows.map(i=>i.i))),s=[];t.pending&&s.push(`${E(t.pending,"pendente","pendentes")} em ${E(t.lists,"lista","listas")}`),e.late&&s.push(E(e.late,"atrasado","atrasados")),e.today&&s.push(`${e.today} para hoje`);let a=t.pending||e.comingN;return n`
        <section class="page">
          ${this._renderPageHead("Sugest\xF5es",{text:s.length?s.join(" \xB7 "):"Nada pendente",tone:e.late?"late":""})}
          ${a?n`
                ${e.soon}
                ${t.pending?this._renderStart(t):u}
                ${e.later}
                ${e.coming}
                ${t.shopping.length?n`<div class="panel">
                      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${xe("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${t.shopping.length}</small></div>
                      ${t.shopping.map(i=>n`<button class="list-card" style=${L(i.l.color,this._dark)} @click=${()=>this._go(`/lista/${i.l.id}`)}>
                          <span class="tile">${xe(i.l.icon)}</span>
                          <span class="lc-main">
                            <span class="lc-title">${i.l.name}</span>
                            <span class="lc-meta"><span>${i.oldest!=null&&i.oldest>=3?`O mais antigo est\xE1 h\xE1 ${Lt(i.oldest)}`:E(i.n,"item para comprar","itens para comprar")}</span></span>
                          </span>
                          <span class="lc-num">${i.n}</span>
                        </button>`)}
                    </div>`:u}
              `:n`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${xe("lightbulb")}</div>
                  <h3>Nada para sugerir</h3>
                  <p>Todas as listas estão em dia. Quando aparecer algo pendente, as sugestões aparecem aqui.</p>
                </div>
              </div>`}
        </section>
      `}};var G=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,nt=o=>String(o||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),be=o=>Array.isArray(o)?o:o?[o]:[],ya=(o,e)=>be(o).join("|")===be(e).join("|"),ka=o=>class extends o{async _loadRooms(e="resolvia/rooms/get"){if(!(!this.hass||!this.hass.resolvia)){try{this._rooms=await this.hass.callWS({type:e})}catch{this._rooms=this._rooms||null}this.requestUpdate()}}_roomsOn(){let e=this._rooms;return!!(e&&e.on&&e.comodos&&e.comodos.length)}_roomList(){return this._rooms&&this._rooms.comodos||[]}_equipsOn(){let e=this._rooms;return!!(e&&e.equips_on&&e.itens&&e.itens.length)}_equipList(){return this._rooms&&this._rooms.itens||[]}_equipOf(e){return e&&this._equipList().find(t=>t.id===e)||null}_equipIdsOf(e,t){if(!this._equipsOn())return[];let s=this._rooms.emap&&this._rooms.emap[e];return be(s&&s[nt(t)]).filter(a=>this._equipOf(a))}_equipIdOf(e,t){return this._equipIdsOf(e,t)[0]||null}_roomsOfEquips(e){let t=be(e).map(s=>(this._equipOf(s)||{}).comodo).filter(s=>s&&this._roomList().some(a=>a.id===s));return[...new Set(t)]}async _setTaskEquip(e,t,s,a=null){if(this._equipsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/equips/set",entity_id:e,summary:t,equips:be(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o equipamento")}}_renderEquipTag(e,t){let s=this._equipIdsOf(e,t.summary).map(a=>this._equipOf(a));return s.length?s.length>1?n`<span class="tag room" title=${s.map(a=>a.nome).join(", ")}>${G("package")}Vários equipamentos</span>`:n`<span class="tag room" title=${s[0].nome}>${G("package")}${I(s[0].nome,26)}</span>`:u}_equipItems(){return this._equipList().map(e=>({id:e.id,nome:e.nome,zona:e.zona,roomId:e.comodo,roomName:this._roomName(e.comodo)||""}))}_renderEquipField(e){if(!this._equipsOn())return u;let t=e.equips||[],s=this._roomsOn()?t.length?this._roomsOfEquips(t)[0]||null:this._allRooms(this._pickedRooms(e))?null:e.room:null;return n`<div class="field">
        <span class="flabel">${t.length>1?"Equipamentos":"Equipamento"}</span>
        ${Pe({lit:{html:n,nothing:u},icon:G,items:this._equipItems(),room:s,roomName:s&&this._roomName(s)||"",value:t,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:a=>this._setForm({equipQ:a,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:a=>this._setForm({equips:[...t,a],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:a=>{let i=t.filter(c=>c!==a),r=this._roomsOfEquips(t);this._setForm({equips:i,...!i.length&&this._roomsOn()?{room:r[0]||e.room||null,rooms:r.length?r:e.room?[e.room]:[]}:{}})}})}
      </div>`}_formRooms(e){if(!this._roomsOn())return[];let t=this._equipsOn()?e.equips||[]:[];return t.length?this._roomsOfEquips(t):this._pickedRooms(e)}_pickedRooms(e){return(Array.isArray(e.rooms)?e.rooms:e.room?[e.room]:[]).filter(s=>this._roomList().some(a=>a.id===s))}async _saveTaskPlace(e,t,s,a=null){let i=this._formRooms(s),r=this._equipsOn()?s.equips||[]:[];(!ya(i,s.roomsOrig||[])||a&&(s.roomsOrig||[]).length)&&await this._setTaskRoom(e,t,i,a),(!ya(r,s.equipsOrig||[])||a&&(s.equipsOrig||[]).length)&&await this._setTaskEquip(e,t,r,a)}_placeText(e,t,{rooms:s=!0,equips:a=!0}={}){let i=s?this._roomIdsOf(e,t).map(c=>this._roomName(c)):[],r=a?this._equipIdsOf(e,t).map(c=>this._equipOf(c)):[];return[...i,...r.flatMap(c=>[c.nome,c.zona||""])].filter(Boolean).join(" ")}_roomIdsOf(e,t){if(!this._roomsOn())return[];let s=this._rooms.map&&this._rooms.map[e];return be(s&&s[nt(t)]).filter(a=>this._roomList().some(i=>i.id===a))}_roomIdOf(e,t){return this._roomIdsOf(e,t)[0]||null}_roomName(e){let t=this._roomList().find(s=>s.id===e);return t?t.nome:null}_allRooms(e){let t=this._roomList();return t.length>1&&t.every(s=>(e||[]).includes(s.id))}async _setTaskRoom(e,t,s,a=null){if(this._roomsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/rooms/set",entity_id:e,summary:t,rooms:be(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o c\xF4modo")}}_renderRoomTag(e,t){if(this._equipIdsOf(e,t.summary).length>1)return u;let s=this._roomIdsOf(e,t.summary),a=s.map(i=>this._roomName(i)).join(", ");return this._allRooms(s)?n`<span class="tag room" title=${a}>${G("house")}Todos os cômodos</span>`:s.length>1?n`<span class="tag room" title=${a}>${G("door-open")}Vários cômodos</span>`:s.length?n`<span class="tag room">${G("door-open")}${I(this._roomName(s[0]),22)}</span>`:u}_renderRoomField(e){if(!this._roomsOn())return u;let t=this._equipsOn()&&(e.equips||[]).length>0,s=t?this._roomsOfEquips(e.equips):this._pickedRooms(e),a=c=>{let d=s.includes(c)?s.filter(l=>l!==c):[...s,c];this._setForm({rooms:d,room:d[0]||null})},i=this._roomList().map(c=>c.id),r=!t&&this._allRooms(s);return n`<div class="field">
        <span class="flabel">${s.length>1?"C\xF4modos":"C\xF4modo"}</span>
        <div class="chip-row grid ${t?"locked":""}">
          <button class="pick ${s.length?"":"on"}" ?disabled=${t} @click=${()=>this._setForm({room:null,rooms:[]})}>Nenhum</button>
          ${i.length>1?n`<button class="pick room all-rooms ${r?"on":""}" aria-pressed=${r?"true":"false"} ?disabled=${t} @click=${()=>this._setForm(r?{room:null,rooms:[]}:{rooms:i,room:i[0]})}>${G("house")}<span>Todos</span></button>`:u}
          ${this._roomList().map(c=>n`<button class="pick room ${s.includes(c.id)?"on":""}" aria-pressed=${s.includes(c.id)?"true":"false"} ?disabled=${t} @click=${()=>a(c.id)}>${G("door-open")}<span>${I(c.nome,22)}</span></button>`)}
        </div>
        ${t?n`<span class="field-hint">${G("lock")}<span>Vem ${e.equips.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:u}
      </div>`}_renderRoomsPanel(){if(!this.hass.resolvia)return u;let e=this._rooms||{},t=this._app("rooms_on",!1)===!0,s=this._app("equips_on",!1)===!0,a=(e.comodos||[]).length,i=(e.itens||[]).length,r=(l,p,h,m)=>n`<div class="row switch-row">
        <div class="grow"><div class="label">${l}</div><div class="hint" style="white-space:normal">${p?h:"Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${p} @change=${v=>m(v.target.checked)} aria-label=${l} /><span class="track"></span></label>
      </div>`,c=u;if(t||s){let l=[t&&a?E(a,"c\xF4modo","c\xF4modos"):"",s&&i?E(i,"equipamento","equipamentos"):""].filter(Boolean).join(" \xB7 "),p=this._roomsBusy?"off":l?e.erro?"warn":"ok":"bad",h=this._roomsBusy?"Verificando\u2026":l||(e.encontrado?"Nada cadastrado":"InventarIA n\xE3o encontrado"),m=this._roomsBusy?"":e.erro||(l?t&&a?e.comodos.map(v=>v.nome).join(", "):"":e.encontrado?"Cadastre os c\xF4modos e os itens no InventarIA.":"Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");c=n`<div class="ai-state ${p}"><span class="dot"></span><div><b>${h}</b>${m?n`<span>${m}</span>`:u}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${()=>this._refreshRooms()}>${G("rotate-ccw")}Verificar de novo</button></div>`}let d=this._aiOn()?", e a IA sugere qual":"";return n`<div class="panel" id="comodos">
        ${this._secHead("house","InventarIA","Para ligar uma tarefa a um c\xF4modo ou a um equipamento da casa.")}
        ${r("Usar c\xF4modos",t,`Cada tarefa pode ter um c\xF4modo${d}.`,l=>this._toggleRooms(l))}
        ${r("Usar equipamentos",s,`Cada tarefa pode ser de um equipamento ou m\xF3vel${d}.`,l=>this._toggleEquips(l))}
        ${c}
      </div>`}async _toggleEquips(e){await this._saveAppPrefs({equips_on:e?!0:null}),await this._refreshRooms()}async _toggleRooms(e){await this._saveAppPrefs({rooms_on:e?!0:null}),await this._refreshRooms()}async _refreshRooms(){this._roomsBusy=!0,this.requestUpdate(),await this._loadRooms("resolvia/rooms/refresh"),this._roomsBusy=!1,this.requestUpdate()}};function Aa({lit:o,icon:e,messages:t=[],draft:s="",busy:a=!1,error:i="",voice:r=null,examples:c=[],onDraft:d,onSend:l,onMic:p,onAction:h,onAll:m,onClear:v,onClose:w}){let{html:x,nothing:_}=o,k=()=>{let f=(s||"").trim();f&&!a&&l(f)},A=(f,b,y,q)=>x`<div class="chat-act ${y.state||"todo"}">
    <span class="chat-act-ic">${e(y.state==="done"?"check":y.state==="failed"?"circle-alert":y.icon||"sparkles")}</span>
    <span class="chat-act-tx">${y.label}${y.note?x`<small>${y.note}</small>`:_}</span>
    ${y.state==="done"?x`<span class="chat-act-ok">Feito</span>`:y.state==="doing"?x`<span class="chat-act-ok">…</span>`:x`<button type="button" class="btn primary sm" @click=${()=>h(b,q)}>${y.state==="failed"?"Tentar de novo":"Fazer"}</button>`}
  </div>`,$=(f,b)=>{let y=(f.actions||[]).filter(q=>q.state!=="done"&&q.state!=="doing").length;return x`<div class="chat-msg ${f.role==="user"?"me":"ia"}">
      ${f.text?x`<div class="chat-bubble">${f.text}</div>`:_}
      ${(f.actions||[]).length?x`<div class="chat-acts">
            ${f.actions.map((q,z)=>A(f,b,q,z))}
            ${y>1?x`<button type="button" class="btn outline sm chat-all" @click=${()=>m(b)}>Fazer todas (${y})</button>`:_}
          </div>`:_}
    </div>`},M=r&&r.on;return x`<div class="chat">
    <div class="chat-head">
      <span class="chat-title">${e("message-circle")}Conversa</span>
      ${t.length?x`<button type="button" class="text-btn" @click=${()=>v()}>Nova conversa</button>`:_}
      <button type="button" class="icon-btn" aria-label="Fechar" @click=${()=>w()}>${e("x")}</button>
    </div>
    <div class="chat-log">
      ${t.length?t.map($):x`<div class="chat-empty">
            <p>Pergunte sobre esta tela ou sobre qualquer assunto. Se pedir para mudar algo, eu mostro antes de fazer.</p>
            ${c.length?x`<div class="chat-ex">${c.map(f=>x`<button type="button" class="pick" @click=${()=>l(f)}>${f}</button>`)}</div>`:_}
          </div>`}
      ${a?x`<div class="chat-msg ia"><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>`:_}
      ${i?x`<div class="chat-error">${e("circle-alert")}<span>${i}</span></div>`:_}
    </div>
    <form class="chat-input" @submit=${f=>(f.preventDefault(),k())}>
      <textarea rows="1" .value=${s} placeholder=${M?"Ouvindo\u2026":"Escreva aqui\u2026"} aria-label="Mensagem para a IA" ?disabled=${M}
        @input=${f=>d(f.target.value)}
        @keydown=${f=>{f.key==="Enter"&&!f.shiftKey&&!f.isComposing&&(f.preventDefault(),k())}}></textarea>
      ${r&&r.ready?x`<button type="button" class="icon-btn chat-mic ${M?"on":""}" aria-label=${M?"Pronto: enviar o que falei":"Falar"} ?disabled=${a||r.starting} @click=${()=>p()}>${e(M?"check":"mic")}</button>`:_}
      <button type="submit" class="icon-btn chat-send" aria-label="Enviar" ?disabled=${a||M||!(s||"").trim()}>${e("send")}</button>
    </form>
  </div>`}var Ma=`
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
`;var ye=class{constructor(e){this.onLevel=e,this.chunks=[],this.length=0,this.rate=16e3}async start(){let e=navigator.mediaDevices;if(!e||!e.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await e.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let t=window.AudioContext||window.webkitAudioContext;try{this.ctx=new t({sampleRate:16e3})}catch{this.ctx=new t}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let i=0;for(let r=0;r<a.length;r+=4)i+=a[r]*a[r];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(i/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let e=new Float32Array(this.length),t=0;for(let r of this.chunks)e.set(r,t),t+=r.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(e.length/s),i=new Int16Array(a);for(let r=0;r<a;r++){let c=Math.floor(r*s),d=Math.max(c+1,Math.min(e.length,Math.floor((r+1)*s))),l=0;for(let h=c;h<d;h++)l+=e[h];let p=Math.max(-1,Math.min(1,l/(d-c)));i[r]=p<0?p*32768:p*32767}return i}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let e of this.stream.getTracks())e.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function lt(o){let e=o&&o.name||"";return e==="NotAllowedError"||e==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":e==="NotFoundError"||e==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":e==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":e==="NoApi"?window.isSecureContext===!1?"O microfone aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), o celular e o navegador n\xE3o deixam usar o microfone, nem pelo app do Home Assistant.":"Este navegador n\xE3o deixa usar o microfone aqui.":`N\xE3o consegui abrir o microfone (${o&&o.message||e||"erro"}).`}var Sa=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,Ea=o=>o.status==="completed",qa="resolvia-conversa",Ta=o=>class extends o{_chatState(){if(!this._chat){let e=[];try{e=JSON.parse(sessionStorage.getItem(qa)||"[]")}catch{}this._chat={messages:Array.isArray(e)?e:[],draft:"",busy:!1,error:"",rec:null}}return this._chat}_setChat(e){if(this._chat={...this._chatState(),...e},"messages"in e)try{sessionStorage.setItem(qa,JSON.stringify(this._chat.messages.slice(-30)))}catch{}this.requestUpdate()}_renderChatBtn(){return!this._aiOn()||!this.hass.resolvia?u:n`<button class="mic-top chat-top" aria-label="Conversar com a IA" title="Conversar com a IA" @click=${()=>this._openChat()}>${Sa("message-circle")}</button>`}_openChat(){this._openSheet("chat",{}),this._chatScroll=!0,this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".chat-input textarea");e&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches&&e.focus()})}_renderChatSheet(){let e=this._chatState(),t=this._voice||{};return Aa({lit:{html:n,nothing:u},icon:Sa,messages:e.messages,draft:e.draft,busy:e.busy,error:e.error,voice:{ready:!!t.ready&&this._micOk(),on:e.rec==="on",starting:e.rec==="starting"},examples:this._chatExamples(),onDraft:s=>this._setChat({draft:s}),onSend:s=>this._chatSend(s),onMic:()=>this._chatMic(),onAction:(s,a)=>this._chatDo(s,a),onAll:s=>this._chatDoAll(s),onClear:()=>this._setChat({messages:[],error:""}),onClose:()=>this._closeSheet()})}_micOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_chatExamples(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?[`O que \xE9 mais urgente em ${I(t.name,24)}?`,"Por onde eu come\xE7o hoje?"]:[]}return[...this._dueOn()?["O que est\xE1 atrasado?"]:[],"Por onde eu come\xE7o hoje?","Adiciona leite na lista de compras"]}_chatScreen(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?`a lista "${t.name}"`:"uma lista"}return e.name==="search"?this._query?`Buscar, procurando "${this._query}"`:"Buscar":e.name==="lists"?"Listas (todas as listas, com o que falta em cada uma)":e.name==="more"?"Mais (o menu: Listas, Gr\xE1ficos, Configura\xE7\xF5es e Sobre)":e.name==="sobre"?"Mais \u203A Sobre (CorrerIA Code, quem faz o app, os outros apps da fam\xEDlia e o GitHub)":e.name==="listas"?"Mais \u203A Listas (nome, cor, \xEDcone e quais listas aparecem)":e.name==="graficos"?`Mais \u203A Gr\xE1ficos (gr\xE1ficos das ${this._chartsLine().replace(/\.$/,"").toLowerCase()})`:e.name==="config"?"Mais \u203A Configura\xE7\xF5es (integra\xE7\xF5es, dados, apar\xEAncia e op\xE7\xF5es do app: prazos, exibi\xE7\xE3o, quem faz e repeti\xE7\xE3o)":this._dueOn()?"Sugest\xF5es, o in\xEDcio (o que est\xE1 atrasado, o que vence hoje e nos pr\xF3ximos dias e por onde come\xE7ar)":"Sugest\xF5es, o in\xEDcio (por onde come\xE7ar)"}_chatContext(){let e=this._view(),t=this._visible().slice(),s=e.name==="list"?this._list(e.id):null;s&&!t.includes(s)&&t.unshift(s),t.sort((i,r)=>+(r===s)-+(i===s));let a=new Date;return{tela:this._chatScreen(),listas:t.map(i=>{let r=(i.items||[]).filter(c=>!Ea(c));return{id:i.id,nome:i.name,adicionar:O(i.features,S.CREATE)&&!i.unavailable,prazos:!i.noDue&&O(i.features,S.DUE_DATE),pendentes:r.length,itens:r.slice(0,i===s?120:40).map(c=>{let d=K(c.due),l=d?X(c.due,a):null;return{texto:c.summary||"",prazo:d&&!i.noDue?d.date:null,atrasado:!!(l&&l.tone==="late"&&!i.noDue),pontos:this._pointsOf&&this._pointsOf(i.id,c.summary,c.uid)||0,comodo:this._roomIdsOf(i.id,c.summary).map(p=>this._roomName(p)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(i.id,c.summary).map(p=>(this._equipOf(p)||{}).nome).filter(Boolean).join(", "),externo:(p=>p===!0?"sim":p||"")(this._externalOf(i.id,c.summary))}})}})}}async _chatSend(e){let t=this._chatState();if(t.busy)return;let s=[...t.messages,{role:"user",text:e}];this._setChat({messages:s,draft:"",busy:!0,error:""}),this._chatScroll=!0;try{let a=await this.hass.callWS({type:"resolvia/ai/chat",messages:s.map(r=>({role:r.role,text:r.text||(r.actions||[]).map(c=>c.label).join("; ")})),context:this._chatContext()}),i=(a.actions||[]).map(r=>({...r,label:this._chatLabel(r),icon:r.tipo==="concluir"?"check":"plus",state:"todo"}));this._setChat({messages:[...this._chatState().messages,{role:"ia",text:a.reply||"",actions:i}],busy:!1})}catch(a){this._setChat({busy:!1,error:a.message||"A IA n\xE3o respondeu. Tente de novo."})}this._chatScroll=!0}_chatLabel(e){return e.tipo==="concluir"?`Concluir "${I(e.item,60)}" em ${I(e.nome,30)}`:`Adicionar "${I(e.item,60)}" em ${I(e.nome,30)}${e.prazo?` \xB7 prazo ${e.prazo.slice(8,10)}/${e.prazo.slice(5,7)}`:""}`}_setAction(e,t,s){let a=this._chatState().messages.map((i,r)=>r===e?{...i,actions:i.actions.map((c,d)=>d===t?{...c,...s}:c)}:i);this._setChat({messages:a})}async _chatDo(e,t){let s=((this._chatState().messages[e]||{}).actions||[])[t];if(!s||s.state==="done"||s.state==="doing")return;this._setAction(e,t,{state:"doing",note:""});let a=this._list(s.lista),i=!1,r="";if(!a)r="Lista n\xE3o encontrada.";else if(s.tipo==="adicionar")i=await this._addFull(a,{summary:s.item,description:"",date:s.prazo||null,time:null});else{let c=(a.items||[]).find(d=>!Ea(d)&&V(d.summary)===V(s.item));c?(await this._toggle(a,c),i=!0):r="Esse item n\xE3o est\xE1 mais pendente."}this._setAction(e,t,{state:i?"done":"failed",note:i?"":r||"N\xE3o deu certo."})}async _chatDoAll(e){let t=(this._chatState().messages[e]||{}).actions||[];for(let s=0;s<t.length;s++)t[s].state!=="done"&&await this._chatDo(e,s)}async _chatMic(){let e=this._chatState();if(e.rec==="on"){let s=this._chatRec;if(this._chatRec=null,clearTimeout(this._chatRecTimer),!s)return this._setChat({rec:null});let a=s.stop();if(this._setChat({rec:null}),a.length<16e3*.4)return this._setChat({error:"N\xE3o ouvi nada. Toque no microfone e fale."});this._setChat({busy:!0,error:""});try{let i=await this.hass.resolvia.voiceText(a);this._setChat({busy:!1}),i&&i.text&&this._chatSend(i.text)}catch(i){this._setChat({busy:!1,error:i.message||"N\xE3o consegui transcrever."})}return}if(e.rec)return;let t=new ye(()=>{});this._chatRec=t,this._setChat({rec:"starting",error:""});try{await t.start()}catch(s){return t.cancel(),this._chatRec=null,this._setChat({rec:null,error:lt(s)})}if(this._chatRec!==t)return t.cancel();this._setChat({rec:"on"}),this._chatRecTimer=setTimeout(()=>this._chatState().rec==="on"&&this._chatMic(),120*1e3)}_chatStop(){clearTimeout(this._chatRecTimer),this._chatRec&&this._chatRec.cancel(),this._chatRec=null,this._chat&&this._chat.rec&&(this._chat={...this._chat,rec:null})}_chatAfterRender(){if(!this._chatScroll||this._sheet!=="chat")return;this._chatScroll=!1;let e=this.renderRoot.querySelector(".chat-log");e&&(e.scrollTop=e.scrollHeight)}};var Ht=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,ke=o=>o===!0?!0:typeof o=="string"&&o.trim()?o.replace(/\s+/g," ").trim().slice(0,60):null,Oa=o=>class extends o{async _loadExternal(){if(!(!this.hass||!this.hass.resolvia)){try{this._ext=(await this.hass.callWS({type:"resolvia/external/get"})).ext||{}}catch{this._ext=this._ext||{}}this.requestUpdate()}}_extOn(){return!this._app("ext_off",!1)}_externalRaw(e,t){let s=this._ext&&this._ext[e];return ke(s&&s[nt(t)])}_externalOf(e,t){return this._extOn()?this._externalRaw(e,t):null}_externalText(e,t){let s=this._externalOf(e,t);return s?s===!0?"Servi\xE7o externo":`Servi\xE7o externo ${s}`:""}async _setTaskExternal(e,t,s,a=null){if(!(!this.hass||!this.hass.resolvia))try{this._ext=(await this.hass.callWS({type:"resolvia/external/set",entity_id:e,summary:t,value:ke(s),...a!=null?{previous_summary:a}:{}})).ext||{},this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar quem faz")}}async _saveTaskExternal(e,t,s,a=null){let i=ke(s.ext),r=ke(s.extOrig);(i!==r||a&&r)&&await this._setTaskExternal(e,t,i,a)}_renderExternalOption(e){let t=this._extOn();return n`<div class="panel" id="quem-faz">
        ${this._secHead("hard-hat","Quem faz")}
        <div class="row switch-row">
          <div class="grow"><div class="label">Serviços externos</div><div class="hint" style="white-space:normal">${t?"Quem faz em cada tarefa: voc\xEAs ou algu\xE9m de fora.":"Desligado."}</div></div>
          ${e(t,"Servi\xE7os externos",s=>this._saveAppPrefs({ext_off:s.target.checked?null:!0}))}
        </div>
      </div>`}_renderExternalTag(e,t){let s=this._externalOf(e,t.summary);return s?n`<span class="tag ext">${Ht("hard-hat")}${s===!0?"Servi\xE7o externo":I(s,26)}</span>`:u}_renderExternalField(e,t=S.DUE_DATE|S.DESCRIPTION){if(!this._extOn())return u;let s=ke(e.ext);return!s&&!O(t,S.DUE_DATE)&&!O(t,S.DUE_DATETIME)&&!O(t,S.DESCRIPTION)?u:n`<div class="field">
        <span class="flabel">Quem faz</span>
        <div class="chip-row ext-row">
          <button class="pick ${s?"":"on"}" @click=${()=>this._setForm({ext:null})}>${Ht("house")}<span>Nós mesmos</span></button>
          <button class="pick ${s?"on":""}" @click=${()=>this._setForm({ext:s||!0})}>${Ht("hard-hat")}<span>Serviço externo</span></button>
        </div>
        ${s?n`<input type="text" class="ext-who" maxlength="60" .value=${s===!0?"":s} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
              @input=${a=>this._setForm({ext:ke(a.target.value)||!0})} />`:u}
      </div>`}};var ct=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,za=6,Ca=[{key:"late",label:"Atrasados",icon:"circle-alert"},{key:"today",label:"Hoje",icon:"clock"},{key:"week",label:"Pr\xF3ximos 7 dias",icon:"calendar-days"},{key:"later",label:"Mais adiante",icon:"calendar"},{key:"none",label:"Sem prazo",icon:"calendar-off"}],Gi=o=>o.status==="completed";function dt(o){return o.map((e,t)=>[e,t]).filter(([e])=>e.n>0).sort((e,t)=>t[0].n-e[0].n||e[1]-t[1]).map(([e])=>e)}function Ia(o,e=!1,t=za){if(e||o.length<=t+1)return{shown:o,more:0,moreN:0};let s=o.slice(t);return{shown:o.slice(0,t),more:s.length,moreN:s.reduce((a,i)=>a+i.n,0)}}function eo(o,e=new Date){let t=X(o,e);return t?t.overdue?"late":t.diff===0?"today":t.diff<7?"week":"later":"none"}var Vt=(o,e)=>o&&e?Math.max(1,Math.round(o/e*100)):0;function to({lists:o=[],due:e=!0,rooms:t=null,equips:s=null,roomsOf:a=()=>[],equipsOf:i=()=>[],extOf:r=()=>null,now:c=new Date}={}){let d=new Set((t||[]).map(b=>b.id)),l=new Map((s||[]).map(b=>[b.id,b])),p=new Map,h=new Map,m=new Map,v=Object.fromEntries(Ca.map(b=>[b.key,0])),w=(b,y)=>b.set(y,(b.get(y)||0)+1),x=0,_=0,k=0,A=0,$=0,M=!1,f=o.map(b=>{let y=(b.items||[]).filter(C=>!Gi(C)),q=b.items?y.length:Number(b.pending)||0;x+=q;let z=e&&!b.noDue;z&&y.length&&(M=!0);for(let C of y){let B=s?[...new Set(i(b.id,C.summary))].filter(N=>l.has(N)):[];if(s&&(B.length?B.forEach(N=>w(h,N)):k++),t){let N=new Set([...a(b.id,C.summary),...B.map(T=>l.get(T).comodo)].filter(T=>d.has(T)));N.size?N.forEach(T=>w(p,T)):_++}let W=r(b.id,C.summary);if(!W)A++;else if($++,typeof W=="string"){let N=m.get(V(W))||{name:W,n:0};N.n++,m.set(V(W),N)}z&&v[eo(C.due,c)]++}return{id:b.id,name:b.name,color:b.color,icon:b.icon,n:q}});return{pending:x,lists:dt(f),rooms:t?{rows:dt(t.map(b=>({id:b.id,name:b.nome,n:p.get(b.id)||0}))),none:_}:null,equips:s?{rows:dt(s.map(b=>({id:b.id,name:b.nome,room:b.room||"",n:h.get(b.id)||0}))),none:k}:null,due:M?Ca.map(b=>({...b,n:v[b.key]})).filter(b=>b.n):null,ext:$?{house:A,ext:$,who:dt([...m.values()])}:null}}var so=o=>o.length>1?`${o.slice(0,-1).join(", ")} e ${o[o.length-1]}`:o[0],Pa=o=>class extends o{_chartsLine(){return`Pend\xEAncias por ${so(["lista",this._roomsOn()&&"c\xF4modo",this._equipsOn()&&"equipamento",this._dueOn()&&"prazo"].filter(Boolean))}.`}_chartsData(e=new Date){let t=this._roomsOn();return to({lists:this._visible(),due:this._dueOn(),rooms:t?this._roomList():null,equips:this._equipsOn()?this._equipList().map(s=>({...s,room:t&&this._roomName(s.comodo)||""})):null,roomsOf:(s,a)=>this._roomIdsOf(s,a),equipsOf:(s,a)=>this._equipIdsOf(s,a),extOf:(s,a)=>this._externalOf(s,a),now:e})}_chartsSearch(e,t){this._haptic("light"),this._query=e,this._searchDone=!1,t==="rooms"&&(this._searchRooms=!0),t==="equips"&&(this._searchEquips=!0),t==="ext"&&(this._searchExt=!0),this._go("/buscar")}_chartsOpen(e){return!!(this._chartsFolds&&this._chartsFolds[e])}_chartsToggle(e){this._chartsFolds={...this._chartsFolds||{},[e]:!this._chartsOpen(e)},this.requestUpdate()}_gPanel(e,t,s,a){return n`<div class="panel g-panel" id="g-${e}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${ct(t)}</span><h2>${s}</h2></div>
        ${a}
      </div>`}_gSplit(e,t){return t.length<2?u:n`<div class="g-split" role="img" aria-label="${e}: ${t.map(s=>`${s.name} ${s.n}`).join(", ")}">
        ${t.map(s=>n`<i class=${s.cls||""} style="flex:${s.n} 1 0;${s.style||""}" title="${s.name}: ${s.n}"></i>`)}
      </div>`}_gRow({name:e,sub:t="",n:s,max:a,pct:i=null,tile:r="",cls:c="",style:d="",go:l=null,label:p=""}){let h=n`${r?n`<span class="g-tile">${ct(r)}</span>`:u}
        <span class="g-name"><b>${e}</b>${t?n`<small>${t}</small>`:u}</span>
        <span class="g-n">${s}</span>
        <span class="g-bar"><i style="width:${Vt(s,a)}%"></i></span>
        ${i!=null?n`<span class="g-pct">${i}%</span>`:u}`,m=`g-row ${r?"":"bare"} ${i!=null?"with-pct":""} ${c}`;return l?n`<button class=${m} style=${d} aria-label=${p||e} @click=${l}>${h}</button>`:n`<div class=${m} style=${d}>${h}</div>`}_gMore(e,t,s,a){if(t.length<=za+1)return u;let i=this._chartsOpen(e);return n`<button class="g-more ${i?"open":""}" aria-expanded=${i?"true":"false"} @click=${()=>this._chartsToggle(e)}>
        <span class="g-more-t">${i?"Ver menos":`+${E(s.more,a[0],a[1])}`}</span>${i?u:n`<span class="g-n">${s.moreN}</span>`}${ct("chevron-down","chev")}
      </button>`}_gLists(e){let t=Ia(e,this._chartsOpen("lists")),s=i=>L(i.color,this._dark),a=[...t.shown.map(i=>({name:i.name,n:i.n,style:s(i)})),...t.more?[{name:`+${E(t.more,"lista","listas")}`,n:t.moreN,cls:"k-rest"}]:[]];return this._gPanel("listas","list-checks","Por lista",n`${this._gSplit("Pendentes por lista",a)}
          ${t.shown.map(i=>this._gRow({name:i.name,n:i.n,max:e[0].n,tile:i.icon,style:s(i),go:()=>this._go(`/lista/${i.id}`),label:`${i.name}: ${E(i.n,"pendente","pendentes")}`}))}
          ${this._gMore("lists",e,t,["lista","listas"])}`)}_gPlaces(e,t,s,a,i){let[r,c,d]=i;if(!a.rows.length)return this._gPanel(e,t,s,n`<p class="panel-lead g-empty">${c}</p>`);let l=Ia(a.rows,this._chartsOpen(e));return this._gPanel(e,t,s,n`${l.shown.map(p=>this._gRow({name:p.name,sub:p.room||"",n:p.n,max:a.rows[0].n,go:()=>this._chartsSearch(p.name,e),label:`${p.name}: ${E(p.n,"pendente","pendentes")}`}))}
          ${this._gMore(e,a.rows,l,d)}
          ${a.none?n`<p class="g-foot">${r}: <b>${a.none}</b></p>`:u}`)}_gDue(e){let t=e.reduce((a,i)=>a+i.n,0),s=Math.max(...e.map(a=>a.n));return this._gPanel("prazos","calendar-clock","Por prazo",n`${this._gSplit("Pendentes por prazo",e.map(a=>({name:a.label,n:a.n,cls:`k-${a.key}`})))}
          ${e.map(a=>this._gRow({name:a.label,n:a.n,max:s,pct:Vt(a.n,t),tile:a.icon,cls:`k-${a.key}`,go:a.key==="none"?null:()=>this._go(""),label:`${a.label}: ${E(a.n,"pendente","pendentes")}`}))}`)}_gWho(e){let t=e.house+e.ext,s=e.who.length?e.who[0].name+(e.who.length>1?` +${e.who.length-1}`:""):"",a=[{key:"house",name:"N\xF3s mesmos",n:e.house,icon:"house"},{key:"ext",name:"Servi\xE7o externo",n:e.ext,icon:"hard-hat",sub:s,go:()=>this._chartsSearch("Servi\xE7o externo","ext")}].filter(i=>i.n);return this._gPanel("quem","hard-hat","Quem faz",n`${this._gSplit("Quem faz",a.map(i=>({name:i.name,n:i.n,cls:`k-${i.key}`})))}
          ${a.map(i=>this._gRow({name:i.name,sub:i.sub,n:i.n,max:Math.max(e.house,e.ext),pct:Vt(i.n,t),tile:i.icon,cls:`k-${i.key}`,go:i.go,label:`${i.name}: ${E(i.n,"pendente","pendentes")}`}))}`)}_renderCharts(){let e=this._chartsData(),t={text:e.pending?`${E(e.pending,"pendente","pendentes")} em ${E(e.lists.length,"lista","listas")}`:"Nada pendente"};return n`<section class="page">
        ${this._renderPageHead("Gr\xE1ficos",t,!0)}
        ${e.pending?n`<div class="g-grid">
              ${this._gLists(e.lists)}
              ${e.rooms?this._gPlaces("rooms","door-open","Por c\xF4modo",e.rooms,["Sem c\xF4modo","Nenhuma pend\xEAncia com c\xF4modo.",["c\xF4modo","c\xF4modos"]]):u}
              ${e.equips?this._gPlaces("equips","package","Por equipamento",e.equips,["Sem equipamento","Nenhuma pend\xEAncia com equipamento.",["equipamento","equipamentos"]]):u}
              ${e.due?this._gDue(e.due):u}
              ${e.ext?this._gWho(e.ext):u}
            </div>`:n`<div class="panel">
              <div class="empty">
                <div class="em-icon">${ct("chart-bar")}</div>
                <h3>Tudo resolvido</h3>
                <p>Nenhum item pendente nas listas.</p>
              </div>
            </div>`}
      </section>`}},Ra=`
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
`;var pt=o=>String(o).padStart(2,"0"),ht=o=>`${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`;function ao(o,e=new Date){let t=new Date(o&&o.em);if(!o||Number.isNaN(t.getTime()))return"";let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()-1),a=ht(t)===ht(e)?"hoje":ht(t)===ht(s)?"ontem":`em ${pt(t.getDate())}/${pt(t.getMonth()+1)}`;return`${o.cliente} usou ${a} \xE0s ${pt(t.getHours())}:${pt(t.getMinutes())}.`}var Da=o=>class extends o{async _loadCorreria(){if(!(!this.hass||!this.hass.resolvia)){try{this._correria=await this.hass.callWS({type:"resolvia/correria/get"})}catch{this._correria=null}this.requestUpdate()}}async _setCorreria(e){this._haptic("light"),await this._saveAppPrefs({correria_on:e?!0:null}),await this._loadCorreria()}_renderCorreriaPanel(){if(!this.hass.resolvia)return u;let e=this._app("correria_on",!1)===!0,t=ao(this._correria&&this._correria.ultimo);return n`<div class="panel" id="correria">
        ${this._secHead("zap","CorrerIA","O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini.")}
        <div class="row switch-row">
          <div class="grow"><div class="label">Usar com o CorrerIA</div><div class="hint" style="white-space:normal">${e?"Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas.":"Desligado."}</div></div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._setCorreria(s.target.checked)} aria-label="Usar com o CorrerIA" /><span class="track"></span></label>
        </div>
        ${e?n`<div class="ai-state ${t?"ok":""}" style="margin-bottom:16px"><span class="dot"></span><div>${t?n`<b>${t}</b>`:n`<b>Nenhum uso ainda</b><span>Conecte no app CorrerIA.</span>`}</div></div>`:u}
      </div>`}};var Fa=["janeiro","fevereiro","mar\xE7o","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],La=["D","S","T","Q","Q","S","S"],io=["domingo","segunda","ter\xE7a","quarta","quinta","sexta","s\xE1bado"],oo=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],_e=o=>String(o).padStart(2,"0"),Na=(o,e,t)=>`${o}-${_e(e)}-${_e(t)}`;function Ha(o,e=new Date){return/^\d{4}-\d{2}/.test(o||"")?o.slice(0,7):`${e.getFullYear()}-${_e(e.getMonth()+1)}`}function Bt(o,e){let[t,s]=o.split("-").map(Number),a=new Date(t,s-1+e,1);return`${a.getFullYear()}-${_e(a.getMonth()+1)}`}function Ut(o){let[e,t]=o.split("-").map(Number),s=Fa[t-1];return`${s.charAt(0).toUpperCase()}${s.slice(1)} de ${e}`}function ro(o){let[e,t,s]=o.split("-").map(Number);return`${io[new Date(e,t-1,s).getDay()]}, ${s} de ${Fa[t-1]} de ${e}`}function no(o,e=0){let[t,s]=o.split("-").map(Number),a=(new Date(t,s-1,1).getDay()-e+7)%7,i=new Date(t,s,0).getDate(),r=Array.from({length:a},()=>null);for(let c=1;c<=i;c++)r.push(Na(t,s,c));for(;r.length%7;)r.push(null);return r}function Va({icon:o,month:e,value:t,today:s,onPick:a,onMonth:i,min:r="",max:c="",weekStart:d=0,months:l=!1,onMonths:p=null}){let[h]=e.split("-").map(Number),m=k=>(!r||k>=r)&&(!c||k<=c),v=(k,A,$)=>n`<button type="button" class="icon-btn cal-nav" aria-label=${A} ?disabled=${!$} @click=${()=>i(Bt(e,k))}>${o(k<0?"chevron-left":"chevron-right")}</button>`;if(l&&p){let k=A=>(!c||`${h}-${_e(A+1)}-01`<=c)&&(!r||Na(h,A+1,new Date(h,A+1,0).getDate())>=r);return n`<div class="cal" role="group" aria-label="Escolher o mês">
      <div class="cal-head">
        ${v(-12,"Ano anterior",!r||Number(r.slice(0,4))<h)}
        <button type="button" class="cal-title" aria-label="Voltar aos dias" @click=${()=>p(!1)}>${h}</button>
        ${v(12,"Pr\xF3ximo ano",!c||Number(c.slice(0,4))>h)}
      </div>
      <div class="cal-months">
        ${oo.map((A,$)=>{let M=`${h}-${_e($+1)}`,f=!!t&&t.slice(0,7)===M;return n`<button type="button" class="cal-month ${f?"on":""} ${s&&s.slice(0,7)===M?"today":""}" aria-pressed=${f?"true":"false"} ?disabled=${!k($)} @click=${()=>(i(M),p(!1))}>${A}</button>`})}
      </div>
    </div>`}let w=Bt(e,-1),x=`${w}-${_e(new Date(Number(w.slice(0,4)),Number(w.slice(5,7)),0).getDate())}`,_=`${Bt(e,1)}-01`;return n`<div class="cal" role="group" aria-label="Escolher a data">
    <div class="cal-head" data-month=${e}>
      ${v(-1,"M\xEAs anterior",!r||x>=r)}
      ${p?n`<button type="button" class="cal-title" aria-live="polite" aria-label=${`${Ut(e)}: escolher o m\xEAs`} @click=${()=>p(!0)}>${Ut(e)}</button>`:n`<b class="cal-title" aria-live="polite">${Ut(e)}</b>`}
      ${v(1,"Pr\xF3ximo m\xEAs",!c||_<=c)}
    </div>
    <div class="cal-grid">
      ${La.map((k,A)=>n`<span class="cal-wd" aria-hidden="true">${La[(A+d)%7]}</span>`)}
      ${no(e,d).map(k=>k?n`<button type="button" class="cal-day ${k===t?"on":""} ${k===s?"today":""}" data-d=${k} aria-pressed=${k===t?"true":"false"} aria-current=${k===s?"date":u} aria-label=${ro(k)} ?disabled=${!m(k)} @click=${()=>a(k)}>${Number(k.slice(8))}</button>`:n`<span class="cal-gap"></span>`)}
    </div>
  </div>`}var Ba=`
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
`;var jt="2.56.1",Ua="resolvia.theme",Wt="resolvia.prefs",ut="resolvia.lastList",g=(o,e="")=>n`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${H(D[o]||D["list-checks"])}</svg>`,ae={get(o,e){try{let t=localStorage.getItem(o);return t==null?e:JSON.parse(t)}catch{return e}},set(o,e){try{localStorage.setItem(o,JSON.stringify(e))}catch{}}},U=o=>o.status==="completed",ja=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],R=o=>o.uid||o.summary,Re=["listas","graficos","config","sobre"],Z="08:00",Yt=class extends Da(Pa(Oa(Ta(ka(wa(ba(ga(le)))))))){static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_alertPeople:{state:!0},_people:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_searchRooms:{state:!0},_searchEquips:{state:!0},_searchExt:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_folds:{state:!0},_sel:{state:!0},_bsel:{state:!0},_rules:{state:!0},_cam:{state:!0},_rooms:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[Ws,Is,J(ea),J(ra),J(sa),J(Ma),J(Ra),J(Ba)];constructor(){super(),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._searchRooms=!0,this._searchEquips=!0,this._searchExt=!0,this._theme=ae.get(Ua,"auto"),this._doneOpen={},this._folds={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),Bs(),this._today=new Date().toDateString(),this._dayTimer=setInterval(()=>{let e=new Date().toDateString();e!==this._today&&(this._today=e,this.requestUpdate())},6e4),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=e=>{if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey||this._sheet)return;let t=e.composedPath&&e.composedPath()[0]||e.target;t&&t.closest&&t.closest("input, textarea, select, [contenteditable]")||(e.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let e=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(e){this._focusSearch=!1,e.focus({preventScroll:!0});try{e.setSelectionRange(e.value.length,e.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._dayTimer),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,e]of this._subs)this._unsub(e);this._subs.clear();for(let[,e]of this._recent)clearTimeout(e);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(e=>e&&e()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this.hass||t.themes!==this.hass.themes||t.entities!==this.hass.entities||t.devices!==this.hass.devices||t.user!==this.hass.user||t.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(i=>i.startsWith("todo.")),a=Object.keys(t.states).filter(i=>i.startsWith("todo."));return s.length!==a.length?!0:s.some(i=>t.states[i]!==this.hass.states[i])}willUpdate(e){e.has("route")&&this.route&&(this._path=this.route.path||""),e.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints(),this._loadRooms(),this._loadExternal()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(e.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}updated(e){this.toggleAttribute("dark",this._dark),this._chatAfterRender();let t=this._view();if(t.old!=null&&e.has("_path")){this._go(t.old,!0,history.state&&history.state.rvUp?{rvUp:!0}:null);return}if(e.has("_path")&&t.name==="config"){let s=this.renderRoot.querySelector(".more-tabs"),a=s&&s.querySelector("button.on");if(a){let r=a.offsetLeft,c=r+a.offsetWidth;r<s.scrollLeft?s.scrollLeft=r-8:c>s.scrollLeft+s.clientWidth&&(s.scrollLeft=c-s.clientWidth+8)}let i=this._configTab();i==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadRooms(),this._loadExternal(),this._loadUsage(),this._loadCorreria()),i==="dados"&&this._loadBackups()}this._view().name==="search"&&(this._focusSearch||e.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="home"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}firstUpdated(){this._checkHeight();let e=Qt();e&&!this._inHA()&&this._go(e,e==="/prazos")}_checkHeight(){if(this.hasAttribute("vh"))return;let e=this.getBoundingClientRect().height;(e>window.innerHeight+4||e<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(e=>e.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let e=this._todoIds();for(let t of e)this._subs.has(t)||this._subscribe(t);for(let[t,s]of[...this._subs])if(!e.includes(t)){this._unsub(s),this._subs.delete(t),this._polling.delete(t);let a=new Map(this._items);a.delete(t),this._items=a}}_subscribe(e){let t=this.hass.connection.subscribeMessage(s=>this._setItems(e,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:e}).catch(()=>(this._polling.add(e),this._fetchItems(e),null));this._subs.set(e,t)}_unsub(e){Promise.resolve(e).then(t=>typeof t=="function"&&t()).catch(()=>{})}async _fetchItems(e){try{let t=await this.hass.callWS({type:"todo/item/list",entity_id:e});this._setItems(e,t&&t.items||[])}catch{this._setItems(e,this._items.get(e)||[])}}_refreshPolled(e){if(!(!e||!this._polling.size))for(let t of this._polling)e.states[t]!==this.hass.states[t]&&this._fetchItems(t)}_setItems(e,t){let s=new Map(this._items);s.set(e,t),this._items=s}_patchItem(e,t,s){let a=this._items.get(e);a&&this._setItems(e,a.map(i=>R(i)===t?{...i,...s}:i))}_computeLists(){let e=this._prefs&&this._prefs.lists||{},t=!this._dueOn(),a=this._todoIds().map(i=>{let r=this.hass.states[i],c=ha(this.hass,i);return{id:i,st:r,meta:c}});return a.sort((i,r)=>(i.meta.group||"").localeCompare(r.meta.group||"","pt-BR")||i.meta.name.localeCompare(r.meta.name,"pt-BR")),a.map(({id:i,st:r,meta:c},d)=>{let l=e[i]||{},p=this._items.get(i),h=p?p.filter(M=>!U(M)):null,m=h?h.length:Number(r.state)||0,v=p?p.length-h.length:0,w=pe(l.color)||ca(d),x=r.attributes.supported_features||0,_=O(x,S.DUE_DATE)||O(x,S.DUE_DATETIME),k=!_||l.dates_info===!0,A=k||t,$=h&&!A?h.map(M=>X(M.due)).filter(Boolean):[];return{id:i,name:l.name||c.name,origName:c.name,group:c.group,color:w,colorId:l.color||null,icon:l.icon||Ct(`${c.name} ${c.group||""} ${i}`),iconPref:l.icon||null,hidden:!!l.hidden,owner:l.owner||null,features:x,canDue:_,datesInfo:k,noDue:A,hasDates:!!(p&&p.some(M=>M.due)),unavailable:r.state==="unavailable"||r.state==="unknown",items:p,pending:m,done:v,late:$.filter(M=>M.overdue).length,today:$.filter(M=>!M.overdue&&M.diff===0).length}})}_list(e){return this._L.find(t=>t.id===e)}_visible(){return this._L.filter(e=>!e.hidden)}_app(e,t){let s=this._prefs&&this._prefs.app?this._prefs.app[e]:void 0;return s===void 0?t:s}_accentDaily(){return this._app("accent_daily",!0)!==!1}_accent(){return this._accentDaily()?aa(te,new Date):pe(this._app("accent","vermelho"))||te[0]}async _loadPrefs(){try{let e=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:e.lists||{},app:e.app||{}},this._prefsRemote=!0}catch{this._prefs=ae.get(Wt,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(e,t){let s={...this._prefs.lists},a={...s[e]||{}};for(let[i,r]of Object.entries(t))r===null||r===""?delete a[i]:a[i]=r;if(Object.keys(a).length?s[e]=a:delete s[e],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let i=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:e,prefs:t});this._prefs={lists:i.lists||{},app:i.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else ae.set(Wt,this._prefs)}async _saveAppPrefs(e){let t={...this._prefs.app};for(let[s,a]of Object.entries(e))a===null||a===""?delete t[s]:t[s]=a;if(this._prefs={...this._prefs,app:t},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:e});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else ae.set(Wt,this._prefs)}_setTheme(e){this._theme=e,ae.set(Ua,e)}_inHA(){return!!this.route}_view(){let e=(this._path||"").replace(/\/+$/,""),t;if(t=e.match(/^\/lista\/(todo\.[^/]+)$/))return{name:"list",id:decodeURIComponent(t[1])};if(e==="/minhas-listas")return{name:"lists"};if(e==="/prazos"||e==="/sugestoes")return{name:"home",old:""};if(e==="/buscar")return{name:"search"};if(e==="/mais")return{name:"more"};if(e==="/listas")return{name:"listas"};if(e==="/graficos")return{name:"graficos"};if(e==="/sobre")return{name:"sobre"};if(t=e.match(/^\/config(?:\/(integracoes|dados|aparencia|opcoes))?$/))return{name:"config",tab:t[1]||"integracoes"};if(e==="/repeticoes")return{name:"config",tab:"opcoes",old:"/config/opcoes"};if(t=e.match(/^\/mais\/(repeticoes|integracoes|ia|dados|aparencia|opcoes)$/)){let s=t[1]==="ia"?"integracoes":t[1]==="repeticoes"?"opcoes":t[1];return{name:"config",tab:s,old:this._configPath(s)}}return{name:"home"}}_configPath(e){return e==="integracoes"?"/config":`/config/${e}`}_go(e,t=!1,s=null){this._sheet&&this._closeSheet(!0);let a=(history.state&&history.state.rvDepth||0)+(t?0:1),i={...s||{},rvDepth:a};if(this._inHA()){let c=`/${this.panel&&this.panel.url_path||"resolvia"}${e}`;t?history.replaceState(i,"",c):history.pushState(i,"",c),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:t}}))}else i.rvPath=e,t?history.replaceState(i,""):history.pushState(i,""),this._path=e;let r=this.renderRoot&&this.renderRoot.querySelector("main");r&&r.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_fromMenu(){return Re.includes(this._view().name)&&!!(history.state&&history.state.rvUp)}_toMenu(){this._fromMenu()?history.back():this._go("/mais",!0)}_openFromMenu(e){if(this._haptic("light"),e==="relatorio")return this._openReport();this._go(e,!1,{rvUp:!0})}_openReport(){let e=this.hass&&this.hass.resolvia;if(!e||!e.report)return this._showToast("Na pr\xE9via o relat\xF3rio n\xE3o abre. No app, ele abre pronto para imprimir.");let t=new URLSearchParams({tema:this._dark?"escuro":"claro",cor:this._accent().fill});location.href=e.report(t.toString())}_onSwipeStart(e){this._sw=this._sheet||this._cam?null:Us(e)}_onSwipeEnd(e){let t=js(e,this._sw);if(this._sw=null,!t||this._sheet)return;let s=[["home",""],["search","/buscar"],["lists","/minhas-listas"],["more","/mais"]],a=this._view().name;if(a==="list"){if(t>0)return;this._haptic("light"),this._back(),Ge(this,"lists",t);return}if(Re.includes(a)){if(t>0)return;this._haptic("light"),this._toMenu(),Ge(this,"more",t);return}let i=s.findIndex(([c])=>c===a),r=i+t;i<0||r<0||r>=s.length||(this._haptic("light"),this._goTab(s[r][1]),Ge(this,s[r][0],t))}_goTab(e){let t=this._view().name;if(Re.includes(t)){if(e==="/mais")return this._toMenu();if(this._fromMenu())return e===""?history.go(-2):(this._afterPop=e,history.back())}if(e===""){if(t==="home"){let a=this.renderRoot.querySelector("main");a&&a.scrollTo({top:0});return}let s=history.state&&history.state.rvDepth||0;s>0?(this._afterPop="",history.go(-s)):this._go("",!0);return}this._go(e,t!=="home"&&t!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"");let e=this._afterPop;this._afterPop=null,e!=null&&this._go(e,!0)}_openSheet(e,t=null){let s=!!this._sheet;if(this._sheet=e,this._form=t,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(e=!1){this._sheet&&(this._stopVoice(),this._chatStop(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(e?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/config"),this.updateComplete.then(()=>{let e=this.renderRoot.querySelector("#leitura-ia");e&&e.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(e){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(e);history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(e){if(this.env&&this.env.haptic)return this.env.haptic(e);window.dispatchEvent(new CustomEvent("haptic",{detail:e}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(e=>this._rules=e&&e.rules||[],{type:"resolvia/recurring/subscribe"}).then(e=>(this._rulesOk=!0,e)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let e=this._app("repeat_on",void 0);return e===void 0?this._rules.length>0:e===!0}_ruleFor(e,t){return!t||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===e&&s.uid&&s.uid===t.uid)||t.status!=="completed"&&this._rules.find(s=>s.entity_id===e&&!s.uid&&s.match===t.summary)||null}_everyLabel(e){return e===1?"todo dia":e===7?"toda semana":e===14?"a cada 2 semanas":e===30?"todo m\xEAs":`a cada ${e} dias`}_returnLabel(e){let t=new Date(e),s=X(de(t));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(e,t=Date.now()){let s=new Date(t);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+e).getTime()}_setRule(e,{uid:t,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:e,uid:t||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(e,t=null){clearTimeout(this._toastTimer),this._toast={text:e,action:t,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,t?4500:Math.min(8e3,Math.max(2600,e.length*55)))}async _call(e,t,s){try{return await this.hass.callService("todo",e,t,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",e,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(e,t){if(!O(e.features,S.UPDATE))return;let s=R(t),a=!U(t),i=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(e.id,s,{status:i}),!await this._call("update_item",{item:s,status:i},e.id)){this._patchItem(e.id,s,{status:t.status});return}let c=this._pointsOf(e.id,t.summary,t.uid),d=this._mirrored(e.id,t.uid);if(a){let l=this._ruleFor(e.id,t),p=l?` \xB7 volta ${this._returnLabel(this._reopenAt(l.days))}`:"",h={label:"Desfazer",run:()=>{this._patchItem(e.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},e.id),(c||d)&&this._takePoints(e,t)}};c?this._givePoints(e,t,`Resolvido: ${I(t.summary,18)}`,h):this._showToast(`Resolvido: ${I(t.summary,l?22:30)}${p}${d?" \xB7 volta com a pr\xF3xima data":""}`,h)}else(c||d)&&this._takePoints(e,t)}_quickAdd(e,t){e.preventDefault();let s=e.currentTarget.querySelector("input");this._addLines(t,[s.value],s)}_onQuickPaste(e,t){let s=e.clipboardData&&e.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(e.preventDefault(),this._addLines(t,s.split(/\r?\n/),e.currentTarget))}async _addLines(e,t,s){let a=t.map(r=>r.trim()).filter(Boolean);if(!a.length)return;let i=s.value;s.value="",s.focus(),this._haptic("light");for(let r of a)if(!await this._call("add_item",{item:r},e.id)){s.value=i||r;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(e,t,s,a){let i=e.features;return t?s&&O(i,S.DUE_DATETIME)?{due_datetime:`${t} ${s}:00`}:O(i,S.DUE_DATE)?{due_date:t}:O(i,S.DUE_DATETIME)?{due_datetime:`${t} ${s||"09:00"}:00`}:{}:a?O(i,S.DUE_DATE)?{due_date:null}:O(i,S.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(e,{summary:t,description:s,date:a,time:i}){let r={item:t,...this._dueFields(e,a,i,!1)};return s&&O(e.features,S.DESCRIPTION)&&(r.description=s),this._call("add_item",r,e.id)}_openAdd(e){let t=this._visible().filter(i=>O(i.features,S.CREATE)&&!i.unavailable),s=ae.get(ut,null),a=e&&this._list(e)&&O(this._list(e).features,S.CREATE)&&e||t.find(i=>i.id===s)&&s||t[0]&&t[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1,room:null,equips:[],ext:null}),this.updateComplete.then(()=>{let i=this.renderRoot.querySelector(".sheet textarea");i&&i.focus()})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(e=!0){let t=this.hass&&this.hass.resolvia;if(!(!t||!t.aiStatus)&&!(!e&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await t.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(e){await this._saveAppPrefs({ai_entity:e||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let e=this._aiInfo();return Gs({u:this._usage,day:this._usageDay,onDay:t=>(this._usageDay=t,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","As chamadas do app para a IA. Os tokens s\xE3o estimados."),app:"ResolvIA",using:e.using&&e.using.id||"",names:Object.fromEntries((e.entities||[]).map(t=>[t.id,t.name]))})}_dueOn(){return!this._app("due_off",!1)}_notesOn(){return!this._app("notes_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(e){let t=a=>{let i=a&&this._list(a);return i&&O(i.features,S.CREATE)&&!i.unavailable?a:null},s=this._visible().filter(a=>O(a.features,S.CREATE)&&!a.unavailable);return t(e)||t(ae.get(ut,null))||s[0]&&s[0].id||null}_openImport(e,t="pick"){let s=this._importTarget(e);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:t==="text"?"text":t==="voice"?"voice":"pick",rec:t==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),t==="photos"&&this._pickFiles("photos"),t==="scan"&&this._openCamera(),t==="text"&&this._focusImportText(),t==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(e=!1){try{this._voice=await this.hass.resolvia.voiceStatus(e)}catch(t){this._voice={ready:!1,reason:t.message}}this.requestUpdate()}async _chooseVoice(e){await this._saveAppPrefs({voice_engine:e||null}),await this._loadVoice(!0),this._showToast("Fala para texto atualizada")}_renderVoicePanel(){let e=this._voice,t=this._app("voice_engine","")||"",s=e&&e.options||[],a=!e||this._voiceChecking,i=a?"off":e.ready&&!e.missing?"ok":e.ready?"warn":"bad",r=a?"Verificando\u2026":e.ready?"Pronto para ouvir":"Sem fala para texto",c=a?"":e.ready?`Transcreve com ${e.name}.${e.missing?" O escolhido n\xE3o foi encontrado: usando o autom\xE1tico.":""}`:e.reason||"",d=async()=>{this._voiceChecking=!0,this.requestUpdate(),await this._loadVoice(!0),this._voiceChecking=!1,this.requestUpdate()};return n`<div class="panel" id="falar">
      ${this._secHead("mic","Falar","Quem transforma a fala em texto. N\xE3o muda o assistente de voz do Home Assistant.")}
      <div class="ai-state ${i}"><span class="dot"></span><div><b>${r}</b>${c?n`<span>${c}</span>`:u}</div></div>
      ${s.length||t?n`<label class="field" style="margin:14px 0 0">
            <span class="flabel">Fala para texto</span>
            <select class="select" aria-label="Fala para texto" @change=${l=>this._chooseVoice(l.target.value)}>
              <option value="" ?selected=${!t}>Automático${e&&e.auto?`: ${e.auto.name}`:""}</option>
              ${s.map(l=>n`<option value=${l.id} ?selected=${l.id===t}>${l.name}</option>`)}
              ${t&&!s.some(l=>l.id===t)?n`<option value=${t} selected>${t} (não encontrado)</option>`:u}
            </select>
          </label>`:u}
      <div class="ai-actions"><button class="btn outline" ?disabled=${a} @click=${d}>${g("rotate-ccw")}Verificar de novo</button></div>
      ${e&&!e.ready?n`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>Com o Home Assistant Cloud, a fala para texto já vem pronta.</li>
              <li>Sem ele, instale um motor de fala: o app Whisper (local, de graça) com a integração Wyoming, ou a fala para texto de uma IA como Google Gemini ou OpenAI.</li>
              <li>Volte aqui, toque em Verificar de novo e escolha o motor na lista.</li>
            </ol>
          </div>`:u}
    </div>`}_renderMicBtn(e=null){return!this._aiOn()||!this._voice||!this._voice.ready?u:n`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(e,"voice")}>${g("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let e=new ye(t=>this._voiceLevel=t);this._rec=e;try{await e.start()}catch(t){e.cancel(),this._rec===e&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:lt(t)});return}if(this._rec!==e||!this._form||this._form.step!=="voice")return e.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==e)return clearInterval(this._recTimer);let t=e.seconds();this._setForm({secs:t,level:this._voiceLevel||0}),t>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let e=this._rec;if(!e)return;clearInterval(this._recTimer),this._rec=null;let t=e.stop();if(t.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(t);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(e){let t=this._form,s=this._voice||{},a=t.rec==="on",i=Math.floor((t.secs||0)/60),r=String(Math.floor((t.secs||0)%60)).padStart(2,"0"),c=this._list(t.target);return n`
      ${e("Falar")}
      <div class="voice ${a?"on":""}">
        <button class="voice-mic" style="--lvl:${a?(t.level||0).toFixed(2):0}" aria-label=${a?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>a?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${g(a?"check":"mic")}
        </button>
        <div class="voice-state">${a?n`<b>Ouvindo…</b> <span class="voice-time">${i}:${r}</span>`:t.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${a?"Toque de novo quando terminar.":n`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${c?n`<p class="voice-hint">Vai para <b>${c.name}</b> (dá para trocar na revisão).</p>`:u}
      </div>
      ${t.error?n`<div class="imp-error">${g("circle-alert")}<span>${t.error}</span></div>`:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" ?disabled=${!a} @click=${()=>this._finishVoice()}>${g("sparkles")}Pronto</button>
      </div>
      ${s.ready?u:n`<p class="sheet-note">${s.reason||""}</p>`}
    `}_focusImportText(){this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".sheet textarea");e&&e.focus()})}_pickFiles(e){let t=this.renderRoot.querySelector(e==="scan"?"#rv-scan":"#rv-photos");t&&(t.value="",t.click())}_releaseImages(){let e=this._form;if(e&&e.images)for(let t of e.images)t.url&&URL.revokeObjectURL(t.url)}_camOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(e){let t=[...e.target.files||[]].filter(i=>!i.type||i.type.startsWith("image/")).slice(0,6);if(e.target.value="",!t.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let s=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:s?"review":"pick"});let a=[];for(let i of t)a.push(await Dt(i));this._readImages(a,s)}_readImages(e,t){if(this._sheet!=="import"||!e.length)return;let s=t?[...this._form.images||[],...e]:(this._releaseImages(),e);this._setForm({step:"loading",images:s,prevStep:t?"review":"pick",loadingText:e.length>1?`Lendo ${e.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:e,appending:t})}async _runExtract({text:e,images:t,appending:s=!1}){let a=this._importToken=Date.now(),i=this._list(this._form.target),r=()=>a===this._importToken&&this._sheet==="import",c=s?this._form.items||[]:[],d=(l,p=[],h=[],m=[])=>{let v=new Set(c.map(_=>_.text.trim().toLowerCase())),w=(_,k)=>k||_&&this._roomsOn()&&(this._equipOf(_)||{}).comodo||null,x=l.map((_,k)=>({text:_,on:!0,list:p[k]||null,room:w(m[k],h[k]),equip:m[k]||null})).filter(_=>!v.has(_.text.trim().toLowerCase()));return[...c,...x]};try{let l=await this.hass.resolvia.extract({text:e,images:t?t.map(({data:h,mime:m})=>({data:h,mime:m})):void 0,list_name:i?i.name:void 0,lists:this._importTargets().map(h=>({id:h.id,name:h.name}))});if(!r())return;let p=l.items||[];if(!p.length){let h=e?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:h}):this._setForm({step:e?"text":"pick",error:h});return}this._haptic("success"),this._setForm({step:"review",items:d(p,l.lists||[],l.rooms||[],l.equips||[]),provider:l.provider||null,note:null,error:null})}catch(l){if(!r())return;if(e){let p=Rt(e);if(p.length){this._setForm({step:"review",items:d(p),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:l.message||"Algo deu errado"}):this._setForm({step:e?"text":"pick",error:l.message||"Algo deu errado"})}}async _openCamera(){let e=navigator.mediaDevices,t=!!(this._form&&this._form.step==="review");if(!e||!e.getUserMedia){this._cam={status:"error",shots:[],appending:t,flash:0,error:window.isSecureContext===!1?"A c\xE2mera aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher.":"Este navegador n\xE3o deixa o app usar a c\xE2mera. Escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher."};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}return}this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:t,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let s=await e.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){s.getTracks().forEach(c=>c.stop());return}this._stream=s;let a=s.getVideoTracks()[0],i=a&&a.getCapabilities?a.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!i.torch},await this.updateComplete;let r=this.renderRoot.querySelector(".cam video");r&&(r.srcObject=s,r.play().catch(()=>{}))}catch(s){if(!this._cam)return;let a=s&&(s.name==="NotAllowedError"||s.name==="SecurityError");this._cam={...this._cam,status:"error",error:a?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(e=>e.stop()),this._stream=null}_closeCamera(e=!1){if(!this._cam)return;this._stopStream();let t=this._cam.shots||[];if(!this._cam.used)for(let s of t)URL.revokeObjectURL(s.url);this._cam=null,!e&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let e=this._stream&&this._stream.getVideoTracks()[0];if(!e)return;let t=!this._cam.torch;try{await e.applyConstraints({advanced:[{torch:t}]}),this._cam={...this._cam,torch:t}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let e=this.renderRoot.querySelector(".cam video");if(!e||!e.videoWidth||!this._cam||this._cam.shots.length>=6)return;let t=1800,s=Math.min(1,t/Math.max(e.videoWidth,e.videoHeight)),a=document.createElement("canvas");a.width=Math.round(e.videoWidth*s),a.height=Math.round(e.videoHeight*s),a.getContext("2d").drawImage(e,0,0,a.width,a.height);let i=await new Promise(c=>a.toBlob(c,"image/jpeg",.86));if(!i||!this._cam)return;let r=await Dt(i,t);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,r],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let e=this._cam.shots,t=this._cam.appending;this._cam={...this._cam,used:!0},this._closeCamera(),this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(e,t&&this._form.step==="review")}_cameraFallback(){let e=this._cam&&this._cam.appending;this._closeCamera(),e&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let e=this._cam;if(!e)return u;let t=e.shots.length;return n`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${e.flash?n`<div class="cam-flash" .key=${e.flash}></div>`:u}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${g("x")}</button>
          <span class="cam-title">Digitalizar com IA</span>
          ${e.torchOk?n`<button class="cam-btn ${e.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${g("zap")}</button>`:n`<span class="cam-btn ghost"></span>`}
        </div>
        ${e.status==="error"?n`<div class="cam-msg">
              ${g("camera")}
              <p>${e.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${g("images")}Escolher foto</button>
            </div>`:n`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${e.status==="starting"?"Abrindo a c\xE2mera\u2026":t?`${E(t,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${e.shots.slice(-3).map(s=>n`<img src=${s.url} alt="" />`)}${t>3?n`<span>+${t-3}</span>`:u}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${e.status!=="live"||t>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!t} @click=${()=>this._useShots()}>Pronto${t?` (${t})`:""}</button>
        </div>
      </div>
    `}_readText(){let e=(this._form.text||"").trim();if(!e){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:e});return}let t=Rt(e);t.length?this._setForm({step:"review",items:t.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}_clipOk(){return!!(navigator.clipboard&&navigator.clipboard.readText)&&!this._clipFailed}async _pasteClipboard(){let e="";try{e=await navigator.clipboard.readText()}catch{this._clipFailed=!0,this._focusImportText(),this._showToast("Este aparelho n\xE3o deixa o app ler o que foi copiado. Toque e segure no campo e escolha Colar."),this.requestUpdate();return}if(!e){this._focusImportText(),this._showToast("N\xE3o h\xE1 nada copiado.");return}this._setForm({text:e,error:null})}_setImportItem(e,t){let s=this._form.items.slice();s[e]={...s[e],...t},this._setForm({items:s})}_importTargets(){let e=this._form||{};return this._L.filter(t=>O(t.features,S.CREATE)&&!t.unavailable&&(!t.hidden||t.id===e.target))}_importListOf(e){let t=this._importTargets();return e.list&&t.some(s=>s.id===e.list)&&e.list||this._form.target}async _importAdd(){let e=this._form,t=this._list(e.target),s=e.items.filter(c=>c.on&&c.text.trim()).map(c=>({...c,dest:this._importListOf(c)}));if(!t||!s.length)return;ae.set(ut,t.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0,i=new Set;for(let c of s)if(await this._call("add_item",{item:c.text.trim()},c.dest))a++,i.add(c.dest),c.room&&this._roomsOn()&&await this._setTaskRoom(c.dest,c.text.trim(),c.room==="*"?this._roomList().map(d=>d.id):c.room),c.equip&&this._equipsOn()&&await this._setTaskEquip(c.dest,c.text.trim(),c.equip);else break;if(!a)return;let r=i.size===1?this._list([...i][0]):null;this._showToast(`${E(a,"item adicionado","itens adicionados")} ${r?`em ${I(r.name,24)}`:`em ${i.size} listas`}`)}_openEdit(e,t){let s=K(t.due),a=this._ruleFor(e.id,t),i=a?a.days:0;this._openSheet("item",{mode:"edit",listId:e.id,key:R(t),target:e.id,summary:t.summary||"",description:ve(t.description),hadNotes:!!ve(t.description).trim(),mirrored:this._mirrored(e.id,t.uid),due:t.due||null,date:s?s.date:null,time:s?s.time:null,repeat:i,repeatOrig:i,repeatCustom:!!i&&!ja.some(r=>r.days===i),points:this._rawPoints(e.id,t.summary),pointsOrig:this._rawPoints(e.id,t.summary),room:this._roomIdOf(e.id,t.summary),rooms:this._roomIdsOf(e.id,t.summary),roomsOrig:this._roomIdsOf(e.id,t.summary),equips:this._equipIdsOf(e.id,t.summary),equipsOrig:this._equipIdsOf(e.id,t.summary),ext:this._externalRaw(e.id,t.summary),extOrig:this._externalRaw(e.id,t.summary)}),this._loadPoints()}_setForm(e){this._form={...this._form,...e}}async _saveItem(){let e=this._form,t=(e.summary||"").trim();if(!t){let p=this.renderRoot.querySelector(".sheet textarea");p&&p.focus();return}let s=(e.description||"").trim(),a=this._list(e.target);if(e.mode==="add"){if(!a)return;ae.set(ut,a.id),this._closeSheet(),this._haptic("light");let p=await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time});p&&e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),p&&e.points&&await this._setTaskPoints(a.id,t,e.points),p&&await this._saveTaskPlace(a.id,t,e),p&&await this._saveTaskExternal(a.id,t,e),p&&this._view().id!==a.id&&this._showToast(`Adicionado em ${I(a.name,28)}`);return}let i=this._list(e.listId),r=i&&i.items&&i.items.find(p=>R(p)===e.key);if(!i||!r){this._closeSheet();return}if(a&&a.id!==i.id){this._closeSheet(),await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time})&&(e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),e.repeatOrig&&await this._setRule(i.id,{uid:r.uid,summary:r.summary,days:null}),e.points&&await this._setTaskPoints(a.id,t,e.points),e.pointsOrig&&await this._setTaskPoints(i.id,r.summary,0),await this._saveTaskPlace(a.id,t,{...e,roomsOrig:[],equipsOrig:[]}),(e.roomsOrig||[]).length&&await this._setTaskRoom(i.id,r.summary,null),(e.equipsOrig||[]).length&&await this._setTaskEquip(i.id,r.summary,null),await this._saveTaskExternal(a.id,t,{...e,extOrig:null}),e.extOrig&&await this._setTaskExternal(i.id,r.summary,null),await this._call("remove_item",{item:[e.key]},i.id),this._showToast(`Movido para ${I(a.name,28)}`));return}let c={item:e.key};if(t!==r.summary&&(c.rename=t),O(i.features,S.DESCRIPTION)&&s!==ve(r.description)){let p=xa(r.description);c.description=p?`${s}${s?" ":""}${p}`:s||null}let d=K(r.due);((d?d.date:null)!==(e.date||null)||(d?d.time:null)!==(e.time||null))&&Object.assign(c,this._dueFields(i,e.date,e.time,!0)),this._closeSheet(),((e.points||0)!==(e.pointsOrig||0)||e.pointsOrig&&t!==r.summary)&&await this._setTaskPoints(i.id,t,e.points||0,t!==r.summary?r.summary:null),await this._saveTaskPlace(i.id,t,e,t!==r.summary?r.summary:null),await this._saveTaskExternal(i.id,t,e,t!==r.summary?r.summary:null),(e.repeat||0)!==(e.repeatOrig||0)&&(await this._setRule(i.id,{uid:r.uid,summary:t,days:e.repeat}),e.repeat&&this._showToast(`Repete ${this._everyLabel(e.repeat)} depois de concluir`)),Object.keys(c).length>1&&(c.rename&&this._patchItem(i.id,e.key,{summary:t}),await this._call("update_item",c,i.id))}async _deleteItem(){let e=this._form,t=this._list(e.listId),s=t&&t.items&&t.items.find(r=>R(r)===e.key);if(this._closeSheet(),!t||!s)return;if(this._setItems(t.id,t.items.filter(r=>R(r)!==e.key)),this._haptic("warning"),!await this._call("remove_item",{item:[e.key]},t.id)){this._setItems(t.id,t.items);return}let i=K(s.due);this._showToast("Item apagado",O(t.features,S.CREATE)?{label:"Desfazer",run:()=>this._addFull(t,{summary:s.summary,description:s.description,date:i?i.date:null,time:i?i.time:null})}:null)}_confirmClearDone(e){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${E(e.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${e.done===1?"":"s"} de \u201C${e.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},e.id)&&this._showToast("Conclu\xEDdos apagados")}})}_openCustomize(e){this._openSheet("customize",{listId:e.id,name:e.name===e.origName?"":e.name,color:e.colorId,icon:e.iconPref,hidden:e.hidden,deadlines:!e.datesInfo,owner:e.owner||""}),this._people===void 0&&this._loadPeople()}async _loadPeople(){if(!this._peopleLoading){this._peopleLoading=!0;try{this._people=this._prefsRemote?await this.hass.callWS({type:"resolvia/people"}):[]}catch{this._people=[]}this._peopleLoading=!1,this.requestUpdate()}}async _saveCustomize(){let e=this._form,t=this._list(e.listId);this._closeSheet(),await this._saveListPrefs(e.listId,{name:(e.name||"").trim()||null,color:e.color||null,icon:e.icon||null,hidden:e.hidden?!0:null,dates_info:t&&t.canDue&&!e.deadlines?!0:null,owner:(e.owner||"").trim()||null})}_dragStart(e,t,s){if(e.pointerType==="mouse"&&e.button!==0)return;e.preventDefault();let a=e.currentTarget,i=a.closest(".item"),c=[...i.parentElement.querySelectorAll(":scope > .item[data-drag]")],d=c.indexOf(i);if(d<0)return;let l=this.renderRoot.querySelector("main"),p=c.map($=>$.getBoundingClientRect()),h=l.scrollTop,m=p.map($=>$.top+$.height/2+h),v=p[d].height,w={y:e.clientY,target:d,raf:0,lastY:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}i.classList.add("dragging"),c.forEach(($,M)=>M!==d&&$.classList.add("shifting")),this._haptic("selection");let x=()=>{let $=w.lastY-w.y+(l.scrollTop-h);i.style.transform=`translateY(${$}px)`;let M=m[d]+$,f=0;for(let b=0;b<c.length;b++)b!==d&&m[b]<M&&f++;f!==w.target&&(w.target=f,this._haptic("selection")),c.forEach((b,y)=>{if(y===d)return;let q=0;d<f&&y>d&&y<=f&&(q=-v),f<d&&y>=f&&y<d&&(q=v),b.style.transform=q?`translateY(${q}px)`:""})},_=()=>{let $=l.getBoundingClientRect(),M=70,f=0;w.lastY<$.top+M?f=-Math.ceil(($.top+M-w.lastY)/6):w.lastY>$.bottom-M&&(f=Math.ceil((w.lastY-($.bottom-M))/6)),f&&(l.scrollTop+=f,x()),w.raf=requestAnimationFrame(_)};w.raf=requestAnimationFrame(_);let k=$=>{w.lastY=$.clientY,x()},A=()=>{cancelAnimationFrame(w.raf),a.removeEventListener("pointermove",k),a.removeEventListener("pointerup",A),a.removeEventListener("pointercancel",A),c.forEach($=>{$.classList.remove("shifting","dragging"),$.style.transform=""}),w.target!==d&&this._commitMove(t,s,c.map($=>$.dataset.key),d,w.target)};a.addEventListener("pointermove",k),a.addEventListener("pointerup",A),a.addEventListener("pointercancel",A)}async _commitMove(e,t,s,a,i){let r=s.slice(),[c]=r.splice(a,1);r.splice(i,0,c);let d=i===0?void 0:r[i-1],l=e.items.slice(),p=l.findIndex(w=>R(w)===c),[h]=l.splice(p,1),m=d?l.findIndex(w=>R(w)===d):-1;l.splice(m+1,0,h),this._setItems(e.id,l);let v={type:"todo/item/move",entity_id:e.id,uid:c};d&&(v.previous_uid=d);try{await this.hass.callWS(v)}catch{this._setItems(e.id,e.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return u;let e=this._dark,t=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,i=a?a.color:t,r=`--rv-accent:${i.fill};--rv-accent-ink:${e?i.fill:i.ink};--rv-accent-soft:${at(i.fill,e?.18:.14)};--rv-accent-ink-light:${i.ink};`,c;return s.name==="list"?c=this._renderList(s.id):s.name==="lists"?c=this._renderLists():s.name==="search"?c=this._renderSearch():s.name==="more"?c=this._renderMore():s.name==="listas"?c=this._renderMoreScreen("Listas",this._listsStatus(),this._renderListsTab()):s.name==="graficos"?c=this._renderCharts():s.name==="sobre"?c=this._renderMoreScreen("Sobre",null,Cs({app:"ResolvIA",version:jt})):s.name==="config"?c=this._renderConfig():c=this._renderSuggest(),n`
      <div class="root" style=${r}>
        <div class="app">
          ${!this.env||this.env.topbar?n`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${g("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:u}
          ${this.hass.connected===!1?n`<div class="offline">${g("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:u}
          ${this._renderSide(s)}
          <main @touchstart=${d=>this._onSwipeStart(d)} @touchend=${d=>this._onSwipeEnd(d)}>${c}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()?n`<input id="rv-photos" class="sr" type="file" accept="image/*" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${d=>this._onFiles(d)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${d=>this._onFiles(d)} />`:u}
      </div>
    `}_renderNav(e){let t=this._dueOn()?this._visible().reduce((i,r)=>i+r.late+r.today,0):0,s=e.name==="list"?"lists":Re.includes(e.name)?"more":e.name,a=(i,r,c,d,l=0)=>n`
      <button class="tab ${s===i?"on":""}" @click=${()=>this._goTab(r)} aria-label=${c}>
        ${g(d)}<span>${c}</span>
        ${l?n`<span class="badge">${l>99?"99+":l}</span>`:u}
      </button>
    `;return n`
      <nav>
        <div class="tabs">
          ${a("home","","Sugest\xF5es","lightbulb",t)} ${a("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(e.name==="list"?e.id:null)} aria-label="Adicionar item">
            <span class="pill">${g("plus")}</span><span>Adicionar</span>
          </button>
          ${a("lists","/minhas-listas","Listas","list-checks")} ${a("more","/mais","Mais","ellipsis")}
        </div>
      </nav>
    `}_renderSide(e){let t=this._byPending(this._visible()),s=this._dueOn()?t.reduce((r,c)=>r+c.late+c.today,0):0,a=Re.includes(e.name)?"more":e.name,i=(r,c,d,l,p=0,h="")=>n`<button class="side-link" aria-current=${a===r?"page":"false"} @click=${()=>this._goTab(c)}>
      ${g(l)}<span>${d}</span>${p?n`<span class="side-badge">${p>99?"99+":p}</span>`:u}${h?n`<kbd>${h}</kbd>`:u}
    </button>`;return n`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${Et()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${i("home","","Sugest\xF5es","lightbulb",s)} ${i("search","/buscar","Buscar","search",0,"/")}
        ${i("lists","/minhas-listas","Listas","list-checks")} ${i("more","/mais","Mais","ellipsis")}
      </div>
      ${t.length?n`<div class="side-h"><span>Listas</span><small>${t.length}</small></div>
            <div class="side-lists">
              ${t.map(r=>n`<button class="side-list" aria-current=${e.name==="list"&&e.id===r.id?"page":"false"} style=${L(r.color,this._dark)} @click=${()=>this._go(`/lista/${r.id}`)}>
                  <span class="side-tile">${g(r.icon)}</span><span class="sl-name">${r.name}</span><span class="sl-num">${r.pending||""}</span>
                </button>`)}
            </div>`:u}
      <div class="side-foot">ResolvIA ${jt}</div>
    </aside>`}_renderTopActs(){return n`<div class="top-acts">
      ${this._renderChatBtn()}${this._renderMicBtn()}
      ${this._canImport()?n`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${g("scan-text")}Ler com IA</button>`:u}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${g("plus")}Adicionar item</button>
    </div>`}_renderPageHead(e,t,s=!1){let a=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],r=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:t;return n`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${Et()}Resolv<span>IA</span></span>${a?n`<span class="sep"> · </span>Olá, ${a}`:""}</p>${this._renderChatBtn()}${this._renderMicBtn()}${this._renderTopActs()}</div>
      ${s?n`<button class="uplink" @click=${()=>this._toMenu()}>${g("chevron-left")}Mais</button>`:u}
      <h1 class="page-title">${e}</h1>
      ${r?n`<p class="status"><span class="dot ${r.tone||""}" aria-hidden="true"></span><span>${r.text}</span></p>`:u}
    </header>`}_byPending(e){return[...e].sort((t,s)=>s.pending-t.pending)}_renderLists(){let e=this._byPending(this._visible()),t=this._L.filter(p=>p.hidden),s=e.reduce((p,h)=>p+h.pending,0),a=e.reduce((p,h)=>p+h.late,0),i=e.reduce((p,h)=>p+h.today,0),r=e.filter(p=>p.pending>0).length,c=[];s&&c.push(`em ${E(r,"lista","listas")}`),i&&c.push(`${i} pra hoje`),a&&c.push(`${E(a,"atrasado","atrasados")}`);let d=this._app("group_by_device",!0),l=[];if(d){for(let h of e){let m=h.group||"",v=l.find(w=>w.name===m);v||l.push(v={name:m,lists:[]}),v.lists.push(h)}let p=h=>h.lists.reduce((m,v)=>m+v.pending,0);l.sort((h,m)=>p(m)-p(h)||(h.name?1:0)-(m.name?1:0))}else l.push({name:null,lists:e});return n`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${E(e.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>n`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${ma(this.hass.user&&this.hass.user.name)}</div>
            ${s?n`<div class="hero-big">${s}<small>${s===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${c.join(" \xB7 ")}</div>`:n`<div class="hero-big">Tudo<small>resolvido</small></div>
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
                <div class="em-icon">${g("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:n`
              <div class="groups ${l.length>1?"two":""}">
              ${l.map(p=>{let h=d?p.name||(l.length>1?"Listas locais":"Listas"):"Listas",m=d&&(p.name||l.length>1);return n`
                  <div class="panel grp">
                    <div class="grp-head ${m?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${g(p.name?"layout-list":"list-checks")}</span><h2 class="overline">${h}</h2><small>${p.lists.length}</small></div>
                    ${p.lists.map(v=>this._renderListCard(v,!d))}
                  </div>
                `})}
              </div>
              ${t.length?n`<div class="panel grp inact-grp">${this._renderFold("listas",t,p=>this._renderListCard(p,!d))}</div>`:u}
            `}
        ${this.hass.user&&this.hass.user.is_admin?n`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${g("list-plus")}<span>Nova lista</span>
            </button>`:u}
      </section>
    `}_renderHomeSearch(){let e=this._visible().reduce((t,s)=>t+(s.items&&s.items.length||0),0);return n`<form class="search-box home-search" role="search" @submit=${t=>{t.preventDefault(),this._query=t.target.q.value.trim(),this._toSearch()}}>
      ${g("search")}
      <input type="search" name="q" placeholder=${e?`Buscar entre ${E(e,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${t=>{t.target.value.trim()&&(this._query=t.target.value,t.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(e,t){let s=e.pending+e.done,a=s?Math.round(e.done/s*100):0,i=[];return e.unavailable?i.push(n`<span>Indisponível</span>`):e.items?(i.push(n`<span>${e.pending?E(e.pending,"pendente","pendentes"):"Tudo resolvido"}${e.done?` \xB7 ${e.done} ${e.done===1?"feito":"feitos"}`:""}</span>`),e.late?i.push(n`<span class="tag late">${g("circle-alert")}${e.late}</span>`):e.today&&i.push(n`<span class="tag today">${g("clock")}${e.today} hoje</span>`)):i.push(n`<span>Carregando…</span>`),n`
      <button class="list-card ${e.unavailable?"off":""}" style=${L(e.color,this._dark)} @click=${()=>this._go(`/lista/${e.id}`)}>
        <span class="tile">${g(e.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${e.name}</span>
          <span class="lc-meta">${t&&e.group?n`<span>${e.group} ·</span>`:u}${i}</span>
          ${s?n`<span class="bar"><i style="width:${a}%"></i></span>`:u}
        </span>
        <span class="lc-num ${e.pending?"":"zero"}">${e.pending||g("circle-check")}</span>
      </button>
    `}_renderList(e){let t=this._list(e);if(!t)return n`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${g("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>Voltar para o início</button>
      </section>`;let s=O(t.features,S.CREATE)&&!t.unavailable,a=O(t.features,S.UPDATE),i=O(t.features,S.MOVE),r=O(t.features,S.DELETE),c=t.items,d=c?c.filter(v=>!U(v)||this._recent.has(R(v))):[],l=c?c.filter(v=>U(v)&&!this._recent.has(R(v))):[],p=c?c.length:0,h=this._doneOpen[e]!==void 0?this._doneOpen[e]:this._app("show_done",!1);return this._selOn(e)?this._renderSelecting(t,d.filter(v=>!U(v))):n`
      <section class="page" style=${L(t.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${g("chevron-left")}</button>
          <div class="dh-text">
            ${t.group?n`<div class="overline">${t.group}</div>`:u}
            <h1 class="display">${t.name}</h1>
          </div>
          ${this._renderChatBtn()}${this._renderMicBtn(t.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:t.id})} aria-label="Opções da lista">${g("ellipsis")}</button>
        </div>

        ${p?n`<div class="progress">
              <span>${t.done} de ${p} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(t.done/p*100)}%"></i></span>
            </div>`:u}
        ${s?n`<div class="quick">
              <form @submit=${v=>this._quickAdd(v,t)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${v=>this._onQuickPaste(v,t)} />
                ${this._canImport()?n`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(t.id)}>${g("scan-text")}</button>`:u}
                <button class="add-btn" type="submit" aria-label="Adicionar">${g("plus")}</button>
              </form>
            </div>`:u}
        ${t.unavailable?n`<div class="panel"><div class="empty"><div class="em-icon">${g("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:c?d.length?n`<div class="panel items">
                  ${Q(d,R,v=>this._renderItem(t,v,{draggable:i&&a&&!U(v),selectable:r&&!U(v)}))}
                </div>`:n`<div class="panel">
                  <div class="empty">
                    ${p?n`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:n`<div class="em-icon">${g(t.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:n`<div class="panel">${[70,52,84].map(v=>n`<div class="skeleton" style="width:${v}%"></div>`)}</div>`}
        ${l.length?n`
              <div class="done-head">
                <button class="done-toggle ${h?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[e]:!h}} aria-expanded=${h?"true":"false"}>
                  Concluídos <span class="count">(${l.length})</span>${g("chevron-down")}
                </button>
                ${r?n`<button class="text-btn" @click=${()=>this._confirmClearDone(t)}>Limpar</button>`:u}
              </div>
              ${h?n`<div class="panel items">${Q(l,R,v=>this._renderItem(t,v))}</div>`:u}
            `:u}
        ${!a&&c&&c.length?n`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:u}
      </section>
    `}_selOn(e){return!!(this._sel&&this._sel.listId===e&&this._sel.path===this._path)}_startSelect(e,t=null){this._sel={listId:e.id,path:this._path,keys:new Set(t?[R(t)]:[])},this._haptic("light")}_toggleSel(e){let t=new Set(this._sel.keys),s=R(e);t.has(s)?t.delete(s):t.add(s),this._sel={...this._sel,keys:t}}_endSelect(){this._sel=null}_renderSelecting(e,t){let s=t.filter(i=>this._sel.keys.has(R(i))).length,a=s===t.length&&t.length>0;return n`
      <section class="page selecting-page" style=${L(e.color,this._dark)}>
        <div class="detail-head sel-head">
          <button class="icon-btn" @click=${()=>this._endSelect()} aria-label="Cancelar seleção">${g("x")}</button>
          <div class="dh-text">
            <div class="overline">${e.name}</div>
            <h1 class="display">${s?`${s} ${s===1?"selecionado":"selecionados"}`:"Selecionar"}</h1>
          </div>
          <button class="text-btn" @click=${()=>this._sel={...this._sel,keys:a?new Set:new Set(t.map(R))}}>${a?"Nenhum":"Todos"}</button>
        </div>
        <div class="panel items">${Q(t,R,i=>this._renderItem(e,i,{selecting:!0,selected:this._sel.keys.has(R(i))}))}</div>
        <div class="sel-bar">
          <button class="btn primary" ?disabled=${!s} @click=${()=>this._openSheet("move",{listId:e.id})}>${g("arrow-right-left")}Mover para outra lista</button>
        </div>
      </section>
    `}_renderMoveSheet(){let e=this._list(this._form.listId);if(!e||!this._sel)return u;let t=this._sel.keys.size,s=this._L.filter(a=>a.id!==e.id&&O(a.features,S.CREATE)&&!a.unavailable&&!a.hidden);return n`
      <div class="sheet-head">
        <h3 class="display">Mover ${t} ${t===1?"item":"itens"} para</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${s.length?n`<div class="chip-row grid">${s.map(a=>n`<button class="pick list" style=${L(a.color,this._dark)} @click=${()=>this._moveSelected(a.id)}><span class="dot"></span><span>${I(a.name,26)}</span></button>`)}</div>`:n`<p class="page-sub">Nenhuma outra lista aceita itens novos.</p>`}
    `}async _moveItem(e,t,s,a=null){let i=t.summary||"",r=a?a.date?a:null:K(t.due);if(!await this._addFull(s,{summary:i,description:ve(t.description),date:r?r.date:null,time:r?r.time:null}))return!1;let d=this._ruleFor(e.id,t);d&&d.days&&(await this._setRule(s.id,{summary:i,days:d.days}),await this._setRule(e.id,{uid:t.uid,summary:i,days:null}));let l=this._rawPoints(e.id,i);l&&(await this._setTaskPoints(s.id,i,l),await this._setTaskPoints(e.id,i,0));let p=this._roomIdsOf(e.id,i),h=this._equipIdsOf(e.id,i);p.length&&(await this._setTaskRoom(s.id,i,p),await this._setTaskRoom(e.id,i,null)),h.length&&(await this._setTaskEquip(s.id,i,h),await this._setTaskEquip(e.id,i,null));let m=this._externalRaw(e.id,i);return m&&(await this._setTaskExternal(s.id,i,m),await this._setTaskExternal(e.id,i,null)),!0}async _moveSelected(e){let t=this._list(this._sel.listId),s=this._list(e);if(!t||!s)return;let a=(t.items||[]).filter(r=>this._sel.keys.has(R(r)));this._closeSheet(),this._endSelect();let i=[];for(let r of a)await this._moveItem(t,r,s)&&i.push(r);i.length&&await this._call("remove_item",{item:i.map(R)},t.id),this._haptic("light"),this._showToast(i.length===a.length?`${i.length} ${i.length===1?"item movido":"itens movidos"} para ${I(s.name,28)}`:`Movidos ${i.length} de ${a.length} para ${I(s.name,28)}`)}_renderText(e,t){return fa(e).map(s=>s.url?n`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${g(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,t))}_highlight(e,t){if(!t)return e;let s=da(e),a=V(t);if(!a)return e;let i=[],r=0,c;for(;(c=s.indexOf(a,r))!==-1;)c>r&&i.push(e.slice(r,c)),i.push(n`<mark>${e.slice(c,c+a.length)}</mark>`),r=c+a.length;return r<e.length&&i.push(e.slice(r)),i}_renderItem(e,t,s={}){let a=U(t),i=!a&&X(t.due),r=O(e.features,S.UPDATE),c=this._ruleFor(e.id,t),d=c?a&&c.reopen_at?n`<span class="tag rep">${g("repeat")}volta ${this._returnLabel(c.reopen_at)}</span>`:n`<span class="tag rep">${g("repeat")}${this._everyLabel(c.days)}</span>`:u;if(s.selecting){let l=!!s.selected;return n`
        <div class="item selecting ${l?"picked":""} ${s.locked?"locked":""}" data-key=${R(t)} style=${s.showList?L(e.color,this._dark):""} title=${s.locked||""}
          @click=${()=>s.locked?this._showToast(s.locked):s.onToggle?s.onToggle():this._toggleSel(t)}>
          <span class="check sel ${l?"on":""}" role="checkbox" aria-checked=${l?"true":"false"} aria-disabled=${s.locked?"true":"false"} aria-label="Selecionar ${t.summary||""}">${g(s.locked?"lock":"check")}</span>
          <div class="it-body">
            <div class="it-text">${t.summary||""}</div>
            ${this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?n`<div class="chips">${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}</div>`:u}
          </div>
        </div>
      `}return n`
      <div class="item ${a?"done":""}" data-key=${R(t)} ?data-drag=${s.draggable} style=${s.showList?L(e.color,this._dark):""} @contextmenu=${s.onHold?l=>(l.preventDefault(),s.onHold()):s.selectable?l=>(l.preventDefault(),this._startSelect(e,t)):null}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!r} @click=${()=>this._toggle(e,t)}>
          ${g("check")}
        </button>
        <div class="it-body" @click=${()=>r&&this._openEdit(e,t)}>
          <div class="it-text">${this._renderText(t.summary||"",s.query)}</div>
          ${ve(t.description)?n`<div class="it-desc">${this._renderText(ve(t.description),s.query)}</div>`:u}
          ${s.why?n`<div class="it-why">${g(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:u}
          ${i||s.showList||c||this._pointsOf(e.id,t.summary,t.uid)||this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?n`<div class="chips">
                ${s.showList?n`<span class="tag list">${g(e.icon)}${I(e.name,24)}</span>`:u}
                ${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}
                ${i?e.noDue?n`<span class="tag info" title=${e.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${g("clock-fading")}${i.text}</span>`:n`<span class="tag ${i.tone==="late"?"late":i.tone==="today"?"today":""}">${g(i.time?"clock":"calendar")}${i.text}</span>`:u}
                ${d} ${this._renderPointsTag(e.id,t)}
              </div>`:u}
        </div>
        ${s.draggable?n`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${l=>this._dragStart(l,e,t)} @click=${l=>l.preventDefault()}>${g("grip-vertical")}</button>`:u}
      </div>
    `}_dueRows(e=this._visible()){let t=[];for(let s of e)if(!s.noDue)for(let a of s.items||[]){if(U(a)&&!this._recent.has(R(a)))continue;let i=X(a.due);i&&t.push({l:s,i:a,d:i})}return t.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(e){let t=this._dueOn()?this._dueRows(e):[],s=t.filter(p=>p.d.overdue),a=t.filter(p=>!p.d.overdue&&p.d.diff===0),i=t.find(p=>!p.d.overdue&&p.d.diff>0),r=[...e].filter(p=>p.pending>0).sort((p,h)=>h.pending-p.pending)[0],c=e.reduce((p,h)=>p+h.done,0),d=[],l=(p,h,m,v,w,x)=>d.push({ic:p,tone:h,label:m,value:v,right:w,go:x});return this._dueOn()&&(l("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._goTab(""):null),l("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._goTab(""):null),l("calendar-clock","","Pr\xF3ximo prazo",i?i.i.summary:"Sem prazos marcados",i?i.d.text:"",i?()=>this._go(`/lista/${i.l.id}`):null)),l("list-checks","","Mais cheia",r?r.name:"Tudo resolvido",r?E(r.pending,"pendente","pendentes"):"",r?()=>this._go(`/lista/${r.id}`):null),this._dueOn()||l("circle-check","","Resolvidos",E(c,"item feito","itens feitos"),"",null),n`<dl class="facts">
      ${d.map(p=>n`<div class="fact-row ${p.go?"go":""}" role=${p.go?"link":"group"} tabindex=${p.go?"0":"-1"} @click=${p.go||(()=>{})} @keydown=${h=>p.go&&h.key==="Enter"&&p.go()}>
          <dt><span class="sec-ic ${p.tone}" aria-hidden="true">${g(p.ic)}</span>${p.label}</dt>
          <dd>${p.value}</dd>
          <dd class="fv ${p.tone}">${p.right}</dd>
        </div>`)}
    </dl>`}_dueSections(){let e=this._visible(),t=this._dueOn()?this._dueRows(e):[],s=[{title:"Atrasados",test:l=>l.overdue,soon:!0},{title:"Hoje",test:l=>l.diff===0,soon:!0},{title:"Amanh\xE3",test:l=>l.diff===1},{title:"Pr\xF3ximos 7 dias",test:l=>l.diff>1&&l.diff<7},{title:"Mais adiante",test:()=>!0}],a=new Set,i=s.map(l=>{let p=t.filter(h=>!a.has(h)&&l.test(h.d));return p.forEach(h=>a.add(h)),{...l,rows:p}}).filter(l=>l.rows.length),r=l=>n`
      <div class="panel items due-group">
        <div class="overline" style=${l.title==="Atrasados"?"color:var(--rv-late)":""}>${l.title} · ${l.rows.length}</div>
        ${Q(l.rows,p=>p.l.id+R(p.i),p=>this._renderItem(p.l,p.i,{showList:!0}))}
      </div>
    `,c=(this._dueOn()&&this._repeatOn()?this._rules:[]).filter(l=>l.reopen_at).map(l=>{let p=this._list(l.entity_id),h=p&&p.items&&l.uid?p.items.find(m=>m.uid===l.uid):null;return{r:l,l:p,item:h}}).filter(l=>l.l&&!l.l.hidden).sort((l,p)=>l.r.reopen_at-p.r.reopen_at),d=c.length?n`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${c.length}</div>
          ${Q(c,l=>l.r.id,l=>l.item?this._renderItem(l.l,l.item,{showList:!0}):n`<div class="item done" style=${L(l.l.color,this._dark)}>
                    <span class="check on">${g("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${l.l.id}`)}>
                      <div class="it-text">${l.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${g(l.l.icon)}${I(l.l.name,24)}</span>
                        <span class="tag rep">${g("repeat")}volta ${this._returnLabel(l.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:u;return{soon:i.filter(l=>l.soon).map(r),later:i.filter(l=>!l.soon).map(r),coming:d,comingN:c.length,rows:t,late:t.filter(l=>l.d.overdue).length,today:t.filter(l=>!l.d.overdue&&l.d.diff===0).length}}_searchToggle(e,t,s,a){return n`<button class="pick ${s?"on":""}" aria-pressed=${s?"true":"false"} @click=${a}>${g(e)}<span>${t}</span></button>`}_renderSearch(){let e=this._query.trim(),t=V(e),s=this._bselOn(),a=[],i=0,r=this._roomsOn()&&this._searchRooms,c=this._equipsOn()&&this._searchEquips,d=this._extOn()&&this._searchExt,l=(x,_)=>r||c?V(this._placeText(x.id,_.summary,{rooms:r,equips:c})).includes(t):!1,p=(x,_)=>!t||V(_.summary).includes(t)||V(_.description).includes(t)||l(x,_)||d&&V(this._externalText(x.id,_.summary)).includes(t);for(let x of this._visible()){let _=(x.items||[]).filter(k=>(this._searchDone&&!s||!U(k))&&p(x,k));_.length&&(_.sort((k,A)=>Number(U(k))-Number(U(A))),a.push({l:x,hits:_}),i+=_.length)}let h=a.flatMap(({l:x,hits:_})=>_.filter(k=>!this._bulkLocked(x,k)).map(k=>this._bkey(x,k))),m=s?this._bulkRows().length:0,v=s&&h.length>0&&h.every(x=>this._bsel.keys.has(x)),w=s?n`<div class="res-head sel-head">
          <button class="icon-btn" @click=${()=>this._endBulk()} aria-label="Cancelar seleção">${g("x")}</button>
          <b class="res-n">${m?`${m} ${m===1?"selecionado":"selecionados"}`:"Selecionar"}</b>
          <button class="text-btn" ?disabled=${!h.length} @click=${()=>this._bsel={...this._bsel,keys:v?new Set:new Set([...this._bsel.keys,...h])}}>${v?"Nenhum":"Todos"}</button>
        </div>`:n`<div class="res-head">
          <p class="page-sub">${t?E(i,"resultado","resultados"):this._searchDone?E(i,"item","itens"):E(i,"pendente","pendentes")}</p>
          ${i?n`<button class="text-btn" @click=${()=>this._startBulk()}>${g("square-check-big")}Selecionar</button>`:u}
        </div>`;return n`
      <section class="page ${s?"selecting-page":""}">
        ${this._renderPageHead("Buscar",{text:`Em ${E(this._visible().length,"lista","listas")}`})}
        <label class="search-box">
          ${g("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${x=>this._query=x.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?n`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${g("x")}</button>`:u}
        </label>
        <div class="filters-label" id="incluir">Incluir</div>
        <div class="filters" role="group" aria-labelledby="incluir">
          ${s?u:this._searchToggle("circle-check","Conclu\xEDdos",this._searchDone,()=>this._searchDone=!this._searchDone)}
          ${""}
          ${this._extOn()?this._searchToggle("hard-hat","Servi\xE7os externos",this._searchExt,()=>this._searchExt=!this._searchExt):u}
          ${this._rooms&&this._rooms.encontrado&&this._roomsOn()?this._searchToggle("door-open","C\xF4modos",this._searchRooms,()=>this._searchRooms=!this._searchRooms):u}
          ${this._rooms&&this._rooms.encontrado&&this._equipsOn()?this._searchToggle("package","Equipamentos",this._searchEquips,()=>this._searchEquips=!this._searchEquips):u}
        </div>
        ${a.length?n`${w}
              ${a.map(({l:x,hits:_})=>n`
                  <div class="panel items" style=${L(x.color,this._dark)}>
                    <div class="overline">${x.name}${x.group?` \xB7 ${x.group}`:""}</div>
                    ${Q(_,R,k=>s?this._renderItem(x,k,{selecting:!0,selected:this._bsel.keys.has(this._bkey(x,k)),locked:this._bulkLocked(x,k),onToggle:()=>this._toggleBulk(x,k)}):this._renderItem(x,k,{query:e,onHold:U(k)||this._bulkLocked(x,k)?null:()=>this._startBulk(x,k)}))}
                  </div>
                `)}
              ${s?n`<div class="sel-bar">
                    <button class="btn primary" ?disabled=${!m} @click=${()=>this._openBulk()}>${g("pencil")}${m?`Alterar ${m} ${m===1?"item":"itens"}`:"Alterar"}</button>
                  </div>`:u}`:t?n`<div class="panel"><div class="empty"><div class="em-icon">${g("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${I(e,30)}”.</p></div></div>`:n`<div class="panel"><div class="empty"><div class="em-icon">${g("circle-check")}</div><h3>Nada pendente</h3><p>Tudo resolvido nas listas.</p></div></div>`}
      </section>
    `}_bkey(e,t){return`${e.id}|${R(t)}`}_bselOn(){return!!(this._bsel&&this._bsel.path===this._path)}_bulkLocked(e,t){return this._mirrored(e.id,t.uid)?"Vem do CronologIA: mude por l\xE1.":""}_startBulk(e=null,t=null){this._bsel={path:this._path,keys:new Set(e&&t?[this._bkey(e,t)]:[])},this._haptic("light")}_toggleBulk(e,t){let s=new Set(this._bsel.keys),a=this._bkey(e,t);s.has(a)?s.delete(a):s.add(a),this._bsel={...this._bsel,keys:s}}_endBulk(){this._bsel=null}_bulkRows(){if(!this._bsel)return[];let e=[];for(let t of this._visible())for(let s of t.items||[])!U(s)&&this._bsel.keys.has(this._bkey(t,s))&&!this._bulkLocked(t,s)&&e.push({l:t,i:s});return e}_openBulk(){this._openSheet("bulk",{setDue:!1,date:null,time:null,setRooms:!1,rooms:[],setEquips:!1,equips:[],equipQ:"",equipMore:!1,equipAdding:!1,setExt:!1,ext:null,target:null})}_renderBulkSheet(){let e=this._form,t=this._bulkRows(),s=t.length;if(!e||!s)return u;let a=this._dueOn()&&t.some(({l:$})=>O($.features,S.DUE_DATE)||O($.features,S.DUE_DATETIME)),i=t.some(({l:$})=>O($.features,S.DUE_DATETIME)),r=zt(),c=r.some($=>$.date===e.date),d=($,M)=>n`<button class="pick keep ${$?"on":""}" aria-pressed=${$?"true":"false"} @click=${M}>Manter</button>`,l=this._equipsOn(),p=e.setEquips?e.equips||[]:[],h=l&&p.length>0,m=h?this._roomsOfEquips(p):e.rooms||[],v=this._roomList().map($=>$.id),w=!h&&e.setRooms&&this._allRooms(m),x=$=>{let M=m.includes($)?m.filter(f=>f!==$):[...m,$];this._setForm({setRooms:!0,rooms:M})},_=e.setExt?e.ext:null,k=this._L.filter($=>O($.features,S.CREATE)&&!$.unavailable&&!$.hidden),A=e.setDue||e.setRooms||e.setEquips||e.setExt||!!e.target;return n`
      <div class="sheet-head">
        <h3 class="display">Alterar ${s} ${s===1?"item":"itens"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${a?n`<div class="field" data-f="prazo">
            <span class="flabel">Prazo</span>
            <div class="chip-row grid">
              ${d(!e.setDue,()=>this._setForm({setDue:!1,date:null,time:null,cal:null}))}
              ${r.map($=>n`<button class="pick ${e.setDue&&e.date===$.date?"on":""}" @click=${()=>this._setForm({setDue:!0,date:$.date,cal:null})}>${$.label}</button>`)}
              <button class="pick ${e.setDue&&e.date&&!c?"on":""}" aria-expanded=${e.cal?"true":"false"} @click=${()=>this._toggleCal()}>
                ${g("calendar")}<span>${e.setDue&&e.date&&!c?ot(e.date):"Outra data"}</span>
              </button>
              <button class="pick ${e.setDue&&!e.date?"on":""}" @click=${()=>this._setForm({setDue:!0,date:null,time:null,cal:null})}>${g("x")}<span>Sem prazo</span></button>
            </div>
            ${e.cal?this._renderCal(e.setDue?e.date:null,$=>this._setForm({setDue:!0,date:$,cal:null})):u}
          </div>`:u}
      ${a&&i&&e.setDue&&e.date?n`<div class="field" data-f="horario">
            <span class="flabel">Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${g("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===Z?"on":""}" @click=${()=>this._setForm({time:Z})}>${g("clock")}<span>${Z}</span></button>
              <button class="pick time-other ${e.time&&e.time!==Z?"on":""}" @click=${()=>this._pickTime("#rv-bulk-time")}>
                ${g("clock-fading")}<span>${e.time&&e.time!==Z?e.time:"Outro hor\xE1rio"}</span>
              </button>
            </div>
            ${this._timeBox("rv-bulk-time",e.time)}
          </div>`:u}
      ${this._roomsOn()?n`<div class="field" data-f="comodo">
            <span class="flabel">Cômodo</span>
            <div class="chip-row grid ${h?"locked":""}">
              ${d(!e.setRooms&&!h,()=>this._setForm({setRooms:!1,rooms:[]}))}
              <button class="pick ${e.setRooms&&!m.length&&!h?"on":""}" ?disabled=${h} @click=${()=>this._setForm({setRooms:!0,rooms:[]})}>Nenhum</button>
              ${v.length>1?n`<button class="pick room all-rooms ${w?"on":""}" ?disabled=${h} @click=${()=>this._setForm(w?{setRooms:!0,rooms:[]}:{setRooms:!0,rooms:v})}>${g("house")}<span>Todos</span></button>`:u}
              ${this._roomList().map($=>n`<button class="pick room ${(e.setRooms||h)&&m.includes($.id)?"on":""}" aria-pressed=${(e.setRooms||h)&&m.includes($.id)?"true":"false"} ?disabled=${h} @click=${()=>x($.id)}>${g("door-open")}<span>${I($.nome,22)}</span></button>`)}
            </div>
            ${h?n`<span class="field-hint">${g("lock")}<span>Vem ${p.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:u}
          </div>`:u}
      ${l?n`<div class="field" data-f="equipamento">
            <span class="flabel">${p.length>1?"Equipamentos":"Equipamento"}</span>
            <div class="chip-row grid">
              ${d(!e.setEquips,()=>this._setForm({setEquips:!1,equips:[],equipAdding:!1}))}
              <button class="pick ${e.setEquips&&!p.length?"on":""}" @click=${()=>this._setForm({setEquips:!0,equips:[],equipAdding:!1})}>Nenhum</button>
            </div>
            ${Pe({lit:{html:n,nothing:u},icon:g,items:this._equipItems(),room:p.length?this._roomsOfEquips(p)[0]||null:this._roomsOn()&&e.setRooms&&m.length===1?m[0]:null,roomName:p.length?this._roomName(this._roomsOfEquips(p)[0])||"":this._roomsOn()&&e.setRooms&&m.length===1&&this._roomName(m[0])||"",value:p,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:$=>this._setForm({equipQ:$,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:$=>this._setForm({setEquips:!0,equips:[...p,$],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:$=>this._setForm({equips:p.filter(M=>M!==$)})})}
          </div>`:u}
      ${this._extOn()?n`<div class="field" data-f="quem-faz">
            <span class="flabel">Quem faz</span>
            <div class="chip-row ext-row bulk-ext">
              ${d(!e.setExt,()=>this._setForm({setExt:!1,ext:null}))}
              <button class="pick ${e.setExt&&!_?"on":""}" @click=${()=>this._setForm({setExt:!0,ext:null})}>${g("house")}<span>Nós mesmos</span></button>
              <button class="pick ${e.setExt&&_?"on":""}" @click=${()=>this._setForm({setExt:!0,ext:_||!0})}>${g("hard-hat")}<span>Serviço externo</span></button>
            </div>
            ${e.setExt&&_?n`<input type="text" class="ext-who" maxlength="60" .value=${_===!0?"":_} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
                  @input=${$=>this._setForm({ext:$.target.value.replace(/\s+/g," ").trim().slice(0,60)||!0})} />`:u}
          </div>`:u}
      ${k.length>1?n`<div class="field" data-f="lista">
            <span class="flabel">Lista</span>
            <div class="chip-row grid">
              ${d(!e.target,()=>this._setForm({target:null}))}
              ${k.map($=>n`<button class="pick list ${e.target===$.id?"on":""}" style=${L($.color,this._dark)} @click=${()=>this._setForm({target:$.id})}><span class="dot"></span><span>${I($.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        <button class="btn primary" ?disabled=${!A} @click=${()=>this._applyBulk()}>Aplicar</button>
      </div>
    `}async _applyBulk(){let e=this._form,t=this._bulkRows();if(this._closeSheet(),this._endBulk(),!t.length)return;let s=e.target?this._list(e.target):null,a=e.setDue&&this._dueOn()?{date:e.date||null,time:e.date&&e.time||null}:null,r=this._equipsOn()&&e.setEquips?e.equips||[]:null,c=this._roomsOn()?r&&r.length?this._roomsOfEquips(r):e.setRooms?e.rooms||[]:null:null,d=new Map,l=0;this._haptic("light");for(let{l:h,i:m}of t){let v=m.summary||"",w=!1;if(r&&await this._setTaskEquip(h.id,v,r),c){let _=r?[]:this._equipIdsOf(h.id,v),k=this._roomsOfEquips(_);_.length&&k.join("|")!==[...c].join("|")?w=!0:await this._setTaskRoom(h.id,v,c)}e.setExt&&this._extOn()&&await this._setTaskExternal(h.id,v,e.ext||null);let x=O(h.features,S.DUE_DATE)||O(h.features,S.DUE_DATETIME);if(a&&!x&&(w=!0),s&&s.id!==h.id){if(O(h.features,S.DELETE)&&await this._moveItem(h,m,s,a&&x?a:null)){d.has(h.id)||d.set(h.id,[]),d.get(h.id).push(R(m)),w||l++;continue}w=!0}if(a&&x&&O(h.features,S.UPDATE)){let _=K(m.due);if((_?_.date:null)!==a.date||(_?_.time:null)!==a.time){let k=this._dueFields(h,a.date,a.time,!0);Object.keys(k).length&&await this._call("update_item",{item:R(m),...k},h.id)}}w||l++}for(let[h,m]of d)await this._call("remove_item",{item:m},h);let p=t.length;this._showToast(l===p?`${p} ${p===1?"item alterado":"itens alterados"}`:`${l} de ${p} itens alterados: o resto n\xE3o aceita a mudan\xE7a`)}_configTabs(){return[...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks","integra\xE7\xF5es"]]:[],...this._data()?[["dados","Dados","archive","dados e backup"]]:[],["aparencia","Apar\xEAncia","palette","apar\xEAncia"],["opcoes","Op\xE7\xF5es","toggle-right","op\xE7\xF5es"]]}_configTab(){let e=this._configTabs(),t=this._view().tab;return e.some(s=>s[0]===t)?t:e[0][0]}_moreRows(){let e=this._configTabs().map(s=>s[3]),t=`${e.slice(0,-1).join(", ")} e ${e[e.length-1]}.`;return[["/listas","list-checks","Listas","Nome, cor, \xEDcone e quais aparecem."],["/graficos","chart-bar","Gr\xE1ficos",this._chartsLine()],["relatorio","clipboard-list","Relat\xF3rio de pend\xEAncias","Para imprimir ou salvar em PDF."],["/config","sliders-horizontal","Configura\xE7\xF5es",t[0].toUpperCase()+t.slice(1)],["/sobre","info","Sobre","CorrerIA Code, os apps e o GitHub."]]}_secHead(e,t,s=null){return n`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${g(e)}</span><h2>${t}</h2></div>${s?n`<p class="panel-lead">${s}</p>`:u}`}_renderFoot(){return n`<p class="foot"><b>ResolvIA</b><br />v${jt} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>`}_renderMore(){return n`
      <section class="page">
        ${this._renderPageHead("Mais",null)}
        <div class="panel more-menu" role="navigation" aria-label="Mais">
          <ul>
            ${this._moreRows().map(([e,t,s,a])=>n`<li>
                <button class="more-row" @click=${()=>this._openFromMenu(e)}>
                  <span class="mais-ic" aria-hidden="true">${g(t)}</span>
                  <span class="mb"><b>${s}</b><span>${a}</span></span>
                  ${g("chevron-right","chev")}
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
    `}_listsStatus(){let e=this._L.filter(t=>t.hidden).length;return{text:this._L.length?`${E(this._L.length,"lista","listas")}${e?` \xB7 ${E(e,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}_renderConfig(){let e=this._configTabs(),t=this._configTab(),s=i=>{i!==t&&(this._haptic("light"),this._go(this._configPath(i),!0,history.state&&history.state.rvUp?{rvUp:!0}:null))},a;return t==="integracoes"?a=n`${this._renderRewardsPanel()} ${this._renderRoomsPanel()} ${this._renderCorreriaPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this.hass.resolvia.voiceStatus&&this._aiOn()?this._renderVoicePanel():u} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():u} ${this._renderSensorsPanel()}`:t==="dados"?a=this._renderDataPanel():t==="aparencia"?a=this._renderAppearanceTab():a=this._renderOptionsTab(),n`
      <section class="page">
        ${this._renderPageHead("Configura\xE7\xF5es",null,!0)}
        <div class="seg compact more-tabs" role="tablist" aria-label="Seções de Configurações">
          ${e.map(([i,r,c])=>n`<button class=${t===i?"on":""} role="tab" aria-selected=${t===i?"true":"false"} @click=${()=>s(i)}>${g(c)}<span>${r}</span></button>`)}
        </div>
        <div role="tabpanel" aria-label=${e.find(i=>i[0]===t)[1]}>${a}</div>
        ${this._renderFoot()}
      </section>
    `}_renderFold(e,t,s,a="Inativas"){if(!t.length)return u;let i=!!this._folds[e];return n`<button class="row inact-head ${i?"open":""}" data-fold=${e} aria-expanded=${i?"true":"false"} @click=${()=>this._folds={...this._folds,[e]:!i}}>
        <span class="tile muted">${g("eye-off")}</span>
        <span class="grow"><div class="label">${a} <span class="count">(${t.length})</span></div></span>
        ${g("chevron-down","chev")}
      </button>
      ${i?Q(t,r=>r.id,s):u}`}_renderListsTab(){let e=(a,i,r)=>n`<label class="switch"><input type="checkbox" role="switch" .checked=${a} @change=${r} aria-label=${i} /><span class="track"></span></label>`,t=this._L.filter(a=>a.hidden),s=a=>n`
      <div class="row ${a.hidden?"inact":""}" style=${L(a.color,this._dark)}>
        <button class="tile" @click=${()=>this._openCustomize(a)} aria-label="Personalizar ${a.name}">${g(a.icon)}</button>
        <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(a)}>
          <div class="label">${a.name}</div>
          <div class="hint">${a.group||a.id}</div>
        </button>
        ${e(!a.hidden,`Mostrar ${a.name}`,i=>this._saveListPrefs(a.id,{hidden:i.target.checked?null:!0}))}
      </div>
    `;return n`
        <div class="panel lists-panel">
          <p class="panel-lead">Toque numa lista para personalizar.</p>
          ${this._L.length?Q(this._L.filter(a=>!a.hidden),a=>a.id,s):n`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
          ${this._renderFold("mais-listas",t,s)}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?n`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${L(this._accent(),this._dark)}>${g("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${g("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${L(pe("grafite"),this._dark)}>${g("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${g("chevron-right")}
              </button>
            </div>`:u}

    `}_renderRulesPanels(){if(!this._rulesOk)return u;let e=this._repeatOn();return n`<div class="panel" id="repeticao">
              ${this._secHead("repeat","Repeti\xE7\xE3o")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${e?"O item volta sozinho N dias depois de feito.":"Desligado."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._toggleRepeat(t)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!e&&!this._rules.length?u:n`<div class="panel ${e?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!e&&this._rules.length?n`<p class="panel-lead">Não voltam mais sozinhas. Apague para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${g("trash")}Apagar ${E(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:u}
              ${this._rules.length?this._rules.map(t=>{let s=this._list(t.entity_id);return s?n`<div class="row" style=${L(s.color,this._dark)}>
                      <span class="tile">${g("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${t.summary||t.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(t.days)}${e?t.reopen_at?` \xB7 volta ${this._returnLabel(t.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(t.entity_id,{uid:t.uid,summary:t.match||t.summary,days:null})}>${g("x")}</button>
                    </div>`:u}):n`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir”.</div></div>`}
            </div>`}`}_toggleRepeat(e){let t=e.target.checked;if(t||!this._rules.length)return this._saveAppPrefs({repeat_on:t});e.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(e){let t=this._rules.length;this._openSheet("confirm",{title:e?"Desligar a repeti\xE7\xE3o?":"Apagar as repeti\xE7\xF5es?",text:`${E(t,"tarefa se repete","tarefas se repetem")}. ${e?"Ao desligar, essas repeti\xE7\xF5es s\xE3o apagadas":"Elas ser\xE3o apagadas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:e?"Apagar e desligar":`Apagar ${E(t,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),e&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${E(t,"repeti\xE7\xE3o apagada","repeti\xE7\xF5es apagadas")}${e?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let e=(s,a,i)=>n`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${i} aria-label=${a} /><span class="track"></span></label>`,t=this._dueOn();return n`
        <div class="panel">
          ${this._secHead("calendar-clock","Prazos")}
          <div class="row">
            <div class="grow"><div class="label">Controlar prazos</div><div class="hint" style="white-space:normal">${t?"O que vence fica vermelho e aparece em Sugest\xF5es.":"Datas s\xF3 como informa\xE7\xE3o."}</div></div>
            ${e(t,"Controlar prazos",s=>this._saveAppPrefs({due_off:s.target.checked?null:!0}))}
          </div>
          ${t?this._renderDueAlert(e):u}
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
    `}_renderDueAlert(e){let t=this._app("due_alert",!1)===!0,s=/^\d{2}:\d{2}$/.test(this._app("due_alert_time",""))?this._app("due_alert_time"):"08:00",a=this._alertPeople;t&&a===void 0&&this._loadAlertPeople();let i=(a||[]).find(h=>h.me),r=h=>h.length>1?`${h.slice(0,-1).join(", ")} e ${h.at(-1)}`:h[0],c=this._alertChosen(),d=h=>!c||c.includes(h.id),l=(a||[]).filter(h=>d(h)&&!h.phone).map(h=>h.name),p=a?i?i.phone?"":"Sem celular ligado a voc\xEA no Home Assistant.":"Voc\xEA n\xE3o \xE9 uma pessoa da casa no Home Assistant.":"";return n`<div class="row">
        <div class="grow"><div class="label">Avisar o que vence hoje</div><div class="hint" style="white-space:normal">${t?"Cada pessoa recebe as listas dela e as de todos.":"Desligado."}</div></div>
        ${e(t,"Avisar o que vence hoje",h=>this._saveAppPrefs({due_alert:h.target.checked?!0:null}))}
      </div>
      ${t?n`<div class="due-alert">
            <div class="alert-when">
              <label class="field">
                <span class="flabel">Horário</span>
                <select class="select remind-time" aria-label="Horário do aviso" .value=${Ss(s)} @change=${h=>/^\d{2}:\d{2}$/.test(h.target.value)&&this._saveAppPrefs({due_alert_time:h.target.value})}>
                  ${Pt(s).map(h=>n`<option value=${h} ?selected=${h===s}>${h}</option>`)}
                </select>
              </label>
            </div>
            <div class="field">
              <span class="flabel">Quem recebe</span>
              ${a==null?n`<p class="field-hint">${a===null?"N\xE3o consegui ver as pessoas da casa.":"Procurando as pessoas da casa\u2026"}</p>`:a.length?n`<div class="due-who" role="group" aria-label="Quem recebe">${a.map(h=>n`<button type="button" class="dw ${d(h)?"on":""} ${h.phone?"":"off"}" aria-pressed=${d(h)?"true":"false"} @click=${()=>this._toggleAlertPerson(h)}>${g("user-round")}<b>${h.name}</b>${h.phone?u:n`<span>sem celular</span>`}</button>`)}</div>
                    ${l.length?n`<p class="field-hint">${g("info")}<span>Sem celular para ${r(l)}: ligue o celular à pessoa no Home Assistant.</span></p>`:c&&!a.some(d)?n`<p class="field-hint">${g("info")}<span>Escolha quem recebe.</span></p>`:u}`:n`<p class="field-hint">${g("info")}<span>Nenhuma pessoa da casa no Home Assistant.</span></p>`}
            </div>
            <button class="btn outline remind-test" ?disabled=${!i||!i.phone} title=${p} @click=${()=>this._testDueAlert()}>${g("send")}Testar no meu celular</button>
          </div>`:u}`}_alertChosen(){let e=this._app("due_alert_people",null);return Array.isArray(e)?e:null}_toggleAlertPerson(e){let t=(this._alertPeople||[]).map(i=>i.id).filter(Boolean),s=this._alertChosen()||t,a=s.includes(e.id)?s.filter(i=>i!==e.id):[...s,e.id];this._haptic("light"),this._saveAppPrefs({due_alert_people:t.every(i=>a.includes(i))?null:a})}async _loadAlertPeople(){if(this._alertPeopleLoading)return this._alertPeople;this._alertPeopleLoading=!0;try{this._alertPeople=this._prefsRemote?await this.hass.callWS({type:"resolvia/due_alert/people"}):[]}catch{this._alertPeople=null}return this._alertPeopleLoading=!1,this.requestUpdate(),this._alertPeople}async _testDueAlert(){try{let e=await this.hass.callWS({type:"resolvia/due_alert/test"});this._showToast(e&&e.today?"Aviso enviado para o seu celular. Toque nele para abrir Sugest\xF5es.":"Aviso enviado para o seu celular (nada vence hoje).")}catch(e){this._showToast(`N\xE3o foi: ${e.message}`)}}_renderAppearanceTab(){let e=this._accentDaily(),t=e?this._accent().id:(pe(this._app("accent","vermelho"))||te[0]).id;return n`
        <div class="panel">
          ${this._secHead("contrast","Tema","Cada aparelho guarda a sua escolha.")}
          ${ia({theme:this._theme,onTheme:s=>this._setTheme(s),icon:g})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Vale para todos os aparelhos.")}
          <div class="row switch-row daily-row">
            <div class="grow"><div class="label">Cor do dia</div><div class="hint">Muda a cor do app todo dia.</div></div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._saveAppPrefs({accent_daily:s.target.checked?null:!1})} aria-label="Cor do dia" /><span class="track"></span></label>
          </div>
          ${oa({palette:te,value:t,onPick:s=>this._saveAppPrefs({accent:s==="vermelho"?null:s,accent_daily:!1})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return u;let e=this._app("sensors_on",!1)===!0;return n`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">Criar sensores</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: nenhum sensor no Home Assistant."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._saveAppPrefs({sensors_on:t.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${e?n`<div class="sensor-list"><div class="sensor-row"><code>sensor.resolvia_ia_hoje</code><span>chamadas de IA hoje, com erros, cota e tokens estimados</span></div></div>`:u}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return u;let e=this._aiOn(),t=n`<div class="row switch-row">
        <div class="grow"><div class="label">Usar IA</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: sem leitura por IA, sem Falar."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${l=>this._saveAppPrefs({ai_off:l.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!e)return n`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","IA do Home Assistant","Separa os itens de mensagens, prints e fotos.")}
        ${t}
      </div>`;let s=this._aiInfo(),a=s.entities||[],i=this._app("ai_entity",""),r=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",c=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",d="";return s.ready&&s.using&&(d=`Usando ${s.using.name}${i?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(d+=` Para fotos, ${s.photos.name}.`)),s.reason&&(d=`${d} ${s.reason}`.trim()),n`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","IA do Home Assistant","Separa os itens de mensagens, prints e fotos.")}
      ${t}
      <div class="ai-state ${r}"><span class="dot"></span><div><b>${c}</b>${d?n`<span>${d}</span>`:u}</div></div>
      ${a.length||i?n`<label class="field" style="margin:14px 0 0">
            <span class="flabel">IA usada pelo app</span>
            <select class="select" aria-label="IA usada pelo app" @change=${l=>this._chooseAi(l.target.value)}>
              <option value="" ?selected=${!i}>Padrão do Home Assistant</option>
              ${a.map(l=>n`<option value=${l.id} ?selected=${l.id===i}>${l.name}${l.images?"":" (s\xF3 texto)"}${l.available?"":" (indispon\xEDvel)"}</option>`)}
              ${i&&!a.some(l=>l.id===i)?n`<option value=${i} selected>${i} (não encontrada)</option>`:u}
            </select>
          </label>`:u}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${()=>this._refreshAi()}>${g("rotate-ccw")}Verificar de novo</button></div>
      ${s.ready&&s.images?u:n`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
    </div>`}_renderSheet(){if(!this._sheet)return u;let e=u;return this._sheet==="item"?e=this._renderItemSheet():this._sheet==="listmenu"?e=this._renderListMenu():this._sheet==="customize"?e=this._renderCustomize():this._sheet==="confirm"?e=this._renderConfirm():this._sheet==="import"?e=this._renderImportSheet():this._sheet==="versions"?e=this._renderVersions():this._sheet==="who"?e=this._renderWhoSheet():this._sheet==="move"?e=this._renderMoveSheet():this._sheet==="bulk"?e=this._renderBulkSheet():this._sheet==="chat"&&(e=this._renderChatSheet()),n`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${t=>t.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${e}
      </div>
    `}_sheetStyle(){let e=this._form||{},t=this._list(e.target||e.listId),s=this._sheet==="customize"&&pe(e.color)||t&&t.color;return s?`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${at(s.fill,this._dark?.18:.14)};${L(s,this._dark)}`:""}_renderMirroredSheet(e){let t=this._form,s=t.mirrored,a=this._pointsOf(e.id,t.summary,t.key),i=X(t.due),r=O(e.features,S.DELETE);return n`
      <div class="sheet-head">
        <h3 class="display">${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <div class="ro-item">
        <b>${t.summary}</b>
        <div class="ro-tags">
          ${i?n`<span class="tag ${e.noDue?"info":i.tone}">${g("calendar")}${i.text}</span>`:u}
          ${a?n`<span class="tag pts">${g("trophy")}+${a}</span>`:u}
          <span class="tag">${I(e.name,24)}</span>
        </div>
        ${t.description?n`<p>${t.description}</p>`:u}
      </div>
      <p class="sheet-note with-icon">${g("calendar-clock")}<span>Vem do CronologIA: concluir aqui marca como feito lá${a?` (${a} pontos)`:""}. Para editar, use o CronologIA.</span></p>
      <div class="sheet-actions">
        ${r?n`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Apagar">${g("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._closeSheet()}>Fechar</button>
      </div>
    `}_toggleCal(){let e=this._form;e&&(this._setForm({cal:e.cal?null:Ha(e.date),calMonths:!1}),this._form.cal&&this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet .cal");t&&t.scrollIntoView({block:"nearest",behavior:"smooth"})}))}_renderCal(e,t){let s=this._form;return Va({icon:g,month:s.cal,value:e,today:de(new Date),onPick:t,onMonth:a=>this._setForm({cal:a}),months:!!s.calMonths,onMonths:a=>this._setForm({calMonths:a})})}_timeBox(e,t){return n`<select id=${e} class="time-box" tabindex="-1" aria-label="Horário" @focus=${s=>{let a=s.target.parentNode.querySelector(".time-other");a&&a.focus({preventScroll:!0})}} @change=${s=>this._setForm({time:s.target.value||null})}>
      <option value="" hidden></option>
      ${Pt(t).map(s=>n`<option value=${s}>${s}</option>`)}
    </select>`}_pickTime(e){let t=this.renderRoot.querySelector(e),s=window.__selectSheet;!t||!s||!s.open||(t.value=this._form&&this._form.time||"",s.open(t),!t.value&&requestAnimationFrame(()=>requestAnimationFrame(()=>{let a=[...document.querySelectorAll(".ss-wrap .ss-opt")].find(i=>i.textContent.trim()===Z);a&&a.scrollIntoView({block:"center"})})))}_renderItemSheet(){let e=this._form,t=this._list(e.listId),s=this._list(e.target)||t;if(!t||!s)return u;if(e.mirrored&&e.mode==="edit")return this._renderMirroredSheet(t);let a=s.features,i=O(a,S.DESCRIPTION),r=this._dueOn()&&(O(a,S.DUE_DATE)||O(a,S.DUE_DATETIME)),c=O(a,S.DUE_DATETIME),d=e.mode==="edit"&&O(t.features,S.DELETE),l=zt(),p=l.some(m=>m.date===e.date),h=e.mode==="add"?this._L.filter(m=>O(m.features,S.CREATE)&&!m.unavailable&&(!m.hidden||m.id===e.target)):O(t.features,S.DELETE)?this._L.filter(m=>O(m.features,S.CREATE)&&!m.unavailable&&(!m.hidden||m.id===t.id)):[];return n`
      <div class="sheet-head">
        <h3 class="display">${e.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${e.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(e.target,"text"),photos:()=>this._openImport(e.target,"photos"),scan:()=>this._openImport(e.target,"scan")}):u}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${e.summary} @input=${m=>this._setForm({summary:m.target.value})} @keydown=${m=>m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${i&&(this._notesOn()||e.hadNotes)?n`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${e.description} @input=${m=>this._setForm({description:m.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:u}
      ${r?n`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row grid">
              ${l.map(m=>n`<button class="pick ${e.date===m.date?"on":""}" @click=${()=>this._setForm({date:e.date===m.date?null:m.date,cal:null})}>${m.label}</button>`)}
              <button class="pick ${e.date&&!p?"on":""}" aria-expanded=${e.cal?"true":"false"} @click=${()=>this._toggleCal()}>
                ${g("calendar")}<span>${e.date&&!p?ot(e.date):"Outra data"}</span>
              </button>
              ${e.date?n`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null,cal:null})}>${g("x")}<span>Sem prazo</span></button>`:u}
            </div>
            ${e.cal?this._renderCal(e.date,m=>this._setForm({date:m,cal:null})):u}
          </div>`:u}
      ${r&&c&&e.date?n`<div class="field">
            <span class="flabel">Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${g("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===Z?"on":""}" @click=${()=>this._setForm({time:Z})}>${g("clock")}<span>${Z}</span></button>
              <button class="pick time-other ${e.time&&e.time!==Z?"on":""}" @click=${()=>this._pickTime("#rv-time")}>
                ${g("clock-fading")}<span>${e.time&&e.time!==Z?e.time:"Outro hor\xE1rio"}</span>
              </button>
            </div>
            ${this._timeBox("rv-time",e.time)}
          </div>`:u}
      ${this._rulesOk&&this._repeatOn()&&!e.mirrored&&(O(a,S.UPDATE)||O(a,S.CREATE))?n`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${e.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>Não</button>
              ${ja.map(m=>n`<button class="pick ${e.repeat===m.days&&!e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:m.days,repeatCustom:!1})}>${m.label}</button>`)}
              <button class="pick ${e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:e.repeat||4})}>${g("repeat")}<span>Outro</span></button>
            </div>
            ${e.repeatCustom?n`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(e.repeat||"")} @input=${m=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(m.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:u}
            ${e.repeat?n`<div class="field-hint">${g("repeat")}<span>Volta sozinha ${e.repeat===1?"no dia seguinte":`em ${e.repeat} dias`} depois de concluída.</span></div>`:u}
          </div>`:u}
      ${this._renderRoomField(e)}
      ${this._renderEquipField(e)}
      ${this._renderExternalField(e,a)}
      ${this._renderPointsField(e)}
      ${h.length>1?n`<div class="field">
            <span class="flabel">${e.mode==="add"?"Lista":"Lista (mover)"}</span>
            <div class="chip-row grid">
              ${h.map(m=>n`<button class="pick list ${e.target===m.id?"on":""}" style=${L(m.color,this._dark)} @click=${()=>this._setForm({target:m.id})}><span class="dot"></span><span>${I(m.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        ${d?n`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Apagar">${g("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._saveItem()}>${e.mode==="add"?"Adicionar":e.target!==e.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(e,{label:t=!0}={}){let s=this._aiInfo(),a=this._isHaAndroid(),i=this._camOk(),r=(c,d,l,p=!1,h="")=>n`<button type="button" class="imp-tile ${h?"no-cam":""}" ?disabled=${p} @click=${e[c]}>${g(d)}<span>${l}</span>${h?n`<small>${h}</small>`:u}</button>`;return n`<div class="field imp-field">
        ${t?n`<span class="flabel">Trazer de mensagem ou foto</span>`:u}
        <div class="imp-tiles">
          ${r("text","clipboard-paste","Colar mensagem")}
          ${r("photos","images","Escolher fotos",!s.images)}
          ${r("scan","scan-text","Digitalizar com\xA0IA",!s.images,i?"":"Precisa de https")}
        </div>
        ${s.images&&!i?n`<p class="imp-help">Em http a câmera não abre aqui: tire a foto pelo celular e use Escolher fotos.</p>`:a&&s.images?n`<p class="imp-help">No app do Home Assistant, a galeria manda uma foto por vez.</p>`:u}
      </div>
      ${s.ready?u:n`<div class="ai-box">${g("scan-text")}<span>Sem IA configurada, a mensagem é separada por linhas e vírgulas. Para ler fotos, configure a IA do Home Assistant em Mais › Configurações › Integrações.</span></div>`}`}_renderImportSheet(){let e=this._form,t=this._aiInfo(),s=(c,d)=>n`<div class="sheet-head">
      ${d?n`<button class="icon-btn back" @click=${d} aria-label="Voltar">${g("chevron-left")}</button>`:u}
      <h3 class="display">${c}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},i=e.error?n`<div class="imp-error">${g("circle-alert")}<span>${e.error}</span></div>`:u,r=e.images&&e.images.length?n`<div class="thumbs">${e.images.map(c=>n`<img src=${c.url} alt="" />`)}</div>`:u;if(e.step==="voice")return this._renderVoiceStep(s);if(e.step==="text")return n`
        ${s(e.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${e.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${c=>this._setForm({text:c.target.value,error:null})}></textarea>
        </label>
        ${i}
        <div class="sheet-actions">
          ${this._clipOk()?n`<button class="btn outline" @click=${()=>this._pasteClipboard()}>${g("clipboard-paste")}Colar</button>`:u}
          <button class="btn primary" ?disabled=${!(e.text||"").trim()} @click=${()=>this._readText()}>${t.ready?g("sparkles"):u}Separar itens</button>
        </div>
        ${t.ready?u:n`<p class="sheet-note">Sem IA configurada: separo por linhas, vírgulas e “e”.</p>`}
      `;if(e.step==="loading")return n`
        ${s("Lendo\u2026")}
        ${r}
        <div class="imp-loading">
          <span class="spin">${g("loader-circle")}</span>
          <span>${e.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>e.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>Cancelar</button></div>
      `;if(e.step==="review"){let c=this._list(e.target),d=e.items.filter(m=>m.on&&m.text.trim()).length,l=this._importTargets(),p=l.length>1,h=new Set(e.items.filter(m=>m.on&&m.text.trim()).map(m=>this._importListOf(m)));return n`
        ${s("Revisar itens",a)}
        ${r}
        ${e.heard?n`<p class="heard">${g("mic")}<span>“${e.heard}”</span></p>`:u}
        <p class="sheet-note top">${E(e.items.length,"item encontrado","itens encontrados")}.</p>
        ${e.note?n`<div class="imp-error soft">${g("sparkles")}<span>${e.note}</span></div>`:u}
        <div class="imp-list">
          ${e.items.map((m,v)=>{let w=this._list(this._importListOf(m));return n`<div class="imp-row ${m.on?"":"off"} ${p||this._roomsOn()||this._equipsOn()?"has-dest":""}">
              <button class="check ${m.on?"on":""}" role="checkbox" aria-checked=${m.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(v,{on:!m.on})}>${g("check")}</button>
              <input type="text" .value=${m.text} aria-label="Item" @input=${x=>this._setImportItem(v,{text:x.target.value})} />
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:e.items.filter((x,_)=>_!==v)})}>${g("x")}</button>
              ${p||this._roomsOn()||this._equipsOn()?n`<div class="imp-chips">
              ${p&&w?n`<label class="imp-dest" style=${L(w.color,this._dark)}>
                    <span class="dot"></span><span class="dname">${I(w.name,30)}</span>${g("chevron-down")}
                    <select aria-label="Lista de ${m.text}" @change=${x=>this._setImportItem(v,{list:x.target.value})}>
                      ${l.map(x=>n`<option value=${x.id} ?selected=${x.id===w.id}>${x.name}</option>`)}
                    </select>
                  </label>`:u}
              ${this._roomsOn()?n`<label class="imp-dest imp-room ${m.room?"":"none"}">
                    ${g(m.room==="*"?"house":"door-open")}<span class="dname">${m.room==="*"?"Todos os c\xF4modos":m.room?I(this._roomName(m.room)||"",30):"C\xF4modo"}</span>${g("chevron-down")}
                    <select aria-label="Cômodo de ${m.text}" @change=${x=>this._setImportItem(v,{room:x.target.value||null})}>
                      <option value="" ?selected=${!m.room}>Nenhum</option>
                      ${this._roomList().length>1?n`<option value="*" ?selected=${m.room==="*"}>Todos os cômodos</option>`:u}
                      ${this._roomList().map(x=>n`<option value=${x.id} ?selected=${x.id===m.room}>${x.nome}</option>`)}
                    </select>
                  </label>`:u}
              ${this._equipsOn()?n`<button type="button" class="imp-dest imp-room imp-equip ${m.equip?"":"none"} ${e.eqFor===v?"open":""}" aria-expanded=${e.eqFor===v?"true":"false"} aria-label="Equipamento de ${m.text}" @click=${()=>this._setForm({eqFor:e.eqFor===v?null:v,eqQ:"",eqMore:!1})}>
                    ${g("package")}<span class="dname">${m.equip?I((this._equipOf(m.equip)||{}).nome||"",30):"Equipamento"}</span>${g("chevron-down")}
                  </button>`:u}
                  </div>`:u}
              ${e.eqFor===v&&this._equipsOn()?n`<div class="imp-eq">${Pe({lit:{html:n,nothing:u},icon:g,items:this._equipItems(),room:this._roomsOn()&&m.room!=="*"?m.room:null,roomName:this._roomsOn()&&m.room&&m.room!=="*"&&this._roomName(m.room)||"",value:null,query:e.eqQ||"",more:!!e.eqMore,autofocus:!0,onQuery:x=>this._setForm({eqQ:x,eqMore:!1}),onMore:()=>this._setForm({eqMore:!0}),onPick:x=>{let _=this._equipOf(x),k=_&&_.comodo&&this._roomsOn()&&this._roomList().some(A=>A.id===_.comodo)?_.comodo:m.room;this._setImportItem(v,{equip:x,room:k}),this._setForm({eqFor:null,eqQ:""})}})}
                  ${m.equip?n`<button type="button" class="eq-more" @click=${()=>(this._setImportItem(v,{equip:null}),this._setForm({eqFor:null}))}>Sem equipamento</button>`:u}
                </div>`:u}
            </div>`})}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...e.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let m=this.renderRoot.querySelectorAll(".imp-row input");m.length&&m[m.length-1].focus()})}}>${g("plus")}<span>Adicionar linha</span></button>
        </div>
        ${t.images?n`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${g("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${g("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:u}
        ${p?n`<div class="field">
              <span class="flabel">Todos em</span>
              <div class="chip-row grid">
                ${l.map(m=>n`<button class="pick list ${h.size===1&&h.has(m.id)?"on":""}" style=${L(m.color,this._dark)} @click=${()=>this._setForm({target:m.id,items:e.items.map(v=>({...v,list:m.id}))})}><span class="dot"></span><span>${I(m.name,26)}</span></button>`)}
              </div>
            </div>`:u}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!d} @click=${()=>this._importAdd()}>
            ${d?`Adicionar ${E(d,"item","itens")}`:"Nenhum item marcado"}${d&&h.size>1?` em ${h.size} listas`:d&&h.size===1&&this._list([...h][0])?` em ${I(this._list([...h][0]).name,18)}`:""}
          </button>
        </div>
      `}return n`
      ${s("Importar itens")}
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${t.images?u:n`<div class="imp-error soft">${g("sparkles")}<span>${t.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>Ver IA do Home Assistant</button></span></div>`}
      ${i}
    `}_renderListMenu(){let e=this._list(this._form.listId);return e?n`
      <div class="sheet-head">
        <h3 class="display">${e.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${O(e.features,S.DELETE)&&(e.items||[]).some(t=>!U(t))?n`<button class="menu-row" @click=${()=>(this._closeSheet(),this._startSelect(e))}>${g("square-check-big")}Selecionar itens<span class="sub">para mover de lista</span></button>`:u}
      <button class="menu-row" @click=${()=>this._openCustomize(e)}>${g("palette")}Personalizar<span class="sub">${e.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(e.id,{hidden:e.hidden?null:!0}))}>${g(e.hidden?"eye":"eye-off")}${e.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?n`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${e.id}`)}>${g("external-link")}Abrir na tela padrão do HA</button>`:u}
      ${O(e.features,S.DELETE)&&e.done?n`<button class="menu-row danger" @click=${()=>this._confirmClearDone(e)}>${g("brush-cleaning")}Limpar concluídos<span class="sub">${e.done}</span></button>`:u}
    `:u}_renderCustomize(){let e=this._form,t=this._list(e.listId);if(!t)return u;let s=pe(e.color)||t.color,a=e.icon||Ct(`${t.origName} ${t.group||""} ${t.id}`);return n`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <div class="preview-tile" style=${L(s,this._dark)}>
        <span class="tile">${g(a)}</span>
        <span class="lc-main"><span class="lc-title">${(e.name||"").trim()||t.origName}</span><span class="lc-meta">${t.group||t.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">Nome</span>
        <input type="text" .value=${e.name} placeholder=${t.origName} @input=${i=>this._setForm({name:i.target.value})} />
      </label>
      <div class="field">
        <span class="flabel">Cor</span>
        <div class="swatches">
          ${te.map(i=>n`<button class="sw ${s.id===i.id?"on":""}" style="--c:${i.fill}" aria-label=${i.label} @click=${()=>this._setForm({color:i.id})}>${s.id===i.id?g("check"):u}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${L(s,this._dark)}>
          ${ua.map(i=>n`<button class="ig ${a===i?"on":""}" aria-label=${i} @click=${()=>this._setForm({icon:i})}>${g(i)}</button>`)}
        </div>
      </div>
      ${this._renderOwnerPick(e)}
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!e.hidden} @change=${i=>this._setForm({hidden:!i.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?t.canDue?n`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">Prazos</div>
              <div class="hint" style="white-space:normal">${e.deadlines?"Vencidos ficam vermelhos e aparecem em Sugest\xF5es.":"Datas s\xF3 como informa\xE7\xE3o."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e.deadlines} @change=${i=>this._setForm({deadlines:i.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:t.hasDates?n`<p class="sheet-note with-icon">${g("info")}<span>Esta lista não aceita prazo: as datas vêm da integração, só como informação.</span></p>`:u:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:t.canDue,owner:""})}>${g("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>Salvar</button>
      </div>
    `}_renderOwnerPick(e){let t=this._people||[],s=e.owner&&!t.some(a=>V(a)===V(e.owner))?[...t,e.owner]:t;return s.length?n`<div class="field">
      <span class="flabel">De quem é</span>
      <div class="chip-row grid owner-pick" role="radiogroup" aria-label="De quem é">
        ${["",...s].map(a=>{let i=a?V(e.owner||"")===V(a):!e.owner;return n`<button class="pick ${i?"on":""}" role="radio" aria-checked=${i?"true":"false"} @click=${()=>this._setForm({owner:a})}>${g(a?"user-round":"users")}<span>${a||"Todos"}</span></button>`})}
      </div>
      ${e.owner&&this._dueOn()&&this._app("due_alert",!1)===!0?n`<span class="field-hint">${g("info")}<span>O aviso de prazos vai só para o celular de ${e.owner}.</span></span>`:u}
    </div>`:u}_renderConfirm(){let e=this._form;return n`
      <div class="sheet-head"><h3 class="display">${e.title}</h3></div>
      <p class="confirm-text">${e.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${()=>e.run()}>${e.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return u;let e=this._toast;return n`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${e.text}</span>
      ${e.action?n`<button @click=${()=>{this._toast=null,e.action.run()}}>${e.action.label}</button>`:u}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",Yt);var Kt=class{constructor(e,t){this.url=e,this.onStatus=t,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let e=new WebSocket(this.url);this.ws=e,e.onopen=()=>{this.open=!0,this.backoff=1e3;let t=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))e.send(s);if(this.onStatus&&this.onStatus(!0),t)for(let s of this.reconnectHandlers)s()},e.onmessage=t=>{let s;try{s=JSON.parse(t.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let i=new Error(s.error&&s.error.message||"Falhou");i.code=s.error&&s.error.code,a.reject(i)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},e.onclose=()=>{let t=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),t&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(e){this.reconnectHandlers.push(e)}_send(e){let t=JSON.stringify(e);this.open?this.ws.send(t):this.queue.push(t)}sendMessagePromise(e){let t=this.nextId++;return new Promise((s,a)=>{this.pending.set(t,{resolve:s,reject:a}),this._send({...e,id:t})})}subscribeMessage(e,t){let s={cb:e,msg:t,id:null,first:null};this.subs.add(s);let a=new Promise((i,r)=>{s.first={resolve:i,reject:r}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(e){let t=this.nextId++;e.id=t,this.byId.set(t,e),this.pending.set(t,{resolve:()=>{e.first&&e.first.resolve(),e.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(t),this.subs.delete(e),e.first&&e.first.reject(s),e.first=null)}}),this.ws.send(JSON.stringify({...e.msg,id:t}))}};function Ya(){try{if(window.parent===window)return null;let o=window.parent.document.querySelector("home-assistant");return o&&o.hass||null}catch{return null}}var De=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function Wa(){let o=Ya();return o&&o.themes&&typeof o.themes.darkMode=="boolean"?o.themes.darkMode:!!(De&&De.matches)}function Ka(){return{topbar:!(window.parent!==window),haptic(e){try{let t=window.parent;t!==window&&t.dispatchEvent(new t.CustomEvent("haptic",{detail:e}))}catch{}},openInHA(e){try{let t=window.parent;if(t!==window&&t.document){t.history.pushState(null,"",e),t.dispatchEvent(new t.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(e,"_top")}}}async function Xa(o){let e=new URL("ws",location.href);e.protocol=location.protocol==="https:"?"wss:":"ws:";let t=null,s=d=>{t={...t,...d},o(t)},a=new Kt(e.href,d=>t&&s({connected:d})),i=await a.sendMessagePromise({type:"resolvia/bootstrap"}),r=Ya();t={states:i.states||{},entities:i.entities||{},devices:i.devices||{},user:{name:r&&r.user&&r.user.name||i.user&&i.user.name||"",is_admin:r&&r.user?!!r.user.is_admin:!0},themes:{darkMode:Wa()},language:"pt-BR",connected:!0,version:i.version,resolvia:{ai:i.ai||{ready:!1,images:!1,entities:[]},aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:(d=!1)=>a.sendMessagePromise({type:"resolvia/voice/status",...d?{fresh:!0}:{}}),async voiceText(d){let l=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:d.buffer.slice(d.byteOffset,d.byteOffset+d.byteLength)}),p=await l.json().catch(()=>({}));if(!l.ok){let h=new Error(p.error||`Erro ${l.status}`);throw h.code=p.code,h}return p},async extract(d){let l=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(d)}),p=await l.json().catch(()=>({}));if(!l.ok){let h=new Error(p.error||`Erro ${l.status}`);throw h.code=p.code,h}return p},report:d=>new URL(`relatorio?${d}`,location.href).href,data:{url:d=>new URL(`api/export/${d}`,location.href).href,async import(d){let l=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(d.name||"")},body:d}),p=await l.json().catch(()=>({}));if(!l.ok)throw new Error(p.error||`Erro ${l.status}`);return p},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:d=>a.sendMessagePromise({type:"resolvia/versions/restore",name:d}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:d=>a.sendMessagePromise({type:"resolvia/backups/restore",name:d}),erase:()=>a.sendMessagePromise({type:"resolvia/data/erase"})}},connection:a,callWS:d=>a.sendMessagePromise(d),callService:(d,l,p,h)=>a.sendMessagePromise({type:"call_service",domain:d,service:l,service_data:p||{},target:h})},a.subscribeMessage(d=>{let l={...t.states};d.new_state?l[d.entity_id]=d.new_state:delete l[d.entity_id],s({states:l})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let d=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:d.states||{},entities:d.entities||{},devices:d.devices||{}})}catch{}});let c=()=>{let d=Wa();t&&d!==t.themes.darkMode&&s({themes:{...t.themes,darkMode:d}})};return setInterval(c,1500),De&&De.addEventListener&&De.addEventListener("change",c),t}var Xt=document.getElementById("app"),Ae=document.createElement("resolvia-panel");Ae.env=Ka();Ae.narrow=window.innerWidth<870;window.addEventListener("resize",()=>Ae.narrow=window.innerWidth<870);Xa(o=>{Ae.hass=o}).then(o=>{Ae.hass=o,Xt.replaceChildren(Ae)}).catch(o=>{Xt.innerHTML="";let e=document.createElement("div");e.id="boot",e.textContent=`N\xE3o consegui iniciar o ResolvIA: ${o.message}. Recarregue a p\xE1gina.`,Xt.appendChild(e)});})();
