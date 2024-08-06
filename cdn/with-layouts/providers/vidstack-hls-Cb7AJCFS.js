import{l as S,p as L}from"../chunks/vidstack-DRcf_fbs.js";import{a as b,l as E}from"../chunks/vidstack-DTQV_dgc.js";import{VideoProvider as T}from"./vidstack-video-BJ0nDw-f.js";import{p as f,l as v,e as k,D as d,i as l,Q as w,H as y,m as x}from"../chunks/vidstack-BCgd_9ME.js";import{Q as m}from"../chunks/vidstack-DRH_1tFW.js";import{a as C,T as g}from"../chunks/vidstack-D3eGRtmi.js";import{L as u}from"../chunks/vidstack-C_AxqLKV.js";import{R as D}from"../chunks/vidstack-BBL7g7CQ.js";import{c as H}from"../chunks/vidstack-BfBBPhXV.js";import"./vidstack-html-BA4-qDSD.js";import"../chunks/vidstack-Bxv1Qnxe.js";import"../chunks/vidstack-BnwCCm_b.js";const I=r=>w(r);class A{#e;#t;#i=null;#n=null;config={};#r=new Set;get instance(){return this.#i}constructor(t,i){this.#e=t,this.#t=i}setup(t){const{streamType:i}=this.#t.$state,e=f(i).includes("live"),s=f(i).includes("ll-");this.#i=new t({lowLatencyMode:s,backBufferLength:s?4:e?8:void 0,renderTextTracksNatively:!1,...this.config});const o=this.#h.bind(this);for(const n of Object.values(t.Events))this.#i.on(n,o);this.#i.on(t.Events.ERROR,this.#f.bind(this));for(const n of this.#r)n(this.#i);this.#t.player.dispatch("hls-instance",{detail:this.#i}),this.#i.attachMedia(this.#e),this.#i.on(t.Events.AUDIO_TRACK_SWITCHED,this.#l.bind(this)),this.#i.on(t.Events.LEVEL_SWITCHED,this.#u.bind(this)),this.#i.on(t.Events.LEVEL_LOADED,this.#p.bind(this)),this.#i.on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND,this.#c.bind(this)),this.#i.on(t.Events.CUES_PARSED,this.#d.bind(this)),this.#t.qualities[m.enableAuto]=this.#y.bind(this),v(this.#t.qualities,"change",this.#m.bind(this)),v(this.#t.audioTracks,"change",this.#g.bind(this)),this.#n=k(this.#o.bind(this))}#s(t,i){return new d(I(t),{detail:i})}#o(){if(!this.#t.$state.live())return;const t=new D(this.#a.bind(this));return t.start(),t.stop.bind(t)}#a(){this.#t.$state.liveSyncPosition.set(this.#i?.liveSyncPosition??1/0)}#h(t,i){this.#t.player?.dispatch(this.#s(t,i))}#c(t,i){const e=this.#s(t,i);let s=-1;for(let o=0;o<i.tracks.length;o++){const n=i.tracks[o],h=n.subtitleTrack??n.closedCaptions,c=new C({id:`hls-${n.kind}-${o}`,src:h?.url,label:n.label,language:h?.lang,kind:n.kind,default:n.default});c[g.readyState]=2,c[g.onModeChange]=()=>{c.mode==="showing"?(this.#i.subtitleTrack=o,s=o):s===o&&(this.#i.subtitleTrack=-1,s=-1)},this.#t.textTracks.add(c,e)}}#d(t,i){const e=this.#i?.subtitleTrack,s=this.#t.textTracks.getById(`hls-${i.type}-${e}`);if(!s)return;const o=this.#s(t,i);for(const n of i.cues)n.positionAlign="auto",s.addCue(n,o)}#l(t,i){const e=this.#t.audioTracks[i.id];if(e){const s=this.#s(t,i);this.#t.audioTracks[u.select](e,!0,s)}}#u(t,i){const e=this.#t.qualities[i.level];if(e){const s=this.#s(t,i);this.#t.qualities[u.select](e,!0,s)}}#p(t,i){if(this.#t.$state.canPlay())return;const{type:e,live:s,totalduration:o,targetduration:n}=i.details,h=this.#s(t,i);this.#t.notify("stream-type-change",s?e==="EVENT"&&Number.isFinite(o)&&n>=10?"live:dvr":"live":"on-demand",h),this.#t.notify("duration-change",o,h);const c=this.#i.media;this.#i.currentLevel===-1&&this.#t.qualities[m.setAuto](!0,h);for(const a of this.#i.audioTracks){const p={id:a.id.toString(),label:a.name,language:a.lang||"",kind:"main"};this.#t.audioTracks[u.add](p,h)}for(const a of this.#i.levels){const p={id:a.id?.toString()??a.height+"p",width:a.width,height:a.height,codec:a.codecSet,bitrate:a.bitrate};this.#t.qualities[u.add](p,h)}c.dispatchEvent(new d("canplay",{trigger:h}))}#f(t,i){if(i.fatal)switch(i.type){case"mediaError":this.#i?.recoverMediaError();break;default:this.#v(i.error);break}}#v(t){this.#t.notify("error",{message:t.message,code:1,error:t})}#y(){this.#i&&(this.#i.currentLevel=-1)}#m(){const{qualities:t}=this.#t;!this.#i||t.auto||(this.#i[t.switch+"Level"]=t.selectedIndex,b&&(this.#e.currentTime=this.#e.currentTime))}#g(){const{audioTracks:t}=this.#t;this.#i&&this.#i.audioTrack!==t.selectedIndex&&(this.#i.audioTrack=t.selectedIndex)}onInstance(t){return this.#r.add(t),()=>this.#r.delete(t)}loadSource(t){l(t.src)&&this.#i?.loadSource(t.src)}destroy(){this.#i?.destroy(),this.#i=null,this.#n?.(),this.#n=null}}class _{#e;#t;#i;constructor(t,i,e){this.#e=t,this.#t=i,this.#i=e,this.#n()}async#n(){const t={onLoadStart:this.#r.bind(this),onLoaded:this.#s.bind(this),onLoadError:this.#o.bind(this)};let i=await R(this.#e,t);if(y(i)&&!l(this.#e)&&(i=await $(this.#e,t)),!i)return null;if(!i.isSupported()){const e="[vidstack] `hls.js` is not supported in this environment";return this.#t.player.dispatch(new d("hls-unsupported")),this.#t.notify("error",{message:e,code:4}),null}return i}#r(){this.#t.player.dispatch(new d("hls-lib-load-start"))}#s(t){this.#t.player.dispatch(new d("hls-lib-loaded",{detail:t})),this.#i(t)}#o(t){const i=H(t);this.#t.player.dispatch(new d("hls-lib-load-error",{detail:i})),this.#t.notify("error",{message:i.message,code:4,error:i})}}async function $(r,t={}){if(!y(r)){if(t.onLoadStart?.(),r.prototype&&r.prototype!==Function)return t.onLoaded?.(r),r;try{const i=(await r())?.default;if(i&&i.isSupported)t.onLoaded?.(i);else throw Error("");return i}catch(i){t.onLoadError?.(i)}}}async function R(r,t={}){if(l(r)){t.onLoadStart?.();try{if(await S(r),!x(window.Hls))throw Error("");const i=window.Hls;return t.onLoaded?.(i),i}catch(i){t.onLoadError?.(i)}}}const O="https://cdn.jsdelivr.net";class P extends T{$$PROVIDER_TYPE="HLS";#e=null;#t=new A(this.video,this.ctx);get ctor(){return this.#e}get instance(){return this.#t.instance}static supported=E();get type(){return"hls"}get canLiveSync(){return!0}#i=`${O}/npm/hls.js@^1.5.0/dist/hls.min.js`;get config(){return this.#t.config}set config(t){this.#t.config=t}get library(){return this.#i}set library(t){this.#i=t}preconnect(){l(this.#i)&&L(this.#i)}setup(){super.setup(),new _(this.#i,this.ctx,t=>{this.#e=t,this.#t.setup(t),this.ctx.notify("provider-setup",this);const i=f(this.ctx.$state.source);i&&this.loadSource(i)})}async loadSource(t,i){if(!l(t.src)){this.removeSource();return}this.media.preload=i||"",this.appendSource(t,"application/x-mpegurl"),this.#t.loadSource(t),this.currentSrc=t}onInstance(t){const i=this.#t.instance;return i&&t(i),this.#t.onInstance(t)}destroy(){this.#t.destroy()}}export{P as HLSProvider};
