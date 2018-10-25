"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _events = _interopRequireDefault(require("events"));

var _authnFetch = require("./authn-fetch");

var _popup = require("./popup");

var _session = require("./session");

var _storage = require("./storage");

var _urlUtil = require("./url-util");

var WebIdOidc = _interopRequireWildcard(require("./webid-oidc"));

/* global fetch */
// Store the global fetch, so the user is free to override it
const globalFetch = fetch;

class SolidAuthClient extends _events.default {
  fetch(input, options) {
    return (0, _authnFetch.authnFetch)((0, _storage.defaultStorage)(), globalFetch, input, options);
  }

  login(idp, options) {
    options = (0, _objectSpread2.default)({}, defaultLoginOptions((0, _urlUtil.currentUrlNoParams)()), options);
    return WebIdOidc.login(idp, options);
  }

  async popupLogin(options) {
    options = (0, _objectSpread2.default)({}, defaultLoginOptions(), options);

    if (!/https?:/.test(options.popupUri)) {
      options.popupUri = new URL(options.popupUri || '/.well-known/solid/login', window.location).toString();
    }

    if (!options.callbackUri) {
      options.callbackUri = options.popupUri;
    }

    const popup = (0, _popup.openIdpPopup)(options.popupUri);
    const session = await (0, _popup.obtainSession)(options.storage, popup, options);
    this.emit('login', session);
    this.emit('session', session);
    return session;
  }

  async currentSession(storage = (0, _storage.defaultStorage)()) {
    let session = await (0, _session.getSession)(storage);

    if (!session) {
      try {
        session = await WebIdOidc.currentSession(storage);
      } catch (err) {
        console.error(err);
      }

      if (session) {
        this.emit('login', session);
        this.emit('session', session);
        await (0, _session.saveSession)(storage)(session);
      }
    }

    return session;
  }

  async trackSession(callback) {
    /* eslint-disable standard/no-callback-literal */
    callback((await this.currentSession()));
    this.on('session', callback);
  }

  async logout(storage = (0, _storage.defaultStorage)()) {
    const session = await (0, _session.getSession)(storage);

    if (session) {
      try {
        await WebIdOidc.logout(storage);
        this.emit('logout');
        this.emit('session', null);
      } catch (err) {
        console.warn('Error logging out:');
        console.error(err);
      }

      await (0, _session.clearSession)(storage);
    }
  }

}

exports.default = SolidAuthClient;

function defaultLoginOptions(url) {
  return {
    callbackUri: url ? url.split('#')[0] : '',
    popupUri: '',
    storage: (0, _storage.defaultStorage)()
  };
}