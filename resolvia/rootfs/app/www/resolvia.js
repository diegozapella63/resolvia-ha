/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{var _t=globalThis,Jt=_t.ShadowRoot&&(_t.ShadyCSS===void 0||_t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kt=Symbol(),xe=new WeakMap,$t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Jt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=xe.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&xe.set(e,t))}return t}toString(){return this.cssText}},G=i=>new $t(typeof i=="string"?i:i+"",void 0,Kt),Re=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,a,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[r+1],i[0]);return new $t(e,i,Kt)},Us=(i,t)=>{if(Jt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),a=_t.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}},be=Jt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return G(e)})(i):i,{is:Bs,defineProperty:js,getOwnPropertyDescriptor:Ws,getOwnPropertyNames:Ys,getOwnPropertySymbols:Js,getPrototypeOf:Ks}=Object,Ct=globalThis,_e=Ct.trustedTypes,Xs=_e?_e.emptyScript:"",Zs=Ct.reactiveElementPolyfillSupport,ct=(i,t)=>i,jt={toAttribute(i,t){switch(t){case Boolean:i=i?Xs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},De=(i,t)=>!Bs(i,t),$e={attribute:!0,type:String,converter:jt,reflect:!1,useDefault:!1,hasChanged:De};Symbol.metadata??=Symbol("metadata"),Ct.litPropertyMetadata??=new WeakMap;var F=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=$e){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&js(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){let{get:a,set:r}=Ws(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:a,set(o){let d=a?.call(this);r?.call(this,o),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$e}static o(){if(this.hasOwnProperty(ct("elementProperties")))return;let t=Ks(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ct("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(ct("properties"))){let e=this.properties,s=[...Ys(e),...Js(e)];for(let a of s)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,a]of e)this.elementProperties.set(s,a)}this.u=new Map;for(let[e,s]of this.elementProperties){let a=this.p(e,s);a!==void 0&&this.u.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let a of s)e.unshift(be(a))}else t!==void 0&&e.push(be(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Us(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),a=this.constructor.p(t,s);if(a!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:jt).toAttribute(e,s.type);this.m=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this.m=null}}_$AK(t,e){let s=this.constructor,a=s.u.get(t);if(a!==void 0&&this.m!==a){let r=s.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:jt;this.m=a;let d=o.fromAttribute(e,r.type);this[a]=d??this.T?.get(a)??d,this.m=null}}requestUpdate(t,e,s,a=!1,r){if(t!==void 0){let o=this.constructor;if(a===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??De)(r,e)||s.useDefault&&s.reflect&&r===this.T?.get(t)&&!this.hasAttribute(o.p(t,s))))return;this.M(t,e,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:s,reflect:a,wrapped:r},o){s&&!(this.T??=new Map).has(t)&&(this.T.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),a===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,r]of this.v)this[a]=r;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,r]of s){let{wrapped:o}=r,d=this[a];o!==!0||this._$AL.has(a)||d===void 0||this.M(a,void 0,r,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.U()}catch(s){throw t=!1,this.U(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach(e=>this.C(e,this[e])),this.U()}updated(t){}firstUpdated(t){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[ct("elementProperties")]=new Map,F[ct("finalized")]=new Map,Zs?.({ReactiveElement:F}),(Ct.reactiveElementVersions??=[]).push("2.1.2");var Xt=globalThis,we=i=>i,wt=Xt.trustedTypes,ye=wt?wt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Zt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Qt="?"+L,Qs=`<${Qt}>`,X=document,pt=()=>X.createComment(""),ht=i=>i===null||typeof i!="object"&&typeof i!="function",Gt=Array.isArray,Ve=i=>Gt(i)||typeof i?.[Symbol.iterator]=="function",Nt=`[ 	
\f\r]`,lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,Ae=/>/g,J=RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Se=/"/g,Fe=/^(?:script|style|textarea|title)$/i,te=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=te(1),Gs=te(2),qa=te(3),k=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Te=new WeakMap,K=X.createTreeWalker(X,129);function qe(i,t){if(!Gt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(t):t}var Ne=(i,t)=>{let e=i.length-1,s=[],a,r=t===2?"<svg>":t===3?"<math>":"",o=lt;for(let d=0;d<e;d++){let n=i[d],c,p,h=-1,g=0;for(;g<n.length&&(o.lastIndex=g,p=o.exec(n),p!==null);)g=o.lastIndex,o===lt?p[1]==="!--"?o=ke:p[1]!==void 0?o=Ae:p[2]!==void 0?(Fe.test(p[2])&&(a=RegExp("</"+p[2],"g")),o=J):p[3]!==void 0&&(o=J):o===J?p[0]===">"?(o=a??lt,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?J:p[3]==='"'?Se:Me):o===Se||o===Me?o=J:o===ke||o===Ae?o=lt:(o=J,a=void 0);let m=o===J&&i[d+1].startsWith("/>")?" ":"";r+=o===lt?n+Qs:h>=0?(s.push(c),n.slice(0,h)+Zt+n.slice(h)+L+m):n+L+(h===-2?d:m)}return[qe(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},ut=class i{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let r=0,o=0,d=t.length-1,n=this.parts,[c,p]=Ne(t,e);if(this.el=i.createElement(c,s),K.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=K.nextNode())!==null&&n.length<d;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(Zt)){let g=p[o++],m=a.getAttribute(h).split(L),v=/([.?@])?(.*)/.exec(g);n.push({type:1,index:r,name:v[2],strings:m,ctor:v[1]==="."?kt:v[1]==="?"?At:v[1]==="@"?Mt:Q}),a.removeAttribute(h)}else h.startsWith(L)&&(n.push({type:6,index:r}),a.removeAttribute(h));if(Fe.test(a.tagName)){let h=a.textContent.split(L),g=h.length-1;if(g>0){a.textContent=wt?wt.emptyScript:"";for(let m=0;m<g;m++)a.append(h[m],pt()),K.nextNode(),n.push({type:2,index:++r});a.append(h[g],pt())}}}else if(a.nodeType===8)if(a.data===Qt)n.push({type:2,index:r});else{let h=-1;for(;(h=a.data.indexOf(L,h+1))!==-1;)n.push({type:7,index:r}),h+=L.length-1}r++}}static createElement(t,e){let s=X.createElement("template");return s.innerHTML=t,s}};function Z(i,t,e=i,s){if(t===k)return t;let a=s!==void 0?e.N?.[s]:e.O,r=ht(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(i),a._$AT(i,e,s)),s!==void 0?(e.N??=[])[s]=a:e.O=a),a!==void 0&&(t=Z(i,a._$AS(i,t.values),a,s)),t}var yt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??X).importNode(e,!0);K.currentNode=a;let r=K.nextNode(),o=0,d=0,n=s[0];for(;n!==void 0;){if(o===n.index){let c;n.type===2?c=new Pt(r,r.nextSibling,this,t):n.type===1?c=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(c=new St(r,this,t)),this._$AV.push(c),n=s[++d]}o!==n?.index&&(r=K.nextNode(),o++)}return K.currentNode=X,a}V(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Pt=class Ue{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ht(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==k&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):Ve(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==u&&ht(this._$AH)?this._$AA.nextSibling.data=t:this.I(X.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ut.createElement(qe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(e);else{let r=new yt(a,this),o=r.R(this.options);r.V(e),this.I(o),this._$AH=r}}_$AC(t){let e=Te.get(t.strings);return e===void 0&&Te.set(t.strings,e=new ut(t)),e}H(t){Gt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,a=0;for(let r of t)a===e.length?e.push(s=new Ue(this.B(pt()),this.B(pt()),this,this.options)):s=e[a],s._$AI(r),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=we(t).nextSibling;we(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,a){let r=this.strings,o=!1;if(r===void 0)t=Z(this,t,e,0),o=!ht(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{let d=t,n,c;for(t=r[0],n=0;n<r.length-1;n++)c=Z(this,d[s+n],e,n),c===k&&(c=this._$AH[n]),o||=!ht(c)||c!==this._$AH[n],c===u?t=u:t!==u&&(t+=(c??"")+r[n+1]),this._$AH[n]=c}o&&!a&&this.W(t)}W(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},kt=class extends Q{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===u?void 0:t}},At=class extends Q{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},Mt=class extends Q{constructor(t,e,s,a,r){super(t,e,s,a,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??u)===k)return;let s=this._$AH,a=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},St=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}},ta={q:Zt,J:L,Z:Qt,F:1,G:Ne,K:yt,X:Ve,Y:Z,tt:Pt,st:Q,it:At,et:Mt,ht:kt,ot:St},ea=Xt.litHtmlPolyfillSupport;ea?.(ut,Pt),(Xt.litHtmlVersions??=[]).push("3.3.3");var Be=(i,t,e)=>{let s=e?.renderBefore??t,a=s._$litPart$;if(a===void 0){let r=e?.renderBefore??null;s._$litPart$=a=new Pt(t.insertBefore(pt(),r),r,void 0,e??{})}return a._$AI(i),a},ee=globalThis;var N=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=Be(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return k}};N._$litElement$=!0,N.finalized=!0,ee.litElementHydrateSupport?.({LitElement:N});var sa=ee.litElementPolyfillSupport;sa?.({LitElement:N});(ee.litElementVersions??=[]).push("4.2.2");var{tt:aa}=ta,Ie=i=>i,ia=i=>i===null||typeof i!="object"&&typeof i!="function";var ze=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,ra=i=>i?._$litType$?.h!=null;var je=i=>i.strings===void 0,Ee=()=>document.createComment(""),q=(i,t,e)=>{let s=i._$AA.parentNode,a=t===void 0?i._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(Ee(),a),o=s.insertBefore(Ee(),a);e=new aa(r,o,i,i.options)}else{let r=e._$AB.nextSibling,o=e._$AM,d=o!==i;if(d){let n;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(n=i._$AU)!==o._$AU&&e._$AP(n)}if(r!==a||d){let n=e._$AA;for(;n!==r;){let c=Ie(n).nextSibling;Ie(s).insertBefore(n,a),n=c}}}return e},V=(i,t,e=i)=>(i._$AI(t,e),i),oa={},mt=(i,t=oa)=>i._$AH=t,Wt=i=>i._$AH,Ut=i=>{i._$AR(),i._$AA.remove()},We=i=>{i._$AR()};var E=i=>(...t)=>({_$litDirective$:i,values:t}),P=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.ct=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var dt=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),dt(s,t);return!0},Tt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Ye=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ca(t)}};function na(i){this._$AN!==void 0?(Tt(this),this._$AM=i,Ye(this)):this._$AM=i}function la(i,t=!1,e=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)dt(s[r],!1),Tt(s[r]);else s!=null&&(dt(s,!1),Tt(s));else dt(this,i)}var ca=i=>{i.type==2&&(i._$AP??=la,i._$AQ??=na)},ft=class extends P{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ye(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(dt(this,t),Tt(this))}setValue(t){if(je(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var It=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},zt=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(t=>this.dt=t)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var Et=class extends ft{constructor(){super(...arguments),this.ft=new It(this),this.vt=new zt}render(t,e){return k}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.yt)return k;this.yt=e;let a=0,{ft:r,vt:o}=this;return(async(d,n)=>{for await(let c of d)if(await n(c)===!1)return})(e,async d=>{for(;o.get();)await o.get();let n=r.deref();if(n!==void 0){if(n.yt!==e)return!1;s!==void 0&&(d=s(d,a)),n.commitValue(d,a),a++}return!0}),k}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Na=E(Et),Ua=E(class extends Et{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.rt=i,super.update(i,t)}commitValue(i,t){t===0&&We(this.rt);let e=q(this.rt);V(e,i)}}),Ce=i=>ra(i)?i._$litType$.h:i.strings,Ba=E(class extends P{constructor(i){super(i),this.bt=new WeakMap}render(i){return[i]}update(i,[t]){let e=ze(this.gt)?Ce(this.gt):null,s=ze(t)?Ce(t):null;if(e!==null&&(s===null||e!==s)){let a=Wt(i).pop(),r=this.bt.get(e);if(r===void 0){let o=document.createDocumentFragment();r=Be(u,o),r.setConnected(!1),this.bt.set(e,r)}mt(r,[a]),q(r,void 0,a)}if(s!==null){if(e===null||e!==s){let a=this.bt.get(s);if(a!==void 0){let r=Wt(a).pop();We(i),q(i,void 0,r),mt(i,[r])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var ja=E(class extends P{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.wt===void 0){this.wt=new Set,i.strings!==void 0&&(this._t=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.wt)s in t||(e.remove(s),this.wt.delete(s));for(let s in t){let a=!!t[s];a===this.wt.has(s)||this._t?.has(s)||(a?(e.add(s),this.wt.add(s)):(e.remove(s),this.wt.delete(s)))}return k}}),da={},Wa=E(class extends P{constructor(){super(...arguments),this.St=da}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every((s,a)=>s===this.St[a]))return k}else if(this.St===t)return k;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Ya=E(class extends P{constructor(){super(...arguments),this.key=u}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(mt(i),this.key=t),e}}),Ja=E(class extends P{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!je(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===k||t===u)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return k}else if(i.type===4){if(!!t===e.hasAttribute(s))return k}else if(i.type===1&&e.getAttribute(s)===t+"")return k;return mt(i),t}});var Bt=new WeakMap,Ka=E(class extends ft{render(i){return u}update(i,[t]){let e=t!==this.lt;return e&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=i.options?.host,this.$t(this.xt=i.element)),u}$t(i){if(this.lt!==void 0)if(this.isConnected||(i=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=Bt.get(t);e===void 0&&(e=new WeakMap,Bt.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,i),i!==void 0&&this.lt.call(this.Et,i)}else this.lt.value=i}get Tt(){return typeof this.lt=="function"?Bt.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),Pe=(i,t,e)=>{let s=new Map;for(let a=t;a<=e;a++)s.set(i[a],a);return s},R=E(class extends P{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let a=[],r=[],o=0;for(let d of i)a[o]=s?s(d,o):o,r[o]=e(d,o),o++;return{values:r,keys:a}}render(i,t,e){return this.Ct(i,t,e).values}update(i,[t,e,s]){let a=Wt(i),{values:r,keys:o}=this.Ct(t,e,s);if(!Array.isArray(a))return this.Pt=o,r;let d=this.Pt??=[],n=[],c,p,h=0,g=a.length-1,m=0,v=r.length-1;for(;h<=g&&m<=v;)if(a[h]===null)h++;else if(a[g]===null)g--;else if(d[h]===o[m])n[m]=V(a[h],r[m]),h++,m++;else if(d[g]===o[v])n[v]=V(a[g],r[v]),g--,v--;else if(d[h]===o[v])n[v]=V(a[h],r[v]),q(i,n[v+1],a[h]),h++,v--;else if(d[g]===o[m])n[m]=V(a[g],r[m]),q(i,a[h],a[g]),g--,m++;else if(c===void 0&&(c=Pe(o,m,v),p=Pe(d,h,g)),c.has(d[h]))if(c.has(d[g])){let y=p.get(o[m]),S=y!==void 0?a[y]:null;if(S===null){let z=q(i,a[h]);V(z,r[m]),n[m]=z}else n[m]=V(S,r[m]),q(i,a[h],S),a[y]=null;m++}else Ut(a[g]),g--;else Ut(a[h]),h++;for(;m<=v;){let y=q(i,n[v+1]);V(y,r[m]),n[m++]=y}for(;h<=g;){let y=a[h++];y!==null&&Ut(y)}return this.Pt=o,mt(i,n),k}}),Je="important",pa=" !"+Je,Xa=E(class extends P{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let s of this.Mt)t[s]==null&&(this.Mt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let a=t[s];if(a!=null){this.Mt.add(s);let r=typeof a=="string"&&a.endsWith(pa);s.includes("-")||r?e.setProperty(s,r?a.slice(0,-11):a,r?Je:""):e[s]=a}}return k}}),Za=E(class extends P{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?k:(this.At=i,document.importNode(i.content,!0))}}),st=class extends P{constructor(t){if(super(t),this.gt=u,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this.kt=void 0,this.gt=t;if(t===k)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};st.directiveName="unsafeHTML",st.resultType=1;var Qa=E(st);var gt=class extends st{};gt.directiveName="unsafeSVG",gt.resultType=2;var U=E(gt),Oe=i=>!ia(i)&&typeof i.then=="function",He=1073741823;var Yt=class extends ft{constructor(){super(...arguments),this.Ot=He,this.Ut=[],this.ft=new It(this),this.vt=new zt}render(...t){return t.find(e=>!Oe(e))??k}update(t,e){let s=this.Ut,a=s.length;this.Ut=e;let r=this.ft,o=this.vt;this.isConnected||this.disconnected();for(let d=0;d<e.length&&!(d>this.Ot);d++){let n=e[d];if(!Oe(n))return this.Ot=d,n;d<a&&n===s[d]||(this.Ot=He,a=0,Promise.resolve(n).then(async c=>{for(;o.get();)await o.get();let p=r.deref();if(p!==void 0){let h=p.Ut.indexOf(n);h>-1&&h<p.Ot&&(p.Ot=h,p.setValue(c))}}))}return k}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Ga=E(Yt);var ha=Symbol.for(""),ua=i=>{if(i?.r===ha)return i?._$litStatic$};var Le=new Map,Ke=i=>(t,...e)=>{let s=e.length,a,r,o=[],d=[],n,c=0,p=!1;for(;c<s;){for(n=t[c];c<s&&(r=e[c],(a=ua(r))!==void 0);)n+=a+t[++c],p=!0;c!==s&&d.push(r),o.push(n),c++}if(c===s&&o.push(t[s]),p){let h=o.join("$$lit$$");(t=Le.get(h))===void 0&&(o.raw=o,Le.set(h,t=o)),e=d}return i(t,...e)},ti=Ke(l),ei=Ke(Gs);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var O={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />'};var Xe="./fonts/barlow-400.woff2";var Ze="./fonts/barlow-500.woff2";var Qe="./fonts/barlow-600.woff2";var Ge="./fonts/barlow-condensed-500.woff2";var ts="./fonts/barlow-condensed-600.woff2";var es="./fonts/barlow-condensed-700.woff2";var ss='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',as=`"RV Barlow", ${ss}`,is=`"RV Barlow Condensed", ${ss}`;function rs(){if(document.getElementById("resolvia-fonts"))return;let i=(e,s,a)=>`@font-face{font-family:"${e}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,t=document.createElement("style");t.id="resolvia-fonts",t.textContent=[i("RV Barlow",Xe,400),i("RV Barlow",Ze,500),i("RV Barlow",Qe,"600 900"),i("RV Barlow Condensed",Ge,500),i("RV Barlow Condensed",ts,600),i("RV Barlow Condensed",es,"700 900")].join(`
`),document.head.appendChild(t)}var se=()=>l`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var _a="(min-width: 1000px)";function os(i,t=""){if(!i.touches||i.touches.length!==1||window.matchMedia&&window.matchMedia(_a).matches)return null;let e=i.touches[0];if(e.clientX<24||e.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${t?`, ${t}`:""}`;for(let a of i.composedPath()){if(a===i.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let r=getComputedStyle(a);if((r.overflowX==="auto"||r.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:e.clientX,y:e.clientY,at:Date.now()}}function ns(i,t){if(!t||!i.changedTouches||!i.changedTouches.length)return 0;let e=i.changedTouches[0],s=e.clientX-t.x,a=e.clientY-t.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-t.at>800?0:s<0?1:-1}async function ae(i,t,e){for(let a=0;a<30&&i._view().name!==t;a++)await new Promise(r=>setTimeout(r,16));await i.updateComplete;let s=i.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${e>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var ls=Re`
  :host {
    --rv-body: ${G(as)};
    --rv-display: ${G(is)};
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
  .mais-head + .panel-lead {
    margin-top: 0;
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
  .suggest-ai {
    padding-bottom: 14px;
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
  .filters {
    display: flex;
    gap: 8px;
    margin: 0 0 18px;
    flex-wrap: wrap;
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
  .toast.has-sheet {
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
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
    padding: 14px 2px;
    border-bottom: 1px solid var(--rv-line);
  }
  .opts .ot {
    flex: 1;
    min-width: 0;
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
  .opts .btn {
    flex: none;
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

  /* ---------- Mais: tabs at the top (same as the CronologIA) ---------- */
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
  /* six tabs: they keep their width and the bar scrolls sideways when the screen is narrow */
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
  /* phones: smaller so the six fit (below ~400 px the bar scrolls sideways) */
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
`;var cs=["dom","seg","ter","qua","qui","sex","s\xE1b"],ds={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es"},ps={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},B=i=>String(i).padStart(2,"0"),ie=i=>`${i.getFullYear()}-${B(i.getMonth()+1)}-${B(i.getDate())}`,Ot=i=>{let[t,e,s]=i.split("-").map(Number);return new Date(t,e-1,s)},ms=i=>String(Math.round(i*10)/10).replace(".",","),hs=i=>i>=1e3?`${ms(i/1e3)} mil`:String(Math.round(i||0)),us=i=>`${i} ${i===1?"chamada":"chamadas"}`,$a=(i,t={})=>t[i]||(i||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",wa=(i,t)=>{let e=new Date(i);if(!Number.isFinite(e.getTime()))return"";let s=`${B(e.getHours())}:${B(e.getMinutes())}`;return ie(e)===ie(t)?`hoje ${s}`:`${B(e.getDate())}/${B(e.getMonth()+1)} ${s}`};function ya(i){let t=i.join(" ").toLowerCase();return/google|gemini/.test(t)?l`Consumo exato do Gemini: no <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener">Google Cloud Console</a>, abra APIs e serviços ativados → Generative Language API; o gráfico de tráfego mostra os pedidos e os erros 429 de cota. Os limites do plano grátis estão no <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a>.`:/openai|chatgpt|gpt/.test(t)?l`Consumo exato e custo da OpenAI: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener">platform.openai.com/usage</a>.`:/anthropic|claude/.test(t)?l`Consumo exato e custo da Anthropic: <a href="https://platform.claude.com/usage" target="_blank" rel="noopener">Claude Console → Usage</a>.`:"O consumo exato e o custo ficam no painel do provedor da sua IA (Google, OpenAI, Anthropic\u2026)."}function fs({u:i,day:t,onDay:e,head:s,app:a,using:r="",names:o={}}){if(!i||!i.hoje)return l`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let d=new Date,n=ie(d),c=x=>x.cota?l`<span class="s alert">${x.cota} ${x.cota>1?"vezes":"vez"} sem cota</span>`:x.erros?l`<span class="s alert">${x.erros} com erro</span>`:l`<span class="s">≈ ${hs(x.tokens)} tokens</span>`,p=(x,w)=>l`<div class="uso-tile"><span class="k">${x}</span><span class="v">${w.chamadas||0}</span>${c(w)}</div>`,h=i.dias||[],g=Math.max(1,...h.map(x=>x.chamadas||0)),m=h.find(x=>x.dia===t)||h.find(x=>x.dia===n)||{dia:n,chamadas:0,erros:0,cota:0},v=x=>x.dia===n?"hoje":cs[Ot(x.dia).getDay()],y=i.semana&&i.semana.tipos||{},S=[...Object.keys(i.mes&&i.mes.ias||{}),...Object.keys(i.semana&&i.semana.ias||{}),r],z=i.ultimas||[];return l`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${p("Hoje",i.hoje)}${p("7 dias",i.semana)}${p("Este m\xEAs",i.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${h.map(x=>{let w=x.chamadas?Math.max(4,Math.round(x.chamadas/g*100)):0;return l`<button type="button" class="uso-bar ${x.dia===n?"today":""}" aria-pressed=${x.dia===m.dia?"true":"false"} aria-label="${v(x)}: ${us(x.chamadas)}" @click=${()=>e(x.dia)}><i style="height:${w}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${h.map(x=>l`<span>${v(x)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${m.dia===n?"Hoje":`${cs[Ot(m.dia).getDay()]}, ${B(Ot(m.dia).getDate())}/${B(Ot(m.dia).getMonth()+1)}`}: <b>${us(m.chamadas)}</b>${m.erros?`, ${m.erros} com erro`:""}${m.cota?`, ${m.cota} sem cota`:""}.</p>
    ${Object.keys(y).length?l`<ul class="uso-kinds">${Object.keys(y).sort((x,w)=>y[w]-y[x]).map(x=>l`<li>${ds[x]||x} <b>${y[x]}</b></li>`)}</ul>`:u}
    <details class="uso-last">
      <summary>Últimas chamadas</summary>
      <ul>
        ${z.length?z.map(x=>l`<li><b>${ds[x.tipo]||x.tipo}</b><span>${$a(x.ia,o)}</span>${ps[x.resultado]?l`<span class="r-err">${ps[x.resultado]}</span>`:u}
                <span class="t">${ms(x.segundos)} s · ≈ ${hs(x.tokens)} tokens${x.imagens?` \xB7 ${x.imagens} ${x.imagens>1?"imagens":"imagem"}`:""} · ${wa(x.quando,d)}</span></li>`):l`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    <p class="uso-note">${ya(S)} A estimativa de tokens daqui conta só o texto; as imagens e as instruções da IA somam mais.</p>
    <p class="uso-note">${i.sensor_on===!1?l`Para ter o sensor <code>${i.sensor}</code> no Home Assistant (as chamadas de hoje, com erros, cota e tokens estimados), ligue <b>Sensores no Home Assistant</b>, logo abaixo.`:l`No Home Assistant, o sensor <code>${i.sensor}</code> traz as chamadas de hoje do ${a}, com erros, cota e tokens estimados, para pôr num painel ou numa automação.`}</p>
  </div>`}var gs=`
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
`;var re="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",ka="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function vs({theme:i,onTheme:t,icon:e}){return l`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Autom\xE1tico","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,r])=>l`<button type="button" class=${i===s?"on":""} role="radio" aria-checked=${i===s?"true":"false"} @click=${()=>t(s)}>${e(r)}<span>${a}</span></button>`)}
  </div>`}function xs({palette:i,value:t,onPick:e}){return l`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${i.map(s=>l`<button type="button" class="tsw ${t===s.id?"on":""}" role="radio" aria-checked=${t===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>e(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${re}></path><path class="sw-gap" d=${re}></path><path class="sw-fill" d=${re+ka}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var bs=`
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
`;var _={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},$=(i,t)=>((i||0)&t)===t,at=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"framboesa",label:"Framboesa",fill:"#E8508A",ink:"#A3124F"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"grafite",label:"Grafite",fill:"#B9ADAE",ink:"#5E5253"}],_s=["vermelho","coral","rosa","laranja","framboesa","ouro"],it=i=>at.find(t=>t.id===i),$s=i=>it(_s[i%_s.length]);function Lt(i,t){let e=i.replace("#",""),s=parseInt(e.length===3?e.replace(/./g,a=>a+a):e,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${t})`}function M(i,t,e="c"){return`--${e}:${i.fill};--${e}i:${t?i.fill:i.ink};--${e}s:${Lt(i.fill,t?.17:.15)};`}var rt=i=>(i||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),ws=i=>Array.from(i||"",t=>{let e=t.normalize("NFD")[0]||t;return e.toLowerCase().length===1?e.toLowerCase():t}).join(""),b=(i,t,e)=>`${i} ${i===1?t:e}`,ys=i=>String(i||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),T=(i,t=38)=>i.length>t?i.slice(0,t-1).trimEnd()+"\u2026":i;function ks(i,t){let e=i.states[t],s=e&&e.attributes&&e.attributes.friendly_name||t.split(".")[1].replace(/_/g," "),a=i.entities&&i.entities[t],r=a&&a.device_id&&i.devices?i.devices[a.device_id]:void 0,o=r?r.name_by_user||r.name:void 0,d=s,n=o||null;return o&&s.toLowerCase().startsWith(o.toLowerCase()+" ")&&(d=s.slice(o.length+1)),d=d.charAt(0).toUpperCase()+d.slice(1),{name:d,group:n}}var Aa=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/pet|cachorro|dog/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function ne(i){let t=rt(i);for(let[e,s]of Aa)if(e.test(t))return s;return"list-checks"}var As=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],Ma=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],Sa=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Ht=i=>String(i).padStart(2,"0"),tt=i=>`${i.getFullYear()}-${Ht(i.getMonth()+1)}-${Ht(i.getDate())}`,Ta=i=>`${Ht(i.getHours())}:${Ht(i.getMinutes())}`;function Rt(i){let[t,e,s]=i.split("-").map(Number);return new Date(t,e-1,s)}function oe(i,t){let e=new Date(i.getFullYear(),i.getMonth(),i.getDate());return e.setDate(e.getDate()+t),e}function j(i){if(!i)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(i)){let e=Rt(i);return{date:i,time:null,at:new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59)}}let t=new Date(i);return isNaN(t)?null:{date:tt(t),time:Ta(t),at:t}}function le(i,t=new Date){let e=Rt(i),s=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-s)/864e5)}function ce(i,t=new Date){let e=Rt(i),s=`${e.getDate()} ${Sa[e.getMonth()]}`;return e.getFullYear()===t.getFullYear()?s:`${s} ${e.getFullYear()}`}function W(i,t=new Date){let e=j(i);if(!e)return null;let s=le(e.date,t),a=e.at<t,r;s===0?r="Hoje":s===1?r="Amanh\xE3":s===-1?r="Ontem":s>1&&s<7?r=Ma[Rt(e.date).getDay()]:r=ce(e.date,t),e.time&&(r+=`, ${e.time}`);let o=a?"late":s===0?"today":s<=2?"soon":"later";return{...e,diff:s,overdue:a,text:r,tone:o}}function Ms(i=new Date){let t=i.getDay(),e=(6-t+7)%7||7,s=(1-t+7)%7||7,a=[{label:"Hoje",date:tt(i)},{label:"Amanh\xE3",date:tt(oe(i,1))}];return e>1&&a.push({label:"S\xE1bado",date:tt(oe(i,e))}),s>1&&a.push({label:"Pr\xF3x. semana",date:tt(oe(i,s))}),a}function Ss(i,t=new Date){let e=t.getHours(),s=e>=5&&e<12?"Bom dia":e>=12&&e<18?"Boa tarde":"Boa noite",a=(i||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var Ia=/\bhttps?:\/\/[^\s<>"'`]+/gi;function za(i){let t;try{t=new URL(i)}catch{return{label:i,icon:"link"}}let e=t.hostname.replace(/^www\./,""),s=t.pathname.split("/").filter(Boolean);if(e==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${e} \u203A ${a}`,icon:"link"}:{label:e,icon:"link"}}function Ts(i){let t=[],e=0,s=i||"";for(let a of s.matchAll(Ia)){let r=a[0],o=r.match(/[.,;:!?)\]}]+$/);o&&(r=r.slice(0,-o[0].length)),a.index>e&&t.push({text:s.slice(e,a.index)}),t.push({url:r,...za(r)}),e=a.index+r.length}return e<s.length&&t.push({text:s.slice(e)}),t}var Ea=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-]|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,Ca=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function de(i){let t=(i||"").split(/\r?\n/).map(a=>a.replace(Ca,"").trim()).filter(Boolean);t.length===1&&/[,;]|\se\s/i.test(t[0])&&(t=t[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let e=new Set,s=[];for(let a of t){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(Ea,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let r=a.toLowerCase();e.has(r)||(e.add(r),s.push(a.slice(0,255)))}return s}async function pe(i,t=1800){let e=s=>new Promise((a,r)=>{let o=new FileReader;o.onload=()=>a(String(o.result).split(",")[1]||""),o.onerror=()=>r(o.error),o.readAsDataURL(s)});try{let s=await createImageBitmap(i,{imageOrientation:"from-image"}),a=Math.min(1,t/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*a),r.height=Math.round(s.height*a),r.getContext("2d").drawImage(s,0,0,r.width,r.height),s.close&&s.close();let o=await new Promise(d=>r.toBlob(d,"image/jpeg",.86));return{mime:"image/jpeg",data:await e(o),url:URL.createObjectURL(o)}}catch{return{mime:i.type||"image/jpeg",data:await e(i),url:URL.createObjectURL(i)}}}var Y=(i,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(O[i]||O["list-checks"])}</svg>`,Pa=i=>i>1048576?`${(i/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(i/1024))} KB`,Oa={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar"},Is=i=>class extends i{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(t){let e=new Date(t),s=a=>String(a).padStart(2,"0");return`${s(e.getDate())}/${s(e.getMonth()+1)}/${e.getFullYear()} \xE0s ${s(e.getHours())}:${s(e.getMinutes())}`}async _loadBackups(){let t=this._data();if(t){try{this._backups=await t.backups()}catch(e){this._backups={available:!1,error:e.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let t=await this._data().createBackup();this._showToast(`Backup salvo em ${t.folder}/${t.name}`),this._haptic("success"),await this._loadBackups()}catch(t){this._showToast(`N\xE3o consegui criar o backup. ${t.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(t,e){let s=this._data();(!s||!s.url(t))&&(e.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(t,e){let s=t.added||t.added===0?`${e}: ${t.added?b(t.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${b(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${e}: ${b(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return t.missing&&t.missing.length&&(s+=`. ${t.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${t.missing.join(", ")}`),t.unsupported&&(s+=`. ${b(t.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),t.failed&&(s+=`. ${b(t.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let t=this.renderRoot.querySelector("#rv-data-import");t&&(t.value="",t.click())}_onDataImport(t){let e=t.target.files&&t.target.files[0];t.target.value="",e&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${T(e.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(e);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(t){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(t.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let e=await this._data().restoreBackup(t.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(e,"Backup restaurado"))}catch(e){this._showToast(e.message)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let t=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:t})}catch(t){this._sheet==="versions"&&(this._form={...this._form,error:t.message})}}_confirmRestoreVersion(t){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(t.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(t.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(e){this._showToast(e.message)}}})}_renderVersions(){let t=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${Y("x")}</button>
        </div>
        ${t.error?l`<div class="imp-error">${Y("circle-alert")}<span>${t.error}</span></div>`:t.list==null?l`<div class="imp-loading"><span class="spin">${Y("loader-circle")}</span><span>Carregando…</span></div>`:t.list.length?l`<div class="data-list">
                  ${t.list.map(e=>l`<div class="data-item">
                      <div><b>${this._dateTime(e.when)}</b><span>${b(e.lists,"lista personalizada","listas personalizadas")} · ${b(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${Oa[e.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(e)}>Restaurar</button>
                    </div>`)}
                </div>`:l`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let t=this._data();if(!t)return u;let e=this._backups,s=(a,r,o,d)=>l`<li>
        <div class="ot"><b>${r}</b><span>${o}</span></div>
        <a class="btn outline sm" href=${t.url(a)||"#"} download @click=${n=>this._exportData(a,n)}>${Y("download")}${d}</a>
      </li>`;return l`<div id="dados">
        <div class="panel">
          ${this._secHead("download","Exportar","Baixe para guardar ou levar para outro programa. Os arquivos s\xE3o abertos e leg\xEDveis.")}
          <ul class="opts">
            ${s("csv","Planilha (CSV)","Abre no Excel e no Google Planilhas, com um item por linha.","Baixar CSV")}
            ${s("json","Dados completos (JSON)","Todos os campos, para backup ou para outro sistema.","Baixar JSON")}
            ${s("zip","Tudo (ZIP)","Todas as listas com os itens (prazo, notas e conclu\xEDdos), a planilha e os ajustes do app num arquivo s\xF3.","Baixar ZIP")}
          </ul>
        </div>
        <div class="panel">
          ${this._secHead("archive","Backup na pasta share",l`Cria uma cópia completa em <code>share/resolvia</code>, que você acessa pela rede do Home Assistant. Os backups do próprio Home Assistant também incluem o ResolvIA e as listas locais.`)}
          <div class="btn-row sec-actions">
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||e&&e.available===!1} @click=${()=>this._createBackup()}>${Y("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${e&&e.available===!1?l`<p class="data-note">A pasta share não está disponível para o app.</p>`:u}
          ${e&&e.backups&&e.backups.length?l`<div class="data-list">
                ${e.backups.slice(0,8).map(a=>l`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${Pa(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${Y("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:u}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Traz de volta um .zip ou .json exportado pelo ResolvIA: nomes, cores e \xEDcones das listas, as tarefas que se repetem e os itens pendentes que estiverem faltando, sem duplicar. Antes de importar, o app guarda uma c\xF3pia do que existe hoje.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${Y("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","O app guarda sozinho uma c\xF3pia dos ajustes e das repeti\xE7\xF5es a cada 10 minutos de uso e antes de importar ou restaurar, e mant\xE9m as 3 mais recentes. Se algo sair errado, volte para uma delas.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${Y("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",l`Os itens ficam nas próprias listas do Home Assistant (locais, Google Tasks, Alexa…). O app guarda nomes, cores, ícones e as tarefas que se repetem em <code>/data/resolvia.json</code>, que entra no backup do Home Assistant.`)}
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var Dt=(i,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(O[i]||O["list-checks"])}</svg>`,zs=[5,10,20,30,50],vt=i=>String(i||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),Es=i=>{let t=/\[cr:[0-9a-f]{8}\]/.exec(String(i||""));return t?t[0]:""},Ha={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},Cs=i=>class extends i{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let t=this._pts;return!!(t&&t.on&&t.placar&&t.placar.ativo)}_rawPoints(t,e){let s=this._pts&&this._pts.points&&this._pts.points[t];return s&&s[ys(e)]||0}_mirrored(t,e){let s=this._pts&&this._pts.espelho&&this._pts.espelho[t];return e&&s&&s[e]||null}_pointsOf(t,e,s=null){let a=this._mirrored(t,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(t,e):0}async _setTaskPoints(t,e,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:t,summary:e,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(r){this._showToast(`N\xE3o consegui salvar os pontos: ${r.message}`)}}async _setPointsOn(t){await this._saveAppPrefs({points_on:t?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(t,e,s,a,r=null){let o;try{o=await this.hass.callWS({type:"resolvia/points/done",entity_id:t.id,uid:e.uid,summary:e.summary,done:!0,...r?{quem:r}:{}})}catch(c){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${c.message}`,a);return}if(o&&o.ask){this._openSheet("who",{title:e.summary,points:o.points,participantes:o.participantes,run:c=>{this._closeSheet(!0),c?this._givePoints(t,e,s,a,c):this._showToast(s,a)}});return}if(!o||!o.points){this._showToast(s,a);return}let d=`Resolvido por ${o.who} \xB7 +${o.points}`,n=(o.participantes||[]).filter(c=>c!==o.who);if(n.length===1){let c=n[0];this._showToast(d,{label:`Foi ${c}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:o.key,quem:c}).then(()=>this._showToast(`Pontos para ${c}`)).catch(p=>this._showToast(p.message))})}else this._showToast(d,a)}_takePoints(t,e){!this._mirrored(t.id,e.uid)&&(!this._rawPoints(t.id,e.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:t.id,uid:e.uid,summary:e.summary,done:!1}).catch(()=>{})}_renderPointsTag(t,e){let s=this._pointsOf(t,e.summary,e.uid);return s?l`<span class="tag pts" title="${s} pontos para quem concluir">${Dt("trophy")}+${s}</span>`:u}_renderPointsField(t){if(t.mirrored)return u;if(!(this._pts&&this._pts.on))return u;let e=this._pts.placar,s=t.points||0,a=t.pointsCustom||s>0&&!zs.includes(s);return l`<div class="field">
        <span class="flabel">Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>Sem pontos</button>
          ${zs.map(r=>l`<button class="pick ${s===r&&!a?"on":""}" @click=${()=>this._setForm({points:r,pointsCustom:!1})}>+${r}</button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${Dt("trophy")}<span>Outro</span></button>
        </div>
        ${a?l`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${r=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(r.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:u}
        ${s?l`<div class="field-hint">${Dt("trophy")}<span>${e&&e.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${e.participantes.join(" \xD7 ")}).`:e&&e.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA: os pontos valem quando ela for ligada.":"O placar do CronologIA est\xE1 desligado: os pontos valem quando ele for ligado."}</span></div>`:u}
      </div>`}_renderWhoSheet(){let t=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">Quem fez?</h3>
          <button class="icon-btn" @click=${()=>t.run("")} aria-label="Fechar">${Dt("x")}</button>
        </div>
        <p class="sheet-note top">${T(t.title||"",40)} · <b>+${t.points} pontos</b></p>
        <div class="who-grid">
          ${(t.participantes||[]).map(e=>l`<button class="who-btn" @click=${()=>t.run(e)}><span class="who-av">${(e||"?").trim().charAt(0).toUpperCase()}</span><b>${e}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>t.run("")}>Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let t=this._pts;if(!t)return u;let e=t.placar,s=!!t.on,a=Object.values(t.points||{}).reduce((d,n)=>d+Object.keys(n).length,0),r=l`<div class="row switch-row">
          <div class="grow">
            <div class="label">Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${b(a,"tarefa vale","tarefas valem")} pontos. Para mudar, abra o item e escolha \u201CPontos para quem concluir\u201D.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D. Quem concluir ganha os pontos no placar.":"Desligado: as tarefas n\xE3o valem pontos e nada vai para o placar do CronologIA."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${d=>this._setPointsOn(d.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return l`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","As tarefas daqui podem valer pontos no placar da casa do CronologIA, para quem concluir.")}
          ${r}
        </div>`;let o=e?e.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${e.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:e.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${e.versao}`.trim(),text:`${e.participantes.join(" \xD7 ")} \xB7 fecha ${Ha[e.periodo]||"toda semana"}. ${e.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${e.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${e.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return l`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","As tarefas daqui podem valer pontos no placar da casa do CronologIA, para quem concluir.")}
        ${r}
        <div class="ai-state ${o.tone}" style="margin-bottom:16px"><span class="dot"></span><div><b>${o.title}</b><span>${o.text}</span></div></div>
      </div>`}};var Vt=(i,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(O[i]||O["list-checks"])}</svg>`,La=864e5,Ps=5,Ra=2;function he(i){return i<14?b(i,"dia","dias"):i<60?b(Math.floor(i/7),"semana","semanas"):i<730?b(Math.floor(i/30),"m\xEAs","meses"):b(Math.floor(i/365),"ano","anos")}function Da(i,t=Date.now()){let e=Math.max(0,Math.round((t-i)/6e4));if(e<1)return"agora h\xE1 pouco";if(e<60)return`h\xE1 ${e} min`;let s=Math.floor(e/60);return s<24?`h\xE1 ${s} h`:`h\xE1 ${b(Math.floor(s/24),"dia","dias")}`}var Os=i=>i.icon==="shopping-cart",Hs=i=>class extends i{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let t=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=t.ages||{},t.ai&&(!this._aiPick||t.ai.at>this._aiPick.at)&&(this._aiPick=t.ai)}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(t,e,s=new Date){if(this._sinceDate(t,e))return Math.max(0,-le(j(e.due).date,s));let a=this._ages&&this._ages[t.id]&&e.uid?this._ages[t.id][e.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/La)):null}_sinceDate(t,e){return!t.canDue&&!!e.due&&!!j(e.due)}_suggestLists(){return this._visible().filter(t=>!t.unavailable&&t.items&&$(t.features,_.UPDATE))}_suggestions(){let t=new Date,e=[],s=[],a=0,r=0;for(let n of this._suggestLists()){let c=n.items.filter(p=>p.status!=="completed");if(c.length){if(a+=c.length,r++,Os(n)){let p=c.map(h=>this._ageOf(n,h,t)).filter(h=>h!=null);s.push({l:n,n:c.length,oldest:p.length?Math.max(...p):null});continue}c.forEach((p,h)=>{let g=[],m=0,v=this._ageOf(n,p,t);v!=null&&v>=3&&(m+=Math.min(v,60)/3,g.push(this._sinceDate(n,p)?`Assim h\xE1 ${he(v)}`:`Na lista h\xE1 ${he(v)}`)),c.length===1?(m+=8,g.push("\xC9 o \xFAltimo da lista")):c.length===2&&(m+=4,g.push("Faltam 2 para zerar a lista"));let y=this._pointsOf(n.id,p.summary,p.uid);y&&(m+=3+Math.min(y,50)/10),this._ruleFor(n.id,p)&&(m+=4,g.push("Voltou para fazer"));let S=n.canDue&&p.due?W(p.due,t):null;if(S&&S.diff<=0){m+=S.diff<0?6:5;let z=this._mirrored(n.id,p.uid);g.push(z?`${z.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${S.diff<0?"atrasada":"para hoje"}`:S.diff<0?"A data j\xE1 passou":"Tem data para hoje")}h===0&&(m+=1.5),g.length||g.push(y?"Vale pontos":h===0?"Primeiro da lista":`${h+1}\xBA da lista`),e.push({l:n,i:p,idx:h,score:m,why:g.join(" \xB7 ")})})}}e.sort((n,c)=>c.score-n.score||n.idx-c.idx);let o=[],d=new Map;for(let n of e){if(n.score<=0)continue;let c=d.get(n.l.id)||0;if(!(c>=Ra)&&(d.set(n.l.id,c+1),o.push(n),o.length>=Ps))break}for(let n of e){if(o.length>=Ps)break;o.includes(n)||o.push(n)}return s.sort((n,c)=>c.n-n.n),{top:o,shopping:s,pending:a,lists:r}}async _askAi(){if(this._aiBusy)return;let t=new Date,e=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let r=this._ruleFor(s.id,a);e.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,t),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:r?r.days:0,compras:Os(s)})}if(e.length){this._aiBusy=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:e.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiBusy=!1,this.requestUpdate()}}_renderAiSuggest(){if(!this._aiOn()||!this.hass.resolvia)return u;let t=this._aiInfo(),e=this._aiPick,s=[];if(e)for(let o of e.picks||[]){let[d,n]=[o.key.slice(0,o.key.indexOf("|")),o.key.slice(o.key.indexOf("|")+1)],c=this._list(d),p=c&&c.items&&c.items.find(h=>h.uid===n);c&&p&&(p.status!=="completed"||this._recent.has(p.uid))&&s.push({l:c,i:p,why:o.motivo})}let a=this._aiBusy,r=l`<button class="btn ${e?"outline":"primary"} ai-ask" ?disabled=${a||!t.ready} @click=${()=>this._askAi()}>
        ${Vt(a?"loader-circle":"sparkles",a?"ai-spin":"")}${a?"Pensando\u2026":e?"Sugerir de novo":"Sugerir com IA"}
      </button>`;return l`<div class="panel items suggest-ai">
        ${this._secHead("sparkles","Pedir \xE0 IA","A IA do Home Assistant olha as listas e escolhe o que resolver agora, com o porqu\xEA. S\xF3 roda quando voc\xEA toca e entra no Uso da IA.")}
        ${s.length?R(s,o=>o.l.id+o.i.uid,o=>this._renderItem(o.l,o.i,{showList:!0,why:o.why,whyIcon:"sparkles"})):e?l`<p class="ai-note">Tudo o que a IA sugeriu já foi resolvido.</p>`:u}
        ${e?l`<p class="ai-note">Sugerido ${Da(e.at)}${e.provider?` por ${e.provider}`:""}.</p>`:u}
        ${!t.ready&&t.reason?l`<p class="ai-note">${t.reason}</p>`:u}
        ${this._aiErr?l`<p class="ai-note err">${this._aiErr}</p>`:u}
        <div class="ai-actions">${r}</div>
      </div>`}_renderSuggest(){let t=this._suggestions();return l`
        <section class="page">
          ${this._renderPageHead("Sugest\xF5es",{text:t.pending?`${b(t.pending,"pendente","pendentes")} em ${b(t.lists,"lista","listas")}`:"Nada pendente"})}
          ${t.pending?l`
                ${t.top.length?l`<div class="panel items">
                      <div class="overline">Comece por aqui · ${t.top.length}</div>
                      ${R(t.top,e=>e.l.id+(e.i.uid||e.i.summary),e=>this._renderItem(e.l,e.i,{showList:!0,why:e.why}))}
                    </div>`:u}
                ${t.shopping.length?l`<div class="panel">
                      <div class="overline">Compras</div>
                      ${t.shopping.map(e=>l`<button class="list-card" style=${M(e.l.color,this._dark)} @click=${()=>this._go(`/lista/${e.l.id}`)}>
                          <span class="tile">${Vt(e.l.icon)}</span>
                          <span class="lc-main">
                            <span class="lc-title">${e.l.name}</span>
                            <span class="lc-meta"><span>${e.oldest!=null&&e.oldest>=3?`O mais antigo est\xE1 h\xE1 ${he(e.oldest)}`:b(e.n,"item para comprar","itens para comprar")}</span></span>
                          </span>
                          <span class="lc-num">${e.n}</span>
                        </button>`)}
                    </div>`:u}
                ${this._renderAiSuggest()}
                <p class="suggest-foot">${Vt("info")}<span>As sugestões olham há quanto tempo cada item está na lista, o que fecha uma lista, os pontos, as repetições e as datas do CronologIA. Mude em Mais › Opções › Prazos.</span></p>
              `:l`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${Vt("lightbulb")}</div>
                  <h3>Nada para sugerir</h3>
                  <p>Todas as listas estão em dia. Quando aparecer algo pendente, as sugestões aparecem aqui.</p>
                </div>
              </div>`}
        </section>
      `}};var Ft=class{constructor(t){this.onLevel=t,this.chunks=[],this.length=0,this.rate=16e3}async start(){let t=navigator.mediaDevices;if(!t||!t.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await t.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let e=window.AudioContext||window.webkitAudioContext;try{this.ctx=new e({sampleRate:16e3})}catch{this.ctx=new e}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let r=0;for(let o=0;o<a.length;o+=4)r+=a[o]*a[o];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(r/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let t=new Float32Array(this.length),e=0;for(let o of this.chunks)t.set(o,e),e+=o.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(t.length/s),r=new Int16Array(a);for(let o=0;o<a;o++){let d=Math.floor(o*s),n=Math.max(d+1,Math.min(t.length,Math.floor((o+1)*s))),c=0;for(let h=d;h<n;h++)c+=t[h];let p=Math.max(-1,Math.min(1,c/(n-d)));r[o]=p<0?p*32768:p*32767}return r}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let t of this.stream.getTracks())t.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function Ls(i){let t=i&&i.name||"";return t==="NotAllowedError"||t==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":t==="NotFoundError"||t==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":t==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":t==="NoApi"?"Este navegador n\xE3o deixa usar o microfone aqui. Abra o Home Assistant pelo endere\xE7o com https (como o do Nabu Casa) ou pelo app.":`N\xE3o consegui abrir o microfone (${i&&i.message||t||"erro"}).`}var ue="2.22.0",Rs="resolvia.theme",me="resolvia.prefs",qt="resolvia.lastList",f=(i,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U(O[i]||O["list-checks"])}</svg>`,D={get(i,t){try{let e=localStorage.getItem(i);return e==null?t:JSON.parse(e)}catch{return t}},set(i,t){try{localStorage.setItem(i,JSON.stringify(t))}catch{}}},H=i=>i.status==="completed",Ds=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],I=i=>i.uid||i.summary,fe=class extends Hs(Cs(Is(N))){static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_rules:{state:!0},_cam:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[ls,G(gs),G(bs)];constructor(){super(),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._theme=D.get(Rs,"auto"),this._doneOpen={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),rs(),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=t=>{if(t.key!=="/"||t.ctrlKey||t.metaKey||t.altKey||this._sheet)return;let e=t.composedPath&&t.composedPath()[0]||t.target;e&&e.closest&&e.closest("input, textarea, select, [contenteditable]")||(t.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let t=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(t){this._focusSearch=!1,t.focus({preventScroll:!0});try{t.setSelectionRange(t.value.length,t.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,t]of this._subs)this._unsub(t);this._subs.clear();for(let[,t]of this._recent)clearTimeout(t);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(t=>t&&t()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this.hass||e.themes!==this.hass.themes||e.entities!==this.hass.entities||e.devices!==this.hass.devices||e.user!==this.hass.user||e.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(r=>r.startsWith("todo.")),a=Object.keys(e.states).filter(r=>r.startsWith("todo."));return s.length!==a.length?!0:s.some(r=>e.states[r]!==this.hass.states[r])}willUpdate(t){t.has("route")&&this.route&&(this._path=this.route.path||""),t.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(t.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}updated(t){if(this.toggleAttribute("dark",this._dark),t.has("_path")&&this._view().name==="more"){let e=this.renderRoot.querySelector(".more-tabs"),s=e&&e.querySelector("button.on");if(s){let r=s.offsetLeft,o=r+s.offsetWidth;r<e.scrollLeft?e.scrollLeft=r-8:o>e.scrollLeft+e.clientWidth&&(e.scrollLeft=o-e.clientWidth+8)}let a=this._view().tab;a==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadUsage()),a==="dados"&&this._loadBackups()}this._view().name==="search"&&(this._focusSearch||t.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="suggest"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}firstUpdated(){this._checkHeight()}_checkHeight(){if(this.hasAttribute("vh"))return;let t=this.getBoundingClientRect().height;(t>window.innerHeight+4||t<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(t=>t.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let t=this._todoIds();for(let e of t)this._subs.has(e)||this._subscribe(e);for(let[e,s]of[...this._subs])if(!t.includes(e)){this._unsub(s),this._subs.delete(e),this._polling.delete(e);let a=new Map(this._items);a.delete(e),this._items=a}}_subscribe(t){let e=this.hass.connection.subscribeMessage(s=>this._setItems(t,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:t}).catch(()=>(this._polling.add(t),this._fetchItems(t),null));this._subs.set(t,e)}_unsub(t){Promise.resolve(t).then(e=>typeof e=="function"&&e()).catch(()=>{})}async _fetchItems(t){try{let e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._setItems(t,e&&e.items||[])}catch{this._setItems(t,this._items.get(t)||[])}}_refreshPolled(t){if(!(!t||!this._polling.size))for(let e of this._polling)t.states[e]!==this.hass.states[e]&&this._fetchItems(e)}_setItems(t,e){let s=new Map(this._items);s.set(t,e),this._items=s}_patchItem(t,e,s){let a=this._items.get(t);a&&this._setItems(t,a.map(r=>I(r)===e?{...r,...s}:r))}_computeLists(){let t=this._prefs&&this._prefs.lists||{},e=!this._dueOn(),a=this._todoIds().map(r=>{let o=this.hass.states[r],d=ks(this.hass,r);return{id:r,st:o,meta:d}});return a.sort((r,o)=>(r.meta.group||"").localeCompare(o.meta.group||"","pt-BR")||r.meta.name.localeCompare(o.meta.name,"pt-BR")),a.map(({id:r,st:o,meta:d},n)=>{let c=t[r]||{},p=this._items.get(r),h=p?p.filter(A=>!H(A)):null,g=h?h.length:Number(o.state)||0,m=p?p.length-h.length:0,v=it(c.color)||$s(n),y=o.attributes.supported_features||0,S=$(y,_.DUE_DATE)||$(y,_.DUE_DATETIME),z=!S||c.dates_info===!0,x=z||e,w=h&&!x?h.map(A=>W(A.due)).filter(Boolean):[];return{id:r,name:c.name||d.name,origName:d.name,group:d.group,color:v,colorId:c.color||null,icon:c.icon||ne(`${d.name} ${d.group||""} ${r}`),iconPref:c.icon||null,hidden:!!c.hidden,features:y,canDue:S,datesInfo:z,noDue:x,hasDates:!!(p&&p.some(A=>A.due)),unavailable:o.state==="unavailable"||o.state==="unknown",items:p,pending:g,done:m,late:w.filter(A=>A.overdue).length,today:w.filter(A=>!A.overdue&&A.diff===0).length}})}_list(t){return this._L.find(e=>e.id===t)}_visible(){return this._L.filter(t=>!t.hidden)}_app(t,e){let s=this._prefs&&this._prefs.app?this._prefs.app[t]:void 0;return s===void 0?e:s}_accent(){return it(this._app("accent","vermelho"))||at[0]}async _loadPrefs(){try{let t=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:t.lists||{},app:t.app||{}},this._prefsRemote=!0}catch{this._prefs=D.get(me,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(t,e){let s={...this._prefs.lists},a={...s[t]||{}};for(let[r,o]of Object.entries(e))o===null||o===""?delete a[r]:a[r]=o;if(Object.keys(a).length?s[t]=a:delete s[t],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let r=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:t,prefs:e});this._prefs={lists:r.lists||{},app:r.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else D.set(me,this._prefs)}async _saveAppPrefs(t){let e={...this._prefs.app};for(let[s,a]of Object.entries(t))a===null||a===""?delete e[s]:e[s]=a;if(this._prefs={...this._prefs,app:e},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:t});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else D.set(me,this._prefs)}_setTheme(t){this._theme=t,D.set(Rs,t)}_inHA(){return!!this.route}_view(){let t=(this._path||"").replace(/\/+$/,""),e;return(e=t.match(/^\/lista\/(todo\.[^/]+)$/))?{name:"list",id:decodeURIComponent(e[1])}:t==="/prazos"&&this._dueOn()?{name:"due"}:t==="/sugestoes"&&!this._dueOn()?{name:"suggest"}:t==="/buscar"?{name:"search"}:(e=t.match(/^\/mais(?:\/(repeticoes|integracoes|ia|dados|aparencia|opcoes))?$/))?{name:"more",tab:e[1]==="ia"?"integracoes":e[1]||"listas"}:{name:"home"}}_go(t,e=!1){this._sheet&&this._closeSheet(!0);let s=(history.state&&history.state.rvDepth||0)+(e?0:1);if(this._inHA()){let r=`/${this.panel&&this.panel.url_path||"resolvia"}${t}`;e?history.replaceState({rvDepth:s},"",r):history.pushState({rvDepth:s},"",r),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:e}}))}else e?history.replaceState({rvDepth:s,rvPath:t},""):history.pushState({rvDepth:s,rvPath:t},""),this._path=t;let a=this.renderRoot&&this.renderRoot.querySelector("main");a&&a.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_onSwipeStart(t){this._sw=this._sheet||this._cam?null:os(t)}_onSwipeEnd(t){let e=ns(t,this._sw);if(this._sw=null,!e||this._sheet)return;let s=this._dueOn(),a=[["home",""],["search","/buscar"],[s?"due":"suggest",s?"/prazos":"/sugestoes"],["more","/mais"]],r=this._view().name;if(r==="list"){if(e>0)return;this._haptic("light"),this._back(),ae(this,"home",e);return}let o=a.findIndex(([n])=>n===r),d=o+e;o<0||d<0||d>=a.length||(this._haptic("light"),this._goTab(a[d][1]),ae(this,a[d][0],e))}_goTab(t){let e=this._view().name;if(t===""){if(e==="home"){let s=this.renderRoot.querySelector("main");s&&s.scrollTo({top:0});return}this._back();return}this._go(t,e!=="home"&&e!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"")}_openSheet(t,e=null){let s=!!this._sheet;if(this._sheet=t,this._form=e,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(t=!1){this._sheet&&(this._stopVoice(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(t?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/mais/integracoes"),this.updateComplete.then(()=>{let t=this.renderRoot.querySelector("#leitura-ia");t&&t.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(t){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(t);history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(t){if(this.env&&this.env.haptic)return this.env.haptic(t);window.dispatchEvent(new CustomEvent("haptic",{detail:t}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(t=>this._rules=t&&t.rules||[],{type:"resolvia/recurring/subscribe"}).then(t=>(this._rulesOk=!0,t)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let t=this._app("repeat_on",void 0);return t===void 0?this._rules.length>0:t===!0}_ruleFor(t,e){return!e||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===t&&s.uid&&s.uid===e.uid)||e.status!=="completed"&&this._rules.find(s=>s.entity_id===t&&!s.uid&&s.match===e.summary)||null}_everyLabel(t){return t===1?"todo dia":t===7?"toda semana":t===14?"a cada 2 semanas":t===30?"todo m\xEAs":`a cada ${t} dias`}_returnLabel(t){let e=new Date(t),s=W(tt(e));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(t,e=Date.now()){let s=new Date(e);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+t).getTime()}_setRule(t,{uid:e,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:t,uid:e||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(t,e=null){clearTimeout(this._toastTimer),this._toast={text:t,action:e,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,e?4500:Math.min(8e3,Math.max(2600,t.length*55)))}async _call(t,e,s){try{return await this.hass.callService("todo",t,e,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",t,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(t,e){if(!$(t.features,_.UPDATE))return;let s=I(e),a=!H(e),r=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(t.id,s,{status:r}),!await this._call("update_item",{item:s,status:r},t.id)){this._patchItem(t.id,s,{status:e.status});return}let d=this._pointsOf(t.id,e.summary,e.uid),n=this._mirrored(t.id,e.uid);if(a){let c=this._ruleFor(t.id,e),p=c?` \xB7 volta ${this._returnLabel(this._reopenAt(c.days))}`:"",h={label:"Desfazer",run:()=>{this._patchItem(t.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},t.id),(d||n)&&this._takePoints(t,e)}};d?this._givePoints(t,e,`Resolvido: ${T(e.summary,18)}`,h):this._showToast(`Resolvido: ${T(e.summary,c?22:30)}${p}${n?" \xB7 volta com a pr\xF3xima data":""}`,h)}else(d||n)&&this._takePoints(t,e)}_quickAdd(t,e){t.preventDefault();let s=t.currentTarget.querySelector("input");this._addLines(e,[s.value],s)}_onQuickPaste(t,e){let s=t.clipboardData&&t.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(t.preventDefault(),this._addLines(e,s.split(/\r?\n/),t.currentTarget))}async _addLines(t,e,s){let a=e.map(o=>o.trim()).filter(Boolean);if(!a.length)return;let r=s.value;s.value="",s.focus(),this._haptic("light");for(let o of a)if(!await this._call("add_item",{item:o},t.id)){s.value=r||o;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(t,e,s,a){let r=t.features;return e?s&&$(r,_.DUE_DATETIME)?{due_datetime:`${e} ${s}:00`}:$(r,_.DUE_DATE)?{due_date:e}:$(r,_.DUE_DATETIME)?{due_datetime:`${e} ${s||"09:00"}:00`}:{}:a?$(r,_.DUE_DATE)?{due_date:null}:$(r,_.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(t,{summary:e,description:s,date:a,time:r}){let o={item:e,...this._dueFields(t,a,r,!1)};return s&&$(t.features,_.DESCRIPTION)&&(o.description=s),this._call("add_item",o,t.id)}_openAdd(t){let e=this._visible().filter(r=>$(r.features,_.CREATE)&&!r.unavailable),s=D.get(qt,null),a=t&&this._list(t)&&$(this._list(t).features,_.CREATE)&&t||e.find(r=>r.id===s)&&s||e[0]&&e[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1}),this.updateComplete.then(()=>{let r=this.renderRoot.querySelector(".sheet textarea");r&&r.focus()})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(t=!0){let e=this.hass&&this.hass.resolvia;if(!(!e||!e.aiStatus)&&!(!t&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await e.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(t){await this._saveAppPrefs({ai_entity:t||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let t=this._aiInfo();return fs({u:this._usage,day:this._usageDay,onDay:e=>(this._usageDay=e,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","Cada mensagem ou foto lida \xE9 uma chamada para a IA do Home Assistant. O Home Assistant n\xE3o informa tokens nem custo, ent\xE3o o ResolvIA conta as chamadas e estima os tokens pelo tamanho do texto."),app:"ResolvIA",using:t.using&&t.using.id||"",names:Object.fromEntries((t.entities||[]).map(e=>[e.id,e.name]))})}_dueOn(){return!this._app("due_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(t){let e=a=>{let r=a&&this._list(a);return r&&$(r.features,_.CREATE)&&!r.unavailable?a:null},s=this._visible().filter(a=>$(a.features,_.CREATE)&&!a.unavailable);return e(t)||e(D.get(qt,null))||s[0]&&s[0].id||null}_openImport(t,e="pick"){let s=this._importTarget(t);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:e==="text"?"text":e==="voice"?"voice":"pick",rec:e==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),e==="photos"&&this._pickFiles("photos"),e==="scan"&&this._openCamera(),e==="text"&&this._focusImportText(),e==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(){try{this._voice=await this.hass.resolvia.voiceStatus()}catch(t){this._voice={ready:!1,reason:t.message}}this.requestUpdate()}_renderMicBtn(t=null){return!this._aiOn()||!this._voice||!this._voice.ready?u:l`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(t,"voice")}>${f("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let t=new Ft(e=>this._voiceLevel=e);this._rec=t;try{await t.start()}catch(e){t.cancel(),this._rec===t&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:Ls(e)});return}if(this._rec!==t||!this._form||this._form.step!=="voice")return t.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==t)return clearInterval(this._recTimer);let e=t.seconds();this._setForm({secs:e,level:this._voiceLevel||0}),e>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let t=this._rec;if(!t)return;clearInterval(this._recTimer),this._rec=null;let e=t.stop();if(e.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(e);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(t){let e=this._form,s=this._aiInfo(),a=this._voice||{},r=e.rec==="on",o=Math.floor((e.secs||0)/60),d=String(Math.floor((e.secs||0)%60)).padStart(2,"0"),n=this._list(e.target);return l`
      ${t("Falar")}
      <div class="voice ${r?"on":""}">
        <button class="voice-mic" style="--lvl:${r?(e.level||0).toFixed(2):0}" aria-label=${r?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>r?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${f(r?"check":"mic")}
        </button>
        <div class="voice-state">${r?l`<b>Ouvindo…</b> <span class="voice-time">${o}:${d}</span>`:e.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${r?"Toque de novo quando terminar.":l`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${n?l`<p class="voice-hint">Vai para <b>${n.name}</b> (dá para trocar na revisão).</p>`:u}
      </div>
      ${e.error?l`<div class="imp-error">${f("circle-alert")}<span>${e.error}</span></div>`:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" ?disabled=${!r} @click=${()=>this._finishVoice()}>${f("sparkles")}Pronto</button>
      </div>
      <p class="sheet-note">${a.ready?`O Home Assistant transcreve${a.name?` (${a.name})`:""} e ${s.ready?`${s.using.name} separa os itens`:"eu separo os itens por v\xEDrgulas e \u201Ce\u201D"}. Voc\xEA revisa antes de adicionar.`:a.reason||""}</p>
    `}_focusImportText(){this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet textarea");t&&t.focus()})}_pickFiles(t){let e=this.renderRoot.querySelector(t==="scan"?"#rv-scan":"#rv-photos");e&&(e.value="",e.click())}_releaseImages(){let t=this._form;if(t&&t.images)for(let e of t.images)e.url&&URL.revokeObjectURL(e.url)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(t){let e=[...t.target.files||[]].filter(r=>!r.type||r.type.startsWith("image/")).slice(0,6);if(t.target.value="",!e.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let s=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:s?"review":"pick"});let a=[];for(let r of e)a.push(await pe(r));this._readImages(a,s)}_readImages(t,e){if(this._sheet!=="import"||!t.length)return;let s=e?[...this._form.images||[],...t]:(this._releaseImages(),t);this._setForm({step:"loading",images:s,prevStep:e?"review":"pick",loadingText:t.length>1?`Lendo ${t.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:t,appending:e})}async _runExtract({text:t,images:e,appending:s=!1}){let a=this._importToken=Date.now(),r=this._list(this._form.target),o=()=>a===this._importToken&&this._sheet==="import",d=s?this._form.items||[]:[],n=c=>{let p=new Set(d.map(h=>h.text.trim().toLowerCase()));return[...d,...c.filter(h=>!p.has(h.trim().toLowerCase())).map(h=>({text:h,on:!0}))]};try{let c=await this.hass.resolvia.extract({text:t,images:e?e.map(({data:h,mime:g})=>({data:h,mime:g})):void 0,list_name:r?r.name:void 0});if(!o())return;let p=c.items||[];if(!p.length){let h=t?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:h}):this._setForm({step:t?"text":"pick",error:h});return}this._haptic("success"),this._setForm({step:"review",items:n(p),provider:c.provider||null,note:null,error:null})}catch(c){if(!o())return;if(t){let p=de(t);if(p.length){this._setForm({step:"review",items:n(p),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:c.message||"Algo deu errado"}):this._setForm({step:t?"text":"pick",error:c.message||"Algo deu errado"})}}async _openCamera(){let t=navigator.mediaDevices;if(!t||!t.getUserMedia){this._pickFiles("scan");return}let e=!!(this._form&&this._form.step==="review");this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:e,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let s=await t.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){s.getTracks().forEach(d=>d.stop());return}this._stream=s;let a=s.getVideoTracks()[0],r=a&&a.getCapabilities?a.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!r.torch},await this.updateComplete;let o=this.renderRoot.querySelector(".cam video");o&&(o.srcObject=s,o.play().catch(()=>{}))}catch(s){if(!this._cam)return;let a=s&&(s.name==="NotAllowedError"||s.name==="SecurityError");this._cam={...this._cam,status:"error",error:a?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(t=>t.stop()),this._stream=null}_closeCamera(t=!1){if(!this._cam)return;this._stopStream();let e=this._cam.shots||[];if(!this._cam.used)for(let s of e)URL.revokeObjectURL(s.url);this._cam=null,!t&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let t=this._stream&&this._stream.getVideoTracks()[0];if(!t)return;let e=!this._cam.torch;try{await t.applyConstraints({advanced:[{torch:e}]}),this._cam={...this._cam,torch:e}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let t=this.renderRoot.querySelector(".cam video");if(!t||!t.videoWidth||!this._cam||this._cam.shots.length>=6)return;let e=1800,s=Math.min(1,e/Math.max(t.videoWidth,t.videoHeight)),a=document.createElement("canvas");a.width=Math.round(t.videoWidth*s),a.height=Math.round(t.videoHeight*s),a.getContext("2d").drawImage(t,0,0,a.width,a.height);let r=await new Promise(d=>a.toBlob(d,"image/jpeg",.86));if(!r||!this._cam)return;let o=await pe(r,e);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,o],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let t=this._cam.shots,e=this._cam.appending;this._cam={...this._cam,used:!0},this._closeCamera(),this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(t,e&&this._form.step==="review")}_cameraFallback(){let t=this._cam&&this._cam.appending;this._closeCamera(),t&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let t=this._cam;if(!t)return u;let e=t.shots.length;return l`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${t.flash?l`<div class="cam-flash" .key=${t.flash}></div>`:u}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${f("x")}</button>
          <span class="cam-title">Digitalizar com IA</span>
          ${t.torchOk?l`<button class="cam-btn ${t.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${f("zap")}</button>`:l`<span class="cam-btn ghost"></span>`}
        </div>
        ${t.status==="error"?l`<div class="cam-msg">
              ${f("camera")}
              <p>${t.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${f("images")}Escolher foto</button>
            </div>`:l`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${t.status==="starting"?"Abrindo a c\xE2mera\u2026":e?`${b(e,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${t.shots.slice(-3).map(s=>l`<img src=${s.url} alt="" />`)}${e>3?l`<span>+${e-3}</span>`:u}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${t.status!=="live"||e>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!e} @click=${()=>this._useShots()}>Pronto${e?` (${e})`:""}</button>
        </div>
      </div>
    `}_readText(){let t=(this._form.text||"").trim();if(!t){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:t});return}let e=de(t);e.length?this._setForm({step:"review",items:e.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}async _pasteClipboard(){try{let t=await navigator.clipboard.readText();if(!t)throw new Error("empty");this._setForm({text:t,error:null})}catch{this._focusImportText(),this._showToast("Toque e segure no campo para colar")}}_setImportItem(t,e){let s=this._form.items.slice();s[t]={...s[t],...e},this._setForm({items:s})}async _importAdd(){let t=this._form,e=this._list(t.target),s=t.items.filter(r=>r.on&&r.text.trim());if(!e||!s.length)return;D.set(qt,e.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0;for(let r of s)if(await this._call("add_item",{item:r.text.trim()},e.id))a++;else break;a&&this._showToast(`${b(a,"item adicionado","itens adicionados")} em ${T(e.name,24)}`)}_openEdit(t,e){let s=j(e.due),a=this._ruleFor(t.id,e),r=a?a.days:0;this._openSheet("item",{mode:"edit",listId:t.id,key:I(e),target:t.id,summary:e.summary||"",description:vt(e.description),mirrored:this._mirrored(t.id,e.uid),due:e.due||null,date:s?s.date:null,time:s?s.time:null,repeat:r,repeatOrig:r,repeatCustom:!!r&&!Ds.some(o=>o.days===r),points:this._rawPoints(t.id,e.summary),pointsOrig:this._rawPoints(t.id,e.summary)}),this._loadPoints()}_setForm(t){this._form={...this._form,...t}}async _saveItem(){let t=this._form,e=(t.summary||"").trim();if(!e){let p=this.renderRoot.querySelector(".sheet textarea");p&&p.focus();return}let s=(t.description||"").trim(),a=this._list(t.target);if(t.mode==="add"){if(!a)return;D.set(qt,a.id),this._closeSheet(),this._haptic("light");let p=await this._addFull(a,{summary:e,description:s,date:t.date,time:t.time});p&&t.repeat&&await this._setRule(a.id,{summary:e,days:t.repeat}),p&&t.points&&await this._setTaskPoints(a.id,e,t.points),p&&this._view().id!==a.id&&this._showToast(`Adicionado em ${T(a.name,28)}`);return}let r=this._list(t.listId),o=r&&r.items&&r.items.find(p=>I(p)===t.key);if(!r||!o){this._closeSheet();return}if(a&&a.id!==r.id){this._closeSheet(),await this._addFull(a,{summary:e,description:s,date:t.date,time:t.time})&&(t.repeat&&await this._setRule(a.id,{summary:e,days:t.repeat}),t.repeatOrig&&await this._setRule(r.id,{uid:o.uid,summary:o.summary,days:null}),t.points&&await this._setTaskPoints(a.id,e,t.points),t.pointsOrig&&await this._setTaskPoints(r.id,o.summary,0),await this._call("remove_item",{item:[t.key]},r.id),this._showToast(`Movido para ${T(a.name,28)}`));return}let d={item:t.key};if(e!==o.summary&&(d.rename=e),$(r.features,_.DESCRIPTION)&&s!==vt(o.description)){let p=Es(o.description);d.description=p?`${s}${s?" ":""}${p}`:s||null}let n=j(o.due);((n?n.date:null)!==(t.date||null)||(n?n.time:null)!==(t.time||null))&&Object.assign(d,this._dueFields(r,t.date,t.time,!0)),this._closeSheet(),((t.points||0)!==(t.pointsOrig||0)||t.pointsOrig&&e!==o.summary)&&await this._setTaskPoints(r.id,e,t.points||0,e!==o.summary?o.summary:null),(t.repeat||0)!==(t.repeatOrig||0)&&(await this._setRule(r.id,{uid:o.uid,summary:e,days:t.repeat}),t.repeat&&this._showToast(`Repete ${this._everyLabel(t.repeat)} depois de concluir`)),Object.keys(d).length>1&&(d.rename&&this._patchItem(r.id,t.key,{summary:e}),await this._call("update_item",d,r.id))}async _deleteItem(){let t=this._form,e=this._list(t.listId),s=e&&e.items&&e.items.find(o=>I(o)===t.key);if(this._closeSheet(),!e||!s)return;if(this._setItems(e.id,e.items.filter(o=>I(o)!==t.key)),this._haptic("warning"),!await this._call("remove_item",{item:[t.key]},e.id)){this._setItems(e.id,e.items);return}let r=j(s.due);this._showToast("Item exclu\xEDdo",{label:"Desfazer",run:()=>this._addFull(e,{summary:s.summary,description:s.description,date:r?r.date:null,time:r?r.time:null})})}_confirmClearDone(t){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${b(t.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${t.done===1?"":"s"} de \u201C${t.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},t.id)&&this._showToast("Conclu\xEDdos apagados")}})}_openCustomize(t){this._openSheet("customize",{listId:t.id,name:t.name===t.origName?"":t.name,color:t.colorId,icon:t.iconPref,hidden:t.hidden,deadlines:!t.datesInfo})}async _saveCustomize(){let t=this._form,e=this._list(t.listId);this._closeSheet(),await this._saveListPrefs(t.listId,{name:(t.name||"").trim()||null,color:t.color||null,icon:t.icon||null,hidden:t.hidden?!0:null,dates_info:e&&e.canDue&&!t.deadlines?!0:null})}_dragStart(t,e,s){if(t.pointerType==="mouse"&&t.button!==0)return;t.preventDefault();let a=t.currentTarget,r=a.closest(".item"),d=[...r.parentElement.querySelectorAll(":scope > .item[data-drag]")],n=d.indexOf(r);if(n<0)return;let c=this.renderRoot.querySelector("main"),p=d.map(w=>w.getBoundingClientRect()),h=c.scrollTop,g=p.map(w=>w.top+w.height/2+h),m=p[n].height,v={y:t.clientY,target:n,raf:0,lastY:t.clientY};try{a.setPointerCapture(t.pointerId)}catch{}r.classList.add("dragging"),d.forEach((w,A)=>A!==n&&w.classList.add("shifting")),this._haptic("selection");let y=()=>{let w=v.lastY-v.y+(c.scrollTop-h);r.style.transform=`translateY(${w}px)`;let A=g[n]+w,C=0;for(let et=0;et<d.length;et++)et!==n&&g[et]<A&&C++;C!==v.target&&(v.target=C,this._haptic("selection")),d.forEach((et,nt)=>{if(nt===n)return;let bt=0;n<C&&nt>n&&nt<=C&&(bt=-m),C<n&&nt>=C&&nt<n&&(bt=m),et.style.transform=bt?`translateY(${bt}px)`:""})},S=()=>{let w=c.getBoundingClientRect(),A=70,C=0;v.lastY<w.top+A?C=-Math.ceil((w.top+A-v.lastY)/6):v.lastY>w.bottom-A&&(C=Math.ceil((v.lastY-(w.bottom-A))/6)),C&&(c.scrollTop+=C,y()),v.raf=requestAnimationFrame(S)};v.raf=requestAnimationFrame(S);let z=w=>{v.lastY=w.clientY,y()},x=()=>{cancelAnimationFrame(v.raf),a.removeEventListener("pointermove",z),a.removeEventListener("pointerup",x),a.removeEventListener("pointercancel",x),d.forEach(w=>{w.classList.remove("shifting","dragging"),w.style.transform=""}),v.target!==n&&this._commitMove(e,s,d.map(w=>w.dataset.key),n,v.target)};a.addEventListener("pointermove",z),a.addEventListener("pointerup",x),a.addEventListener("pointercancel",x)}async _commitMove(t,e,s,a,r){let o=s.slice(),[d]=o.splice(a,1);o.splice(r,0,d);let n=r===0?void 0:o[r-1],c=t.items.slice(),p=c.findIndex(v=>I(v)===d),[h]=c.splice(p,1),g=n?c.findIndex(v=>I(v)===n):-1;c.splice(g+1,0,h),this._setItems(t.id,c);let m={type:"todo/item/move",entity_id:t.id,uid:d};n&&(m.previous_uid=n);try{await this.hass.callWS(m)}catch{this._setItems(t.id,t.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return u;let t=this._dark,e=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,r=a?a.color:e,o=`--rv-accent:${r.fill};--rv-accent-ink:${t?r.fill:r.ink};--rv-accent-soft:${Lt(r.fill,t?.18:.14)};--rv-accent-ink-light:${r.ink};`,d;return s.name==="list"?d=this._renderList(s.id):s.name==="due"?d=this._renderDue():s.name==="suggest"?d=this._renderSuggest():s.name==="search"?d=this._renderSearch():s.name==="more"?d=this._renderMore():d=this._renderHome(),l`
      <div class="root" style=${o}>
        <div class="app">
          ${!this.env||this.env.topbar?l`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${f("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:u}
          ${this.hass.connected===!1?l`<div class="offline">${f("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:u}
          ${this._renderSide(s)}
          <main @touchstart=${n=>this._onSwipeStart(n)} @touchend=${n=>this._onSwipeEnd(n)}>${d}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()?l`<input id="rv-photos" class="sr" type="file" accept="image/*" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${n=>this._onFiles(n)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${n=>this._onFiles(n)} />`:u}
      </div>
    `}_renderNav(t){let e=this._visible().reduce((a,r)=>a+r.late+r.today,0),s=(a,r,o,d,n=0)=>l`
      <button class="tab ${t.name===a||a==="home"&&t.name==="list"?"on":""}" @click=${()=>this._goTab(r)} aria-label=${o}>
        ${f(d)}<span>${o}</span>
        ${n?l`<span class="badge">${n>99?"99+":n}</span>`:u}
      </button>
    `;return l`
      <nav>
        <div class="tabs">
          ${s("home","","Listas","list-checks")} ${s("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(t.name==="list"?t.id:null)} aria-label="Adicionar item">
            <span class="pill">${f("plus")}</span><span>Adicionar</span>
          </button>
          ${this._dueOn()?s("due","/prazos","Prazos","calendar-clock",e):s("suggest","/sugestoes","Sugest\xF5es","lightbulb")}
          ${s("more","/mais","Mais","sliders-horizontal")}
        </div>
      </nav>
    `}_renderSide(t){let e=this._byPending(this._visible()),s=e.reduce((r,o)=>r+o.late+o.today,0),a=(r,o,d,n,c=0,p="")=>l`<button class="side-link" aria-current=${t.name===r?"page":"false"} @click=${()=>this._goTab(o)}>
      ${f(n)}<span>${d}</span>${c?l`<span class="side-badge">${c>99?"99+":c}</span>`:u}${p?l`<kbd>${p}</kbd>`:u}
    </button>`;return l`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${se()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${a("home","","Listas","list-checks")} ${a("search","/buscar","Buscar","search",0,"/")}
        ${this._dueOn()?a("due","/prazos","Prazos","calendar-clock",s):a("suggest","/sugestoes","Sugest\xF5es","lightbulb")}
        ${a("more","/mais","Mais","sliders-horizontal")}
      </div>
      ${e.length?l`<div class="side-h"><span>Listas</span><small>${e.length}</small></div>
            <div class="side-lists">
              ${e.map(r=>l`<button class="side-list" aria-current=${t.name==="list"&&t.id===r.id?"page":"false"} style=${M(r.color,this._dark)} @click=${()=>this._go(`/lista/${r.id}`)}>
                  <span class="side-tile">${f(r.icon)}</span><span class="sl-name">${r.name}</span><span class="sl-num">${r.pending||""}</span>
                </button>`)}
            </div>`:u}
      <div class="side-foot">ResolvIA ${ue}</div>
    </aside>`}_renderTopActs(){return l`<div class="top-acts">
      ${this._renderMicBtn()}
      ${this._canImport()?l`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${f("scan-text")}Ler com IA</button>`:u}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${f("plus")}Adicionar item</button>
    </div>`}_renderPageHead(t,e){let s=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],r=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:e;return l`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${se()}Resolv<span>IA</span></span>${s?l`<span class="sep"> · </span>Olá, ${s}`:""}</p>${this._renderMicBtn()}${this._renderTopActs()}</div>
      <h1 class="page-title">${t}</h1>
      ${r?l`<p class="status"><span class="dot ${r.tone||""}" aria-hidden="true"></span><span>${r.text}</span></p>`:u}
    </header>`}_byPending(t){return[...t].sort((e,s)=>s.pending-e.pending)}_renderHome(){let t=this._byPending(this._visible()),e=t.reduce((c,p)=>c+p.pending,0),s=t.reduce((c,p)=>c+p.late,0),a=t.reduce((c,p)=>c+p.today,0),r=t.filter(c=>c.pending>0).length,o=[];e&&o.push(`em ${b(r,"lista","listas")}`),a&&o.push(`${a} pra hoje`),s&&o.push(`${b(s,"atrasado","atrasados")}`);let d=this._app("group_by_device",!0),n=[];if(d){for(let p of t){let h=p.group||"",g=n.find(m=>m.name===h);g||n.push(g={name:h,lists:[]}),g.lists.push(p)}let c=p=>p.lists.reduce((h,g)=>h+g.pending,0);n.sort((p,h)=>c(h)-c(p)||(p.name?1:0)-(h.name?1:0))}else n.push({name:null,lists:t});return l`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${b(t.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>l`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${Ss(this.hass.user&&this.hass.user.name)}</div>
            ${e?l`<div class="hero-big">${e}<small>${e===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${o.join(" \xB7 ")}</div>`:l`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>
        ${this._L.length?this._renderHomeFacts(t):u}
        </div>

        ${this._L.length?this._renderHomeSearch():u}

        ${this._L.length===0?l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${f("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:l`
              <div class="groups ${n.length>1?"two":""}">
              ${n.map(c=>{let p=d?c.name||(n.length>1?"Listas locais":"Listas"):"Listas",h=d&&(c.name||n.length>1);return l`
                  <div class="panel grp">
                    <div class="grp-head ${h?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${f(c.name?"layout-list":"list-checks")}</span><h2 class="overline">${p}</h2><small>${c.lists.length}</small></div>
                    ${c.lists.map(g=>this._renderListCard(g,!d))}
                  </div>
                `})}
              </div>
            `}
        ${this.hass.user&&this.hass.user.is_admin?l`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${f("list-plus")}<span>Nova lista</span>
            </button>`:u}
      </section>
    `}_renderHomeSearch(){let t=this._visible().reduce((e,s)=>e+(s.items&&s.items.length||0),0);return l`<form class="search-box home-search" role="search" @submit=${e=>{e.preventDefault(),this._query=e.target.q.value.trim(),this._toSearch()}}>
      ${f("search")}
      <input type="search" name="q" placeholder=${t?`Buscar entre ${b(t,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${e=>{e.target.value.trim()&&(this._query=e.target.value,e.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(t,e){let s=t.pending+t.done,a=s?Math.round(t.done/s*100):0,r=[];return t.unavailable?r.push(l`<span>Indisponível</span>`):t.items?(r.push(l`<span>${t.pending?b(t.pending,"pendente","pendentes"):"Tudo resolvido"}${t.done?` \xB7 ${t.done} ${t.done===1?"feito":"feitos"}`:""}</span>`),t.late?r.push(l`<span class="tag late">${f("circle-alert")}${t.late}</span>`):t.today&&r.push(l`<span class="tag today">${f("clock")}${t.today} hoje</span>`)):r.push(l`<span>Carregando…</span>`),l`
      <button class="list-card ${t.unavailable?"off":""}" style=${M(t.color,this._dark)} @click=${()=>this._go(`/lista/${t.id}`)}>
        <span class="tile">${f(t.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${t.name}</span>
          <span class="lc-meta">${e&&t.group?l`<span>${t.group} ·</span>`:u}${r}</span>
          ${s?l`<span class="bar"><i style="width:${a}%"></i></span>`:u}
        </span>
        <span class="lc-num ${t.pending?"":"zero"}">${t.pending||f("circle-check")}</span>
      </button>
    `}_renderList(t){let e=this._list(t);if(!e)return l`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${f("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>Voltar para o início</button>
      </section>`;let s=$(e.features,_.CREATE)&&!e.unavailable,a=$(e.features,_.UPDATE),r=$(e.features,_.MOVE),o=$(e.features,_.DELETE),d=e.items,n=d?d.filter(g=>!H(g)||this._recent.has(I(g))):[],c=d?d.filter(g=>H(g)&&!this._recent.has(I(g))):[],p=d?d.length:0,h=this._doneOpen[t]!==void 0?this._doneOpen[t]:this._app("show_done",!1);return l`
      <section class="page" style=${M(e.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${f("chevron-left")}</button>
          <div class="dh-text">
            ${e.group?l`<div class="overline">${e.group}</div>`:u}
            <h1 class="display">${e.name}</h1>
          </div>
          ${this._renderMicBtn(e.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:e.id})} aria-label="Opções da lista">${f("ellipsis")}</button>
        </div>

        ${p?l`<div class="progress">
              <span>${e.done} de ${p} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(e.done/p*100)}%"></i></span>
            </div>`:u}
        ${s?l`<div class="quick">
              <form @submit=${g=>this._quickAdd(g,e)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${g=>this._onQuickPaste(g,e)} />
                ${this._canImport()?l`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(e.id)}>${f("scan-text")}</button>`:u}
                <button class="add-btn" type="submit" aria-label="Adicionar">${f("plus")}</button>
              </form>
            </div>`:u}
        ${e.unavailable?l`<div class="panel"><div class="empty"><div class="em-icon">${f("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:d?n.length?l`<div class="panel items">
                  ${R(n,I,g=>this._renderItem(e,g,{draggable:r&&a&&!H(g)}))}
                </div>`:l`<div class="panel">
                  <div class="empty">
                    ${p?l`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:l`<div class="em-icon">${f(e.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:l`<div class="panel">${[70,52,84].map(g=>l`<div class="skeleton" style="width:${g}%"></div>`)}</div>`}
        ${c.length?l`
              <div class="done-head">
                <button class="done-toggle ${h?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[t]:!h}} aria-expanded=${h?"true":"false"}>
                  Concluídos <span class="count">· ${c.length}</span>${f("chevron-down")}
                </button>
                ${o?l`<button class="text-btn" @click=${()=>this._confirmClearDone(e)}>Limpar</button>`:u}
              </div>
              ${h?l`<div class="panel items">${R(c,I,g=>this._renderItem(e,g))}</div>`:u}
            `:u}
        ${!a&&d&&d.length?l`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:u}
      </section>
    `}_renderText(t,e){return Ts(t).map(s=>s.url?l`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${f(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,e))}_highlight(t,e){if(!e)return t;let s=ws(t),a=rt(e);if(!a)return t;let r=[],o=0,d;for(;(d=s.indexOf(a,o))!==-1;)d>o&&r.push(t.slice(o,d)),r.push(l`<mark>${t.slice(d,d+a.length)}</mark>`),o=d+a.length;return o<t.length&&r.push(t.slice(o)),r}_renderItem(t,e,s={}){let a=H(e),r=!a&&W(e.due),o=$(t.features,_.UPDATE),d=this._ruleFor(t.id,e),n=d?a&&d.reopen_at?l`<span class="tag rep">${f("repeat")}volta ${this._returnLabel(d.reopen_at)}</span>`:l`<span class="tag rep">${f("repeat")}${this._everyLabel(d.days)}</span>`:u;return l`
      <div class="item ${a?"done":""}" data-key=${I(e)} ?data-drag=${s.draggable} style=${s.showList?M(t.color,this._dark):""}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!o} @click=${()=>this._toggle(t,e)}>
          ${f("check")}
        </button>
        <div class="it-body" @click=${()=>o&&this._openEdit(t,e)}>
          <div class="it-text">${this._renderText(e.summary||"",s.query)}</div>
          ${vt(e.description)?l`<div class="it-desc">${this._renderText(vt(e.description),s.query)}</div>`:u}
          ${s.why?l`<div class="it-why">${f(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:u}
          ${r||s.showList||d||this._pointsOf(t.id,e.summary,e.uid)?l`<div class="chips">
                ${s.showList?l`<span class="tag list">${f(t.icon)}${T(t.name,24)}</span>`:u}
                ${r?t.noDue?l`<span class="tag info" title=${t.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${f("clock-fading")}${r.text}</span>`:l`<span class="tag ${r.tone==="late"?"late":r.tone==="today"?"today":""}">${f(r.time?"clock":"calendar")}${r.text}</span>`:u}
                ${n} ${this._renderPointsTag(t.id,e)}
              </div>`:u}
        </div>
        ${s.draggable?l`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${c=>this._dragStart(c,t,e)} @click=${c=>c.preventDefault()}>${f("grip-vertical")}</button>`:u}
      </div>
    `}_dueRows(t=this._visible()){let e=[];for(let s of t)if(!s.noDue)for(let a of s.items||[]){if(H(a)&&!this._recent.has(I(a)))continue;let r=W(a.due);r&&e.push({l:s,i:a,d:r})}return e.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(t){let e=this._dueOn()?this._dueRows(t):[],s=e.filter(p=>p.d.overdue),a=e.filter(p=>!p.d.overdue&&p.d.diff===0),r=e.find(p=>!p.d.overdue&&p.d.diff>0),o=[...t].filter(p=>p.pending>0).sort((p,h)=>h.pending-p.pending)[0],d=t.reduce((p,h)=>p+h.done,0),n=[],c=(p,h,g,m,v,y)=>n.push({ic:p,tone:h,label:g,value:m,right:v,go:y});return this._dueOn()&&(c("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._go("/prazos"):null),c("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._go("/prazos"):null),c("calendar-clock","","Pr\xF3ximo prazo",r?r.i.summary:"Sem prazos marcados",r?r.d.text:"",r?()=>this._go(`/lista/${r.l.id}`):null)),c("list-checks","","Mais cheia",o?o.name:"Tudo resolvido",o?b(o.pending,"pendente","pendentes"):"",o?()=>this._go(`/lista/${o.id}`):null),this._dueOn()||c("circle-check","","Resolvidos",b(d,"item feito","itens feitos"),"",null),l`<dl class="facts">
      ${n.map(p=>l`<div class="fact-row ${p.go?"go":""}" role=${p.go?"link":"group"} tabindex=${p.go?"0":"-1"} @click=${p.go||(()=>{})} @keydown=${h=>p.go&&h.key==="Enter"&&p.go()}>
          <dt><span class="sec-ic ${p.tone}" aria-hidden="true">${f(p.ic)}</span>${p.label}</dt>
          <dd>${p.value}</dd>
          <dd class="fv ${p.tone}">${p.right}</dd>
        </div>`)}
    </dl>`}_renderDue(){let t=this._visible(),e=t.some(c=>$(c.features,_.DUE_DATE)||$(c.features,_.DUE_DATETIME)),s=this._dueRows(t),a=[{title:"Atrasados",test:c=>c.overdue},{title:"Hoje",test:c=>c.diff===0},{title:"Amanh\xE3",test:c=>c.diff===1},{title:"Pr\xF3ximos 7 dias",test:c=>c.diff>1&&c.diff<7},{title:"Mais adiante",test:()=>!0}],r=new Set,o=a.map(c=>{let p=s.filter(h=>!r.has(h)&&c.test(h.d));return p.forEach(h=>r.add(h)),{...c,rows:p}}).filter(c=>c.rows.length),d=(this._repeatOn()?this._rules:[]).filter(c=>c.reopen_at).map(c=>{let p=this._list(c.entity_id),h=p&&p.items&&c.uid?p.items.find(g=>g.uid===c.uid):null;return{r:c,l:p,item:h}}).filter(c=>c.l&&!c.l.hidden).sort((c,p)=>c.r.reopen_at-p.r.reopen_at),n=d.length?l`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${d.length}</div>
          ${R(d,c=>c.r.id,c=>c.item?this._renderItem(c.l,c.item,{showList:!0}):l`<div class="item done" style=${M(c.l.color,this._dark)}>
                    <span class="check on">${f("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${c.l.id}`)}>
                      <div class="it-text">${c.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${f(c.l.icon)}${T(c.l.name,24)}</span>
                        <span class="tag rep">${f("repeat")}volta ${this._returnLabel(c.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:u;return l`
      <section class="page">
        ${this._renderPageHead("Prazos",(()=>{let c=s.filter(g=>g.d.overdue).length,p=s.filter(g=>!g.d.overdue&&g.d.diff===0).length,h=[];return c&&h.push(b(c,"atrasado","atrasados")),p&&h.push(`${p} para hoje`),d.length&&h.push(`${d.length} ${d.length===1?"volta":"voltam"} sozinha${d.length===1?"":"s"}`),{text:h.length?h.join(" \xB7 "):"Nada atrasado",tone:c?"late":""}})())}
        ${o.length||d.length?[o.map(c=>l`
                <div class="panel items">
                  <div class="overline" style=${c.title==="Atrasados"?"color:var(--rv-late)":""}>${c.title} · ${c.rows.length}</div>
                  ${R(c.rows,p=>p.l.id+I(p.i),p=>this._renderItem(p.l,p.i,{showList:!0}))}
                </div>
              `),n]:l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${f("calendar-days")}</div>
                ${e?l`<h3>Nada com prazo</h3>
                      <p>Quando um item tiver data, ele aparece aqui. Toque num item para definir um prazo.</p>`:l`<h3>Sem prazos por aqui</h3>
                      <p>Suas listas atuais não aceitam datas. Listas locais (“Lista de tarefas local”), Google Tasks e CalDAV aceitam.</p>`}
              </div>
            </div>`}
      </section>
    `}_renderSearch(){let t=this._query.trim(),e=rt(t),s=[],a=0;if(e)for(let r of this._visible()){let o=(r.items||[]).filter(d=>(this._searchDone||!H(d))&&(rt(d.summary).includes(e)||rt(d.description).includes(e)));o.length&&(o.sort((d,n)=>Number(H(d))-Number(H(n))),s.push({l:r,hits:o}),a+=o.length)}return l`
      <section class="page">
        ${this._renderPageHead("Buscar",{text:`Em ${b(this._visible().length,"lista","listas")}`})}
        <label class="search-box">
          ${f("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${r=>this._query=r.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?l`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${f("x")}</button>`:u}
        </label>
        <div class="filters">
          <button class="pick ${this._searchDone?"on":""}" @click=${()=>this._searchDone=!this._searchDone}>${f("circle-check")}<span>Incluir concluídos</span></button>
        </div>
        ${e?s.length?l`<p class="page-sub" style="margin-top:0">${b(a,"resultado","resultados")}</p>
                ${s.map(({l:r,hits:o})=>l`
                    <div class="panel items" style=${M(r.color,this._dark)}>
                      <div class="overline">${r.name}${r.group?` \xB7 ${r.group}`:""}</div>
                      ${R(o,I,d=>this._renderItem(r,d,{query:t}))}
                    </div>
                  `)}`:l`<div class="panel"><div class="empty"><div class="em-icon">${f("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${T(t,30)}”.</p></div></div>`:l`<p class="page-sub" style="margin-top:0">Procure por qualquer palavra, em todas as listas.</p>`}
      </section>
    `}_moreTabs(){return[["listas","Listas","list-checks"],...this._rulesOk?[["repeticoes","Repeti\xE7\xF5es","repeat"]]:[],...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks"]]:[],...this._data()?[["dados","Dados","archive"]]:[],["aparencia","Apar\xEAncia","palette"],["opcoes","Op\xE7\xF5es","toggle-right"]]}_secHead(t,e,s=null){return l`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${f(t)}</span><h2>${e}</h2></div>${s?l`<p class="panel-lead">${s}</p>`:u}`}_renderMore(){let t=this._moreTabs(),e=this._view().tab,s=t.some(d=>d[0]===e)?e:"listas",a=d=>{d!==s&&(this._haptic("light"),this._go(d==="listas"?"/mais":`/mais/${d}`,!0))},r,o={text:`ResolvIA ${ue}${this._prefsRemote?" \xB7 personaliza\xE7\xF5es sincronizadas":""}`};if(s==="repeticoes")r=this._renderRulesTab();else if(s==="integracoes")r=l`${this._renderRewardsPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():u} ${this._renderSensorsPanel()}`;else if(s==="dados")r=this._renderDataPanel();else if(s==="aparencia")r=this._renderAppearanceTab();else if(s==="opcoes")r=this._renderOptionsTab();else{r=this._renderListsTab();let d=this._L.filter(n=>n.hidden).length;o={text:this._L.length?`${b(this._L.length,"lista","listas")}${d?` \xB7 ${b(d,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}return l`
      <section class="page">
        ${this._renderPageHead("Mais",o)}
        <div class="seg compact more-tabs" role="tablist" aria-label="Seções">
          ${t.map(([d,n,c])=>l`<button class=${s===d?"on":""} role="tab" aria-selected=${s===d?"true":"false"} @click=${()=>a(d)}>${f(c)}<span>${n}</span></button>`)}
        </div>
        <div role="tabpanel" aria-label=${t.find(d=>d[0]===s)[1]}>${r}</div>
        <p class="foot"><b>ResolvIA</b><br />v${ue} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>
      </section>
    `}_renderListsTab(){let t=(e,s,a)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${e} @change=${a} aria-label=${s} /><span class="track"></span></label>`;return l`
        <div class="panel">
          ${this._secHead("list-checks","Listas","Nome, cor, \xEDcone e quais aparecem na tela inicial. Toque numa lista para personalizar.")}
          ${this._L.length?this._L.map(e=>l`
                  <div class="row" style=${M(e.color,this._dark)}>
                    <button class="tile" @click=${()=>this._openCustomize(e)} aria-label="Personalizar ${e.name}">${f(e.icon)}</button>
                    <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(e)}>
                      <div class="label">${e.name}</div>
                      <div class="hint">${e.group||e.id}</div>
                    </button>
                    ${t(!e.hidden,`Mostrar ${e.name}`,s=>this._saveListPrefs(e.id,{hidden:s.target.checked?null:!0}))}
                  </div>
                `):l`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?l`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${M(this._accent(),this._dark)}>${f("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${f("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${M(at[9],this._dark)}>${f("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${f("chevron-right")}
              </button>
            </div>`:u}

    `}_renderRulesTab(){let t=this._repeatOn();return l`<div class="panel">
              ${this._secHead("repeat","Repeti\xE7\xE3o autom\xE1tica")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${t?"Ligado: nos itens aparece \u201CRepetir depois de concluir\u201D, e o item volta sozinho N dias depois de feito.":"Desligado: os itens n\xE3o t\xEAm o campo de repeti\xE7\xE3o. Para o que se repete com dia certo ou depois de feito, use a Rotina da casa do CronologIA."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${e=>this._toggleRepeat(e)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!t&&!this._rules.length?u:l`<div class="panel ${t?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!t&&this._rules.length?l`<p class="panel-lead">Ficaram de quando a repetição estava ligada e não voltam mais sozinhas. Exclua para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${f("trash")}Excluir ${b(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:u}
              ${this._rules.length?this._rules.map(e=>{let s=this._list(e.entity_id);return s?l`<div class="row" style=${M(s.color,this._dark)}>
                      <span class="tile">${f("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${e.summary||e.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(e.days)}${t?e.reopen_at?` \xB7 volta ${this._returnLabel(e.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(e.entity_id,{uid:e.uid,summary:e.match||e.summary,days:null})}>${f("x")}</button>
                    </div>`:u}):l`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir” — ex.: passar pano 3 dias depois de feito.</div></div>`}
            </div>`}`}_toggleRepeat(t){let e=t.target.checked;if(e||!this._rules.length)return this._saveAppPrefs({repeat_on:e});t.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(t){let e=this._rules.length;this._openSheet("confirm",{title:t?"Desligar a repeti\xE7\xE3o?":"Excluir as repeti\xE7\xF5es?",text:`${b(e,"tarefa se repete","tarefas se repetem")}. ${t?"Ao desligar, essas repeti\xE7\xF5es s\xE3o exclu\xEDdas":"Elas ser\xE3o exclu\xEDdas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:t?"Excluir e desligar":`Excluir ${b(e,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),t&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${b(e,"repeti\xE7\xE3o exclu\xEDda","repeti\xE7\xF5es exclu\xEDdas")}${t?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let t=(s,a,r)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${r} aria-label=${a} /><span class="track"></span></label>`,e=this._dueOn();return l`
        <div class="panel">
          ${this._secHead("calendar-clock","Prazos")}
          <div class="row">
            <div class="grow"><div class="label">Controlar prazos</div><div class="hint" style="white-space:normal">${e?"Ligado: o item tem campo de prazo, o que vence fica vermelho e entra na aba Prazos.":"Desligado: a aba Prazos vira Sugest\xF5es e o item n\xE3o tem mais campo de prazo. As datas que j\xE1 existem aparecem s\xF3 como informa\xE7\xE3o."}</div></div>
            ${t(e,"Controlar prazos",s=>this._saveAppPrefs({due_off:s.target.checked?null:!0}))}
          </div>
        </div>
        <div class="panel">
          ${this._secHead("layout-list","Exibi\xE7\xE3o")}
          <div class="row">
            <div class="grow"><div class="label">Agrupar por dispositivo</div><div class="hint">Ex.: as listas da Alexa juntas</div></div>
            ${t(this._app("group_by_device",!0),"Agrupar por dispositivo",s=>this._saveAppPrefs({group_by_device:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">Concluídos abertos</div><div class="hint">Mostra os concluídos sem precisar tocar</div></div>
            ${t(this._app("show_done",!1),"Conclu\xEDdos abertos",s=>this._saveAppPrefs({show_done:s.target.checked}))}
          </div>
        </div>
    `}_renderAppearanceTab(){let t=this._app("accent","vermelho");return l`
        <div class="panel">
          ${this._secHead("contrast","Tema","Autom\xE1tico segue o modo claro ou escuro do Home Assistant. Cada aparelho guarda a sua escolha.")}
          ${vs({theme:this._theme,onTheme:e=>this._setTheme(e),icon:f})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Muda os bot\xF5es principais, a aba escolhida e os destaques. Vale para todos os aparelhos.")}
          ${xs({palette:at,value:t,onPick:e=>this._saveAppPrefs({accent:e==="vermelho"?null:e})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return u;let t=this._app("sensors_on",!1)===!0;return l`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">Criar sensores</div><div class="hint" style="white-space:normal">${t?"Ligado: o app mant\xE9m este sensor atualizado.":"Desligado: o app n\xE3o cria sensores no Home Assistant, e apaga os que tinha criado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${e=>this._saveAppPrefs({sensors_on:e.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${t?l`<div class="sensor-list"><div class="sensor-row"><code>sensor.resolvia_ia_hoje</code><span>chamadas de IA hoje</span></div></div>`:u}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return u;let t=this._aiOn(),e=l`<div class="row switch-row">
        <div class="grow"><div class="label">Usar IA</div><div class="hint" style="white-space:normal">${t?"Ligado: em Adicionar aparecem Colar mensagem, Escolher fotos e Digitalizar com IA.":"Desligado: Colar mensagem, Escolher fotos e Digitalizar com IA somem. Colar v\xE1rias linhas no campo de adicionar continua criando um item por linha."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${c=>this._saveAppPrefs({ai_off:c.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!t)return l`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens coladas, prints e fotos de listas em papel, com a IA configurada no Home Assistant.")}
        ${e}
      </div>`;let s=this._aiInfo(),a=s.entities||[],r=this._app("ai_entity",""),o=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",d=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",n="";return s.ready&&s.using&&(n=`Usando ${s.using.name}${r?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(n+=` Para fotos, ${s.photos.name}.`)),s.reason&&(n=`${n} ${s.reason}`.trim()),l`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens coladas, prints e fotos de listas em papel. Usa a integra\xE7\xE3o de IA configurada no Home Assistant (Anthropic Claude, OpenAI, Google Gemini ou um modelo local pelo Ollama); o app n\xE3o guarda nenhuma chave.")}
      ${e}
      <div class="ai-state ${o}"><span class="dot"></span><div><b>${d}</b>${n?l`<span>${n}</span>`:u}</div></div>
      ${a.length||r?l`<label class="field" style="margin:14px 0 0">
            <span class="flabel">IA usada pelo app</span>
            <select class="select" aria-label="IA usada pelo app" @change=${c=>this._chooseAi(c.target.value)}>
              <option value="" ?selected=${!r}>Padrão do Home Assistant</option>
              ${a.map(c=>l`<option value=${c.id} ?selected=${c.id===r}>${c.name}${c.images?"":" (s\xF3 texto)"}${c.available?"":" (indispon\xEDvel)"}</option>`)}
              ${r&&!a.some(c=>c.id===r)?l`<option value=${r} selected>${r} (não encontrada)</option>`:u}
            </select>
            <span class="field-hint">${f("sparkles")}<span>“Padrão do Home Assistant” usa a IA preferida definida em Configurações › Sistema › Geral.</span></span>
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
    </div>`}_renderSheet(){if(!this._sheet)return u;let t=u;return this._sheet==="item"?t=this._renderItemSheet():this._sheet==="listmenu"?t=this._renderListMenu():this._sheet==="customize"?t=this._renderCustomize():this._sheet==="confirm"?t=this._renderConfirm():this._sheet==="import"?t=this._renderImportSheet():this._sheet==="versions"?t=this._renderVersions():this._sheet==="who"&&(t=this._renderWhoSheet()),l`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${e=>e.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${t}
      </div>
    `}_sheetStyle(){let t=this._form||{},e=this._list(t.target||t.listId),s=this._sheet==="customize"&&it(t.color)||e&&e.color;return s?`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${Lt(s.fill,this._dark?.18:.14)};${M(s,this._dark)}`:""}_renderMirroredSheet(t){let e=this._form,s=e.mirrored,a=W(e.due),r=$(t.features,_.DELETE);return l`
      <div class="sheet-head">
        <h3 class="display">${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <div class="ro-item">
        <b>${e.summary}</b>
        <div class="ro-tags">
          ${a?l`<span class="tag ${t.noDue?"info":a.tone}">${f("calendar")}${a.text}</span>`:u}
          ${s.pontos?l`<span class="tag pts">${f("trophy")}+${s.pontos}</span>`:u}
          <span class="tag">${T(t.name,24)}</span>
        </div>
        ${e.description?l`<p>${e.description}</p>`:u}
      </div>
      <p class="sheet-note with-icon">${f("calendar-clock")}<span>Vem do CronologIA. Concluir aqui marca como feito lá${s.pontos?` e d\xE1 ${s.pontos} pontos para quem fez`:""}, e a tarefa volta com a próxima data. O nome, a data, as notas e os pontos se mudam no CronologIA.${r?" Excluir tira da lista s\xF3 at\xE9 a pr\xF3xima data.":""}</span></p>
      <div class="sheet-actions">
        ${r?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${f("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._closeSheet()}>Fechar</button>
      </div>
    `}_renderItemSheet(){let t=this._form,e=this._list(t.listId),s=this._list(t.target)||e;if(!e||!s)return u;if(t.mirrored&&t.mode==="edit")return this._renderMirroredSheet(e);let a=s.features,r=$(a,_.DESCRIPTION),o=this._dueOn()&&($(a,_.DUE_DATE)||$(a,_.DUE_DATETIME)),d=$(a,_.DUE_DATETIME),n=t.mode==="edit"&&$(e.features,_.DELETE),c=Ms(),p=c.some(m=>m.date===t.date),h=t.mode==="add"?this._L.filter(m=>$(m.features,_.CREATE)&&!m.unavailable&&(!m.hidden||m.id===t.target)):$(e.features,_.DELETE)?this._L.filter(m=>$(m.features,_.CREATE)&&!m.unavailable&&(!m.hidden||m.id===e.id)):[],g=m=>{let v=this.renderRoot.querySelector(m);if(v)try{v.showPicker()}catch{v.focus(),v.click()}};return l`
      <div class="sheet-head">
        <h3 class="display">${t.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      ${t.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(t.target,"text"),photos:()=>this._openImport(t.target,"photos"),scan:()=>this._openImport(t.target,"scan")}):u}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${t.summary} @input=${m=>this._setForm({summary:m.target.value})} @keydown=${m=>m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${r?l`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${t.description} @input=${m=>this._setForm({description:m.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:u}
      ${o?l`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row grid">
              ${c.map(m=>l`<button class="pick ${t.date===m.date?"on":""}" @click=${()=>this._setForm({date:t.date===m.date?null:m.date})}>${m.label}</button>`)}
              <button class="pick ${t.date&&!p?"on":""}" @click=${()=>g("#rv-date")}>
                ${f("calendar")}<span>${t.date&&!p?ce(t.date):"Outra data"}</span>
                <input id="rv-date" class="hidden-input" type="date" tabindex="-1" .value=${t.date||""} @change=${m=>this._setForm({date:m.target.value||null})} />
              </button>
              ${t.date?l`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null})}>${f("x")}<span>Sem prazo</span></button>`:u}
            </div>
            ${d&&t.date?l`<div class="time-row">
                  <span class="tl">Horário</span>
                  <input type="time" .value=${t.time||""} @change=${m=>this._setForm({time:m.target.value||null})} />
                  ${t.time?l`<button class="text-btn" @click=${()=>this._setForm({time:null})}>Dia todo</button>`:u}
                </div>`:u}
          </div>`:u}
      ${this._rulesOk&&this._repeatOn()&&!t.mirrored&&($(a,_.UPDATE)||$(a,_.CREATE))?l`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${t.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>Não</button>
              ${Ds.map(m=>l`<button class="pick ${t.repeat===m.days&&!t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:m.days,repeatCustom:!1})}>${m.label}</button>`)}
              <button class="pick ${t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:t.repeat||4})}>${f("repeat")}<span>Outro</span></button>
            </div>
            ${t.repeatCustom?l`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(t.repeat||"")} @input=${m=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(m.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:u}
            ${t.repeat?l`<div class="field-hint">${f("repeat")}<span>Quando você concluir, volta sozinha ${t.repeat===1?"no dia seguinte":`em ${t.repeat} dias`} (no começo do dia).</span></div>`:u}
          </div>`:u}
      ${this._renderPointsField(t)}
      ${h.length>1?l`<div class="field">
            <span class="flabel">${t.mode==="add"?"Lista":"Lista (mover)"}</span>
            <div class="chip-row grid">
              ${h.map(m=>l`<button class="pick list ${t.target===m.id?"on":""}" style=${M(m.color,this._dark)} @click=${()=>this._setForm({target:m.id})}><span class="dot"></span><span>${T(m.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        ${n?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${f("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._saveItem()}>${t.mode==="add"?"Adicionar":t.target!==t.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(t,{label:e=!0}={}){let s=this._aiInfo(),a=this._isHaAndroid(),r=(o,d,n,c=!1)=>l`<button type="button" class="imp-tile" ?disabled=${c} @click=${t[o]}>${f(d)}<span>${n}</span></button>`;return l`<div class="field imp-field">
        ${e?l`<span class="flabel">Trazer de mensagem ou foto</span>`:u}
        <div class="imp-tiles">
          ${r("text","clipboard-paste","Colar mensagem")}
          ${r("photos","images","Escolher fotos",!s.images)}
          ${r("scan","scan-text","Digitalizar com\xA0IA",!s.images)}
        </div>
        ${a&&s.images?l`<p class="imp-help">No app do Home Assistant, Escolher fotos abre a galeria (uma foto por vez). Para fotografar uma lista na hora, use Digitalizar com IA, que abre a câmera aqui dentro.</p>`:u}
      </div>
      <div class="ai-box">${f("scan-text")}<span>${s.ready?"Com uma mensagem ou foto, a IA separa os itens da lista. Voc\xEA confere antes de adicionar.":"Sem IA configurada, a mensagem \xE9 separada por linhas e v\xEDrgulas. Para ler fotos, configure a Leitura por IA em Mais."}</span></div>`}_renderImportSheet(){let t=this._form,e=this._aiInfo(),s=(d,n)=>l`<div class="sheet-head">
      ${n?l`<button class="icon-btn back" @click=${n} aria-label="Voltar">${f("chevron-left")}</button>`:u}
      <h3 class="display">${d}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},r=t.error?l`<div class="imp-error">${f("circle-alert")}<span>${t.error}</span></div>`:u,o=t.images&&t.images.length?l`<div class="thumbs">${t.images.map(d=>l`<img src=${d.url} alt="" />`)}</div>`:u;if(t.step==="voice")return this._renderVoiceStep(s);if(t.step==="text")return l`
        ${s(t.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${t.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${d=>this._setForm({text:d.target.value,error:null})}></textarea>
        </label>
        ${r}
        <div class="sheet-actions">
          <button class="btn outline" @click=${()=>this._pasteClipboard()}>${f("clipboard-paste")}Colar</button>
          <button class="btn primary" ?disabled=${!(t.text||"").trim()} @click=${()=>this._readText()}>${e.ready?f("sparkles"):u}Separar itens</button>
        </div>
        <p class="sheet-note">${e.ready?`${e.using.name} separa os itens, mesmo de mensagens corridas.`:"Sem IA configurada: separo por linhas, v\xEDrgulas e \u201Ce\u201D."}</p>
      `;if(t.step==="loading")return l`
        ${s("Lendo\u2026")}
        ${o}
        <div class="imp-loading">
          <span class="spin">${f("loader-circle")}</span>
          <span>${t.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>t.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>Cancelar</button></div>
      `;if(t.step==="review"){let d=this._list(t.target),n=t.items.filter(h=>h.on&&h.text.trim()).length,c=this._L.filter(h=>$(h.features,_.CREATE)&&!h.unavailable&&(!h.hidden||h.id===t.target)),p=t.provider==="local"?"separados por linha":t.provider?`lidos por ${t.provider}`:"";return l`
        ${s("Revisar itens",a)}
        ${o}
        ${t.heard?l`<p class="heard">${f("mic")}<span>“${t.heard}”</span></p>`:u}
        <p class="sheet-note top">${b(t.items.length,"item encontrado","itens encontrados")}${p?` \xB7 ${p}`:""}. Toque no texto para corrigir.</p>
        ${t.note?l`<div class="imp-error soft">${f("sparkles")}<span>${t.note}</span></div>`:u}
        <div class="imp-list">
          ${t.items.map((h,g)=>l`<div class="imp-row ${h.on?"":"off"}">
              <button class="check ${h.on?"on":""}" role="checkbox" aria-checked=${h.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(g,{on:!h.on})}>${f("check")}</button>
              <input type="text" .value=${h.text} aria-label="Item" @input=${m=>this._setImportItem(g,{text:m.target.value})} />
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:t.items.filter((m,v)=>v!==g)})}>${f("x")}</button>
            </div>`)}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...t.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let h=this.renderRoot.querySelectorAll(".imp-row input");h.length&&h[h.length-1].focus()})}}>${f("plus")}<span>Adicionar linha</span></button>
        </div>
        ${e.images?l`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${f("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${f("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:u}
        ${c.length>1?l`<div class="field">
              <span class="flabel">Adicionar em</span>
              <div class="chip-row grid">
                ${c.map(h=>l`<button class="pick list ${t.target===h.id?"on":""}" style=${M(h.color,this._dark)} @click=${()=>this._setForm({target:h.id})}><span class="dot"></span><span>${T(h.name,26)}</span></button>`)}
              </div>
            </div>`:u}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!n} @click=${()=>this._importAdd()}>
            ${n?`Adicionar ${b(n,"item","itens")}`:"Nenhum item marcado"}${d&&c.length<=1?` em ${T(d.name,18)}`:""}
          </button>
        </div>
      `}return l`
      ${s("Importar itens")}
      <p class="sheet-lead">Traga uma lista pronta de uma mensagem do WhatsApp, de um print ou de uma lista em papel.</p>
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${e.images?u:l`<div class="imp-error soft">${f("sparkles")}<span>${e.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>Ver Leitura por IA</button></span></div>`}
      ${r}
    `}_renderListMenu(){let t=this._list(this._form.listId);return t?l`
      <div class="sheet-head">
        <h3 class="display">${t.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <button class="menu-row" @click=${()=>this._openCustomize(t)}>${f("palette")}Personalizar<span class="sub">${t.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(t.id,{hidden:t.hidden?null:!0}))}>${f(t.hidden?"eye":"eye-off")}${t.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?l`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${t.id}`)}>${f("external-link")}Abrir na tela padrão do HA</button>`:u}
      ${$(t.features,_.DELETE)&&t.done?l`<button class="menu-row danger" @click=${()=>this._confirmClearDone(t)}>${f("brush-cleaning")}Limpar concluídos<span class="sub">${t.done}</span></button>`:u}
    `:u}_renderCustomize(){let t=this._form,e=this._list(t.listId);if(!e)return u;let s=it(t.color)||e.color,a=t.icon||ne(`${e.origName} ${e.group||""} ${e.id}`);return l`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <div class="preview-tile" style=${M(s,this._dark)}>
        <span class="tile">${f(a)}</span>
        <span class="lc-main"><span class="lc-title">${(t.name||"").trim()||e.origName}</span><span class="lc-meta">${e.group||e.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">Nome</span>
        <input type="text" .value=${t.name} placeholder=${e.origName} @input=${r=>this._setForm({name:r.target.value})} />
      </label>
      <div class="field">
        <span class="flabel">Cor</span>
        <div class="swatches">
          ${at.map(r=>l`<button class="sw ${s.id===r.id?"on":""}" style="--c:${r.fill}" aria-label=${r.label} @click=${()=>this._setForm({color:r.id})}>${s.id===r.id?f("check"):u}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${M(s,this._dark)}>
          ${As.map(r=>l`<button class="ig ${a===r?"on":""}" aria-label=${r} @click=${()=>this._setForm({icon:r})}>${f(r)}</button>`)}
        </div>
      </div>
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!t.hidden} @change=${r=>this._setForm({hidden:!r.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?e.canDue?l`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">Prazos</div>
              <div class="hint" style="white-space:normal">${t.deadlines?"O prazo que voc\xEA define fica vermelho quando vence e entra em Prazos.":"As datas aparecem s\xF3 como informa\xE7\xE3o: n\xE3o ficam vermelhas nem entram em Prazos."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${t.deadlines} @change=${r=>this._setForm({deadlines:r.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:e.hasDates?l`<p class="sheet-note with-icon">${f("info")}<span>Esta lista não deixa definir prazo. As datas dos itens vêm da integração (ex.: desde quando um aparelho está fora do ar) e aparecem só como informação, sem ficar vermelhas nem entrar em Prazos.</span></p>`:u:u}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:e.canDue})}>${f("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>Salvar</button>
      </div>
    `}_renderConfirm(){let t=this._form;return l`
      <div class="sheet-head"><h3 class="display">${t.title}</h3></div>
      <p class="confirm-text">${t.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${()=>t.run()}>${t.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return u;let t=this._toast;return l`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${t.text}</span>
      ${t.action?l`<button @click=${()=>{this._toast=null,t.action.run()}}>${t.action.label}</button>`:u}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",fe);var ge=class{constructor(t,e){this.url=t,this.onStatus=e,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let t=new WebSocket(this.url);this.ws=t,t.onopen=()=>{this.open=!0,this.backoff=1e3;let e=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))t.send(s);if(this.onStatus&&this.onStatus(!0),e)for(let s of this.reconnectHandlers)s()},t.onmessage=e=>{let s;try{s=JSON.parse(e.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let r=new Error(s.error&&s.error.message||"Falhou");r.code=s.error&&s.error.code,a.reject(r)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},t.onclose=()=>{let e=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),e&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(t){this.reconnectHandlers.push(t)}_send(t){let e=JSON.stringify(t);this.open?this.ws.send(e):this.queue.push(e)}sendMessagePromise(t){let e=this.nextId++;return new Promise((s,a)=>{this.pending.set(e,{resolve:s,reject:a}),this._send({...t,id:e})})}subscribeMessage(t,e){let s={cb:t,msg:e,id:null,first:null};this.subs.add(s);let a=new Promise((r,o)=>{s.first={resolve:r,reject:o}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(t){let e=this.nextId++;t.id=e,this.byId.set(e,t),this.pending.set(e,{resolve:()=>{t.first&&t.first.resolve(),t.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(e),this.subs.delete(t),t.first&&t.first.reject(s),t.first=null)}}),this.ws.send(JSON.stringify({...t.msg,id:e}))}};function Fs(){try{if(window.parent===window)return null;let i=window.parent.document.querySelector("home-assistant");return i&&i.hass||null}catch{return null}}var xt=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function Vs(){let i=Fs();return i&&i.themes&&typeof i.themes.darkMode=="boolean"?i.themes.darkMode:!!(xt&&xt.matches)}function qs(){return{topbar:!(window.parent!==window),haptic(t){try{let e=window.parent;e!==window&&e.dispatchEvent(new e.CustomEvent("haptic",{detail:t}))}catch{}},openInHA(t){try{let e=window.parent;if(e!==window&&e.document){e.history.pushState(null,"",t),e.dispatchEvent(new e.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(t,"_top")}}}async function Ns(i){let t=new URL("ws",location.href);t.protocol=location.protocol==="https:"?"wss:":"ws:";let e=null,s=n=>{e={...e,...n},i(e)},a=new ge(t.href,n=>e&&s({connected:n})),r=await a.sendMessagePromise({type:"resolvia/bootstrap"}),o=Fs();e={states:r.states||{},entities:r.entities||{},devices:r.devices||{},user:{name:o&&o.user&&o.user.name||r.user&&r.user.name||"",is_admin:o&&o.user?!!o.user.is_admin:!0},themes:{darkMode:Vs()},language:"pt-BR",connected:!0,version:r.version,resolvia:{ai:r.ai||{ready:!1,images:!1,entities:[]},aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:()=>a.sendMessagePromise({type:"resolvia/voice/status"}),async voiceText(n){let c=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength)}),p=await c.json().catch(()=>({}));if(!c.ok){let h=new Error(p.error||`Erro ${c.status}`);throw h.code=p.code,h}return p},async extract(n){let c=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)}),p=await c.json().catch(()=>({}));if(!c.ok){let h=new Error(p.error||`Erro ${c.status}`);throw h.code=p.code,h}return p},data:{url:n=>new URL(`api/export/${n}`,location.href).href,async import(n){let c=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(n.name||"")},body:n}),p=await c.json().catch(()=>({}));if(!c.ok)throw new Error(p.error||`Erro ${c.status}`);return p},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:n=>a.sendMessagePromise({type:"resolvia/versions/restore",name:n}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:n=>a.sendMessagePromise({type:"resolvia/backups/restore",name:n})}},connection:a,callWS:n=>a.sendMessagePromise(n),callService:(n,c,p,h)=>a.sendMessagePromise({type:"call_service",domain:n,service:c,service_data:p||{},target:h})},a.subscribeMessage(n=>{let c={...e.states};n.new_state?c[n.entity_id]=n.new_state:delete c[n.entity_id],s({states:c})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let n=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:n.states||{},entities:n.entities||{},devices:n.devices||{}})}catch{}});let d=()=>{let n=Vs();e&&n!==e.themes.darkMode&&s({themes:{...e.themes,darkMode:n}})};return setInterval(d,1500),xt&&xt.addEventListener&&xt.addEventListener("change",d),e}var ve=document.getElementById("app"),ot=document.createElement("resolvia-panel");ot.env=qs();ot.narrow=window.innerWidth<870;window.addEventListener("resize",()=>ot.narrow=window.innerWidth<870);Ns(i=>{ot.hass=i}).then(i=>{ot.hass=i,ve.replaceChildren(ot)}).catch(i=>{ve.innerHTML="";let t=document.createElement("div");t.id="boot",t.textContent=`N\xE3o consegui iniciar o ResolvIA: ${i.message}. Recarregue a p\xE1gina.`,ve.appendChild(t)});})();
