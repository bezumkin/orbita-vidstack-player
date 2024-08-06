import { scoped } from '../chunks/vidstack-DVpy0IqK.js';
import { HTMLMediaProvider } from './vidstack-html.js';
import { HTMLAirPlayAdapter } from '../chunks/vidstack-DBlvh7ra.js';
import '../chunks/vidstack-CrZuJYaH.js';
import '../chunks/vidstack-HSkhaVtP.js';
import '../chunks/vidstack-Dihypf8P.js';
import '../chunks/vidstack-Dv_LIPFu.js';

class AudioProvider extends HTMLMediaProvider {
  $$PROVIDER_TYPE = "AUDIO";
  get type() {
    return "audio";
  }
  airPlay;
  constructor(audio, ctx) {
    super(audio, ctx);
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(this.media, ctx);
    }, this.scope);
  }
  setup() {
    super.setup();
    if (this.type === "audio") this.ctx.notify("provider-setup", this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this.media;
  }
}

export { AudioProvider };
