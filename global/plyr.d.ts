import { FileDownloadInfo, MediaPlayerProps, PlyrLayoutProps, LogLevel, TextTrackInit, PlyrLayoutTranslations, MediaPlayerState, MediaViewType, PlayerSrc, MediaEvents, MediaTextTrackChangeEvent, MediaControlsChangeEvent, MediaFullscreenChangeEvent, MediaRateChangeEvent, MediaCanPlayEvent, MediaTimeUpdateEvent, MediaVolumeChangeEvent } from '../types/vidstack-IH_rCrf6.js';
import '../types/vidstack-BNOTL9fc.js';
import { MediaPlayerElement, MediaProviderElement, MediaPlyrLayoutElement } from '../elements.js';
import 'media-captions';
import 'dashjs';
import 'hls.js';
import 'lit-html';

declare class Plyr implements PlyrProps, PlyrMethods {
    #private;
    readonly target: PlyrTarget;
    readonly config: Partial<PlyrConfig>;
    static setup(targets: string | NodeList | HTMLElement[], config?: PlyrConfig): Plyr[];
    static supported(type: 'audio' | 'video', provider: 'html5' | 'youtube' | 'vimeo'): boolean;
    readonly player: MediaPlayerElement;
    readonly provider: MediaProviderElement;
    readonly layout: MediaPlyrLayoutElement;
    readonly fullscreen: PlyrFullscreenAdapter;
    playing: boolean;
    paused: boolean;
    ended: boolean;
    currentTime: number;
    seeking: boolean;
    duration: number;
    volume: number;
    muted: boolean;
    loop: boolean;
    poster: string;
    get type(): "" | "video" | "audio" | "google-cast" | "dash" | "hls" | "vimeo" | "youtube";
    get isHTML5(): boolean;
    get isEmbed(): boolean;
    get buffered(): number;
    get stopped(): boolean;
    get hasAudio(): boolean;
    get speed(): number;
    set speed(speed: number);
    get currentTrack(): number;
    set currentTrack(index: number);
    get pip(): boolean;
    set pip(isActive: boolean);
    get quality(): number | null;
    set quality(value: number | null);
    get source(): PlyrSource | null;
    set source(source: PlyrSource | null);
    get ratio(): string | null;
    set ratio(ratio: string | null);
    get download(): FileDownloadInfo;
    set download(download: FileDownloadInfo);
    constructor(target: PlyrTarget, config?: Partial<PlyrConfig>);
    play(): Promise<void>;
    pause(): Promise<void>;
    togglePlay(toggle?: boolean): Promise<void>;
    toggleCaptions(toggle?: boolean): void;
    toggleControls(toggle?: boolean): void;
    restart(): void;
    stop(): void;
    forward(seekTime?: number): void;
    rewind(seekTime?: number): void;
    increaseVolume(step?: number): void;
    decreaseVolume(step?: number): void;
    airplay(): Promise<void>;
    on<T extends keyof PlyrEvents>(type: T, callback: (event: PlyrEvents[T]) => void): void;
    once<T extends keyof PlyrEvents>(type: T, callback: (event: PlyrEvents[T]) => void): void;
    off<T extends keyof PlyrEvents>(type: T, callback: (event: PlyrEvents[T]) => void): void;
    supports(type: string): boolean;
    destroy(): void;
}
type PlyrTarget = string | HTMLElement | NodeList | HTMLElement[];
interface PlyrConfig extends Partial<Omit<MediaPlayerProps, 'controls'>>, Partial<PlyrLayoutProps> {
    /**
     * Completely disable Plyr. This would allow you to do a User Agent check or similar to
     * programmatically enable or disable Plyr for a certain UA.
     *
     * @defaultValue true
     * @example
     * ```ts
     * enabled: !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
     * ```
     */
    enabled: boolean;
    /**
     * Display debugging information in the console.
     *
     * @defaultValue 'warn'
     */
    debug: boolean | LogLevel;
    /**
     * Only allow one player playing at once.
     *
     * @defaultValue true
     */
    autoPause: boolean;
    /**
     * Gets or sets the video aspect ratio.
     *
     * @defaultValue 16/9
     */
    ratio: string | null;
    /**
     * Hide video controls automatically after 2s of no mouse or focus movement, on control element
     * blur (tab out), on playback start or entering fullscreen. As soon as the mouse is moved,
     * a control element is focused or playback is paused, the controls reappear instantly.
     *
     * @defaultValue true
     */
    hideControls: boolean;
    /**
     * Reset the playback to the start once playback is complete.
     *
     * @defaultValue false
     */
    resetOnEnd: boolean;
    /**
     * Disable right click menu on video to help as very primitive obfuscation to prevent downloads
     * of content.
     *
     * @defaultValue true
     */
    disableContextMenu: boolean;
    /**
     * Specify a URL or path to the SVG sprite. See the SVG section for more info.
     *
     * @defaultValue null
     */
    iconUrl: string | null;
    /**
     * Specify the id prefix for the icons used in the default controls (e.g. "plyr-play" would be
     * "plyr"). This is to prevent clashes if you're using your own SVG sprite but with the default
     * controls. Most people can ignore this option.
     *
     * @defaultValue 'plyr'
     */
    iconPrefix: 'plyr';
    /**
     * Enable keyboard shortcuts for focused players only or globally.
     *
     * @defaultValue `{ focused: true, global: false }`
     */
    keyboard: PlyrKeyboardConfig;
    /**
     * Used for internationalization (i18n) of the text within the UI.
     *
     * @defaultValue  null
     */
    i18n: PlyrI18nConfig | null;
    /**
     * Text tracks to be included on initialization.
     */
    tracks?: TextTrackInit[];
}
interface PlyrKeyboardConfig {
    /**
     * Enable keyboard shortcuts when the player is focused.
     *
     * @defaultValue true
     */
    focused: boolean;
    /**
     * Enable keyboard shortcuts globally.
     *
     * @defaultValue false
     */
    global: boolean;
}
interface PlyrStorageConfig {
    /**
     * Allow use of local storage to store user settings.
     *
     * @defaultValue true
     */
    enabled: boolean;
    /**
     * The storage key prefix to use.
     *
     * @defaultValue 'plyr'
     */
    key: string;
}
interface PlyrI18nConfig extends Partial<PlyrLayoutTranslations> {
}
interface PlyrProps extends Pick<MediaPlayerState, 'playing' | 'paused' | 'ended' | 'currentTime' | 'seeking' | 'duration' | 'volume' | 'muted' | 'loop' | 'poster'> {
    /**
     * Returns a boolean indicating if the current player is HTML5.
     */
    readonly isHTML5: boolean;
    /**
     * Returns a boolean indicating if the current player is an embedded player.
     */
    readonly isEmbed: boolean;
    /**
     * Returns a float between 0 and 1 indicating how much of the media is buffered
     */
    readonly buffered: number;
    /**
     * Returns a boolean indicating if the current player is stopped.
     */
    readonly stopped: boolean;
    /**
     *  Returns a boolean indicating if the current media has an audio track.
     */
    readonly hasAudio: boolean;
    /**
     * Fullscreen state and methods.
     */
    readonly fullscreen: PlyrFullscreenAdapter;
    /**
     * Gets or sets the speed for the player. Generally the minimum should be 0.5.
     */
    speed: number;
    /**
     * Gets or sets the caption track by index. -1 means the track is missing or captions is not
     * active.
     */
    currentTrack: number;
    /**
     * Gets or sets the picture-in-picture state of the player.
     */
    pip: boolean;
    /**
     * Gets or sets the quality for the player based on height. Setting to -1 will use auto quality.
     */
    quality: number | null;
    /**
     * Gets or sets the current source for the player.
     */
    source: PlyrSource | null;
    /**
     * Gets or sets the video aspect ratio.
     */
    ratio: string | null;
    /**
     * Gets or sets the URL for the download button.
     */
    download: FileDownloadInfo;
}
interface PlyrSource {
    title?: string;
    type?: MediaViewType;
    sources: PlayerSrc;
    poster?: string;
    thumbnails?: string;
    tracks?: TextTrackInit[];
}
declare class PlyrFullscreenAdapter {
    #private;
    constructor(plyr: Plyr);
    /**
     * 	Returns a boolean indicating if the current player has fullscreen enabled.
     */
    get enabled(): boolean;
    /**
     * Returns a boolean indicating if the current player is in fullscreen mode.
     */
    get active(): boolean;
    /**
     * Request to enter fullscreen.
     */
    enter(): Promise<void>;
    /**
     * Request to exit fullscreen.
     */
    exit(): Promise<void>;
    /**
     * Request to toggle fullscreen.
     */
    toggle(): Promise<void>;
}
interface PlyrMethods extends Pick<MediaPlayerElement, 'play' | 'pause' | 'destroy'> {
    /**
     * Toggle playback, if no parameters are passed, it will toggle based on current status.
     */
    togglePlay(toggle?: boolean): Promise<void>;
    /**
     * Stop playback and reset to start.
     */
    stop(): void;
    /**
     * Restart playback.
     */
    restart(): void;
    /**
     * Rewind playback by the specified seek time. If no parameter is passed, the default seek time
     * will be used.
     */
    rewind(seekTime?: number): void;
    /**
     * Fast forward by the specified seek time. If no parameter is passed, the default seek time
     * will be used.
     */
    forward(seekTime?: number): void;
    /**
     * Increase volume by the specified step. If no parameter is passed, the default step will be used.
     */
    increaseVolume(step?: number): void;
    /**
     * Reduce volume by the specified step. If no parameter is passed, the default step will be used.
     */
    decreaseVolume(step?: number): void;
    /**
     * Toggle captions display. If no parameter is passed, it will toggle based on current status.
     */
    toggleCaptions(toggle?: boolean): void;
    /**
     * Trigger the airplay dialog on supported devices.
     */
    airplay(): void;
    /**
     * Toggle the controls (video only). Takes optional truthy value to force it on/off.
     */
    toggleControls(toggle?: boolean): void;
    /**
     * Add an event listener for the specified event.
     */
    on<T extends keyof PlyrEvents>(type: T, callback: (event: PlyrEvents[T]) => void): void;
    /**
     * Add an event listener for the specified event once.
     */
    once<T extends keyof PlyrEvents>(type: T, callback: (event: PlyrEvents[T]) => void): void;
    /**
     * Remove an event listener for the specified event.
     */
    off<T extends keyof PlyrEvents>(type: T, callback: (event: PlyrEvents[T]) => void): void;
    /**
     * Check support for a mime type.
     */
    supports(type: string): boolean;
}
interface PlyrEvents extends Pick<MediaEvents, 'ended' | 'pause' | 'play' | 'playing' | 'progress' | 'seeked' | 'seeking'> {
    captionsdisabled: MediaTextTrackChangeEvent;
    captionsenabled: MediaTextTrackChangeEvent;
    controlshidden: MediaControlsChangeEvent;
    controlsshown: MediaControlsChangeEvent;
    enterfullscreen: MediaFullscreenChangeEvent;
    exitfullscreen: MediaFullscreenChangeEvent;
    languagechange: Event;
    ratechange: MediaRateChangeEvent;
    ready: MediaCanPlayEvent;
    timeupdate: MediaTimeUpdateEvent;
    volumechange: MediaVolumeChangeEvent;
}

export { Plyr, type PlyrConfig, type PlyrEvents, PlyrFullscreenAdapter, type PlyrI18nConfig, type PlyrKeyboardConfig, type PlyrMethods, type PlyrProps, type PlyrSource, type PlyrStorageConfig, type PlyrTarget };
