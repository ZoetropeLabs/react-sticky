'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Watcher;

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _simpleSignal = require('simple-signal');

var _simpleSignal2 = _interopRequireDefault(_simpleSignal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Watcher(events) {
  var signal = new _simpleSignal2.default();

  var handleEvent = function handleEvent(e) {
    return (0, _raf2.default)(function () {
      return signal.emit(e);
    });
  };

  /**
    * Wire up event listeners if in a browser-type environment
    */
  if (typeof window !== "undefined") {
    events.forEach(function (evt) {
      if (window.addEventListener) {
        window.addEventListener(evt, handleEvent);
      } else {
        window.attachEvent('on' + evt, handleEvent);
      }
    });
  }

  return signal;
}
module.exports = exports['default'];