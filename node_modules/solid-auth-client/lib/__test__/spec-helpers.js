"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyunfillWindow = exports.polyfillWindow = void 0;

var _storage = require("../storage");

/* eslint-env browser */
let _window; // polyfill missing/incomplete APIs in jsdom


const polyfillWindow = () => {
  _window = global.window;
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: 'https://app.biz/',
      pathname: '/',
      origin: 'https://app.biz',

      get hash() {
        return this.href.replace(/^[^#]+/, '');
      },

      set hash(value) {
        this.href = this.href.replace(/#.*/, value);
      }

    }
  });
  window.localStorage = (0, _storage.memStorage)(); // this is fixed in the latest jsdom, but jest has not yet updated the jsdom dependency

  window.origin = window.location.origin;
  Object.defineProperty(MessageEvent.prototype, 'origin', {
    writable: true,
    value: window.origin
  });
  MessageEvent.prototype.origin = window.location.origin;
};

exports.polyfillWindow = polyfillWindow;

const polyunfillWindow = () => {
  delete window.localStorage;
  global.window = _window;
};

exports.polyunfillWindow = polyunfillWindow;