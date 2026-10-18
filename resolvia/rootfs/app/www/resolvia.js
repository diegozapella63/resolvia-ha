/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{var mt=globalThis,Ft=mt.ShadowRoot&&(mt.ShadyCSS===void 0||mt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Vt=Symbol(),se=new WeakMap,ft=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Vt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Ft&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=se.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&se.set(e,t))}return t}toString(){return this.cssText}},Mt=a=>new ft(typeof a=="string"?a:a+"",void 0,Vt),$e=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[r+1],a[0]);return new ft(e,a,Vt)},os=(a,t)=>{if(Ft)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=mt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,a.appendChild(s)}},ie=Ft?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Mt(e)})(a):a,{is:ls,defineProperty:cs,getOwnPropertyDescriptor:ds,getOwnPropertyNames:hs,getOwnPropertySymbols:ps,getPrototypeOf:us}=Object,St=globalThis,ae=St.trustedTypes,ms=ae?ae.emptyScript:"",fs=St.reactiveElementPolyfillSupport,et=(a,t)=>a,Dt={toAttribute(a,t){switch(t){case Boolean:a=a?ms:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},ye=(a,t)=>!ls(a,t),re={attribute:!0,type:String,converter:Dt,reflect:!1,useDefault:!1,hasChanged:ye};Symbol.metadata??=Symbol("metadata"),St.litPropertyMetadata??=new WeakMap;var H=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=re){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&cs(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=ds(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);r?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??re}static o(){if(this.hasOwnProperty(et("elementProperties")))return;let t=us(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(et("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(et("properties"))){let e=this.properties,s=[...hs(e),...ps(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this.u=new Map;for(let[e,s]of this.elementProperties){let i=this.p(e,s);i!==void 0&&this.u.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ie(i))}else t!==void 0&&e.push(ie(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return os(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor.p(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:Dt).toAttribute(e,s.type);this.m=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this.m=null}}_$AK(t,e){let s=this.constructor,i=s.u.get(t);if(i!==void 0&&this.m!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Dt;this.m=i;let l=n.fromAttribute(e,r.type);this[i]=l??this.T?.get(i)??l,this.m=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let n=this.constructor;if(i===!1&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??ye)(r,e)||s.useDefault&&s.reflect&&r===this.T?.get(t)&&!this.hasAttribute(n.p(t,s))))return;this.M(t,e,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this.T??=new Map).has(t)&&(this.T.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[i,r]of this.v)this[i]=r;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.M(i,void 0,r,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.U()}catch(s){throw t=!1,this.U(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach(e=>this.C(e,this[e])),this.U()}updated(t){}firstUpdated(t){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[et("elementProperties")]=new Map,H[et("finalized")]=new Map,fs?.({ReactiveElement:H}),(St.reactiveElementVersions??=[]).push("2.1.2");var Nt=globalThis,ne=a=>a,vt=Nt.trustedTypes,oe=vt?vt.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ut="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,Bt="?"+I,vs=`<${Bt}>`,V=document,it=()=>V.createComment(""),at=a=>a===null||typeof a!="object"&&typeof a!="function",qt=Array.isArray,we=a=>qt(a)||typeof a?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,ce=/>/g,P=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,he=/"/g,ke=/^(?:script|style|textarea|title)$/i,jt=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),h=jt(1),gs=jt(2),Js=jt(3),y=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),pe=new WeakMap,F=V.createTreeWalker(V,129);function Ae(a,t){if(!qt(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return oe!==void 0?oe.createHTML(t):t}var Me=(a,t)=>{let e=a.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",n=tt;for(let l=0;l<e;l++){let o=a[l],c,p,d=-1,v=0;for(;v<o.length&&(n.lastIndex=v,p=n.exec(o),p!==null);)v=n.lastIndex,n===tt?p[1]==="!--"?n=le:p[1]!==void 0?n=ce:p[2]!==void 0?(ke.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=P):p[3]!==void 0&&(n=P):n===P?p[0]===">"?(n=i??tt,d=-1):p[1]===void 0?d=-2:(d=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?P:p[3]==='"'?he:de):n===he||n===de?n=P:n===le||n===ce?n=tt:(n=P,i=void 0);let m=n===P&&a[l+1].startsWith("/>")?" ":"";r+=n===tt?o+vs:d>=0?(s.push(c),o.slice(0,d)+Ut+o.slice(d)+I+m):o+I+(d===-2?l:m)}return[Ae(a,r+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},rt=class a{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0,l=t.length-1,o=this.parts,[c,p]=Me(t,e);if(this.el=a.createElement(c,s),F.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=F.nextNode())!==null&&o.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Ut)){let v=p[n++],m=i.getAttribute(d).split(I),g=/([.?@])?(.*)/.exec(v);o.push({type:1,index:r,name:g[2],strings:m,ctor:g[1]==="."?bt:g[1]==="?"?xt:g[1]==="@"?_t:U}),i.removeAttribute(d)}else d.startsWith(I)&&(o.push({type:6,index:r}),i.removeAttribute(d));if(ke.test(i.tagName)){let d=i.textContent.split(I),v=d.length-1;if(v>0){i.textContent=vt?vt.emptyScript:"";for(let m=0;m<v;m++)i.append(d[m],it()),F.nextNode(),o.push({type:2,index:++r});i.append(d[v],it())}}}else if(i.nodeType===8)if(i.data===Bt)o.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(I,d+1))!==-1;)o.push({type:7,index:r}),d+=I.length-1}r++}}static createElement(t,e){let s=V.createElement("template");return s.innerHTML=t,s}};function N(a,t,e=a,s){if(t===y)return t;let i=s!==void 0?e.N?.[s]:e.O,r=at(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(a),i._$AT(a,e,s)),s!==void 0?(e.N??=[])[s]=i:e.O=i),i!==void 0&&(t=N(a,i._$AS(a,t.values),i,s)),t}var gt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??V).importNode(e,!0);F.currentNode=i;let r=F.nextNode(),n=0,l=0,o=s[0];for(;o!==void 0;){if(n===o.index){let c;o.type===2?c=new Et(r,r.nextSibling,this,t):o.type===1?c=new o.ctor(r,o.name,o.strings,this,t):o.type===6&&(c=new $t(r,this,t)),this._$AV.push(c),o=s[++l]}n!==o?.index&&(r=F.nextNode(),n++)}return F.currentNode=V,i}V(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Et=class Se{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,s,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.D=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=N(this,t,e),at(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):we(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==u&&at(this._$AH)?this._$AA.nextSibling.data=t:this.I(V.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=rt.createElement(Ae(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.V(e);else{let r=new gt(i,this),n=r.R(this.options);r.V(e),this.I(n),this._$AH=r}}_$AC(t){let e=pe.get(t.strings);return e===void 0&&pe.set(t.strings,e=new rt(t)),e}H(t){qt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new Se(this.B(it()),this.B(it()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ne(t).nextSibling;ne(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,i){let r=this.strings,n=!1;if(r===void 0)t=N(this,t,e,0),n=!at(t)||t!==this._$AH&&t!==y,n&&(this._$AH=t);else{let l=t,o,c;for(t=r[0],o=0;o<r.length-1;o++)c=N(this,l[s+o],e,o),c===y&&(c=this._$AH[o]),n||=!at(c)||c!==this._$AH[o],c===u?t=u:t!==u&&(t+=(c??"")+r[o+1]),this._$AH[o]=c}n&&!i&&this.W(t)}W(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bt=class extends U{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===u?void 0:t}},xt=class extends U{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},_t=class extends U{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=N(this,t,e,0)??u)===y)return;let s=this._$AH,i=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==u&&(s===u||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},$t=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}},bs={q:Ut,J:I,Z:Bt,F:1,G:Me,K:gt,X:we,Y:N,tt:Et,st:U,it:xt,et:_t,ht:bt,ot:$t},xs=Nt.litHtmlPolyfillSupport;xs?.(rt,Et),(Nt.litHtmlVersions??=[]).push("3.3.3");var Ee=(a,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new Et(t.insertBefore(it(),r),r,void 0,e??{})}return i._$AI(a),i},Yt=globalThis;var O=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=Ee(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return y}};O._$litElement$=!0,O.finalized=!0,Yt.litElementHydrateSupport?.({LitElement:O});var _s=Yt.litElementPolyfillSupport;_s?.({LitElement:O});(Yt.litElementVersions??=[]).push("4.2.2");var{tt:$s}=bs,ue=a=>a,ys=a=>a===null||typeof a!="object"&&typeof a!="function";var me=(a,t)=>t===void 0?a?._$litType$!==void 0:a?._$litType$===t,ws=a=>a?._$litType$?.h!=null;var Te=a=>a.strings===void 0,fe=()=>document.createComment(""),D=(a,t,e)=>{let s=a._$AA.parentNode,i=t===void 0?a._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(fe(),i),n=s.insertBefore(fe(),i);e=new $s(r,n,a,a.options)}else{let r=e._$AB.nextSibling,n=e._$AM,l=n!==a;if(l){let o;e._$AQ?.(a),e._$AM=a,e._$AP!==void 0&&(o=a._$AU)!==n._$AU&&e._$AP(o)}if(r!==i||l){let o=e._$AA;for(;o!==r;){let c=ue(o).nextSibling;ue(s).insertBefore(o,i),o=c}}}return e},R=(a,t,e=a)=>(a._$AI(t,e),a),ks={},nt=(a,t=ks)=>a._$AH=t,Ot=a=>a._$AH,Rt=a=>{a._$AR(),a._$AA.remove()},ze=a=>{a._$AR()};var A=a=>(...t)=>({_$litDirective$:a,values:t}),S=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.ct=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var st=(a,t)=>{let e=a._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),st(s,t);return!0},yt=a=>{let t,e;do{if((t=a._$AM)===void 0)break;e=t._$AN,e.delete(a),a=t}while(e?.size===0)},Ie=a=>{for(let t;t=a._$AM;a=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(a))break;e.add(a),Ss(t)}};function As(a){this._$AN!==void 0?(yt(this),this._$AM=a,Ie(this)):this._$AM=a}function Ms(a,t=!1,e=0){let s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)st(s[r],!1),yt(s[r]);else s!=null&&(st(s,!1),yt(s));else st(this,a)}var Ss=a=>{a.type==2&&(a._$AP??=Ms,a._$AQ??=As)},ot=class extends S{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ie(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(st(this,t),yt(this))}setValue(t){if(Te(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var wt=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},kt=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(t=>this.dt=t)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var At=class extends ot{constructor(){super(...arguments),this.ft=new wt(this),this.vt=new kt}render(t,e){return y}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.yt)return y;this.yt=e;let i=0,{ft:r,vt:n}=this;return(async(l,o)=>{for await(let c of l)if(await o(c)===!1)return})(e,async l=>{for(;n.get();)await n.get();let o=r.deref();if(o!==void 0){if(o.yt!==e)return!1;s!==void 0&&(l=s(l,i)),o.commitValue(l,i),i++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Xs=A(At),Ks=A(class extends At{constructor(a){if(super(a),a.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(a,t){return this.rt=a,super.update(a,t)}commitValue(a,t){t===0&&ze(this.rt);let e=D(this.rt);R(e,a)}}),ve=a=>ws(a)?a._$litType$.h:a.strings,Zs=A(class extends S{constructor(a){super(a),this.bt=new WeakMap}render(a){return[a]}update(a,[t]){let e=me(this.gt)?ve(this.gt):null,s=me(t)?ve(t):null;if(e!==null&&(s===null||e!==s)){let i=Ot(a).pop(),r=this.bt.get(e);if(r===void 0){let n=document.createDocumentFragment();r=Ee(u,n),r.setConnected(!1),this.bt.set(e,r)}nt(r,[i]),D(r,void 0,i)}if(s!==null){if(e===null||e!==s){let i=this.bt.get(s);if(i!==void 0){let r=Ot(i).pop();ze(a),D(a,void 0,r),nt(a,[r])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var Qs=A(class extends S{constructor(a){if(super(a),a.type!==1||a.name!=="class"||a.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(t=>a[t]).join(" ")+" "}update(a,[t]){if(this.wt===void 0){this.wt=new Set,a.strings!==void 0&&(this._t=new Set(a.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(t)}let e=a.element.classList;for(let s of this.wt)s in t||(e.remove(s),this.wt.delete(s));for(let s in t){let i=!!t[s];i===this.wt.has(s)||this._t?.has(s)||(i?(e.add(s),this.wt.add(s)):(e.remove(s),this.wt.delete(s)))}return y}}),Es={},Gs=A(class extends S{constructor(){super(...arguments),this.St=Es}render(a,t){return t()}update(a,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every((s,i)=>s===this.St[i]))return y}else if(this.St===t)return y;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var ti=A(class extends S{constructor(){super(...arguments),this.key=u}render(a,t){return this.key=a,t}update(a,[t,e]){return t!==this.key&&(nt(a),this.key=t),e}}),ei=A(class extends S{constructor(a){if(super(a),a.type!==3&&a.type!==1&&a.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Te(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[t]){if(t===y||t===u)return t;let e=a.element,s=a.name;if(a.type===3){if(t===e[s])return y}else if(a.type===4){if(!!t===e.hasAttribute(s))return y}else if(a.type===1&&e.getAttribute(s)===t+"")return y;return nt(a),t}});var Ht=new WeakMap,si=A(class extends ot{render(a){return u}update(a,[t]){let e=t!==this.lt;return e&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=a.options?.host,this.$t(this.xt=a.element)),u}$t(a){if(this.lt!==void 0)if(this.isConnected||(a=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=Ht.get(t);e===void 0&&(e=new WeakMap,Ht.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,a),a!==void 0&&this.lt.call(this.Et,a)}else this.lt.value=a}get Tt(){return typeof this.lt=="function"?Ht.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),ge=(a,t,e)=>{let s=new Map;for(let i=t;i<=e;i++)s.set(a[i],i);return s},W=A(class extends S{constructor(a){if(super(a),a.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(a,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let i=[],r=[],n=0;for(let l of a)i[n]=s?s(l,n):n,r[n]=e(l,n),n++;return{values:r,keys:i}}render(a,t,e){return this.Ct(a,t,e).values}update(a,[t,e,s]){let i=Ot(a),{values:r,keys:n}=this.Ct(t,e,s);if(!Array.isArray(i))return this.Pt=n,r;let l=this.Pt??=[],o=[],c,p,d=0,v=i.length-1,m=0,g=r.length-1;for(;d<=v&&m<=g;)if(i[d]===null)d++;else if(i[v]===null)v--;else if(l[d]===n[m])o[m]=R(i[d],r[m]),d++,m++;else if(l[v]===n[g])o[g]=R(i[v],r[g]),v--,g--;else if(l[d]===n[g])o[g]=R(i[d],r[g]),D(a,o[g+1],i[d]),d++,g--;else if(l[v]===n[m])o[m]=R(i[v],r[m]),D(a,i[d],i[v]),v--,m++;else if(c===void 0&&(c=ge(n,m,g),p=ge(l,d,v)),c.has(l[d]))if(c.has(l[v])){let _=p.get(n[m]),q=_!==void 0?i[_]:null;if(q===null){let Q=D(a,i[d]);R(Q,r[m]),o[m]=Q}else o[m]=R(q,r[m]),D(a,i[d],q),i[_]=null;m++}else Rt(i[v]),v--;else Rt(i[d]),d++;for(;m<=g;){let _=D(a,o[g+1]);R(_,r[m]),o[m++]=_}for(;d<=v;){let _=i[d++];_!==null&&Rt(_)}return this.Pt=n,nt(a,o),y}}),Le="important",Ts=" !"+Le,ii=A(class extends S{constructor(a){if(super(a),a.type!==1||a.name!=="style"||a.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(a){return Object.keys(a).reduce((t,e)=>{let s=a[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(a,[t]){let{style:e}=a.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let s of this.Mt)t[s]==null&&(this.Mt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.Mt.add(s);let r=typeof i=="string"&&i.endsWith(Ts);s.includes("-")||r?e.setProperty(s,r?i.slice(0,-11):i,r?Le:""):e[s]=i}}return y}}),ai=A(class extends S{constructor(a){if(super(a),a.type!==2)throw Error("templateContent can only be used in child bindings")}render(a){return this.At===a?y:(this.At=a,document.importNode(a.content,!0))}}),Y=class extends S{constructor(t){if(super(t),this.gt=u,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this.kt=void 0,this.gt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Y.directiveName="unsafeHTML",Y.resultType=1;var ri=A(Y);var lt=class extends Y{};lt.directiveName="unsafeSVG",lt.resultType=2;var Ce=A(lt),be=a=>!ys(a)&&typeof a.then=="function",xe=1073741823;var Pt=class extends ot{constructor(){super(...arguments),this.Ot=xe,this.Ut=[],this.ft=new wt(this),this.vt=new kt}render(...t){return t.find(e=>!be(e))??y}update(t,e){let s=this.Ut,i=s.length;this.Ut=e;let r=this.ft,n=this.vt;this.isConnected||this.disconnected();for(let l=0;l<e.length&&!(l>this.Ot);l++){let o=e[l];if(!be(o))return this.Ot=l,o;l<i&&o===s[l]||(this.Ot=xe,i=0,Promise.resolve(o).then(async c=>{for(;n.get();)await n.get();let p=r.deref();if(p!==void 0){let d=p.Ut.indexOf(o);d>-1&&d<p.Ot&&(p.Ot=d,p.setValue(c))}}))}return y}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},ni=A(Pt);var zs=Symbol.for(""),Is=a=>{if(a?.r===zs)return a?._$litStatic$};var _e=new Map,Re=a=>(t,...e)=>{let s=e.length,i,r,n=[],l=[],o,c=0,p=!1;for(;c<s;){for(o=t[c];c<s&&(r=e[c],(i=Is(r))!==void 0);)o+=i+t[++c],p=!0;c!==s&&l.push(r),n.push(o),c++}if(c===s&&n.push(t[s]),p){let d=n.join("$$lit$$");(t=_e.get(d))===void 0&&(n.raw=n,_e.set(d,t=n)),e=l}return a(t,...e)},oi=Re(h),li=Re(gs);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var Wt={menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>'};var He="./fonts/barlow-400.woff2";var De="./fonts/barlow-500.woff2";var Oe="./fonts/barlow-600.woff2";var Pe="./fonts/barlow-condensed-500.woff2";var Fe="./fonts/barlow-condensed-600.woff2";var Ve="./fonts/barlow-condensed-700.woff2";var Ne='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',Ue=`"RV Barlow", ${Ne}`,Be=`"RV Barlow Condensed", ${Ne}`;function qe(){if(document.getElementById("resolvia-fonts"))return;let a=(e,s,i)=>`@font-face{font-family:"${e}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${i};font-style:normal;font-display:swap}`,t=document.createElement("style");t.id="resolvia-fonts",t.textContent=[a("RV Barlow",He,400),a("RV Barlow",De,500),a("RV Barlow",Oe,"600 900"),a("RV Barlow Condensed",Pe,500),a("RV Barlow Condensed",Fe,600),a("RV Barlow Condensed",Ve,"700 900")].join(`
`),document.head.appendChild(t)}var je=$e`
  :host {
    --rv-body: ${Mt(Ue)};
    --rv-display: ${Mt(Be)};
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
    margin: 26px 4px 28px;
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
    top: 2px;
    left: calc(50% + 6px);
    min-width: 19px;
    height: 19px;
    padding: 0 5px;
    border-radius: 10px;
    background: var(--rv-late);
    color: #fff;
    font-size: 12px;
    font-family: var(--rv-display);
    font-weight: 600;
    display: grid;
    place-items: center;
    border: 2px solid var(--rv-nav);
    font-variant-numeric: tabular-nums;
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
  .sheet-note.top {
    margin: -6px 2px 14px;
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
`;var b={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},x=(a,t)=>((a||0)&t)===t,J=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"framboesa",label:"Framboesa",fill:"#E8508A",ink:"#A3124F"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"grafite",label:"Grafite",fill:"#B9ADAE",ink:"#5E5253"}],Ye=["vermelho","coral","rosa","laranja","framboesa","ouro"],X=a=>J.find(t=>t.id===a),We=a=>X(Ye[a%Ye.length]);function zt(a,t){let e=a.replace("#",""),s=parseInt(e.length===3?e.replace(/./g,i=>i+i):e,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${t})`}function k(a,t,e="c"){return`--${e}:${a.fill};--${e}i:${t?a.fill:a.ink};--${e}s:${zt(a.fill,t?.17:.15)};`}var K=a=>(a||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),Je=a=>Array.from(a||"",t=>{let e=t.normalize("NFD")[0]||t;return e.toLowerCase().length===1?e.toLowerCase():t}).join(""),E=(a,t,e)=>`${a} ${a===1?t:e}`,T=(a,t=38)=>a.length>t?a.slice(0,t-1).trimEnd()+"\u2026":a;function Xe(a,t){let e=a.states[t],s=e&&e.attributes&&e.attributes.friendly_name||t.split(".")[1].replace(/_/g," "),i=a.entities&&a.entities[t],r=i&&i.device_id&&a.devices?a.devices[i.device_id]:void 0,n=r?r.name_by_user||r.name:void 0,l=s,o=n||null;return n&&s.toLowerCase().startsWith(n.toLowerCase()+" ")&&(l=s.slice(n.length+1)),l=l.charAt(0).toUpperCase()+l.slice(1),{name:l,group:o}}var Ps=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/pet|cachorro|dog/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function Xt(a){let t=K(a);for(let[e,s]of Ps)if(e.test(t))return s;return"list-checks"}var Ke=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],Fs=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],Vs=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Tt=a=>String(a).padStart(2,"0"),B=a=>`${a.getFullYear()}-${Tt(a.getMonth()+1)}-${Tt(a.getDate())}`,Ns=a=>`${Tt(a.getHours())}:${Tt(a.getMinutes())}`;function It(a){let[t,e,s]=a.split("-").map(Number);return new Date(t,e-1,s)}function Jt(a,t){let e=new Date(a.getFullYear(),a.getMonth(),a.getDate());return e.setDate(e.getDate()+t),e}function ct(a){if(!a)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(a)){let e=It(a);return{date:a,time:null,at:new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59)}}let t=new Date(a);return isNaN(t)?null:{date:B(t),time:Ns(t),at:t}}function Us(a,t=new Date){let e=It(a),s=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-s)/864e5)}function Kt(a,t=new Date){let e=It(a),s=`${e.getDate()} ${Vs[e.getMonth()]}`;return e.getFullYear()===t.getFullYear()?s:`${s} ${e.getFullYear()}`}function dt(a,t=new Date){let e=ct(a);if(!e)return null;let s=Us(e.date,t),i=e.at<t,r;s===0?r="Hoje":s===1?r="Amanh\xE3":s===-1?r="Ontem":s>1&&s<7?r=Fs[It(e.date).getDay()]:r=Kt(e.date,t),e.time&&(r+=`, ${e.time}`);let n=i?"late":s===0?"today":s<=2?"soon":"later";return{...e,diff:s,overdue:i,text:r,tone:n}}function Ze(a=new Date){let t=a.getDay(),e=(6-t+7)%7||7,s=(1-t+7)%7||7,i=[{label:"Hoje",date:B(a)},{label:"Amanh\xE3",date:B(Jt(a,1))}];return e>1&&i.push({label:"S\xE1bado",date:B(Jt(a,e))}),s>1&&i.push({label:"Pr\xF3x. semana",date:B(Jt(a,s))}),i}function Qe(a,t=new Date){let e=t.getHours(),s=e>=5&&e<12?"Bom dia":e>=12&&e<18?"Boa tarde":"Boa noite",i=(a||"").trim().split(/\s+/)[0];return i?`${s}, ${i}`:s}var Bs=/\bhttps?:\/\/[^\s<>"'`]+/gi;function qs(a){let t;try{t=new URL(a)}catch{return{label:a,icon:"link"}}let e=t.hostname.replace(/^www\./,""),s=t.pathname.split("/").filter(Boolean);if(e==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let i=s.length?s[s.length-1]:"";try{i=decodeURIComponent(i)}catch{}return i=i.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),i&&i.length>2&&!/^\d+$/.test(i)?{label:`${e} \u203A ${i}`,icon:"link"}:{label:e,icon:"link"}}function Ge(a){let t=[],e=0,s=a||"";for(let i of s.matchAll(Bs)){let r=i[0],n=r.match(/[.,;:!?)\]}]+$/);n&&(r=r.slice(0,-n[0].length)),i.index>e&&t.push({text:s.slice(e,i.index)}),t.push({url:r,...qs(r)}),e=i.index+r.length}return e<s.length&&t.push({text:s.slice(e)}),t}var js=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-]|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,Ys=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function Zt(a){let t=(a||"").split(/\r?\n/).map(i=>i.replace(Ys,"").trim()).filter(Boolean);t.length===1&&/[,;]|\se\s/i.test(t[0])&&(t=t[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let e=new Set,s=[];for(let i of t){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(i)||(i=i.replace(js,"").replace(/[.;,]+$/,"").trim(),!i||i.length<2||/^~.*~$/.test(i)))continue;i=i.charAt(0).toUpperCase()+i.slice(1);let r=i.toLowerCase();e.has(r)||(e.add(r),s.push(i.slice(0,255)))}return s}async function ts(a,t=1800){let e=s=>new Promise((i,r)=>{let n=new FileReader;n.onload=()=>i(String(n.result).split(",")[1]||""),n.onerror=()=>r(n.error),n.readAsDataURL(s)});try{let s=await createImageBitmap(a,{imageOrientation:"from-image"}),i=Math.min(1,t/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*i),r.height=Math.round(s.height*i),r.getContext("2d").drawImage(s,0,0,r.width,r.height),s.close&&s.close();let n=await new Promise(l=>r.toBlob(l,"image/jpeg",.86));return{mime:"image/jpeg",data:await e(n),url:URL.createObjectURL(n)}}catch{return{mime:a.type||"image/jpeg",data:await e(a),url:URL.createObjectURL(a)}}}var Ws="2.2.0",es="resolvia.theme",Qt="resolvia.prefs",Lt="resolvia.lastList",f=(a,t="")=>h`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ce(Wt[a]||Wt["list-checks"])}</svg>`,L={get(a,t){try{let e=localStorage.getItem(a);return e==null?t:JSON.parse(e)}catch{return t}},set(a,t){try{localStorage.setItem(a,JSON.stringify(t))}catch{}}},z=a=>a.status==="completed",ss=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],w=a=>a.uid||a.summary,Gt=class extends O{static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_rules:{state:!0},_rulesOk:{state:!0},env:{attribute:!1}};static styles=je;constructor(){super(),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._theme=L.get(es,"auto"),this._doneOpen={},this._lastTodoStates=null,this._L=[],this._rules=[],this._rulesOk=!1,this._rulesUnsub=null,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),qe(),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,t]of this._subs)this._unsub(t);this._subs.clear();for(let[,t]of this._recent)clearTimeout(t);this._recent.clear(),clearTimeout(this._toastTimer),this._rulesUnsub&&this._rulesUnsub.then(t=>t&&t()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this.hass||e.themes!==this.hass.themes||e.entities!==this.hass.entities||e.devices!==this.hass.devices||e.user!==this.hass.user||e.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(r=>r.startsWith("todo.")),i=Object.keys(e.states).filter(r=>r.startsWith("todo."));return s.length!==i.length?!0:s.some(r=>e.states[r]!==this.hass.states[r])}willUpdate(t){t.has("route")&&this.route&&(this._path=this.route.path||""),t.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),this._syncSubscriptions(),this._refreshPolled(t.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}updated(t){if(this.toggleAttribute("dark",this._dark),t.has("_path")&&this._view().name==="search"){let e=this.renderRoot.querySelector(".search-box input");e&&e.focus({preventScroll:!0})}}firstUpdated(){this._checkHeight()}_checkHeight(){if(this.hasAttribute("vh"))return;let t=this.getBoundingClientRect().height;(t>window.innerHeight+4||t<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(t=>t.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let t=this._todoIds();for(let e of t)this._subs.has(e)||this._subscribe(e);for(let[e,s]of[...this._subs])if(!t.includes(e)){this._unsub(s),this._subs.delete(e),this._polling.delete(e);let i=new Map(this._items);i.delete(e),this._items=i}}_subscribe(t){let e=this.hass.connection.subscribeMessage(s=>this._setItems(t,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:t}).catch(()=>(this._polling.add(t),this._fetchItems(t),null));this._subs.set(t,e)}_unsub(t){Promise.resolve(t).then(e=>typeof e=="function"&&e()).catch(()=>{})}async _fetchItems(t){try{let e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._setItems(t,e&&e.items||[])}catch{this._setItems(t,this._items.get(t)||[])}}_refreshPolled(t){if(!(!t||!this._polling.size))for(let e of this._polling)t.states[e]!==this.hass.states[e]&&this._fetchItems(e)}_setItems(t,e){let s=new Map(this._items);s.set(t,e),this._items=s}_patchItem(t,e,s){let i=this._items.get(t);i&&this._setItems(t,i.map(r=>w(r)===e?{...r,...s}:r))}_computeLists(){let t=this._prefs&&this._prefs.lists||{},s=this._todoIds().map(i=>{let r=this.hass.states[i],n=Xe(this.hass,i);return{id:i,st:r,meta:n}});return s.sort((i,r)=>(i.meta.group||"").localeCompare(r.meta.group||"","pt-BR")||i.meta.name.localeCompare(r.meta.name,"pt-BR")),s.map(({id:i,st:r,meta:n},l)=>{let o=t[i]||{},c=this._items.get(i),p=c?c.filter(_=>!z(_)):null,d=p?p.length:Number(r.state)||0,v=c?c.length-p.length:0,m=X(o.color)||We(l),g=p?p.map(_=>dt(_.due)).filter(Boolean):[];return{id:i,name:o.name||n.name,origName:n.name,group:n.group,color:m,colorId:o.color||null,icon:o.icon||Xt(`${n.name} ${n.group||""} ${i}`),iconPref:o.icon||null,hidden:!!o.hidden,features:r.attributes.supported_features||0,unavailable:r.state==="unavailable"||r.state==="unknown",items:c,pending:d,done:v,late:g.filter(_=>_.overdue).length,today:g.filter(_=>!_.overdue&&_.diff===0).length}})}_list(t){return this._L.find(e=>e.id===t)}_visible(){return this._L.filter(t=>!t.hidden)}_app(t,e){let s=this._prefs&&this._prefs.app?this._prefs.app[t]:void 0;return s===void 0?e:s}_accent(){return X(this._app("accent","vermelho"))||J[0]}async _loadPrefs(){try{let t=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:t.lists||{},app:t.app||{}},this._prefsRemote=!0}catch{this._prefs=L.get(Qt,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(t,e){let s={...this._prefs.lists},i={...s[t]||{}};for(let[r,n]of Object.entries(e))n===null||n===""?delete i[r]:i[r]=n;if(Object.keys(i).length?s[t]=i:delete s[t],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let r=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:t,prefs:e});this._prefs={lists:r.lists||{},app:r.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else L.set(Qt,this._prefs)}async _saveAppPrefs(t){let e={...this._prefs.app};for(let[s,i]of Object.entries(t))i===null||i===""?delete e[s]:e[s]=i;if(this._prefs={...this._prefs,app:e},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:t});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else L.set(Qt,this._prefs)}_setTheme(t){this._theme=t,L.set(es,t)}_inHA(){return!!this.route}_view(){let t=(this._path||"").replace(/\/+$/,""),e;return(e=t.match(/^\/lista\/(todo\.[^/]+)$/))?{name:"list",id:decodeURIComponent(e[1])}:t==="/prazos"?{name:"due"}:t==="/buscar"?{name:"search"}:t==="/mais"?{name:"more"}:{name:"home"}}_go(t,e=!1){this._sheet&&this._closeSheet(!0);let s=(history.state&&history.state.rvDepth||0)+(e?0:1);if(this._inHA()){let r=`/${this.panel&&this.panel.url_path||"resolvia"}${t}`;e?history.replaceState({rvDepth:s},"",r):history.pushState({rvDepth:s},"",r),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:e}}))}else e?history.replaceState({rvDepth:s,rvPath:t},""):history.pushState({rvDepth:s,rvPath:t},""),this._path=t;let i=this.renderRoot&&this.renderRoot.querySelector("main");i&&i.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_goTab(t){let e=this._view().name;if(t===""){if(e==="home"){let s=this.renderRoot.querySelector("main");s&&s.scrollTo({top:0});return}this._back();return}this._go(t,e!=="home"&&e!=="list")}_onPopState(){this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"")}_openSheet(t,e=null){let s=!!this._sheet;if(this._sheet=t,this._form=e,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(t=!1){this._sheet&&(this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(t?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(t){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(t);history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(t){if(this.env&&this.env.haptic)return this.env.haptic(t);window.dispatchEvent(new CustomEvent("haptic",{detail:t}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(t=>this._rules=t&&t.rules||[],{type:"resolvia/recurring/subscribe"}).then(t=>(this._rulesOk=!0,t)).catch(()=>(this._rulesOk=!1,null)))}_ruleFor(t,e){return e&&(this._rules.find(s=>s.entity_id===t&&s.uid&&s.uid===e.uid)||e.status!=="completed"&&this._rules.find(s=>s.entity_id===t&&!s.uid&&s.match===e.summary))||null}_everyLabel(t){return t===1?"todo dia":t===7?"toda semana":t===14?"a cada 2 semanas":t===30?"todo m\xEAs":`a cada ${t} dias`}_returnLabel(t){let e=new Date(t),s=dt(B(e));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(t,e=Date.now()){let s=new Date(e);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+t).getTime()}_setRule(t,{uid:e,summary:s,days:i}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:t,uid:e||void 0,summary:s,days:i||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(t,e=null){clearTimeout(this._toastTimer),this._toast={text:t,action:e,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,e?4500:2600)}async _call(t,e,s){try{return await this.hass.callService("todo",t,e,{entity_id:s}),!0}catch(i){return console.error("ResolvIA:",t,i),this._inHA()||this._showToast(i&&i.message||"Algo deu errado"),!1}}async _toggle(t,e){if(!x(t.features,b.UPDATE))return;let s=w(e),i=!z(e),r=i?"completed":"needs_action";if(this._haptic(i?"success":"light"),i?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(t.id,s,{status:r}),!await this._call("update_item",{item:s,status:r},t.id)){this._patchItem(t.id,s,{status:e.status});return}if(i){let l=this._ruleFor(t.id,e),o=l?` \xB7 volta ${this._returnLabel(this._reopenAt(l.days))}`:"";this._showToast(`Resolvido: ${T(e.summary,l?22:30)}${o}`,{label:"Desfazer",run:()=>{this._patchItem(t.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},t.id)}})}}_quickAdd(t,e){t.preventDefault();let s=t.currentTarget.querySelector("input");this._addLines(e,[s.value],s)}_onQuickPaste(t,e){let s=t.clipboardData&&t.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(t.preventDefault(),this._addLines(e,s.split(/\r?\n/),t.currentTarget))}async _addLines(t,e,s){let i=e.map(n=>n.trim()).filter(Boolean);if(!i.length)return;let r=s.value;s.value="",s.focus(),this._haptic("light");for(let n of i)if(!await this._call("add_item",{item:n},t.id)){s.value=r||n;return}i.length>1&&this._showToast(`${i.length} itens adicionados`)}_dueFields(t,e,s,i){let r=t.features;return e?s&&x(r,b.DUE_DATETIME)?{due_datetime:`${e} ${s}:00`}:x(r,b.DUE_DATE)?{due_date:e}:x(r,b.DUE_DATETIME)?{due_datetime:`${e} ${s||"09:00"}:00`}:{}:i?x(r,b.DUE_DATE)?{due_date:null}:x(r,b.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(t,{summary:e,description:s,date:i,time:r}){let n={item:e,...this._dueFields(t,i,r,!1)};return s&&x(t.features,b.DESCRIPTION)&&(n.description=s),this._call("add_item",n,t.id)}_openAdd(t){let e=this._visible().filter(r=>x(r.features,b.CREATE)&&!r.unavailable),s=L.get(Lt,null),i=t&&this._list(t)&&x(this._list(t).features,b.CREATE)&&t||e.find(r=>r.id===s)&&s||e[0]&&e[0].id;if(!i){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:i,target:i,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1}),this.updateComplete.then(()=>{let r=this.renderRoot.querySelector(".sheet textarea");r&&r.focus()})}_aiInfo(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{available:!1}}_canImport(){return!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(t){let e=i=>{let r=i&&this._list(i);return r&&x(r.features,b.CREATE)&&!r.unavailable?i:null},s=this._visible().filter(i=>x(i.features,b.CREATE)&&!i.unavailable);return e(t)||e(L.get(Lt,null))||s[0]&&s[0].id||null}_openImport(t,e="pick"){let s=this._importTarget(t);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:e==="text"?"text":"pick",text:"",images:[],items:[],provider:null,error:null,note:null}),(e==="photos"||e==="scan")&&this._pickFiles(e),e==="text"&&this._focusImportText()}_focusImportText(){this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet textarea");t&&t.focus()})}_pickFiles(t){let e=this.renderRoot.querySelector(t==="scan"?"#rv-scan":"#rv-photos");e&&(e.value="",e.click())}_releaseImages(){let t=this._form;if(t&&t.images)for(let e of t.images)e.url&&URL.revokeObjectURL(e.url)}async _onFiles(t){let e=[...t.target.files||[]].filter(i=>i.type.startsWith("image/")||!i.type).slice(0,6);if(!e.length)return;this._sheet!=="import"&&this._openImport(null,"pick"),this._releaseImages(),this._setForm({step:"loading",error:null,note:null,images:[],loadingText:"Preparando as fotos\u2026"});let s=[];for(let i of e)s.push(await ts(i));this._sheet==="import"&&(this._setForm({images:s,loadingText:s.length>1?`Lendo ${s.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:s}))}_readText(){let t=(this._form.text||"").trim();if(!t){this._focusImportText();return}if(this._aiInfo().available){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:t});return}let e=Zt(t);e.length?this._setForm({step:"review",items:e.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}async _runExtract({text:t,images:e}){let s=this._importToken=Date.now(),i=this._list(this._form.target),r=()=>s===this._importToken&&this._sheet==="import";try{let n=await this.hass.resolvia.extract({text:t,images:e?e.map(({data:o,mime:c})=>({data:o,mime:c})):void 0,list_name:i?i.name:void 0});if(!r())return;let l=(n.items||[]).map(o=>({text:o,on:!0}));if(!l.length){this._setForm({step:t?"text":"pick",error:t?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente uma foto mais de perto e com boa luz."});return}this._haptic("success"),this._setForm({step:"review",items:l,provider:n.provider||null})}catch(n){if(!r())return;if(t){let l=Zt(t);if(l.length){this._setForm({step:"review",items:l.map(o=>({text:o,on:!0})),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}this._setForm({step:t?"text":"pick",error:n.message||"Algo deu errado"})}}async _pasteClipboard(){try{let t=await navigator.clipboard.readText();if(!t)throw new Error("empty");this._setForm({text:t,error:null})}catch{this._focusImportText(),this._showToast("Toque e segure no campo para colar")}}_setImportItem(t,e){let s=this._form.items.slice();s[t]={...s[t],...e},this._setForm({items:s})}async _importAdd(){let t=this._form,e=this._list(t.target),s=t.items.filter(r=>r.on&&r.text.trim());if(!e||!s.length)return;L.set(Lt,e.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let i=0;for(let r of s)if(await this._call("add_item",{item:r.text.trim()},e.id))i++;else break;i&&this._showToast(`${E(i,"item adicionado","itens adicionados")} em ${T(e.name,24)}`)}_openEdit(t,e){let s=ct(e.due),i=this._ruleFor(t.id,e),r=i?i.days:0;this._openSheet("item",{mode:"edit",listId:t.id,key:w(e),target:t.id,summary:e.summary||"",description:e.description||"",date:s?s.date:null,time:s?s.time:null,repeat:r,repeatOrig:r,repeatCustom:!!r&&!ss.some(n=>n.days===r)})}_setForm(t){this._form={...this._form,...t}}async _saveItem(){let t=this._form,e=(t.summary||"").trim();if(!e){let p=this.renderRoot.querySelector(".sheet textarea");p&&p.focus();return}let s=(t.description||"").trim(),i=this._list(t.target);if(t.mode==="add"){if(!i)return;L.set(Lt,i.id),this._closeSheet(),this._haptic("light");let p=await this._addFull(i,{summary:e,description:s,date:t.date,time:t.time});p&&t.repeat&&await this._setRule(i.id,{summary:e,days:t.repeat}),p&&this._view().id!==i.id&&this._showToast(`Adicionado em ${T(i.name,28)}`);return}let r=this._list(t.listId),n=r&&r.items&&r.items.find(p=>w(p)===t.key);if(!r||!n){this._closeSheet();return}if(i&&i.id!==r.id){this._closeSheet(),await this._addFull(i,{summary:e,description:s,date:t.date,time:t.time})&&(t.repeat&&await this._setRule(i.id,{summary:e,days:t.repeat}),t.repeatOrig&&await this._setRule(r.id,{uid:n.uid,summary:n.summary,days:null}),await this._call("remove_item",{item:[t.key]},r.id),this._showToast(`Movido para ${T(i.name,28)}`));return}let l={item:t.key};e!==n.summary&&(l.rename=e),x(r.features,b.DESCRIPTION)&&s!==(n.description||"")&&(l.description=s||null);let o=ct(n.due);((o?o.date:null)!==(t.date||null)||(o?o.time:null)!==(t.time||null))&&Object.assign(l,this._dueFields(r,t.date,t.time,!0)),this._closeSheet(),(t.repeat||0)!==(t.repeatOrig||0)&&(await this._setRule(r.id,{uid:n.uid,summary:e,days:t.repeat}),t.repeat&&this._showToast(`Repete ${this._everyLabel(t.repeat)} depois de concluir`)),Object.keys(l).length>1&&(l.rename&&this._patchItem(r.id,t.key,{summary:e}),await this._call("update_item",l,r.id))}async _deleteItem(){let t=this._form,e=this._list(t.listId),s=e&&e.items&&e.items.find(n=>w(n)===t.key);if(this._closeSheet(),!e||!s)return;if(this._setItems(e.id,e.items.filter(n=>w(n)!==t.key)),this._haptic("warning"),!await this._call("remove_item",{item:[t.key]},e.id)){this._setItems(e.id,e.items);return}let r=ct(s.due);this._showToast("Item exclu\xEDdo",{label:"Desfazer",run:()=>this._addFull(e,{summary:s.summary,description:s.description,date:r?r.date:null,time:r?r.time:null})})}_confirmClearDone(t){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${E(t.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${t.done===1?"":"s"} de \u201C${t.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},t.id)&&this._showToast("Conclu\xEDdos apagados")}})}_openCustomize(t){this._openSheet("customize",{listId:t.id,name:t.name===t.origName?"":t.name,color:t.colorId,icon:t.iconPref,hidden:t.hidden})}async _saveCustomize(){let t=this._form;this._closeSheet(),await this._saveListPrefs(t.listId,{name:(t.name||"").trim()||null,color:t.color||null,icon:t.icon||null,hidden:t.hidden?!0:null})}_dragStart(t,e,s){if(t.pointerType==="mouse"&&t.button!==0)return;t.preventDefault();let i=t.currentTarget,r=i.closest(".item"),l=[...r.parentElement.querySelectorAll(":scope > .item[data-drag]")],o=l.indexOf(r);if(o<0)return;let c=this.renderRoot.querySelector("main"),p=l.map($=>$.getBoundingClientRect()),d=c.scrollTop,v=p.map($=>$.top+$.height/2+d),m=p[o].height,g={y:t.clientY,target:o,raf:0,lastY:t.clientY};try{i.setPointerCapture(t.pointerId)}catch{}r.classList.add("dragging"),l.forEach(($,C)=>C!==o&&$.classList.add("shifting")),this._haptic("selection");let _=()=>{let $=g.lastY-g.y+(c.scrollTop-d);r.style.transform=`translateY(${$}px)`;let C=v[o]+$,M=0;for(let j=0;j<l.length;j++)j!==o&&v[j]<C&&M++;M!==g.target&&(g.target=M,this._haptic("selection")),l.forEach((j,G)=>{if(G===o)return;let ut=0;o<M&&G>o&&G<=M&&(ut=-m),M<o&&G>=M&&G<o&&(ut=m),j.style.transform=ut?`translateY(${ut}px)`:""})},q=()=>{let $=c.getBoundingClientRect(),C=70,M=0;g.lastY<$.top+C?M=-Math.ceil(($.top+C-g.lastY)/6):g.lastY>$.bottom-C&&(M=Math.ceil((g.lastY-($.bottom-C))/6)),M&&(c.scrollTop+=M,_()),g.raf=requestAnimationFrame(q)};g.raf=requestAnimationFrame(q);let Q=$=>{g.lastY=$.clientY,_()},pt=()=>{cancelAnimationFrame(g.raf),i.removeEventListener("pointermove",Q),i.removeEventListener("pointerup",pt),i.removeEventListener("pointercancel",pt),l.forEach($=>{$.classList.remove("shifting","dragging"),$.style.transform=""}),g.target!==o&&this._commitMove(e,s,l.map($=>$.dataset.key),o,g.target)};i.addEventListener("pointermove",Q),i.addEventListener("pointerup",pt),i.addEventListener("pointercancel",pt)}async _commitMove(t,e,s,i,r){let n=s.slice(),[l]=n.splice(i,1);n.splice(r,0,l);let o=r===0?void 0:n[r-1],c=t.items.slice(),p=c.findIndex(g=>w(g)===l),[d]=c.splice(p,1),v=o?c.findIndex(g=>w(g)===o):-1;c.splice(v+1,0,d),this._setItems(t.id,c);let m={type:"todo/item/move",entity_id:t.id,uid:l};o&&(m.previous_uid=o);try{await this.hass.callWS(m)}catch{this._setItems(t.id,t.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return u;let t=this._dark,e=this._accent(),s=this._view(),i=s.name==="list"?this._list(s.id):null,r=i?i.color:e,n=`--rv-accent:${r.fill};--rv-accent-ink:${t?r.fill:r.ink};--rv-accent-soft:${zt(r.fill,t?.18:.14)};--rv-accent-ink-light:${r.ink};`,l;return s.name==="list"?l=this._renderList(s.id):s.name==="due"?l=this._renderDue():s.name==="search"?l=this._renderSearch():s.name==="more"?l=this._renderMore():l=this._renderHome(),h`
      <div class="root" style=${n}>
        <div class="app">
          ${!this.env||this.env.topbar?h`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${f("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:u}
          ${this.hass.connected===!1?h`<div class="offline">${f("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:u}
          <main>${l}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()}
        ${this._canImport()?h`<input id="rv-photos" class="sr" type="file" accept="image/*" multiple tabindex="-1" aria-hidden="true" @change=${o=>this._onFiles(o)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${o=>this._onFiles(o)} />`:u}
      </div>
    `}_renderNav(t){let e=this._visible().reduce((i,r)=>i+r.late+r.today,0),s=(i,r,n,l,o=0)=>h`
      <button class="tab ${t.name===i||i==="home"&&t.name==="list"?"on":""}" @click=${()=>this._goTab(r)} aria-label=${n}>
        ${f(l)}<span>${n}</span>
        ${o?h`<span class="badge">${o>99?"99+":o}</span>`:u}
      </button>
    `;return h`
      <nav>
        <div class="tabs">
          ${s("home","","Listas","list-checks")} ${s("due","/prazos","Prazos","calendar-clock",e)}
          <button class="tab fab" @click=${()=>this._openAdd(t.name==="list"?t.id:null)} aria-label="Adicionar item">
            <span class="pill">${f("plus")}</span><span>Adicionar</span>
          </button>
          ${s("search","/buscar","Buscar","search")} ${s("more","/mais","Mais","sliders-horizontal")}
        </div>
      </nav>
    `}_renderHome(){let t=this._visible(),e=this._L.length-t.length,s=t.reduce((p,d)=>p+d.pending,0),i=t.reduce((p,d)=>p+d.late,0),r=t.reduce((p,d)=>p+d.today,0),n=t.filter(p=>p.pending>0).length,l=[];s&&l.push(`em ${E(n,"lista","listas")}`),r&&l.push(`${r} pra hoje`),i&&l.push(`${E(i,"atrasado","atrasados")}`);let o=this._app("group_by_device",!0),c=[];if(o){for(let p of t){let d=p.group||"",v=c.find(m=>m.name===d);v||c.push(v={name:d,lists:[]}),v.lists.push(p)}c.sort((p,d)=>(p.name?1:0)-(d.name?1:0))}else c.push({name:null,lists:t});return h`
      <section class="page">
        <div class="page-head">
          <h1 class="display">Início</h1>
          <button class="icon-btn" @click=${()=>this._go("/buscar")} aria-label="Buscar">${f("search")}</button>
        </div>

        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>h`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${Qe(this.hass.user&&this.hass.user.name)}</div>
            ${s?h`<div class="hero-big">${s}<small>${s===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${l.join(" \xB7 ")}</div>`:h`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>

        ${this._L.length===0?h`<div class="panel">
              <div class="empty">
                <div class="em-icon">${f("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:h`
              <div class="sec-head">
                <h2 class="display">Suas listas</h2>
                ${e?h`<button class="text-btn" @click=${()=>this._go("/mais")}>${E(e,"oculta","ocultas")}</button>`:u}
              </div>
              ${c.map(p=>h`
                  <div class="panel">
                    ${o&&(p.name||c.length>1)?h`<div class="overline">${p.name||"Listas"}</div>`:u}
                    ${p.lists.map(d=>this._renderListCard(d,!o))}
                  </div>
                `)}
            `}
        ${this.hass.user&&this.hass.user.is_admin?h`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${f("list-plus")}<span>Nova lista</span>
            </button>`:u}
      </section>
    `}_renderListCard(t,e){let s=t.pending+t.done,i=s?Math.round(t.done/s*100):0,r=[];return t.unavailable?r.push(h`<span>Indisponível</span>`):t.items?(r.push(h`<span>${t.pending?E(t.pending,"pendente","pendentes"):"Tudo resolvido"}${t.done?` \xB7 ${t.done} ${t.done===1?"feito":"feitos"}`:""}</span>`),t.late?r.push(h`<span class="tag late">${f("circle-alert")}${t.late}</span>`):t.today&&r.push(h`<span class="tag today">${f("clock")}${t.today} hoje</span>`)):r.push(h`<span>Carregando…</span>`),h`
      <button class="list-card ${t.unavailable?"off":""}" style=${k(t.color,this._dark)} @click=${()=>this._go(`/lista/${t.id}`)}>
        <span class="tile">${f(t.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${t.name}</span>
          <span class="lc-meta">${e&&t.group?h`<span>${t.group} ·</span>`:u}${r}</span>
          ${s?h`<span class="bar"><i style="width:${i}%"></i></span>`:u}
        </span>
        <span class="lc-num ${t.pending?"":"zero"}">${t.pending||f("circle-check")}</span>
      </button>
    `}_renderList(t){let e=this._list(t);if(!e)return h`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${f("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>Voltar para o início</button>
      </section>`;let s=x(e.features,b.CREATE)&&!e.unavailable,i=x(e.features,b.UPDATE),r=x(e.features,b.MOVE),n=x(e.features,b.DELETE),l=e.items,o=l?l.filter(v=>!z(v)||this._recent.has(w(v))):[],c=l?l.filter(v=>z(v)&&!this._recent.has(w(v))):[],p=l?l.length:0,d=this._doneOpen[t]!==void 0?this._doneOpen[t]:this._app("show_done",!1);return h`
      <section class="page" style=${k(e.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${f("chevron-left")}</button>
          <div class="dh-text">
            ${e.group?h`<div class="overline">${e.group}</div>`:u}
            <h1 class="display">${e.name}</h1>
          </div>
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:e.id})} aria-label="Opções da lista">${f("ellipsis")}</button>
        </div>

        ${p?h`<div class="progress">
              <span>${e.done} de ${p} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(e.done/p*100)}%"></i></span>
            </div>`:u}
        ${s?h`<div class="quick">
              <form @submit=${v=>this._quickAdd(v,e)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${v=>this._onQuickPaste(v,e)} />
                ${this._canImport()?h`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(e.id)}>${f("scan-text")}</button>`:u}
                <button class="add-btn" type="submit" aria-label="Adicionar">${f("plus")}</button>
              </form>
            </div>`:u}
        ${e.unavailable?h`<div class="panel"><div class="empty"><div class="em-icon">${f("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:l?o.length?h`<div class="panel items">
                  ${W(o,w,v=>this._renderItem(e,v,{draggable:r&&i&&!z(v)}))}
                </div>`:h`<div class="panel">
                  <div class="empty">
                    ${p?h`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:h`<div class="em-icon">${f(e.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:h`<div class="panel">${[70,52,84].map(v=>h`<div class="skeleton" style="width:${v}%"></div>`)}</div>`}
        ${c.length?h`
              <div class="done-head">
                <button class="done-toggle ${d?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[t]:!d}} aria-expanded=${d?"true":"false"}>
                  Concluídos <span class="count">· ${c.length}</span>${f("chevron-down")}
                </button>
                ${n?h`<button class="text-btn" @click=${()=>this._confirmClearDone(e)}>Limpar</button>`:u}
              </div>
              ${d?h`<div class="panel items">${W(c,w,v=>this._renderItem(e,v))}</div>`:u}
            `:u}
        ${!i&&l&&l.length?h`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:u}
      </section>
    `}_renderText(t,e){return Ge(t).map(s=>s.url?h`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${i=>i.stopPropagation()} title=${s.url}>${f(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,e))}_highlight(t,e){if(!e)return t;let s=Je(t),i=K(e);if(!i)return t;let r=[],n=0,l;for(;(l=s.indexOf(i,n))!==-1;)l>n&&r.push(t.slice(n,l)),r.push(h`<mark>${t.slice(l,l+i.length)}</mark>`),n=l+i.length;return n<t.length&&r.push(t.slice(n)),r}_renderItem(t,e,s={}){let i=z(e),r=!i&&dt(e.due),n=x(t.features,b.UPDATE),l=this._ruleFor(t.id,e),o=l?i&&l.reopen_at?h`<span class="tag rep">${f("repeat")}volta ${this._returnLabel(l.reopen_at)}</span>`:h`<span class="tag rep">${f("repeat")}${this._everyLabel(l.days)}</span>`:u;return h`
      <div class="item ${i?"done":""}" data-key=${w(e)} ?data-drag=${s.draggable} style=${s.showList?k(t.color,this._dark):""}>
        <button class="check ${i?"on":""}" role="checkbox" aria-checked=${i?"true":"false"} aria-label=${i?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!n} @click=${()=>this._toggle(t,e)}>
          ${f("check")}
        </button>
        <div class="it-body" @click=${()=>n&&this._openEdit(t,e)}>
          <div class="it-text">${this._renderText(e.summary||"",s.query)}</div>
          ${e.description?h`<div class="it-desc">${this._renderText(e.description,s.query)}</div>`:u}
          ${r||s.showList||l?h`<div class="chips">
                ${s.showList?h`<span class="tag list">${f(t.icon)}${T(t.name,24)}</span>`:u}
                ${r?h`<span class="tag ${r.tone==="late"?"late":r.tone==="today"?"today":""}">${f(r.time?"clock":"calendar")}${r.text}</span>`:u}
                ${o}
              </div>`:u}
        </div>
        ${s.draggable?h`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${c=>this._dragStart(c,t,e)} @click=${c=>c.preventDefault()}>${f("grip-vertical")}</button>`:u}
      </div>
    `}_renderDue(){let t=this._visible(),e=t.some(c=>x(c.features,b.DUE_DATE)||x(c.features,b.DUE_DATETIME)),s=[];for(let c of t)for(let p of c.items||[]){if(z(p)&&!this._recent.has(w(p)))continue;let d=dt(p.due);d&&s.push({l:c,i:p,d})}s.sort((c,p)=>c.d.at-p.d.at);let i=[{title:"Atrasados",test:c=>c.overdue},{title:"Hoje",test:c=>c.diff===0},{title:"Amanh\xE3",test:c=>c.diff===1},{title:"Pr\xF3ximos 7 dias",test:c=>c.diff>1&&c.diff<7},{title:"Mais adiante",test:()=>!0}],r=new Set,n=i.map(c=>{let p=s.filter(d=>!r.has(d)&&c.test(d.d));return p.forEach(d=>r.add(d)),{...c,rows:p}}).filter(c=>c.rows.length),l=this._rules.filter(c=>c.reopen_at).map(c=>{let p=this._list(c.entity_id),d=p&&p.items&&c.uid?p.items.find(v=>v.uid===c.uid):null;return{r:c,l:p,item:d}}).filter(c=>c.l&&!c.l.hidden).sort((c,p)=>c.r.reopen_at-p.r.reopen_at),o=l.length?h`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${l.length}</div>
          ${W(l,c=>c.r.id,c=>c.item?this._renderItem(c.l,c.item,{showList:!0}):h`<div class="item done" style=${k(c.l.color,this._dark)}>
                    <span class="check on">${f("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${c.l.id}`)}>
                      <div class="it-text">${c.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${f(c.l.icon)}${T(c.l.name,24)}</span>
                        <span class="tag rep">${f("repeat")}volta ${this._returnLabel(c.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:u;return h`
      <section class="page">
        <div class="page-head"><h1 class="display">Prazos</h1></div>
        <p class="page-sub">Tudo que tem data, de todas as listas, em ordem.</p>
        ${n.length||l.length?[n.map(c=>h`
                <div class="panel items">
                  <div class="overline" style=${c.title==="Atrasados"?"color:var(--rv-late)":""}>${c.title} · ${c.rows.length}</div>
                  ${W(c.rows,p=>p.l.id+w(p.i),p=>this._renderItem(p.l,p.i,{showList:!0}))}
                </div>
              `),o]:h`<div class="panel">
              <div class="empty">
                <div class="em-icon">${f("calendar-days")}</div>
                ${e?h`<h3>Nada com prazo</h3>
                      <p>Quando um item tiver data, ele aparece aqui. Toque num item para definir um prazo.</p>`:h`<h3>Sem prazos por aqui</h3>
                      <p>Suas listas atuais não aceitam datas. Listas locais (“Lista de tarefas local”), Google Tasks e CalDAV aceitam.</p>`}
              </div>
            </div>`}
      </section>
    `}_renderSearch(){let t=this._query.trim(),e=K(t),s=[],i=0;if(e)for(let r of this._L){let n=(r.items||[]).filter(l=>(this._searchDone||!z(l))&&(K(l.summary).includes(e)||K(l.description).includes(e)));n.length&&(n.sort((l,o)=>Number(z(l))-Number(z(o))),s.push({l:r,hits:n}),i+=n.length)}return h`
      <section class="page">
        <div class="page-head"><h1 class="display">Buscar</h1></div>
        <label class="search-box">
          ${f("search")}
          <input type="search" placeholder="Buscar em todas as listas" .value=${this._query} @input=${r=>this._query=r.target.value} autofocus enterkeyhint="search" aria-label="Buscar" />
          ${this._query?h`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${f("x")}</button>`:u}
        </label>
        <div class="filters">
          <button class="pick ${this._searchDone?"on":""}" @click=${()=>this._searchDone=!this._searchDone}>${f("circle-check")}<span>Incluir concluídos</span></button>
        </div>
        ${e?s.length?h`<p class="page-sub" style="margin-top:0">${E(i,"resultado","resultados")}</p>
                ${s.map(({l:r,hits:n})=>h`
                    <div class="panel items" style=${k(r.color,this._dark)}>
                      <div class="overline">${r.name}${r.group?` \xB7 ${r.group}`:""}</div>
                      ${W(n,w,l=>this._renderItem(r,l,{query:t}))}
                    </div>
                  `)}`:h`<div class="panel"><div class="empty"><div class="em-icon">${f("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${T(t,30)}”.</p></div></div>`:h`<p class="page-sub" style="margin-top:0">Procure por qualquer palavra em ${E(this._L.length,"lista","listas")}. Acentos não importam.</p>`}
      </section>
    `}_renderMore(){let t=this._app("accent","vermelho"),e=(s,i,r)=>h`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${r} aria-label=${i} /><span class="track"></span></label>`;return h`
      <section class="page">
        <div class="page-head"><h1 class="display">Mais</h1></div>

        <div class="panel">
          <div class="overline">Aparência</div>
          <div class="row col">
            <div class="label">Tema</div>
            <div class="seg" role="radiogroup" aria-label="Tema">
              ${[["auto","Autom\xE1tico","sun-moon"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,i,r])=>h`<button class=${this._theme===s?"on":""} role="radio" aria-checked=${this._theme===s?"true":"false"} @click=${()=>this._setTheme(s)}>${f(r)}${i}</button>`)}
            </div>
            <div class="hint" style="white-space:normal">${this._theme==="auto"?"Segue o modo claro/escuro do Home Assistant.":"Vale s\xF3 para este aparelho."}</div>
          </div>
          <div class="row col">
            <div class="label">Cor do app</div>
            <div class="swatches">
              ${J.map(s=>h`<button class="sw ${t===s.id?"on":""}" style="--c:${s.fill}" aria-label=${s.label} @click=${()=>this._saveAppPrefs({accent:s.id==="vermelho"?null:s.id})}>${t===s.id?f("check"):u}</button>`)}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="overline">Listas</div>
          ${this._L.length?this._L.map(s=>h`
                  <div class="row" style=${k(s.color,this._dark)}>
                    <button class="tile" @click=${()=>this._openCustomize(s)} aria-label="Personalizar ${s.name}">${f(s.icon)}</button>
                    <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(s)}>
                      <div class="label">${s.name}</div>
                      <div class="hint">${s.group||s.id}</div>
                    </button>
                    ${e(!s.hidden,`Mostrar ${s.name}`,i=>this._saveListPrefs(s.id,{hidden:i.target.checked?null:!0}))}
                  </div>
                `):h`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
        </div>

        ${this._rulesOk?h`<div class="panel">
              <div class="overline">Tarefas que se repetem</div>
              ${this._rules.length?this._rules.map(s=>{let i=this._list(s.entity_id);return i?h`<div class="row" style=${k(i.color,this._dark)}>
                      <span class="tile">${f("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${i.id}`)}>
                        <div class="label">${s.summary||s.match}</div>
                        <div class="hint">${i.name} · ${this._everyLabel(s.days)}${s.reopen_at?` \xB7 volta ${this._returnLabel(s.reopen_at)}`:""}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(s.entity_id,{uid:s.uid,summary:s.match||s.summary,days:null})}>${f("x")}</button>
                    </div>`:u}):h`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir” — ex.: passar pano 3 dias depois de feito.</div></div>`}
            </div>`:u}

        <div class="panel">
          <div class="overline">Exibição</div>
          <div class="row">
            <div class="grow"><div class="label">Agrupar por dispositivo</div><div class="hint">Ex.: as listas da Alexa juntas</div></div>
            ${e(this._app("group_by_device",!0),"Agrupar por dispositivo",s=>this._saveAppPrefs({group_by_device:s.target.checked}))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">Concluídos abertos</div><div class="hint">Mostra os concluídos sem precisar tocar</div></div>
            ${e(this._app("show_done",!1),"Conclu\xEDdos abertos",s=>this._saveAppPrefs({show_done:s.target.checked}))}
          </div>
        </div>

        ${this.hass.user&&this.hass.user.is_admin?h`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${k(this._accent(),this._dark)}>${f("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${f("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${k(J[9],this._dark)}>${f("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${f("chevron-right")}
              </button>
            </div>`:u}

        <p class="foot"><b>ResolvIA</b><br />v${Ws} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>
      </section>
    `}_renderSheet(){if(!this._sheet)return u;let t=u;return this._sheet==="item"?t=this._renderItemSheet():this._sheet==="listmenu"?t=this._renderListMenu():this._sheet==="customize"?t=this._renderCustomize():this._sheet==="confirm"?t=this._renderConfirm():this._sheet==="import"&&(t=this._renderImportSheet()),h`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${e=>e.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${t}
      </div>
    `}_sheetStyle(){let t=this._form||{},e=this._list(t.target||t.listId),s=this._sheet==="customize"&&X(t.color)||e&&e.color;return s?`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${zt(s.fill,this._dark?.18:.14)};${k(s,this._dark)}`:""}_renderItemSheet(){let t=this._form,e=this._list(t.listId),s=this._list(t.target)||e;if(!e||!s)return u;let i=s.features,r=x(i,b.DESCRIPTION),n=x(i,b.DUE_DATE)||x(i,b.DUE_DATETIME),l=x(i,b.DUE_DATETIME),o=t.mode==="edit"&&x(e.features,b.DELETE),c=Ze(),p=c.some(m=>m.date===t.date),d=t.mode==="add"?this._L.filter(m=>x(m.features,b.CREATE)&&!m.unavailable&&(!m.hidden||m.id===t.target)):x(e.features,b.DELETE)?this._L.filter(m=>x(m.features,b.CREATE)&&!m.unavailable&&(!m.hidden||m.id===e.id)):[],v=m=>{let g=this.renderRoot.querySelector(m);if(g)try{g.showPicker()}catch{g.focus(),g.click()}};return h`
      <div class="sheet-head">
        <h3 class="display">${t.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      ${t.mode==="add"&&this._canImport()?h`<div class="imp-strip">
            <button @click=${()=>this._openImport(t.target,"text")}>${f("clipboard-paste")}<span>Colar mensagem</span></button>
            <button @click=${()=>this._openImport(t.target,"photos")}>${f("images")}<span>Fotos</span></button>
            <button @click=${()=>this._openImport(t.target,"scan")}>${f("scan-text")}<span>Digitalizar</span></button>
          </div>`:u}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${t.summary} @input=${m=>this._setForm({summary:m.target.value})} @keydown=${m=>m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${r?h`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${t.description} @input=${m=>this._setForm({description:m.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:u}
      ${n?h`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row">
              ${c.map(m=>h`<button class="pick ${t.date===m.date?"on":""}" @click=${()=>this._setForm({date:t.date===m.date?null:m.date})}>${m.label}</button>`)}
              <button class="pick ${t.date&&!p?"on":""}" @click=${()=>v("#rv-date")}>
                ${f("calendar")}<span>${t.date&&!p?Kt(t.date):"Outra data"}</span>
                <input id="rv-date" class="hidden-input" type="date" tabindex="-1" .value=${t.date||""} @change=${m=>this._setForm({date:m.target.value||null})} />
              </button>
              ${t.date?h`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null})}>${f("x")}<span>Sem prazo</span></button>`:u}
            </div>
            ${l&&t.date?h`<div class="time-row">
                  <span class="tl">Horário</span>
                  <input type="time" .value=${t.time||""} @change=${m=>this._setForm({time:m.target.value||null})} />
                  ${t.time?h`<button class="text-btn" @click=${()=>this._setForm({time:null})}>Dia todo</button>`:u}
                </div>`:u}
          </div>`:u}
      ${this._rulesOk&&(x(i,b.UPDATE)||x(i,b.CREATE))?h`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row">
              <button class="pick ${t.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>Não</button>
              ${ss.map(m=>h`<button class="pick ${t.repeat===m.days&&!t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:m.days,repeatCustom:!1})}>${m.label}</button>`)}
              <button class="pick ${t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:t.repeat||4})}>${f("repeat")}<span>Outro</span></button>
            </div>
            ${t.repeatCustom?h`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(t.repeat||"")} @input=${m=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(m.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:u}
            ${t.repeat?h`<div class="field-hint">${f("repeat")}<span>Quando você concluir, volta sozinha ${t.repeat===1?"no dia seguinte":`em ${t.repeat} dias`} (no começo do dia).</span></div>`:u}
          </div>`:u}
      ${d.length>1?h`<div class="field">
            <span class="flabel">${t.mode==="add"?"Lista":"Lista (mover)"}</span>
            <div class="chip-row">
              ${d.map(m=>h`<button class="pick list ${t.target===m.id?"on":""}" style=${k(m.color,this._dark)} @click=${()=>this._setForm({target:m.id})}><span class="dot"></span><span>${T(m.name,26)}</span></button>`)}
            </div>
          </div>`:u}
      <div class="sheet-actions">
        ${o?h`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${f("trash")}</button>`:u}
        <button class="btn primary" @click=${()=>this._saveItem()}>${t.mode==="add"?"Adicionar":t.target!==t.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportSheet(){let t=this._form,e=this._aiInfo(),s=(l,o)=>h`<div class="sheet-head">
      ${o?h`<button class="icon-btn back" @click=${o} aria-label="Voltar">${f("chevron-left")}</button>`:u}
      <h3 class="display">${l}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
    </div>`,i=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},r=t.error?h`<div class="imp-error">${f("circle-alert")}<span>${t.error}</span></div>`:u,n=t.images&&t.images.length?h`<div class="thumbs">${t.images.map(l=>h`<img src=${l.url} alt="" />`)}</div>`:u;if(t.step==="text")return h`
        ${s("Colar mensagem",i)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${t.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${l=>this._setForm({text:l.target.value,error:null})}></textarea>
        </label>
        ${r}
        <div class="sheet-actions">
          <button class="btn outline" @click=${()=>this._pasteClipboard()}>${f("clipboard-paste")}Colar</button>
          <button class="btn primary" ?disabled=${!(t.text||"").trim()} @click=${()=>this._readText()}>${e.available?f("sparkles"):u}Separar itens</button>
        </div>
        <p class="sheet-note">${e.available?"A IA do seu Home Assistant separa os itens, mesmo de mensagens corridas.":"Sem IA configurada: separo por linhas, v\xEDrgulas e \u201Ce\u201D."}</p>
      `;if(t.step==="loading")return h`
        ${s("Lendo\u2026")}
        ${n}
        <div class="imp-loading">
          <span class="spin">${f("loader-circle")}</span>
          <span>${t.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${i}>Cancelar</button></div>
      `;if(t.step==="review"){let l=this._list(t.target),o=t.items.filter(d=>d.on&&d.text.trim()).length,c=this._L.filter(d=>x(d.features,b.CREATE)&&!d.unavailable&&(!d.hidden||d.id===t.target)),p=t.provider==="local"?"separados por linha":t.provider==="gemini"?"lidos pelo Gemini":t.provider?"lidos pela IA do Home Assistant":"";return h`
        ${s("Revisar itens",i)}
        ${n}
        <p class="sheet-note top">${E(t.items.length,"item encontrado","itens encontrados")}${p?` \xB7 ${p}`:""}. Toque no texto para corrigir.</p>
        ${t.note?h`<div class="imp-error soft">${f("sparkles")}<span>${t.note}</span></div>`:u}
        <div class="imp-list">
          ${t.items.map((d,v)=>h`<div class="imp-row ${d.on?"":"off"}">
              <button class="check ${d.on?"on":""}" role="checkbox" aria-checked=${d.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(v,{on:!d.on})}>${f("check")}</button>
              <input type="text" .value=${d.text} aria-label="Item" @input=${m=>this._setImportItem(v,{text:m.target.value})} />
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:t.items.filter((m,g)=>g!==v)})}>${f("x")}</button>
            </div>`)}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...t.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let d=this.renderRoot.querySelectorAll(".imp-row input");d.length&&d[d.length-1].focus()})}}>${f("plus")}<span>Adicionar linha</span></button>
        </div>
        ${c.length>1?h`<div class="field">
              <span class="flabel">Adicionar em</span>
              <div class="chip-row">
                ${c.map(d=>h`<button class="pick list ${t.target===d.id?"on":""}" style=${k(d.color,this._dark)} @click=${()=>this._setForm({target:d.id})}><span class="dot"></span><span>${T(d.name,26)}</span></button>`)}
              </div>
            </div>`:u}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!o} @click=${()=>this._importAdd()}>
            ${o?`Adicionar ${E(o,"item","itens")}`:"Nenhum item marcado"}${l&&c.length<=1?` em ${T(l.name,18)}`:""}
          </button>
        </div>
      `}return h`
      ${s("Importar itens")}
      <p class="sheet-note top">Traga uma lista pronta de uma mensagem ou de uma foto. ${e.available?"A IA separa os itens e voc\xEA revisa antes de adicionar.":""}</p>
      <div class="imp-options">
        <button class="imp-opt" @click=${()=>(this._setForm({step:"text",error:null}),this._focusImportText())}>
          <span class="imp-ic">${f("message-square-text")}</span>
          <span class="imp-tx"><b>Colar mensagem</b><small>WhatsApp, e-mail, anotação</small></span>
          ${f("chevron-right")}
        </button>
        <button class="imp-opt" ?disabled=${!e.images} @click=${()=>this._pickFiles("photos")}>
          <span class="imp-ic">${f("images")}</span>
          <span class="imp-tx"><b>Escolher fotos</b><small>Prints e fotos da galeria (até 6)</small></span>
          ${f("chevron-right")}
        </button>
        <button class="imp-opt" ?disabled=${!e.images} @click=${()=>this._pickFiles("scan")}>
          <span class="imp-ic">${f("scan-text")}</span>
          <span class="imp-tx"><b>Digitalizar</b><small>Tire uma foto de uma lista em papel</small></span>
          ${f("chevron-right")}
        </button>
      </div>
      ${e.images?u:h`<div class="imp-error soft">${f("sparkles")}<span>Para ler fotos, configure uma IA no Home Assistant com <b>tarefa de IA</b> (por exemplo a integração Google Gemini) ou coloque uma chave do Gemini nas opções do app ResolvIA.</span></div>`}
      ${r}
    `}_renderListMenu(){let t=this._list(this._form.listId);return t?h`
      <div class="sheet-head">
        <h3 class="display">${t.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <button class="menu-row" @click=${()=>this._openCustomize(t)}>${f("palette")}Personalizar<span class="sub">nome, cor, ícone</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(t.id,{hidden:t.hidden?null:!0}))}>${f(t.hidden?"eye":"eye-off")}${t.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?h`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${t.id}`)}>${f("external-link")}Abrir na tela padrão do HA</button>`:u}
      ${x(t.features,b.DELETE)&&t.done?h`<button class="menu-row danger" @click=${()=>this._confirmClearDone(t)}>${f("brush-cleaning")}Limpar concluídos<span class="sub">${t.done}</span></button>`:u}
    `:u}_renderCustomize(){let t=this._form,e=this._list(t.listId);if(!e)return u;let s=X(t.color)||e.color,i=t.icon||Xt(`${e.origName} ${e.group||""} ${e.id}`);return h`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${f("x")}</button>
      </div>
      <div class="preview-tile" style=${k(s,this._dark)}>
        <span class="tile">${f(i)}</span>
        <span class="lc-main"><span class="lc-title">${(t.name||"").trim()||e.origName}</span><span class="lc-meta">${e.group||e.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">Nome</span>
        <input type="text" .value=${t.name} placeholder=${e.origName} @input=${r=>this._setForm({name:r.target.value})} />
      </label>
      <div class="field">
        <span class="flabel">Cor</span>
        <div class="swatches">
          ${J.map(r=>h`<button class="sw ${s.id===r.id?"on":""}" style="--c:${r.fill}" aria-label=${r.label} @click=${()=>this._setForm({color:r.id})}>${s.id===r.id?f("check"):u}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${k(s,this._dark)}>
          ${Ke.map(r=>h`<button class="ig ${i===r?"on":""}" aria-label=${r} @click=${()=>this._setForm({icon:r})}>${f(r)}</button>`)}
        </div>
      </div>
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!t.hidden} @change=${r=>this._setForm({hidden:!r.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1})}>${f("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>Salvar</button>
      </div>
    `}_renderConfirm(){let t=this._form;return h`
      <div class="sheet-head"><h3 class="display">${t.title}</h3></div>
      <p class="confirm-text">${t.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${()=>t.run()}>${t.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return u;let t=this._toast;return h`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${t.text}</span>
      ${t.action?h`<button @click=${()=>{this._toast=null,t.action.run()}}>${t.action.label}</button>`:u}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",Gt);var te=class{constructor(t,e){this.url=t,this.onStatus=e,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let t=new WebSocket(this.url);this.ws=t,t.onopen=()=>{this.open=!0,this.backoff=1e3;let e=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))t.send(s);if(this.onStatus&&this.onStatus(!0),e)for(let s of this.reconnectHandlers)s()},t.onmessage=e=>{let s;try{s=JSON.parse(e.data)}catch{return}if(s.type==="result"){let i=this.pending.get(s.id);if(!i)return;if(this.pending.delete(s.id),s.success)i.resolve(s.result);else{let r=new Error(s.error&&s.error.message||"Falhou");r.code=s.error&&s.error.code,i.reject(r)}}else if(s.type==="event"){let i=this.byId.get(s.id);i&&i.cb(s.event)}},t.onclose=()=>{let e=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let i=new Error("Sem conex\xE3o com o ResolvIA");i.code="disconnected",s.reject(i)}this.pending.clear(),e&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(t){this.reconnectHandlers.push(t)}_send(t){let e=JSON.stringify(t);this.open?this.ws.send(e):this.queue.push(e)}sendMessagePromise(t){let e=this.nextId++;return new Promise((s,i)=>{this.pending.set(e,{resolve:s,reject:i}),this._send({...t,id:e})})}subscribeMessage(t,e){let s={cb:t,msg:e,id:null,first:null};this.subs.add(s);let i=new Promise((r,n)=>{s.first={resolve:r,reject:n}});return this.open&&this._startSub(s),i.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(t){let e=this.nextId++;t.id=e,this.byId.set(e,t),this.pending.set(e,{resolve:()=>{t.first&&t.first.resolve(),t.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(e),this.subs.delete(t),t.first&&t.first.reject(s),t.first=null)}}),this.ws.send(JSON.stringify({...t.msg,id:e}))}};function as(){try{if(window.parent===window)return null;let a=window.parent.document.querySelector("home-assistant");return a&&a.hass||null}catch{return null}}var ht=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function is(){let a=as();return a&&a.themes&&typeof a.themes.darkMode=="boolean"?a.themes.darkMode:!!(ht&&ht.matches)}function rs(){return{topbar:!(window.parent!==window),haptic(t){try{let e=window.parent;e!==window&&e.dispatchEvent(new e.CustomEvent("haptic",{detail:t}))}catch{}},openInHA(t){try{let e=window.parent;if(e!==window&&e.document){e.history.pushState(null,"",t),e.dispatchEvent(new e.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(t,"_top")}}}async function ns(a){let t=new URL("ws",location.href);t.protocol=location.protocol==="https:"?"wss:":"ws:";let e=null,s=o=>{e={...e,...o},a(e)},i=new te(t.href,o=>e&&s({connected:o})),r=await i.sendMessagePromise({type:"resolvia/bootstrap"}),n=as();e={states:r.states||{},entities:r.entities||{},devices:r.devices||{},user:{name:n&&n.user&&n.user.name||r.user&&r.user.name||"",is_admin:n&&n.user?!!n.user.is_admin:!0},themes:{darkMode:is()},language:"pt-BR",connected:!0,version:r.version,resolvia:{ai:r.ai||{available:!1},async extract(o){let c=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(o)}),p=await c.json().catch(()=>({}));if(!c.ok){let d=new Error(p.error||`Erro ${c.status}`);throw d.code=p.code,d}return p}},connection:i,callWS:o=>i.sendMessagePromise(o),callService:(o,c,p,d)=>i.sendMessagePromise({type:"call_service",domain:o,service:c,service_data:p||{},target:d})},i.subscribeMessage(o=>{let c={...e.states};o.new_state?c[o.entity_id]=o.new_state:delete c[o.entity_id],s({states:c})},{type:"resolvia/subscribe_lists"}),i.onReconnect(async()=>{try{let o=await i.sendMessagePromise({type:"resolvia/bootstrap"});s({states:o.states||{},entities:o.entities||{},devices:o.devices||{}})}catch{}});let l=()=>{let o=is();e&&o!==e.themes.darkMode&&s({themes:{...e.themes,darkMode:o}})};return setInterval(l,1500),ht&&ht.addEventListener&&ht.addEventListener("change",l),e}var ee=document.getElementById("app"),Z=document.createElement("resolvia-panel");Z.env=rs();Z.narrow=window.innerWidth<870;window.addEventListener("resize",()=>Z.narrow=window.innerWidth<870);ns(a=>{Z.hass=a}).then(a=>{Z.hass=a,ee.replaceChildren(Z)}).catch(a=>{ee.innerHTML="";let t=document.createElement("div");t.id="boot",t.textContent=`N\xE3o consegui iniciar o ResolvIA: ${a.message}. Recarregue a p\xE1gina.`,ee.appendChild(t)});})();
