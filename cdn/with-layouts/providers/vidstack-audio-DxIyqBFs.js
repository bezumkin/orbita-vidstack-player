import{k as t}from"../chunks/vidstack-BCgd_9ME.js";import{HTMLMediaProvider as e}from"./vidstack-html-BA4-qDSD.js";import{H as o}from"../chunks/vidstack-BnwCCm_b.js";import"../chunks/vidstack-DTQV_dgc.js";import"../chunks/vidstack-BBL7g7CQ.js";import"../chunks/vidstack-Bxv1Qnxe.js";import"../chunks/vidstack-C_AxqLKV.js";class s extends e{$$PROVIDER_TYPE="AUDIO";get type(){return"audio"}airPlay;constructor(r,i){super(r,i),t(()=>{this.airPlay=new o(this.media,i)},this.scope)}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}}export{s as AudioProvider};
