import{aa as o,h as c,i as s,W as u}from"./vidstack-BCgd_9ME.js";import{i as a,g as m}from"./vidstack-BXD3EeuC.js";function l(e,r){const t=new URL(e);for(const n of Object.keys(r))t.searchParams.set(n,r[n]+"");return t.toString()}function p(e,r="preconnect"){const t=document.querySelector(`link[href="${e}"]`);if(!o(t))return!0;const n=document.createElement("link");return n.rel=r,n.href=e,n.crossOrigin="true",document.head.append(n),!0}const i={};function f(e){if(i[e])return i[e].promise;const r=c(),t=document.querySelector(`script[src="${e}"]`);if(!o(t))return r.resolve(),r.promise;i[e]=r;const n=document.createElement("script");return n.src=e,n.onload=()=>{r.resolve(),delete i[e]},n.onerror=()=>{r.reject(),delete i[e]},setTimeout(()=>document.head.append(n),0),r.promise}function d(e){return e==="use-credentials"?"include":s(e)?"same-origin":void 0}function g({title:e,src:r,download:t}){const n=u(t)||t===""?r.src:s(t)?t:t?.url;return S({url:n,src:r,download:t})?{url:n,name:!u(t)&&!s(t)&&t?.filename||e.toLowerCase()||"media"}:null}function S({url:e,src:r,download:t}){return s(e)&&(t&&t!==!0||a(r)||m(r))}export{g as a,l as b,d as g,f as l,p};
