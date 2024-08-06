import { Host, effect, setAttribute } from './vidstack-CRlI3Mh7.js';
import { Poster } from './vidstack-CcLwJYsZ.js';
import './vidstack-Cpte_fRf.js';
import './vidstack-vDnjyKV8.js';
import './vidstack-DyMkFGuS.js';

class MediaPosterElement extends Host(HTMLElement, Poster) {
  static tagName = "media-poster";
  static attrs = {
    crossOrigin: "crossorigin"
  };
  #img = document.createElement("img");
  onSetup() {
    this.$state.img.set(this.#img);
  }
  onConnect() {
    const { src, alt, crossOrigin } = this.$state;
    effect(() => {
      const { loading, hidden } = this.$state;
      this.#img.style.display = loading() || hidden() ? "none" : "";
    });
    effect(() => {
      setAttribute(this.#img, "alt", alt());
      setAttribute(this.#img, "crossorigin", crossOrigin());
      setAttribute(this.#img, "src", src());
    });
    if (this.#img.parentNode !== this) {
      this.prepend(this.#img);
    }
  }
}

export { MediaPosterElement };
