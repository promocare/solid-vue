"use strict";

var _urlUtil = require("../url-util");

/* eslint-env jest */
describe('currentUrl', () => {
  it('returns the current url when window.location is available', () => {
    expect((0, _urlUtil.currentUrl)()).toBe('https://app.biz/page?foo=bar#the-hash-fragment');
  });
});
describe('currentUrlNoParams', () => {
  it('returns the current url without the querystring or hash when window.location is available', () => {
    expect((0, _urlUtil.currentUrlNoParams)()).toBe('https://app.biz/page');
  });
});