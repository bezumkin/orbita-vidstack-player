/// <reference path="./dom.d.ts" />
/// <reference path="./google-cast.d.ts" />

import { MaverickElementConstructor, Attributes, Component } from './types/vidstack-BNOTL9fc.js';
export { defineCustomElement } from './types/vidstack-BNOTL9fc.js';
import { Captions, Gesture, MediaProvider, MediaPlayerProps, MediaPlayer, MediaAnnouncer, PosterProps, Poster, ThumbnailProps, Thumbnail, Time, Controls, ControlsGroup, MediaPlayerQuery, DefaultLayoutProps, PlyrLayout, AirPlayButton, CaptionButton, FullscreenButton, GoogleCastButton, LiveButton, MuteButton, PIPButton, PlayButton, SeekButton, ToggleButton, ToggleButtonProps, Tooltip, TooltipTrigger, TooltipContent, AudioRadioGroup, CaptionsRadioGroup, Menu, MenuButton, MenuPortalProps, MenuPortal, MenuItem, MenuItems, ChaptersRadioGroup, SpeedRadioGroup, AudioGainRadioGroup, QualityRadioGroup, Radio, RadioGroup, Slider, SliderValueProps, SliderValue, SliderVideo, TimeSlider, SliderPreview, VolumeSlider, AudioGainSlider, SpeedSlider, QualitySlider, SliderChapters } from './types/vidstack-IH_rCrf6.js';
import * as lit_html from 'lit-html';
import 'media-captions';
import 'dashjs';
import 'hls.js';

declare const MediaCaptionsElement_base: MaverickElementConstructor<HTMLElement, Captions>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/captions}
 * @example
 * ```html
 * <media-captions></media-captions>
 * ```
 */
declare class MediaCaptionsElement extends MediaCaptionsElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-captions': MediaCaptionsElement;
    }
}

declare const MediaGestureElement_base: MaverickElementConstructor<HTMLElement, Gesture>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/gesture}
 * @example
 * ```html
 * <media-player>
 *   <media-provider>
 *     <media-gesture event="pointerup" action="toggle:paused"></media-gesture>
 *   </media-provider>
 * </media-player>
 * ```
 */
declare class MediaGestureElement extends MediaGestureElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-gesture': MediaGestureElement;
    }
}

declare const MediaProviderElement_base: MaverickElementConstructor<HTMLElement, MediaProvider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/core/provider}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <!-- ... -->
 * </media-player>
 * ```
 */
declare class MediaProviderElement extends MediaProviderElement_base {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onDestroy(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-provider': MediaProviderElement;
    }
}

declare const MediaPlayerElement_base: MaverickElementConstructor<HTMLElement, MediaPlayer>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/core/player}
 * @example
 * ```html
 * <media-player src="...">
 *   <media-provider></media-provider>
 *   <!-- Other components that use/manage media state here. -->
 * </media-player>
 * ```
 */
declare class MediaPlayerElement extends MediaPlayerElement_base {
    static tagName: string;
    static attrs: Attributes<MediaPlayerProps>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-player': MediaPlayerElement;
    }
}

declare const MediaAnnouncerElement_base: MaverickElementConstructor<HTMLElement, MediaAnnouncer>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/announcer}
 * @example
 * ```html
 * <media-announcer></media-announcer>
 * ```
 */
declare class MediaAnnouncerElement extends MediaAnnouncerElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-announcer': MediaAnnouncerElement;
    }
}

declare const MediaPosterElement_base: MaverickElementConstructor<HTMLElement, Poster>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/poster}
 * @example
 * ```html
 * <media-player>
 *   <media-poster src="..." alt="Large alien ship hovering over New York."></media-poster>
 * </media-player>
 * ```
 */
declare class MediaPosterElement extends MediaPosterElement_base {
    #private;
    static tagName: string;
    static attrs: Attributes<PosterProps>;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-poster': MediaPosterElement;
    }
}

declare const MediaThumbnailElement_base: MaverickElementConstructor<HTMLElement, Thumbnail>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/thumbnail}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-thumbnail
 *     src="https://files.vidstack.io/thumbnails.vtt"
 *     time="10"
 *   ></media-thumbnail>
 * </media-player>
 * ```
 */
declare class MediaThumbnailElement extends MediaThumbnailElement_base {
    #private;
    static tagName: string;
    static attrs: Attributes<ThumbnailProps>;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-thumbnail': MediaThumbnailElement;
    }
}

declare const MediaTimeElement_base: MaverickElementConstructor<HTMLElement, Time>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/time}
 * @example
 * ```html
 * <media-time type="current"></media-time>
 * ```
 * @example
 * ```html
 * <!-- Remaining time. -->
 * <media-time type="current" remainder></media-time>
 * ```
 */
declare class MediaTimeElement extends MediaTimeElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-time': MediaTimeElement;
    }
}

declare const MediaControlsElement_base: MaverickElementConstructor<HTMLElement, Controls>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/controls}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-controls>
 *     <media-controls-group></media-controls-group>
 *     <media-controls-group></media-controls-group>
 *   </media-controls>
 * </media-player>
 * ```
 */
declare class MediaControlsElement extends MediaControlsElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-controls': MediaControlsElement;
    }
}

declare const MediaControlsGroupElement_base: MaverickElementConstructor<HTMLElement, ControlsGroup>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/controls}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-controls>
 *     <media-controls-group></media-controls-group>
 *     <media-controls-group></media-controls-group>
 *   </media-controls>
 * </media-player>
 * ```
 */
declare class MediaControlsGroupElement extends MediaControlsGroupElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-controls-group': MediaControlsGroupElement;
    }
}

declare class Title extends Component {
}
declare const MediaTitleElement_base: MaverickElementConstructor<HTMLElement, Title>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/title}
 * @example
 * ```html
 * <media-title></media-title>
 * ```
 */
declare class MediaTitleElement extends MediaTitleElement_base {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-title': MediaTitleElement;
    }
}

interface ChapterTitleProps {
    /**
     * Specify text to be displayed when no chapter title is available.
     */
    defaultText: string;
}
declare class ChapterTitle extends Component<ChapterTitleProps> {
    static props: ChapterTitleProps;
}
declare const MediaChapterTitleElement_base: MaverickElementConstructor<HTMLElement, ChapterTitle>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/chapter-title}
 * @example
 * ```html
 * <media-chapter-title></media-chapter-title>
 * ```
 */
declare class MediaChapterTitleElement extends MediaChapterTitleElement_base {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-chapter-title': MediaChapterTitleElement;
    }
}

declare class LitElement extends HTMLElement {
    rootPart: any;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
interface LitRenderer {
    render(): any;
}

interface SpinnerProps {
    /**
     * The horizontal (width) and vertical (height) length of the spinner.
     */
    size: number;
    /**
     * The width of the spinner track and track fill.
     */
    trackWidth: number;
    /**
     * The percentage of the spinner track that should be filled.
     */
    fillPercent: number;
}
declare class Spinner extends Component<SpinnerProps> {
    #private;
    static props: SpinnerProps;
    protected onConnect(el: HTMLElement): void;
}
declare const MediaSpinnerElement_base: MaverickElementConstructor<LitElement, Spinner>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/buffering-indicator}
 * @example
 * ```html
 * <!-- default values below -->
 * <media-spinner size="84" track-width="8" fill-percent="50"></media-spinner>
 * ```
 * @example
 * ```css
 * media-spinner [data-part="track"] {
 *   color: rgb(255 255 255 / 0.5);
 * }
 *
 * media-spinner [data-part="track-fill"] {
 *   color: white;
 * }
 * ```
 */
declare class MediaSpinnerElement extends MediaSpinnerElement_base {
    static tagName: string;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-spinner': MediaSpinnerElement;
    }
}

declare class MediaLayout extends Component<MediaLayoutProps> {
    static props: MediaLayoutProps;
}
interface MediaLayoutProps {
    when: boolean | MediaPlayerQuery;
}
declare const MediaLayoutElement_base: MaverickElementConstructor<HTMLElement, MediaLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/layouts#custom}
 * @example
 * ```html
 * <media-layout class="video-layout">
 *   <template>
 *     <!-- ... -->
 *   </template>
 * </media-layout>
 *
 * <script>
 *   const layout = document.querySelector(".video-layout");
 *   // All player state is available.
 *   layout.when = ({ viewType }) => viewType === 'video';
 * </script>
 * ```
 */
declare class MediaLayoutElement extends MediaLayoutElement_base {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-layout': MediaLayoutElement;
    }
}

declare class DefaultLayout extends Component<DefaultLayoutProps> {
    #private;
    static props: DefaultLayoutProps;
    get isMatch(): boolean;
    get isSmallLayout(): boolean;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

/**
 * The audio layout is our production-ready UI that's displayed when the media view type is set to
 * 'audio'. It includes support for audio tracks, slider chapters, captions, live streams, and much
 * more out of the box.
 *
 * @attr data-match - Whether this layout is being used (query match).
 * @attr data-sm - The small layout is active
 * @attr data-lg - The large layout is active.
 * @attr data-size - The active layout size (sm or lg).
 */
declare class DefaultAudioLayout extends DefaultLayout {
    static props: DefaultLayoutProps;
}

declare const MediaAudioLayoutElement_base: MaverickElementConstructor<LitElement, DefaultAudioLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/layouts/default-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-audio-layout></media-audio-layout>
 * </media-player>
 * ```
 */
declare class MediaAudioLayoutElement extends MediaAudioLayoutElement_base implements LitRenderer {
    #private;
    static tagName: string;
    static attrs: Attributes<DefaultLayoutProps>;
    protected onSetup(): void;
    protected onConnect(): void;
    render(): any;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-layout': MediaAudioLayoutElement;
    }
}

/**
 * The video layout is our production-ready UI that's displayed when the media view type is set to
 * 'video'. It includes support for picture-in-picture, fullscreen, slider chapters, slider
 * previews, captions, audio/quality settings, live streams, and much more out of the box.
 *
 * @attr data-match - Whether this layout is being used (query match).
 * @attr data-sm - The small layout is active
 * @attr data-lg - The large layout is active.
 * @attr data-size - The active layout size.
 */
declare class DefaultVideoLayout extends DefaultLayout {
    static props: DefaultLayoutProps;
}

declare const MediaVideoLayoutElement_base: MaverickElementConstructor<LitElement, DefaultVideoLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/layouts/default-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-video-layout></media-video-layout>
 * </media-player>
 * ```
 */
declare class MediaVideoLayoutElement extends MediaVideoLayoutElement_base implements LitRenderer {
    #private;
    static tagName: string;
    static attrs: Attributes<DefaultLayoutProps>;
    protected onSetup(): void;
    protected onConnect(): void;
    render(): any;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-video-layout': MediaVideoLayoutElement;
    }
}

declare const MediaPlyrLayoutElement_base: MaverickElementConstructor<LitElement, PlyrLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/layouts/plyr-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-plyr-layout></media-plyr-layout>
 * </media-player>
 * ```
 */
declare class MediaPlyrLayoutElement extends MediaPlyrLayoutElement_base implements LitRenderer {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onConnect(): void;
    render(): any;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-plyr-layout': MediaPlyrLayoutElement;
    }
}

declare const MediaAirPlayButtonElement_base: MaverickElementConstructor<HTMLElement, AirPlayButton>;
/**
 * @example
 * ```html
 * <media-airplay-button>
 *   <media-icon type="airplay"></media-icon>
 * </media-airplay-button>
 * ```
 */
declare class MediaAirPlayButtonElement extends MediaAirPlayButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-airplay-button': MediaAirPlayButtonElement;
    }
}

declare const MediaCaptionButtonElement_base: MaverickElementConstructor<HTMLElement, CaptionButton>;
/**
 * @example
 * ```html
 * <media-caption-button>
 *   <media-icon type="closed-captions-on"></media-icon>
 *   <media-icon type="closed-captions"></media-icon>
 * </media-caption-button>
 * ```
 */
declare class MediaCaptionButtonElement extends MediaCaptionButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-caption-button': MediaCaptionButtonElement;
    }
}

declare const MediaFullscreenButtonElement_base: MaverickElementConstructor<HTMLElement, FullscreenButton>;
/**
 * @example
 * ```html
 * <media-fullscreen-button>
 *   <media-icon type="fullscreen"></media-icon>
 *   <media-icon type="fullscreen-exit"></media-icon>
 * </media-fullscreen-button>
 * ```
 */
declare class MediaFullscreenButtonElement extends MediaFullscreenButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-fullscreen-button': MediaFullscreenButtonElement;
    }
}

declare const MediaGoogleCastButtonElement_base: MaverickElementConstructor<HTMLElement, GoogleCastButton>;
/**
 * @example
 * ```html
 * <media-google-cast-button>
 *   <media-icon type="chromecast"></media-icon>
 * </media-google-cast-button>
 * ```
 */
declare class MediaGoogleCastButtonElement extends MediaGoogleCastButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-google-cast-button': MediaGoogleCastButtonElement;
    }
}

declare const MediaLiveButtonElement_base: MaverickElementConstructor<HTMLElement, LiveButton>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/buttons/live-button}
 * @example
 * ```html
 * <media-live-button>
 *   <!-- ... -->
 * </media-live-button>
 * ```
 */
declare class MediaLiveButtonElement extends MediaLiveButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-live-button': MediaLiveButtonElement;
    }
}

declare const MediaMuteButtonElement_base: MaverickElementConstructor<HTMLElement, MuteButton>;
/**
 * @example
 * ```html
 * <media-mute-button>
 *   <media-icon type="mute"></media-icon>
 *   <media-icon type="volume-low"></media-icon>
 *   <media-icon type="volume-high"></media-icon>
 * </media-mute-button>
 * ```
 */
declare class MediaMuteButtonElement extends MediaMuteButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-mute-button': MediaMuteButtonElement;
    }
}

declare const MediaPIPButtonElement_base: MaverickElementConstructor<HTMLElement, PIPButton>;
/**
 * @example
 * ```html
 * <media-pip-button>
 *   <media-icon type="picture-in-picture"></media-icon>
 *   <media-icon type="picture-in-picture-exit"></media-icon>
 * </media-pip-button>
 * ```
 */
declare class MediaPIPButtonElement extends MediaPIPButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-pip-button': MediaPIPButtonElement;
    }
}

declare const MediaPlayButtonElement_base: MaverickElementConstructor<HTMLElement, PlayButton>;
/**
 * @example
 * ```html
 * <media-play-button>
 *   <media-icon type="play"></media-icon>
 *   <media-icon type="pause"></media-icon>
 *   <media-icon type="replay"></media-icon>
 * </media-play-button>
 * ```
 */
declare class MediaPlayButtonElement extends MediaPlayButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-play-button': MediaPlayButtonElement;
    }
}

declare const MediaSeekButtonElement_base: MaverickElementConstructor<HTMLElement, SeekButton>;
/**
 * @example
 * ```html
 * <!-- Forward +30s on each press. -->
 * <media-seek-button seconds="+30">
 *   <media-icon type="seek-forward"></media-icon>
 * </media-seek-button>
 * <!-- Backward -30s on each press. -->
 * <media-seek-button seconds="-30">
 *   <media-icon type="seek-backward"></media-icon>
 * </media-seek-button>
 * ```
 */
declare class MediaSeekButtonElement extends MediaSeekButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-seek-button': MediaSeekButtonElement;
    }
}

declare const MediaToggleButtonElement_base: MaverickElementConstructor<HTMLElement, ToggleButton<ToggleButtonProps>>;
/**
 * @example
 * ```html
 * <media-toggle-button aria-label="...">
 *   <!-- ... -->
 * </media-toggle-button>
 * ```
 */
declare class MediaToggleButtonElement extends MediaToggleButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-toggle-button': MediaToggleButtonElement;
    }
}

declare const MediaTooltipElement_base: MaverickElementConstructor<HTMLElement, Tooltip>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/tooltip}
 * @example
 * ```html
 * <media-tooltip>
 *   <media-tooltip-trigger>
 *     <media-play-button></media-play-button>
 *   </media-tooltip-trigger>
 *   <media-tooltip-content placement="top start">
 *      <span class="play-tooltip-text">Play</span>
 *      <span class="pause-tooltip-text">Pause</span>
 *   </media-tooltip-content>
 * </media-tooltip>
 * ```
 */
declare class MediaTooltipElement extends MediaTooltipElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-tooltip': MediaTooltipElement;
    }
}

declare const MediaTooltipTriggerElement_base: MaverickElementConstructor<HTMLElement, TooltipTrigger>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/tooltip}
 * @example
 * ```html
 * <media-tooltip>
 *   <media-tooltip-trigger>
 *     <media-play-button></media-play-button>
 *   </media-tooltip-trigger>
 *   <media-tooltip-content placement="top start">
 *      <span class="play-tooltip-text">Play</span>
 *      <span class="pause-tooltip-text">Pause</span>
 *   </media-tooltip-content>
 * </media-tooltip>
 * ```
 */
declare class MediaTooltipTriggerElement extends MediaTooltipTriggerElement_base {
    static tagName: string;
    onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-tooltip-trigger': MediaTooltipTriggerElement;
    }
}

declare const MediaTooltipContentElement_base: MaverickElementConstructor<HTMLElement, TooltipContent>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/tooltip}
 * @example
 * ```html
 * <media-tooltip>
 *   <media-tooltip-trigger>
 *     <media-play-button></media-play-button>
 *   </media-tooltip-trigger>
 *   <media-tooltip-content placement="top">
 *      <span class="play-tooltip-text">Play</span>
 *      <span class="pause-tooltip-text">Pause</span>
 *   </media-tooltip-content>
 * </media-tooltip>
 * ```
 */
declare class MediaTooltipContentElement extends MediaTooltipContentElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-tooltip-content': MediaTooltipContentElement;
    }
}

declare const MediaAudioRadioGroupElement_base: MaverickElementConstructor<HTMLElement, AudioRadioGroup>;
/**
 * @part label - Contains the audio track option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-audio-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-audio-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaAudioRadioGroupElement extends MediaAudioRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-radio-group': MediaAudioRadioGroupElement;
    }
}

declare const MediaCaptionsRadioGroupElement_base: MaverickElementConstructor<HTMLElement, CaptionsRadioGroup>;
/**
 * @part label - Contains the caption/subtitle option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/captions-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-captions-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-captions-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaCaptionsRadioGroupElement extends MediaCaptionsRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-captions-radio-group': MediaCaptionsRadioGroupElement;
    }
}

declare const MediaMenuElement_base: MaverickElementConstructor<HTMLElement, Menu>;
/**
 * @part close-target - Closes menu when pressed.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Settings">
 *     <media-icon type="settings"></media-icon>
 *   </media-menu-button>
 *   <media-menu-items>
 *     <!-- ... -->
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaMenuElement extends MediaMenuElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu': MediaMenuElement;
    }
}

declare const MediaMenuButtonElement_base: MaverickElementConstructor<HTMLElement, MenuButton>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Settings">
 *     <media-icon type="settings"></media-icon>
 *   </media-menu-button>
 *   <media-menu-items>
 *     <!-- ... -->
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaMenuButtonElement extends MediaMenuButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-button': MediaMenuButtonElement;
    }
}

declare const MediaMenuPortalElement_base: MaverickElementConstructor<HTMLElement, MenuPortal>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu#portal}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-portal>
 *     <media-menu-items></media-menu-items>
 *   </media-menu-portal>
 * </media-menu>
 * ```
 */
declare class MediaMenuPortalElement extends MediaMenuPortalElement_base {
    static tagName: string;
    static attrs: Attributes<MenuPortalProps>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-portal': MediaMenuPortalElement;
    }
}

declare const MediaMenuItemElement_base: MaverickElementConstructor<HTMLElement, MenuItem>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-items>
 *      <media-menu-item></media-menu-item>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaMenuItemElement extends MediaMenuItemElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-item': MediaMenuItemElement;
    }
}

declare const MediaMenuItemsElement_base: MaverickElementConstructor<HTMLElement, MenuItems>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Settings">
 *     <media-icon type="settings"></media-icon>
 *   </media-menu-button>
 *   <media-menu-items>
 *     <!-- ... -->
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaMenuItemsElement extends MediaMenuItemsElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-items': MediaMenuItemsElement;
    }
}

declare const MediaChaptersRadioGroupElement_base: MaverickElementConstructor<HTMLElement, ChaptersRadioGroup>;
/**
 * @part label - Contains the chapter option title.
 * @part start-time - Contains the chapter option start time.
 * @part duration - Contains the chapter option duration.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/chapters-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Chapters">
 *     <media-icon type="chapters"></media-icon>
 *   </media-menu-button>
 *   <media-chapters-radio-group thumbnails="...">
 *     <template>
 *       <media-radio>
 *         <media-thumbnail></media-thumbnail>
 *         <span data-part="label"></span>
 *         <span data-part="start-time"></span>
 *         <span data-part="duration"></span>
 *       </media-radio>
 *     </template>
 *    </media-chapters-radio-group>
 * </media-menu>
 * ```
 */
declare class MediaChaptersRadioGroupElement extends MediaChaptersRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-chapters-radio-group': MediaChaptersRadioGroupElement;
    }
}

declare const MediaSpeedRadioGroupElement_base: MaverickElementConstructor<HTMLElement, SpeedRadioGroup>;
/**
 * @part label - Contains the speed option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/speed-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-speed-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-speed-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaSpeedRadioGroupElement extends MediaSpeedRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-speed-radio-group': MediaSpeedRadioGroupElement;
    }
}

declare const MediaAudioGainRadioGroupElement_base: MaverickElementConstructor<HTMLElement, AudioGainRadioGroup>;
/**
 * @part label - Contains the audio gain option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-gain-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-audio-gain-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-audio-gain-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaAudioGainRadioGroupElement extends MediaAudioGainRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-gain-radio-group': MediaAudioGainRadioGroupElement;
    }
}

declare const MediaQualityRadioGroupElement_base: MaverickElementConstructor<HTMLElement, QualityRadioGroup>;
/**
 * @part label - Contains the quality option label.
 * @part bitrate - Contains the quality option bitrate.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/quality-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-quality-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *           <span data-part="bitrate"></span>
 *         </media-radio>
 *       </template>
 *     </media-quality-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
declare class MediaQualityRadioGroupElement extends MediaQualityRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-quality-radio-group': MediaQualityRadioGroupElement;
    }
}

declare const MediaRadioElement_base: MaverickElementConstructor<HTMLElement, Radio>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/radio}
 * @example
 * ```html
 * <media-radio-group value="720">
 *   <media-radio value="1080">1080p</media-radio>
 *   <media-radio value="720">720p</media-radio>
 *   <!-- ... -->
 * </media-radio-group>
 * ```
 */
declare class MediaRadioElement extends MediaRadioElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-radio': MediaRadioElement;
    }
}

declare const MediaRadioGroupElement_base: MaverickElementConstructor<HTMLElement, RadioGroup>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/radio-group}
 * @example
 * ```html
 * <media-radio-group value="720">
 *   <media-radio value="1080">1080p</media-radio>
 *   <media-radio value="720">720p</media-radio>
 *   <!-- ... -->
 * </media-radio-group>
 * ```
 */
declare class MediaRadioGroupElement extends MediaRadioGroupElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-radio-group': MediaRadioGroupElement;
    }
}

declare const MediaSliderElement_base: MaverickElementConstructor<HTMLElement, Slider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider}
 * @example
 * ```html
 * <media-slider min="0" max="100" value="50" aria-label="...">
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-slider>
 * ```
 */
declare class MediaSliderElement extends MediaSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider': MediaSliderElement;
    }
}

/**
 * @example
 * ```html
 * <media-player >
 *   <media-time-slider>
 *     <media-slider-preview>
 *       <media-slider-thumbnail
 *         src="https://files.vidstack.io/thumbnails.vtt"
 *       ></media-slider-thumbnail>
 *     </media-slider-preview>
 *   </media-time-slider>
 * </media-player>
 * ```
 */
declare class MediaSliderThumbnailElement extends MediaThumbnailElement {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-thumbnail': MediaSliderThumbnailElement;
    }
}

declare const MediaSliderValueElement_base: MaverickElementConstructor<HTMLElement, SliderValue>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-value}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-time-slider>
 * ```
 * @example
 * ```html
 * <media-slider-value type="current"></media-slider-value>
 * ```
 * @example
 * ```html
 * <media-slider-value show-hours pad-hours></media-slider-value>
 * ```
 * @example
 * ```html
 * <media-slider-value decimal-places="2"></media-slider-value>
 * ```
 */
declare class MediaSliderValueElement extends MediaSliderValueElement_base {
    static tagName: string;
    static attrs: Attributes<SliderValueProps>;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-value': MediaSliderValueElement;
    }
}

declare const MediaSliderVideoElement_base: MaverickElementConstructor<HTMLElement, SliderVideo>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-video}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-preview>
 *     <media-slider-video src="/low-res-video.mp4"></media-slider-video>
 *   </media-slider-preview>
 * </media-time-slider>
 * ```
 */
declare class MediaSliderVideoElement extends MediaSliderVideoElement_base {
    #private;
    static tagName: string;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-video': MediaSliderVideoElement;
    }
}

declare const MediaTimeSliderElement_base: MaverickElementConstructor<HTMLElement, TimeSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/time-slider}
 * @example
 * ```html
 * <media-time-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-time-slider>
 * ```
 * @example
 * ```html
 * <media-time-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   <media-slider-preview>
 * </media-time-slider>
 * ```
 */
declare class MediaTimeSliderElement extends MediaTimeSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-time-slider': MediaTimeSliderElement;
    }
}

declare const MediaSliderPreviewElement_base: MaverickElementConstructor<HTMLElement, SliderPreview>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider#preview}
 */
declare class MediaSliderPreviewElement extends MediaSliderPreviewElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-preview': MediaSliderPreviewElement;
    }
}

declare const MediaVolumeSliderElement_base: MaverickElementConstructor<HTMLElement, VolumeSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/volume-slider}
 * @example
 * ```html
 * <media-volume-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-volume-slider>
 * ```
 * @example
 * ```html
 * <media-volume-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-volume-slider>
 * ```
 */
declare class MediaVolumeSliderElement extends MediaVolumeSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-volume-slider': MediaVolumeSliderElement;
    }
}

declare const MediaAudioGainSliderElement_base: MaverickElementConstructor<HTMLElement, AudioGainSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/audio-gain-slider}
 * @example
 * ```html
 * <media-audio-gain-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-audio-gain-slider>
 * ```
 * @example
 * ```html
 * <media-audio-gain-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-audio-gain-slider>
 * ```
 */
declare class MediaAudioGainSliderElement extends MediaAudioGainSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-gain-slider': MediaAudioGainSliderElement;
    }
}

declare const MediaSpeedSliderElement_base: MaverickElementConstructor<HTMLElement, SpeedSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/speed-slider}
 * @example
 * ```html
 * <media-speed-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-speed-slider>
 * ```
 * @example
 * ```html
 * <media-speed-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-speed-slider>
 * ```
 */
declare class MediaSpeedSliderElement extends MediaSpeedSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-speed-slider': MediaSpeedSliderElement;
    }
}

declare const MediaQualitySliderElement_base: MaverickElementConstructor<HTMLElement, QualitySlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/quality-slider}
 * @example
 * ```html
 * <media-quality-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-quality-slider>
 * ```
 * @example
 * ```html
 * <media-quality-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-quality-slider>
 * ```
 */
declare class MediaQualitySliderElement extends MediaQualitySliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-quality-slider': MediaQualitySliderElement;
    }
}

declare const MediaSliderChaptersElement_base: MaverickElementConstructor<HTMLElement, SliderChapters>;
/**
 * @part chapter-title - Contains the current chapter title.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-chapters}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-chapters>
 *     <template>
 *       <div class="slider-chapter">
 *         <div class="slider-track"></div>
 *         <div class="slider-track-fill"></div>
 *         <div class="slider-track-progress"></div>
 *       </div>
 *     </template>
 *   </media-slider-chapters>
 * </media-time-slider>
 * ```
 */
declare class MediaSliderChaptersElement extends MediaSliderChaptersElement_base {
    #private;
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-chapters': MediaSliderChaptersElement;
    }
}

declare class SliderSteps extends Component {
}
declare const MediaSliderStepsElement_base: MaverickElementConstructor<HTMLElement, SliderSteps>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-steps}
 * @example
 * ```html
 * <media-slider>
 *   <media-slider-steps>
 *     <template>
 *       <div class="slider-step"></div>
 *     </template>
 *   </media-slider-steps>
 * </media-slider>
 * ```
 */
declare class MediaSliderStepsElement extends MediaSliderStepsElement_base {
    #private;
    static tagName: string;
    onConnect(el: HTMLElement): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-steps': MediaSliderStepsElement;
    }
}

export { MediaAirPlayButtonElement, MediaAnnouncerElement, MediaAudioGainRadioGroupElement, MediaAudioGainSliderElement, MediaAudioLayoutElement, MediaAudioRadioGroupElement, MediaCaptionButtonElement, MediaCaptionsElement, MediaCaptionsRadioGroupElement, MediaChapterTitleElement, MediaChaptersRadioGroupElement, MediaControlsElement, MediaControlsGroupElement, MediaFullscreenButtonElement, MediaGestureElement, MediaGoogleCastButtonElement, MediaLayoutElement, MediaLiveButtonElement, MediaMenuButtonElement, MediaMenuElement, MediaMenuItemElement, MediaMenuItemsElement, MediaMenuPortalElement, MediaMuteButtonElement, MediaPIPButtonElement, MediaPlayButtonElement, MediaPlayerElement, MediaPlyrLayoutElement, MediaPosterElement, MediaProviderElement, MediaQualityRadioGroupElement, MediaQualitySliderElement, MediaRadioElement, MediaRadioGroupElement, MediaSeekButtonElement, MediaSliderChaptersElement, MediaSliderElement, MediaSliderPreviewElement, MediaSliderStepsElement, MediaSliderThumbnailElement, MediaSliderValueElement, MediaSliderVideoElement, MediaSpeedRadioGroupElement, MediaSpeedSliderElement, MediaSpinnerElement, MediaThumbnailElement, MediaTimeElement, MediaTimeSliderElement, MediaTitleElement, MediaToggleButtonElement, MediaTooltipContentElement, MediaTooltipElement, MediaTooltipTriggerElement, MediaVideoLayoutElement, MediaVolumeSliderElement };
