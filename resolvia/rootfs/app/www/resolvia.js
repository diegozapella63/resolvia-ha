/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{var $t=globalThis,Kt=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Xt=Symbol(),be=new WeakMap,wt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Xt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Kt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=be.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&be.set(e,t))}return t}toString(){return this.cssText}},G=r=>new wt(typeof r=="string"?r:r+"",void 0,Xt),He=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,a,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[i+1],r[0]);return new wt(e,r,Xt)},Ws=(r,t)=>{if(Kt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),a=$t.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,r.appendChild(s)}},_e=Kt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return G(e)})(r):r,{is:Ys,defineProperty:Js,getOwnPropertyDescriptor:Ks,getOwnPropertyNames:Xs,getOwnPropertySymbols:Zs,getPrototypeOf:Qs}=Object,Ct=globalThis,$e=Ct.trustedTypes,Gs=$e?$e.emptyScript:"",ta=Ct.reactiveElementPolyfillSupport,dt=(r,t)=>r,Wt={toAttribute(r,t){switch(t){case Boolean:r=r?Gs:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},De=(r,t)=>!Ys(r,t),we={attribute:!0,type:String,converter:Wt,reflect:!1,useDefault:!1,hasChanged:De};Symbol.metadata??=Symbol("metadata"),Ct.litPropertyMetadata??=new WeakMap;var F=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=we){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&Js(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){let{get:a,set:i}=Ks(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:a,set(o){let d=a?.call(this);i?.call(this,o),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??we}static o(){if(this.hasOwnProperty(dt("elementProperties")))return;let t=Qs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(dt("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(dt("properties"))){let e=this.properties,s=[...Xs(e),...Zs(e)];for(let a of s)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,a]of e)this.elementProperties.set(s,a)}this.u=new Map;for(let[e,s]of this.elementProperties){let a=this.p(e,s);a!==void 0&&this.u.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let a of s)e.unshift(_e(a))}else t!==void 0&&e.push(_e(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ws(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),a=this.constructor.p(t,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:Wt).toAttribute(e,s.type);this.m=t,i==null?this.removeAttribute(a):this.setAttribute(a,i),this.m=null}}_$AK(t,e){let s=this.constructor,a=s.u.get(t);if(a!==void 0&&this.m!==a){let i=s.getPropertyOptions(a),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Wt;this.m=a;let d=o.fromAttribute(e,i.type);this[a]=d??this.T?.get(a)??d,this.m=null}}requestUpdate(t,e,s,a=!1,i){if(t!==void 0){let o=this.constructor;if(a===!1&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??De)(i,e)||s.useDefault&&s.reflect&&i===this.T?.get(t)&&!this.hasAttribute(o.p(t,s))))return;this.M(t,e,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:s,reflect:a,wrapped:i},o){s&&!(this.T??=new Map).has(t)&&(this.T.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),a===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,i]of this.v)this[a]=i;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:o}=i,d=this[a];o!==!0||this._$AL.has(a)||d===void 0||this.M(a,void 0,i,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.U()}catch(s){throw t=!1,this.U(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach(e=>this.C(e,this[e])),this.U()}updated(t){}firstUpdated(t){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[dt("elementProperties")]=new Map,F[dt("finalized")]=new Map,ta?.({ReactiveElement:F}),(Ct.reactiveElementVersions??=[]).push("2.1.2");var Zt=globalThis,ye=r=>r,yt=Zt.trustedTypes,ke=yt?yt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Qt="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,Gt="?"+H,ea=`<${Gt}>`,X=document,ht=()=>X.createComment(""),ut=r=>r===null||typeof r!="object"&&typeof r!="function",te=Array.isArray,Ve=r=>te(r)||typeof r?.[Symbol.iterator]=="function",Ut=`[ 	
\f\r]`,ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Me=/>/g,J=RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Te=/"/g,Fe=/^(?:script|style|textarea|title)$/i,ee=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),n=ee(1),sa=ee(2),Ua=ee(3),S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ie=new WeakMap,K=X.createTreeWalker(X,129);function Ne(r,t){if(!te(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ke!==void 0?ke.createHTML(t):t}var Ue=(r,t)=>{let e=r.length-1,s=[],a,i=t===2?"<svg>":t===3?"<math>":"",o=ct;for(let d=0;d<e;d++){let l=r[d],c,p,u=-1,m=0;for(;m<l.length&&(o.lastIndex=m,p=o.exec(l),p!==null);)m=o.lastIndex,o===ct?p[1]==="!--"?o=Ae:p[1]!==void 0?o=Me:p[2]!==void 0?(Fe.test(p[2])&&(a=RegExp("</"+p[2],"g")),o=J):p[3]!==void 0&&(o=J):o===J?p[0]===">"?(o=a??ct,u=-1):p[1]===void 0?u=-2:(u=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?J:p[3]==='"'?Te:Se):o===Te||o===Se?o=J:o===Ae||o===Me?o=ct:(o=J,a=void 0);let f=o===J&&r[d+1].startsWith("/>")?" ":"";i+=o===ct?l+ea:u>=0?(s.push(c),l.slice(0,u)+Qt+l.slice(u)+H+f):l+H+(u===-2?d:f)}return[Ne(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},mt=class r{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let i=0,o=0,d=t.length-1,l=this.parts,[c,p]=Ue(t,e);if(this.el=r.createElement(c,s),K.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=K.nextNode())!==null&&l.length<d;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(Qt)){let m=p[o++],f=a.getAttribute(u).split(H),v=/([.?@])?(.*)/.exec(m);l.push({type:1,index:i,name:v[2],strings:f,ctor:v[1]==="."?At:v[1]==="?"?Mt:v[1]==="@"?St:Q}),a.removeAttribute(u)}else u.startsWith(H)&&(l.push({type:6,index:i}),a.removeAttribute(u));if(Fe.test(a.tagName)){let u=a.textContent.split(H),m=u.length-1;if(m>0){a.textContent=yt?yt.emptyScript:"";for(let f=0;f<m;f++)a.append(u[f],ht()),K.nextNode(),l.push({type:2,index:++i});a.append(u[m],ht())}}}else if(a.nodeType===8)if(a.data===Gt)l.push({type:2,index:i});else{let u=-1;for(;(u=a.data.indexOf(H,u+1))!==-1;)l.push({type:7,index:i}),u+=H.length-1}i++}}static createElement(t,e){let s=X.createElement("template");return s.innerHTML=t,s}};function Z(r,t,e=r,s){if(t===S)return t;let a=s!==void 0?e.N?.[s]:e.O,i=ut(t)?void 0:t._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(r),a._$AT(r,e,s)),s!==void 0?(e.N??=[])[s]=a:e.O=a),a!==void 0&&(t=Z(r,a._$AS(r,t.values),a,s)),t}var kt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??X).importNode(e,!0);K.currentNode=a;let i=K.nextNode(),o=0,d=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Pt(i,i.nextSibling,this,t):l.type===1?c=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(c=new Tt(i,this,t)),this._$AV.push(c),l=s[++d]}o!==l?.index&&(i=K.nextNode(),o++)}return K.currentNode=X,a}V(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Pt=class Be{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,s,a){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ut(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==S&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):Ve(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==h&&ut(this._$AH)?this._$AA.nextSibling.data=t:this.I(X.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=mt.createElement(Ne(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(e);else{let i=new kt(a,this),o=i.R(this.options);i.V(e),this.I(o),this._$AH=i}}_$AC(t){let e=Ie.get(t.strings);return e===void 0&&Ie.set(t.strings,e=new mt(t)),e}H(t){te(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,a=0;for(let i of t)a===e.length?e.push(s=new Be(this.B(ht()),this.B(ht()),this,this.options)):s=e[a],s._$AI(i),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ye(t).nextSibling;ye(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,i){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,a){let i=this.strings,o=!1;if(i===void 0)t=Z(this,t,e,0),o=!ut(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let d=t,l,c;for(t=i[0],l=0;l<i.length-1;l++)c=Z(this,d[s+l],e,l),c===S&&(c=this._$AH[l]),o||=!ut(c)||c!==this._$AH[l],c===h?t=h:t!==h&&(t+=(c??"")+i[l+1]),this._$AH[l]=c}o&&!a&&this.W(t)}W(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},At=class extends Q{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===h?void 0:t}},Mt=class extends Q{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},St=class extends Q{constructor(t,e,s,a,i){super(t,e,s,a,i),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??h)===S)return;let s=this._$AH,a=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==h&&(s===h||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Tt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}},aa={q:Qt,J:H,Z:Gt,F:1,G:Ue,K:kt,X:Ve,Y:Z,tt:Pt,st:Q,it:Mt,et:St,ht:At,ot:Tt},ia=Zt.litHtmlPolyfillSupport;ia?.(mt,Pt),(Zt.litHtmlVersions??=[]).push("3.3.3");var je=(r,t,e)=>{let s=e?.renderBefore??t,a=s._$litPart$;if(a===void 0){let i=e?.renderBefore??null;s._$litPart$=a=new Pt(t.insertBefore(ht(),i),i,void 0,e??{})}return a._$AI(r),a},se=globalThis;var U=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=je(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return S}};U._$litElement$=!0,U.finalized=!0,se.litElementHydrateSupport?.({LitElement:U});var ra=se.litElementPolyfillSupport;ra?.({LitElement:U});(se.litElementVersions??=[]).push("4.2.2");var{tt:oa}=aa,ze=r=>r,na=r=>r===null||typeof r!="object"&&typeof r!="function";var Ee=(r,t)=>t===void 0?r?._$litType$!==void 0:r?._$litType$===t,la=r=>r?._$litType$?.h!=null;var We=r=>r.strings===void 0,Oe=()=>document.createComment(""),N=(r,t,e)=>{let s=r._$AA.parentNode,a=t===void 0?r._$AB:t._$AA;if(e===void 0){let i=s.insertBefore(Oe(),a),o=s.insertBefore(Oe(),a);e=new oa(i,o,r,r.options)}else{let i=e._$AB.nextSibling,o=e._$AM,d=o!==r;if(d){let l;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(l=r._$AU)!==o._$AU&&e._$AP(l)}if(i!==a||d){let l=e._$AA;for(;l!==i;){let c=ze(l).nextSibling;ze(s).insertBefore(l,a),l=c}}}return e},V=(r,t,e=r)=>(r._$AI(t,e),r),ca={},ft=(r,t=ca)=>r._$AH=t,Yt=r=>r._$AH,Bt=r=>{r._$AR(),r._$AA.remove()},Ye=r=>{r._$AR()};var O=r=>(...t)=>({_$litDirective$:r,values:t}),P=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.ct=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var pt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),pt(s,t);return!0},It=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},Je=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),ha(t)}};function da(r){this._$AN!==void 0?(It(this),this._$AM=r,Je(this)):this._$AM=r}function pa(r,t=!1,e=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(t)if(Array.isArray(s))for(let i=e;i<s.length;i++)pt(s[i],!1),It(s[i]);else s!=null&&(pt(s,!1),It(s));else pt(this,r)}var ha=r=>{r.type==2&&(r._$AP??=pa,r._$AQ??=da)},gt=class extends P{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Je(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(pt(this,t),It(this))}setValue(t){if(We(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var zt=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},Et=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(t=>this.dt=t)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var Ot=class extends gt{constructor(){super(...arguments),this.ft=new zt(this),this.vt=new Et}render(t,e){return S}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.yt)return S;this.yt=e;let a=0,{ft:i,vt:o}=this;return(async(d,l)=>{for await(let c of d)if(await l(c)===!1)return})(e,async d=>{for(;o.get();)await o.get();let l=i.deref();if(l!==void 0){if(l.yt!==e)return!1;s!==void 0&&(d=s(d,a)),l.commitValue(d,a),a++}return!0}),S}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Ba=O(Ot),ja=O(class extends Ot{constructor(r){if(super(r),r.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(r,t){return this.rt=r,super.update(r,t)}commitValue(r,t){t===0&&Ye(this.rt);let e=N(this.rt);V(e,r)}}),Ce=r=>la(r)?r._$litType$.h:r.strings,Wa=O(class extends P{constructor(r){super(r),this.bt=new WeakMap}render(r){return[r]}update(r,[t]){let e=Ee(this.gt)?Ce(this.gt):null,s=Ee(t)?Ce(t):null;if(e!==null&&(s===null||e!==s)){let a=Yt(r).pop(),i=this.bt.get(e);if(i===void 0){let o=document.createDocumentFragment();i=je(h,o),i.setConnected(!1),this.bt.set(e,i)}ft(i,[a]),N(i,void 0,a)}if(s!==null){if(e===null||e!==s){let a=this.bt.get(s);if(a!==void 0){let i=Yt(a).pop();Ye(r),N(r,void 0,i),ft(r,[i])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var Ya=O(class extends P{constructor(r){if(super(r),r.type!==1||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(t=>r[t]).join(" ")+" "}update(r,[t]){if(this.wt===void 0){this.wt=new Set,r.strings!==void 0&&(this._t=new Set(r.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(t)}let e=r.element.classList;for(let s of this.wt)s in t||(e.remove(s),this.wt.delete(s));for(let s in t){let a=!!t[s];a===this.wt.has(s)||this._t?.has(s)||(a?(e.add(s),this.wt.add(s)):(e.remove(s),this.wt.delete(s)))}return S}}),ua={},Ja=O(class extends P{constructor(){super(...arguments),this.St=ua}render(r,t){return t()}update(r,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every((s,a)=>s===this.St[a]))return S}else if(this.St===t)return S;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Ka=O(class extends P{constructor(){super(...arguments),this.key=h}render(r,t){return this.key=r,t}update(r,[t,e]){return t!==this.key&&(ft(r),this.key=t),e}}),Xa=O(class extends P{constructor(r){if(super(r),r.type!==3&&r.type!==1&&r.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!We(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[t]){if(t===S||t===h)return t;let e=r.element,s=r.name;if(r.type===3){if(t===e[s])return S}else if(r.type===4){if(!!t===e.hasAttribute(s))return S}else if(r.type===1&&e.getAttribute(s)===t+"")return S;return ft(r),t}});var jt=new WeakMap,Za=O(class extends gt{render(r){return h}update(r,[t]){let e=t!==this.lt;return e&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=r.options?.host,this.$t(this.xt=r.element)),h}$t(r){if(this.lt!==void 0)if(this.isConnected||(r=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=jt.get(t);e===void 0&&(e=new WeakMap,jt.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,r),r!==void 0&&this.lt.call(this.Et,r)}else this.lt.value=r}get Tt(){return typeof this.lt=="function"?jt.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),Pe=(r,t,e)=>{let s=new Map;for(let a=t;a<=e;a++)s.set(r[a],a);return s},R=O(class extends P{constructor(r){if(super(r),r.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(r,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let a=[],i=[],o=0;for(let d of r)a[o]=s?s(d,o):o,i[o]=e(d,o),o++;return{values:i,keys:a}}render(r,t,e){return this.Ct(r,t,e).values}update(r,[t,e,s]){let a=Yt(r),{values:i,keys:o}=this.Ct(t,e,s);if(!Array.isArray(a))return this.Pt=o,i;let d=this.Pt??=[],l=[],c,p,u=0,m=a.length-1,f=0,v=i.length-1;for(;u<=m&&f<=v;)if(a[u]===null)u++;else if(a[m]===null)m--;else if(d[u]===o[f])l[f]=V(a[u],i[f]),u++,f++;else if(d[m]===o[v])l[v]=V(a[m],i[v]),m--,v--;else if(d[u]===o[v])l[v]=V(a[u],i[v]),N(r,l[v+1],a[u]),u++,v--;else if(d[m]===o[f])l[f]=V(a[m],i[f]),N(r,a[u],a[m]),m--,f++;else if(c===void 0&&(c=Pe(o,f,v),p=Pe(d,u,m)),c.has(d[u]))if(c.has(d[m])){let b=p.get(o[f]),y=b!==void 0?a[b]:null;if(y===null){let M=N(r,a[u]);V(M,i[f]),l[f]=M}else l[f]=V(y,i[f]),N(r,a[u],y),a[b]=null;f++}else Bt(a[m]),m--;else Bt(a[u]),u++;for(;f<=v;){let b=N(r,l[v+1]);V(b,i[f]),l[f++]=b}for(;u<=m;){let b=a[u++];b!==null&&Bt(b)}return this.Pt=o,ft(r,l),S}}),Ke="important",ma=" !"+Ke,Qa=O(class extends P{constructor(r){if(super(r),r.type!==1||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{let s=r[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(r,[t]){let{style:e}=r.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let s of this.Mt)t[s]==null&&(this.Mt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let a=t[s];if(a!=null){this.Mt.add(s);let i=typeof a=="string"&&a.endsWith(ma);s.includes("-")||i?e.setProperty(s,i?a.slice(0,-11):a,i?Ke:""):e[s]=a}}return S}}),Ga=O(class extends P{constructor(r){if(super(r),r.type!==2)throw Error("templateContent can only be used in child bindings")}render(r){return this.At===r?S:(this.At=r,document.importNode(r.content,!0))}}),at=class extends P{constructor(t){if(super(t),this.gt=h,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===h||t==null)return this.kt=void 0,this.gt=t;if(t===S)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};at.directiveName="unsafeHTML",at.resultType=1;var ti=O(at);var vt=class extends at{};vt.directiveName="unsafeSVG",vt.resultType=2;var L=O(vt),Re=r=>!na(r)&&typeof r.then=="function",Le=1073741823;var Jt=class extends gt{constructor(){super(...arguments),this.Ot=Le,this.Ut=[],this.ft=new zt(this),this.vt=new Et}render(...t){return t.find(e=>!Re(e))??S}update(t,e){let s=this.Ut,a=s.length;this.Ut=e;let i=this.ft,o=this.vt;this.isConnected||this.disconnected();for(let d=0;d<e.length&&!(d>this.Ot);d++){let l=e[d];if(!Re(l))return this.Ot=d,l;d<a&&l===s[d]||(this.Ot=Le,a=0,Promise.resolve(l).then(async c=>{for(;o.get();)await o.get();let p=i.deref();if(p!==void 0){let u=p.Ut.indexOf(l);u>-1&&u<p.Ot&&(p.Ot=u,p.setValue(c))}}))}return S}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},ei=O(Jt);var fa=Symbol.for(""),ga=r=>{if(r?.r===fa)return r?._$litStatic$};var qe=new Map,Xe=r=>(t,...e)=>{let s=e.length,a,i,o=[],d=[],l,c=0,p=!1;for(;c<s;){for(l=t[c];c<s&&(i=e[c],(a=ga(i))!==void 0);)l+=a+t[++c],p=!0;c!==s&&d.push(i),o.push(l),c++}if(c===s&&o.push(t[s]),p){let u=o.join("$$lit$$");(t=qe.get(u))===void 0&&(o.raw=o,qe.set(u,t=o)),e=d}return r(t,...e)},si=Xe(n),ai=Xe(sa);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var E={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',"door-open":'<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />'};var Ze="./fonts/barlow-400.woff2";var Qe="./fonts/barlow-500.woff2";var Ge="./fonts/barlow-600.woff2";var ts="./fonts/barlow-condensed-500.woff2";var es="./fonts/barlow-condensed-600.woff2";var ss="./fonts/barlow-condensed-700.woff2";var as='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',is=`"RV Barlow", ${as}`,rs=`"RV Barlow Condensed", ${as}`;function os(){if(document.getElementById("resolvia-fonts"))return;let r=(e,s,a)=>`@font-face{font-family:"${e}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,t=document.createElement("style");t.id="resolvia-fonts",t.textContent=[r("RV Barlow",Ze,400),r("RV Barlow",Qe,500),r("RV Barlow",Ge,"600 900"),r("RV Barlow Condensed",ts,500),r("RV Barlow Condensed",es,600),r("RV Barlow Condensed",ss,"700 900")].join(`
`),document.head.appendChild(t)}var ae=()=>n`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var ya="(min-width: 1000px)";function ns(r,t=""){if(!r.touches||r.touches.length!==1||window.matchMedia&&window.matchMedia(ya).matches)return null;let e=r.touches[0];if(e.clientX<24||e.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${t?`, ${t}`:""}`;for(let a of r.composedPath()){if(a===r.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let i=getComputedStyle(a);if((i.overflowX==="auto"||i.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:e.clientX,y:e.clientY,at:Date.now()}}function ls(r,t){if(!t||!r.changedTouches||!r.changedTouches.length)return 0;let e=r.changedTouches[0],s=e.clientX-t.x,a=e.clientY-t.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-t.at>800?0:s<0?1:-1}async function ie(r,t,e){for(let a=0;a<30&&r._view().name!==t;a++)await new Promise(i=>setTimeout(i,16));await r.updateComplete;let s=r.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${e>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var cs=He`
  :host {
    --rv-body: ${G(is)};
    --rv-display: ${G(rs)};
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
`;var ds=["dom","seg","ter","qua","qui","sex","s\xE1b"],ps={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es"},hs={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},B=r=>String(r).padStart(2,"0"),re=r=>`${r.getFullYear()}-${B(r.getMonth()+1)}-${B(r.getDate())}`,Rt=r=>{let[t,e,s]=r.split("-").map(Number);return new Date(t,e-1,s)},fs=r=>String(Math.round(r*10)/10).replace(".",","),us=r=>r>=1e3?`${fs(r/1e3)} mil`:String(Math.round(r||0)),ms=r=>`${r} ${r===1?"chamada":"chamadas"}`,ka=(r,t={})=>t[r]||(r||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",Aa=(r,t)=>{let e=new Date(r);if(!Number.isFinite(e.getTime()))return"";let s=`${B(e.getHours())}:${B(e.getMinutes())}`;return re(e)===re(t)?`hoje ${s}`:`${B(e.getDate())}/${B(e.getMonth()+1)} ${s}`};function Ma(r){let t=r.join(" ").toLowerCase();return/google|gemini/.test(t)?n`Consumo exato e cota: <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener">Google Cloud Console</a>.`:/openai|chatgpt|gpt/.test(t)?n`Consumo exato e custo: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener">platform.openai.com/usage</a>.`:/anthropic|claude/.test(t)?n`Consumo exato e custo: <a href="https://platform.claude.com/usage" target="_blank" rel="noopener">Claude Console</a>.`:"O consumo exato fica no painel do provedor da IA."}function gs({u:r,day:t,onDay:e,head:s,app:a,using:i="",names:o={}}){if(!r||!r.hoje)return n`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let d=new Date,l=re(d),c=x=>x.cota?n`<span class="s alert">${x.cota} ${x.cota>1?"vezes":"vez"} sem cota</span>`:x.erros?n`<span class="s alert">${x.erros} com erro</span>`:n`<span class="s">≈ ${us(x.tokens)} tokens</span>`,p=(x,k)=>n`<div class="uso-tile"><span class="k">${x}</span><span class="v">${k.chamadas||0}</span>${c(k)}</div>`,u=r.dias||[],m=Math.max(1,...u.map(x=>x.chamadas||0)),f=u.find(x=>x.dia===t)||u.find(x=>x.dia===l)||{dia:l,chamadas:0,erros:0,cota:0},v=x=>x.dia===l?"hoje":ds[Rt(x.dia).getDay()],b=r.semana&&r.semana.tipos||{},y=[...Object.keys(r.mes&&r.mes.ias||{}),...Object.keys(r.semana&&r.semana.ias||{}),i],M=r.ultimas||[];return n`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${p("Hoje",r.hoje)}${p("7 dias",r.semana)}${p("Este m\xEAs",r.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${u.map(x=>{let k=x.chamadas?Math.max(4,Math.round(x.chamadas/m*100)):0;return n`<button type="button" class="uso-bar ${x.dia===l?"today":""}" aria-pressed=${x.dia===f.dia?"true":"false"} aria-label="${v(x)}: ${ms(x.chamadas)}" @click=${()=>e(x.dia)}><i style="height:${k}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${u.map(x=>n`<span>${v(x)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${f.dia===l?"Hoje":`${ds[Rt(f.dia).getDay()]}, ${B(Rt(f.dia).getDate())}/${B(Rt(f.dia).getMonth()+1)}`}: <b>${ms(f.chamadas)}</b>${f.erros?`, ${f.erros} com erro`:""}${f.cota?`, ${f.cota} sem cota`:""}.</p>
    ${Object.keys(b).length?n`<ul class="uso-kinds">${Object.keys(b).sort((x,k)=>b[k]-b[x]).map(x=>n`<li>${ps[x]||x} <b>${b[x]}</b></li>`)}</ul>`:h}
    <details class="uso-last">
      <summary>Últimas chamadas</summary>
      <ul>
        ${M.length?M.map(x=>n`<li><b>${ps[x.tipo]||x.tipo}</b><span>${ka(x.ia,o)}</span>${hs[x.resultado]?n`<span class="r-err">${hs[x.resultado]}</span>`:h}
                <span class="t">${fs(x.segundos)} s · ≈ ${us(x.tokens)} tokens${x.imagens?` \xB7 ${x.imagens} ${x.imagens>1?"imagens":"imagem"}`:""} · ${Aa(x.quando,d)}</span></li>`):n`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    <p class="uso-note">${Ma(y)}</p>
  </div>`}var vs=`
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
`;var oe="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",Sa="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function xs({theme:r,onTheme:t,icon:e}){return n`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Autom\xE1tico","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,i])=>n`<button type="button" class=${r===s?"on":""} role="radio" aria-checked=${r===s?"true":"false"} @click=${()=>t(s)}>${e(i)}<span>${a}</span></button>`)}
  </div>`}function bs({palette:r,value:t,onPick:e}){return n`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${r.map(s=>n`<button type="button" class="tsw ${t===s.id?"on":""}" role="radio" aria-checked=${t===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>e(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${oe}></path><path class="sw-gap" d=${oe}></path><path class="sw-fill" d=${oe+Sa}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var _s=`
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
`;var $={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},w=(r,t)=>((r||0)&t)===t,it=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"framboesa",label:"Framboesa",fill:"#E8508A",ink:"#A3124F"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"grafite",label:"Grafite",fill:"#B9ADAE",ink:"#5E5253"}],$s=["vermelho","coral","rosa","laranja","framboesa","ouro"],rt=r=>it.find(t=>t.id===r),ws=r=>rt($s[r%$s.length]);function qt(r,t){let e=r.replace("#",""),s=parseInt(e.length===3?e.replace(/./g,a=>a+a):e,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${t})`}function I(r,t,e="c"){return`--${e}:${r.fill};--${e}i:${t?r.fill:r.ink};--${e}s:${qt(r.fill,t?.17:.15)};`}var ot=r=>(r||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),ys=r=>Array.from(r||"",t=>{let e=t.normalize("NFD")[0]||t;return e.toLowerCase().length===1?e.toLowerCase():t}).join(""),_=(r,t,e)=>`${r} ${r===1?t:e}`,ks=r=>String(r||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),A=(r,t=38)=>r.length>t?r.slice(0,t-1).trimEnd()+"\u2026":r;function As(r,t){let e=r.states[t],s=e&&e.attributes&&e.attributes.friendly_name||t.split(".")[1].replace(/_/g," "),a=r.entities&&r.entities[t],i=a&&a.device_id&&r.devices?r.devices[a.device_id]:void 0,o=i?i.name_by_user||i.name:void 0,d=s,l=o||null;return o&&s.toLowerCase().startsWith(o.toLowerCase()+" ")&&(d=s.slice(o.length+1)),d=d.charAt(0).toUpperCase()+d.slice(1),{name:d,group:l}}var Ta=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/pet|cachorro|dog/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function le(r){let t=ot(r);for(let[e,s]of Ta)if(e.test(t))return s;return"list-checks"}var Ms=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],Ia=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],za=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Lt=r=>String(r).padStart(2,"0"),tt=r=>`${r.getFullYear()}-${Lt(r.getMonth()+1)}-${Lt(r.getDate())}`,Ea=r=>`${Lt(r.getHours())}:${Lt(r.getMinutes())}`;function Ht(r){let[t,e,s]=r.split("-").map(Number);return new Date(t,e-1,s)}function ne(r,t){let e=new Date(r.getFullYear(),r.getMonth(),r.getDate());return e.setDate(e.getDate()+t),e}function j(r){if(!r)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(r)){let e=Ht(r);return{date:r,time:null,at:new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59)}}let t=new Date(r);return isNaN(t)?null:{date:tt(t),time:Ea(t),at:t}}function ce(r,t=new Date){let e=Ht(r),s=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-s)/864e5)}function de(r,t=new Date){let e=Ht(r),s=`${e.getDate()} ${za[e.getMonth()]}`;return e.getFullYear()===t.getFullYear()?s:`${s} ${e.getFullYear()}`}function W(r,t=new Date){let e=j(r);if(!e)return null;let s=ce(e.date,t),a=e.at<t,i;s===0?i="Hoje":s===1?i="Amanh\xE3":s===-1?i="Ontem":s>1&&s<7?i=Ia[Ht(e.date).getDay()]:i=de(e.date,t),e.time&&(i+=`, ${e.time}`);let o=a?"late":s===0?"today":s<=2?"soon":"later";return{...e,diff:s,overdue:a,text:i,tone:o}}function Ss(r=new Date){let t=r.getDay(),e=(6-t+7)%7||7,s=(1-t+7)%7||7,a=[{label:"Hoje",date:tt(r)},{label:"Amanh\xE3",date:tt(ne(r,1))}];return e>1&&a.push({label:"S\xE1bado",date:tt(ne(r,e))}),s>1&&a.push({label:"Pr\xF3x. semana",date:tt(ne(r,s))}),a}function Ts(r,t=new Date){let e=t.getHours(),s=e>=5&&e<12?"Bom dia":e>=12&&e<18?"Boa tarde":"Boa noite",a=(r||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var Oa=/\bhttps?:\/\/[^\s<>"'`]+/gi;function Ca(r){let t;try{t=new URL(r)}catch{return{label:r,icon:"link"}}let e=t.hostname.replace(/^www\./,""),s=t.pathname.split("/").filter(Boolean);if(e==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${e} \u203A ${a}`,icon:"link"}:{label:e,icon:"link"}}function Is(r){let t=[],e=0,s=r||"";for(let a of s.matchAll(Oa)){let i=a[0],o=i.match(/[.,;:!?)\]}]+$/);o&&(i=i.slice(0,-o[0].length)),a.index>e&&t.push({text:s.slice(e,a.index)}),t.push({url:i,...Ca(i)}),e=a.index+i.length}return e<s.length&&t.push({text:s.slice(e)}),t}var Pa=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-]|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,Ra=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function pe(r){let t=(r||"").split(/\r?\n/).map(a=>a.replace(Ra,"").trim()).filter(Boolean);t.length===1&&/[,;]|\se\s/i.test(t[0])&&(t=t[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let e=new Set,s=[];for(let a of t){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(Pa,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let i=a.toLowerCase();e.has(i)||(e.add(i),s.push(a.slice(0,255)))}return s}async function he(r,t=1800){let e=s=>new Promise((a,i)=>{let o=new FileReader;o.onload=()=>a(String(o.result).split(",")[1]||""),o.onerror=()=>i(o.error),o.readAsDataURL(s)});try{let s=await createImageBitmap(r,{imageOrientation:"from-image"}),a=Math.min(1,t/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),s.close&&s.close();let o=await new Promise(d=>i.toBlob(d,"image/jpeg",.86));return{mime:"image/jpeg",data:await e(o),url:URL.createObjectURL(o)}}catch{return{mime:r.type||"image/jpeg",data:await e(r),url:URL.createObjectURL(r)}}}var Y=(r,t="")=>n`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${L(E[r]||E["list-checks"])}</svg>`,La=r=>r>1048576?`${(r/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(r/1024))} KB`,qa={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar"},zs=r=>class extends r{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(t){let e=new Date(t),s=a=>String(a).padStart(2,"0");return`${s(e.getDate())}/${s(e.getMonth()+1)}/${e.getFullYear()} \xE0s ${s(e.getHours())}:${s(e.getMinutes())}`}async _loadBackups(){let t=this._data();if(t){try{this._backups=await t.backups()}catch(e){this._backups={available:!1,error:e.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let t=await this._data().createBackup();this._showToast(`Backup salvo em ${t.folder}/${t.name}`),this._haptic("success"),await this._loadBackups()}catch(t){this._showToast(`N\xE3o consegui criar o backup. ${t.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(t,e){let s=this._data();(!s||!s.url(t))&&(e.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(t,e){let s=t.added||t.added===0?`${e}: ${t.added?_(t.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${_(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${e}: ${_(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return t.missing&&t.missing.length&&(s+=`. ${t.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${t.missing.join(", ")}`),t.unsupported&&(s+=`. ${_(t.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),t.failed&&(s+=`. ${_(t.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let t=this.renderRoot.querySelector("#rv-data-import");t&&(t.value="",t.click())}_onDataImport(t){let e=t.target.files&&t.target.files[0];t.target.value="",e&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${A(e.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(e);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(t){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(t.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let e=await this._data().restoreBackup(t.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(e,"Backup restaurado"))}catch(e){this._showToast(e.message)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let t=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:t})}catch(t){this._sheet==="versions"&&(this._form={...this._form,error:t.message})}}_confirmRestoreVersion(t){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(t.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(t.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(e){this._showToast(e.message)}}})}_renderVersions(){let t=this._form;return n`
        <div class="sheet-head">
          <h3 class="display">Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${Y("x")}</button>
        </div>
        ${t.error?n`<div class="imp-error">${Y("circle-alert")}<span>${t.error}</span></div>`:t.list==null?n`<div class="imp-loading"><span class="spin">${Y("loader-circle")}</span><span>Carregando…</span></div>`:t.list.length?n`<div class="data-list">
                  ${t.list.map(e=>n`<div class="data-item">
                      <div><b>${this._dateTime(e.when)}</b><span>${_(e.lists,"lista personalizada","listas personalizadas")} · ${_(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${qa[e.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(e)}>Restaurar</button>
                    </div>`)}
                </div>`:n`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let t=this._data();if(!t)return h;let e=this._backups,s=(a,i,o,d)=>n`<li>
        <div class="ot"><b>${i}</b><span>${o}</span></div>
        <a class="btn outline sm" href=${t.url(a)||"#"} download @click=${l=>this._exportData(a,l)}>${Y("download")}${d}</a>
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
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||e&&e.available===!1} @click=${()=>this._createBackup()}>${Y("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${e&&e.available===!1?n`<p class="data-note">A pasta share não está disponível para o app.</p>`:h}
          ${e&&e.backups&&e.backups.length?n`<div class="data-list">
                ${e.backups.slice(0,8).map(a=>n`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${La(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${Y("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:h}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Um .zip ou .json exportado pelo ResolvIA, sem duplicar.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${Y("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","As 3 \xFAltimas c\xF3pias dos ajustes e das repeti\xE7\xF5es, guardadas sozinhas.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${Y("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",n`Os itens ficam nas listas do Home Assistant; os ajustes, em <code>/data/resolvia.json</code>.`)}
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var Dt=(r,t="")=>n`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${L(E[r]||E["list-checks"])}</svg>`,Es=[5,10,20,30,50],xt=r=>String(r||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),Os=r=>{let t=/\[cr:[0-9a-f]{8}\]/.exec(String(r||""));return t?t[0]:""},Ha={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},Cs=r=>class extends r{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let t=this._pts;return!!(t&&t.on&&t.placar&&t.placar.ativo)}_rawPoints(t,e){let s=this._pts&&this._pts.points&&this._pts.points[t];return s&&s[ks(e)]||0}_mirrored(t,e){let s=this._pts&&this._pts.espelho&&this._pts.espelho[t];return e&&s&&s[e]||null}_pointsOf(t,e,s=null){let a=this._mirrored(t,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(t,e):0}async _setTaskPoints(t,e,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:t,summary:e,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(`N\xE3o consegui salvar os pontos: ${i.message}`)}}async _setPointsOn(t){await this._saveAppPrefs({points_on:t?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(t,e,s,a,i=null){let o;try{o=await this.hass.callWS({type:"resolvia/points/done",entity_id:t.id,uid:e.uid,summary:e.summary,done:!0,...i?{quem:i}:{}})}catch(c){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${c.message}`,a);return}if(o&&o.ask){this._openSheet("who",{title:e.summary,points:o.points,participantes:o.participantes,run:c=>{this._closeSheet(!0),c?this._givePoints(t,e,s,a,c):this._showToast(s,a)}});return}if(!o||!o.points){this._showToast(s,a);return}let d=`Resolvido por ${o.who} \xB7 +${o.points}`,l=(o.participantes||[]).filter(c=>c!==o.who);if(l.length===1){let c=l[0];this._showToast(d,{label:`Foi ${c}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:o.key,quem:c}).then(()=>this._showToast(`Pontos para ${c}`)).catch(p=>this._showToast(p.message))})}else this._showToast(d,a)}_takePoints(t,e){!this._mirrored(t.id,e.uid)&&(!this._rawPoints(t.id,e.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:t.id,uid:e.uid,summary:e.summary,done:!1}).catch(()=>{})}_renderPointsTag(t,e){let s=this._pointsOf(t,e.summary,e.uid);return s?n`<span class="tag pts" title="${s} pontos para quem concluir">${Dt("trophy")}+${s}</span>`:h}_renderPointsField(t){if(t.mirrored)return h;if(!(this._pts&&this._pts.on))return h;let e=this._pts.placar,s=t.points||0,a=t.pointsCustom||s>0&&!Es.includes(s);return n`<div class="field">
        <span class="flabel">Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>Sem pontos</button>
          ${Es.map(i=>n`<button class="pick ${s===i&&!a?"on":""}" @click=${()=>this._setForm({points:i,pointsCustom:!1})}>+${i}</button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${Dt("trophy")}<span>Outro</span></button>
        </div>
        ${a?n`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${i=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(i.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:h}
        ${s?n`<div class="field-hint">${Dt("trophy")}<span>${e&&e.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${e.participantes.join(" \xD7 ")}).`:e&&e.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA.":"O placar do CronologIA est\xE1 desligado."}</span></div>`:h}
      </div>`}_renderWhoSheet(){let t=this._form;return n`
        <div class="sheet-head">
          <h3 class="display">Quem fez?</h3>
          <button class="icon-btn" @click=${()=>t.run("")} aria-label="Fechar">${Dt("x")}</button>
        </div>
        <p class="sheet-note top">${A(t.title||"",40)} · <b>+${t.points} pontos</b></p>
        <div class="who-grid">
          ${(t.participantes||[]).map(e=>n`<button class="who-btn" @click=${()=>t.run(e)}><span class="who-av">${(e||"?").trim().charAt(0).toUpperCase()}</span><b>${e}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>t.run("")}>Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let t=this._pts;if(!t)return h;let e=t.placar,s=!!t.on,a=Object.values(t.points||{}).reduce((d,l)=>d+Object.keys(l).length,0),i=n`<div class="row switch-row">
          <div class="grow">
            <div class="label">Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${_(a,"tarefa vale","tarefas valem")} pontos.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D.":"Desligado."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${d=>this._setPointsOn(d.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return n`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
          ${i}
        </div>`;let o=e?e.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${e.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:e.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${e.versao}`.trim(),text:`${e.participantes.join(" \xD7 ")} \xB7 fecha ${Ha[e.periodo]||"toda semana"}. ${e.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${e.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${e.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return n`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
        ${i}
        <div class="ai-state ${o.tone}" style="margin-bottom:16px"><span class="dot"></span><div><b>${o.title}</b><span>${o.text}</span></div></div>
      </div>`}};var et=(r,t="")=>n`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${L(E[r]||E["list-checks"])}</svg>`,Da=864e5,Ps=5,Va=2;function ue(r){return r<14?_(r,"dia","dias"):r<60?_(Math.floor(r/7),"semana","semanas"):r<730?_(Math.floor(r/30),"m\xEAs","meses"):_(Math.floor(r/365),"ano","anos")}var Rs=r=>r.icon==="shopping-cart",Ls=r=>class extends r{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let t=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=t.ages||{},this._aiAsking||(this._aiPick=t.ai||null),this._aiBusy=!!t.busy||!!this._aiAsking,clearTimeout(this._aiPoll),t.busy&&!this._aiAsking&&(this._aiPoll=setTimeout(()=>this._loadSuggest(),3e3))}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(t,e,s=new Date){if(this._sinceDate(t,e))return Math.max(0,-ce(j(e.due).date,s));let a=this._ages&&this._ages[t.id]&&e.uid?this._ages[t.id][e.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/Da)):null}_sinceDate(t,e){return!t.canDue&&!!e.due&&!!j(e.due)}_suggestLists(){return this._visible().filter(t=>!t.unavailable&&t.items&&w(t.features,$.UPDATE))}_suggestions(){let t=new Date,e=[],s=[],a=0,i=0;for(let l of this._suggestLists()){let c=l.items.filter(p=>p.status!=="completed");if(c.length){if(a+=c.length,i++,Rs(l)){let p=c.map(u=>this._ageOf(l,u,t)).filter(u=>u!=null);s.push({l,n:c.length,oldest:p.length?Math.max(...p):null});continue}c.forEach((p,u)=>{let m=[],f=0,v=this._ageOf(l,p,t);v!=null&&v>=3&&(f+=Math.min(v,60)/3,m.push(this._sinceDate(l,p)?`Assim h\xE1 ${ue(v)}`:`Na lista h\xE1 ${ue(v)}`)),c.length===1?(f+=8,m.push("\xC9 o \xFAltimo da lista")):c.length===2&&(f+=4,m.push("Faltam 2 para zerar a lista"));let b=this._pointsOf(l.id,p.summary,p.uid);b&&(f+=3+Math.min(b,50)/10),this._ruleFor(l.id,p)&&(f+=4,m.push("Voltou para fazer"));let y=l.canDue&&p.due?W(p.due,t):null;if(y&&y.diff<=0){f+=y.diff<0?6:5;let M=this._mirrored(l.id,p.uid);m.push(M?`${M.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${y.diff<0?"atrasada":"para hoje"}`:y.diff<0?"A data j\xE1 passou":"Tem data para hoje")}u===0&&(f+=1.5),m.length||m.push(b?"Vale pontos":u===0?"Primeiro da lista":`${u+1}\xBA da lista`),e.push({l,i:p,idx:u,score:f,why:m.join(" \xB7 ")})})}}e.sort((l,c)=>c.score-l.score||l.idx-c.idx);let o=[],d=new Map;for(let l of e){if(l.score<=0)continue;let c=d.get(l.l.id)||0;if(!(c>=Va)&&(d.set(l.l.id,c+1),o.push(l),o.length>=Ps))break}for(let l of e){if(o.length>=Ps)break;o.includes(l)||o.push(l)}return s.sort((l,c)=>c.n-l.n),{top:o,shopping:s,pending:a,lists:i}}async _askAi(){if(this._aiBusy)return;let t=new Date,e=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let i=this._ruleFor(s.id,a);e.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,t),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:i?i.days:0,compras:Rs(s),comodo:this._roomName(this._roomIdOf(s.id,a.summary))||"",equipamento:(this._equipOf(this._equipIdOf(s.id,a.summary))||{}).nome||""})}if(e.length){this._aiBusy=!0,this._aiAsking=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:e.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiAsking=!1,this._aiBusy=!1,this.requestUpdate()}}async _clearAi(){this._aiPick=null,this._aiErr=null,this.requestUpdate();try{await this.hass.callWS({type:"resolvia/ai/suggest/clear"})}catch{}}_aiRows(){let t=this._aiPick,e=[];for(let s of t&&t.picks||[]){let a=s.key.indexOf("|"),i=this._list(s.key.slice(0,a)),o=i&&i.items&&i.items.find(d=>d.uid===s.key.slice(a+1));i&&o&&!i.hidden&&(o.status!=="completed"||this._recent.has(o.uid))&&e.push({l:i,i:o,why:s.motivo||"Escolhido pela IA",ai:!0})}return e}_renderStart(t){let e=this._aiOn()&&!!this.hass.resolvia,s=e?this._aiInfo():null,a=e?this._aiPick:null,i=a?this._aiRows():[],o=i.length>0,d=o?i:t.top;if(!d.length&&!e)return h;let l=!!this._aiBusy;return n`<div class="panel items start ${o?"by-ai":""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${et(o?"sparkles":"flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${d.length}</small></div>
        ${o?n`<p class="start-by">${et("sparkles")}<span>Escolhidos pela IA.</span></p>`:h}
        ${R(d,c=>c.l.id+(c.i.uid||c.i.summary),c=>this._renderItem(c.l,c.i,{showList:!0,why:c.why,whyIcon:c.ai?"sparkles":null}))}
        ${a&&!o?n`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>`:h}
        ${e&&!s.ready&&s.reason?n`<p class="ai-note">${s.reason}</p>`:h}
        ${this._aiErr?n`<p class="ai-note err">${this._aiErr}</p>`:h}
        ${e?n`<div class="ai-actions start-acts">
              <button class="btn ${o?"outline":"primary"} sm ai-ask" ?disabled=${l||!s.ready} @click=${()=>this._askAi()}>
                ${et(l?"loader-circle":"sparkles",l?"ai-spin":"")}${l?"Pensando\u2026":o?"Sugerir de novo":"Sugerir com IA"}
              </button>
              ${a&&!l?n`<button class="btn outline sm" @click=${()=>this._clearAi()}>${et("rotate-ccw")}Voltar ao automático</button>`:h}
            </div>`:h}
      </div>`}_renderSuggest(){let t=this._suggestions();return n`
        <section class="page">
          ${this._renderPageHead("Sugest\xF5es",{text:t.pending?`${_(t.pending,"pendente","pendentes")} em ${_(t.lists,"lista","listas")}`:"Nada pendente"})}
          ${t.pending?n`
                ${this._renderStart(t)}
                ${t.shopping.length?n`<div class="panel">
                      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${et("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${t.shopping.length}</small></div>
                      ${t.shopping.map(e=>n`<button class="list-card" style=${I(e.l.color,this._dark)} @click=${()=>this._go(`/lista/${e.l.id}`)}>
                          <span class="tile">${et(e.l.icon)}</span>
                          <span class="lc-main">
                            <span class="lc-title">${e.l.name}</span>
                            <span class="lc-meta"><span>${e.oldest!=null&&e.oldest>=3?`O mais antigo est\xE1 h\xE1 ${ue(e.oldest)}`:_(e.n,"item para comprar","itens para comprar")}</span></span>
                          </span>
                          <span class="lc-num">${e.n}</span>
                        </button>`)}
                    </div>`:h}
              `:n`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${et("lightbulb")}</div>
                  <h3>Nada para sugerir</h3>
                  <p>Todas as listas estão em dia. Quando aparecer algo pendente, as sugestões aparecem aqui.</p>
                </div>
              </div>`}
        </section>
      `}};var Vt=(r,t="")=>n`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${L(E[r]||E["list-checks"])}</svg>`,qs=r=>String(r||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),Hs=r=>class extends r{async _loadRooms(t="resolvia/rooms/get"){if(!(!this.hass||!this.hass.resolvia)){try{this._rooms=await this.hass.callWS({type:t})}catch{this._rooms=this._rooms||null}this.requestUpdate()}}_roomsOn(){let t=this._rooms;return!!(t&&t.on&&t.comodos&&t.comodos.length)}_roomList(){return this._rooms&&this._rooms.comodos||[]}_equipsOn(){let t=this._rooms;return!!(t&&t.equips_on&&t.itens&&t.itens.length)}_equipList(){return this._rooms&&this._rooms.itens||[]}_equipOf(t){return t&&this._equipList().find(e=>e.id===t)||null}_equipIdOf(t,e){if(!this._equipsOn())return null;let s=this._rooms.emap&&this._rooms.emap[t],a=s&&s[qs(e)];return this._equipOf(a)?a:null}async _setTaskEquip(t,e,s,a=null){if(this._equipsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/equips/set",entity_id:t,summary:e,equip:s||null,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o equipamento")}}_renderEquipTag(t,e){let s=this._equipOf(this._equipIdOf(t,e.summary));return s?n`<span class="tag room">${Vt("package")}${A(s.nome,26)}</span>`:h}_equipOptions(t){let e=new Map;for(let s of this._equipList()){let a=this._roomList().find(o=>o.id===s.comodo),i=a?a.nome:"Outros";e.has(i)||e.set(i,[]),e.get(i).push(s)}return[...e].map(([s,a])=>n`<optgroup label=${s}>${a.map(i=>n`<option value=${i.id} ?selected=${i.id===t}>${i.nome}${i.zona?` \xB7 ${i.zona}`:""}</option>`)}</optgroup>`)}_renderEquipField(t){if(!this._equipsOn())return h;let e=s=>{let a=this._equipOf(s),i={equip:s||null};a&&a.comodo&&this._roomsOn()&&!t.room&&this._roomList().some(o=>o.id===a.comodo)&&(i.room=a.comodo),this._setForm(i)};return n`<label class="field">
        <span class="flabel">Equipamento</span>
        <select class="select" aria-label="Equipamento" @change=${s=>e(s.target.value)}>
          <option value="" ?selected=${!t.equip}>Nenhum</option>
          ${this._equipOptions(t.equip)}
        </select>
      </label>`}_roomIdOf(t,e){if(!this._roomsOn())return null;let s=this._rooms.map&&this._rooms.map[t],a=s&&s[qs(e)];return a&&this._roomList().some(i=>i.id===a)?a:null}_roomName(t){let e=this._roomList().find(s=>s.id===t);return e?e.nome:null}async _setTaskRoom(t,e,s,a=null){if(this._roomsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/rooms/set",entity_id:t,summary:e,room:s||null,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o c\xF4modo")}}_renderRoomTag(t,e){let s=this._roomIdOf(t,e.summary);return s?n`<span class="tag room">${Vt("door-open")}${A(this._roomName(s),22)}</span>`:h}_renderRoomField(t){if(!this._roomsOn())return h;let e=s=>this._setForm({room:t.room===s?null:s});return n`<div class="field">
        <span class="flabel">Cômodo</span>
        <div class="chip-row grid">
          <button class="pick ${t.room?"":"on"}" @click=${()=>this._setForm({room:null})}>Nenhum</button>
          ${this._roomList().map(s=>n`<button class="pick room ${t.room===s.id?"on":""}" @click=${()=>e(s.id)}>${Vt("door-open")}<span>${A(s.nome,22)}</span></button>`)}
        </div>
      </div>`}_renderRoomsPanel(){if(!this.hass.resolvia)return h;let t=this._rooms||{},e=this._app("rooms_on",!1)===!0,s=this._app("equips_on",!1)===!0,a=(t.comodos||[]).length,i=(t.itens||[]).length,o=(l,c,p,u)=>n`<div class="row switch-row">
        <div class="grow"><div class="label">${l}</div><div class="hint" style="white-space:normal">${c?p:"Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${c} @change=${m=>u(m.target.checked)} aria-label=${l} /><span class="track"></span></label>
      </div>`,d=h;if(e||s){let l=[e&&a?_(a,"c\xF4modo","c\xF4modos"):"",s&&i?_(i,"equipamento","equipamentos"):""].filter(Boolean).join(" \xB7 "),c=this._roomsBusy?"off":l?t.erro?"warn":"ok":"bad",p=this._roomsBusy?"Verificando\u2026":l||(t.encontrado?"Nada cadastrado":"InventarIA n\xE3o encontrado"),u=this._roomsBusy?"":t.erro||(l?e&&a?t.comodos.map(m=>m.nome).join(", "):"":t.encontrado?"Cadastre os c\xF4modos e os itens no InventarIA.":"Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");d=n`<div class="ai-state ${c}"><span class="dot"></span><div><b>${p}</b>${u?n`<span>${u}</span>`:h}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${()=>this._refreshRooms()}>${Vt("rotate-ccw")}Verificar de novo</button></div>`}return n`<div class="panel" id="comodos">
        ${this._secHead("house","InventarIA","Para ligar uma tarefa a um c\xF4modo ou a um equipamento da casa.")}
        ${o("Usar c\xF4modos",e,"Cada tarefa pode ter um c\xF4modo, e a IA sugere qual.",l=>this._toggleRooms(l))}
        ${o("Usar equipamentos",s,"Cada tarefa pode ser de um equipamento ou m\xF3vel, e a IA sugere qual.",l=>this._toggleEquips(l))}
        ${d}
      </div>`}async _toggleEquips(t){await this._saveAppPrefs({equips_on:t?!0:null}),await this._refreshRooms()}async _toggleRooms(t){await this._saveAppPrefs({rooms_on:t?!0:null}),await this._refreshRooms()}async _refreshRooms(){this._roomsBusy=!0,this.requestUpdate(),await this._loadRooms("resolvia/rooms/refresh"),this._roomsBusy=!1,this.requestUpdate()}};var Ft=class{constructor(t){this.onLevel=t,this.chunks=[],this.length=0,this.rate=16e3}async start(){let t=navigator.mediaDevices;if(!t||!t.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await t.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let e=window.AudioContext||window.webkitAudioContext;try{this.ctx=new e({sampleRate:16e3})}catch{this.ctx=new e}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let i=0;for(let o=0;o<a.length;o+=4)i+=a[o]*a[o];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(i/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let t=new Float32Array(this.length),e=0;for(let o of this.chunks)t.set(o,e),e+=o.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(t.length/s),i=new Int16Array(a);for(let o=0;o<a;o++){let d=Math.floor(o*s),l=Math.max(d+1,Math.min(t.length,Math.floor((o+1)*s))),c=0;for(let u=d;u<l;u++)c+=t[u];let p=Math.max(-1,Math.min(1,c/(l-d)));i[o]=p<0?p*32768:p*32767}return i}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let t of this.stream.getTracks())t.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function Ds(r){let t=r&&r.name||"";return t==="NotAllowedError"||t==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":t==="NotFoundError"||t==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":t==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":t==="NoApi"?window.isSecureContext===!1?"O microfone aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), o celular e o navegador n\xE3o deixam usar o microfone, nem pelo app do Home Assistant.":"Este navegador n\xE3o deixa usar o microfone aqui.":`N\xE3o consegui abrir o microfone (${r&&r.message||t||"erro"}).`}var me="2.29.0",Vs="resolvia.theme",fe="resolvia.prefs",Nt="resolvia.lastList",g=(r,t="")=>n`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${L(E[r]||E["list-checks"])}</svg>`,D={get(r,t){try{let e=localStorage.getItem(r);return e==null?t:JSON.parse(e)}catch{return t}},set(r,t){try{localStorage.setItem(r,JSON.stringify(t))}catch{}}},q=r=>r.status==="completed",Fs=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],z=r=>r.uid||r.summary,ge=class extends Hs(Ls(Cs(zs(U)))){static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_rules:{state:!0},_cam:{state:!0},_rooms:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[cs,G(vs),G(_s)];constructor(){super(),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._theme=D.get(Vs,"auto"),this._doneOpen={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),os(),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=t=>{if(t.key!=="/"||t.ctrlKey||t.metaKey||t.altKey||this._sheet)return;let e=t.composedPath&&t.composedPath()[0]||t.target;e&&e.closest&&e.closest("input, textarea, select, [contenteditable]")||(t.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let t=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(t){this._focusSearch=!1,t.focus({preventScroll:!0});try{t.setSelectionRange(t.value.length,t.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,t]of this._subs)this._unsub(t);this._subs.clear();for(let[,t]of this._recent)clearTimeout(t);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(t=>t&&t()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this.hass||e.themes!==this.hass.themes||e.entities!==this.hass.entities||e.devices!==this.hass.devices||e.user!==this.hass.user||e.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(i=>i.startsWith("todo.")),a=Object.keys(e.states).filter(i=>i.startsWith("todo."));return s.length!==a.length?!0:s.some(i=>e.states[i]!==this.hass.states[i])}willUpdate(t){t.has("route")&&this.route&&(this._path=this.route.path||""),t.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints(),this._loadRooms()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(t.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}updated(t){if(this.toggleAttribute("dark",this._dark),t.has("_path")&&this._view().name==="more"){let e=this.renderRoot.querySelector(".more-tabs"),s=e&&e.querySelector("button.on");if(s){let i=s.offsetLeft,o=i+s.offsetWidth;i<e.scrollLeft?e.scrollLeft=i-8:o>e.scrollLeft+e.clientWidth&&(e.scrollLeft=o-e.clientWidth+8)}let a=this._view().tab;a==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadRooms(),this._loadUsage()),a==="dados"&&this._loadBackups()}this._view().name==="search"&&(this._focusSearch||t.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="suggest"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}firstUpdated(){this._checkHeight()}_checkHeight(){if(this.hasAttribute("vh"))return;let t=this.getBoundingClientRect().height;(t>window.innerHeight+4||t<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(t=>t.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let t=this._todoIds();for(let e of t)this._subs.has(e)||this._subscribe(e);for(let[e,s]of[...this._subs])if(!t.includes(e)){this._unsub(s),this._subs.delete(e),this._polling.delete(e);let a=new Map(this._items);a.delete(e),this._items=a}}_subscribe(t){let e=this.hass.connection.subscribeMessage(s=>this._setItems(t,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:t}).catch(()=>(this._polling.add(t),this._fetchItems(t),null));this._subs.set(t,e)}_unsub(t){Promise.resolve(t).then(e=>typeof e=="function"&&e()).catch(()=>{})}async _fetchItems(t){try{let e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._setItems(t,e&&e.items||[])}catch{this._setItems(t,this._items.get(t)||[])}}_refreshPolled(t){if(!(!t||!this._polling.size))for(let e of this._polling)t.states[e]!==this.hass.states[e]&&this._fetchItems(e)}_setItems(t,e){let s=new Map(this._items);s.set(t,e),this._items=s}_patchItem(t,e,s){let a=this._items.get(t);a&&this._setItems(t,a.map(i=>z(i)===e?{...i,...s}:i))}_computeLists(){let t=this._prefs&&this._prefs.lists||{},e=!this._dueOn(),a=this._todoIds().map(i=>{let o=this.hass.states[i],d=As(this.hass,i);return{id:i,st:o,meta:d}});return a.sort((i,o)=>(i.meta.group||"").localeCompare(o.meta.group||"","pt-BR")||i.meta.name.localeCompare(o.meta.name,"pt-BR")),a.map(({id:i,st:o,meta:d},l)=>{let c=t[i]||{},p=this._items.get(i),u=p?p.filter(T=>!q(T)):null,m=u?u.length:Number(o.state)||0,f=p?p.length-u.length:0,v=rt(c.color)||ws(l),b=o.attributes.supported_features||0,y=w(b,$.DUE_DATE)||w(b,$.DUE_DATETIME),M=!y||c.dates_info===!0,x=M||e,k=u&&!x?u.map(T=>W(T.due)).filter(Boolean):[];return{id:i,name:c.name||d.name,origName:d.name,group:d.group,color:v,colorId:c.color||null,icon:c.icon||le(`${d.name} ${d.group||""} ${i}`),iconPref:c.icon||null,hidden:!!c.hidden,features:b,canDue:y,datesInfo:M,noDue:x,hasDates:!!(p&&p.some(T=>T.due)),unavailable:o.state==="unavailable"||o.state==="unknown",items:p,pending:m,done:f,late:k.filter(T=>T.overdue).length,today:k.filter(T=>!T.overdue&&T.diff===0).length}})}_list(t){return this._L.find(e=>e.id===t)}_visible(){return this._L.filter(t=>!t.hidden)}_app(t,e){let s=this._prefs&&this._prefs.app?this._prefs.app[t]:void 0;return s===void 0?e:s}_accent(){return rt(this._app("accent","vermelho"))||it[0]}async _loadPrefs(){try{let t=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:t.lists||{},app:t.app||{}},this._prefsRemote=!0}catch{this._prefs=D.get(fe,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(t,e){let s={...this._prefs.lists},a={...s[t]||{}};for(let[i,o]of Object.entries(e))o===null||o===""?delete a[i]:a[i]=o;if(Object.keys(a).length?s[t]=a:delete s[t],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let i=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:t,prefs:e});this._prefs={lists:i.lists||{},app:i.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else D.set(fe,this._prefs)}async _saveAppPrefs(t){let e={...this._prefs.app};for(let[s,a]of Object.entries(t))a===null||a===""?delete e[s]:e[s]=a;if(this._prefs={...this._prefs,app:e},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:t});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else D.set(fe,this._prefs)}_setTheme(t){this._theme=t,D.set(Vs,t)}_inHA(){return!!this.route}_view(){let t=(this._path||"").replace(/\/+$/,""),e;return(e=t.match(/^\/lista\/(todo\.[^/]+)$/))?{name:"list",id:decodeURIComponent(e[1])}:t==="/prazos"&&this._dueOn()?{name:"due"}:t==="/sugestoes"&&!this._dueOn()?{name:"suggest"}:t==="/buscar"?{name:"search"}:(e=t.match(/^\/mais(?:\/(repeticoes|integracoes|ia|dados|aparencia|opcoes))?$/))?{name:"more",tab:e[1]==="ia"?"integracoes":e[1]||"listas"}:{name:"home"}}_go(t,e=!1){this._sheet&&this._closeSheet(!0);let s=(history.state&&history.state.rvDepth||0)+(e?0:1);if(this._inHA()){let i=`/${this.panel&&this.panel.url_path||"resolvia"}${t}`;e?history.replaceState({rvDepth:s},"",i):history.pushState({rvDepth:s},"",i),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:e}}))}else e?history.replaceState({rvDepth:s,rvPath:t},""):history.pushState({rvDepth:s,rvPath:t},""),this._path=t;let a=this.renderRoot&&this.renderRoot.querySelector("main");a&&a.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_onSwipeStart(t){this._sw=this._sheet||this._cam?null:ns(t)}_onSwipeEnd(t){let e=ls(t,this._sw);if(this._sw=null,!e||this._sheet)return;let s=this._dueOn(),a=[["home",""],["search","/buscar"],[s?"due":"suggest",s?"/prazos":"/sugestoes"],["more","/mais"]],i=this._view().name;if(i==="list"){if(e>0)return;this._haptic("light"),this._back(),ie(this,"home",e);return}let o=a.findIndex(([l])=>l===i),d=o+e;o<0||d<0||d>=a.length||(this._haptic("light"),this._goTab(a[d][1]),ie(this,a[d][0],e))}_goTab(t){let e=this._view().name;if(t===""){if(e==="home"){let s=this.renderRoot.querySelector("main");s&&s.scrollTo({top:0});return}this._back();return}this._go(t,e!=="home"&&e!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"")}_openSheet(t,e=null){let s=!!this._sheet;if(this._sheet=t,this._form=e,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(t=!1){this._sheet&&(this._stopVoice(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(t?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/mais/integracoes"),this.updateComplete.then(()=>{let t=this.renderRoot.querySelector("#leitura-ia");t&&t.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(t){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(t);history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(t){if(this.env&&this.env.haptic)return this.env.haptic(t);window.dispatchEvent(new CustomEvent("haptic",{detail:t}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(t=>this._rules=t&&t.rules||[],{type:"resolvia/recurring/subscribe"}).then(t=>(this._rulesOk=!0,t)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let t=this._app("repeat_on",void 0);return t===void 0?this._rules.length>0:t===!0}_ruleFor(t,e){return!e||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===t&&s.uid&&s.uid===e.uid)||e.status!=="completed"&&this._rules.find(s=>s.entity_id===t&&!s.uid&&s.match===e.summary)||null}_everyLabel(t){return t===1?"todo dia":t===7?"toda semana":t===14?"a cada 2 semanas":t===30?"todo m\xEAs":`a cada ${t} dias`}_returnLabel(t){let e=new Date(t),s=W(tt(e));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(t,e=Date.now()){let s=new Date(e);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+t).getTime()}_setRule(t,{uid:e,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:t,uid:e||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(t,e=null){clearTimeout(this._toastTimer),this._toast={text:t,action:e,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,e?4500:Math.min(8e3,Math.max(2600,t.length*55)))}async _call(t,e,s){try{return await this.hass.callService("todo",t,e,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",t,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(t,e){if(!w(t.features,$.UPDATE))return;let s=z(e),a=!q(e),i=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(t.id,s,{status:i}),!await this._call("update_item",{item:s,status:i},t.id)){this._patchItem(t.id,s,{status:e.status});return}let d=this._pointsOf(t.id,e.summary,e.uid),l=this._mirrored(t.id,e.uid);if(a){let c=this._ruleFor(t.id,e),p=c?` \xB7 volta ${this._returnLabel(this._reopenAt(c.days))}`:"",u={label:"Desfazer",run:()=>{this._patchItem(t.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},t.id),(d||l)&&this._takePoints(t,e)}};d?this._givePoints(t,e,`Resolvido: ${A(e.summary,18)}`,u):this._showToast(`Resolvido: ${A(e.summary,c?22:30)}${p}${l?" \xB7 volta com a pr\xF3xima data":""}`,u)}else(d||l)&&this._takePoints(t,e)}_quickAdd(t,e){t.preventDefault();let s=t.currentTarget.querySelector("input");this._addLines(e,[s.value],s)}_onQuickPaste(t,e){let s=t.clipboardData&&t.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(t.preventDefault(),this._addLines(e,s.split(/\r?\n/),t.currentTarget))}async _addLines(t,e,s){let a=e.map(o=>o.trim()).filter(Boolean);if(!a.length)return;let i=s.value;s.value="",s.focus(),this._haptic("light");for(let o of a)if(!await this._call("add_item",{item:o},t.id)){s.value=i||o;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(t,e,s,a){let i=t.features;return e?s&&w(i,$.DUE_DATETIME)?{due_datetime:`${e} ${s}:00`}:w(i,$.DUE_DATE)?{due_date:e}:w(i,$.DUE_DATETIME)?{due_datetime:`${e} ${s||"09:00"}:00`}:{}:a?w(i,$.DUE_DATE)?{due_date:null}:w(i,$.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(t,{summary:e,description:s,date:a,time:i}){let o={item:e,...this._dueFields(t,a,i,!1)};return s&&w(t.features,$.DESCRIPTION)&&(o.description=s),this._call("add_item",o,t.id)}_openAdd(t){let e=this._visible().filter(i=>w(i.features,$.CREATE)&&!i.unavailable),s=D.get(Nt,null),a=t&&this._list(t)&&w(this._list(t).features,$.CREATE)&&t||e.find(i=>i.id===s)&&s||e[0]&&e[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1,room:null,equip:null}),this.updateComplete.then(()=>{let i=this.renderRoot.querySelector(".sheet textarea");i&&i.focus()})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(t=!0){let e=this.hass&&this.hass.resolvia;if(!(!e||!e.aiStatus)&&!(!t&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await e.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(t){await this._saveAppPrefs({ai_entity:t||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let t=this._aiInfo();return gs({u:this._usage,day:this._usageDay,onDay:e=>(this._usageDay=e,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","As chamadas do app para a IA. Os tokens s\xE3o estimados."),app:"ResolvIA",using:t.using&&t.using.id||"",names:Object.fromEntries((t.entities||[]).map(e=>[e.id,e.name]))})}_dueOn(){return!this._app("due_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(t){let e=a=>{let i=a&&this._list(a);return i&&w(i.features,$.CREATE)&&!i.unavailable?a:null},s=this._visible().filter(a=>w(a.features,$.CREATE)&&!a.unavailable);return e(t)||e(D.get(Nt,null))||s[0]&&s[0].id||null}_openImport(t,e="pick"){let s=this._importTarget(t);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:e==="text"?"text":e==="voice"?"voice":"pick",rec:e==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),e==="photos"&&this._pickFiles("photos"),e==="scan"&&this._openCamera(),e==="text"&&this._focusImportText(),e==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(t=!1){try{this._voice=await this.hass.resolvia.voiceStatus(t)}catch(e){this._voice={ready:!1,reason:e.message}}this.requestUpdate()}async _chooseVoice(t){await this._saveAppPrefs({voice_engine:t||null}),await this._loadVoice(!0),this._showToast("Fala para texto atualizada")}_renderVoicePanel(){let t=this._voice,e=this._app("voice_engine","")||"",s=t&&t.options||[],a=!t||this._voiceChecking,i=a?"off":t.ready&&!t.missing?"ok":t.ready?"warn":"bad",o=a?"Verificando\u2026":t.ready?"Pronto para ouvir":"Sem fala para texto",d=a?"":t.ready?`Transcreve com ${t.name}.${t.missing?" O escolhido n\xE3o foi encontrado: usando o autom\xE1tico.":""}`:t.reason||"",l=async()=>{this._voiceChecking=!0,this.requestUpdate(),await this._loadVoice(!0),this._voiceChecking=!1,this.requestUpdate()};return n`<div class="panel" id="falar">
      ${this._secHead("mic","Falar","Quem transforma a fala em texto. N\xE3o muda o assistente de voz do Home Assistant.")}
      <div class="ai-state ${i}"><span class="dot"></span><div><b>${o}</b>${d?n`<span>${d}</span>`:h}</div></div>
      ${s.length||e?n`<label class="field" style="margin:14px 0 0">
            <span class="flabel">Fala para texto</span>
            <select class="select" aria-label="Fala para texto" @change=${c=>this._chooseVoice(c.target.value)}>
              <option value="" ?selected=${!e}>Automático${t&&t.auto?`: ${t.auto.name}`:""}</option>
              ${s.map(c=>n`<option value=${c.id} ?selected=${c.id===e}>${c.name}</option>`)}
              ${e&&!s.some(c=>c.id===e)?n`<option value=${e} selected>${e} (não encontrado)</option>`:h}
            </select>
          </label>`:h}
      <div class="ai-actions"><button class="btn outline" ?disabled=${a} @click=${l}>${g("rotate-ccw")}Verificar de novo</button></div>
      ${t&&!t.ready?n`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>Com o Home Assistant Cloud, a fala para texto já vem pronta.</li>
              <li>Sem ele, instale um motor de fala: o app Whisper (local, de graça) com a integração Wyoming, ou a fala para texto de uma IA como Google Gemini ou OpenAI.</li>
              <li>Volte aqui, toque em Verificar de novo e escolha o motor na lista.</li>
            </ol>
          </div>`:h}
    </div>`}_renderMicBtn(t=null){return!this._aiOn()||!this._voice||!this._voice.ready?h:n`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(t,"voice")}>${g("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let t=new Ft(e=>this._voiceLevel=e);this._rec=t;try{await t.start()}catch(e){t.cancel(),this._rec===t&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:Ds(e)});return}if(this._rec!==t||!this._form||this._form.step!=="voice")return t.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==t)return clearInterval(this._recTimer);let e=t.seconds();this._setForm({secs:e,level:this._voiceLevel||0}),e>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let t=this._rec;if(!t)return;clearInterval(this._recTimer),this._rec=null;let e=t.stop();if(e.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(e);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(t){let e=this._form,s=this._voice||{},a=e.rec==="on",i=Math.floor((e.secs||0)/60),o=String(Math.floor((e.secs||0)%60)).padStart(2,"0"),d=this._list(e.target);return n`
      ${t("Falar")}
      <div class="voice ${a?"on":""}">
        <button class="voice-mic" style="--lvl:${a?(e.level||0).toFixed(2):0}" aria-label=${a?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>a?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${g(a?"check":"mic")}
        </button>
        <div class="voice-state">${a?n`<b>Ouvindo…</b> <span class="voice-time">${i}:${o}</span>`:e.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${a?"Toque de novo quando terminar.":n`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${d?n`<p class="voice-hint">Vai para <b>${d.name}</b> (dá para trocar na revisão).</p>`:h}
      </div>
      ${e.error?n`<div class="imp-error">${g("circle-alert")}<span>${e.error}</span></div>`:h}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" ?disabled=${!a} @click=${()=>this._finishVoice()}>${g("sparkles")}Pronto</button>
      </div>
      ${s.ready?h:n`<p class="sheet-note">${s.reason||""}</p>`}
    `}_focusImportText(){this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet textarea");t&&t.focus()})}_pickFiles(t){let e=this.renderRoot.querySelector(t==="scan"?"#rv-scan":"#rv-photos");e&&(e.value="",e.click())}_releaseImages(){let t=this._form;if(t&&t.images)for(let e of t.images)e.url&&URL.revokeObjectURL(e.url)}_camOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(t){let e=[...t.target.files||[]].filter(i=>!i.type||i.type.startsWith("image/")).slice(0,6);if(t.target.value="",!e.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let s=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:s?"review":"pick"});let a=[];for(let i of e)a.push(await he(i));this._readImages(a,s)}_readImages(t,e){if(this._sheet!=="import"||!t.length)return;let s=e?[...this._form.images||[],...t]:(this._releaseImages(),t);this._setForm({step:"loading",images:s,prevStep:e?"review":"pick",loadingText:t.length>1?`Lendo ${t.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:t,appending:e})}async _runExtract({text:t,images:e,appending:s=!1}){let a=this._importToken=Date.now(),i=this._list(this._form.target),o=()=>a===this._importToken&&this._sheet==="import",d=s?this._form.items||[]:[],l=(c,p=[],u=[],m=[])=>{let f=new Set(d.map(y=>y.text.trim().toLowerCase())),v=(y,M)=>M||y&&this._roomsOn()&&(this._equipOf(y)||{}).comodo||null,b=c.map((y,M)=>({text:y,on:!0,list:p[M]||null,room:v(m[M],u[M]),equip:m[M]||null})).filter(y=>!f.has(y.text.trim().toLowerCase()));return[...d,...b]};try{let c=await this.hass.resolvia.extract({text:t,images:e?e.map(({data:u,mime:m})=>({data:u,mime:m})):void 0,list_name:i?i.name:void 0,lists:this._importTargets().map(u=>({id:u.id,name:u.name}))});if(!o())return;let p=c.items||[];if(!p.length){let u=t?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:u}):this._setForm({step:t?"text":"pick",error:u});return}this._haptic("success"),this._setForm({step:"review",items:l(p,c.lists||[],c.rooms||[],c.equips||[]),provider:c.provider||null,note:null,error:null})}catch(c){if(!o())return;if(t){let p=pe(t);if(p.length){this._setForm({step:"review",items:l(p),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:c.message||"Algo deu errado"}):this._setForm({step:t?"text":"pick",error:c.message||"Algo deu errado"})}}async _openCamera(){let t=navigator.mediaDevices,e=!!(this._form&&this._form.step==="review");if(!t||!t.getUserMedia){this._cam={status:"error",shots:[],appending:e,flash:0,error:window.isSecureContext===!1?"A c\xE2mera aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher.":"Este navegador n\xE3o deixa o app usar a c\xE2mera. Escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher."};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}return}this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:e,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let s=await t.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){s.getTracks().forEach(d=>d.stop());return}this._stream=s;let a=s.getVideoTracks()[0],i=a&&a.getCapabilities?a.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!i.torch},await this.updateComplete;let o=this.renderRoot.querySelector(".cam video");o&&(o.srcObject=s,o.play().catch(()=>{}))}catch(s){if(!this._cam)return;let a=s&&(s.name==="NotAllowedError"||s.name==="SecurityError");this._cam={...this._cam,status:"error",error:a?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(t=>t.stop()),this._stream=null}_closeCamera(t=!1){if(!this._cam)return;this._stopStream();let e=this._cam.shots||[];if(!this._cam.used)for(let s of e)URL.revokeObjectURL(s.url);this._cam=null,!t&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let t=this._stream&&this._stream.getVideoTracks()[0];if(!t)return;let e=!this._cam.torch;try{await t.applyConstraints({advanced:[{torch:e}]}),this._cam={...this._cam,torch:e}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let t=this.renderRoot.querySelector(".cam video");if(!t||!t.videoWidth||!this._cam||this._cam.shots.length>=6)return;let e=1800,s=Math.min(1,e/Math.max(t.videoWidth,t.videoHeight)),a=document.createElement("canvas");a.width=Math.round(t.videoWidth*s),a.height=Math.round(t.videoHeight*s),a.getContext("2d").drawImage(t,0,0,a.width,a.height);let i=await new Promise(d=>a.toBlob(d,"image/jpeg",.86));if(!i||!this._cam)return;let o=await he(i,e);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,o],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let t=this._cam.shots,e=this._cam.appending;this._cam={...this._cam,used:!0},this._closeCamera(),this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(t,e&&this._form.step==="review")}_cameraFallback(){let t=this._cam&&this._cam.appending;this._closeCamera(),t&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let t=this._cam;if(!t)return h;let e=t.shots.length;return n`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${t.flash?n`<div class="cam-flash" .key=${t.flash}></div>`:h}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${g("x")}</button>
          <span class="cam-title">Digitalizar com IA</span>
          ${t.torchOk?n`<button class="cam-btn ${t.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${g("zap")}</button>`:n`<span class="cam-btn ghost"></span>`}
        </div>
        ${t.status==="error"?n`<div class="cam-msg">
              ${g("camera")}
              <p>${t.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${g("images")}Escolher foto</button>
            </div>`:n`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${t.status==="starting"?"Abrindo a c\xE2mera\u2026":e?`${_(e,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${t.shots.slice(-3).map(s=>n`<img src=${s.url} alt="" />`)}${e>3?n`<span>+${e-3}</span>`:h}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${t.status!=="live"||e>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!e} @click=${()=>this._useShots()}>Pronto${e?` (${e})`:""}</button>
        </div>
      </div>
    `}_readText(){let t=(this._form.text||"").trim();if(!t){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:t});return}let e=pe(t);e.length?this._setForm({step:"review",items:e.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}_clipOk(){return!!(navigator.clipboard&&navigator.clipboard.readText)&&!this._clipFailed}async _pasteClipboard(){let t="";try{t=await navigator.clipboard.readText()}catch{this._clipFailed=!0,this._focusImportText(),this._showToast("Este aparelho n\xE3o deixa o app ler o que foi copiado. Toque e segure no campo e escolha Colar."),this.requestUpdate();return}if(!t){this._focusImportText(),this._showToast("N\xE3o h\xE1 nada copiado.");return}this._setForm({text:t,error:null})}_setImportItem(t,e){let s=this._form.items.slice();s[t]={...s[t],...e},this._setForm({items:s})}_importTargets(){let t=this._form||{};return this._L.filter(e=>w(e.features,$.CREATE)&&!e.unavailable&&(!e.hidden||e.id===t.target))}_importListOf(t){let e=this._importTargets();return t.list&&e.some(s=>s.id===t.list)&&t.list||this._form.target}async _importAdd(){let t=this._form,e=this._list(t.target),s=t.items.filter(d=>d.on&&d.text.trim()).map(d=>({...d,dest:this._importListOf(d)}));if(!e||!s.length)return;D.set(Nt,e.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0,i=new Set;for(let d of s)if(await this._call("add_item",{item:d.text.trim()},d.dest))a++,i.add(d.dest),d.room&&this._roomsOn()&&await this._setTaskRoom(d.dest,d.text.trim(),d.room),d.equip&&this._equipsOn()&&await this._setTaskEquip(d.dest,d.text.trim(),d.equip);else break;if(!a)return;let o=i.size===1?this._list([...i][0]):null;this._showToast(`${_(a,"item adicionado","itens adicionados")} ${o?`em ${A(o.name,24)}`:`em ${i.size} listas`}`)}_openEdit(t,e){let s=j(e.due),a=this._ruleFor(t.id,e),i=a?a.days:0;this._openSheet("item",{mode:"edit",listId:t.id,key:z(e),target:t.id,summary:e.summary||"",description:xt(e.description),mirrored:this._mirrored(t.id,e.uid),due:e.due||null,date:s?s.date:null,time:s?s.time:null,repeat:i,repeatOrig:i,repeatCustom:!!i&&!Fs.some(o=>o.days===i),points:this._rawPoints(t.id,e.summary),pointsOrig:this._rawPoints(t.id,e.summary),room:this._roomIdOf(t.id,e.summary),roomOrig:this._roomIdOf(t.id,e.summary),equip:this._equipIdOf(t.id,e.summary),equipOrig:this._equipIdOf(t.id,e.summary)}),this._loadPoints()}_setForm(t){this._form={...this._form,...t}}async _saveItem(){let t=this._form,e=(t.summary||"").trim();if(!e){let p=this.renderRoot.querySelector(".sheet textarea");p&&p.focus();return}let s=(t.description||"").trim(),a=this._list(t.target);if(t.mode==="add"){if(!a)return;D.set(Nt,a.id),this._closeSheet(),this._haptic("light");let p=await this._addFull(a,{summary:e,description:s,date:t.date,time:t.time});p&&t.repeat&&await this._setRule(a.id,{summary:e,days:t.repeat}),p&&t.points&&await this._setTaskPoints(a.id,e,t.points),p&&t.room&&await this._setTaskRoom(a.id,e,t.room),p&&t.equip&&await this._setTaskEquip(a.id,e,t.equip),p&&this._view().id!==a.id&&this._showToast(`Adicionado em ${A(a.name,28)}`);return}let i=this._list(t.listId),o=i&&i.items&&i.items.find(p=>z(p)===t.key);if(!i||!o){this._closeSheet();return}if(a&&a.id!==i.id){this._closeSheet(),await this._addFull(a,{summary:e,description:s,date:t.date,time:t.time})&&(t.repeat&&await this._setRule(a.id,{summary:e,days:t.repeat}),t.repeatOrig&&await this._setRule(i.id,{uid:o.uid,summary:o.summary,days:null}),t.points&&await this._setTaskPoints(a.id,e,t.points),t.pointsOrig&&await this._setTaskPoints(i.id,o.summary,0),t.room&&await this._setTaskRoom(a.id,e,t.room),t.roomOrig&&await this._setTaskRoom(i.id,o.summary,null),t.equip&&await this._setTaskEquip(a.id,e,t.equip),t.equipOrig&&await this._setTaskEquip(i.id,o.summary,null),await this._call("remove_item",{item:[t.key]},i.id),this._showToast(`Movido para ${A(a.name,28)}`));return}let d={item:t.key};if(e!==o.summary&&(d.rename=e),w(i.features,$.DESCRIPTION)&&s!==xt(o.description)){let p=Os(o.description);d.description=p?`${s}${s?" ":""}${p}`:s||null}let l=j(o.due);((l?l.date:null)!==(t.date||null)||(l?l.time:null)!==(t.time||null))&&Object.assign(d,this._dueFields(i,t.date,t.time,!0)),this._closeSheet(),((t.points||0)!==(t.pointsOrig||0)||t.pointsOrig&&e!==o.summary)&&await this._setTaskPoints(i.id,e,t.points||0,e!==o.summary?o.summary:null),((t.room||null)!==(t.roomOrig||null)||t.roomOrig&&e!==o.summary)&&await this._setTaskRoom(i.id,e,t.room||null,e!==o.summary?o.summary:null),((t.equip||null)!==(t.equipOrig||null)||t.equipOrig&&e!==o.summary)&&await this._setTaskEquip(i.id,e,t.equip||null,e!==o.summary?o.summary:null),(t.repeat||0)!==(t.repeatOrig||0)&&(await this._setRule(i.id,{uid:o.uid,summary:e,days:t.repeat}),t.repeat&&this._showToast(`Repete ${this._everyLabel(t.repeat)} depois de concluir`)),Object.keys(d).length>1&&(d.rename&&this._patchItem(i.id,t.key,{summary:e}),await this._call("update_item",d,i.id))}async _deleteItem(){let t=this._form,e=this._list(t.listId),s=e&&e.items&&e.items.find(o=>z(o)===t.key);if(this._closeSheet(),!e||!s)return;if(this._setItems(e.id,e.items.filter(o=>z(o)!==t.key)),this._haptic("warning"),!await this._call("remove_item",{item:[t.key]},e.id)){this._setItems(e.id,e.items);return}let i=j(s.due);this._showToast("Item exclu\xEDdo",{label:"Desfazer",run:()=>this._addFull(e,{summary:s.summary,description:s.description,date:i?i.date:null,time:i?i.time:null})})}_confirmClearDone(t){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${_(t.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${t.done===1?"":"s"} de \u201C${t.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},t.id)&&this._showToast("Conclu\xEDdos apagados")}})}_openCustomize(t){this._openSheet("customize",{listId:t.id,name:t.name===t.origName?"":t.name,color:t.colorId,icon:t.iconPref,hidden:t.hidden,deadlines:!t.datesInfo})}async _saveCustomize(){let t=this._form,e=this._list(t.listId);this._closeSheet(),await this._saveListPrefs(t.listId,{name:(t.name||"").trim()||null,color:t.color||null,icon:t.icon||null,hidden:t.hidden?!0:null,dates_info:e&&e.canDue&&!t.deadlines?!0:null})}_dragStart(t,e,s){if(t.pointerType==="mouse"&&t.button!==0)return;t.preventDefault();let a=t.currentTarget,i=a.closest(".item"),d=[...i.parentElement.querySelectorAll(":scope > .item[data-drag]")],l=d.indexOf(i);if(l<0)return;let c=this.renderRoot.querySelector("main"),p=d.map(k=>k.getBoundingClientRect()),u=c.scrollTop,m=p.map(k=>k.top+k.height/2+u),f=p[l].height,v={y:t.clientY,target:l,raf:0,lastY:t.clientY};try{a.setPointerCapture(t.pointerId)}catch{}i.classList.add("dragging"),d.forEach((k,T)=>T!==l&&k.classList.add("shifting")),this._haptic("selection");let b=()=>{let k=v.lastY-v.y+(c.scrollTop-u);i.style.transform=`translateY(${k}px)`;let T=m[l]+k,C=0;for(let st=0;st<d.length;st++)st!==l&&m[st]<T&&C++;C!==v.target&&(v.target=C,this._haptic("selection")),d.forEach((st,lt)=>{if(lt===l)return;let _t=0;l<C&&lt>l&&lt<=C&&(_t=-f),C<l&&lt>=C&&lt<l&&(_t=f),st.style.transform=_t?`translateY(${_t}px)`:""})},y=()=>{let k=c.getBoundingClientRect(),T=70,C=0;v.lastY<k.top+T?C=-Math.ceil((k.top+T-v.lastY)/6):v.lastY>k.bottom-T&&(C=Math.ceil((v.lastY-(k.bottom-T))/6)),C&&(c.scrollTop+=C,b()),v.raf=requestAnimationFrame(y)};v.raf=requestAnimationFrame(y);let M=k=>{v.lastY=k.clientY,b()},x=()=>{cancelAnimationFrame(v.raf),a.removeEventListener("pointermove",M),a.removeEventListener("pointerup",x),a.removeEventListener("pointercancel",x),d.forEach(k=>{k.classList.remove("shifting","dragging"),k.style.transform=""}),v.target!==l&&this._commitMove(e,s,d.map(k=>k.dataset.key),l,v.target)};a.addEventListener("pointermove",M),a.addEventListener("pointerup",x),a.addEventListener("pointercancel",x)}async _commitMove(t,e,s,a,i){let o=s.slice(),[d]=o.splice(a,1);o.splice(i,0,d);let l=i===0?void 0:o[i-1],c=t.items.slice(),p=c.findIndex(v=>z(v)===d),[u]=c.splice(p,1),m=l?c.findIndex(v=>z(v)===l):-1;c.splice(m+1,0,u),this._setItems(t.id,c);let f={type:"todo/item/move",entity_id:t.id,uid:d};l&&(f.previous_uid=l);try{await this.hass.callWS(f)}catch{this._setItems(t.id,t.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return h;let t=this._dark,e=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,i=a?a.color:e,o=`--rv-accent:${i.fill};--rv-accent-ink:${t?i.fill:i.ink};--rv-accent-soft:${qt(i.fill,t?.18:.14)};--rv-accent-ink-light:${i.ink};`,d;return s.name==="list"?d=this._renderList(s.id):s.name==="due"?d=this._renderDue():s.name==="suggest"?d=this._renderSuggest():s.name==="search"?d=this._renderSearch():s.name==="more"?d=this._renderMore():d=this._renderHome(),n`
      <div class="root" style=${o}>
        <div class="app">
          ${!this.env||this.env.topbar?n`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${g("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:h}
          ${this.hass.connected===!1?n`<div class="offline">${g("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:h}
          ${this._renderSide(s)}
          <main @touchstart=${l=>this._onSwipeStart(l)} @touchend=${l=>this._onSwipeEnd(l)}>${d}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()?n`<input id="rv-photos" class="sr" type="file" accept="image/*" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${l=>this._onFiles(l)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${l=>this._onFiles(l)} />`:h}
      </div>
    `}_renderNav(t){let e=this._visible().reduce((a,i)=>a+i.late+i.today,0),s=(a,i,o,d,l=0)=>n`
      <button class="tab ${t.name===a||a==="home"&&t.name==="list"?"on":""}" @click=${()=>this._goTab(i)} aria-label=${o}>
        ${g(d)}<span>${o}</span>
        ${l?n`<span class="badge">${l>99?"99+":l}</span>`:h}
      </button>
    `;return n`
      <nav>
        <div class="tabs">
          ${s("home","","Listas","list-checks")} ${s("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(t.name==="list"?t.id:null)} aria-label="Adicionar item">
            <span class="pill">${g("plus")}</span><span>Adicionar</span>
          </button>
          ${this._dueOn()?s("due","/prazos","Prazos","calendar-clock",e):s("suggest","/sugestoes","Sugest\xF5es","lightbulb")}
          ${s("more","/mais","Mais","sliders-horizontal")}
        </div>
      </nav>
    `}_renderSide(t){let e=this._byPending(this._visible()),s=e.reduce((i,o)=>i+o.late+o.today,0),a=(i,o,d,l,c=0,p="")=>n`<button class="side-link" aria-current=${t.name===i?"page":"false"} @click=${()=>this._goTab(o)}>
      ${g(l)}<span>${d}</span>${c?n`<span class="side-badge">${c>99?"99+":c}</span>`:h}${p?n`<kbd>${p}</kbd>`:h}
    </button>`;return n`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${ae()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${a("home","","Listas","list-checks")} ${a("search","/buscar","Buscar","search",0,"/")}
        ${this._dueOn()?a("due","/prazos","Prazos","calendar-clock",s):a("suggest","/sugestoes","Sugest\xF5es","lightbulb")}
        ${a("more","/mais","Mais","sliders-horizontal")}
      </div>
      ${e.length?n`<div class="side-h"><span>Listas</span><small>${e.length}</small></div>
            <div class="side-lists">
              ${e.map(i=>n`<button class="side-list" aria-current=${t.name==="list"&&t.id===i.id?"page":"false"} style=${I(i.color,this._dark)} @click=${()=>this._go(`/lista/${i.id}`)}>
                  <span class="side-tile">${g(i.icon)}</span><span class="sl-name">${i.name}</span><span class="sl-num">${i.pending||""}</span>
                </button>`)}
            </div>`:h}
      <div class="side-foot">ResolvIA ${me}</div>
    </aside>`}_renderTopActs(){return n`<div class="top-acts">
      ${this._renderMicBtn()}
      ${this._canImport()?n`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${g("scan-text")}Ler com IA</button>`:h}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${g("plus")}Adicionar item</button>
    </div>`}_renderPageHead(t,e){let s=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],i=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:e;return n`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${ae()}Resolv<span>IA</span></span>${s?n`<span class="sep"> · </span>Olá, ${s}`:""}</p>${this._renderMicBtn()}${this._renderTopActs()}</div>
      <h1 class="page-title">${t}</h1>
      ${i?n`<p class="status"><span class="dot ${i.tone||""}" aria-hidden="true"></span><span>${i.text}</span></p>`:h}
    </header>`}_byPending(t){return[...t].sort((e,s)=>s.pending-e.pending)}_renderHome(){let t=this._byPending(this._visible()),e=t.reduce((c,p)=>c+p.pending,0),s=t.reduce((c,p)=>c+p.late,0),a=t.reduce((c,p)=>c+p.today,0),i=t.filter(c=>c.pending>0).length,o=[];e&&o.push(`em ${_(i,"lista","listas")}`),a&&o.push(`${a} pra hoje`),s&&o.push(`${_(s,"atrasado","atrasados")}`);let d=this._app("group_by_device",!0),l=[];if(d){for(let p of t){let u=p.group||"",m=l.find(f=>f.name===u);m||l.push(m={name:u,lists:[]}),m.lists.push(p)}let c=p=>p.lists.reduce((u,m)=>u+m.pending,0);l.sort((p,u)=>c(u)-c(p)||(p.name?1:0)-(u.name?1:0))}else l.push({name:null,lists:t});return n`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${_(t.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>n`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${Ts(this.hass.user&&this.hass.user.name)}</div>
            ${e?n`<div class="hero-big">${e}<small>${e===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${o.join(" \xB7 ")}</div>`:n`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>
        ${this._L.length?this._renderHomeFacts(t):h}
        </div>

        ${this._L.length?this._renderHomeSearch():h}

        ${this._L.length===0?n`<div class="panel">
              <div class="empty">
                <div class="em-icon">${g("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:n`
              <div class="groups ${l.length>1?"two":""}">
              ${l.map(c=>{let p=d?c.name||(l.length>1?"Listas locais":"Listas"):"Listas",u=d&&(c.name||l.length>1);return n`
                  <div class="panel grp">
                    <div class="grp-head ${u?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${g(c.name?"layout-list":"list-checks")}</span><h2 class="overline">${p}</h2><small>${c.lists.length}</small></div>
                    ${c.lists.map(m=>this._renderListCard(m,!d))}
                  </div>
                `})}
              </div>
            `}
        ${this.hass.user&&this.hass.user.is_admin?n`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${g("list-plus")}<span>Nova lista</span>
            </button>`:h}
      </section>
    `}_renderHomeSearch(){let t=this._visible().reduce((e,s)=>e+(s.items&&s.items.length||0),0);return n`<form class="search-box home-search" role="search" @submit=${e=>{e.preventDefault(),this._query=e.target.q.value.trim(),this._toSearch()}}>
      ${g("search")}
      <input type="search" name="q" placeholder=${t?`Buscar entre ${_(t,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${e=>{e.target.value.trim()&&(this._query=e.target.value,e.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(t,e){let s=t.pending+t.done,a=s?Math.round(t.done/s*100):0,i=[];return t.unavailable?i.push(n`<span>Indisponível</span>`):t.items?(i.push(n`<span>${t.pending?_(t.pending,"pendente","pendentes"):"Tudo resolvido"}${t.done?` \xB7 ${t.done} ${t.done===1?"feito":"feitos"}`:""}</span>`),t.late?i.push(n`<span class="tag late">${g("circle-alert")}${t.late}</span>`):t.today&&i.push(n`<span class="tag today">${g("clock")}${t.today} hoje</span>`)):i.push(n`<span>Carregando…</span>`),n`
      <button class="list-card ${t.unavailable?"off":""}" style=${I(t.color,this._dark)} @click=${()=>this._go(`/lista/${t.id}`)}>
        <span class="tile">${g(t.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${t.name}</span>
          <span class="lc-meta">${e&&t.group?n`<span>${t.group} ·</span>`:h}${i}</span>
          ${s?n`<span class="bar"><i style="width:${a}%"></i></span>`:h}
        </span>
        <span class="lc-num ${t.pending?"":"zero"}">${t.pending||g("circle-check")}</span>
      </button>
    `}_renderList(t){let e=this._list(t);if(!e)return n`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${g("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>Voltar para o início</button>
      </section>`;let s=w(e.features,$.CREATE)&&!e.unavailable,a=w(e.features,$.UPDATE),i=w(e.features,$.MOVE),o=w(e.features,$.DELETE),d=e.items,l=d?d.filter(m=>!q(m)||this._recent.has(z(m))):[],c=d?d.filter(m=>q(m)&&!this._recent.has(z(m))):[],p=d?d.length:0,u=this._doneOpen[t]!==void 0?this._doneOpen[t]:this._app("show_done",!1);return n`
      <section class="page" style=${I(e.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${g("chevron-left")}</button>
          <div class="dh-text">
            ${e.group?n`<div class="overline">${e.group}</div>`:h}
            <h1 class="display">${e.name}</h1>
          </div>
          ${this._renderMicBtn(e.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:e.id})} aria-label="Opções da lista">${g("ellipsis")}</button>
        </div>

        ${p?n`<div class="progress">
              <span>${e.done} de ${p} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(e.done/p*100)}%"></i></span>
            </div>`:h}
        ${s?n`<div class="quick">
              <form @submit=${m=>this._quickAdd(m,e)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${m=>this._onQuickPaste(m,e)} />
                ${this._canImport()?n`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(e.id)}>${g("scan-text")}</button>`:h}
                <button class="add-btn" type="submit" aria-label="Adicionar">${g("plus")}</button>
              </form>
            </div>`:h}
        ${e.unavailable?n`<div class="panel"><div class="empty"><div class="em-icon">${g("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:d?l.length?n`<div class="panel items">
                  ${R(l,z,m=>this._renderItem(e,m,{draggable:i&&a&&!q(m)}))}
                </div>`:n`<div class="panel">
                  <div class="empty">
                    ${p?n`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:n`<div class="em-icon">${g(e.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:n`<div class="panel">${[70,52,84].map(m=>n`<div class="skeleton" style="width:${m}%"></div>`)}</div>`}
        ${c.length?n`
              <div class="done-head">
                <button class="done-toggle ${u?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[t]:!u}} aria-expanded=${u?"true":"false"}>
                  Concluídos <span class="count">· ${c.length}</span>${g("chevron-down")}
                </button>
                ${o?n`<button class="text-btn" @click=${()=>this._confirmClearDone(e)}>Limpar</button>`:h}
              </div>
              ${u?n`<div class="panel items">${R(c,z,m=>this._renderItem(e,m))}</div>`:h}
            `:h}
        ${!a&&d&&d.length?n`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:h}
      </section>
    `}_renderText(t,e){return Is(t).map(s=>s.url?n`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${g(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,e))}_highlight(t,e){if(!e)return t;let s=ys(t),a=ot(e);if(!a)return t;let i=[],o=0,d;for(;(d=s.indexOf(a,o))!==-1;)d>o&&i.push(t.slice(o,d)),i.push(n`<mark>${t.slice(d,d+a.length)}</mark>`),o=d+a.length;return o<t.length&&i.push(t.slice(o)),i}_renderItem(t,e,s={}){let a=q(e),i=!a&&W(e.due),o=w(t.features,$.UPDATE),d=this._ruleFor(t.id,e),l=d?a&&d.reopen_at?n`<span class="tag rep">${g("repeat")}volta ${this._returnLabel(d.reopen_at)}</span>`:n`<span class="tag rep">${g("repeat")}${this._everyLabel(d.days)}</span>`:h;return n`
      <div class="item ${a?"done":""}" data-key=${z(e)} ?data-drag=${s.draggable} style=${s.showList?I(t.color,this._dark):""}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!o} @click=${()=>this._toggle(t,e)}>
          ${g("check")}
        </button>
        <div class="it-body" @click=${()=>o&&this._openEdit(t,e)}>
          <div class="it-text">${this._renderText(e.summary||"",s.query)}</div>
          ${xt(e.description)?n`<div class="it-desc">${this._renderText(xt(e.description),s.query)}</div>`:h}
          ${s.why?n`<div class="it-why">${g(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:h}
          ${i||s.showList||d||this._pointsOf(t.id,e.summary,e.uid)||this._roomIdOf(t.id,e.summary)||this._equipIdOf(t.id,e.summary)?n`<div class="chips">
                ${s.showList?n`<span class="tag list">${g(t.icon)}${A(t.name,24)}</span>`:h}
                ${this._renderRoomTag(t.id,e)} ${this._renderEquipTag(t.id,e)}
                ${i?t.noDue?n`<span class="tag info" title=${t.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${g("clock-fading")}${i.text}</span>`:n`<span class="tag ${i.tone==="late"?"late":i.tone==="today"?"today":""}">${g(i.time?"clock":"calendar")}${i.text}</span>`:h}
                ${l} ${this._renderPointsTag(t.id,e)}
              </div>`:h}
        </div>
        ${s.draggable?n`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${c=>this._dragStart(c,t,e)} @click=${c=>c.preventDefault()}>${g("grip-vertical")}</button>`:h}
      </div>
    `}_dueRows(t=this._visible()){let e=[];for(let s of t)if(!s.noDue)for(let a of s.items||[]){if(q(a)&&!this._recent.has(z(a)))continue;let i=W(a.due);i&&e.push({l:s,i:a,d:i})}return e.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(t){let e=this._dueOn()?this._dueRows(t):[],s=e.filter(p=>p.d.overdue),a=e.filter(p=>!p.d.overdue&&p.d.diff===0),i=e.find(p=>!p.d.overdue&&p.d.diff>0),o=[...t].filter(p=>p.pending>0).sort((p,u)=>u.pending-p.pending)[0],d=t.reduce((p,u)=>p+u.done,0),l=[],c=(p,u,m,f,v,b)=>l.push({ic:p,tone:u,label:m,value:f,right:v,go:b});return this._dueOn()&&(c("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._go("/prazos"):null),c("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._go("/prazos"):null),c("calendar-clock","","Pr\xF3ximo prazo",i?i.i.summary:"Sem prazos marcados",i?i.d.text:"",i?()=>this._go(`/lista/${i.l.id}`):null)),c("list-checks","","Mais cheia",o?o.name:"Tudo resolvido",o?_(o.pending,"pendente","pendentes"):"",o?()=>this._go(`/lista/${o.id}`):null),this._dueOn()||c("circle-check","","Resolvidos",_(d,"item feito","itens feitos"),"",null),n`<dl class="facts">
      ${l.map(p=>n`<div class="fact-row ${p.go?"go":""}" role=${p.go?"link":"group"} tabindex=${p.go?"0":"-1"} @click=${p.go||(()=>{})} @keydown=${u=>p.go&&u.key==="Enter"&&p.go()}>
          <dt><span class="sec-ic ${p.tone}" aria-hidden="true">${g(p.ic)}</span>${p.label}</dt>
          <dd>${p.value}</dd>
          <dd class="fv ${p.tone}">${p.right}</dd>
        </div>`)}
    </dl>`}_renderDue(){let t=this._visible(),e=t.some(c=>w(c.features,$.DUE_DATE)||w(c.features,$.DUE_DATETIME)),s=this._dueRows(t),a=[{title:"Atrasados",test:c=>c.overdue},{title:"Hoje",test:c=>c.diff===0},{title:"Amanh\xE3",test:c=>c.diff===1},{title:"Pr\xF3ximos 7 dias",test:c=>c.diff>1&&c.diff<7},{title:"Mais adiante",test:()=>!0}],i=new Set,o=a.map(c=>{let p=s.filter(u=>!i.has(u)&&c.test(u.d));return p.forEach(u=>i.add(u)),{...c,rows:p}}).filter(c=>c.rows.length),d=(this._repeatOn()?this._rules:[]).filter(c=>c.reopen_at).map(c=>{let p=this._list(c.entity_id),u=p&&p.items&&c.uid?p.items.find(m=>m.uid===c.uid):null;return{r:c,l:p,item:u}}).filter(c=>c.l&&!c.l.hidden).sort((c,p)=>c.r.reopen_at-p.r.reopen_at),l=d.length?n`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${d.length}</div>
          ${R(d,c=>c.r.id,c=>c.item?this._renderItem(c.l,c.item,{showList:!0}):n`<div class="item done" style=${I(c.l.color,this._dark)}>
                    <span class="check on">${g("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${c.l.id}`)}>
                      <div class="it-text">${c.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${g(c.l.icon)}${A(c.l.name,24)}</span>
                        <span class="tag rep">${g("repeat")}volta ${this._returnLabel(c.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:h;return n`
      <section class="page">
        ${this._renderPageHead("Prazos",(()=>{let c=s.filter(m=>m.d.overdue).length,p=s.filter(m=>!m.d.overdue&&m.d.diff===0).length,u=[];return c&&u.push(_(c,"atrasado","atrasados")),p&&u.push(`${p} para hoje`),d.length&&u.push(`${d.length} ${d.length===1?"volta":"voltam"} sozinha${d.length===1?"":"s"}`),{text:u.length?u.join(" \xB7 "):"Nada atrasado",tone:c?"late":""}})())}
        ${o.length||d.length?[o.map(c=>n`
                <div class="panel items">
                  <div class="overline" style=${c.title==="Atrasados"?"color:var(--rv-late)":""}>${c.title} · ${c.rows.length}</div>
                  ${R(c.rows,p=>p.l.id+z(p.i),p=>this._renderItem(p.l,p.i,{showList:!0}))}
                </div>
              `),l]:n`<div class="panel">
              <div class="empty">
                <div class="em-icon">${g("calendar-days")}</div>
                ${e?n`<h3>Nada com prazo</h3>
                      <p>Quando um item tiver data, ele aparece aqui. Toque num item para definir um prazo.</p>`:n`<h3>Sem prazos por aqui</h3>
                      <p>Suas listas atuais não aceitam datas. Listas locais (“Lista de tarefas local”), Google Tasks e CalDAV aceitam.</p>`}
              </div>
            </div>`}
      </section>
    `}_renderSearch(){let t=this._query.trim(),e=ot(t),s=[],a=0;if(e)for(let i of this._visible()){let o=(i.items||[]).filter(d=>(this._searchDone||!q(d))&&(ot(d.summary).includes(e)||ot(d.description).includes(e)));o.length&&(o.sort((d,l)=>Number(q(d))-Number(q(l))),s.push({l:i,hits:o}),a+=o.length)}return n`
      <section class="page">
        ${this._renderPageHead("Buscar",{text:`Em ${_(this._visible().length,"lista","listas")}`})}
        <label class="search-box">
          ${g("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${i=>this._query=i.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?n`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${g("x")}</button>`:h}
        </label>
        <div class="filters">
          <button class="pick ${this._searchDone?"on":""}" @click=${()=>this._searchDone=!this._searchDone}>${g("circle-check")}<span>Incluir concluídos</span></button>
        </div>
        ${e?s.length?n`<p class="page-sub" style="margin-top:0">${_(a,"resultado","resultados")}</p>
                ${s.map(({l:i,hits:o})=>n`
                    <div class="panel items" style=${I(i.color,this._dark)}>
                      <div class="overline">${i.name}${i.group?` \xB7 ${i.group}`:""}</div>
                      ${R(o,z,d=>this._renderItem(i,d,{query:t}))}
                    </div>
                  `)}`:n`<div class="panel"><div class="empty"><div class="em-icon">${g("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${A(t,30)}”.</p></div></div>`:n`<p class="page-sub" style="margin-top:0">Procure por qualquer palavra, em todas as listas.</p>`}
      </section>
    `}_moreTabs(){return[["listas","Listas","list-checks"],...this._rulesOk?[["repeticoes","Repeti\xE7\xF5es","repeat"]]:[],...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks"]]:[],...this._data()?[["dados","Dados","archive"]]:[],["aparencia","Apar\xEAncia","palette"],["opcoes","Op\xE7\xF5es","toggle-right"]]}_secHead(t,e,s=null){return n`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${g(t)}</span><h2>${e}</h2></div>${s?n`<p class="panel-lead">${s}</p>`:h}`}_renderMore(){let t=this._moreTabs(),e=this._view().tab,s=t.some(d=>d[0]===e)?e:"listas",a=d=>{d!==s&&(this._haptic("light"),this._go(d==="listas"?"/mais":`/mais/${d}`,!0))},i,o={text:`ResolvIA ${me}${this._prefsRemote?" \xB7 personaliza\xE7\xF5es sincronizadas":""}`};if(s==="repeticoes")i=this._renderRulesTab();else if(s==="integracoes")i=n`${this._renderRewardsPanel()} ${this._renderRoomsPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this.hass.resolvia.voiceStatus&&this._aiOn()?this._renderVoicePanel():h} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():h} ${this._renderSensorsPanel()}`;else if(s==="dados")i=this._renderDataPanel();else if(s==="aparencia")i=this._renderAppearanceTab();else if(s==="opcoes")i=this._renderOptionsTab();else{i=this._renderListsTab();let d=this._L.filter(l=>l.hidden).length;o={text:this._L.length?`${_(this._L.length,"lista","listas")}${d?` \xB7 ${_(d,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}return n`
      <section class="page">
        ${this._renderPageHead("Mais",o)}
        <div class="seg compact more-tabs" role="tablist" aria-label="Seções">
          ${t.map(([d,l,c])=>n`<button class=${s===d?"on":""} role="tab" aria-selected=${s===d?"true":"false"} @click=${()=>a(d)}>${g(c)}<span>${l}</span></button>`)}
        </div>
        <div role="tabpanel" aria-label=${t.find(d=>d[0]===s)[1]}>${i}</div>
        <p class="foot"><b>ResolvIA</b><br />v${me} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>
      </section>
    `}_renderListsTab(){let t=(a,i,o)=>n`<label class="switch"><input type="checkbox" role="switch" .checked=${a} @change=${o} aria-label=${i} /><span class="track"></span></label>`,e=this._L.filter(a=>a.hidden),s=a=>n`
      <div class="row ${a.hidden?"inact":""}" style=${I(a.color,this._dark)}>
        <button class="tile" @click=${()=>this._openCustomize(a)} aria-label="Personalizar ${a.name}">${g(a.icon)}</button>
        <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(a)}>
          <div class="label">${a.name}</div>
          <div class="hint">${a.group||a.id}</div>
        </button>
        ${t(!a.hidden,`Mostrar ${a.name}`,i=>this._saveListPrefs(a.id,{hidden:i.target.checked?null:!0}))}
      </div>
    `;return n`
        <div class="panel">
          ${this._secHead("list-checks","Listas","Toque numa lista para personalizar.")}
          ${this._L.length?R(this._L.filter(a=>!a.hidden),a=>a.id,s):n`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
          ${e.length?n`<button class="row inact-head ${this._inactOpen?"open":""}" aria-expanded=${this._inactOpen?"true":"false"} @click=${()=>(this._inactOpen=!this._inactOpen,this.requestUpdate())}>
                  <span class="tile muted">${g("eye-off")}</span>
                  <span class="grow"><div class="label">Inativas <span class="count">${e.length}</span></div></span>
                  ${g("chevron-down","chev")}
                </button>
                ${this._inactOpen?R(e,a=>a.id,s):h}`:h}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?n`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${I(this._accent(),this._dark)}>${g("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${g("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${I(it[9],this._dark)}>${g("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${g("chevron-right")}
              </button>
            </div>`:h}

    `}_renderRulesTab(){let t=this._repeatOn();return n`<div class="panel">
              ${this._secHead("repeat","Repeti\xE7\xE3o autom\xE1tica")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${t?"O item volta sozinho N dias depois de feito.":"Desligado."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${e=>this._toggleRepeat(e)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!t&&!this._rules.length?h:n`<div class="panel ${t?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!t&&this._rules.length?n`<p class="panel-lead">Não voltam mais sozinhas. Exclua para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${g("trash")}Excluir ${_(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:h}
              ${this._rules.length?this._rules.map(e=>{let s=this._list(e.entity_id);return s?n`<div class="row" style=${I(s.color,this._dark)}>
                      <span class="tile">${g("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${e.summary||e.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(e.days)}${t?e.reopen_at?` \xB7 volta ${this._returnLabel(e.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(e.entity_id,{uid:e.uid,summary:e.match||e.summary,days:null})}>${g("x")}</button>
                    </div>`:h}):n`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir”.</div></div>`}
            </div>`}`}_toggleRepeat(t){let e=t.target.checked;if(e||!this._rules.length)return this._saveAppPrefs({repeat_on:e});t.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(t){let e=this._rules.length;this._openSheet("confirm",{title:t?"Desligar a repeti\xE7\xE3o?":"Excluir as repeti\xE7\xF5es?",text:`${_(e,"tarefa se repete","tarefas se repetem")}. ${t?"Ao desligar, essas repeti\xE7\xF5es s\xE3o exclu\xEDdas":"Elas ser\xE3o exclu\xEDdas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:t?"Excluir e desligar":`Excluir ${_(e,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),t&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${_(e,"repeti\xE7\xE3o exclu\xEDda","repeti\xE7\xF5es exclu\xEDdas")}${t?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let t=(s,a,i)=>n`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${i} aria-label=${a} /><span class="track"></span></label>`,e=this._dueOn();return n`
        <div class="panel">
          ${this._secHead("calendar-clock","Prazos")}
          <div class="row">
            <div class="grow"><div class="label">Controlar prazos</div><div class="hint" style="white-space:normal">${e?"O que vence fica vermelho e entra em Prazos.":"A aba Prazos vira Sugest\xF5es."}</div></div>
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
    `}_renderAppearanceTab(){let t=this._app("accent","vermelho");return n`
        <div class="panel">
          ${this._secHead("contrast","Tema","Cada aparelho guarda a sua escolha.")}
          ${xs({theme:this._theme,onTheme:e=>this._setTheme(e),icon:g})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Vale para todos os aparelhos.")}
          ${bs({palette:it,value:t,onPick:e=>this._saveAppPrefs({accent:e==="vermelho"?null:e})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return h;let t=this._app("sensors_on",!1)===!0;return n`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">Criar sensores</div><div class="hint" style="white-space:normal">${t?"Ligado.":"Desligado: nenhum sensor no Home Assistant."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${e=>this._saveAppPrefs({sensors_on:e.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${t?n`<div class="sensor-list"><div class="sensor-row"><code>sensor.resolvia_ia_hoje</code><span>chamadas de IA hoje, com erros, cota e tokens estimados</span></div></div>`:h}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return h;let t=this._aiOn(),e=n`<div class="row switch-row">
        <div class="grow"><div class="label">Usar IA</div><div class="hint" style="white-space:normal">${t?"Ligado.":"Desligado: sem leitura por IA, sem Falar."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${c=>this._saveAppPrefs({ai_off:c.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!t)return n`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens, prints e fotos.")}
        ${e}
      </div>`;let s=this._aiInfo(),a=s.entities||[],i=this._app("ai_entity",""),o=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",d=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",l="";return s.ready&&s.using&&(l=`Usando ${s.using.name}${i?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(l+=` Para fotos, ${s.photos.name}.`)),s.reason&&(l=`${l} ${s.reason}`.trim()),n`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens, prints e fotos, com a IA do Home Assistant.")}
      ${e}
      <div class="ai-state ${o}"><span class="dot"></span><div><b>${d}</b>${l?n`<span>${l}</span>`:h}</div></div>
      ${a.length||i?n`<label class="field" style="margin:14px 0 0">
            <span class="flabel">IA usada pelo app</span>
            <select class="select" aria-label="IA usada pelo app" @change=${c=>this._chooseAi(c.target.value)}>
              <option value="" ?selected=${!i}>Padrão do Home Assistant</option>
              ${a.map(c=>n`<option value=${c.id} ?selected=${c.id===i}>${c.name}${c.images?"":" (s\xF3 texto)"}${c.available?"":" (indispon\xEDvel)"}</option>`)}
              ${i&&!a.some(c=>c.id===i)?n`<option value=${i} selected>${i} (não encontrada)</option>`:h}
            </select>
          </label>`:h}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${()=>this._refreshAi()}>${g("rotate-ccw")}Verificar de novo</button></div>
      ${s.ready&&s.images?h:n`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
    </div>`}_renderSheet(){if(!this._sheet)return h;let t=h;return this._sheet==="item"?t=this._renderItemSheet():this._sheet==="listmenu"?t=this._renderListMenu():this._sheet==="customize"?t=this._renderCustomize():this._sheet==="confirm"?t=this._renderConfirm():this._sheet==="import"?t=this._renderImportSheet():this._sheet==="versions"?t=this._renderVersions():this._sheet==="who"&&(t=this._renderWhoSheet()),n`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${e=>e.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${t}
      </div>
    `}_sheetStyle(){let t=this._form||{},e=this._list(t.target||t.listId),s=this._sheet==="customize"&&rt(t.color)||e&&e.color;return s?`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${qt(s.fill,this._dark?.18:.14)};${I(s,this._dark)}`:""}_renderMirroredSheet(t){let e=this._form,s=e.mirrored,a=W(e.due),i=w(t.features,$.DELETE);return n`
      <div class="sheet-head">
        <h3 class="display">${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <div class="ro-item">
        <b>${e.summary}</b>
        <div class="ro-tags">
          ${a?n`<span class="tag ${t.noDue?"info":a.tone}">${g("calendar")}${a.text}</span>`:h}
          ${s.pontos?n`<span class="tag pts">${g("trophy")}+${s.pontos}</span>`:h}
          <span class="tag">${A(t.name,24)}</span>
        </div>
        ${e.description?n`<p>${e.description}</p>`:h}
      </div>
      <p class="sheet-note with-icon">${g("calendar-clock")}<span>Vem do CronologIA: concluir aqui marca como feito lá${s.pontos?` (${s.pontos} pontos)`:""}. Para editar, use o CronologIA.</span></p>
      <div class="sheet-actions">
        ${i?n`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${g("trash")}</button>`:h}
        <button class="btn primary" @click=${()=>this._closeSheet()}>Fechar</button>
      </div>
    `}_renderItemSheet(){let t=this._form,e=this._list(t.listId),s=this._list(t.target)||e;if(!e||!s)return h;if(t.mirrored&&t.mode==="edit")return this._renderMirroredSheet(e);let a=s.features,i=w(a,$.DESCRIPTION),o=this._dueOn()&&(w(a,$.DUE_DATE)||w(a,$.DUE_DATETIME)),d=w(a,$.DUE_DATETIME),l=t.mode==="edit"&&w(e.features,$.DELETE),c=Ss(),p=c.some(f=>f.date===t.date),u=t.mode==="add"?this._L.filter(f=>w(f.features,$.CREATE)&&!f.unavailable&&(!f.hidden||f.id===t.target)):w(e.features,$.DELETE)?this._L.filter(f=>w(f.features,$.CREATE)&&!f.unavailable&&(!f.hidden||f.id===e.id)):[],m=f=>{let v=this.renderRoot.querySelector(f);if(v)try{v.showPicker()}catch{v.focus(),v.click()}};return n`
      <div class="sheet-head">
        <h3 class="display">${t.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${t.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(t.target,"text"),photos:()=>this._openImport(t.target,"photos"),scan:()=>this._openImport(t.target,"scan")}):h}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${t.summary} @input=${f=>this._setForm({summary:f.target.value})} @keydown=${f=>f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${i?n`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${t.description} @input=${f=>this._setForm({description:f.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:h}
      ${o?n`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row grid">
              ${c.map(f=>n`<button class="pick ${t.date===f.date?"on":""}" @click=${()=>this._setForm({date:t.date===f.date?null:f.date})}>${f.label}</button>`)}
              <button class="pick ${t.date&&!p?"on":""}" @click=${()=>m("#rv-date")}>
                ${g("calendar")}<span>${t.date&&!p?de(t.date):"Outra data"}</span>
                <input id="rv-date" class="hidden-input" type="date" tabindex="-1" .value=${t.date||""} @change=${f=>this._setForm({date:f.target.value||null})} />
              </button>
              ${t.date?n`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null})}>${g("x")}<span>Sem prazo</span></button>`:h}
            </div>
            ${d&&t.date?n`<div class="time-row">
                  <span class="tl">Horário</span>
                  <input type="time" .value=${t.time||""} @change=${f=>this._setForm({time:f.target.value||null})} />
                  ${t.time?n`<button class="text-btn" @click=${()=>this._setForm({time:null})}>Dia todo</button>`:h}
                </div>`:h}
          </div>`:h}
      ${this._rulesOk&&this._repeatOn()&&!t.mirrored&&(w(a,$.UPDATE)||w(a,$.CREATE))?n`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${t.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>Não</button>
              ${Fs.map(f=>n`<button class="pick ${t.repeat===f.days&&!t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:f.days,repeatCustom:!1})}>${f.label}</button>`)}
              <button class="pick ${t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:t.repeat||4})}>${g("repeat")}<span>Outro</span></button>
            </div>
            ${t.repeatCustom?n`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(t.repeat||"")} @input=${f=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(f.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:h}
            ${t.repeat?n`<div class="field-hint">${g("repeat")}<span>Volta sozinha ${t.repeat===1?"no dia seguinte":`em ${t.repeat} dias`} depois de concluída.</span></div>`:h}
          </div>`:h}
      ${this._renderRoomField(t)}
      ${this._renderEquipField(t)}
      ${this._renderPointsField(t)}
      ${u.length>1?n`<div class="field">
            <span class="flabel">${t.mode==="add"?"Lista":"Lista (mover)"}</span>
            <div class="chip-row grid">
              ${u.map(f=>n`<button class="pick list ${t.target===f.id?"on":""}" style=${I(f.color,this._dark)} @click=${()=>this._setForm({target:f.id})}><span class="dot"></span><span>${A(f.name,26)}</span></button>`)}
            </div>
          </div>`:h}
      <div class="sheet-actions">
        ${l?n`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${g("trash")}</button>`:h}
        <button class="btn primary" @click=${()=>this._saveItem()}>${t.mode==="add"?"Adicionar":t.target!==t.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(t,{label:e=!0}={}){let s=this._aiInfo(),a=this._isHaAndroid(),i=this._camOk(),o=(d,l,c,p=!1,u="")=>n`<button type="button" class="imp-tile ${u?"no-cam":""}" ?disabled=${p} @click=${t[d]}>${g(l)}<span>${c}</span>${u?n`<small>${u}</small>`:h}</button>`;return n`<div class="field imp-field">
        ${e?n`<span class="flabel">Trazer de mensagem ou foto</span>`:h}
        <div class="imp-tiles">
          ${o("text","clipboard-paste","Colar mensagem")}
          ${o("photos","images","Escolher fotos",!s.images)}
          ${o("scan","scan-text","Digitalizar com\xA0IA",!s.images,i?"":"Precisa de https")}
        </div>
        ${s.images&&!i?n`<p class="imp-help">Em http a câmera não abre aqui: tire a foto pelo celular e use Escolher fotos.</p>`:a&&s.images?n`<p class="imp-help">No app do Home Assistant, a galeria manda uma foto por vez.</p>`:h}
      </div>
      ${s.ready?h:n`<div class="ai-box">${g("scan-text")}<span>Sem IA configurada, a mensagem é separada por linhas e vírgulas. Para ler fotos, configure a Leitura por IA em Mais.</span></div>`}`}_renderImportSheet(){let t=this._form,e=this._aiInfo(),s=(d,l)=>n`<div class="sheet-head">
      ${l?n`<button class="icon-btn back" @click=${l} aria-label="Voltar">${g("chevron-left")}</button>`:h}
      <h3 class="display">${d}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},i=t.error?n`<div class="imp-error">${g("circle-alert")}<span>${t.error}</span></div>`:h,o=t.images&&t.images.length?n`<div class="thumbs">${t.images.map(d=>n`<img src=${d.url} alt="" />`)}</div>`:h;if(t.step==="voice")return this._renderVoiceStep(s);if(t.step==="text")return n`
        ${s(t.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${t.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${d=>this._setForm({text:d.target.value,error:null})}></textarea>
        </label>
        ${i}
        <div class="sheet-actions">
          ${this._clipOk()?n`<button class="btn outline" @click=${()=>this._pasteClipboard()}>${g("clipboard-paste")}Colar</button>`:h}
          <button class="btn primary" ?disabled=${!(t.text||"").trim()} @click=${()=>this._readText()}>${e.ready?g("sparkles"):h}Separar itens</button>
        </div>
        ${e.ready?h:n`<p class="sheet-note">Sem IA configurada: separo por linhas, vírgulas e “e”.</p>`}
      `;if(t.step==="loading")return n`
        ${s("Lendo\u2026")}
        ${o}
        <div class="imp-loading">
          <span class="spin">${g("loader-circle")}</span>
          <span>${t.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>t.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>Cancelar</button></div>
      `;if(t.step==="review"){let d=this._list(t.target),l=t.items.filter(m=>m.on&&m.text.trim()).length,c=this._importTargets(),p=c.length>1,u=new Set(t.items.filter(m=>m.on&&m.text.trim()).map(m=>this._importListOf(m)));return n`
        ${s("Revisar itens",a)}
        ${o}
        ${t.heard?n`<p class="heard">${g("mic")}<span>“${t.heard}”</span></p>`:h}
        <p class="sheet-note top">${_(t.items.length,"item encontrado","itens encontrados")}.</p>
        ${t.note?n`<div class="imp-error soft">${g("sparkles")}<span>${t.note}</span></div>`:h}
        <div class="imp-list">
          ${t.items.map((m,f)=>{let v=this._list(this._importListOf(m));return n`<div class="imp-row ${m.on?"":"off"} ${p||this._roomsOn()||this._equipsOn()?"has-dest":""}">
              <button class="check ${m.on?"on":""}" role="checkbox" aria-checked=${m.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(f,{on:!m.on})}>${g("check")}</button>
              <input type="text" .value=${m.text} aria-label="Item" @input=${b=>this._setImportItem(f,{text:b.target.value})} />
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:t.items.filter((b,y)=>y!==f)})}>${g("x")}</button>
              ${p||this._roomsOn()||this._equipsOn()?n`<div class="imp-chips">
              ${p&&v?n`<label class="imp-dest" style=${I(v.color,this._dark)}>
                    <span class="dot"></span><span class="dname">${A(v.name,30)}</span>${g("chevron-down")}
                    <select aria-label="Lista de ${m.text}" @change=${b=>this._setImportItem(f,{list:b.target.value})}>
                      ${c.map(b=>n`<option value=${b.id} ?selected=${b.id===v.id}>${b.name}</option>`)}
                    </select>
                  </label>`:h}
              ${this._roomsOn()?n`<label class="imp-dest imp-room ${m.room?"":"none"}">
                    ${g("door-open")}<span class="dname">${m.room?A(this._roomName(m.room)||"",30):"C\xF4modo"}</span>${g("chevron-down")}
                    <select aria-label="Cômodo de ${m.text}" @change=${b=>this._setImportItem(f,{room:b.target.value||null})}>
                      <option value="" ?selected=${!m.room}>Nenhum</option>
                      ${this._roomList().map(b=>n`<option value=${b.id} ?selected=${b.id===m.room}>${b.nome}</option>`)}
                    </select>
                  </label>`:h}
              ${this._equipsOn()?n`<label class="imp-dest imp-room imp-equip ${m.equip?"":"none"}">
                    ${g("package")}<span class="dname">${m.equip?A((this._equipOf(m.equip)||{}).nome||"",30):"Equipamento"}</span>${g("chevron-down")}
                    <select aria-label="Equipamento de ${m.text}" @change=${b=>{let y=b.target.value||null,M=!m.room&&y&&this._roomsOn()?(this._equipOf(y)||{}).comodo||null:m.room;this._setImportItem(f,{equip:y,room:M})}}>
                      <option value="" ?selected=${!m.equip}>Nenhum</option>
                      ${this._equipOptions(m.equip)}
                    </select>
                  </label>`:h}
                  </div>`:h}
            </div>`})}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...t.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let m=this.renderRoot.querySelectorAll(".imp-row input");m.length&&m[m.length-1].focus()})}}>${g("plus")}<span>Adicionar linha</span></button>
        </div>
        ${e.images?n`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${g("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${g("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:h}
        ${p?n`<div class="field">
              <span class="flabel">Todos em</span>
              <div class="chip-row grid">
                ${c.map(m=>n`<button class="pick list ${u.size===1&&u.has(m.id)?"on":""}" style=${I(m.color,this._dark)} @click=${()=>this._setForm({target:m.id,items:t.items.map(f=>({...f,list:m.id}))})}><span class="dot"></span><span>${A(m.name,26)}</span></button>`)}
              </div>
            </div>`:h}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!l} @click=${()=>this._importAdd()}>
            ${l?`Adicionar ${_(l,"item","itens")}`:"Nenhum item marcado"}${l&&u.size>1?` em ${u.size} listas`:l&&u.size===1&&this._list([...u][0])?` em ${A(this._list([...u][0]).name,18)}`:""}
          </button>
        </div>
      `}return n`
      ${s("Importar itens")}
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${e.images?h:n`<div class="imp-error soft">${g("sparkles")}<span>${e.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>Ver Leitura por IA</button></span></div>`}
      ${i}
    `}_renderListMenu(){let t=this._list(this._form.listId);return t?n`
      <div class="sheet-head">
        <h3 class="display">${t.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <button class="menu-row" @click=${()=>this._openCustomize(t)}>${g("palette")}Personalizar<span class="sub">${t.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(t.id,{hidden:t.hidden?null:!0}))}>${g(t.hidden?"eye":"eye-off")}${t.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?n`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${t.id}`)}>${g("external-link")}Abrir na tela padrão do HA</button>`:h}
      ${w(t.features,$.DELETE)&&t.done?n`<button class="menu-row danger" @click=${()=>this._confirmClearDone(t)}>${g("brush-cleaning")}Limpar concluídos<span class="sub">${t.done}</span></button>`:h}
    `:h}_renderCustomize(){let t=this._form,e=this._list(t.listId);if(!e)return h;let s=rt(t.color)||e.color,a=t.icon||le(`${e.origName} ${e.group||""} ${e.id}`);return n`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <div class="preview-tile" style=${I(s,this._dark)}>
        <span class="tile">${g(a)}</span>
        <span class="lc-main"><span class="lc-title">${(t.name||"").trim()||e.origName}</span><span class="lc-meta">${e.group||e.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">Nome</span>
        <input type="text" .value=${t.name} placeholder=${e.origName} @input=${i=>this._setForm({name:i.target.value})} />
      </label>
      <div class="field">
        <span class="flabel">Cor</span>
        <div class="swatches">
          ${it.map(i=>n`<button class="sw ${s.id===i.id?"on":""}" style="--c:${i.fill}" aria-label=${i.label} @click=${()=>this._setForm({color:i.id})}>${s.id===i.id?g("check"):h}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${I(s,this._dark)}>
          ${Ms.map(i=>n`<button class="ig ${a===i?"on":""}" aria-label=${i} @click=${()=>this._setForm({icon:i})}>${g(i)}</button>`)}
        </div>
      </div>
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!t.hidden} @change=${i=>this._setForm({hidden:!i.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?e.canDue?n`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">Prazos</div>
              <div class="hint" style="white-space:normal">${t.deadlines?"Vencidos ficam vermelhos e entram em Prazos.":"Datas s\xF3 como informa\xE7\xE3o."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${t.deadlines} @change=${i=>this._setForm({deadlines:i.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:e.hasDates?n`<p class="sheet-note with-icon">${g("info")}<span>Esta lista não aceita prazo: as datas vêm da integração, só como informação.</span></p>`:h:h}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:e.canDue})}>${g("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>Salvar</button>
      </div>
    `}_renderConfirm(){let t=this._form;return n`
      <div class="sheet-head"><h3 class="display">${t.title}</h3></div>
      <p class="confirm-text">${t.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${()=>t.run()}>${t.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return h;let t=this._toast;return n`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${t.text}</span>
      ${t.action?n`<button @click=${()=>{this._toast=null,t.action.run()}}>${t.action.label}</button>`:h}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",ge);var ve=class{constructor(t,e){this.url=t,this.onStatus=e,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let t=new WebSocket(this.url);this.ws=t,t.onopen=()=>{this.open=!0,this.backoff=1e3;let e=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))t.send(s);if(this.onStatus&&this.onStatus(!0),e)for(let s of this.reconnectHandlers)s()},t.onmessage=e=>{let s;try{s=JSON.parse(e.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let i=new Error(s.error&&s.error.message||"Falhou");i.code=s.error&&s.error.code,a.reject(i)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},t.onclose=()=>{let e=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),e&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(t){this.reconnectHandlers.push(t)}_send(t){let e=JSON.stringify(t);this.open?this.ws.send(e):this.queue.push(e)}sendMessagePromise(t){let e=this.nextId++;return new Promise((s,a)=>{this.pending.set(e,{resolve:s,reject:a}),this._send({...t,id:e})})}subscribeMessage(t,e){let s={cb:t,msg:e,id:null,first:null};this.subs.add(s);let a=new Promise((i,o)=>{s.first={resolve:i,reject:o}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(t){let e=this.nextId++;t.id=e,this.byId.set(e,t),this.pending.set(e,{resolve:()=>{t.first&&t.first.resolve(),t.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(e),this.subs.delete(t),t.first&&t.first.reject(s),t.first=null)}}),this.ws.send(JSON.stringify({...t.msg,id:e}))}};function Us(){try{if(window.parent===window)return null;let r=window.parent.document.querySelector("home-assistant");return r&&r.hass||null}catch{return null}}var bt=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function Ns(){let r=Us();return r&&r.themes&&typeof r.themes.darkMode=="boolean"?r.themes.darkMode:!!(bt&&bt.matches)}function Bs(){return{topbar:!(window.parent!==window),haptic(t){try{let e=window.parent;e!==window&&e.dispatchEvent(new e.CustomEvent("haptic",{detail:t}))}catch{}},openInHA(t){try{let e=window.parent;if(e!==window&&e.document){e.history.pushState(null,"",t),e.dispatchEvent(new e.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(t,"_top")}}}async function js(r){let t=new URL("ws",location.href);t.protocol=location.protocol==="https:"?"wss:":"ws:";let e=null,s=l=>{e={...e,...l},r(e)},a=new ve(t.href,l=>e&&s({connected:l})),i=await a.sendMessagePromise({type:"resolvia/bootstrap"}),o=Us();e={states:i.states||{},entities:i.entities||{},devices:i.devices||{},user:{name:o&&o.user&&o.user.name||i.user&&i.user.name||"",is_admin:o&&o.user?!!o.user.is_admin:!0},themes:{darkMode:Ns()},language:"pt-BR",connected:!0,version:i.version,resolvia:{ai:i.ai||{ready:!1,images:!1,entities:[]},aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:(l=!1)=>a.sendMessagePromise({type:"resolvia/voice/status",...l?{fresh:!0}:{}}),async voiceText(l){let c=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:l.buffer.slice(l.byteOffset,l.byteOffset+l.byteLength)}),p=await c.json().catch(()=>({}));if(!c.ok){let u=new Error(p.error||`Erro ${c.status}`);throw u.code=p.code,u}return p},async extract(l){let c=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(l)}),p=await c.json().catch(()=>({}));if(!c.ok){let u=new Error(p.error||`Erro ${c.status}`);throw u.code=p.code,u}return p},data:{url:l=>new URL(`api/export/${l}`,location.href).href,async import(l){let c=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(l.name||"")},body:l}),p=await c.json().catch(()=>({}));if(!c.ok)throw new Error(p.error||`Erro ${c.status}`);return p},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:l=>a.sendMessagePromise({type:"resolvia/versions/restore",name:l}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:l=>a.sendMessagePromise({type:"resolvia/backups/restore",name:l})}},connection:a,callWS:l=>a.sendMessagePromise(l),callService:(l,c,p,u)=>a.sendMessagePromise({type:"call_service",domain:l,service:c,service_data:p||{},target:u})},a.subscribeMessage(l=>{let c={...e.states};l.new_state?c[l.entity_id]=l.new_state:delete c[l.entity_id],s({states:c})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let l=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:l.states||{},entities:l.entities||{},devices:l.devices||{}})}catch{}});let d=()=>{let l=Ns();e&&l!==e.themes.darkMode&&s({themes:{...e.themes,darkMode:l}})};return setInterval(d,1500),bt&&bt.addEventListener&&bt.addEventListener("change",d),e}var xe=document.getElementById("app"),nt=document.createElement("resolvia-panel");nt.env=Bs();nt.narrow=window.innerWidth<870;window.addEventListener("resize",()=>nt.narrow=window.innerWidth<870);js(r=>{nt.hass=r}).then(r=>{nt.hass=r,xe.replaceChildren(nt)}).catch(r=>{xe.innerHTML="";let t=document.createElement("div");t.id="boot",t.textContent=`N\xE3o consegui iniciar o ResolvIA: ${r.message}. Recarregue a p\xE1gina.`,xe.appendChild(t)});})();
