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
`,i='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',r='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',n='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',c=()=>{if(document.getElementById("ss-css"))return;let v=document.createElement("style");v.id="ss-css",v.textContent=a,(document.head||document.documentElement).appendChild(v)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();let d=v=>v.parentNode&&v.parentNode.host&&v.parentNode.nodeType===11?v.parentNode.host:v.parentNode||(v.host?v.host:null),h=v=>{let b=/rgba?\(([^)]+)\)/.exec(v||"");if(!b)return null;let A=b[1].split(/[ ,/]+/).filter(Boolean).map(Number);return{r:A[0],g:A[1],b:A[2],a:A.length>3?A[3]:1}},p=({r:v,g:b,b:A})=>(.2126*v+.7152*b+.0722*A)/255,m=(v,b)=>{let A=h(v)||(/^#([0-9a-f]{6})$/i.test(v)?{r:parseInt(v.slice(1,3),16),g:parseInt(v.slice(3,5),16),b:parseInt(v.slice(5,7),16)}:{r:100,g:160,b:240});return`rgba(${A.r},${A.g},${A.b},${b})`};function g(v){let b=getComputedStyle(v),A=R=>{for(let H of R){let ie=b.getPropertyValue(H).trim();if(ie)return ie}return""},q=null;for(let R=v;R&&R.nodeType===1;R=d(R)){let H=h(getComputedStyle(R).backgroundColor);if(H&&H.a>.5){q=p(H)<.45;break}}q===null&&(q=!!(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches));let P=o.theme&&o.theme()||{};q=P.dark??q;let z=P.accent||A(["--rv-accent","--a","--accent","--cor"])||"#64b5f6",j=P.bg||A(["--rv-surface","--surface","--card"]),J=P.fg||A(["--rv-text","--text","--fg","--ink"]),B=P.muted||A(["--rv-muted","--muted","--mut"]);return{"--ss-bg":j||(q?"#1b2229":"#ffffff"),"--ss-fg":J||(q?"#e8edf3":"#141a22"),"--ss-mut":B||(q?"#9aa6b4":"#5b6573"),"--ss-line2":q?"rgba(255,255,255,.18)":"rgba(0,0,0,.14)","--ss-a":z,"--ss-soft":m(z,q?.22:.16),"--ss-soft2":q?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)","--ss-scrim":A(["--rv-scrim","--scrim"])||"rgba(0,0,0,.45)","--ss-font":b.fontFamily||"system-ui, sans-serif"}}function _(v){let b=v.getAttribute("aria-label");if(b)return b;let A=v.getRootNode(),q=v.getAttribute("aria-labelledby");if(q&&A.getElementById){let z=q.split(/\s+/).map(j=>(A.getElementById(j)||{}).textContent||"").join(" ").trim();if(z)return z}if(v.id&&A.querySelector){let z=A.querySelector(`label[for="${CSS.escape(v.id)}"]`);if(z)return z.textContent.trim()}let P=v.closest("label, .field");if(P){let z=P.querySelector(".flabel, .label, legend, b, span");if(z&&!z.contains(v))return z.textContent.trim()}return""}function w(v){try{let z=o.icon&&o.icon(v);if(z)return z}catch{}let b=v.getRootNode(),A=[],q=v.getAttribute("aria-labelledby");q&&b.getElementById&&q.split(/\s+/).forEach(z=>A.push(b.getElementById(z))),v.id&&b.querySelector&&A.push(b.querySelector(`label[for="${CSS.escape(v.id)}"]`));let P=v.closest("label, .field, .campo");P&&A.push(P.querySelector("label, .lbl, .flabel, .label, legend, b, span"));for(let z of A){let j=z&&!z.contains(v)&&z.querySelector("svg");if(j)return j.outerHTML}return n}function y(v){let b=v.closest?v.closest("dialog"):null;if(!b||!b.open)return!1;try{return b.matches(":modal")}catch{return!0}}function k(v){if(e||!v||v.disabled||v.multiple)return;let b=y(v),A=document.createElement(b?"dialog":"div");A.className="ss-wrap";for(let[R,H]of Object.entries(g(v)))A.style.setProperty(R,H);let q=_(v),P=document.createElement("div");P.className="ss-sheet",P.setAttribute("role","dialog"),P.setAttribute("aria-modal","true"),q&&P.setAttribute("aria-label",q),P.innerHTML=`<div class="ss-grab"></div><div class="ss-head"><span class="ss-ic" aria-hidden="true">${w(v)}</span><b></b><button type="button" class="ss-x" aria-label="Fechar">${i}</button></div><div class="ss-list" role="listbox"></div>`,P.querySelector(".ss-head b").textContent=q;let z=P.querySelector(".ss-list"),j=null,J=R=>{let H=document.createElement("button");H.type="button",H.className=`ss-opt${R.selected?" on":""}`,H.setAttribute("role","option"),H.setAttribute("aria-selected",R.selected?"true":"false"),H.disabled=R.disabled,H.innerHTML=`<span></span>${r}`,H.firstChild.textContent=R.label||R.textContent,H.addEventListener("click",()=>S(R.value)),R.selected&&(j=H),z.appendChild(H)};for(let R of v.children)if(R.tagName==="OPTGROUP"){let H=document.createElement("div");H.className="ss-group",H.textContent=R.label,z.appendChild(H);for(let ie of R.children)ie.tagName==="OPTION"&&!ie.hidden&&J(ie)}else R.tagName==="OPTION"&&!R.hidden&&J(R);let B=document.createElement("div");if(B.className="ss-back",A.append(B,P),document.body.appendChild(A),e={sel:v,wrap:A,pending:null,closing:!1},b){try{A.showModal()}catch{}A.addEventListener("cancel",R=>{R.preventDefault(),x()})}B.addEventListener("click",()=>x()),P.querySelector(".ss-x").addEventListener("click",()=>x()),A.addEventListener("keydown",R=>{if(R.key==="Escape")R.preventDefault(),R.stopPropagation(),x();else if(R.key==="ArrowDown"||R.key==="ArrowUp"){let H=[...z.querySelectorAll(".ss-opt:not(:disabled)")],ie=H.indexOf(document.activeElement),st=H[Math.max(0,Math.min(H.length-1,ie+(R.key==="ArrowDown"?1:-1)))];st&&(R.preventDefault(),st.focus())}});try{history.pushState(history.state,"")}catch{}requestAnimationFrame(()=>{A.classList.add("in"),j?(j.scrollIntoView({block:"center"}),j.focus({preventScroll:!0})):P.querySelector(".ss-x").focus({preventScroll:!0})})}function x(v=null){if(!e||e.closing)return;e.closing=!0,e.pending=v;let b=e,A=()=>{if(e!==b)return;e=null,b.wrap.open&&b.wrap.close(),b.wrap.classList.remove("in"),b.wrap.classList.add("out"),setTimeout(()=>b.wrap.remove(),220);let q=b.sel;b.pending!==null&&q.value!==b.pending&&(q.value=b.pending,q.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),q.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));try{q.focus({preventScroll:!0})}catch{}};if(b.finish=A,b.byBack)return A();history.back(),setTimeout(A,400)}let S=v=>x(v);window.addEventListener("popstate",v=>{if(e){if(v.stopImmediatePropagation(),e.closing)return e.finish&&e.finish();e.byBack=!0,x()}});function M(v){let b=v.composedPath?v.composedPath():[v.target],A=b[0];if(A&&A.tagName==="SELECT")return A;if(typeof v.clientX!="number")return null;for(let q of b.slice(0,6)){if(!q||q.nodeType!==1||q===document.body||q===document.documentElement)break;for(let P of q.querySelectorAll("select")){if(P.disabled||P.multiple)continue;let z=P.getBoundingClientRect();if(z.width&&v.clientX>=z.left&&v.clientX<=z.right&&v.clientY>=z.top&&v.clientY<=z.bottom&&C(P,v.clientX,v.clientY))return P}}return null}function C(v,b,A){let q=v.style.getPropertyValue("pointer-events");v.style.setProperty("pointer-events","auto","important");let P=null;try{let z=v.getRootNode();P=(z.elementFromPoint?z:document).elementFromPoint(b,A)}catch{}return q?v.style.setProperty("pointer-events",q):v.style.removeProperty("pointer-events"),P===v}let $=v=>{let b=v.composedPath?v.composedPath()[0]:v.target;return b&&b.tagName==="SELECT"&&!b.disabled&&!b.multiple?b:null};window.addEventListener("touchstart",v=>{let b=v.touches[0];s=b?{x:b.clientX,y:b.clientY}:null},{capture:!0,passive:!0}),window.addEventListener("touchend",v=>{let b=$(v);if(!b||e)return;let A=v.changedTouches[0];s&&A&&Math.hypot(A.clientX-s.x,A.clientY-s.y)>10||(v.preventDefault(),t=Date.now(),k(b))},{capture:!0,passive:!1}),window.addEventListener("mousedown",v=>{$(v)&&v.preventDefault()},!0),window.addEventListener("click",v=>{if(e)return;let b=M(v);b&&(v.preventDefault(),v.stopPropagation(),Date.now()-t>600&&k(b))},!0),window.addEventListener("keydown",v=>{let b=$(v);!b||e||(v.key==="Enter"||v.key===" "||v.key==="F4"||v.altKey&&(v.key==="ArrowDown"||v.key==="ArrowUp"))&&(v.preventDefault(),k(b))},!0),o.open=k,o.close=()=>x()})();(function(){if(window.__haTema)return;var o={light:{bg:"#fafafa",card:"#ffffff"},dark:{bg:"#111111",card:"#1c1c1c"}},e={cores:{light:o.light,dark:o.dark},doHA:null,aplicar:i};window.__haTema=e;function t(){var p=[];try{window.parent&&window.parent!==window&&p.push(window.parent)}catch{}try{window.top&&window.top!==window&&p.indexOf(window.top)<0&&p.push(window.top)}catch{}for(var m=0;m<p.length;m++)try{var g=p[m].document,_=g&&g.querySelector("home-assistant");if(_)return{win:p[m],doc:g,el:_}}catch{}return null}function s(p){var m=document.createElement("canvas").getContext("2d");if(!m)return!1;m.fillStyle="#000",m.fillStyle=p;var g=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(m.fillStyle),_=g?[parseInt(g[1],16),parseInt(g[2],16),parseInt(g[3],16)]:(m.fillStyle.match(/\d+(\.\d+)?/g)||[0,0,0]).map(Number);return(.2126*_[0]+.7152*_[1]+.0722*_[2])/255<.5}function a(){var p=t();if(!p)return null;try{var m=p.win.getComputedStyle(p.doc.documentElement),g=m.getPropertyValue("--primary-background-color").trim(),_=m.getPropertyValue("--ha-card-background").trim()||m.getPropertyValue("--card-background-color").trim();if(!g)return null;var w=p.el.hass&&p.el.hass.themes,y=w&&typeof w.darkMode=="boolean"?w.darkMode:s(g);return{modo:y?"dark":"light",bg:g,card:_||o[y?"dark":"light"].card}}catch{return null}}function i(){var p=a(),m=document.documentElement.style;e.doHA=p?p.modo:null,["light","dark"].forEach(function(g){var _=p&&p.modo===g?{bg:p.bg,card:p.card}:o[g];e.cores[g]=_,m.getPropertyValue("--ha-bg-"+g)!==_.bg&&m.setProperty("--ha-bg-"+g,_.bg),m.getPropertyValue("--ha-card-"+g)!==_.card&&m.setProperty("--ha-card-"+g,_.card)}),d()}var r=null,n=0;function c(){n||(n=setTimeout(function(){n=0,i()},60))}function d(){var p=t();if(!(!p||r===p.doc.documentElement||typeof MutationObserver!="function"))try{new MutationObserver(c).observe(p.doc.documentElement,{attributes:!0,attributeFilter:["style","class"]}),r=p.doc.documentElement}catch{}}i();try{var h=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)");h&&h.addEventListener&&h.addEventListener("change",c)}catch{}document.addEventListener("visibilitychange",function(){document.hidden||c()}),setTimeout(i,400),setTimeout(i,2e3)})();function _s(o=window){if(!o||o.__tecladoCalmo)return;o.__tecladoCalmo=!0;let e=()=>{for(let a of[o.parent,o.top])try{if(!a||a===o)continue;let i=a.document&&a.document.scrollingElement;(a.scrollY||i&&i.scrollTop)&&a.scrollTo(0,0)}catch{}},t=0,s=()=>{e(),Date.now()<t&&o.setTimeout(s,60)};o.addEventListener("focusin",a=>{let i=a.composedPath&&a.composedPath()[0]||a.target;if(!i||!/^(INPUT|TEXTAREA)$/.test(i.tagName||""))return;let r=Date.now()>=t;t=Date.now()+900,r&&s()},!0),o.visualViewport&&o.visualViewport.addEventListener("resize",e)}(()=>{if(window.__textareas)return;let o=()=>`textareas:${(document.title||"app").split(/[·|-]/)[0].trim()}:`,e=p=>p.dataset.size||p.id||p.name||p.getAttribute("aria-label")||p.placeholder||"",t=p=>{try{return Number(localStorage.getItem(o()+p))||0}catch{return 0}},s=(p,m)=>{try{localStorage.setItem(o()+p,String(Math.round(m)))}catch{}},a=new WeakMap,i=typeof ResizeObserver=="function"?new ResizeObserver(p=>p.forEach(({target:m})=>{let g=parseFloat(m.style.height);!g||g===m.__tsSet||(clearTimeout(a.get(m)),a.set(m,setTimeout(()=>{let _=e(m),w=parseFloat(m.style.height);_&&w&&s(_,w),m.__tsSet=w},400)))})):null,r=p=>{if(!(p instanceof HTMLTextAreaElement)||p.dataset.size==="off"||p.__tsDone)return;p.__tsDone=!0,p.style.resize="vertical";let m=e(p),g=m&&t(m);g&&(p.style.height=`${g}px`,p.__tsSet=g),i&&i.observe(p)},n=new WeakSet,c=p=>{!p||p.nodeType!==1||(p.tagName==="TEXTAREA"&&r(p),p.shadowRoot&&d(p.shadowRoot),p.querySelectorAll&&(p.querySelectorAll("textarea").forEach(r),p.querySelectorAll("*").forEach(m=>m.shadowRoot&&d(m.shadowRoot))))};function d(p){n.has(p)||(n.add(p),new MutationObserver(m=>m.forEach(g=>g.addedNodes.forEach(c))).observe(p,{childList:!0,subtree:!0}),p.querySelectorAll("textarea").forEach(r),p.querySelectorAll("*").forEach(m=>m.shadowRoot&&d(m.shadowRoot)))}window.__textareas={fit:r,keyOf:e};let h=()=>d(document.body||document.documentElement);document.body?h():document.addEventListener("DOMContentLoaded",h)})();var Li={prazos:"/prazos",listas:"/minhas-listas",buscar:"/buscar"},zt="";function ws(){let o=zt;return zt="",o}function $s(o=typeof window>"u"?null:window,e=Li){let t=s=>{let a=new URL(s.location.href),i=e[a.searchParams.get("aba")];return i?(zt=i==="/buscar"?String(a.searchParams.get("comodo")||"").trim().slice(0,80):"",a.searchParams.delete("aba"),a.searchParams.delete("comodo"),s.history.replaceState(s.history.state,"",a.href),i):null};if(!o)return null;try{let s=t(o);if(s)return s;if(o.parent&&o.parent!==o)return t(o.parent)}catch{}return null}function ys(o,e=typeof window>"u"?null:window){if(!e||!e.parent||e.parent===e)return()=>{};let t=null,s=a=>{if(a.source!==e.parent||!a.data||a.data.type!=="home-assistant/properties")return;let i=String(a.data.route&&a.data.route.path||"").replace(/\/+$/,"");i!==t&&(t=i,i&&o(i))};e.addEventListener("message",s);try{e.parent.postMessage({type:"home-assistant/subscribe-properties"},"*")}catch{}return()=>e.removeEventListener("message",s)}function ks(o){let e=/^\/buscar(?:\/comodo\/(.+))?$/.exec(o||"");if(e){let t=e[1]||"";try{t=decodeURIComponent(t)}catch{}return{path:"/buscar",room:t.trim().slice(0,80)}}return o==="/minhas-listas"?{path:o,room:""}:null}var at=globalThis,Ht=at.ShadowRoot&&(at.ShadyCSS===void 0||at.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bt=Symbol(),As=new WeakMap,it=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.i,t=this.t;if(Ht&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=As.get(t)),e===void 0&&((this.i=e=new CSSStyleSheet).replaceSync(this.cssText),s&&As.set(t,e))}return e}toString(){return this.cssText}},ne=o=>new it(typeof o=="string"?o:o+"",void 0,Bt),ft=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,a,i)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[i+1],o[0]);return new it(t,o,Bt)},Fi=(o,e)=>{if(Ht)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=at.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,o.appendChild(s)}},Ss=Ht?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ne(t)})(o):o,{is:Ni,defineProperty:Hi,getOwnPropertyDescriptor:Bi,getOwnPropertyNames:Vi,getOwnPropertySymbols:ji,getPrototypeOf:Ui}=Object,gt=globalThis,Ms=gt.trustedTypes,Wi=Ms?Ms.emptyScript:"",Yi=gt.reactiveElementPolyfillSupport,Ve=(o,e)=>o,Lt={toAttribute(o,e){switch(e){case Boolean:o=o?Wi:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},js=(o,e)=>!Ni(o,e),qs={attribute:!0,type:String,converter:Lt,reflect:!1,useDefault:!1,hasChanged:js};Symbol.metadata??=Symbol("metadata"),gt.litPropertyMetadata??=new WeakMap;var be=class extends HTMLElement{static addInitializer(e){this.o(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(e,t=qs){if(t.state&&(t.attribute=!1),this.o(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Hi(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:i}=Bi(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let n=a?.call(this);i?.call(this,r),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??qs}static o(){if(this.hasOwnProperty(Ve("elementProperties")))return;let e=Ui(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ve("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(Ve("properties"))){let t=this.properties,s=[...Vi(t),...ji(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this.u=new Map;for(let[t,s]of this.elementProperties){let a=this.p(t,s);a!==void 0&&this.u.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(Ss(a))}else e!==void 0&&t.push(Ss(e));return t}static p(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this.P??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this.P?.delete(e)}$(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this.v=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fi(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.P?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}C(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor.p(e,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:Lt).toAttribute(t,s.type);this.m=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this.m=null}}_$AK(e,t){let s=this.constructor,a=s.u.get(e);if(a!==void 0&&this.m!==a){let i=s.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Lt;this.m=a;let n=r.fromAttribute(t,i.type);this[a]=n??this.T?.get(a)??n,this.m=null}}requestUpdate(e,t,s,a=!1,i){if(e!==void 0){let r=this.constructor;if(a===!1&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??js)(i,t)||s.useDefault&&s.reflect&&i===this.T?.get(e)&&!this.hasAttribute(r.p(e,s))))return;this.M(e,t,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(e,t,{useDefault:s,reflect:a,wrapped:i},r){s&&!(this.T??=new Map).has(e)&&(this.T.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this.m!==e&&(this.A??=new Set).add(e))}async k(){this.isUpdatePending=!0;try{await this.S}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,i]of this.v)this[a]=i;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:r}=i,n=this[a];r!==!0||this._$AL.has(a)||n===void 0||this.M(a,void 0,i,n)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this.P?.forEach(s=>s.hostUpdate?.()),this.update(t)):this.U()}catch(s){throw e=!1,this.U(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this.P?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(e){return!0}update(e){this.A&&=this.A.forEach(t=>this.C(t,this[t])),this.U()}updated(e){}firstUpdated(e){}};be.elementStyles=[],be.shadowRootOptions={mode:"open"},be[Ve("elementProperties")]=new Map,be[Ve("finalized")]=new Map,Yi?.({ReactiveElement:be}),(gt.reactiveElementVersions??=[]).push("2.1.2");var Vt=globalThis,Es=o=>o,ot=Vt.trustedTypes,Os=ot?ot.createPolicy("lit-html",{createHTML:o=>o}):void 0,jt="$lit$",me=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+me,Ki=`<${Ut}>`,Se=document,Ue=()=>Se.createComment(""),We=o=>o===null||typeof o!="object"&&typeof o!="function",Wt=Array.isArray,Us=o=>Wt(o)||typeof o?.[Symbol.iterator]=="function",Pt=`[ 	
\f\r]`,Be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,Is=/>/g,ke=RegExp(`>|${Pt}(?:([^\\s"'>=/]+)(${Pt}*=${Pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ts=/'/g,zs=/"/g,Ws=/^(?:script|style|textarea|title)$/i,Yt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),l=Yt(1),Ji=Yt(2),mr=Yt(3),Y=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ps=new WeakMap,Ae=Se.createTreeWalker(Se,129);function Ys(o,e){if(!Wt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Os!==void 0?Os.createHTML(e):e}var Ks=(o,e)=>{let t=o.length-1,s=[],a,i=e===2?"<svg>":e===3?"<math>":"",r=Be;for(let n=0;n<t;n++){let c=o[n],d,h,p=-1,m=0;for(;m<c.length&&(r.lastIndex=m,h=r.exec(c),h!==null);)m=r.lastIndex,r===Be?h[1]==="!--"?r=Cs:h[1]!==void 0?r=Is:h[2]!==void 0?(Ws.test(h[2])&&(a=RegExp("</"+h[2],"g")),r=ke):h[3]!==void 0&&(r=ke):r===ke?h[0]===">"?(r=a??Be,p=-1):h[1]===void 0?p=-2:(p=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?ke:h[3]==='"'?zs:Ts):r===zs||r===Ts?r=ke:r===Cs||r===Is?r=Be:(r=ke,a=void 0);let g=r===ke&&o[n+1].startsWith("/>")?" ":"";i+=r===Be?c+Ki:p>=0?(s.push(d),c.slice(0,p)+jt+c.slice(p)+me+g):c+me+(p===-2?n:g)}return[Ys(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Ye=class o{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,r=0,n=e.length-1,c=this.parts,[d,h]=Ks(e,t);if(this.el=o.createElement(d,s),Ae.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=Ae.nextNode())!==null&&c.length<n;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(jt)){let m=h[r++],g=a.getAttribute(p).split(me),_=/([.?@])?(.*)/.exec(m);c.push({type:1,index:i,name:_[2],strings:g,ctor:_[1]==="."?nt:_[1]==="?"?lt:_[1]==="@"?ct:qe}),a.removeAttribute(p)}else p.startsWith(me)&&(c.push({type:6,index:i}),a.removeAttribute(p));if(Ws.test(a.tagName)){let p=a.textContent.split(me),m=p.length-1;if(m>0){a.textContent=ot?ot.emptyScript:"";for(let g=0;g<m;g++)a.append(p[g],Ue()),Ae.nextNode(),c.push({type:2,index:++i});a.append(p[m],Ue())}}}else if(a.nodeType===8)if(a.data===Ut)c.push({type:2,index:i});else{let p=-1;for(;(p=a.data.indexOf(me,p+1))!==-1;)c.push({type:7,index:i}),p+=me.length-1}i++}}static createElement(e,t){let s=Se.createElement("template");return s.innerHTML=e,s}};function Me(o,e,t=o,s){if(e===Y)return e;let a=s!==void 0?t.N?.[s]:t.O,i=We(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(o),a._$AT(o,t,s)),s!==void 0?(t.N??=[])[s]=a:t.O=a),a!==void 0&&(e=Me(o,a._$AS(o,e.values),a,s)),e}var rt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??Se).importNode(t,!0);Ae.currentNode=a;let i=Ae.nextNode(),r=0,n=0,c=s[0];for(;c!==void 0;){if(r===c.index){let d;c.type===2?d=new vt(i,i.nextSibling,this,e):c.type===1?d=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(d=new dt(i,this,e)),this._$AV.push(d),c=s[++n]}r!==c?.index&&(i=Ae.nextNode(),r++)}return Ae.currentNode=Se,a}V(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},vt=class Js{get _$AU(){return this._$AM?._$AU??this.D}constructor(e,t,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Me(this,e,t),We(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==Y&&this.L(e):e._$litType$!==void 0?this.j(e):e.nodeType!==void 0?this.I(e):Us(e)?this.H(e):this.L(e)}B(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}I(e){this._$AH!==e&&(this._$AR(),this._$AH=this.B(e))}L(e){this._$AH!==u&&We(this._$AH)?this._$AA.nextSibling.data=e:this.I(Se.createTextNode(e)),this._$AH=e}j(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ye.createElement(Ys(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(t);else{let i=new rt(a,this),r=i.R(this.options);i.V(t),this.I(r),this._$AH=i}}_$AC(e){let t=Ps.get(e.strings);return t===void 0&&Ps.set(e.strings,t=new Ye(e)),t}H(e){Wt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let i of e)a===t.length?t.push(s=new Js(this.B(Ue()),this.B(Ue()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=Es(e).nextSibling;Es(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this.D=e,this._$AP?.(e))}},qe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,a){let i=this.strings,r=!1;if(i===void 0)e=Me(this,e,t,0),r=!We(e)||e!==this._$AH&&e!==Y,r&&(this._$AH=e);else{let n=e,c,d;for(e=i[0],c=0;c<i.length-1;c++)d=Me(this,n[s+c],t,c),d===Y&&(d=this._$AH[c]),r||=!We(d)||d!==this._$AH[c],d===u?e=u:e!==u&&(e+=(d??"")+i[c+1]),this._$AH[c]=d}r&&!a&&this.W(e)}W(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},nt=class extends qe{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===u?void 0:e}},lt=class extends qe{constructor(){super(...arguments),this.type=4}W(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},ct=class extends qe{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=Me(this,e,t,0)??u)===Y)return;let s=this._$AH,a=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},dt=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Me(this,e)}},Qi={q:jt,J:me,Z:Ut,F:1,G:Ks,K:rt,X:Us,Y:Me,tt:vt,st:qe,it:lt,et:ct,ht:nt,ot:dt},Xi=Vt.litHtmlPolyfillSupport;Xi?.(Ye,vt),(Vt.litHtmlVersions??=[]).push("3.3.3");var Qs=(o,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let i=t?.renderBefore??null;s._$litPart$=a=new vt(e.insertBefore(Ue(),i),i,void 0,t??{})}return a._$AI(o),a},Kt=globalThis;var _e=class extends be{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.rt=Qs(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return Y}};_e._$litElement$=!0,_e.finalized=!0,Kt.litElementHydrateSupport?.({LitElement:_e});var Gi=Kt.litElementPolyfillSupport;Gi?.({LitElement:_e});(Kt.litElementVersions??=[]).push("4.2.2");var{tt:Zi}=Qi,Rs=o=>o,eo=o=>o===null||typeof o!="object"&&typeof o!="function";var Ds=(o,e)=>e===void 0?o?._$litType$!==void 0:o?._$litType$===e,to=o=>o?._$litType$?.h!=null;var Xs=o=>o.strings===void 0,Ls=()=>document.createComment(""),xe=(o,e,t)=>{let s=o._$AA.parentNode,a=e===void 0?o._$AB:e._$AA;if(t===void 0){let i=s.insertBefore(Ls(),a),r=s.insertBefore(Ls(),a);t=new Zi(i,r,o,o.options)}else{let i=t._$AB.nextSibling,r=t._$AM,n=r!==o;if(n){let c;t._$AQ?.(o),t._$AM=o,t._$AP!==void 0&&(c=o._$AU)!==r._$AU&&t._$AP(c)}if(i!==a||n){let c=t._$AA;for(;c!==i;){let d=Rs(c).nextSibling;Rs(s).insertBefore(c,a),c=d}}}return t},ve=(o,e,t=o)=>(o._$AI(e,t),o),so={},Ke=(o,e=so)=>o._$AH=e,Ft=o=>o._$AH,Rt=o=>{o._$AR(),o._$AA.remove()},Gs=o=>{o._$AR()};var ee=o=>(...e)=>({_$litDirective$:o,values:e}),re=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this.nt=e,this._$AM=t,this.ct=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var je=(o,e)=>{let t=o._$AN;if(t===void 0)return!1;for(let s of t)s._$AO?.(e,!1),je(s,e);return!0},ht=o=>{let e,t;do{if((e=o._$AM)===void 0)break;t=e._$AN,t.delete(o),o=e}while(t?.size===0)},Zs=o=>{for(let e;e=o._$AM;o=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(o))break;t.add(o),oo(e)}};function ao(o){this._$AN!==void 0?(ht(this),this._$AM=o,Zs(this)):this._$AM=o}function io(o,e=!1,t=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(e)if(Array.isArray(s))for(let i=t;i<s.length;i++)je(s[i],!1),ht(s[i]);else s!=null&&(je(s,!1),ht(s));else je(this,o)}var oo=o=>{o.type==2&&(o._$AP??=io,o._$AQ??=ao)},Je=class extends re{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),Zs(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(je(this,e),ht(this))}setValue(e){if(Xs(this.nt))this.nt._$AI(e,this);else{let t=[...this.nt._$AH];t[this.ct]=e,this.nt._$AI(t,this,0)}}disconnected(){}reconnected(){}};var pt=class{constructor(e){this.lt=e}disconnect(){this.lt=void 0}reconnect(e){this.lt=e}deref(){return this.lt}},ut=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(e=>this.dt=e)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var mt=class extends Je{constructor(){super(...arguments),this.ft=new pt(this),this.vt=new ut}render(e,t){return Y}update(e,[t,s]){if(this.isConnected||this.disconnected(),t===this.yt)return Y;this.yt=t;let a=0,{ft:i,vt:r}=this;return(async(n,c)=>{for await(let d of n)if(await c(d)===!1)return})(t,async n=>{for(;r.get();)await r.get();let c=i.deref();if(c!==void 0){if(c.yt!==t)return!1;s!==void 0&&(n=s(n,a)),c.commitValue(n,a),a++}return!0}),Y}commitValue(e,t){this.setValue(e)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},fr=ee(mt),gr=ee(class extends mt{constructor(o){if(super(o),o.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(o,e){return this.rt=o,super.update(o,e)}commitValue(o,e){e===0&&Gs(this.rt);let t=xe(this.rt);ve(t,o)}}),Fs=o=>to(o)?o._$litType$.h:o.strings,vr=ee(class extends re{constructor(o){super(o),this.bt=new WeakMap}render(o){return[o]}update(o,[e]){let t=Ds(this.gt)?Fs(this.gt):null,s=Ds(e)?Fs(e):null;if(t!==null&&(s===null||t!==s)){let a=Ft(o).pop(),i=this.bt.get(t);if(i===void 0){let r=document.createDocumentFragment();i=Qs(u,r),i.setConnected(!1),this.bt.set(t,i)}Ke(i,[a]),xe(i,void 0,a)}if(s!==null){if(t===null||t!==s){let a=this.bt.get(s);if(a!==void 0){let i=Ft(a).pop();Gs(o),xe(o,void 0,i),Ke(o,[i])}}this.gt=e}else this.gt=void 0;return this.render(e)}});var br=ee(class extends re{constructor(o){if(super(o),o.type!==1||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){if(this.wt===void 0){this.wt=new Set,o.strings!==void 0&&(this._t=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in e)e[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(e)}let t=o.element.classList;for(let s of this.wt)s in e||(t.remove(s),this.wt.delete(s));for(let s in e){let a=!!e[s];a===this.wt.has(s)||this._t?.has(s)||(a?(t.add(s),this.wt.add(s)):(t.remove(s),this.wt.delete(s)))}return Y}}),ro={},xr=ee(class extends re{constructor(){super(...arguments),this.St=ro}render(o,e){return e()}update(o,[e,t]){if(Array.isArray(e)){if(Array.isArray(this.St)&&this.St.length===e.length&&e.every((s,a)=>s===this.St[a]))return Y}else if(this.St===e)return Y;return this.St=Array.isArray(e)?Array.from(e):e,this.render(e,t)}});var _r=ee(class extends re{constructor(){super(...arguments),this.key=u}render(o,e){return this.key=o,e}update(o,[e,t]){return e!==this.key&&(Ke(o),this.key=e),t}}),ea=ee(class extends re{constructor(o){if(super(o),o.type!==3&&o.type!==1&&o.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Xs(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===Y||e===u)return e;let t=o.element,s=o.name;if(o.type===3){if(e===t[s])return Y}else if(o.type===4){if(!!e===t.hasAttribute(s))return Y}else if(o.type===1&&t.getAttribute(s)===e+"")return Y;return Ke(o),e}});var Dt=new WeakMap,wr=ee(class extends Je{render(o){return u}update(o,[e]){let t=e!==this.lt;return t&&this.$t(void 0),(t||this.Tt!==this.xt)&&(this.lt=e,this.Et=o.options?.host,this.$t(this.xt=o.element)),u}$t(o){if(this.lt!==void 0)if(this.isConnected||(o=void 0),typeof this.lt=="function"){let e=this.Et??globalThis,t=Dt.get(e);t===void 0&&(t=new WeakMap,Dt.set(e,t)),t.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),t.set(this.lt,o),o!==void 0&&this.lt.call(this.Et,o)}else this.lt.value=o}get Tt(){return typeof this.lt=="function"?Dt.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),Ns=(o,e,t)=>{let s=new Map;for(let a=e;a<=t;a++)s.set(o[a],a);return s},se=ee(class extends re{constructor(o){if(super(o),o.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(o,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let a=[],i=[],r=0;for(let n of o)a[r]=s?s(n,r):r,i[r]=t(n,r),r++;return{values:i,keys:a}}render(o,e,t){return this.Ct(o,e,t).values}update(o,[e,t,s]){let a=Ft(o),{values:i,keys:r}=this.Ct(e,t,s);if(!Array.isArray(a))return this.Pt=r,i;let n=this.Pt??=[],c=[],d,h,p=0,m=a.length-1,g=0,_=i.length-1;for(;p<=m&&g<=_;)if(a[p]===null)p++;else if(a[m]===null)m--;else if(n[p]===r[g])c[g]=ve(a[p],i[g]),p++,g++;else if(n[m]===r[_])c[_]=ve(a[m],i[_]),m--,_--;else if(n[p]===r[_])c[_]=ve(a[p],i[_]),xe(o,c[_+1],a[p]),p++,_--;else if(n[m]===r[g])c[g]=ve(a[m],i[g]),xe(o,a[p],a[m]),m--,g++;else if(d===void 0&&(d=Ns(r,g,_),h=Ns(n,p,m)),d.has(n[p]))if(d.has(n[m])){let w=h.get(r[g]),y=w!==void 0?a[w]:null;if(y===null){let k=xe(o,a[p]);ve(k,i[g]),c[g]=k}else c[g]=ve(y,i[g]),xe(o,a[p],y),a[w]=null;g++}else Rt(a[m]),m--;else Rt(a[p]),p++;for(;g<=_;){let w=xe(o,c[_+1]);ve(w,i[g]),c[g++]=w}for(;p<=m;){let w=a[p++];w!==null&&Rt(w)}return this.Pt=r,Ke(o,c),Y}}),ta="important",no=" !"+ta,$r=ee(class extends re{constructor(o){if(super(o),o.type!==1||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((e,t)=>{let s=o[t];return s==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(o,[e]){let{style:t}=o.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(e)),this.render(e);for(let s of this.Mt)e[s]==null&&(this.Mt.delete(s),s.includes("-")?t.removeProperty(s):t[s]=null);for(let s in e){let a=e[s];if(a!=null){this.Mt.add(s);let i=typeof a=="string"&&a.endsWith(no);s.includes("-")||i?t.setProperty(s,i?a.slice(0,-11):a,i?ta:""):t[s]=a}}return Y}}),yr=ee(class extends re{constructor(o){if(super(o),o.type!==2)throw Error("templateContent can only be used in child bindings")}render(o){return this.At===o?Y:(this.At=o,document.importNode(o.content,!0))}}),Pe=class extends re{constructor(e){if(super(e),this.gt=u,e.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this.kt=void 0,this.gt=e;if(e===Y)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.gt)return this.kt;this.gt=e;let t=[e];return t.raw=t,this.kt={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Pe.directiveName="unsafeHTML",Pe.resultType=1;var kr=ee(Pe);var Qe=class extends Pe{};Qe.directiveName="unsafeSVG",Qe.resultType=2;var U=ee(Qe),Hs=o=>!eo(o)&&typeof o.then=="function",Bs=1073741823;var Nt=class extends Je{constructor(){super(...arguments),this.Ot=Bs,this.Ut=[],this.ft=new pt(this),this.vt=new ut}render(...e){return e.find(t=>!Hs(t))??Y}update(e,t){let s=this.Ut,a=s.length;this.Ut=t;let i=this.ft,r=this.vt;this.isConnected||this.disconnected();for(let n=0;n<t.length&&!(n>this.Ot);n++){let c=t[n];if(!Hs(c))return this.Ot=n,c;n<a&&c===s[n]||(this.Ot=Bs,a=0,Promise.resolve(c).then(async d=>{for(;r.get();)await r.get();let h=i.deref();if(h!==void 0){let p=h.Ut.indexOf(c);p>-1&&p<h.Ot&&(h.Ot=p,h.setValue(d))}}))}return Y}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Ar=ee(Nt);var lo=Symbol.for(""),co=o=>{if(o?.r===lo)return o?._$litStatic$};var Vs=new Map,sa=o=>(e,...t)=>{let s=t.length,a,i,r=[],n=[],c,d=0,h=!1;for(;d<s;){for(c=e[d];d<s&&(i=t[d],(a=co(i))!==void 0);)c+=a+e[++d],h=!0;d!==s&&n.push(i),r.push(c),d++}if(d===s&&r.push(e[s]),h){let p=r.join("$$lit$$");(e=Vs.get(p))===void 0&&(r.raw=r,Vs.set(p,e=r)),t=n}return o(e,...t)},Sr=sa(l),Mr=sa(Ji);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var D={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',copy:'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-bar":'<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 16h8" /><path d="M7 11h12" /><path d="M7 6h3" />',"calendar-off":'<path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" /><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" /><path d="M16 2v4" /><path d="M3 10h7" /><path d="M21 10h-5.5" /><path d="m2 2 20 20" />',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',"chevron-up":'<path d="m18 15-6-6-6 6"/>',sunrise:'<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',ban:'<circle cx="12" cy="12" r="10"/><path d="M4.929 4.929 19.07 19.071"/>',paperclip:'<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>',"file-text":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',"door-open":'<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>',"hard-hat":'<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',"message-circle":'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />',layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',receipt:'<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>',hourglass:'<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',"user-round":'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'};var aa="https://github.com/diegozapella63",ho=[["CronologIA","cronologia-ha","calendar-days","Agenda da fam\xEDlia, rem\xE9dios, rotinas e placar."],["ResolvIA","resolvia-ha","list-checks","Listas de tarefas com prazos, pontos e repeti\xE7\xE3o."],["GerencIA","gerencia-ha","wallet","Finan\xE7as da casa: caixa, cart\xF5es e investimentos."],["InventarIA","inventario-ha","package","Invent\xE1rio da casa: c\xF4modos, itens e valores."],["EconomIA","economia-ha","receipt","Lista de compras com o melhor pre\xE7o perto de casa."],["MemorIA","memoria-ha","book-open","Cadernos de anota\xE7\xE3o que abrem na hora certa."],["CorrerIA","correria-ha","message-circle","Pergunte e pe\xE7a a qualquer app, no chat ou no WhatsApp."]],Re=o=>l`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D.info)}</svg>`,po=o=>l`<span class="ab-wm">${o.slice(0,-2)}<span>${o.slice(-2)}</span></span>`,ia=(o,e,t)=>l`<a class=${t} href=${o} target="_blank" rel="noopener">${e}</a>`;function oa({app:o,version:e}){return l`<div class="about">
    <div class="about-hero">
      <span class="ab-mark" aria-hidden="true">${Re("zap")}</span>
      <h2 class="ab-name">Correr<span>IA</span> Code</h2>
      <p class="ab-what">desenvolvimento de softwares</p>
      <p class="ab-tag">Feito na correria, rodado pela IA.</p>
    </div>

    <div class="panel about-why">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${Re("hourglass")}</span><h2>Por que CorrerIA?</h2></div>
      <p>Porque eu sou um programador sem tempo: vivo na correria. Então eu uso a IA para rodar tudo isso aqui. Ela escreve, testa e publica; eu dou as ideias e reclamo dos botões tortos.</p>
    </div>

    <div class="panel">
      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${Re("layers")}</span><h2>Os apps</h2></div>
      <ul class="about-apps" aria-label="Os apps">
        ${ho.map(([t,s,a,i])=>l`<li>
            ${ia(`${aa}/${s}`,l`<span class="mais-ic" aria-hidden="true">${Re(a)}</span>
                <span class="mb"><b class="ab-app">${po(t)}${t===o?l`<em class="ab-here">Este app · v${e}</em>`:""}</b><span>${i}</span></span>
                ${Re("external-link")}`,`ab-row${t===o?" here":""}`)}
          </li>`)}
      </ul>
    </div>

    ${ia(aa,l`${Re("external-link")}Meu GitHub`,"btn primary ab-github")}
  </div>`}var ra=ft`
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
`;var Jt=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D.star||"")}</svg>`,uo=3e4,mo="Uma mem\xF3ria s\xF3, da casa, compartilhada por todos os apps: o que voc\xEA escreve aqui a IA lembra em toda conversa, em qualquer um deles.";function fo(o){let e=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/.exec(o&&o.em||"");return[e?`${e[3]}/${e[2]}/${e[1]} ${e[4]}:${e[5]}`:"",o&&o.app,o&&o.quem].filter(Boolean).join(" \xB7 ")}var na=`
  .mem-ia .mem-campo { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
  .mem-ia .mem-campo .label { display: flex; align-items: center; gap: 8px; }
  .mem-ia textarea { width: 100%; box-sizing: border-box; height: 50px; min-height: 50px; resize: vertical; padding: 13px 14px; border-radius: 12px;
    border: 1px solid var(--rv-line-strong); background: var(--rv-surface-2); color: var(--rv-text); font: inherit; }
  .mem-ia textarea:focus { outline: none; border-color: var(--rv-accent); }
  .mem-ia .ai-actions { margin-top: 10px; }
  .mem-ia .mem-lista { list-style: none; margin: 14px 0 0; padding: 0; }
  .mem-ia .mem-lista li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid var(--rv-line); }
  .mem-ia .mem-lista li:first-child { border-top: 0; padding-top: 0; }
  .mem-ia .mem-lista li > span { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow-wrap: anywhere; }
  .mem-ia .mem-lista small { color: var(--rv-muted); font-size: 13px; }
  .mem-ia .mem-del { flex: none; width: 44px; height: 44px; padding: 0; display: grid; place-items: center; border-radius: 12px;
    border: 1px solid var(--rv-line-strong); background: transparent; color: var(--rv-text); cursor: pointer; }
  .mem-ia .mem-del svg { width: 20px; height: 20px; }
`,la=o=>class extends o{_memoriaIaLoad(e=Date.now()){this._memIaAt&&e-this._memIaAt<uo||(this._memIaAt=e,this._memIa===void 0&&(this._memIa=null),this._memoriaIaDo("get"))}async _memoriaIaDo(e,t={}){try{let s=await this._memoriaIaCall(e,t);this._memIa={lista:Array.isArray(s&&s.lista)?s.lista:[],max:s&&s.max||60}}catch(s){return e!=="get"&&this._showToast(s&&s.message||"N\xE3o consegui salvar"),!1}return this.requestUpdate(),!0}async _memoriaIaAdd(){let e=this.renderRoot&&this.renderRoot.querySelector("#mem-ia-texto");e&&await this._memoriaIaDo("add",{texto:e.value})&&(e.value="",this._showToast("A IA vai lembrar"))}async _memoriaIaDel(e){await this._memoriaIaDo("del",{frase:e})&&this._showToast("Apagado da mem\xF3ria")}_renderMemoriaIa(){this._memoriaIaLoad();let e=this._memIa&&this._memIa.lista||[];return l`<div class="panel mem-ia" id="memoria-ia">
        ${this._secHead("sparkles","Mem\xF3ria da IA",mo)}
        <div class="mem-campo">
          <label class="label" for="mem-ia-texto">${Jt("star","lbl-ic")}O que lembrar</label>
          <textarea id="mem-ia-texto" rows="1" maxlength="240" data-size="off" placeholder="O café é sempre o da marca azul" aria-label="O que lembrar"></textarea>
        </div>
        <div class="ai-actions"><button class="btn primary" id="mem-ia-salvar" @click=${()=>this._memoriaIaAdd()}>${Jt("check")}Salvar</button></div>
        ${e.length?l`<ul class="mem-lista">${e.map(t=>l`<li><span><b>${t.texto}</b><small>${fo(t)}</small></span><button class="mem-del" aria-label="Apagar" @click=${()=>this._memoriaIaDel(t.id)}>${Jt("trash")}</button></li>`)}</ul>`:u}
      </div>`}};var ca="./fonts/barlow-400.woff2";var da="./fonts/barlow-500.woff2";var ha="./fonts/barlow-600.woff2";var pa="./fonts/barlow-condensed-500.woff2";var ua="./fonts/barlow-condensed-600.woff2";var ma="./fonts/barlow-condensed-700.woff2";var fa='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',ga=`"RV Barlow", ${fa}`,va=`"RV Barlow Condensed", ${fa}`;function ba(){if(document.getElementById("resolvia-fonts"))return;let o=(t,s,a)=>`@font-face{font-family:"${t}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,e=document.createElement("style");e.id="resolvia-fonts",e.textContent=[o("RV Barlow",ca,400),o("RV Barlow",da,500),o("RV Barlow",ha,"600 900"),o("RV Barlow Condensed",pa,500),o("RV Barlow Condensed",ua,600),o("RV Barlow Condensed",ma,"700 900")].join(`
`),document.head.appendChild(e)}var Qt=()=>l`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var $o=o=>l`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o])}</svg>`;function xa(o,e,t,s,a="Inativas"){if(!t.length)return u;let i=!!(o._folds&&o._folds[e]);return l`<button class="inact-head ${i?"open":""}" data-fold=${e} aria-expanded=${i?"true":"false"} @click=${()=>o._folds={...o._folds||{},[e]:!i}}>
      ${$o(i?"chevron-down":"chevron-right")}<span class="label">${a} <span class="count">(${t.length})</span></span>
    </button>
    ${i?se(t,r=>r.id,s):u}`}var yo="(min-width: 1000px)";function _a(o,e=""){if(!o.touches||o.touches.length!==1||window.matchMedia&&window.matchMedia(yo).matches)return null;let t=o.touches[0];if(t.clientX<24||t.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${e?`, ${e}`:""}`;for(let a of o.composedPath()){if(a===o.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let i=getComputedStyle(a);if((i.overflowX==="auto"||i.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:t.clientX,y:t.clientY,at:Date.now()}}function wa(o,e){if(!e||!o.changedTouches||!o.changedTouches.length)return 0;let t=o.changedTouches[0],s=t.clientX-e.x,a=t.clientY-e.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-e.at>800?0:s<0?1:-1}async function bt(o,e,t){for(let a=0;a<30&&o._view().name!==e;a++)await new Promise(i=>setTimeout(i,16));await o.updateComplete;let s=o.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${t>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var $a=ft`
  :host {
    --rv-body: ${ne(ga)};
    --rv-display: ${ne(va)};
    /* the background and the cards are the ones of the Home Assistant theme (hatema.js, the same in all the apps); the
       grays come from them and the text, so every app of the family has the same background */
    --rv-bg: var(--ha-bg-light, #fafafa);
    --rv-surface: var(--ha-card-light, #ffffff);
    --rv-surface-2: color-mix(in srgb, var(--rv-surface) 95%, var(--rv-text));
    --rv-line: color-mix(in srgb, var(--rv-surface) 91%, var(--rv-text));
    --rv-line-strong: color-mix(in srgb, var(--rv-surface) 81%, var(--rv-text));
    --rv-text: #231a1b;
    --rv-text-2: #4a3f40;
    --rv-muted: #7b6d6e;
    --rv-faint: #ab9c9d;
    --rv-nav: var(--rv-surface);
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
    --rv-skeleton: color-mix(in srgb, var(--rv-surface) 92%, var(--rv-text));
    --rv-header-bg: var(--app-header-background-color, var(--rv-bg));
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
    --rv-bg: var(--ha-bg-dark, #111111);
    --rv-surface: var(--ha-card-dark, #1c1c1c);
    --rv-text: #f5eeee;
    --rv-text-2: #dbd0d0;
    --rv-muted: #a59798;
    --rv-faint: #716465;
    --rv-scrim: rgba(0, 0, 0, 0.6);
    --rv-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
    --rv-late: #ff6b5e;
    --rv-late-soft: rgba(255, 107, 94, 0.14);
    --rv-today: #ffb547;
    --rv-today-soft: rgba(255, 181, 71, 0.14);
    --rv-ext: #a5b4fc;
    --rv-ext-soft: rgba(129, 140, 248, 0.18);
    --rv-header-bg: var(--app-header-background-color, var(--rv-bg));
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
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* 2.79.0: Nenhum, Casa, Bens */
  }
  .seg.where button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 0;
    padding-left: 4px;
    padding-right: 4px;
  }
  /* a site named in a text opens it (2.79.0) */
  a.site {
    color: var(--accent);
    font-weight: 600;
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
  /* 2.78.0: as Notas fechadas mostram o começo do que há nelas (uma linha), para não esconder que existem */
  .sheet .field > .shut-val {
    display: none;
  }
  .sheet .field.dobravel.shut > .shut-val {
    display: block !important;
    margin: 4px 0 0 26px;
    font-size: 14px;
    color: var(--rv-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  /* 2.85.0: Buscar › Agrupar por: Lista, Prazo and (with the rooms) Cômodo, side by side, the same size */
  .agrupar {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: 8px;
    margin: 0 0 18px;
  }
  .agrupar .pick {
    justify-content: center;
    min-width: 0;
    min-height: 42px;
    padding-left: 8px;
    padding-right: 8px;
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
  /* Mais › Listas and the tab Listas: the lists turned off, folded at the end under Nome (n): the thin line of every
     app of the family (as Ocultos (n) in the CronologIA), with the arrow before the name */
  .inact-head {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 4px 8px;
    text-align: left;
    color: var(--rv-muted);
    font-weight: 600;
    font-size: 14px;
  }
  .inact-head .i {
    flex: none;
    width: 18px;
    height: 18px;
  }
  .inact-head .count {
    font-variant-numeric: tabular-nums;
  }
  /* 2.78.0: na aba Listas, a linha fica direto na página (sem um cartão em volta); aberta, as listas no cartão delas */
  .inact-grp > .inact-head {
    padding: 10px 18px 12px;
  }
  /* 2.80.0: Onde na alteração em lote: Manter, Nenhum, Casa, Bens */
  .seg.where.four {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .seg.where.four button {
    font-size: 13px;
    gap: 4px;
  }
  /* 2.80.0: Pontos para quem concluir: os botões na mesma grade, três por linha no celular */
  .chip-row.grid.pts-row {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 6.6em), 1fr));
  }
  /* 2.80.0: Personalizar › Opções: as chaves com a letra dos títulos de cima (Cor, Ícone) */
  .sheet .opt-rows .row {
    padding: 8px 0;
    border: 0;
  }
  .sheet .opt-rows .row .label {
    font-size: 14px;
    font-weight: 500;
    color: var(--rv-text-2);
  }
  /* 2.83.0: Novo item › Fotos e mensagens: duas linhas no mesmo bloco, cada uma com o nome do que faz */
  .imp-sub {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--rv-muted);
    margin: 2px 0 8px;
  }
  .imp-tiles + .imp-sub,
  .imp-help + .imp-sub {
    margin-top: 14px;
  }
  .imp-tiles.photo-tiles {
    grid-template-columns: repeat(2, 1fr);
  }
  .imp-tiles.photo-tiles .imp-tile {
    aspect-ratio: auto;
    min-height: 56px;
    grid-auto-flow: column;
    justify-content: center;
    gap: 8px;
  }
  /* 2.81.0: as fotos de uma tarefa: Tirar foto e Escolher fotos lado a lado, as fotos em quadrados embaixo */
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 8px;
    margin-top: 10px;
  }
  .photo {
    position: relative;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    background: var(--rv-bg);
    border: 1px solid var(--rv-line);
  }
  .photo.busy {
    display: grid;
    place-items: center;
    color: var(--rv-muted);
  }
  .photo-open {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .photo-open img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .photo-x {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.62);
    color: #fff;
  }
  .photo-x .i {
    width: 16px;
    height: 16px;
  }
  .photo-view {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.9);
    padding: 12px;
  }
  .photo-view img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
  .photo-view .photo-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
  /* 2.80.0: Agora › Compras: os itens no cartão, embaixo do nome da lista */
  .shop-more {
    width: 100%;
    justify-content: center;
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
  .panel > .row:not(:has(> .tile)):not(:has(> .em-icon)) {
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
`;var ya=["dom","seg","ter","qua","qui","sex","s\xE1b"],ka={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es",conversa:"Conversa"},Aa={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},we=o=>String(o).padStart(2,"0"),Xt=o=>`${o.getFullYear()}-${we(o.getMonth()+1)}-${we(o.getDate())}`,xt=o=>{let[e,t,s]=o.split("-").map(Number);return new Date(e,t-1,s)},qa=o=>String(Math.round(o*10)/10).replace(".",","),Sa=o=>o>=1e3?`${qa(o/1e3)} mil`:String(Math.round(o||0)),Ma=o=>`${o} ${o===1?"chamada":"chamadas"}`,ko=(o,e={})=>e[o]||(o||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",Ao=(o,e)=>{let t=new Date(o);if(!Number.isFinite(t.getTime()))return"";let s=`${we(t.getHours())}:${we(t.getMinutes())}`;return Xt(t)===Xt(e)?`hoje ${s}`:`${we(t.getDate())}/${we(t.getMonth()+1)} ${s}`},_t=(o,e)=>l`<a href=${o} target="_blank" rel="noopener">${e}</a>`,So=[[/google|gemini/,()=>l`Gemini: consumo e cota no ${_t("https://aistudio.google.com/","Google AI Studio")}, em Dashboard › Usage; o saldo dos créditos, em Billing.`],[/openai|chatgpt|gpt/,()=>l`OpenAI: consumo e custo em ${_t("https://platform.openai.com/usage","platform.openai.com/usage")}.`],[/anthropic|claude/,()=>l`Claude: consumo e custo no ${_t("https://platform.claude.com/usage","Claude Console")}; o saldo dos créditos, em ${_t("https://platform.claude.com/settings/billing","Billing")}.`]];function Mo(o,e={}){let t=o.map(a=>`${a} ${e[a]||""}`).join(" ").toLowerCase(),s=So.filter(([a])=>a.test(t));return s.length?s.map(([,a])=>l`<p class="uso-note">${a()}</p>`):l`<p class="uso-note">O consumo exato fica no painel do provedor da IA.</p>`}function Ea({u:o,day:e,onDay:t,head:s,app:a,using:i="",names:r={}}){if(!o||!o.hoje)return l`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let n=new Date,c=Xt(n),d=x=>x.cota?l`<span class="s alert">${x.cota} ${x.cota>1?"vezes":"vez"} sem cota</span>`:x.erros?l`<span class="s alert">${x.erros} com erro</span>`:l`<span class="s">≈ ${Sa(x.tokens)} tokens</span>`,h=(x,S)=>l`<div class="uso-tile"><span class="k">${x}</span><span class="v">${S.chamadas||0}</span>${d(S)}</div>`,p=o.dias||[],m=Math.max(1,...p.map(x=>x.chamadas||0)),g=p.find(x=>x.dia===e)||p.find(x=>x.dia===c)||{dia:c,chamadas:0,erros:0,cota:0},_=x=>x.dia===c?"hoje":ya[xt(x.dia).getDay()],w=o.semana&&o.semana.tipos||{},y=[...Object.keys(o.mes&&o.mes.ias||{}),...Object.keys(o.semana&&o.semana.ias||{}),...[].concat(i)].filter(Boolean),k=o.ultimas||[];return l`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${h("Hoje",o.hoje)}${h("7 dias",o.semana)}${h("Este m\xEAs",o.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${p.map(x=>{let S=x.chamadas?Math.max(4,Math.round(x.chamadas/m*100)):0;return l`<button type="button" class="uso-bar ${x.dia===c?"today":""}" aria-pressed=${x.dia===g.dia?"true":"false"} aria-label="${_(x)}: ${Ma(x.chamadas)}" @click=${()=>t(x.dia)}><i style="height:${S}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${p.map(x=>l`<span>${_(x)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${g.dia===c?"Hoje":`${ya[xt(g.dia).getDay()]}, ${we(xt(g.dia).getDate())}/${we(xt(g.dia).getMonth()+1)}`}: <b>${Ma(g.chamadas)}</b>${g.erros?`, ${g.erros} com erro`:""}${g.cota?`, ${g.cota} sem cota`:""}.</p>
    ${Object.keys(w).length?l`<ul class="uso-kinds">${Object.keys(w).sort((x,S)=>w[S]-w[x]).map(x=>l`<li>${ka[x]||x} <b>${w[x]}</b></li>`)}</ul>`:u}
    <details class="uso-last">
      <summary><svg class="uso-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg><span>Últimas chamadas${k.length?` (${k.length})`:""}</span><svg class="uso-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
      <ul>
        ${k.length?k.map(x=>l`<li><b>${ka[x.tipo]||x.tipo}</b><span>${ko(x.ia,r)}</span>${Aa[x.resultado]?l`<span class="r-err">${Aa[x.resultado]}</span>`:u}
                <span class="t">${qa(x.segundos)} s · ≈ ${Sa(x.tokens)} tokens${x.imagens?` \xB7 ${x.imagens} ${x.imagens>1?"imagens":"imagem"}`:""} · ${Ao(x.quando,n)}</span></li>`):l`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    ${Mo(y,r)}
  </div>`}var Oa=`
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
`;var qo=/[̀-ͯ]/g,Ca=o=>o.normalize("NFD").replace(qo,"").toLowerCase()||o.toLowerCase(),wt=o=>[...String(o||"")].map(Ca).join("");function Eo(o,{room:e=null,query:t=""}={}){let s=wt(t).split(/\s+/).filter(Boolean),a=c=>wt(`${c.nome} ${c.zona||""} ${c.roomName||""}`),i=c=>s.every(d=>a(c).includes(d)),r=c=>{if(!s.length)return 0;let d=wt(c.nome);return d.startsWith(s[0])?0:d.includes(s[0])?1:2},n=o.filter(i).sort((c,d)=>r(c)-r(d)||c.nome.localeCompare(d.nome,"pt-BR"));return e?{inRoom:n.filter(c=>c.roomId===e),others:s.length?n.filter(c=>c.roomId!==e):[]}:{inRoom:[],others:s.length?n:[]}}function Oo(o,e,t){let s=wt(t).split(/\s+/).filter(Boolean)[0];if(!s)return e;let a=[...e],i=a.map(Ca),r=-1,n=-1;for(let c=0;c<a.length&&r<0;c++){let d="";for(let h=c;h<a.length;h++){if(d+=i[h],d===s){r=c,n=h+1;break}if(!s.startsWith(d))break}}return r<0?e:o`${a.slice(0,r).join("")}<mark>${a.slice(r,n).join("")}</mark>${a.slice(n).join("")}`}function Xe({lit:o,icon:e,items:t,room:s=null,roomName:a="",value:i=null,query:r="",more:n=!1,onQuery:c,onPick:d,onMore:h,onRemove:p,onAdd:m,adding:g=!1,autofocus:_=!1,bens:w=!1}){let{html:y,nothing:k}=o,x=(C,$)=>y`<div class="eq-sel">
      <span class="eq-ic">${e("package")}</span>
      <span class="eq-tx"><b>${C.nome}</b><small>${[C.zona,C.roomName].filter(Boolean).join(" \xB7 ")||"Sem c\xF4modo"}</small></span>
      <button type="button" class="icon-btn mini" aria-label="Tirar ${C.nome}" @click=${$}>${e("x")}</button>
    </div>`;if(Array.isArray(i)){let C=i.map(b=>t.find(A=>A.id===b)).filter(Boolean),$=C.map(b=>x(b,()=>p(b.id)));if(C.length&&!g)return y`<div class="eq-pick">${$}<button type="button" class="eq-more eq-add" @click=${()=>m()}>${e("plus")}${w?"Outro bem":"Outro equipamento"}</button></div>`;let v=t.filter(b=>!i.includes(b.id));return y`<div class="eq-pick">${$}${M(v,C.length>0||_)}</div>`}let S=i?t.find(C=>C.id===i):null;if(S)return x(S,()=>d(null));return M(t,_);function M(C,$){let{inRoom:v,others:b}=Eo(C,{room:s,query:r}),A=n?40:6,q=(B,R)=>y`<button type="button" class="eq-row" @click=${()=>d(B.id)}>
    <span class="eq-ic">${e("package")}</span>
    <span class="eq-tx"><b>${Oo(y,B.nome,r)}</b>${[B.zona,R?B.roomName:""].filter(Boolean).length?y`<small>${[B.zona,R?B.roomName:""].filter(Boolean).join(" \xB7 ")}</small>`:k}</span>
  </button>`,P=v.slice(0,A),z=b.slice(0,Math.max(0,A-P.length)),j=v.length+b.length-P.length-z.length,J=k;return!r&&!s?J=y`<p class="eq-hint">Escolha o cômodo ou busque entre ${C.length} ${C.length===1?"equipamento":"equipamentos"}.</p>`:!r&&s&&!v.length?J=y`<p class="eq-hint">${w?"Nenhum bem no InventarIA.":`Nenhum equipamento em ${a}. Busque nos outros c\xF4modos.`}</p>`:r&&!v.length&&!b.length&&(J=y`<p class="eq-hint">Nada com “${r}”.</p>`),y`<div class="eq-pick">
    <label class="eq-search">${e("search")}<input type="search" .value=${r} placeholder=${s?`Buscar em ${a}\u2026`:"Buscar equipamento\u2026"} aria-label="Buscar equipamento" ?autofocus=${$} @input=${B=>c(B.target.value)} /></label>
    ${P.length?y`<div class="eq-list">${P.map(B=>q(B,!1))}</div>`:k}
    ${z.length?y`${s?y`<div class="eq-head">Em outros cômodos</div>`:k}<div class="eq-list">${z.map(B=>q(B,!0))}</div>`:k}
    ${j>0?y`<button type="button" class="eq-more" @click=${()=>h()}>${e("chevron-down")}Mostrar mais ${j}</button>`:k}
    ${J}
  </div>`}}var Ia=`
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
`;var Gt="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",Co="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function Ta(o,e=new Date){let t=o.filter(a=>a.id!=="grafite"),s=Math.floor(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/864e5);return t[(s%t.length+t.length)%t.length]}function za({theme:o,onTheme:e,icon:t}){return l`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Sistema","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,i])=>l`<button type="button" class=${o===s?"on":""} role="radio" aria-checked=${o===s?"true":"false"} @click=${()=>e(s)}>${t(i)}<span>${a}</span></button>`)}
  </div>`}function Pa({palette:o,value:e,onPick:t}){return l`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${o.map(s=>l`<button type="button" class="tsw ${e===s.id?"on":""}" role="radio" aria-checked=${e===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>t(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${Gt}></path><path class="sw-gap" d=${Gt}></path><path class="sw-fill" d=${Gt+Co}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var Ra=`
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
`;var E={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},T=(o,e)=>((o||0)&e)===e,fe=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"verde",label:"Verde",fill:"#8BD45F",ink:"#3F7A17"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"turquesa",label:"Turquesa",fill:"#3CCBDA",ink:"#0B7285"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"indigo",label:"\xCDndigo",fill:"#8F9BFF",ink:"#3D4BC2"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"grafite",label:"Grafite",fill:"#B5B9C2",ink:"#4E5560"}],Da=["vermelho","coral","rosa","laranja","lilas","ouro"],Io={framboesa:"#E8508A"},La=o=>{let e=parseInt(o.replace("#",""),16);return[e>>16&255,e>>8&255,e&255]};function To(o){let[e,t,s]=La(o),a=fe[0],i=1/0;for(let r of fe){let[n,c,d]=La(r.fill),h=(e-n)**2+(t-c)**2+(s-d)**2;h<i&&([a,i]=[r,h])}return a}var Ee=o=>{let e=fe.find(s=>s.id===o);if(e||typeof o!="string")return e;let t=Io[o]||(/^#[0-9a-f]{6}$/i.test(o)?o:null);return t?To(t):void 0},es=o=>Ee(Da[o%Da.length]);function yt(o,e){let t=o.replace("#",""),s=parseInt(t.length===3?t.replace(/./g,a=>a+a):t,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${e})`}var ts={id:"sem",label:"Sem cor",fill:"",ink:"",none:!0};function W(o,e,t="c"){return o&&o.none?`--${t}:var(--rv-text-2);--${t}i:var(--rv-text-2);--${t}s:var(--rv-surface-2);`:`--${t}:${o.fill};--${t}i:${e?o.fill:o.ink};--${t}s:${yt(o.fill,e?.17:.15)};`}var N=o=>(o||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),Fa=o=>Array.from(o||"",e=>{if(e.length!==1)return e;let t=e.normalize("NFD")[0]||e;return t.toLowerCase().length===1?t.toLowerCase():e}).join(""),O=(o,e,t)=>`${o} ${o===1?e:t}`,Na=o=>String(o||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),L=(o,e=38)=>o.length>e?o.slice(0,e-1).trimEnd()+"\u2026":o;function Ha(o,e){let t=o.states[e],s=t&&t.attributes&&t.attributes.friendly_name||e.split(".")[1].replace(/_/g," "),a=o.entities&&o.entities[e],i=a&&a.device_id&&o.devices?o.devices[a.device_id]:void 0,r=i?i.name_by_user||i.name:void 0,n=s,c=r||null;return r&&s.toLowerCase().startsWith(r.toLowerCase()+" ")&&(n=s.slice(r.length+1)),n=n.charAt(0).toUpperCase()+n.slice(1),{name:n,group:c}}var zo=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/\bpets?\b|cachorro|dog\b/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function ss(o){let e=N(o);for(let[t,s]of zo)if(t.test(e))return s;return"list-checks"}var Ba=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],Po=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],Ro=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],$t=o=>String(o).padStart(2,"0"),$e=o=>`${o.getFullYear()}-${$t(o.getMonth()+1)}-${$t(o.getDate())}`,Do=o=>`${$t(o.getHours())}:${$t(o.getMinutes())}`;function kt(o){let[e,t,s]=o.split("-").map(Number);return new Date(e,t-1,s)}function Zt(o,e){let t=new Date(o.getFullYear(),o.getMonth(),o.getDate());return t.setDate(t.getDate()+e),t}function le(o){if(!o)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(o)){let t=kt(o);return{date:o,time:null,at:new Date(t.getFullYear(),t.getMonth(),t.getDate(),23,59,59)}}let e=new Date(o);return isNaN(e)?null:{date:$e(e),time:Do(e),at:e}}function as(o,e=new Date){let t=kt(o),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return Math.round((t-s)/864e5)}function At(o,e=new Date){let t=kt(o),s=`${t.getDate()} ${Ro[t.getMonth()]}`;return t.getFullYear()===e.getFullYear()?s:`${s} ${t.getFullYear()}`}function ae(o,e=new Date){let t=le(o);if(!t)return null;let s=as(t.date,e),a=t.at<e,i;s===0?i="Hoje":s===1?i="Amanh\xE3":s===-1?i="Ontem":s>1&&s<7?i=Po[kt(t.date).getDay()]:i=At(t.date,e),t.time&&(i+=`, ${t.time}`);let r=a?"late":s===0?"today":s<=2?"soon":"later";return{...t,diff:s,overdue:a,text:i,tone:r}}function is(o=new Date){let e=o.getDay(),t=(6-e+7)%7||7,s=(1-e+7)%7||7,a=[{label:"Hoje",date:$e(o)},{label:"Amanh\xE3",date:$e(Zt(o,1))}];return t>1&&a.push({label:"S\xE1bado",date:$e(Zt(o,t))}),s>1&&a.push({label:"Pr\xF3x. semana",date:$e(Zt(o,s))}),a}function os(o=null){let e=Array.from({length:48},(t,s)=>`${String(s>>1).padStart(2,"0")}:${s%2?"30":"00"}`);return/^([01]\d|2[0-3]):[0-5]\d$/.test(o||"")&&!e.includes(o)&&(e.push(o),e.sort()),e}function Va(o,e=new Date){let t=e.getHours(),s=t>=5&&t<12?"Bom dia":t>=12&&t<18?"Boa tarde":"Boa noite",a=(o||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var Lo=/\bhttps?:\/\/[^\s<>"'`]+/gi;function Fo(o){let e;try{e=new URL(o)}catch{return{label:o,icon:"link"}}let t=e.hostname.replace(/^www\./,""),s=e.pathname.split("/").filter(Boolean);if(t==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${t} \u203A ${a}`,icon:"link"}:{label:t,icon:"link"}}function ja(o){let e=[],t=0,s=o||"";for(let a of s.matchAll(Lo)){let i=a[0],r=i.match(/[.,;:!?)\]}]+$/);r&&(i=i.slice(0,-r[0].length)),a.index>t&&e.push({text:s.slice(t,a.index)}),e.push({url:i,...Fo(i)}),t=a.index+i.length}return t<s.length&&e.push({text:s.slice(t)}),e}var No=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-](?!\d)|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,Ho=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function rs(o){let e=(o||"").split(/\r?\n/).map(a=>a.replace(Ho,"").trim()).filter(Boolean);e.length===1&&/[,;]|\se\s/i.test(e[0])&&(e=e[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let t=new Set,s=[];for(let a of e){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(No,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let i=a.toLowerCase();t.has(i)||(t.add(i),s.push(a.slice(0,255)))}return s}async function ns(o,e=1800){let t=s=>new Promise((a,i)=>{let r=new FileReader;r.onload=()=>a(String(r.result).split(",")[1]||""),r.onerror=()=>i(r.error),r.readAsDataURL(s)});try{let s=await createImageBitmap(o,{imageOrientation:"from-image"}),a=Math.min(1,e/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),s.close&&s.close();let r=await new Promise(n=>i.toBlob(n,"image/jpeg",.86));return{mime:"image/jpeg",data:await t(r),url:URL.createObjectURL(r)}}catch{return{mime:o.type||"image/jpeg",data:await t(o),url:URL.createObjectURL(o)}}}var he=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,Bo=o=>o>1048576?`${(o/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(o/1024))} KB`,Vo={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar","antes-de-apagar":"antes de apagar"},Ua=o=>class extends o{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(e){let t=new Date(e),s=a=>String(a).padStart(2,"0");return`${s(t.getDate())}/${s(t.getMonth()+1)}/${t.getFullYear()} \xE0s ${s(t.getHours())}:${s(t.getMinutes())}`}async _loadBackups(){let e=this._data();if(e){try{this._backups=await e.backups()}catch(t){this._backups={available:!1,error:t.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let e=await this._data().createBackup();this._showToast(`Backup salvo em ${e.folder}/${e.name}`),this._haptic("success"),await this._loadBackups()}catch(e){this._showToast(`N\xE3o consegui criar o backup. ${e.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(e,t){let s=this._data();(!s||!s.url(e))&&(t.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(e,t){let s=e.added||e.added===0?`${t}: ${e.added?O(e.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${O(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${t}: ${O(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return e.missing&&e.missing.length&&(s+=`. ${e.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${e.missing.join(", ")}`),e.unsupported&&(s+=`. ${O(e.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),e.failed&&(s+=`. ${O(e.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let e=this.renderRoot.querySelector("#rv-data-import");e&&(e.value="",e.click())}_onDataImport(e){let t=e.target.files&&e.target.files[0];e.target.value="",t&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${L(t.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(t);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(e){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(e.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let t=await this._data().restoreBackup(e.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(t,"Backup restaurado"))}catch(t){this._showToast(t.message)}}})}_confirmErase(){this._openSheet("confirm",{title:"Come\xE7ar do zero?",text:"Apaga as repeti\xE7\xF5es, os pontos, os c\xF4modos, os equipamentos e quem faz de cada tarefa. Os itens das listas e os ajustes continuam. Antes, o app guarda uma c\xF3pia em Vers\xF5es anteriores.",label:"Apagar tudo",run:async()=>{this._closeSheet();try{await this._data().erase(),await this._loadPrefs(),this._haptic("warning"),this._showToast("Pronto: come\xE7ando do zero. A c\xF3pia est\xE1 em Vers\xF5es anteriores.")}catch(e){this._showToast(`N\xE3o consegui apagar. ${e.message}`)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let e=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:e})}catch(e){this._sheet==="versions"&&(this._form={...this._form,error:e.message})}}_confirmRestoreVersion(e){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(e.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(e.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(t){this._showToast(t.message)}}})}_renderVersions(){let e=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">${he("archive-restore","sh-ic")}Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${he("x")}</button>
        </div>
        ${e.error?l`<div class="imp-error">${he("circle-alert")}<span>${e.error}</span></div>`:e.list==null?l`<div class="imp-loading"><span class="spin">${he("loader-circle")}</span><span>Carregando…</span></div>`:e.list.length?l`<div class="data-list">
                  ${e.list.map(t=>l`<div class="data-item">
                      <div><b>${this._dateTime(t.when)}</b><span>${O(t.lists,"lista personalizada","listas personalizadas")} · ${O(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${Vo[t.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(t)}>${he("archive-restore")}Restaurar</button>
                    </div>`)}
                </div>`:l`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let e=this._data();if(!e)return u;let t=this._backups,s=(a,i,r,n)=>l`<li>
        <div class="ot"><b>${i}</b><span>${r}</span></div>
        <a class="btn outline sm" href=${e.url(a)||"#"} download @click=${c=>this._exportData(a,c)}>${he("download")}${n}</a>
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
          ${this._secHead("archive","Backup na pasta share",l`Cópia completa em <code>share/resolvia</code>. Os backups do Home Assistant também incluem o ResolvIA.`)}
          <div class="btn-row sec-actions">
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||t&&t.available===!1} @click=${()=>this._createBackup()}>${he("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${t&&t.available===!1?l`<p class="data-note">A pasta share não está disponível para o app.</p>`:u}
          ${t&&t.backups&&t.backups.length?l`<div class="data-list">
                ${t.backups.slice(0,8).map(a=>l`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${Bo(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${he("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:u}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Um .zip ou .json exportado pelo ResolvIA, sem duplicar.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${he("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","Uma c\xF3pia dos ajustes e das repeti\xE7\xF5es a cada 10 minutos de uso e antes de importar, restaurar ou come\xE7ar do zero. Ficam as 3 mais recentes.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${he("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",l`Os itens ficam nas listas do Home Assistant; os ajustes, em <code>/data/resolvia.json</code>, no backup do Home Assistant.`)}
        </div>
        <div class="panel" id="zerar">
          ${this._secHead("trash","Come\xE7ar do zero","Apaga as repeti\xE7\xF5es, os pontos, os c\xF4modos, os equipamentos e quem faz. Os itens das listas e os ajustes continuam. Uma c\xF3pia fica em Vers\xF5es anteriores.")}
          <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmErase()}>${he("trash")}Apagar tudo</button></div>
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var ue=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,Wa=[5,10,20,30,50],Oe=o=>String(o||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),Ya=o=>{let e=/\[cr:[0-9a-f]{8}\]/.exec(String(o||""));return e?e[0]:""},jo={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},Ka=o=>class extends o{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let e=this._pts;return!!(e&&e.on&&e.placar&&e.placar.ativo)}_rawPoints(e,t){let s=this._pts&&this._pts.points&&this._pts.points[e];return s&&s[Na(t)]||0}_mirrored(e,t){let s=this._pts&&this._pts.espelho&&this._pts.espelho[e];return t&&s&&s[t]||null}_pointsOf(e,t,s=null){let a=this._mirrored(e,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(e,t):0}async _setTaskPoints(e,t,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:e,summary:t,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(`N\xE3o consegui salvar os pontos: ${i.message}`)}}async _setPointsOn(e){await this._saveAppPrefs({points_on:e?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(e,t,s,a,i=null){let r;try{r=await this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!0,...i?{quem:i}:{}})}catch(d){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${d.message}`,a);return}if(r&&r.ask){this._openSheet("who",{title:t.summary,points:r.points,participantes:r.participantes,run:d=>{this._closeSheet(!0),d?this._givePoints(e,t,s,a,d):this._showToast(s,a)}});return}if(!r||!r.points){this._showToast(s,a);return}let n=`Resolvido por ${r.who} \xB7 +${r.points}`,c=(r.participantes||[]).filter(d=>d!==r.who);if(c.length===1){let d=c[0];this._showToast(n,{label:`Foi ${d}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:r.key,quem:d}).then(()=>this._showToast(`Pontos para ${d}`)).catch(h=>this._showToast(h.message))})}else this._showToast(n,a)}_takePoints(e,t){!this._mirrored(e.id,t.uid)&&(!this._rawPoints(e.id,t.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:e.id,uid:t.uid,summary:t.summary,done:!1}).catch(()=>{})}_renderPointsTag(e,t){let s=this._pointsOf(e,t.summary,t.uid);return s?l`<span class="tag pts" title="${s} pontos para quem concluir">${ue("trophy")}+${s}</span>`:u}_renderPointsField(e){if(e.mirrored)return u;if(!(this._pts&&this._pts.on))return u;let t=this._pts.placar,s=e.points||0,a=e.pointsCustom||s>0&&!Wa.includes(s);return l`<div class="field">
        <span class="flabel">${ue("trophy","lbl-ic")}Pontos para quem concluir</span>
        <div class="chip-row grid pts-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>${ue("x")}<span>Sem pontos</span></button>
          ${Wa.map(i=>l`<button class="pick ${s===i&&!a?"on":""}" @click=${()=>this._setForm({points:i,pointsCustom:!1})}>${ue("trophy")}<span>+${i}</span></button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${ue("trophy")}<span>Outro</span></button>
        </div>
        ${a?l`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${i=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(i.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:u}
        ${s?l`<div class="field-hint">${ue("trophy")}<span>${t&&t.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${t.participantes.join(" \xD7 ")}).`:t&&t.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA.":"O placar do CronologIA est\xE1 desligado."}</span></div>`:u}
      </div>`}_renderWhoSheet(){let e=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">${ue("trophy","sh-ic")}Quem fez?</h3>
          <button class="icon-btn" @click=${()=>e.run("")} aria-label="Fechar">${ue("x")}</button>
        </div>
        <p class="sheet-note top">${L(e.title||"",40)} · <b>+${e.points} pontos</b></p>
        <div class="who-grid">
          ${(e.participantes||[]).map(t=>l`<button class="who-btn" @click=${()=>e.run(t)}><span class="who-av">${(t||"?").trim().charAt(0).toUpperCase()}</span><b>${t}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>e.run("")}>${ue("x")}Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let e=this._pts;if(!e)return u;let t=e.placar,s=!!e.on,a=Object.values(e.points||{}).reduce((n,c)=>n+Object.keys(c).length,0),i=l`<div class="row switch-row">
          <div class="grow">
            <div class="label">${ue("trophy","lbl-ic")}Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${O(a,"tarefa vale","tarefas valem")} pontos.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D.":"Desligado."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${n=>this._setPointsOn(n.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return l`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
          ${i}
        </div>`;let r=t?t.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${t.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Configura\xE7\xF5es \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:t.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${t.versao}`.trim(),text:`${t.participantes.join(" \xD7 ")} \xB7 fecha ${jo[t.periodo]||"toda semana"}. ${t.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${t.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${t.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return l`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
        ${i}
        <div class="sub-op"><div class="sub-box"><div class="ai-state ${r.tone}"><span class="dot"></span><div><b>${r.title}</b><span>${r.text}</span></div></div></div></div>
      </div>`}};var G=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,Uo=864e5,Ja=5,Wo=2;function ls(o){return o<14?O(o,"dia","dias"):o<60?O(Math.floor(o/7),"semana","semanas"):o<730?O(Math.floor(o/30),"m\xEAs","meses"):O(Math.floor(o/365),"ano","anos")}var Qa=o=>o.icon==="shopping-cart",Ge=[{id:"late",title:"Atrasados",icon:"triangle-alert",test:o=>o.overdue},{id:"today",title:"Hoje",icon:"calendar",test:o=>o.diff===0},{id:"tomorrow",title:"Amanh\xE3",icon:"sunrise",test:o=>o.diff===1},{id:"week",title:"Pr\xF3ximos 7 dias",icon:"calendar-days",test:o=>o.diff>1&&o.diff<7},{id:"later",title:"Mais adiante",icon:"hourglass",test:()=>!0}],Xa=8,Ce=["late","today","start","tomorrow","week","later","coming","shopping"];function Yo(o){let e=(Array.isArray(o)?o:[]).filter((t,s,a)=>Ce.includes(t)&&a.indexOf(t)===s);for(let t of Ce){if(e.includes(t))continue;let s=Ce.slice(0,Ce.indexOf(t)).reverse().find(a=>e.includes(a));e.splice(s?e.indexOf(s)+1:0,0,t)}return e}var Ko={late:["triangle-alert","Atrasados"],today:["calendar","Hoje"],start:["flag","Comece por aqui"],tomorrow:["sunrise","Amanh\xE3"],week:["calendar-days","Pr\xF3ximos 7 dias"],later:["hourglass","Mais adiante"],coming:["repeat","Voltam sozinhas"],shopping:["shopping-cart","Compras"]},Ga=o=>class extends o{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let e=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=e.ages||{},this._aiAsking||(this._aiPick=e.ai||null),this._aiBusy=!!e.busy||!!this._aiAsking,clearTimeout(this._aiPoll),e.busy&&!this._aiAsking&&(this._aiPoll=setTimeout(()=>this._loadSuggest(),3e3))}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(e,t,s=new Date){if(this._sinceDate(e,t))return Math.max(0,-as(le(t.due).date,s));let a=this._ages&&this._ages[e.id]&&t.uid?this._ages[e.id][t.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/Uo)):null}_sinceDate(e,t){return!e.canDue&&!!t.due&&!!le(t.due)}_suggestLists(){return this._visible().filter(e=>!e.unavailable&&e.items&&T(e.features,E.UPDATE))}_suggestions(e=new Set){let t=new Date,s=[],a=[],i=0,r=0;for(let d of this._suggestLists()){let h=d.items.filter(p=>p.status!=="completed");if(h.length){if(i+=h.length,r++,Qa(d)){let p=h.map(m=>this._ageOf(d,m,t)).filter(m=>m!=null);a.push({l:d,n:h.length,items:h,oldest:p.length?Math.max(...p):null});continue}h.forEach((p,m)=>{if(e.has(p))return;let g=[],_=0,w=this._ageOf(d,p,t);w!=null&&w>=3&&(_+=Math.min(w,60)/3,g.push(this._sinceDate(d,p)?`Assim h\xE1 ${ls(w)}`:`Na lista h\xE1 ${ls(w)}`)),h.length===1?(_+=8,g.push("\xC9 o \xFAltimo da lista")):h.length===2&&(_+=4,g.push("Faltam 2 para zerar a lista"));let y=this._pointsOf(d.id,p.summary,p.uid);y&&(_+=3+Math.min(y,50)/10),this._ruleFor(d.id,p)&&(_+=4,g.push("Voltou para fazer"));let k=d.canDue&&p.due?ae(p.due,t):null;if(k&&k.diff<=0){_+=k.diff<0?6:5;let x=this._mirrored(d.id,p.uid);g.push(x?`${x.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${k.diff<0?"atrasada":"para hoje"}`:k.diff<0?"A data j\xE1 passou":"Tem data para hoje")}m===0&&(_+=1.5),g.length||g.push(y?"Vale pontos":m===0?"Primeiro da lista":`${m+1}\xBA da lista`),s.push({l:d,i:p,idx:m,score:_,why:g.join(" \xB7 ")})})}}s.sort((d,h)=>h.score-d.score||d.idx-h.idx);let n=[],c=new Map;for(let d of s){if(d.score<=0)continue;let h=c.get(d.l.id)||0;if(!(h>=Wo)&&(c.set(d.l.id,h+1),n.push(d),n.length>=Ja))break}for(let d of s){if(n.length>=Ja)break;n.includes(d)||n.push(d)}return a.sort((d,h)=>h.n-d.n),{top:n,shopping:a,pending:i,lists:r}}async _askAi(){if(this._aiBusy)return;let e=new Date,t=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let i=this._ruleFor(s.id,a);t.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,e),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:i?i.days:0,compras:Qa(s),comodo:this._roomIdsOf(s.id,a.summary).map(r=>this._roomName(r)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(s.id,a.summary).map(r=>(this._equipOf(r)||{}).nome).filter(Boolean).join(", "),externo:(r=>r===!0?"sim":r||"")(this._externalOf(s.id,a.summary))})}if(t.length){this._aiBusy=!0,this._aiAsking=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:t.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiAsking=!1,this._aiBusy=!1,this.requestUpdate()}}async _clearAi(){this._aiPick=null,this._aiErr=null,this.requestUpdate();try{await this.hass.callWS({type:"resolvia/ai/suggest/clear"})}catch{}}_aiRows(){let e=this._aiPick,t=[];for(let s of e&&e.picks||[]){let a=s.key.indexOf("|"),i=this._list(s.key.slice(0,a)),r=i&&i.items&&i.items.find(n=>n.uid===s.key.slice(a+1));i&&r&&!i.hidden&&(r.status!=="completed"||this._recent.has(r.uid))&&t.push({l:i,i:r,why:s.motivo||"Escolhido pela IA",ai:!0})}return t}_renderStart(e){let t=this._aiOn()&&!!this.hass.resolvia,s=t?this._aiInfo():null,a=t?this._aiPick:null,i=a?this._aiRows():[],r=i.length>0,n=r?i:e.top;if(!n.length&&!t)return u;let c=!!this._aiBusy;return l`<div class="panel items start ${r?"by-ai":""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${G(r?"sparkles":"flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${n.length}</small></div>
        ${r?l`<p class="start-by">${G("sparkles")}<span>Escolhidos pela IA.</span></p>`:u}
        ${se(n,d=>d.l.id+(d.i.uid||d.i.summary),d=>this._renderItem(d.l,d.i,{showList:!0,why:d.why,whyIcon:d.ai?"sparkles":null}))}
        ${a&&!r?l`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>`:u}
        ${t&&!s.ready&&s.reason?l`<p class="ai-note">${s.reason}</p>`:u}
        ${this._aiErr?l`<p class="ai-note err">${this._aiErr}</p>`:u}
        ${t?l`<div class="ai-actions start-acts">
              <button class="btn ${r?"outline":"primary"} sm ai-ask" ?disabled=${c||!s.ready} @click=${()=>this._askAi()}>
                ${G(c?"loader-circle":"sparkles",c?"ai-spin":"")}${c?"Pensando\u2026":r?"Sugerir de novo":"Sugerir com IA"}
              </button>
              ${a&&!c?l`<button class="btn outline sm" @click=${()=>this._clearAi()}>${G("rotate-ccw")}Voltar ao automático</button>`:u}
            </div>`:u}
      </div>`}_nowKey(){let e=this.hass&&this.hass.user;return e&&(e.id||e.name)||""}_nowOrder(){return Yo((this._app("now_order",null)||{})[this._nowKey()])}_saveNowOrder(e){let t={...this._app("now_order",null)||{}};e&&e.join()!==Ce.join()?t[this._nowKey()]=e:delete t[this._nowKey()],this._saveAppPrefs({now_order:Object.keys(t).length?t:null})}_moveNowCard(e,t){let s=this._nowOrder(),a=s.indexOf(e),i=a+t;a<0||i<0||i>=s.length||([s[a],s[i]]=[s[i],s[a]],this._saveNowOrder(s))}_renderCardsSheet(){let e=this._nowOrder(),t=this._nowShown||{},s=!this._dueOn(),a=r=>s&&(r==="coming"||Ge.some(n=>n.id===r))?"Controlar prazos desligado":r==="coming"&&this._repeatOn&&!this._repeatOn()?"Repeti\xE7\xE3o desligada":t[r]?"":"Sem nada agora",i=e.join()!==Ce.join();return l`
        <div class="sheet-head">
          <h3 class="display">${G("grip-vertical","sh-ic")}Ordem dos cards</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${G("x")}</button>
        </div>
        <p class="sheet-note top">A ordem da Agora, só para você.</p>
        <ol class="now-cards">
          ${e.map((r,n)=>{let[c,d]=Ko[r],h=a(r);return l`<li class="row nc-row ${h?"off":""}" data-card=${r}>
              <span class="mais-ic ${r==="late"?"late":""}" aria-hidden="true">${G(c)}</span>
              <div class="grow"><div class="label">${d}</div>${h?l`<div class="hint">${h}</div>`:u}</div>
              <button class="icon-btn" ?disabled=${n===0} @click=${()=>this._moveNowCard(r,-1)} aria-label="Subir ${d}">${G("chevron-up")}</button>
              <button class="icon-btn" ?disabled=${n===e.length-1} @click=${()=>this._moveNowCard(r,1)} aria-label="Descer ${d}">${G("chevron-down")}</button>
            </li>`})}
        </ol>
        ${i?l`<button class="btn outline now-reset" @click=${()=>this._saveNowOrder(null)}>${G("rotate-ccw")}Voltar à ordem de sempre</button>`:u}
      `}_renderSuggest(){let e=this._dueSections(),t=this._suggestions(new Set(e.rows.map(n=>n.i))),s=[];t.pending&&s.push(`${O(t.pending,"pendente","pendentes")} em ${O(t.lists,"lista","listas")}`),e.late&&s.push(O(e.late,"atrasado","atrasados")),e.today&&s.push(`${e.today} para hoje`);let a=t.pending||e.comingN,r={...e.cards||{},start:t.pending?this._renderStart(t):u,coming:e.coming||u,shopping:t.shopping.length?l`<div class="panel" data-card="shopping">
              <div class="mais-head"><span class="mais-ic" aria-hidden="true">${G("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${t.shopping.reduce((n,c)=>n+c.n,0)}</small></div>
              ${t.shopping.map(n=>l`<button class="list-card shop-list" style=${W(n.l.color,this._dark)} @click=${()=>this._go(`/lista/${n.l.id}`)}>
                  <span class="tile">${G(n.l.icon)}</span>
                  <span class="lc-main">
                    <span class="lc-title">${n.l.name}</span>
                    ${n.oldest!=null&&n.oldest>=3?l`<span class="lc-meta"><span>O mais antigo está há ${ls(n.oldest)}</span></span>`:u}
                  </span>
                  <span class="lc-num">${n.n}</span>
                </button>
                <div class="items shop-items">${se(n.items.slice(0,Xa),c=>n.l.id+(c.uid||c.summary),c=>this._renderItem(n.l,c,{}))}</div>
                ${n.n>Xa?l`<button class="add-line shop-more" @click=${()=>this._go(`/lista/${n.l.id}`)}>${G("chevron-right")}Ver os ${n.n}</button>`:u}`)}
            </div>`:u};return this._nowShown=Object.fromEntries(Ce.map(n=>[n,!!r[n]&&r[n]!==u])),l`
        <section class="page">
          ${this._renderPageHead("Agora",{text:s.length?s.join(" \xB7 "):"Nada pendente",tone:e.late?"late":""})}
          ${a?l`${this._nowOrder().map(n=>r[n]||u)}
                <button class="add-line now-order" @click=${()=>this._openSheet("cards")}>${G("sliders-horizontal")}Ordem dos cards</button>`:l`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${G("circle-check")}</div>
                  <h3>Tudo em dia</h3>
                </div>
              </div>`}
        </section>
      `}};var Z=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,De=o=>String(o||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),Ie=o=>Array.isArray(o)?o:o?[o]:[],Za=(o,e)=>Ie(o).join("|")===Ie(e).join("|"),ei=o=>class extends o{async _loadRooms(e="resolvia/rooms/get"){if(!(!this.hass||!this.hass.resolvia)){try{this._rooms=await this.hass.callWS({type:e})}catch{this._rooms=this._rooms||null}this.requestUpdate()}}_roomsOn(){let e=this._rooms;return!!(e&&e.on&&e.comodos&&e.comodos.length)}_roomList(){return this._rooms&&this._rooms.comodos||[]}_bensId(){let e=this._roomList().find(t=>t.tipo==="bens");return e?e.id:null}_houseRooms(){let e=this._bensId();return this._roomList().filter(t=>t.id!==e)}_whereOf(e){let t=this._bensId();if(!t||!(this._roomsOn()||this._equipsOn()))return"casa";if(e.where)return e.where;let s=this._equipsOn()?e.equips||[]:[],a=s.length?this._roomsOfEquips(s):this._pickedRooms(e);return a.includes(t)?"bens":a.length||s.length?"casa":"nenhum"}_inBens(e){return this._whereOf(e)==="bens"}_renderWhere(e){let t=this._bensId();if(!t||!(this._roomsOn()||this._equipsOn()))return u;let s=this._whereOf(e),a=this._equipsOn()?e.equips||[]:[],i=n=>{if(n===s)return;let c=n==="nenhum"?[]:a.filter(d=>(this._equipOf(d)||{}).comodo===t==(n==="bens"));this._setForm({where:n,equips:c,equipQ:"",equipMore:!1,equipAdding:!1,...n==="bens"?{room:t,rooms:[t]}:{room:null,rooms:[]}})},r=(n,c,d)=>l`<button class=${s===n?"on":""} aria-pressed=${s===n?"true":"false"} @click=${()=>i(n)}>${Z(c)}<span>${d}</span></button>`;return l`<div class="field where-field">
        <div class="seg where" role="group" aria-label="Nenhum, Casa ou Bens">${r("nenhum","x","Nenhum")}${r("casa","house","Casa")}${r("bens","car","Bens")}</div>
      </div>`}_equipsOn(){let e=this._rooms;return!!(e&&e.equips_on&&e.itens&&e.itens.length)}_equipList(){return this._rooms&&this._rooms.itens||[]}_equipOf(e){return e&&this._equipList().find(t=>t.id===e)||null}_equipIdsOf(e,t){if(!this._equipsOn())return[];let s=this._rooms.emap&&this._rooms.emap[e];return Ie(s&&s[De(t)]).filter(a=>this._equipOf(a))}_equipIdOf(e,t){return this._equipIdsOf(e,t)[0]||null}_roomsOfEquips(e){let t=Ie(e).map(s=>(this._equipOf(s)||{}).comodo).filter(s=>s&&this._roomList().some(a=>a.id===s));return[...new Set(t)]}async _setTaskEquip(e,t,s,a=null){if(this._equipsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/equips/set",entity_id:e,summary:t,equips:Ie(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o equipamento")}}_renderEquipTag(e,t){let s=this._equipIdsOf(e,t.summary).map(a=>this._equipOf(a));return s.length?s.length>1?l`<span class="tag room" title=${s.map(a=>a.nome).join(", ")}>${Z("package")}Vários equipamentos</span>`:l`<span class="tag room" title=${s[0].nome}>${Z("package")}${L(s[0].nome,26)}</span>`:u}_equipItems(e=null){let t=this._bensId(),s=this._equipList().map(i=>({id:i.id,nome:i.nome,zona:i.zona,roomId:i.comodo,roomName:this._roomName(i.comodo)||""}));if(!e||!t)return s;let a=this._inBens(e);return s.filter(i=>i.roomId===t===a)}_renderEquipField(e){if(!this._equipsOn()||this._whereOf(e)==="nenhum")return u;let t=e.equips||[],s=this._inBens(e),a=s?this._bensId():this._roomsOn()?t.length?this._roomsOfEquips(t)[0]||null:this._allRooms(this._pickedRooms(e))?null:e.room:null;return l`<div class="field">
        <span class="flabel">${Z(s?"car":"package","lbl-ic")}${s?t.length>1?"Bens":"Bem":t.length>1?"Equipamentos":"Equipamento"}</span>
        ${Xe({lit:{html:l,nothing:u},icon:Z,items:this._equipItems(e),bens:s,room:a,roomName:a&&this._roomName(a)||"",value:t,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:i=>this._setForm({equipQ:i,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:i=>this._setForm({equips:[...t,i],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:i=>{let r=t.filter(c=>c!==i),n=this._roomsOfEquips(t);this._setForm({equips:r,...s?{where:"bens"}:{},...!r.length&&this._roomsOn()?{room:n[0]||e.room||null,rooms:n.length?n:e.room?[e.room]:[]}:{}})}})}
      </div>`}_formRooms(e){if(!this._roomsOn())return[];let t=this._equipsOn()?e.equips||[]:[];return t.length?this._roomsOfEquips(t):this._pickedRooms(e)}_pickedRooms(e){return(Array.isArray(e.rooms)?e.rooms:e.room?[e.room]:[]).filter(s=>this._roomList().some(a=>a.id===s))}async _saveTaskPlace(e,t,s,a=null){let i=this._formRooms(s),r=this._equipsOn()?s.equips||[]:[];(!Za(i,s.roomsOrig||[])||a&&(s.roomsOrig||[]).length)&&await this._setTaskRoom(e,t,i,a),(!Za(r,s.equipsOrig||[])||a&&(s.equipsOrig||[]).length)&&await this._setTaskEquip(e,t,r,a)}_placeText(e,t,{rooms:s=!0,equips:a=!0}={}){let i=s?this._roomIdsOf(e,t).map(n=>this._roomName(n)):[],r=a?this._equipIdsOf(e,t).map(n=>this._equipOf(n)):[];return[...i,...r.flatMap(n=>[n.nome,n.zona||""])].filter(Boolean).join(" ")}_roomIdsOf(e,t){if(!this._roomsOn())return[];let s=this._rooms.map&&this._rooms.map[e];return Ie(s&&s[De(t)]).filter(a=>this._roomList().some(i=>i.id===a))}_roomIdOf(e,t){return this._roomIdsOf(e,t)[0]||null}_roomName(e){let t=this._roomList().find(s=>s.id===e);return t?t.nome:null}_allRooms(e){let t=this._houseRooms();return t.length>1&&t.every(s=>(e||[]).includes(s.id))}async _setTaskRoom(e,t,s,a=null){if(this._roomsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/rooms/set",entity_id:e,summary:t,rooms:Ie(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o c\xF4modo")}}_renderRoomTag(e,t){if(this._equipIdsOf(e,t.summary).length>1)return u;let s=this._roomIdsOf(e,t.summary),a=s.map(i=>this._roomName(i)).join(", ");return this._allRooms(s)?l`<span class="tag room" title=${a}>${Z("house")}Todos os cômodos</span>`:s.length>1?l`<span class="tag room" title=${a}>${Z("door-open")}Vários cômodos</span>`:s.length?l`<span class="tag room">${Z(s[0]===this._bensId()?"car":"door-open")}${L(this._roomName(s[0]),22)}</span>`:u}_renderRoomField(e,t=!0){let s=t?this._renderWhere(e):u;if(!this._roomsOn()||this._whereOf(e)!=="casa")return s;let a=this._equipsOn()&&(e.equips||[]).length>0,i=a?this._roomsOfEquips(e.equips):this._pickedRooms(e),r=d=>{let h=i.includes(d)?i.filter(p=>p!==d):[...i,d];this._setForm({rooms:h,room:h[0]||null})},n=this._houseRooms().map(d=>d.id),c=!a&&this._allRooms(i);return l`${s}<div class="field">
        <span class="flabel">${Z("door-open","lbl-ic")}${i.length>1?"C\xF4modos":"C\xF4modo"}</span>
        <div class="chip-row grid ${a?"locked":""}">
          <button class="pick ${i.length?"":"on"}" ?disabled=${a} @click=${()=>this._setForm({room:null,rooms:[]})}>${Z("x")}<span>Nenhum</span></button>
          ${n.length>1?l`<button class="pick room all-rooms ${c?"on":""}" aria-pressed=${c?"true":"false"} ?disabled=${a} @click=${()=>this._setForm(c?{room:null,rooms:[]}:{rooms:n,room:n[0]})}>${Z("house")}<span>Todos</span></button>`:u}
          ${this._houseRooms().map(d=>l`<button class="pick room ${i.includes(d.id)?"on":""}" aria-pressed=${i.includes(d.id)?"true":"false"} ?disabled=${a} @click=${()=>r(d.id)}>${Z("door-open")}<span>${L(d.nome,22)}</span></button>`)}
        </div>
        ${a?l`<span class="field-hint">${Z("lock")}<span>Vem ${e.equips.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:u}
      </div>`}_renderRoomsPanel(){if(!this.hass.resolvia)return u;let e=this._rooms||{},t=this._app("rooms_on",!1)===!0,s=this._app("equips_on",!1)===!0,a=(e.comodos||[]).length,i=(e.itens||[]).length,r={"Usar c\xF4modos":"house","Usar equipamentos":"cpu","Usar bens":"car"},n=(m,g,_,w,y="Desligado.",k=!1)=>l`<div class="row switch-row">
        <div class="grow"><div class="label">${Z(r[m],"lbl-ic")}${m}</div><div class="hint" style="white-space:normal">${g?_:y}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${g} ?disabled=${k} @change=${x=>w(x.target.checked)} aria-label=${m} /><span class="track"></span></label>
      </div>`,c=this._app("bens_on",!1)===!0,d=t||s?e.bens?n("Usar bens",c,"Uma tarefa pode ser de um bem, como a casa ou o carro.",m=>this._toggleBens(m)):n("Usar bens",!1,"",()=>{},this._roomsBusy||!e.encontrado?"Desligado.":"O InventarIA n\xE3o usa bens.",!0):u,h=u;if(t||s){let m=[t&&a?O(a,"c\xF4modo","c\xF4modos"):"",s&&i?O(i,"equipamento","equipamentos"):""].filter(Boolean).join(" \xB7 "),g=this._roomsBusy?"off":m?e.erro?"warn":"ok":"bad",_=this._roomsBusy?"Verificando\u2026":m||(e.encontrado?"Nada cadastrado":"InventarIA n\xE3o encontrado"),w=this._roomsBusy?"":e.erro||(m?t&&a?e.comodos.map(y=>y.nome).join(", "):"":e.encontrado?"Cadastre os c\xF4modos e os itens no InventarIA.":"Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");h=l`<div class="sub-op"><div class="sub-box"><div class="ai-state ${g}"><span class="dot"></span><div><b>${_}</b>${w?l`<span>${w}</span>`:u}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${()=>this._refreshRooms()}>${Z("rotate-ccw")}Verificar de novo</button></div></div></div>`}let p=this._aiOn()?", e a IA sugere qual":"";return l`<div class="panel" id="comodos">
        ${this._secHead("house","InventarIA","Para ligar uma tarefa a um c\xF4modo ou a um equipamento da casa.")}
        ${n("Usar c\xF4modos",t,`Cada tarefa pode ter um c\xF4modo${p}.`,m=>this._toggleRooms(m))}
        ${n("Usar equipamentos",s,`Cada tarefa pode ser de um equipamento ou m\xF3vel${p}.`,m=>this._toggleEquips(m))}
        ${d}
        ${h}
      </div>`}async _toggleBens(e){await this._saveAppPrefs({bens_on:e?!0:null}),await this._refreshRooms()}async _toggleEquips(e){await this._saveAppPrefs({equips_on:e?!0:null}),await this._refreshRooms()}async _toggleRooms(e){await this._saveAppPrefs({rooms_on:e?!0:null}),await this._refreshRooms()}async _refreshRooms(){this._roomsBusy=!0,this.requestUpdate(),await this._loadRooms("resolvia/rooms/refresh"),this._roomsBusy=!1,this.requestUpdate()}};var ce={quick:!1,editing:null,menu:!1},ti=()=>typeof matchMedia=="function"&&matchMedia("(hover: none) and (pointer: coarse)").matches,si=4;async function St(o,e=[]){let t=e.slice(),s=i=>new Promise((r,n)=>{let c=new FileReader;c.onload=()=>r(String(c.result).split(",")[1]||""),c.onerror=()=>n(c.error),c.readAsDataURL(i)}),a=[];for(let i of Array.from(o||[])){if(i.type==="application/pdf"||/\.pdf$/i.test(i.name||"")){if(i.size>15*1024*1024){a.push("Arquivo grande demais (at\xE9 15 MB).");continue}t=[{nome:i.name||"arquivo.pdf",pdf:!0,mime:"application/pdf",data:await s(i),url:""}];continue}if(i.type&&!/^image\//.test(i.type)){a.push("Escolha uma foto ou um PDF.");continue}if(t.length>=si||t.some(n=>n.pdf))if(t.some(n=>n.pdf))t=[];else{a.push(`At\xE9 ${si} arquivos por mensagem.`);break}try{let n=await createImageBitmap(i,{imageOrientation:"from-image"}),c=Math.min(1,1600/Math.max(n.width,n.height)),d=document.createElement("canvas");d.width=Math.max(1,Math.round(n.width*c)),d.height=Math.max(1,Math.round(n.height*c));let h=d.getContext("2d");h.fillStyle="#fff",h.fillRect(0,0,d.width,d.height),h.drawImage(n,0,0,d.width,d.height),n.close&&n.close();let p=await new Promise(m=>d.toBlob(m,"image/jpeg",.86));t.push({nome:i.name||`Foto ${t.length+1}.jpg`,pdf:!1,mime:"image/jpeg",data:await s(p),url:URL.createObjectURL(p)})}catch{a.push("N\xE3o deu para abrir esta foto. Use JPG ou PNG.")}}return{files:t,error:a[0]||""}}function Jo(o,e=[]){try{let t=JSON.parse(localStorage.getItem(`${o}-perguntas`)||"null");if(Array.isArray(t))return t.filter(s=>typeof s=="string"&&s.trim())}catch{}return e}function ai(o,e){try{e==null?localStorage.removeItem(`${o}-perguntas`):localStorage.setItem(`${o}-perguntas`,JSON.stringify(e))}catch{}}function ii(o){try{let e=JSON.parse(localStorage.getItem(`${o}-perguntas-fechadas`)||"[]");return new Set(Array.isArray(e)?e:[])}catch{return new Set}}function Qo(o,e){let t=ii(o);t.has(e)?t.delete(e):t.add(e);try{localStorage.setItem(`${o}-perguntas-fechadas`,JSON.stringify([...t]))}catch{}}function oi({lit:o,icon:e,app:t="",messages:s=[],draft:a="",busy:i=!1,error:r="",voice:n=null,examples:c=[],models:d=[],files:h=[],onDraft:p,onSend:m,onMic:g,onMicCancel:_,onAction:w,onAll:y,onClear:k,onClose:x,onAttach:S=null,onFileRemove:M=()=>{},onRedraw:C=()=>{}}){let{html:$,nothing:v}=o,b=()=>{let I=(a||"").trim();(I||h.length)&&!i&&m(I)},A=t?Jo(t,c):c,q=I=>(Object.assign(ce,I),C()),P=I=>{q({quick:!1}),m(I)},z=()=>{let I=ce.editing;if(I){let oe=F=>{let Q=(I.draft||"").trim(),de=F&&F.closest(".chat-ed-new")&&F.closest(".chat-ed-new").querySelector("input");de&&(de.value=""),Q&&q({editing:{list:[...I.list,Q],draft:""}})},K=ii(t),ye=(F,Q,de,Tt="")=>$`<button type="button" class="chat-ed-h chat-ed-dobra ${Tt}" data-dobra=${F} aria-expanded=${K.has(F)?"false":"true"} @click=${()=>(Qo(t,F),q({}))}>${e(Q)}<span>${de}</span><span class="chat-ed-seta">${e("chevron-down")}</span></button>`;return $`<div class="chat-ed">
        ${ye("prontas","pencil",`Perguntas prontas (${I.list.length})`)}
        ${K.has("prontas")?v:$`${I.list.map((F,Q)=>$`<div class="chat-ed-row">
            <textarea class="chat-ed-txt" rows=${Math.min(4,Math.max(1,Math.ceil(F.length/32)))} maxlength="120" data-size="off" enterkeyhint="done" aria-label=${`Mudar \u201C${F}\u201D`} .value=${F}
              @input=${de=>I.list[Q]=de.target.value} @keydown=${de=>{de.key==="Enter"&&(de.preventDefault(),de.target.blur())}}></textarea>
            <button type="button" class="icon-btn" aria-label=${`Tirar \u201C${F}\u201D`} @click=${()=>q({editing:{...I,list:I.list.filter((de,Tt)=>Tt!==Q)}})}>${e("x")}</button></div>`)}
        <div class="chat-ed-new">
          <input type="text" maxlength="120" .value=${I.draft||""} placeholder="Nova pergunta" aria-label="Nova pergunta" enterkeyhint="done"
            @input=${F=>I.draft=F.target.value} @keydown=${F=>{F.key==="Enter"&&(F.preventDefault(),oe(F.target))}} />
          <button type="button" class="btn outline sm" @click=${F=>oe(F.currentTarget)}>${e("plus")}Adicionar</button>
        </div>`}
        ${(F=>F.length?$`${ye("mais","sparkles",`Mais perguntas (${F.length})`,"chat-ed-mais")}
          ${K.has("mais")?v:F.map(Q=>$`<button type="button" class="chat-ed-row chat-ed-modelo" aria-label=${`P\xF4r \u201C${Q}\u201D`} @click=${()=>q({editing:{...I,list:[...I.list,Q]}})}><span>${Q}</span><span class="chat-ed-mais-ic">${e("plus")}</span></button>`)}`:v)(d.filter((F,Q)=>d.indexOf(F)===Q&&!I.list.includes(F)))}
        <div class="chat-ed-acts">
          <button type="button" class="btn outline sm" @click=${()=>(ai(t,null),q({editing:{list:c.slice(),draft:""}}))}>${e("rotate-ccw")}Padrão</button>
          <button type="button" class="btn primary sm" @click=${()=>{let F=I.list.map(Q=>String(Q||"").trim()).filter(Boolean).concat((I.draft||"").trim()?[(I.draft||"").trim()]:[]);ai(t,F.join(`
`)===c.join(`
`)?null:F),q({editing:null})}}>${e("check")}Pronto</button>
        </div>
      </div>`}return $`<div class="chat-ex">${A.map(oe=>$`<button type="button" class="pick" @click=${()=>P(oe)}>${e("sparkles")}<span>${oe}</span></button>`)}</div>
      ${t?$`<button type="button" class="text-btn chat-ed-open" @click=${()=>q({editing:{list:A.slice(),draft:""}})}>${e("pencil")}Editar perguntas</button>`:v}`},j=(I,oe,K,ye)=>$`<div class="chat-act ${K.state||"todo"}">
    <span class="chat-act-ic">${e(K.state==="done"?"check":K.state==="failed"?"circle-alert":K.icon||"sparkles")}</span>
    <span class="chat-act-tx">${K.label}${K.note?$`<small>${K.note}</small>`:v}</span>
    ${K.state==="done"?$`<span class="chat-act-ok">Feito</span>`:K.state==="doing"?$`<span class="chat-act-ok">…</span>`:$`<button type="button" class="btn primary sm" @click=${()=>w(oe,ye)}>${e(K.state==="failed"?"rotate-ccw":"check")}${K.state==="failed"?"Tentar de novo":"Fazer"}</button>`}
  </div>`,J=(I,oe)=>{let K=(I.actions||[]).filter(F=>F.state!=="done"&&F.state!=="doing").length,ye=I.role==="user"&&Array.isArray(I.anexos)?I.anexos:[];return $`<div class="chat-msg ${I.role==="user"?"me":"ia"}">
      ${I.text||ye.length?$`<div class="chat-bubble">${ye.map(F=>$`<span class="chat-arq">${e("paperclip")}${F}</span>`)}${I.text||""}</div>`:v}
      ${(I.actions||[]).length?$`<div class="chat-acts">
            ${I.actions.map((F,Q)=>j(I,oe,F,Q))}
            ${K>1?$`<button type="button" class="btn outline sm chat-all" @click=${()=>y(oe)}>${e("check")}Fazer todas (${K})</button>`:v}
          </div>`:v}
    </div>`},B=n&&n.on,R=!!S&&!B,H=R&&ce.menu,ie=I=>(q({menu:!1}),S(I)),st=!!(n&&n.ready)&&(B||!(a||"").trim()&&!h.length);return $`<div class="chat">
    <div class="chat-head">
      <span class="chat-title">${e("message-circle")}Conversa</span>
      ${s.length?$`<button type="button" class="text-btn chat-nova" aria-label="Nova conversa" @click=${()=>k()}>${e("plus")}<span>Nova conversa</span></button>`:v}
      <button type="button" class="icon-btn" aria-label="Fechar" @click=${()=>x()}>${e("x")}</button>
    </div>
    <div class="chat-log">
      ${s.length?s.map(J):A.length||t?$`<div class="chat-empty">${z()}</div>`:v}
      ${i?$`<div class="chat-msg ia"><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>`:v}
      ${r?$`<div class="chat-error">${e("circle-alert")}<span>${r}</span></div>`:v}
    </div>
    ${s.length&&(ce.quick||ce.editing)?$`<div class="chat-quick">${z()}</div>`:v}
    ${H?$`<div class="chat-menu" role="menu">
          <button type="button" class="chat-op" role="menuitem" @click=${()=>ie("camera")}>${e("camera")}Tirar foto</button>
          <button type="button" class="chat-op" role="menuitem" @click=${()=>ie("fotos")}>${e("images")}Escolher fotos</button>
          <button type="button" class="chat-op" role="menuitem" @click=${()=>ie("arquivo")}>${e("file-text")}Escolher arquivo</button>
        </div>`:v}
    ${h.length?$`<div class="chat-files">${h.map((I,oe)=>$`<div class="chat-file">${I.pdf?$`<span class="chat-pdf">${e("file-text")}</span>`:$`<img src=${I.url} alt="" />`}<span class="chat-file-n">${I.nome}</span><button type="button" class="icon-btn" aria-label=${`Tirar ${I.nome}`} @click=${()=>M(oe)}>${e("x")}</button></div>`)}</div>`:v}
    <form class="chat-input" @submit=${I=>(I.preventDefault(),b())}>
      ${R?$`<button type="button" class="icon-btn chat-clip ${H?"on":""}" aria-label="Anexar" title="Anexar" aria-expanded=${H?"true":"false"} ?disabled=${i} @click=${()=>q({menu:!ce.menu,quick:!1,editing:null})}>${e("paperclip")}</button>`:v}
      ${B&&_?$`<button type="button" class="icon-btn chat-cancel" aria-label="Cancelar: não enviar o que falei" title="Cancelar" @click=${()=>_()}>${e("x")}</button>`:v}
      <textarea rows="1" data-size="off" .value=${a} placeholder=${B?"Ouvindo\u2026":"Pergunte o que quiser"} aria-label="Mensagem para a IA" ?disabled=${B}
        enterkeyhint=${ti()?"enter":"send"}
        @input=${I=>p(I.target.value)}
        @keydown=${I=>{I.key==="Enter"&&!I.shiftKey&&!I.isComposing&&!ti()&&(I.preventDefault(),b())}}></textarea>
      ${s.length&&(A.length||t)&&!B?$`<button type="button" class="icon-btn chat-qbtn ${ce.quick||ce.editing?"on":""}" aria-label="Perguntas prontas" aria-expanded=${ce.quick||ce.editing?"true":"false"} title="Perguntas prontas" @click=${()=>q({quick:!(ce.quick||ce.editing),editing:null,menu:!1})}>${e("sparkles")}</button>`:v}
      ${st?$`<button type="button" class="icon-btn chat-mic ${B?"on":""}" aria-label=${B?"Pronto: enviar o que falei":"Falar"} ?disabled=${i||n.starting} @click=${()=>g()}>${e(B?"check":"mic")}</button>`:$`<button type="submit" class="icon-btn chat-send" aria-label="Enviar" ?disabled=${i||B||!((a||"").trim()||h.length)}>${e("send")}</button>`}
    </form>
  </div>`}var ri=`
  .chat { display: flex; flex-direction: column; height: min(78vh, 680px); margin: -4px -4px 0; }
  .chat-head { display: flex; align-items: center; gap: 10px; padding: 0 0 10px; }
  .chat-title { display: inline-flex; align-items: center; gap: 8px; flex: 1; font-weight: 700; font-size: 18px; }
  .chat-title .i { width: 30px; height: 30px; padding: 6px; border-radius: 9px; background: var(--rv-accent-soft); color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-head .text-btn { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
  @media (max-width: 340px) { .chat-nova span { display: none; } }
  .chat-head .text-btn .i { width: 16px; height: 16px; }
  .chat-log { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding: 6px 2px 12px; overscroll-behavior: contain; }
  /* as perguntas prontas no meio da largura, uma por linha, como no CorrerIA (igual em todos os apps) */
  .chat-empty { margin: auto 0 0; color: var(--rv-muted); font-size: 15px; line-height: 1.45; text-align: center; }
  .chat-empty p { margin: 0 0 12px; }
  .chat-ex { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .chat-ex .pick { font-size: 14px; padding: 8px 12px; min-height: 0; max-width: 100%; display: inline-flex; align-items: center; gap: 6px; text-align: left; }
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
  .chat-quick { max-height: 42vh; overflow-y: auto; padding: 10px 2px; border-top: 1px solid var(--rv-line); text-align: center; }
  .chat-ed-open { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; }
  .chat-ed-open .i { width: 16px; height: 16px; }
  .chat-ed { display: grid; gap: 8px; color: var(--rv-text); text-align: left; }
  .chat-ed-h { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; }
  .chat-ed-h .i { width: 18px; height: 18px; color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-ed-dobra { display: flex; width: 100%; min-height: 40px; padding: 0; border: 0; background: none; color: inherit; font: inherit; font-weight: 700; font-size: 15px; text-align: left; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .chat-ed-dobra > span:not(.chat-ed-seta) { flex: 1; min-width: 0; }
  .chat-ed-seta { flex: none; display: grid; place-items: center; transition: transform 0.2s; }
  .chat-ed-dobra .chat-ed-seta .i { width: 20px; height: 20px; color: var(--rv-muted); }
  .chat-ed-dobra[aria-expanded="false"] .chat-ed-seta { transform: rotate(-90deg); }
  .chat-ed-dobra:focus-visible { outline: 2px solid var(--rv-accent); outline-offset: 4px; border-radius: 12px; }
  .chat-ed-row { display: flex; align-items: center; gap: 8px; padding: 4px 0 4px 12px; border-radius: 12px; border: 1.5px solid var(--rv-line); font-size: 14.5px; }
  .chat-ed-row span { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  .chat-ed-txt { flex: 1; min-width: 0; min-height: 24px; padding: 6px 0; border: 0; background: none; color: inherit; font: inherit; font-size: 14.5px; line-height: 1.35; resize: none; field-sizing: content; overflow-wrap: anywhere; }
  .chat-ed-txt:focus { outline: none; }
  .chat-ed-row:has(.chat-ed-txt:focus) { border-color: var(--rv-accent); }
  .chat-ed-row .icon-btn { width: 40px; height: 40px; flex: none; }
  .chat-ed-new { display: flex; gap: 8px; }
  .chat-ed-mais { margin-top: 6px; }
  .chat-ed-modelo { width: 100%; background: none; color: inherit; font: inherit; font-size: 14.5px; text-align: left; cursor: pointer; border-style: dashed; padding-right: 0; }
  .chat-ed-mais-ic { width: 40px; height: 40px; flex: none !important; display: grid; place-items: center; color: var(--rv-accent-ink, var(--rv-accent)); }
  .chat-ed-mais-ic .i { width: 20px; height: 20px; }
  .chat-ed-new input { flex: 1; min-width: 0; min-height: 44px; padding: 0 12px; border-radius: 12px; border: 1.5px solid var(--rv-line-strong, var(--rv-line)); background: var(--rv-input-bg, transparent); color: var(--rv-text); font: inherit; font-size: 15px; }
  .chat-ed-new input:focus { outline: none; border-color: var(--rv-accent); }
  .chat-ed-acts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .chat-ed .btn.sm { min-height: 44px; justify-content: center; gap: 6px; }
  .chat-ed .btn.sm .i { width: 16px; height: 16px; }
`;var Le=class{constructor(e){this.onLevel=e,this.chunks=[],this.length=0,this.rate=16e3}async start(){let e=navigator.mediaDevices;if(!e||!e.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await e.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let t=window.AudioContext||window.webkitAudioContext;try{this.ctx=new t({sampleRate:16e3})}catch{this.ctx=new t}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let i=0;for(let r=0;r<a.length;r+=4)i+=a[r]*a[r];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(i/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let e=new Float32Array(this.length),t=0;for(let r of this.chunks)e.set(r,t),t+=r.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(e.length/s),i=new Int16Array(a);for(let r=0;r<a;r++){let n=Math.floor(r*s),c=Math.max(n+1,Math.min(e.length,Math.floor((r+1)*s))),d=0;for(let p=n;p<c;p++)d+=e[p];let h=Math.max(-1,Math.min(1,d/(c-n)));i[r]=h<0?h*32768:h*32767}return i}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let e of this.stream.getTracks())e.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function Mt(o){let e=o&&o.name||"";return e==="NotAllowedError"||e==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":e==="NotFoundError"||e==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":e==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":e==="NoApi"?window.isSecureContext===!1?"O microfone aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), o celular e o navegador n\xE3o deixam usar o microfone, nem pelo app do Home Assistant.":"Este navegador n\xE3o deixa usar o microfone aqui.":`N\xE3o consegui abrir o microfone (${o&&o.message||e||"erro"}).`}var ni=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,cs=o=>o.status==="completed",li="resolvia-conversa",ci=o=>class extends o{_chatState(){if(!this._chat){let e=[];try{e=JSON.parse(sessionStorage.getItem(li)||"[]")}catch{}this._chat={messages:Array.isArray(e)?e:[],draft:"",busy:!1,error:"",rec:null,files:[]}}return this._chat}_setChat(e){if(this._chat={...this._chatState(),...e},"messages"in e)try{sessionStorage.setItem(li,JSON.stringify(this._chat.messages.slice(-30)))}catch{}this.requestUpdate()}_renderChatBtn(){return!this._aiOn()||!this.hass.resolvia?u:l`<button class="mic-top chat-top" aria-label="Conversar com a IA" title="Conversar com a IA" @click=${()=>this._openChat()}>${ni("message-circle")}</button>`}_openChat(){this._openSheet("chat",{}),this._chatScroll=!0,this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".chat-input textarea");e&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches&&e.focus()})}_renderChatSheet(){let e=this._chatState(),t=this._voice||{};return oi({lit:{html:l,nothing:u},icon:ni,app:"resolvia",onRedraw:()=>this.requestUpdate(),messages:e.messages,draft:e.draft,busy:e.busy,error:e.error,voice:{ready:!!t.ready&&this._micOk(),on:e.rec==="on",starting:e.rec==="starting"},examples:this._chatExamples(),models:this._chatModels(),onDraft:s=>this._setChat({draft:s}),onSend:s=>this._chatSend(s),onMic:()=>this._chatMic(),onMicCancel:()=>this._chatMicCancel(),onAction:(s,a)=>this._chatDo(s,a),onAll:s=>this._chatDoAll(s),onClear:()=>this._setChat({messages:[],error:""}),onClose:()=>this._closeSheet(),files:e.files||[],onAttach:s=>this._chatAttach(s),onFileRemove:s=>this._setChat({files:(e.files||[]).filter((a,i)=>i!==s)})})}_chatAttach(e){if(e==="camera")return this._openCamera({chat:!0});let t=document.createElement("input");t.type="file",t.accept=e==="fotos"?"image/*":"image/*,application/pdf",t.multiple=e==="fotos"&&!this._isHaAndroid(),t.style.display="none",t.addEventListener("change",()=>{let s=Array.from(t.files||[]);t.remove(),s.length&&this._chatAddFiles(s)}),document.body.appendChild(t),t.click()}async _chatAddFiles(e){let{files:t,error:s}=await St(e,this._chatState().files||[]);this._setChat({files:t,error:s}),this._chatScroll=!0}_chatAddShots(e){let t=(this._chatState().files||[]).filter(a=>!a.pdf),s=[...t,...e.map((a,i)=>({nome:`Foto ${t.length+i+1}.jpg`,pdf:!1,mime:a.mime||"image/jpeg",data:a.data,url:a.url}))].slice(0,4);this._setChat({files:s,error:""}),this._sheet!=="chat"&&this._openChat()}_micOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_chatPool(){let e={due:!!(this._dueOn&&this._dueOn()),points:!!(this._ptsActive&&this._ptsActive()),rooms:!!(this._roomsOn&&this._roomsOn()),equips:!!(this._equipsOn&&this._equipsOn()),ext:!!(this._extOn&&this._extOn()),repeat:!!(this._repeatOn&&this._repeatOn())},t=(s,a=!0)=>a?[s]:[];return{examples:[...t("Por onde eu come\xE7o hoje?"),...t("O que est\xE1 atrasado?",e.due),...t("O que vence esta semana?",e.due),...t("Quais tarefas d\xE3o mais pontos?",e.points),...t("O que tem para fazer na cozinha?",e.rooms),...t("Quantas tarefas eu tenho?"),...t("Qual lista tem mais pend\xEAncias?"),...t("Adiciona leite na lista de compras"),...t("Resume as minhas listas")],models:[...t("O que posso fazer em 15 minutos?"),...t("Quais s\xE3o as tarefas mais importantes?"),...t("Monta um plano para o fim de semana"),...t("Me ajuda a planejar a semana"),...t("Quais tarefas est\xE3o sem prazo?",e.due),...t("O que est\xE1 mais perto de vencer?",e.due),...t("Quem tem mais pontos?",e.points),...t("Quantos pontos eu tenho?",e.points),...t("Separa as tarefas por c\xF4modo",e.rooms),...t("Quais tarefas s\xE3o de equipamentos?",e.equips),...t("Quais tarefas precisam de algu\xE9m de fora?",e.ext),...t("Quais tarefas se repetem?",e.repeat),...t("O que eu conclu\xED hoje?"),...t("Quais listas s\xE3o minhas?"),...t("O que d\xE1 para resolver numa ida ao mercado?"),...t("O que fazer antes de sair de casa?"),...t("Quais tarefas s\xE3o r\xE1pidas?"),...t("Que tarefas posso fazer \xE0 noite?"),...t("Tem alguma tarefa repetida nas listas?"),...t("Divide as tarefas de hoje entre as pessoas da casa"),...t("Cria uma tarefa para trocar o filtro amanh\xE3"),...t("Adiciona arroz, feij\xE3o e caf\xE9 na lista de compras"),...t("Marca como feita a tarefa de lavar a lou\xE7a"),...t("O que eu esqueci?"),...t("Reorganiza as tarefas de hoje por prioridade"),...t("Escolhe tr\xEAs tarefas para eu fazer agora"),...t("O que \xE9 mais f\xE1cil de resolver hoje?"),...t("Resume a lista de compras"),...t("Quanto falta para terminar tudo?"),...t("Quais tarefas s\xE3o da casa toda?")]}}_chatExamples(){let e=this._view(),{examples:t,models:s}=this._chatPool(),a=e.name==="list"?this._list(e.id):null,i=a?[`O que \xE9 mais urgente em ${L(a.name,24)}?`]:[];return[...new Set([...i,...t,...s])].slice(0,6)}_chatModels(){let{examples:e,models:t}=this._chatPool();return[...new Set([...e,...t])].filter(s=>!this._chatExamples().includes(s)).slice(0,20)}_chatScreen(){let e=this._view();if(e.name==="list"){let t=this._list(e.id);return t?`a lista "${t.name}"`:"uma lista"}return e.name==="search"?this._query?`Buscar, procurando "${this._query}"`:"Buscar":e.name==="lists"?"Listas (todas as listas, com o que falta em cada uma)":e.name==="more"?"Mais (o menu: Listas, Gr\xE1ficos, Configura\xE7\xF5es e Sobre)":e.name==="sobre"?"Mais \u203A Sobre (CorrerIA Code, quem faz o app, os outros apps da fam\xEDlia e o GitHub)":e.name==="listas"?"Mais \u203A Listas (nome, cor, \xEDcone e quais listas aparecem)":e.name==="graficos"?`Mais \u203A Gr\xE1ficos (gr\xE1ficos das ${this._chartsLine().replace(/\.$/,"").toLowerCase()})`:e.name==="config"?"Mais \u203A Configura\xE7\xF5es (integra\xE7\xF5es, dados, apar\xEAncia e op\xE7\xF5es do app: prazos, exibi\xE7\xE3o, quem faz e repeti\xE7\xE3o)":this._dueOn()?"Agora, o in\xEDcio (o que est\xE1 atrasado, o que vence hoje e nos pr\xF3ximos dias e por onde come\xE7ar)":"Agora, o in\xEDcio (por onde come\xE7ar)"}_chatContext(){let e=this._view(),t=this._visible().slice(),s=e.name==="list"?this._list(e.id):null;s&&!t.includes(s)&&t.unshift(s),t.sort((n,c)=>+(c===s)-+(n===s));let a=new Date,i=this._pts&&this._pts.placar,r=i&&i.eu||(this.hass&&this.hass.user&&this.hass.user.name||"").trim();return{tela:this._chatScreen(),eu:r,listas:t.map(n=>{let c=(n.items||[]).filter(h=>!cs(h)),d=(n.items||[]).filter(h=>cs(h));return{id:n.id,nome:n.name,de:n.owner||"",concluidas:d.length,concluidas_itens:d.slice(-15).map(h=>h.summary||"").filter(Boolean),adicionar:T(n.features,E.CREATE)&&!n.unavailable,prazos:!n.noDue&&T(n.features,E.DUE_DATE),pendentes:c.length,itens:c.slice(0,n===s?120:40).map(h=>{let p=le(h.due),m=p?ae(h.due,a):null;return{texto:h.summary||"",prazo:p&&!n.noDue?p.date:null,atrasado:!!(m&&m.tone==="late"&&!n.noDue),pontos:this._pointsOf&&this._pointsOf(n.id,h.summary,h.uid)||0,comodo:this._roomIdsOf(n.id,h.summary).map(g=>this._roomName(g)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(n.id,h.summary).map(g=>(this._equipOf(g)||{}).nome).filter(Boolean).join(", "),externo:(g=>g===!0?"sim":g||"")(this._externalOf(n.id,h.summary)),notas:L(String(h.description||"").replace(/\s+/g," ").trim(),200),repete:(g=>g&&g.days?`volta ${g.days} ${g.days===1?"dia":"dias"} depois de conclu\xEDda`:"")(this._ruleFor?this._ruleFor(n.id,h):null)}})}})}}async _chatSend(e){let t=this._chatState();if(t.busy)return;let s=t.files||[],a=s.length?{role:"user",text:e,anexos:s.map(r=>r.nome)}:{role:"user",text:e},i=[...t.messages,a];this._setChat({messages:i,draft:"",busy:!0,error:"",files:[]}),this._chatScroll=!0;try{let r={messages:i.map(d=>({role:d.role,text:d.text||(d.actions||[]).map(h=>h.label).join("; "),...d.anexos?{anexos:d.anexos}:{}})),context:this._chatContext()},n=s.length?await this.hass.resolvia.chat({...r,files:s.map(d=>({data:d.data,mime:d.mime,nome:d.nome}))}):await this.hass.callWS({type:"resolvia/ai/chat",...r});for(let d of s)d.url&&URL.revokeObjectURL(d.url);let c=(n.actions||[]).map(d=>({...d,label:this._chatLabel(d),icon:d.tipo==="concluir"?"check":"plus",state:"todo"}));this._setChat({messages:[...this._chatState().messages,{role:"ia",text:n.reply||"",actions:c}],busy:!1})}catch(r){this._setChat({busy:!1,error:r.message||"A IA n\xE3o respondeu. Tente de novo.",...s.length?{files:s,messages:this._chatState().messages.filter(n=>n!==a)}:{}})}this._chatScroll=!0}_chatLabel(e){return e.tipo==="concluir"?`Concluir "${L(e.item,60)}" em ${L(e.nome,30)}`:`Adicionar "${L(e.item,60)}" em ${L(e.nome,30)}${e.prazo?` \xB7 prazo ${e.prazo.slice(8,10)}/${e.prazo.slice(5,7)}`:""}`}_setAction(e,t,s){let a=this._chatState().messages.map((i,r)=>r===e?{...i,actions:i.actions.map((n,c)=>c===t?{...n,...s}:n)}:i);this._setChat({messages:a})}async _chatDo(e,t){let s=((this._chatState().messages[e]||{}).actions||[])[t];if(!s||s.state==="done"||s.state==="doing")return;this._setAction(e,t,{state:"doing",note:""});let a=this._list(s.lista),i=!1,r="";if(!a)r="Lista n\xE3o encontrada.";else if(s.tipo==="adicionar")i=await this._addFull(a,{summary:s.item,description:"",date:s.prazo||null,time:null});else{let n=(a.items||[]).find(c=>!cs(c)&&N(c.summary)===N(s.item));n?(await this._toggle(a,n),i=!0):r="Esse item n\xE3o est\xE1 mais pendente."}this._setAction(e,t,{state:i?"done":"failed",note:i?"":r||"N\xE3o deu certo."})}async _chatDoAll(e){let t=(this._chatState().messages[e]||{}).actions||[];for(let s=0;s<t.length;s++)t[s].state!=="done"&&await this._chatDo(e,s)}async _chatMic(){let e=this._chatState();if(e.rec==="on"){let s=this._chatRec;if(this._chatRec=null,clearTimeout(this._chatRecTimer),!s)return this._setChat({rec:null});let a=s.stop();if(this._setChat({rec:null}),a.length<16e3*.4)return this._setChat({error:"N\xE3o ouvi nada. Toque no microfone e fale."});this._setChat({busy:!0,error:""});try{let i=await this.hass.resolvia.voiceText(a);this._setChat({busy:!1}),i&&i.text&&this._chatSend(i.text)}catch(i){this._setChat({busy:!1,error:i.message||"N\xE3o consegui transcrever."})}return}if(e.rec)return;let t=new Le(()=>{});this._chatRec=t,this._setChat({rec:"starting",error:""});try{await t.start()}catch(s){return t.cancel(),this._chatRec=null,this._setChat({rec:null,error:Mt(s)})}if(this._chatRec!==t)return t.cancel();this._setChat({rec:"on"}),this._chatRecTimer=setTimeout(()=>this._chatState().rec==="on"&&this._chatMic(),120*1e3)}_chatMicCancel(){clearTimeout(this._chatRecTimer),this._chatRec&&this._chatRec.cancel(),this._chatRec=null,this._setChat({rec:null,error:""})}_chatStop(){clearTimeout(this._chatRecTimer),this._chatRec&&this._chatRec.cancel(),this._chatRec=null,this._chat&&this._chat.rec&&(this._chat={...this._chat,rec:null})}_chatAfterRender(){if(!this._chatScroll||this._sheet!=="chat")return;this._chatScroll=!1;let e=this.renderRoot.querySelector(".chat-log");e&&(e.scrollTop=e.scrollHeight)}};var Ze=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,Fe=o=>o===!0?!0:typeof o=="string"&&o.trim()?o.replace(/\s+/g," ").trim().slice(0,60):null,di=o=>class extends o{async _loadExternal(){if(!(!this.hass||!this.hass.resolvia)){try{this._ext=(await this.hass.callWS({type:"resolvia/external/get"})).ext||{}}catch{this._ext=this._ext||{}}this.requestUpdate()}}_extOn(){return!this._app("ext_off",!1)}_externalRaw(e,t){let s=this._ext&&this._ext[e];return Fe(s&&s[De(t)])}_externalOf(e,t){return this._extOn()?this._externalRaw(e,t):null}_externalText(e,t){let s=this._externalOf(e,t);return s?s===!0?"Servi\xE7o externo":`Servi\xE7o externo ${s}`:""}async _setTaskExternal(e,t,s,a=null){if(!(!this.hass||!this.hass.resolvia))try{this._ext=(await this.hass.callWS({type:"resolvia/external/set",entity_id:e,summary:t,value:Fe(s),...a!=null?{previous_summary:a}:{}})).ext||{},this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar quem faz")}}async _saveTaskExternal(e,t,s,a=null){let i=Fe(s.ext),r=Fe(s.extOrig);(i!==r||a&&r)&&await this._setTaskExternal(e,t,i,a)}_renderExternalOption(e){let t=this._extOn();return l`<div class="panel" id="quem-faz">
        ${this._secHead("hard-hat","Quem faz")}
        <div class="row switch-row">
          <div class="grow"><div class="label">${Ze("hard-hat","lbl-ic")}Serviços externos</div><div class="hint" style="white-space:normal">${t?"Quem faz em cada tarefa: voc\xEAs ou algu\xE9m de fora.":"Desligado."}</div></div>
          ${e(t,"Servi\xE7os externos",s=>this._saveAppPrefs({ext_off:s.target.checked?null:!0}))}
        </div>
      </div>`}_renderExternalTag(e,t){let s=this._externalOf(e,t.summary);return s?l`<span class="tag ext">${Ze("hard-hat")}${s===!0?"Servi\xE7o externo":L(s,26)}</span>`:u}_renderExternalField(e,t=E.DUE_DATE|E.DESCRIPTION){if(!this._extOn())return u;let s=Fe(e.ext);return l`<div class="field">
        <span class="flabel">${Ze("hard-hat","lbl-ic")}Quem faz</span>
        <div class="chip-row ext-row">
          <button class="pick ${s?"":"on"}" @click=${()=>this._setForm({ext:null})}>${Ze("house")}<span>Nós mesmos</span></button>
          <button class="pick ${s?"on":""}" @click=${()=>this._setForm({ext:s||!0})}>${Ze("hard-hat")}<span>Serviço externo</span></button>
        </div>
        ${s?l`<input type="text" class="ext-who" maxlength="60" .value=${s===!0?"":s} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
              @input=${a=>this._setForm({ext:Fe(a.target.value)||!0})} />`:u}
      </div>`}};var ge=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D.circle)}</svg>`,Ne=6,Xo=/^[a-f0-9]{16}\.jpg$/,Te=o=>(Array.isArray(o)?o.filter(e=>typeof e=="string"&&(Xo.test(e)||e.startsWith("blob:"))):[]).slice(0,Ne),Go=(o,e)=>o.length===e.length&&o.every((t,s)=>t===e[s]);async function Zo(o,e=1600,t=.82){let s=URL.createObjectURL(o);try{let a=await new Promise((c,d)=>{let h=new Image;h.onload=()=>c(h),h.onerror=()=>d(new Error("N\xE3o consegui abrir a foto.")),h.src=s}),i=Math.min(1,e/Math.max(a.naturalWidth,a.naturalHeight,1)),r=document.createElement("canvas");r.width=Math.max(1,Math.round(a.naturalWidth*i)),r.height=Math.max(1,Math.round(a.naturalHeight*i));let n=r.getContext("2d");return n.fillStyle="#fff",n.fillRect(0,0,r.width,r.height),n.drawImage(a,0,0,r.width,r.height),await new Promise((c,d)=>r.toBlob(h=>h?c(h):d(new Error("N\xE3o consegui preparar a foto.")),"image/jpeg",t))}finally{URL.revokeObjectURL(s)}}var hi=o=>class extends o{async _loadPhotos(){if(!(!this.hass||!this.hass.resolvia)){try{this._photos=(await this.hass.callWS({type:"resolvia/photos/get"})).photos||{}}catch{this._photos=this._photos||{}}this.requestUpdate()}}_photosOf(e,t){let s=this._photos&&this._photos[e];return Te(s&&s[De(t)])}_photoUrl(e){if(String(e).startsWith("blob:"))return e;let t=this.hass&&this.hass.resolvia;return t&&t.photoUrl?t.photoUrl(e):""}async _setTaskPhotos(e,t,s,a=null){if(!(!this.hass||!this.hass.resolvia))try{this._photos=(await this.hass.callWS({type:"resolvia/photos/set",entity_id:e,summary:t,photos:Te(s),...a!=null?{previous_summary:a}:{}})).photos||{},this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar as fotos")}}async _saveTaskPhotos(e,t,s,a=null){let i=Te(s.photos),r=Te(s.photosOrig);(!Go(i,r)||a&&r.length)&&await this._setTaskPhotos(e,t,i,a)}async _addPhotos(e){let t=e.target,s=[...t.files||[]].filter(n=>/^image\//.test(n.type||"image/"));t.value="";let a=this._form;if(!a||!s.length)return;let i=Ne-Te(a.photos).length;if(i<=0)return this._showToast(`No m\xE1ximo ${Ne} fotos por tarefa`);let r=this.hass&&this.hass.resolvia;this._setForm({photosBusy:(a.photosBusy||0)+Math.min(i,s.length)});for(let n of s.slice(0,i)){try{let c=await Zo(n),d=r&&r.uploadPhoto?await r.uploadPhoto(c):URL.createObjectURL(c);this._form&&this._setForm({photos:[...Te(this._form.photos),d].slice(0,Ne)})}catch(c){this._showToast(c.message||"N\xE3o consegui guardar a foto")}this._form&&this._setForm({photosBusy:Math.max(0,(this._form.photosBusy||1)-1)})}s.length>i&&this._showToast(`No m\xE1ximo ${Ne} fotos por tarefa`)}_pickPhoto(e){let t=this.renderRoot.querySelector(`#${e}`);t&&t.click()}_renderPhotoTag(e,t){let s=this._photosOf(e,t.summary).length;return s?l`<span class="tag fotos" title="${s===1?"1 foto":`${s} fotos`}">${ge("camera")}${s}</span>`:u}_renderPhotosField(e,{inline:t=!1}={}){if(e.mirrored)return u;let s=Te(e.photos),a=s.length+(e.photosBusy||0)>=Ne,i=s.length||e.photosBusy?l`<div class="photo-grid">
              ${s.map((n,c)=>l`<div class="photo">
                  <button class="photo-open" @click=${()=>this._photoView=n} aria-label="Abrir a foto ${c+1}"><img src=${this._photoUrl(n)} alt="Foto ${c+1}" loading="lazy" /></button>
                  <button class="photo-x" @click=${()=>this._setForm({photos:s.filter(d=>d!==n)})} aria-label="Tirar a foto ${c+1}">${ge("x")}</button>
                </div>`)}
              ${Array.from({length:e.photosBusy||0},()=>l`<div class="photo busy" aria-label="Enviando">${ge("loader-circle","ai-spin")}</div>`)}
            </div>`:u,r=l`<input id="rv-task-cam" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${n=>this._addPhotos(n)} />
        <input id="rv-task-pick" class="sr" type="file" accept="image/*" multiple tabindex="-1" aria-hidden="true" @change=${n=>this._addPhotos(n)} />`;return t?l`<div class="imp-sub photos-sub">Anexar na tarefa${s.length?l` <span class="count">(${s.length})</span>`:u}</div>
          <div class="imp-tiles photo-tiles">
            <button type="button" class="imp-tile" ?disabled=${a} @click=${()=>this._pickPhoto("rv-task-cam")}>${ge("camera")}<span>Tirar foto</span></button>
            <button type="button" class="imp-tile" ?disabled=${a} @click=${()=>this._pickPhoto("rv-task-pick")}>${ge("images")}<span>Escolher fotos</span></button>
          </div>
          ${i}${r}`:l`<div class="field photos-field">
        <span class="flabel">${ge("camera","lbl-ic")}Fotos${s.length?l` <span class="count">(${s.length})</span>`:u}</span>
        <div class="chip-row grid photo-acts">
          <button class="pick" ?disabled=${a} @click=${()=>this._pickPhoto("rv-task-cam")}>${ge("camera")}<span>Tirar foto</span></button>
          <button class="pick" ?disabled=${a} @click=${()=>this._pickPhoto("rv-task-pick")}>${ge("images")}<span>Escolher fotos</span></button>
        </div>
        ${i}${r}
      </div>`}_renderPhotoView(){let e=this._photoView;if(!e)return u;let t=()=>this._photoView=null;return l`<div class="photo-view" role="dialog" aria-label="Foto" @click=${t}>
        <img src=${this._photoUrl(e)} alt="Foto da tarefa" />
        <button class="icon-btn photo-close" @click=${t} aria-label="Fechar">${ge("x")}</button>
      </div>`}};var qt=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,mi=6,pi=[{key:"late",label:"Atrasados",icon:"circle-alert"},{key:"today",label:"Hoje",icon:"clock"},{key:"week",label:"Pr\xF3ximos 7 dias",icon:"calendar-days"},{key:"later",label:"Mais adiante",icon:"calendar"},{key:"none",label:"Sem prazo",icon:"calendar-off"}],er=o=>o.status==="completed";function Et(o){return o.map((e,t)=>[e,t]).filter(([e])=>e.n>0).sort((e,t)=>t[0].n-e[0].n||e[1]-t[1]).map(([e])=>e)}function ui(o,e=!1,t=mi){if(e||o.length<=t+1)return{shown:o,more:0,moreN:0};let s=o.slice(t);return{shown:o.slice(0,t),more:s.length,moreN:s.reduce((a,i)=>a+i.n,0)}}function tr(o,e=new Date){let t=ae(o,e);return t?t.overdue?"late":t.diff===0?"today":t.diff<7?"week":"later":"none"}var ps=(o,e)=>o&&e?Math.max(1,Math.round(o/e*100)):0;function sr({lists:o=[],due:e=!0,rooms:t=null,equips:s=null,roomsOf:a=()=>[],equipsOf:i=()=>[],extOf:r=()=>null,now:n=new Date}={}){let c=new Set((t||[]).map($=>$.id)),d=new Map((s||[]).map($=>[$.id,$])),h=new Map,p=new Map,m=new Map,g=Object.fromEntries(pi.map($=>[$.key,0])),_=($,v)=>$.set(v,($.get(v)||0)+1),w=0,y=0,k=0,x=0,S=0,M=!1,C=o.map($=>{let v=($.items||[]).filter(q=>!er(q)),b=$.items?v.length:Number($.pending)||0;w+=b;let A=e&&!$.noDue;A&&v.length&&(M=!0);for(let q of v){let P=s?[...new Set(i($.id,q.summary))].filter(j=>d.has(j)):[];if(s&&(P.length?P.forEach(j=>_(p,j)):k++),t){let j=new Set([...a($.id,q.summary),...P.map(J=>d.get(J).comodo)].filter(J=>c.has(J)));j.size?j.forEach(J=>_(h,J)):y++}let z=r($.id,q.summary);if(!z)x++;else if(S++,typeof z=="string"){let j=m.get(N(z))||{name:z,n:0};j.n++,m.set(N(z),j)}A&&g[tr(q.due,n)]++}return{id:$.id,name:$.name,color:$.color,icon:$.icon,n:b}});return{pending:w,lists:Et(C),rooms:t?{rows:Et(t.map($=>({id:$.id,name:$.nome,n:h.get($.id)||0}))),none:y}:null,equips:s?{rows:Et(s.map($=>({id:$.id,name:$.nome,room:$.room||"",n:p.get($.id)||0}))),none:k}:null,due:M?pi.map($=>({...$,n:g[$.key]})).filter($=>$.n):null,ext:S?{house:x,ext:S,who:Et([...m.values()])}:null}}var ar=o=>o.length>1?`${o.slice(0,-1).join(", ")} e ${o[o.length-1]}`:o[0],fi=o=>class extends o{_chartsLine(){return`Pend\xEAncias por ${ar(["lista",this._roomsOn()&&"c\xF4modo",this._equipsOn()&&"equipamento",this._dueOn()&&"prazo"].filter(Boolean))}.`}_chartsData(e=new Date){let t=this._roomsOn();return sr({lists:this._visible(),due:this._dueOn(),rooms:t?this._roomList():null,equips:this._equipsOn()?this._equipList().map(s=>({...s,room:t&&this._roomName(s.comodo)||""})):null,roomsOf:(s,a)=>this._roomIdsOf(s,a),equipsOf:(s,a)=>this._equipIdsOf(s,a),extOf:(s,a)=>this._externalOf(s,a),now:e})}_chartsSearch(e,t){this._haptic("light"),this._query=e,this._searchDone=!1,t==="rooms"&&(this._searchRooms=!0),t==="equips"&&(this._searchEquips=!0),t==="ext"&&(this._searchExt=!0),this._go("/buscar")}_chartsOpen(e){return!!(this._chartsFolds&&this._chartsFolds[e])}_chartsToggle(e){this._chartsFolds={...this._chartsFolds||{},[e]:!this._chartsOpen(e)},this.requestUpdate()}_gPanel(e,t,s,a){return l`<div class="panel g-panel" id="g-${e}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${qt(t)}</span><h2>${s}</h2></div>
        ${a}
      </div>`}_gSplit(e,t){return t.length<2?u:l`<div class="g-split" role="img" aria-label="${e}: ${t.map(s=>`${s.name} ${s.n}`).join(", ")}">
        ${t.map(s=>l`<i class=${s.cls||""} style="flex:${s.n} 1 0;${s.style||""}" title="${s.name}: ${s.n}"></i>`)}
      </div>`}_gRow({name:e,sub:t="",n:s,max:a,pct:i=null,tile:r="",cls:n="",style:c="",go:d=null,label:h=""}){let p=l`${r?l`<span class="g-tile">${qt(r)}</span>`:u}
        <span class="g-name"><b>${e}</b>${t?l`<small>${t}</small>`:u}</span>
        <span class="g-n">${s}</span>
        <span class="g-bar"><i style="width:${ps(s,a)}%"></i></span>
        ${i!=null?l`<span class="g-pct">${i}%</span>`:u}`,m=`g-row ${r?"":"bare"} ${i!=null?"with-pct":""} ${n}`;return d?l`<button class=${m} style=${c} aria-label=${h||e} @click=${d}>${p}</button>`:l`<div class=${m} style=${c}>${p}</div>`}_gMore(e,t,s,a){if(t.length<=mi+1)return u;let i=this._chartsOpen(e);return l`<button class="g-more ${i?"open":""}" aria-expanded=${i?"true":"false"} @click=${()=>this._chartsToggle(e)}>
        <span class="g-more-t">${i?"Ver menos":`+${O(s.more,a[0],a[1])}`}</span>${i?u:l`<span class="g-n">${s.moreN}</span>`}${qt("chevron-down","chev")}
      </button>`}_gLists(e){let t=ui(e,this._chartsOpen("lists")),s=i=>W(i.color,this._dark),a=[...t.shown.map(i=>({name:i.name,n:i.n,style:s(i)})),...t.more?[{name:`+${O(t.more,"lista","listas")}`,n:t.moreN,cls:"k-rest"}]:[]];return this._gPanel("listas","list-checks","Por lista",l`${this._gSplit("Pendentes por lista",a)}
          ${t.shown.map(i=>this._gRow({name:i.name,n:i.n,max:e[0].n,tile:i.icon,style:s(i),go:()=>this._go(`/lista/${i.id}`),label:`${i.name}: ${O(i.n,"pendente","pendentes")}`}))}
          ${this._gMore("lists",e,t,["lista","listas"])}`)}_gPlaces(e,t,s,a,i){let[r,n,c]=i;if(!a.rows.length)return this._gPanel(e,t,s,l`<p class="panel-lead g-empty">${n}</p>`);let d=ui(a.rows,this._chartsOpen(e));return this._gPanel(e,t,s,l`${d.shown.map(h=>this._gRow({name:h.name,sub:h.room||"",n:h.n,max:a.rows[0].n,go:()=>this._chartsSearch(h.name,e),label:`${h.name}: ${O(h.n,"pendente","pendentes")}`}))}
          ${this._gMore(e,a.rows,d,c)}
          ${a.none?l`<p class="g-foot">${r}: <b>${a.none}</b></p>`:u}`)}_gDue(e){let t=e.reduce((a,i)=>a+i.n,0),s=Math.max(...e.map(a=>a.n));return this._gPanel("prazos","calendar-clock","Por prazo",l`${this._gSplit("Pendentes por prazo",e.map(a=>({name:a.label,n:a.n,cls:`k-${a.key}`})))}
          ${e.map(a=>this._gRow({name:a.label,n:a.n,max:s,pct:ps(a.n,t),tile:a.icon,cls:`k-${a.key}`,go:a.key==="none"?null:()=>this._go(""),label:`${a.label}: ${O(a.n,"pendente","pendentes")}`}))}`)}_gWho(e){let t=e.house+e.ext,s=e.who.length?e.who[0].name+(e.who.length>1?` +${e.who.length-1}`:""):"",a=[{key:"house",name:"N\xF3s mesmos",n:e.house,icon:"house"},{key:"ext",name:"Servi\xE7o externo",n:e.ext,icon:"hard-hat",sub:s,go:()=>this._chartsSearch("Servi\xE7o externo","ext")}].filter(i=>i.n);return this._gPanel("quem","hard-hat","Quem faz",l`${this._gSplit("Quem faz",a.map(i=>({name:i.name,n:i.n,cls:`k-${i.key}`})))}
          ${a.map(i=>this._gRow({name:i.name,sub:i.sub,n:i.n,max:Math.max(e.house,e.ext),pct:ps(i.n,t),tile:i.icon,cls:`k-${i.key}`,go:i.go,label:`${i.name}: ${O(i.n,"pendente","pendentes")}`}))}`)}_renderCharts(){let e=this._chartsData(),t={text:e.pending?`${O(e.pending,"pendente","pendentes")} em ${O(e.lists.length,"lista","listas")}`:"Nada pendente"};return l`<section class="page">
        ${this._renderPageHead("Gr\xE1ficos",t,!0)}
        ${e.pending?l`<div class="g-grid">
              ${this._gLists(e.lists)}
              ${e.rooms?this._gPlaces("rooms","door-open","Por c\xF4modo",e.rooms,["Sem c\xF4modo","Nenhuma pend\xEAncia com c\xF4modo.",["c\xF4modo","c\xF4modos"]]):u}
              ${e.equips?this._gPlaces("equips","package","Por equipamento",e.equips,["Sem equipamento","Nenhuma pend\xEAncia com equipamento.",["equipamento","equipamentos"]]):u}
              ${e.due?this._gDue(e.due):u}
              ${e.ext?this._gWho(e.ext):u}
            </div>`:l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${qt("chart-bar")}</div>
                <h3>Tudo resolvido</h3>
                <p>Nenhum item pendente nas listas.</p>
              </div>
            </div>`}
      </section>`}},gi=`
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
`;var ir=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,Ot=o=>String(o).padStart(2,"0"),Ct=o=>`${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`;function or(o,e=new Date){let t=new Date(o&&o.em);if(!o||Number.isNaN(t.getTime()))return"";let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()-1),a=Ct(t)===Ct(e)?"hoje":Ct(t)===Ct(s)?"ontem":`em ${Ot(t.getDate())}/${Ot(t.getMonth()+1)}`;return`${o.cliente} usou ${a} \xE0s ${Ot(t.getHours())}:${Ot(t.getMinutes())}.`}var vi=o=>class extends o{async _loadCorreria(){if(!(!this.hass||!this.hass.resolvia)){try{this._correria=await this.hass.callWS({type:"resolvia/correria/get"})}catch{this._correria=null}this.requestUpdate()}}async _setCorreria(e){this._haptic("light"),await this._saveAppPrefs({correria_on:e?!0:null}),await this._loadCorreria()}_renderCorreriaPanel(){if(!this.hass.resolvia)return u;let e=this._app("correria_on",!1)===!0,t=or(this._correria&&this._correria.ultimo);return l`<div class="panel" id="correria">
        ${this._secHead("zap","CorrerIA","O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini.")}
        <div class="row switch-row">
          <div class="grow"><div class="label">${ir("zap","lbl-ic")}Usar com o CorrerIA</div><div class="hint" style="white-space:normal">${e?"Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas.":"Desligado."}</div></div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._setCorreria(s.target.checked)} aria-label="Usar com o CorrerIA" /><span class="track"></span></label>
        </div>
        ${e?l`<div class="sub-op"><div class="sub-box"><div class="ai-state ${t?"ok":""}"><span class="dot"></span><div>${t?l`<b>${t}</b>`:l`<b>Nenhum uso ainda</b><span>Conecte no app CorrerIA.</span>`}</div></div></div></div>`:u}
      </div>`}};var xi=["janeiro","fevereiro","mar\xE7o","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],bi=["D","S","T","Q","Q","S","S"],rr=["domingo","segunda","ter\xE7a","quarta","quinta","sexta","s\xE1bado"],nr=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],ze=o=>String(o).padStart(2,"0"),_i=(o,e,t)=>`${o}-${ze(e)}-${ze(t)}`;function wi(o,e=new Date){return/^\d{4}-\d{2}/.test(o||"")?o.slice(0,7):`${e.getFullYear()}-${ze(e.getMonth()+1)}`}function us(o,e){let[t,s]=o.split("-").map(Number),a=new Date(t,s-1+e,1);return`${a.getFullYear()}-${ze(a.getMonth()+1)}`}function ms(o){let[e,t]=o.split("-").map(Number),s=xi[t-1];return`${s.charAt(0).toUpperCase()}${s.slice(1)} de ${e}`}function lr(o){let[e,t,s]=o.split("-").map(Number);return`${rr[new Date(e,t-1,s).getDay()]}, ${s} de ${xi[t-1]} de ${e}`}function cr(o,e=0){let[t,s]=o.split("-").map(Number),a=(new Date(t,s-1,1).getDay()-e+7)%7,i=new Date(t,s,0).getDate(),r=Array.from({length:a},()=>null);for(let n=1;n<=i;n++)r.push(_i(t,s,n));for(;r.length%7;)r.push(null);return r}function $i({icon:o,month:e,value:t,today:s,onPick:a,onMonth:i,min:r="",max:n="",weekStart:c=0,months:d=!1,onMonths:h=null}){let[p]=e.split("-").map(Number),m=k=>(!r||k>=r)&&(!n||k<=n),g=(k,x,S)=>l`<button type="button" class="icon-btn cal-nav" aria-label=${x} ?disabled=${!S} @click=${()=>i(us(e,k))}>${o(k<0?"chevron-left":"chevron-right")}</button>`;if(d&&h){let k=x=>(!n||`${p}-${ze(x+1)}-01`<=n)&&(!r||_i(p,x+1,new Date(p,x+1,0).getDate())>=r);return l`<div class="cal" role="group" aria-label="Escolher o mês">
      <div class="cal-head">
        ${g(-12,"Ano anterior",!r||Number(r.slice(0,4))<p)}
        <button type="button" class="cal-title" aria-label="Voltar aos dias" @click=${()=>h(!1)}>${p}</button>
        ${g(12,"Pr\xF3ximo ano",!n||Number(n.slice(0,4))>p)}
      </div>
      <div class="cal-months">
        ${nr.map((x,S)=>{let M=`${p}-${ze(S+1)}`,C=!!t&&t.slice(0,7)===M;return l`<button type="button" class="cal-month ${C?"on":""} ${s&&s.slice(0,7)===M?"today":""}" aria-pressed=${C?"true":"false"} ?disabled=${!k(S)} @click=${()=>(i(M),h(!1))}>${x}</button>`})}
      </div>
    </div>`}let _=us(e,-1),w=`${_}-${ze(new Date(Number(_.slice(0,4)),Number(_.slice(5,7)),0).getDate())}`,y=`${us(e,1)}-01`;return l`<div class="cal" role="group" aria-label="Escolher a data">
    <div class="cal-head" data-month=${e}>
      ${g(-1,"M\xEAs anterior",!r||w>=r)}
      ${h?l`<button type="button" class="cal-title" aria-live="polite" aria-label=${`${ms(e)}: escolher o m\xEAs`} @click=${()=>h(!0)}>${ms(e)}</button>`:l`<b class="cal-title" aria-live="polite">${ms(e)}</b>`}
      ${g(1,"Pr\xF3ximo m\xEAs",!n||y<=n)}
    </div>
    <div class="cal-grid">
      ${bi.map((k,x)=>l`<span class="cal-wd" aria-hidden="true">${bi[(x+c)%7]}</span>`)}
      ${cr(e,c).map(k=>k?l`<button type="button" class="cal-day ${k===t?"on":""} ${k===s?"today":""}" data-d=${k} aria-pressed=${k===t?"true":"false"} aria-current=${k===s?"date":u} aria-label=${lr(k)} ?disabled=${!m(k)} @click=${()=>a(k)}>${Number(k.slice(8))}</button>`:l`<span class="cal-gap"></span>`)}
    </div>
  </div>`}var yi=`
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
`;var fs="2.89.3",ki="resolvia.theme",gs="resolvia.prefs",It="resolvia.lastList",f=(o,e="")=>l`<svg class="i ${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(D[o]||D["list-checks"])}</svg>`,Ai={Agora:"clock",Buscar:"search","Minhas listas":"list-todo",Mais:"ellipsis",Listas:"list-checks",Gr\u00E1ficos:"chart-bar",Configura\u00E7\u00F5es:"sliders-horizontal",Sobre:"info"},te={get(o,e){try{let t=localStorage.getItem(o);return t==null?e:JSON.parse(t)}catch{return e}},set(o,e){try{localStorage.setItem(o,JSON.stringify(e))}catch{}}},X=o=>o.status==="completed",Si=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],V=o=>o.uid||o.summary,Mi="resolvia-fechadas",qi=o=>{if(!o)return"";let e=o.querySelector(":scope > .mais-head h2");return o.id||o.dataset&&o.dataset.card||(e?e.textContent.trim():"")},Ei="resolvia-campos",Oi="resolvia-incluir-fechado",Ci="resolvia-buscar-agrupar",dr="resolvia-busca-quem",Ii=o=>{let e=o&&o.querySelector(":scope > .flabel");return e?e.textContent.trim().replace(/\s*\(.*\)$/,"").replace(/s$/,""):""},hr=(o="")=>/^Apagar/.test(o)?"trash":/^Restaurar/.test(o)?"archive-restore":/^Importar/.test(o)?"upload":/^Limpar/.test(o)?"brush-cleaning":/^Desligar/.test(o)?"toggle-right":"circle-alert",Ti=o=>({Hoje:"sun",Amanh\u00E3:"sunrise",Ontem:"undo-2"})[o]||"calendar-days",et=["listas","graficos","config","sobre"],pe="08:00",vs=class extends la(vi(fi(hi(di(ci(ei(Ga(Ka(Ua(_e)))))))))){static properties={_photoView:{state:!0},hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_alertPeople:{state:!0},_people:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_searchRooms:{state:!0},_searchEquips:{state:!0},_searchExt:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_folds:{state:!0},_sel:{state:!0},_bsel:{state:!0},_rules:{state:!0},_cam:{state:!0},_rooms:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[$a,ra,ne(Oa),ne(Ra),ne(Ia),ne(ri),ne(gi),ne(yi),ne(na)];constructor(){super(),this._searchShut=new Set,this._incluirShut=te.get(Oi,!1)===!0,this._searchWho=null,te.set(dr,null),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._searchRooms=!0,this._searchEquips=!0,this._searchExt=!0,this._theme=te.get(ki,"auto"),this._doneOpen={},this._folds={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),ba(),this._today=new Date().toDateString(),this._dayTimer=setInterval(()=>{let e=new Date().toDateString();e!==this._today&&(this._today=e,this.requestUpdate())},6e4),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=e=>{if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey||this._sheet)return;let t=e.composedPath&&e.composedPath()[0]||e.target;t&&t.closest&&t.closest("input, textarea, select, [contenteditable]")||(e.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let e=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(e){this._focusSearch=!1,e.focus({preventScroll:!0});try{e.setSelectionRange(e.value.length,e.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),this._stopHaPath&&this._stopHaPath(),this._bsel=null,this._sel=null,clearInterval(this._dayTimer),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,e]of this._subs)this._unsub(e);this._subs.clear();for(let[,e]of this._recent)clearTimeout(e);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(e=>e&&e()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this.hass||t.themes!==this.hass.themes||t.entities!==this.hass.entities||t.devices!==this.hass.devices||t.user!==this.hass.user||t.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(i=>i.startsWith("todo.")),a=Object.keys(t.states).filter(i=>i.startsWith("todo."));return s.length!==a.length?!0:s.some(i=>t.states[i]!==this.hass.states[i])}willUpdate(e){e.has("route")&&this.route&&(this._path=this.route.path||""),this._bsel&&this._bsel.path!==this._path&&(this._bsel=null),this._sel&&this._sel.path!==this._path&&(this._sel=null),e.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints(),this._loadRooms(),this._loadExternal(),this._loadPhotos()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(e.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}_markTabs(){let e=this.renderRoot&&this.renderRoot.querySelector(".tabs-wrap > .more-tabs");if(e&&(e.parentElement.classList.toggle("tem-esq",e.scrollLeft>2),e.parentElement.classList.toggle("tem-dir",e.scrollLeft+e.clientWidth<e.scrollWidth-2),window.ResizeObserver&&(!this._tabsRo||this._tabsRo.t!==e))){this._tabsRo&&this._tabsRo.ro.disconnect();let t=new ResizeObserver(()=>this._markTabs());t.observe(e),e.querySelectorAll("button").forEach(s=>t.observe(s)),this._tabsRo={t:e,ro:t}}}updated(e){this.toggleAttribute("dark",this._dark),this._markTabs(),this._applyFolds(),this._applyFieldFolds(),this._chatAfterRender();let t=this._view();if(t.old!=null&&e.has("_path")){this._go(t.old,!0,history.state&&history.state.rvUp?{rvUp:!0}:null);return}if(e.has("_path")&&t.name==="config"){let s=this.renderRoot.querySelector(".more-tabs"),a=s&&s.querySelector("button.on");if(a){let r=a.offsetLeft,n=r+a.offsetWidth;r<s.scrollLeft?s.scrollLeft=r-8:n>s.scrollLeft+s.clientWidth&&(s.scrollLeft=n-s.clientWidth+8)}let i=this._configTab();i==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadRooms(),this._loadExternal(),this._loadPhotos(),this._loadUsage(),this._loadCorreria()),i==="dados"&&this._loadBackups()}e.has("_path")&&this._view().name!=="search"&&(this._openRoom=""),e.has("_path")&&this._view().name==="search"&&this._searchShut.size&&(this._searchShut.clear(),this.requestUpdate()),this._view().name==="search"&&(this._focusSearch||e.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="home"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}_closedCards(){if(!this._fechadas)try{this._fechadas=new Set(JSON.parse(localStorage.getItem(Mi)||"[]"))}catch{this._fechadas=new Set}return this._fechadas}_applyFolds(){let e=this.renderRoot;if(!e||!e.querySelectorAll)return;let t=this._closedCards();for(let s of e.querySelectorAll(".panel > .mais-head")){let a=s.parentElement,i=qi(a);if(!i)continue;let r=t.has(i);a.classList.add("dobra"),a.classList.toggle("fechada",r),s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-expanded",r?"false":"true")}}_closedFields(){if(!this._camposFechados)try{this._camposFechados=new Set(JSON.parse(localStorage.getItem(Ei)||"[]"))}catch{this._camposFechados=new Set}return this._camposFechados}_applyFieldFolds(){let e=this.renderRoot;if(!e||!e.querySelectorAll)return;let t=this._closedFields();for(let s of e.querySelectorAll(".sheet .field")){let a=s.querySelector(":scope > .flabel");if(!a||!s.querySelector(":scope > .chip-row, :scope > .imp-tiles, :scope > .eq-pick, :scope > .swatches, :scope > .icon-grid, :scope > .opt-rows, :scope > textarea[data-fold]"))continue;let i=Ii(s);if(!i)continue;let r=t.has(i);s.classList.add("dobravel"),s.classList.toggle("shut",r),a.setAttribute("role","button"),a.setAttribute("tabindex","0"),a.setAttribute("aria-expanded",r?"false":"true")}}_toggleField(e){let t=Ii(e.parentElement);if(!t)return;let s=this._closedFields();s.has(t)?s.delete(t):s.add(t);try{localStorage.setItem(Ei,JSON.stringify([...s]))}catch{}this._haptic("light"),this._applyFieldFolds()}_toggleFold(e){let t=qi(e.parentElement);if(!t)return;let s=this._closedCards();s.has(t)?s.delete(t):s.add(t);try{localStorage.setItem(Mi,JSON.stringify([...s]))}catch{}this._haptic("light"),this._applyFolds()}firstUpdated(){this._checkHeight();let e=a=>{let i=a.target.closest&&a.target.closest(".panel.dobra > .mais-head");return i&&!a.target.closest("button, a, input, select, textarea, label")?i:null},t=a=>a.target.closest&&a.target.closest(".sheet .field.dobravel > .flabel")||null;this.renderRoot.addEventListener("click",a=>{let i=e(a);i&&this._toggleFold(i);let r=t(a);r&&this._toggleField(r)}),this.renderRoot.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" ")return;let i=e(a),r=!i&&t(a);!i&&!r||(a.preventDefault(),i?this._toggleFold(i):this._toggleField(r))});let s=$s();s&&!this._inHA()&&this._go(s,s==="/prazos"),this._openRoom=ws(),this._openRoom&&(this._searchGroup="comodo"),this._inHA()||(this._stopHaPath=ys(a=>{let i=ks(a);i&&(i.room&&(this._openRoom=i.room,this._searchGroup="comodo"),this._view().name!=="search"||this._path!==i.path?this._go(i.path):this.requestUpdate())}))}_checkHeight(){if(this.hasAttribute("vh"))return;let e=this.getBoundingClientRect().height;(e>window.innerHeight+4||e<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(e=>e.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let e=this._todoIds();for(let t of e)this._subs.has(t)||this._subscribe(t);for(let[t,s]of[...this._subs])if(!e.includes(t)){this._unsub(s),this._subs.delete(t),this._polling.delete(t);let a=new Map(this._items);a.delete(t),this._items=a}}_subscribe(e){let t=this.hass.connection.subscribeMessage(s=>this._setItems(e,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:e}).catch(()=>(this._polling.add(e),this._fetchItems(e),null));this._subs.set(e,t)}_unsub(e){Promise.resolve(e).then(t=>typeof t=="function"&&t()).catch(()=>{})}async _fetchItems(e){try{let t=await this.hass.callWS({type:"todo/item/list",entity_id:e});this._setItems(e,t&&t.items||[])}catch{this._setItems(e,this._items.get(e)||[])}}_refreshPolled(e){if(!(!e||!this._polling.size))for(let t of this._polling)e.states[t]!==this.hass.states[t]&&this._fetchItems(t)}_setItems(e,t){let s=new Map(this._items);s.set(e,t),this._items=s}_patchItem(e,t,s){let a=this._items.get(e);a&&this._setItems(e,a.map(i=>V(i)===t?{...i,...s}:i))}_computeLists(){let e=this._prefs&&this._prefs.lists||{},t=!this._dueOn(),a=this._todoIds().map(i=>{let r=this.hass.states[i],n=Ha(this.hass,i);return{id:i,st:r,meta:n}});return a.sort((i,r)=>(i.meta.group||"").localeCompare(r.meta.group||"","pt-BR")||i.meta.name.localeCompare(r.meta.name,"pt-BR")),a.map(({id:i,st:r,meta:n},c)=>{let d=e[i]||{},h=this._items.get(i),p=h?h.filter(M=>!X(M)):null,m=p?p.length:Number(r.state)||0,g=h?h.length-p.length:0,_=d.color==="sem"?ts:Ee(d.color)||es(c),w=r.attributes.supported_features||0,y=T(w,E.DUE_DATE)||T(w,E.DUE_DATETIME),k=!y||d.dates_info===!0,x=k||t,S=p&&!x?p.map(M=>ae(M.due)).filter(Boolean):[];return{id:i,name:d.name||n.name,origName:n.name,group:n.group,color:_,colorId:d.color||null,autoColor:es(c),icon:d.icon==="sem"?null:d.icon||ss(`${n.name} ${n.group||""} ${i}`),iconPref:d.icon||null,hidden:!!d.hidden,owner:this._ownersOn()&&d.owner||null,features:w,canDue:y,appDue:!!r.attributes.resolvia_prazo,datesInfo:k,noDue:x,hasDates:!!(h&&h.some(M=>M.due)),unavailable:r.state==="unavailable"||r.state==="unknown",items:h,pending:m,done:g,late:S.filter(M=>M.overdue).length,today:S.filter(M=>!M.overdue&&M.diff===0).length}})}_list(e){return this._L.find(t=>t.id===e)}_visible(){return this._L.filter(e=>!e.hidden)}_app(e,t){let s=this._prefs&&this._prefs.app?this._prefs.app[e]:void 0;return s===void 0?t:s}_accentDaily(){return this._app("accent_daily",!0)!==!1}_accent(){return this._accentDaily()?Ta(fe,new Date):Ee(this._app("accent","vermelho"))||fe[0]}async _loadPrefs(){try{let e=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:e.lists||{},app:e.app||{}},this._prefsRemote=!0}catch{this._prefs=te.get(gs,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(e,t){let s={...this._prefs.lists},a={...s[e]||{}};for(let[i,r]of Object.entries(t))r===null||r===""?delete a[i]:a[i]=r;if(Object.keys(a).length?s[e]=a:delete s[e],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let i=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:e,prefs:t});this._prefs={lists:i.lists||{},app:i.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else te.set(gs,this._prefs)}async _saveAppPrefs(e){let t={...this._prefs.app};for(let[s,a]of Object.entries(e))a===null||a===""?delete t[s]:t[s]=a;if(this._prefs={...this._prefs,app:t},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:e});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else te.set(gs,this._prefs)}_setTheme(e){this._theme=e,te.set(ki,e)}_inHA(){return!!this.route}_view(){let e=(this._path||"").replace(/\/+$/,""),t;if(t=e.match(/^\/lista\/(todo\.[^/]+)$/))return{name:"list",id:decodeURIComponent(t[1])};if(e==="/minhas-listas")return{name:"lists"};if(e==="/prazos"||e==="/sugestoes")return{name:"home",old:""};if(e==="/buscar")return{name:"search"};if(e==="/mais")return{name:"more"};if(e==="/listas")return{name:"listas"};if(e==="/graficos")return{name:"graficos"};if(e==="/sobre")return{name:"sobre"};if(t=e.match(/^\/config(?:\/(integracoes|dados|aparencia|opcoes))?$/))return{name:"config",tab:t[1]||"integracoes"};if(e==="/repeticoes")return{name:"config",tab:"opcoes",old:"/config/opcoes"};if(t=e.match(/^\/mais\/(repeticoes|integracoes|ia|dados|aparencia|opcoes)$/)){let s=t[1]==="ia"?"integracoes":t[1]==="repeticoes"?"opcoes":t[1];return{name:"config",tab:s,old:this._configPath(s)}}return{name:"home"}}_configPath(e){return e==="integracoes"?"/config":`/config/${e}`}_go(e,t=!1,s=null){this._sheet&&this._closeSheet(!0);let a=(history.state&&history.state.rvDepth||0)+(t?0:1),i={...s||{},rvDepth:a};if(this._inHA()){let n=`/${this.panel&&this.panel.url_path||"resolvia"}${e}`;t?history.replaceState(i,"",n):history.pushState(i,"",n),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:t}}))}else i.rvPath=e,t?history.replaceState(i,""):history.pushState(i,""),this._path=e;let r=this.renderRoot&&this.renderRoot.querySelector("main");r&&r.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_fromMenu(){return et.includes(this._view().name)&&!!(history.state&&history.state.rvUp)}_toMenu(){this._fromMenu()?history.back():this._go("/mais",!0)}_openFromMenu(e){if(this._haptic("light"),e==="relatorio")return this._openReport();this._go(e,!1,{rvUp:!0})}_openReport(){let e=this.hass&&this.hass.resolvia;if(!e||!e.report)return this._showToast("Na pr\xE9via o relat\xF3rio n\xE3o abre. No app, ele abre pronto para imprimir.");let t=new URLSearchParams({tema:this._dark?"escuro":"claro",cor:this._accent().fill});location.href=e.report(t.toString())}_onSwipeStart(e){this._sw=this._sheet||this._cam?null:_a(e)}_onSwipeEnd(e){let t=wa(e,this._sw);if(this._sw=null,!t||this._sheet)return;let s=[["home",""],["search","/buscar"],["lists","/minhas-listas"],["more","/mais"]],a=this._view().name;if(a==="list"){if(t>0)return;this._haptic("light"),this._back(),bt(this,"lists",t);return}if(et.includes(a)){if(t>0)return;this._haptic("light"),this._toMenu(),bt(this,"more",t);return}let i=s.findIndex(([n])=>n===a),r=i+t;i<0||r<0||r>=s.length||(this._haptic("light"),this._goTab(s[r][1]),bt(this,s[r][0],t))}_goTab(e){let t=this._view().name;if(et.includes(t)){if(e==="/mais")return this._toMenu();if(this._fromMenu())return e===""?history.go(-2):(this._afterPop=e,history.back())}if(e===""){if(t==="home"){let a=this.renderRoot.querySelector("main");a&&a.scrollTo({top:0});return}let s=history.state&&history.state.rvDepth||0;s>0?(this._afterPop="",history.go(-s)):this._go("",!0);return}this._go(e,t!=="home"&&t!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"");let e=this._afterPop;this._afterPop=null,e!=null&&this._go(e,!0)}_openSheet(e,t=null){let s=!!this._sheet;if(this._sheet=e,this._form=t,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(e=!1){this._sheet&&(this._stopVoice(),this._chatStop(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(e?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/config"),this.updateComplete.then(()=>{let e=this.renderRoot.querySelector("#leitura-ia");e&&e.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(e){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(e);history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(e){if(this.env&&this.env.haptic)return this.env.haptic(e);window.dispatchEvent(new CustomEvent("haptic",{detail:e}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(e=>this._rules=e&&e.rules||[],{type:"resolvia/recurring/subscribe"}).then(e=>(this._rulesOk=!0,e)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let e=this._app("repeat_on",void 0);return e===void 0?this._rules.length>0:e===!0}_ruleFor(e,t){return!t||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===e&&s.uid&&s.uid===t.uid)||t.status!=="completed"&&this._rules.find(s=>s.entity_id===e&&!s.uid&&s.match===t.summary)||null}_everyLabel(e){return e===1?"todo dia":e===7?"toda semana":e===14?"a cada 2 semanas":e===30?"todo m\xEAs":`a cada ${e} dias`}_returnLabel(e){let t=new Date(e),s=ae($e(t));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(e,t=Date.now()){let s=new Date(t);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+e).getTime()}_setRule(e,{uid:t,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:e,uid:t||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(e,t=null){clearTimeout(this._toastTimer),this._toast={text:e,action:t,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,t?4500:Math.min(8e3,Math.max(2600,e.length*55)))}async _call(e,t,s){try{return await this.hass.callService("todo",e,t,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",e,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(e,t){if(!T(e.features,E.UPDATE))return;let s=V(t),a=!X(t),i=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(e.id,s,{status:i}),!await this._call("update_item",{item:s,status:i},e.id)){this._patchItem(e.id,s,{status:t.status});return}let n=this._pointsOf(e.id,t.summary,t.uid),c=this._mirrored(e.id,t.uid);if(a){let d=this._ruleFor(e.id,t),h=d?` \xB7 volta ${this._returnLabel(this._reopenAt(d.days))}`:"",p={label:"Desfazer",run:()=>{this._patchItem(e.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},e.id),(n||c)&&this._takePoints(e,t)}};n?this._givePoints(e,t,`Resolvido: ${L(t.summary,18)}`,p):this._showToast(`Resolvido: ${L(t.summary,d?22:30)}${h}${c?" \xB7 volta com a pr\xF3xima data":""}`,p)}else(n||c)&&this._takePoints(e,t)}_quickAdd(e,t){e.preventDefault();let s=e.currentTarget.querySelector("input");this._addLines(t,[s.value],s)}_onQuickPaste(e,t){let s=e.clipboardData&&e.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(e.preventDefault(),this._addLines(t,s.split(/\r?\n/),e.currentTarget))}async _addLines(e,t,s){let a=t.map(r=>r.trim()).filter(Boolean);if(!a.length)return;let i=s.value;s.value="",s.focus(),this._haptic("light");for(let r of a)if(!await this._call("add_item",{item:r},e.id)){s.value=i||r;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(e,t,s,a){let i=e.features;return t?s&&T(i,E.DUE_DATETIME)?{due_datetime:`${t} ${s}:00`}:T(i,E.DUE_DATE)?{due_date:t}:T(i,E.DUE_DATETIME)?{due_datetime:`${t} ${s||"09:00"}:00`}:{}:a?T(i,E.DUE_DATE)?{due_date:null}:T(i,E.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(e,{summary:t,description:s,date:a,time:i}){let r={item:t,...this._dueFields(e,a,i,!1)};return s&&T(e.features,E.DESCRIPTION)&&(r.description=s),this._call("add_item",r,e.id)}_openAdd(e){let t=this._visible().filter(i=>T(i.features,E.CREATE)&&!i.unavailable),s=te.get(It,null),a=e&&this._list(e)&&T(this._list(e).features,E.CREATE)&&e||t.find(i=>i.id===s)&&s||t[0]&&t[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1,room:null,equips:[],ext:null}),this.updateComplete.then(()=>{let i=this.renderRoot.querySelector(".sheet textarea");i&&i.focus({preventScroll:!0})})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(e=!0){let t=this.hass&&this.hass.resolvia;if(!(!t||!t.aiStatus)&&!(!e&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await t.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(e,t="ai_entity"){await this._saveAppPrefs({[t]:e||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let e=this._aiInfo();return Ea({u:this._usage,day:this._usageDay,onDay:t=>(this._usageDay=t,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","As chamadas do app para a IA. Os tokens s\xE3o estimados."),app:"ResolvIA",using:[e.using&&e.using.id,e.photos&&e.photos.id],names:Object.fromEntries((e.entities||[]).map(t=>[t.id,t.name]))})}_dueOn(){return!this._app("due_off",!1)}_notesOn(){return!this._app("notes_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(e){let t=a=>{let i=a&&this._list(a);return i&&T(i.features,E.CREATE)&&!i.unavailable?a:null},s=this._visible().filter(a=>T(a.features,E.CREATE)&&!a.unavailable);return t(e)||t(te.get(It,null))||s[0]&&s[0].id||null}_openImport(e,t="pick"){let s=this._importTarget(e);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:t==="text"?"text":t==="voice"?"voice":"pick",rec:t==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),t==="photos"&&this._pickFiles("photos"),t==="scan"&&this._openCamera(),t==="text"&&this._focusImportText(),t==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(e=!1){try{this._voice=await this.hass.resolvia.voiceStatus(e)}catch(t){this._voice={ready:!1,reason:t.message}}this.requestUpdate()}async _chooseVoice(e){await this._saveAppPrefs({voice_engine:e||null}),await this._loadVoice(!0),this._showToast("Fala para texto atualizada")}_renderVoicePanel(){let e=this._voice,t=this._app("voice_engine","")||"",s=e&&e.options||[],a=!e||this._voiceChecking,i=a?"off":e.ready&&!e.missing?"ok":e.ready?"warn":"bad",r=a?"Verificando\u2026":e.ready?"Pronto para ouvir":"Sem fala para texto",n=a?"":e.ready?`Transcreve com ${e.name}.${e.missing?" O escolhido n\xE3o foi encontrado: usando o autom\xE1tico.":""}`:e.reason||"",c=async()=>{this._voiceChecking=!0,this.requestUpdate(),await this._loadVoice(!0),this._voiceChecking=!1,this.requestUpdate()};return l`<div class="panel" id="falar">
      ${this._secHead("mic","Falar","Quem transforma a fala em texto. N\xE3o muda o assistente de voz do Home Assistant.")}
      <div class="ai-state ${i}"><span class="dot"></span><div><b>${r}</b>${n?l`<span>${n}</span>`:u}</div></div>
      ${s.length||t?l`<label class="field" style="margin:14px 0 0">
            <span class="flabel">${f("mic","lbl-ic")}Fala para texto</span>
            <select class="select" aria-label="Fala para texto" @change=${d=>this._chooseVoice(d.target.value)}>
              <option value="" ?selected=${!t}>Automático${e&&e.auto?`: ${e.auto.name}`:""}</option>
              ${s.map(d=>l`<option value=${d.id} ?selected=${d.id===t}>${d.name}</option>`)}
              ${t&&!s.some(d=>d.id===t)?l`<option value=${t} selected>${t} (não encontrado)</option>`:u}
            </select>
          </label>`:u}
      <div class="ai-actions"><button class="btn outline" ?disabled=${a} @click=${c}>${f("rotate-ccw")}Verificar de novo</button></div>
      ${e&&!e.ready?l`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>Com o <a class="site" href="https://www.nabucasa.com/" target="_blank" rel="noopener noreferrer">Home Assistant Cloud</a>, a fala para texto já vem pronta.</li>
              <li>Sem ele, instale um motor de fala: o app Whisper (local, de graça) com a integração Wyoming, ou a fala para texto de uma IA como Google Gemini ou OpenAI.</li>
              <li>Volte aqui, toque em Verificar de novo e escolha o motor na lista.</li>
            </ol>
          </div>`:u}
    </div>`}_renderMicBtn(e=null){return!this._aiOn()||!this._voice||!this._voice.ready?u:l`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(e,"voice")}>${f("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let e=new Le(t=>this._voiceLevel=t);this._rec=e;try{await e.start()}catch(t){e.cancel(),this._rec===e&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:Mt(t)});return}if(this._rec!==e||!this._form||this._form.step!=="voice")return e.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==e)return clearInterval(this._recTimer);let t=e.seconds();this._setForm({secs:t,level:this._voiceLevel||0}),t>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let e=this._rec;if(!e)return;clearInterval(this._recTimer),this._rec=null;let t=e.stop();if(t.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(t);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(e){let t=this._form,s=this._voice||{},a=t.rec==="on",i=Math.floor((t.secs||0)/60),r=String(Math.floor((t.secs||0)%60)).padStart(2,"0"),n=this._list(t.target);return l`
      ${e("Falar")}
      <div class="voice ${a?"on":""}">
        <button class="voice-mic" style="--lvl:${a?(t.level||0).toFixed(2):0}" aria-label=${a?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>a?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${f(a?"check":"mic")}
        </button>
        <div class="voice-state">${a?l`<b>Ouvindo…</b> <span class="voice-time">${i}:${r}</span>`:t.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${a?"Toque de novo quando terminar.":l`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${n?l`<p class="voice-hint">Vai para <b>${n.name}</b> (dá para trocar na revisão).</p>`:u}
      </div>
      ${t.error?l`<div class="imp-error">${f("circle-alert")}<span>${t.error}</span></div>`:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>${f("x")}Cancelar</button>
        <button class="btn primary" ?disabled=${!a} @click=${()=>this._finishVoice()}>${f("sparkles")}Pronto</button>
      </div>
      ${s.ready?u:l`<p class="sheet-note">${s.reason||""}</p>`}
    `}_focusImportText(){this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(".sheet textarea");e&&e.focus({preventScroll:!0})})}_pickFiles(e){let t=this.renderRoot.querySelector(e==="scan"?"#rv-scan":"#rv-photos");t&&(t.value="",t.click())}_releaseImages(){let e=this._form;if(e&&e.images)for(let t of e.images)t.url&&URL.revokeObjectURL(t.url)}_camOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(e){let t=r=>r.type==="application/pdf"||/\.pdf$/i.test(r.name||""),s=[...e.target.files||[]].filter(r=>!r.type||r.type.startsWith("image/")||t(r)).slice(0,6);if(e.target.value="",s.some(t)&&(s=[s.find(t)]),!s.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let a=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:a?"review":"pick"});let i=[];for(let r of s)if(t(r)){let{files:n}=await St([r]);n[0]&&i.push({mime:"application/pdf",data:n[0].data,url:"",pdf:!0,nome:n[0].nome})}else i.push(await ns(r));this._readImages(i,a)}_readImages(e,t){if(this._sheet!=="import"||!e.length)return;let s=t?[...this._form.images||[],...e]:(this._releaseImages(),e);this._setForm({step:"loading",images:s,prevStep:t?"review":"pick",loadingText:e.some(a=>a.pdf)?"Lendo o PDF com IA\u2026":e.length>1?`Lendo ${e.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:e,appending:t})}async _runExtract({text:e,images:t,appending:s=!1}){let a=this._importToken=Date.now(),i=this._list(this._form.target),r=()=>a===this._importToken&&this._sheet==="import",n=s?this._form.items||[]:[],c=(d,h=[],p=[],m=[])=>{let g=new Set(n.map(y=>y.text.trim().toLowerCase())),_=(y,k)=>k||y&&this._roomsOn()&&(this._equipOf(y)||{}).comodo||null,w=d.map((y,k)=>({text:y,on:!0,list:h[k]||null,room:_(m[k],p[k]),equip:m[k]||null})).filter(y=>!g.has(y.text.trim().toLowerCase()));return[...n,...w]};try{let d=await this.hass.resolvia.extract({text:e,images:t?t.map(({data:p,mime:m})=>({data:p,mime:m})):void 0,list_name:i?i.name:void 0,lists:this._importTargets().map(p=>({id:p.id,name:p.name}))});if(!r())return;let h=d.items||[];if(!h.length){let p=e?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:p}):this._setForm({step:e?"text":"pick",error:p});return}this._haptic("success"),this._setForm({step:"review",items:c(h,d.lists||[],d.rooms||[],d.equips||[]),provider:d.provider||null,note:null,error:null})}catch(d){if(!r())return;if(e){let h=rs(e);if(h.length){this._setForm({step:"review",items:c(h),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:d.message||"Algo deu errado"}):this._setForm({step:e?"text":"pick",error:d.message||"Algo deu errado"})}}async _openCamera(e={}){let t=navigator.mediaDevices,s=!!e.chat,a=!s&&!!(this._form&&this._form.step==="review");if(!t||!t.getUserMedia){this._cam={status:"error",shots:[],chat:s,appending:a,flash:0,error:window.isSecureContext===!1?"A c\xE2mera aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher.":"Este navegador n\xE3o deixa o app usar a c\xE2mera. Escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher."};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}return}this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:a,chat:s,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let i=await t.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){i.getTracks().forEach(d=>d.stop());return}this._stream=i;let r=i.getVideoTracks()[0],n=r&&r.getCapabilities?r.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!n.torch},await this.updateComplete;let c=this.renderRoot.querySelector(".cam video");c&&(c.srcObject=i,c.play().catch(()=>{}))}catch(i){if(!this._cam)return;let r=i&&(i.name==="NotAllowedError"||i.name==="SecurityError");this._cam={...this._cam,status:"error",error:r?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(e=>e.stop()),this._stream=null}_closeCamera(e=!1){if(!this._cam)return;this._stopStream();let t=this._cam.shots||[];if(!this._cam.used)for(let s of t)URL.revokeObjectURL(s.url);this._cam=null,!e&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let e=this._stream&&this._stream.getVideoTracks()[0];if(!e)return;let t=!this._cam.torch;try{await e.applyConstraints({advanced:[{torch:t}]}),this._cam={...this._cam,torch:t}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let e=this.renderRoot.querySelector(".cam video");if(!e||!e.videoWidth||!this._cam||this._cam.shots.length>=6)return;let t=1800,s=Math.min(1,t/Math.max(e.videoWidth,e.videoHeight)),a=document.createElement("canvas");a.width=Math.round(e.videoWidth*s),a.height=Math.round(e.videoHeight*s),a.getContext("2d").drawImage(e,0,0,a.width,a.height);let i=await new Promise(n=>a.toBlob(n,"image/jpeg",.86));if(!i||!this._cam)return;let r=await ns(i,t);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,r],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let e=this._cam.shots,t=this._cam.appending,s=this._cam.chat;if(this._cam={...this._cam,used:!0},this._closeCamera(),s)return this._chatAddShots(e);this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(e,t&&this._form.step==="review")}_cameraFallback(){let e=this._cam&&this._cam.appending;if(this._cam&&this._cam.chat)return this._closeCamera(),this._chatAttach("fotos");this._closeCamera(),e&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let e=this._cam;if(!e)return u;let t=e.shots.length;return l`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${e.flash?l`<div class="cam-flash" .key=${e.flash}></div>`:u}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${f("x")}</button>
          <span class="cam-title">${e.chat?"Tirar foto":"Digitalizar com IA"}</span>
          ${e.torchOk?l`<button class="cam-btn ${e.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${f("zap")}</button>`:l`<span class="cam-btn ghost"></span>`}
        </div>
        ${e.status==="error"?l`<div class="cam-msg">
              ${f("camera")}
              <p>${e.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${f("images")}Escolher foto</button>
            </div>`:l`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${e.status==="starting"?"Abrindo a c\xE2mera\u2026":t?`${O(t,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${e.shots.slice(-3).map(s=>l`<img src=${s.url} alt="" />`)}${t>3?l`<span>+${t-3}</span>`:u}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${e.status!=="live"||t>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!t} @click=${()=>this._useShots()}>${f("check")}Pronto${t?` (${t})`:""}</button>
        </div>
      </div>
    `}_readText(){let e=(this._form.text||"").trim();if(!e){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:e});return}let t=rs(e);t.length?this._setForm({step:"review",items:t.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}_clipOk(){return!!(navigator.clipboard&&navigator.clipboard.readText)&&!this._clipFailed}async _pasteClipboard(){let e="";try{e=await navigator.clipboard.readText()}catch{this._clipFailed=!0,this._focusImportText(),this._showToast("Este aparelho n\xE3o deixa o app ler o que foi copiado. Toque e segure no campo e escolha Colar."),this.requestUpdate();return}if(!e){this._focusImportText(),this._showToast("N\xE3o h\xE1 nada copiado.");return}this._setForm({text:e,error:null})}_setImportItem(e,t){let s=this._form.items.slice();s[e]={...s[e],...t},this._setForm({items:s})}_importTargets(){let e=this._form||{};return this._L.filter(t=>T(t.features,E.CREATE)&&!t.unavailable&&(!t.hidden||t.id===e.target))}_importListOf(e){let t=this._importTargets();return e.list&&t.some(s=>s.id===e.list)&&e.list||this._form.target}async _importAdd(){let e=this._form,t=this._list(e.target),s=e.items.filter(n=>n.on&&n.text.trim()).map(n=>({...n,dest:this._importListOf(n)}));if(!t||!s.length)return;te.set(It,t.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0,i=new Set;for(let n of s)if(await this._call("add_item",{item:n.text.trim()},n.dest))a++,i.add(n.dest),n.room&&this._roomsOn()&&await this._setTaskRoom(n.dest,n.text.trim(),n.room==="*"?this._houseRooms().map(c=>c.id):n.room),n.equip&&this._equipsOn()&&await this._setTaskEquip(n.dest,n.text.trim(),n.equip);else break;if(!a)return;let r=i.size===1?this._list([...i][0]):null;this._showToast(`${O(a,"item adicionado","itens adicionados")} ${r?`em ${L(r.name,24)}`:`em ${i.size} listas`}`)}_openEdit(e,t){let s=le(t.due),a=this._ruleFor(e.id,t),i=a?a.days:0;this._openSheet("item",{mode:"edit",listId:e.id,key:V(t),target:e.id,summary:t.summary||"",description:Oe(t.description),hadNotes:!!Oe(t.description).trim(),mirrored:this._mirrored(e.id,t.uid),due:t.due||null,date:s?s.date:null,time:s?s.time:null,repeat:i,repeatOrig:i,repeatCustom:!!i&&!Si.some(r=>r.days===i),points:this._rawPoints(e.id,t.summary),pointsOrig:this._rawPoints(e.id,t.summary),room:this._roomIdOf(e.id,t.summary),rooms:this._roomIdsOf(e.id,t.summary),roomsOrig:this._roomIdsOf(e.id,t.summary),equips:this._equipIdsOf(e.id,t.summary),equipsOrig:this._equipIdsOf(e.id,t.summary),ext:this._externalRaw(e.id,t.summary),extOrig:this._externalRaw(e.id,t.summary),photos:this._photosOf(e.id,t.summary),photosOrig:this._photosOf(e.id,t.summary)}),this._loadPoints()}_setForm(e){this._form={...this._form,...e}}async _saveItem(){let e=this._form,t=(e.summary||"").trim();if(!t){let h=this.renderRoot.querySelector(".sheet textarea");h&&h.focus();return}let s=(e.description||"").trim(),a=this._list(e.target);if(e.mode==="add"){if(!a)return;te.set(It,a.id),this._closeSheet(),this._haptic("light");let h=await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time});h&&e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),h&&e.points&&await this._setTaskPoints(a.id,t,e.points),h&&await this._saveTaskPlace(a.id,t,e),h&&await this._saveTaskExternal(a.id,t,e),h&&await this._saveTaskPhotos(a.id,t,{...e,photosOrig:[]}),h&&this._view().id!==a.id&&this._showToast(`Adicionado em ${L(a.name,28)}`);return}let i=this._list(e.listId),r=i&&i.items&&i.items.find(h=>V(h)===e.key);if(!i||!r){this._closeSheet();return}if(a&&a.id!==i.id){this._closeSheet(),await this._addFull(a,{summary:t,description:s,date:e.date,time:e.time})&&(e.repeat&&await this._setRule(a.id,{summary:t,days:e.repeat}),e.repeatOrig&&await this._setRule(i.id,{uid:r.uid,summary:r.summary,days:null}),e.points&&await this._setTaskPoints(a.id,t,e.points),e.pointsOrig&&await this._setTaskPoints(i.id,r.summary,0),await this._saveTaskPlace(a.id,t,{...e,roomsOrig:[],equipsOrig:[]}),(e.roomsOrig||[]).length&&await this._setTaskRoom(i.id,r.summary,null),(e.equipsOrig||[]).length&&await this._setTaskEquip(i.id,r.summary,null),await this._saveTaskExternal(a.id,t,{...e,extOrig:null}),e.extOrig&&await this._setTaskExternal(i.id,r.summary,null),(e.photos||[]).length&&await this._setTaskPhotos(a.id,t,e.photos),(e.photosOrig||[]).length&&await this._setTaskPhotos(i.id,r.summary,[]),await this._call("remove_item",{item:[e.key]},i.id),this._showToast(`Movido para ${L(a.name,28)}`));return}let n={item:e.key};if(t!==r.summary&&(n.rename=t),T(i.features,E.DESCRIPTION)&&s!==Oe(r.description)){let h=Ya(r.description);n.description=h?`${s}${s?" ":""}${h}`:s||null}let c=le(r.due);((c?c.date:null)!==(e.date||null)||(c?c.time:null)!==(e.time||null))&&Object.assign(n,this._dueFields(i,e.date,e.time,!0)),this._closeSheet(),((e.points||0)!==(e.pointsOrig||0)||e.pointsOrig&&t!==r.summary)&&await this._setTaskPoints(i.id,t,e.points||0,t!==r.summary?r.summary:null),await this._saveTaskPlace(i.id,t,e,t!==r.summary?r.summary:null),await this._saveTaskExternal(i.id,t,e,t!==r.summary?r.summary:null),await this._saveTaskPhotos(i.id,t,e,t!==r.summary?r.summary:null),(e.repeat||0)!==(e.repeatOrig||0)&&(await this._setRule(i.id,{uid:r.uid,summary:t,days:e.repeat}),e.repeat&&this._showToast(`Repete ${this._everyLabel(e.repeat)} depois de concluir`)),Object.keys(n).length>1&&(n.rename&&this._patchItem(i.id,e.key,{summary:t}),await this._call("update_item",n,i.id))}async _deleteItem(){let e=this._form,t=this._list(e.listId),s=t&&t.items&&t.items.find(r=>V(r)===e.key);if(this._closeSheet(),!t||!s)return;if(this._setItems(t.id,t.items.filter(r=>V(r)!==e.key)),this._haptic("warning"),!await this._call("remove_item",{item:[e.key]},t.id)){this._setItems(t.id,t.items);return}let i=le(s.due);this._showToast("Item apagado",T(t.features,E.CREATE)?{label:"Desfazer",run:()=>this._addFull(t,{summary:s.summary,description:s.description,date:i?i.date:null,time:i?i.time:null})}:null)}_confirmClearDone(e){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${O(e.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${e.done===1?"":"s"} de \u201C${e.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},e.id)&&this._showToast("Conclu\xEDdos apagados")}})}_formColor(e,t){return e.color==="sem"?ts:Ee(e.color)||t.autoColor||t.color}_ownersOn(){return this._app("owners_on",!1)===!0}_openCustomize(e){this._openSheet("customize",{listId:e.id,name:e.name===e.origName?"":e.name,color:e.colorId,icon:e.iconPref,hidden:e.hidden,deadlines:!e.datesInfo,owner:e.owner||""}),this._people===void 0&&this._loadPeople()}async _loadPeople(){if(!this._peopleLoading){this._peopleLoading=!0;try{this._people=this._prefsRemote?await this.hass.callWS({type:"resolvia/people"}):[]}catch{this._people=[]}this._peopleLoading=!1,this.requestUpdate()}}async _saveCustomize(){let e=this._form,t=this._list(e.listId);this._closeSheet(),await this._saveListPrefs(e.listId,{name:(e.name||"").trim()||null,color:e.color||null,icon:e.icon||null,hidden:e.hidden?!0:null,dates_info:t&&t.canDue&&!e.deadlines?!0:null,...this._ownersOn()?{owner:(e.owner||"").trim()||null}:{}})}_dragStart(e,t,s){if(e.pointerType==="mouse"&&e.button!==0)return;e.preventDefault();let a=e.currentTarget,i=a.closest(".item"),n=[...i.parentElement.querySelectorAll(":scope > .item[data-drag]")],c=n.indexOf(i);if(c<0)return;let d=this.renderRoot.querySelector("main"),h=n.map(S=>S.getBoundingClientRect()),p=d.scrollTop,m=h.map(S=>S.top+S.height/2+p),g=h[c].height,_={y:e.clientY,target:c,raf:0,lastY:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}i.classList.add("dragging"),n.forEach((S,M)=>M!==c&&S.classList.add("shifting")),this._haptic("selection");let w=()=>{let S=_.lastY-_.y+(d.scrollTop-p);i.style.transform=`translateY(${S}px)`;let M=m[c]+S,C=0;for(let $=0;$<n.length;$++)$!==c&&m[$]<M&&C++;C!==_.target&&(_.target=C,this._haptic("selection")),n.forEach(($,v)=>{if(v===c)return;let b=0;c<C&&v>c&&v<=C&&(b=-g),C<c&&v>=C&&v<c&&(b=g),$.style.transform=b?`translateY(${b}px)`:""})},y=()=>{let S=d.getBoundingClientRect(),M=70,C=0;_.lastY<S.top+M?C=-Math.ceil((S.top+M-_.lastY)/6):_.lastY>S.bottom-M&&(C=Math.ceil((_.lastY-(S.bottom-M))/6)),C&&(d.scrollTop+=C,w()),_.raf=requestAnimationFrame(y)};_.raf=requestAnimationFrame(y);let k=S=>{_.lastY=S.clientY,w()},x=()=>{cancelAnimationFrame(_.raf),a.removeEventListener("pointermove",k),a.removeEventListener("pointerup",x),a.removeEventListener("pointercancel",x),n.forEach(S=>{S.classList.remove("shifting","dragging"),S.style.transform=""}),_.target!==c&&this._commitMove(t,s,n.map(S=>S.dataset.key),c,_.target)};a.addEventListener("pointermove",k),a.addEventListener("pointerup",x),a.addEventListener("pointercancel",x)}async _commitMove(e,t,s,a,i){let r=s.slice(),[n]=r.splice(a,1);r.splice(i,0,n);let c=i===0?void 0:r[i-1],d=e.items.slice(),h=d.findIndex(_=>V(_)===n),[p]=d.splice(h,1),m=c?d.findIndex(_=>V(_)===c):-1;d.splice(m+1,0,p),this._setItems(e.id,d);let g={type:"todo/item/move",entity_id:e.id,uid:n};c&&(g.previous_uid=c);try{await this.hass.callWS(g)}catch{this._setItems(e.id,e.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return u;let e=this._dark,t=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,i=a?a.color:t,r=`--rv-accent:${i.fill};--rv-accent-ink:${e?i.fill:i.ink};--rv-accent-soft:${yt(i.fill,e?.18:.14)};--rv-accent-ink-light:${i.ink};`,n;return s.name==="list"?n=this._renderList(s.id):s.name==="lists"?n=this._renderLists():s.name==="search"?n=this._renderSearch():s.name==="more"?n=this._renderMore():s.name==="listas"?n=this._renderMoreScreen("Listas",this._listsStatus(),this._renderListsTab()):s.name==="graficos"?n=this._renderCharts():s.name==="sobre"?n=this._renderMoreScreen("Sobre",null,oa({app:"ResolvIA",version:fs})):s.name==="config"?n=this._renderConfig():n=this._renderSuggest(),l`
      <div class="root" style=${r}>
        <div class="app">
          ${!this.env||this.env.topbar?l`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${f("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:u}
          ${this.hass.connected===!1?l`<div class="offline">${f("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:u}
          ${this._renderSide(s)}
          <main @touchstart=${c=>this._onSwipeStart(c)} @touchend=${c=>this._onSwipeEnd(c)}>${n}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()} ${this._renderPhotoView()}
        ${this._canImport()?l`<input id="rv-photos" class="sr" type="file" accept="image/*,application/pdf" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${c=>this._onFiles(c)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${c=>this._onFiles(c)} />`:u}
      </div>
    `}_renderNav(e){let t=this._dueOn()?this._visible().reduce((i,r)=>i+r.late+r.today,0):0,s=e.name==="list"?"lists":et.includes(e.name)?"more":e.name,a=(i,r,n,c,d=0)=>l`
      <button class="tab ${s===i?"on":""}" @click=${()=>this._goTab(r)} aria-label=${n}>
        ${f(c)}<span>${n}</span>
        ${d?l`<span class="badge">${d>99?"99+":d}</span>`:u}
      </button>
    `;return l`
      <nav>
        <div class="tabs">
          ${a("home","","Agora","clock",t)} ${a("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(e.name==="list"?e.id:null)} aria-label="Adicionar item">
            <span class="pill">${f("plus")}</span>
          </button>
          ${a("lists","/minhas-listas","Listas","list-checks")} ${a("more","/mais","Mais","ellipsis")}
        </div>
      </nav>
    `}_renderSide(e){let t=this._byPending(this._visible()),s=this._dueOn()?t.reduce((r,n)=>r+n.late+n.today,0):0,a=et.includes(e.name)?"more":e.name,i=(r,n,c,d,h=0,p="")=>l`<button class="side-link" aria-current=${a===r?"page":"false"} @click=${()=>this._goTab(n)}>
      ${f(d)}<span>${c}</span>${h?l`<span class="side-badge">${h>99?"99+":h}</span>`:u}${p?l`<kbd>${p}</kbd>`:u}
    </button>`;return l`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${Qt()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${i("home","","Agora","clock",s)} ${i("search","/buscar","Buscar","search",0,"/")}
        ${i("lists","/minhas-listas","Listas","list-checks")} ${i("more","/mais","Mais","ellipsis")}
      </div>
      ${t.length?l`<div class="side-h"><span>Listas</span><small>${t.length}</small></div>
            <div class="side-lists">
              ${t.map(r=>l`<button class="side-list" aria-current=${e.name==="list"&&e.id===r.id?"page":"false"} style=${W(r.color,this._dark)} @click=${()=>this._go(`/lista/${r.id}`)}>
                  ${r.icon?l`<span class="side-tile">${f(r.icon)}</span>`:l`<span class="side-tile sem"></span>`}<span class="sl-name">${r.name}</span><span class="sl-num">${r.pending||""}</span>
                </button>`)}
            </div>`:u}
      <div class="side-foot">ResolvIA ${fs}</div>
    </aside>`}_renderTopActs(){return l`<div class="top-acts">
      ${this._renderChatBtn()}${this._renderMicBtn()}
      ${this._canImport()?l`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${f("scan-text")}Ler com IA</button>`:u}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${f("plus")}Adicionar item</button>
    </div>`}_renderPageHead(e,t,s=!1){let a=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],r=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:t;return l`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${Qt()}Resolv<span>IA</span></span>${a?l`<span class="sep"> · </span>Olá, ${a}`:""}</p>${this._renderChatBtn()}${this._renderMicBtn()}${this._renderTopActs()}</div>
      ${s?l`<button class="uplink" @click=${()=>this._toMenu()}>${f("chevron-left")}Mais</button>`:u}
      <h1 class="page-title">${Ai[e]?l`<span class="mais-ic page-ic" aria-hidden="true">${f(Ai[e])}</span>`:u}${e}</h1>
      ${r?l`<p class="status"><span class="dot ${r.tone||""}" aria-hidden="true"></span><span>${r.text}</span></p>`:u}
    </header>`}_byPending(e){return[...e].sort((t,s)=>s.pending-t.pending)}_renderLists(){let e=this._byPending(this._visible()),t=this._L.filter(h=>h.hidden),s=e.reduce((h,p)=>h+p.pending,0),a=e.reduce((h,p)=>h+p.late,0),i=e.reduce((h,p)=>h+p.today,0),r=e.filter(h=>h.pending>0).length,n=[];s&&n.push(`em ${O(r,"lista","listas")}`),i&&n.push(`${i} pra hoje`),a&&n.push(`${O(a,"atrasado","atrasados")}`);let c=this._app("group_by_device",!0),d=[];if(c){for(let p of e){let m=p.group||"",g=d.find(_=>_.name===m);g||d.push(g={name:m,lists:[]}),g.lists.push(p)}let h=p=>p.lists.reduce((m,g)=>m+g.pending,0);d.sort((p,m)=>h(m)-h(p)||(p.name?1:0)-(m.name?1:0))}else d.push({name:null,lists:e});for(let h of d)h.off=[];t.length&&!d.length&&d.push({name:"",lists:[],off:[]});for(let h of t)(d.find(p=>c&&p.name===(h.group||""))||d[d.length-1]).off.push(h);return l`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${O(e.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>l`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${Va(this.hass.user&&this.hass.user.name)}</div>
            ${s?l`<div class="hero-big">${s}<small>${s===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${n.join(" \xB7 ")}</div>`:l`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>
        ${this._L.length?this._renderHomeFacts(e):u}
        </div>

        ${this._L.length?this._renderHomeSearch():u}

        ${this._L.length===0?l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${f("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:l`
              <div class="groups ${d.length>1?"two":""}">
              ${d.map(h=>{let p=c?h.name||(d.length>1?"Listas locais":"Listas"):"Listas",m=c&&(h.name||d.length>1);return l`
                  <div class="panel grp">
                    <div class="grp-head ${m?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${f(h.name?"layout-list":"list-checks")}</span><h2 class="overline">${p}</h2><small>${h.lists.length}</small></div>
                    ${h.lists.map(g=>this._renderListCard(g,!c))}
                    ${h.off.length?l`<div class="inact-grp">${this._renderFold("listas",h.off,g=>this._renderListCard(g,!c))}</div>`:u}
                  </div>
                `})}
              </div>
            `}
        ${this.hass.user&&this.hass.user.is_admin?l`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${f("list-plus")}<span>Nova lista</span>
            </button>`:u}
      </section>
    `}_renderHomeSearch(){let e=this._visible().reduce((t,s)=>t+(s.items&&s.items.length||0),0);return l`<form class="search-box home-search" role="search" @submit=${t=>{t.preventDefault(),this._query=t.target.q.value.trim(),this._toSearch()}}>
      ${f("search")}
      <input type="search" name="q" placeholder=${e?`Buscar entre ${O(e,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${t=>{t.target.value.trim()&&(this._query=t.target.value,t.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(e,t){let s=e.pending+e.done,a=s?Math.round(e.done/s*100):0,i=[];return e.unavailable?i.push(l`<span>Indisponível</span>`):e.items?(i.push(l`<span>${e.pending?O(e.pending,"pendente","pendentes"):"Tudo resolvido"}${e.done?` \xB7 ${e.done} ${e.done===1?"feito":"feitos"}`:""}</span>`),e.late?i.push(l`<span class="tag late">${f("circle-alert")}${e.late}</span>`):e.today&&i.push(l`<span class="tag today">${f("clock")}${e.today} hoje</span>`)):i.push(l`<span>Carregando…</span>`),l`
      <button class="list-card ${e.unavailable?"off":""}" style=${W(e.color,this._dark)} @click=${()=>this._go(`/lista/${e.id}`)}>
        ${e.icon?l`<span class="tile">${f(e.icon)}</span>`:u}
        <span class="lc-main">
          <span class="lc-title">${e.name}</span>
          <span class="lc-meta">${t&&e.group?l`<span>${e.group} ·</span>`:u}${i}</span>
          ${s?l`<span class="bar"><i style="width:${a}%"></i></span>`:u}
        </span>
        <span class="lc-num ${e.pending?"":"zero"}">${e.pending||f("circle-check")}</span>
      </button>
    `}_renderList(e){let t=this._list(e);if(!t)return l`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${f("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>${f("house")}Voltar para o início</button>
      </section>`;let s=T(t.features,E.CREATE)&&!t.unavailable,a=T(t.features,E.UPDATE),i=T(t.features,E.MOVE),r=T(t.features,E.DELETE),n=t.items,c=n?n.filter(g=>!X(g)||this._recent.has(V(g))):[],d=n?n.filter(g=>X(g)&&!this._recent.has(V(g))):[],h=n?n.length:0,p=this._doneOpen[e]!==void 0?this._doneOpen[e]:this._app("show_done",!1);return this._selOn(e)?this._renderSelecting(t,c.filter(g=>!X(g))):l`
      <section class="page" style=${W(t.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${f("chevron-left")}</button>
          <div class="dh-text">
            ${t.group?l`<div class="overline">${t.group}</div>`:u}
            <h1 class="display">${t.name}</h1>
          </div>
          ${this._renderChatBtn()}${this._renderMicBtn(t.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:t.id})} aria-label="Opções da lista">${f("ellipsis")}</button>
        </div>

        ${h?l`<div class="progress">
              <span>${t.done} de ${h} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(t.done/h*100)}%"></i></span>
            </div>`:u}
        ${s?l`<div class="quick">
              <form @submit=${g=>this._quickAdd(g,t)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${g=>this._onQuickPaste(g,t)} />
                ${this._canImport()?l`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(t.id)}>${f("scan-text")}</button>`:u}
                <button class="add-btn" type="submit" aria-label="Adicionar">${f("plus")}</button>
              </form>
            </div>`:u}
        ${t.unavailable?l`<div class="panel"><div class="empty"><div class="em-icon">${f("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:n?c.length?l`<div class="panel items">
                  ${se(c,V,g=>this._renderItem(t,g,{draggable:i&&a&&!X(g),selectable:r&&!X(g)}))}
                </div>`:l`<div class="panel">
                  <div class="empty">
                    ${h?l`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:l`<div class="em-icon">${f(t.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:l`<div class="panel">${[70,52,84].map(g=>l`<div class="skeleton" style="width:${g}%"></div>`)}</div>`}
        ${d.length?l`
              <div class="done-head">
                <button class="done-toggle ${p?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[e]:!p}} aria-expanded=${p?"true":"false"}>
                  Concluídos <span class="count">(${d.length})</span>${f("chevron-down")}
                </button>
                ${r?l`<button class="text-btn" @click=${()=>this._confirmClearDone(t)}>${f("trash")}Limpar</button>`:u}
              </div>
              ${p?l`<div class="panel items">${se(d,V,g=>this._renderItem(t,g))}</div>`:u}
            `:u}
        ${!a&&n&&n.length?l`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:u}
      </section>
    `}_selOn(e){return!!(this._sel&&this._sel.listId===e&&this._sel.path===this._path)}_startSelect(e,t=null){this._sel={listId:e.id,path:this._path,keys:new Set(t?[V(t)]:[])},this._haptic("light")}_toggleSel(e){let t=new Set(this._sel.keys),s=V(e);t.has(s)?t.delete(s):t.add(s),this._sel={...this._sel,keys:t}}_endSelect(){this._sel=null}_renderSelecting(e,t){let s=t.filter(i=>this._sel.keys.has(V(i))).length,a=s===t.length&&t.length>0;return l`
      <section class="page selecting-page" style=${W(e.color,this._dark)}>
        <div class="detail-head sel-head">
          <button class="icon-btn" @click=${()=>this._endSelect()} aria-label="Cancelar seleção">${f("x")}</button>
          <div class="dh-text">
            <div class="overline">${e.name}</div>
            <h1 class="display">${s?`${s} ${s===1?"selecionado":"selecionados"}`:"Selecionar"}</h1>
          </div>
          <button class="text-btn" @click=${()=>this._sel={...this._sel,keys:a?new Set:new Set(t.map(V))}}>${f(a?"x":"square-check-big")}${a?"Nenhum":"Todos"}</button>
        </div>
        <div class="panel items">${se(t,V,i=>this._renderItem(e,i,{selecting:!0,selected:this._sel.keys.has(V(i))}))}</div>
        <div class="sel-bar">
          <button class="btn primary" ?disabled=${!s} @click=${()=>this._openSheet("move",{listId:e.id})}>${f("arrow-right-left")}Mover para outra lista</button>
        </div>
      </section>
    `}_renderMoveSheet(){let e=this._list(this._form.listId);if(!e||!this._sel)return u;let t=this._sel.keys.size,s=this._L.filter(a=>a.id!==e.id&&T(a.features,E.CREATE)&&!a.unavailable&&!a.hidden);return l`
      <div class="sheet-head">
        <h3 class="display">${f("arrow-right-left","sh-ic")}Mover ${t} ${t===1?"item":"itens"} para</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      ${s.length?l`<div class="chip-row grid">${s.map(a=>l`<button class="pick list" style=${W(a.color,this._dark)} @click=${()=>this._moveSelected(a.id)}><span class="dot"></span><span>${L(a.name,26)}</span></button>`)}</div>`:l`<p class="page-sub">Nenhuma outra lista aceita itens novos.</p>`}
    `}async _moveItem(e,t,s,a=null){let i=t.summary||"",r=a?a.date?a:null:le(t.due);if(!await this._addFull(s,{summary:i,description:Oe(t.description),date:r?r.date:null,time:r?r.time:null}))return!1;let c=this._ruleFor(e.id,t);c&&c.days&&(await this._setRule(s.id,{summary:i,days:c.days}),await this._setRule(e.id,{uid:t.uid,summary:i,days:null}));let d=this._rawPoints(e.id,i);d&&(await this._setTaskPoints(s.id,i,d),await this._setTaskPoints(e.id,i,0));let h=this._roomIdsOf(e.id,i),p=this._equipIdsOf(e.id,i);h.length&&(await this._setTaskRoom(s.id,i,h),await this._setTaskRoom(e.id,i,null)),p.length&&(await this._setTaskEquip(s.id,i,p),await this._setTaskEquip(e.id,i,null));let m=this._externalRaw(e.id,i);return m&&(await this._setTaskExternal(s.id,i,m),await this._setTaskExternal(e.id,i,null)),!0}async _moveSelected(e){let t=this._list(this._sel.listId),s=this._list(e);if(!t||!s)return;let a=(t.items||[]).filter(r=>this._sel.keys.has(V(r)));this._closeSheet(),this._endSelect();let i=[];for(let r of a)await this._moveItem(t,r,s)&&i.push(r);i.length&&await this._call("remove_item",{item:i.map(V)},t.id),this._haptic("light"),this._showToast(i.length===a.length?`${i.length} ${i.length===1?"item movido":"itens movidos"} para ${L(s.name,28)}`:`Movidos ${i.length} de ${a.length} para ${L(s.name,28)}`)}_renderText(e,t){return ja(e).map(s=>s.url?l`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${f(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,t))}_highlight(e,t){if(!t)return e;let s=Fa(e),a=N(t);if(!a)return e;let i=[],r=0,n;for(;(n=s.indexOf(a,r))!==-1;)n>r&&i.push(e.slice(r,n)),i.push(l`<mark>${e.slice(n,n+a.length)}</mark>`),r=n+a.length;return r<e.length&&i.push(e.slice(r)),i}_renderItem(e,t,s={}){let a=X(t),i=!a&&ae(t.due),r=T(e.features,E.UPDATE),n=this._ruleFor(e.id,t),c=n?a&&n.reopen_at?l`<span class="tag rep">${f("repeat")}volta ${this._returnLabel(n.reopen_at)}</span>`:l`<span class="tag rep">${f("repeat")}${this._everyLabel(n.days)}</span>`:u;if(s.selecting){let d=!!s.selected;return l`
        <div class="item selecting ${d?"picked":""} ${s.locked?"locked":""}" data-key=${V(t)} style=${s.showList?W(e.color,this._dark):""} title=${s.locked||""}
          @click=${()=>s.locked?this._showToast(s.locked):s.onToggle?s.onToggle():this._toggleSel(t)}>
          <span class="check sel ${d?"on":""}" role="checkbox" aria-checked=${d?"true":"false"} aria-disabled=${s.locked?"true":"false"} aria-label="Selecionar ${t.summary||""}">${f(s.locked?"lock":"check")}</span>
          <div class="it-body">
            <div class="it-text">${t.summary||""}</div>
            ${this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)?l`<div class="chips">${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)}</div>`:u}
          </div>
        </div>
      `}return l`
      <div class="item ${a?"done":""}" data-key=${V(t)} ?data-drag=${s.draggable} style=${s.showList?W(e.color,this._dark):""} @contextmenu=${s.onHold?d=>(d.preventDefault(),s.onHold()):s.selectable?d=>(d.preventDefault(),this._startSelect(e,t)):null}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!r} @click=${()=>this._toggle(e,t)}>
          ${f("check")}
        </button>
        <div class="it-body" @click=${()=>r&&this._openEdit(e,t)}>
          <div class="it-text">${this._renderText(t.summary||"",s.query)}</div>
          ${Oe(t.description)?l`<div class="it-desc">${this._renderText(Oe(t.description),s.query)}</div>`:u}
          ${s.why?l`<div class="it-why">${f(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:u}
          ${i||s.showList||n||this._pointsOf(e.id,t.summary,t.uid)||this._roomIdOf(e.id,t.summary)||this._equipIdOf(e.id,t.summary)||this._externalOf(e.id,t.summary)||this._photosOf(e.id,t.summary).length?l`<div class="chips">
                ${s.showList?l`<span class="tag list">${e.icon?f(e.icon):u}${L(e.name,24)}</span>`:u}
                ${this._renderExternalTag(e.id,t)} ${this._renderRoomTag(e.id,t)} ${this._renderEquipTag(e.id,t)} ${this._renderPhotoTag(e.id,t)}
                ${i?e.noDue?l`<span class="tag info" title=${e.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${f("clock-fading")}${i.text}</span>`:l`<span class="tag ${i.tone==="late"?"late":i.tone==="today"?"today":""}">${f(i.time?"clock":"calendar")}${i.text}</span>`:u}
                ${c} ${this._renderPointsTag(e.id,t)}
              </div>`:u}
        </div>
        ${s.draggable?l`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${d=>this._dragStart(d,e,t)} @click=${d=>d.preventDefault()}>${f("grip-vertical")}</button>`:u}
      </div>
    `}_dueRows(e=this._visible()){let t=[];for(let s of e)if(!s.noDue)for(let a of s.items||[]){if(X(a)&&!this._recent.has(V(a)))continue;let i=ae(a.due);i&&t.push({l:s,i:a,d:i})}return t.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(e){let t=this._dueOn()?this._dueRows(e):[],s=t.filter(h=>h.d.overdue),a=t.filter(h=>!h.d.overdue&&h.d.diff===0),i=t.find(h=>!h.d.overdue&&h.d.diff>0),r=[...e].filter(h=>h.pending>0).sort((h,p)=>p.pending-h.pending)[0],n=e.reduce((h,p)=>h+p.done,0),c=[],d=(h,p,m,g,_,w)=>c.push({ic:h,tone:p,label:m,value:g,right:_,go:w});return this._dueOn()&&(d("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._goTab(""):null),d("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._goTab(""):null),d("calendar-clock","","Pr\xF3ximo prazo",i?i.i.summary:"Sem prazos marcados",i?i.d.text:"",i?()=>this._go(`/lista/${i.l.id}`):null)),d("list-checks","","Mais cheia",r?r.name:"Tudo resolvido",r?O(r.pending,"pendente","pendentes"):"",r?()=>this._go(`/lista/${r.id}`):null),this._dueOn()||d("circle-check","","Resolvidos",O(n,"item feito","itens feitos"),"",null),l`<dl class="facts">
      ${c.map(h=>l`<div class="fact-row ${h.go?"go":""}" role=${h.go?"link":"group"} tabindex=${h.go?"0":"-1"} @click=${h.go||(()=>{})} @keydown=${p=>h.go&&p.key==="Enter"&&h.go()}>
          <dt><span class="sec-ic ${h.tone}" aria-hidden="true">${f(h.ic)}</span>${h.label}</dt>
          <dd>${h.value}</dd>
          <dd class="fv ${h.tone}">${h.right}</dd>
        </div>`)}
    </dl>`}_cardHead(e,t,s,a=""){return l`<div class="mais-head due-head"><span class="mais-ic ${a}" aria-hidden="true">${f(e)}</span><h2>${t}</h2><small class="mh-count">${s}</small></div>`}_dueSections(){let e=this._visible(),t=this._dueOn()?this._dueRows(e):[],s=new Set,a=Ge.map(c=>{let d=t.filter(h=>!s.has(h)&&c.test(h.d));return d.forEach(h=>s.add(h)),{...c,rows:d}}),i=c=>c.rows.length?l`<div class="panel items due-group" data-card=${c.id}>
            ${this._cardHead(c.icon,c.title,c.rows.length,c.id==="late"?"late":"")}
            ${se(c.rows,d=>d.l.id+V(d.i),d=>this._renderItem(d.l,d.i,{showList:!0}))}
          </div>`:u,r=(this._dueOn()&&this._repeatOn()?this._rules:[]).filter(c=>c.reopen_at).map(c=>{let d=this._list(c.entity_id),h=d&&d.items&&c.uid?d.items.find(p=>p.uid===c.uid):null;return{r:c,l:d,item:h}}).filter(c=>c.l&&!c.l.hidden).sort((c,d)=>c.r.reopen_at-d.r.reopen_at),n=r.length?l`<div class="panel items due-group" data-card="coming">
          ${this._cardHead("repeat","Voltam sozinhas",r.length)}
          ${se(r,c=>c.r.id,c=>c.item?this._renderItem(c.l,c.item,{showList:!0}):l`<div class="item done" style=${W(c.l.color,this._dark)}>
                    <span class="check on">${f("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${c.l.id}`)}>
                      <div class="it-text">${c.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${c.l.icon?f(c.l.icon):u}${L(c.l.name,24)}</span>
                        <span class="tag rep">${f("repeat")}volta ${this._returnLabel(c.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:u;return{cards:Object.fromEntries(a.map(c=>[c.id,i(c)])),coming:n,comingN:r.length,rows:t,late:t.filter(c=>c.d.overdue).length,today:t.filter(c=>!c.d.overdue&&c.d.diff===0).length}}_renderSearchWho(){let e=this._searchPeople();if(!e.length)return u;let t=this._searchWhoNow(),s=a=>{this._haptic("light"),this._searchWho=a,this.requestUpdate()};return l`<span class="filters-sub" id="incluir-quem">${f("user-round","lbl-ic")}De quem é</span>
      <div class="filters who-filter" role="radiogroup" aria-labelledby="incluir-quem">${["",...e].map(a=>{let i=a?N(t)===N(a):!t;return l`<button class="pick ${i?"on":""}" role="radio" aria-checked=${i?"true":"false"} @click=${()=>s(a)}>${f(a?"user-round":"users")}<span>${a||"Todos"}</span></button>`})}</div>`}_searchGroupNow(){let e=this._searchGroup??te.get(Ci,"lista");return e==="prazo"?"prazo":e==="comodo"&&this._roomsOn()&&this._rooms&&this._rooms.encontrado?"comodo":"lista"}_renderSearchGroup(){let e=this._rooms&&this._rooms.encontrado&&this._roomsOn(),t=this._searchGroupNow(),s=i=>{this._haptic("light"),this._searchGroup=i,this._openRoom="",te.set(Ci,i),this._searchShut.clear(),this.requestUpdate()},a=(i,r,n)=>l`<button class="pick ${t===i?"on":""}" role="radio" aria-checked=${t===i?"true":"false"} @click=${()=>s(i)}>${f(r)}<span>${n}</span></button>`;return l`<span class="filters-sub" id="agrupar-por">${f("layers","lbl-ic")}Agrupar por</span>
      <div class="agrupar" role="radiogroup" aria-labelledby="agrupar-por">${a("lista","list-checks","Lista")}${a("prazo","calendar-days","Prazo")}${e?a("comodo","door-open","C\xF4modo"):u}</div>`}_byDue(e){let t=new Date,s=new Map,a=(r,n)=>(s.has(r)?s.get(r):s.set(r,[]).get(r)).push(n);for(let{l:r,hits:n}of e)for(let c of n){let d=X(c)?null:ae(c.due,t);a(X(c)?"done":d?Ge.find(h=>h.test(d)).id:"none",{l:r,i:c,at:d?d.at.getTime():0})}return[...Ge.map(r=>[r.id,r.title]),["none","Sem prazo"],["done","Conclu\xEDdos"]].filter(([r])=>s.has(r)).map(([r,n])=>({id:`prazo:${r}`,name:n,rows:s.get(r).sort((c,d)=>c.at-d.at)}))}_byRoom(e){let t=new Map;for(let{l:a,hits:i}of e)for(let r of i){let n=this._roomIdOf(a.id,r.summary)||"";t.has(n)||t.set(n,[]),t.get(n).push({l:a,i:r})}return[...this._roomList().map(a=>a.id).filter(a=>t.has(a)).map(a=>({id:`comodo:${a}`,name:this._roomName(a),rows:t.get(a)})),...t.has("")?[{id:"comodo:",name:"Sem c\xF4modo",rows:t.get("")}]:[]]}_searchToggle(e,t,s,a){return l`<button class="pick ${s?"on":""}" aria-pressed=${s?"true":"false"} @click=${a}>${f(e)}<span>${t}</span></button>`}_searchPeople(){let e=new Map;for(let t of this._visible())t.owner&&!e.has(N(t.owner))&&e.set(N(t.owner),t.owner);return[...e.values()].sort((t,s)=>t.localeCompare(s,"pt-BR"))}_searchWhoNow(){let e=this._searchPeople();if(this._searchWho==null){let s=N((this.hass&&this.hass.user&&this.hass.user.name||"").trim());return e.find(a=>N(a)===s||s.split(/\s+/)[0]===N(a).split(/\s+/)[0])||""}let t=this._searchWho;return t&&e.some(s=>N(s)===N(t))?t:""}_searchLists(){let e=this._searchWhoNow();return this._visible().filter(t=>!e||!t.owner||N(t.owner)===N(e))}_renderSearch(){let e=this._query.trim(),t=N(e),s=this._bselOn(),a=[],i=0,r=this._roomsOn()&&this._searchRooms,n=this._equipsOn()&&this._searchEquips,c=this._extOn()&&this._searchExt,d=(x,S)=>r||n?N(this._placeText(x.id,S.summary,{rooms:r,equips:n})).includes(t):!1,h=(x,S)=>!t||N(S.summary).includes(t)||N(S.description).includes(t)||d(x,S)||c&&N(this._externalText(x.id,S.summary)).includes(t);for(let x of this._searchLists()){let S=(x.items||[]).filter(M=>(this._searchDone&&!s||!X(M))&&h(x,M));S.length&&(S.sort((M,C)=>Number(X(M))-Number(X(C))),a.push({l:x,hits:S}),i+=S.length)}let p=this._searchGroupNow(),m=p==="comodo"?this._byRoom(a):p==="prazo"?this._byDue(a):a.map(({l:x,hits:S})=>({id:x.id,name:`${x.name}${x.group?` \xB7 ${x.group}`:""}`,color:x.color,rows:S.map(M=>({l:x,i:M}))})),g=this._openRoom&&p==="comodo"&&m.some(x=>N(x.name)===N(this._openRoom))?N(this._openRoom):"",_=a.flatMap(({l:x,hits:S})=>S.filter(M=>!this._bulkLocked(x,M)).map(M=>this._bkey(x,M))),w=s?this._bulkRows().length:0,y=s&&_.length>0&&_.every(x=>this._bsel.keys.has(x)),k=s?l`<div class="res-head sel-head">
          <button class="icon-btn" @click=${()=>this._endBulk()} aria-label="Cancelar seleção">${f("x")}</button>
          <b class="res-n">${w?`${w} ${w===1?"selecionado":"selecionados"}`:"Selecionar"}</b>
          <button class="text-btn" ?disabled=${!_.length} @click=${()=>this._bsel={...this._bsel,keys:y?new Set:new Set([...this._bsel.keys,..._])}}>${f(y?"x":"square-check-big")}${y?"Nenhum":"Todos"}</button>
        </div>`:l`<div class="res-head">
          <p class="page-sub">${t?O(i,"resultado","resultados"):this._searchDone?O(i,"item","itens"):O(i,"pendente","pendentes")}</p>
          ${i?l`<button class="text-btn" @click=${()=>this._startBulk()}>${f("square-check-big")}Selecionar</button>`:u}
        </div>`;return l`
      <section class="page ${s?"selecting-page":""}">
        ${this._renderPageHead("Buscar",{text:`Em ${O(this._searchLists().length,"lista","listas")}`})}
        <label class="search-box">
          ${f("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${x=>this._query=x.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?l`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${f("x")}</button>`:u}
        </label>
        <button type="button" class="filters-label" id="incluir" aria-expanded=${this._incluirShut?"false":"true"} @click=${()=>{this._haptic("light"),this._incluirShut=!this._incluirShut,te.set(Oi,this._incluirShut),this.requestUpdate()}}>${f("sliders-horizontal","lbl-ic")}Filtros</button>
        <div class="incluir ${this._incluirShut?"shut":""}">
        <div class="filters" role="group" aria-labelledby="incluir">
          ${s?u:this._searchToggle("circle-check","Conclu\xEDdos",this._searchDone,()=>this._searchDone=!this._searchDone)}
          ${""}
          ${this._extOn()?this._searchToggle("hard-hat","Servi\xE7os externos",this._searchExt,()=>this._searchExt=!this._searchExt):u}
          ${this._rooms&&this._rooms.encontrado&&this._roomsOn()?this._searchToggle("door-open","C\xF4modos",this._searchRooms,()=>this._searchRooms=!this._searchRooms):u}
          ${this._rooms&&this._rooms.encontrado&&this._equipsOn()?this._searchToggle("package","Equipamentos",this._searchEquips,()=>this._searchEquips=!this._searchEquips):u}
        </div>
        ${this._renderSearchWho()}
        ${this._renderSearchGroup()}
        </div>
        ${a.length?l`${k}
              ${m.map(x=>{let S=g?N(x.name)!==g:this._searchShut.has(x.id);return l`
                  <div class="panel items search-list" data-group=${x.id} style=${x.color?W(x.color,this._dark):""}>
                    <button type="button" class="overline fold-over" aria-expanded=${S?"false":"true"} @click=${()=>{this._haptic("light"),g&&(this._searchShut=new Set(m.filter(M=>N(M.name)!==g).map(M=>M.id)),this._openRoom=""),S?this._searchShut.delete(x.id):this._searchShut.add(x.id),this.requestUpdate()}}><span>${x.name}${S?` (${x.rows.length})`:""}</span></button>
                    ${S?u:se(x.rows,({l:M,i:C})=>this._bkey(M,C),({l:M,i:C})=>s?this._renderItem(M,C,{selecting:!0,selected:this._bsel.keys.has(this._bkey(M,C)),locked:this._bulkLocked(M,C),onToggle:()=>this._toggleBulk(M,C)}):this._renderItem(M,C,{query:e,onHold:X(C)||this._bulkLocked(M,C)?null:()=>this._startBulk(M,C)}))}
                  </div>
                `})}
              ${s?l`<div class="sel-bar">
                    <button class="btn primary" ?disabled=${!w} @click=${()=>this._openBulk()}>${f("pencil")}${w?`Alterar ${w} ${w===1?"item":"itens"}`:"Alterar"}</button>
                  </div>`:u}`:t?l`<div class="panel"><div class="empty"><div class="em-icon">${f("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${L(e,30)}”.</p></div></div>`:l`<div class="panel"><div class="empty"><div class="em-icon">${f("circle-check")}</div><h3>Nada pendente</h3><p>Tudo resolvido nas listas.</p></div></div>`}
      </section>
    `}_bkey(e,t){return`${e.id}|${V(t)}`}_bselOn(){return!!(this._bsel&&this._bsel.path===this._path)}_bulkLocked(e,t){return this._mirrored(e.id,t.uid)?"Vem do CronologIA: mude por l\xE1.":""}_startBulk(e=null,t=null){this._bsel={path:this._path,keys:new Set(e&&t?[this._bkey(e,t)]:[])},this._haptic("light")}_toggleBulk(e,t){let s=new Set(this._bsel.keys),a=this._bkey(e,t);s.has(a)?s.delete(a):s.add(a),this._bsel={...this._bsel,keys:s}}_endBulk(){this._bsel=null}_bulkRows(){if(!this._bsel)return[];let e=[];for(let t of this._visible())for(let s of t.items||[])!X(s)&&this._bsel.keys.has(this._bkey(t,s))&&!this._bulkLocked(t,s)&&e.push({l:t,i:s});return e}_openBulk(){this._openSheet("bulk",{where:null,setDue:!1,date:null,time:null,setRooms:!1,rooms:[],setEquips:!1,equips:[],equipQ:"",equipMore:!1,equipAdding:!1,setExt:!1,ext:null,target:null})}_renderBulkSheet(){let e=this._form,t=this._bulkRows(),s=t.length;if(!e||!s)return u;let a=this._dueOn()&&t.some(({l:b})=>T(b.features,E.DUE_DATE)||T(b.features,E.DUE_DATETIME)),i=t.some(({l:b})=>T(b.features,E.DUE_DATETIME)),r=is(),n=r.some(b=>b.date===e.date),c=(b,A)=>l`<button class="pick keep ${b?"on":""}" aria-pressed=${b?"true":"false"} @click=${A}>${f("lock")}<span>Manter</span></button>`,d=this._equipsOn(),h=e.setEquips?e.equips||[]:[],p=d&&h.length>0,m=p?this._roomsOfEquips(h):e.rooms||[],g=this._houseRooms().map(b=>b.id),_=!p&&e.setRooms&&this._allRooms(m),w=b=>{let A=m.includes(b)?m.filter(q=>q!==b):[...m,b];this._setForm({setRooms:!0,rooms:A})},y=e.setExt?e.ext:null,k=this._L.filter(b=>T(b.features,E.CREATE)&&!b.unavailable&&!b.hidden),x=e.setDue||e.setRooms||e.setEquips||e.setExt||!!e.target,S=this._roomsOn()||d?this._bensId():null,M=S?e.where||null:"casa",C=b=>{if(b===(e.where||null))return;let A={where:b,equipQ:"",equipMore:!1,equipAdding:!1};b?b==="nenhum"?this._setForm({...A,setRooms:!0,rooms:[],setEquips:!0,equips:[]}):b==="bens"?this._setForm({...A,setRooms:!0,rooms:[S],setEquips:!0,equips:[]}):this._setForm({...A,setRooms:!1,rooms:[],setEquips:!1,equips:[]}):this._setForm({...A,setRooms:!1,rooms:[],setEquips:!1,equips:[]})},$=(b,A,q)=>l`<button class=${(e.where||null)===b?"on":""} aria-pressed=${(e.where||null)===b?"true":"false"} @click=${()=>C(b)}>${f(A)}<span>${q}</span></button>`,v=S?this._equipItems().filter(b=>b.roomId===S==(M==="bens")):this._equipItems();return l`
      <div class="sheet-head">
        <h3 class="display">${f("pencil","sh-ic")}Alterar ${s} ${s===1?"item":"itens"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      ${a?l`<div class="field" data-f="prazo">
            <span class="flabel">${f("calendar","lbl-ic")}Prazo</span>
            <div class="chip-row grid">
              ${c(!e.setDue,()=>this._setForm({setDue:!1,date:null,time:null,cal:null}))}
              ${r.map(b=>l`<button class="pick ${e.setDue&&e.date===b.date?"on":""}" @click=${()=>this._setForm({setDue:!0,date:b.date,cal:null})}>${f(Ti(b.label))}<span>${b.label}</span></button>`)}
              <button class="pick ${e.setDue&&e.date&&!n?"on":""}" aria-expanded=${e.cal?"true":"false"} @click=${()=>this._toggleCal()}>
                ${f("calendar")}<span>${e.setDue&&e.date&&!n?At(e.date):"Outra data"}</span>
              </button>
              <button class="pick ${e.setDue&&!e.date?"on":""}" @click=${()=>this._setForm({setDue:!0,date:null,time:null,cal:null})}>${f("x")}<span>Sem prazo</span></button>
            </div>
            ${e.cal?this._renderCal(e.setDue?e.date:null,b=>this._setForm({setDue:!0,date:b,cal:null})):u}
          </div>`:u}
      ${a&&i&&e.setDue&&e.date?l`<div class="field" data-f="horario">
            <span class="flabel">${f("clock","lbl-ic")}Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${f("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===pe?"on":""}" @click=${()=>this._setForm({time:pe})}>${f("clock")}<span>${pe}</span></button>
              <button class="pick time-other ${e.time&&e.time!==pe?"on":""}" @click=${()=>this._pickTime("#rv-bulk-time")}>
                ${f("clock-fading")}<span>${e.time&&e.time!==pe?e.time:"Outro hor\xE1rio"}</span>
              </button>
            </div>
            ${this._timeBox("rv-bulk-time",e.time)}
          </div>`:u}
      ${S?l`<div class="field where-field" data-f="onde">
            <span class="flabel">${f("pin","lbl-ic")}Onde</span>
            <div class="seg where four" role="group" aria-label="Manter, Nenhum, Casa ou Bens">${$(null,"lock","Manter")}${$("nenhum","x","Nenhum")}${$("casa","house","Casa")}${$("bens","car","Bens")}</div>
          </div>`:u}
      ${this._roomsOn()&&M==="casa"?l`<div class="field" data-f="comodo">
            <span class="flabel">${f("door-open","lbl-ic")}Cômodo</span>
            <div class="chip-row grid ${p?"locked":""}">
              ${c(!e.setRooms&&!p,()=>this._setForm({setRooms:!1,rooms:[]}))}
              <button class="pick ${e.setRooms&&!m.length&&!p?"on":""}" ?disabled=${p} @click=${()=>this._setForm({setRooms:!0,rooms:[]})}>${f("x")}<span>Nenhum</span></button>
              ${g.length>1?l`<button class="pick room all-rooms ${_?"on":""}" ?disabled=${p} @click=${()=>this._setForm(_?{setRooms:!0,rooms:[]}:{setRooms:!0,rooms:g})}>${f("house")}<span>Todos</span></button>`:u}
              ${this._houseRooms().map(b=>l`<button class="pick room ${(e.setRooms||p)&&m.includes(b.id)?"on":""}" aria-pressed=${(e.setRooms||p)&&m.includes(b.id)?"true":"false"} ?disabled=${p} @click=${()=>w(b.id)}>${f("door-open")}<span>${L(b.nome,22)}</span></button>`)}
            </div>
            ${p?l`<span class="field-hint">${f("lock")}<span>Vem ${h.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:u}
          </div>`:u}
      ${d&&(M==="casa"||M==="bens")?l`<div class="field" data-f="equipamento">
            <span class="flabel">${f("package","lbl-ic")}${h.length>1?"Equipamentos":"Equipamento"}</span>
            <div class="chip-row grid">
              ${M==="bens"?u:c(!e.setEquips,()=>this._setForm({setEquips:!1,equips:[],equipAdding:!1}))}
              <button class="pick ${e.setEquips&&!h.length?"on":""}" @click=${()=>this._setForm({setEquips:!0,equips:[],equipAdding:!1})}>${f("x")}<span>Nenhum</span></button>
            </div>
            ${Xe({lit:{html:l,nothing:u},icon:f,items:v,room:h.length?this._roomsOfEquips(h)[0]||null:this._roomsOn()&&e.setRooms&&m.length===1?m[0]:null,roomName:h.length?this._roomName(this._roomsOfEquips(h)[0])||"":this._roomsOn()&&e.setRooms&&m.length===1&&this._roomName(m[0])||"",value:h,query:e.equipQ||"",more:!!e.equipMore,adding:!!e.equipAdding,autofocus:!!e.equipAdding,onQuery:b=>this._setForm({equipQ:b,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:b=>this._setForm({setEquips:!0,equips:[...h,b],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:b=>this._setForm({equips:h.filter(A=>A!==b)})})}
          </div>`:u}
      ${this._extOn()?l`<div class="field" data-f="quem-faz">
            <span class="flabel">${f("hard-hat","lbl-ic")}Quem faz</span>
            <div class="chip-row ext-row bulk-ext">
              ${c(!e.setExt,()=>this._setForm({setExt:!1,ext:null}))}
              <button class="pick ${e.setExt&&!y?"on":""}" @click=${()=>this._setForm({setExt:!0,ext:null})}>${f("house")}<span>Nós mesmos</span></button>
              <button class="pick ${e.setExt&&y?"on":""}" @click=${()=>this._setForm({setExt:!0,ext:y||!0})}>${f("hard-hat")}<span>Serviço externo</span></button>
            </div>
            ${e.setExt&&y?l`<input type="text" class="ext-who" maxlength="60" .value=${y===!0?"":y} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
                  @input=${b=>this._setForm({ext:b.target.value.replace(/\s+/g," ").trim().slice(0,60)||!0})} />`:u}
          </div>`:u}
      ${k.length>1?l`<div class="field" data-f="lista">
            <span class="flabel">${f("list-todo","lbl-ic")}Lista</span>
            <div class="chip-row grid">
              ${c(!e.target,()=>this._setForm({target:null}))}
              ${k.map(b=>l`<button class="pick list ${e.target===b.id?"on":""}" style=${W(b.color,this._dark)} @click=${()=>this._setForm({target:b.id})}><span class="dot"></span><span>${L(b.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        <button class="btn primary" ?disabled=${!x} @click=${()=>this._applyBulk()}>${f("check")}Aplicar</button>
      </div>
    `}async _applyBulk(){let e=this._form,t=this._bulkRows();if(this._closeSheet(),this._endBulk(),!t.length)return;let s=e.target?this._list(e.target):null,a=e.setDue&&this._dueOn()?{date:e.date||null,time:e.date&&e.time||null}:null,r=this._equipsOn()&&e.setEquips?e.equips||[]:null,n=this._roomsOn()?r&&r.length?this._roomsOfEquips(r):e.setRooms?e.rooms||[]:null:null,c=new Map,d=0;this._haptic("light");for(let{l:p,i:m}of t){let g=m.summary||"",_=!1;if(r&&await this._setTaskEquip(p.id,g,r),n){let y=r?[]:this._equipIdsOf(p.id,g),k=this._roomsOfEquips(y);y.length&&k.join("|")!==[...n].join("|")?_=!0:await this._setTaskRoom(p.id,g,n)}e.setExt&&this._extOn()&&await this._setTaskExternal(p.id,g,e.ext||null);let w=T(p.features,E.DUE_DATE)||T(p.features,E.DUE_DATETIME);if(a&&!w&&(_=!0),s&&s.id!==p.id){if(T(p.features,E.DELETE)&&await this._moveItem(p,m,s,a&&w?a:null)){c.has(p.id)||c.set(p.id,[]),c.get(p.id).push(V(m)),_||d++;continue}_=!0}if(a&&w&&T(p.features,E.UPDATE)){let y=le(m.due);if((y?y.date:null)!==a.date||(y?y.time:null)!==a.time){let k=this._dueFields(p,a.date,a.time,!0);Object.keys(k).length&&await this._call("update_item",{item:V(m),...k},p.id)}}_||d++}for(let[p,m]of c)await this._call("remove_item",{item:m},p);let h=t.length;this._showToast(d===h?`${h} ${h===1?"item alterado":"itens alterados"}`:`${d} de ${h} itens alterados: o resto n\xE3o aceita a mudan\xE7a`)}_configTabs(){return[...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks","integra\xE7\xF5es"]]:[],...this._data()?[["dados","Dados","archive","dados e backup"]]:[],["aparencia","Apar\xEAncia","palette","apar\xEAncia"],["opcoes","Op\xE7\xF5es","toggle-right","op\xE7\xF5es"]]}_configTab(){let e=this._configTabs(),t=this._view().tab;return e.some(s=>s[0]===t)?t:e[0][0]}_moreRows(){let e=this._configTabs().map(s=>s[3]),t=`${e.slice(0,-1).join(", ")} e ${e[e.length-1]}.`;return[["/listas","list-checks","Listas","Nome, cor, \xEDcone e quais aparecem."],["/graficos","chart-bar","Gr\xE1ficos",this._chartsLine()],["relatorio","clipboard-list","Relat\xF3rio de pend\xEAncias","Para imprimir ou salvar em PDF."],["/config","sliders-horizontal","Configura\xE7\xF5es",t[0].toUpperCase()+t.slice(1)],["/sobre","info","Sobre","CorrerIA Code, os apps e o GitHub."]]}_memoriaIaCall(e,t={}){return this.hass.callWS({type:`resolvia/memoria_ia/${e}`,...t})}_secHead(e,t,s=null){return l`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${f(e)}</span><h2>${t}</h2></div>${s?l`<p class="panel-lead">${s}</p>`:u}`}_renderFoot(){return l`<p class="foot"><b>ResolvIA</b><br />v${fs} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>`}_renderMore(){return l`
      <section class="page">
        ${this._renderPageHead("Mais",null)}
        <div class="panel more-menu" role="navigation" aria-label="Mais">
          <ul>
            ${this._moreRows().map(([e,t,s,a])=>l`<li>
                <button class="more-row" @click=${()=>this._openFromMenu(e)}>
                  <span class="mais-ic" aria-hidden="true">${f(t)}</span>
                  <span class="mb"><b>${s}</b><span>${a}</span></span>
                  ${f("chevron-right","chev")}
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
    `}_listsStatus(){let e=this._L.filter(t=>t.hidden).length;return{text:this._L.length?`${O(this._L.length,"lista","listas")}${e?` \xB7 ${O(e,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}_renderConfig(){let e=this._configTabs(),t=this._configTab(),s=i=>{i!==t&&(this._haptic("light"),this._go(this._configPath(i),!0,history.state&&history.state.rvUp?{rvUp:!0}:null))},a;return t==="integracoes"?a=l`${this._renderRewardsPanel()} ${this._renderRoomsPanel()} ${this._renderCorreriaPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this._aiOn()?this._renderMemoriaIa():u} ${this.hass.resolvia&&this.hass.resolvia.voiceStatus&&this._aiOn()?this._renderVoicePanel():u} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():u} ${this._renderSensorsPanel()}`:t==="dados"?a=this._renderDataPanel():t==="aparencia"?a=this._renderAppearanceTab():a=this._renderOptionsTab(),l`
      <section class="page">
        ${this._renderPageHead("Configura\xE7\xF5es",null,!0)}
        <div class="tabs-wrap"><div class="seg compact more-tabs" role="tablist" aria-label="Seções de Configurações" @scroll=${()=>this._markTabs()}>
          ${e.map(([i,r,n])=>l`<button class=${t===i?"on":""} role="tab" aria-selected=${t===i?"true":"false"} @click=${()=>s(i)}>${f(n)}<span>${r}</span></button>`)}
        </div><span class="tabs-fim esq" aria-hidden="true">${f("chevron-left")}</span><span class="tabs-fim dir" aria-hidden="true">${f("chevron-right")}</span></div>
        <div role="tabpanel" aria-label=${e.find(i=>i[0]===t)[1]}>${a}</div>
        ${this._renderFoot()}
      </section>
    `}_renderFold(e,t,s,a="Inativas"){return xa(this,e,t,s,a)}_renderListsTab(){let e=(a,i,r)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${a} @change=${r} aria-label=${i} /><span class="track"></span></label>`,t=this._L.filter(a=>a.hidden),s=a=>l`
      <div class="row ${a.hidden?"inact":""}" style=${W(a.color,this._dark)}>
        <button class="tile ${a.icon?"":"sem"}" @click=${()=>this._openCustomize(a)} aria-label="Personalizar ${a.name}">${a.icon?f(a.icon):u}</button>
        <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(a)}>
          <div class="label">${a.name}</div>
          <div class="hint">${a.group||a.id}</div>
        </button>
        ${e(!a.hidden,`Mostrar ${a.name}`,i=>this._saveListPrefs(a.id,{hidden:i.target.checked?null:!0}))}
      </div>
    `;return l`
        <div class="panel lists-panel">
          <p class="panel-lead">Toque numa lista para personalizar.</p>
          ${this._L.length?se(this._L.filter(a=>!a.hidden),a=>a.id,s):l`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
          ${this._renderFold("mais-listas",t,s)}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?l`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${W(this._accent(),this._dark)}>${f("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${f("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${W(Ee("grafite"),this._dark)}>${f("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${f("chevron-right")}
              </button>
            </div>`:u}

    `}_renderRulesPanels(){if(!this._rulesOk)return u;let e=this._repeatOn();return l`<div class="panel" id="repeticao">
              ${this._secHead("repeat","Repeti\xE7\xE3o")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">${f("repeat","lbl-ic")}Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${e?"O item volta sozinho N dias depois de feito.":"Desligado."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._toggleRepeat(t)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!e&&!this._rules.length?u:l`<div class="panel ${e?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!e&&this._rules.length?l`<p class="panel-lead">Não voltam mais sozinhas. Apague para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${f("trash")}Apagar ${O(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:u}
              ${this._rules.length?this._rules.map(t=>{let s=this._list(t.entity_id);return s?l`<div class="row" style=${W(s.color,this._dark)}>
                      <span class="tile">${f("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${t.summary||t.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(t.days)}${e?t.reopen_at?` \xB7 volta ${this._returnLabel(t.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(t.entity_id,{uid:t.uid,summary:t.match||t.summary,days:null})}>${f("x")}</button>
                    </div>`:u}):l`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir”.</div></div>`}
            </div>`}`}_toggleRepeat(e){let t=e.target.checked;if(t||!this._rules.length)return this._saveAppPrefs({repeat_on:t});e.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(e){let t=this._rules.length;this._openSheet("confirm",{title:e?"Desligar a repeti\xE7\xE3o?":"Apagar as repeti\xE7\xF5es?",text:`${O(t,"tarefa se repete","tarefas se repetem")}. ${e?"Ao desligar, essas repeti\xE7\xF5es s\xE3o apagadas":"Elas ser\xE3o apagadas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:e?"Apagar e desligar":`Apagar ${O(t,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),e&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${O(t,"repeti\xE7\xE3o apagada","repeti\xE7\xF5es apagadas")}${e?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let e=(s,a,i)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${i} aria-label=${a} /><span class="track"></span></label>`,t=this._dueOn();return l`
        <div class="panel">
          ${this._secHead("calendar-clock","Prazos")}
          <div class="row">
            <div class="grow"><div class="label">${f("calendar-clock","lbl-ic")}Controlar prazos</div><div class="hint" style="white-space:normal">${t?"O que vence fica vermelho e aparece em Agora.":"Datas s\xF3 como informa\xE7\xE3o."}</div></div>
            ${e(t,"Controlar prazos",s=>this._saveAppPrefs({due_off:s.target.checked?null:!0}))}
          </div>
          ${t?this._renderDueAlert(e):u}
        </div>
        <div class="panel">
          ${this._secHead("layout-list","Exibi\xE7\xE3o")}
          <div class="row">
            <div class="grow"><div class="label">${f("layers","lbl-ic")}Agrupar por dispositivo</div><div class="hint">Ex.: as listas da Alexa juntas</div></div>
            ${e(this._app("group_by_device",!0),"Agrupar por dispositivo",s=>this._saveAppPrefs({group_by_device:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">${f("list-checks","lbl-ic")}Concluídos abertos</div><div class="hint">Mostra os concluídos sem precisar tocar</div></div>
            ${e(this._app("show_done",!1),"Conclu\xEDdos abertos",s=>this._saveAppPrefs({show_done:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">${f("notebook-pen","lbl-ic")}Notas</div><div class="hint" style="white-space:normal">${this._notesOn()?"Campo de notas em cada item.":"Desligado."}</div></div>
            ${e(this._notesOn(),"Notas",s=>this._saveAppPrefs({notes_off:s.target.checked?null:!0}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">${f("user-round","lbl-ic")}De quem é</div><div class="hint" style="white-space:normal">${this._ownersOn()?"Cada lista pode ser de uma pessoa.":"Desligado."}</div></div>
            ${e(this._ownersOn(),"De quem \xE9",s=>this._saveAppPrefs({owners_on:!!s.target.checked}))}
          </div>
        </div>
        ${this._renderExternalOption(e)}
        ${this._renderRulesPanels()}
        ${this._renderShortcut()}
    `}_renderShortcut(){let e=this.hass&&this.hass.resolvia&&this.hass.resolvia.atalho;return e?l`<div class="panel shortcut">
      ${this._secHead("smartphone","Atalho no celular","Um \xEDcone na tela inicial do celular que abre o ResolvIA direto.")}
      <ol class="steps">
        <li>No app do Home Assistant: <b>Configurações › Aplicativo complementar › Gerenciar atalhos</b>.</li>
        <li>Em <b>Atalho fixado</b>, escolha o tipo <b>Painel</b> e cole o <b>Caminho</b> abaixo.</li>
      </ol>
      <label class="field">
        <span class="flabel">${f("smartphone","lbl-ic")}Caminho</span>
        <span class="copy-row"
          ><input type="text" id="rv-atalho" readonly .value=${e} @focus=${t=>t.target.select()} /><button
            type="button"
            class="btn outline"
            @click=${()=>this._copyShortcut()}
          >
            ${f("copy")}Copiar
          </button></span
        >
      </label>
    </div>`:u}async _copyShortcut(){let e=this.renderRoot.querySelector("#rv-atalho");try{await navigator.clipboard.writeText(e.value),this._showToast("Caminho copiado")}catch{e.focus(),e.select(),this._showToast("Toque e segure no texto para copiar")}}_renderDueAlert(e){let t=this._app("due_alert",!1)===!0,s=/^\d{2}:\d{2}$/.test(this._app("due_alert_time",""))?this._app("due_alert_time"):"08:00",a=this._alertPeople;t&&a===void 0&&this._loadAlertPeople();let i=(a||[]).find(p=>p.me),r=p=>p.length>1?`${p.slice(0,-1).join(", ")} e ${p.at(-1)}`:p[0],n=this._alertChosen(),c=p=>!n||n.includes(p.id),d=(a||[]).filter(p=>c(p)&&!p.phone).map(p=>p.name),h=a?i?i.phone?"":"Sem celular ligado a voc\xEA no Home Assistant.":"Voc\xEA n\xE3o \xE9 uma pessoa da casa no Home Assistant.":"";return l`<div class="row">
        <div class="grow"><div class="label">${f("bell","lbl-ic")}Avisar o que vence hoje</div><div class="hint" style="white-space:normal">${t?"Cada pessoa recebe as listas dela e as de todos.":"Desligado."}</div></div>
        ${e(t,"Avisar o que vence hoje",p=>this._saveAppPrefs({due_alert:p.target.checked?!0:null}))}
      </div>
      ${t?l`<div class="sub-op"><div class="sub-box due-alert">
            <div class="alert-when">
              <label class="field">
                <span class="flabel">${f("clock","lbl-ic")}Horário</span>
                <select class="select remind-time" aria-label="Horário do aviso" .value=${ea(s)} @change=${p=>/^\d{2}:\d{2}$/.test(p.target.value)&&this._saveAppPrefs({due_alert_time:p.target.value})}>
                  ${os(s).map(p=>l`<option value=${p} ?selected=${p===s}>${p}</option>`)}
                </select>
              </label>
            </div>
            <div class="field">
              <span class="flabel">${f("users","lbl-ic")}Quem recebe</span>
              ${a==null?l`<p class="field-hint">${a===null?"N\xE3o consegui ver as pessoas da casa.":"Procurando as pessoas da casa\u2026"}</p>`:a.length?l`<div class="due-who" role="group" aria-label="Quem recebe">${a.map(p=>l`<button type="button" class="dw ${c(p)?"on":""} ${p.phone?"":"off"}" aria-pressed=${c(p)?"true":"false"} @click=${()=>this._toggleAlertPerson(p)}>${f("user-round")}<b>${p.name}</b>${p.phone?u:l`<span>sem celular</span>`}</button>`)}</div>
                    ${d.length?l`<p class="field-hint">${f("info")}<span>Sem celular para ${r(d)}: ligue o celular à pessoa no Home Assistant.</span></p>`:n&&!a.some(c)?l`<p class="field-hint">${f("info")}<span>Escolha quem recebe.</span></p>`:u}`:l`<p class="field-hint">${f("info")}<span>Nenhuma pessoa da casa no Home Assistant.</span></p>`}
            </div>
            <button class="btn outline remind-test" ?disabled=${!i||!i.phone} title=${h} @click=${()=>this._testDueAlert()}>${f("send")}Testar no meu celular</button>
          </div></div>`:u}`}_alertChosen(){let e=this._app("due_alert_people",null);return Array.isArray(e)?e:null}_toggleAlertPerson(e){let t=(this._alertPeople||[]).map(i=>i.id).filter(Boolean),s=this._alertChosen()||t,a=s.includes(e.id)?s.filter(i=>i!==e.id):[...s,e.id];this._haptic("light"),this._saveAppPrefs({due_alert_people:t.every(i=>a.includes(i))?null:a})}async _loadAlertPeople(){if(this._alertPeopleLoading)return this._alertPeople;this._alertPeopleLoading=!0;try{this._alertPeople=this._prefsRemote?await this.hass.callWS({type:"resolvia/due_alert/people"}):[]}catch{this._alertPeople=null}return this._alertPeopleLoading=!1,this.requestUpdate(),this._alertPeople}async _testDueAlert(){try{let e=await this.hass.callWS({type:"resolvia/due_alert/test"});this._showToast(e&&e.today?"Aviso enviado para o seu celular. Toque nele para abrir Agora.":"Aviso enviado para o seu celular (nada vence hoje).")}catch(e){this._showToast(`N\xE3o foi: ${e.message}`)}}_renderAppearanceTab(){let e=this._accentDaily(),t=e?this._accent().id:(Ee(this._app("accent","vermelho"))||fe[0]).id;return l`
        <div class="panel">
          ${this._secHead("contrast","Tema","Cada aparelho guarda a sua escolha.")}
          ${za({theme:this._theme,onTheme:s=>this._setTheme(s),icon:f})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Vale para todos os aparelhos.")}
          <div class="row switch-row daily-row">
            <div class="grow"><div class="label">${f("calendar","lbl-ic")}Cor do dia</div><div class="hint">Muda a cor do app todo dia.</div></div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${s=>this._saveAppPrefs({accent_daily:s.target.checked?null:!1})} aria-label="Cor do dia" /><span class="track"></span></label>
          </div>
          ${Pa({palette:fe,value:t,onPick:s=>this._saveAppPrefs({accent:s==="vermelho"?null:s,accent_daily:!1})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return u;let e=this._app("sensors_on",!1)===!0;return l`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">${f("activity","lbl-ic")}Criar sensores</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: nenhum sensor no Home Assistant."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${t=>this._saveAppPrefs({sensors_on:t.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${e?l`<div class="sub-op"><div class="sub-box sensor-list">
            ${[["sensor.resolvia_atrasados","tarefas atrasadas, com cada uma nos atributos"],["sensor.resolvia_vence_hoje","o que vence hoje, com o hor\xE1rio"],["binary_sensor.resolvia_compras","ligado com algo para comprar, com os itens"],["sensor.resolvia_ia_hoje","chamadas de IA hoje, com erros, cota e tokens estimados"]].map(([t,s])=>l`<div class="sensor-row"><code>${t}</code><span>${s}</span></div>`)}
          </div></div>`:u}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return u;let e=this._aiOn(),t=l`<div class="row switch-row">
        <div class="grow"><div class="label">${f("sparkles","lbl-ic")}Usar IA</div><div class="hint" style="white-space:normal">${e?"Ligado.":"Desligado: sem leitura por IA, sem Falar."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${h=>this._saveAppPrefs({ai_off:h.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!e)return l`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","IA","Usa a IA configurada no Home Assistant.")}
        ${t}
      </div>`;let s=this._aiInfo(),a=s.entities||[],i=this._app("ai_entity",""),r=this._app("ai_photos",""),n=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",c=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",d="";return s.ready&&s.using&&(d=`Usando ${s.using.name}${i?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(d+=` Para fotos, ${s.photos.name}.`)),s.reason&&(d=`${d} ${s.reason}`.trim()),l`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","IA","Usa a IA configurada no Home Assistant.")}
      ${t}
      <div class="sub-op"><div class="sub-box">
      <div class="ai-state ${n}"><span class="dot"></span><div><b>${c}</b>${d?l`<span>${d}</span>`:u}</div></div>
      ${a.length||i||r?l`<label class="field" style="margin:14px 0 0">
              <span class="flabel">${f("message-circle","lbl-ic")}Para conversar</span>
              <select class="select" aria-label="IA para conversar" @change=${h=>this._chooseAi(h.target.value)}>
                <option value="" ?selected=${!i}>Padrão do Home Assistant</option>
                ${a.map(h=>l`<option value=${h.id} ?selected=${h.id===i}>${h.name}${h.available?"":" (indispon\xEDvel)"}</option>`)}
                ${i&&!a.some(h=>h.id===i)?l`<option value=${i} selected>${i} (não encontrada)</option>`:u}
              </select>
            </label>
            <label class="field" style="margin:14px 0 0">
              <span class="flabel">${f("scan-text","lbl-ic")}Para ler fotos e PDFs</span>
              <select class="select" aria-label="IA para ler fotos e PDFs" @change=${h=>this._chooseAi(h.target.value,"ai_photos")}>
                <option value="" ?selected=${!r}>Igual à de conversar</option>
                ${a.filter(h=>h.images||h.id===r).map(h=>l`<option value=${h.id} ?selected=${h.id===r}>${h.name}${h.available?"":" (indispon\xEDvel)"}</option>`)}
                ${r&&!a.some(h=>h.id===r)?l`<option value=${r} selected>${r} (não encontrada)</option>`:u}
              </select>
            </label>`:u}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${()=>this._refreshAi()}>${f("rotate-ccw")}Verificar de novo</button></div>
      ${s.ready&&s.images?u:l`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
      </div></div>
    </div>`}_renderSheet(){if(!this._sheet)return u;let e=u;return this._sheet==="item"?e=this._renderItemSheet():this._sheet==="listmenu"?e=this._renderListMenu():this._sheet==="customize"?e=this._renderCustomize():this._sheet==="confirm"?e=this._renderConfirm():this._sheet==="import"?e=this._renderImportSheet():this._sheet==="versions"?e=this._renderVersions():this._sheet==="who"?e=this._renderWhoSheet():this._sheet==="move"?e=this._renderMoveSheet():this._sheet==="bulk"?e=this._renderBulkSheet():this._sheet==="chat"?e=this._renderChatSheet():this._sheet==="cards"&&(e=this._renderCardsSheet()),l`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${t=>t.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${e}
      </div>
    `}_sheetStyle(){let e=this._form||{},t=this._list(e.target||e.listId),s=this._sheet==="customize"&&t?this._formColor(e,t):t&&t.color;return!s||s.none?s?W(s,this._dark):"":`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${yt(s.fill,this._dark?.18:.14)};${W(s,this._dark)}`}_renderMirroredSheet(e){let t=this._form,s=t.mirrored,a=this._pointsOf(e.id,t.summary,t.key),i=ae(t.due),r=T(e.features,E.DELETE);return l`
      <div class="sheet-head">
        <h3 class="display">${f(s.tipo==="rotina"?"house":"wrench","sh-ic")}${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <div class="ro-item">
        <b>${t.summary}</b>
        <div class="ro-tags">
          ${i?l`<span class="tag ${e.noDue?"info":i.tone}">${f("calendar")}${i.text}</span>`:u}
          ${a?l`<span class="tag pts">${f("trophy")}+${a}</span>`:u}
          <span class="tag">${L(e.name,24)}</span>
        </div>
        ${t.description?l`<p>${t.description}</p>`:u}
      </div>
      <p class="sheet-note with-icon">${f("calendar-clock")}<span>Vem do CronologIA: concluir aqui marca como feito lá${a?` (${a} pontos)`:""}. Para editar, use o CronologIA.</span></p>
      <div class="sheet-actions">
        ${r?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Apagar">${f("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._closeSheet()}>${f("check")}Fechar</button>
      </div>
    `}_toggleCal(){let e=this._form;e&&(this._setForm({cal:e.cal?null:wi(e.date),calMonths:!1}),this._form.cal&&this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet .cal");t&&t.scrollIntoView({block:"nearest",behavior:"smooth"})}))}_renderCal(e,t){let s=this._form;return $i({icon:f,month:s.cal,value:e,today:$e(new Date),onPick:t,onMonth:a=>this._setForm({cal:a}),months:!!s.calMonths,onMonths:a=>this._setForm({calMonths:a})})}_timeBox(e,t){return l`<select id=${e} class="time-box" tabindex="-1" aria-label="Horário" @focus=${s=>{let a=s.target.parentNode.querySelector(".time-other");a&&a.focus({preventScroll:!0})}} @change=${s=>this._setForm({time:s.target.value||null})}>
      <option value="" hidden></option>
      ${os(t).map(s=>l`<option value=${s}>${s}</option>`)}
    </select>`}_pickTime(e){let t=this.renderRoot.querySelector(e),s=window.__selectSheet;!t||!s||!s.open||(t.value=this._form&&this._form.time||"",s.open(t),!t.value&&requestAnimationFrame(()=>requestAnimationFrame(()=>{let a=[...document.querySelectorAll(".ss-wrap .ss-opt")].find(i=>i.textContent.trim()===pe);a&&a.scrollIntoView({block:"center"})})))}_renderItemSheet(){let e=this._form,t=this._list(e.listId),s=this._list(e.target)||t;if(!t||!s)return u;if(e.mirrored&&e.mode==="edit")return this._renderMirroredSheet(t);let a=s.features,i=T(a,E.DESCRIPTION),r=this._dueOn()&&(T(a,E.DUE_DATE)||T(a,E.DUE_DATETIME)),n=T(a,E.DUE_DATETIME),c=e.mode==="edit"&&T(t.features,E.DELETE),d=is(),h=d.some(m=>m.date===e.date),p=e.mode==="add"?this._L.filter(m=>T(m.features,E.CREATE)&&!m.unavailable&&(!m.hidden||m.id===e.target)):T(t.features,E.DELETE)?this._L.filter(m=>m.id===t.id||T(m.features,E.CREATE)&&!m.unavailable&&!m.hidden):[];return l`
      <div class="sheet-head">
        <h3 class="display">${f(e.mode==="add"?"plus":"pencil","sh-ic")}${e.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      ${e.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(e.target,"text"),photos:()=>this._openImport(e.target,"photos"),scan:()=>this._openImport(e.target,"scan")},{anexar:this._renderPhotosField(e,{inline:!0})}):u}
      <label class="field">
        <span class="flabel">${f("pencil","lbl-ic")}Item</span>
        <textarea rows="2" .value=${e.summary} @input=${m=>this._setForm({summary:m.target.value})} @keydown=${m=>m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${e.mode==="add"&&this._canImport()?u:this._renderPhotosField(e)}
      ${this._renderWhere(e)}
      ${r?l`<div class="field">
            <span class="flabel">${f("calendar","lbl-ic")}Prazo</span>
            <div class="chip-row grid">
              ${d.map(m=>l`<button class="pick ${e.date===m.date?"on":""}" @click=${()=>this._setForm({date:e.date===m.date?null:m.date,cal:null})}>${f(Ti(m.label))}<span>${m.label}</span></button>`)}
              <button class="pick ${e.date&&!h?"on":""}" aria-expanded=${e.cal?"true":"false"} @click=${()=>this._toggleCal()}>
                ${f("calendar")}<span>${e.date&&!h?At(e.date):"Outra data"}</span>
              </button>
              ${e.date?l`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null,cal:null})}>${f("x")}<span>Sem prazo</span></button>`:u}
            </div>
            ${e.cal?this._renderCal(e.date,m=>this._setForm({date:m,cal:null})):u}
            ${s.appDue&&e.date?l`<p class="field-hint app-due">${f("info")}<span>Guardado no ResolvIA: a lista não aceita data.</span></p>`:u}
          </div>`:u}
      ${r&&n&&e.date?l`<div class="field">
            <span class="flabel">${f("clock","lbl-ic")}Horário</span>
            <div class="chip-row grid">
              <button class="pick ${e.time?"":"on"}" @click=${()=>this._setForm({time:null})}>${f("sun")}<span>Dia todo</span></button>
              <button class="pick ${e.time===pe?"on":""}" @click=${()=>this._setForm({time:pe})}>${f("clock")}<span>${pe}</span></button>
              <button class="pick time-other ${e.time&&e.time!==pe?"on":""}" @click=${()=>this._pickTime("#rv-time")}>
                ${f("clock-fading")}<span>${e.time&&e.time!==pe?e.time:"Outro hor\xE1rio"}</span>
              </button>
            </div>
            ${this._timeBox("rv-time",e.time)}
          </div>`:u}
      ${this._rulesOk&&this._repeatOn()&&!e.mirrored&&(T(a,E.UPDATE)||T(a,E.CREATE))?l`<div class="field">
            <span class="flabel">${f("repeat","lbl-ic")}Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${e.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>${f("x")}<span>Não</span></button>
              ${Si.map(m=>l`<button class="pick ${e.repeat===m.days&&!e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:m.days,repeatCustom:!1})}>${f("repeat")}<span>${m.label}</span></button>`)}
              <button class="pick ${e.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:e.repeat||4})}>${f("repeat")}<span>Outro</span></button>
            </div>
            ${e.repeatCustom?l`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(e.repeat||"")} @input=${m=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(m.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:u}
            ${e.repeat?l`<div class="field-hint">${f("repeat")}<span>Volta sozinha ${e.repeat===1?"no dia seguinte":`em ${e.repeat} dias`} depois de concluída.</span></div>`:u}
          </div>`:u}
      ${this._renderRoomField(e,!1)}
      ${this._renderEquipField(e)}
      ${this._renderExternalField(e,s.appDue?a&~(E.DUE_DATE|E.DUE_DATETIME):a)}
      ${this._renderPointsField(e)}
      ${i&&(this._notesOn()||e.hadNotes)?l`<div class="field notes-field">
            <span class="flabel">${f("notebook-pen","lbl-ic")}Notas</span>
            <textarea rows="3" data-fold aria-label="Notas" .value=${e.description} @input=${m=>this._setForm({description:m.target.value})} placeholder="Detalhes, links…"></textarea>
            ${(e.description||"").trim()?l`<p class="shut-val">${(e.description||"").trim().split(`
`)[0]}</p>`:u}
          </div>`:u}
      ${p.length>1?l`<div class="field">
            <span class="flabel">${f("list-todo","lbl-ic")}Lista</span>
            <div class="chip-row grid">
              ${p.map(m=>l`<button class="pick list ${e.target===m.id?"on":""}" style=${W(m.color,this._dark)} @click=${()=>this._setForm({target:m.id})}><span class="dot"></span><span>${L(m.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        ${c?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Apagar">${f("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._saveItem()}>${f(e.mode==="add"?"plus":e.target!==e.listId?"arrow-right-left":"check")}${e.mode==="add"?"Adicionar":e.target!==e.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(e,{label:t=!0,anexar:s=null}={}){let a=s&&s!==u,i=this._aiInfo(),r=this._camOk(),n=(c,d,h,p=!1,m="")=>l`<button type="button" class="imp-tile ${m?"no-cam":""}" ?disabled=${p} @click=${e[c]}>${f(d)}<span>${h}</span>${m?l`<small>${m}</small>`:u}</button>`;return l`<div class="field imp-field">
        ${t?l`<span class="flabel">${f("sparkles","lbl-ic")}${a?"Fotos e mensagens":"Trazer de mensagem ou foto"}</span>`:u}
        ${a?l`<div class="imp-sub">Ler com a IA</div>`:u}
        <div class="imp-tiles">
          ${n("text","clipboard-paste","Colar mensagem")}
          ${n("photos","images","Escolher fotos ou PDF",!i.images)}
          ${n("scan","scan-text","Digitalizar com\xA0IA",!i.images,r?"":"Precisa de https")}
        </div>
        ${i.images&&!r?l`<p class="imp-help">Em http a câmera não abre aqui: tire a foto pelo celular e use Escolher fotos ou PDF.</p>`:u}
        ${a?s:u}
      </div>
      ${i.ready?u:l`<div class="ai-box">${f("scan-text")}<span>Sem IA configurada, a mensagem é separada por linhas e vírgulas. Para ler fotos, configure a IA do Home Assistant em Mais › Configurações › Integrações.</span></div>`}`}_renderImportSheet(){let e=this._form,t=this._aiInfo(),s=(n,c)=>l`<div class="sheet-head">
      ${c?l`<button class="icon-btn back" @click=${c} aria-label="Voltar">${f("chevron-left")}</button>`:u}
      <h3 class="display">${f({Falar:"mic","Lendo\u2026":"scan-text","Revisar itens":"list-checks"}[n]||"list-plus","sh-ic")}${n}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},i=e.error?l`<div class="imp-error">${f("circle-alert")}<span>${e.error}</span></div>`:u,r=e.images&&e.images.length?l`<div class="thumbs">${e.images.map(n=>n.pdf?l`<span class="thumb-pdf" title=${n.nome||"PDF"}>${f("file-text")}</span>`:l`<img src=${n.url} alt="" />`)}</div>`:u;if(e.step==="voice")return this._renderVoiceStep(s);if(e.step==="text")return l`
        ${s(e.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">${f("message-square-text","lbl-ic")}Mensagem</span>
          <textarea rows="7" .value=${e.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${n=>this._setForm({text:n.target.value,error:null})}></textarea>
        </label>
        ${i}
        <div class="sheet-actions">
          ${this._clipOk()?l`<button class="btn outline" @click=${()=>this._pasteClipboard()}>${f("clipboard-paste")}Colar</button>`:u}
          <button class="btn primary" ?disabled=${!(e.text||"").trim()} @click=${()=>this._readText()}>${f(t.ready?"sparkles":"list-checks")}Separar itens</button>
        </div>
        ${t.ready?u:l`<p class="sheet-note">Sem IA configurada: separo por linhas, vírgulas e “e”.</p>`}
      `;if(e.step==="loading")return l`
        ${s("Lendo\u2026")}
        ${r}
        <div class="imp-loading">
          <span class="spin">${f("loader-circle")}</span>
          <span>${e.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>e.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>${f("x")}Cancelar</button></div>
      `;if(e.step==="review"){let n=this._list(e.target),c=e.items.filter(m=>m.on&&m.text.trim()).length,d=this._importTargets(),h=d.length>1,p=new Set(e.items.filter(m=>m.on&&m.text.trim()).map(m=>this._importListOf(m)));return l`
        ${s("Revisar itens",a)}
        ${r}
        ${e.heard?l`<p class="heard">${f("mic")}<span>“${e.heard}”</span></p>`:u}
        <p class="sheet-note top">${O(e.items.length,"item encontrado","itens encontrados")}.</p>
        ${e.note?l`<div class="imp-error soft">${f("sparkles")}<span>${e.note}</span></div>`:u}
        <div class="imp-list">
          ${e.items.map((m,g)=>{let _=this._list(this._importListOf(m));return l`<div class="imp-row ${m.on?"":"off"} ${h||this._roomsOn()||this._equipsOn()?"has-dest":""}">
              <button class="check ${m.on?"on":""}" role="checkbox" aria-checked=${m.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(g,{on:!m.on})}>${f("check")}</button>
              <textarea class="imp-text" rows="1" data-size="off" .value=${m.text} aria-label="Item" @keydown=${w=>w.key==="Enter"&&!w.shiftKey&&w.preventDefault()} @input=${w=>this._setImportItem(g,{text:w.target.value})}></textarea>
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:e.items.filter((w,y)=>y!==g)})}>${f("x")}</button>
              ${h||this._roomsOn()||this._equipsOn()?l`<div class="imp-chips">
              ${h&&_?l`<label class="imp-dest" style=${W(_.color,this._dark)}>
                    <span class="dot"></span><span class="dname">${L(_.name,30)}</span>${f("chevron-down")}
                    <select aria-label="Lista de ${m.text}" @change=${w=>this._setImportItem(g,{list:w.target.value})}>
                      ${d.map(w=>l`<option value=${w.id} ?selected=${w.id===_.id}>${w.name}</option>`)}
                    </select>
                  </label>`:u}
              ${this._roomsOn()?l`<label class="imp-dest imp-room ${m.room?"":"none"}">
                    ${f(m.room==="*"?"house":"door-open")}<span class="dname">${m.room==="*"?"Todos os c\xF4modos":m.room?L(this._roomName(m.room)||"",30):"C\xF4modo"}</span>${f("chevron-down")}
                    <select aria-label="Cômodo de ${m.text}" @change=${w=>this._setImportItem(g,{room:w.target.value||null})}>
                      <option value="" ?selected=${!m.room}>Nenhum</option>
                      ${this._houseRooms().length>1?l`<option value="*" ?selected=${m.room==="*"}>Todos os cômodos</option>`:u}
                      ${this._houseRooms().map(w=>l`<option value=${w.id} ?selected=${w.id===m.room}>${w.nome}</option>`)}
                    </select>
                  </label>`:u}
              ${this._equipsOn()?l`<button type="button" class="imp-dest imp-room imp-equip ${m.equip?"":"none"} ${e.eqFor===g?"open":""}" aria-expanded=${e.eqFor===g?"true":"false"} aria-label="Equipamento de ${m.text}" @click=${()=>this._setForm({eqFor:e.eqFor===g?null:g,eqQ:"",eqMore:!1})}>
                    ${f("package")}<span class="dname">${m.equip?L((this._equipOf(m.equip)||{}).nome||"",30):"Equipamento"}</span>${f("chevron-down")}
                  </button>`:u}
                  </div>`:u}
              ${e.eqFor===g&&this._equipsOn()?l`<div class="imp-eq">${Xe({lit:{html:l,nothing:u},icon:f,items:this._equipItems(),room:this._roomsOn()&&m.room!=="*"?m.room:null,roomName:this._roomsOn()&&m.room&&m.room!=="*"&&this._roomName(m.room)||"",value:null,query:e.eqQ||"",more:!!e.eqMore,autofocus:!0,onQuery:w=>this._setForm({eqQ:w,eqMore:!1}),onMore:()=>this._setForm({eqMore:!0}),onPick:w=>{let y=this._equipOf(w),k=y&&y.comodo&&this._roomsOn()&&this._roomList().some(x=>x.id===y.comodo)?y.comodo:m.room;this._setImportItem(g,{equip:w,room:k}),this._setForm({eqFor:null,eqQ:""})}})}
                  ${m.equip?l`<button type="button" class="eq-more" @click=${()=>(this._setImportItem(g,{equip:null}),this._setForm({eqFor:null}))}>${f("x")}Sem equipamento</button>`:u}
                </div>`:u}
            </div>`})}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...e.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let m=this.renderRoot.querySelectorAll(".imp-row input");m.length&&m[m.length-1].focus()})}}>${f("plus")}<span>Adicionar linha</span></button>
        </div>
        ${t.images?l`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${f("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${f("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:u}
        ${h?l`<div class="field">
              <span class="flabel">${f("list-todo","lbl-ic")}Todos em</span>
              <div class="chip-row grid">
                ${d.map(m=>l`<button class="pick list ${p.size===1&&p.has(m.id)?"on":""}" style=${W(m.color,this._dark)} @click=${()=>this._setForm({target:m.id,items:e.items.map(g=>({...g,list:m.id}))})}><span class="dot"></span><span>${L(m.name,26)}</span></button>`)}
              </div>
            </div>`:u}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!c} @click=${()=>this._importAdd()}>
            ${f("plus")}${c?`Adicionar ${O(c,"item","itens")}`:"Nenhum item marcado"}${c&&p.size>1?` em ${p.size} listas`:c&&p.size===1&&this._list([...p][0])?` em ${L(this._list([...p][0]).name,18)}`:""}
          </button>
        </div>
      `}return l`
      ${s("Importar itens")}
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${t.images?u:l`<div class="imp-error soft">${f("sparkles")}<span>${t.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>${f("sparkles")}Ver IA</button></span></div>`}
      ${i}
    `}_renderListMenu(){let e=this._list(this._form.listId);return e?l`
      <div class="sheet-head">
        <h3 class="display">${f(e.icon||"list-todo","sh-ic")}${e.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      ${T(e.features,E.DELETE)&&(e.items||[]).some(t=>!X(t))?l`<button class="menu-row" @click=${()=>(this._closeSheet(),this._startSelect(e))}>${f("square-check-big")}Selecionar itens<span class="sub">para mover de lista</span></button>`:u}
      <button class="menu-row" @click=${()=>this._openCustomize(e)}>${f("palette")}Personalizar<span class="sub">${e.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(e.id,{hidden:e.hidden?null:!0}))}>${f(e.hidden?"eye":"eye-off")}${e.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?l`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${e.id}`)}>${f("external-link")}Abrir na tela padrão do HA</button>`:u}
      ${T(e.features,E.DELETE)&&e.done?l`<button class="menu-row danger" @click=${()=>this._confirmClearDone(e)}>${f("brush-cleaning")}Limpar concluídos<span class="sub">${e.done}</span></button>`:u}
    `:u}_renderCustomize(){let e=this._form,t=this._list(e.listId);if(!t)return u;let s=this._formColor(e,t),a=e.icon==="sem"?null:e.icon||ss(`${t.origName} ${t.group||""} ${t.id}`);return l`
      <div class="sheet-head">
        <h3 class="display">${f("sliders-horizontal","sh-ic")}Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <div class="preview-tile" style=${W(s,this._dark)}>
        ${a?l`<span class="tile">${f(a)}</span>`:u}
        <span class="lc-main"><span class="lc-title">${(e.name||"").trim()||t.origName}</span><span class="lc-meta">${t.group||t.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">${f("pencil","lbl-ic")}Nome</span>
        <textarea rows="1" .value=${e.name} placeholder=${t.origName} @input=${i=>this._setForm({name:i.target.value})} @keydown=${i=>i.key==="Enter"&&!i.shiftKey&&i.preventDefault()}></textarea>
      </label>
      <div class="field">
        <span class="flabel">${f("palette","lbl-ic")}Cor</span>
        <div class="swatches">
          <button class="sw none ${s.none?"on":""}" aria-label="Sem cor" title="Sem cor" @click=${()=>this._setForm({color:"sem"})}>${f("ban")}</button>
          ${fe.map(i=>l`<button class="sw ${s.id===i.id?"on":""}" style="--c:${i.fill}" aria-label=${i.label} @click=${()=>this._setForm({color:i.id})}>${s.id===i.id?f("check"):u}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">${f("blocks","lbl-ic")}Ícone</span>
        <div class="icon-grid" style=${W(s,this._dark)}>
          <button class="ig none ${a?"":"on"}" aria-label="Sem ícone" title="Sem ícone" @click=${()=>this._setForm({icon:"sem"})}>${f("ban")}</button>
          ${Ba.map(i=>l`<button class="ig ${a===i?"on":""}" aria-label=${i} @click=${()=>this._setForm({icon:i})}>${f(i)}</button>`)}
        </div>
      </div>
      ${this._renderOwnerPick(e)}
      <div class="field" data-f="opcoes">
        <span class="flabel">${f("sliders-horizontal","lbl-ic")}Opções</span>
        <div class="opt-rows">
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">${f("eye","lbl-ic")}Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!e.hidden} @change=${i=>this._setForm({hidden:!i.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?t.canDue?l`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">${f("calendar-clock","lbl-ic")}Prazos</div>
              <div class="hint" style="white-space:normal">${e.deadlines?"Vencidos ficam vermelhos e aparecem em Agora.":"Datas s\xF3 como informa\xE7\xE3o."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${e.deadlines} @change=${i=>this._setForm({deadlines:i.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:t.hasDates?l`<p class="sheet-note with-icon">${f("info")}<span>Esta lista não aceita prazo: as datas vêm da integração, só como informação.</span></p>`:u:u}
        </div>
      </div>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:t.canDue,owner:""})}>${f("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>${f("check")}Salvar</button>
      </div>
    `}_renderOwnerPick(e){if(!this._ownersOn())return u;let t=this._people||[],s=e.owner&&!t.some(a=>N(a)===N(e.owner))?[...t,e.owner]:t;return s.length?l`<div class="field">
      <span class="flabel">${f("user-round","lbl-ic")}De quem é</span>
      <div class="chip-row grid owner-pick" role="radiogroup" aria-label="De quem é">
        ${["",...s].map(a=>{let i=a?N(e.owner||"")===N(a):!e.owner;return l`<button class="pick ${i?"on":""}" role="radio" aria-checked=${i?"true":"false"} @click=${()=>this._setForm({owner:a})}>${f(a?"user-round":"users")}<span>${a||"Todos"}</span></button>`})}
      </div>
      ${e.owner&&this._dueOn()&&this._app("due_alert",!1)===!0?l`<span class="field-hint">${f("info")}<span>O aviso de prazos vai só para o celular de ${e.owner}.</span></span>`:u}
    </div>`:u}_renderConfirm(){let e=this._form,t=e.icon||hr(e.label);return l`
      <div class="sheet-head"><h3 class="display">${f(t,"sh-ic")}${e.title}</h3></div>
      <p class="confirm-text">${e.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>${f("x")}Cancelar</button>
        <button class="btn primary" @click=${()=>e.run()}>${f(t)}${e.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return u;let e=this._toast;return l`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${e.text}</span>
      ${e.action?l`<button @click=${()=>{this._toast=null,e.action.run()}}>${f(e.action.icon||(e.action.label==="Desfazer"?"undo-2":"arrow-right"))}${e.action.label}</button>`:u}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",vs);var bs=class{constructor(e,t){this.url=e,this.onStatus=t,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let e=new WebSocket(this.url);this.ws=e,e.onopen=()=>{this.open=!0,this.backoff=1e3;let t=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))e.send(s);if(this.onStatus&&this.onStatus(!0),t)for(let s of this.reconnectHandlers)s()},e.onmessage=t=>{let s;try{s=JSON.parse(t.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let i=new Error(s.error&&s.error.message||"Falhou");i.code=s.error&&s.error.code,a.reject(i)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},e.onclose=()=>{let t=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),t&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(e){this.reconnectHandlers.push(e)}_send(e){let t=JSON.stringify(e);this.open?this.ws.send(t):this.queue.push(t)}sendMessagePromise(e){let t=this.nextId++;return new Promise((s,a)=>{this.pending.set(t,{resolve:s,reject:a}),this._send({...e,id:t})})}subscribeMessage(e,t){let s={cb:e,msg:t,id:null,first:null};this.subs.add(s);let a=new Promise((i,r)=>{s.first={resolve:i,reject:r}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(e){let t=this.nextId++;e.id=t,this.byId.set(t,e),this.pending.set(t,{resolve:()=>{e.first&&e.first.resolve(),e.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(t),this.subs.delete(e),e.first&&e.first.reject(s),e.first=null)}}),this.ws.send(JSON.stringify({...e.msg,id:t}))}};function Pi(){try{if(window.parent===window)return null;let o=window.parent.document.querySelector("home-assistant");return o&&o.hass||null}catch{return null}}var tt=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function zi(){let o=Pi();return o&&o.themes&&typeof o.themes.darkMode=="boolean"?o.themes.darkMode:!!(tt&&tt.matches)}function Ri(){return{topbar:!(window.parent!==window),haptic(e){try{let t=window.parent;t!==window&&t.dispatchEvent(new t.CustomEvent("haptic",{detail:e}))}catch{}},openInHA(e){try{let t=window.parent;if(t!==window&&t.document){t.history.pushState(null,"",e),t.dispatchEvent(new t.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(e,"_top")}}}async function Di(o){let e=new URL("ws",location.href);e.protocol=location.protocol==="https:"?"wss:":"ws:";let t=null,s=c=>{t={...t,...c},o(t)},a=new bs(e.href,c=>t&&s({connected:c})),i=await a.sendMessagePromise({type:"resolvia/bootstrap"}),r=Pi();t={states:i.states||{},entities:i.entities||{},devices:i.devices||{},user:{name:r&&r.user&&r.user.name||i.user&&i.user.name||"",is_admin:r&&r.user?!!r.user.is_admin:!0},themes:{darkMode:zi()},language:"pt-BR",connected:!0,version:i.version,resolvia:{ai:i.ai||{ready:!1,images:!1,entities:[]},atalho:i.atalho||null,aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:(c=!1)=>a.sendMessagePromise({type:"resolvia/voice/status",...c?{fresh:!0}:{}}),async voiceText(c){let d=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:c.buffer.slice(c.byteOffset,c.byteOffset+c.byteLength)}),h=await d.json().catch(()=>({}));if(!d.ok){let p=new Error(h.error||`Erro ${d.status}`);throw p.code=h.code,p}return h},async chat(c){let d=await fetch(new URL("api/chat",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(c)}),h=await d.json().catch(()=>({}));if(!d.ok){let p=new Error(h.error||`Erro ${d.status}`);throw p.code=h.code,p}return h},async extract(c){let d=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(c)}),h=await d.json().catch(()=>({}));if(!d.ok){let p=new Error(h.error||`Erro ${d.status}`);throw p.code=h.code,p}return h},async uploadPhoto(c){let d=await fetch(new URL("api/photo",location.href),{method:"POST",headers:{"content-type":"image/jpeg"},body:c}),h=await d.json().catch(()=>({}));if(!d.ok||!h.file)throw new Error(h.error||`Erro ${d.status}`);return h.file},photoUrl:c=>new URL(`api/photo/${encodeURIComponent(c)}`,location.href).href,report:c=>new URL(`relatorio?${c}`,location.href).href,data:{url:c=>new URL(`api/export/${c}`,location.href).href,async import(c){let d=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(c.name||"")},body:c}),h=await d.json().catch(()=>({}));if(!d.ok)throw new Error(h.error||`Erro ${d.status}`);return h},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:c=>a.sendMessagePromise({type:"resolvia/versions/restore",name:c}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:c=>a.sendMessagePromise({type:"resolvia/backups/restore",name:c}),erase:()=>a.sendMessagePromise({type:"resolvia/data/erase"})}},connection:a,callWS:c=>a.sendMessagePromise(c),callService:(c,d,h,p)=>a.sendMessagePromise({type:"call_service",domain:c,service:d,service_data:h||{},target:p})},a.subscribeMessage(c=>{let d={...t.states};c.new_state?d[c.entity_id]=c.new_state:delete d[c.entity_id],s({states:d})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let c=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:c.states||{},entities:c.entities||{},devices:c.devices||{}})}catch{}});let n=()=>{let c=zi();t&&c!==t.themes.darkMode&&s({themes:{...t.themes,darkMode:c}})};return setInterval(n,1500),tt&&tt.addEventListener&&tt.addEventListener("change",n),t}_s();var xs=document.getElementById("app"),He=document.createElement("resolvia-panel");He.env=Ri();He.narrow=window.innerWidth<870;window.addEventListener("resize",()=>He.narrow=window.innerWidth<870);Di(o=>{He.hass=o}).then(o=>{He.hass=o,xs.replaceChildren(He)}).catch(o=>{xs.innerHTML="";let e=document.createElement("div");e.id="boot",e.textContent=`N\xE3o consegui iniciar o ResolvIA: ${o.message}. Recarregue a p\xE1gina.`,xs.appendChild(e)});})();
