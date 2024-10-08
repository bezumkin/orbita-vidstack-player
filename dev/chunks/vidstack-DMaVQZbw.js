import { Component, State, effect, tick, peek, setAttribute, isString, setStyle, createContext, signal, EventsController, provideContext, listenEvent, onDispose, useContext, prop, useState, isNull, functionThrottle, computed, method, scoped, createScope, animationFrameThrottle, functionDebounce, hasProvidedContext, isNumber, isPointerEvent, isTouchEvent, isMouseEvent, DOMEvent, kebabToCamelCase } from './vidstack-DVpy0IqK.js';
import { useMediaContext } from './vidstack-CUYciP40.js';
import { setAttributeIfEmpty, requestScopedAnimationFrame, autoPlacement, setARIALabel, isTouchPinchEvent } from './vidstack-Chli0Y4M.js';
import { formatSpokenTime, Popper, ToggleButtonController, Slider, SliderController, sliderState, sliderValueFormatContext, TimeSlider, RadioGroupController, formatTime, menuContext } from './vidstack-D2ApzKPg.js';
import { FocusVisibleController, $keyboard } from './vidstack-9MhB-Ya7.js';
import { $ariaBool, sortVideoQualities } from './vidstack-BOTZD4tC.js';
import { round } from './vidstack-Dihypf8P.js';
import { watchActiveTextTrack, isCueActive } from './vidstack-Cg9baIQC.js';
import { isTrackCaptionKind } from './vidstack-nPuRR80r.js';

class MediaAnnouncer extends Component {
  static props = {
    translations: null
  };
  static state = new State({
    label: null,
    busy: false
  });
  #media;
  #initializing = false;
  onSetup() {
    this.#media = useMediaContext();
  }
  onAttach(el) {
    el.style.display = "contents";
  }
  onConnect(el) {
    el.setAttribute("data-media-announcer", "");
    setAttributeIfEmpty(el, "role", "status");
    setAttributeIfEmpty(el, "aria-live", "polite");
    const { busy } = this.$state;
    this.setAttributes({
      "aria-busy": () => busy() ? "true" : null
    });
    this.#initializing = true;
    effect(this.#watchPaused.bind(this));
    effect(this.#watchVolume.bind(this));
    effect(this.#watchCaptions.bind(this));
    effect(this.#watchFullscreen.bind(this));
    effect(this.#watchPiP.bind(this));
    effect(this.#watchSeeking.bind(this));
    effect(this.#watchLabel.bind(this));
    tick();
    this.#initializing = false;
  }
  #watchPaused() {
    const { paused } = this.#media.$state;
    this.#setLabel(!paused() ? "Play" : "Pause");
  }
  #watchFullscreen() {
    const { fullscreen } = this.#media.$state;
    this.#setLabel(fullscreen() ? "Enter Fullscreen" : "Exit Fullscreen");
  }
  #watchPiP() {
    const { pictureInPicture } = this.#media.$state;
    this.#setLabel(pictureInPicture() ? "Enter PiP" : "Exit PiP");
  }
  #watchCaptions() {
    const { textTrack } = this.#media.$state;
    this.#setLabel(textTrack() ? "Closed-Captions On" : "Closed-Captions Off");
  }
  #watchVolume() {
    const { muted, volume, audioGain } = this.#media.$state;
    this.#setLabel(
      muted() || volume() === 0 ? "Mute" : `${Math.round(volume() * (audioGain() ?? 1) * 100)}% ${this.#translate("Volume")}`
    );
  }
  #startedSeekingAt = -1;
  #seekTimer = -1;
  #watchSeeking() {
    const { seeking, currentTime } = this.#media.$state, isSeeking = seeking();
    if (this.#startedSeekingAt > 0) {
      window.clearTimeout(this.#seekTimer);
      this.#seekTimer = window.setTimeout(() => {
        if (!this.scope) return;
        const newTime = peek(currentTime), seconds = Math.abs(newTime - this.#startedSeekingAt);
        if (seconds >= 1) {
          const isForward = newTime >= this.#startedSeekingAt, spokenTime = formatSpokenTime(seconds);
          this.#setLabel(
            `${this.#translate(isForward ? "Seek Forward" : "Seek Backward")} ${spokenTime}`
          );
        }
        this.#startedSeekingAt = -1;
        this.#seekTimer = -1;
      }, 300);
    } else if (isSeeking) {
      this.#startedSeekingAt = peek(currentTime);
    }
  }
  #translate(word) {
    const { translations } = this.$props;
    return translations?.()?.[word || ""] ?? word;
  }
  #watchLabel() {
    const { label, busy } = this.$state, $label = this.#translate(label());
    if (this.#initializing) return;
    busy.set(true);
    const id = window.setTimeout(() => void busy.set(false), 150);
    this.el && setAttribute(this.el, "aria-label", $label);
    if (isString($label)) {
      this.dispatch("change", { detail: $label });
    }
    return () => window.clearTimeout(id);
  }
  #setLabel(word) {
    const { label } = this.$state;
    label.set(word);
  }
}

class Controls extends Component {
  static props = {
    hideDelay: 2e3,
    hideOnMouseLeave: false
  };
  #media;
  onSetup() {
    this.#media = useMediaContext();
    effect(this.#watchProps.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this.#media.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this.#isShowing.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this.#isShowing() });
    });
    effect(this.#hideControls.bind(this));
    effect(() => {
      const isFullscreen = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen && `env(safe-area-inset-${side})`);
      }
    });
  }
  #hideControls() {
    if (!this.el) return;
    const { nativeControls } = this.#media.$state, isHidden = nativeControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  #watchProps() {
    const { controls } = this.#media.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this.#media.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  #isShowing() {
    const { controlsVisible } = this.#media.$state;
    return controlsVisible();
  }
}

class ControlsGroup extends Component {
  onAttach(el) {
    if (!el.style.pointerEvents) setStyle(el, "pointer-events", "auto");
  }
}

const tooltipContext = createContext();

let id = 0;
class Tooltip extends Component {
  static props = {
    showDelay: 700
  };
  #id = `media-tooltip-${++id}`;
  #trigger = signal(null);
  #content = signal(null);
  #showing = signal(false);
  constructor() {
    super();
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      trigger: this.#trigger,
      content: this.#content,
      showDelay,
      listen(trigger, show, hide) {
        effect(() => {
          if ($keyboard()) listenEvent(trigger, "focus", show);
          listenEvent(trigger, "blur", hide);
        });
        new EventsController(trigger).add("touchstart", (e) => e.preventDefault(), { passive: false }).add("mouseenter", show).add("mouseleave", hide);
      },
      onChange: this.#onShowingChange.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onSetup() {
    provideContext(tooltipContext, {
      trigger: this.#trigger,
      content: this.#content,
      showing: this.#showing,
      attachTrigger: this.#attachTrigger.bind(this),
      detachTrigger: this.#detachTrigger.bind(this),
      attachContent: this.#attachContent.bind(this),
      detachContent: this.#detachContent.bind(this)
    });
  }
  #attachTrigger(el) {
    this.#trigger.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this.#id);
  }
  #detachTrigger(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this.#trigger.set(null);
  }
  #attachContent(el) {
    el.setAttribute("id", this.#id);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this.#content.set(el);
  }
  #detachContent(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this.#content.set(null);
  }
  #onShowingChange(isShowing) {
    const trigger = this.#trigger(), content = this.#content();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this.#id : null);
    }
    for (const el of [this.el, trigger, content]) {
      el && setAttribute(el, "data-visible", isShowing);
    }
    this.#showing.set(isShowing);
  }
}

class TooltipTrigger extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        this.#attach();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this.#getButton();
          button && tooltip.detachTrigger(button);
        });
      })
    );
  }
  #attach() {
    const button = this.#getButton(), tooltip = useContext(tooltipContext);
    button && tooltip.attachTrigger(button);
  }
  #getButton() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
  }
}

class TooltipContent extends Component {
  static props = {
    placement: "top center",
    offset: 0,
    alignOffset: 0
  };
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.#attach(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this.#attach(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip.detachContent(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        effect(this.#watchPlacement.bind(this));
      })
    );
  }
  #attach(el) {
    const tooltip = useContext(tooltipContext);
    tooltip.attachContent(el);
  }
  #watchPlacement() {
    const { showing } = useContext(tooltipContext);
    if (!showing()) return;
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this.#getTrigger(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  #getTrigger() {
    return useContext(tooltipContext).trigger();
  }
}

class ToggleButton extends Component {
  static props = {
    disabled: false,
    defaultPressed: false
  };
  #pressed = signal(false);
  /**
   * Whether the toggle is currently in a `pressed` state.
   */
  get pressed() {
    return this.#pressed();
  }
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#pressed
    });
  }
}
const togglebutton__proto = ToggleButton.prototype;
prop(togglebutton__proto, "pressed");

class GoogleCastButton extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { canGoogleCast, isGoogleCastConnected } = this.#media.$state;
    this.setAttributes({
      "data-active": isGoogleCastConnected,
      "data-supported": canGoogleCast,
      "data-state": this.#getState.bind(this),
      "aria-hidden": $ariaBool(() => !canGoogleCast())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "google-cast");
    setARIALabel(el, this.#getDefaultLabel.bind(this));
  }
  #onPress(event) {
    const remote = this.#media.remote;
    remote.requestGoogleCast(event);
  }
  #isPressed() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState() !== "disconnected";
  }
  #getState() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState();
  }
  #getDefaultLabel() {
    const { remotePlaybackState } = this.#media.$state;
    return `Google Cast ${remotePlaybackState()}`;
  }
}

class SliderVideo extends Component {
  static props = {
    src: null,
    crossOrigin: null
  };
  static state = new State({
    video: null,
    src: null,
    crossOrigin: null,
    canPlay: false,
    error: null,
    hidden: false
  });
  #media;
  #slider;
  get video() {
    return this.$state.video();
  }
  onSetup() {
    this.#media = useMediaContext();
    this.#slider = useState(Slider.state);
    this.#watchCrossOrigin();
    this.setAttributes({
      "data-loading": this.#isLoading.bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": this.#hasError.bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(this.#watchVideo.bind(this));
    effect(this.#watchSrc.bind(this));
    effect(this.#watchCrossOrigin.bind(this));
    effect(this.#watchHidden.bind(this));
    effect(this.#onSrcChange.bind(this));
    effect(this.#onUpdateTime.bind(this));
  }
  #watchVideo() {
    const video = this.$state.video();
    if (!video) return;
    if (video.readyState >= 2) this.#onCanPlay();
    new EventsController(video).add("canplay", this.#onCanPlay.bind(this)).add("error", this.#onError.bind(this));
  }
  #watchSrc() {
    const { src } = this.$state, { canLoad } = this.#media.$state;
    src.set(canLoad() ? this.$props.src() : null);
  }
  #watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.#media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  #isLoading() {
    const { canPlay, hidden } = this.$state;
    return !canPlay() && !hidden();
  }
  #hasError() {
    const { error } = this.$state;
    return !isNull(error);
  }
  #watchHidden() {
    const { src, hidden } = this.$state, { canLoad, duration } = this.#media.$state;
    hidden.set(canLoad() && (!src() || this.#hasError() || !Number.isFinite(duration())));
  }
  #onSrcChange() {
    const { src, canPlay, error } = this.$state;
    src();
    canPlay.set(false);
    error.set(null);
  }
  #onCanPlay(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(true);
    error.set(null);
    this.dispatch("can-play", { trigger: event });
  }
  #onError(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(false);
    error.set(event);
    this.dispatch("error", { trigger: event });
  }
  #onUpdateTime() {
    const { video, canPlay } = this.$state, { duration } = this.#media.$state, { pointerRate } = this.#slider, media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
    if (canUpdate) {
      media.currentTime = pointerRate() * duration();
    }
  }
}
const slidervideo__proto = SliderVideo.prototype;
prop(slidervideo__proto, "video");

class AudioGainSlider extends Component {
  static props = {
    ...SliderController.props,
    step: 25,
    keyStep: 25,
    shiftKeyMultiplier: 2,
    min: 0,
    max: 300
  };
  static state = sliderState;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent",
      percent: (_, decimalPlaces) => {
        return round(this.$state.value(), decimalPlaces) + "%";
      }
    });
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchMinMax.bind(this));
    effect(this.#watchAudioGain.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-audio-gain-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Audio Boost");
    const { canSetAudioGain } = this.#media.$state;
    this.setAttributes({
      "data-supported": canSetAudioGain,
      "aria-hidden": $ariaBool(() => !canSetAudioGain())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  #getARIAValueText() {
    const { value } = this.$state;
    return value() + "%";
  }
  #watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  #watchAudioGain() {
    const { audioGain } = this.#media.$state, value = ((audioGain() ?? 1) - 1) * 100;
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetAudioGain } = this.#media.$state;
    return disabled() || !canSetAudioGain();
  }
  #onAudioGainChange(event) {
    if (!event.trigger) return;
    const gain = round(1 + event.detail / 100, 2);
    this.#media.remote.changeAudioGain(gain, event);
  }
  #onValueChange(event) {
    this.#onAudioGainChange(event);
  }
  #onDragValueChange(event) {
    this.#onAudioGainChange(event);
  }
}

class SpeedSlider extends Component {
  static props = {
    ...SliderController.props,
    step: 0.25,
    keyStep: 0.25,
    shiftKeyMultiplier: 2,
    min: 0,
    max: 2
  };
  static state = sliderState;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: this.#roundValue,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchMinMax.bind(this));
    effect(this.#watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-speed-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Speed");
    const { canSetPlaybackRate } = this.#media.$state;
    this.setAttributes({
      "data-supported": canSetPlaybackRate,
      "aria-hidden": $ariaBool(() => !canSetPlaybackRate())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state;
    return value();
  }
  #getARIAValueText() {
    const { value } = this.$state;
    return value() + "x";
  }
  #watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  #watchPlaybackRate() {
    const { playbackRate } = this.#media.$state;
    const newValue = playbackRate();
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  #roundValue(value) {
    return round(value, 2);
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetPlaybackRate } = this.#media.$state;
    return disabled() || !canSetPlaybackRate();
  }
  #throttledSpeedChange = functionThrottle(this.#onPlaybackRateChange.bind(this), 25);
  #onPlaybackRateChange(event) {
    if (!event.trigger) return;
    const rate = event.detail;
    this.#media.remote.changePlaybackRate(rate, event);
  }
  #onValueChange(event) {
    this.#throttledSpeedChange(event);
  }
  #onDragValueChange(event) {
    this.#throttledSpeedChange(event);
  }
}

class QualitySlider extends Component {
  static props = {
    ...SliderController.props,
    step: 1,
    keyStep: 1,
    shiftKeyMultiplier: 1
  };
  static state = sliderState;
  #media;
  #sortedQualities = computed(() => {
    const { qualities } = this.#media.$state;
    return sortVideoQualities(qualities());
  });
  onSetup() {
    this.#media = useMediaContext();
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchMax.bind(this));
    effect(this.#watchQuality.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-quality-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Video Quality");
    const { qualities, canSetQuality } = this.#media.$state, $supported = computed(() => canSetQuality() && qualities().length > 0);
    this.setAttributes({
      "data-supported": $supported,
      "aria-hidden": $ariaBool(() => !$supported())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state;
    return value();
  }
  #getARIAValueText() {
    const { quality } = this.#media.$state;
    if (!quality()) return "";
    const { height, bitrate } = quality(), bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null;
    return height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : "Auto";
  }
  #watchMax() {
    const $qualities = this.#sortedQualities();
    this.$state.max.set(Math.max(0, $qualities.length - 1));
  }
  #watchQuality() {
    let { quality } = this.#media.$state, $qualities = this.#sortedQualities(), value = Math.max(0, $qualities.indexOf(quality()));
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetQuality, qualities } = this.#media.$state;
    return disabled() || qualities().length <= 1 || !canSetQuality();
  }
  #throttledQualityChange = functionThrottle(this.#onQualityChange.bind(this), 25);
  #onQualityChange(event) {
    if (!event.trigger) return;
    const { qualities } = this.#media, quality = peek(this.#sortedQualities)[event.detail];
    this.#media.remote.changeQuality(qualities.indexOf(quality), event);
  }
  #onValueChange(event) {
    this.#throttledQualityChange(event);
  }
  #onDragValueChange(event) {
    this.#throttledQualityChange(event);
  }
}

class SliderChapters extends Component {
  static props = {
    disabled: false
  };
  #media;
  #sliderState;
  #updateScope;
  #titleRef = null;
  #refs = [];
  #$track = signal(null);
  #$cues = signal([]);
  #activeIndex = signal(-1);
  #activePointerIndex = signal(-1);
  #bufferedIndex = 0;
  get cues() {
    return this.#$cues();
  }
  get activeCue() {
    return this.#$cues()[this.#activeIndex()] || null;
  }
  get activePointerCue() {
    return this.#$cues()[this.#activePointerIndex()] || null;
  }
  onSetup() {
    this.#media = useMediaContext();
    this.#sliderState = useState(TimeSlider.state);
  }
  onAttach(el) {
    watchActiveTextTrack(this.#media.textTracks, "chapters", this.#setTrack.bind(this));
    effect(this.#watchSource.bind(this));
  }
  onConnect() {
    onDispose(() => this.#reset.bind(this));
  }
  onDestroy() {
    this.#setTrack(null);
  }
  setRefs(refs) {
    this.#refs = refs;
    this.#updateScope?.dispose();
    if (this.#refs.length === 1) {
      const el = this.#refs[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (this.#refs.length > 0) {
      scoped(() => this.#watch(), this.#updateScope = createScope());
    }
  }
  #setTrack(track) {
    if (peek(this.#$track) === track) return;
    this.#reset();
    this.#$track.set(track);
  }
  #reset() {
    this.#refs = [];
    this.#$cues.set([]);
    this.#activeIndex.set(-1);
    this.#activePointerIndex.set(-1);
    this.#bufferedIndex = 0;
    this.#updateScope?.dispose();
  }
  #watch() {
    if (!this.#refs.length) return;
    effect(this.#watchUpdates.bind(this));
  }
  #watchUpdates() {
    const { hidden } = this.#sliderState;
    if (hidden()) return;
    effect(this.#watchContainerWidths.bind(this));
    effect(this.#watchFillPercent.bind(this));
    effect(this.#watchPointerPercent.bind(this));
    effect(this.#watchBufferedPercent.bind(this));
  }
  #watchContainerWidths() {
    const cues = this.#$cues();
    if (!cues.length) return;
    let cue, { seekableStart, seekableEnd } = this.#media.$state, startTime = seekableStart(), endTime = seekableEnd() || cues[cues.length - 1].endTime, duration = endTime - startTime, remainingWidth = 100;
    for (let i = 0; i < cues.length; i++) {
      cue = cues[i];
      if (this.#refs[i]) {
        const width = i === cues.length - 1 ? remainingWidth : round((cue.endTime - Math.max(startTime, cue.startTime)) / duration * 100, 3);
        this.#refs[i].style.width = width + "%";
        remainingWidth -= width;
      }
    }
  }
  #watchFillPercent() {
    let { liveEdge, seekableStart, seekableEnd } = this.#media.$state, { fillPercent, value } = this.#sliderState, cues = this.#$cues(), isLiveEdge = liveEdge(), prevActiveIndex = peek(this.#activeIndex), currentChapter = cues[prevActiveIndex];
    let currentActiveIndex = isLiveEdge ? this.#$cues.length - 1 : this.#findActiveChapterIndex(
      currentChapter ? currentChapter.startTime / seekableEnd() * 100 <= peek(value) ? prevActiveIndex : 0 : 0,
      fillPercent()
    );
    if (isLiveEdge || !currentChapter) {
      this.#updateFillPercents(0, cues.length, 100);
    } else if (currentActiveIndex > prevActiveIndex) {
      this.#updateFillPercents(prevActiveIndex, currentActiveIndex, 100);
    } else if (currentActiveIndex < prevActiveIndex) {
      this.#updateFillPercents(currentActiveIndex + 1, prevActiveIndex + 1, 0);
    }
    const percent = isLiveEdge ? 100 : this.#calcPercent(
      cues[currentActiveIndex],
      fillPercent(),
      seekableStart(),
      this.#getEndTime(cues)
    );
    this.#updateFillPercent(this.#refs[currentActiveIndex], percent);
    this.#activeIndex.set(currentActiveIndex);
  }
  #watchPointerPercent() {
    let { pointing, pointerPercent } = this.#sliderState;
    if (!pointing()) {
      this.#activePointerIndex.set(-1);
      return;
    }
    const activeIndex = this.#findActiveChapterIndex(0, pointerPercent());
    this.#activePointerIndex.set(activeIndex);
  }
  #updateFillPercents(start, end, percent) {
    for (let i = start; i < end; i++) this.#updateFillPercent(this.#refs[i], percent);
  }
  #updateFillPercent(ref, percent) {
    if (!ref) return;
    ref.style.setProperty("--chapter-fill", percent + "%");
    setAttribute(ref, "data-active", percent > 0 && percent < 100);
    setAttribute(ref, "data-ended", percent === 100);
  }
  #findActiveChapterIndex(startIndex, percent) {
    let chapterPercent = 0, cues = this.#$cues();
    if (percent === 0) return 0;
    else if (percent === 100) return cues.length - 1;
    let { seekableStart } = this.#media.$state, startTime = seekableStart(), endTime = this.#getEndTime(cues);
    for (let i = startIndex; i < cues.length; i++) {
      chapterPercent = this.#calcPercent(cues[i], percent, startTime, endTime);
      if (chapterPercent >= 0 && chapterPercent < 100) return i;
    }
    return 0;
  }
  #watchBufferedPercent() {
    this.#updateBufferedPercent(this.#bufferedPercent());
  }
  #updateBufferedPercent = animationFrameThrottle((bufferedPercent) => {
    let percent, cues = this.#$cues(), { seekableStart } = this.#media.$state, startTime = seekableStart(), endTime = this.#getEndTime(cues);
    for (let i = this.#bufferedIndex; i < this.#refs.length; i++) {
      percent = this.#calcPercent(cues[i], bufferedPercent, startTime, endTime);
      this.#refs[i]?.style.setProperty("--chapter-progress", percent + "%");
      if (percent < 100) {
        this.#bufferedIndex = i;
        break;
      }
    }
  });
  #bufferedPercent = computed(this.#calcMediaBufferedPercent.bind(this));
  #calcMediaBufferedPercent() {
    const { bufferedEnd, duration } = this.#media.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  #getEndTime(cues) {
    const { seekableEnd } = this.#media.$state, endTime = seekableEnd();
    return Number.isFinite(endTime) ? endTime : cues[cues.length - 1]?.endTime || 0;
  }
  #calcPercent(cue, percent, startTime, endTime) {
    if (!cue) return 0;
    const cues = this.#$cues();
    if (cues.length === 0) return 0;
    const duration = endTime - startTime, cueStartTime = Math.max(0, cue.startTime - startTime), cueEndTime = Math.min(endTime, cue.endTime) - startTime;
    const startRatio = cueStartTime / duration, startPercent = startRatio * 100, endPercent = Math.min(1, startRatio + (cueEndTime - cueStartTime) / duration) * 100;
    return Math.max(
      0,
      round(
        percent >= endPercent ? 100 : (percent - startPercent) / (endPercent - startPercent) * 100,
        3
      )
    );
  }
  #fillGaps(cues) {
    let chapters = [], { seekableStart, seekableEnd, duration } = this.#media.$state, startTime = seekableStart(), endTime = seekableEnd();
    cues = cues.filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime);
    const firstCue = cues[0];
    if (firstCue && firstCue.startTime > startTime) {
      chapters.push(new window.VTTCue(startTime, firstCue.startTime, ""));
    }
    for (let i = 0; i < cues.length - 1; i++) {
      const currentCue = cues[i], nextCue = cues[i + 1];
      chapters.push(currentCue);
      if (nextCue) {
        const timeDiff = nextCue.startTime - currentCue.endTime;
        if (timeDiff > 0) {
          chapters.push(new window.VTTCue(currentCue.endTime, currentCue.endTime + timeDiff, ""));
        }
      }
    }
    const lastCue = cues[cues.length - 1];
    if (lastCue) {
      chapters.push(lastCue);
      const endTime2 = duration();
      if (endTime2 >= 0 && endTime2 - lastCue.endTime > 1) {
        chapters.push(new window.VTTCue(lastCue.endTime, duration(), ""));
      }
    }
    return chapters;
  }
  #watchSource() {
    const { source } = this.#media.$state;
    source();
    this.#onTrackChange();
  }
  #onTrackChange() {
    if (!this.scope) return;
    const { disabled } = this.$props;
    if (disabled()) {
      this.#$cues.set([]);
      this.#activeIndex.set(0);
      this.#bufferedIndex = 0;
      return;
    }
    const track = this.#$track();
    if (track) {
      const onCuesChange = this.#onCuesChange.bind(this);
      onCuesChange();
      new EventsController(track).add("add-cue", onCuesChange).add("remove-cue", onCuesChange);
      effect(this.#watchMediaDuration.bind(this));
    }
    this.#titleRef = this.#findChapterTitleRef();
    if (this.#titleRef) effect(this.#onChapterTitleChange.bind(this));
    return () => {
      if (this.#titleRef) {
        this.#titleRef.textContent = "";
        this.#titleRef = null;
      }
    };
  }
  #watchMediaDuration() {
    this.#media.$state.duration();
    this.#onCuesChange();
  }
  #onCuesChange = functionDebounce(
    () => {
      const track = peek(this.#$track);
      if (!this.scope || !track || !track.cues.length) return;
      this.#$cues.set(this.#fillGaps(track.cues));
      this.#activeIndex.set(0);
      this.#bufferedIndex = 0;
    },
    150,
    true
  );
  #onChapterTitleChange() {
    const cue = this.activePointerCue || this.activeCue;
    if (this.#titleRef) this.#titleRef.textContent = cue?.text || "";
  }
  #findParentSlider() {
    let node = this.el;
    while (node && node.getAttribute("role") !== "slider") {
      node = node.parentElement;
    }
    return node;
  }
  #findChapterTitleRef() {
    const slider = this.#findParentSlider();
    return slider ? slider.querySelector('[data-part="chapter-title"]') : null;
  }
}
const sliderchapters__proto = SliderChapters.prototype;
prop(sliderchapters__proto, "cues");
prop(sliderchapters__proto, "activeCue");
prop(sliderchapters__proto, "activePointerCue");
method(sliderchapters__proto, "setRefs");

class RadioGroup extends Component {
  static props = {
    value: ""
  };
  #controller;
  /**
   * A list of radio values that belong this group.
   */
  get values() {
    return this.#controller.values;
  }
  /**
   * The radio value that is checked in this group.
   */
  get value() {
    return this.#controller.value;
  }
  set value(newValue) {
    this.#controller.value = newValue;
  }
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    effect(this.#watchValue.bind(this));
  }
  #watchValue() {
    this.#controller.value = this.$props.value();
  }
  #onValueChange(value, trigger) {
    const event = this.createEvent("change", { detail: value, trigger });
    this.dispatch(event);
  }
}
const radiogroup__proto = RadioGroup.prototype;
prop(radiogroup__proto, "values");
prop(radiogroup__proto, "value");

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class ChaptersRadioGroup extends Component {
  static props = {
    thumbnails: null
  };
  #media;
  #menu;
  #controller;
  #track = signal(null);
  #cues = signal([]);
  get value() {
    return this.#controller.value;
  }
  get disabled() {
    return !this.#cues()?.length;
  }
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    this.#media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.#menu = useContext(menuContext);
    }
    const { thumbnails } = this.$props;
    this.setAttributes({
      "data-thumbnails": () => !!thumbnails()
    });
  }
  onAttach(el) {
    this.#menu?.attachObserver({
      onOpen: this.#onOpen.bind(this)
    });
  }
  getOptions() {
    const { seekableStart, seekableEnd } = this.#media.$state, startTime = seekableStart(), endTime = seekableEnd();
    return this.#cues().map((cue, i) => ({
      cue,
      value: i.toString(),
      label: cue.text,
      startTime: formatTime(Math.max(0, cue.startTime - startTime)),
      duration: formatSpokenTime(
        Math.min(endTime, cue.endTime) - Math.max(startTime, cue.startTime)
      )
    }));
  }
  #onOpen() {
    peek(() => this.#watchCurrentTime());
  }
  onConnect(el) {
    effect(this.#watchCurrentTime.bind(this));
    effect(this.#watchControllerDisabled.bind(this));
    effect(this.#watchTrack.bind(this));
    watchActiveTextTrack(this.#media.textTracks, "chapters", this.#track.set);
  }
  #watchTrack() {
    const track = this.#track();
    if (!track) return;
    const onCuesChange = this.#onCuesChange.bind(this, track);
    onCuesChange();
    new EventsController(track).add("add-cue", onCuesChange).add("remove-cue", onCuesChange);
    return () => {
      this.#cues.set([]);
    };
  }
  #onCuesChange(track) {
    const { seekableStart, seekableEnd } = this.#media.$state, startTime = seekableStart(), endTime = seekableEnd();
    this.#cues.set(
      [...track.cues].filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime)
    );
  }
  #watchCurrentTime() {
    if (!this.#menu?.expanded()) return;
    const track = this.#track();
    if (!track) {
      this.#controller.value = "-1";
      return;
    }
    const { realCurrentTime, seekableStart, seekableEnd } = this.#media.$state, startTime = seekableStart(), endTime = seekableEnd(), time = realCurrentTime(), activeCueIndex = this.#cues().findIndex((cue) => isCueActive(cue, time));
    this.#controller.value = activeCueIndex.toString();
    if (activeCueIndex >= 0) {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        const cue = this.#cues()[activeCueIndex], radio = this.el.querySelector(`[aria-checked='true']`), cueStartTime = Math.max(startTime, cue.startTime), duration = Math.min(endTime, cue.endTime) - cueStartTime, playedPercent = Math.max(0, time - cueStartTime) / duration * 100;
        radio && setStyle(radio, "--progress", round(playedPercent, 3) + "%");
      });
    }
  }
  #watchControllerDisabled() {
    this.#menu?.disable(this.disabled);
  }
  #onValueChange(value, trigger) {
    if (this.disabled || !trigger) return;
    const index = +value, cues = this.#cues(), { clipStartTime } = this.#media.$state;
    if (isNumber(index) && cues?.[index]) {
      this.#controller.value = index.toString();
      this.#media.remote.seek(cues[index].startTime - clipStartTime(), trigger);
      this.dispatch("change", { detail: cues[index], trigger });
    }
  }
}
__decorateClass([
  prop
], ChaptersRadioGroup.prototype, "value");
__decorateClass([
  prop
], ChaptersRadioGroup.prototype, "disabled");
__decorateClass([
  method
], ChaptersRadioGroup.prototype, "getOptions");

const DEFAULT_AUDIO_GAINS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
class AudioGainRadioGroup extends Component {
  static props = {
    normalLabel: "Disabled",
    gains: DEFAULT_AUDIO_GAINS
  };
  #media;
  #menu;
  #controller;
  get value() {
    return this.#controller.value;
  }
  get disabled() {
    const { gains } = this.$props, { canSetAudioGain } = this.#media.$state;
    return !canSetAudioGain() || gains().length === 0;
  }
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    this.#media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.#menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.#watchValue.bind(this));
    effect(this.#watchHintText.bind(this));
    effect(this.#watchControllerDisabled.bind(this));
  }
  getOptions() {
    const { gains, normalLabel } = this.$props;
    return gains().map((gain) => ({
      label: gain === 1 || gain === null ? normalLabel : String(gain * 100) + "%",
      value: gain.toString()
    }));
  }
  #watchValue() {
    this.#controller.value = this.#getValue();
  }
  #watchHintText() {
    const { normalLabel } = this.$props, { audioGain } = this.#media.$state, gain = audioGain();
    this.#menu?.hint.set(gain === 1 || gain == null ? normalLabel() : String(gain * 100) + "%");
  }
  #watchControllerDisabled() {
    this.#menu?.disable(this.disabled);
  }
  #getValue() {
    const { audioGain } = this.#media.$state;
    return audioGain()?.toString() ?? "1";
  }
  #onValueChange(value, trigger) {
    if (this.disabled) return;
    const gain = +value;
    this.#media.remote.changeAudioGain(gain, trigger);
    this.dispatch("change", { detail: gain, trigger });
  }
}
const audiogainradiogroup__proto = AudioGainRadioGroup.prototype;
prop(audiogainradiogroup__proto, "value");
prop(audiogainradiogroup__proto, "disabled");
method(audiogainradiogroup__proto, "getOptions");

class Gesture extends Component {
  static props = {
    disabled: false,
    event: void 0,
    action: void 0
  };
  #media;
  #provider = null;
  onSetup() {
    this.#media = useMediaContext();
    const { event, action } = this.$props;
    this.setAttributes({
      event,
      action
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-gesture", "");
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    this.#provider = this.#media.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this.#attachListener.bind(this));
  }
  #attachListener() {
    let eventType = this.$props.event(), disabled = this.$props.disabled();
    if (!this.#provider || !eventType || disabled) return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this.#media.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this.#provider,
      eventType,
      this.#acceptEvent.bind(this),
      { passive: false }
    );
  }
  #presses = 0;
  #pressTimerId = -1;
  #acceptEvent(event) {
    if (this.$props.disabled() || isPointerEvent(event) && (event.button !== 0 || this.#media.activeMenu) || isTouchEvent(event) && this.#media.activeMenu || isTouchPinchEvent(event) || !this.#inBounds(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this.#presses === 0) {
        setTimeout(() => {
          if (this.#presses === 1) this.#handleEvent(event);
        }, 250);
      }
    } else if (this.#presses === 1) {
      queueMicrotask(() => this.#handleEvent(event));
      clearTimeout(this.#pressTimerId);
      this.#presses = 0;
      return;
    }
    if (this.#presses === 0) {
      this.#pressTimerId = window.setTimeout(() => {
        this.#presses = 0;
      }, 275);
    }
    this.#presses++;
  }
  #handleEvent(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this.#isTopLayer()) {
        this.#performAction(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  #inBounds(event) {
    if (!this.el) return false;
    if (isPointerEvent(event) || isMouseEvent(event) || isTouchEvent(event)) {
      const touch = isTouchEvent(event) ? event.changedTouches[0] ?? event.touches[0] : void 0;
      const clientX = touch?.clientX ?? event.clientX;
      const clientY = touch?.clientY ?? event.clientY;
      const rect = this.el.getBoundingClientRect();
      const inBounds = clientY >= rect.top && clientY <= rect.bottom && clientX >= rect.left && clientX <= rect.right;
      return event.type.includes("leave") ? !inBounds : inBounds;
    }
    return true;
  }
  /** Validate gesture has the highest z-index in this triggered group. */
  #isTopLayer() {
    const gestures = this.#media.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  #performAction(action, trigger) {
    if (!action) return;
    const willTriggerEvent = new DOMEvent("will-trigger", {
      detail: action,
      cancelable: true,
      trigger
    });
    this.dispatchEvent(willTriggerEvent);
    if (willTriggerEvent.defaultPrevented) return;
    const [method, value] = action.replace(/:([a-z])/, "-$1").split(":");
    if (action.includes(":fullscreen")) {
      this.#media.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this.#media.remote.seek(peek(this.#media.$state.currentTime) + (+value || 0), trigger);
    } else {
      this.#media.remote[kebabToCamelCase(method)](trigger);
    }
    this.dispatch("trigger", {
      detail: action,
      trigger
    });
  }
}

class CaptionsTextRenderer {
  priority = 10;
  #track = null;
  #renderer;
  #events;
  constructor(renderer) {
    this.#renderer = renderer;
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this.#events?.abort();
    this.#events = void 0;
    this.#renderer.reset();
    this.#track = null;
  }
  changeTrack(track) {
    if (!track || this.#track === track) return;
    this.#events?.abort();
    this.#events = new EventsController(track);
    if (track.readyState < 2) {
      this.#renderer.reset();
      this.#events.add("load", () => this.#changeTrack(track), { once: true });
    } else {
      this.#changeTrack(track);
    }
    this.#events.add("add-cue", (event) => {
      this.#renderer.addCue(event.detail);
    }).add("remove-cue", (event) => {
      this.#renderer.removeCue(event.detail);
    });
    this.#track = track;
  }
  #changeTrack(track) {
    this.#renderer.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}

class Captions extends Component {
  static props = {
    textDir: "ltr",
    exampleText: "Captions look like this."
  };
  #media;
  static lib = signal(null);
  onSetup() {
    this.#media = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this.#isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (!Captions.lib()) {
      import('media-captions').then((lib) => Captions.lib.set(lib));
    }
    effect(this.#watchViewType.bind(this));
  }
  #isHidden() {
    const { textTrack, remotePlaybackState, iOSControls } = this.#media.$state, track = textTrack();
    return iOSControls() || remotePlaybackState() === "connected" || !track || !isTrackCaptionKind(track);
  }
  #watchViewType() {
    if (!Captions.lib()) return;
    const { viewType } = this.#media.$state;
    if (viewType() === "audio") {
      return this.#setupAudioView();
    } else {
      return this.#setupVideoView();
    }
  }
  #setupAudioView() {
    effect(this.#onTrackChange.bind(this));
    this.#listenToFontStyleChanges(null);
    return () => {
      this.el.textContent = "";
    };
  }
  #onTrackChange() {
    if (this.#isHidden()) return;
    this.#onCueChange();
    const { textTrack } = this.#media.$state;
    listenEvent(textTrack(), "cue-change", this.#onCueChange.bind(this));
    effect(this.#onUpdateTimedNodes.bind(this));
  }
  #onCueChange() {
    this.el.textContent = "";
    if (this.#hideExampleTimer >= 0) {
      this.#removeExample();
    }
    const { realCurrentTime, textTrack } = this.#media.$state, { renderVTTCueString } = Captions.lib(), time = peek(realCurrentTime), activeCues = peek(textTrack).activeCues;
    for (const cue of activeCues) {
      const displayEl = this.#createCueDisplayElement(), cueEl = this.#createCueElement();
      cueEl.innerHTML = renderVTTCueString(cue, time);
      displayEl.append(cueEl);
      this.el.append(cueEl);
    }
  }
  #onUpdateTimedNodes() {
    const { realCurrentTime } = this.#media.$state, { updateTimedVTTCueNodes } = Captions.lib();
    updateTimedVTTCueNodes(this.el, realCurrentTime());
  }
  #setupVideoView() {
    const { CaptionsRenderer } = Captions.lib(), renderer = new CaptionsRenderer(this.el), textRenderer = new CaptionsTextRenderer(renderer);
    this.#media.textRenderers.add(textRenderer);
    effect(this.#watchTextDirection.bind(this, renderer));
    effect(this.#watchMediaTime.bind(this, renderer));
    this.#listenToFontStyleChanges(renderer);
    return () => {
      this.el.textContent = "";
      this.#media.textRenderers.remove(textRenderer);
      renderer.destroy();
    };
  }
  #watchTextDirection(renderer) {
    renderer.dir = this.$props.textDir();
  }
  #watchMediaTime(renderer) {
    if (this.#isHidden()) return;
    const { realCurrentTime, textTrack } = this.#media.$state;
    renderer.currentTime = realCurrentTime();
    if (this.#hideExampleTimer >= 0 && textTrack()?.activeCues[0]) {
      this.#removeExample();
    }
  }
  #listenToFontStyleChanges(renderer) {
    const player = this.#media.player;
    if (!player) return;
    const onChange = this.#onFontStyleChange.bind(this, renderer);
    listenEvent(player, "vds-font-change", onChange);
  }
  #onFontStyleChange(renderer) {
    if (this.#hideExampleTimer >= 0) {
      this.#hideExample();
      return;
    }
    const { textTrack } = this.#media.$state;
    if (!textTrack()?.activeCues[0]) {
      this.#showExample();
    } else {
      renderer?.update(true);
    }
  }
  #showExample() {
    const display = this.#createCueDisplayElement();
    setAttribute(display, "data-example", "");
    const cue = this.#createCueElement();
    setAttribute(cue, "data-example", "");
    cue.textContent = this.$props.exampleText();
    display?.append(cue);
    this.el?.append(display);
    this.el?.setAttribute("data-example", "");
    this.#hideExample();
  }
  #hideExampleTimer = -1;
  #hideExample() {
    window.clearTimeout(this.#hideExampleTimer);
    this.#hideExampleTimer = window.setTimeout(this.#removeExample.bind(this), 2500);
  }
  #removeExample() {
    this.el?.removeAttribute("data-example");
    if (this.el?.querySelector("[data-example]")) this.el.textContent = "";
    this.#hideExampleTimer = -1;
  }
  #createCueDisplayElement() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue-display");
    return el;
  }
  #createCueElement() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue");
    return el;
  }
}

export { AudioGainRadioGroup, AudioGainSlider, Captions, ChaptersRadioGroup, Controls, ControlsGroup, DEFAULT_AUDIO_GAINS, Gesture, GoogleCastButton, MediaAnnouncer, QualitySlider, RadioGroup, SliderChapters, SliderVideo, SpeedSlider, ToggleButton, Tooltip, TooltipContent, TooltipTrigger };
