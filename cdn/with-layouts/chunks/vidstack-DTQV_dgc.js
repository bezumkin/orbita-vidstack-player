import{m as n,H as o,an as m,i}from"./vidstack-BCgd_9ME.js";const f=navigator?.userAgent.toLowerCase()||"",u=/iphone|ipad|ipod|ios|crios|fxios/i.test(f),l=/(iphone|ipod)/gi.test(navigator?.platform||""),w=!!window.chrome,g=!!window.safari||u;function E(){return v()&&n(screen.orientation.unlock)}function v(){return!o(window.screen.orientation)&&!o(window.screen.orientation.lock)}function I(e,t){return e||(e=document.createElement("audio")),e.canPlayType(t).length>0}function b(e,t){return e||(e=document.createElement("video")),e.canPlayType(t).length>0}function c(e){return e||(e=document.createElement("video")),e.canPlayType("application/vnd.apple.mpegurl").length>0}function y(e){return!!document.pictureInPictureEnabled&&!e?.disablePictureInPicture}function P(e){return n(e?.webkitSupportsPresentationMode)&&n(e?.webkitSetPresentationMode)}async function T(){const e=document.createElement("video");return e.volume=.5,await m(0),e.volume===.5}function O(){return window?.ManagedMediaSource??window?.MediaSource??window?.WebKitMediaSource}function _(){return window?.SourceBuffer??window?.WebKitSourceBuffer}function s(){const e=O();if(o(e))return!1;const t=e&&n(e.isTypeSupported)&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),a=_(),S=o(a)||!o(a.prototype)&&n(a.prototype.appendBuffer)&&n(a.prototype.remove);return!!t&&!!S}function h(){return s()}const A=/\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i,D=new Set(["audio/mpeg","audio/ogg","audio/3gp","audio/mp3","audio/webm","audio/flac","audio/m4a","audio/m4b","audio/mp4a"]),H=/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,M=new Set(["video/mp4","video/webm","video/3gp","video/ogg","video/avi","video/mpeg"]),V=/\.(m3u8)($|\?)/i,N=/\.(mpd)($|\?)/i,x=new Set(["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"]),B=new Set(["application/dash+xml"]);function p({src:e,type:t}){return i(e)?A.test(e)||D.has(t)||e.startsWith("blob:")&&t==="audio/object":t==="audio/object"}function d(e){return i(e.src)?H.test(e.src)||M.has(e.type)||e.src.startsWith("blob:")&&e.type==="video/object"||r(e)&&c():e.type==="video/object"}function r({src:e,type:t}){return i(e)&&V.test(e)||x.has(t)}function L({src:e,type:t}){return i(e)&&N.test(e)||B.has(t)}function U(e){return i(e.src)&&(p(e)||d(e)||r(e))}function j(e){return typeof window.MediaStream<"u"&&e instanceof window.MediaStream}export{l as I,w as a,u as b,E as c,U as d,T as e,I as f,d as g,b as h,p as i,h as j,L as k,s as l,r as m,y as n,P as o,c as p,g as q,j as r};
