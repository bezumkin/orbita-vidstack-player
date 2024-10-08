import { Host, effect, setAttribute, isString, useState, BOOLEAN } from './vidstack-CRlI3Mh7.js';
import { Thumbnail, Time, AirPlayButton, CaptionButton, FullscreenButton, LiveButton, MuteButton, PIPButton, PlayButton, SeekButton, AudioRadioGroup, CaptionsRadioGroup, Menu, MenuButton, MenuItem, MenuItems, SpeedRadioGroup, QualityRadioGroup, Radio, Slider, SliderValue, TimeSlider, SliderPreview, VolumeSlider } from './vidstack-Cejxj8xC.js';
import { cloneTemplateContent, createTemplate, requestScopedAnimationFrame, cloneTemplate } from './vidstack-DWQEfrPg.js';
import { useMediaContext } from './vidstack-Cpte_fRf.js';

const imgTemplate = /* @__PURE__ */ createTemplate(
  '<img loading="eager" decoding="async" aria-hidden="true">'
);
class MediaThumbnailElement extends Host(HTMLElement, Thumbnail) {
  static tagName = "media-thumbnail";
  static attrs = {
    crossOrigin: "crossorigin"
  };
  #media;
  #img = this.#createImg();
  onSetup() {
    this.#media = useMediaContext();
    this.$state.img.set(this.#img);
  }
  onConnect() {
    const { src, crossOrigin } = this.$state;
    if (this.#img.parentNode !== this) {
      this.prepend(this.#img);
    }
    effect(() => {
      setAttribute(this.#img, "src", src());
      setAttribute(this.#img, "crossorigin", crossOrigin());
    });
  }
  #createImg() {
    return cloneTemplateContent(imgTemplate);
  }
}

class MediaTimeElement extends Host(HTMLElement, Time) {
  static tagName = "media-time";
  onConnect() {
    effect(() => {
      this.textContent = this.$state.timeText();
    });
  }
}

class MediaAirPlayButtonElement extends Host(HTMLElement, AirPlayButton) {
  static tagName = "media-airplay-button";
}

class MediaCaptionButtonElement extends Host(HTMLElement, CaptionButton) {
  static tagName = "media-caption-button";
}

class MediaFullscreenButtonElement extends Host(HTMLElement, FullscreenButton) {
  static tagName = "media-fullscreen-button";
}

class MediaLiveButtonElement extends Host(HTMLElement, LiveButton) {
  static tagName = "media-live-button";
}

class MediaMuteButtonElement extends Host(HTMLElement, MuteButton) {
  static tagName = "media-mute-button";
}

class MediaPIPButtonElement extends Host(HTMLElement, PIPButton) {
  static tagName = "media-pip-button";
}

class MediaPlayButtonElement extends Host(HTMLElement, PlayButton) {
  static tagName = "media-play-button";
}

class MediaSeekButtonElement extends Host(HTMLElement, SeekButton) {
  static tagName = "media-seek-button";
}

function renderMenuItemsTemplate(el, onCreate) {
  requestScopedAnimationFrame(() => {
    if (!el.connectScope) return;
    const template = el.querySelector("template");
    if (!template) return;
    effect(() => {
      const options = el.getOptions();
      cloneTemplate(template, options.length, (radio, i) => {
        const { label, value } = options[i], labelEl = radio.querySelector(`[data-part="label"]`);
        radio.setAttribute("value", value);
        if (labelEl) {
          if (isString(label)) {
            labelEl.textContent = label;
          } else {
            effect(() => {
              labelEl.textContent = label();
            });
          }
        }
        onCreate?.(radio, options[i], i);
      });
    });
  });
}

class MediaAudioRadioGroupElement extends Host(HTMLElement, AudioRadioGroup) {
  static tagName = "media-audio-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaCaptionsRadioGroupElement extends Host(HTMLElement, CaptionsRadioGroup) {
  static tagName = "media-captions-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaMenuElement extends Host(HTMLElement, Menu) {
  static tagName = "media-menu";
}

class MediaMenuButtonElement extends Host(HTMLElement, MenuButton) {
  static tagName = "media-menu-button";
}

class MediaMenuItemElement extends Host(HTMLElement, MenuItem) {
  static tagName = "media-menu-item";
}

class MediaMenuItemsElement extends Host(HTMLElement, MenuItems) {
  static tagName = "media-menu-items";
}

class MediaSpeedRadioGroupElement extends Host(HTMLElement, SpeedRadioGroup) {
  static tagName = "media-speed-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaQualityRadioGroupElement extends Host(HTMLElement, QualityRadioGroup) {
  static tagName = "media-quality-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this, (el, option) => {
      const bitrate = option.bitrate, bitrateEl = el.querySelector('[data-part="bitrate"]');
      if (bitrate && bitrateEl) {
        effect(() => {
          bitrateEl.textContent = bitrate() || "";
        });
      }
    });
  }
}

class MediaRadioElement extends Host(HTMLElement, Radio) {
  static tagName = "media-radio";
}

class MediaSliderThumbnailElement extends MediaThumbnailElement {
  static tagName = "media-slider-thumbnail";
  #media;
  #slider;
  onSetup() {
    super.onSetup();
    this.#media = useMediaContext();
    this.#slider = useState(Slider.state);
  }
  onConnect() {
    super.onConnect();
    effect(this.#watchTime.bind(this));
  }
  #watchTime() {
    const { duration, clipStartTime } = this.#media.$state;
    this.time = clipStartTime() + this.#slider.pointerRate() * duration();
  }
}

class MediaSliderValueElement extends Host(HTMLElement, SliderValue) {
  static tagName = "media-slider-value";
  static attrs = {
    padMinutes: {
      converter: BOOLEAN
    }
  };
  onConnect() {
    effect(() => {
      this.textContent = this.getValueText();
    });
  }
}

class MediaTimeSliderElement extends Host(HTMLElement, TimeSlider) {
  static tagName = "media-time-slider";
}

class MediaSliderPreviewElement extends Host(HTMLElement, SliderPreview) {
  static tagName = "media-slider-preview";
}

class MediaVolumeSliderElement extends Host(HTMLElement, VolumeSlider) {
  static tagName = "media-volume-slider";
}

export { MediaAirPlayButtonElement, MediaAudioRadioGroupElement, MediaCaptionButtonElement, MediaCaptionsRadioGroupElement, MediaFullscreenButtonElement, MediaLiveButtonElement, MediaMenuButtonElement, MediaMenuElement, MediaMenuItemElement, MediaMenuItemsElement, MediaMuteButtonElement, MediaPIPButtonElement, MediaPlayButtonElement, MediaQualityRadioGroupElement, MediaRadioElement, MediaSeekButtonElement, MediaSliderPreviewElement, MediaSliderThumbnailElement, MediaSliderValueElement, MediaSpeedRadioGroupElement, MediaThumbnailElement, MediaTimeElement, MediaTimeSliderElement, MediaVolumeSliderElement, renderMenuItemsTemplate };
