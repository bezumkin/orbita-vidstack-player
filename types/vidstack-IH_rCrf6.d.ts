import { EventsTarget, DOMEvent, ViewController, SetRequired, MaybeStopEffect, InferEventDetail, WriteSignal, ReadSignalRecord, Context, Scope, Dispose, State, Store, Writable, Component, ReadSignal } from './vidstack-BNOTL9fc.js';
import * as media_captions from 'media-captions';
import { VTTCue as VTTCue$1, VTTRegion, CaptionsFileFormat, CaptionsParserFactory, VTTHeaderMetadata } from 'media-captions';
import * as DASH from 'dashjs';
import DASH__default from 'dashjs';
import * as HLS from 'hls.js';

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug';

declare const GROUPED_LOG: unique symbol;
declare class GroupedLog {
    readonly logger: Logger;
    readonly level: LogLevel;
    readonly title: string;
    readonly root?: GroupedLog | undefined;
    readonly parent?: GroupedLog | undefined;
    readonly [GROUPED_LOG] = true;
    readonly logs: ({
        label?: string;
        data: any[];
    } | GroupedLog)[];
    constructor(logger: Logger, level: LogLevel, title: string, root?: GroupedLog | undefined, parent?: GroupedLog | undefined);
    log(...data: any[]): GroupedLog;
    labelledLog(label: string, ...data: any[]): GroupedLog;
    groupStart(title: string): GroupedLog;
    groupEnd(): GroupedLog;
    dispatch(): boolean;
}

declare class Logger {
    #private;
    error(...data: any[]): boolean;
    warn(...data: any[]): boolean;
    info(...data: any[]): boolean;
    debug(...data: any[]): boolean;
    errorGroup(title: string): GroupedLog;
    warnGroup(title: string): GroupedLog;
    infoGroup(title: string): GroupedLog;
    debugGroup(title: string): GroupedLog;
    setTarget(newTarget: EventTarget | null): void;
    dispatch(level: LogLevel, ...data: any[]): boolean;
}

declare const ADD: unique symbol;
declare const REMOVE: unique symbol;
declare const RESET: unique symbol;
declare const SELECT: unique symbol;
declare const READONLY: unique symbol;
declare const SET_READONLY: unique symbol;
declare const ON_RESET: unique symbol;
declare const ON_REMOVE: unique symbol;
declare const ON_USER_SELECT: unique symbol;
/** @internal */
declare const ListSymbol: {
    readonly add: typeof ADD;
    readonly remove: typeof REMOVE;
    readonly reset: typeof RESET;
    readonly select: typeof SELECT;
    readonly readonly: typeof READONLY;
    readonly setReadonly: typeof SET_READONLY;
    readonly onReset: typeof ON_RESET;
    readonly onRemove: typeof ON_REMOVE;
    readonly onUserSelect: typeof ON_USER_SELECT;
};

interface ListItem {
    id: string;
}
declare class List<Item extends ListItem, Events extends ListEvents> extends EventsTarget<Events> implements Iterable<Item> {
    [index: number]: Item | undefined;
    protected items: Item[];
    /** @internal */
    protected [ListSymbol.readonly]: boolean;
    /** @internal */
    protected [ListSymbol.onReset]?(trigger?: Event): void;
    /** @internal */
    protected [ListSymbol.onRemove]?(item: Item, trigger?: Event): void;
    get length(): number;
    get readonly(): boolean;
    /**
     * Returns the index of the first occurrence of the given item, or -1 if it is not present.
     */
    indexOf(item: Item): number;
    /**
     * Returns an item matching the given `id`, or `null` if not present.
     */
    getById(id: string): Item | null;
    /**
     * Transform list to an array.
     */
    toArray(): Item[];
    [Symbol.iterator](): ArrayIterator<Item>;
    /** @internal */
    [ListSymbol.add](item: Item, trigger?: Event): void;
    /** @internal */
    [ListSymbol.remove](item: Item, trigger?: Event): void;
    /** @internal */
    [ListSymbol.reset](trigger?: Event): void;
    /** @internal */
    [ListSymbol.setReadonly](readonly: boolean, trigger?: Event): void;
}
interface ListEvents<Item extends ListItem = ListItem> {
    add: ListAddEvent<Item>;
    remove: ListRemoveEvent<Item>;
    'readonly-change': ListReadonlyChangeEvent;
}
/**
 * Fired when an item has been added to the list.
 *
 * @detail item
 */
interface ListAddEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when an item has been removed from the list.
 *
 * @detail item
 */
interface ListRemoveEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when the readonly state of the list has changed.
 *
 * @detail isReadonly
 */
interface ListReadonlyChangeEvent extends DOMEvent<boolean> {
}

interface FullscreenEvents {
    'fullscreen-change': FullscreenChangeEvent;
    'fullscreen-error': FullscreenErrorEvent;
}
/**
 * Fired when an element enters/exits fullscreen. The event detail is a `boolean` indicating
 * if fullscreen was entered (`true`) or exited (`false`).
 *
 * @bubbles
 * @composed
 * @detail isFullscreen
 */
interface FullscreenChangeEvent extends DOMEvent<boolean> {
}
/**
 * Fired when an error occurs either entering or exiting fullscreen. This will generally occur
 * if the user has not interacted with the page yet.
 *
 * @bubbles
 * @composed
 * @detail error
 */
interface FullscreenErrorEvent extends DOMEvent<unknown> {
}

declare class FullscreenController extends ViewController<{}, {}, FullscreenEvents> implements FullscreenAdapter {
    #private;
    get active(): boolean;
    get supported(): boolean;
    protected onConnect(): void;
    enter(): Promise<void>;
    exit(): Promise<void>;
}
declare function canFullscreen(): boolean;
interface FullscreenAdapter {
    /**
     * Whether the host element is in fullscreen mode.
     */
    readonly active: boolean;
    /**
     * Whether the native browser fullscreen API is available, or the current provider can
     * toggle fullscreen mode. This does not mean that the operation is guaranteed to be successful,
     * only that it can be attempted.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    readonly supported: boolean;
    /**
     * Request to display the current host element in fullscreen.
     *
     * @throws Error - if fullscreen API is not available.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen}
     */
    enter(): Promise<void>;
    /**
     * Attempt to exit fullscreen on the current host element.
     *
     * @throws Error - if fullscreen API is not available.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen}
     */
    exit(): Promise<void>;
}

declare global {
    interface HTMLElementEventMap extends LoggerEvents {
    }
}
interface LoggerEvents {
    'vds-log': LogEvent;
}
interface LogEventDetail {
    /**
     * The log level.
     */
    level: LogLevel;
    /**
     * Data to be logged.
     */
    data?: any[];
}
/**
 * @bubbles
 * @composed
 * @detail log
 */
interface LogEvent extends DOMEvent<LogEventDetail> {
}

type ScreenOrientationType = 
/**
 * Landscape-primary is an orientation where the screen width is greater than the screen height.
 * If the device's natural orientation is landscape, then it is in landscape-primary when held
 * in that position. If the device's natural orientation is portrait, the user agent sets
 * landscape-primary from the two options as shown in the screen orientation values table.
 */
'landscape-primary'
/**
 * Landscape-secondary is an orientation where the screen width is greater than the screen
 * height. If the device's natural orientation is landscape, it is in landscape-secondary when
 * rotated 180º from its natural orientation. If the device's natural orientation is portrait,
 * the user agent sets landscape-secondary from the two options as shown in the screen
 * orientation values table.
 */
 | 'landscape-secondary'
/**
 * Portrait-primary is an orientation where the screen width is less than or equal to the screen
 * height. If the device's natural orientation is portrait, then it is in portrait-primary when
 * held in that position. If the device's natural orientation is landscape, the user agent sets
 * portrait-primary from the two options as shown in the screen orientation values table.
 */
 | 'portrait-primary'
/**
 * Portrait-secondary is an orientation where the screen width is less than or equal to the
 * screen height. If the device's natural orientation is portrait, then it is in
 * portrait-secondary when rotated 180º from its natural position. If the device's natural
 * orientation is landscape, the user agent sets portrait-secondary from the two options as
 * shown in the screen orientation values table.
 */
 | 'portrait-secondary';
type ScreenOrientationLockType = 
/**
 * Any is an orientation that means the screen can be locked to any one of portrait-primary,
 * portrait-secondary, landscape-primary and landscape-secondary.
 */
'any'
/**
 * Landscape is an orientation where the screen width is greater than the screen height and
 * depending on platform convention locking the screen to landscape can represent
 * landscape-primary, landscape-secondary or both.
 */
 | 'landscape'
/**
 * Landscape-primary is an orientation where the screen width is greater than the screen height.
 * If the device's natural orientation is landscape, then it is in landscape-primary when held
 * in that position. If the device's natural orientation is portrait, the user agent sets
 * landscape-primary from the two options as shown in the screen orientation values table.
 */
 | 'landscape-primary'
/**
 * Landscape-secondary is an orientation where the screen width is greater than the screen
 * height. If the device's natural orientation is landscape, it is in landscape-secondary when
 * rotated 180º from its natural orientation. If the device's natural orientation is portrait,
 * the user agent sets landscape-secondary from the two options as shown in the screen
 * orientation values table.
 */
 | 'landscape-secondary'
/**
 * Natural is an orientation that refers to either portrait-primary or landscape-primary
 * depending on the device's usual orientation. This orientation is usually provided by the
 * underlying operating system.
 */
 | 'natural'
/**
 * Portrait is an orientation where the screen width is less than or equal to the screen height
 * and depending on platform convention locking the screen to portrait can represent
 * portrait-primary, portrait-secondary or both.
 */
 | 'portrait'
/**
 * Portrait-primary is an orientation where the screen width is less than or equal to the screen
 * height. If the device's natural orientation is portrait, then it is in portrait-primary when
 * held in that position. If the device's natural orientation is landscape, the user agent sets
 * portrait-primary from the two options as shown in the screen orientation values table.
 */
 | 'portrait-primary'
/**
 * Portrait-secondary is an orientation where the screen width is less than or equal to the
 * screen height. If the device's natural orientation is portrait, then it is in
 * portrait-secondary when rotated 180º from its natural position. If the device's natural
 * orientation is landscape, the user agent sets portrait-secondary from the two options as
 * shown in the screen orientation values table.
 */
 | 'portrait-secondary';

interface ScreenOrientationEvents {
    'orientation-change': ScreenOrientationChangeEvent;
}
interface ScreenOrientationChangeEventDetail {
    orientation: ScreenOrientationType;
    lock?: ScreenOrientationLockType;
}
/**
 * Fired when the current screen orientation changes.
 *
 * @detail orientation
 */
interface ScreenOrientationChangeEvent extends DOMEvent<ScreenOrientationChangeEventDetail> {
}

declare class ScreenOrientationController extends ViewController<{}, {}, ScreenOrientationEvents> {
    #private;
    /**
     * The current screen orientation type.
     *
     * @signal
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
     * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
     */
    get type(): ScreenOrientationType | undefined;
    /**
     * Whether the screen orientation is currently locked.
     *
     * @signal
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
     * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
     */
    get locked(): boolean;
    /**
     * Whether the viewport is in a portrait orientation.
     *
     * @signal
     */
    get portrait(): boolean;
    /**
     * Whether the viewport is in a landscape orientation.
     *
     * @signal
     */
    get landscape(): boolean;
    /**
     * Whether the native Screen Orientation API is available.
     */
    static readonly supported: boolean;
    /**
     * Whether the native Screen Orientation API is available.
     */
    get supported(): boolean;
    protected onConnect(): void;
    /**
     * Locks the orientation of the screen to the desired orientation type using the
     * Screen Orientation API.
     *
     * @param lockType - The screen lock orientation type.
     * @throws Error - If screen orientation API is unavailable.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
     * @see {@link https://w3c.github.io/screen-orientation}
     */
    lock(lockType: ScreenOrientationLockType): Promise<void>;
    /**
     * Unlocks the orientation of the screen to it's default state using the Screen Orientation
     * API. This method will throw an error if the API is unavailable.
     *
     * @throws Error - If screen orientation API is unavailable.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
     * @see {@link https://w3c.github.io/screen-orientation}
     */
    unlock(): Promise<void>;
}

interface MediaRequestEvents {
    'media-airplay-request': MediaAirPlayRequestEvent;
    'media-audio-track-change-request': MediaAudioTrackChangeRequestEvent;
    'media-clip-start-change-request': MediaClipStartChangeRequestEvent;
    'media-clip-end-change-request': MediaClipEndChangeRequestEvent;
    'media-duration-change-request': MediaDurationChangeRequestEvent;
    'media-enter-fullscreen-request': MediaEnterFullscreenRequestEvent;
    'media-exit-fullscreen-request': MediaExitFullscreenRequestEvent;
    'media-enter-pip-request': MediaEnterPIPRequestEvent;
    'media-exit-pip-request': MediaExitPIPRequestEvent;
    'media-google-cast-request': MediaGoogleCastRequestEvent;
    'media-live-edge-request': MediaLiveEdgeRequestEvent;
    'media-loop-request': MediaLoopRequestEvent;
    'media-user-loop-change-request': MediaUserLoopChangeRequestEvent;
    'media-orientation-lock-request': MediaOrientationLockRequestEvent;
    'media-orientation-unlock-request': MediaOrientationUnlockRequestEvent;
    'media-mute-request': MediaMuteRequestEvent;
    'media-pause-request': MediaPauseRequestEvent;
    'media-pause-controls-request': MediaPauseControlsRequestEvent;
    'media-play-request': MediaPlayRequestEvent;
    'media-quality-change-request': MediaQualityChangeRequestEvent;
    'media-rate-change-request': MediaRateChangeRequestEvent;
    'media-audio-gain-change-request': MediaAudioGainChangeRequestEvent;
    'media-resume-controls-request': MediaResumeControlsRequestEvent;
    'media-seek-request': MediaSeekRequestEvent;
    'media-seeking-request': MediaSeekingRequestEvent;
    'media-start-loading': MediaStartLoadingRequestEvent;
    'media-poster-start-loading': MediaPosterStartLoadingRequestEvent;
    'media-text-track-change-request': MediaTextTrackChangeRequestEvent;
    'media-unmute-request': MediaUnmuteRequestEvent;
    'media-volume-change-request': MediaVolumeChangeRequestEvent;
}
/**
 * Fired when requesting the AirPlay picker to open.
 *
 * @bubbles
 * @composed
 */
interface MediaAirPlayRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the media poster to begin loading. This will only take effect if the
 * `posterLoad` strategy on the player is set to `custom`.
 *
 * @bubbles
 * @composed
 */
interface MediaPosterStartLoadingRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting to change the `mode` on a text track at the given index in the
 * `TextTrackList` on the player.
 *
 * @bubbles
 * @composed
 */
interface MediaTextTrackChangeRequestEvent extends DOMEvent<{
    index: number;
    mode: TextTrackMode;
}> {
}
/**
 * Fired when requesting the media to be muted.
 *
 * @bubbles
 * @composed
 */
interface MediaMuteRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the media to be unmuted.
 *
 * @bubbles
 * @composed
 */
interface MediaUnmuteRequestEvent extends DOMEvent<void> {
}
/**
 * Whether to request fullscreen on the media (i.e., `<media-player>`). The `prefer-media` option
 * will first see if the native fullscreen API is available, if not it'll try the media provider.
 */
type MediaFullscreenRequestTarget = 'prefer-media' | 'media' | 'provider';
/**
 * Fired when requesting to change the current audio track to the given index in the
 * `AudioTrackList` on the player.
 *
 * @bubbles
 * @composed
 */
interface MediaAudioTrackChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting to change the clip start time. The event `detail` specifies the new start
 * time in seconds.
 *
 * @bubbles
 * @composed
 */
interface MediaClipStartChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting to change the clip end time. The event `detail` specifies the new end
 * time in seconds.
 *
 * @bubbles
 * @composed
 */
interface MediaClipEndChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting to change the length of the media. The event `detail` specifies the
 * new length in seconds.
 *
 * @bubbles
 * @composed
 */
interface MediaDurationChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting media to enter fullscreen. The event `detail` can specify the
 * fullscreen target, which can be the media or provider (defaults to `prefer-media`).
 *
 * @bubbles
 * @composed
 */
interface MediaEnterFullscreenRequestEvent extends DOMEvent<MediaFullscreenRequestTarget> {
}
/**
 * Fired when requesting media to exit fullscreen. The event `detail` can specify the fullscreen
 * target, which can be the media or provider (defaults to `prefer-media`).
 *
 * @bubbles
 * @composed
 */
interface MediaExitFullscreenRequestEvent extends DOMEvent<MediaFullscreenRequestTarget> {
}
/**
 * Fired when requesting media to enter picture-in-picture mode.
 *
 * @bubbles
 * @composed
 */
interface MediaEnterPIPRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting media to exit picture-in-picture mode.
 *
 * @bubbles
 * @composed
 */
interface MediaExitPIPRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting Google Cast.
 *
 * @bubbles
 * @composed
 */
interface MediaGoogleCastRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting media to seek to the live edge (i.e., set the current time to the current
 * live time).
 */
interface MediaLiveEdgeRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting media playback to begin/resume.
 *
 * @bubbles
 * @composed
 */
interface MediaPlayRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting to change the current video quality to the given index in the
 * `VideoQualityList` on the player.
 *
 * @bubbles
 * @composed
 * @detail qualityIndex
 */
interface MediaQualityChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting to change the current playback rate.
 *
 * @bubbles
 * @composed
 * @detail rate
 */
interface MediaRateChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting to change the current audio gain.
 *
 * @bubbles
 * @composed
 * @detail gain
 */
interface MediaAudioGainChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting media playback to temporarily stop.
 *
 * @bubbles
 * @composed
 */
interface MediaPauseRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting a time change. In other words, moving the play head to a new position.
 *
 * @bubbles
 * @composed
 * @detail seekTo
 */
interface MediaSeekRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when seeking/scrubbing to a new playback position.
 *
 * @bubbles
 * @composed
 * @detail time
 */
interface MediaSeekingRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting media to begin loading. This will only take effect if the `load`
 * strategy on the player is set to `custom`.
 *
 * @bubbles
 * @composed
 */
interface MediaStartLoadingRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the media volume to be set to a new level.
 *
 * @bubbles
 * @composed
 * @detail volume
 */
interface MediaVolumeChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when controls visibility tracking may resume. This is typically called after requesting
 * tracking to pause via `media-pause-controls-request`.
 *
 * @bubbles
 * @composed
 */
interface MediaResumeControlsRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when controls visibility tracking should pause. This is typically used when a control
 * is being actively interacted with, and we don't want the controls to be hidden before
 * the interaction is complete (eg: scrubbing, or settings is open).
 *
 * @bubbles
 * @composed
 */
interface MediaPauseControlsRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the poster _should_ be rendered by the media provider. This should be
 * fired if a custom poster is _not_ being used.
 *
 * @bubbles
 * @composed
 */
interface MediaShowPosterRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the poster should _not_ be rendered by the media provider. This
 * should be fired if a custom poster element is being used (e.g., `media-poster`).
 *
 * @bubbles
 * @composed
 */
interface MediaHidePosterRequestEvent extends DOMEvent<void> {
}
/**
 * Internal event that is fired by a media provider when requesting media playback to restart after
 * reaching the end. This event also helps notify the player that media will be looping.
 *
 * @internal
 * @bubbles
 * @composed
 */
interface MediaLoopRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when the user loop preference changes.
 *
 * @bubbles
 * @composed
 */
interface MediaUserLoopChangeRequestEvent extends DOMEvent<boolean> {
}
/**
 * Fired when requesting the screen orientation to be locked to a certain type.
 *
 * @bubbles
 * @composed
 */
interface MediaOrientationLockRequestEvent extends DOMEvent<ScreenOrientationLockType> {
}
/**
 * Fired when requesting the screen orientation to be unlocked.
 *
 * @bubbles
 * @composed
 */
interface MediaOrientationUnlockRequestEvent extends DOMEvent<void> {
}

interface DASHProviderEvents {
    'dash-lib-load-start': DASHLibLoadStartEvent;
    'dash-lib-loaded': DASHLibLoadedEvent;
    'dash-lib-load-error': DASHLibLoadErrorEvent;
    'dash-instance': DASHInstanceEvent;
    'dash-unsupported': DASHUnsupportedEvent;
    'dash-ast-in-future': DASHAstInFutureEvent;
    'dash-base-urls-updated': DASHBaseUrlsUpdatedEvent;
    'dash-buffer-empty': DASHBufferStalledEvent;
    'dash-buffer-loaded': DASHBufferLoadedEvent;
    'dash-buffer-level-state-changed': DASHBufferStateChangedEvent;
    'dash-buffer-level-updated': DASHBufferLevelUpdatedEvent;
    'dash-dvb-font-download-added': DASHDvbFontDownloadAddedEvent;
    'dash-dvb-font-download-complete': DASHDvbFontDownloadCompleteEvent;
    'dash-dvb-font-download-failed': DASHDvbFontDownloadFailedEvent;
    'dash-dynamic-to-static': DASHDynamicToStaticEvent;
    'dash-error': DASHErrorEvent;
    'dash-fragment-loading-completed': DASHFragmentLoadingCompletedEvent;
    'dash-fragment-loading-progress': DASHFragmentLoadingProgressEvent;
    'dash-fragment-loading-started': DASHFragmentLoadingStartedEvent;
    'dash-fragment-loading-abandoned': DASHFragmentLoadingAbandonedEvent;
    'dash-log': DASHLogEvent;
    'dash-manifest-loading-started': DASHManifestLoadingStartedEvent;
    'dash-manifest-loading-finished': DASHManifestLoadingFinishedEvent;
    'dash-manifest-loaded': DASHManifestLoadedEvent;
    'dash-metrics-changed': DASHMetricsChangedEvent;
    'dash-metric-changed': DASHMetricChangedEvent;
    'dash-metric-added': DASHMetricAddedEvent;
    'dash-metric-updated': DASHMetricUpdatedEvent;
    'dash-period-switch-started': DASHPeriodSwitchStartedEvent;
    'dash-period-switch-completed': DASHPeriodSwitchCompletedEvent;
    'dash-quality-change-requested': DASHQualityChangeRequestedEvent;
    'dash-quality-change-rendered': DASHQualityChangeRenderedEvent;
    'dash-track-change-rendered': DASHTrackChangeRenderedEvent;
    'dash-stream-initializing': DASHStreamInitializingEvent;
    'dash-stream-updated': DASHStreamUpdatedEvent;
    'dash-stream-activated': DASHStreamActivatedEvent;
    'dash-stream-deactivated': DASHStreamDeactivatedEvent;
    'dash-stream-initialized': DASHStreamInitializedEvent;
    'dash-stream-teardown-complete': DASHStreamTeardownCompleteEvent;
    'dash-text-tracks-added': DASHAllTextTracksAddedEvent;
    'dash-text-track-added': DASHTextTrackAddedEvent;
    'dash-cue-enter': DASHCueEnterEvent;
    'dash-cue-exit': DASHCueExitEvent;
    'dash-throughput-measurement-stored': DASHThroughputMeasurementStoredEvent;
    'dash-ttml-parsed': DASHTtmlParsedEvent;
    'dash-ttml-to-parse': DASHTtmlToParseEvent;
    'dash-caption-rendered': DASHCaptionRenderedEvent;
    'dash-caption-container-resize': DASHCaptionContainerResizeEvent;
    'dash-can-play': DASHCanPlayEvent;
    'dash-can-play-through': DASHCanPlayThroughEvent;
    'dash-playback-ended': DASHPlaybackEndedEvent;
    'dash-playback-error': DASHPlaybackErrorEvent;
    'dash-playback-not-allowed': DASHPlaybackNotAllowedEvent;
    'dash-playback-metadata-loaded': DASHPlaybackMetaDataLoadedEvent;
    'dash-playback-loaded-data': DASHPlaybackLoadedDataEvent;
    'dash-playback-paused': DASHPlaybackPausedEvent;
    'dash-playback-playing': DASHPlaybackPlayingEvent;
    'dash-playback-progress': DASHPlaybackProgressEvent;
    'dash-playback-rate-changed': DASHPlaybackRateChangedEvent;
    'dash-playback-seeked': DASHPlaybackSeekedEvent;
    'dash-playback-seeking': DASHPlaybackSeekingEvent;
    'dash-playback-stalled': DASHPlaybackStalledEvent;
    'dash-playback-started': DASHPlaybackStartedEvent;
    'dash-playback-time-updated': DASHPlaybackTimeUpdatedEvent;
    'dash-playback-volume-changed': DASHPlaybackVolumeChangedEvent;
    'dash-playback-waiting': DASHPlaybackWaitingEvent;
    'dash-manifest-validity-changed': DASHManifestValidityChangedEvent;
    'dash-event-mode-on-start': DASHEventModeOnStartEvent;
    'dash-event-mode-on-receive': DASHEventModeOnReceiveEvent;
    'dash-conformance-violation': DASHConformanceViolationEvent;
    'dash-representation-switch': DASHRepresentationSwitchEvent;
    'dash-adaptation-set-removed-no-capabilities': DASHAdaptationSetRemovedNoCapabilitiesEvent;
    'dash-content-steering-request-completed': DASHContentSteeringRequestCompletedEvent;
    'dash-inband-prft': DASHInbandPrftEvent;
    'dash-managed-media-source-start-streaming': DASHManagedMediaSourceStartStreamingEvent;
    'dash-managed-media-source-end-streaming': DASHManagedMediaSourceEndStreamingEvent;
}
interface DASHMediaEvent<DetailType = unknown> extends DOMEvent<DetailType> {
    target: MediaPlayer;
}
/**
 * Fired when the browser begins downloading the `dash.js` library.
 */
interface DASHLibLoadStartEvent extends DASHMediaEvent<void> {
}
/**
 * Fired when the `dash.js` library has been loaded.
 *
 * @detail constructor
 */
interface DASHLibLoadedEvent extends DASHMediaEvent<typeof DASH__default.MediaPlayer> {
}
/**
 * Fired when the `dash.js` library fails during the download process.
 *
 * @detail error
 */
interface DASHLibLoadErrorEvent extends DASHMediaEvent<Error> {
}
/**
 * Fired when the `dash.js` instance is built. This will not fire if the browser does not
 * support `DASH.js`.
 *
 * @detail instance
 */
interface DASHInstanceEvent extends DASHMediaEvent<DASH__default.MediaPlayerClass> {
}
/**
 * Fired when the browser doesn't support DASH natively, _and_ `dash.js` doesn't support
 * this environment either, most likely due to missing Media Extensions or video codecs.
 */
interface DASHUnsupportedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when playback will not start yet as the MPD's `availabilityStartTime` is in the future.
 * Check delay property in payload to determine time before playback will start.
 *
 * @detail data
 */
interface DASHAstInFutureEvent extends DASHMediaEvent<DASH__default.AstInFutureEvent> {
}
/**
 * Triggered when the `BaseURL` have been updated.
 */
interface DASHBaseUrlsUpdatedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when the video element's buffer state changes to `stalled`. Check `mediaType` in
 * payload to determine type (Video, Audio, FragmentedText).
 */
interface DASHBufferStalledEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when the video element's buffer state changes to `loaded`. Check `mediaType` in payload
 * to determine type (Video, Audio, FragmentedText).
 *
 * @detail data
 */
interface DASHBufferLoadedEvent extends DASHMediaEvent<DASH__default.BufferEvent> {
}
/**
 * Triggered when the video element's buffer state changes, either stalled or loaded. Check
 * payload for state.
 *
 * @detail data
 */
interface DASHBufferStateChangedEvent extends DASHMediaEvent<DASH__default.BufferStateChangedEvent> {
}
/**
 * Triggered when the buffer level of a media type has been updated.
 */
interface DASHBufferLevelUpdatedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a font signalled by a DVB Font Download has been added to the document `ntFaceSet`
 * interface.
 *
 * @detail data
 */
interface DASHDvbFontDownloadAddedEvent extends DASHMediaEvent<DASH__default.dvbFontDownloadAdded> {
}
/**
 * Triggered when a font signalled by a DVB Font Download has successfully downloaded and the
 * `ntFace` can be used.
 *
 * @detail data
 */
interface DASHDvbFontDownloadCompleteEvent extends DASHMediaEvent<DASH__default.dvbFontDownloadComplete> {
}
/**
 * Triggered when a font signalled by a DVB Font Download could not be successfully downloaded, so
 * the `FontFace` will not be used.
 *
 * @detail data
 */
interface DASHDvbFontDownloadFailedEvent extends DASHMediaEvent<DASH__default.dvbFontDownloadFailed> {
}
/**
 * Triggered when a dynamic stream changed to static (transition phase between Live and -Demand).
 *
 * @detail data
 */
interface DASHDynamicToStaticEvent extends DASHMediaEvent<DASH__default.DynamicToStaticEvent> {
}
/**
 * Triggered when there is an error from the element or MSE source buffer.
 *
 * @detail error
 */
interface DASHErrorEvent extends DASHMediaEvent<DASH__default.ErrorEvent> {
}
/**
 * Triggered when a fragment download has completed.
 *
 * @detail data
 */
interface DASHFragmentLoadingCompletedEvent extends DASHMediaEvent<DASH__default.FragmentLoadingCompletedEvent> {
}
/**
 * Triggered when a partial fragment download has completed.
 */
interface DASHFragmentLoadingProgressEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a fragment download has started.
 */
interface DASHFragmentLoadingStartedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a fragment download is abandoned due to detection of slow download base on e
 * ABR abandon rule.
 *
 * @detail data
 */
interface DASHFragmentLoadingAbandonedEvent extends DASHMediaEvent<DASH__default.FragmentLoadingAbandonedEvent> {
}
/**
 * Triggered when Debug logger methods are called.
 *
 * @detail data
 */
interface DASHLogEvent extends DASHMediaEvent<DASH__default.LogEvent> {
}
/**
 * Triggered when the manifest load has started.
 */
interface DASHManifestLoadingStartedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when the manifest loading is finished, providing the request object information.
 */
interface DASHManifestLoadingFinishedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when the manifest load is complete, providing the payload.
 *
 * @detail data
 */
interface DASHManifestLoadedEvent extends DASHMediaEvent<DASH__default.ManifestLoadedEvent> {
}
/**
 * Triggered anytime there is a change to the overall metrics.
 */
interface DASHMetricsChangedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when an individual metric is added, updated or cleared.
 *
 * @detail data
 */
interface DASHMetricChangedEvent extends DASHMediaEvent<DASH__default.MetricChangedEvent> {
}
/**
 * Triggered every time a new metric is added.
 *
 * @detail data
 */
interface DASHMetricAddedEvent extends DASHMediaEvent<DASH__default.MetricEvent> {
}
/**
 * Triggered every time a metric is updated.
 *
 * @detail data
 */
interface DASHMetricUpdatedEvent extends DASHMediaEvent<DASH__default.MetricEvent> {
}
/**
 * Triggered when a new stream (period) starts.
 *
 * @detail data
 */
interface DASHPeriodSwitchStartedEvent extends DASHMediaEvent<DASH__default.PeriodSwitchEvent> {
}
/**
 * Triggered at the stream end of a period.
 *
 * @detail data
 */
interface DASHPeriodSwitchCompletedEvent extends DASHMediaEvent<DASH__default.PeriodSwitchEvent> {
}
/**
 * Triggered when an ABR up /down switch is initiated; either by user in manual mode or auto de via
 * ABR rules.
 *
 * @detail data
 */
interface DASHQualityChangeRequestedEvent extends DASHMediaEvent<DASH__default.QualityChangeRequestedEvent> {
}
/**
 * Triggered when the new ABR quality is being rendered on-screen.
 *
 * @detail data
 */
interface DASHQualityChangeRenderedEvent extends DASHMediaEvent<DASH__default.QualityChangeRenderedEvent> {
}
/**
 * Triggered when the new track is being rendered.
 *
 * @detail data
 */
interface DASHTrackChangeRenderedEvent extends DASHMediaEvent<DASH__default.TrackChangeRenderedEvent> {
}
/**
 * Triggered when a stream (period) is being loaded.
 */
interface DASHStreamInitializingEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a stream (period) is loaded.
 */
interface DASHStreamUpdatedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a stream (period) is activated.
 */
interface DASHStreamActivatedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a stream (period) is deactivated
 */
interface DASHStreamDeactivatedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a stream (period) is activated.
 *
 * @detail data
 */
interface DASHStreamInitializedEvent extends DASHMediaEvent<DASH__default.StreamInitializedEvent> {
}
/**
 * Triggered when the player has been reset.
 */
interface DASHStreamTeardownCompleteEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered once all text tracks detected in the MPD are added to the video element.
 *
 * @detail data
 */
interface DASHAllTextTracksAddedEvent extends DASHMediaEvent<DASH__default.TextTracksAddedEvent> {
}
/**
 * Triggered when a text track is added to the video element's `TextTrackList`.
 *
 * @detail data
 */
interface DASHTextTrackAddedEvent extends DASHMediaEvent<DASH__default.TextTracksAddedEvent> {
}
/**
 * Triggered when a text track should be shown.
 *
 * @detail data
 */
interface DASHCueEnterEvent extends DASHMediaEvent<DASH__default.CueEnterEvent> {
}
/**
 * Triggered when a text track should be hidden.
 *
 * @detail data
 */
interface DASHCueExitEvent extends DASHMediaEvent<DASH__default.CueExitEvent> {
}
/**
 * Triggered when a throughput measurement based on the last segment request has been stored.
 *
 * @detail data
 */
interface DASHThroughputMeasurementStoredEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when a `ttml` chunk is parsed.
 *
 * @detail data
 */
interface DASHTtmlParsedEvent extends DASHMediaEvent<DASH__default.TtmlParsedEvent> {
}
/**
 * Triggered when a `ttml` chunk has to be parsed.
 *
 * @detail data
 */
interface DASHTtmlToParseEvent extends DASHMediaEvent<DASH__default.TtmlToParseEvent> {
}
/**
 * Triggered when a caption is rendered.
 *
 * @detail data
 */
interface DASHCaptionRenderedEvent extends DASHMediaEvent<DASH__default.CaptionRenderedEvent> {
}
/**
 * Triggered when the caption container is resized.
 *
 * @detail data
 */
interface DASHCaptionContainerResizeEvent extends DASHMediaEvent<DASH__default.CaptionContainerResizeEvent> {
}
/**
 * Sent when enough data is available that the media can be played, at least for a couple of
 * frames. This corresponds to the `HAVE_ENOUGH_DATA` `readyState`.
 */
interface DASHCanPlayEvent extends DASHMediaEvent<void> {
}
/**
 * This corresponds to the `CAN_PLAY_THROUGH` `readyState`.
 */
interface DASHCanPlayThroughEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when playback completes.
 */
interface DASHPlaybackEndedEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when an error occurs.  The element's error attribute contains more information.
 *
 * @detail data
 */
interface DASHPlaybackErrorEvent extends DASHMediaEvent<DASH__default.PlaybackErrorEvent> {
}
/**
 * Sent when playback is not allowed (for example if user gesture is needed).
 */
interface DASHPlaybackNotAllowedEvent extends DASHMediaEvent<void> {
}
/**
 * The media's metadata has finished loading; all attributes now contain as much useful
 * information as they're going to.
 */
interface DASHPlaybackMetaDataLoadedEvent extends DASHMediaEvent<void> {
}
/**
 * The event is fired when the frame at the current playback position of the media has finished
 * loading; often the first frame.
 */
interface DASHPlaybackLoadedDataEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when playback is paused.
 *
 * @detail data
 */
interface DASHPlaybackPausedEvent extends DASHMediaEvent<DASH__default.PlaybackPausedEvent> {
}
/**
 * Sent when the media begins to play (either for the first time, after having been paused,
 * or after ending and then restarting).
 *
 * @detail data
 */
interface DASHPlaybackPlayingEvent extends DASHMediaEvent<DASH__default.PlaybackPlayingEvent> {
}
/**
 * Sent periodically to inform interested parties of progress downloading the media. Information
 * about the current amount of the media that has been downloaded is available in the media
 * element's buffered attribute.
 */
interface DASHPlaybackProgressEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when the playback speed changes.
 *
 * @detail data
 */
interface DASHPlaybackRateChangedEvent extends DASHMediaEvent<DASH__default.PlaybackRateChangedEvent> {
}
/**
 * Sent when a seek operation completes.
 */
interface DASHPlaybackSeekedEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when a seek operation begins.
 *
 * @detail data
 */
interface DASHPlaybackSeekingEvent extends DASHMediaEvent<DASH__default.PlaybackSeekingEvent> {
}
/**
 * Sent when the video element reports stalled.
 */
interface DASHPlaybackStalledEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when playback of the media starts after having been paused; that is, when playback is
 * resumed after a prior pause event.
 *
 * @detail data
 */
interface DASHPlaybackStartedEvent extends DASHMediaEvent<DASH__default.PlaybackStartedEvent> {
}
/**
 * The time indicated by the element's currentTime attribute has changed.
 *
 * @detail data
 */
interface DASHPlaybackTimeUpdatedEvent extends DASHMediaEvent<DASH__default.PlaybackTimeUpdatedEvent> {
}
/**
 * Sent when the video element reports that the volume has changed.
 */
interface DASHPlaybackVolumeChangedEvent extends DASHMediaEvent<void> {
}
/**
 * Sent when the media playback has stopped because of a temporary lack of data.
 *
 * @detail data
 */
interface DASHPlaybackWaitingEvent extends DASHMediaEvent<DASH__default.PlaybackWaitingEvent> {
}
/**
 * Manifest validity changed - As a result of an MPD validity expiration event.
 */
interface DASHManifestValidityChangedEvent extends DASHMediaEvent<void> {
}
/**
 * Dash events are triggered at their respective start points on the timeline.
 */
interface DASHEventModeOnStartEvent extends DASHMediaEvent<void> {
}
/**
 * Dash events are triggered as soon as they were parsed.
 */
interface DASHEventModeOnReceiveEvent extends DASHMediaEvent<void> {
}
/**
 * Event that is dispatched whenever the player encounters a potential conformance validation at
 * might lead to unexpected/not optimal behavior.
 */
interface DASHConformanceViolationEvent extends DASHMediaEvent<void> {
}
/**
 * Event that is dispatched whenever the player switches to a different representation.
 */
interface DASHRepresentationSwitchEvent extends DASHMediaEvent<void> {
}
/**
 * Event that is dispatched whenever an adaptation set is removed due to all representations to
 * being supported.
 *
 * @detail data
 */
interface DASHAdaptationSetRemovedNoCapabilitiesEvent extends DASHMediaEvent<DASH__default.AdaptationSetRemovedNoCapabilitiesEvent> {
}
/**
 * Triggered when a content steering request has completed.
 */
interface DASHContentSteeringRequestCompletedEvent extends DASHMediaEvent<void> {
}
/**
 * Triggered when an inband prft (ProducerReferenceTime) boxes has been received.
 *
 * @detail data
 */
interface DASHInbandPrftEvent extends DASHMediaEvent<DASH__default.InbandPrftReceivedEvent> {
}
/**
 * The streaming attribute of the Managed Media Source is `true`.
 */
interface DASHManagedMediaSourceStartStreamingEvent extends DASHMediaEvent<void> {
}
/**
 * The streaming attribute of the Managed Media Source is `false`.
 */
interface DASHManagedMediaSourceEndStreamingEvent extends DASHMediaEvent<void> {
}

interface GoogleCastEvents {
    'google-cast-load-start': GoogleCastLoadStartEvent;
    'google-cast-loaded': GoogleCastLoadedEvent;
    'google-cast-prompt-open': GoogleCastPromptEvent;
    'google-cast-prompt-close': GoogleCastPromptEvent;
    'google-cast-prompt-error': GoogleCastPromptErrorEvent;
}
interface GoogleCastEvent<DetailType = unknown> extends DOMEvent<DetailType> {
    target: MediaPlayer;
}
/**
 * Fired when the Google Cast framework starts loading.
 */
interface GoogleCastLoadStartEvent extends GoogleCastEvent<void> {
}
/**
 * Fired when the Google Cast framework has loaded.
 */
interface GoogleCastLoadedEvent extends GoogleCastEvent<void> {
}
/**
 * Fired when the Google Cast prompt is opened/closed.
 */
interface GoogleCastPromptEvent extends GoogleCastEvent<void> {
}
interface GoogleCastPromptError extends Error {
    code: GoogleCastPromptErrorCode;
}
type GoogleCastPromptErrorCode = 'CAST_NOT_AVAILABLE' | 'CANCEL' | 'TIMEOUT' | 'API_NOT_INITIALIZED' | 'INVALID_PARAMETER' | 'EXTENSION_NOT_COMPATIBLE' | 'EXTENSION_MISSING' | 'RECEIVER_UNAVAILABLE' | 'SESSION_ERROR' | 'CHANNEL_ERROR' | 'NO_DEVICES_AVAILABLE' | 'LOAD_MEDIA_FAILED';
/**
 * Fired when requesting Google Cast has failed.
 */
interface GoogleCastPromptErrorEvent extends GoogleCastEvent<GoogleCastPromptError> {
}

interface HLSProviderEvents {
    'hls-lib-load-start': HLSLibLoadStartEvent;
    'hls-lib-loaded': HLSLibLoadedEvent;
    'hls-lib-load-error': HLSLibLoadErrorEvent;
    'hls-instance': HLSInstanceEvent;
    'hls-unsupported': HLSUnsupportedEvent;
    'hls-media-attaching': HLSMediaAttachingEvent;
    'hls-media-attached': HLSMediaAttachedEvent;
    'hls-media-detaching': HLSMediaDetachingEvent;
    'hls-media-detached': HLSMediaDetachedEvent;
    'hls-buffer-reset': HLSBufferResetEvent;
    'hls-buffer-codecs': HLSBufferCodecsEvent;
    'hls-buffer-created': HLSBufferCreatedEvent;
    'hls-buffer-appending': HLSBufferAppendingEvent;
    'hls-buffer-appended': HLSBufferAppendedEvent;
    'hls-buffer-eos': HLSBufferEosEvent;
    'hls-buffer-flushing': HLSBufferFlushingEvent;
    'hls-buffer-flushed': HLSBufferFlushedEvent;
    'hls-manifest-loading': HLSManifestLoadingEvent;
    'hls-manifest-loaded': HLSManifestLoadedEvent;
    'hls-manifest-parsed': HLSManifestParsedEvent;
    'hls-level-switching': HLSLevelSwitchingEvent;
    'hls-level-switched': HLSLevelSwitchedEvent;
    'hls-level-loading': HLSLevelLoadingEvent;
    'hls-level-loaded': HLSLevelLoadedEvent;
    'hls-level-updated': HLSLevelUpdatedEvent;
    'hls-level-pts-updated': HLSLevelPtsUpdatedEvent;
    'hls-levels-updated': HLSLevelsUpdatedEvent;
    'hls-audio-tracks-updated': HLSAudioTracksUpdatedEvent;
    'hls-audio-track-switching': HLSAudioTrackSwitchingEvent;
    'hls-audio-track-switched': HLSAudioTrackSwitchedEvent;
    'hls-audio-track-loading': HLSAudioTrackLoadingEvent;
    'hls-audio-track-loaded': HLSAudioTrackLoadedEvent;
    'hls-subtitle-tracks-updated': HLSSubtitleTracksUpdatedEvent;
    'hls-subtitle-tracks-cleared': HLSSubtitleTracksClearedEvent;
    'hls-subtitle-track-switch': HLSSubtitleTrackSwitchEvent;
    'hls-subtitle-track-loading': HLSSubtitleTrackLoadingEvent;
    'hls-subtitle-track-loaded': HLSSubtitleTrackLoadedEvent;
    'hls-subtitle-frag-processed': HLSSubtitleFragProcessedEvent;
    'hls-cues-parsed': HLSCuesParsedEvent;
    'hls-non-native-text-tracks-found': HLSNonNativeTextTracksFoundEvent;
    'hls-init-pts-found': HLSInitPtsFoundEvent;
    'hls-frag-loading': HLSFragLoadingEvent;
    'hls-frag-load-emergency-aborted': HLSFragLoadEmergencyAbortedEvent;
    'hls-frag-loaded': HLSFragLoadedEvent;
    'hls-frag-decrypted': HLSFragDecryptedEvent;
    'hls-frag-parsing-init-segment': HLSFragParsingInitSegmentEvent;
    'hls-frag-parsing-userdata': HLSFragParsingUserdataEvent;
    'hls-frag-parsing-metadata': HLSFragParsingMetadataEvent;
    'hls-frag-parsed': HLSFragParsedEvent;
    'hls-frag-buffered-data': HLSFragBufferedDataEvent;
    'hls-frag-changed': HLSFragChangedEvent;
    'hls-fps-drop': HLSFpsDropEvent;
    'hls-fps-drop-level-capping': HLSFpsDropLevelCappingEvent;
    'hls-error': HLSErrorEvent;
    'hls-destroying': HLSDestroyingEvent;
    'hls-key-loading': HLSKeyLoadingEvent;
    'hls-key-loaded': HLSKeyLoadedEvent;
    'hls-back-buffer-reached': HLSBackBufferReachedEvent;
}
interface HLSMediaEvent<DetailType = unknown> extends DOMEvent<DetailType> {
    target: MediaPlayer;
}
/**
 * Fired when the browser begins downloading the `hls.js` library.
 */
interface HLSLibLoadStartEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when the `hls.js` library has been loaded.
 *
 * @detail constructor
 */
interface HLSLibLoadedEvent extends HLSMediaEvent<typeof HLS.default> {
}
/**
 * Fired when the `hls.js` library fails during the download process.
 *
 * @detail error
 */
interface HLSLibLoadErrorEvent extends HLSMediaEvent<Error> {
}
/**
 * Fired when the `hls.js` instance is built. This will not fire if the browser does not
 * support `hls.js`.
 *
 * @detail instance
 */
interface HLSInstanceEvent extends HLSMediaEvent<HLS.default> {
}
/**
 * Fired when the browser doesn't support HLS natively, _and_ `hls.js` doesn't support
 * this environment either, most likely due to missing Media Extensions or video codecs.
 */
interface HLSUnsupportedEvent extends HLSMediaEvent<void> {
}
/**
 * Fired before `MediaSource` begins attaching to the media element.
 *
 * @detail data
 */
interface HLSMediaAttachingEvent extends HLSMediaEvent<HLS.MediaAttachingData> {
}
/**
 * Fired when `MediaSource` has been successfully attached to the media element.
 *
 * @detail data
 */
interface HLSMediaAttachedEvent extends HLSMediaEvent<HLS.MediaAttachedData> {
}
/**
 * Fired before detaching `MediaSource` from the media element.
 */
interface HLSMediaDetachingEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when `MediaSource` has been detached from media element.
 */
interface HLSMediaDetachedEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when we buffer is going to be reset.
 */
interface HLSBufferResetEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when we know about the codecs that we need buffers for to push into.
 *
 * @detail data
 */
interface HLSBufferCodecsEvent extends HLSMediaEvent<HLS.BufferCodecsData> {
}
/**
 * Fired when `SourceBuffer`'s have been created.
 *
 * @detail data
 */
interface HLSBufferCreatedEvent extends HLSMediaEvent<HLS.BufferCreatedData> {
}
/**
 * Fired when we begin appending a media segment to the buffer.
 *
 * @detail data
 */
interface HLSBufferAppendingEvent extends HLSMediaEvent<HLS.BufferAppendingData> {
}
/**
 * Fired when we are done with appending a media segment to the buffer.
 *
 * @detail data
 */
interface HLSBufferAppendedEvent extends HLSMediaEvent<HLS.BufferAppendedData> {
}
/**
 * Fired when the stream is finished and we want to notify the media buffer that there will be no
 * more data.
 *
 * @detail data
 */
interface HLSBufferEosEvent extends HLSMediaEvent<HLS.BufferEOSData> {
}
/**
 * Fired when the media buffer should be flushed.
 *
 * @detail data
 */
interface HLSBufferFlushingEvent extends HLSMediaEvent<HLS.BufferFlushingData> {
}
/**
 * Fired when the media buffer has been flushed.
 *
 * @detail data
 */
interface HLSBufferFlushedEvent extends HLSMediaEvent<HLS.BufferFlushedData> {
}
/**
 * Fired to signal that manifest loading is starting.
 *
 * @detail data
 */
interface HLSManifestLoadingEvent extends HLSMediaEvent<HLS.ManifestLoadingData> {
}
/**
 * Fired after the manifest has been loaded.
 *
 * @detail data
 */
interface HLSManifestLoadedEvent extends HLSMediaEvent<HLS.ManifestLoadedData> {
}
/**
 * Fired after manifest has been parsed.
 *
 * @detail data
 */
interface HLSManifestParsedEvent extends HLSMediaEvent<HLS.ManifestParsedData> {
}
/**
 * Fired when a level switch is requested.
 *
 * @detail data
 */
interface HLSLevelSwitchingEvent extends HLSMediaEvent<HLS.LevelSwitchingData> {
}
/**
 * Fired when a level switch is effective.
 *
 * @detail data
 */
interface HLSLevelSwitchedEvent extends HLSMediaEvent<HLS.LevelSwitchedData> {
}
/**
 * Fired when a level playlist loading starts.
 *
 * @detail data
 */
interface HLSLevelLoadingEvent extends HLSMediaEvent<HLS.LevelLoadingData> {
}
/**
 * Fired when a level playlist loading finishes.
 *
 * @detail data
 */
interface HLSLevelLoadedEvent extends HLSMediaEvent<HLS.LevelLoadedData> {
}
/**
 * Fired when a level's details have been updated based on previous details, after it has been
 * loaded.
 *
 * @detail data
 */
interface HLSLevelUpdatedEvent extends HLSMediaEvent<HLS.LevelUpdatedData> {
}
/**
 * Fired when a level's PTS information has been updated after parsing a fragment.
 *
 * @detail data
 */
interface HLSLevelPtsUpdatedEvent extends HLSMediaEvent<HLS.LevelPTSUpdatedData> {
}
/**
 * Fired when a level is removed after calling `removeLevel()`.
 *
 * @detail data
 */
interface HLSLevelsUpdatedEvent extends HLSMediaEvent<HLS.LevelsUpdatedData> {
}
/**
 * Fired to notify that the audio track list has been updated.
 *
 * @detail data
 */
interface HLSAudioTracksUpdatedEvent extends HLSMediaEvent<HLS.AudioTracksUpdatedData> {
}
/**
 * Fired when an audio track switching is requested.
 *
 * @detail data
 */
interface HLSAudioTrackSwitchingEvent extends HLSMediaEvent<HLS.AudioTrackSwitchingData> {
}
/**
 * Fired when an audio track switch actually occurs.
 *
 * @detail data
 */
interface HLSAudioTrackSwitchedEvent extends HLSMediaEvent<HLS.AudioTrackSwitchedData> {
}
/**
 * Fired when loading an audio track starts.
 *
 * @detail data
 */
interface HLSAudioTrackLoadingEvent extends HLSMediaEvent<HLS.TrackLoadingData> {
}
/**
 * Fired when loading an audio track finishes.
 *
 * @detail data
 */
interface HLSAudioTrackLoadedEvent extends HLSMediaEvent<HLS.AudioTrackLoadedData> {
}
/**
 * Fired to notify that the subtitle track list has been updated.
 *
 * @detail data
 */
interface HLSSubtitleTracksUpdatedEvent extends HLSMediaEvent<HLS.SubtitleTracksUpdatedData> {
}
/**
 * Fired to notify that subtitle tracks were cleared as a result of stopping the media.
 */
interface HLSSubtitleTracksClearedEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when a subtitle track switch occurs.
 *
 * @detail data
 */
interface HLSSubtitleTrackSwitchEvent extends HLSMediaEvent<HLS.SubtitleTrackSwitchData> {
}
/**
 * Fired when loading a subtitle track starts.
 *
 * @detail data
 */
interface HLSSubtitleTrackLoadingEvent extends HLSMediaEvent<HLS.TrackLoadingData> {
}
/**
 * Fired when loading a subtitle track finishes.
 *
 * @detail data
 */
interface HLSSubtitleTrackLoadedEvent extends HLSMediaEvent<HLS.SubtitleTrackLoadedData> {
}
/**
 * Fired when a subtitle fragment has been processed.
 *
 * @detail data
 */
interface HLSSubtitleFragProcessedEvent extends HLSMediaEvent<HLS.SubtitleFragProcessedData> {
}
/**
 * Fired when a set of `VTTCue`'s to be managed externally has been parsed.
 *
 * @detail data
 */
interface HLSCuesParsedEvent extends HLSMediaEvent<HLS.CuesParsedData> {
}
/**
 * Fired when a text track to be managed externally is found.
 *
 * @detail data
 */
interface HLSNonNativeTextTracksFoundEvent extends HLSMediaEvent<HLS.NonNativeTextTracksData> {
}
/**
 * Fired when the first timestamp is found.
 *
 * @detail data
 */
interface HLSInitPtsFoundEvent extends HLSMediaEvent<HLS.InitPTSFoundData> {
}
/**
 * Fired when loading a fragment starts.
 *
 * @detail data
 */
interface HLSFragLoadingEvent extends HLSMediaEvent<HLS.FragLoadingData> {
}
/**
 * Fired when fragment loading is aborted for emergency switch down.
 *
 * @detail data
 */
interface HLSFragLoadEmergencyAbortedEvent extends HLSMediaEvent<HLS.FragLoadEmergencyAbortedData> {
}
/**
 * Fired when fragment loading is completed.
 *
 * @detail data
 */
interface HLSFragLoadedEvent extends HLSMediaEvent<HLS.FragLoadedData> {
}
/**
 * Fired when a fragment has finished decrypting.
 *
 * @detail data
 */
interface HLSFragDecryptedEvent extends HLSMediaEvent<HLS.FragDecryptedData> {
}
/**
 * Fired when `InitSegment` has been extracted from a fragment.
 *
 * @detail data
 */
interface HLSFragParsingInitSegmentEvent extends HLSMediaEvent<HLS.FragParsingInitSegmentData> {
}
/**
 * Fired when parsing sei text is completed.
 *
 * @detail data
 */
interface HLSFragParsingUserdataEvent extends HLSMediaEvent<HLS.FragParsingUserdataData> {
}
/**
 * Fired when parsing id3 is completed.
 *
 * @detail data
 */
interface HLSFragParsingMetadataEvent extends HLSMediaEvent<HLS.FragParsingMetadataData> {
}
/**
 * Fired when fragment parsing is completed.
 *
 * @detail data
 */
interface HLSFragParsedEvent extends HLSMediaEvent<HLS.FragParsedData> {
}
/**
 * Fired when fragment remuxed MP4 boxes have all been appended into `SourceBuffer`.
 *
 * @detail data
 */
interface HLSFragBufferedDataEvent extends HLSMediaEvent<HLS.FragBufferedData> {
}
/**
 * Fired when fragment matching with current media position is changing.
 *
 * @detail data
 */
interface HLSFragChangedEvent extends HLSMediaEvent<HLS.FragChangedData> {
}
/**
 * Fired when a FPS drop is identified.
 *
 * @detail data
 */
interface HLSFpsDropEvent extends HLSMediaEvent<HLS.FPSDropData> {
}
/**
 * Fired when FPS drop triggers auto level capping.
 *
 * @detail data
 */
interface HLSFpsDropLevelCappingEvent extends HLSMediaEvent<HLS.FPSDropLevelCappingData> {
}
/**
 * Fired when an error has occurred during loading or playback.
 *
 * @detail data
 */
interface HLSErrorEvent extends HLSMediaEvent<HLS.ErrorData> {
}
/**
 * Fired when the `hls.js` instance is being destroyed. Different from `hls-media-detached` as
 * one could want to detach, and reattach media to the `hls.js` instance to handle mid-rolls.
 */
interface HLSDestroyingEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when a decrypt key loading starts.
 *
 * @detail data
 */
interface HLSKeyLoadingEvent extends HLSMediaEvent<HLS.KeyLoadingData> {
}
/**
 * Fired when a decrypt key has been loaded.
 *
 * @detail data
 */
interface HLSKeyLoadedEvent extends HLSMediaEvent<HLS.KeyLoadedData> {
}
/**
 * Fired when the back buffer is reached as defined by the `backBufferLength` config option.
 *
 * @detail data
 */
interface HLSBackBufferReachedEvent extends HLSMediaEvent<HLS.BackBufferData> {
}

type VideoPresentationEvents = {
    'video-presentation-change': VideoPresentationChangeEvent;
};
/**
 * Fired when the video presentation mode changes. Only available in Safari.
 *
 * @detail mode
 */
interface VideoPresentationChangeEvent extends DOMEvent<WebKitPresentationMode> {
}

interface MediaPlayerEvents extends MediaEvents, MediaRequestEvents, MediaUserEvents, LoggerEvents, VideoPresentationEvents, HLSProviderEvents, DASHProviderEvents, GoogleCastEvents {
    'media-player-connect': MediaPlayerConnectEvent;
    /** @internal */
    'find-media-player': FindMediaPlayerEvent;
    /** @internal */
    'vds-font-change': Event;
}
/**
 * Fired when the player element `<media-player>` connects to the DOM.
 *
 * @bubbles
 * @composed
 * @detail player
 */
interface MediaPlayerConnectEvent extends DOMEvent<MediaPlayer> {
}
interface FindMediaPlayerEventDetail {
    (player: MediaPlayer | null): void;
}
/**
 * @internal
 * @bubbles
 * @composed
 * @detail callback
 */
interface FindMediaPlayerEvent extends DOMEvent<FindMediaPlayerEventDetail> {
}
interface MediaUserEvents {
}

interface GoogleCastOptions extends Partial<cast.framework.CastOptions> {
}

/**
 * A simple facade for dispatching media requests to the nearest media player element.
 *
 * @docs {@link https://www.vidstack.io/docs/player/core-concepts/state-management#updating}
 *
 */
declare class MediaRemoteControl {
    #private;
    constructor(logger?: Logger | undefined);
    /**
     * Set the target from which to dispatch media requests events from. The events should bubble
     * up from this target to the player element.
     *
     * @example
     * ```ts
     * const button = document.querySelector('button');
     * remote.setTarget(button);
     * ```
     */
    setTarget(target: EventTarget | null): void;
    /**
     * Returns the current player element. This method will attempt to find the player by
     * searching up from either the given `target` or default target set via `remote.setTarget`.
     *
     * @example
     * ```ts
     * const player = remote.getPlayer();
     * ```
     */
    getPlayer(target?: EventTarget | null): MediaPlayer | null;
    /**
     * Set the current player element so the remote can support toggle methods such as
     * `togglePaused` as they rely on the current media state.
     */
    setPlayer(player: MediaPlayer | null): void;
    /**
     * Dispatch a request to start the media loading process. This will only work if the media
     * player has been initialized with a custom loading strategy `load="custom">`.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    startLoading(trigger?: Event): void;
    /**
     * Dispatch a request to start the poster loading process. This will only work if the media
     * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    startLoadingPoster(trigger?: Event): void;
    /**
     * Dispatch a request to connect to AirPlay.
     *
     * @see {@link https://www.apple.com/au/airplay}
     */
    requestAirPlay(trigger?: Event): void;
    /**
     * Dispatch a request to connect to Google Cast.
     *
     * @see {@link https://developers.google.com/cast/docs/overview}
     */
    requestGoogleCast(trigger?: Event): void;
    /**
     * Dispatch a request to begin/resume media playback.
     */
    play(trigger?: Event): void;
    /**
     * Dispatch a request to pause media playback.
     */
    pause(trigger?: Event): void;
    /**
     * Dispatch a request to set the media volume to mute (0).
     */
    mute(trigger?: Event): void;
    /**
     * Dispatch a request to unmute the media volume and set it back to it's previous state.
     */
    unmute(trigger?: Event): void;
    /**
     * Dispatch a request to enter fullscreen.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
     */
    enterFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): void;
    /**
     * Dispatch a request to exit fullscreen.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
     */
    exitFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): void;
    /**
     * Dispatch a request to lock the screen orientation.
     *
     * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
     */
    lockScreenOrientation(lockType: ScreenOrientationLockType, trigger?: Event): void;
    /**
     * Dispatch a request to unlock the screen orientation.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
     */
    unlockScreenOrientation(trigger?: Event): void;
    /**
     * Dispatch a request to enter picture-in-picture mode.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
     */
    enterPictureInPicture(trigger?: Event): void;
    /**
     * Dispatch a request to exit picture-in-picture mode.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
     */
    exitPictureInPicture(trigger?: Event): void;
    /**
     * Notify the media player that a seeking process is happening and to seek to the given `time`.
     */
    seeking(time: number, trigger?: Event): void;
    /**
     * Notify the media player that a seeking operation has completed and to seek to the given `time`.
     * This is generally called after a series of `remote.seeking()` calls.
     */
    seek(time: number, trigger?: Event): void;
    seekToLiveEdge(trigger?: Event): void;
    /**
     * Dispatch a request to update the length of the media in seconds.
     *
     * @example
     * ```ts
     * remote.changeDuration(100); // 100 seconds
     * ```
     */
    changeDuration(duration: number, trigger?: Event): void;
    /**
     * Dispatch a request to update the clip start time. This is the time at which media playback
     * should start at.
     *
     * @example
     * ```ts
     * remote.changeClipStart(100); // start at 100 seconds
     * ```
     */
    changeClipStart(startTime: number, trigger?: Event): void;
    /**
     * Dispatch a request to update the clip end time. This is the time at which media playback
     * should end at.
     *
     * @example
     * ```ts
     * remote.changeClipEnd(100); // end at 100 seconds
     * ```
     */
    changeClipEnd(endTime: number, trigger?: Event): void;
    /**
     * Dispatch a request to update the media volume to the given `volume` level which is a value
     * between 0 and 1.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/audio-gain#remote-control}
     * @example
     * ```ts
     * remote.changeVolume(0); // 0%
     * remote.changeVolume(0.05); // 5%
     * remote.changeVolume(0.5); // 50%
     * remote.changeVolume(0.75); // 70%
     * remote.changeVolume(1); // 100%
     * ```
     */
    changeVolume(volume: number, trigger?: Event): void;
    /**
     * Dispatch a request to change the current audio track.
     *
     * @example
     * ```ts
     * remote.changeAudioTrack(1); // track at index 1
     * ```
     */
    changeAudioTrack(index: number, trigger?: Event): void;
    /**
     * Dispatch a request to change the video quality. The special value `-1` represents auto quality
     * selection.
     *
     * @example
     * ```ts
     * remote.changeQuality(-1); // auto
     * remote.changeQuality(1); // quality at index 1
     * ```
     */
    changeQuality(index: number, trigger?: Event): void;
    /**
     * Request auto quality selection.
     */
    requestAutoQuality(trigger?: Event): void;
    /**
     * Dispatch a request to change the mode of the text track at the given index.
     *
     * @example
     * ```ts
     * remote.changeTextTrackMode(1, 'showing'); // track at index 1
     * ```
     */
    changeTextTrackMode(index: number, mode: TextTrackMode, trigger?: Event): void;
    /**
     * Dispatch a request to change the media playback rate.
     *
     * @example
     * ```ts
     * remote.changePlaybackRate(0.5); // Half the normal speed
     * remote.changePlaybackRate(1); // Normal speed
     * remote.changePlaybackRate(1.5); // 50% faster than normal
     * remote.changePlaybackRate(2); // Double the normal speed
     * ```
     */
    changePlaybackRate(rate: number, trigger?: Event): void;
    /**
     * Dispatch a request to change the media audio gain.
     *
     * @example
     * ```ts
     * remote.changeAudioGain(1); // Disable audio gain
     * remote.changeAudioGain(1.5); // 50% louder
     * remote.changeAudioGain(2); // 100% louder
     * ```
     */
    changeAudioGain(gain: number, trigger?: Event): void;
    /**
     * Dispatch a request to resume idle tracking on controls.
     */
    resumeControls(trigger?: Event): void;
    /**
     * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
     * controls being visible until `remote.resumeControls()` is called. This method
     * is generally used when building custom controls and you'd like to prevent the UI from
     * disappearing.
     *
     * @example
     * ```ts
     * // Prevent controls hiding while menu is being interacted with.
     * function onSettingsOpen() {
     *   remote.pauseControls();
     * }
     *
     * function onSettingsClose() {
     *   remote.resumeControls();
     * }
     * ```
     */
    pauseControls(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media playback state.
     */
    togglePaused(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the controls visibility.
     */
    toggleControls(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media muted state.
     */
    toggleMuted(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media fullscreen state.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
     */
    toggleFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media picture-in-picture mode.
     *
     * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
     */
    togglePictureInPicture(trigger?: Event): void;
    /**
     * Show captions.
     */
    showCaptions(trigger?: Event): void;
    /**
     * Turn captions off.
     */
    disableCaptions(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the current captions mode.
     */
    toggleCaptions(trigger?: Event): void;
    userPrefersLoopChange(prefersLoop: boolean, trigger?: Event): void;
}

type MediaKeyTarget = 'document' | 'player';
interface MediaKeyShortcuts {
    [keys: string]: MediaKeyShortcut | undefined;
    togglePaused?: MediaKeyShortcut;
    toggleMuted?: MediaKeyShortcut;
    toggleFullscreen?: MediaKeyShortcut;
    togglePictureInPicture?: MediaKeyShortcut;
    toggleCaptions?: MediaKeyShortcut;
    seekBackward?: MediaKeyShortcut;
    seekForward?: MediaKeyShortcut;
    speedUp?: MediaKeyShortcut;
    slowDown?: MediaKeyShortcut;
    volumeUp?: MediaKeyShortcut;
    volumeDown?: MediaKeyShortcut;
}
type MediaKeyShortcut = MediaKeysCallback | string | string[] | null;
interface MediaKeysCallback {
    keys: string | string[];
    /** @deprecated - use `onKeyUp` or `onKeyDown` */
    callback?(event: KeyboardEvent, remote: MediaRemoteControl): void;
    onKeyUp?(context: {
        event: KeyboardEvent;
        player: MediaPlayer;
        remote: MediaRemoteControl;
    }): void;
    onKeyDown?(context: {
        event: KeyboardEvent;
        player: MediaPlayer;
        remote: MediaRemoteControl;
    }): void;
}

type MediaSrc = string | AudioSrc | VideoSrc | HLSSrc | DASHSrc | YouTubeSrc | VimeoSrc;
type MediaSrcObject = MediaStream | MediaSource | Blob;
type HTMLMediaSrc = string | MediaSrcObject;
interface Src<T = unknown> {
    src: T;
    type: string;
}
interface AudioSrc extends AudioSrcMeta {
    src: HTMLMediaSrc;
    type: AudioMimeType;
}
type AudioMimeType = 'audio/mpeg' | 'audio/ogg' | 'audio/3gp' | 'audio/mp3' | 'audio/webm' | 'audio/flac' | 'audio/object';
interface AudioSrcMeta {
    id?: string;
    bitrate?: number;
    channels?: number;
}
interface VideoSrc extends VideoSrcMeta {
    src: HTMLMediaSrc;
    type: VideoMimeType;
}
type VideoMimeType = 'video/mp4' | 'video/webm' | 'video/3gp' | 'video/ogg' | 'video/avi' | 'video/mpeg' | 'video/object';
interface VideoSrcMeta {
    id?: string;
    width?: number;
    height?: number;
    bitrate?: number;
    framerate?: number;
    codec?: string;
}
interface HLSSrc {
    src: string;
    type: HLSMimeType;
}
type HLSMimeType = 'application/vnd.apple.mpegurl' | 'audio/mpegurl' | 'audio/x-mpegurl' | 'application/x-mpegurl' | 'video/x-mpegurl' | 'video/mpegurl' | 'application/mpegurl';
interface DASHSrc {
    src: string;
    type: DASHMimeType;
}
type DASHMimeType = 'application/dash+xml';
interface YouTubeSrc {
    src: string;
    type: 'video/youtube';
}
interface VimeoSrc {
    src: string;
    type: 'video/vimeo';
}
declare function isVideoQualitySrc(src: Src): src is SetRequired<VideoSrc, 'width' | 'height'>;

interface MediaStorage {
    getVolume(): Promise<number | null>;
    setVolume?(volume: number): Promise<void>;
    getMuted(): Promise<boolean | null>;
    setMuted?(muted: boolean): Promise<void>;
    getTime(): Promise<number | null>;
    setTime?(time: number, ended?: boolean): Promise<void>;
    getLang(): Promise<string | null>;
    setLang?(lang: string | null): Promise<void>;
    getCaptions(): Promise<boolean | null>;
    setCaptions?(captions: boolean): Promise<void>;
    getPlaybackRate(): Promise<number | null>;
    setPlaybackRate?(rate: number): Promise<void>;
    getVideoQuality(): Promise<SerializedVideoQuality | null>;
    setVideoQuality?(quality: SerializedVideoQuality | null): Promise<void>;
    getAudioGain(): Promise<number | null>;
    setAudioGain?(gain: number | null): Promise<void>;
    /**
     * Called when media is ready for playback and new data can be loaded.
     */
    onLoad?(src: Src): void | Promise<void>;
    /**
     * Called when the `mediaId` has changed. This method can return a function to be called
     * before the next change.
     *
     * - The `mediaId` is computed from the current source and clip times. It will be `null` if
     * there is no source.
     *
     * - The `playerId` is the string provided to the player `storage` prop (if set), or the `id`
     *   set on the player element, otherwise `undefined`.
     */
    onChange?(src: Src, mediaId: string | null, playerId?: string): MaybeStopEffect;
    /**
     * Called when storage is being destroyed either because the `storage` property on the player
     * has changed, or the player is being destroyed.
     */
    onDestroy?(): void;
}
interface SerializedVideoQuality {
    id: string;
    width: number;
    height: number;
    bitrate?: number | null;
}
declare class LocalMediaStorage implements MediaStorage {
    #private;
    protected playerId: string;
    protected mediaId: string | null;
    getVolume(): Promise<number | null>;
    setVolume(volume: number): Promise<void>;
    getMuted(): Promise<boolean | null>;
    setMuted(muted: boolean): Promise<void>;
    getTime(): Promise<number | null>;
    setTime(time: number, ended: boolean): Promise<void>;
    getLang(): Promise<string | null>;
    setLang(lang: string | null): Promise<void>;
    getCaptions(): Promise<boolean | null>;
    setCaptions(enabled: boolean): Promise<void>;
    getPlaybackRate(): Promise<number | null>;
    setPlaybackRate(rate: any): Promise<void>;
    getAudioGain(): Promise<number | null>;
    setAudioGain(gain: number | null): Promise<void>;
    getVideoQuality(): Promise<SerializedVideoQuality | null>;
    setVideoQuality(quality: SerializedVideoQuality | null): Promise<void>;
    onChange(src: Src, mediaId: string | null, playerId?: string): void;
    protected save(): void;
    protected saveTimeThrottled: (() => void) & {
        cancel: () => void;
        flush: () => void;
    };
    private saveTime;
}

interface SelectListItem extends ListItem {
    selected: boolean;
}
declare class SelectList<Item extends SelectListItem, Events extends SelectListEvents<Item>> extends List<Item, Events> {
    get selected(): Item | null;
    get selectedIndex(): number;
    /** @internal */
    protected [ListSymbol.onRemove](item: Item, trigger?: Event): void;
    /** @internal */
    protected [ListSymbol.onUserSelect]?(): void;
    /** @internal */
    [ListSymbol.add](item: Omit<Item, 'selected'>, trigger?: Event): void;
    /** @internal */
    [ListSymbol.select](item: Item | undefined, selected: boolean, trigger?: Event): void;
}
interface SelectListEvents<Item extends SelectListItem = SelectListItem> extends ListEvents<Item> {
    change: SelectListChangeEvent<Item>;
}
/**
 * @detail change
 */
interface SelectListChangeEvent<Item extends SelectListItem> extends DOMEvent<SelectListChangeEventDetail<Item>> {
}
interface SelectListChangeEventDetail<Item extends SelectListItem> {
    prev: Item | null;
    current: Item | null;
}

interface VideoQualityListEvents {
    add: VideoQualityAddEvent;
    remove: VideoQualityRemoveEvent;
    change: VideoQualityChangeEvent;
    'auto-change': VideoQualityAutoChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
interface VideoQualityListEvent<T> extends DOMEvent<T> {
    target: VideoQualityList;
}
/**
 * Fired when a video quality has been added to the list.
 *
 * @detail newQuality
 */
interface VideoQualityAddEvent extends VideoQualityListEvent<VideoQuality> {
}
/**
 * Fired when a video quality has been removed from the list.
 *
 * @detail removedQuality
 */
interface VideoQualityRemoveEvent extends VideoQualityListEvent<VideoQuality> {
}
/**
 * Fired when the selected video quality has changed.
 *
 * @detail change
 */
interface VideoQualityChangeEvent extends VideoQualityListEvent<VideoQualityChangeEventDetail> {
}
interface VideoQualityChangeEventDetail {
    prev: VideoQuality | null;
    current: VideoQuality;
}
/**
 * Fired when auto quality selection is enabled or disabled.
 */
interface VideoQualityAutoChangeEvent extends VideoQualityListEvent<boolean> {
}

declare const SET_AUTO: unique symbol;
declare const ENABLE_AUTO: unique symbol;
/** @internal */
declare const QualitySymbol: {
    readonly setAuto: typeof SET_AUTO;
    readonly enableAuto: typeof ENABLE_AUTO;
};

/**
 * @see {@link https://vidstack.io/docs/player/core-concepts/video-quality#quality-list}
 */
declare class VideoQualityList extends SelectList<VideoQuality, VideoQualityListEvents> {
    #private;
    /**
     * Configures quality switching:
     *
     * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
     * request if any, flush the whole buffer, and fetch fragment matching with current position
     * and requested quality level.
     *
     * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
     * already buffered next fragment.
     *
     * - `load`: Set quality level for next loaded fragment.
     *
     * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
     */
    switch: 'current' | 'next' | 'load';
    /**
     * Whether automatic quality selection is enabled.
     */
    get auto(): boolean;
    /** @internal */
    [QualitySymbol.enableAuto]?: (trigger?: Event) => void;
    /** @internal */
    protected [ListSymbol.onUserSelect](): void;
    /** @internal */
    protected [ListSymbol.onReset](trigger?: Event): void;
    /**
     * Request automatic quality selection (if supported). This will be a no-op if the list is
     * `readonly` as that already implies auto-selection.
     */
    autoSelect(trigger?: Event): void;
    getBySrc(src: unknown): VideoQuality | undefined;
    /** @internal */
    [QualitySymbol.setAuto](auto: boolean, trigger?: Event): void;
}
interface VideoQuality extends SelectListItem {
    readonly id: string;
    readonly src?: unknown;
    readonly width: number;
    readonly height: number;
    readonly bitrate: number | null;
    readonly codec: string | null;
}

declare class MediaPlayerDelegate {
    #private;
    constructor(handle: (event: Event) => void, media: MediaContext);
    notify<Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined | never ? [detail?: never, trigger?: Event] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event]): void;
    ready(info?: {
        duration: number;
        seekable: TimeRanges;
        buffered: TimeRanges;
    }, trigger?: Event): Promise<void>;
}

interface AudioTrackListEvents {
    add: AudioTrackAddEvent;
    remove: AudioTrackRemoveEvent;
    change: AudioTrackChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
interface AudioTrackListEvent<T> extends DOMEvent<T> {
    target: AudioTrackList;
}
/**
 * Fired when an audio track has been added to the list.
 *
 * @detail newTrack
 */
interface AudioTrackAddEvent extends AudioTrackListEvent<AudioTrack> {
}
/**
 * Fired when an audio track has been removed from the list.
 *
 * @detail removedTrack
 */
interface AudioTrackRemoveEvent extends AudioTrackListEvent<AudioTrack> {
}
/**
 * Fired when the selected audio track has changed.
 *
 * @detail change
 */
interface AudioTrackChangeEvent extends AudioTrackListEvent<ChangeAudioTrackEventDetail> {
}
interface ChangeAudioTrackEventDetail {
    prev: AudioTrack | null;
    current: AudioTrack;
}

/**
 * @see {@link https://vidstack.io/docs/player/api/audio-tracks}
 */
declare class AudioTrackList extends SelectList<AudioTrack, AudioTrackListEvents> {
}
/**
 * @see {@link https://vidstack.io/docs/player/api/audio-tracks}
 */
interface AudioTrack extends SelectListItem {
    /**
     * A string which uniquely identifies the track within the media.
     */
    readonly id: string;
    /**
     * A human-readable label for the track, or an empty string if unknown.
     */
    readonly label: string;
    /**
     * A string specifying the audio track's primary language, or an empty string if unknown. The
     * language is specified as a BCP 47 (RFC 5646) language code, such as "en-US" or "pt-BR".
     */
    readonly language: string;
    /**
     * A string specifying the category into which the track falls. For example, the main audio
     * track would have a kind of "main".
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioTrack/kind}
     */
    readonly kind: string;
}

interface TextTrackEvents {
    'load-start': TextTrackLoadStartEvent;
    load: TextTrackLoadEvent;
    error: TextTrackErrorEvent;
    'add-cue': TextTrackAddCueEvent;
    'remove-cue': TextTrackRemoveCueEvent;
    'cue-change': TextTrackCueChangeEvent;
    'mode-change': TextTrackModeChangeEvent;
}
interface TextTrackEvent<T> extends DOMEvent<T> {
    target: TextTrack;
}
/**
 * Fired when the text track begins the loading/parsing process.
 */
interface TextTrackLoadStartEvent extends TextTrackEvent<void> {
}
/**
 * Fired when the text track has finished loading/parsing.
 */
interface TextTrackLoadEvent extends TextTrackEvent<void> {
}
/**
 * Fired when loading or parsing the text track fails.
 */
interface TextTrackErrorEvent extends TextTrackEvent<Error> {
}
/**
 * Fired when a cue is added to the text track.
 */
interface TextTrackAddCueEvent extends TextTrackEvent<VTTCue> {
}
/**
 * Fired when a cue is removed from the text track.
 */
interface TextTrackRemoveCueEvent extends TextTrackEvent<VTTCue> {
}
/**
 * Fired when the active cues for the current text track have changed.
 */
interface TextTrackCueChangeEvent extends TextTrackEvent<void> {
}
/**
 * Fired when the text track mode (showing/hidden/disabled) has changed.
 */
interface TextTrackModeChangeEvent extends TextTrackEvent<TextTrack> {
}

declare const CROSS_ORIGIN: unique symbol;
declare const READY_STATE: unique symbol;
declare const UPDATE_ACTIVE_CUES: unique symbol;
declare const CAN_LOAD: unique symbol;
declare const ON_MODE_CHANGE: unique symbol;
declare const NATIVE: unique symbol;
declare const NATIVE_HLS: unique symbol;
declare const TextTrackSymbol: {
    readonly crossOrigin: typeof CROSS_ORIGIN;
    readonly readyState: typeof READY_STATE;
    readonly updateActiveCues: typeof UPDATE_ACTIVE_CUES;
    readonly canLoad: typeof CAN_LOAD;
    readonly onModeChange: typeof ON_MODE_CHANGE;
    readonly native: typeof NATIVE;
    readonly nativeHLS: typeof NATIVE_HLS;
};

/**
 * - 0: Not Loading
 * - 1: Loading
 * - 2: Ready
 * - 3: Error
 */
type TextTrackReadyState = 0 | 1 | 2 | 3;
interface VTTCueInit extends Omit<Partial<VTTCue$1>, 'startTime' | 'endTime' | 'text'>, Pick<VTTCue$1, 'startTime' | 'endTime' | 'text'> {
}
interface VTTRegionInit extends Omit<Partial<VTTRegion>, 'id'>, Pick<VTTRegion, 'id'> {
}
interface VTTContent {
    cues?: VTTCueInit[];
    regions?: VTTRegionInit[];
}
declare class TextTrack extends EventsTarget<TextTrackEvents> {
    #private;
    static createId(track: TextTrack | TextTrackInit): string;
    readonly src?: string;
    readonly content?: TextTrackInit['content'];
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    readonly encoding?: string;
    readonly id = "";
    readonly label = "";
    readonly language = "";
    readonly kind: TextTrackKind;
    readonly default = false;
    /** @internal */
    [TextTrackSymbol.readyState]: TextTrackReadyState;
    /** @internal */
    [TextTrackSymbol.crossOrigin]?: () => string | null;
    /** @internal */
    [TextTrackSymbol.onModeChange]: (() => void) | null;
    /** @internal */
    [TextTrackSymbol.native]: {
        default?: boolean;
        managed?: boolean;
        track: {
            mode: TextTrackMode;
            addCue(cue: any): void;
            removeCue(cue: any): void;
        };
        remove?(): void;
    } | null;
    get metadata(): Readonly<VTTHeaderMetadata>;
    get regions(): ReadonlyArray<VTTRegion>;
    get cues(): ReadonlyArray<VTTCue$1>;
    get activeCues(): ReadonlyArray<VTTCue$1>;
    /**
     * - 0: Not Loading
     * - 1: Loading
     * - 2: Ready
     * - 3: Error
     */
    get readyState(): TextTrackReadyState;
    get mode(): TextTrackMode;
    set mode(mode: TextTrackMode);
    constructor(init: TextTrackInit);
    addCue(cue: VTTCue$1, trigger?: Event): void;
    removeCue(cue: VTTCue$1, trigger?: Event): void;
    setMode(mode: TextTrackMode, trigger?: Event): void;
    /** @internal */
    [TextTrackSymbol.updateActiveCues](currentTime: number, trigger?: Event): void;
    /** @internal */
    [TextTrackSymbol.canLoad](): void;
}
interface TextTrackInit {
    /**
     * A unique identifier.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/id}
     */
    id?: string;
    /**
     * URL of the text track resource. This attribute must be specified and its URL value must have
     * the same origin as the document — unless the <audio> or <video> parent element of the track
     * element has a `crossorigin` attribute.
     */
    readonly src?: string;
    /**
     * Used to directly pass in text track file contents.
     */
    readonly content?: string | VTTContent;
    /**
     * The captions file format to be parsed or a custom parser factory (functions that returns a
     * captions parser). Supported types include: 'vtt', 'srt', 'ssa', 'ass', and 'json'.
     *
     * @defaultValue 'vtt'
     */
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    /**
     * The text encoding type to be used when decoding data bytes to text.
     *
     * @defaultValue 'utf-8'
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings}
     *
     */
    readonly encoding?: string;
    /**
     * Indicates that the track should be enabled unless the user's preferences indicate that
     * another track is more appropriate. This may only be used on one track element per media
     * element.
     *
     * @defaultValue false
     */
    default?: boolean;
    /**
     * The kind of text track this object represents. This decides how the track will be handled
     * by the player.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind}
     */
    readonly kind: TextTrackKind;
    /**
     * A human-readable label for the text track. This will be displayed to the user.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/label}
     */
    readonly label?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly language?: string;
}
declare function isTrackCaptionKind(track: TextTrack): boolean;
declare function parseJSONCaptionsFile(json: string | VTTContent, Cue: typeof VTTCue$1, Region?: typeof VTTRegion): {
    regions: VTTRegion[];
    cues: VTTCue$1[];
};

declare class TextRenderers {
    #private;
    constructor(media: MediaContext);
    add(renderer: TextRenderer): void;
    remove(renderer: TextRenderer): void;
    /** @internal */
    attachVideo(video: HTMLVideoElement | null): void;
}
interface TextRenderer {
    readonly priority: number;
    canRender(track: TextTrack, video: HTMLVideoElement | null): boolean;
    attach(video: HTMLVideoElement | null): any;
    detach(): void;
    changeTrack(track: TextTrack | null): void;
}

/**
 * @see {@link https://vidstack.io/docs/player/api/text-tracks}
 */
declare class TextTrackList extends List<TextTrack, TextTrackListEvents> {
    #private;
    /** @internal */
    [TextTrackSymbol.crossOrigin]?: () => string | null;
    constructor();
    get selected(): TextTrack | null;
    get selectedIndex(): number;
    get preferredLang(): string | null;
    set preferredLang(lang: string | null);
    add(init: TextTrackInit | TextTrack, trigger?: Event): this;
    remove(track: TextTrack, trigger?: Event): this | undefined;
    clear(trigger?: Event): this;
    getByKind(kind: TextTrackKind | TextTrackKind[]): TextTrack[];
    /** @internal */
    [TextTrackSymbol.canLoad](): void;
    setStorage(storage: MediaStorage | null): void;
}
interface TextTrackListEvents {
    add: TextTrackAddEvent;
    remove: TextTrackRemoveEvent;
    'mode-change': TextTrackListModeChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
interface TextTrackListEvent<T> extends DOMEvent<T> {
    target: TextTrackList;
}
/**
 * Fired when a text track has been added to the list.
 *
 * @detail newTrack
 */
interface TextTrackAddEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when a text track has been removed from the list.
 *
 * @detail removedTrack
 */
interface TextTrackRemoveEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when the mode of any text track in the list has changed.
 *
 * @detail track
 */
interface TextTrackListModeChangeEvent extends TextTrackListEvent<TextTrack> {
}

interface MediaContext {
    player: MediaPlayer;
    storage: MediaStorage | null;
    remote: MediaRemoteControl;
    delegate: MediaPlayerDelegate;
    qualities: VideoQualityList;
    audioTracks: AudioTrackList;
    textTracks: TextTrackList;
    textRenderers: TextRenderers;
    ariaKeys: MediaKeyShortcuts;
    logger?: Logger;
    $provider: WriteSignal<MediaProviderAdapter | null>;
    $providerSetup: WriteSignal<boolean>;
    $props: ReadSignalRecord<MediaPlayerProps>;
    $state: PlayerStore;
    activeMenu?: {
        close(trigger?: Event): void;
    } | null;
    notify: MediaPlayerDelegate['notify'];
}
declare const mediaContext: Context<MediaContext>;

/**
 * The current media type.
 */
type MediaType = 'unknown' | 'audio' | 'video';
/**
 * The current media stream type.
 */
type MediaStreamType = 'unknown' | 'on-demand' | 'live' | 'live:dvr' | 'll-live' | 'll-live:dvr';
type MediaCrossOrigin = '' | 'anonymous' | 'use-credentials';
type RemotePlaybackType = 'airplay' | 'google-cast' | 'none';
interface RemotePlaybackInfo {
    deviceName?: string;
}
/**
 * Indicates the current view type which determines how the media will be presented.
 */
type MediaViewType = 'unknown' | 'audio' | 'video';
/**
 * Indicates the type of strategy that should be used to initiate the loading process.
 *
 * @docs {@see https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
 */
type MediaLoadingStrategy = 'eager' | 'idle' | 'visible' | 'custom' | 'play';
/**
 * Indicates the type of strategy that should be used to initiate the poster loading process.
 *
 * @docs {@see https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
 */
type MediaPosterLoadingStrategy = 'eager' | 'idle' | 'visible' | 'custom';
/**
 * A number which represents the general type of error that occurred.
 *
 * - *Abort Error Code (1):* The fetching of the associated resource was aborted by the user's
 * request.
 *
 * - *Network Error Code (2):* Some kind of network error occurred which prevented the media from
 * being successfully fetched, despite having previously been available.
 *
 * - *Decode Error Code (3):* Despite having previously been determined to be usable, an error
 * occurred while trying to decode the media resource, resulting in an error.
 *
 * - *Invalid Resource Error Code (4):* The associated resource or media provider object (such as
 * a `MediaStream`) has been found to be unsuitable.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code
 */
type MediaErrorCode = 1 | 2 | 3 | 4;
interface MediaErrorDetail {
    message: string;
    code?: MediaErrorCode;
    error?: Error;
    mediaError?: MediaError;
}

declare class AudioGain implements AudioGainAdapter {
    #private;
    get currentGain(): number | null;
    get supported(): boolean;
    constructor(media: HTMLMediaElement, onChange: (gain: number | null) => void);
    setGain(gain: number): void;
    removeGain(): void;
    destroy(): void;
}

/**
 * This HTML media provider adapts the underlying media element such as `<audio>` or `<video>` to
 * satisfy the media provider interface.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement}
 */
declare class HTMLMediaProvider implements MediaProviderAdapter {
    #private;
    readonly media: HTMLMediaElement;
    protected readonly ctx: MediaContext;
    readonly scope: Scope;
    currentSrc: Src<HTMLMediaSrc> | null;
    readonly audioGain: AudioGain;
    constructor(media: HTMLMediaElement, ctx: MediaContext);
    setup(): void;
    get type(): string;
    setPlaybackRate(rate: number): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): void;
    setVolume(volume: number): void;
    setCurrentTime(time: number): void;
    setPlaysInline(inline: boolean): void;
    loadSource({ src, type }: Src, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * Append source so it works when requesting AirPlay since hls.js will remove it.
     */
    protected appendSource(src: Src<string>, defaultType?: string): void;
    protected removeSource(): void;
}

/**
 * The audio provider adapts the `<audio>` element to enable loading audio via the HTML Media
 * Element API.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/audio}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio}
 * @example
 * ```html
 * <media-player src="https://files.vidstack.io/audio.mp3">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class AudioProvider extends HTMLMediaProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    get type(): string;
    airPlay?: MediaRemotePlaybackAdapter;
    constructor(audio: HTMLAudioElement, ctx: MediaContext);
    setup(): void;
    /**
     * The native HTML `<audio>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
     */
    get audio(): HTMLAudioElement;
}

/**
 * The video provider adapts the `<video>` element to enable loading videos via the HTML Media
 * Element API.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/video}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @example
 * ```html
 * <media-player
 *   src="https://files.vidstack.io/720p.mp4"
 *   poster="https://files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class VideoProvider extends HTMLMediaProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    get type(): string;
    airPlay?: MediaRemotePlaybackAdapter;
    fullscreen?: MediaFullscreenAdapter;
    pictureInPicture?: MediaPictureInPictureAdapter;
    constructor(video: HTMLVideoElement, ctx: MediaContext);
    setup(): void;
    /**
     * The native HTML `<video>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
     */
    get video(): HTMLVideoElement;
}

type DASHConstructor = typeof DASH__default.MediaPlayer;
type DASHConstructorLoader = () => Promise<{
    default: DASHConstructor;
} | undefined>;
type DASHNamespace = typeof DASH__default;
type DASHNamespaceLoader = () => Promise<{
    default: typeof DASH__default;
} | undefined>;
type DASHLibrary = DASHConstructor | DASHConstructorLoader | DASHNamespace | DASHNamespaceLoader | string | undefined;
type DASHInstanceCallback = (player: DASH__default.MediaPlayerClass) => void;

/**
 * The DASH provider introduces support for DASH streaming via the popular `dash.js`
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/dash}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @see {@link https://cdn.dashjs.org/latest/jsdoc/index.html}
 * @example
 * ```html
 * <media-player
 *   src="https://files.vidstack.io/dash/manifest.mpd"
 *   poster="https://files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class DASHProvider extends VideoProvider implements MediaProviderAdapter {
    #private;
    protected $$PROVIDER_TYPE: string;
    /**
     * The `dash.js` constructor.
     */
    get ctor(): typeof DASH.MediaPlayer | null;
    /**
     * The current `dash.js` instance.
     */
    get instance(): DASH.MediaPlayerClass | null;
    /**
     * Whether `dash.js` is supported in this environment.
     */
    static supported: boolean;
    get type(): string;
    get canLiveSync(): boolean;
    /**
     * The `dash.js` configuration object.
     *
     * @see {@link https://cdn.dashjs.org/latest/jsdoc/module-Settings.html}
     */
    get config(): Partial<DASH.MediaPlayerSettingClass>;
    set config(config: Partial<DASH.MediaPlayerSettingClass>);
    /**
     * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
     *
     * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
     */
    get library(): DASHLibrary;
    set library(library: DASHLibrary);
    preconnect(): void;
    setup(): void;
    loadSource(src: Src, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * The given callback is invoked when a new `dash.js` instance is created and right before it's
     * attached to media.
     */
    onInstance(callback: DASHInstanceCallback): Dispose;
    destroy(): void;
}

/**
 * The Google Cast provider adds support for casting/streaming videos to Cast Receiver.
 *
 * @see {@link https://developers.google.com/cast/docs/overview}
 * @docs {@link https://www.vidstack.io/docs/player/providers/google-cast}
 */
declare class GoogleCastProvider implements MediaProviderAdapter {
    #private;
    protected $$PROVIDER_TYPE: string;
    readonly scope: Scope;
    constructor(player: cast.framework.RemotePlayer, ctx: MediaContext);
    get type(): string;
    get currentSrc(): Src<string> | null;
    /**
     * The Google Cast remote player.
     *
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.RemotePlayer}
     */
    get player(): cast.framework.RemotePlayer;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
     */
    get cast(): cast.framework.CastContext;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastSession}
     */
    get session(): cast.framework.CastSession | null;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.Media}
     */
    get media(): chrome.cast.media.Media | undefined;
    /**
     * Whether the current Google Cast session belongs to this provider.
     */
    get hasActiveSession(): boolean;
    setup(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    getMediaStatus(request: chrome.cast.media.GetStatusRequest): Promise<unknown>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    loadSource(src: Src): Promise<void>;
    destroy(): void;
}

type HLSConstructor = typeof HLS.default;
type HLSConstructorLoader = () => Promise<{
    default: HLSConstructor;
} | undefined>;
type HLSLibrary = HLSConstructor | HLSConstructorLoader | string | undefined;
type HLSInstanceCallback = (hls: HLS.default) => void;

/**
 * The HLS provider introduces support for HLS streaming via the popular `hls.js`
 * library. HLS streaming is either [supported natively](https://caniuse.com/?search=hls) (generally
 * on iOS), or in environments that [support the Media Stream API](https://caniuse.com/?search=mediastream).
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/hls}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md}
 * @example
 * ```html
 * <media-player
 *   src="https://files.vidstack.io/hls/index.m3u8"
 *   poster="https://files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class HLSProvider extends VideoProvider implements MediaProviderAdapter {
    #private;
    protected $$PROVIDER_TYPE: string;
    /**
     * The `hls.js` constructor.
     */
    get ctor(): typeof HLS.default | null;
    /**
     * The current `hls.js` instance.
     */
    get instance(): HLS.default | null;
    /**
     * Whether `hls.js` is supported in this environment.
     */
    static supported: boolean;
    get type(): string;
    get canLiveSync(): boolean;
    /**
     * The `hls.js` configuration object.
     *
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
     */
    get config(): Partial<HLS.HlsConfig>;
    set config(config: Partial<HLS.HlsConfig>);
    /**
     * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
     *
     * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
     */
    get library(): HLSLibrary;
    set library(library: HLSLibrary);
    preconnect(): void;
    setup(): void;
    loadSource(src: Src, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * The given callback is invoked when a new `hls.js` instance is created and right before it's
     * attached to media.
     */
    onInstance(callback: HLSInstanceCallback): Dispose;
    destroy(): void;
}

declare abstract class EmbedProvider<Message> {
    #private;
    protected abstract getOrigin(): string;
    protected abstract buildParams(): Record<string, any>;
    protected abstract onMessage(message: Message, event: MessageEvent): void;
    protected abstract onLoad(): void;
    protected src: WriteSignal<string>;
    /**
     * Defines which referrer is sent when fetching the resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
     */
    referrerPolicy: ReferrerPolicy | null;
    get iframe(): HTMLIFrameElement;
    constructor(iframe: HTMLIFrameElement);
    setup(): void;
    postMessage(message: any, target?: string): void;
}

interface VimeoProgressPayload {
    seconds: number;
    percent: number;
    duration: number;
}
interface VimeoPlayPayload {
    seconds: number;
    percent: number;
    duration: number;
}
interface VimeoEventPayload {
    play: VimeoPlayPayload;
    pause: void;
    ready: void;
    playProgress: VimeoProgressPayload;
    loadProgress: VimeoProgressPayload;
    bufferstart: void;
    bufferend: void;
    loaded: {
        id: number;
    };
    ended: void;
    seeking: void;
    seek: void;
    seeked: void;
    cuechange: void;
    fullscreenchange: {
        fullscreen: boolean;
    };
    volumechange: {
        volume: number;
    };
    durationchange: {
        duration: number;
    };
    playbackratechange: {
        playbackRate: number;
    };
    texttrackchange: void;
    error: any;
    loadeddata: any;
    loadstart: any;
    loadedmetadata: any;
    enterpictureinpicture: void;
    leavepictureinpicture: void;
    qualitychange: any;
    waiting: void;
}

/**
 * @see https://github.com/vimeo/player.js#methods
 */
type VimeoCommand = 'addEventListener' | 'disableTextTrack' | 'enableTextTrack' | 'exitFullscreen' | 'exitPictureInPicture' | 'getBuffered' | 'getCuePoints' | 'getChapters' | 'getCurrentTime' | 'getDuration' | 'getFullscreen' | 'getPictureInPicture' | 'getPlayed' | 'getQualities' | 'getQuality' | 'getSeekable' | 'getSeeking' | 'getTextTracks' | 'getVideoTitle' | '_hideOverlay' | 'pause' | 'play' | 'requestFullscreen' | 'requestPictureInPicture' | 'seekTo' | 'setMuted' | 'setPlaybackRate' | 'setQuality' | 'setVolume' | '_showOverlay' | 'destroy' | 'loadVideo' | 'unload';

interface VimeoMessage {
    data?: any;
    value?: any;
    method?: VimeoCommand;
    event?: keyof VimeoEventPayload;
}

/**
 * Vimeo Player Parameters.
 *
 * @see {@link https://developer.vimeo.com/player/sdk/embed}
 */
interface VimeoParams {
    /**
     * The ID or the URL of the video on Vimeo. You must supply one of these values to identify the
     * video.
     *
     * @default undefined
     */
    id?: string;
    /**
     * Whether to pause the current video when another Vimeo video on the same page starts to play.
     * Set this value to false to permit simultaneous playback of all the videos on the page.
     *
     * @default true
     */
    autopause?: boolean;
    /**
     * Whether to start playback of the video automatically. This feature might not work on all
     * devices.
     *
     * @default false
     */
    autoplay?: boolean;
    /**
     * Whether the player is in background mode, which hides the playback controls, enables autoplay,
     * and loops the video.
     *
     * @default false
     */
    background?: boolean;
    /**
     * Whether to display the video owner's name.
     *
     * @default true
     */
    byline?: boolean;
    /**
     * The hexadecimal color value of the playback controls. The embed settings of the video
     * might override this value.
     *
     * @default '00ADEF'
     */
    color?: string;
    /**
     * This parameter will hide all elements in the player (play bar, sharing buttons, etc) for a
     * chromeless experience. When using this parameter, the play/pause button will be hidden. To
     * start playback for your viewers, you'll need to either enable autoplay, use keyboard controls,
     * or implement our player SDK to start and control playback.
     *
     * Note: setting this parameter will not disable keyboard controls.
     *
     * @default true
     */
    controls?: boolean;
    /**
     * Whether to enable keyboard input to trigger player events. This setting doesn't affect tab
     * control.
     *
     * @default true
     */
    keyboard?: boolean;
    /**
     * Hash for private videos.
     */
    h: string | null;
    /**
     * The height of the video in pixels.
     *
     * @default undefined
     */
    height?: number;
    /**
     * Whether to restart the video automatically after reaching the end.
     *
     * @default false
     */
    loop?: boolean;
    /**
     * The height of the video in pixels, where the video won't exceed its native height, no matter
     * the value of this field.
     *
     * @default undefined
     */
    maxheight?: number;
    /**
     * The width of the video in pixels, where the video won't exceed its native width, no matter the
     * value of this field.
     *
     * @default undefined
     */
    maxwidth?: number;
    /**
     * Whether the video is muted upon loading. The true value is required for the autoplay behavior
     * in some browsers.
     *
     * @default false
     */
    muted?: boolean;
    /**
     * Whether the video plays inline on supported mobile devices. To force the device to play the
     * video in fullscreen mode instead, set this value to false.
     *
     * @default true
     */
    playsinline?: boolean;
    /**
     * Whether to display the video owner's portrait.
     *
     * @default true
     */
    portrait?: boolean;
    /**
     * Whether the player displays speed controls in the preferences menu and enables the playback
     * rate API.
     *
     * @default false
     */
    speed?: boolean;
    /**
     * Whether the player displays the title overlay.
     *
     * @default true
     */
    title?: boolean;
    /**
     * Whether the responsive player and transparent background are enabled.
     *
     * @default true
     */
    transparent?: boolean;
    /**
     * The width of the video in pixels.
     *
     * @default undefined
     */
    width?: number;
    /**
     * Setting this parameter to "true" will block the player from tracking any session data,
     * including all cookies and analytics.
     *
     * @default false
     */
    dnt?: boolean;
}

/**
 * This provider enables loading videos uploaded to Vimeo (https://vimeo.com) via embeds.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/vimeo}
 * @see {@link https://developer.vimeo.com/player/sdk}
 * @example
 * ```html
 * <media-player src="vimeo/640499893">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 * @example
 * ```html
 * <media-player src="vimeo/640499893?hash={hash}">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class VimeoProvider extends EmbedProvider<VimeoMessage> implements Pick<VimeoParams, 'title' | 'byline' | 'portrait' | 'color'> {
    #private;
    protected readonly $$PROVIDER_TYPE = "VIMEO";
    readonly scope: Scope;
    fullscreen?: MediaFullscreenAdapter;
    constructor(iframe: HTMLIFrameElement, ctx: MediaContext);
    /**
     * Whether tracking session data should be enabled on the embed, including cookies and analytics.
     * This is turned off by default to be GDPR-compliant.
     *
     * @defaultValue `false`
     */
    cookies: boolean;
    title: boolean;
    byline: boolean;
    portrait: boolean;
    color: string;
    get type(): string;
    get currentSrc(): Src<string> | null;
    get videoId(): string;
    get hash(): string | null;
    get isPro(): boolean;
    preconnect(): void;
    setup(): void;
    destroy(): void;
    play(): Promise<void | undefined>;
    pause(): Promise<void | undefined>;
    setMuted(muted: any): void;
    setCurrentTime(time: any): void;
    setVolume(volume: any): void;
    setPlaybackRate(rate: any): void;
    loadSource(src: Src): Promise<void>;
    protected getOrigin(): string;
    protected buildParams(): VimeoParams;
    protected onMessage(message: VimeoMessage, event: MessageEvent): void;
    protected onLoad(): void;
}

type YouTubeEvent = 'initialDelivery' | 'onReady' | 'infoDelivery' | 'apiInfoDelivery';

type YouTubePlaybackQuality = 'unknown' | 'tiny' | 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres' | 'max';

/**
 * @see {@link https://developers.google.com/youtube/iframe_api_reference#onStateChange}
 */
declare const YouTubePlayerState: {
    readonly Unstarted: -1;
    readonly Ended: 0;
    readonly Playing: 1;
    readonly Paused: 2;
    readonly Buffering: 3;
    readonly Cued: 5;
};
type YouTubePlayerStateValue = (typeof YouTubePlayerState)[keyof typeof YouTubePlayerState];

interface YouTubeVideoData {
    allowLiveDvr: boolean;
    author: string;
    title: string;
    video_id: string;
    errorCode?: number;
    isListed: boolean;
    isLive: boolean;
}
interface YouTubeProgressState {
    airingStart: number;
    airingEnd: number;
    allowSeeking: boolean;
    clipStart: number;
    clipEnd: boolean | null;
    current: number;
    displayedStart: number;
    duration: number;
    ingestionTime: number;
    isAtLiveHead: false;
    loaded: number;
    offset: number;
    seekableStart: number;
    seekableEnd: number;
    viewerLivestreamJoinMediaTime: number;
}
interface YouTubeMessageInfo {
    availablePlaybackRates?: number[];
    availableQualityLevels?: YouTubePlaybackQuality[];
    currentTime?: number;
    currentTimeLastUpdated?: number;
    videoLoadedFraction?: number;
    volume?: number;
    videoUrl?: string;
    videoData?: YouTubeVideoData;
    duration?: number;
    muted?: boolean;
    playbackQuality?: YouTubePlaybackQuality;
    playbackRate?: number;
    playerState?: YouTubePlayerStateValue;
    progressState?: YouTubeProgressState;
}
interface YouTubeMessage {
    channel: string;
    event: YouTubeEvent;
    info?: YouTubeMessageInfo;
}

/**
 * YouTube Player Parameters.
 *
 * @see {@link https://developers.google.com/youtube/player_parameters}
 */
interface YouTubeParams {
    /**
     * This parameter specifies whether the initial video will automatically start to play when the
     * player loads. Supported values are 0 or 1.
     *
     * @default 0
     */
    autoplay?: 0 | 1;
    /**
     * This parameter specifies whether the initial video will load with audio muted. Supported values
     * are 0 or 1.
     *
     * @default 0
     */
    mute?: 0 | 1;
    /**
     * This parameter specifies the default language that the player will use to display captions.
     * Set the parameter's value to an ISO 639-1 two-letter language code.
     *
     * If you use this parameter and also set the cc_load_policy parameter to 1, then the player will
     * show captions in the specified language when the player loads. If you do not also set the
     * cc_load_policy parameter, then captions will not display by default, but will display in the
     * specified language if the user opts to turn captions on.
     */
    cc_lang_pref?: string;
    /**
     * Setting the parameter's value to 1 causes closed captions to be shown by default, even if the
     * user has turned captions off. The default behavior is based on user preference.
     */
    cc_load_policy?: 1;
    /**
     * This parameter specifies the color that will be used in the player's video progress bar to
     * highlight the amount of the video that the viewer has already seen. Valid parameter values are
     * red and white, and, by default, the player uses the color red in the video progress bar. See
     * the YouTube API blog for more information about color options.
     *
     * Note: Setting the color parameter to white will disable the `modestbranding` option.
     *
     * @default 'red'
     */
    color?: 'red' | 'white';
    /**
     * This parameter indicates whether the video player controls are displayed:
     *
     * - `controls=0` – Player controls do not display in the player.
     * - `controls=1` – Player controls display in the player.
     *
     * @default 1
     */
    controls?: 0 | 1;
    /**
     * Setting the parameter's value to 1 causes the player to not respond to keyboard controls. The
     * default value is 0, which means that keyboard controls are enabled. Currently supported
     * keyboard controls are:
     *
     * - Spacebar or [k]: Play / Pause
     * - Arrow Left: Jump back 5 seconds in the current video
     * - Arrow Right: Jump ahead 5 seconds in the current video
     * - Arrow Up: Volume up
     * - Arrow Down: Volume Down
     * - [f]: Toggle full-screen display
     * - [j]: Jump back 10 seconds in the current video
     * - [l]: Jump ahead 10 seconds in the current video
     * - [m]: Mute or unmute the video
     * - [0-9]: Jump to a point in the video. 0 jumps to the beginning of the video, 1 jumps to the
     * point 10% into the video, 2 jumps to the point 20% into the video, and so forth.
     *
     * @default 0
     */
    disablekb?: 0 | 1;
    /**
     * Setting the parameter's value to 1 enables the player to be controlled via IFrame or JavaScript
     * Player API calls. The default value is 0, which means that the player cannot be controlled
     * using those APIs.
     *
     * For more information on the IFrame API and how to use it, see the IFrame API documentation.
     * (The JavaScript Player API has already been deprecated.)
     *
     * @default 0
     */
    enablejsapi?: 0 | 1;
    /**
     * This parameter causes the player to begin playing the video at the given number of seconds
     * from the start of the video. The parameter value is a positive integer. Note that similar to
     * the seekTo function, the player will look for the closest keyframe to the time you specify.
     * This means that sometimes the play head may seek to just before the requested time, usually no
     * more than around two seconds.
     *
     * @default undefined
     */
    start?: number;
    /**
     * This parameter specifies the time, measured in seconds from the start of the video, when the
     * player should stop playing the video. The parameter value is a positive integer.
     *
     * Note: The time is measured from the beginning of the video and not from either the value of
     * the start player parameter or the startSeconds parameter, which is used in YouTube Player API
     * functions for loading or queueing a video.
     *
     * @default undefined
     */
    end?: number;
    /**
     * Setting this parameter to 0 prevents the fullscreen button from displaying in the player. The
     * default value is 1, which causes the fullscreen button to display.
     *
     * @default 1
     */
    fs?: 0 | 1;
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter language
     * code or a fully specified locale. For example, fr and fr-ca are both valid values. Other
     * language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular user
     * based on the user's individual language preferences and the availability of caption tracks.
     */
    hl?: string;
    /**
     * Setting the parameter's value to 1 causes video annotations to be shown by default, whereas
     * setting to 3 causes video annotations to not be shown by default.
     *
     * @default 1
     */
    iv_load_policy?: 1 | 3;
    /**
     * The `list` parameter, in conjunction with the `listType` parameter, identifies the content that
     * will load in the player.
     *
     * - If the `listType` parameter value is search, then the list parameter value specifies the
     * search query.
     *
     * - If the `listType` parameter value is user_uploads, then the list parameter value identifies
     * the YouTube channel whose uploaded videos will be loaded.
     *
     * - If the listType parameter value is playlist, then the list parameter value specifies a
     * YouTube playlist ID. In the parameter value, you need to prepend the playlist ID with the
     * letters PL as shown in the example below.
     *
     * Note: If you specify values for the `list` and `listType` parameters, the IFrame embed URL does
     * not need to specify a video ID.
     *
     * @default undefined
     */
    list?: string;
    /**
     * The listType parameter, in conjunction with the list parameter, identifies the content that
     * will load in the player. Valid parameter values are playlist, search, and user_uploads.
     *
     * Note: If you specify values for the list and listType parameters, the IFrame embed URL does
     * not need to specify a video ID.
     *
     * @default undefined
     */
    listType?: 'playlist' | 'search' | 'user_uploads';
    /**
     * In the case of a single video player, a setting of 1 causes the player to play the initial
     * video again and again. In the case of a playlist player (or custom player), the player plays
     * the entire playlist and then starts again at the first video.
     *
     * @default 0
     */
    loop?: 0 | 1;
    /**
     * This parameter provides an extra security measure for the IFrame API and is only supported for
     * IFrame embeds. If you are using the IFrame API, which means you are setting the enablejsapi
     * parameter value to 1, you should always specify your domain as the origin parameter value.
     *
     * @default undefined
     */
    origin?: string;
    /**
     * This parameter specifies a comma-separated list of video IDs to play. If you specify a value,
     * the first video that plays will be the VIDEO_ID specified in the URL path, and the videos
     * specified in the playlist parameter will play thereafter.
     *
     * @default undefined
     */
    playlist?: string;
    /**
     * This parameter controls whether videos play inline or fullscreen in an HTML5 player on iOS.
     *
     * Valid values are:
     *
     * - 0: This value causes fullscreen playback.
     *
     * - 1: This value causes inline playback for UIWebViews created with the
     * `allowsInlineMediaPlayback` property set to `true`.
     *
     * @default 0
     */
    playsinline?: 0 | 1;
    /**
     * If the rel parameter is set to 0, related videos will come from the same channel as the video
     * that was just played. If the parameter's value is set to 1, which is the default value, then
     * the player shows related videos.
     *
     * @default 1
     */
    rel?: 0 | 1;
    /**
     * This parameter identifies the URL where the player is embedded. This value is used in YouTube
     * Analytics reporting when the YouTube player is embedded in a widget, and that widget is then
     * embedded in a web page or application. In that scenario, the origin parameter identifies the
     * widget provider's domain, but YouTube Analytics should not identify the widget provider as the
     * actual traffic source. Instead, YouTube Analytics uses the widget_referrer parameter value to
     * identify the domain associated with the traffic source.
     *
     * @default undefined
     */
    widget_referrer?: string;
}

/**
 * This provider enables loading videos uploaded to YouTube (youtube.com) via embeds.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/youtube}
 * @see {@link https://developers.google.com/youtube/iframe_api_reference}
 * @example
 * ```html
 * <media-player src="youtube/_cMxraX_5RE">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class YouTubeProvider extends EmbedProvider<YouTubeMessage> implements MediaProviderAdapter, Pick<YouTubeParams, 'color' | 'start' | 'end'> {
    #private;
    protected readonly $$PROVIDER_TYPE = "YOUTUBE";
    readonly scope: Scope;
    constructor(iframe: HTMLIFrameElement, ctx: MediaContext);
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
     * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
     * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular
     * user based on the user's individual language preferences and the availability of caption tracks.
     *
     * @defaultValue 'en'
     */
    language: string;
    color: 'white' | 'red';
    /**
     * Whether cookies should be enabled on the embed. This is turned off by default to be
     * GDPR-compliant.
     *
     * @defaultValue `false`
     */
    cookies: boolean;
    get currentSrc(): Src<string> | null;
    get type(): string;
    get videoId(): string;
    preconnect(): void;
    setup(): void;
    destroy(): void;
    play(): Promise<void | undefined>;
    pause(): Promise<void | undefined>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setPlaybackRate(rate: number): void;
    loadSource(src: Src): Promise<void>;
    protected getOrigin(): "https://www.youtube-nocookie.com" | "https://www.youtube.com";
    protected buildParams(): YouTubeParams;
    protected onLoad(): void;
    protected onMessage({ info }: YouTubeMessage, event: MessageEvent): void;
}

type AnyMediaProvider = ({
    type: 'audio';
} & AudioProvider) | ({
    type: 'video';
} & VideoProvider) | ({
    type: 'hls';
} & HLSProvider) | ({
    type: 'dash';
} & DASHProvider) | ({
    type: 'youtube';
} & YouTubeProvider) | ({
    type: 'vimeo';
} & VimeoProvider) | ({
    type: 'google-cast';
} & GoogleCastProvider);
interface MediaProviderLoader<Provider extends MediaProviderAdapter = MediaProviderAdapter> {
    readonly name: string;
    target: HTMLElement | null;
    canPlay(src: Src): boolean;
    mediaType(src?: Src): MediaType;
    preconnect?(ctx: MediaContext): void;
    load(ctx: MediaContext): Promise<Provider>;
    loadPoster?(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}
interface MediaProviderAdapter {
    readonly scope: Scope;
    readonly type: string;
    readonly currentSrc: Src | null;
    readonly audioGain?: AudioGainAdapter;
    readonly fullscreen?: MediaFullscreenAdapter;
    readonly pictureInPicture?: MediaPictureInPictureAdapter;
    readonly airPlay?: MediaRemotePlaybackAdapter;
    readonly canLiveSync?: boolean;
    preconnect?(): void;
    setup(): void;
    destroy?(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setPlaysInline?(inline: boolean): void;
    setPlaybackRate?(rate: number): void;
    loadSource(src: Src, preload: MediaState['preload']): Promise<void>;
}
interface AudioGainAdapter {
    readonly supported: boolean;
    readonly currentGain: number | null;
    setGain(gain: number): void;
    removeGain(): void;
}
interface MediaRemotePlaybackAdapter {
    /**
     * Whether requesting playback is supported.
     */
    readonly supported: boolean;
    /**
     * Request remote playback.
     */
    prompt(options?: unknown): Promise<void>;
}
interface MediaFullscreenAdapter extends FullscreenAdapter {
}
interface MediaPictureInPictureAdapter {
    /**
     * Whether picture-in-picture mode is active.
     */
    readonly active: boolean;
    /**
     * Whether picture-in-picture mode is supported. This does not mean that the operation is
     * guaranteed to be successful, only that it can be attempted.
     */
    readonly supported: boolean;
    /**
     * Request to display the current provider in picture-in-picture mode.
     */
    enter(): Promise<void | PictureInPictureWindow>;
    /**
     * Request to display the current provider in inline by exiting picture-in-picture mode.
     */
    exit(): Promise<void>;
}

interface MediaPlayerState extends MediaState {
}
declare const mediaState: State<MediaState>;
/**
 * Resets all media state and leaves general player state intact.
 */
declare function softResetMediaState($media: MediaStore, isSourceQualityChange?: boolean): void;
interface MediaStore extends Store<MediaState> {
}
interface PlayerStore extends MediaStore {
}
interface MediaState {
    /**
     * Whether playback should automatically begin as soon as enough media is available to do so
     * without interruption.
     *
     * Sites which automatically play audio (or videos with an audio track) can be an unpleasant
     * experience for users, so it should be avoided when possible. If you must offer auto-play
     * functionality, you should make it opt-in (requiring a user to specifically enable it).
     *
     * However, auto-play can be useful when creating media elements whose source will be set at a
     * later time, under user control.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay}
     */
    autoPlay: boolean;
    /**
     * Set to an error when auto-play has failed to begin playback. This can be used to determine
     * when to show a recovery UI in the event auto-play fails.
     *
     * @defaultValue null
     */
    autoPlayError: {
        muted: boolean;
        error: Error;
    } | null;
    /**
     * Returns a `TimeRanges` object that indicates the ranges of the media source that the
     * browser has buffered (if any) at the moment the buffered property is accessed. This is usually
     * contiguous but if the user jumps about while media is buffering, it may contain holes.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered}
     * @defaultValue TimeRanges
     */
    buffered: TimeRanges;
    /**
     * The earliest time in seconds for which media has been buffered (i.e., downloaded by the
     * browser).
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered}
     */
    readonly bufferedStart: number;
    /**
     * The latest time in seconds for which media has been buffered (i.e., downloaded by the
     * browser).
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered}
     */
    readonly bufferedEnd: number;
    /**
     * The length of the buffered window in seconds from `bufferedStart` to `bufferedEnd`.
     */
    readonly bufferedWindow: number;
    /**
     * A `double` indicating the total playback length of the media in seconds. If no media data is
     * available, the returned value is `0`. If the media is of indefinite length (such as
     * streamed live media, a WebRTC call's media, or similar), the value is `+Infinity`.
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration}
     */
    readonly duration: number;
    /**
     * Whether Apple AirPlay is available for casting and playing media on another device such as a
     * TV.
     */
    canAirPlay: boolean;
    /**
     * Whether Google Cast is available for casting and playing media on another device such as a TV.
     */
    canGoogleCast: boolean;
    /**
     * The current remote playback state when using AirPlay or Google Cast.
     */
    remotePlaybackState: RemotePlaybackState;
    /**
     * The type of remote playback that is currently connecting or connected.
     */
    remotePlaybackType: RemotePlaybackType;
    /**
     * An active remote playback loader such as the `GoogleCastLoader`.
     */
    remotePlaybackLoader: MediaProviderLoader | null;
    /**
     * Information about the current remote playback.
     */
    remotePlaybackInfo: RemotePlaybackInfo | null;
    /**
     * Whether AirPlay is connected.
     */
    readonly isAirPlayConnected: boolean;
    /**
     * Whether Google Cast is connected.
     */
    readonly isGoogleCastConnected: boolean;
    /**
     * Whether the native browser Fullscreen API is available, or the current provider can
     * toggle fullscreen mode. This does not mean that the operation is guaranteed to be successful,
     * only that it can be attempted.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    canFullscreen: boolean;
    /**
     * Whether the native Screen Orientation API and required methods (lock/unlock) are available.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API}
     */
    canOrientScreen: boolean;
    /**
     * Whether picture-in-picture mode is supported by the current media provider.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API}
     */
    canPictureInPicture: boolean;
    /**
     * Whether media is allowed to begin loading. This depends on the `load` player prop.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    canLoad: boolean;
    /**
     * Whether the media poster is allowed to begin loading. This depends on the `posterLoad`
     * player prop.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    canLoadPoster: boolean;
    /**
     * Whether the user agent can play the media, but estimates that **not enough** data has been
     * loaded to play the media up to its end without having to stop for further buffering of
     * content.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
     */
    canPlay: boolean;
    /**
     * Whether seeking operations are possible on the current stream. This generally false for
     * live streams that are loaded natively.
     *
     * @defaultValue true
     */
    readonly canSeek: boolean;
    /**
     * Limit playback to only play _after_ a certain time. Playback will begin from this time.
     *
     * @defaultValue 0
     */
    clipStartTime: number;
    /**
     * Limit playback to only play _before_ a certain time. Playback will end at this time.
     *
     * @defaultValue 0
     */
    clipEndTime: number;
    /**
     * Indicates whether a user interface should be shown for controlling the resource. Set this to
     * `false` when you want to provide your own custom controls, and `true` if you want the current
     * provider to supply its own default controls. Depending on the provider, changing this prop
     * may cause the player to completely reset.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controls}
     */
    controls: boolean;
    /**
     * Whether iOS Safari video controls are visible. This will be true if `playsinline` is not set
     * or in fullscreen due to lack of a Fullscreen API.
     */
    readonly iOSControls: boolean;
    /**
     * Whether native controls should be shown due to the `controls` state or `iOSControls` state.
     */
    readonly nativeControls: boolean;
    /**
     * Defines how the media element handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: MediaCrossOrigin | null;
    /**
     * The URL of the current poster. Defaults to `''` if no media/poster has been given or
     * loaded.
     *
     * @defaultValue ''
     */
    readonly poster: string;
    /**
     * A `double` indicating the current playback time in seconds. Defaults to `0` if the media has
     * not started to play and has not seeked. Setting this value seeks the media to the new
     * time. The value can be set to a minimum of `0` and maximum of the total length of the
     * media (indicated by the duration prop).
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime}
     */
    readonly currentTime: number;
    /**
     * Whether media playback has reached the end. In other words it'll be true
     * if `currentTime === duration`.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended}
     */
    ended: boolean;
    /**
     * Contains the most recent media error or undefined if there's been none. You can listen for
     * `error` event updates and examine this object to debug further.
     *
     * @defaultValue null
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error}
     */
    error: MediaErrorDetail | null;
    /**
     * Whether the player is currently in fullscreen mode.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    fullscreen: boolean;
    /**
     * Whether the controls are visible. By default, controls will be hidden when media playback
     * is progressing (playing) without any detected user activity for a set period of time
     * (default is 2.5s).
     *
     * @defaultValue false
     */
    controlsVisible: boolean;
    /**
     * Whether controls are hidden.
     */
    readonly controlsHidden: boolean;
    /**
     * Whether the user has intentionally seeked behind the live edge. The user must've seeked
     * roughly 2 or more seconds behind during a live stream for this to be considered true.
     *
     * @defaultValue false
     */
    userBehindLiveEdge: boolean;
    /**
     * Whether media should automatically start playing from the beginning (replay) every time
     * it ends.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loop}
     */
    readonly loop: boolean;
    /**
     * The current log level. Values in order of priority are: `silent`, `error`, `warn`, `info`,
     * and `debug`.
     */
    logLevel: LogLevel;
    /**
     * Whether the current media stream is live (i.e., being broadcast right now).
     */
    live: boolean;
    /**
     * The number of seconds that `currentTime` can be behind `liveEdgeStart` and still be considered
     * at the edge. The default value is 10, meaning the user can be up to 10 seconds behind the
     * live edge start and still be considered live.
     *
     * @defaultValue 10
     */
    liveEdgeTolerance: number;
    /**
     * The minimum seekable length in seconds before seeking operations are permitted on live streams.
     *
     * @defaultValue 60
     */
    minLiveDVRWindow: number;
    /**
     * The inferred length of the live DVR window.
     */
    readonly liveDVRWindow: number;
    /**
     * Whether the live stream has Digital Video Recording (DVR) enabled.
     */
    readonly isLiveDVR: boolean;
    /**
     * Whether the current stream is at the live edge. This is true if:
     *
     * 1. The player is _not_ in a paused state.
     * 2. The user has _not_ intentionally seeked behind live edge start.
     * 3. The `currentTime` is greater or equal than `liveEdgeStart`.
     *
     * This value will default to `false` for non-live streams.
     *
     * @defaultValue false
     */
    readonly liveEdge: boolean;
    /**
     * This is the starting edge of the live stream.
     *
     * A delay is applied in `hls.js` that's specified by the `liveSyncDurationCount` which is
     * expressed as a multiple of `EXT-X-TARGETDURATION` (default value is safely set to 3). If
     * set to `m`, playback will start from the fragment at `n-m`, where `n` is the last fragment
     * of the live playlist. Decreasing this value is likely to cause playback stalls.
     *
     * The `seekableEnd` value is used as the live edge start in native playback engines.
     *
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#hlslivesyncposition}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#livesyncdurationcount}
     * @see {@link https://github.com/video-dev/media-ui-extensions/blob/main/proposals/0007-live-edge.md}
     */
    readonly liveEdgeStart: number;
    /**
     * The length of the live edge window in seconds starting from `liveEdgeStart` and ending at
     * `seekableEnd`. If the `duration` of the stream is `Infinity` or the stream is non-live then
     * this value will default to 0.
     */
    readonly liveEdgeWindow: number;
    /**
     * The type of media that is currently active, whether it's audio or video. Defaults
     * to `unknown` when no media has been loaded or the type cannot be determined.
     *
     * @defaultValue 'unknown'
     */
    mediaType: MediaType;
    /**
     * Whether the audio is muted or not.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted}
     */
    muted: boolean;
    /**
     * Whether playback should be paused. Defaults to `true` if no media has loaded or playback has
     * not started. Setting this to `false` will begin/resume playback.
     *
     * @defaultValue true
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused}
     */
    paused: boolean;
    /**
     * Contains the ranges of the media source that the browser has played, if any.
     *
     * @defaultValue TimeRanges
     */
    played: TimeRanges;
    /**
     * Whether media is actively playing back. Defaults to `false` if no media has
     * loaded or playback has not started.
     *
     * @defaultValue false
     */
    playing: boolean;
    /**
     * Whether the video is to be played "inline", that is within the element's playback area. Note
     * that setting this to `false` does not imply that the video will always be played in fullscreen.
     * Depending on the provider, changing this prop may cause the player to completely reset.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-playsinline}
     */
    playsInline: boolean;
    /**
     * Sets the rate at which the media is being played back. This is used to implement user
     * controls for fast forward, slow motion, and so forth. The normal playback rate is multiplied
     * by this value to obtain the current rate, so a value of 1.0 indicates normal speed.
     *
     * Examples:
     *
     * - `0.5` = slow down to 50% of the normal speed
     * - `1.5` = speed up normal speed by 50%
     * - `2` = double the normal speed
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate}
     */
    playbackRate: number;
    /**
     * Whether the player is currently in picture-in-picture mode.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API}
     */
    pictureInPicture: boolean;
    /**
     * Configures the preload setting of the underlying media provider once it can load (see
     * `loading` property).
     *
     * The `preload` attribute provides a hint to the browser about what the author thinks will
     * lead to the best user experience with regards to what content is loaded before the video is
     * played. The recommended default is `metadata`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload}
     */
    preload: 'none' | 'metadata' | 'auto';
    /**
     * Whether auto quality selection is active.
     */
    autoQuality: boolean;
    /**
     * The list of available video qualities/renditions. This will be empty if quality information
     * is not provided by the current media provider.
     */
    qualities: VideoQuality[];
    /**
     * The current playback quality. This will be `null` if quality information is not provided
     * by the current media provider.
     */
    quality: VideoQuality | null;
    /**
     * The list of available audio tracks. This will be empty if audio track information is not
     * provided by the current media provider.
     */
    audioTracks: AudioTrack[];
    /**
     * The current audio track. This will be `null` if audio track information is not provided by
     *  the current media provider.
     */
    audioTrack: AudioTrack | null;
    /**
     * The current audio gain. This will be `null` if audio gain is not supported or is not set.
     */
    audioGain: number | null;
    /**
     * Whether the current video quality list is read-only, meaning quality selections can only
     * be set internally by the media provider. This will only be `false` when working with particular
     * third-party embeds such as YouTube.
     */
    canSetQuality: boolean;
    /**
     * Whether the current playback rate can be set. This will only be `false` when working with
     * particular third-party embeds such as Vimeo (only available to pro/business accounts).
     */
    canSetPlaybackRate: boolean;
    /**
     * Whether the current volume can be changed. This depends on the current provider and browser
     * environment. It will generally be `false` on mobile devices as it's set by system controls.
     */
    canSetVolume: boolean;
    /**
     * Whether the current audio gain can be changed. This depends on the current provider and browser
     * environment. It generally depends on browser's Web Audio API support.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API}
     */
    canSetAudioGain: boolean;
    /**
     * Contains the time ranges that the user is able to seek to, if any. This tells us which parts
     * of the media can be played without delay; this is irrespective of whether that part has
     * been downloaded or not.
     *
     * Some parts of the media may be seekable but not buffered if byte-range
     * requests are enabled on the server. Byte range requests allow parts of the media file to
     * be delivered from the server and so can be ready to play almost immediately — thus they are
     * seekable.
     *
     * @defaultValue TimeRanges
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable}
     */
    seekable: TimeRanges;
    /**
     * Contains the earliest time in seconds at which media can be seeked to. Generally this is
     * zero, but for live streams it may start at a non-zero value.
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable}
     */
    readonly seekableStart: number;
    /**
     * The latest time in seconds at which media can be seeked to. This will default to `Infinity`
     * if no seekable range is found. If byte-range requests are enabled on the server this should
     * be equal to the media duration - note for live streams duration is a moving target.
     *
     * @defaultValue Infinity
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable}
     */
    readonly seekableEnd: number;
    /**
     * The length of the seekable window in seconds starting from `seekableStart` and ending at
     * `seekableEnd`.
     *
     * @defaultValue 0
     */
    readonly seekableWindow: number;
    /**
     * Whether media is actively seeking to a new playback position.
     *
     * @defaultValue false
     */
    seeking: boolean;
    /**
     * The URL and optionally type of the current media resource/s to be considered for playback.
     * Use `source` to get the currently loaded resource.
     *
     * @defaultValue []
     */
    sources: Src[];
    /**
     * The chosen media resource. Defaults to `{ src: '', type: '' }` if no media has been loaded.
     *
     * @defaultValue { src: '', type: '' }
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentSrc}
     */
    source: Src;
    /** Alias for `source`. */
    currentSrc: Src;
    /**
     * Whether media playback has started. In other words it will be true if `currentTime > 0`.
     *
     * @defaultValue false
     */
    started: boolean;
    /**
     * The current media stream type. This value helps determine what type of UI should be
     * displayed and whether seeking operations are permitted during live streams. If seeking
     * is permitted, set this value to `live:dvr` or `ll-live:dvr`.
     */
    streamType: MediaStreamType;
    /**
     * The title of the current media.
     */
    readonly title: string;
    /**
     * The artist or channel name for which this content belongs to. This can be used in your
     * layout and it will be included in the Media Session API.
     */
    artist: string;
    /**
     * Images to be included in the Media Session API.
     */
    artwork: MediaImage[] | null;
    /**
     * The list of all available text tracks.
     */
    textTracks: TextTrack[];
    /**
     * The current captions/subtitles text track that is showing.
     */
    textTrack: TextTrack | null;
    /**
     * Whether there are any captions or subtitles available.
     */
    readonly hasCaptions: boolean;
    /**
     * The type of player view that should be used (i.e., audio or video). By default this is set
     * to `video`.
     *
     * @defaultValue 'unknown'
     */
    viewType: MediaViewType;
    /**
     * An `int` between `0` (silent) and `1` (loudest) indicating the audio volume. Defaults to `1`.
     *
     * @defaultValue 1
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume}
     */
    volume: number;
    /**
     * Whether playback has temporarily stopped because of a lack of temporary data.
     *
     * @defaultValue false
     */
    waiting: boolean;
    /**
     * The user's pointing device type.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer}
     */
    pointer: 'fine' | 'coarse';
    /**
     * The current screen orientation.
     */
    orientation: 'portrait' | 'landscape';
    /**
     * The width of the media player container in pixels.
     */
    width: number;
    /**
     * The height of the media player container in pixels.
     */
    height: number;
    /**
     * The width of the media provider in pixels.
     */
    mediaWidth: number;
    /**
     * The height of the media in provider pixels.
     */
    mediaHeight: number;
    /**
     *  The last keyboard shortcut that was triggered.
     */
    lastKeyboardAction: {
        action: string;
        event: KeyboardEvent;
    } | null;
    /** @internal */
    autoPlaying: boolean;
    /** @internal */
    providedTitle: string;
    /** @internal */
    inferredTitle: string;
    /** @internal */
    providedLoop: boolean;
    /** @internal */
    userPrefersLoop: boolean;
    /** @internal - Unclipped current time. */
    realCurrentTime: number;
    /** @internal */
    providedPoster: string;
    /** @internal */
    intrinsicDuration: number;
    /** @internal */
    providedDuration: number;
    /** @internal */
    inferredPoster: string;
    /** @internal */
    inferredViewType: MediaViewType;
    /** @internal */
    providedViewType: MediaViewType;
    /** @internal */
    providedStreamType: MediaStreamType;
    /** @internal */
    inferredStreamType: MediaStreamType;
    inferredLiveDVRWindow: number;
    /** @internal */
    liveSyncPosition: number | null;
    /** @internal */
    savedState: {
        paused?: boolean;
        currentTime?: number;
    } | null;
}
interface MediaPlayerQuery {
    (state: MediaPlayerState): boolean;
}
declare function boundTime(time: number, store: MediaStore): number;

interface MediaStateAccessors extends Pick<MediaState, 'paused' | 'muted' | 'volume' | 'currentTime' | 'playbackRate'> {
}
type PlayerSrc = MediaSrc | MediaSrc[];
interface MediaPlayerProps extends Pick<Writable<MediaState>, 'artist' | 'artwork' | 'autoPlay' | 'clipStartTime' | 'clipEndTime' | 'controls' | 'currentTime' | 'loop' | 'muted' | 'paused' | 'playsInline' | 'poster' | 'preload' | 'playbackRate' | 'viewType' | 'volume' | 'title' | 'streamType' | 'liveEdgeTolerance' | 'minLiveDVRWindow'> {
    /** @deprecated - Use `autoPlay` */
    autoplay: boolean;
    /** @deprecated - Use `crossOrigin` */
    crossorigin: string | true | null;
    /**
     * Defines how the media element handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaState['crossOrigin'];
    /**
     * A `double` indicating the total playback length of the media in seconds. If this is not
     * provided it will be determined when the media loaded.
     */
    duration: number;
    /**
     * The URL and optionally type of the current media resource/s to be considered for playback.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#sources}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject}
     */
    src: PlayerSrc;
    /**
     * The current log level. Values in order of priority are: `silent`, `error`, `warn`, `info`,
     * and `debug`.
     */
    logLevel: LogLevel;
    /**
     * Indicates when the provider can begin loading media.
     *
     * - `eager`: media will be loaded immediately.
     * - `idle`: media will be loaded after the page has loaded and `requestIdleCallback` is fired.
     * - `visible`: media will delay loading until the provider has entered the viewport.
     * - `custom`: media will wait for the `startLoading()` method or `media-start-loading` event.
     * - `play`: media will delay loading until there is a play request.
     *
     *  @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    load: MediaLoadingStrategy;
    /**
     * Indicates when the player can begin loading the poster.
     *
     * - `eager`: poster will be loaded immediately.
     * - `idle`: poster will be loaded after the page has loaded and `requestIdleCallback` is fired.
     * - `visible`: poster will delay loading until the provider has entered the viewport.
     * - `custom`: poster will wait for the `startLoadingPoster()` method or `media-poster-start-loading` event.
     *
     *  @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    posterLoad: MediaPosterLoadingStrategy;
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state and hide controls.
     */
    controlsDelay: number;
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     */
    hideControlsOnMouseLeave: boolean;
    /**
     * This method will indicate the orientation to lock the screen to when in fullscreen mode and
     * the Screen Orientation API is available.
     */
    fullscreenOrientation: ScreenOrientationLockType | 'none' | undefined;
    /**
     * Google Cast options.
     *
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastOptions}
     */
    googleCast: GoogleCastOptions;
    /** @deprecated - Use `playsInline`. */
    playsinline: boolean;
    /**
     * Whether native HLS support is preferred over using `hls.js`. We recommend setting this to
     * `false` to ensure a consistent and configurable experience across browsers. In addition, our
     * live stream support and DVR detection is much better with `hls.js` so choose accordingly.
     *
     * This should generally only be set to `true` if (1) you're working with HLS streams, and (2)
     * you want AirPlay to work via the native Safari controls (i.e., `controls` attribute is
     * present on the `<media-player>` element).
     */
    preferNativeHLS: boolean;
    /**
     * Whether keyboard support is disabled for the media player globally. This property won't disable
     * standard ARIA keyboard controls for individual components when focused.
     *
     * @defaultValue 'false'
     */
    keyDisabled: boolean;
    /**
     * The target on which to listen for keyboard events (e.g., `keydown`):
     *
     * - `document`: the player will listen for events on the entire document. In the case that
     * multiple players are on the page, only the most recently active player will receive input.
     * - `player`: the player will listen for events on the player itself or one of its children
     * were recently interacted with.
     *
     * @defaultValue `player`
     */
    keyTarget: MediaKeyTarget;
    /**
     * Extends global media player keyboard shortcuts. The shortcuts can be specified as a
     * space-separated list of combinations (e.g., `p Control+Space`), array, or callbacks. See the
     * provided doc link for more information.
     *
     * Do note, if `aria-keyshortcuts` is specified on a component then it will take precedence
     * over the respective value set here.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-keyshortcuts}
     * @example
     * ```ts
     * player.keyShortcuts = {
     *  // Space-separated list.
     *  togglePaused: 'k Space',
     *  toggleMuted: 'm',
     *  toggleFullscreen: 'f',
     *  togglePictureInPicture: 'i',
     *  toggleCaptions: 'c',
     *  // Array.
     *  seekBackward: ['j', 'J', 'ArrowLeft'],
     *  seekForward: ['l', 'L', 'ArrowRight'],
     *  volumeUp: 'ArrowUp',
     *  volumeDown: 'ArrowDown',
     *  speedUp: '>',
     *  slowDown: '<',
     *  // Callback.
     *  fooBar: {
     *    keys: ['k', 'Space'],
     *    callback(event) {}
     *   },
     * }
     * ```
     */
    keyShortcuts: MediaKeyShortcuts;
    /**
     * Determines whether volume, time, and other player settings should be saved to storage
     * and used when initializing media. The two options for enabling storage are:
     *
     * 1. You can provide a string which will use our local storage solution and the given string as
     * a key prefix.
     *
     * 2. Or, you can provide your own storage solution (e.g., database) by implementing
     * the `MediaStorage` interface and providing the object/class.
     */
    storage: string | MediaStorage | null;
}

declare class MediaPlayerController extends ViewController<MediaPlayerProps, MediaPlayerState, MediaPlayerEvents> {
}

declare class MediaControls extends MediaPlayerController {
    #private;
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    defaultDelay: number;
    /**
     * Whether controls can hide after a delay in user interaction. If this is false, controls will
     * not hide and be user controlled.
     */
    get canIdle(): boolean;
    set canIdle(canIdle: boolean);
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     *
     * @defaultValue false
     */
    get hideOnMouseLeave(): boolean;
    set hideOnMouseLeave(hide: boolean);
    /**
     * Whether media controls are currently visible.
     */
    get showing(): boolean;
    /**
     * Show controls.
     */
    show(delay?: number, trigger?: Event): void;
    /**
     * Hide controls.
     */
    hide(delay?: number, trigger?: Event): void;
    /**
     * Whether all idle tracking on controls should be paused until resumed again.
     */
    pause(trigger?: Event): void;
    resume(trigger?: Event): void;
    protected onConnect(): void;
}

declare class RequestQueue {
    #private;
    /**
     * The number of callbacks that are currently in queue.
     */
    get size(): number;
    /**
     * Whether items in the queue are being served immediately, otherwise they're queued to
     * be processed later.
     */
    get isServing(): boolean;
    /**
     * Waits for the queue to be flushed (ie: start serving).
     */
    waitForFlush(): Promise<void>;
    /**
     * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
     * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
     * then the callback will be invoked immediately.
     *
     * @param key - Uniquely identifies this callback so duplicates are ignored.
     * @param callback - The function to call when this item in the queue is being served.
     */
    enqueue(key: string | symbol, callback: () => void): void;
    /**
     * Invokes the callback with the given `key` in the queue (if it exists).
     */
    serve(key: string | symbol): void;
    /**
     * Flush all queued items and start serving future requests immediately until `stop()` is called.
     */
    start(): void;
    /**
     * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
     */
    stop(): void;
    /**
     * Stop serving requests, empty the request queue, and release any promises waiting for the
     * queue to flush.
     */
    reset(): void;
}

declare global {
    interface HTMLElementEventMap {
        'media-player-connect': MediaPlayerConnectEvent;
        'find-media-player': FindMediaPlayerEvent;
    }
}
/**
 * All media elements exist inside the `<media-player>` component. This component's main
 * responsibilities are to manage media state updates, dispatch media events, handle media
 * requests, and expose media state through HTML attributes and CSS properties for styling
 * purposes.
 *
 * @attr data-airplay - Whether AirPlay is connected.
 * @attr data-autoplay - Autoplay has successfully started.
 * @attr data-autoplay-error - Autoplay has failed to start.
 * @attr data-buffering - Media is not ready for playback or waiting for more data.
 * @attr data-can-airplay - Whether AirPlay is available.
 * @attr data-can-fullscreen - Fullscreen mode is available.
 * @attr data-can-google-cast - Whether Google Cast is available.
 * @attr data-can-load - Media can now begin loading.
 * @attr data-can-pip - Picture-in-Picture mode is available.
 * @attr data-can-play - Media is ready for playback.
 * @attr data-can-seek - Seeking operations are permitted.
 * @attr data-captions - Captions are available and visible.
 * @attr data-controls - Controls are visible.
 * @attr data-ended - Playback has ended.
 * @attr data-error - Issue with media loading/playback.
 * @attr data-fullscreen - Fullscreen mode is active.
 * @attr data-google-cast - Whether Google Cast is connected.
 * @attr data-ios-controls - iOS controls are visible.
 * @attr data-load - Specified load strategy.
 * @attr data-live - Media is live stream.
 * @attr data-live-edge - Playback is at the live edge.
 * @attr data-loop - Media is set to replay on end.
 * @attr data-media-type - Current media type (audio/video).
 * @attr data-muted - Whether volume is muted (0).
 * @attr data-orientation - Current screen orientation (landscape/portrait).
 * @attr data-paused - Whether playback is paused.
 * @attr data-pip - Picture-in-picture mode is active.
 * @attr data-playing - Playback is active.
 * @attr data-playsinline - Media should play inline by default (iOS).
 * @attr data-pointer - The user's pointer device type (coarse/fine).
 * @attr data-preview - The user is interacting with the time slider.
 * @attr data-remote-type - The remote playback type (airplay/google-cast).
 * @attr data-remote-state - The remote playback state (connecting/connected/disconnected).
 * @attr data-seeking - User is seeking to a new playback position.
 * @attr data-started - Media playback has started.
 * @attr data-stream-type - Current stream type.
 * @attr data-view-type - Current view type (audio/video).
 * @attr data-waiting - Media is waiting for more data to resume playback.
 * @attr data-focus - Whether player is being keyboard focused.
 * @attr data-hocus - Whether player is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/player}
 */
declare class MediaPlayer extends Component<MediaPlayerProps, MediaPlayerState, MediaPlayerEvents> implements MediaStateAccessors {
    #private;
    static props: MediaPlayerProps;
    static state: State<MediaState>;
    readonly canPlayQueue: RequestQueue;
    readonly remoteControl: MediaRemoteControl;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    /**
     * The current media provider.
     */
    get provider(): AnyMediaProvider | null;
    /**
     * Media controls settings.
     */
    get controls(): MediaControls;
    set controls(controls: boolean);
    /**
     * Controls the screen orientation of the current browser window and dispatches orientation
     * change events on the player.
     */
    readonly orientation: ScreenOrientationController;
    /**
     * The title of the current media.
     */
    get title(): string;
    set title(newTitle: string);
    /**
     * A list of all `VideoQuality` objects representing the set of available video renditions.
     *
     * @see {@link https://vidstack.io/docs/player/api/video-quality}
     */
    get qualities(): VideoQualityList;
    /**
     * A list of all `AudioTrack` objects representing the set of available audio tracks.
     *
     * @see {@link https://vidstack.io/docs/player/api/audio-tracks}
     */
    get audioTracks(): AudioTrackList;
    /**
     * A list of all `TextTrack` objects representing the set of available text tracks.
     *
     * @see {@link https://vidstack.io/docs/player/api/text-tracks}
     */
    get textTracks(): TextTrackList;
    /**
     * Contains text renderers which are responsible for loading, parsing, and rendering text
     * tracks.
     */
    get textRenderers(): TextRenderers;
    get duration(): number;
    set duration(duration: number);
    get paused(): boolean;
    set paused(paused: boolean);
    get muted(): boolean;
    set muted(muted: boolean);
    get currentTime(): number;
    set currentTime(time: number);
    get volume(): number;
    set volume(volume: number);
    get playbackRate(): number;
    set playbackRate(rate: number);
    /**
     * Begins/resumes playback of the media. If this method is called programmatically before the
     * user has interacted with the player, the promise may be rejected subject to the browser's
     * autoplay policies. This method will throw if called before media is ready for playback.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play}
     */
    play(trigger?: Event): Promise<void>;
    /**
     * Pauses playback of the media. This method will throw if called before media is ready for
     * playback.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause}
     */
    pause(trigger?: Event): Promise<void>;
    /**
     * Attempts to display the player in fullscreen. The promise will resolve if successful, and
     * reject if not. This method will throw if any fullscreen API is _not_ currently available.
     *
     * @see {@link https://vidstack.io/docs/player/api/fullscreen}
     */
    enterFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): Promise<void>;
    /**
     * Attempts to display the player inline by exiting fullscreen. This method will throw if any
     * fullscreen API is _not_ currently available.
     *
     * @see {@link https://vidstack.io/docs/player/api/fullscreen}
     */
    exitFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): Promise<void>;
    /**
     * Attempts to display the player in picture-in-picture mode. This method will throw if PIP is
     * not supported. This method will also return a `PictureInPictureWindow` if the current
     * provider supports it.
     *
     * @see {@link https://vidstack.io/docs/player/api/picture-in-picture}
     */
    enterPictureInPicture(trigger?: Event): Promise<void | PictureInPictureWindow>;
    /**
     * Attempts to display the player in inline by exiting picture-in-picture mode. This method
     * will throw if not supported.
     *
     * @see {@link https://vidstack.io/docs/player/api/picture-in-picture}
     */
    exitPictureInPicture(trigger?: Event): Promise<void>;
    /**
     * Sets the current time to the live edge (i.e., `duration`). This is a no-op for non-live
     * streams and will throw if called before media is ready for playback.
     *
     * @see {@link https://vidstack.io/docs/player/api/live}
     */
    seekToLiveEdge(trigger?: Event): void;
    /**
     * Called when media can begin loading. Calling this method will trigger the initial provider
     * loading process. Calling it more than once has no effect.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    startLoading(trigger?: Event): void;
    /**
     * Called when the poster image can begin loading. Calling it more than once has no effect.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
     */
    startLoadingPoster(trigger?: Event): void;
    /**
     * Request Apple AirPlay picker to open.
     */
    requestAirPlay(trigger?: Event): Promise<void>;
    /**
     * Request Google Cast device picker to open. The Google Cast framework will be loaded if it
     * hasn't yet.
     */
    requestGoogleCast(trigger?: Event): Promise<void>;
    /**
     * Set the audio gain, amplifying volume and enabling a maximum volume above 100%.
     *
     * @see {@link https://vidstack.io/docs/player/api/audio-gain}
     */
    setAudioGain(gain: number, trigger?: Event): void;
    destroy(): void;
}

interface MediaEvents {
    'audio-tracks-change': MediaAudioTracksChangeEvent;
    'audio-track-change': MediaAudioTrackChangeEvent;
    'audio-gain-change': MediaAudioGainChangeEvent;
    'auto-play-change': MediaAutoPlayChangeEvent;
    'auto-play-fail': MediaAutoPlayFailEvent;
    'can-load': MediaCanLoadEvent;
    'can-load-poster': MediaCanLoadPosterEvent;
    'can-play-through': MediaCanPlayThroughEvent;
    'can-play': MediaCanPlayEvent;
    'controls-change': MediaControlsChangeEvent;
    'duration-change': MediaDurationChangeEvent;
    'fullscreen-change': MediaFullscreenChangeEvent;
    'fullscreen-error': MediaFullscreenErrorEvent;
    'live-change': MediaLiveChangeEvent;
    'live-edge-change': MediaLiveEdgeChangeEvent;
    'load-start': MediaLoadStartEvent;
    'loaded-data': MediaLoadedDataEvent;
    'loaded-metadata': MediaLoadedMetadataEvent;
    'loop-change': MediaLoopChangeEvent;
    'media-type-change': MediaTypeChangeEvent;
    'orientation-change': MediaOrientationChangeEvent;
    'play-fail': MediaPlayFailEvent;
    'plays-inline-change': MediaPlaysInlineChangeEvent;
    'poster-change': MediaPosterChangeEvent;
    'provider-change': MediaProviderChangeEvent;
    'provider-loader-change': MediaProviderLoaderChangeEvent;
    'provider-setup': MediaProviderSetupEvent;
    'picture-in-picture-change': MediaPIPChangeEvent;
    'picture-in-picture-error': MediaPIPErrorEvent;
    'qualities-change': MediaQualitiesChangeEvent;
    'quality-change': MediaQualityChangeEvent;
    'rate-change': MediaRateChangeEvent;
    'remote-playback-change': MediaRemotePlaybackChangeEvent;
    'source-change': MediaSourceChangeEvent;
    'sources-change': MediaSourcesChangeEvent;
    'time-change': MediaTimeChangeEvent;
    'time-update': MediaTimeUpdateEvent;
    'title-change': MediaTitleChangeEvent;
    'stream-type-change': MediaStreamTypeChangeEvent;
    'text-tracks-change': MediaTextTracksChangeEvent;
    'text-track-change': MediaTextTrackChangeEvent;
    'view-type-change': MediaViewTypeChangeEvent;
    'volume-change': MediaVolumeChangeEvent;
    abort: MediaAbortEvent;
    'auto-play': MediaAutoPlayEvent;
    destroy: MediaDestroyEvent;
    emptied: MediaEmptiedEvent;
    end: MediaEndEvent;
    ended: MediaEndedEvent;
    error: MediaErrorEvent;
    pause: MediaPauseEvent;
    play: MediaPlayEvent;
    playing: MediaPlayingEvent;
    progress: MediaProgressEvent;
    replay: MediaReplayEvent;
    seeked: MediaSeekedEvent;
    seeking: MediaSeekingEvent;
    stalled: MediaStalledEvent;
    started: MediaStartedEvent;
    suspend: MediaSuspendEvent;
    waiting: MediaWaitingEvent;
}
interface MediaEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: MediaPlayer;
    request?: Event;
}
/**
 * Fired when the resource was not fully loaded, but not as the result of an error.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event}
 */
interface MediaAbortEvent extends MediaEvent<void> {
}
/**
 * Fired when an audio track has been added or removed.
 *
 * @detail audioTrack
 */
interface MediaAudioTracksChangeEvent extends MediaEvent<AudioTrack[]> {
}
/**
 * Fired when the current audio track changes.
 *
 * @detail audioTrack
 */
interface MediaAudioTrackChangeEvent extends MediaEvent<AudioTrack | null> {
}
/**
 * Fired when the `autoPlay` property has changed value.
 *
 * @detail shouldAutoPlay
 */
interface MediaAutoPlayChangeEvent extends MediaEvent<boolean> {
}
interface MediaAutoPlayFailEventDetail {
    muted: boolean;
    error: Error;
}
/**
 * Fired when an auto-play attempt has failed. The event detail contains the error that
 * had occurred on the last auto-play attempt which caused it to fail.
 */
interface MediaAutoPlayFailEvent extends MediaEvent<MediaAutoPlayFailEventDetail> {
}
interface MediaAutoPlayEventDetail {
    muted: boolean;
}
/**
 * Fired when an auto-play attempt has successfully been made (ie: media playback has automatically
 * started). The event detail whether media is `muted` before any attempts are made.
 */
interface MediaAutoPlayEvent extends MediaEvent<MediaAutoPlayEventDetail> {
}
/**
 * Fired when the player can begin loading the current provider and media. This depends on the
 * `load` player prop.
 *
 *  @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
 */
interface MediaCanLoadEvent extends MediaEvent<void> {
}
/**
 * Fired when the player can begin loading the poster image. This depends on the `posterLoad`
 * player prop.
 *
 *  @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
 */
interface MediaCanLoadPosterEvent extends MediaEvent<void> {
}
/**
 * Fired when the user agent can play the media, but estimates that **not enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
 */
interface MediaCanPlayEvent extends MediaEvent<MediaCanPlayDetail> {
}
interface MediaCanPlayDetail {
    provider: MediaProviderAdapter;
    duration: number;
    buffered: TimeRanges;
    seekable: TimeRanges;
}
/**
 * Fired when the user agent can play the media, and estimates that **enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event}
 */
interface MediaCanPlayThroughEvent extends MediaEvent<MediaCanPlayDetail> {
}
/**
 * Fired when controls visibility changes. The controls are idle/hidden when playback is
 * progressing (playing), and there is no user activity for a set period of time
 * (default is 2.5s). The event detail contains whether the controls are visible or not.
 *
 * @detail isVisible
 */
interface MediaControlsChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the playback rate has changed. The event `detail` contains the new rate.
 *
 * @detail rate
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event}
 */
interface MediaRateChangeEvent extends MediaEvent<number> {
}
/**
 * Fired when the audio gain has changed. The event `detail` contains the new gain.
 *
 * @detail gain
 */
interface MediaAudioGainChangeEvent extends MediaEvent<number | null> {
}
interface MediaRemotePlaybackChangeEventDetail {
    type: RemotePlaybackType;
    state: RemotePlaybackState;
}
/**
 * Fired when the remote playback state (`connecting`, `connected`, `disconnected`) and type
 * (`airplay`, `google-cast`) has changed.
 */
interface MediaRemotePlaybackChangeEvent extends MediaEvent<MediaRemotePlaybackChangeEventDetail> {
}
/**
 * Fired when the `source` property has changed value.
 *
 * @detail src
 */
interface MediaSourceChangeEvent extends MediaEvent<Src> {
    /** Whether this source change was due to a quality change. */
    isQualityChange?: boolean;
}
/**
 * Fired when the player is manually destroyed by calling the `destroy()` method.
 */
interface MediaDestroyEvent extends MediaEvent<void> {
}
/**
 * Fired when the `duration` property changes.
 *
 * @detail duration
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event}
 */
interface MediaDurationChangeEvent extends MediaEvent<number> {
}
/**
 * Fired when the media has become empty.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event}
 */
interface MediaEmptiedEvent extends MediaEvent<void> {
}
/**
 * Fired each time media playback has reached the end. This is fired even if the
 * `loop` property is `true`, which is generally when you'd reach for this event over the
 * `MediaEndedEvent` if you want to be notified of media looping.
 */
interface MediaEndEvent extends MediaEvent<void> {
}
/**
 * Fired when playback or streaming has stopped because the end of the media was reached or
 * because no further data is available. This is not fired if playback will start from the
 * beginning again due to the `loop` property being `true` (see `MediaReplayEvent`
 * and `MediaEndEvent`).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event}
 */
interface MediaEndedEvent extends MediaEvent<void> {
}
/**
 * Fired when media loading or playback has encountered any issues (for example, a network
 * connectivity problem). The event detail contains a potential message containing more
 * information about the error (empty string if nothing available), and a code that identifies
 * the general type of error that occurred.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/media.html#error-codes}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event}
 */
interface MediaErrorEvent extends MediaEvent<MediaErrorDetail> {
}
/**
 * Fired when media enters/exits fullscreen. The event detail is a `boolean` indicating
 * if fullscreen was entered (`true`) or exited (`false`).
 *
 * @bubbles
 * @composed
 * @detail isFullscreen
 */
interface MediaFullscreenChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when an error occurs either entering or exiting fullscreen. This will generally occur
 * if fullscreen is not supported or the user has not interacted with the page yet.
 *
 * @bubbles
 * @composed
 * @detail error
 */
interface MediaFullscreenErrorEvent extends MediaEvent<unknown> {
}
/**
 * Fired when the frame at the current playback position of the media has finished loading; often
 * the first frame.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event}
 */
interface MediaLoadedDataEvent extends MediaEvent<void> {
}
/**
 * Fired when the metadata has been loaded.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event}
 */
interface MediaLoadedMetadataEvent extends MediaEvent<void> {
}
/**
 * Fired when the `loop` property has changed value.
 *
 * @detail isLooping
 */
interface MediaLoopChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the `live` state changes. The event detail indicates whether the current stream
 * is live or not.
 *
 * @detail isLive
 */
interface MediaLiveChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the `liveEdge` state changes. The event detail indicates whether the user is viewing
 * at the live edge or not.
 *
 * @detail isLiveEdge
 */
interface MediaLiveEdgeChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the browser has started to load a resource.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event}
 */
interface MediaLoadStartEvent extends MediaEvent<void> {
}
/**
 * Fired when the `media` property changes value.
 *
 * @detail mediaType
 */
interface MediaTypeChangeEvent extends MediaEvent<MediaType> {
}
/**
 * Fired when a request to `pause` an activity is handled and the activity has entered its
 * `paused` state, most commonly after the media has been paused through a call to the
 * `pause()` method.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event}
 */
interface MediaPauseEvent extends MediaEvent<void> {
}
/**
 * Fired when the `paused` property is changed from `true` to `false`, as a result of the `play()`
 * method, or the `autoPlay` property.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event}
 */
interface MediaPlayEvent extends MediaEvent<void> {
    autoPlay?: boolean;
}
/**
 * Fired when an attempt to start media playback results in an error.
 *
 * @detail error
 */
interface MediaPlayFailEvent extends MediaEvent<Error> {
    autoPlay?: boolean;
}
/**
 * Fired when playback is ready to start after having been paused or delayed due to lack of data.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event}
 */
interface MediaPlayingEvent extends MediaEvent<void> {
}
/**
 * Fired when the `playsInline` property has changed value.
 *
 * @detail isInline
 */
interface MediaPlaysInlineChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the `currentPoster` property has changed value.
 *
 * @detail poster
 */
interface MediaPosterChangeEvent extends MediaEvent<string> {
}
interface MediaProgressEventDetail {
    buffered: TimeRanges;
    seekable: TimeRanges;
}
/**
 * Fired periodically as the browser loads a resource.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event}
 * @detail progress
 */
interface MediaProgressEvent extends MediaEvent<MediaProgressEventDetail> {
}
/**
 * Fired when the new media provider loader has been selected and rendered. This will be `null` if
 * no loader is able to play one of the current sources.
 *
 * @detail loader
 */
interface MediaProviderLoaderChangeEvent extends MediaEvent<MediaProviderLoader | null> {
}
/**
 * Fired when the new media provider has been selected. This will be `null` if no provider is
 * able to play one of the current sources.
 *
 * This event is ideal for initially configuring any provider-specific settings.
 *
 * @detail adapter
 */
interface MediaProviderChangeEvent extends MediaEvent<MediaProviderAdapter | null> {
}
/**
 * Fired immediately after the provider has been set up. Do not try and configure the provider
 * here as it'll be too late - prefer the `provider-change` event.
 *
 * @detail adapter
 */
interface MediaProviderSetupEvent extends MediaEvent<MediaProviderAdapter> {
}
/**
 * Fired when media enters/exits picture-in-picture (PIP) mode. The event detail is a `boolean`
 * indicating if PIP was entered (`true`) or exited (`false`).
 *
 * @bubbles
 * @composed
 * @detail isPictureInPictureMode
 */
interface MediaPIPChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when an error occurs either entering or exiting picture-in-picture (PIP) mode. This will
 * generally occur if PIP is not supported or the user has not interacted with the page yet.
 *
 * @bubbles
 * @composed
 * @detail error
 */
interface MediaPIPErrorEvent extends MediaEvent<unknown> {
}
/**
 * Fired when the list of available video qualities/renditions has changed.
 *
 * @detail renditions
 */
interface MediaQualitiesChangeEvent extends MediaEvent<VideoQuality[]> {
}
/**
 * Fired when the current video quality/rendition has changed. The event detail will be null if
 * video quality information is not available.
 *
 * @detail quality
 */
interface MediaQualityChangeEvent extends MediaEvent<VideoQuality | null> {
}
/**
 * Fired when a seek operation completed, the current playback position has changed, and the
 * `seeking` property is changed to `false`.
 *
 * @detail currentTime
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event}
 */
interface MediaSeekedEvent extends MediaEvent<number> {
}
/**
 * Fired when a seek operation starts, meaning the seeking property has changed to `true` and the
 * media is seeking to a new position.
 *
 * @detail currentTime
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event}
 */
interface MediaSeekingEvent extends MediaEvent<number> {
}
/**
 * Fired when the current media sources has changed.
 *
 * @detail src
 */
interface MediaSourcesChangeEvent extends MediaEvent<Src[]> {
}
/**
 * Fired when the user agent is trying to fetch media data, but data is unexpectedly not
 * forthcoming.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event}
 */
interface MediaStalledEvent extends MediaEvent<void> {
}
/**
 * Fired when media playback has just started, in other words the at the moment the following
 * happens: `currentTime > 0`.
 */
interface MediaStartedEvent extends MediaEvent<void> {
}
/**
 * Fired when media data loading has been suspended.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event}
 */
interface MediaSuspendEvent extends MediaEvent<void> {
}
/**
 * Fired when a screen orientation change is requested on or by the media.
 */
interface MediaOrientationChangeEvent extends ScreenOrientationChangeEvent {
}
/**
 * Fired when media playback starts again after being in an `ended` state. This is fired
 * when the `loop` property is `true` and media loops, whereas the `play` event is not.
 */
interface MediaReplayEvent extends MediaEvent<void> {
}
/**
 * Fired when the `currentTime` property value changes. The event `detail` contains the real time
 * of media playback without accounting for any clipping. This is also known as the provider time.
 *
 * Listen to the time update event for the displayed time.
 */
interface MediaTimeChangeEvent extends MediaEvent<number> {
}
interface MediaTimeUpdateEventDetail {
    currentTime: number;
    played: TimeRanges;
}
/**
 * Fired when the `currentTime` property value changes due to media playback or the
 * user seeking.
 *
 * Listen to the time change event if you'd like to receive the real playback time
 * without accounting for any clipping.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event}
 */
interface MediaTimeUpdateEvent extends MediaEvent<MediaTimeUpdateEventDetail> {
}
/**
 * Fired when the provided or inferred media title has changed.
 *
 * @detail title
 */
interface MediaTitleChangeEvent extends MediaEvent<string> {
}
/**
 * Fired when the `streamType` property changes value. The event detail contains the type of
 * stream (e.g., `on-demand`, `live`, `live:dvr`, etc.).
 *
 * @detail streamType
 */
interface MediaStreamTypeChangeEvent extends MediaEvent<MediaStreamType> {
}
/**
 * Fired when an audio track has been added or removed.
 *
 * @detail textTracks
 */
interface MediaTextTracksChangeEvent extends MediaEvent<TextTrack[]> {
}
/**
 * Fired when the current captions/subtitles text track changes.
 *
 * @detail textTrack
 */
interface MediaTextTrackChangeEvent extends MediaEvent<TextTrack | null> {
}
/**
 * Fired when the `viewType` property changes value. This will generally fire when the
 * new provider has mounted and determined what type of player view is appropriate given
 * the type of media it can play.
 *
 * @detail viewType
 */
interface MediaViewTypeChangeEvent extends MediaEvent<MediaViewType> {
}
interface MediaVolumeChange {
    muted: boolean;
    volume: number;
}
/**
 * Fired when the `volume` or `muted` properties change value.
 *
 * @detail volume
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event}
 */
interface MediaVolumeChangeEvent extends MediaEvent<MediaVolumeChange> {
}
/**
 * Fired when playback has stopped because of a temporary lack of data.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event}
 */
interface MediaWaitingEvent extends MediaEvent<void> {
}

interface MediaProviderProps {
    /** @internal */
    loaders: MediaProviderLoader[];
}
interface MediaProviderState {
    loader: MediaProviderLoader | null;
}
/**
 * Used to render the current provider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/provider}
 */
declare class MediaProvider extends Component<MediaProviderProps, MediaProviderState> {
    #private;
    static props: MediaProviderProps;
    static state: State<MediaProviderState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    load(target: HTMLElement | null | undefined): void;
    protected onDestroy(): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/components/display/announcer}
 */
declare class MediaAnnouncer extends Component<MediaAnnouncerProps, MediaAnnouncerState, MediaAnnouncerEvents> {
    #private;
    static props: MediaAnnouncerProps;
    static state: State<MediaAnnouncerState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface MediaAnnouncerProps {
    translations: Partial<MediaAnnouncerTranslations> | null;
}
interface MediaAnnouncerState {
    label: string | null;
    busy: boolean;
}
interface MediaAnnouncerEvents {
    change: DOMEvent<string>;
}
type MediaAnnouncerWord = 'Play' | 'Pause' | 'Enter Fullscreen' | 'Exit Fullscreen' | 'Enter PiP' | 'Exit PiP' | 'Closed-Captions On' | 'Closed-Captions Off' | 'Mute' | 'Volume' | 'Seek Forward' | 'Seek Backward';
type MediaAnnouncerTranslations = {
    [word in MediaAnnouncerWord]: string;
};

/**
 * This component creates a container for control groups.
 *
 * @attr data-visible - Whether controls should be visible.
 * @attr data-pip - Whether picture-in-picture mode is active.
 * @attr data-fullscreen - Whether fullscreen mode is active.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls}
 */
declare class Controls extends Component<ControlsProps, {}, ControlsEvents> {
    #private;
    static props: ControlsProps;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}
interface ControlsProps {
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to hide the controls.
     */
    hideDelay: number;
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     */
    hideOnMouseLeave: boolean;
}
interface ControlsEvents {
    change: ControlsChangeEvent;
}
/**
 * Fired when the active state of the controls change.
 *
 * @detail isVisible
 */
interface ControlsChangeEvent extends DOMEvent<boolean> {
}

/**
 * This component creates a container for media controls.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls#group}
 */
declare class ControlsGroup extends Component {
    protected onAttach(el: HTMLElement): void;
}

/**
 * A contextual text bubble that displays a description for an element that appears on pointer
 * hover or keyboard focus.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role}
 */
declare class Tooltip extends Component<TooltipProps> {
    #private;
    static props: TooltipProps;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onSetup(): void;
}
interface TooltipProps {
    /**
     * The amount of time in milliseconds to wait before showing a tooltip.
     */
    showDelay: number;
}

/**
 * Wraps the element that will trigger showing/hiding the tooltip on hover or keyboard focus. The
 * tooltip content is positioned relative to this element.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 */
declare class TooltipTrigger extends Component {
    #private;
    constructor();
    protected onConnect(el: HTMLElement): void;
}

/**
 * This component contains the content that is visible when the tooltip trigger is interacted with.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-placement - The placement prop setting.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 */
declare class TooltipContent extends Component<TooltipContentProps> {
    #private;
    static props: TooltipContentProps;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
type TooltipPlacement = TooltipPlacementSide | `${TooltipPlacementSide} ${TooltipPlacementAlign}`;
type TooltipPlacementSide = 'top' | 'right' | 'bottom' | 'left';
type TooltipPlacementAlign = 'start' | 'center' | 'end';
interface TooltipContentProps {
    /**
     * A space-separated list which specifies the side and alignment of the tooltip content relative
     * to the trigger.
     *
     * @example `top center`
     * @example `bottom end`
     */
    placement: TooltipPlacement;
    /**
     * The distance in pixels between the content and the tooltip trigger. You can also set
     * the CSS variable `--media-tooltip-y-offset` to adjust this offset.
     */
    offset: number;
    /**
     * The offset in pixels from the start/center/end aligned position. You can also set
     * the CSS variable `--media-tooltip-x-offset` to adjust this offset.
     */
    alignOffset: number;
}

interface ToggleButtonProps {
    /**
     * Whether it should start in the on (pressed) state.
     */
    defaultPressed: boolean;
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
/**
 * A toggle button is a two-state button that can be either off (not pressed) or on (pressed).
 *
 * @attr data-pressed - Whether the toggle is in an "on" state (pressed).
 * @attr aria-pressed - Same as `data-pressed` but `"true"` or `"false"`.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/toggle-button}
 */
declare class ToggleButton<Props extends ToggleButtonProps = ToggleButtonProps> extends Component<Props> {
    #private;
    static props: ToggleButtonProps;
    /**
     * Whether the toggle is currently in a `pressed` state.
     */
    get pressed(): boolean;
    constructor();
}

interface ToggleButtonControllerProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}

interface AirPlayButtonProps extends ToggleButtonControllerProps {
}
interface AirPlayButtonEvents extends Pick<MediaRequestEvents, 'media-airplay-request'> {
}
/**
 * A button for requesting remote playback via Apple AirPlay.
 *
 * @attr data-active - Whether AirPlay is connected.
 * @attr data-supported - Whether AirPlay is available.
 * @attr data-state - Current connection state.
 * @see {@link https://www.apple.com/au/airplay}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/airplay-button}
 */
declare class AirPlayButton extends Component<AirPlayButtonProps, {}, AirPlayButtonEvents> {
    #private;
    static props: AirPlayButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface GoogleCastButtonProps extends ToggleButtonControllerProps {
}
interface GoogleCastButtonEvents extends Pick<MediaRequestEvents, 'media-google-cast-request'> {
}
/**
 * A button for requesting remote playback via Google Cast.
 *
 * @attr data-active - Whether Google Cast is connected.
 * @attr data-supported - Whether Google Cast is available.
 * @attr data-state - Current connection state.
 * @see {@link https://developers.google.com/cast/docs/overview}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/google-cast-button}
 */
declare class GoogleCastButton extends Component<GoogleCastButtonProps, {}, GoogleCastButtonEvents> {
    #private;
    static props: GoogleCastButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface PlayButtonProps extends ToggleButtonControllerProps {
}
interface PlayButtonEvents extends Pick<MediaRequestEvents, 'media-play-request' | 'media-pause-request'> {
}
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 * @attr data-paused - Whether playback has stopped.
 * @attr data-ended - Whether playback has ended.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/play-button}
 */
declare class PlayButton extends Component<PlayButtonProps, {}, PlayButtonEvents> {
    #private;
    static props: PlayButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface CaptionButtonProps extends ToggleButtonControllerProps {
}
interface CaptionButtonEvents extends Pick<MediaRequestEvents, 'media-text-track-change-request'> {
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @attr data-supported - Whether captions/subtitles are available.
 * @attr data-active - Whether closed captions or subtitles are on.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 */
declare class CaptionButton extends Component<CaptionButtonProps, {}, CaptionButtonEvents> {
    #private;
    static props: CaptionButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface FullscreenButtonProps extends ToggleButtonControllerProps {
    /**
     * The target element on which to request fullscreen on. The target can be `media`
     * (i.e., `<media-player>`) or `provider`. The `prefer-media` option will first see if the native
     * fullscreen API is available, if not it'll try the media provider.
     */
    target: MediaFullscreenRequestTarget | undefined;
}
interface FullscreenButtonEvents extends Pick<MediaRequestEvents, 'media-enter-fullscreen-request' | 'media-exit-fullscreen-request'> {
}
/**
 * A button for toggling the fullscreen mode of the player.
 *
 * @attr data-active - Whether fullscreen mode is active.
 * @attr data-supported - Whether fullscreen mode is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/fullscreen-button}
 * @see {@link https://www.vidstack.io/docs/player/api/fullscreen}
 */
declare class FullscreenButton extends Component<FullscreenButtonProps, {}, FullscreenButtonEvents> {
    #private;
    static props: FullscreenButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface MuteButtonProps extends ToggleButtonControllerProps {
}
interface MuteButtonEvents extends Pick<MediaRequestEvents, 'media-mute-request' | 'media-unmute-request'> {
}
/**
 * A button for toggling the muted state of the player.
 *
 * @attr data-muted - Whether volume is muted (0).
 * @attr data-state - Current volume setting (low/high/muted).
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/mute-button}
 */
declare class MuteButton extends Component<MuteButtonProps, {}, MuteButtonEvents> {
    #private;
    static props: MuteButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface PIPButtonProps extends ToggleButtonControllerProps {
}
interface PIPButtonEvents extends Pick<MediaRequestEvents, 'media-enter-pip-request' | 'media-exit-pip-request'> {
}
/**
 * A button for toggling the picture-in-picture (PIP) mode of the player.
 *
 * @attr data-active - Whether picture-in-picture mode is active.
 * @attr data-supported - Whether picture-in-picture mode is available.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/pip-button}
 * @see {@link https://www.vidstack.io/docs/player/api/picture-in-picture}
 */
declare class PIPButton extends Component<PIPButtonProps, {}, PIPButtonEvents> {
    #private;
    static props: PIPButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}

interface SeekButtonProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * The amount to seek the media playback forwards (positive number) or backwards (negative number)
     * when the seek button is pressed.
     */
    seconds: number;
}
interface SeekButtonEvents extends Pick<MediaRequestEvents, 'media-seek-request'> {
}
/**
 * A button for seeking the current media playback forwards or backwards by a specified amount.
 *
 * @attr data-seeking - Whether a seeking operation is in progress.
 * @attr data-supported - Whether seeking operations are permitted.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/seek-button}
 */
declare class SeekButton extends Component<SeekButtonProps, {}, SeekButtonEvents> {
    #private;
    static props: SeekButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}

interface LiveButtonProps {
    /**
     * Whether the button should be disabled (non-interactive). This will prevent seeking to the
     * live edge when pressed.
     */
    disabled: boolean;
}
interface LiveButtonEvents extends Pick<MediaRequestEvents, 'media-live-edge-request'> {
}
/**
 * This component displays the current live status of the stream. This includes whether it's
 * live, at the live edge, or not live. In addition, when this button is pressed it will skip
 * ahead to the live edge.
 *
 * @attr data-edge - Playback is at the live edge.
 * @attr data-hidden - Whether current media is _not_ live.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/live-button}
 */
declare class LiveButton extends Component<LiveButtonProps, {}, LiveButtonEvents> {
    #private;
    static props: LiveButtonProps;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}

interface SliderCSSVars {
    /**
     * The fill rate expressed as a percentage.
     */
    readonly 'slider-fill': string;
    /**
     * The pointer rate expressed as a percentage.
     */
    readonly 'slider-pointer': string;
}

declare const sliderState: State<SliderState>;
interface SliderStore extends Store<SliderState> {
}
interface SliderState {
    /**
     * The current slider value.
     */
    value: number;
    /**
     * The value at which the device pointer is pointing to inside the slider.
     */
    pointerValue: number;
    /**
     * The minimum slider value.
     */
    min: number;
    /**
     * The maximum slider value.
     */
    max: number;
    /**
     * The granularity that the slider value must adhere to.
     */
    step: number;
    /**
     * Whether the slider has keyboard focus.
     */
    focused: boolean;
    /**
     * Whether the slider thumb is currently being dragged.
     */
    dragging: boolean;
    /**
     * Whether a device pointer is within the slider bounds.
     */
    pointing: boolean;
    /** Whether the slider is not visible. */
    hidden: boolean;
    /**
     * Whether the slider is being interacted with via keyboard or pointer device.
     */
    readonly active: boolean;
    /**
     * The current value to range ratio.
     *
     * @signal
     * @example
     * `min` = 0
     * `max` = 10
     * `value` = 5
     * `range` = 10 (max - min)
     * `fillRate` = 0.5 (result)
     */
    readonly fillRate: number;
    /**
     * The fill rate expressed as a percentage (`fillRate * 100`).
     */
    readonly fillPercent: number;
    /**
     * The pointer value to range ratio.
     */
    readonly pointerRate: number;
    /**
     * The pointer rate expressed as a percentage (`pointerRate * 100`).
     */
    readonly pointerPercent: number;
}

interface SliderEventDelegate {
    swipeGesture?: ReadSignal<boolean>;
    isDisabled(): boolean;
    getValue?(): number;
    getStep(): number;
    getKeyStep(): number;
    roundValue(value: number): number;
    onValueChange?(event: SliderValueChangeEvent): unknown;
    onDragStart?(event: SliderDragStartEvent): unknown;
    onDragEnd?(event: SliderDragEndEvent): unknown;
    onDragValueChange?(event: SliderDragValueChangeEvent): unknown;
}

type SliderOrientation = 'horizontal' | 'vertical';

interface SliderDelegate extends Omit<SliderEventDelegate, '_getOrientation'> {
    aria: {
        valueNow(): number;
        valueText(): string;
        valueMin?(): number;
        valueMax?(): number;
    };
}
declare class SliderController extends ViewController<SliderControllerProps, SliderState, SliderEvents> {
    #private;
    static props: SliderControllerProps;
    constructor(delegate: SliderDelegate);
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface SliderControllerProps {
    /**
     * Whether the slider should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * Provides a hint that the slider is not visible and stops all events and expensive updates to
     * be more power efficient.
     */
    hidden: boolean;
    /**
     * The orientation of the slider.
     */
    orientation: SliderOrientation;
    /**
     * A number that specifies the granularity that the slider value must adhere to.
     *
     * A step is an abstract unit that may carry a different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    step: number;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the slider via keyboard.
     *
     * A step is an abstract unit that may carry different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    keyStep: number;
    /**
     * ♿ **ARIA:** A number that will be used to multiply the `keyStep` when the `Shift` key
     * is held down and the slider value is changed by pressing `LeftArrow` or `RightArrow`. Think
     * of it as `keyStep * shiftKeyMultiplier`.
     */
    shiftKeyMultiplier: number;
}

/**
 * Versatile and user-friendly input control designed for seamless cross-browser compatibility and
 * accessibility with ARIA support. It offers a smooth user experience for both mouse and touch
 * interactions and is highly customizable in terms of styling. Users can effortlessly input numeric
 * values within a specified range, defined by a minimum and maximum value.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider}
 */
declare class Slider extends Component<SliderProps, SliderState, SliderEvents, SliderCSSVars> {
    #private;
    static props: SliderProps;
    static state: State<SliderState>;
    constructor();
    protected onSetup(): void;
}
interface SliderProps extends SliderControllerProps {
    /**
     * The lowest slider value in the range of permitted values.
     */
    min: number;
    /**
     * The greatest slider value in the range of permitted values.
     */
    max: number;
    /**
     * The current slider value.
     */
    value: number;
}

interface SliderEvents {
    'drag-start': SliderDragStartEvent;
    'drag-end': SliderDragEndEvent;
    'value-change': SliderValueChangeEvent;
    'drag-value-change': SliderDragValueChangeEvent;
    'pointer-value-change': SliderPointerValueChangeEvent;
}
interface SliderEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: Slider;
}
/**
 * Fired when the user begins interacting with the slider and dragging the thumb. The event
 * detail contains the current value the drag is starting at.
 *
 * @detail value
 */
interface SliderDragStartEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}
/**
 * Fired when the user stops dragging the slider thumb. The event detail contains the value
 * the drag is ending at.
 *
 * @detail value
 */
interface SliderDragEndEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}
/**
 * Fired when the slider value changes. The event detail contains the current value.
 *
 * @detail value
 */
interface SliderValueChangeEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent | undefined;
}
/**
 * Fired when the slider drag value changes. The drag value indicates the last slider value that
 * the user has dragged to. The event detail contains the value.
 *
 * @detail value
 */
interface SliderDragValueChangeEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}
/**
 * Fired when the device pointer is inside the slider region and it's position changes. The
 * event detail contains the preview value. Do note, this includes touch, mouse, and keyboard
 * devices.
 *
 * @detail pointerValue
 */
interface SliderPointerValueChangeEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}

declare class ThumbnailsLoader {
    #private;
    readonly $images: WriteSignal<ThumbnailImage[]>;
    static create(src: ReadSignal<ThumbnailSrc>, crossOrigin: ReadSignal<MediaCrossOrigin | null>): ThumbnailsLoader;
    constructor(src: ReadSignal<ThumbnailSrc>, crossOrigin: ReadSignal<MediaCrossOrigin | null>, media: MediaContext);
}
type ThumbnailSrc = string | ThumbnailImageInit[] | ThumbnailStoryboard | MuxThumbnailStoryboard | null;
interface ThumbnailStoryboard {
    url: string;
    tileWidth: number;
    tileHeight: number;
    tiles: ThumbnailTile[];
}
interface ThumbnailTile {
    startTime: number;
    x: number;
    y: number;
}
interface MuxThumbnailStoryboard {
    url: string;
    tile_width: number;
    tile_height: number;
    tiles: MuxThumbnailTile[];
}
interface MuxThumbnailTile {
    start: number;
    x: number;
    y: number;
}
interface ThumbnailImageInit {
    url: string | URL;
    startTime: number;
    endTime?: number;
    width?: number;
    height?: number;
    coords?: ThumbnailCoords;
}
interface ThumbnailImage extends Omit<ThumbnailImageInit, 'url'> {
    url: URL;
}
interface ThumbnailCoords {
    x: number;
    y: number;
}

/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 */
declare class Thumbnail extends Component<ThumbnailProps, ThumbnailState> {
    #private;
    static props: ThumbnailProps;
    static state: State<ThumbnailState>;
    protected media: MediaContext;
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    protected getTime(): number;
}
interface ThumbnailProps {
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/player/core-concepts/loading#thumbnails}
     */
    src: ThumbnailSrc;
    /**
     * Finds, loads, and displays the first active thumbnail cue that's start/end times are in range.
     */
    time: number;
    /**
     * Defines how the media handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaCrossOrigin | null;
}
interface ThumbnailState {
    src: string;
    img: HTMLImageElement | null | undefined;
    crossOrigin: MediaCrossOrigin | null;
    thumbnails: ThumbnailImage[];
    activeThumbnail: ThumbnailImage | null;
    loading: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}

/**
 * Used to load a low-resolution video to be displayed when the user is hovering over or dragging
 * the time slider. The preview video will automatically be updated to be in-sync with the current
 * preview position, so ensure it has the same length as the original media (i.e., same duration).
 *
 * @attr data-loading - Whether the video is loading.
 * @attr data-error - Whether an error occurred loading video.
 * @attr data-hidden - Whether the video is not ready or has failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-video}
 */
declare class SliderVideo extends Component<SliderVideoProps, SliderVideoState, SliderVideoEvents> {
    #private;
    static props: SliderVideoProps;
    static state: State<SliderVideoState>;
    get video(): HTMLVideoElement | null;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}
interface SliderVideoProps {
    /**
     * The URL of a media resource to use.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src}
     */
    src: string | null;
    /**
     * Defines how the media handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaCrossOrigin | null;
}
interface SliderVideoState {
    video: HTMLVideoElement | null;
    src: string | null;
    crossOrigin: MediaCrossOrigin | null;
    canPlay: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
interface SliderVideoEvents {
    'can-play': SliderVideoCanPlayEvent;
    error: SliderVideoErrorEvent;
}
/**
 * Fired when the user agent can play the media, but estimates that **not enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
 */
interface SliderVideoCanPlayEvent extends DOMEvent<void> {
    target: SliderVideo;
    /** The `canplay` media event. */
    readonly trigger: Event;
}
/**
 * Fired when media loading or playback has encountered any issues (for example, a network
 * connectivity problem). The event detail contains a potential message containing more
 * information about the error (empty string if nothing available), and a code that identifies
 * the general type of error that occurred.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/media.html#error-codes}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event}
 */
interface SliderVideoErrorEvent extends DOMEvent<void> {
    target: SliderVideo;
    /** The `error` media event. */
    readonly trigger: Event;
}

/**
 * Displays the specific numeric representation of the current or pointer value of the slider.
 * When a user interacts with a slider by moving its thumb along the track, the slider value
 * changes accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-value}
 */
declare class SliderValue extends Component<SliderValueProps> {
    #private;
    static props: SliderValueProps;
    protected onSetup(): void;
    /**
     * Returns the current value formatted as text based on prop settings.
     */
    getValueText(): string;
}
interface SliderValueProps {
    /**
     * Whether to use the slider's current value, or pointer value.
     */
    type: 'current' | 'pointer';
    /**
     * Determines how the value is formatted. By default it will use the most appropriate formatting,
     * for the time slider that's time, and for volume percent.
     */
    format: 'value' | 'percent' | 'time' | null;
    /**
     * Whether the time should always show the hours unit, even if the time is less than
     * 1 hour. Only available if the `format` prop is set to `time`.
     *
     * @example `20:30 -> 0:20:35`
     */
    showHours: boolean;
    /**
     * Whether the time should display milliseconds. Only available if the `format` prop is set to
     * `time`.
     */
    showMs: boolean;
    /**
     * Whether the hours unit should be padded with zeroes to a length of 2. Only available if
     * the `format` prop is set to `time`.
     *
     * @example `1:20:03 -> 01:20:03`
     */
    padHours: boolean | null;
    /**
     * Whether the minutes unit should be padded with zeroes to a length of 2. Setting this to `null`
     * will pad minutes when hours is >=1. Only available if the `format` prop is set to `time`.
     *
     * @example `5:22 -> 05:22`
     */
    padMinutes: boolean | null;
    /**
     * Round the value when formatted as a percentage to the given number of decimal places. Only
     * available if `format` prop is `percent`.
     */
    decimalPlaces: number;
}

/**
 * Used to provide users with a real-time or interactive preview of the value or selection they
 * are making as they move the slider thumb. This can include displaying the current pointer
 * value numerically, or displaying a thumbnail over the time slider.
 *
 * @attr data-visible - Whether the preview is visible.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider#preview}
 */
declare class SliderPreview extends Component<SliderPreviewProps> {
    #private;
    static props: SliderPreviewProps;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
declare function updateSliderPreviewPlacement(el: HTMLElement, { clamp, offset, orientation, }: {
    clamp: boolean;
    offset: number;
    orientation: SliderOrientation;
}): void;
interface SliderPreviewProps {
    /**
     * The distance in pixels between the preview and the slider. You can also set
     * the CSS variable `--media-slider-preview-offset` to adjust this offset.
     */
    offset: number;
    /**
     * By default, the preview will be clamped to the left and right of the slider track. If this
     * is set to `true`, the preview will flow outside of the container when at the edges.
     */
    noClamp: boolean;
}

/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether volume control is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 */
declare class VolumeSlider extends Component<VolumeSliderProps, VolumeSliderState, VolumeSliderEvents, VolumeSliderCSSVars> {
    #private;
    static props: VolumeSliderProps;
    static state: State<SliderState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}
interface VolumeSliderProps extends SliderControllerProps {
}
interface VolumeSliderState extends SliderState {
}
interface VolumeSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-volume-change-request'> {
}
interface VolumeSliderCSSVars extends SliderCSSVars {
}

/**
 * Versatile and user-friendly audio boost control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the audio gain within the range 0 to 100.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether audio gain is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/audio-gain-slider}
 */
declare class AudioGainSlider extends Component<AudioGainSliderProps, AudioGainSliderState, AudioGainSliderEvents, AudioGainSliderCSSVars> {
    #private;
    static props: AudioGainSliderProps;
    static state: State<SliderState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}
interface AudioGainSliderProps extends SliderControllerProps {
    /**
     * The minimum audio gain boost represented as a percentage.
     */
    min: number;
    /**
     * The minimum audio gain boost represented as a percentage.
     */
    max: number;
}
interface AudioGainSliderState extends SliderState {
}
interface AudioGainSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-audio-gain-change-request'> {
}
interface AudioGainSliderCSSVars extends SliderCSSVars {
}

/**
 * Versatile and user-friendly input playback rate control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether setting playback rate is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/speed-slider}
 */
declare class SpeedSlider extends Component<SpeedSliderProps, SpeedSliderState, SpeedSliderEvents, SpeedSliderCSSVars> {
    #private;
    static props: SpeedSliderProps;
    static state: State<SliderState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}
interface SpeedSliderProps extends SliderControllerProps {
    /**
     * The minimum playback rate.
     */
    min: number;
    /**
     * The maximum playback rate.
     */
    max: number;
}
interface SpeedSliderState extends SliderState {
}
interface SpeedSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-rate-change-request'> {
}
interface SpeedSliderCSSVars extends SliderCSSVars {
}

/**
 * Versatile and user-friendly input video quality control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether setting video quality is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/quality-slider}
 */
declare class QualitySlider extends Component<QualitySliderProps, QualitySliderState, QualitySliderEvents, QualitySliderCSSVars> {
    #private;
    static props: QualitySliderProps;
    static state: State<SliderState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
}
interface QualitySliderProps extends SliderControllerProps {
}
interface QualitySliderState extends SliderState {
}
interface QualitySliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-quality-change-request'> {
}
interface QualitySliderCSSVars extends SliderCSSVars {
}

/**
 * Versatile and user-friendly input time control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the current playback time within the range 0 to seekable end.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/time-slider}
 */
declare class TimeSlider extends Component<TimeSliderProps, TimeSliderState, TimeSliderEvents, TimeSliderCSSVars> {
    #private;
    static props: TimeSliderProps;
    static state: State<SliderState>;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface TimeSliderCSSVars extends SliderCSSVars {
    /**
     * The percentage of media playback that has been buffered.
     */
    readonly 'slider-progress': string;
}
interface TimeSliderProps extends SliderControllerProps {
    /**
     * Whether it should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     */
    pauseWhileDragging: boolean;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     */
    seekingRequestThrottle: number;
    /**
     * Whether touch swiping left or right on the player canvas should activate the time slider. This
     * gesture makes it easier for touch users to drag anywhere on the player left or right to
     * seek backwards or forwards, without directly interacting with time slider.
     */
    noSwipeGesture: boolean;
}
interface TimeSliderState extends SliderState {
}
interface TimeSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-play-request' | 'media-pause-request' | 'media-seeking-request' | 'media-seek-request' | 'media-live-edge-request'> {
}

/**
 * Used to create predefined sections within a time slider interface based on the currently
 * active chapters text track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-chapters}
 */
declare class SliderChapters extends Component<SliderChaptersProps, {}, SliderChaptersCSSVars> {
    #private;
    static props: SliderChaptersProps;
    get cues(): VTTCue$1[];
    get activeCue(): VTTCue$1 | null;
    get activePointerCue(): VTTCue$1 | null;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(): void;
    protected onDestroy(): void;
    setRefs(refs: HTMLElement[]): void;
}
interface SliderChaptersProps {
    /**
     * Whether chapters should be disabled.
     */
    disabled: boolean;
}
interface SliderChaptersCSSVars {
    /**
     * The percentage of the chapter that is filled.
     */
    readonly 'chapter-fill': string;
    /**
     * The percentage of the chapter that has been buffered.
     */
    readonly 'chapter-progress': string;
}

/**
 * Root menu container used to hold and manage a menu button and menu items. This component is
 * used to display options in a floating panel. They can be nested to create submenus.
 *
 * @attr data-root - Whether this is the root menu items.
 * @attr data-submenu - Whether menu is a submenu.
 * @attr data-open - Whether menu is open.
 * @attr data-keyboard - Whether the menu is opened via keyboard.
 * @attr data-disabled - Whether menu is disabled.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class Menu extends Component<MenuProps, {}, MenuEvents> {
    #private;
    static props: MenuProps;
    /**
     * The menu trigger element.
     */
    get triggerElement(): HTMLElement | null;
    /**
     * The menu items element.
     */
    get contentElement(): HTMLElement | null;
    /**
     * Whether this menu is the child of another menu that contains it.
     */
    get isSubmenu(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    /**
     * Open this menu. The first menu item will be focused if a `KeyboardEvent` trigger is provided
     */
    open(trigger?: Event): void;
    /**
     * Close this menu. The menu button that controls this menu will be focused if a `KeyboardEvent`
     * trigger is provided
     */
    close(trigger?: Event): void;
}
interface MenuProps {
    /**
     * The amount of time in milliseconds to wait before showing the menu.
     */
    showDelay: number;
}
interface MenuEvents extends Pick<MediaRequestEvents, 'media-pause-controls-request' | 'media-resume-controls-request'> {
    open: MenuOpenEvent;
    close: MenuCloseEvent;
}
/**
 * Fired when the menu is opened.
 */
interface MenuOpenEvent extends DOMEvent<void> {
    target: Menu;
}
/**
 * Fired when the menu is closed.
 */
interface MenuCloseEvent extends DOMEvent<void> {
    target: Menu;
}

/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * menuitem when used inside a submenu.
 *
 * @attr data-root - Whether this is the root menu button.
 * @attr data-submenu - Whether menu button is part of a submenu.
 * @attr data-open - Whether menu is currently open.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class MenuButton extends Component<MenuButtonProps, {}, MenuButtonEvents> {
    #private;
    static props: MenuButtonProps;
    get expanded(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface MenuButtonProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
interface MenuButtonEvents {
    select: MenuButtonSelectEvent;
}
/**
 * Fired when the button is pressed via mouse, touch, or keyboard.
 */
interface MenuButtonSelectEvent extends DOMEvent<void> {
    target: MenuButton;
}

/**
 * Represents a specific option or action, typically displayed as a text label or icon, which
 * users can select to access or perform a particular function or view related content.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class MenuItem extends MenuButton {
}

/**
 * Portals menu items into the document body.
 *
 * @attr data-portal - Whether portal is active (determined by `disabled` prop).
 * @docs {@link https://www.vidstack.io/docs/player/components/menu#portal}
 */
declare class MenuPortal extends Component<MenuPortalProps> {
    #private;
    static props: MenuPortalProps;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
}
interface MenuPortalProps {
    /**
     * Specifies a DOM element or query selector for the container that the menu should be portalled
     * inside. Defaults to `document.body` when set to `null`.
     */
    container: string | HTMLElement | null;
    /**
     * Whether the portal should be disabled. The value can be the string "fullscreen" to disable
     * portals while media is fullscreen. This is to ensure the menu remains visible.
     */
    disabled: boolean | 'fullscreen';
}
interface MenuPortalContext {
    attach(element: HTMLElement | null): void;
}
declare const menuPortalContext: Context<MenuPortalContext | null>;

/**
 * Menu items can be used to display settings or arbitrary content in a floating panel.
 *
 * @attr data-root - Whether this is the root menu items.
 * @attr data-submenu - Whether menu items are part of a submenu.
 * @attr data-open - Whether menu items are currently visible.
 * @attr data-keyboard - Whether the menu is opened via keyboard.
 * @attr data-placement - The placement prop setting.
 * @attr data-focus - Whether item are being keyboard focused.
 * @attr data-hocus - Whether items are being keyboard focused or hovered over.
 * @attr data-transition - Whether the menu is resizing.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class MenuItems extends Component<MenuItemsProps> {
    #private;
    static props: MenuItemsProps;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
type MenuPlacement = MenuPlacementSide | `${MenuPlacementSide} ${MenuPlacementAlign}`;
type MenuPlacementSide = 'top' | 'right' | 'bottom' | 'left';
type MenuPlacementAlign = 'start' | 'center' | 'end';
interface MenuItemsProps {
    /**
     * A space-separated list which specifies the side and alignment of the menu relative
     * to the menu button.
     *
     * @example `top center`
     * @example `bottom end`
     */
    placement: MenuPlacement | null;
    /**
     * The distance in pixels between the menu items and the menu button. You can also set
     * the CSS variable `--media-menu-y-offset` to adjust this offset.
     */
    offset: number;
    /**
     * The offset in pixels from the start/center/end aligned position. You can also set
     * the CSS variable `--media-menu-x-offset` to adjust this offset.
     */
    alignOffset: number;
}

/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 */
declare class RadioGroup extends Component<RadioGroupProps, {}, RadioGroupEvents> {
    #private;
    static props: RadioGroupProps;
    /**
     * A list of radio values that belong this group.
     */
    get values(): string[];
    /**
     * The radio value that is checked in this group.
     */
    get value(): string;
    set value(newValue: string);
    constructor();
    protected onSetup(): void;
}
interface RadioGroupProps {
    /**
     * The value of the radio that is checked in this group.
     */
    value: string;
}
interface RadioGroupEvents {
    change: RadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail value
 */
interface RadioGroupChangeEvent extends DOMEvent<string> {
    target: RadioGroup;
}

/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @attr data-checked - Whether radio is checked.
 * @attr data-focus - Whether radio is being keyboard focused.
 * @attr data-hocus - Whether radio is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 */
declare class Radio extends Component<RadioProps, {}, RadioEvents> {
    #private;
    static props: RadioProps;
    /**
     * Whether this radio is currently checked.
     */
    get checked(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface RadioProps {
    /** The radio value. */
    value: string;
}
interface RadioEvents {
    change: RadioChangeEvent;
    select: RadioSelectEvent;
}
/**
 * Fired when the radio's checked value changes.
 *
 * @detail isSelected
 */
interface RadioChangeEvent extends DOMEvent<boolean> {
    target: Radio;
}
/**
 * Fired when the radio is pressed via mouse, touch, or, keyboard. This will not fire if the radio
 * is programmatically selected.
 */
interface RadioSelectEvent extends DOMEvent<void> {
    target: Radio;
}
interface RadioOption {
    label: string | ReadSignal<string>;
    value: string;
}

/**
 * This component manages media chapters inside of a radio group.
 *
 * @attr data-thumbnails - Whether thumbnails are available.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/chapters-radio-group}
 */
declare class ChaptersRadioGroup extends Component<ChapterRadioGroupProps, {}, ChaptersRadioGroupEvents> {
    #private;
    static props: ChapterRadioGroupProps;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    getOptions(): ChaptersRadioOption[];
    protected onConnect(el: HTMLElement): void;
}
interface ChapterRadioGroupProps {
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/player/core-concepts/loading#thumbnails}
     */
    thumbnails: ThumbnailSrc;
}
interface ChaptersRadioGroupEvents {
    change: ChaptersRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail cue
 */
interface ChaptersRadioGroupChangeEvent extends DOMEvent<VTTCue$1> {
    target: ChaptersRadioGroup;
}
interface ChaptersRadioOption extends RadioOption {
    cue: VTTCue$1;
    startTime: string;
    duration: string;
}

/**
 * This component manages audio track radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-radio-group}
 */
declare class AudioRadioGroup extends Component<AudioRadioGroupProps, {}, AudioRadioGroupEvents> {
    #private;
    static props: AudioRadioGroupProps;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): AudioRadioOption[];
}
interface AudioRadioGroupProps {
    /** The text to display when the are no audio tracks. */
    emptyLabel: string;
}
interface AudioRadioGroupEvents {
    change: AudioRadioGroupChangeEvent;
}
interface AudioRadioOption extends RadioOption {
    track: AudioTrack;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail track
 */
interface AudioRadioGroupChangeEvent extends DOMEvent<AudioTrack> {
    target: AudioRadioGroup;
}

declare const DEFAULT_AUDIO_GAINS: number[];
/**
 * This component manages audio gain radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-gain-radio-group}
 */
declare class AudioGainRadioGroup extends Component<AudioGainRadioGroupProps, {}, AudioGainRadioGroupEvents> {
    #private;
    static props: AudioGainRadioGroupProps;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): RadioOption[];
}
interface AudioGainRadioGroupProps {
    /** The audio gain options to be displayed. */
    gains: number[];
    /** The text to display for disabled audio gain (i.e., audio gain is 1.0). */
    normalLabel: string;
}
interface AudioGainRadioGroupEvents {
    change: AudioGainRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail gain
 */
interface AudioGainRadioGroupChangeEvent extends DOMEvent<number> {
    target: AudioGainRadioGroup;
}

/**
 * This component manages caption/subtitle track radio options.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/captions-radio-group}
 */
declare class CaptionsRadioGroup extends Component<CaptionsRadioGroupProps, {}, CaptionsRadioGroupEvents> {
    #private;
    static props: CaptionsRadioGroupProps;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): CaptionsRadioOption[];
}
interface CaptionsRadioGroupProps {
    /** The text to display when the captions are turned off. */
    offLabel: string;
}
interface CaptionsRadioGroupEvents {
    change: CaptionsRadioGroupChangeEvent;
}
interface CaptionsRadioOption extends RadioOption {
    track?: TextTrack;
}
/**
 * Fired when the checked radio changes. The event detail will be `null` when no track is selected
 * or captions are turned off.
 *
 * @detail track
 */
interface CaptionsRadioGroupChangeEvent extends DOMEvent<TextTrack | null> {
    target: CaptionsRadioGroup;
}

declare const DEFAULT_PLAYBACK_RATES: number[];
/**
 * This component manages playback rate radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/speed-radio-group}
 */
declare class SpeedRadioGroup extends Component<SpeedRadioGroupProps, {}, SpeedRadioGroupEvents> {
    #private;
    static props: SpeedRadioGroupProps;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): RadioOption[];
}
interface SpeedRadioGroupProps {
    /** The playback rate options to be displayed. */
    rates: number[];
    /** The text to display for normal speed (i.e., playback rate of 1). */
    normalLabel: string;
}
interface SpeedRadioGroupEvents {
    change: SpeedRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail speed
 */
interface SpeedRadioGroupChangeEvent extends DOMEvent<number> {
    target: SpeedRadioGroup;
}

/**
 * This component manages video quality radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/quality-radio-group}
 */
declare class QualityRadioGroup extends Component<QualityRadioGroupProps, {}, QualityRadioGroupEvents> {
    #private;
    static props: QualityRadioGroupProps;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): QualityRadioOption[];
}
interface QualityRadioGroupProps {
    /** The text to display for the auto quality radio option. */
    autoLabel: string;
    /** Whether the bitrate should _not_ be displayed next to each quality radio option. */
    hideBitrate: boolean;
    /**
     * Specifies how the options should be sorted. The sorting algorithm looks at both the quality
     * resolution and bitrate.
     *
     * - Ascending: 480p, 720p, 720p (higher bitrate), 1080p
     * - Descending: 1080p, 720p (higher bitrate), 720p, 480p
     */
    sort: 'ascending' | 'descending';
}
interface QualityRadioOption extends RadioOption {
    quality?: VideoQuality;
    bitrate?: ReadSignal<string | null>;
}
interface QualityRadioGroupEvents {
    change: QualityRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail quality
 */
interface QualityRadioGroupChangeEvent extends DOMEvent<'auto' | VideoQuality> {
    target: QualityRadioGroup;
}

/**
 * This component enables actions to be performed on the media based on user gestures.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/gesture}
 */
declare class Gesture extends Component<GestureProps, {}, GestureEvents> {
    #private;
    static props: GestureProps;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface GestureProps {
    /**
     * Whether this gesture should not be triggered.
     */
    disabled: boolean;
    /**
     * The DOM event type that will trigger this gesture. It can be any valid DOM event type. Any
     * event can be prefixed with `dbl` to ensure it occurs twice in succession (max 200ms gap).
     *
     * @example 'pointerup'
     * @example 'dblpointerup'
     * @example 'mouseleave'
     */
    event: GestureEventType | undefined;
    /**
     * An action describes the type of media request event that will be dispatched, which will
     * ultimately perform some operation on the player.
     *
     * @example 'play'
     * @example 'seek:30'
     * @example 'seek:-30'
     * @example 'toggle:paused'
     */
    action: GestureAction | undefined;
}
type GestureEventType = keyof HTMLElementEventMap | `dbl${keyof HTMLElementEventMap}`;
type GestureAction = 'play' | 'pause' | `seek:${number}` | `toggle:${'paused' | 'muted' | 'fullscreen' | 'controls'}`;
interface GestureEvents {
    'will-trigger': GestureWillTriggerEvent;
    trigger: GestureTriggerEvent;
}
interface GestureEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: Gesture;
}
/**
 * This event will fire before the gesture action is triggered. Calling `event.preventDefault()`
 * will stop the action from being triggered.
 *
 * @detail action
 * @cancelable
 */
interface GestureWillTriggerEvent extends GestureEvent<GestureAction> {
}
/**
 * This event will fire after the gesture action has been triggered.
 *
 * @detail action
 */
interface GestureTriggerEvent extends GestureEvent<GestureAction> {
}

interface CaptionsProps {
    textDir: 'ltr' | 'rtl';
    /**
     * The text to be displayed when an example caption is being shown.
     */
    exampleText: string;
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 */
declare class Captions extends Component<CaptionsProps> {
    #private;
    static props: CaptionsProps;
    static lib: WriteSignal<typeof media_captions | null>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}

interface PosterProps {
    /**
     * The URL of the poster image resource.
     */
    src: string | null;
    /**
     * ♿ **ARIA:** Provides alternative information for a poster image if a user for some reason
     * cannot view it.
     */
    alt: string | null;
    /**
     * Defines how the img handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaCrossOrigin | null;
}
interface PosterState {
    img: HTMLImageElement | null;
    src: string | null;
    alt: string | null;
    crossOrigin: MediaCrossOrigin | null;
    loading: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
/**
 * Loads and displays the current media poster image. By default, the media provider's
 * loading strategy is respected meaning the poster won't load until the media can.
 *
 * @attr data-visible - Whether poster image should be shown.
 * @attr data-loading - Whether poster image is loading.
 * @attr data-error - Whether an error occurred loading poster.
 * @attr data-hidden - Whether poster has no src or has failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/poster}
 */
declare class Poster extends Component<PosterProps, PosterState> {
    #private;
    static props: PosterProps;
    static state: State<PosterState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}

/**
 * Outputs a media duration (eg: `currentTime`, `duration`, `bufferedAmount`, etc.) value as time
 * formatted text.
 *
 * @attr data-type - The type prop setting (current, duration, etc.).
 * @attr data-remainder - Whether time remaining is being shown.
 * @docs {@link https://www.vidstack.io/docs/player/components/display/time}
 */
declare class Time extends Component<TimeProps, TimeState> {
    #private;
    static props: TimeProps;
    static state: State<TimeState>;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
}
interface TimeProps {
    /**
     * The type of media time to track.
     */
    type: 'current' | 'buffered' | 'duration';
    /**
     * Whether the time should always show the hours unit, even if the time is less than
     * 1 hour.
     *
     * @example `20:30 -> 0:20:35`
     */
    showHours: boolean;
    /**
     * Whether the hours unit should be padded with zeroes to a length of 2.
     *
     * @example `1:20:03 -> 01:20:03`
     */
    padHours: boolean | null;
    /**
     * Whether the minutes unit should be padded with zeroes to a length of 2.
     *
     * @example `5:22 -> 05:22`
     */
    padMinutes: boolean | null;
    /**
     * Whether to display the remaining time from the current type, until the duration is reached.
     *
     * @example `duration` - `currentTime`
     */
    remainder: boolean;
    /**
     * Whether on press the time should invert showing the remaining time (i.e., toggle the
     * `remainder` prop).
     */
    toggle: boolean;
    /**
     * Provides a hint that the time is not visible and stops all events and updates to be more
     * power efficient.
     */
    hidden: boolean;
}
interface TimeState {
    timeText: string;
    hidden: boolean;
}

type FileDownloadInfo = boolean | string | {
    url: string;
    filename: string;
} | null;
declare function getDownloadFile({ title, src, download, }: {
    src: Src;
    title: string;
    download?: FileDownloadInfo;
}): {
    url: unknown;
    name: string;
} | null;

type DefaultLayoutWord = 'Announcements' | 'Accessibility' | 'AirPlay' | 'Audio' | 'Auto' | 'Boost' | 'Captions' | 'Caption Styles' | 'Captions look like this' | 'Chapters' | 'Closed-Captions Off' | 'Closed-Captions On' | 'Connected' | 'Continue' | 'Connecting' | 'Default' | 'Disabled' | 'Disconnected' | 'Display Background' | 'Download' | 'Enter Fullscreen' | 'Enter PiP' | 'Exit Fullscreen' | 'Exit PiP' | 'Font' | 'Family' | 'Fullscreen' | 'Google Cast' | 'Keyboard Animations' | 'LIVE' | 'Loop' | 'Mute' | 'Normal' | 'Off' | 'Pause' | 'Play' | 'Playback' | 'PiP' | 'Quality' | 'Replay' | 'Reset' | 'Seek Backward' | 'Seek Forward' | 'Seek' | 'Settings' | 'Skip To Live' | 'Speed' | 'Size' | 'Color' | 'Opacity' | 'Shadow' | 'Text' | 'Text Background' | 'Track' | 'Unmute' | 'Volume';
type DefaultLayoutTranslations = {
    [word in DefaultLayoutWord]: string;
};

interface DefaultLayoutProps {
    /**
     * Determines when the UI should be displayed.
     */
    when: boolean | MediaPlayerQuery;
    /**
     * Determines when the small (e.g., mobile) UI should be displayed.
     */
    smallWhen: 'never' | boolean | MediaPlayerQuery;
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/wc/player/core-concepts/loading#thumbnails}
     */
    thumbnails: ThumbnailSrc;
    /**
     * Whether light or dark color theme should be active. Defaults to user operating system
     * preference.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme}
     */
    colorScheme: 'light' | 'dark' | 'system' | 'default';
    /**
     * Sets the download URL and filename for the download button.
     */
    download: FileDownloadInfo;
    /**
     * Whether the default icons should _not_ be loaded. Set this to `true` when providing your own
     * icons.
     */
    customIcons: boolean;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations: Partial<DefaultLayoutTranslations> | null;
    /**
     * A document query selector string or `HTMLElement` to mount the menu container inside. Defaults
     * to `document.body` when set to `null`.
     */
    menuContainer: string | HTMLElement | null;
    /**
     * Specifies whether menu buttons should be placed in the top or bottom controls group. This
     * only applies to the large video layout.
     */
    menuGroup: 'top' | 'bottom';
    /**
     * Do not split settings menu into submenus
     */
    flatSettingsMenu: boolean;
    /**
     * Disable audio boost slider in the settings menu.
     */
    noAudioGain: boolean;
    /**
     * Disable audio tracks in the settings menu.
     */
    noAudioTracks: boolean;
    /**
     * Disable loop switch in the settings menu.
     */
    noMediaLoop: boolean;
    /**
     * Disable media speed slider in the settings menu.
     */
    noMediaSpeed: boolean;
    /**
     * Disable media quality slider in the settings menu.
     */
    noMediaQuality: boolean;
    /**
     * Whether modal menus should be disabled when the small layout is active. A modal menu is
     * a floating panel that floats up from the bottom of the screen (outside of the player). It's
     * enabled by default as it provides a better user experience for touch devices.
     */
    noModal: boolean;
    /**
     * Whether to disable scrubbing by touch swiping left or right on the player canvas.
     */
    noScrubGesture: boolean;
    /**
     * The minimum width of the slider to start displaying slider chapters when available.
     */
    sliderChaptersMinWidth: number;
    /**
     * Whether the time slider should be disabled.
     */
    disableTimeSlider: boolean;
    /**
     * Whether all gestures such as press to play or seek should not be active.
     */
    noGestures: boolean;
    /**
     * Whether announcements should not be displayed.
     */
    noAnnouncements: boolean;
    /**
     * Whether keyboard actions should not be displayed.
     */
    noKeyboardAnimations: boolean;
    /**
     * Whether caption styles should not be displayed.
     */
    noCaptionStyles: boolean;
    /**
     * Whether captions should not be displayed.
     */
    noCaptions: boolean;
    /**
     * Whether the bitrate should be hidden in the settings quality hint.
     *
     * @defaultValue false
     */
    hideQualityBitrate: boolean;
    /**
     * The playback rate options to be displayed in the settings menu.
     */
    playbackRates: number[] | {
        min: number;
        max: number;
        step: number;
    };
    /**
     * The audio gain options to be displayed in the settings menu.
     */
    audioGains: number[] | {
        min: number;
        max: number;
        step: number;
    };
    /**
     * The number of seconds to seek forward or backward when pressing the seek button or using
     * keyboard shortcuts.
     */
    seekStep: number;
}

type PlyrLayoutWord = 'Ad' | 'All' | 'AirPlay' | 'Audio' | 'Auto' | 'Buffered' | 'Captions' | 'Current time' | 'Default' | 'Disable captions' | 'Disabled' | 'Download' | 'Duration' | 'Enable captions' | 'Enabled' | 'End' | 'Enter Fullscreen' | 'Exit Fullscreen' | 'Forward' | 'Go back to previous menu' | 'LIVE' | 'Loop' | 'Mute' | 'Normal' | 'Pause' | 'Enter PiP' | 'Exit PiP' | 'Play' | 'Played' | 'Quality' | 'Reset' | 'Restart' | 'Rewind' | 'Seek' | 'Settings' | 'Speed' | 'Start' | 'Unmute' | 'Volume';
type PlyrLayoutTranslations = {
    [word in PlyrLayoutWord]: string;
};

interface PlyrLayoutProps {
    /**
     * Press the video container to toggle play/pause.
     */
    clickToPlay: boolean;
    /**
     * Double-press the video container to toggle fullscreen.
     */
    clickToFullscreen: boolean;
    /**
     * The controls to be included in the layout and their order specified by the position in the
     * array.
     */
    controls: PlyrControl[];
    /**
     * Whether the default icons should _not_ be loaded. Set this to `true` when providing your own
     * icons.
     */
    customIcons: boolean;
    /**
     * Whether the duration should be displayed. This is ignored if `toggleTime` is `true`.
     */
    displayDuration: boolean;
    /**
     * Sets the download URL and filename for the download button. The download button must be
     * included in the `controls` prop for this to take effect.
     */
    download: FileDownloadInfo;
    /**
     * Points on the time slider which should be visually marked for the user.
     */
    markers: PlyrMarker[] | null;
    /**
     * Display the current time as a countdown rather than an incremental counter.
     */
    invertTime: boolean;
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/wc/player/core-concepts/loading#thumbnails}
     */
    thumbnails: ThumbnailSrc;
    /**
     * Allow users to press to toggle the inverted time.
     */
    toggleTime: boolean;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations: Partial<PlyrLayoutTranslations> | null;
    /**
     * The time, in seconds, to seek when a user hits fast forward or rewind.
     */
    seekTime: number;
    /**
     * The speed options to display in the UI.
     */
    speed: (string | number)[];
}
type PlyrControl = 'airplay' | 'captions' | 'current-time' | 'download' | 'duration' | 'fast-forward' | 'fullscreen' | 'mute' | 'mute+volume' | 'pip' | 'play-large' | 'play' | 'progress' | 'restart' | 'rewind' | 'settings' | 'volume';
interface PlyrMarker {
    time: number;
    label: string;
}

declare class PlyrLayout extends Component<PlyrLayoutProps> {
    #private;
    static props: PlyrLayoutProps;
    protected onSetup(): void;
}
declare function usePlyrLayoutClasses(el: HTMLElement, media: MediaContext): () => void;

export { AirPlayButton, type AirPlayButtonEvents, type AirPlayButtonProps, type AnyMediaProvider, AudioGainRadioGroup, type AudioGainRadioGroupChangeEvent, type AudioGainRadioGroupEvents, type AudioGainRadioGroupProps, AudioGainSlider, type AudioGainSliderCSSVars, type AudioGainSliderEvents, type AudioGainSliderProps, type AudioGainSliderState, type AudioMimeType, AudioProvider, AudioRadioGroup, type AudioRadioGroupChangeEvent, type AudioRadioGroupEvents, type AudioRadioGroupProps, type AudioRadioOption, type AudioSrc, type AudioSrcMeta, type AudioTrack, type AudioTrackAddEvent, type AudioTrackChangeEvent, AudioTrackList, type AudioTrackListEvent, type AudioTrackListEvents, type AudioTrackRemoveEvent, CaptionButton, type CaptionButtonEvents, type CaptionButtonProps, Captions, type CaptionsProps, CaptionsRadioGroup, type CaptionsRadioGroupChangeEvent, type CaptionsRadioGroupEvents, type CaptionsRadioGroupProps, type CaptionsRadioOption, type ChangeAudioTrackEventDetail, type ChapterRadioGroupProps, ChaptersRadioGroup, type ChaptersRadioGroupChangeEvent, type ChaptersRadioGroupEvents, type ChaptersRadioOption, Controls, type ControlsChangeEvent, type ControlsEvents, ControlsGroup, type ControlsProps, type DASHAdaptationSetRemovedNoCapabilitiesEvent, type DASHAllTextTracksAddedEvent, type DASHAstInFutureEvent, type DASHBaseUrlsUpdatedEvent, type DASHBufferLevelUpdatedEvent, type DASHBufferLoadedEvent, type DASHBufferStalledEvent, type DASHBufferStateChangedEvent, type DASHCanPlayEvent, type DASHCanPlayThroughEvent, type DASHCaptionContainerResizeEvent, type DASHCaptionRenderedEvent, type DASHConformanceViolationEvent, type DASHConstructor, type DASHConstructorLoader, type DASHContentSteeringRequestCompletedEvent, type DASHCueEnterEvent, type DASHCueExitEvent, type DASHDvbFontDownloadAddedEvent, type DASHDvbFontDownloadCompleteEvent, type DASHDvbFontDownloadFailedEvent, type DASHDynamicToStaticEvent, type DASHErrorEvent, type DASHEventModeOnReceiveEvent, type DASHEventModeOnStartEvent, type DASHFragmentLoadingAbandonedEvent, type DASHFragmentLoadingCompletedEvent, type DASHFragmentLoadingProgressEvent, type DASHFragmentLoadingStartedEvent, type DASHInbandPrftEvent, type DASHInstanceCallback, type DASHInstanceEvent, type DASHLibLoadErrorEvent, type DASHLibLoadStartEvent, type DASHLibLoadedEvent, type DASHLibrary, type DASHLogEvent, type DASHManagedMediaSourceEndStreamingEvent, type DASHManagedMediaSourceStartStreamingEvent, type DASHManifestLoadedEvent, type DASHManifestLoadingFinishedEvent, type DASHManifestLoadingStartedEvent, type DASHManifestValidityChangedEvent, type DASHMediaEvent, type DASHMetricAddedEvent, type DASHMetricChangedEvent, type DASHMetricUpdatedEvent, type DASHMetricsChangedEvent, type DASHMimeType, type DASHNamespace, type DASHNamespaceLoader, type DASHPeriodSwitchCompletedEvent, type DASHPeriodSwitchStartedEvent, type DASHPlaybackEndedEvent, type DASHPlaybackErrorEvent, type DASHPlaybackLoadedDataEvent, type DASHPlaybackMetaDataLoadedEvent, type DASHPlaybackNotAllowedEvent, type DASHPlaybackPausedEvent, type DASHPlaybackPlayingEvent, type DASHPlaybackProgressEvent, type DASHPlaybackRateChangedEvent, type DASHPlaybackSeekedEvent, type DASHPlaybackSeekingEvent, type DASHPlaybackStalledEvent, type DASHPlaybackStartedEvent, type DASHPlaybackTimeUpdatedEvent, type DASHPlaybackVolumeChangedEvent, type DASHPlaybackWaitingEvent, DASHProvider, type DASHProviderEvents, type DASHQualityChangeRenderedEvent, type DASHQualityChangeRequestedEvent, type DASHRepresentationSwitchEvent, type DASHSrc, type DASHStreamActivatedEvent, type DASHStreamDeactivatedEvent, type DASHStreamInitializedEvent, type DASHStreamInitializingEvent, type DASHStreamTeardownCompleteEvent, type DASHStreamUpdatedEvent, type DASHTextTrackAddedEvent, type DASHThroughputMeasurementStoredEvent, type DASHTrackChangeRenderedEvent, type DASHTtmlParsedEvent, type DASHTtmlToParseEvent, type DASHUnsupportedEvent, DEFAULT_AUDIO_GAINS, DEFAULT_PLAYBACK_RATES, type DefaultLayoutProps, type DefaultLayoutTranslations, type DefaultLayoutWord, type FileDownloadInfo, type FindMediaPlayerEvent, type FindMediaPlayerEventDetail, type FullscreenAdapter, FullscreenButton, type FullscreenButtonEvents, type FullscreenButtonProps, type FullscreenChangeEvent, FullscreenController, type FullscreenErrorEvent, type FullscreenEvents, Gesture, type GestureAction, type GestureEvent, type GestureEventType, type GestureEvents, type GestureProps, type GestureTriggerEvent, type GestureWillTriggerEvent, GoogleCastButton, type GoogleCastButtonEvents, type GoogleCastButtonProps, type GoogleCastEvent, type GoogleCastEvents, type GoogleCastLoadStartEvent, type GoogleCastLoadedEvent, type GoogleCastPromptError, type GoogleCastPromptErrorCode, type GoogleCastPromptErrorEvent, type GoogleCastPromptEvent, GoogleCastProvider, type HLSAudioTrackLoadedEvent, type HLSAudioTrackLoadingEvent, type HLSAudioTrackSwitchedEvent, type HLSAudioTrackSwitchingEvent, type HLSAudioTracksUpdatedEvent, type HLSBackBufferReachedEvent, type HLSBufferAppendedEvent, type HLSBufferAppendingEvent, type HLSBufferCodecsEvent, type HLSBufferCreatedEvent, type HLSBufferEosEvent, type HLSBufferFlushedEvent, type HLSBufferFlushingEvent, type HLSBufferResetEvent, type HLSConstructor, type HLSConstructorLoader, type HLSCuesParsedEvent, type HLSDestroyingEvent, type HLSErrorEvent, type HLSFpsDropEvent, type HLSFpsDropLevelCappingEvent, type HLSFragBufferedDataEvent, type HLSFragChangedEvent, type HLSFragDecryptedEvent, type HLSFragLoadEmergencyAbortedEvent, type HLSFragLoadedEvent, type HLSFragLoadingEvent, type HLSFragParsedEvent, type HLSFragParsingInitSegmentEvent, type HLSFragParsingMetadataEvent, type HLSFragParsingUserdataEvent, type HLSInitPtsFoundEvent, type HLSInstanceCallback, type HLSInstanceEvent, type HLSKeyLoadedEvent, type HLSKeyLoadingEvent, type HLSLevelLoadedEvent, type HLSLevelLoadingEvent, type HLSLevelPtsUpdatedEvent, type HLSLevelSwitchedEvent, type HLSLevelSwitchingEvent, type HLSLevelUpdatedEvent, type HLSLevelsUpdatedEvent, type HLSLibLoadErrorEvent, type HLSLibLoadStartEvent, type HLSLibLoadedEvent, type HLSLibrary, type HLSManifestLoadedEvent, type HLSManifestLoadingEvent, type HLSManifestParsedEvent, type HLSMediaAttachedEvent, type HLSMediaAttachingEvent, type HLSMediaDetachedEvent, type HLSMediaDetachingEvent, type HLSMediaEvent, type HLSMimeType, type HLSNonNativeTextTracksFoundEvent, HLSProvider, type HLSProviderEvents, type HLSSrc, type HLSSubtitleFragProcessedEvent, type HLSSubtitleTrackLoadedEvent, type HLSSubtitleTrackLoadingEvent, type HLSSubtitleTrackSwitchEvent, type HLSSubtitleTracksClearedEvent, type HLSSubtitleTracksUpdatedEvent, type HLSUnsupportedEvent, type HTMLMediaSrc, List, type ListAddEvent, type ListEvents, type ListItem, type ListReadonlyChangeEvent, type ListRemoveEvent, LiveButton, type LiveButtonEvents, type LiveButtonProps, LocalMediaStorage, type LogEvent, type LogEventDetail, type LogLevel, Logger, type LoggerEvents, type MediaAbortEvent, type MediaAirPlayRequestEvent, MediaAnnouncer, type MediaAnnouncerEvents, type MediaAnnouncerProps, type MediaAnnouncerState, type MediaAnnouncerTranslations, type MediaAnnouncerWord, type MediaAudioGainChangeEvent, type MediaAudioGainChangeRequestEvent, type MediaAudioTrackChangeEvent, type MediaAudioTrackChangeRequestEvent, type MediaAudioTracksChangeEvent, type MediaAutoPlayChangeEvent, type MediaAutoPlayEvent, type MediaAutoPlayEventDetail, type MediaAutoPlayFailEvent, type MediaAutoPlayFailEventDetail, type MediaCanLoadEvent, type MediaCanLoadPosterEvent, type MediaCanPlayDetail, type MediaCanPlayEvent, type MediaCanPlayThroughEvent, type MediaClipEndChangeRequestEvent, type MediaClipStartChangeRequestEvent, type MediaContext, MediaControls, type MediaControlsChangeEvent, type MediaCrossOrigin, type MediaDestroyEvent, type MediaDurationChangeEvent, type MediaDurationChangeRequestEvent, type MediaEmptiedEvent, type MediaEndEvent, type MediaEndedEvent, type MediaEnterFullscreenRequestEvent, type MediaEnterPIPRequestEvent, type MediaErrorCode, type MediaErrorDetail, type MediaErrorEvent, type MediaEvent, type MediaEvents, type MediaExitFullscreenRequestEvent, type MediaExitPIPRequestEvent, type MediaFullscreenAdapter, type MediaFullscreenChangeEvent, type MediaFullscreenErrorEvent, type MediaFullscreenRequestTarget, type MediaGoogleCastRequestEvent, type MediaHidePosterRequestEvent, type MediaKeyShortcut, type MediaKeyShortcuts, type MediaKeyTarget, type MediaKeysCallback, type MediaLiveChangeEvent, type MediaLiveEdgeChangeEvent, type MediaLiveEdgeRequestEvent, type MediaLoadStartEvent, type MediaLoadedDataEvent, type MediaLoadedMetadataEvent, type MediaLoadingStrategy, type MediaLoopChangeEvent, type MediaLoopRequestEvent, type MediaMuteRequestEvent, type MediaOrientationChangeEvent, type MediaOrientationLockRequestEvent, type MediaOrientationUnlockRequestEvent, type MediaPIPChangeEvent, type MediaPIPErrorEvent, type MediaPauseControlsRequestEvent, type MediaPauseEvent, type MediaPauseRequestEvent, type MediaPlayEvent, type MediaPlayFailEvent, type MediaPlayRequestEvent, MediaPlayer, type MediaPlayerConnectEvent, type MediaPlayerEvents, type MediaPlayerProps, type MediaPlayerQuery, type MediaPlayerState, type MediaPlayingEvent, type MediaPlaysInlineChangeEvent, type MediaPosterChangeEvent, type MediaPosterLoadingStrategy, type MediaPosterStartLoadingRequestEvent, type MediaProgressEvent, type MediaProgressEventDetail, MediaProvider, type MediaProviderAdapter, type MediaProviderChangeEvent, type MediaProviderLoader, type MediaProviderLoaderChangeEvent, type MediaProviderProps, type MediaProviderSetupEvent, type MediaProviderState, type MediaQualitiesChangeEvent, type MediaQualityChangeEvent, type MediaQualityChangeRequestEvent, type MediaRateChangeEvent, type MediaRateChangeRequestEvent, MediaRemoteControl, type MediaRemotePlaybackChangeEvent, type MediaRemotePlaybackChangeEventDetail, type MediaReplayEvent, type MediaRequestEvents, type MediaResumeControlsRequestEvent, type MediaSeekRequestEvent, type MediaSeekedEvent, type MediaSeekingEvent, type MediaSeekingRequestEvent, type MediaShowPosterRequestEvent, type MediaSourceChangeEvent, type MediaSourcesChangeEvent, type MediaSrc, type MediaSrcObject, type MediaStalledEvent, type MediaStartLoadingRequestEvent, type MediaStartedEvent, type MediaState, type MediaStateAccessors, type MediaStorage, type MediaStore, type MediaStreamType, type MediaStreamTypeChangeEvent, type MediaSuspendEvent, type MediaTextTrackChangeEvent, type MediaTextTrackChangeRequestEvent, type MediaTextTracksChangeEvent, type MediaTimeChangeEvent, type MediaTimeUpdateEvent, type MediaTimeUpdateEventDetail, type MediaTitleChangeEvent, type MediaType, type MediaTypeChangeEvent, type MediaUnmuteRequestEvent, type MediaUserEvents, type MediaUserLoopChangeRequestEvent, type MediaViewType, type MediaViewTypeChangeEvent, type MediaVolumeChange, type MediaVolumeChangeEvent, type MediaVolumeChangeRequestEvent, type MediaWaitingEvent, Menu, MenuButton, type MenuButtonEvents, type MenuButtonProps, type MenuButtonSelectEvent, type MenuCloseEvent, type MenuEvents, MenuItem, MenuItems, type MenuItemsProps, type MenuOpenEvent, type MenuPlacement, type MenuPlacementAlign, type MenuPlacementSide, MenuPortal, type MenuPortalContext, type MenuPortalProps, type MenuProps, MuteButton, type MuteButtonEvents, type MuteButtonProps, type MuxThumbnailStoryboard, type MuxThumbnailTile, PIPButton, type PIPButtonEvents, type PIPButtonProps, PlayButton, type PlayButtonEvents, type PlayButtonProps, type PlayerSrc, type PlayerStore, type PlyrControl, PlyrLayout, type PlyrLayoutProps, type PlyrLayoutTranslations, type PlyrLayoutWord, type PlyrMarker, Poster, type PosterProps, type PosterState, QualityRadioGroup, type QualityRadioGroupChangeEvent, type QualityRadioGroupEvents, type QualityRadioGroupProps, type QualityRadioOption, QualitySlider, type QualitySliderCSSVars, type QualitySliderEvents, type QualitySliderProps, type QualitySliderState, Radio, type RadioChangeEvent, type RadioEvents, RadioGroup, type RadioGroupChangeEvent, type RadioGroupEvents, type RadioGroupProps, type RadioOption, type RadioProps, type RadioSelectEvent, type RemotePlaybackInfo, type RemotePlaybackType, type ScreenOrientationChangeEvent, type ScreenOrientationChangeEventDetail, ScreenOrientationController, type ScreenOrientationEvents, type ScreenOrientationLockType, type ScreenOrientationType, SeekButton, type SeekButtonEvents, type SeekButtonProps, type SerializedVideoQuality, Slider, type SliderCSSVars, SliderChapters, type SliderChaptersCSSVars, type SliderChaptersProps, SliderController, type SliderControllerProps, type SliderDelegate, type SliderDragEndEvent, type SliderDragStartEvent, type SliderDragValueChangeEvent, type SliderEvent, type SliderEvents, type SliderOrientation, type SliderPointerValueChangeEvent, SliderPreview, type SliderPreviewProps, type SliderProps, type SliderState, type SliderStore, SliderValue, type SliderValueChangeEvent, type SliderValueProps, SliderVideo, type SliderVideoCanPlayEvent, type SliderVideoErrorEvent, type SliderVideoEvents, type SliderVideoProps, type SliderVideoState, SpeedRadioGroup, type SpeedRadioGroupChangeEvent, type SpeedRadioGroupEvents, type SpeedRadioGroupProps, SpeedSlider, type SpeedSliderCSSVars, type SpeedSliderEvents, type SpeedSliderProps, type SpeedSliderState, type Src, type TextRenderer, TextRenderers, TextTrack, type TextTrackAddCueEvent, type TextTrackAddEvent, type TextTrackCueChangeEvent, type TextTrackErrorEvent, type TextTrackEvent, type TextTrackEvents, type TextTrackInit, TextTrackList, type TextTrackListEvent, type TextTrackListEvents, type TextTrackListModeChangeEvent, type TextTrackLoadEvent, type TextTrackLoadStartEvent, type TextTrackModeChangeEvent, type TextTrackReadyState, type TextTrackRemoveCueEvent, type TextTrackRemoveEvent, Thumbnail, type ThumbnailCoords, type ThumbnailImage, type ThumbnailImageInit, type ThumbnailProps, type ThumbnailSrc, type ThumbnailState, type ThumbnailStoryboard, type ThumbnailTile, ThumbnailsLoader, Time, type TimeProps, TimeSlider, type TimeSliderCSSVars, type TimeSliderEvents, type TimeSliderProps, type TimeSliderState, type TimeState, ToggleButton, type ToggleButtonProps, Tooltip, TooltipContent, type TooltipContentProps, type TooltipPlacement, type TooltipPlacementAlign, type TooltipPlacementSide, type TooltipProps, TooltipTrigger, type VTTContent, type VTTCueInit, type VTTRegionInit, type VideoMimeType, type VideoPresentationChangeEvent, type VideoPresentationEvents, VideoProvider, type VideoQuality, type VideoQualityAddEvent, type VideoQualityAutoChangeEvent, type VideoQualityChangeEvent, type VideoQualityChangeEventDetail, VideoQualityList, type VideoQualityListEvent, type VideoQualityListEvents, type VideoQualityRemoveEvent, type VideoSrc, type VideoSrcMeta, VimeoProvider, type VimeoSrc, VolumeSlider, type VolumeSliderCSSVars, type VolumeSliderEvents, type VolumeSliderProps, type VolumeSliderState, YouTubeProvider, type YouTubeSrc, boundTime, canFullscreen, getDownloadFile, isTrackCaptionKind, isVideoQualitySrc, mediaContext, mediaState, menuPortalContext, parseJSONCaptionsFile, sliderState, softResetMediaState, updateSliderPreviewPlacement, usePlyrLayoutClasses };
