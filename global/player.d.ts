import '../types/vidstack-BNOTL9fc.js';
import { MediaAudioLayoutElement, MediaVideoLayoutElement, MediaPlyrLayoutElement, MediaPlayerElement } from '../elements.js';
import { DefaultLayoutProps, PlyrLayoutProps, MediaPlayerProps, TextTrackInit } from '../types/vidstack-IH_rCrf6.js';
import 'lit-html';
import 'media-captions';
import 'dashjs';
import 'hls.js';

interface VidstackPlayerLayoutLoader {
    readonly name: string;
    load(): void | Promise<void>;
    create(): HTMLElement[] | Promise<HTMLElement[]>;
}

declare class VidstackPlayerLayout implements VidstackPlayerLayoutLoader {
    readonly props?: Partial<DefaultLayoutProps> | undefined;
    constructor(props?: Partial<DefaultLayoutProps> | undefined);
    readonly name = "vidstack";
    load(): Promise<void>;
    create(): (MediaAudioLayoutElement | MediaVideoLayoutElement)[];
}

declare class PlyrLayout implements VidstackPlayerLayoutLoader {
    readonly props?: Partial<PlyrLayoutProps> | undefined;
    constructor(props?: Partial<PlyrLayoutProps> | undefined);
    readonly name = "plyr";
    load(): Promise<void>;
    create(): MediaPlyrLayoutElement[];
}

declare class VidstackPlayer {
    static create({ target, layout, tracks, ...props }: VidstackPlayerConfig): Promise<MediaPlayerElement>;
}
type VidstackPlayerTarget = string | HTMLElement;
interface VidstackPlayerConfig extends Partial<MediaPlayerProps> {
    /**
     * A document query selector string or `HTMLElement` to mount on. If an `<audio>`, `<video>`, or
     * `<iframe>` element is given it will be enhanced.
     */
    target: VidstackPlayerTarget;
    /**
     * Text tracks to be included on initialization.
     */
    tracks?: TextTrackInit[];
    /**
     * Specify a layout to be loaded.
     */
    layout?: VidstackPlayerLayoutLoader;
}

export { PlyrLayout, VidstackPlayer, type VidstackPlayerConfig, VidstackPlayerLayout, type VidstackPlayerLayoutLoader, type VidstackPlayerTarget };
