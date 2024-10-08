export { AudioProviderLoader, AudioTrackList, DASHProviderLoader, FullscreenController, HLSProviderLoader, List, LocalMediaStorage, Logger, MEDIA_KEY_SHORTCUTS, MediaControls, MediaPlayer, MediaProvider, MediaRemoteControl, ScreenOrientationController, TextRenderers, TextTrackList, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, YouTubeProviderLoader, boundTime, canFullscreen, isAudioProvider, isDASHProvider, isGoogleCastProvider, isHLSProvider, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isVideoProvider, isVideoQualitySrc, isVimeoProvider, isYouTubeProvider, mediaState, softResetMediaState } from './chunks/vidstack-vmONHURZ.js';
export { mediaContext } from './chunks/vidstack-CUYciP40.js';
import { TextTrackSymbol } from './chunks/vidstack-nPuRR80r.js';
export { TextTrack, isTrackCaptionKind, parseJSONCaptionsFile } from './chunks/vidstack-nPuRR80r.js';
import { isString, EventsController, DOMEvent, useState } from './chunks/vidstack-DVpy0IqK.js';
export { appendTriggerEvent, findTriggerEvent, hasTriggerEvent, isKeyboardClick, isKeyboardEvent, isPointerEvent, walkTriggerEventChain } from './chunks/vidstack-DVpy0IqK.js';
export { findActiveCue, isCueActive, watchActiveTextTrack, watchCueTextChange } from './chunks/vidstack-Cg9baIQC.js';
export { sortVideoQualities } from './chunks/vidstack-BOTZD4tC.js';
import { Thumbnail, Slider } from './chunks/vidstack-D2ApzKPg.js';
export { ARIAKeyShortcuts, AirPlayButton, AudioRadioGroup, CaptionButton, CaptionsRadioGroup, DEFAULT_PLAYBACK_RATES, FullscreenButton, LiveButton, Menu, MenuButton, MenuItem, MenuItems, MenuPortal, MuteButton, PIPButton, PlayButton, QualityRadioGroup, Radio, SeekButton, SliderController, SliderPreview, SliderValue, SpeedRadioGroup, ThumbnailsLoader, Time, TimeSlider, VolumeSlider, formatSpokenTime, formatTime, menuPortalContext, sliderContext, sliderState, updateSliderPreviewPlacement } from './chunks/vidstack-D2ApzKPg.js';
export { TimeRange, getTimeRangesEnd, getTimeRangesStart, normalizeTimeIntervals, updateTimeIntervals } from './chunks/vidstack-B5ElR9su.js';
export { AudioGainRadioGroup, AudioGainSlider, Captions, ChaptersRadioGroup, Controls, ControlsGroup, DEFAULT_AUDIO_GAINS, Gesture, GoogleCastButton, MediaAnnouncer, QualitySlider, RadioGroup, SliderChapters, SliderVideo, SpeedSlider, ToggleButton, Tooltip, TooltipContent, TooltipTrigger } from './chunks/vidstack-DMaVQZbw.js';
export { Poster } from './chunks/vidstack-DSIEmkg2.js';
export { usePlyrLayoutClasses } from './chunks/vidstack-CuDKkHai.js';
export { getDownloadFile } from './chunks/vidstack-DCY5OwWc.js';
export { AUDIO_EXTENSIONS, AUDIO_TYPES, DASH_VIDEO_EXTENSIONS, DASH_VIDEO_TYPES, HLS_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, VIDEO_EXTENSIONS, VIDEO_TYPES, canChangeVolume, canGoogleCastSrc, canOrientScreen, canPlayHLSNatively, canRotateScreen, canUsePictureInPicture, canUseVideoPresentation, isAudioSrc, isDASHSrc, isHLSSrc, isMediaStream, isVideoSrc } from './chunks/vidstack-uKxEd7nI.js';
import './chunks/vidstack-Dv_LIPFu.js';
import './chunks/vidstack-Bpr4fI4n.js';
import './chunks/vidstack-DbBJlz7I.js';
import './chunks/vidstack-Chli0Y4M.js';
import '@floating-ui/dom';
import './chunks/vidstack-Dihypf8P.js';
import './chunks/vidstack-9MhB-Ya7.js';

class LibASSTextRenderer {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
  }
  priority = 1;
  #instance = null;
  #track = null;
  #typeRE = /(ssa|ass)$/;
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this.#typeRE.test(track.type) || this.#typeRE.test(track.src));
  }
  attach(video) {
    if (!video) return;
    this.loader().then(async (mod) => {
      this.#instance = new mod.default({
        ...this.config,
        video,
        subUrl: this.#track?.src || ""
      });
      new EventsController(this.#instance).add("ready", () => {
        const canvas = this.#instance?._canvas;
        if (canvas) canvas.style.pointerEvents = "none";
      }).add("error", (event) => {
        if (!this.#track) return;
        this.#track[TextTrackSymbol.readyState] = 3;
        this.#track.dispatchEvent(
          new DOMEvent("error", {
            trigger: event,
            detail: event.error
          })
        );
      });
    });
  }
  changeTrack(track) {
    if (!track || track.readyState === 3) {
      this.#freeTrack();
    } else if (this.#track !== track) {
      this.#instance?.setTrackByUrl(track.src);
      this.#track = track;
    }
  }
  detach() {
    this.#freeTrack();
  }
  #freeTrack() {
    this.#instance?.freeTrack();
    this.#track = null;
  }
}

class SliderThumbnail extends Thumbnail {
  #slider;
  onAttach(el) {
    this.#slider = useState(Slider.state);
  }
  getTime() {
    const { duration, clipStartTime } = this.media.$state;
    return clipStartTime() + this.#slider.pointerRate() * duration();
  }
}

{
  console.warn("[vidstack] dev mode!");
}

export { LibASSTextRenderer, Slider, SliderThumbnail, Thumbnail };
