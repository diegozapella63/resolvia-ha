/* ResolvIA · Lit (BSD-3), Lucide icons (ISC), Barlow & Barlow Condensed (OFL) */
window.litDisableBundleWarning=true;
(()=>{var It=globalThis,le=It.ShadowRoot&&(It.ShadyCSS===void 0||It.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),Re=new WeakMap,qt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(le&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Re.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Re.set(e,t))}return t}toString(){return this.cssText}},W=r=>new qt(typeof r=="string"?r:r+"",void 0,ce),ts=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,a,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[i+1],r[0]);return new qt(e,r,ce)},xa=(r,t)=>{if(le)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),a=It.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,r.appendChild(s)}},Pe=le?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return W(e)})(r):r,{is:ba,defineProperty:_a,getOwnPropertyDescriptor:$a,getOwnPropertyNames:wa,getOwnPropertySymbols:ya,getPrototypeOf:ka}=Object,Nt=globalThis,De=Nt.trustedTypes,Aa=De?De.emptyScript:"",Ma=Nt.reactiveElementPolyfillSupport,vt=(r,t)=>r,re={toAttribute(r,t){switch(t){case Boolean:r=r?Aa:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},es=(r,t)=>!ba(r,t),Le={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:es};Symbol.metadata??=Symbol("metadata"),Nt.litPropertyMetadata??=new WeakMap;var K=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Le){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&_a(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){let{get:a,set:i}=$a(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:a,set(o){let d=a?.call(this);i?.call(this,o),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Le}static o(){if(this.hasOwnProperty(vt("elementProperties")))return;let t=ka(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(vt("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(vt("properties"))){let e=this.properties,s=[...wa(e),...ya(e)];for(let a of s)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,a]of e)this.elementProperties.set(s,a)}this.u=new Map;for(let[e,s]of this.elementProperties){let a=this.p(e,s);a!==void 0&&this.u.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let a of s)e.unshift(Pe(a))}else t!==void 0&&e.push(Pe(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xa(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),a=this.constructor.p(t,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:re).toAttribute(e,s.type);this.m=t,i==null?this.removeAttribute(a):this.setAttribute(a,i),this.m=null}}_$AK(t,e){let s=this.constructor,a=s.u.get(t);if(a!==void 0&&this.m!==a){let i=s.getPropertyOptions(a),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:re;this.m=a;let d=o.fromAttribute(e,i.type);this[a]=d??this.T?.get(a)??d,this.m=null}}requestUpdate(t,e,s,a=!1,i){if(t!==void 0){let o=this.constructor;if(a===!1&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??es)(i,e)||s.useDefault&&s.reflect&&i===this.T?.get(t)&&!this.hasAttribute(o.p(t,s))))return;this.M(t,e,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:s,reflect:a,wrapped:i},o){s&&!(this.T??=new Map).has(t)&&(this.T.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),a===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,i]of this.v)this[a]=i;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:o}=i,d=this[a];o!==!0||this._$AL.has(a)||d===void 0||this.M(a,void 0,i,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.U()}catch(s){throw t=!1,this.U(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach(e=>this.C(e,this[e])),this.U()}updated(t){}firstUpdated(t){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[vt("elementProperties")]=new Map,K[vt("finalized")]=new Map,Ma?.({ReactiveElement:K}),(Nt.reactiveElementVersions??=[]).push("2.1.2");var de=globalThis,He=r=>r,zt=de.trustedTypes,Fe=zt?zt.createPolicy("lit-html",{createHTML:r=>r}):void 0,he="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,pe="?"+j,Sa=`<${pe}>`,st=document,bt=()=>st.createComment(""),_t=r=>r===null||typeof r!="object"&&typeof r!="function",ue=Array.isArray,ss=r=>ue(r)||typeof r?.[Symbol.iterator]=="function",se=`[ 	
\f\r]`,gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ve=/-->/g,Ne=/>/g,tt=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Be=/"/g,as=/^(?:script|style|textarea|title)$/i,me=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),l=me(1),Ta=me(2),gi=me(3),q=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),je=new WeakMap,et=st.createTreeWalker(st,129);function is(r,t){if(!ue(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(t):t}var rs=(r,t)=>{let e=r.length-1,s=[],a,i=t===2?"<svg>":t===3?"<math>":"",o=gt;for(let d=0;d<e;d++){let n=r[d],c,h,u=-1,f=0;for(;f<n.length&&(o.lastIndex=f,h=o.exec(n),h!==null);)f=o.lastIndex,o===gt?h[1]==="!--"?o=Ve:h[1]!==void 0?o=Ne:h[2]!==void 0?(as.test(h[2])&&(a=RegExp("</"+h[2],"g")),o=tt):h[3]!==void 0&&(o=tt):o===tt?h[0]===">"?(o=a??gt,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?tt:h[3]==='"'?Be:Ue):o===Be||o===Ue?o=tt:o===Ve||o===Ne?o=gt:(o=tt,a=void 0);let m=o===tt&&r[d+1].startsWith("/>")?" ":"";i+=o===gt?n+Sa:u>=0?(s.push(c),n.slice(0,u)+he+n.slice(u)+j+m):n+j+(u===-2?d:m)}return[is(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},$t=class r{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let i=0,o=0,d=t.length-1,n=this.parts,[c,h]=rs(t,e);if(this.el=r.createElement(c,s),et.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=et.nextNode())!==null&&n.length<d;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(he)){let f=h[o++],m=a.getAttribute(u).split(j),x=/([.?@])?(.*)/.exec(f);n.push({type:1,index:i,name:x[2],strings:m,ctor:x[1]==="."?Ct:x[1]==="?"?Rt:x[1]==="@"?Pt:it}),a.removeAttribute(u)}else u.startsWith(j)&&(n.push({type:6,index:i}),a.removeAttribute(u));if(as.test(a.tagName)){let u=a.textContent.split(j),f=u.length-1;if(f>0){a.textContent=zt?zt.emptyScript:"";for(let m=0;m<f;m++)a.append(u[m],bt()),et.nextNode(),n.push({type:2,index:++i});a.append(u[f],bt())}}}else if(a.nodeType===8)if(a.data===pe)n.push({type:2,index:i});else{let u=-1;for(;(u=a.data.indexOf(j,u+1))!==-1;)n.push({type:7,index:i}),u+=j.length-1}i++}}static createElement(t,e){let s=st.createElement("template");return s.innerHTML=t,s}};function at(r,t,e=r,s){if(t===q)return t;let a=s!==void 0?e.N?.[s]:e.O,i=_t(t)?void 0:t._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(r),a._$AT(r,e,s)),s!==void 0?(e.N??=[])[s]=a:e.O=a),a!==void 0&&(t=at(r,a._$AS(r,t.values),a,s)),t}var Ot=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??st).importNode(e,!0);et.currentNode=a;let i=et.nextNode(),o=0,d=0,n=s[0];for(;n!==void 0;){if(o===n.index){let c;n.type===2?c=new Ut(i,i.nextSibling,this,t):n.type===1?c=new n.ctor(i,n.name,n.strings,this,t):n.type===6&&(c=new Dt(i,this,t)),this._$AV.push(c),n=s[++d]}o!==n?.index&&(i=et.nextNode(),o++)}return et.currentNode=st,a}V(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Ut=class os{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,s,a){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this.D=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=at(this,t,e),_t(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==q&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):ss(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==p&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.I(st.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=$t.createElement(is(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.V(e);else{let i=new Ot(a,this),o=i.R(this.options);i.V(e),this.I(o),this._$AH=i}}_$AC(t){let e=je.get(t.strings);return e===void 0&&je.set(t.strings,e=new $t(t)),e}H(t){ue(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,a=0;for(let i of t)a===e.length?e.push(s=new os(this.B(bt()),this.B(bt()),this,this.options)):s=e[a],s._$AI(i),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=He(t).nextSibling;He(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,i){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,a){let i=this.strings,o=!1;if(i===void 0)t=at(this,t,e,0),o=!_t(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{let d=t,n,c;for(t=i[0],n=0;n<i.length-1;n++)c=at(this,d[s+n],e,n),c===q&&(c=this._$AH[n]),o||=!_t(c)||c!==this._$AH[n],c===p?t=p:t!==p&&(t+=(c??"")+i[n+1]),this._$AH[n]=c}o&&!a&&this.W(t)}W(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ct=class extends it{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===p?void 0:t}},Rt=class extends it{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},Pt=class extends it{constructor(t,e,s,a,i){super(t,e,s,a,i),this.type=5}_$AI(t,e=this){if((t=at(this,t,e,0)??p)===q)return;let s=this._$AH,a=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==p&&(s===p||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Dt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){at(this,t)}},Ea={q:he,J:j,Z:pe,F:1,G:rs,K:Ot,X:ss,Y:at,tt:Ut,st:it,it:Rt,et:Pt,ht:Ct,ot:Dt},Ia=de.litHtmlPolyfillSupport;Ia?.($t,Ut),(de.litHtmlVersions??=[]).push("3.3.3");var ns=(r,t,e)=>{let s=e?.renderBefore??t,a=s._$litPart$;if(a===void 0){let i=e?.renderBefore??null;s._$litPart$=a=new Ut(t.insertBefore(bt(),i),i,void 0,e??{})}return a._$AI(r),a},fe=globalThis;var Z=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=ns(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return q}};Z._$litElement$=!0,Z.finalized=!0,fe.litElementHydrateSupport?.({LitElement:Z});var qa=fe.litElementPolyfillSupport;qa?.({LitElement:Z});(fe.litElementVersions??=[]).push("4.2.2");var{tt:za}=Ea,We=r=>r,Oa=r=>r===null||typeof r!="object"&&typeof r!="function";var Ye=(r,t)=>t===void 0?r?._$litType$!==void 0:r?._$litType$===t,Ca=r=>r?._$litType$?.h!=null;var ls=r=>r.strings===void 0,Je=()=>document.createComment(""),X=(r,t,e)=>{let s=r._$AA.parentNode,a=t===void 0?r._$AB:t._$AA;if(e===void 0){let i=s.insertBefore(Je(),a),o=s.insertBefore(Je(),a);e=new za(i,o,r,r.options)}else{let i=e._$AB.nextSibling,o=e._$AM,d=o!==r;if(d){let n;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(n=r._$AU)!==o._$AU&&e._$AP(n)}if(i!==a||d){let n=e._$AA;for(;n!==i;){let c=We(n).nextSibling;We(s).insertBefore(n,a),n=c}}}return e},J=(r,t,e=r)=>(r._$AI(t,e),r),Ra={},wt=(r,t=Ra)=>r._$AH=t,oe=r=>r._$AH,ae=r=>{r._$AR(),r._$AA.remove()},cs=r=>{r._$AR()};var P=r=>(...t)=>({_$litDirective$:r,values:t}),F=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.ct=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var xt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),xt(s,t);return!0},Lt=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},ds=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),La(t)}};function Pa(r){this._$AN!==void 0?(Lt(this),this._$AM=r,ds(this)):this._$AM=r}function Da(r,t=!1,e=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(t)if(Array.isArray(s))for(let i=e;i<s.length;i++)xt(s[i],!1),Lt(s[i]);else s!=null&&(xt(s,!1),Lt(s));else xt(this,r)}var La=r=>{r.type==2&&(r._$AP??=Da,r._$AQ??=Pa)},yt=class extends F{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),ds(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(xt(this,t),Lt(this))}setValue(t){if(ls(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Ht=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},Ft=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(t=>this.dt=t)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var Vt=class extends yt{constructor(){super(...arguments),this.ft=new Ht(this),this.vt=new Ft}render(t,e){return q}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.yt)return q;this.yt=e;let a=0,{ft:i,vt:o}=this;return(async(d,n)=>{for await(let c of d)if(await n(c)===!1)return})(e,async d=>{for(;o.get();)await o.get();let n=i.deref();if(n!==void 0){if(n.yt!==e)return!1;s!==void 0&&(d=s(d,a)),n.commitValue(d,a),a++}return!0}),q}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},vi=P(Vt),xi=P(class extends Vt{constructor(r){if(super(r),r.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(r,t){return this.rt=r,super.update(r,t)}commitValue(r,t){t===0&&cs(this.rt);let e=X(this.rt);J(e,r)}}),Ke=r=>Ca(r)?r._$litType$.h:r.strings,bi=P(class extends F{constructor(r){super(r),this.bt=new WeakMap}render(r){return[r]}update(r,[t]){let e=Ye(this.gt)?Ke(this.gt):null,s=Ye(t)?Ke(t):null;if(e!==null&&(s===null||e!==s)){let a=oe(r).pop(),i=this.bt.get(e);if(i===void 0){let o=document.createDocumentFragment();i=ns(p,o),i.setConnected(!1),this.bt.set(e,i)}wt(i,[a]),X(i,void 0,a)}if(s!==null){if(e===null||e!==s){let a=this.bt.get(s);if(a!==void 0){let i=oe(a).pop();cs(r),X(r,void 0,i),wt(r,[i])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var _i=P(class extends F{constructor(r){if(super(r),r.type!==1||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(t=>r[t]).join(" ")+" "}update(r,[t]){if(this.wt===void 0){this.wt=new Set,r.strings!==void 0&&(this._t=new Set(r.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(t)}let e=r.element.classList;for(let s of this.wt)s in t||(e.remove(s),this.wt.delete(s));for(let s in t){let a=!!t[s];a===this.wt.has(s)||this._t?.has(s)||(a?(e.add(s),this.wt.add(s)):(e.remove(s),this.wt.delete(s)))}return q}}),Ha={},$i=P(class extends F{constructor(){super(...arguments),this.St=Ha}render(r,t){return t()}update(r,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every((s,a)=>s===this.St[a]))return q}else if(this.St===t)return q;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var wi=P(class extends F{constructor(){super(...arguments),this.key=p}render(r,t){return this.key=r,t}update(r,[t,e]){return t!==this.key&&(wt(r),this.key=t),e}}),yi=P(class extends F{constructor(r){if(super(r),r.type!==3&&r.type!==1&&r.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!ls(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[t]){if(t===q||t===p)return t;let e=r.element,s=r.name;if(r.type===3){if(t===e[s])return q}else if(r.type===4){if(!!t===e.hasAttribute(s))return q}else if(r.type===1&&e.getAttribute(s)===t+"")return q;return wt(r),t}});var ie=new WeakMap,ki=P(class extends yt{render(r){return p}update(r,[t]){let e=t!==this.lt;return e&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=r.options?.host,this.$t(this.xt=r.element)),p}$t(r){if(this.lt!==void 0)if(this.isConnected||(r=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=ie.get(t);e===void 0&&(e=new WeakMap,ie.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,r),r!==void 0&&this.lt.call(this.Et,r)}else this.lt.value=r}get Tt(){return typeof this.lt=="function"?ie.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),Xe=(r,t,e)=>{let s=new Map;for(let a=t;a<=e;a++)s.set(r[a],a);return s},V=P(class extends F{constructor(r){if(super(r),r.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(r,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let a=[],i=[],o=0;for(let d of r)a[o]=s?s(d,o):o,i[o]=e(d,o),o++;return{values:i,keys:a}}render(r,t,e){return this.Ct(r,t,e).values}update(r,[t,e,s]){let a=oe(r),{values:i,keys:o}=this.Ct(t,e,s);if(!Array.isArray(a))return this.Pt=o,i;let d=this.Pt??=[],n=[],c,h,u=0,f=a.length-1,m=0,x=i.length-1;for(;u<=f&&m<=x;)if(a[u]===null)u++;else if(a[f]===null)f--;else if(d[u]===o[m])n[m]=J(a[u],i[m]),u++,m++;else if(d[f]===o[x])n[x]=J(a[f],i[x]),f--,x--;else if(d[u]===o[x])n[x]=J(a[u],i[x]),X(r,n[x+1],a[u]),u++,x--;else if(d[f]===o[m])n[m]=J(a[f],i[m]),X(r,a[u],a[f]),f--,m++;else if(c===void 0&&(c=Xe(o,m,x),h=Xe(d,u,f)),c.has(d[u]))if(c.has(d[f])){let v=h.get(o[m]),_=v!==void 0?a[v]:null;if(_===null){let E=X(r,a[u]);J(E,i[m]),n[m]=E}else n[m]=J(_,i[m]),X(r,a[u],_),a[v]=null;m++}else ae(a[f]),f--;else ae(a[u]),u++;for(;m<=x;){let v=X(r,n[x+1]);J(v,i[m]),n[m++]=v}for(;u<=f;){let v=a[u++];v!==null&&ae(v)}return this.Pt=o,wt(r,n),q}}),hs="important",Fa=" !"+hs,Ai=P(class extends F{constructor(r){if(super(r),r.type!==1||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{let s=r[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(r,[t]){let{style:e}=r.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let s of this.Mt)t[s]==null&&(this.Mt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let a=t[s];if(a!=null){this.Mt.add(s);let i=typeof a=="string"&&a.endsWith(Fa);s.includes("-")||i?e.setProperty(s,i?a.slice(0,-11):a,i?hs:""):e[s]=a}}return q}}),Mi=P(class extends F{constructor(r){if(super(r),r.type!==2)throw Error("templateContent can only be used in child bindings")}render(r){return this.At===r?q:(this.At=r,document.importNode(r.content,!0))}}),ct=class extends F{constructor(t){if(super(t),this.gt=p,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===p||t==null)return this.kt=void 0,this.gt=t;if(t===q)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};ct.directiveName="unsafeHTML",ct.resultType=1;var Si=P(ct);var kt=class extends ct{};kt.directiveName="unsafeSVG",kt.resultType=2;var D=P(kt),Ze=r=>!Oa(r)&&typeof r.then=="function",Qe=1073741823;var ne=class extends yt{constructor(){super(...arguments),this.Ot=Qe,this.Ut=[],this.ft=new Ht(this),this.vt=new Ft}render(...t){return t.find(e=>!Ze(e))??q}update(t,e){let s=this.Ut,a=s.length;this.Ut=e;let i=this.ft,o=this.vt;this.isConnected||this.disconnected();for(let d=0;d<e.length&&!(d>this.Ot);d++){let n=e[d];if(!Ze(n))return this.Ot=d,n;d<a&&n===s[d]||(this.Ot=Qe,a=0,Promise.resolve(n).then(async c=>{for(;o.get();)await o.get();let h=i.deref();if(h!==void 0){let u=h.Ut.indexOf(n);u>-1&&u<h.Ot&&(h.Ot=u,h.setValue(c))}}))}return q}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Ti=P(ne);var Va=Symbol.for(""),Na=r=>{if(r?.r===Va)return r?._$litStatic$};var Ge=new Map,ps=r=>(t,...e)=>{let s=e.length,a,i,o=[],d=[],n,c=0,h=!1;for(;c<s;){for(n=t[c];c<s&&(i=e[c],(a=Na(i))!==void 0);)n+=a+t[++c],h=!0;c!==s&&d.push(i),o.push(n),c++}if(c===s&&o.push(t[s]),h){let u=o.join("$$lit$$");(t=Ge.get(u))===void 0&&(o.raw=o,Ge.set(u,t=o)),e=d}return r(t,...e)},Ei=ps(l),Ii=ps(Ta);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var z={activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',"toggle-right":'<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>',smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',contrast:'<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',"chart-column":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',"layout-list":'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>',menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',"chevron-left":'<path d="m15 18-6-6 6-6"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"chevron-down":'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',calendar:'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',"calendar-clock":'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',"calendar-days":'<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',"list-checks":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>',"list-todo":'<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',"shopping-cart":'<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',"triangle-alert":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',"door-open":'<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>',"hard-hat":'<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',"book-open":'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',dumbbell:'<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',leaf:'<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',dog:'<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',cat:'<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',"gamepad-2":'<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',baby:'<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>',"message-circle":'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"grip-vertical":'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"external-link":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',"sun-moon":'<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',"undo-2":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',"arrow-right-left":'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"git-fork":'<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',"brush-cleaning":'<path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/>',"rotate-ccw":'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',"folder-git-2":'<path d="M18 19a5 5 0 0 1-5-5v8"/><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="19" r="2"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',tv:'<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>',lamp:'<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>',hammer:'<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',"flower-2":'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',"graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',flame:'<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',zap:'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"clipboard-list":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',"circle-alert":'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',"arrow-up-right":'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',"party-popper":'<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',"notebook-pen":'<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',"square-check-big":'<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>',"list-plus":'<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',"wifi-off":'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',"clipboard-paste":'<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>',images:'<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',"scan-text":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',"loader-circle":'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',"message-square-text":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',upload:'<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',archive:'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',"archive-restore":'<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h2" /><path d="M20 8v11a2 2 0 0 1-2 2h-2" /><path d="m9 15 3-3 3 3" /><path d="M12 12v9" />',sheet:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" />',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',"clock-fading":'<path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />',info:'<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />',trophy:'<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />',blocks:'<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" />'};var us="./fonts/barlow-400.woff2";var ms="./fonts/barlow-500.woff2";var fs="./fonts/barlow-600.woff2";var gs="./fonts/barlow-condensed-500.woff2";var vs="./fonts/barlow-condensed-600.woff2";var xs="./fonts/barlow-condensed-700.woff2";var bs='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',_s=`"RV Barlow", ${bs}`,$s=`"RV Barlow Condensed", ${bs}`;function ws(){if(document.getElementById("resolvia-fonts"))return;let r=(e,s,a)=>`@font-face{font-family:"${e}";src:url(${JSON.stringify(s)}) format("woff2");font-weight:${a};font-style:normal;font-display:swap}`,t=document.createElement("style");t.id="resolvia-fonts",t.textContent=[r("RV Barlow",us,400),r("RV Barlow",ms,500),r("RV Barlow",fs,"600 900"),r("RV Barlow Condensed",gs,500),r("RV Barlow Condensed",vs,600),r("RV Barlow Condensed",xs,"700 900")].join(`
`),document.head.appendChild(t)}var ge=()=>l`<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">
  <path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="var(--rv-accent)" />
  <path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1" />
  <path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28" />
  <path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="var(--rv-on-accent, #2a1614)" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" />
</svg>`;var Ka="(min-width: 1000px)";function ys(r,t=""){if(!r.touches||r.touches.length!==1||window.matchMedia&&window.matchMedia(Ka).matches)return null;let e=r.touches[0];if(e.clientX<24||e.clientX>window.innerWidth-24)return null;let s=`input, textarea, select, [contenteditable], .grip, [data-noswipe]${t?`, ${t}`:""}`;for(let a of r.composedPath()){if(a===r.currentTarget)break;if(!(a instanceof Element))continue;if(a.matches(s))return null;let i=getComputedStyle(a);if((i.overflowX==="auto"||i.overflowX==="scroll")&&a.scrollWidth>a.clientWidth+2)return null}return{x:e.clientX,y:e.clientY,at:Date.now()}}function ks(r,t){if(!t||!r.changedTouches||!r.changedTouches.length)return 0;let e=r.changedTouches[0],s=e.clientX-t.x,a=e.clientY-t.y;return Math.abs(s)<70||Math.abs(s)<Math.abs(a)*2||Date.now()-t.at>800?0:s<0?1:-1}async function Bt(r,t,e){for(let a=0;a<30&&r._view().name!==t;a++)await new Promise(i=>setTimeout(i,16));await r.updateComplete;let s=r.renderRoot.querySelector("main > .page, main > section");!s||!s.animate||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{opacity:0,transform:`translateX(${e>0?40:-40}px)`},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(0.2, 0.8, 0.2, 1)"})}var As=ts`
  :host {
    --rv-body: ${W(_s)};
    --rv-display: ${W($s)};
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
  /* Mais: the menu (Listas, Repetições, Configurações), like the InventarIA */
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
  /* Serviço externo: someone from outside does it */
  .tag.ext {
    background: color-mix(in srgb, var(--rv-muted) 14%, transparent);
    color: var(--rv-text-2);
    border-color: transparent;
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
  /* Buscar: Incluir cômodos/equipamentos with Usar cômodos/equipamentos off */
  .filters .pick:disabled {
    opacity: 0.4;
    cursor: default;
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
`;var Ms=["dom","seg","ter","qua","qui","sex","s\xE1b"],Ss={mensagem:"Mensagens",fotos:"Fotos",sugestao:"Sugest\xF5es",conversa:"Conversa"},Ts={erro:"erro",cota:"sem cota",formato:"resposta fora do formato"},Q=r=>String(r).padStart(2,"0"),ve=r=>`${r.getFullYear()}-${Q(r.getMonth()+1)}-${Q(r.getDate())}`,jt=r=>{let[t,e,s]=r.split("-").map(Number);return new Date(t,e-1,s)},qs=r=>String(Math.round(r*10)/10).replace(".",","),Es=r=>r>=1e3?`${qs(r/1e3)} mil`:String(Math.round(r||0)),Is=r=>`${r} ${r===1?"chamada":"chamadas"}`,Xa=(r,t={})=>t[r]||(r||"").replace(/^ai_task\./,"").replace(/_/g," ")||"padr\xE3o do Home Assistant",Za=(r,t)=>{let e=new Date(r);if(!Number.isFinite(e.getTime()))return"";let s=`${Q(e.getHours())}:${Q(e.getMinutes())}`;return ve(e)===ve(t)?`hoje ${s}`:`${Q(e.getDate())}/${Q(e.getMonth()+1)} ${s}`};function Qa(r){let t=r.join(" ").toLowerCase();return/google|gemini/.test(t)?l`Consumo exato e cota: <a href="https://console.cloud.google.com/apis/dashboard" target="_blank" rel="noopener">Google Cloud Console</a>.`:/openai|chatgpt|gpt/.test(t)?l`Consumo exato e custo: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener">platform.openai.com/usage</a>.`:/anthropic|claude/.test(t)?l`Consumo exato e custo: <a href="https://platform.claude.com/usage" target="_blank" rel="noopener">Claude Console</a>.`:"O consumo exato fica no painel do provedor da IA."}function zs({u:r,day:t,onDay:e,head:s,app:a,using:i="",names:o={}}){if(!r||!r.hoje)return l`<div class="panel uso-panel" id="uso-ia">${s}<p class="panel-lead">Carregando…</p></div>`;let d=new Date,n=ve(d),c=b=>b.cota?l`<span class="s alert">${b.cota} ${b.cota>1?"vezes":"vez"} sem cota</span>`:b.erros?l`<span class="s alert">${b.erros} com erro</span>`:l`<span class="s">≈ ${Es(b.tokens)} tokens</span>`,h=(b,M)=>l`<div class="uso-tile"><span class="k">${b}</span><span class="v">${M.chamadas||0}</span>${c(M)}</div>`,u=r.dias||[],f=Math.max(1,...u.map(b=>b.chamadas||0)),m=u.find(b=>b.dia===t)||u.find(b=>b.dia===n)||{dia:n,chamadas:0,erros:0,cota:0},x=b=>b.dia===n?"hoje":Ms[jt(b.dia).getDay()],v=r.semana&&r.semana.tipos||{},_=[...Object.keys(r.mes&&r.mes.ias||{}),...Object.keys(r.semana&&r.semana.ias||{}),i],E=r.ultimas||[];return l`<div class="panel uso-panel" id="uso-ia">
    ${s}
    <div class="uso-tiles">${h("Hoje",r.hoje)}${h("7 dias",r.semana)}${h("Este m\xEAs",r.mes)}</div>
    <div class="uso-chart" role="group" aria-label="Chamadas de IA nos últimos 7 dias">
      ${u.map(b=>{let M=b.chamadas?Math.max(4,Math.round(b.chamadas/f*100)):0;return l`<button type="button" class="uso-bar ${b.dia===n?"today":""}" aria-pressed=${b.dia===m.dia?"true":"false"} aria-label="${x(b)}: ${Is(b.chamadas)}" @click=${()=>e(b.dia)}><i style="height:${M}%"></i></button>`})}
    </div>
    <div class="uso-days" aria-hidden="true">${u.map(b=>l`<span>${x(b)}</span>`)}</div>
    <p class="uso-cap" aria-live="polite">${m.dia===n?"Hoje":`${Ms[jt(m.dia).getDay()]}, ${Q(jt(m.dia).getDate())}/${Q(jt(m.dia).getMonth()+1)}`}: <b>${Is(m.chamadas)}</b>${m.erros?`, ${m.erros} com erro`:""}${m.cota?`, ${m.cota} sem cota`:""}.</p>
    ${Object.keys(v).length?l`<ul class="uso-kinds">${Object.keys(v).sort((b,M)=>v[M]-v[b]).map(b=>l`<li>${Ss[b]||b} <b>${v[b]}</b></li>`)}</ul>`:p}
    <details class="uso-last">
      <summary>Últimas chamadas</summary>
      <ul>
        ${E.length?E.map(b=>l`<li><b>${Ss[b.tipo]||b.tipo}</b><span>${Xa(b.ia,o)}</span>${Ts[b.resultado]?l`<span class="r-err">${Ts[b.resultado]}</span>`:p}
                <span class="t">${qs(b.segundos)} s · ≈ ${Es(b.tokens)} tokens${b.imagens?` \xB7 ${b.imagens} ${b.imagens>1?"imagens":"imagem"}`:""} · ${Za(b.quando,d)}</span></li>`):l`<li>Nenhuma chamada ainda.</li>`}
      </ul>
    </details>
    <p class="uso-note">${Qa(_)}</p>
  </div>`}var Os=`
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
`;var Ga=/[̀-ͯ]/g,Cs=r=>r.normalize("NFD").replace(Ga,"").toLowerCase()||r.toLowerCase(),Wt=r=>[...String(r||"")].map(Cs).join("");function ti(r,{room:t=null,query:e=""}={}){let s=Wt(e).split(/\s+/).filter(Boolean),a=n=>Wt(`${n.nome} ${n.zona||""} ${n.roomName||""}`),i=n=>s.every(c=>a(n).includes(c)),o=n=>{if(!s.length)return 0;let c=Wt(n.nome);return c.startsWith(s[0])?0:c.includes(s[0])?1:2},d=r.filter(i).sort((n,c)=>o(n)-o(c)||n.nome.localeCompare(c.nome,"pt-BR"));return t?{inRoom:d.filter(n=>n.roomId===t),others:s.length?d.filter(n=>n.roomId!==t):[]}:{inRoom:[],others:s.length?d:[]}}function ei(r,t,e){let s=Wt(e).split(/\s+/).filter(Boolean)[0];if(!s)return t;let a=[...t],i=a.map(Cs),o=-1,d=-1;for(let n=0;n<a.length&&o<0;n++){let c="";for(let h=n;h<a.length;h++){if(c+=i[h],c===s){o=n,d=h+1;break}if(!s.startsWith(c))break}}return o<0?t:r`${a.slice(0,o).join("")}<mark>${a.slice(o,d).join("")}</mark>${a.slice(d).join("")}`}function Yt({lit:r,icon:t,items:e,room:s=null,roomName:a="",value:i=null,query:o="",more:d=!1,onQuery:n,onPick:c,onMore:h,onRemove:u,onAdd:f,adding:m=!1,autofocus:x=!1}){let{html:v,nothing:_}=r,E=(A,y)=>v`<div class="eq-sel">
      <span class="eq-ic">${t("package")}</span>
      <span class="eq-tx"><b>${A.nome}</b><small>${[A.zona,A.roomName].filter(Boolean).join(" \xB7 ")||"Sem c\xF4modo"}</small></span>
      <button type="button" class="icon-btn mini" aria-label="Tirar ${A.nome}" @click=${y}>${t("x")}</button>
    </div>`;if(Array.isArray(i)){let A=i.map(T=>e.find(R=>R.id===T)).filter(Boolean),y=A.map(T=>E(T,()=>u(T.id)));if(A.length&&!m)return v`<div class="eq-pick">${y}<button type="button" class="eq-more eq-add" @click=${()=>f()}>${t("plus")}Outro equipamento</button></div>`;let C=e.filter(T=>!i.includes(T.id));return v`<div class="eq-pick">${y}${M(C,A.length>0||x)}</div>`}let b=i?e.find(A=>A.id===i):null;if(b)return E(b,()=>c(null));return M(e,x);function M(A,y){let{inRoom:C,others:T}=ti(A,{room:s,query:o}),R=d?40:6,St=(H,Ce)=>v`<button type="button" class="eq-row" @click=${()=>c(H.id)}>
    <span class="eq-ic">${t("package")}</span>
    <span class="eq-tx"><b>${ei(v,H.nome,o)}</b>${[H.zona,Ce?H.roomName:""].filter(Boolean).length?v`<small>${[H.zona,Ce?H.roomName:""].filter(Boolean).join(" \xB7 ")}</small>`:_}</span>
  </button>`,Tt=C.slice(0,R),ee=T.slice(0,Math.max(0,R-Tt.length)),Oe=C.length+T.length-Tt.length-ee.length,Et=_;return!o&&!s?Et=v`<p class="eq-hint">Escolha o cômodo ou busque entre ${A.length} ${A.length===1?"equipamento":"equipamentos"}.</p>`:!o&&s&&!C.length?Et=v`<p class="eq-hint">Nenhum equipamento em ${a}. Busque nos outros cômodos.</p>`:o&&!C.length&&!T.length&&(Et=v`<p class="eq-hint">Nada com “${o}”.</p>`),v`<div class="eq-pick">
    <label class="eq-search">${t("search")}<input type="search" .value=${o} placeholder=${s?`Buscar em ${a}\u2026`:"Buscar equipamento\u2026"} aria-label="Buscar equipamento" ?autofocus=${y} @input=${H=>n(H.target.value)} /></label>
    ${Tt.length?v`<div class="eq-list">${Tt.map(H=>St(H,!1))}</div>`:_}
    ${ee.length?v`${s?v`<div class="eq-head">Em outros cômodos</div>`:_}<div class="eq-list">${ee.map(H=>St(H,!0))}</div>`:_}
    ${Oe>0?v`<button type="button" class="eq-more" @click=${()=>h()}>Mostrar mais ${Oe}</button>`:_}
    ${Et}
  </div>`}}var Rs=`
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
`;var xe="M8 0h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8L0 13V7z",si="M9.7 10a2.7 2.7 0 1 0-5.4 0a2.7 2.7 0 1 0 5.4 0z";function Ps(r,t=new Date){let e=r.filter(a=>a.id!=="grafite"),s=Math.floor(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())/864e5);return e[(s%e.length+e.length)%e.length]}function Ds({theme:r,onTheme:t,icon:e}){return l`<div class="seg themes" role="radiogroup" aria-label="Tema">
    ${[["auto","Autom\xE1tico","smartphone"],["light","Claro","sun"],["dark","Escuro","moon"]].map(([s,a,i])=>l`<button type="button" class=${r===s?"on":""} role="radio" aria-checked=${r===s?"true":"false"} @click=${()=>t(s)}>${e(i)}<span>${a}</span></button>`)}
  </div>`}function Ls({palette:r,value:t,onPick:e}){return l`<div class="tag-swatches" role="radiogroup" aria-label="Cor do app">
    ${r.map(s=>l`<button type="button" class="tsw ${t===s.id?"on":""}" role="radio" aria-checked=${t===s.id?"true":"false"} style="--a:${s.fill}" @click=${()=>e(s.id)}>
        <svg viewBox="-5 -5 40 30" aria-hidden="true"><path class="sw-ring" d=${xe}></path><path class="sw-gap" d=${xe}></path><path class="sw-fill" d=${xe+si}></path><path class="sw-check" d="m14.6 10.3 3.2 3.2 6.5-6.9"></path></svg>
        <span>${s.label}</span>
      </button>`)}
  </div>`}var Hs=`
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
`;var $={CREATE:1,DELETE:2,UPDATE:4,MOVE:8,DUE_DATE:16,DUE_DATETIME:32,DESCRIPTION:64},w=(r,t)=>((r||0)&t)===t,ot=[{id:"vermelho",label:"Vermelho",fill:"#FF5A4F",ink:"#C42A1F"},{id:"coral",label:"Coral",fill:"#FF8A65",ink:"#C2410C"},{id:"rosa",label:"Rosa",fill:"#FF77A9",ink:"#BE185D"},{id:"framboesa",label:"Framboesa",fill:"#E8508A",ink:"#A3124F"},{id:"laranja",label:"Laranja",fill:"#FFA23E",ink:"#B45309"},{id:"ouro",label:"Ouro",fill:"#F2C14E",ink:"#8A6100"},{id:"lilas",label:"Lil\xE1s",fill:"#B99BFF",ink:"#6D3FD6"},{id:"azul",label:"Azul",fill:"#62B5FF",ink:"#0B67A8"},{id:"menta",label:"Menta",fill:"#4ED3A6",ink:"#0E7A57"},{id:"grafite",label:"Grafite",fill:"#B9ADAE",ink:"#5E5253"}],Fs=["vermelho","coral","rosa","laranja","framboesa","ouro"],dt=r=>ot.find(t=>t.id===r),Vs=r=>dt(Fs[r%Fs.length]);function Kt(r,t){let e=r.replace("#",""),s=parseInt(e.length===3?e.replace(/./g,a=>a+a):e,16);return`rgba(${s>>16&255}, ${s>>8&255}, ${s&255}, ${t})`}function O(r,t,e="c"){return`--${e}:${r.fill};--${e}i:${t?r.fill:r.ink};--${e}s:${Kt(r.fill,t?.17:.15)};`}var N=r=>(r||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),Ns=r=>Array.from(r||"",t=>{if(t.length!==1)return t;let e=t.normalize("NFD")[0]||t;return e.toLowerCase().length===1?e.toLowerCase():t}).join(""),k=(r,t,e)=>`${r} ${r===1?t:e}`,Us=r=>String(r||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),S=(r,t=38)=>r.length>t?r.slice(0,t-1).trimEnd()+"\u2026":r;function Bs(r,t){let e=r.states[t],s=e&&e.attributes&&e.attributes.friendly_name||t.split(".")[1].replace(/_/g," "),a=r.entities&&r.entities[t],i=a&&a.device_id&&r.devices?r.devices[a.device_id]:void 0,o=i?i.name_by_user||i.name:void 0,d=s,n=o||null;return o&&s.toLowerCase().startsWith(o.toLowerCase()+" ")&&(d=s.slice(o.length+1)),d=d.charAt(0).toUpperCase()+d.slice(1),{name:d,group:n}}var ai=[[/shopping|compra|mercado|supermerc|feira/,"shopping-cart"],[/problem|erro|alerta|falha/,"triangle-alert"],[/update|atualiza/,"download"],[/hacs|addon|add-on|integra/,"package"],[/casa|home|lar\b/,"house"],[/conserto|manuten|reparo|obra/,"wrench"],[/trabalho|work|job|cliente/,"briefcase"],[/estudo|curso|faculdade|escola/,"graduation-cap"],[/leitura|livro|book/,"book-open"],[/viagem|trip|travel|ferias|férias/,"plane"],[/remedio|remédio|saude|saúde|farmacia/,"pill"],[/treino|academia|gym|exerc/,"dumbbell"],[/presente|gift|aniversar/,"gift"],[/ideia|idea/,"lightbulb"],[/receita|comida|jantar|almoço|almoco/,"utensils"],[/jardim|planta|horta/,"flower-2"],[/carro|auto/,"car"],[/\bpets?\b|cachorro|dog\b/,"dog"],[/gato|cat\b/,"cat"],[/filme|serie|série|tv/,"tv"],[/jogo|game/,"gamepad-2"],[/conta|financ|dinheiro|pagar/,"wallet"]];function _e(r){let t=N(r);for(let[e,s]of ai)if(e.test(t))return s;return"list-checks"}var js=["list-checks","shopping-cart","house","wrench","package","download","triangle-alert","briefcase","graduation-cap","book-open","lightbulb","star","heart","gift","plane","pill","dumbbell","utensils","flower-2","car","dog","cat","tv","gamepad-2","headphones","wallet","baby","cpu","monitor","sparkles","flame","zap"],ii=["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],ri=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Jt=r=>String(r).padStart(2,"0"),rt=r=>`${r.getFullYear()}-${Jt(r.getMonth()+1)}-${Jt(r.getDate())}`,oi=r=>`${Jt(r.getHours())}:${Jt(r.getMinutes())}`;function Xt(r){let[t,e,s]=r.split("-").map(Number);return new Date(t,e-1,s)}function be(r,t){let e=new Date(r.getFullYear(),r.getMonth(),r.getDate());return e.setDate(e.getDate()+t),e}function U(r){if(!r)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(r)){let e=Xt(r);return{date:r,time:null,at:new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59)}}let t=new Date(r);return isNaN(t)?null:{date:rt(t),time:oi(t),at:t}}function $e(r,t=new Date){let e=Xt(r),s=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-s)/864e5)}function we(r,t=new Date){let e=Xt(r),s=`${e.getDate()} ${ri[e.getMonth()]}`;return e.getFullYear()===t.getFullYear()?s:`${s} ${e.getFullYear()}`}function B(r,t=new Date){let e=U(r);if(!e)return null;let s=$e(e.date,t),a=e.at<t,i;s===0?i="Hoje":s===1?i="Amanh\xE3":s===-1?i="Ontem":s>1&&s<7?i=ii[Xt(e.date).getDay()]:i=we(e.date,t),e.time&&(i+=`, ${e.time}`);let o=a?"late":s===0?"today":s<=2?"soon":"later";return{...e,diff:s,overdue:a,text:i,tone:o}}function Ws(r=new Date){let t=r.getDay(),e=(6-t+7)%7||7,s=(1-t+7)%7||7,a=[{label:"Hoje",date:rt(r)},{label:"Amanh\xE3",date:rt(be(r,1))}];return e>1&&a.push({label:"S\xE1bado",date:rt(be(r,e))}),s>1&&a.push({label:"Pr\xF3x. semana",date:rt(be(r,s))}),a}function Ys(r,t=new Date){let e=t.getHours(),s=e>=5&&e<12?"Bom dia":e>=12&&e<18?"Boa tarde":"Boa noite",a=(r||"").trim().split(/\s+/)[0];return a?`${s}, ${a}`:s}var ni=/\bhttps?:\/\/[^\s<>"'`]+/gi;function li(r){let t;try{t=new URL(r)}catch{return{label:r,icon:"link"}}let e=t.hostname.replace(/^www\./,""),s=t.pathname.split("/").filter(Boolean);if(e==="github.com"&&s.length>=2)return{label:`${s[0]}/${s[1]}`,icon:"git-fork"};let a=s.length?s[s.length-1]:"";try{a=decodeURIComponent(a)}catch{}return a=a.replace(/\.(html?|php|aspx?)$/i,"").replace(/[-_+]+/g," ").trim(),a&&a.length>2&&!/^\d+$/.test(a)?{label:`${e} \u203A ${a}`,icon:"link"}:{label:e,icon:"link"}}function Js(r){let t=[],e=0,s=r||"";for(let a of s.matchAll(ni)){let i=a[0],o=i.match(/[.,;:!?)\]}]+$/);o&&(i=i.slice(0,-o[0].length)),a.index>e&&t.push({text:s.slice(e,a.index)}),t.push({url:i,...li(i)}),e=a.index+i.length}return e<s.length&&t.push({text:s.slice(e)}),t}var ci=/^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-](?!\d)|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u,di=/^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;function ye(r){let t=(r||"").split(/\r?\n/).map(a=>a.replace(di,"").trim()).filter(Boolean);t.length===1&&/[,;]|\se\s/i.test(t[0])&&(t=t[0].replace(/^[^:,;]{0,40}:\s*/,"").split(/\s*[,;]\s*|\s+e\s+/i));let e=new Set,s=[];for(let a of t){if(/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(a)||(a=a.replace(ci,"").replace(/[.;,]+$/,"").trim(),!a||a.length<2||/^~.*~$/.test(a)))continue;a=a.charAt(0).toUpperCase()+a.slice(1);let i=a.toLowerCase();e.has(i)||(e.add(i),s.push(a.slice(0,255)))}return s}async function ke(r,t=1800){let e=s=>new Promise((a,i)=>{let o=new FileReader;o.onload=()=>a(String(o.result).split(",")[1]||""),o.onerror=()=>i(o.error),o.readAsDataURL(s)});try{let s=await createImageBitmap(r,{imageOrientation:"from-image"}),a=Math.min(1,t/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),s.close&&s.close();let o=await new Promise(d=>i.toBlob(d,"image/jpeg",.86));return{mime:"image/jpeg",data:await e(o),url:URL.createObjectURL(o)}}catch{return{mime:r.type||"image/jpeg",data:await e(r),url:URL.createObjectURL(r)}}}var G=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,hi=r=>r>1048576?`${(r/1048576).toFixed(1).replace(".",",")} MB`:`${Math.max(1,Math.round(r/1024))} KB`,pi={"antes-de-importar":"antes de importar","antes-de-restaurar":"antes de restaurar"},Ks=r=>class extends r{_data(){return this.hass&&this.hass.resolvia&&this.hass.resolvia.data||null}_dateTime(t){let e=new Date(t),s=a=>String(a).padStart(2,"0");return`${s(e.getDate())}/${s(e.getMonth()+1)}/${e.getFullYear()} \xE0s ${s(e.getHours())}:${s(e.getMinutes())}`}async _loadBackups(){let t=this._data();if(t){try{this._backups=await t.backups()}catch(e){this._backups={available:!1,error:e.message,backups:[]}}this.requestUpdate()}}async _createBackup(){this._dataBusy="backup",this.requestUpdate();try{let t=await this._data().createBackup();this._showToast(`Backup salvo em ${t.folder}/${t.name}`),this._haptic("success"),await this._loadBackups()}catch(t){this._showToast(`N\xE3o consegui criar o backup. ${t.message}`)}this._dataBusy=null,this.requestUpdate()}_exportData(t,e){let s=this._data();(!s||!s.url(t))&&(e.preventDefault(),this._showToast("Na pr\xE9via os arquivos n\xE3o s\xE3o baixados."))}_restoredText(t,e){let s=t.added||t.added===0?`${e}: ${t.added?k(t.added,"item voltou","itens voltaram")+" para as listas":"nenhum item faltava nas listas"}, ${k(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`:`${e}: ${k(t.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`;return t.missing&&t.missing.length&&(s+=`. ${t.missing.length===1?"Lista n\xE3o encontrada":"Listas n\xE3o encontradas"}: ${t.missing.join(", ")}`),t.unsupported&&(s+=`. ${k(t.unsupported,"item ficou","itens ficaram")} de fora (a lista n\xE3o aceita itens novos)`),t.failed&&(s+=`. ${k(t.failed,"item falhou","itens falharam")}`),s}_pickDataImport(){let t=this.renderRoot.querySelector("#rv-data-import");t&&(t.value="",t.click())}_onDataImport(t){let e=t.target.files&&t.target.files[0];t.target.value="",e&&this._openSheet("confirm",{title:"Importar arquivo?",text:`Os ajustes do app (nomes, cores e \xEDcones das listas e as tarefas que se repetem) passam a ser os de \u201C${S(e.name,40)}\u201D, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje em Vers\xF5es anteriores.`,label:"Importar",run:async()=>{this._closeSheet(),this._showToast("Importando\u2026");try{let s=await this._data().import(e);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(s,"Importado"))}catch(s){this._showToast(`N\xE3o consegui importar. ${s.message}`)}}})}_confirmRestoreBackup(t){this._openSheet("confirm",{title:"Restaurar este backup?",text:`Os ajustes do app voltam a ser os do backup de ${this._dateTime(t.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet(),this._showToast("Restaurando\u2026");try{let e=await this._data().restoreBackup(t.name);await this._loadPrefs(),this._haptic("success"),this._showToast(this._restoredText(e,"Backup restaurado"))}catch(e){this._showToast(e.message)}}})}async _openVersions(){this._openSheet("versions",{list:null,error:null});try{let t=await this._data().versions();this._sheet==="versions"&&(this._form={...this._form,list:t})}catch(t){this._sheet==="versions"&&(this._form={...this._form,error:t.message})}}_confirmRestoreVersion(t){this._openSheet("confirm",{title:"Restaurar esta vers\xE3o?",text:`Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(t.when)}. Os itens das listas n\xE3o mudam. Antes, o app guarda uma c\xF3pia do que existe hoje.`,label:"Restaurar",run:async()=>{this._closeSheet();try{await this._data().restoreVersion(t.name),await this._loadPrefs(),this._haptic("success"),this._showToast("Vers\xE3o restaurada")}catch(e){this._showToast(e.message)}}})}_renderVersions(){let t=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">Versões anteriores</h3>
          <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${G("x")}</button>
        </div>
        ${t.error?l`<div class="imp-error">${G("circle-alert")}<span>${t.error}</span></div>`:t.list==null?l`<div class="imp-loading"><span class="spin">${G("loader-circle")}</span><span>Carregando…</span></div>`:t.list.length?l`<div class="data-list">
                  ${t.list.map(e=>l`<div class="data-item">
                      <div><b>${this._dateTime(e.when)}</b><span>${k(e.lists,"lista personalizada","listas personalizadas")} · ${k(e.rules,"repeti\xE7\xE3o","repeti\xE7\xF5es")} · ${pi[e.reason]||"autom\xE1tica"}</span></div>
                      <button class="btn outline sm" @click=${()=>this._confirmRestoreVersion(e)}>Restaurar</button>
                    </div>`)}
                </div>`:l`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`}
      `}_renderDataPanel(){let t=this._data();if(!t)return p;let e=this._backups,s=(a,i,o,d)=>l`<li>
        <div class="ot"><b>${i}</b><span>${o}</span></div>
        <a class="btn outline sm" href=${t.url(a)||"#"} download @click=${n=>this._exportData(a,n)}>${G("download")}${d}</a>
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
            <button class="btn primary sm" ?disabled=${this._dataBusy==="backup"||e&&e.available===!1} @click=${()=>this._createBackup()}>${G("archive")}${this._dataBusy==="backup"?"Criando\u2026":"Criar backup"}</button>
          </div>
          ${e&&e.available===!1?l`<p class="data-note">A pasta share não está disponível para o app.</p>`:p}
          ${e&&e.backups&&e.backups.length?l`<div class="data-list">
                ${e.backups.slice(0,8).map(a=>l`<div class="data-item">
                    <div><b>${this._dateTime(a.date)}</b><span title=${a.name}>${hi(a.size)} · ${a.name}</span></div>
                    <button class="btn outline sm" @click=${()=>this._confirmRestoreBackup(a)}>${G("archive-restore")}Restaurar</button>
                  </div>`)}
              </div>`:p}
        </div>
        <div class="panel">
          ${this._secHead("upload","Importar","Um .zip ou .json exportado pelo ResolvIA, sem duplicar.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._pickDataImport()}>${G("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore","Vers\xF5es anteriores","Uma c\xF3pia dos ajustes e das repeti\xE7\xF5es a cada 10 minutos de uso e antes de importar ou restaurar. Ficam as 3 mais recentes.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${()=>this._openVersions()}>${G("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database","Onde ficam os dados",l`Os itens ficam nas listas do Home Assistant; os ajustes, em <code>/data/resolvia.json</code>.`)}
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${a=>this._onDataImport(a)} />
      </div>`}};var Zt=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,Xs=[5,10,20,30,50],ht=r=>String(r||"").replace(/\s*\[cr:[0-9a-f]{8}\]\s*$/,"").replace(/\s*\[cr:[0-9a-f]{8}\]/g,""),Zs=r=>{let t=/\[cr:[0-9a-f]{8}\]/.exec(String(r||""));return t?t[0]:""},ui={semana:"toda semana",quinzena:"a cada 15 dias",mes:"todo m\xEAs"},Qs=r=>class extends r{async _loadPoints(){if(!(!this.hass||!this.hass.resolvia)){try{this._pts=await this.hass.callWS({type:"resolvia/points/get"})}catch{this._pts=null}this.requestUpdate()}}_ptsActive(){let t=this._pts;return!!(t&&t.on&&t.placar&&t.placar.ativo)}_rawPoints(t,e){let s=this._pts&&this._pts.points&&this._pts.points[t];return s&&s[Us(e)]||0}_mirrored(t,e){let s=this._pts&&this._pts.espelho&&this._pts.espelho[t];return e&&s&&s[e]||null}_pointsOf(t,e,s=null){let a=this._mirrored(t,s);return a?this._pts.on&&this._pts.placar&&this._pts.placar.ativo&&a.pontos||0:this._ptsActive()?this._rawPoints(t,e):0}async _setTaskPoints(t,e,s,a=null){try{this._pts=await this.hass.callWS({type:"resolvia/points/set",entity_id:t,summary:e,points:s||0,...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(`N\xE3o consegui salvar os pontos: ${i.message}`)}}async _setPointsOn(t){await this._saveAppPrefs({points_on:t?!0:null}),await this._loadPoints(),this._haptic("light")}async _givePoints(t,e,s,a,i=null){let o;try{o=await this.hass.callWS({type:"resolvia/points/done",entity_id:t.id,uid:e.uid,summary:e.summary,done:!0,...i?{quem:i}:{}})}catch(c){this._showToast(`${s} \xB7 os pontos n\xE3o foram: ${c.message}`,a);return}if(o&&o.ask){this._openSheet("who",{title:e.summary,points:o.points,participantes:o.participantes,run:c=>{this._closeSheet(!0),c?this._givePoints(t,e,s,a,c):this._showToast(s,a)}});return}if(!o||!o.points){this._showToast(s,a);return}let d=`Resolvido por ${o.who} \xB7 +${o.points}`,n=(o.participantes||[]).filter(c=>c!==o.who);if(n.length===1){let c=n[0];this._showToast(d,{label:`Foi ${c}`,run:()=>this.hass.callWS({type:"resolvia/points/reassign",key:o.key,quem:c}).then(()=>this._showToast(`Pontos para ${c}`)).catch(h=>this._showToast(h.message))})}else this._showToast(d,a)}_takePoints(t,e){!this._mirrored(t.id,e.uid)&&(!this._rawPoints(t.id,e.summary)||!(this._pts&&this._pts.on))||this.hass.callWS({type:"resolvia/points/done",entity_id:t.id,uid:e.uid,summary:e.summary,done:!1}).catch(()=>{})}_renderPointsTag(t,e){let s=this._pointsOf(t,e.summary,e.uid);return s?l`<span class="tag pts" title="${s} pontos para quem concluir">${Zt("trophy")}+${s}</span>`:p}_renderPointsField(t){if(t.mirrored)return p;if(!(this._pts&&this._pts.on))return p;let e=this._pts.placar,s=t.points||0,a=t.pointsCustom||s>0&&!Xs.includes(s);return l`<div class="field">
        <span class="flabel">Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!s&&!a?"on":""}" @click=${()=>this._setForm({points:0,pointsCustom:!1})}>Sem pontos</button>
          ${Xs.map(i=>l`<button class="pick ${s===i&&!a?"on":""}" @click=${()=>this._setForm({points:i,pointsCustom:!1})}>+${i}</button>`)}
          <button class="pick ${a?"on":""}" @click=${()=>this._setForm({pointsCustom:!0,points:s||15})}>${Zt("trophy")}<span>Outro</span></button>
        </div>
        ${a?l`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(s||"")} @input=${i=>this._setForm({points:Math.max(0,Math.min(1e3,parseInt(i.target.value,10)||0))})} />
              <span class="tl">pontos</span>
            </div>`:p}
        ${s?l`<div class="field-hint">${Zt("trophy")}<span>${e&&e.ativo?`Quem concluir ganha ${s} pontos no placar do CronologIA (${e.participantes.join(" \xD7 ")}).`:e&&e.desligado?"A integra\xE7\xE3o com o ResolvIA est\xE1 desligada no CronologIA.":"O placar do CronologIA est\xE1 desligado."}</span></div>`:p}
      </div>`}_renderWhoSheet(){let t=this._form;return l`
        <div class="sheet-head">
          <h3 class="display">Quem fez?</h3>
          <button class="icon-btn" @click=${()=>t.run("")} aria-label="Fechar">${Zt("x")}</button>
        </div>
        <p class="sheet-note top">${S(t.title||"",40)} · <b>+${t.points} pontos</b></p>
        <div class="who-grid">
          ${(t.participantes||[]).map(e=>l`<button class="who-btn" @click=${()=>t.run(e)}><span class="who-av">${(e||"?").trim().charAt(0).toUpperCase()}</span><b>${e}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${()=>t.run("")}>Ninguém do placar (sem pontos)</button>
      `}_renderRewardsPanel(){let t=this._pts;if(!t)return p;let e=t.placar,s=!!t.on,a=Object.values(t.points||{}).reduce((d,n)=>d+Object.keys(n).length,0),i=l`<div class="row switch-row">
          <div class="grow">
            <div class="label">Usar recompensas</div>
            <div class="hint" style="white-space:normal">${s?a?`${k(a,"tarefa vale","tarefas valem")} pontos.`:"Abra um item e escolha \u201CPontos para quem concluir\u201D.":"Desligado."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${d=>this._setPointsOn(d.target.checked)} aria-label="Usar recompensas" /><span class="track"></span></label>
        </div>`;if(!s)return l`<div class="panel" id="recompensas">
          ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
          ${i}
        </div>`;let o=e?e.desligado?{tone:"warn",title:`Integra\xE7\xE3o desligada no CronologIA ${e.versao}`.trim(),text:"Ligue em CronologIA \u203A Mais \u203A Integra\xE7\xF5es \u203A Tarefas do ResolvIA \u203A Usar a integra\xE7\xE3o para as tarefas daqui valerem pontos."}:e.ativo?{tone:"ok",title:`Conectado ao placar do CronologIA ${e.versao}`.trim(),text:`${e.participantes.join(" \xD7 ")} \xB7 fecha ${ui[e.periodo]||"toda semana"}. ${e.eu?`Neste usu\xE1rio, os pontos v\xE3o para ${e.eu}.`:"Este usu\xE1rio do Home Assistant n\xE3o est\xE1 no placar: ao concluir, o app pergunta quem fez."}`}:{tone:"warn",title:`Placar desligado no CronologIA ${e.versao}`.trim(),text:"Ligue o placar em CronologIA \u203A Recompensas para as tarefas daqui valerem pontos."}:{tone:"off",title:"CronologIA n\xE3o encontrado",text:"Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas."};return l`<div class="panel" id="recompensas">
        ${this._secHead("trophy","Recompensas","Pontos no placar do CronologIA para quem concluir.")}
        ${i}
        <div class="ai-state ${o.tone}" style="margin-bottom:16px"><span class="dot"></span><div><b>${o.title}</b><span>${o.text}</span></div></div>
      </div>`}};var nt=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,mi=864e5,Gs=5,fi=2;function Ae(r){return r<14?k(r,"dia","dias"):r<60?k(Math.floor(r/7),"semana","semanas"):r<730?k(Math.floor(r/30),"m\xEAs","meses"):k(Math.floor(r/365),"ano","anos")}var ta=r=>r.icon==="shopping-cart",ea=r=>class extends r{async _loadSuggest(){if(this._suggestAt=Date.now(),!(!this.hass||!this.hass.resolvia)){try{let t=await this.hass.callWS({type:"resolvia/suggest/get"});this._ages=t.ages||{},this._aiAsking||(this._aiPick=t.ai||null),this._aiBusy=!!t.busy||!!this._aiAsking,clearTimeout(this._aiPoll),t.busy&&!this._aiAsking&&(this._aiPoll=setTimeout(()=>this._loadSuggest(),3e3))}catch{this._ages=this._ages||{}}this.requestUpdate()}}_ageOf(t,e,s=new Date){if(this._sinceDate(t,e))return Math.max(0,-$e(U(e.due).date,s));let a=this._ages&&this._ages[t.id]&&e.uid?this._ages[t.id][e.uid]:null;return a?Math.max(0,Math.floor((s.getTime()-a)/mi)):null}_sinceDate(t,e){return!t.canDue&&!!e.due&&!!U(e.due)}_suggestLists(){return this._visible().filter(t=>!t.unavailable&&t.items&&w(t.features,$.UPDATE))}_suggestions(){let t=new Date,e=[],s=[],a=0,i=0;for(let n of this._suggestLists()){let c=n.items.filter(h=>h.status!=="completed");if(c.length){if(a+=c.length,i++,ta(n)){let h=c.map(u=>this._ageOf(n,u,t)).filter(u=>u!=null);s.push({l:n,n:c.length,oldest:h.length?Math.max(...h):null});continue}c.forEach((h,u)=>{let f=[],m=0,x=this._ageOf(n,h,t);x!=null&&x>=3&&(m+=Math.min(x,60)/3,f.push(this._sinceDate(n,h)?`Assim h\xE1 ${Ae(x)}`:`Na lista h\xE1 ${Ae(x)}`)),c.length===1?(m+=8,f.push("\xC9 o \xFAltimo da lista")):c.length===2&&(m+=4,f.push("Faltam 2 para zerar a lista"));let v=this._pointsOf(n.id,h.summary,h.uid);v&&(m+=3+Math.min(v,50)/10),this._ruleFor(n.id,h)&&(m+=4,f.push("Voltou para fazer"));let _=n.canDue&&h.due?B(h.due,t):null;if(_&&_.diff<=0){m+=_.diff<0?6:5;let E=this._mirrored(n.id,h.uid);f.push(E?`${E.tipo==="rotina"?"Rotina":"Manuten\xE7\xE3o"} do CronologIA ${_.diff<0?"atrasada":"para hoje"}`:_.diff<0?"A data j\xE1 passou":"Tem data para hoje")}u===0&&(m+=1.5),f.length||f.push(v?"Vale pontos":u===0?"Primeiro da lista":`${u+1}\xBA da lista`),e.push({l:n,i:h,idx:u,score:m,why:f.join(" \xB7 ")})})}}e.sort((n,c)=>c.score-n.score||n.idx-c.idx);let o=[],d=new Map;for(let n of e){if(n.score<=0)continue;let c=d.get(n.l.id)||0;if(!(c>=fi)&&(d.set(n.l.id,c+1),o.push(n),o.length>=Gs))break}for(let n of e){if(o.length>=Gs)break;o.includes(n)||o.push(n)}return s.sort((n,c)=>c.n-n.n),{top:o,shopping:s,pending:a,lists:i}}async _askAi(){if(this._aiBusy)return;let t=new Date,e=[];for(let s of this._suggestLists())for(let a of s.items){if(a.status==="completed"||!a.uid)continue;let i=this._ruleFor(s.id,a);e.push({key:`${s.id}|${a.uid}`,lista:s.name,texto:a.summary||"",dias:this._ageOf(s,a,t),pontos:this._pointsOf(s.id,a.summary,a.uid)||0,repete:i?i.days:0,compras:ta(s),comodo:this._roomIdsOf(s.id,a.summary).map(o=>this._roomName(o)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(s.id,a.summary).map(o=>(this._equipOf(o)||{}).nome).filter(Boolean).join(", "),externo:(o=>o===!0?"sim":o||"")(this._externalOf(s.id,a.summary))})}if(e.length){this._aiBusy=!0,this._aiAsking=!0,this._aiErr=null,this.requestUpdate();try{this._aiPick=await this.hass.callWS({type:"resolvia/ai/suggest",items:e.slice(0,150)}),this._haptic("light")}catch(s){this._aiErr=s&&s.message||"N\xE3o consegui falar com a IA."}this._aiAsking=!1,this._aiBusy=!1,this.requestUpdate()}}async _clearAi(){this._aiPick=null,this._aiErr=null,this.requestUpdate();try{await this.hass.callWS({type:"resolvia/ai/suggest/clear"})}catch{}}_aiRows(){let t=this._aiPick,e=[];for(let s of t&&t.picks||[]){let a=s.key.indexOf("|"),i=this._list(s.key.slice(0,a)),o=i&&i.items&&i.items.find(d=>d.uid===s.key.slice(a+1));i&&o&&!i.hidden&&(o.status!=="completed"||this._recent.has(o.uid))&&e.push({l:i,i:o,why:s.motivo||"Escolhido pela IA",ai:!0})}return e}_renderStart(t){let e=this._aiOn()&&!!this.hass.resolvia,s=e?this._aiInfo():null,a=e?this._aiPick:null,i=a?this._aiRows():[],o=i.length>0,d=o?i:t.top;if(!d.length&&!e)return p;let n=!!this._aiBusy;return l`<div class="panel items start ${o?"by-ai":""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${nt(o?"sparkles":"flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${d.length}</small></div>
        ${o?l`<p class="start-by">${nt("sparkles")}<span>Escolhidos pela IA.</span></p>`:p}
        ${V(d,c=>c.l.id+(c.i.uid||c.i.summary),c=>this._renderItem(c.l,c.i,{showList:!0,why:c.why,whyIcon:c.ai?"sparkles":null}))}
        ${a&&!o?l`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>`:p}
        ${e&&!s.ready&&s.reason?l`<p class="ai-note">${s.reason}</p>`:p}
        ${this._aiErr?l`<p class="ai-note err">${this._aiErr}</p>`:p}
        ${e?l`<div class="ai-actions start-acts">
              <button class="btn ${o?"outline":"primary"} sm ai-ask" ?disabled=${n||!s.ready} @click=${()=>this._askAi()}>
                ${nt(n?"loader-circle":"sparkles",n?"ai-spin":"")}${n?"Pensando\u2026":o?"Sugerir de novo":"Sugerir com IA"}
              </button>
              ${a&&!n?l`<button class="btn outline sm" @click=${()=>this._clearAi()}>${nt("rotate-ccw")}Voltar ao automático</button>`:p}
            </div>`:p}
      </div>`}_renderSuggest(){let t=this._suggestions();return l`
        <section class="page">
          ${this._renderPageHead("Sugest\xF5es",{text:t.pending?`${k(t.pending,"pendente","pendentes")} em ${k(t.lists,"lista","listas")}`:"Nada pendente"})}
          ${t.pending?l`
                ${this._renderStart(t)}
                ${t.shopping.length?l`<div class="panel">
                      <div class="mais-head"><span class="mais-ic" aria-hidden="true">${nt("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${t.shopping.length}</small></div>
                      ${t.shopping.map(e=>l`<button class="list-card" style=${O(e.l.color,this._dark)} @click=${()=>this._go(`/lista/${e.l.id}`)}>
                          <span class="tile">${nt(e.l.icon)}</span>
                          <span class="lc-main">
                            <span class="lc-title">${e.l.name}</span>
                            <span class="lc-meta"><span>${e.oldest!=null&&e.oldest>=3?`O mais antigo est\xE1 h\xE1 ${Ae(e.oldest)}`:k(e.n,"item para comprar","itens para comprar")}</span></span>
                          </span>
                          <span class="lc-num">${e.n}</span>
                        </button>`)}
                    </div>`:p}
              `:l`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${nt("lightbulb")}</div>
                  <h3>Nada para sugerir</h3>
                  <p>Todas as listas estão em dia. Quando aparecer algo pendente, as sugestões aparecem aqui.</p>
                </div>
              </div>`}
        </section>
      `}};var pt=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,Qt=r=>String(r||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\s+/g," ").trim().slice(0,255),lt=r=>Array.isArray(r)?r:r?[r]:[],sa=(r,t)=>lt(r).join("|")===lt(t).join("|"),aa=r=>class extends r{async _loadRooms(t="resolvia/rooms/get"){if(!(!this.hass||!this.hass.resolvia)){try{this._rooms=await this.hass.callWS({type:t})}catch{this._rooms=this._rooms||null}this.requestUpdate()}}_roomsOn(){let t=this._rooms;return!!(t&&t.on&&t.comodos&&t.comodos.length)}_roomList(){return this._rooms&&this._rooms.comodos||[]}_equipsOn(){let t=this._rooms;return!!(t&&t.equips_on&&t.itens&&t.itens.length)}_equipList(){return this._rooms&&this._rooms.itens||[]}_equipOf(t){return t&&this._equipList().find(e=>e.id===t)||null}_equipIdsOf(t,e){if(!this._equipsOn())return[];let s=this._rooms.emap&&this._rooms.emap[t];return lt(s&&s[Qt(e)]).filter(a=>this._equipOf(a))}_equipIdOf(t,e){return this._equipIdsOf(t,e)[0]||null}_roomsOfEquips(t){let e=lt(t).map(s=>(this._equipOf(s)||{}).comodo).filter(s=>s&&this._roomList().some(a=>a.id===s));return[...new Set(e)]}async _setTaskEquip(t,e,s,a=null){if(this._equipsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/equips/set",entity_id:t,summary:e,equips:lt(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o equipamento")}}_renderEquipTag(t,e){let s=this._equipIdsOf(t,e.summary).map(a=>this._equipOf(a));return s.length?l`${s.slice(0,2).map(a=>l`<span class="tag room">${pt("package")}${S(a.nome,26)}</span>`)}${s.length>2?l`<span class="tag room">+${s.length-2}</span>`:p}`:p}_equipItems(){return this._equipList().map(t=>({id:t.id,nome:t.nome,zona:t.zona,roomId:t.comodo,roomName:this._roomName(t.comodo)||""}))}_renderEquipField(t){if(!this._equipsOn())return p;let e=t.equips||[],s=this._roomsOn()?e.length?this._roomsOfEquips(e)[0]||null:t.room:null;return l`<div class="field">
        <span class="flabel">${e.length>1?"Equipamentos":"Equipamento"}</span>
        ${Yt({lit:{html:l,nothing:p},icon:pt,items:this._equipItems(),room:s,roomName:s&&this._roomName(s)||"",value:e,query:t.equipQ||"",more:!!t.equipMore,adding:!!t.equipAdding,autofocus:!!t.equipAdding,onQuery:a=>this._setForm({equipQ:a,equipMore:!1}),onMore:()=>this._setForm({equipMore:!0}),onAdd:()=>this._setForm({equipAdding:!0,equipQ:"",equipMore:!1}),onPick:a=>this._setForm({equips:[...e,a],equipQ:"",equipMore:!1,equipAdding:!1}),onRemove:a=>{let i=e.filter(o=>o!==a);this._setForm({equips:i,...!i.length&&this._roomsOn()?{room:this._roomsOfEquips(e)[0]||t.room||null}:{}})}})}
      </div>`}_formRooms(t){if(!this._roomsOn())return[];let e=this._equipsOn()?t.equips||[]:[];return e.length?this._roomsOfEquips(e):t.room?[t.room]:[]}async _saveTaskPlace(t,e,s,a=null){let i=this._formRooms(s),o=this._equipsOn()?s.equips||[]:[];(!sa(i,s.roomsOrig||[])||a&&(s.roomsOrig||[]).length)&&await this._setTaskRoom(t,e,i,a),(!sa(o,s.equipsOrig||[])||a&&(s.equipsOrig||[]).length)&&await this._setTaskEquip(t,e,o,a)}_placeText(t,e,{rooms:s=!0,equips:a=!0}={}){let i=s?this._roomIdsOf(t,e).map(d=>this._roomName(d)):[],o=a?this._equipIdsOf(t,e).map(d=>this._equipOf(d)):[];return[...i,...o.flatMap(d=>[d.nome,d.zona||""])].filter(Boolean).join(" ")}_roomIdsOf(t,e){if(!this._roomsOn())return[];let s=this._rooms.map&&this._rooms.map[t];return lt(s&&s[Qt(e)]).filter(a=>this._roomList().some(i=>i.id===a))}_roomIdOf(t,e){return this._roomIdsOf(t,e)[0]||null}_roomName(t){let e=this._roomList().find(s=>s.id===t);return e?e.nome:null}async _setTaskRoom(t,e,s,a=null){if(this._roomsOn())try{this._rooms=await this.hass.callWS({type:"resolvia/rooms/set",entity_id:t,summary:e,rooms:lt(s),...a!=null?{previous_summary:a}:{}}),this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar o c\xF4modo")}}_renderRoomTag(t,e){let s=this._roomIdsOf(t,e.summary);return s.length?l`${s.map(a=>l`<span class="tag room">${pt("door-open")}${S(this._roomName(a),22)}</span>`)}`:p}_renderRoomField(t){if(!this._roomsOn())return p;let e=this._equipsOn()&&(t.equips||[]).length>0,s=e?this._roomsOfEquips(t.equips):t.room?[t.room]:[];return l`<div class="field">
        <span class="flabel">${s.length>1?"C\xF4modos":"C\xF4modo"}</span>
        <div class="chip-row grid ${e?"locked":""}">
          <button class="pick ${s.length?"":"on"}" ?disabled=${e} @click=${()=>this._setForm({room:null})}>Nenhum</button>
          ${this._roomList().map(a=>l`<button class="pick room ${s.includes(a.id)?"on":""}" ?disabled=${e} @click=${()=>this._setForm({room:t.room===a.id?null:a.id})}>${pt("door-open")}<span>${S(a.nome,22)}</span></button>`)}
        </div>
        ${e?l`<span class="field-hint">${pt("lock")}<span>Vem ${t.equips.length>1?"dos equipamentos":"do equipamento"}.</span></span>`:p}
      </div>`}_renderRoomsPanel(){if(!this.hass.resolvia)return p;let t=this._rooms||{},e=this._app("rooms_on",!1)===!0,s=this._app("equips_on",!1)===!0,a=(t.comodos||[]).length,i=(t.itens||[]).length,o=(n,c,h,u)=>l`<div class="row switch-row">
        <div class="grow"><div class="label">${n}</div><div class="hint" style="white-space:normal">${c?h:"Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${c} @change=${f=>u(f.target.checked)} aria-label=${n} /><span class="track"></span></label>
      </div>`,d=p;if(e||s){let n=[e&&a?k(a,"c\xF4modo","c\xF4modos"):"",s&&i?k(i,"equipamento","equipamentos"):""].filter(Boolean).join(" \xB7 "),c=this._roomsBusy?"off":n?t.erro?"warn":"ok":"bad",h=this._roomsBusy?"Verificando\u2026":n||(t.encontrado?"Nada cadastrado":"InventarIA n\xE3o encontrado"),u=this._roomsBusy?"":t.erro||(n?e&&a?t.comodos.map(f=>f.nome).join(", "):"":t.encontrado?"Cadastre os c\xF4modos e os itens no InventarIA.":"Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");d=l`<div class="ai-state ${c}"><span class="dot"></span><div><b>${h}</b>${u?l`<span>${u}</span>`:p}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${()=>this._refreshRooms()}>${pt("rotate-ccw")}Verificar de novo</button></div>`}return l`<div class="panel" id="comodos">
        ${this._secHead("house","InventarIA","Para ligar uma tarefa a um c\xF4modo ou a um equipamento da casa.")}
        ${o("Usar c\xF4modos",e,"Cada tarefa pode ter um c\xF4modo, e a IA sugere qual.",n=>this._toggleRooms(n))}
        ${o("Usar equipamentos",s,"Cada tarefa pode ser de um equipamento ou m\xF3vel, e a IA sugere qual.",n=>this._toggleEquips(n))}
        ${d}
      </div>`}async _toggleEquips(t){await this._saveAppPrefs({equips_on:t?!0:null}),await this._refreshRooms()}async _toggleRooms(t){await this._saveAppPrefs({rooms_on:t?!0:null}),await this._refreshRooms()}async _refreshRooms(){this._roomsBusy=!0,this.requestUpdate(),await this._loadRooms("resolvia/rooms/refresh"),this._roomsBusy=!1,this.requestUpdate()}};function ia({lit:r,icon:t,messages:e=[],draft:s="",busy:a=!1,error:i="",voice:o=null,examples:d=[],onDraft:n,onSend:c,onMic:h,onAction:u,onAll:f,onClear:m,onClose:x}){let{html:v,nothing:_}=r,E=()=>{let y=(s||"").trim();y&&!a&&c(y)},b=(y,C,T,R)=>v`<div class="chat-act ${T.state||"todo"}">
    <span class="chat-act-ic">${t(T.state==="done"?"check":T.state==="failed"?"circle-alert":T.icon||"sparkles")}</span>
    <span class="chat-act-tx">${T.label}${T.note?v`<small>${T.note}</small>`:_}</span>
    ${T.state==="done"?v`<span class="chat-act-ok">Feito</span>`:T.state==="doing"?v`<span class="chat-act-ok">…</span>`:v`<button type="button" class="btn primary sm" @click=${()=>u(C,R)}>${T.state==="failed"?"Tentar de novo":"Fazer"}</button>`}
  </div>`,M=(y,C)=>{let T=(y.actions||[]).filter(R=>R.state!=="done"&&R.state!=="doing").length;return v`<div class="chat-msg ${y.role==="user"?"me":"ia"}">
      ${y.text?v`<div class="chat-bubble">${y.text}</div>`:_}
      ${(y.actions||[]).length?v`<div class="chat-acts">
            ${y.actions.map((R,St)=>b(y,C,R,St))}
            ${T>1?v`<button type="button" class="btn outline sm chat-all" @click=${()=>f(C)}>Fazer todas (${T})</button>`:_}
          </div>`:_}
    </div>`},A=o&&o.on;return v`<div class="chat">
    <div class="chat-head">
      <span class="chat-title">${t("message-circle")}Conversa</span>
      ${e.length?v`<button type="button" class="text-btn" @click=${()=>m()}>Nova</button>`:_}
      <button type="button" class="icon-btn" aria-label="Fechar" @click=${()=>x()}>${t("x")}</button>
    </div>
    <div class="chat-log">
      ${e.length?e.map(M):v`<div class="chat-empty">
            <p>Pergunte sobre esta tela ou sobre qualquer assunto. Se pedir para mudar algo, eu mostro antes de fazer.</p>
            ${d.length?v`<div class="chat-ex">${d.map(y=>v`<button type="button" class="pick" @click=${()=>c(y)}>${y}</button>`)}</div>`:_}
          </div>`}
      ${a?v`<div class="chat-msg ia"><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>`:_}
      ${i?v`<div class="chat-error">${t("circle-alert")}<span>${i}</span></div>`:_}
    </div>
    <form class="chat-input" @submit=${y=>(y.preventDefault(),E())}>
      <textarea rows="1" .value=${s} placeholder=${A?"Ouvindo\u2026":"Escreva aqui\u2026"} aria-label="Mensagem para a IA" ?disabled=${A}
        @input=${y=>n(y.target.value)}
        @keydown=${y=>{y.key==="Enter"&&!y.shiftKey&&!y.isComposing&&(y.preventDefault(),E())}}></textarea>
      ${o&&o.ready?v`<button type="button" class="icon-btn chat-mic ${A?"on":""}" aria-label=${A?"Pronto: enviar o que falei":"Falar"} ?disabled=${a||o.starting} @click=${()=>h()}>${t(A?"check":"mic")}</button>`:_}
      <button type="submit" class="icon-btn chat-send" aria-label="Enviar" ?disabled=${a||A||!(s||"").trim()}>${t("send")}</button>
    </form>
  </div>`}var ra=`
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
`;var ut=class{constructor(t){this.onLevel=t,this.chunks=[],this.length=0,this.rate=16e3}async start(){let t=navigator.mediaDevices;if(!t||!t.getUserMedia)throw Object.assign(new Error("no_api"),{name:"NoApi"});this.stream=await t.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});let e=window.AudioContext||window.webkitAudioContext;try{this.ctx=new e({sampleRate:16e3})}catch{this.ctx=new e}this.ctx.state==="suspended"&&await this.ctx.resume().catch(()=>{}),this.rate=this.ctx.sampleRate,this.src=this.ctx.createMediaStreamSource(this.stream),this.node=this.ctx.createScriptProcessor(4096,1,1),this.node.onaudioprocess=s=>{let a=s.inputBuffer.getChannelData(0);this.chunks.push(new Float32Array(a)),this.length+=a.length;let i=0;for(let o=0;o<a.length;o+=4)i+=a[o]*a[o];this.onLevel&&this.onLevel(Math.min(1,Math.sqrt(i/(a.length/4))*5))},this.src.connect(this.node),this.node.connect(this.ctx.destination)}seconds(){return this.length/this.rate}stop(){this._close();let t=new Float32Array(this.length),e=0;for(let o of this.chunks)t.set(o,e),e+=o.length;this.chunks=[];let s=this.rate/16e3,a=Math.floor(t.length/s),i=new Int16Array(a);for(let o=0;o<a;o++){let d=Math.floor(o*s),n=Math.max(d+1,Math.min(t.length,Math.floor((o+1)*s))),c=0;for(let u=d;u<n;u++)c+=t[u];let h=Math.max(-1,Math.min(1,c/(n-d)));i[o]=h<0?h*32768:h*32767}return i}cancel(){this._close(),this.chunks=[],this.length=0}_close(){try{this.node&&(this.node.onaudioprocess=null),this.src&&this.src.disconnect(),this.node&&this.node.disconnect()}catch{}if(this.stream)for(let t of this.stream.getTracks())t.stop();this.ctx&&this.ctx.state!=="closed"&&this.ctx.close().catch(()=>{}),this.stream=null,this.node=null,this.src=null}};function Gt(r){let t=r&&r.name||"";return t==="NotAllowedError"||t==="SecurityError"?"O microfone est\xE1 bloqueado. Permita o microfone para o Home Assistant (no navegador, no cadeado ao lado do endere\xE7o; no app do celular, nas permiss\xF5es do app Home Assistant) e tente de novo.":t==="NotFoundError"||t==="OverconstrainedError"?"N\xE3o achei um microfone neste aparelho.":t==="NotReadableError"?"O microfone est\xE1 sendo usado por outro app. Feche o outro e tente de novo.":t==="NoApi"?window.isSecureContext===!1?"O microfone aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), o celular e o navegador n\xE3o deixam usar o microfone, nem pelo app do Home Assistant.":"Este navegador n\xE3o deixa usar o microfone aqui.":`N\xE3o consegui abrir o microfone (${r&&r.message||t||"erro"}).`}var oa=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,na=r=>r.status==="completed",la="resolvia-conversa",ca=r=>class extends r{_chatState(){if(!this._chat){let t=[];try{t=JSON.parse(sessionStorage.getItem(la)||"[]")}catch{}this._chat={messages:Array.isArray(t)?t:[],draft:"",busy:!1,error:"",rec:null}}return this._chat}_setChat(t){if(this._chat={...this._chatState(),...t},"messages"in t)try{sessionStorage.setItem(la,JSON.stringify(this._chat.messages.slice(-30)))}catch{}this.requestUpdate()}_renderChatBtn(){return!this._aiOn()||!this.hass.resolvia?p:l`<button class="mic-top chat-top" aria-label="Conversar com a IA" title="Conversar com a IA" @click=${()=>this._openChat()}>${oa("message-circle")}</button>`}_openChat(){this._openSheet("chat",{}),this._chatScroll=!0,this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".chat-input textarea");t&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches&&t.focus()})}_renderChatSheet(){let t=this._chatState(),e=this._voice||{};return ia({lit:{html:l,nothing:p},icon:oa,messages:t.messages,draft:t.draft,busy:t.busy,error:t.error,voice:{ready:!!e.ready&&this._micOk(),on:t.rec==="on",starting:t.rec==="starting"},examples:this._chatExamples(),onDraft:s=>this._setChat({draft:s}),onSend:s=>this._chatSend(s),onMic:()=>this._chatMic(),onAction:(s,a)=>this._chatDo(s,a),onAll:s=>this._chatDoAll(s),onClear:()=>this._setChat({messages:[],error:""}),onClose:()=>this._closeSheet()})}_micOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_chatExamples(){let t=this._view();if(t.name==="list"){let e=this._list(t.id);return e?[`O que \xE9 mais urgente em ${S(e.name,24)}?`,"Por onde eu come\xE7o hoje?"]:[]}return["O que est\xE1 atrasado?","Por onde eu come\xE7o hoje?","Adiciona leite na lista de compras"]}_chatScreen(){let t=this._view();if(t.name==="list"){let e=this._list(t.id);return e?`a lista "${e.name}"`:"uma lista"}return t.name==="search"?this._query?`Buscar, procurando "${this._query}"`:"Buscar":t.name==="due"?"Prazos (o que vence e o que est\xE1 atrasado)":t.name==="suggest"?"Sugest\xF5es (por onde come\xE7ar)":t.name==="more"?"Mais (o menu: Listas, Repeti\xE7\xF5es e Configura\xE7\xF5es)":t.name==="listas"?"Mais \u203A Listas (nome, cor, \xEDcone e quais listas aparecem)":t.name==="repeticoes"?"Mais \u203A Repeti\xE7\xF5es (as tarefas que voltam sozinhas)":t.name==="config"?"Mais \u203A Configura\xE7\xF5es (integra\xE7\xF5es, dados, apar\xEAncia e op\xE7\xF5es do app)":"o in\xEDcio, com todas as listas"}_chatContext(){let t=this._view(),e=this._visible().slice(),s=t.name==="list"?this._list(t.id):null;s&&!e.includes(s)&&e.unshift(s),e.sort((i,o)=>+(o===s)-+(i===s));let a=new Date;return{tela:this._chatScreen(),listas:e.map(i=>{let o=(i.items||[]).filter(d=>!na(d));return{id:i.id,nome:i.name,adicionar:w(i.features,$.CREATE)&&!i.unavailable,prazos:!i.noDue&&w(i.features,$.DUE_DATE),pendentes:o.length,itens:o.slice(0,i===s?120:40).map(d=>{let n=U(d.due),c=n?B(d.due,a):null;return{texto:d.summary||"",prazo:n&&!i.noDue?n.date:null,atrasado:!!(c&&c.tone==="late"&&!i.noDue),pontos:this._pointsOf&&this._pointsOf(i.id,d.summary,d.uid)||0,comodo:this._roomIdsOf(i.id,d.summary).map(h=>this._roomName(h)).filter(Boolean).join(", "),equipamento:this._equipIdsOf(i.id,d.summary).map(h=>(this._equipOf(h)||{}).nome).filter(Boolean).join(", "),externo:(h=>h===!0?"sim":h||"")(this._externalOf(i.id,d.summary))}})}})}}async _chatSend(t){let e=this._chatState();if(e.busy)return;let s=[...e.messages,{role:"user",text:t}];this._setChat({messages:s,draft:"",busy:!0,error:""}),this._chatScroll=!0;try{let a=await this.hass.callWS({type:"resolvia/ai/chat",messages:s.map(o=>({role:o.role,text:o.text||(o.actions||[]).map(d=>d.label).join("; ")})),context:this._chatContext()}),i=(a.actions||[]).map(o=>({...o,label:this._chatLabel(o),icon:o.tipo==="concluir"?"check":"plus",state:"todo"}));this._setChat({messages:[...this._chatState().messages,{role:"ia",text:a.reply||"",actions:i}],busy:!1})}catch(a){this._setChat({busy:!1,error:a.message||"A IA n\xE3o respondeu. Tente de novo."})}this._chatScroll=!0}_chatLabel(t){return t.tipo==="concluir"?`Concluir "${S(t.item,60)}" em ${S(t.nome,30)}`:`Adicionar "${S(t.item,60)}" em ${S(t.nome,30)}${t.prazo?` \xB7 prazo ${t.prazo.slice(8,10)}/${t.prazo.slice(5,7)}`:""}`}_setAction(t,e,s){let a=this._chatState().messages.map((i,o)=>o===t?{...i,actions:i.actions.map((d,n)=>n===e?{...d,...s}:d)}:i);this._setChat({messages:a})}async _chatDo(t,e){let s=((this._chatState().messages[t]||{}).actions||[])[e];if(!s||s.state==="done"||s.state==="doing")return;this._setAction(t,e,{state:"doing",note:""});let a=this._list(s.lista),i=!1,o="";if(!a)o="Lista n\xE3o encontrada.";else if(s.tipo==="adicionar")i=await this._addFull(a,{summary:s.item,description:"",date:s.prazo||null,time:null});else{let d=(a.items||[]).find(n=>!na(n)&&N(n.summary)===N(s.item));d?(await this._toggle(a,d),i=!0):o="Esse item n\xE3o est\xE1 mais pendente."}this._setAction(t,e,{state:i?"done":"failed",note:i?"":o||"N\xE3o deu certo."})}async _chatDoAll(t){let e=(this._chatState().messages[t]||{}).actions||[];for(let s=0;s<e.length;s++)e[s].state!=="done"&&await this._chatDo(t,s)}async _chatMic(){let t=this._chatState();if(t.rec==="on"){let s=this._chatRec;if(this._chatRec=null,clearTimeout(this._chatRecTimer),!s)return this._setChat({rec:null});let a=s.stop();if(this._setChat({rec:null}),a.length<16e3*.4)return this._setChat({error:"N\xE3o ouvi nada. Toque no microfone e fale."});this._setChat({busy:!0,error:""});try{let i=await this.hass.resolvia.voiceText(a);this._setChat({busy:!1}),i&&i.text&&this._chatSend(i.text)}catch(i){this._setChat({busy:!1,error:i.message||"N\xE3o consegui transcrever."})}return}if(t.rec)return;let e=new ut(()=>{});this._chatRec=e,this._setChat({rec:"starting",error:""});try{await e.start()}catch(s){return e.cancel(),this._chatRec=null,this._setChat({rec:null,error:Gt(s)})}if(this._chatRec!==e)return e.cancel();this._setChat({rec:"on"}),this._chatRecTimer=setTimeout(()=>this._chatState().rec==="on"&&this._chatMic(),120*1e3)}_chatStop(){clearTimeout(this._chatRecTimer),this._chatRec&&this._chatRec.cancel(),this._chatRec=null,this._chat&&this._chat.rec&&(this._chat={...this._chat,rec:null})}_chatAfterRender(){if(!this._chatScroll||this._sheet!=="chat")return;this._chatScroll=!1;let t=this.renderRoot.querySelector(".chat-log");t&&(t.scrollTop=t.scrollHeight)}};var Te=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,mt=r=>r===!0?!0:typeof r=="string"&&r.trim()?r.replace(/\s+/g," ").trim().slice(0,60):null,da=r=>class extends r{async _loadExternal(){if(!(!this.hass||!this.hass.resolvia)){try{this._ext=(await this.hass.callWS({type:"resolvia/external/get"})).ext||{}}catch{this._ext=this._ext||{}}this.requestUpdate()}}_externalOf(t,e){let s=this._ext&&this._ext[t];return mt(s&&s[Qt(e)])}_externalText(t,e){let s=this._externalOf(t,e);return s?s===!0?"Servi\xE7o externo":`Servi\xE7o externo ${s}`:""}async _setTaskExternal(t,e,s,a=null){if(!(!this.hass||!this.hass.resolvia))try{this._ext=(await this.hass.callWS({type:"resolvia/external/set",entity_id:t,summary:e,value:mt(s),...a!=null?{previous_summary:a}:{}})).ext||{},this.requestUpdate()}catch(i){this._showToast(i.message||"N\xE3o consegui guardar quem faz")}}async _saveTaskExternal(t,e,s,a=null){let i=mt(s.ext),o=mt(s.extOrig);(i!==o||a&&o)&&await this._setTaskExternal(t,e,i,a)}_renderExternalTag(t,e){let s=this._externalOf(t,e.summary);return s?l`<span class="tag ext">${Te("hard-hat")}${s===!0?"Servi\xE7o externo":S(s,26)}</span>`:p}_renderExternalField(t,e=$.DUE_DATE|$.DESCRIPTION){let s=mt(t.ext);return!s&&!w(e,$.DUE_DATE)&&!w(e,$.DUE_DATETIME)&&!w(e,$.DESCRIPTION)?p:l`<div class="field">
        <span class="flabel">Quem faz</span>
        <div class="chip-row ext-row">
          <button class="pick ${s?"":"on"}" @click=${()=>this._setForm({ext:null})}>${Te("house")}<span>Nós mesmos</span></button>
          <button class="pick ${s?"on":""}" @click=${()=>this._setForm({ext:s||!0})}>${Te("hard-hat")}<span>Serviço externo</span></button>
        </div>
        ${s?l`<input type="text" class="ext-who" maxlength="60" .value=${s===!0?"":s} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
              @input=${a=>this._setForm({ext:mt(a.target.value)||!0})} />`:p}
      </div>`}};var ha="2.37.0",pa="resolvia.theme",Ee="resolvia.prefs",te="resolvia.lastList",g=(r,t="")=>l`<svg class="i ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${D(z[r]||z["list-checks"])}</svg>`,Y={get(r,t){try{let e=localStorage.getItem(r);return e==null?t:JSON.parse(e)}catch{return t}},set(r,t){try{localStorage.setItem(r,JSON.stringify(t))}catch{}}},L=r=>r.status==="completed",ua=[{days:1,label:"Todo dia"},{days:2,label:"2 dias"},{days:3,label:"3 dias"},{days:7,label:"1 semana"},{days:14,label:"2 semanas"},{days:30,label:"1 m\xEAs"}],I=r=>r.uid||r.summary,At=["listas","repeticoes","config"],Ie=class extends da(ca(aa(ea(Qs(Ks(Z)))))){static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_items:{state:!0},_prefs:{state:!0},_path:{state:!0},_sheet:{state:!0},_form:{state:!0},_toast:{state:!0},_query:{state:!0},_searchDone:{state:!0},_searchRooms:{state:!0},_searchEquips:{state:!0},_searchExt:{state:!0},_theme:{state:!0},_doneOpen:{state:!0},_sel:{state:!0},_rules:{state:!0},_cam:{state:!0},_rooms:{state:!0},_rulesOk:{state:!0},_pts:{state:!0},_aiState:{state:!0},env:{attribute:!1}};static styles=[As,W(Os),W(Hs),W(Rs),W(ra)];constructor(){super(),this._items=new Map,this._subs=new Map,this._polling=new Set,this._recent=new Map,this._prefs={lists:{},app:{}},this._prefsLoaded=!1,this._prefsRemote=!1,this._path="",this._sheet=null,this._form=null,this._toast=null,this._query="",this._searchDone=!1,this._searchRooms=!0,this._searchEquips=!0,this._searchExt=!0,this._theme=Y.get(pa,"auto"),this._doneOpen={},this._lastTodoStates=null,this._L=[],this._rules=[],this._cam=null,this._rulesOk=!1,this._rulesUnsub=null,this._aiState=null,this._aiAt=0,this.env=null,this._onPopState=this._onPopState.bind(this),this._onResize=this._checkHeight.bind(this),this._mql=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null,this._onScheme=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),ws(),this._today=new Date().toDateString(),this._dayTimer=setInterval(()=>{let t=new Date().toDateString();t!==this._today&&(this._today=t,this.requestUpdate())},6e4),window.addEventListener("popstate",this._onPopState),window.addEventListener("resize",this._onResize),window.addEventListener("keydown",this._onKey),this._mql&&this._mql.addEventListener&&this._mql.addEventListener("change",this._onScheme),this.hass&&this._syncSubscriptions()}_onKey=t=>{if(t.key!=="/"||t.ctrlKey||t.metaKey||t.altKey||this._sheet)return;let e=t.composedPath&&t.composedPath()[0]||t.target;e&&e.closest&&e.closest("input, textarea, select, [contenteditable]")||(t.preventDefault(),this._toSearch())};_toSearch(){this._focusSearch=!0,this._view().name==="search"?this._focusSearchBox():this._go("/buscar")}_focusSearchBox(){let t=this.renderRoot&&this.renderRoot.querySelector("input[data-q='buscar']");if(t){this._focusSearch=!1,t.focus({preventScroll:!0});try{t.setSelectionRange(t.value.length,t.value.length)}catch{}}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._dayTimer),window.removeEventListener("popstate",this._onPopState),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._onKey),this._mql&&this._mql.removeEventListener&&this._mql.removeEventListener("change",this._onScheme);for(let[,t]of this._subs)this._unsub(t);this._subs.clear();for(let[,t]of this._recent)clearTimeout(t);this._recent.clear(),clearTimeout(this._toastTimer),this._stopStream(),this._rulesUnsub&&this._rulesUnsub.then(t=>t&&t()).catch(()=>{}),this._rulesUnsub=null}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this.hass||e.themes!==this.hass.themes||e.entities!==this.hass.entities||e.devices!==this.hass.devices||e.user!==this.hass.user||e.connected!==this.hass.connected)return!0;let s=Object.keys(this.hass.states).filter(i=>i.startsWith("todo.")),a=Object.keys(e.states).filter(i=>i.startsWith("todo."));return s.length!==a.length?!0:s.some(i=>e.states[i]!==this.hass.states[i])}willUpdate(t){t.has("route")&&this.route&&(this._path=this.route.path||""),t.has("hass")&&this.hass&&(this._prefsLoaded||(this._prefsLoaded=!0,this._loadPrefs(),this._loadPoints(),this._loadRooms(),this._loadExternal()),!this._rulesUnsub&&this.isConnected&&this._subscribeRules(),!this._voiceAsked&&this.hass.resolvia&&this.hass.resolvia.voiceStatus&&(this._voiceAsked=!0,this._loadVoice()),this._syncSubscriptions(),this._refreshPolled(t.get("hass"))),this._dark=this._isDark(),this._L=this.hass?this._computeLists():[]}updated(t){this.toggleAttribute("dark",this._dark),this._chatAfterRender();let e=this._view();if(e.old&&t.has("_path")){this._go(e.old,!0,history.state&&history.state.rvUp?{rvUp:!0}:null);return}if(t.has("_path")&&e.name==="config"){let s=this.renderRoot.querySelector(".more-tabs"),a=s&&s.querySelector("button.on");if(a){let o=a.offsetLeft,d=o+a.offsetWidth;o<s.scrollLeft?s.scrollLeft=o-8:d>s.scrollLeft+s.clientWidth&&(s.scrollLeft=d-s.clientWidth+8)}let i=this._configTab();i==="integracoes"&&(this._refreshAi(!1),this._loadPoints(),this._loadRooms(),this._loadExternal(),this._loadUsage()),i==="dados"&&this._loadBackups()}this._view().name==="search"&&(this._focusSearch||t.has("_path")&&window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches)&&this._focusSearchBox(),this._view().name==="suggest"&&Date.now()-(this._suggestAt||0)>6e4&&this._loadSuggest()}firstUpdated(){this._checkHeight()}_checkHeight(){if(this.hasAttribute("vh"))return;let t=this.getBoundingClientRect().height;(t>window.innerHeight+4||t<100)&&this.setAttribute("vh","")}_isDark(){return this._theme==="dark"?!0:this._theme==="light"?!1:this.hass&&this.hass.themes&&typeof this.hass.themes.darkMode=="boolean"?this.hass.themes.darkMode:!!(this._mql&&this._mql.matches)}_todoIds(){return Object.keys(this.hass.states).filter(t=>t.startsWith("todo."))}_syncSubscriptions(){if(!this.hass||!this.hass.connection||!this.isConnected)return;let t=this._todoIds();for(let e of t)this._subs.has(e)||this._subscribe(e);for(let[e,s]of[...this._subs])if(!t.includes(e)){this._unsub(s),this._subs.delete(e),this._polling.delete(e);let a=new Map(this._items);a.delete(e),this._items=a}}_subscribe(t){let e=this.hass.connection.subscribeMessage(s=>this._setItems(t,s&&s.items||[]),{type:"todo/item/subscribe",entity_id:t}).catch(()=>(this._polling.add(t),this._fetchItems(t),null));this._subs.set(t,e)}_unsub(t){Promise.resolve(t).then(e=>typeof e=="function"&&e()).catch(()=>{})}async _fetchItems(t){try{let e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._setItems(t,e&&e.items||[])}catch{this._setItems(t,this._items.get(t)||[])}}_refreshPolled(t){if(!(!t||!this._polling.size))for(let e of this._polling)t.states[e]!==this.hass.states[e]&&this._fetchItems(e)}_setItems(t,e){let s=new Map(this._items);s.set(t,e),this._items=s}_patchItem(t,e,s){let a=this._items.get(t);a&&this._setItems(t,a.map(i=>I(i)===e?{...i,...s}:i))}_computeLists(){let t=this._prefs&&this._prefs.lists||{},e=!this._dueOn(),a=this._todoIds().map(i=>{let o=this.hass.states[i],d=Bs(this.hass,i);return{id:i,st:o,meta:d}});return a.sort((i,o)=>(i.meta.group||"").localeCompare(o.meta.group||"","pt-BR")||i.meta.name.localeCompare(o.meta.name,"pt-BR")),a.map(({id:i,st:o,meta:d},n)=>{let c=t[i]||{},h=this._items.get(i),u=h?h.filter(A=>!L(A)):null,f=u?u.length:Number(o.state)||0,m=h?h.length-u.length:0,x=dt(c.color)||Vs(n),v=o.attributes.supported_features||0,_=w(v,$.DUE_DATE)||w(v,$.DUE_DATETIME),E=!_||c.dates_info===!0,b=E||e,M=u&&!b?u.map(A=>B(A.due)).filter(Boolean):[];return{id:i,name:c.name||d.name,origName:d.name,group:d.group,color:x,colorId:c.color||null,icon:c.icon||_e(`${d.name} ${d.group||""} ${i}`),iconPref:c.icon||null,hidden:!!c.hidden,features:v,canDue:_,datesInfo:E,noDue:b,hasDates:!!(h&&h.some(A=>A.due)),unavailable:o.state==="unavailable"||o.state==="unknown",items:h,pending:f,done:m,late:M.filter(A=>A.overdue).length,today:M.filter(A=>!A.overdue&&A.diff===0).length}})}_list(t){return this._L.find(e=>e.id===t)}_visible(){return this._L.filter(t=>!t.hidden)}_app(t,e){let s=this._prefs&&this._prefs.app?this._prefs.app[t]:void 0;return s===void 0?e:s}_accentDaily(){return this._app("accent_daily",!0)!==!1}_accent(){return this._accentDaily()?Ps(ot,new Date):dt(this._app("accent","vermelho"))||ot[0]}async _loadPrefs(){try{let t=await this.hass.callWS({type:"resolvia/prefs/get"});this._prefs={lists:t.lists||{},app:t.app||{}},this._prefsRemote=!0}catch{this._prefs=Y.get(Ee,{lists:{},app:{}}),this._prefsRemote=!1}}async _saveListPrefs(t,e){let s={...this._prefs.lists},a={...s[t]||{}};for(let[i,o]of Object.entries(e))o===null||o===""?delete a[i]:a[i]=o;if(Object.keys(a).length?s[t]=a:delete s[t],this._prefs={...this._prefs,lists:s},this._prefsRemote)try{let i=await this.hass.callWS({type:"resolvia/prefs/set_list",entity_id:t,prefs:e});this._prefs={lists:i.lists||{},app:i.app||{}}}catch{this._showToast("N\xE3o consegui salvar a personaliza\xE7\xE3o")}else Y.set(Ee,this._prefs)}async _saveAppPrefs(t){let e={...this._prefs.app};for(let[s,a]of Object.entries(t))a===null||a===""?delete e[s]:e[s]=a;if(this._prefs={...this._prefs,app:e},this._prefsRemote)try{let s=await this.hass.callWS({type:"resolvia/prefs/set_app",prefs:t});this._prefs={lists:s.lists||{},app:s.app||{}}}catch{this._showToast("N\xE3o consegui salvar a prefer\xEAncia")}else Y.set(Ee,this._prefs)}_setTheme(t){this._theme=t,Y.set(pa,t)}_inHA(){return!!this.route}_view(){let t=(this._path||"").replace(/\/+$/,""),e;if(e=t.match(/^\/lista\/(todo\.[^/]+)$/))return{name:"list",id:decodeURIComponent(e[1])};if(t==="/prazos"&&this._dueOn())return{name:"due"};if(t==="/sugestoes"&&!this._dueOn())return{name:"suggest"};if(t==="/buscar")return{name:"search"};if(t==="/mais")return{name:"more"};if(t==="/listas")return{name:"listas"};if(t==="/repeticoes")return{name:this._rulesOk?"repeticoes":"more"};if(e=t.match(/^\/config(?:\/(integracoes|dados|aparencia|opcoes))?$/))return{name:"config",tab:e[1]||"integracoes"};if(e=t.match(/^\/mais\/(repeticoes|integracoes|ia|dados|aparencia|opcoes)$/)){if(e[1]==="repeticoes")return{name:this._rulesOk?"repeticoes":"more",old:"/repeticoes"};let s=e[1]==="ia"?"integracoes":e[1];return{name:"config",tab:s,old:this._configPath(s)}}return{name:"home"}}_configPath(t){return t==="integracoes"?"/config":`/config/${t}`}_go(t,e=!1,s=null){this._sheet&&this._closeSheet(!0);let a=(history.state&&history.state.rvDepth||0)+(e?0:1),i={...s||{},rvDepth:a};if(this._inHA()){let d=`/${this.panel&&this.panel.url_path||"resolvia"}${t}`;e?history.replaceState(i,"",d):history.pushState(i,"",d),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:e}}))}else i.rvPath=t,e?history.replaceState(i,""):history.pushState(i,""),this._path=t;let o=this.renderRoot&&this.renderRoot.querySelector("main");o&&o.scrollTo({top:0,behavior:"instant"})}_back(){history.state&&history.state.rvDepth>0?history.back():this._go("",!0)}_fromMenu(){return At.includes(this._view().name)&&!!(history.state&&history.state.rvUp)}_toMenu(){this._fromMenu()?history.back():this._go("/mais",!0)}_openFromMenu(t){this._haptic("light"),this._go(t,!1,{rvUp:!0})}_onSwipeStart(t){this._sw=this._sheet||this._cam?null:ys(t)}_onSwipeEnd(t){let e=ks(t,this._sw);if(this._sw=null,!e||this._sheet)return;let s=this._dueOn(),a=[["home",""],["search","/buscar"],[s?"due":"suggest",s?"/prazos":"/sugestoes"],["more","/mais"]],i=this._view().name;if(i==="list"){if(e>0)return;this._haptic("light"),this._back(),Bt(this,"home",e);return}if(At.includes(i)){if(e>0)return;this._haptic("light"),this._toMenu(),Bt(this,"more",e);return}let o=a.findIndex(([n])=>n===i),d=o+e;o<0||d<0||d>=a.length||(this._haptic("light"),this._goTab(a[d][1]),Bt(this,a[d][0],e))}_goTab(t){let e=this._view().name;if(At.includes(e)){if(t==="/mais")return this._toMenu();if(this._fromMenu())return t===""?history.go(-2):(this._afterPop=t,history.back())}if(t===""){if(e==="home"){let s=this.renderRoot.querySelector("main");s&&s.scrollTo({top:0});return}this._back();return}this._go(t,e!=="home"&&e!=="list")}_onPopState(){this._cam&&!(history.state&&history.state.rvCam)&&this._closeCamera(!0),this._sheet&&!(history.state&&history.state.rvSheet)&&(this._sheet=null,this._form=null),this._inHA()||(this._path=history.state&&history.state.rvPath||"");let t=this._afterPop;this._afterPop=null,t!=null&&this._go(t,!0)}_openSheet(t,e=null){let s=!!this._sheet;if(this._sheet=t,this._form=e,!s)try{history.pushState({...history.state||{},rvSheet:!0},"")}catch{}}_closeSheet(t=!1){this._sheet&&(this._stopVoice(),this._chatStop(),this._sheet=null,this._form=null,history.state&&history.state.rvSheet&&(t?history.replaceState({...history.state,rvSheet:!1},""):history.back()))}_goAiSettings(){this._closeSheet(!0),this._go("/config"),this.updateComplete.then(()=>{let t=this.renderRoot.querySelector("#leitura-ia");t&&t.scrollIntoView({block:"start",behavior:"smooth"})})}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_openInHA(t){if(this._closeSheet(!0),this.env&&this.env.openInHA)return this.env.openInHA(t);history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_haptic(t){if(this.env&&this.env.haptic)return this.env.haptic(t);window.dispatchEvent(new CustomEvent("haptic",{detail:t}))}_subscribeRules(){!this.hass||!this.hass.connection||(this._rulesUnsub=this.hass.connection.subscribeMessage(t=>this._rules=t&&t.rules||[],{type:"resolvia/recurring/subscribe"}).then(t=>(this._rulesOk=!0,t)).catch(()=>(this._rulesOk=!1,null)))}_repeatOn(){let t=this._app("repeat_on",void 0);return t===void 0?this._rules.length>0:t===!0}_ruleFor(t,e){return!e||!this._repeatOn()?null:this._rules.find(s=>s.entity_id===t&&s.uid&&s.uid===e.uid)||e.status!=="completed"&&this._rules.find(s=>s.entity_id===t&&!s.uid&&s.match===e.summary)||null}_everyLabel(t){return t===1?"todo dia":t===7?"toda semana":t===14?"a cada 2 semanas":t===30?"todo m\xEAs":`a cada ${t} dias`}_returnLabel(t){let e=new Date(t),s=B(rt(e));return s?s.diff<=0?"hoje":s.diff===1?"amanh\xE3":s.diff<7?s.text.toLowerCase():s.text:""}_reopenAt(t,e=Date.now()){let s=new Date(e);return new Date(s.getFullYear(),s.getMonth(),s.getDate()+t).getTime()}_setRule(t,{uid:e,summary:s,days:a}){return this._rulesOk?this.hass.callWS({type:"resolvia/recurring/set",entity_id:t,uid:e||void 0,summary:s,days:a||null}).catch(()=>this._showToast("N\xE3o consegui salvar a repeti\xE7\xE3o")):Promise.resolve()}_showToast(t,e=null){clearTimeout(this._toastTimer),this._toast={text:t,action:e,id:Date.now()},this._toastTimer=setTimeout(()=>this._toast=null,e?4500:Math.min(8e3,Math.max(2600,t.length*55)))}async _call(t,e,s){try{return await this.hass.callService("todo",t,e,{entity_id:s}),!0}catch(a){return console.error("ResolvIA:",t,a),this._inHA()||this._showToast(a&&a.message||"Algo deu errado"),!1}}async _toggle(t,e){if(!w(t.features,$.UPDATE))return;let s=I(e),a=!L(e),i=a?"completed":"needs_action";if(this._haptic(a?"success":"light"),a?(clearTimeout(this._recent.get(s)),this._recent.set(s,setTimeout(()=>{this._recent.delete(s),this.requestUpdate()},950))):(clearTimeout(this._recent.get(s)),this._recent.delete(s)),this._patchItem(t.id,s,{status:i}),!await this._call("update_item",{item:s,status:i},t.id)){this._patchItem(t.id,s,{status:e.status});return}let d=this._pointsOf(t.id,e.summary,e.uid),n=this._mirrored(t.id,e.uid);if(a){let c=this._ruleFor(t.id,e),h=c?` \xB7 volta ${this._returnLabel(this._reopenAt(c.days))}`:"",u={label:"Desfazer",run:()=>{this._patchItem(t.id,s,{status:"needs_action"}),this._call("update_item",{item:s,status:"needs_action"},t.id),(d||n)&&this._takePoints(t,e)}};d?this._givePoints(t,e,`Resolvido: ${S(e.summary,18)}`,u):this._showToast(`Resolvido: ${S(e.summary,c?22:30)}${h}${n?" \xB7 volta com a pr\xF3xima data":""}`,u)}else(d||n)&&this._takePoints(t,e)}_quickAdd(t,e){t.preventDefault();let s=t.currentTarget.querySelector("input");this._addLines(e,[s.value],s)}_onQuickPaste(t,e){let s=t.clipboardData&&t.clipboardData.getData("text");s&&/\n/.test(s.trim())&&(t.preventDefault(),this._addLines(e,s.split(/\r?\n/),t.currentTarget))}async _addLines(t,e,s){let a=e.map(o=>o.trim()).filter(Boolean);if(!a.length)return;let i=s.value;s.value="",s.focus(),this._haptic("light");for(let o of a)if(!await this._call("add_item",{item:o},t.id)){s.value=i||o;return}a.length>1&&this._showToast(`${a.length} itens adicionados`)}_dueFields(t,e,s,a){let i=t.features;return e?s&&w(i,$.DUE_DATETIME)?{due_datetime:`${e} ${s}:00`}:w(i,$.DUE_DATE)?{due_date:e}:w(i,$.DUE_DATETIME)?{due_datetime:`${e} ${s||"09:00"}:00`}:{}:a?w(i,$.DUE_DATE)?{due_date:null}:w(i,$.DUE_DATETIME)?{due_datetime:null}:{}:{}}async _addFull(t,{summary:e,description:s,date:a,time:i}){let o={item:e,...this._dueFields(t,a,i,!1)};return s&&w(t.features,$.DESCRIPTION)&&(o.description=s),this._call("add_item",o,t.id)}_openAdd(t){let e=this._visible().filter(i=>w(i.features,$.CREATE)&&!i.unavailable),s=Y.get(te,null),a=t&&this._list(t)&&w(this._list(t).features,$.CREATE)&&t||e.find(i=>i.id===s)&&s||e[0]&&e[0].id;if(!a){this._showToast("Nenhuma lista aceita itens novos");return}this._openSheet("item",{mode:"add",listId:a,target:a,summary:"",description:"",date:null,time:null,repeat:0,repeatOrig:0,repeatCustom:!1,room:null,equips:[],ext:null}),this.updateComplete.then(()=>{let i=this.renderRoot.querySelector(".sheet textarea");i&&i.focus()})}_aiInfo(){return this._aiState||this.hass&&this.hass.resolvia&&this.hass.resolvia.ai||{ready:!1,images:!1,entities:[]}}async _refreshAi(t=!0){let e=this.hass&&this.hass.resolvia;if(!(!e||!e.aiStatus)&&!(!t&&Date.now()-this._aiAt<6e4)){this._aiChecking=!0,this.requestUpdate();try{this._aiState=await e.aiStatus()}catch(s){this._aiState={...this._aiInfo(),ready:!1,images:!1,reason:s.message}}this._aiAt=Date.now(),this._aiChecking=!1,this.requestUpdate()}}async _chooseAi(t){await this._saveAppPrefs({ai_entity:t||null}),await this._refreshAi(),this._showToast("IA do app atualizada")}async _loadUsage(){if(!(!this.hass||!this.hass.resolvia)){try{this._usage=await this.hass.callWS({type:"resolvia/ai/usage"})}catch{this._usage=null}this.requestUpdate()}}_renderUsage(){let t=this._aiInfo();return zs({u:this._usage,day:this._usageDay,onDay:e=>(this._usageDay=e,this.requestUpdate()),head:this._secHead("chart-column","Uso da IA","As chamadas do app para a IA. Os tokens s\xE3o estimados."),app:"ResolvIA",using:t.using&&t.using.id||"",names:Object.fromEntries((t.entities||[]).map(e=>[e.id,e.name]))})}_dueOn(){return!this._app("due_off",!1)}_aiOn(){return!this._app("ai_off",!1)}_canImport(){return this._aiOn()&&!!(this.hass&&this.hass.resolvia&&this.hass.resolvia.extract)}_importTarget(t){let e=a=>{let i=a&&this._list(a);return i&&w(i.features,$.CREATE)&&!i.unavailable?a:null},s=this._visible().filter(a=>w(a.features,$.CREATE)&&!a.unavailable);return e(t)||e(Y.get(te,null))||s[0]&&s[0].id||null}_openImport(t,e="pick"){let s=this._importTarget(t);if(!s){this._showToast("Nenhuma lista aceita itens novos");return}this._releaseImages(),this._importToken=0,this._openSheet("import",{target:s,step:e==="text"?"text":e==="voice"?"voice":"pick",rec:e==="voice"?"starting":"off",text:"",images:[],items:[],provider:null,error:null,note:null}),e==="photos"&&this._pickFiles("photos"),e==="scan"&&this._openCamera(),e==="text"&&this._focusImportText(),e==="voice"&&this.updateComplete.then(()=>this._startVoice())}async _loadVoice(t=!1){try{this._voice=await this.hass.resolvia.voiceStatus(t)}catch(e){this._voice={ready:!1,reason:e.message}}this.requestUpdate()}async _chooseVoice(t){await this._saveAppPrefs({voice_engine:t||null}),await this._loadVoice(!0),this._showToast("Fala para texto atualizada")}_renderVoicePanel(){let t=this._voice,e=this._app("voice_engine","")||"",s=t&&t.options||[],a=!t||this._voiceChecking,i=a?"off":t.ready&&!t.missing?"ok":t.ready?"warn":"bad",o=a?"Verificando\u2026":t.ready?"Pronto para ouvir":"Sem fala para texto",d=a?"":t.ready?`Transcreve com ${t.name}.${t.missing?" O escolhido n\xE3o foi encontrado: usando o autom\xE1tico.":""}`:t.reason||"",n=async()=>{this._voiceChecking=!0,this.requestUpdate(),await this._loadVoice(!0),this._voiceChecking=!1,this.requestUpdate()};return l`<div class="panel" id="falar">
      ${this._secHead("mic","Falar","Quem transforma a fala em texto. N\xE3o muda o assistente de voz do Home Assistant.")}
      <div class="ai-state ${i}"><span class="dot"></span><div><b>${o}</b>${d?l`<span>${d}</span>`:p}</div></div>
      ${s.length||e?l`<label class="field" style="margin:14px 0 0">
            <span class="flabel">Fala para texto</span>
            <select class="select" aria-label="Fala para texto" @change=${c=>this._chooseVoice(c.target.value)}>
              <option value="" ?selected=${!e}>Automático${t&&t.auto?`: ${t.auto.name}`:""}</option>
              ${s.map(c=>l`<option value=${c.id} ?selected=${c.id===e}>${c.name}</option>`)}
              ${e&&!s.some(c=>c.id===e)?l`<option value=${e} selected>${e} (não encontrado)</option>`:p}
            </select>
          </label>`:p}
      <div class="ai-actions"><button class="btn outline" ?disabled=${a} @click=${n}>${g("rotate-ccw")}Verificar de novo</button></div>
      ${t&&!t.ready?l`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>Com o Home Assistant Cloud, a fala para texto já vem pronta.</li>
              <li>Sem ele, instale um motor de fala: o app Whisper (local, de graça) com a integração Wyoming, ou a fala para texto de uma IA como Google Gemini ou OpenAI.</li>
              <li>Volte aqui, toque em Verificar de novo e escolha o motor na lista.</li>
            </ol>
          </div>`:p}
    </div>`}_renderMicBtn(t=null){return!this._aiOn()||!this._voice||!this._voice.ready?p:l`<button class="mic-top" aria-label="Falar: adicionar itens falando" title="Falar" @click=${()=>this._openImport(t,"voice")}>${g("mic")}</button>`}async _startVoice(){if(this._rec||!this._form)return;this._setForm({step:"voice",rec:"starting",secs:0,level:0,error:null,heard:""});let t=new ut(e=>this._voiceLevel=e);this._rec=t;try{await t.start()}catch(e){t.cancel(),this._rec===t&&(this._rec=null),this._form&&this._form.step==="voice"&&this._setForm({rec:"off",error:Gt(e)});return}if(this._rec!==t||!this._form||this._form.step!=="voice")return t.cancel();this._setForm({rec:"on"}),clearInterval(this._recTimer),this._recTimer=setInterval(()=>{if(this._rec!==t)return clearInterval(this._recTimer);let e=t.seconds();this._setForm({secs:e,level:this._voiceLevel||0}),e>=120&&this._finishVoice()},120)}_stopVoice(){clearInterval(this._recTimer),this._rec&&this._rec.cancel(),this._rec=null}async _finishVoice(){let t=this._rec;if(!t)return;clearInterval(this._recTimer),this._rec=null;let e=t.stop();if(e.length<16e3*.4){this._setForm({rec:"off",error:"N\xE3o ouvi nada. Toque no microfone e fale."});return}let s=this._importToken=(this._importToken||0)+1;this._setForm({step:"loading",error:null,prevStep:"voice",loadingText:"Transcrevendo o que voc\xEA disse\u2026"});try{let a=await this.hass.resolvia.voiceText(e);if(this._importToken!==s||!this._form)return;this._setForm({text:a.text,heard:a.text}),this._readText()}catch(a){if(this._importToken!==s||!this._form)return;this._setForm({step:"voice",rec:"off",error:a.message||"N\xE3o consegui transcrever."})}}_renderVoiceStep(t){let e=this._form,s=this._voice||{},a=e.rec==="on",i=Math.floor((e.secs||0)/60),o=String(Math.floor((e.secs||0)%60)).padStart(2,"0"),d=this._list(e.target);return l`
      ${t("Falar")}
      <div class="voice ${a?"on":""}">
        <button class="voice-mic" style="--lvl:${a?(e.level||0).toFixed(2):0}" aria-label=${a?"Pronto: enviar o que falei":"Come\xE7ar a falar"} @click=${()=>a?this._finishVoice():this._startVoice()}>
          <span class="voice-ring"></span>${g(a?"check":"mic")}
        </button>
        <div class="voice-state">${a?l`<b>Ouvindo…</b> <span class="voice-time">${i}:${o}</span>`:e.rec==="starting"?"Abrindo o microfone\u2026":"Toque no microfone e fale"}</div>
        <p class="voice-hint">${a?"Toque de novo quando terminar.":l`Por exemplo: <i>“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”</i>.`}</p>
        ${d?l`<p class="voice-hint">Vai para <b>${d.name}</b> (dá para trocar na revisão).</p>`:p}
      </div>
      ${e.error?l`<div class="imp-error">${g("circle-alert")}<span>${e.error}</span></div>`:p}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" ?disabled=${!a} @click=${()=>this._finishVoice()}>${g("sparkles")}Pronto</button>
      </div>
      ${s.ready?p:l`<p class="sheet-note">${s.reason||""}</p>`}
    `}_focusImportText(){this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(".sheet textarea");t&&t.focus()})}_pickFiles(t){let e=this.renderRoot.querySelector(t==="scan"?"#rv-scan":"#rv-photos");e&&(e.value="",e.click())}_releaseImages(){let t=this._form;if(t&&t.images)for(let e of t.images)e.url&&URL.revokeObjectURL(e.url)}_camOk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_isHaAndroid(){return/Home Assistant\//.test(navigator.userAgent)&&/Android/.test(navigator.userAgent)}async _onFiles(t){let e=[...t.target.files||[]].filter(i=>!i.type||i.type.startsWith("image/")).slice(0,6);if(t.target.value="",!e.length)return;this._sheet!=="import"&&this._openImport(null,"pick");let s=this._form.step==="review";this._setForm({step:"loading",error:null,loadingText:"Preparando as fotos\u2026",prevStep:s?"review":"pick"});let a=[];for(let i of e)a.push(await ke(i));this._readImages(a,s)}_readImages(t,e){if(this._sheet!=="import"||!t.length)return;let s=e?[...this._form.images||[],...t]:(this._releaseImages(),t);this._setForm({step:"loading",images:s,prevStep:e?"review":"pick",loadingText:t.length>1?`Lendo ${t.length} fotos com IA\u2026`:"Lendo a foto com IA\u2026"}),this._runExtract({images:t,appending:e})}async _runExtract({text:t,images:e,appending:s=!1}){let a=this._importToken=Date.now(),i=this._list(this._form.target),o=()=>a===this._importToken&&this._sheet==="import",d=s?this._form.items||[]:[],n=(c,h=[],u=[],f=[])=>{let m=new Set(d.map(_=>_.text.trim().toLowerCase())),x=(_,E)=>E||_&&this._roomsOn()&&(this._equipOf(_)||{}).comodo||null,v=c.map((_,E)=>({text:_,on:!0,list:h[E]||null,room:x(f[E],u[E]),equip:f[E]||null})).filter(_=>!m.has(_.text.trim().toLowerCase()));return[...d,...v]};try{let c=await this.hass.resolvia.extract({text:t,images:e?e.map(({data:u,mime:f})=>({data:u,mime:f})):void 0,list_name:i?i.name:void 0,lists:this._importTargets().map(u=>({id:u.id,name:u.name}))});if(!o())return;let h=c.items||[];if(!h.length){let u=t?"N\xE3o encontrei itens nessa mensagem.":"N\xE3o consegui achar itens nessa foto. Tente mais de perto e com boa luz.";s?this._setForm({step:"review",note:u}):this._setForm({step:t?"text":"pick",error:u});return}this._haptic("success"),this._setForm({step:"review",items:n(h,c.lists||[],c.rooms||[],c.equips||[]),provider:c.provider||null,note:null,error:null})}catch(c){if(!o())return;if(t){let h=ye(t);if(h.length){this._setForm({step:"review",items:n(h),provider:"local",note:"A IA n\xE3o respondeu, ent\xE3o separei por linhas e v\xEDrgulas."});return}}s?this._setForm({step:"review",note:c.message||"Algo deu errado"}):this._setForm({step:t?"text":"pick",error:c.message||"Algo deu errado"})}}async _openCamera(){let t=navigator.mediaDevices,e=!!(this._form&&this._form.step==="review");if(!t||!t.getUserMedia){this._cam={status:"error",shots:[],appending:e,flash:0,error:window.isSecureContext===!1?"A c\xE2mera aqui dentro s\xF3 funciona quando o Home Assistant \xE9 aberto por um endere\xE7o seguro (https), como o do Home Assistant Cloud ou o seu endere\xE7o externo. Neste endere\xE7o (http), escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher.":"Este navegador n\xE3o deixa o app usar a c\xE2mera. Escolha uma foto: d\xE1 para tirar na hora pela c\xE2mera do celular e depois escolher."};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}return}this._cam={status:"starting",shots:[],torch:!1,torchOk:!1,appending:e,flash:0};try{history.pushState({...history.state||{},rvCam:!0},"")}catch{}try{let s=await t.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1440}}});if(!this._cam){s.getTracks().forEach(d=>d.stop());return}this._stream=s;let a=s.getVideoTracks()[0],i=a&&a.getCapabilities?a.getCapabilities():{};this._cam={...this._cam,status:"live",torchOk:!!i.torch},await this.updateComplete;let o=this.renderRoot.querySelector(".cam video");o&&(o.srcObject=s,o.play().catch(()=>{}))}catch(s){if(!this._cam)return;let a=s&&(s.name==="NotAllowedError"||s.name==="SecurityError");this._cam={...this._cam,status:"error",error:a?"Sem permiss\xE3o para usar a c\xE2mera. Libere a c\xE2mera para o app do Home Assistant nas configura\xE7\xF5es do celular, ou escolha uma foto.":"N\xE3o consegui abrir a c\xE2mera. Voc\xEA pode escolher uma foto da galeria."}}}_stopStream(){this._stream&&this._stream.getTracks().forEach(t=>t.stop()),this._stream=null}_closeCamera(t=!1){if(!this._cam)return;this._stopStream();let e=this._cam.shots||[];if(!this._cam.used)for(let s of e)URL.revokeObjectURL(s.url);this._cam=null,!t&&history.state&&history.state.rvCam&&history.back()}async _toggleTorch(){let t=this._stream&&this._stream.getVideoTracks()[0];if(!t)return;let e=!this._cam.torch;try{await t.applyConstraints({advanced:[{torch:e}]}),this._cam={...this._cam,torch:e}}catch{this._cam={...this._cam,torchOk:!1}}}async _shoot(){let t=this.renderRoot.querySelector(".cam video");if(!t||!t.videoWidth||!this._cam||this._cam.shots.length>=6)return;let e=1800,s=Math.min(1,e/Math.max(t.videoWidth,t.videoHeight)),a=document.createElement("canvas");a.width=Math.round(t.videoWidth*s),a.height=Math.round(t.videoHeight*s),a.getContext("2d").drawImage(t,0,0,a.width,a.height);let i=await new Promise(d=>a.toBlob(d,"image/jpeg",.86));if(!i||!this._cam)return;let o=await ke(i,e);this._haptic("light"),this._cam={...this._cam,shots:[...this._cam.shots,o],flash:Date.now()}}_useShots(){if(!this._cam||!this._cam.shots.length)return;let t=this._cam.shots,e=this._cam.appending;this._cam={...this._cam,used:!0},this._closeCamera(),this._sheet!=="import"&&this._openImport(null,"pick"),this._readImages(t,e&&this._form.step==="review")}_cameraFallback(){let t=this._cam&&this._cam.appending;this._closeCamera(),t&&this._form&&this._setForm({step:"review"}),this._pickFiles("scan")}_renderCamera(){let t=this._cam;if(!t)return p;let e=t.shots.length;return l`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${t.flash?l`<div class="cam-flash" .key=${t.flash}></div>`:p}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${()=>this._closeCamera()}>${g("x")}</button>
          <span class="cam-title">Digitalizar com IA</span>
          ${t.torchOk?l`<button class="cam-btn ${t.torch?"on":""}" aria-label="Lanterna" @click=${()=>this._toggleTorch()}>${g("zap")}</button>`:l`<span class="cam-btn ghost"></span>`}
        </div>
        ${t.status==="error"?l`<div class="cam-msg">
              ${g("camera")}
              <p>${t.error}</p>
              <button class="btn primary" @click=${()=>this._cameraFallback()}>${g("images")}Escolher foto</button>
            </div>`:l`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${t.status==="starting"?"Abrindo a c\xE2mera\u2026":e?`${k(e,"p\xE1gina","p\xE1ginas")}. Fotografe outra ou toque em Pronto.`:"Enquadre a lista e toque no bot\xE3o"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${t.shots.slice(-3).map(s=>l`<img src=${s.url} alt="" />`)}${e>3?l`<span>+${e-3}</span>`:p}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${t.status!=="live"||e>=6} @click=${()=>this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!e} @click=${()=>this._useShots()}>Pronto${e?` (${e})`:""}</button>
        </div>
      </div>
    `}_readText(){let t=(this._form.text||"").trim();if(!t){this._focusImportText();return}if(this._aiInfo().ready){this._setForm({step:"loading",error:null,note:null,loadingText:"Separando os itens com IA\u2026"}),this._runExtract({text:t});return}let e=ye(t);e.length?this._setForm({step:"review",items:e.map(s=>({text:s,on:!0})),provider:"local",error:null}):this._setForm({error:"N\xE3o encontrei itens nesse texto."})}_clipOk(){return!!(navigator.clipboard&&navigator.clipboard.readText)&&!this._clipFailed}async _pasteClipboard(){let t="";try{t=await navigator.clipboard.readText()}catch{this._clipFailed=!0,this._focusImportText(),this._showToast("Este aparelho n\xE3o deixa o app ler o que foi copiado. Toque e segure no campo e escolha Colar."),this.requestUpdate();return}if(!t){this._focusImportText(),this._showToast("N\xE3o h\xE1 nada copiado.");return}this._setForm({text:t,error:null})}_setImportItem(t,e){let s=this._form.items.slice();s[t]={...s[t],...e},this._setForm({items:s})}_importTargets(){let t=this._form||{};return this._L.filter(e=>w(e.features,$.CREATE)&&!e.unavailable&&(!e.hidden||e.id===t.target))}_importListOf(t){let e=this._importTargets();return t.list&&e.some(s=>s.id===t.list)&&t.list||this._form.target}async _importAdd(){let t=this._form,e=this._list(t.target),s=t.items.filter(d=>d.on&&d.text.trim()).map(d=>({...d,dest:this._importListOf(d)}));if(!e||!s.length)return;Y.set(te,e.id),this._releaseImages(),this._closeSheet(),this._haptic("success");let a=0,i=new Set;for(let d of s)if(await this._call("add_item",{item:d.text.trim()},d.dest))a++,i.add(d.dest),d.room&&this._roomsOn()&&await this._setTaskRoom(d.dest,d.text.trim(),d.room),d.equip&&this._equipsOn()&&await this._setTaskEquip(d.dest,d.text.trim(),d.equip);else break;if(!a)return;let o=i.size===1?this._list([...i][0]):null;this._showToast(`${k(a,"item adicionado","itens adicionados")} ${o?`em ${S(o.name,24)}`:`em ${i.size} listas`}`)}_openEdit(t,e){let s=U(e.due),a=this._ruleFor(t.id,e),i=a?a.days:0;this._openSheet("item",{mode:"edit",listId:t.id,key:I(e),target:t.id,summary:e.summary||"",description:ht(e.description),mirrored:this._mirrored(t.id,e.uid),due:e.due||null,date:s?s.date:null,time:s?s.time:null,repeat:i,repeatOrig:i,repeatCustom:!!i&&!ua.some(o=>o.days===i),points:this._rawPoints(t.id,e.summary),pointsOrig:this._rawPoints(t.id,e.summary),room:this._roomIdOf(t.id,e.summary),roomsOrig:this._roomIdsOf(t.id,e.summary),equips:this._equipIdsOf(t.id,e.summary),equipsOrig:this._equipIdsOf(t.id,e.summary),ext:this._externalOf(t.id,e.summary),extOrig:this._externalOf(t.id,e.summary)}),this._loadPoints()}_setForm(t){this._form={...this._form,...t}}async _saveItem(){let t=this._form,e=(t.summary||"").trim();if(!e){let h=this.renderRoot.querySelector(".sheet textarea");h&&h.focus();return}let s=(t.description||"").trim(),a=this._list(t.target);if(t.mode==="add"){if(!a)return;Y.set(te,a.id),this._closeSheet(),this._haptic("light");let h=await this._addFull(a,{summary:e,description:s,date:t.date,time:t.time});h&&t.repeat&&await this._setRule(a.id,{summary:e,days:t.repeat}),h&&t.points&&await this._setTaskPoints(a.id,e,t.points),h&&await this._saveTaskPlace(a.id,e,t),h&&await this._saveTaskExternal(a.id,e,t),h&&this._view().id!==a.id&&this._showToast(`Adicionado em ${S(a.name,28)}`);return}let i=this._list(t.listId),o=i&&i.items&&i.items.find(h=>I(h)===t.key);if(!i||!o){this._closeSheet();return}if(a&&a.id!==i.id){this._closeSheet(),await this._addFull(a,{summary:e,description:s,date:t.date,time:t.time})&&(t.repeat&&await this._setRule(a.id,{summary:e,days:t.repeat}),t.repeatOrig&&await this._setRule(i.id,{uid:o.uid,summary:o.summary,days:null}),t.points&&await this._setTaskPoints(a.id,e,t.points),t.pointsOrig&&await this._setTaskPoints(i.id,o.summary,0),await this._saveTaskPlace(a.id,e,{...t,roomsOrig:[],equipsOrig:[]}),(t.roomsOrig||[]).length&&await this._setTaskRoom(i.id,o.summary,null),(t.equipsOrig||[]).length&&await this._setTaskEquip(i.id,o.summary,null),await this._saveTaskExternal(a.id,e,{...t,extOrig:null}),t.extOrig&&await this._setTaskExternal(i.id,o.summary,null),await this._call("remove_item",{item:[t.key]},i.id),this._showToast(`Movido para ${S(a.name,28)}`));return}let d={item:t.key};if(e!==o.summary&&(d.rename=e),w(i.features,$.DESCRIPTION)&&s!==ht(o.description)){let h=Zs(o.description);d.description=h?`${s}${s?" ":""}${h}`:s||null}let n=U(o.due);((n?n.date:null)!==(t.date||null)||(n?n.time:null)!==(t.time||null))&&Object.assign(d,this._dueFields(i,t.date,t.time,!0)),this._closeSheet(),((t.points||0)!==(t.pointsOrig||0)||t.pointsOrig&&e!==o.summary)&&await this._setTaskPoints(i.id,e,t.points||0,e!==o.summary?o.summary:null),await this._saveTaskPlace(i.id,e,t,e!==o.summary?o.summary:null),await this._saveTaskExternal(i.id,e,t,e!==o.summary?o.summary:null),(t.repeat||0)!==(t.repeatOrig||0)&&(await this._setRule(i.id,{uid:o.uid,summary:e,days:t.repeat}),t.repeat&&this._showToast(`Repete ${this._everyLabel(t.repeat)} depois de concluir`)),Object.keys(d).length>1&&(d.rename&&this._patchItem(i.id,t.key,{summary:e}),await this._call("update_item",d,i.id))}async _deleteItem(){let t=this._form,e=this._list(t.listId),s=e&&e.items&&e.items.find(o=>I(o)===t.key);if(this._closeSheet(),!e||!s)return;if(this._setItems(e.id,e.items.filter(o=>I(o)!==t.key)),this._haptic("warning"),!await this._call("remove_item",{item:[t.key]},e.id)){this._setItems(e.id,e.items);return}let i=U(s.due);this._showToast("Item exclu\xEDdo",w(e.features,$.CREATE)?{label:"Desfazer",run:()=>this._addFull(e,{summary:s.summary,description:s.description,date:i?i.date:null,time:i?i.time:null})}:null)}_confirmClearDone(t){this._openSheet("confirm",{title:"Limpar conclu\xEDdos?",text:`${k(t.done,"item conclu\xEDdo vai","itens conclu\xEDdos v\xE3o")} ser apagado${t.done===1?"":"s"} de \u201C${t.name}\u201D.`,label:"Limpar",run:async()=>{this._closeSheet(),this._haptic("warning"),await this._call("remove_completed_items",{},t.id)&&this._showToast("Conclu\xEDdos apagados")}})}_openCustomize(t){this._openSheet("customize",{listId:t.id,name:t.name===t.origName?"":t.name,color:t.colorId,icon:t.iconPref,hidden:t.hidden,deadlines:!t.datesInfo})}async _saveCustomize(){let t=this._form,e=this._list(t.listId);this._closeSheet(),await this._saveListPrefs(t.listId,{name:(t.name||"").trim()||null,color:t.color||null,icon:t.icon||null,hidden:t.hidden?!0:null,dates_info:e&&e.canDue&&!t.deadlines?!0:null})}_dragStart(t,e,s){if(t.pointerType==="mouse"&&t.button!==0)return;t.preventDefault();let a=t.currentTarget,i=a.closest(".item"),d=[...i.parentElement.querySelectorAll(":scope > .item[data-drag]")],n=d.indexOf(i);if(n<0)return;let c=this.renderRoot.querySelector("main"),h=d.map(M=>M.getBoundingClientRect()),u=c.scrollTop,f=h.map(M=>M.top+M.height/2+u),m=h[n].height,x={y:t.clientY,target:n,raf:0,lastY:t.clientY};try{a.setPointerCapture(t.pointerId)}catch{}i.classList.add("dragging"),d.forEach((M,A)=>A!==n&&M.classList.add("shifting")),this._haptic("selection");let v=()=>{let M=x.lastY-x.y+(c.scrollTop-u);i.style.transform=`translateY(${M}px)`;let A=f[n]+M,y=0;for(let C=0;C<d.length;C++)C!==n&&f[C]<A&&y++;y!==x.target&&(x.target=y,this._haptic("selection")),d.forEach((C,T)=>{if(T===n)return;let R=0;n<y&&T>n&&T<=y&&(R=-m),y<n&&T>=y&&T<n&&(R=m),C.style.transform=R?`translateY(${R}px)`:""})},_=()=>{let M=c.getBoundingClientRect(),A=70,y=0;x.lastY<M.top+A?y=-Math.ceil((M.top+A-x.lastY)/6):x.lastY>M.bottom-A&&(y=Math.ceil((x.lastY-(M.bottom-A))/6)),y&&(c.scrollTop+=y,v()),x.raf=requestAnimationFrame(_)};x.raf=requestAnimationFrame(_);let E=M=>{x.lastY=M.clientY,v()},b=()=>{cancelAnimationFrame(x.raf),a.removeEventListener("pointermove",E),a.removeEventListener("pointerup",b),a.removeEventListener("pointercancel",b),d.forEach(M=>{M.classList.remove("shifting","dragging"),M.style.transform=""}),x.target!==n&&this._commitMove(e,s,d.map(M=>M.dataset.key),n,x.target)};a.addEventListener("pointermove",E),a.addEventListener("pointerup",b),a.addEventListener("pointercancel",b)}async _commitMove(t,e,s,a,i){let o=s.slice(),[d]=o.splice(a,1);o.splice(i,0,d);let n=i===0?void 0:o[i-1],c=t.items.slice(),h=c.findIndex(x=>I(x)===d),[u]=c.splice(h,1),f=n?c.findIndex(x=>I(x)===n):-1;c.splice(f+1,0,u),this._setItems(t.id,c);let m={type:"todo/item/move",entity_id:t.id,uid:d};n&&(m.previous_uid=n);try{await this.hass.callWS(m)}catch{this._setItems(t.id,t.items),this._showToast("N\xE3o deu para reordenar esta lista")}}render(){if(!this.hass)return p;let t=this._dark,e=this._accent(),s=this._view(),a=s.name==="list"?this._list(s.id):null,i=a?a.color:e,o=`--rv-accent:${i.fill};--rv-accent-ink:${t?i.fill:i.ink};--rv-accent-soft:${Kt(i.fill,t?.18:.14)};--rv-accent-ink-light:${i.ink};`,d;return s.name==="list"?d=this._renderList(s.id):s.name==="due"?d=this._renderDue():s.name==="suggest"?d=this._renderSuggest():s.name==="search"?d=this._renderSearch():s.name==="more"?d=this._renderMore():s.name==="listas"?d=this._renderMoreScreen("Listas",this._listsStatus(),this._renderListsTab()):s.name==="repeticoes"?d=this._renderMoreScreen("Repeti\xE7\xF5es",null,this._renderRulesTab()):s.name==="config"?d=this._renderConfig():d=this._renderHome(),l`
      <div class="root" style=${o}>
        <div class="app">
          ${!this.env||this.env.topbar?l`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${g("menu")}</button>
                <div class="title">${this.panel&&this.panel.title||"ResolvIA"}</div>
              </header>`:p}
          ${this.hass.connected===!1?l`<div class="offline">${g("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`:p}
          ${this._renderSide(s)}
          <main @touchstart=${n=>this._onSwipeStart(n)} @touchend=${n=>this._onSwipeEnd(n)}>${d}</main>
          ${this._renderNav(s)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()?l`<input id="rv-photos" class="sr" type="file" accept="image/*" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${n=>this._onFiles(n)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${n=>this._onFiles(n)} />`:p}
      </div>
    `}_renderNav(t){let e=this._visible().reduce((i,o)=>i+o.late+o.today,0),s=t.name==="list"?"home":At.includes(t.name)?"more":t.name,a=(i,o,d,n,c=0)=>l`
      <button class="tab ${s===i?"on":""}" @click=${()=>this._goTab(o)} aria-label=${d}>
        ${g(n)}<span>${d}</span>
        ${c?l`<span class="badge">${c>99?"99+":c}</span>`:p}
      </button>
    `;return l`
      <nav>
        <div class="tabs">
          ${a("home","","Listas","list-checks")} ${a("search","/buscar","Buscar","search")}
          <button class="tab fab" @click=${()=>this._openAdd(t.name==="list"?t.id:null)} aria-label="Adicionar item">
            <span class="pill">${g("plus")}</span><span>Adicionar</span>
          </button>
          ${this._dueOn()?a("due","/prazos","Prazos","calendar-clock",e):a("suggest","/sugestoes","Sugest\xF5es","lightbulb")}
          ${a("more","/mais","Mais","ellipsis")}
        </div>
      </nav>
    `}_renderSide(t){let e=this._byPending(this._visible()),s=e.reduce((o,d)=>o+d.late+d.today,0),a=At.includes(t.name)?"more":t.name,i=(o,d,n,c,h=0,u="")=>l`<button class="side-link" aria-current=${a===o?"page":"false"} @click=${()=>this._goTab(d)}>
      ${g(c)}<span>${n}</span>${h?l`<span class="side-badge">${h>99?"99+":h}</span>`:p}${u?l`<kbd>${u}</kbd>`:p}
    </button>`;return l`<aside class="side" aria-label="Navegação">
      <div class="side-brand">${ge()}Resolv<span>IA</span></div>
      <div class="side-nav">
        ${i("home","","Listas","list-checks")} ${i("search","/buscar","Buscar","search",0,"/")}
        ${this._dueOn()?i("due","/prazos","Prazos","calendar-clock",s):i("suggest","/sugestoes","Sugest\xF5es","lightbulb")}
        ${i("more","/mais","Mais","ellipsis")}
      </div>
      ${e.length?l`<div class="side-h"><span>Listas</span><small>${e.length}</small></div>
            <div class="side-lists">
              ${e.map(o=>l`<button class="side-list" aria-current=${t.name==="list"&&t.id===o.id?"page":"false"} style=${O(o.color,this._dark)} @click=${()=>this._go(`/lista/${o.id}`)}>
                  <span class="side-tile">${g(o.icon)}</span><span class="sl-name">${o.name}</span><span class="sl-num">${o.pending||""}</span>
                </button>`)}
            </div>`:p}
      <div class="side-foot">ResolvIA ${ha}</div>
    </aside>`}_renderTopActs(){return l`<div class="top-acts">
      ${this._renderChatBtn()}${this._renderMicBtn()}
      ${this._canImport()?l`<button class="btn outline sm" @click=${()=>this._openImport(null)}>${g("scan-text")}Ler com IA</button>`:p}
      <button class="btn primary sm" @click=${()=>this._openAdd(null)}>${g("plus")}Adicionar item</button>
    </div>`}_renderPageHead(t,e,s=!1){let a=(this.hass.user&&this.hass.user.name||"").trim().split(/\s+/)[0],o=this.hass.connected===!1?{text:"Reconectando ao Home Assistant\u2026",tone:"off"}:e;return l`<header class="brand-head">
      <div class="head-row"><p class="eyebrow"><span class="brand">${ge()}Resolv<span>IA</span></span>${a?l`<span class="sep"> · </span>Olá, ${a}`:""}</p>${this._renderChatBtn()}${this._renderMicBtn()}${this._renderTopActs()}</div>
      ${s?l`<button class="uplink" @click=${()=>this._toMenu()}>${g("chevron-left")}Mais</button>`:p}
      <h1 class="page-title">${t}</h1>
      ${o?l`<p class="status"><span class="dot ${o.tone||""}" aria-hidden="true"></span><span>${o.text}</span></p>`:p}
    </header>`}_byPending(t){return[...t].sort((e,s)=>s.pending-e.pending)}_renderHome(){let t=this._byPending(this._visible()),e=t.reduce((c,h)=>c+h.pending,0),s=t.reduce((c,h)=>c+h.late,0),a=t.reduce((c,h)=>c+h.today,0),i=t.filter(c=>c.pending>0).length,o=[];e&&o.push(`em ${k(i,"lista","listas")}`),a&&o.push(`${a} pra hoje`),s&&o.push(`${k(s,"atrasado","atrasados")}`);let d=this._app("group_by_device",!0),n=[];if(d){for(let h of t){let u=h.group||"",f=n.find(m=>m.name===u);f||n.push(f={name:u,lists:[]}),f.lists.push(h)}let c=h=>h.lists.reduce((u,f)=>u+f.pending,0);n.sort((h,u)=>c(u)-c(h)||(h.name?1:0)-(u.name?1:0))}else n.push({name:null,lists:t});return l`
      <section class="page">
        ${this._renderPageHead("Minhas listas",{text:`${k(t.length,"lista","listas")} \xB7 ao vivo com o Home Assistant`})}

        <div class="home-top">
        <div class="hero">
          <div class="rings">${Array.from({length:9},()=>l`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${Ys(this.hass.user&&this.hass.user.name)}</div>
            ${e?l`<div class="hero-big">${e}<small>${e===1?"pendente":"pendentes"}</small></div>
                  <div class="hero-sub">${o.join(" \xB7 ")}</div>`:l`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>
        ${this._L.length?this._renderHomeFacts(t):p}
        </div>

        ${this._L.length?this._renderHomeSearch():p}

        ${this._L.length===0?l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${g("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`:l`
              <div class="groups ${n.length>1?"two":""}">
              ${n.map(c=>{let h=d?c.name||(n.length>1?"Listas locais":"Listas"):"Listas",u=d&&(c.name||n.length>1);return l`
                  <div class="panel grp">
                    <div class="grp-head ${u?"":"desk-only"}"><span class="sec-ic" aria-hidden="true">${g(c.name?"layout-list":"list-checks")}</span><h2 class="overline">${h}</h2><small>${c.lists.length}</small></div>
                    ${c.lists.map(f=>this._renderListCard(f,!d))}
                  </div>
                `})}
              </div>
            `}
        ${this.hass.user&&this.hass.user.is_admin?l`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${g("list-plus")}<span>Nova lista</span>
            </button>`:p}
      </section>
    `}_renderHomeSearch(){let t=this._visible().reduce((e,s)=>e+(s.items&&s.items.length||0),0);return l`<form class="search-box home-search" role="search" @submit=${e=>{e.preventDefault(),this._query=e.target.q.value.trim(),this._toSearch()}}>
      ${g("search")}
      <input type="search" name="q" placeholder=${t?`Buscar entre ${k(t,"item","itens")}`:"Buscar nas listas"} aria-label="Buscar nas listas" autocomplete="off" enterkeyhint="search" @input=${e=>{e.target.value.trim()&&(this._query=e.target.value,e.target.value="",this._toSearch())}} />
      <kbd>/</kbd>
    </form>`}_renderListCard(t,e){let s=t.pending+t.done,a=s?Math.round(t.done/s*100):0,i=[];return t.unavailable?i.push(l`<span>Indisponível</span>`):t.items?(i.push(l`<span>${t.pending?k(t.pending,"pendente","pendentes"):"Tudo resolvido"}${t.done?` \xB7 ${t.done} ${t.done===1?"feito":"feitos"}`:""}</span>`),t.late?i.push(l`<span class="tag late">${g("circle-alert")}${t.late}</span>`):t.today&&i.push(l`<span class="tag today">${g("clock")}${t.today} hoje</span>`)):i.push(l`<span>Carregando…</span>`),l`
      <button class="list-card ${t.unavailable?"off":""}" style=${O(t.color,this._dark)} @click=${()=>this._go(`/lista/${t.id}`)}>
        <span class="tile">${g(t.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${t.name}</span>
          <span class="lc-meta">${e&&t.group?l`<span>${t.group} ·</span>`:p}${i}</span>
          ${s?l`<span class="bar"><i style="width:${a}%"></i></span>`:p}
        </span>
        <span class="lc-num ${t.pending?"":"zero"}">${t.pending||g("circle-check")}</span>
      </button>
    `}_renderList(t){let e=this._list(t);if(!e)return l`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${g("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${()=>this._go("",!0)}>Voltar para o início</button>
      </section>`;let s=w(e.features,$.CREATE)&&!e.unavailable,a=w(e.features,$.UPDATE),i=w(e.features,$.MOVE),o=w(e.features,$.DELETE),d=e.items,n=d?d.filter(m=>!L(m)||this._recent.has(I(m))):[],c=d?d.filter(m=>L(m)&&!this._recent.has(I(m))):[],h=d?d.length:0,u=this._doneOpen[t]!==void 0?this._doneOpen[t]:this._app("show_done",!1);return this._selOn(t)?this._renderSelecting(e,n.filter(m=>!L(m))):l`
      <section class="page" style=${O(e.color,this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${()=>this._back()} aria-label="Voltar">${g("chevron-left")}</button>
          <div class="dh-text">
            ${e.group?l`<div class="overline">${e.group}</div>`:p}
            <h1 class="display">${e.name}</h1>
          </div>
          ${this._renderChatBtn()}${this._renderMicBtn(e.id)}
          <button class="icon-btn" @click=${()=>this._openSheet("listmenu",{listId:e.id})} aria-label="Opções da lista">${g("ellipsis")}</button>
        </div>

        ${h?l`<div class="progress">
              <span>${e.done} de ${h} resolvidos</span>
              <span class="bar"><i style="width:${Math.round(e.done/h*100)}%"></i></span>
            </div>`:p}
        ${s?l`<div class="quick">
              <form @submit=${m=>this._quickAdd(m,e)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${m=>this._onQuickPaste(m,e)} />
                ${this._canImport()?l`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${()=>this._openImport(e.id)}>${g("scan-text")}</button>`:p}
                <button class="add-btn" type="submit" aria-label="Adicionar">${g("plus")}</button>
              </form>
            </div>`:p}
        ${e.unavailable?l`<div class="panel"><div class="empty"><div class="em-icon">${g("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`:d?n.length?l`<div class="panel items">
                  ${V(n,I,m=>this._renderItem(e,m,{draggable:i&&a&&!L(m),selectable:o&&!L(m)}))}
                </div>`:l`<div class="panel">
                  <div class="empty">
                    ${h?l`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`:l`<div class="em-icon">${g(e.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${s?"Escreva acima e toque em + para adicionar o primeiro item.":"Esta lista n\xE3o aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`:l`<div class="panel">${[70,52,84].map(m=>l`<div class="skeleton" style="width:${m}%"></div>`)}</div>`}
        ${c.length?l`
              <div class="done-head">
                <button class="done-toggle ${u?"open":""}" @click=${()=>this._doneOpen={...this._doneOpen,[t]:!u}} aria-expanded=${u?"true":"false"}>
                  Concluídos <span class="count">· ${c.length}</span>${g("chevron-down")}
                </button>
                ${o?l`<button class="text-btn" @click=${()=>this._confirmClearDone(e)}>Limpar</button>`:p}
              </div>
              ${u?l`<div class="panel items">${V(c,I,m=>this._renderItem(e,m))}</div>`:p}
            `:p}
        ${!a&&d&&d.length?l`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`:p}
      </section>
    `}_selOn(t){return!!(this._sel&&this._sel.listId===t&&this._sel.path===this._path)}_startSelect(t,e=null){this._sel={listId:t.id,path:this._path,keys:new Set(e?[I(e)]:[])},this._haptic("light")}_toggleSel(t){let e=new Set(this._sel.keys),s=I(t);e.has(s)?e.delete(s):e.add(s),this._sel={...this._sel,keys:e}}_endSelect(){this._sel=null}_renderSelecting(t,e){let s=e.filter(i=>this._sel.keys.has(I(i))).length,a=s===e.length&&e.length>0;return l`
      <section class="page selecting-page" style=${O(t.color,this._dark)}>
        <div class="detail-head sel-head">
          <button class="icon-btn" @click=${()=>this._endSelect()} aria-label="Cancelar seleção">${g("x")}</button>
          <div class="dh-text">
            <div class="overline">${t.name}</div>
            <h1 class="display">${s?`${s} ${s===1?"selecionado":"selecionados"}`:"Selecionar"}</h1>
          </div>
          <button class="text-btn" @click=${()=>this._sel={...this._sel,keys:a?new Set:new Set(e.map(I))}}>${a?"Nenhum":"Todos"}</button>
        </div>
        <div class="panel items">${V(e,I,i=>this._renderItem(t,i,{selecting:!0,selected:this._sel.keys.has(I(i))}))}</div>
        <div class="sel-bar">
          <button class="btn primary" ?disabled=${!s} @click=${()=>this._openSheet("move",{listId:t.id})}>${g("arrow-right-left")}Mover para outra lista</button>
        </div>
      </section>
    `}_renderMoveSheet(){let t=this._list(this._form.listId);if(!t||!this._sel)return p;let e=this._sel.keys.size,s=this._L.filter(a=>a.id!==t.id&&w(a.features,$.CREATE)&&!a.unavailable&&!a.hidden);return l`
      <div class="sheet-head">
        <h3 class="display">Mover ${e} ${e===1?"item":"itens"} para</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${s.length?l`<div class="chip-row grid">${s.map(a=>l`<button class="pick list" style=${O(a.color,this._dark)} @click=${()=>this._moveSelected(a.id)}><span class="dot"></span><span>${S(a.name,26)}</span></button>`)}</div>`:l`<p class="page-sub">Nenhuma outra lista aceita itens novos.</p>`}
    `}async _moveItem(t,e,s){let a=e.summary||"",i=U(e.due);if(!await this._addFull(s,{summary:a,description:ht(e.description),date:i?i.date:null,time:i?i.time:null}))return!1;let d=this._ruleFor(t.id,e);d&&d.days&&(await this._setRule(s.id,{summary:a,days:d.days}),await this._setRule(t.id,{uid:e.uid,summary:a,days:null}));let n=this._rawPoints(t.id,a);n&&(await this._setTaskPoints(s.id,a,n),await this._setTaskPoints(t.id,a,0));let c=this._roomIdsOf(t.id,a),h=this._equipIdsOf(t.id,a);c.length&&(await this._setTaskRoom(s.id,a,c),await this._setTaskRoom(t.id,a,null)),h.length&&(await this._setTaskEquip(s.id,a,h),await this._setTaskEquip(t.id,a,null));let u=this._externalOf(t.id,a);return u&&(await this._setTaskExternal(s.id,a,u),await this._setTaskExternal(t.id,a,null)),!0}async _moveSelected(t){let e=this._list(this._sel.listId),s=this._list(t);if(!e||!s)return;let a=(e.items||[]).filter(o=>this._sel.keys.has(I(o)));this._closeSheet(),this._endSelect();let i=[];for(let o of a)await this._moveItem(e,o,s)&&i.push(o);i.length&&await this._call("remove_item",{item:i.map(I)},e.id),this._haptic("light"),this._showToast(i.length===a.length?`${i.length} ${i.length===1?"item movido":"itens movidos"} para ${S(s.name,28)}`:`Movidos ${i.length} de ${a.length} para ${S(s.name,28)}`)}_renderText(t,e){return Js(t).map(s=>s.url?l`<a class="lnk" href=${s.url} target="_blank" rel="noopener noreferrer" @click=${a=>a.stopPropagation()} title=${s.url}>${g(s.icon)}<span>${s.label}</span></a>`:this._highlight(s.text,e))}_highlight(t,e){if(!e)return t;let s=Ns(t),a=N(e);if(!a)return t;let i=[],o=0,d;for(;(d=s.indexOf(a,o))!==-1;)d>o&&i.push(t.slice(o,d)),i.push(l`<mark>${t.slice(d,d+a.length)}</mark>`),o=d+a.length;return o<t.length&&i.push(t.slice(o)),i}_renderItem(t,e,s={}){let a=L(e),i=!a&&B(e.due),o=w(t.features,$.UPDATE),d=this._ruleFor(t.id,e),n=d?a&&d.reopen_at?l`<span class="tag rep">${g("repeat")}volta ${this._returnLabel(d.reopen_at)}</span>`:l`<span class="tag rep">${g("repeat")}${this._everyLabel(d.days)}</span>`:p;if(s.selecting){let c=!!s.selected;return l`
        <div class="item selecting ${c?"picked":""}" data-key=${I(e)} @click=${()=>this._toggleSel(e)}>
          <span class="check sel ${c?"on":""}" role="checkbox" aria-checked=${c?"true":"false"} aria-label="Selecionar ${e.summary||""}">${g("check")}</span>
          <div class="it-body">
            <div class="it-text">${e.summary||""}</div>
            ${this._roomIdOf(t.id,e.summary)||this._equipIdOf(t.id,e.summary)||this._externalOf(t.id,e.summary)?l`<div class="chips">${this._renderExternalTag(t.id,e)} ${this._renderRoomTag(t.id,e)} ${this._renderEquipTag(t.id,e)}</div>`:p}
          </div>
        </div>
      `}return l`
      <div class="item ${a?"done":""}" data-key=${I(e)} ?data-drag=${s.draggable} style=${s.showList?O(t.color,this._dark):""} @contextmenu=${s.selectable?c=>(c.preventDefault(),this._startSelect(t,e)):null}>
        <button class="check ${a?"on":""}" role="checkbox" aria-checked=${a?"true":"false"} aria-label=${a?"Marcar como pendente":"Marcar como resolvido"} ?disabled=${!o} @click=${()=>this._toggle(t,e)}>
          ${g("check")}
        </button>
        <div class="it-body" @click=${()=>o&&this._openEdit(t,e)}>
          <div class="it-text">${this._renderText(e.summary||"",s.query)}</div>
          ${ht(e.description)?l`<div class="it-desc">${this._renderText(ht(e.description),s.query)}</div>`:p}
          ${s.why?l`<div class="it-why">${g(s.whyIcon||"lightbulb")}<span>${s.why}</span></div>`:p}
          ${i||s.showList||d||this._pointsOf(t.id,e.summary,e.uid)||this._roomIdOf(t.id,e.summary)||this._equipIdOf(t.id,e.summary)||this._externalOf(t.id,e.summary)?l`<div class="chips">
                ${s.showList?l`<span class="tag list">${g(t.icon)}${S(t.name,24)}</span>`:p}
                ${this._renderExternalTag(t.id,e)} ${this._renderRoomTag(t.id,e)} ${this._renderEquipTag(t.id,e)}
                ${i?t.noDue?l`<span class="tag info" title=${t.canDue?"Prazos desligados: a data \xE9 s\xF3 informa\xE7\xE3o":"Data da integra\xE7\xE3o, n\xE3o \xE9 prazo"}>${g("clock-fading")}${i.text}</span>`:l`<span class="tag ${i.tone==="late"?"late":i.tone==="today"?"today":""}">${g(i.time?"clock":"calendar")}${i.text}</span>`:p}
                ${n} ${this._renderPointsTag(t.id,e)}
              </div>`:p}
        </div>
        ${s.draggable?l`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${c=>this._dragStart(c,t,e)} @click=${c=>c.preventDefault()}>${g("grip-vertical")}</button>`:p}
      </div>
    `}_dueRows(t=this._visible()){let e=[];for(let s of t)if(!s.noDue)for(let a of s.items||[]){if(L(a)&&!this._recent.has(I(a)))continue;let i=B(a.due);i&&e.push({l:s,i:a,d:i})}return e.sort((s,a)=>s.d.at-a.d.at)}_renderHomeFacts(t){let e=this._dueOn()?this._dueRows(t):[],s=e.filter(h=>h.d.overdue),a=e.filter(h=>!h.d.overdue&&h.d.diff===0),i=e.find(h=>!h.d.overdue&&h.d.diff>0),o=[...t].filter(h=>h.pending>0).sort((h,u)=>u.pending-h.pending)[0],d=t.reduce((h,u)=>h+u.done,0),n=[],c=(h,u,f,m,x,v)=>n.push({ic:h,tone:u,label:f,value:m,right:x,go:v});return this._dueOn()&&(c("circle-alert",s.length?"late":"","Atrasados",s.length?s[0].i.summary:"Nada atrasado",s.length?String(s.length):"",s.length?()=>this._go("/prazos"):null),c("clock",a.length?"today":"","Para hoje",a.length?a[0].i.summary:"Nada para hoje",a.length?String(a.length):"",a.length?()=>this._go("/prazos"):null),c("calendar-clock","","Pr\xF3ximo prazo",i?i.i.summary:"Sem prazos marcados",i?i.d.text:"",i?()=>this._go(`/lista/${i.l.id}`):null)),c("list-checks","","Mais cheia",o?o.name:"Tudo resolvido",o?k(o.pending,"pendente","pendentes"):"",o?()=>this._go(`/lista/${o.id}`):null),this._dueOn()||c("circle-check","","Resolvidos",k(d,"item feito","itens feitos"),"",null),l`<dl class="facts">
      ${n.map(h=>l`<div class="fact-row ${h.go?"go":""}" role=${h.go?"link":"group"} tabindex=${h.go?"0":"-1"} @click=${h.go||(()=>{})} @keydown=${u=>h.go&&u.key==="Enter"&&h.go()}>
          <dt><span class="sec-ic ${h.tone}" aria-hidden="true">${g(h.ic)}</span>${h.label}</dt>
          <dd>${h.value}</dd>
          <dd class="fv ${h.tone}">${h.right}</dd>
        </div>`)}
    </dl>`}_renderDue(){let t=this._visible(),e=t.some(c=>w(c.features,$.DUE_DATE)||w(c.features,$.DUE_DATETIME)),s=this._dueRows(t),a=[{title:"Atrasados",test:c=>c.overdue},{title:"Hoje",test:c=>c.diff===0},{title:"Amanh\xE3",test:c=>c.diff===1},{title:"Pr\xF3ximos 7 dias",test:c=>c.diff>1&&c.diff<7},{title:"Mais adiante",test:()=>!0}],i=new Set,o=a.map(c=>{let h=s.filter(u=>!i.has(u)&&c.test(u.d));return h.forEach(u=>i.add(u)),{...c,rows:h}}).filter(c=>c.rows.length),d=(this._repeatOn()?this._rules:[]).filter(c=>c.reopen_at).map(c=>{let h=this._list(c.entity_id),u=h&&h.items&&c.uid?h.items.find(f=>f.uid===c.uid):null;return{r:c,l:h,item:u}}).filter(c=>c.l&&!c.l.hidden).sort((c,h)=>c.r.reopen_at-h.r.reopen_at),n=d.length?l`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${d.length}</div>
          ${V(d,c=>c.r.id,c=>c.item?this._renderItem(c.l,c.item,{showList:!0}):l`<div class="item done" style=${O(c.l.color,this._dark)}>
                    <span class="check on">${g("repeat")}</span>
                    <div class="it-body" @click=${()=>this._go(`/lista/${c.l.id}`)}>
                      <div class="it-text">${c.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${g(c.l.icon)}${S(c.l.name,24)}</span>
                        <span class="tag rep">${g("repeat")}volta ${this._returnLabel(c.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`)}
        </div>`:p;return l`
      <section class="page">
        ${this._renderPageHead("Prazos",(()=>{let c=s.filter(f=>f.d.overdue).length,h=s.filter(f=>!f.d.overdue&&f.d.diff===0).length,u=[];return c&&u.push(k(c,"atrasado","atrasados")),h&&u.push(`${h} para hoje`),d.length&&u.push(`${d.length} ${d.length===1?"volta":"voltam"} sozinha${d.length===1?"":"s"}`),{text:u.length?u.join(" \xB7 "):"Nada atrasado",tone:c?"late":""}})())}
        ${o.length||d.length?[o.map(c=>l`
                <div class="panel items">
                  <div class="overline" style=${c.title==="Atrasados"?"color:var(--rv-late)":""}>${c.title} · ${c.rows.length}</div>
                  ${V(c.rows,h=>h.l.id+I(h.i),h=>this._renderItem(h.l,h.i,{showList:!0}))}
                </div>
              `),n]:l`<div class="panel">
              <div class="empty">
                <div class="em-icon">${g("calendar-days")}</div>
                ${e?l`<h3>Nada com prazo</h3>
                      <p>Quando um item tiver data, ele aparece aqui. Toque num item para definir um prazo.</p>`:l`<h3>Sem prazos por aqui</h3>
                      <p>Suas listas atuais não aceitam datas. Listas locais (“Lista de tarefas local”), Google Tasks e CalDAV aceitam.</p>`}
              </div>
            </div>`}
      </section>
    `}_searchToggle(t,e,s,a,i=""){return l`<button class="pick ${s?"on":""}" aria-pressed=${s?"true":"false"} ?disabled=${!!i} title=${i} @click=${a}>${g(t)}<span>${e}</span></button>`}_renderSearch(){let t=this._query.trim(),e=N(t),s=[],a=0,i=this._roomsOn()&&this._searchRooms,o=this._equipsOn()&&this._searchEquips,d=(n,c)=>i||o?N(this._placeText(n.id,c.summary,{rooms:i,equips:o})).includes(e):!1;if(e)for(let n of this._visible()){let c=(n.items||[]).filter(h=>(this._searchDone||!L(h))&&(N(h.summary).includes(e)||N(h.description).includes(e)||d(n,h)||this._searchExt&&N(this._externalText(n.id,h.summary)).includes(e)));c.length&&(c.sort((h,u)=>Number(L(h))-Number(L(u))),s.push({l:n,hits:c}),a+=c.length)}return l`
      <section class="page">
        ${this._renderPageHead("Buscar",{text:`Em ${k(this._visible().length,"lista","listas")}`})}
        <label class="search-box">
          ${g("search")}
          <input type="search" data-q="buscar" placeholder="Buscar em todas as listas" .value=${this._query} @input=${n=>this._query=n.target.value} enterkeyhint="search" aria-label="Buscar" />
          ${this._query?l`<button class="icon-btn" style="width:40px;height:40px" @click=${()=>this._query=""} aria-label="Limpar">${g("x")}</button>`:p}
        </label>
        <div class="filters-label" id="incluir">Incluir</div>
        <div class="filters" role="group" aria-labelledby="incluir">
          ${this._searchToggle("circle-check","Conclu\xEDdos",this._searchDone,()=>this._searchDone=!this._searchDone)}
          ${this._searchToggle("hard-hat","Servi\xE7os externos",this._searchExt,()=>this._searchExt=!this._searchExt)}
          ${this._rooms&&this._rooms.encontrado?l`${this._searchToggle("door-open","C\xF4modos",this._roomsOn()&&this._searchRooms,()=>this._searchRooms=!this._searchRooms,this._roomsOn()?"":"Ligue Usar c\xF4modos em Mais \u203A Configura\xE7\xF5es \u203A Integra\xE7\xF5es")}
              ${this._searchToggle("package","Equipamentos",this._equipsOn()&&this._searchEquips,()=>this._searchEquips=!this._searchEquips,this._equipsOn()?"":"Ligue Usar equipamentos em Mais \u203A Configura\xE7\xF5es \u203A Integra\xE7\xF5es")}`:p}
        </div>
        ${e?s.length?l`<p class="page-sub" style="margin-top:0">${k(a,"resultado","resultados")}</p>
                ${s.map(({l:n,hits:c})=>l`
                    <div class="panel items" style=${O(n.color,this._dark)}>
                      <div class="overline">${n.name}${n.group?` \xB7 ${n.group}`:""}</div>
                      ${V(c,I,h=>this._renderItem(n,h,{query:t}))}
                    </div>
                  `)}`:l`<div class="panel"><div class="empty"><div class="em-icon">${g("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${S(t,30)}”.</p></div></div>`:l`<p class="page-sub" style="margin-top:0">Procure por qualquer palavra, em todas as listas.</p>`}
      </section>
    `}_configTabs(){return[...this.hass.resolvia?[["integracoes","Integra\xE7\xF5es","blocks","integra\xE7\xF5es"]]:[],...this._data()?[["dados","Dados","archive","dados e backup"]]:[],["aparencia","Apar\xEAncia","palette","apar\xEAncia"],["opcoes","Op\xE7\xF5es","toggle-right","op\xE7\xF5es"]]}_configTab(){let t=this._configTabs(),e=this._view().tab;return t.some(s=>s[0]===e)?e:t[0][0]}_moreRows(){let t=this._configTabs().map(s=>s[3]),e=`${t.slice(0,-1).join(", ")} e ${t[t.length-1]}.`;return[["/listas","list-checks","Listas","Nome, cor, \xEDcone e quais aparecem."],...this._rulesOk?[["/repeticoes","repeat","Repeti\xE7\xF5es","Tarefas que voltam sozinhas."]]:[],["/config","sliders-horizontal","Configura\xE7\xF5es",e[0].toUpperCase()+e.slice(1)]]}_secHead(t,e,s=null){return l`<div class="mais-head"><span class="mais-ic" aria-hidden="true">${g(t)}</span><h2>${e}</h2></div>${s?l`<p class="panel-lead">${s}</p>`:p}`}_renderFoot(){return l`<p class="foot"><b>ResolvIA</b><br />v${ha} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote?"Personaliza\xE7\xF5es sincronizadas entre aparelhos.":"Personaliza\xE7\xF5es salvas neste aparelho."}</p>`}_renderMore(){return l`
      <section class="page">
        ${this._renderPageHead("Mais",null)}
        <div class="panel more-menu" role="navigation" aria-label="Mais">
          <ul>
            ${this._moreRows().map(([t,e,s,a])=>l`<li>
                <button class="more-row" @click=${()=>this._openFromMenu(t)}>
                  <span class="mais-ic" aria-hidden="true">${g(e)}</span>
                  <span class="mb"><b>${s}</b><span>${a}</span></span>
                  ${g("chevron-right","chev")}
                </button>
              </li>`)}
          </ul>
        </div>
        ${this._renderFoot()}
      </section>
    `}_renderMoreScreen(t,e,s){return l`
      <section class="page">
        ${this._renderPageHead(t,e,!0)}
        ${s}
      </section>
    `}_listsStatus(){let t=this._L.filter(e=>e.hidden).length;return{text:this._L.length?`${k(this._L.length,"lista","listas")}${t?` \xB7 ${k(t,"oculta","ocultas")}`:""}`:"Nenhuma lista ainda"}}_renderConfig(){let t=this._configTabs(),e=this._configTab(),s=i=>{i!==e&&(this._haptic("light"),this._go(this._configPath(i),!0,history.state&&history.state.rvUp?{rvUp:!0}:null))},a;return e==="integracoes"?a=l`${this._renderRewardsPanel()} ${this._renderRoomsPanel()} ${this._renderAiPanel()} ${this.hass.resolvia&&this.hass.resolvia.voiceStatus&&this._aiOn()?this._renderVoicePanel():p} ${this.hass.resolvia&&this._aiOn()?this._renderUsage():p} ${this._renderSensorsPanel()}`:e==="dados"?a=this._renderDataPanel():e==="aparencia"?a=this._renderAppearanceTab():a=this._renderOptionsTab(),l`
      <section class="page">
        ${this._renderPageHead("Configura\xE7\xF5es",null,!0)}
        <div class="seg compact more-tabs" role="tablist" aria-label="Seções de Configurações">
          ${t.map(([i,o,d])=>l`<button class=${e===i?"on":""} role="tab" aria-selected=${e===i?"true":"false"} @click=${()=>s(i)}>${g(d)}<span>${o}</span></button>`)}
        </div>
        <div role="tabpanel" aria-label=${t.find(i=>i[0]===e)[1]}>${a}</div>
        ${this._renderFoot()}
      </section>
    `}_renderListsTab(){let t=(a,i,o)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${a} @change=${o} aria-label=${i} /><span class="track"></span></label>`,e=this._L.filter(a=>a.hidden),s=a=>l`
      <div class="row ${a.hidden?"inact":""}" style=${O(a.color,this._dark)}>
        <button class="tile" @click=${()=>this._openCustomize(a)} aria-label="Personalizar ${a.name}">${g(a.icon)}</button>
        <button class="grow" style="text-align:left" @click=${()=>this._openCustomize(a)}>
          <div class="label">${a.name}</div>
          <div class="hint">${a.group||a.id}</div>
        </button>
        ${t(!a.hidden,`Mostrar ${a.name}`,i=>this._saveListPrefs(a.id,{hidden:i.target.checked?null:!0}))}
      </div>
    `;return l`
        <div class="panel lists-panel">
          <p class="panel-lead">Toque numa lista para personalizar.</p>
          ${this._L.length?V(this._L.filter(a=>!a.hidden),a=>a.id,s):l`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
          ${e.length?l`<button class="row inact-head ${this._inactOpen?"open":""}" aria-expanded=${this._inactOpen?"true":"false"} @click=${()=>(this._inactOpen=!this._inactOpen,this.requestUpdate())}>
                  <span class="tile muted">${g("eye-off")}</span>
                  <span class="grow"><div class="label">Inativas <span class="count">${e.length}</span></div></span>
                  ${g("chevron-down","chev")}
                </button>
                ${this._inactOpen?V(e,a=>a.id,s):p}`:p}
        </div>

        ${this.hass.user&&this.hass.user.is_admin?l`<div class="panel">
              <button class="row" @click=${()=>this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${O(this._accent(),this._dark)}>${g("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${g("chevron-right")}
              </button>
              <button class="row" @click=${()=>this._openInHA("/todo")}>
                <span class="tile" style=${O(ot[9],this._dark)}>${g("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${g("chevron-right")}
              </button>
            </div>`:p}

    `}_renderRulesTab(){let t=this._repeatOn();return l`<div class="panel">
              ${this._secHead("repeat","Repeti\xE7\xE3o autom\xE1tica")}
              <div class="row switch-row">
                <div class="grow">
                  <div class="label">Repetir depois de concluir</div>
                  <div class="hint" style="white-space:normal">${t?"O item volta sozinho N dias depois de feito.":"Desligado."}</div>
                </div>
                <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${e=>this._toggleRepeat(e)} aria-label="Repetir depois de concluir" /><span class="track"></span></label>
              </div>
            </div>
            ${!t&&!this._rules.length?p:l`<div class="panel ${t?"":"paused"}">
              ${this._secHead("rotate-ccw","Tarefas que se repetem")}
              ${!t&&this._rules.length?l`<p class="panel-lead">Não voltam mais sozinhas. Exclua para limpar.</p>
                    <div class="btn-row sec-actions"><button class="btn danger sm" @click=${()=>this._confirmClearRules(!1)}>${g("trash")}Excluir ${k(this._rules.length,"repeti\xE7\xE3o","repeti\xE7\xF5es")}</button></div>`:p}
              ${this._rules.length?this._rules.map(e=>{let s=this._list(e.entity_id);return s?l`<div class="row" style=${O(s.color,this._dark)}>
                      <span class="tile">${g("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${()=>this._go(`/lista/${s.id}`)}>
                        <div class="label">${e.summary||e.match}</div>
                        <div class="hint">${s.name} · ${this._everyLabel(e.days)}${t?e.reopen_at?` \xB7 volta ${this._returnLabel(e.reopen_at)}`:"":" \xB7 desligada"}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${()=>this._setRule(e.entity_id,{uid:e.uid,summary:e.match||e.summary,days:null})}>${g("x")}</button>
                    </div>`:p}):l`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir”.</div></div>`}
            </div>`}`}_toggleRepeat(t){let e=t.target.checked;if(e||!this._rules.length)return this._saveAppPrefs({repeat_on:e});t.target.checked=!0,this._confirmClearRules(!0)}_confirmClearRules(t){let e=this._rules.length;this._openSheet("confirm",{title:t?"Desligar a repeti\xE7\xE3o?":"Excluir as repeti\xE7\xF5es?",text:`${k(e,"tarefa se repete","tarefas se repetem")}. ${t?"Ao desligar, essas repeti\xE7\xF5es s\xE3o exclu\xEDdas":"Elas ser\xE3o exclu\xEDdas"}: os itens continuam nas listas, mas n\xE3o voltam mais sozinhos depois de conclu\xEDdos.`,label:t?"Excluir e desligar":`Excluir ${k(e,"repeti\xE7\xE3o","repeti\xE7\xF5es")}`,run:async()=>{this._closeSheet();try{await this.hass.callWS({type:"resolvia/recurring/clear"}),t&&await this._saveAppPrefs({repeat_on:!1}),this._haptic("warning"),this._showToast(`${k(e,"repeti\xE7\xE3o exclu\xEDda","repeti\xE7\xF5es exclu\xEDdas")}${t?" \xB7 repeti\xE7\xE3o desligada":""}`)}catch(s){this._showToast(`N\xE3o consegui: ${s.message}`)}}})}_renderOptionsTab(){let t=(s,a,i)=>l`<label class="switch"><input type="checkbox" role="switch" .checked=${s} @change=${i} aria-label=${a} /><span class="track"></span></label>`,e=this._dueOn();return l`
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
    `}_renderAppearanceTab(){let t=this._accentDaily(),e=t?this._accent().id:this._app("accent","vermelho");return l`
        <div class="panel">
          ${this._secHead("contrast","Tema","Cada aparelho guarda a sua escolha.")}
          ${Ds({theme:this._theme,onTheme:s=>this._setTheme(s),icon:g})}
        </div>
        <div class="panel">
          ${this._secHead("palette","Cor do app","Vale para todos os aparelhos.")}
          <div class="row switch-row daily-row">
            <div class="grow"><div class="label">Cor do dia</div><div class="hint">Muda a cor do app todo dia.</div></div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${s=>this._saveAppPrefs({accent_daily:s.target.checked?null:!1})} aria-label="Cor do dia" /><span class="track"></span></label>
          </div>
          ${Ls({palette:ot,value:e,onPick:s=>this._saveAppPrefs({accent:s==="vermelho"?null:s,accent_daily:!1})})}
        </div>
    `}_renderSensorsPanel(){if(!this.hass.resolvia)return p;let t=this._app("sensors_on",!1)===!0;return l`<div class="panel" id="sensores">
      ${this._secHead("activity","Sensores no Home Assistant","Para usar em pain\xE9is e automa\xE7\xF5es do Home Assistant.")}
      <div class="row switch-row">
        <div class="grow"><div class="label">Criar sensores</div><div class="hint" style="white-space:normal">${t?"Ligado.":"Desligado: nenhum sensor no Home Assistant."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${e=>this._saveAppPrefs({sensors_on:e.target.checked?!0:null})} aria-label="Criar sensores" /><span class="track"></span></label>
      </div>
      ${t?l`<div class="sensor-list"><div class="sensor-row"><code>sensor.resolvia_ia_hoje</code><span>chamadas de IA hoje, com erros, cota e tokens estimados</span></div></div>`:p}
    </div>`}_renderAiPanel(){if(!this.hass.resolvia)return p;let t=this._aiOn(),e=l`<div class="row switch-row">
        <div class="grow"><div class="label">Usar IA</div><div class="hint" style="white-space:normal">${t?"Ligado.":"Desligado: sem leitura por IA, sem Falar."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${t} @change=${c=>this._saveAppPrefs({ai_off:c.target.checked?null:!0})} aria-label="Usar IA" /><span class="track"></span></label>
      </div>`;if(!t)return l`<div class="panel" id="leitura-ia">
        ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens, prints e fotos.")}
        ${e}
      </div>`;let s=this._aiInfo(),a=s.entities||[],i=this._app("ai_entity",""),o=this._aiChecking?"off":s.ready&&s.images?"ok":s.ready?"warn":"bad",d=this._aiChecking?"Verificando\u2026":s.ready&&s.images?"Pronta para ler fotos":s.ready?"S\xF3 l\xEA mensagens":"N\xE3o configurada",n="";return s.ready&&s.using&&(n=`Usando ${s.using.name}${i?"":" (a IA padr\xE3o do Home Assistant)"}.`,s.photos&&(n+=` Para fotos, ${s.photos.name}.`)),s.reason&&(n=`${n} ${s.reason}`.trim()),l`<div class="panel" id="leitura-ia">
      ${this._secHead("sparkles","Leitura por IA","Separa os itens de mensagens, prints e fotos, com a IA do Home Assistant.")}
      ${e}
      <div class="ai-state ${o}"><span class="dot"></span><div><b>${d}</b>${n?l`<span>${n}</span>`:p}</div></div>
      ${a.length||i?l`<label class="field" style="margin:14px 0 0">
            <span class="flabel">IA usada pelo app</span>
            <select class="select" aria-label="IA usada pelo app" @change=${c=>this._chooseAi(c.target.value)}>
              <option value="" ?selected=${!i}>Padrão do Home Assistant</option>
              ${a.map(c=>l`<option value=${c.id} ?selected=${c.id===i}>${c.name}${c.images?"":" (s\xF3 texto)"}${c.available?"":" (indispon\xEDvel)"}</option>`)}
              ${i&&!a.some(c=>c.id===i)?l`<option value=${i} selected>${i} (não encontrada)</option>`:p}
            </select>
          </label>`:p}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${()=>this._refreshAi()}>${g("rotate-ccw")}Verificar de novo</button></div>
      ${s.ready&&s.images?p:l`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
    </div>`}_renderSheet(){if(!this._sheet)return p;let t=p;return this._sheet==="item"?t=this._renderItemSheet():this._sheet==="listmenu"?t=this._renderListMenu():this._sheet==="customize"?t=this._renderCustomize():this._sheet==="confirm"?t=this._renderConfirm():this._sheet==="import"?t=this._renderImportSheet():this._sheet==="versions"?t=this._renderVersions():this._sheet==="who"?t=this._renderWhoSheet():this._sheet==="move"?t=this._renderMoveSheet():this._sheet==="chat"&&(t=this._renderChatSheet()),l`
      <div class="scrim" @click=${()=>this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${e=>e.key==="Escape"&&this._closeSheet()}>
        <div class="grab"></div>
        ${t}
      </div>
    `}_sheetStyle(){let t=this._form||{},e=this._list(t.target||t.listId),s=this._sheet==="customize"&&dt(t.color)||e&&e.color;return s?`--rv-accent:${s.fill};--rv-accent-ink:${this._dark?s.fill:s.ink};--rv-accent-soft:${Kt(s.fill,this._dark?.18:.14)};${O(s,this._dark)}`:""}_renderMirroredSheet(t){let e=this._form,s=e.mirrored,a=B(e.due),i=w(t.features,$.DELETE);return l`
      <div class="sheet-head">
        <h3 class="display">${s.tipo==="rotina"?"Rotina da casa":"Manuten\xE7\xE3o"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <div class="ro-item">
        <b>${e.summary}</b>
        <div class="ro-tags">
          ${a?l`<span class="tag ${t.noDue?"info":a.tone}">${g("calendar")}${a.text}</span>`:p}
          ${s.pontos?l`<span class="tag pts">${g("trophy")}+${s.pontos}</span>`:p}
          <span class="tag">${S(t.name,24)}</span>
        </div>
        ${e.description?l`<p>${e.description}</p>`:p}
      </div>
      <p class="sheet-note with-icon">${g("calendar-clock")}<span>Vem do CronologIA: concluir aqui marca como feito lá${s.pontos?` (${s.pontos} pontos)`:""}. Para editar, use o CronologIA.</span></p>
      <div class="sheet-actions">
        ${i?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${g("trash")}</button>`:p}
        <button class="btn primary" @click=${()=>this._closeSheet()}>Fechar</button>
      </div>
    `}_renderItemSheet(){let t=this._form,e=this._list(t.listId),s=this._list(t.target)||e;if(!e||!s)return p;if(t.mirrored&&t.mode==="edit")return this._renderMirroredSheet(e);let a=s.features,i=w(a,$.DESCRIPTION),o=this._dueOn()&&(w(a,$.DUE_DATE)||w(a,$.DUE_DATETIME)),d=w(a,$.DUE_DATETIME),n=t.mode==="edit"&&w(e.features,$.DELETE),c=Ws(),h=c.some(m=>m.date===t.date),u=t.mode==="add"?this._L.filter(m=>w(m.features,$.CREATE)&&!m.unavailable&&(!m.hidden||m.id===t.target)):w(e.features,$.DELETE)?this._L.filter(m=>w(m.features,$.CREATE)&&!m.unavailable&&(!m.hidden||m.id===e.id)):[],f=m=>{let x=this.renderRoot.querySelector(m);if(x)try{x.showPicker()}catch{x.focus(),x.click()}};return l`
      <div class="sheet-head">
        <h3 class="display">${t.mode==="add"?"Novo item":"Editar item"}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${t.mode==="add"&&this._canImport()?this._renderImportTiles({text:()=>this._openImport(t.target,"text"),photos:()=>this._openImport(t.target,"photos"),scan:()=>this._openImport(t.target,"scan")}):p}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${t.summary} @input=${m=>this._setForm({summary:m.target.value})} @keydown=${m=>m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${i?l`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${t.description} @input=${m=>this._setForm({description:m.target.value})} placeholder="Detalhes, links…"></textarea>
          </label>`:p}
      ${o?l`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row grid">
              ${c.map(m=>l`<button class="pick ${t.date===m.date?"on":""}" @click=${()=>this._setForm({date:t.date===m.date?null:m.date})}>${m.label}</button>`)}
              <button class="pick ${t.date&&!h?"on":""}" @click=${()=>f("#rv-date")}>
                ${g("calendar")}<span>${t.date&&!h?we(t.date):"Outra data"}</span>
                <input id="rv-date" class="hidden-input" type="date" tabindex="-1" .value=${t.date||""} @change=${m=>this._setForm({date:m.target.value||null})} />
              </button>
              ${t.date?l`<button class="pick ghost" @click=${()=>this._setForm({date:null,time:null})}>${g("x")}<span>Sem prazo</span></button>`:p}
            </div>
            ${d&&t.date?l`<div class="time-row">
                  <span class="tl">Horário</span>
                  <input type="time" .value=${t.time||""} @change=${m=>this._setForm({time:m.target.value||null})} />
                  ${t.time?l`<button class="text-btn" @click=${()=>this._setForm({time:null})}>Dia todo</button>`:p}
                </div>`:p}
          </div>`:p}
      ${this._rulesOk&&this._repeatOn()&&!t.mirrored&&(w(a,$.UPDATE)||w(a,$.CREATE))?l`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row grid">
              <button class="pick ${t.repeat?"":"on"}" @click=${()=>this._setForm({repeat:0,repeatCustom:!1})}>Não</button>
              ${ua.map(m=>l`<button class="pick ${t.repeat===m.days&&!t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeat:m.days,repeatCustom:!1})}>${m.label}</button>`)}
              <button class="pick ${t.repeatCustom?"on":""}" @click=${()=>this._setForm({repeatCustom:!0,repeat:t.repeat||4})}>${g("repeat")}<span>Outro</span></button>
            </div>
            ${t.repeatCustom?l`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(t.repeat||"")} @input=${m=>this._setForm({repeat:Math.max(0,Math.min(365,parseInt(m.target.value,10)||0))})} />
                  <span class="tl">dias</span>
                </div>`:p}
            ${t.repeat?l`<div class="field-hint">${g("repeat")}<span>Volta sozinha ${t.repeat===1?"no dia seguinte":`em ${t.repeat} dias`} depois de concluída.</span></div>`:p}
          </div>`:p}
      ${this._renderRoomField(t)}
      ${this._renderEquipField(t)}
      ${this._renderExternalField(t,a)}
      ${this._renderPointsField(t)}
      ${u.length>1?l`<div class="field">
            <span class="flabel">${t.mode==="add"?"Lista":"Lista (mover)"}</span>
            <div class="chip-row grid">
              ${u.map(m=>l`<button class="pick list ${t.target===m.id?"on":""}" style=${O(m.color,this._dark)} @click=${()=>this._setForm({target:m.id})}><span class="dot"></span><span>${S(m.name,26)}</span></button>`)}
            </div>
          </div>`:p}
      <div class="sheet-actions">
        ${n?l`<button class="btn danger" @click=${()=>this._deleteItem()} aria-label="Excluir">${g("trash")}</button>`:p}
        <button class="btn primary" @click=${()=>this._saveItem()}>${t.mode==="add"?"Adicionar":t.target!==t.listId?"Mover":"Salvar"}</button>
      </div>
    `}_renderImportTiles(t,{label:e=!0}={}){let s=this._aiInfo(),a=this._isHaAndroid(),i=this._camOk(),o=(d,n,c,h=!1,u="")=>l`<button type="button" class="imp-tile ${u?"no-cam":""}" ?disabled=${h} @click=${t[d]}>${g(n)}<span>${c}</span>${u?l`<small>${u}</small>`:p}</button>`;return l`<div class="field imp-field">
        ${e?l`<span class="flabel">Trazer de mensagem ou foto</span>`:p}
        <div class="imp-tiles">
          ${o("text","clipboard-paste","Colar mensagem")}
          ${o("photos","images","Escolher fotos",!s.images)}
          ${o("scan","scan-text","Digitalizar com\xA0IA",!s.images,i?"":"Precisa de https")}
        </div>
        ${s.images&&!i?l`<p class="imp-help">Em http a câmera não abre aqui: tire a foto pelo celular e use Escolher fotos.</p>`:a&&s.images?l`<p class="imp-help">No app do Home Assistant, a galeria manda uma foto por vez.</p>`:p}
      </div>
      ${s.ready?p:l`<div class="ai-box">${g("scan-text")}<span>Sem IA configurada, a mensagem é separada por linhas e vírgulas. Para ler fotos, configure a Leitura por IA em Mais › Configurações › Integrações.</span></div>`}`}_renderImportSheet(){let t=this._form,e=this._aiInfo(),s=(d,n)=>l`<div class="sheet-head">
      ${n?l`<button class="icon-btn back" @click=${n} aria-label="Voltar">${g("chevron-left")}</button>`:p}
      <h3 class="display">${d}</h3>
      <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
    </div>`,a=()=>{this._importToken=0,this._setForm({step:"pick",error:null,note:null})},i=t.error?l`<div class="imp-error">${g("circle-alert")}<span>${t.error}</span></div>`:p,o=t.images&&t.images.length?l`<div class="thumbs">${t.images.map(d=>l`<img src=${d.url} alt="" />`)}</div>`:p;if(t.step==="voice")return this._renderVoiceStep(s);if(t.step==="text")return l`
        ${s(t.heard?"O que voc\xEA disse":"Colar mensagem",a)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${t.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${d=>this._setForm({text:d.target.value,error:null})}></textarea>
        </label>
        ${i}
        <div class="sheet-actions">
          ${this._clipOk()?l`<button class="btn outline" @click=${()=>this._pasteClipboard()}>${g("clipboard-paste")}Colar</button>`:p}
          <button class="btn primary" ?disabled=${!(t.text||"").trim()} @click=${()=>this._readText()}>${e.ready?g("sparkles"):p}Separar itens</button>
        </div>
        ${e.ready?p:l`<p class="sheet-note">Sem IA configurada: separo por linhas, vírgulas e “e”.</p>`}
      `;if(t.step==="loading")return l`
        ${s("Lendo\u2026")}
        ${o}
        <div class="imp-loading">
          <span class="spin">${g("loader-circle")}</span>
          <span>${t.loadingText||"Lendo\u2026"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${()=>t.prevStep==="review"?(this._importToken=0,this._setForm({step:"review"})):a()}>Cancelar</button></div>
      `;if(t.step==="review"){let d=this._list(t.target),n=t.items.filter(f=>f.on&&f.text.trim()).length,c=this._importTargets(),h=c.length>1,u=new Set(t.items.filter(f=>f.on&&f.text.trim()).map(f=>this._importListOf(f)));return l`
        ${s("Revisar itens",a)}
        ${o}
        ${t.heard?l`<p class="heard">${g("mic")}<span>“${t.heard}”</span></p>`:p}
        <p class="sheet-note top">${k(t.items.length,"item encontrado","itens encontrados")}.</p>
        ${t.note?l`<div class="imp-error soft">${g("sparkles")}<span>${t.note}</span></div>`:p}
        <div class="imp-list">
          ${t.items.map((f,m)=>{let x=this._list(this._importListOf(f));return l`<div class="imp-row ${f.on?"":"off"} ${h||this._roomsOn()||this._equipsOn()?"has-dest":""}">
              <button class="check ${f.on?"on":""}" role="checkbox" aria-checked=${f.on?"true":"false"} aria-label="Incluir" @click=${()=>this._setImportItem(m,{on:!f.on})}>${g("check")}</button>
              <input type="text" .value=${f.text} aria-label="Item" @input=${v=>this._setImportItem(m,{text:v.target.value})} />
              <button class="icon-btn mini" aria-label="Remover" @click=${()=>this._setForm({items:t.items.filter((v,_)=>_!==m)})}>${g("x")}</button>
              ${h||this._roomsOn()||this._equipsOn()?l`<div class="imp-chips">
              ${h&&x?l`<label class="imp-dest" style=${O(x.color,this._dark)}>
                    <span class="dot"></span><span class="dname">${S(x.name,30)}</span>${g("chevron-down")}
                    <select aria-label="Lista de ${f.text}" @change=${v=>this._setImportItem(m,{list:v.target.value})}>
                      ${c.map(v=>l`<option value=${v.id} ?selected=${v.id===x.id}>${v.name}</option>`)}
                    </select>
                  </label>`:p}
              ${this._roomsOn()?l`<label class="imp-dest imp-room ${f.room?"":"none"}">
                    ${g("door-open")}<span class="dname">${f.room?S(this._roomName(f.room)||"",30):"C\xF4modo"}</span>${g("chevron-down")}
                    <select aria-label="Cômodo de ${f.text}" @change=${v=>this._setImportItem(m,{room:v.target.value||null})}>
                      <option value="" ?selected=${!f.room}>Nenhum</option>
                      ${this._roomList().map(v=>l`<option value=${v.id} ?selected=${v.id===f.room}>${v.nome}</option>`)}
                    </select>
                  </label>`:p}
              ${this._equipsOn()?l`<button type="button" class="imp-dest imp-room imp-equip ${f.equip?"":"none"} ${t.eqFor===m?"open":""}" aria-expanded=${t.eqFor===m?"true":"false"} aria-label="Equipamento de ${f.text}" @click=${()=>this._setForm({eqFor:t.eqFor===m?null:m,eqQ:"",eqMore:!1})}>
                    ${g("package")}<span class="dname">${f.equip?S((this._equipOf(f.equip)||{}).nome||"",30):"Equipamento"}</span>${g("chevron-down")}
                  </button>`:p}
                  </div>`:p}
              ${t.eqFor===m&&this._equipsOn()?l`<div class="imp-eq">${Yt({lit:{html:l,nothing:p},icon:g,items:this._equipItems(),room:this._roomsOn()?f.room:null,roomName:this._roomsOn()&&f.room&&this._roomName(f.room)||"",value:null,query:t.eqQ||"",more:!!t.eqMore,autofocus:!0,onQuery:v=>this._setForm({eqQ:v,eqMore:!1}),onMore:()=>this._setForm({eqMore:!0}),onPick:v=>{let _=this._equipOf(v),E=_&&_.comodo&&this._roomsOn()&&this._roomList().some(b=>b.id===_.comodo)?_.comodo:f.room;this._setImportItem(m,{equip:v,room:E}),this._setForm({eqFor:null,eqQ:""})}})}
                  ${f.equip?l`<button type="button" class="eq-more" @click=${()=>(this._setImportItem(m,{equip:null}),this._setForm({eqFor:null}))}>Sem equipamento</button>`:p}
                </div>`:p}
            </div>`})}
          <button class="pick ghost add-row" @click=${()=>{this._setForm({items:[...t.items,{text:"",on:!0}]}),this.updateComplete.then(()=>{let f=this.renderRoot.querySelectorAll(".imp-row input");f.length&&f[f.length-1].focus()})}}>${g("plus")}<span>Adicionar linha</span></button>
        </div>
        ${e.images?l`<div class="more-row">
              <button class="pick" @click=${()=>this._pickFiles("photos")}>${g("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${()=>this._openCamera()}>${g("scan-text")}<span>Digitalizar mais</span></button>
            </div>`:p}
        ${h?l`<div class="field">
              <span class="flabel">Todos em</span>
              <div class="chip-row grid">
                ${c.map(f=>l`<button class="pick list ${u.size===1&&u.has(f.id)?"on":""}" style=${O(f.color,this._dark)} @click=${()=>this._setForm({target:f.id,items:t.items.map(m=>({...m,list:f.id}))})}><span class="dot"></span><span>${S(f.name,26)}</span></button>`)}
              </div>
            </div>`:p}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!n} @click=${()=>this._importAdd()}>
            ${n?`Adicionar ${k(n,"item","itens")}`:"Nenhum item marcado"}${n&&u.size>1?` em ${u.size} listas`:n&&u.size===1&&this._list([...u][0])?` em ${S(this._list([...u][0]).name,18)}`:""}
          </button>
        </div>
      `}return l`
      ${s("Importar itens")}
      ${this._renderImportTiles({text:()=>(this._setForm({step:"text",error:null}),this._focusImportText()),photos:()=>this._pickFiles("photos"),scan:()=>this._openCamera()},{label:!1})}
      ${e.images?p:l`<div class="imp-error soft">${g("sparkles")}<span>${e.reason||"Para ler fotos, o Home Assistant precisa de uma integra\xE7\xE3o de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${()=>this._goAiSettings()}>Ver Leitura por IA</button></span></div>`}
      ${i}
    `}_renderListMenu(){let t=this._list(this._form.listId);return t?l`
      <div class="sheet-head">
        <h3 class="display">${t.name}</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      ${w(t.features,$.DELETE)&&(t.items||[]).some(e=>!L(e))?l`<button class="menu-row" @click=${()=>(this._closeSheet(),this._startSelect(t))}>${g("square-check-big")}Selecionar itens<span class="sub">para mover de lista</span></button>`:p}
      <button class="menu-row" @click=${()=>this._openCustomize(t)}>${g("palette")}Personalizar<span class="sub">${t.canDue&&this._dueOn()?"nome, cor, \xEDcone, prazos":"nome, cor, \xEDcone"}</span></button>
      <button class="menu-row" @click=${()=>(this._closeSheet(),this._saveListPrefs(t.id,{hidden:t.hidden?null:!0}))}>${g(t.hidden?"eye":"eye-off")}${t.hidden?"Mostrar no in\xEDcio":"Ocultar do in\xEDcio"}</button>
      ${this.hass.user&&this.hass.user.is_admin?l`<button class="menu-row" @click=${()=>this._openInHA(`/todo?entity_id=${t.id}`)}>${g("external-link")}Abrir na tela padrão do HA</button>`:p}
      ${w(t.features,$.DELETE)&&t.done?l`<button class="menu-row danger" @click=${()=>this._confirmClearDone(t)}>${g("brush-cleaning")}Limpar concluídos<span class="sub">${t.done}</span></button>`:p}
    `:p}_renderCustomize(){let t=this._form,e=this._list(t.listId);if(!e)return p;let s=dt(t.color)||e.color,a=t.icon||_e(`${e.origName} ${e.group||""} ${e.id}`);return l`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${()=>this._closeSheet()} aria-label="Fechar">${g("x")}</button>
      </div>
      <div class="preview-tile" style=${O(s,this._dark)}>
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
          ${ot.map(i=>l`<button class="sw ${s.id===i.id?"on":""}" style="--c:${i.fill}" aria-label=${i.label} @click=${()=>this._setForm({color:i.id})}>${s.id===i.id?g("check"):p}</button>`)}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${O(s,this._dark)}>
          ${js.map(i=>l`<button class="ig ${a===i?"on":""}" aria-label=${i} @click=${()=>this._setForm({icon:i})}>${g(i)}</button>`)}
        </div>
      </div>
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!t.hidden} @change=${i=>this._setForm({hidden:!i.target.checked})} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${this._dueOn()?e.canDue?l`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">Prazos</div>
              <div class="hint" style="white-space:normal">${t.deadlines?"Vencidos ficam vermelhos e entram em Prazos.":"Datas s\xF3 como informa\xE7\xE3o."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${t.deadlines} @change=${i=>this._setForm({deadlines:i.target.checked})} aria-label="Prazos" /><span class="track"></span></label>
          </div>`:e.hasDates?l`<p class="sheet-note with-icon">${g("info")}<span>Esta lista não aceita prazo: as datas vêm da integração, só como informação.</span></p>`:p:p}
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._setForm({name:"",color:null,icon:null,hidden:!1,deadlines:e.canDue})}>${g("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${()=>this._saveCustomize()}>Salvar</button>
      </div>
    `}_renderConfirm(){let t=this._form;return l`
      <div class="sheet-head"><h3 class="display">${t.title}</h3></div>
      <p class="confirm-text">${t.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${()=>this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${()=>t.run()}>${t.label}</button>
      </div>
    `}_renderToast(){if(!this._toast)return p;let t=this._toast;return l`<div class="toast ${this._sheet?"has-sheet":""}" role="status">
      <span>${t.text}</span>
      ${t.action?l`<button @click=${()=>{this._toast=null,t.action.run()}}>${t.action.label}</button>`:p}
    </div>`}};customElements.get("resolvia-panel")||customElements.define("resolvia-panel",Ie);var qe=class{constructor(t,e){this.url=t,this.onStatus=e,this.nextId=1,this.pending=new Map,this.subs=new Set,this.byId=new Map,this.queue=[],this.open=!1,this.everOpened=!1,this.backoff=1e3,this.reconnectHandlers=[],this._connect()}_connect(){let t=new WebSocket(this.url);this.ws=t,t.onopen=()=>{this.open=!0,this.backoff=1e3;let e=this.everOpened;this.everOpened=!0;for(let s of this.subs)this._startSub(s);for(let s of this.queue.splice(0))t.send(s);if(this.onStatus&&this.onStatus(!0),e)for(let s of this.reconnectHandlers)s()},t.onmessage=e=>{let s;try{s=JSON.parse(e.data)}catch{return}if(s.type==="result"){let a=this.pending.get(s.id);if(!a)return;if(this.pending.delete(s.id),s.success)a.resolve(s.result);else{let i=new Error(s.error&&s.error.message||"Falhou");i.code=s.error&&s.error.code,a.reject(i)}}else if(s.type==="event"){let a=this.byId.get(s.id);a&&a.cb(s.event)}},t.onclose=()=>{let e=this.open;this.open=!1,this.byId.clear();for(let[,s]of this.pending){let a=new Error("Sem conex\xE3o com o ResolvIA");a.code="disconnected",s.reject(a)}this.pending.clear(),e&&this.onStatus&&this.onStatus(!1),setTimeout(()=>this._connect(),this.backoff),this.backoff=Math.min(this.backoff*2,15e3)}}onReconnect(t){this.reconnectHandlers.push(t)}_send(t){let e=JSON.stringify(t);this.open?this.ws.send(e):this.queue.push(e)}sendMessagePromise(t){let e=this.nextId++;return new Promise((s,a)=>{this.pending.set(e,{resolve:s,reject:a}),this._send({...t,id:e})})}subscribeMessage(t,e){let s={cb:t,msg:e,id:null,first:null};this.subs.add(s);let a=new Promise((i,o)=>{s.first={resolve:i,reject:o}});return this.open&&this._startSub(s),a.then(()=>async()=>{this.subs.delete(s),s.id!=null&&(this.byId.delete(s.id),this.open&&this.sendMessagePromise({type:"unsubscribe_events",subscription:s.id}).catch(()=>{}))})}_startSub(t){let e=this.nextId++;t.id=e,this.byId.set(e,t),this.pending.set(e,{resolve:()=>{t.first&&t.first.resolve(),t.first=null},reject:s=>{s.code!=="disconnected"&&(this.byId.delete(e),this.subs.delete(t),t.first&&t.first.reject(s),t.first=null)}}),this.ws.send(JSON.stringify({...t.msg,id:e}))}};function fa(){try{if(window.parent===window)return null;let r=window.parent.document.querySelector("home-assistant");return r&&r.hass||null}catch{return null}}var Mt=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function ma(){let r=fa();return r&&r.themes&&typeof r.themes.darkMode=="boolean"?r.themes.darkMode:!!(Mt&&Mt.matches)}function ga(){return{topbar:!(window.parent!==window),haptic(t){try{let e=window.parent;e!==window&&e.dispatchEvent(new e.CustomEvent("haptic",{detail:t}))}catch{}},openInHA(t){try{let e=window.parent;if(e!==window&&e.document){e.history.pushState(null,"",t),e.dispatchEvent(new e.CustomEvent("location-changed",{detail:{replace:!1}}));return}}catch{}window.open(t,"_top")}}}async function va(r){let t=new URL("ws",location.href);t.protocol=location.protocol==="https:"?"wss:":"ws:";let e=null,s=n=>{e={...e,...n},r(e)},a=new qe(t.href,n=>e&&s({connected:n})),i=await a.sendMessagePromise({type:"resolvia/bootstrap"}),o=fa();e={states:i.states||{},entities:i.entities||{},devices:i.devices||{},user:{name:o&&o.user&&o.user.name||i.user&&i.user.name||"",is_admin:o&&o.user?!!o.user.is_admin:!0},themes:{darkMode:ma()},language:"pt-BR",connected:!0,version:i.version,resolvia:{ai:i.ai||{ready:!1,images:!1,entities:[]},aiStatus:()=>a.sendMessagePromise({type:"resolvia/ai/status"}),voiceStatus:(n=!1)=>a.sendMessagePromise({type:"resolvia/voice/status",...n?{fresh:!0}:{}}),async voiceText(n){let c=await fetch(new URL("api/voice",location.href),{method:"POST",headers:{"content-type":"application/octet-stream"},body:n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength)}),h=await c.json().catch(()=>({}));if(!c.ok){let u=new Error(h.error||`Erro ${c.status}`);throw u.code=h.code,u}return h},async extract(n){let c=await fetch(new URL("api/extract",location.href),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)}),h=await c.json().catch(()=>({}));if(!c.ok){let u=new Error(h.error||`Erro ${c.status}`);throw u.code=h.code,u}return h},data:{url:n=>new URL(`api/export/${n}`,location.href).href,async import(n){let c=await fetch(new URL("api/import",location.href),{method:"POST",headers:{"content-type":"application/octet-stream","x-file-name":encodeURIComponent(n.name||"")},body:n}),h=await c.json().catch(()=>({}));if(!c.ok)throw new Error(h.error||`Erro ${c.status}`);return h},versions:()=>a.sendMessagePromise({type:"resolvia/versions/list"}),restoreVersion:n=>a.sendMessagePromise({type:"resolvia/versions/restore",name:n}),backups:()=>a.sendMessagePromise({type:"resolvia/backups/list"}),createBackup:()=>a.sendMessagePromise({type:"resolvia/backups/create"}),restoreBackup:n=>a.sendMessagePromise({type:"resolvia/backups/restore",name:n})}},connection:a,callWS:n=>a.sendMessagePromise(n),callService:(n,c,h,u)=>a.sendMessagePromise({type:"call_service",domain:n,service:c,service_data:h||{},target:u})},a.subscribeMessage(n=>{let c={...e.states};n.new_state?c[n.entity_id]=n.new_state:delete c[n.entity_id],s({states:c})},{type:"resolvia/subscribe_lists"}),a.onReconnect(async()=>{try{let n=await a.sendMessagePromise({type:"resolvia/bootstrap"});s({states:n.states||{},entities:n.entities||{},devices:n.devices||{}})}catch{}});let d=()=>{let n=ma();e&&n!==e.themes.darkMode&&s({themes:{...e.themes,darkMode:n}})};return setInterval(d,1500),Mt&&Mt.addEventListener&&Mt.addEventListener("change",d),e}var ze=document.getElementById("app"),ft=document.createElement("resolvia-panel");ft.env=ga();ft.narrow=window.innerWidth<870;window.addEventListener("resize",()=>ft.narrow=window.innerWidth<870);va(r=>{ft.hass=r}).then(r=>{ft.hass=r,ze.replaceChildren(ft)}).catch(r=>{ze.innerHTML="";let t=document.createElement("div");t.id="boot",t.textContent=`N\xE3o consegui iniciar o ResolvIA: ${r.message}. Recarregue a p\xE1gina.`,ze.appendChild(t)});})();
