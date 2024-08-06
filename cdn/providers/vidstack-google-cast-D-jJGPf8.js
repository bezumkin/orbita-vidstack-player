import{l as u,e as y,g as p,a4 as C,ab as m,o as E,D as T,p as h}from"../chunks/vidstack-154A0M_7.js";import{T as n}from"../chunks/vidstack-BAV0EbF0.js";import{R as v}from"../chunks/vidstack-Dqya0aPI.js";import{L}from"../chunks/vidstack-C_AxqLKV.js";import{g as f,a as S,b as A,h as g,l as I,c as R}from"../chunks/vidstack-CagCIrDJ.js";class b{#t;constructor(t){this.#t=new chrome.cast.media.MediaInfo(t.src,t.type)}build(){return this.#t}setStreamType(t){return t.includes("live")?this.#t.streamType=chrome.cast.media.StreamType.LIVE:this.#t.streamType=chrome.cast.media.StreamType.BUFFERED,this}setTracks(t){return this.#t.tracks=t.map(this.#e),this}setMetadata(t,e){return this.#t.metadata=new chrome.cast.media.GenericMediaMetadata,this.#t.metadata.title=t,this.#t.metadata.images=[{url:e}],this}#e(t,e){const s=new chrome.cast.media.Track(e,chrome.cast.media.TrackType.TEXT);return s.name=t.label,s.trackContentId=t.src,s.trackContentType="text/vtt",s.language=t.language,s.subtype=t.kind.toUpperCase(),s}}const d=chrome.cast.media.TrackType.TEXT,k=chrome.cast.media.TrackType.AUDIO;class M{#t;#e;#i;constructor(t,e,s){this.#t=t,this.#e=e,this.#i=s}setup(){const t=this.syncRemoteActiveIds.bind(this);u(this.#e.audioTracks,"change",t),u(this.#e.textTracks,"mode-change",t),y(this.#o.bind(this))}getLocalTextTracks(){return this.#e.$state.textTracks().filter(t=>t.src&&t.type==="vtt")}#a(){return this.#e.$state.audioTracks()}#r(t){const e=this.#t.mediaInfo?.tracks??[];return t?e.filter(s=>s.type===t):e}#l(){const t=[],e=this.#a().find(i=>i.selected),s=this.getLocalTextTracks().filter(i=>i.mode==="showing");if(e){const i=this.#r(k),r=this.#d(i,e);r&&t.push(r.trackId)}if(s?.length){const i=this.#r(d);if(i.length)for(const r of s){const a=this.#d(i,r);a&&t.push(a.trackId)}}return t}#o(){const t=this.getLocalTextTracks();if(!this.#t.isMediaLoaded)return;const e=this.#r(d);for(const s of t)if(!this.#d(e,s)){p(()=>this.#i?.());break}}syncRemoteTracks(t){if(!this.#t.isMediaLoaded)return;const e=this.#a(),s=this.getLocalTextTracks(),i=this.#r(k),r=this.#r(d);for(const a of i){if(this.#h(e,a))continue;const o={id:a.trackId.toString(),label:a.name,language:a.language,kind:a.subtype??"main",selected:!1};this.#e.audioTracks[L.add](o,t)}for(const a of r){if(this.#h(s,a))continue;const o={id:a.trackId.toString(),src:a.trackContentId,label:a.name,language:a.language,kind:a.subtype.toLowerCase()};this.#e.textTracks.add(o,t)}}syncRemoteActiveIds(t){if(!this.#t.isMediaLoaded)return;const e=this.#l(),s=new chrome.cast.media.EditTracksInfoRequest(e);this.#c(s).catch(i=>{})}#c(t){const e=f();return new Promise((s,i)=>e?.editTracksInfo(t,s,i))}#h(t,e){return t.find(s=>this.#s(s,e))}#d(t,e){return t.find(s=>this.#s(e,s))}#s(t,e){return e.name===t.label&&e.language===t.language&&e.subtype.toLowerCase()===t.kind.toLowerCase()}}class w{$$PROVIDER_TYPE="GOOGLE_CAST";scope=C();#t;#e;#i;#a=null;#r="disconnected";#l=0;#o=0;#c=new n(0,0);#h=new v(this.#R.bind(this));#d;#s=null;#u=!1;constructor(t,e){this.#t=t,this.#e=e,this.#i=new M(t,e,this.#G.bind(this))}get type(){return"google-cast"}get currentSrc(){return this.#a}get player(){return this.#t}get cast(){return S()}get session(){return A()}get media(){return f()}get hasActiveSession(){return g(this.#a)}setup(){this.#L(),this.#S(),this.#i.setup(),this.#e.notify("provider-setup",this)}#L(){I(cast.framework.CastContextEventType.CAST_STATE_CHANGED,this.#f.bind(this))}#S(){const t=cast.framework.RemotePlayerEventType,e={[t.IS_CONNECTED_CHANGED]:this.#f,[t.IS_MEDIA_LOADED_CHANGED]:this.#g,[t.CAN_CONTROL_VOLUME_CHANGED]:this.#k,[t.CAN_SEEK_CHANGED]:this.#y,[t.DURATION_CHANGED]:this.#_,[t.IS_MUTED_CHANGED]:this.#p,[t.VOLUME_LEVEL_CHANGED]:this.#p,[t.IS_PAUSED_CHANGED]:this.#D,[t.LIVE_SEEKABLE_RANGE_CHANGED]:this.#C,[t.PLAYER_STATE_CHANGED]:this.#P};this.#d=e;const s=this.#b.bind(this);for(const i of m(e))this.#t.controller.addEventListener(i,s);E(()=>{for(const i of m(e))this.#t.controller.removeEventListener(i,s)})}async play(){if(!(!this.#t.isPaused&&!this.#u)){if(this.#u){await this.#v(!1,0);return}this.#t.controller?.playOrPause()}}async pause(){this.#t.isPaused||this.#t.controller?.playOrPause()}getMediaStatus(t){return new Promise((e,s)=>{this.media?.getStatus(t,e,s)})}setMuted(t){(t&&!this.#t.isMuted||!t&&this.#t.isMuted)&&this.#t.controller?.muteOrUnmute()}setCurrentTime(t){this.#t.currentTime=t,this.#e.notify("seeking",t),this.#t.controller?.seek()}setVolume(t){this.#t.volumeLevel=t,this.#t.controller?.setVolumeLevel()}async loadSource(t){if(this.#s?.src!==t&&(this.#s=null),g(t)){this.#A(),this.#a=t;return}this.#e.notify("load-start");const e=this.#x(t),s=await this.session.loadMedia(e);if(s){this.#a=null,this.#e.notify("error",Error(R(s)));return}this.#a=t}destroy(){this.#m(),this.#T()}#m(){this.#s||(this.#o=0,this.#c=new n(0,0)),this.#h.stop(),this.#l=0,this.#s=null}#A(){const t=new T("resume-session",{detail:this.session});this.#g(t);const{muted:e,volume:s,savedState:i}=this.#e.$state,r=i();this.setCurrentTime(Math.max(this.#t.currentTime,r?.currentTime??0)),this.setMuted(e()),this.setVolume(s()),r?.paused===!1&&this.play()}#T(){this.cast.endCurrentSession(!0);const{remotePlaybackLoader:t}=this.#e.$state;t.set(null)}#I(){const{savedState:t}=this.#e.$state;t.set({paused:this.#t.isPaused,currentTime:this.#t.currentTime}),this.#T()}#R(){this.#w()}#b(t){this.#d[t.type].call(this,t)}#f(t){const e=this.cast.getCastState(),s=e===cast.framework.CastState.CONNECTED?"connected":e===cast.framework.CastState.CONNECTING?"connecting":"disconnected";if(this.#r===s)return;const i={type:"google-cast",state:s},r=this.#n(t);this.#r=s,this.#e.notify("remote-playback-change",i,r),s==="disconnected"&&this.#I()}#g(t){if(!!!this.#t.isMediaLoaded)return;const s=h(this.#e.$state.source);Promise.resolve().then(()=>{if(s!==h(this.#e.$state.source)||!this.#t.isMediaLoaded)return;this.#m();const i=this.#t.duration;this.#c=new n(0,i);const r={provider:this,duration:i,buffered:new n(0,0),seekable:this.#E()},a=this.#n(t);this.#e.notify("loaded-metadata",void 0,a),this.#e.notify("loaded-data",void 0,a),this.#e.notify("can-play",r,a),this.#k(),this.#y(t);const{volume:c,muted:o}=this.#e.$state;this.setVolume(c()),this.setMuted(o()),this.#h.start(),this.#i.syncRemoteTracks(a),this.#i.syncRemoteActiveIds(a)})}#k(){this.#e.$state.canSetVolume.set(this.#t.canControlVolume)}#y(t){const e=this.#n(t);this.#e.notify("stream-type-change",this.#M(),e)}#M(){return this.#t.mediaInfo?.streamType===chrome.cast.media.StreamType.LIVE?this.#t.canSeek?"live:dvr":"live":"on-demand"}#w(){if(this.#s)return;const t=this.#t.currentTime;t!==this.#l&&(this.#e.notify("time-change",t),t>this.#o&&(this.#o=t,this.#C()),this.#e.$state.seeking()&&this.#e.notify("seeked",t),this.#l=t)}#_(t){if(!this.#t.isMediaLoaded||this.#s)return;const e=this.#t.duration,s=this.#n(t);this.#c=new n(0,e),this.#e.notify("duration-change",e,s)}#p(t){if(!this.#t.isMediaLoaded)return;const e={muted:this.#t.isMuted,volume:this.#t.volumeLevel},s=this.#n(t);this.#e.notify("volume-change",e,s)}#D(t){const e=this.#n(t);this.#t.isPaused?this.#e.notify("pause",void 0,e):this.#e.notify("play",void 0,e)}#C(t){const e={seekable:this.#E(),buffered:new n(0,this.#o)},s=t?this.#n(t):void 0;this.#e.notify("progress",e,s)}#P(t){const e=this.#t.playerState,s=chrome.cast.media.PlayerState;if(this.#u=e===s.IDLE,e===s.PAUSED)return;const i=this.#n(t);switch(e){case s.PLAYING:this.#e.notify("playing",void 0,i);break;case s.BUFFERING:this.#e.notify("waiting",void 0,i);break;case s.IDLE:this.#h.stop(),this.#e.notify("pause"),this.#e.notify("end");break}}#E(){return this.#t.liveSeekableRange?new n(this.#t.liveSeekableRange.start,this.#t.liveSeekableRange.end):this.#c}#n(t){return t instanceof Event?t:new T(t.type,{detail:t})}#N(t){const{streamType:e,title:s,poster:i}=this.#e.$state;return new b(t).setMetadata(s(),i()).setStreamType(e()).setTracks(this.#i.getLocalTextTracks()).build()}#x(t){const e=this.#N(t),s=new chrome.cast.media.LoadRequest(e),i=this.#e.$state.savedState();return s.autoplay=(this.#s?.paused??i?.paused)===!1,s.currentTime=this.#s?.time??i?.currentTime??0,s}async#v(t,e){const s=h(this.#e.$state.source);this.#s={src:s,paused:t,time:e},await this.loadSource(s)}#G(){this.#v(this.#t.isPaused,this.#t.currentTime).catch(t=>{})}}export{w as GoogleCastProvider};
