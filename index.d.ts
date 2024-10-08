/// <reference path="./dom.d.ts" />
/// <reference path="./google-cast.d.ts" />

import { TextRenderer, TextTrack, TextTrackList, VideoQuality, MediaKeyShortcuts, AudioProvider, VideoProvider, HLSProvider, DASHProvider, YouTubeProvider, VimeoProvider, GoogleCastProvider, MediaProviderLoader, Src, MediaType, MediaContext, Thumbnail, SliderOrientation } from './types/vidstack-IH_rCrf6.js';
export { AirPlayButton, AirPlayButtonEvents, AirPlayButtonProps, AnyMediaProvider, AudioGainRadioGroup, AudioGainRadioGroupChangeEvent, AudioGainRadioGroupEvents, AudioGainRadioGroupProps, AudioGainSlider, AudioGainSliderCSSVars, AudioGainSliderEvents, AudioGainSliderProps, AudioGainSliderState, AudioMimeType, AudioRadioGroup, AudioRadioGroupChangeEvent, AudioRadioGroupEvents, AudioRadioGroupProps, AudioRadioOption, AudioSrc, AudioSrcMeta, AudioTrack, AudioTrackAddEvent, AudioTrackChangeEvent, AudioTrackList, AudioTrackListEvent, AudioTrackListEvents, AudioTrackRemoveEvent, CaptionButton, CaptionButtonEvents, CaptionButtonProps, Captions, CaptionsProps, CaptionsRadioGroup, CaptionsRadioGroupChangeEvent, CaptionsRadioGroupEvents, CaptionsRadioGroupProps, CaptionsRadioOption, ChangeAudioTrackEventDetail, ChapterRadioGroupProps, ChaptersRadioGroup, ChaptersRadioGroupChangeEvent, ChaptersRadioGroupEvents, ChaptersRadioOption, Controls, ControlsChangeEvent, ControlsEvents, ControlsGroup, ControlsProps, DASHAdaptationSetRemovedNoCapabilitiesEvent, DASHAllTextTracksAddedEvent, DASHAstInFutureEvent, DASHBaseUrlsUpdatedEvent, DASHBufferLevelUpdatedEvent, DASHBufferLoadedEvent, DASHBufferStalledEvent, DASHBufferStateChangedEvent, DASHCanPlayEvent, DASHCanPlayThroughEvent, DASHCaptionContainerResizeEvent, DASHCaptionRenderedEvent, DASHConformanceViolationEvent, DASHConstructor, DASHConstructorLoader, DASHContentSteeringRequestCompletedEvent, DASHCueEnterEvent, DASHCueExitEvent, DASHDvbFontDownloadAddedEvent, DASHDvbFontDownloadCompleteEvent, DASHDvbFontDownloadFailedEvent, DASHDynamicToStaticEvent, DASHErrorEvent, DASHEventModeOnReceiveEvent, DASHEventModeOnStartEvent, DASHFragmentLoadingAbandonedEvent, DASHFragmentLoadingCompletedEvent, DASHFragmentLoadingProgressEvent, DASHFragmentLoadingStartedEvent, DASHInbandPrftEvent, DASHInstanceCallback, DASHInstanceEvent, DASHLibLoadErrorEvent, DASHLibLoadStartEvent, DASHLibLoadedEvent, DASHLibrary, DASHLogEvent, DASHManagedMediaSourceEndStreamingEvent, DASHManagedMediaSourceStartStreamingEvent, DASHManifestLoadedEvent, DASHManifestLoadingFinishedEvent, DASHManifestLoadingStartedEvent, DASHManifestValidityChangedEvent, DASHMediaEvent, DASHMetricAddedEvent, DASHMetricChangedEvent, DASHMetricUpdatedEvent, DASHMetricsChangedEvent, DASHMimeType, DASHNamespace, DASHNamespaceLoader, DASHPeriodSwitchCompletedEvent, DASHPeriodSwitchStartedEvent, DASHPlaybackEndedEvent, DASHPlaybackErrorEvent, DASHPlaybackLoadedDataEvent, DASHPlaybackMetaDataLoadedEvent, DASHPlaybackNotAllowedEvent, DASHPlaybackPausedEvent, DASHPlaybackPlayingEvent, DASHPlaybackProgressEvent, DASHPlaybackRateChangedEvent, DASHPlaybackSeekedEvent, DASHPlaybackSeekingEvent, DASHPlaybackStalledEvent, DASHPlaybackStartedEvent, DASHPlaybackTimeUpdatedEvent, DASHPlaybackVolumeChangedEvent, DASHPlaybackWaitingEvent, DASHProviderEvents, DASHQualityChangeRenderedEvent, DASHQualityChangeRequestedEvent, DASHRepresentationSwitchEvent, DASHSrc, DASHStreamActivatedEvent, DASHStreamDeactivatedEvent, DASHStreamInitializedEvent, DASHStreamInitializingEvent, DASHStreamTeardownCompleteEvent, DASHStreamUpdatedEvent, DASHTextTrackAddedEvent, DASHThroughputMeasurementStoredEvent, DASHTrackChangeRenderedEvent, DASHTtmlParsedEvent, DASHTtmlToParseEvent, DASHUnsupportedEvent, DEFAULT_AUDIO_GAINS, DEFAULT_PLAYBACK_RATES, DefaultLayoutProps, DefaultLayoutTranslations, DefaultLayoutWord, FileDownloadInfo, FindMediaPlayerEvent, FindMediaPlayerEventDetail, FullscreenAdapter, FullscreenButton, FullscreenButtonEvents, FullscreenButtonProps, FullscreenChangeEvent, FullscreenController, FullscreenErrorEvent, FullscreenEvents, Gesture, GestureAction, GestureEvent, GestureEventType, GestureEvents, GestureProps, GestureTriggerEvent, GestureWillTriggerEvent, GoogleCastButton, GoogleCastButtonEvents, GoogleCastButtonProps, GoogleCastEvent, GoogleCastEvents, GoogleCastLoadStartEvent, GoogleCastLoadedEvent, GoogleCastPromptError, GoogleCastPromptErrorCode, GoogleCastPromptErrorEvent, GoogleCastPromptEvent, HLSAudioTrackLoadedEvent, HLSAudioTrackLoadingEvent, HLSAudioTrackSwitchedEvent, HLSAudioTrackSwitchingEvent, HLSAudioTracksUpdatedEvent, HLSBackBufferReachedEvent, HLSBufferAppendedEvent, HLSBufferAppendingEvent, HLSBufferCodecsEvent, HLSBufferCreatedEvent, HLSBufferEosEvent, HLSBufferFlushedEvent, HLSBufferFlushingEvent, HLSBufferResetEvent, HLSConstructor, HLSConstructorLoader, HLSCuesParsedEvent, HLSDestroyingEvent, HLSErrorEvent, HLSFpsDropEvent, HLSFpsDropLevelCappingEvent, HLSFragBufferedDataEvent, HLSFragChangedEvent, HLSFragDecryptedEvent, HLSFragLoadEmergencyAbortedEvent, HLSFragLoadedEvent, HLSFragLoadingEvent, HLSFragParsedEvent, HLSFragParsingInitSegmentEvent, HLSFragParsingMetadataEvent, HLSFragParsingUserdataEvent, HLSInitPtsFoundEvent, HLSInstanceCallback, HLSInstanceEvent, HLSKeyLoadedEvent, HLSKeyLoadingEvent, HLSLevelLoadedEvent, HLSLevelLoadingEvent, HLSLevelPtsUpdatedEvent, HLSLevelSwitchedEvent, HLSLevelSwitchingEvent, HLSLevelUpdatedEvent, HLSLevelsUpdatedEvent, HLSLibLoadErrorEvent, HLSLibLoadStartEvent, HLSLibLoadedEvent, HLSLibrary, HLSManifestLoadedEvent, HLSManifestLoadingEvent, HLSManifestParsedEvent, HLSMediaAttachedEvent, HLSMediaAttachingEvent, HLSMediaDetachedEvent, HLSMediaDetachingEvent, HLSMediaEvent, HLSMimeType, HLSNonNativeTextTracksFoundEvent, HLSProviderEvents, HLSSrc, HLSSubtitleFragProcessedEvent, HLSSubtitleTrackLoadedEvent, HLSSubtitleTrackLoadingEvent, HLSSubtitleTrackSwitchEvent, HLSSubtitleTracksClearedEvent, HLSSubtitleTracksUpdatedEvent, HLSUnsupportedEvent, HTMLMediaSrc, List, ListAddEvent, ListEvents, ListItem, ListReadonlyChangeEvent, ListRemoveEvent, LiveButton, LiveButtonEvents, LiveButtonProps, LocalMediaStorage, LogEvent, LogEventDetail, Logger, LoggerEvents, MediaAbortEvent, MediaAirPlayRequestEvent, MediaAnnouncer, MediaAnnouncerEvents, MediaAnnouncerProps, MediaAnnouncerState, MediaAnnouncerTranslations, MediaAnnouncerWord, MediaAudioGainChangeEvent, MediaAudioGainChangeRequestEvent, MediaAudioTrackChangeEvent, MediaAudioTrackChangeRequestEvent, MediaAudioTracksChangeEvent, MediaAutoPlayChangeEvent, MediaAutoPlayEvent, MediaAutoPlayEventDetail, MediaAutoPlayFailEvent, MediaAutoPlayFailEventDetail, MediaCanLoadEvent, MediaCanLoadPosterEvent, MediaCanPlayDetail, MediaCanPlayEvent, MediaCanPlayThroughEvent, MediaClipEndChangeRequestEvent, MediaClipStartChangeRequestEvent, MediaControls, MediaControlsChangeEvent, MediaCrossOrigin, MediaDestroyEvent, MediaDurationChangeEvent, MediaDurationChangeRequestEvent, MediaEmptiedEvent, MediaEndEvent, MediaEndedEvent, MediaEnterFullscreenRequestEvent, MediaEnterPIPRequestEvent, MediaErrorCode, MediaErrorDetail, MediaErrorEvent, MediaEvent, MediaEvents, MediaExitFullscreenRequestEvent, MediaExitPIPRequestEvent, MediaFullscreenAdapter, MediaFullscreenChangeEvent, MediaFullscreenErrorEvent, MediaFullscreenRequestTarget, MediaGoogleCastRequestEvent, MediaHidePosterRequestEvent, MediaKeyShortcut, MediaKeyTarget, MediaKeysCallback, MediaLiveChangeEvent, MediaLiveEdgeChangeEvent, MediaLiveEdgeRequestEvent, MediaLoadStartEvent, MediaLoadedDataEvent, MediaLoadedMetadataEvent, MediaLoadingStrategy, MediaLoopChangeEvent, MediaLoopRequestEvent, MediaMuteRequestEvent, MediaOrientationChangeEvent, MediaOrientationLockRequestEvent, MediaOrientationUnlockRequestEvent, MediaPIPChangeEvent, MediaPIPErrorEvent, MediaPauseControlsRequestEvent, MediaPauseEvent, MediaPauseRequestEvent, MediaPlayEvent, MediaPlayFailEvent, MediaPlayRequestEvent, MediaPlayer, MediaPlayerConnectEvent, MediaPlayerEvents, MediaPlayerProps, MediaPlayerQuery, MediaPlayerState, MediaPlayingEvent, MediaPlaysInlineChangeEvent, MediaPosterChangeEvent, MediaPosterLoadingStrategy, MediaPosterStartLoadingRequestEvent, MediaProgressEvent, MediaProgressEventDetail, MediaProvider, MediaProviderAdapter, MediaProviderChangeEvent, MediaProviderLoaderChangeEvent, MediaProviderProps, MediaProviderSetupEvent, MediaProviderState, MediaQualitiesChangeEvent, MediaQualityChangeEvent, MediaQualityChangeRequestEvent, MediaRateChangeEvent, MediaRateChangeRequestEvent, MediaRemoteControl, MediaRemotePlaybackChangeEvent, MediaRemotePlaybackChangeEventDetail, MediaReplayEvent, MediaRequestEvents, MediaResumeControlsRequestEvent, MediaSeekRequestEvent, MediaSeekedEvent, MediaSeekingEvent, MediaSeekingRequestEvent, MediaShowPosterRequestEvent, MediaSourceChangeEvent, MediaSourcesChangeEvent, MediaSrc, MediaSrcObject, MediaStalledEvent, MediaStartLoadingRequestEvent, MediaStartedEvent, MediaState, MediaStateAccessors, MediaStorage, MediaStore, MediaStreamType, MediaStreamTypeChangeEvent, MediaSuspendEvent, MediaTextTrackChangeEvent, MediaTextTrackChangeRequestEvent, MediaTextTracksChangeEvent, MediaTimeChangeEvent, MediaTimeUpdateEvent, MediaTimeUpdateEventDetail, MediaTitleChangeEvent, MediaTypeChangeEvent, MediaUnmuteRequestEvent, MediaUserEvents, MediaUserLoopChangeRequestEvent, MediaViewType, MediaViewTypeChangeEvent, MediaVolumeChange, MediaVolumeChangeEvent, MediaVolumeChangeRequestEvent, MediaWaitingEvent, Menu, MenuButton, MenuButtonEvents, MenuButtonProps, MenuButtonSelectEvent, MenuCloseEvent, MenuEvents, MenuItem, MenuItems, MenuItemsProps, MenuOpenEvent, MenuPlacement, MenuPlacementAlign, MenuPlacementSide, MenuPortal, MenuPortalContext, MenuPortalProps, MenuProps, MuteButton, MuteButtonEvents, MuteButtonProps, MuxThumbnailStoryboard, MuxThumbnailTile, PIPButton, PIPButtonEvents, PIPButtonProps, PlayButton, PlayButtonEvents, PlayButtonProps, PlayerSrc, PlayerStore, PlyrControl, PlyrLayoutProps, PlyrLayoutTranslations, PlyrLayoutWord, PlyrMarker, Poster, PosterProps, PosterState, QualityRadioGroup, QualityRadioGroupChangeEvent, QualityRadioGroupEvents, QualityRadioGroupProps, QualityRadioOption, QualitySlider, QualitySliderCSSVars, QualitySliderEvents, QualitySliderProps, QualitySliderState, Radio, RadioChangeEvent, RadioEvents, RadioGroup, RadioGroupChangeEvent, RadioGroupEvents, RadioGroupProps, RadioOption, RadioProps, RadioSelectEvent, RemotePlaybackInfo, RemotePlaybackType, ScreenOrientationChangeEvent, ScreenOrientationChangeEventDetail, ScreenOrientationController, ScreenOrientationEvents, ScreenOrientationLockType, ScreenOrientationType, SeekButton, SeekButtonEvents, SeekButtonProps, SerializedVideoQuality, Slider, SliderCSSVars, SliderChapters, SliderChaptersCSSVars, SliderChaptersProps, SliderController, SliderControllerProps, SliderDelegate, SliderDragEndEvent, SliderDragStartEvent, SliderDragValueChangeEvent, SliderEvent, SliderEvents, SliderPointerValueChangeEvent, SliderPreview, SliderPreviewProps, SliderProps, SliderState, SliderStore, SliderValue, SliderValueChangeEvent, SliderValueProps, SliderVideo, SliderVideoCanPlayEvent, SliderVideoErrorEvent, SliderVideoEvents, SliderVideoProps, SliderVideoState, SpeedRadioGroup, SpeedRadioGroupChangeEvent, SpeedRadioGroupEvents, SpeedRadioGroupProps, SpeedSlider, SpeedSliderCSSVars, SpeedSliderEvents, SpeedSliderProps, SpeedSliderState, TextRenderers, TextTrackAddCueEvent, TextTrackAddEvent, TextTrackCueChangeEvent, TextTrackErrorEvent, TextTrackEvent, TextTrackEvents, TextTrackInit, TextTrackListEvent, TextTrackListEvents, TextTrackListModeChangeEvent, TextTrackLoadEvent, TextTrackLoadStartEvent, TextTrackModeChangeEvent, TextTrackReadyState, TextTrackRemoveCueEvent, TextTrackRemoveEvent, ThumbnailCoords, ThumbnailImage, ThumbnailImageInit, ThumbnailProps, ThumbnailSrc, ThumbnailState, ThumbnailStoryboard, ThumbnailTile, ThumbnailsLoader, Time, TimeProps, TimeSlider, TimeSliderCSSVars, TimeSliderEvents, TimeSliderProps, TimeSliderState, TimeState, ToggleButton, ToggleButtonProps, Tooltip, TooltipContent, TooltipContentProps, TooltipPlacement, TooltipPlacementAlign, TooltipPlacementSide, TooltipProps, TooltipTrigger, VTTContent, VTTCueInit, VTTRegionInit, VideoMimeType, VideoPresentationChangeEvent, VideoPresentationEvents, VideoQualityAddEvent, VideoQualityAutoChangeEvent, VideoQualityChangeEvent, VideoQualityChangeEventDetail, VideoQualityList, VideoQualityListEvent, VideoQualityListEvents, VideoQualityRemoveEvent, VideoSrc, VideoSrcMeta, VimeoSrc, VolumeSlider, VolumeSliderCSSVars, VolumeSliderEvents, VolumeSliderProps, VolumeSliderState, YouTubeSrc, boundTime, canFullscreen, getDownloadFile, isTrackCaptionKind, isVideoQualitySrc, mediaContext, mediaState, menuPortalContext, parseJSONCaptionsFile, sliderState, softResetMediaState, updateSliderPreviewPlacement, usePlyrLayoutClasses } from './types/vidstack-IH_rCrf6.js';
import { EventsTarget, Dispose, ViewController, ReadSignal, WriteSignal, Context } from './types/vidstack-BNOTL9fc.js';
export { appendTriggerEvent, findTriggerEvent, hasTriggerEvent, isKeyboardClick, isKeyboardEvent, isPointerEvent, walkTriggerEventChain } from './types/vidstack-BNOTL9fc.js';
import { VTTCue } from 'media-captions';
import 'dashjs';
import 'hls.js';

declare class LibASSTextRenderer implements TextRenderer {
    #private;
    readonly loader: LibASSModuleLoader;
    config?: LibASSConfig | undefined;
    readonly priority = 1;
    constructor(loader: LibASSModuleLoader, config?: LibASSConfig | undefined);
    canRender(track: TextTrack, video: HTMLVideoElement | null): boolean;
    attach(video: HTMLVideoElement | null): void;
    changeTrack(track: TextTrack | null): void;
    detach(): void;
}
interface LibASSModuleLoader {
    (): Promise<{
        default: LibASSConstructor;
    }>;
}
interface LibASSConstructor {
    new (config?: {
        video: HTMLVideoElement;
        canvas?: HTMLCanvasElement;
        subUrl?: string;
    } & LibASSConfig): LibASSInstance;
}
interface LibASSInstance extends EventsTarget<LibASSInstanceEvents> {
    _video: HTMLVideoElement;
    _canvas: HTMLVideoElement | null;
    setTrackByUrl(url: string): void;
    setCurrentTime(time: number): void;
    freeTrack(): void;
    destroy(): void;
}
interface LibASSInstanceEvents {
    ready: LibASSReadyEvent;
    error: LibASSErrorEvent;
}
interface LibASSReadyEvent extends Event {
}
interface LibASSErrorEvent extends ErrorEvent {
}
/**
 * @see {@link https://github.com/ThaUnknown/jassub/tree/main#options}
 */
interface LibASSConfig {
    /**
     * Which image blending mode to use. WASM will perform better on lower end devices, JS will
     * perform better if the device and browser supports hardware acceleration.
     *
     * @defaultValue "js"
     */
    blendMode?: 'js' | 'wasm';
    /**
     * Whether or not to use async rendering, which offloads the CPU by creating image bitmaps on
     * the GPU.
     *
     * @defaultValue true
     */
    asyncRender?: boolean;
    /**
     * Whether or not to render things fully on the worker, greatly reduces CPU usage.
     *
     * @defaultValue true
     */
    offscreenRender?: boolean;
    /**
     * Whether or not to render subtitles as the video player renders frames, rather than predicting
     * which frame the player is on using events.
     *
     * @defaultValue true
     */
    onDemandRender?: boolean;
    /**
     * Target FPS to render subtitles at. Ignored when onDemandRender is enabled.
     *
     * @defaultValue 24
     */
    targetFps?: number;
    /**
     * Subtitle time offset in seconds.
     *
     * @defaultValue 0
     */
    timeOffset?: number;
    /**
     * Whether or not to print debug information.
     *
     * @defaultValue false
     */
    debug?: boolean;
    /**
     * Scale down (< 1.0) the subtitles canvas to improve performance at the expense of quality, or
     * scale it up (> 1.0).
     *
     * @defaultValue 1.0
     */
    prescaleFactor?: number;
    /**
     * The height in pixels beyond which the subtitles canvas won't be pre-scaled.
     *
     * @defaultValue 1080
     */
    prescaleHeightLimit?: number;
    /**
     * The maximum rendering height in pixels of the subtitles canvas. Beyond this subtitles will
     * be up-scaled by the browser.
     *
     * @defaultValue 0
     */
    maxRenderHeight?: number;
    /**
     * Attempt to discard all animated tags. Enabling this may severely mangle complex subtitles
     * and should only be considered as an last ditch effort of uncertain success for hardware
     * otherwise incapable of displaying anything. Will not reliably work with manually edited or
     * allocated events.
     *
     * @defaultValue false
     */
    dropAllAnimations?: boolean;
    /**
     * The URL of the worker.
     *
     * @defaultValue "jassub-worker.js"
     */
    workerUrl?: string;
    /**
     * The URL of the legacy worker. Only loaded if the browser doesn't support WASM.
     *
     * @defaultValue "jassub-worker-legacy.js"
     */
    legacyWorkerUrl?: string;
    /**
     * The URL of the subtitle file to play.
     *
     */
    subUrl?: string;
    /**
     * The content of the subtitle file to play.
     *
     */
    subContent?: string;
    /**
     * An array of links or `Uint8Array` to the fonts used in the subtitle. If `Uint8Array` is used
     * the array is copied, not referenced. This forces all the fonts in this array to be loaded
     * by the renderer, regardless of if they are used.
     *
     */
    fonts?: string[] | Uint8Array[];
    /**
     * Object with all available fonts. Key is font family in lower case, value is link or
     * `Uint8Array`. These fonts are selectively loaded if detected as used in the current
     * subtitle track.
     *
     * @defaultValue {'liberation sans': './default.woff2'}}
     */
    availableFonts?: Record<string, string>;
    /**
     * The font family key of the fallback font in `availableFonts` to use if the other font
     * for the style is missing special glyphs or unicode.
     *
     * @defaultValue "liberation sans"
     */
    fallbackFont?: string;
    /**
     * If the Local Font Access API is enabled `[chrome://flags/#font-access]`, the library will
     * query for permissions to use local fonts and use them if any are missing. The permission can
     * be queried beforehand using `navigator.permissions.request({ name: 'local-fonts' })`.
     *
     * @defaultValue true
     */
    useLocalFonts?: boolean;
    /**
     * libass bitmap cache memory limit in MiB (approximate).
     */
    libassMemoryLimit?: number;
    /**
     * libass glyph cache memory limit in MiB (approximate).
     */
    libassGlyphLimit?: number;
}

declare function findActiveCue(cues: readonly VTTCue[], time: number): VTTCue | null;
declare function isCueActive(cue: VTTCue, time: number): boolean;
declare function watchActiveTextTrack(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], onChange: (track: TextTrack | null) => void): Dispose;
declare function watchCueTextChange(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], callback: (title: string) => void): void;

declare function sortVideoQualities(qualities: VideoQuality[], desc?: boolean): VideoQuality[];

declare const MEDIA_KEY_SHORTCUTS: MediaKeyShortcuts;

declare class ARIAKeyShortcuts extends ViewController {
    #private;
    constructor(shortcut: string);
    protected onAttach(el: HTMLElement): void;
}

type TimeInterval = [start: number, end: number];
declare class TimeRange implements TimeRanges {
    #private;
    get length(): number;
    constructor(start?: number | TimeInterval[], end?: number);
    start(index: number): number;
    end(index: number): number;
}
declare function getTimeRangesStart(range: TimeRanges): number | null;
declare function getTimeRangesEnd(range: TimeRanges): number | null;
declare function normalizeTimeIntervals(intervals: TimeInterval[]): TimeInterval[];
declare function updateTimeIntervals(intervals: TimeInterval[], interval: TimeInterval, value: number): TimeInterval;

/** @see {@link https://www.vidstack.io/docs/player/providers/audio} */
declare function isAudioProvider(provider: any): provider is AudioProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/video} */
declare function isVideoProvider(provider: any): provider is VideoProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/hls} */
declare function isHLSProvider(provider: any): provider is HLSProvider;
declare function isDASHProvider(provider: any): provider is DASHProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/youtube} */
declare function isYouTubeProvider(provider: any): provider is YouTubeProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/vimeo} */
declare function isVimeoProvider(provider: any): provider is VimeoProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/google-cast} */
declare function isGoogleCastProvider(provider: any): provider is GoogleCastProvider;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement} */
declare function isHTMLAudioElement(element: unknown): element is HTMLAudioElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement} */
declare function isHTMLVideoElement(element: unknown): element is HTMLVideoElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement} */
declare function isHTMLMediaElement(element: unknown): element is HTMLMediaElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement} */
declare function isHTMLIFrameElement(element: unknown): element is HTMLIFrameElement;

declare class AudioProviderLoader implements MediaProviderLoader<AudioProvider> {
    readonly name = "audio";
    target: HTMLAudioElement;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<AudioProvider>;
}

declare class VideoProviderLoader implements MediaProviderLoader<VideoProvider> {
    readonly name: string;
    target: HTMLVideoElement;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VideoProvider>;
}

declare class HLSProviderLoader extends VideoProviderLoader implements MediaProviderLoader<HLSProvider> {
    static supported: boolean;
    readonly name = "hls";
    canPlay(src: Src): boolean;
    load(context: any): Promise<HLSProvider>;
}

declare class DASHProviderLoader extends VideoProviderLoader implements MediaProviderLoader<DASHProvider> {
    static supported: boolean;
    readonly name = "dash";
    canPlay(src: Src): boolean;
    load(context: any): Promise<DASHProvider>;
}

declare class GoogleCastLoader implements MediaProviderLoader<GoogleCastProvider> {
    #private;
    readonly name = "google-cast";
    target: HTMLElement;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
     */
    get cast(): cast.framework.CastContext;
    mediaType(): MediaType;
    canPlay(src: Src): boolean;
    prompt(ctx: MediaContext): Promise<void>;
    load(ctx: MediaContext): Promise<GoogleCastProvider>;
}

declare class VimeoProviderLoader implements MediaProviderLoader<VimeoProvider> {
    readonly name = "vimeo";
    target: HTMLIFrameElement;
    preconnect(): void;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VimeoProvider>;
    loadPoster(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}

declare class YouTubeProviderLoader implements MediaProviderLoader<YouTubeProvider> {
    readonly name = "youtube";
    target: HTMLIFrameElement;
    preconnect(): void;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<YouTubeProvider>;
    loadPoster(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}

/**
 * Used to display preview thumbnails when the user is hovering or dragging the time slider.
 * The time ranges in the WebVTT file will automatically be matched based on the current slider
 * pointer position.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-thumbnail}
 */
declare class SliderThumbnail extends Thumbnail {
    #private;
    protected onAttach(el: HTMLElement): void;
    protected getTime(): number;
}

interface SliderContext {
    disabled: ReadSignal<boolean>;
    orientation: ReadSignal<SliderOrientation>;
    preview: WriteSignal<HTMLElement | null>;
}
declare const sliderContext: Context<SliderContext>;

interface FormatTimeOptions {
    padHrs?: boolean | null;
    padMins?: boolean | null;
    showHrs?: boolean;
    showMs?: boolean;
}
/**
 * Formats the given `duration` into a human readable form that can be displayed to the user.
 *
 * @param duration - The length of time to parse in seconds.
 * @param shouldPadHours - Whether to pad the hours to be length of 2.
 * @param shouldPadMinutes - Whether to pad the minutes to be length of 2.
 * @param shouldAlwaysShowHours - Whether to always show the hours unit.
 * @example `01:20 -> minutes:seconds`
 * @example `3:01:20 -> hours:minutes:seconds`
 * @example If `shouldPadHours` is `true` - `03:01:20`
 * @example If `shouldAlwaysShowHours` is `true` - `0:01:20`
 */
declare function formatTime(duration: number, { padHrs, padMins, showHrs, showMs }?: FormatTimeOptions): string;
/**
 * Formats the given `duration` into human spoken form.
 *
 * @param duration - The length of time to parse in seconds.
 * @example `2 hour 3 min 4 sec`
 */
declare function formatSpokenTime(duration: number): string;

declare const AUDIO_EXTENSIONS: RegExp;
declare const AUDIO_TYPES: Set<string>;
declare const VIDEO_EXTENSIONS: RegExp;
declare const VIDEO_TYPES: Set<string>;
declare const HLS_VIDEO_EXTENSIONS: RegExp;
declare const DASH_VIDEO_EXTENSIONS: RegExp;
declare const HLS_VIDEO_TYPES: Set<string>;
declare const DASH_VIDEO_TYPES: Set<string>;
declare function isAudioSrc({ src, type }: Src): boolean;
declare function isVideoSrc(src: Src): boolean;
declare function isHLSSrc({ src, type }: Src): boolean;
declare function isDASHSrc({ src, type }: Src): boolean;
declare function canGoogleCastSrc(src: Src): boolean;
declare function isMediaStream(src: unknown): src is MediaStream;

/**
 * Checks if the ScreenOrientation API is available.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
declare function canOrientScreen(): boolean;
/**
 * Checks if the screen orientation can be changed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
declare function canRotateScreen(): boolean;
/**
 * Checks if the native HTML5 video player can play HLS.
 */
declare function canPlayHLSNatively(video?: HTMLVideoElement | null): boolean;
/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the Chrome browser.
 *
 * @see {@link https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture}
 */
declare function canUsePictureInPicture(video: HTMLVideoElement | null): boolean;
/**
 * Checks if the native HTML5 video player can use the presentation API in Safari.
 *
 * @see {@link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode}
 */
declare function canUseVideoPresentation(video: HTMLVideoElement | null): boolean;
declare function canChangeVolume(): Promise<boolean>;

export { ARIAKeyShortcuts, AUDIO_EXTENSIONS, AUDIO_TYPES, AudioProvider, AudioProviderLoader, DASHProvider, DASHProviderLoader, DASH_VIDEO_EXTENSIONS, DASH_VIDEO_TYPES, GoogleCastLoader, GoogleCastProvider, HLSProvider, HLSProviderLoader, HLS_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, type LibASSConfig, type LibASSConstructor, type LibASSErrorEvent, type LibASSInstance, type LibASSInstanceEvents, type LibASSModuleLoader, type LibASSReadyEvent, LibASSTextRenderer, MEDIA_KEY_SHORTCUTS, MediaContext, MediaKeyShortcuts, MediaProviderLoader, MediaType, type SliderContext, SliderOrientation, SliderThumbnail, Src, TextRenderer, TextTrack, TextTrackList, Thumbnail, type TimeInterval, TimeRange, VIDEO_EXTENSIONS, VIDEO_TYPES, VideoProvider, VideoProviderLoader, VideoQuality, VimeoProvider, VimeoProviderLoader, YouTubeProvider, YouTubeProviderLoader, canChangeVolume, canGoogleCastSrc, canOrientScreen, canPlayHLSNatively, canRotateScreen, canUsePictureInPicture, canUseVideoPresentation, findActiveCue, formatSpokenTime, formatTime, getTimeRangesEnd, getTimeRangesStart, isAudioProvider, isAudioSrc, isCueActive, isDASHProvider, isDASHSrc, isGoogleCastProvider, isHLSProvider, isHLSSrc, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isMediaStream, isVideoProvider, isVideoSrc, isVimeoProvider, isYouTubeProvider, normalizeTimeIntervals, sliderContext, sortVideoQualities, updateTimeIntervals, watchActiveTextTrack, watchCueTextChange };
