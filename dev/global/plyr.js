import '../define/vidstack-player.js';
import '../define/plyr-layout.js';
import { isString, listenEvent, setAttribute, kebabToCamelCase, setStyle, createDisposalBin, isBoolean, DOMEvent } from '../chunks/vidstack-DVpy0IqK.js';
import { mediaState, isHTMLAudioElement, isHTMLVideoElement, isHTMLIFrameElement } from '../chunks/vidstack-vmONHURZ.js';
import { isHTMLElement } from '../chunks/vidstack-Chli0Y4M.js';
import { canPlayVideoType } from '../chunks/vidstack-uKxEd7nI.js';
import '../chunks/vidstack-Dd-HBvRp.js';
import '../chunks/vidstack-CUYciP40.js';
import '../chunks/vidstack-CkFd-HzN.js';
import '../chunks/vidstack-D2ApzKPg.js';
import '../chunks/vidstack-BOTZD4tC.js';
import '../chunks/vidstack-nPuRR80r.js';
import '../chunks/vidstack-DCY5OwWc.js';
import '../chunks/vidstack-Cg9baIQC.js';
import '../chunks/vidstack-9MhB-Ya7.js';
import '../chunks/vidstack-Dihypf8P.js';
import '../chunks/vidstack-DbBJlz7I.js';
import '../define/templates/plyr-layout.js';
import 'lit-html';
import '../chunks/vidstack-CuDKkHai.js';
import '../chunks/vidstack-mJNGvZNe.js';
import 'lit-html/directives/if-defined.js';
import 'lit-html/directives/unsafe-svg.js';
import 'lit-html/async-directive.js';
import '../chunks/vidstack-CwTj4H1w.js';
import 'lit-html/directives/unsafe-html.js';
import '../chunks/vidstack-D2Gpq24o.js';
import '../chunks/vidstack-DSIEmkg2.js';
import '../chunks/vidstack-B5ElR9su.js';
import '../chunks/vidstack-Dv_LIPFu.js';
import '../chunks/vidstack-Bpr4fI4n.js';
import '@floating-ui/dom';

let activePlyr = null, defaults = mediaState.record, forwardedPlayerState = [
  "playing",
  "paused",
  "ended",
  "currentTime",
  "seeking",
  "duration",
  "volume",
  "muted",
  "loop",
  "poster"
], eventMap = {
  ratechange: "rate-change",
  ready: "can-play",
  timeupdate: "time-update",
  volumechange: "volume-change"
}, icons = [
  "airplay",
  "captions-off",
  "captions-on",
  "download",
  "enter-fullscreen",
  "exit-fullscreen",
  "fast-forward",
  "muted",
  "pause",
  "pip",
  "play",
  "restart",
  "rewind",
  "settings",
  "volume"
];
class Plyr {
  constructor(target, config = {}) {
    this.target = target;
    this.config = config;
    if (isString(target)) {
      target = document.querySelector(target);
    } else if (!isHTMLElement(target)) {
      target = target[0];
    }
    if (!isHTMLElement(target)) {
      throw Error(`[plyr] target must be of type \`HTMLElement\`, found \`${typeof target}\``);
    }
    const dataConfig = target.getAttribute("data-plyr-config");
    if (dataConfig) {
      try {
        config = { ...config, ...JSON.parse(dataConfig) };
      } catch (error) {
        {
          console.error(`[plyr] failed to parse \`data-plyr-config\`

`, error);
        }
      }
    }
    const {
      enabled = true,
      debug = "warn" ,
      autoPause = true,
      ratio = null,
      hideControls = true,
      resetOnEnd = false,
      disableContextMenu = true,
      iconUrl = null,
      iconPrefix = "plyr",
      keyboard = { focused: true, global: false },
      i18n = null,
      tracks,
      ...props
    } = config;
    this.player = document.createElement("media-player");
    this.provider = document.createElement("media-provider");
    this.layout = document.createElement("media-plyr-layout");
    if (!enabled) return;
    for (const prop of forwardedPlayerState) {
      Object.defineProperty(this, prop, {
        get: () => this.player[prop],
        set: (value) => void (this.player[prop] = value)
      });
    }
    if (isString(debug)) {
      this.player.logLevel = debug;
    } else if (debug) {
      this.player.logLevel = "warn";
    }
    if (autoPause) {
      this.#disposal.add(listenEvent(this.player, "play", this.#onPlay.bind(this)));
    }
    this.ratio = ratio;
    this.layout.translations = i18n;
    if (!hideControls) {
      this.player.controls.canIdle = false;
    }
    if (resetOnEnd) {
      this.#disposal.add(listenEvent(this.player, "ended", this.#onReset.bind(this)));
    }
    if (iconUrl) {
      this.layout.customIcons = true;
      const id = `sprite-${iconPrefix}`, exists = document.getElementById(id);
      const addIcons = () => {
        for (const icon of icons) {
          const namepsace = "http://www.w3.org/2000/svg";
          const svg = document.createElementNS(namepsace, "svg");
          setAttribute(svg, "fill", "none");
          setAttribute(svg, "slot", `${icon}-icon`);
          setAttribute(svg, "aria-hidden", "true");
          setAttribute(svg, "viewBox", "0 0 18 18");
          const use = document.createElementNS(namepsace, "use");
          use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${iconPrefix}-${icon}`);
          svg.append(use);
          this.layout.append(svg);
        }
      };
      if (!exists) {
        fetch(iconUrl).then((response) => response.text()).then((data) => {
          const container = document.createElement("div");
          setAttribute(container, "id", id);
          setAttribute(container, "hidden", "");
          container.innerHTML = data;
          document.body.insertAdjacentElement("afterbegin", container);
          addIcons();
        }).catch((error) => {
          {
            console.error("[plyr] failed tol oad sprite:\n\n", error);
          }
          this.layout.customIcons = false;
        });
      } else {
        addIcons();
      }
    }
    if (keyboard.global) {
      this.player.keyTarget = "document";
    } else if (keyboard.focused) {
      this.player.keyTarget = "player";
    } else {
      this.player.keyDisabled = true;
    }
    target.removeAttribute("controls");
    const title = target.getAttribute("title");
    if (title) this.player.setAttribute("title", title);
    const width = target.getAttribute("width"), height = target.getAttribute("height");
    if (width || height) {
      if (width) this.player.style.width = width;
      if (height) this.player.style.height = height;
      this.player.style.aspectRatio = "unset";
    }
    for (const attr of target.attributes) {
      const name = attr.name.replace("data-", ""), propName = kebabToCamelCase(name);
      if (propName in this.player) {
        this.player.setAttribute(name, attr.value);
      } else if (propName in this.layout) {
        this.layout.setAttribute(name, attr.value);
      }
    }
    for (const [prop, value] of Object.entries(props)) {
      if (prop in this.player) {
        this.player[prop] = value;
      } else if (prop in this.layout) {
        this.layout[prop] = value;
      }
    }
    if (tracks) {
      for (const track of tracks) this.player.textTracks.add(track);
    }
    this.player.append(this.provider, this.layout);
    const isTargetContainer = !isHTMLAudioElement(target) && !isHTMLVideoElement(target) && !isHTMLIFrameElement(target);
    if (isTargetContainer) {
      target.append(this.player);
    } else {
      for (const child of [...target.children]) this.provider.append(child);
      target.replaceWith(this.player);
    }
    const embedProvider = target.getAttribute("data-plyr-provider"), embedId = target.getAttribute("data-plyr-embed-id");
    if (embedProvider && /youtube|vimeo/.test(embedProvider) && embedId) {
      this.player.src = `${embedProvider}/${embedId}`;
    }
  }
  static setup(targets, config) {
    if (isString(targets)) {
      targets = document.querySelectorAll(targets);
    }
    return [...targets].map((target) => new Plyr(target, config));
  }
  static supported(type, provider) {
    return true;
  }
  player;
  provider;
  layout;
  fullscreen = new PlyrFullscreenAdapter(this);
  // These are only included for type defs, props are defined in constructor.
  playing = defaults.playing;
  paused = defaults.paused;
  ended = defaults.ended;
  currentTime = defaults.currentTime;
  seeking = defaults.seeking;
  duration = defaults.duration;
  volume = defaults.volume;
  muted = defaults.muted;
  loop = defaults.loop;
  poster = defaults.poster;
  get type() {
    return this.player.provider?.type ?? "";
  }
  get isHTML5() {
    return /audio|video|hls/.test(this.type);
  }
  get isEmbed() {
    return /youtube|vimeo/.test(this.type);
  }
  get buffered() {
    const { bufferedEnd, seekableEnd } = this.player.state;
    return seekableEnd > 0 ? bufferedEnd / seekableEnd : 0;
  }
  get stopped() {
    return this.paused && this.currentTime === 0;
  }
  get hasAudio() {
    if (!this.isHTML5) return true;
    const media = this.player.provider.media;
    return Boolean(
      media.mozHasAudio || media.webkitAudioDecodedByteCount || media.audioTracks?.length || this.player.audioTracks.length
    );
  }
  get speed() {
    return this.player.playbackRate;
  }
  set speed(speed) {
    this.player.remoteControl.changePlaybackRate(speed);
  }
  get currentTrack() {
    return this.player.textTracks.selectedIndex;
  }
  set currentTrack(index) {
    this.player.remoteControl.changeTextTrackMode(index, "showing");
  }
  get pip() {
    return this.player.state.pictureInPicture;
  }
  set pip(isActive) {
    if (isActive) this.player.enterPictureInPicture();
    else this.player.exitPictureInPicture();
  }
  get quality() {
    return this.player.state.quality?.height ?? null;
  }
  set quality(value) {
    let qualities = this.player.qualities, index = -1;
    if (value !== null) {
      let minScore = Infinity;
      for (let i = 0; i < qualities.length; i++) {
        const score = Math.abs(qualities[i].height - value);
        if (score < minScore) {
          index = i;
          minScore = score;
        }
      }
    }
    this.player.remoteControl.changeQuality(index);
  }
  #source = null;
  get source() {
    return this.#source;
  }
  set source(source) {
    const {
      type: viewType = "video",
      sources = "",
      title = "",
      poster = "",
      thumbnails = "",
      tracks = []
    } = source ?? {};
    this.player.src = sources;
    this.player.viewType = viewType;
    this.player.title = title;
    this.player.poster = poster;
    this.layout.thumbnails = thumbnails;
    this.player.textTracks.clear();
    for (const track of tracks) this.player.textTracks.add(track);
    this.#source = source;
  }
  #ratio = null;
  get ratio() {
    return this.#ratio;
  }
  set ratio(ratio) {
    if (ratio) ratio = ratio.replace(/\s*:\s*/, " / ");
    setStyle(this.player, "aspect-ratio", ratio ?? "unset");
    this.#ratio = ratio;
  }
  get download() {
    return this.layout.download;
  }
  set download(download) {
    this.layout.download = download;
  }
  #disposal = createDisposalBin();
  #onPlay() {
    if (activePlyr !== this) activePlyr?.pause();
    activePlyr = this;
  }
  #onReset() {
    this.currentTime = 0;
    this.paused = true;
  }
  play() {
    return this.player.play();
  }
  pause() {
    return this.player.pause();
  }
  togglePlay(toggle = this.paused) {
    if (toggle) {
      return this.player.play();
    } else {
      return this.player.pause();
    }
  }
  toggleCaptions(toggle = !this.player.textTracks.selected) {
    const controller = this.player.remoteControl;
    if (toggle) {
      controller.showCaptions();
    } else {
      controller.disableCaptions();
    }
  }
  toggleControls(toggle = !this.player.controls.showing) {
    const controls = this.player.controls;
    if (toggle) {
      controls.show();
    } else {
      controls.hide();
    }
  }
  restart() {
    this.currentTime = 0;
  }
  stop() {
    this.pause();
    this.player.currentTime = 0;
  }
  forward(seekTime = this.config.seekTime ?? 10) {
    this.currentTime += seekTime;
  }
  rewind(seekTime = this.config.seekTime ?? 10) {
    this.currentTime -= seekTime;
  }
  increaseVolume(step = 5) {
    this.volume += step;
  }
  decreaseVolume(step = 5) {
    this.volume -= step;
  }
  airplay() {
    return this.player.requestAirPlay();
  }
  on(type, callback) {
    this.#listen(type, callback);
  }
  once(type, callback) {
    this.#listen(type, callback, { once: true });
  }
  off(type, callback) {
    this.#listen(type, callback, { remove: true });
  }
  #listeners = [];
  #listen(type, callback, options = {}) {
    let eventType = type, toggle = null;
    switch (type) {
      case "captionsenabled":
      case "captionsdisabled":
        eventType = "text-track-change";
        toggle = type === "captionsenabled";
        break;
      case "controlsshown":
      case "controlshidden":
        eventType = "controls-change";
        toggle = type === "controlsshown";
        break;
      case "enterfullscreen":
      case "exitfullscreen":
        eventType = "fullscreen-change";
        toggle = type === "enterfullscreen";
        break;
    }
    const mappedEventType = eventMap[eventType] ?? eventType;
    const listener = (event) => {
      if (isBoolean(toggle) && !!event.detail !== toggle) return;
      if (mappedEventType !== type) {
        callback(new DOMEvent(type, { ...event, trigger: event }));
        return;
      }
      callback(event);
    };
    if (options.remove) {
      let index = -1;
      do {
        index = this.#listeners.findIndex((t) => t.type === type && t.callback === callback);
        if (index >= 0) {
          const { listener: listener2 } = this.#listeners[index];
          this.player.removeEventListener(mappedEventType, listener2);
          this.#listeners.splice(index, 1);
        }
      } while (index >= 0);
    } else {
      this.#listeners.push({ type, callback, listener });
      this.player.addEventListener(mappedEventType, listener, { once: options.once });
    }
  }
  supports(type) {
    return !!type && canPlayVideoType(null, type);
  }
  destroy() {
    for (const { type, listener } of this.#listeners) {
      this.player.removeEventListener(eventMap[type] ?? type, listener);
    }
    this.#source = null;
    this.#listeners.length = 0;
    if (activePlyr === this) activePlyr = null;
    this.#disposal.empty();
    this.player.destroy();
  }
}
class PlyrFullscreenAdapter {
  #plyr;
  constructor(plyr) {
    this.#plyr = plyr;
  }
  get #player() {
    return this.#plyr.player;
  }
  /**
   * 	Returns a boolean indicating if the current player has fullscreen enabled.
   */
  get enabled() {
    return this.#player.state.canFullscreen;
  }
  /**
   * Returns a boolean indicating if the current player is in fullscreen mode.
   */
  get active() {
    return this.#player.state.fullscreen;
  }
  /**
   * Request to enter fullscreen.
   */
  enter() {
    return this.#player.requestFullscreen();
  }
  /**
   * Request to exit fullscreen.
   */
  exit() {
    return this.#player.exitFullscreen();
  }
  /**
   * Request to toggle fullscreen.
   */
  toggle() {
    if (this.active) return this.exit();
    else return this.enter();
  }
}

export { Plyr, PlyrFullscreenAdapter };
