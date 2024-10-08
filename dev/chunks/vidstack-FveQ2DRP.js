import { Host, effect, Component, signal, setAttribute, isBoolean, computed, isString, useState } from './vidstack-DVpy0IqK.js';
import { Captions, Gesture, MediaAnnouncer, Controls, ControlsGroup, GoogleCastButton, ToggleButton, Tooltip, TooltipTrigger, TooltipContent, ChaptersRadioGroup, AudioGainRadioGroup, RadioGroup, SliderVideo, AudioGainSlider, SpeedSlider, QualitySlider, SliderChapters } from './vidstack-DMaVQZbw.js';
import { useMediaContext } from './vidstack-CUYciP40.js';
import { watchCueTextChange } from './vidstack-Cg9baIQC.js';
import { html } from 'lit-html';
import { requestScopedAnimationFrame, isHTMLElement, cloneTemplateContent, createTemplate, cloneTemplate } from './vidstack-Chli0Y4M.js';
import { LitElement } from './vidstack-CwTj4H1w.js';
import { MenuPortal, Slider, sliderState } from './vidstack-D2ApzKPg.js';
import { renderMenuItemsTemplate } from './vidstack-CkFd-HzN.js';

class MediaCaptionsElement extends Host(HTMLElement, Captions) {
  static tagName = "media-captions";
}

class MediaGestureElement extends Host(HTMLElement, Gesture) {
  static tagName = "media-gesture";
}

class MediaAnnouncerElement extends Host(HTMLElement, MediaAnnouncer) {
  static tagName = "media-announcer";
}

class MediaControlsElement extends Host(HTMLElement, Controls) {
  static tagName = "media-controls";
}

class MediaControlsGroupElement extends Host(HTMLElement, ControlsGroup) {
  static tagName = "media-controls-group";
}

class Title extends Component {
}
class MediaTitleElement extends Host(HTMLElement, Title) {
  static tagName = "media-title";
  #media;
  onSetup() {
    this.#media = useMediaContext();
  }
  onConnect() {
    effect(this.#watchTitle.bind(this));
  }
  #watchTitle() {
    const { title } = this.#media.$state;
    this.textContent = title();
  }
}

class ChapterTitle extends Component {
  static props = {
    defaultText: ""
  };
}
class MediaChapterTitleElement extends Host(HTMLElement, ChapterTitle) {
  static tagName = "media-chapter-title";
  #media;
  #chapterTitle;
  onSetup() {
    this.#media = useMediaContext();
    this.#chapterTitle = signal("");
  }
  onConnect() {
    const tracks = this.#media.textTracks;
    watchCueTextChange(tracks, "chapters", this.#chapterTitle.set);
    effect(this.#watchChapterTitle.bind(this));
  }
  #watchChapterTitle() {
    const { defaultText } = this.$props;
    this.textContent = this.#chapterTitle() || defaultText();
  }
}

class Spinner extends Component {
  static props = {
    size: 96,
    trackWidth: 8,
    fillPercent: 50
  };
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      const root = el.querySelector("svg"), track = root.firstElementChild, trackFill = track.nextElementSibling;
      effect(this.#update.bind(this, root, track, trackFill));
    });
  }
  #update(root, track, trackFill) {
    const { size, trackWidth, fillPercent } = this.$props;
    setAttribute(root, "width", size());
    setAttribute(root, "height", size());
    setAttribute(track, "stroke-width", trackWidth());
    setAttribute(trackFill, "stroke-width", trackWidth());
    setAttribute(trackFill, "stroke-dashoffset", 100 - fillPercent());
  }
}
class MediaSpinnerElement extends Host(LitElement, Spinner) {
  static tagName = "media-spinner";
  render() {
    return html`
      <svg fill="none" viewBox="0 0 120 120" aria-hidden="true" data-part="root">
        <circle cx="60" cy="60" r="54" stroke="currentColor" data-part="track"></circle>
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="currentColor"
          pathLength="100"
          stroke-dasharray="100"
          data-part="track-fill"
        ></circle>
      </svg>
    `;
  }
}

class MediaLayout extends Component {
  static props = {
    when: false
  };
}
class MediaLayoutElement extends Host(HTMLElement, MediaLayout) {
  static tagName = "media-layout";
  #media;
  onSetup() {
    this.#media = useMediaContext();
  }
  onConnect() {
    effect(this.#watchWhen.bind(this));
  }
  #watchWhen() {
    const root = this.firstElementChild, isTemplate = root?.localName === "template", when = this.$props.when(), matches = isBoolean(when) ? when : computed(() => when(this.#media.player.state))();
    if (!matches) {
      if (isTemplate) {
        this.textContent = "";
        this.appendChild(root);
      } else if (isHTMLElement(root)) {
        root.style.display = "none";
      }
      return;
    }
    if (isTemplate) {
      this.append(root.content.cloneNode(true));
    } else if (isHTMLElement(root)) {
      root.style.display = "";
    }
  }
}

class MediaGoogleCastButtonElement extends Host(HTMLElement, GoogleCastButton) {
  static tagName = "media-google-cast-button";
}

class MediaToggleButtonElement extends Host(HTMLElement, ToggleButton) {
  static tagName = "media-toggle-button";
}

class MediaTooltipElement extends Host(HTMLElement, Tooltip) {
  static tagName = "media-tooltip";
}

class MediaTooltipTriggerElement extends Host(HTMLElement, TooltipTrigger) {
  static tagName = "media-tooltip-trigger";
  onConnect() {
    this.style.display = "contents";
  }
}

class MediaTooltipContentElement extends Host(HTMLElement, TooltipContent) {
  static tagName = "media-tooltip-content";
}

class MediaMenuPortalElement extends Host(HTMLElement, MenuPortal) {
  static tagName = "media-menu-portal";
  static attrs = {
    disabled: {
      converter(value) {
        if (isString(value)) return value;
        return value !== null;
      }
    }
  };
}

class MediaChaptersRadioGroupElement extends Host(HTMLElement, ChaptersRadioGroup) {
  static tagName = "media-chapters-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this, (el, option) => {
      const { cue, startTime, duration } = option, thumbnailEl = el.querySelector(".vds-thumbnail,media-thumbnail"), startEl = el.querySelector('[data-part="start-time"]'), durationEl = el.querySelector('[data-part="duration"]');
      if (startEl) startEl.textContent = startTime;
      if (durationEl) durationEl.textContent = duration;
      if (thumbnailEl) {
        thumbnailEl.setAttribute("time", cue.startTime + "");
        effect(() => {
          const thumbnails = this.$props.thumbnails();
          if ("src" in thumbnailEl) {
            thumbnailEl.src = thumbnails;
          } else if (isString(thumbnails)) {
            thumbnailEl.setAttribute("src", thumbnails);
          }
        });
      }
    });
  }
}

class MediaAudioGainRadioGroupElement extends Host(HTMLElement, AudioGainRadioGroup) {
  static tagName = "media-audio-gain-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaRadioGroupElement extends Host(HTMLElement, RadioGroup) {
  static tagName = "media-radio-group";
}

class MediaSliderElement extends Host(HTMLElement, Slider) {
  static tagName = "media-slider";
}

const videoTemplate = /* @__PURE__ */ createTemplate(
  `<video muted playsinline preload="none" style="max-width: unset;"></video>`
);
class MediaSliderVideoElement extends Host(HTMLElement, SliderVideo) {
  static tagName = "media-slider-video";
  #media;
  #video = this.#createVideo();
  onSetup() {
    this.#media = useMediaContext();
    this.$state.video.set(this.#video);
  }
  onConnect() {
    const { canLoad } = this.#media.$state, { src, crossOrigin } = this.$state;
    if (this.#video.parentNode !== this) {
      this.prepend(this.#video);
    }
    effect(() => {
      setAttribute(this.#video, "crossorigin", crossOrigin());
      setAttribute(this.#video, "preload", canLoad() ? "auto" : "none");
      setAttribute(this.#video, "src", src());
    });
  }
  #createVideo() {
    return cloneTemplateContent(videoTemplate);
  }
}

class MediaAudioGainSliderElement extends Host(HTMLElement, AudioGainSlider) {
  static tagName = "media-audio-gain-slider";
}

class MediaSpeedSliderElement extends Host(HTMLElement, SpeedSlider) {
  static tagName = "media-speed-slider";
}

class MediaQualitySliderElement extends Host(HTMLElement, QualitySlider) {
  static tagName = "media-quality-slider";
}

class MediaSliderChaptersElement extends Host(HTMLElement, SliderChapters) {
  static tagName = "media-slider-chapters";
  #template = null;
  onConnect() {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      const template = this.querySelector("template");
      if (template) {
        this.#template = template;
        effect(this.#renderTemplate.bind(this));
      }
    });
  }
  #renderTemplate() {
    if (!this.#template) return;
    const elements = cloneTemplate(this.#template, this.cues.length || 1);
    this.setRefs(elements);
  }
}

class SliderSteps extends Component {
}
class MediaSliderStepsElement extends Host(HTMLElement, SliderSteps) {
  static tagName = "media-slider-steps";
  #template = null;
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      this.#template = el.querySelector("template");
      if (this.#template) effect(this.#render.bind(this));
    });
  }
  #render() {
    if (!this.#template) return;
    const { min, max, step } = useState(sliderState), steps = (max() - min()) / step();
    cloneTemplate(this.#template, Math.floor(steps) + 1);
  }
}

export { MediaAnnouncerElement, MediaAudioGainRadioGroupElement, MediaAudioGainSliderElement, MediaCaptionsElement, MediaChapterTitleElement, MediaChaptersRadioGroupElement, MediaControlsElement, MediaControlsGroupElement, MediaGestureElement, MediaGoogleCastButtonElement, MediaLayoutElement, MediaMenuPortalElement, MediaQualitySliderElement, MediaRadioGroupElement, MediaSliderChaptersElement, MediaSliderElement, MediaSliderStepsElement, MediaSliderVideoElement, MediaSpeedSliderElement, MediaSpinnerElement, MediaTitleElement, MediaToggleButtonElement, MediaTooltipContentElement, MediaTooltipElement, MediaTooltipTriggerElement };
