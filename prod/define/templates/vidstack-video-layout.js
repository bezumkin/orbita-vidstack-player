import { computed, signal, effect, camelToKebabCase, Host } from '../../chunks/vidstack-CRlI3Mh7.js';
import { DefaultLayout, useDefaultLayoutContext, DefaultAnnouncer, DefaultCaptions, DefaultControlsSpacer, DefaultTimeSlider, DefaultPlayButton, DefaultVolumePopup, DefaultTimeInfo, DefaultTitle, DefaultCaptionButton, DefaultAirPlayButton, DefaultGoogleCastButton, DefaultDownloadButton, DefaultPIPButton, DefaultFullscreenButton, DefaultChaptersMenu, DefaultSettingsMenu, setLayoutName, createMenuContainer, DefaultLayoutIconsLoader } from '../../chunks/vidstack-C46JrTZz.js';
import { useMediaContext, useMediaState } from '../../chunks/vidstack-Cpte_fRf.js';
import { $signal, SlotManager } from '../../chunks/vidstack-7xep0lg7.js';
import { LitElement } from '../../chunks/vidstack-CwTj4H1w.js';
import { html } from 'lit-html';
import { keyed } from 'lit-html/directives/keyed.js';
import { createSlot } from '../../chunks/vidstack-DWQEfrPg.js';
import '../../chunks/vidstack-lwuXewh7.js';
import '../../chunks/vidstack-BOTZD4tC.js';
import 'lit-html/directives/if-defined.js';
import 'lit-html/directives/ref.js';
import '../../chunks/vidstack-A9j--j6J.js';
import '../../chunks/vidstack-DwhHIY5e.js';
import 'lit-html/directives/unsafe-svg.js';
import 'lit-html/async-directive.js';
import '@floating-ui/dom';

class DefaultVideoLayout extends DefaultLayout {
  static props = {
    ...super.props,
    when: ({ viewType }) => viewType === "video",
    smallWhen: ({ width, height }) => width < 576 || height < 380
  };
}

function DefaultKeyboardDisplay() {
  return $signal(() => {
    const media = useMediaContext(), { noKeyboardAnimations, userPrefersKeyboardAnimations } = useDefaultLayoutContext(), $disabled = computed(() => noKeyboardAnimations() || !userPrefersKeyboardAnimations());
    if ($disabled()) {
      return null;
    }
    const visible = signal(false), { lastKeyboardAction } = media.$state;
    effect(() => {
      visible.set(!!lastKeyboardAction());
      const id = setTimeout(() => visible.set(false), 500);
      return () => {
        visible.set(false);
        window.clearTimeout(id);
      };
    });
    const $actionDataAttr = computed(() => {
      const action = lastKeyboardAction()?.action;
      return action && visible() ? camelToKebabCase(action) : null;
    });
    const $classList = computed(() => `vds-kb-action${!visible() ? " hidden" : ""}`), $text = computed(getText), $iconSlot = computed(() => {
      const name = getIconName();
      return name ? createSlot(name) : null;
    });
    function Icon() {
      const $slot = $iconSlot();
      if (!$slot) return null;
      return html`
        <div class="vds-kb-bezel">
          <div class="vds-kb-icon">${$slot}</div>
        </div>
      `;
    }
    return html`
      <div class=${$signal($classList)} data-action=${$signal($actionDataAttr)}>
        <div class="vds-kb-text-wrapper">
          <div class="vds-kb-text">${$signal($text)}</div>
        </div>
        ${$signal(() => keyed(lastKeyboardAction(), Icon()))}
      </div>
    `;
  });
}
function getText() {
  const { $state } = useMediaContext(), action = $state.lastKeyboardAction()?.action, audioGain = $state.audioGain() ?? 1;
  switch (action) {
    case "toggleMuted":
      return $state.muted() ? "0%" : getVolumeText($state.volume(), audioGain);
    case "volumeUp":
    case "volumeDown":
      return getVolumeText($state.volume(), audioGain);
    default:
      return "";
  }
}
function getVolumeText(volume, gain) {
  return `${Math.round(volume * gain * 100)}%`;
}
function getIconName() {
  const { $state } = useMediaContext(), action = $state.lastKeyboardAction()?.action;
  switch (action) {
    case "togglePaused":
      return !$state.paused() ? "kb-play-icon" : "kb-pause-icon";
    case "toggleMuted":
      return $state.muted() || $state.volume() === 0 ? "kb-mute-icon" : $state.volume() >= 0.5 ? "kb-volume-up-icon" : "kb-volume-down-icon";
    case "toggleFullscreen":
      return `kb-fs-${$state.fullscreen() ? "enter" : "exit"}-icon`;
    case "togglePictureInPicture":
      return `kb-pip-${$state.pictureInPicture() ? "enter" : "exit"}-icon`;
    case "toggleCaptions":
      return $state.hasCaptions() ? `kb-cc-${$state.textTrack() ? "on" : "off"}-icon` : null;
    case "volumeUp":
      return "kb-volume-up-icon";
    case "volumeDown":
      return "kb-volume-down-icon";
    case "seekForward":
      return "kb-seek-forward-icon";
    case "seekBackward":
      return "kb-seek-backward-icon";
    default:
      return null;
  }
}

function DefaultVideoLayoutLarge() {
  return [
    DefaultAnnouncer(),
    DefaultVideoGestures(),
    DefaultBufferingIndicator(),
    DefaultKeyboardDisplay(),
    DefaultCaptions(),
    html`<div class="vds-scrim"></div>`,
    html`
      <media-controls class="vds-controls">
        ${[
      DefaultControlsGroupTop(),
      DefaultControlsSpacer(),
      html`<media-controls-group class="vds-controls-group"></media-controls-group>`,
      DefaultControlsSpacer(),
      html`
            <media-controls-group class="vds-controls-group">
              ${DefaultTimeSlider()}
            </media-controls-group>
          `,
      html`
            <media-controls-group class="vds-controls-group">
              ${[
        DefaultPlayButton({ tooltip: "top start" }),
        DefaultVolumePopup({ orientation: "horizontal", tooltip: "top" }),
        DefaultTimeInfo(),
        DefaultTitle(),
        DefaultCaptionButton({ tooltip: "top" }),
        DefaultBottomMenuGroup(),
        DefaultAirPlayButton({ tooltip: "top" }),
        DefaultGoogleCastButton({ tooltip: "top" }),
        DefaultDownloadButton(),
        DefaultPIPButton(),
        DefaultFullscreenButton({ tooltip: "top end" })
      ]}
            </media-controls-group>
          `
    ]}
      </media-controls>
    `
  ];
}
function DefaultBottomMenuGroup() {
  return $signal(() => {
    const { menuGroup } = useDefaultLayoutContext();
    return menuGroup() === "bottom" ? DefaultVideoMenus() : null;
  });
}
function DefaultControlsGroupTop() {
  return html`
    <media-controls-group class="vds-controls-group">
      ${$signal(() => {
    const { menuGroup } = useDefaultLayoutContext();
    return menuGroup() === "top" ? [DefaultControlsSpacer(), DefaultVideoMenus()] : null;
  })}
    </media-controls-group>
  `;
}
function DefaultVideoLayoutSmall() {
  return [
    DefaultAnnouncer(),
    DefaultVideoGestures(),
    DefaultBufferingIndicator(),
    DefaultCaptions(),
    DefaultKeyboardDisplay(),
    html`<div class="vds-scrim"></div>`,
    html`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[
      DefaultAirPlayButton({ tooltip: "top start" }),
      DefaultGoogleCastButton({ tooltip: "bottom start" }),
      DefaultControlsSpacer(),
      DefaultCaptionButton({ tooltip: "bottom" }),
      DefaultDownloadButton(),
      DefaultVideoMenus(),
      DefaultVolumePopup({ orientation: "vertical", tooltip: "bottom end" })
    ]}
        </media-controls-group>

        ${DefaultControlsSpacer()}

        <media-controls-group class="vds-controls-group" style="pointer-events: none;">
          ${[
      DefaultControlsSpacer(),
      DefaultPlayButton({ tooltip: "top" }),
      DefaultControlsSpacer()
    ]}
        </media-controls-group>

        ${DefaultControlsSpacer()}

        <media-controls-group class="vds-controls-group">
          ${[DefaultTimeInfo(), DefaultTitle(), DefaultFullscreenButton({ tooltip: "top end" })]}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${DefaultTimeSlider()}
        </media-controls-group>
      </media-controls>
    `,
    StartDuration()
  ];
}
function DefaultVideoLoadLayout() {
  return html`
    <div class="vds-load-container">
      ${[DefaultBufferingIndicator(), DefaultPlayButton({ tooltip: "top" })]}
    </div>
  `;
}
function StartDuration() {
  return $signal(() => {
    const { duration } = useMediaState();
    if (duration() === 0) return null;
    return html`
      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    `;
  });
}
function DefaultBufferingIndicator() {
  return html`
    <div class="vds-buffering-indicator">
      <media-spinner class="vds-buffering-spinner"></media-spinner>
    </div>
  `;
}
function DefaultVideoMenus() {
  const { menuGroup, smallWhen: smWhen } = useDefaultLayoutContext(), $side = () => menuGroup() === "top" || smWhen() ? "bottom" : "top", $tooltip = computed(() => `${$side()} ${menuGroup() === "top" ? "end" : "center"}`), $placement = computed(() => `${$side()} end`);
  return [
    DefaultChaptersMenu({ tooltip: $tooltip, placement: $placement, portal: true }),
    DefaultSettingsMenu({ tooltip: $tooltip, placement: $placement, portal: true })
  ];
}
function DefaultVideoGestures() {
  return $signal(() => {
    const { noGestures } = useDefaultLayoutContext();
    if (noGestures()) return null;
    return html`
      <div class="vds-gestures">
        <media-gesture class="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="pointerup"
          action="toggle:controls"
        ></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="dblpointerup"
          action="toggle:fullscreen"
        ></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
      </div>
    `;
  });
}

class MediaVideoLayoutElement extends Host(LitElement, DefaultVideoLayout) {
  static tagName = "media-video-layout";
  static attrs = {
    smallWhen: {
      converter(value) {
        return value !== "never" && !!value;
      }
    }
  };
  #media;
  onSetup() {
    this.forwardKeepAlive = false;
    this.#media = useMediaContext();
    this.classList.add("vds-video-layout");
  }
  onConnect() {
    setLayoutName("video", () => this.isMatch);
    this.#setupMenuContainer();
  }
  render() {
    return $signal(this.#render.bind(this));
  }
  #setupMenuContainer() {
    const { menuPortal } = useDefaultLayoutContext();
    effect(() => {
      if (!this.isMatch) return;
      const container = createMenuContainer(
        this,
        this.menuContainer,
        "vds-video-layout",
        () => this.isSmallLayout
      ), roots = container ? [this, container] : [this];
      const iconsManager = this.$props.customIcons() ? new SlotManager(roots) : new DefaultLayoutIconsLoader(roots);
      iconsManager.connect();
      menuPortal.set(container);
      return () => {
        container.remove();
        menuPortal.set(null);
      };
    });
  }
  #render() {
    const { load } = this.#media.$props, { canLoad, streamType, nativeControls } = this.#media.$state;
    return !nativeControls() && this.isMatch ? load() === "play" && !canLoad() ? DefaultVideoLoadLayout() : streamType() === "unknown" ? DefaultBufferingIndicator() : this.isSmallLayout ? DefaultVideoLayoutSmall() : DefaultVideoLayoutLarge() : null;
  }
}

export { MediaVideoLayoutElement };
