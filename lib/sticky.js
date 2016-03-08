'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _watcher = require('./watcher');

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sticky = function (_React$Component) {
  _inherits(Sticky, _React$Component);

  function Sticky(props) {
    _classCallCheck(this, Sticky);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sticky).call(this, props));

    _this.onScroll = function () {
      var pageY = window.pageYOffset;
      var isSticky = pageY + _this.context.offset - _this.props.topOffset >= _this.state.origin && _this.context.offset + _this.props.bottomOffset < _this.state.origin + _this.context.rect.bottom;

      _this.setState({ pageY: pageY, isSticky: isSticky });
      _this.context.container.updateTopCorrection(isSticky ? _this.state.height : 0);

      if (_this.state.isSticky !== isSticky) _this.props.onStickyStateChange(isSticky);
    };

    _this.onResize = function () {
      var height = _reactDom2.default.findDOMNode(_this).getBoundingClientRect().height;
      var origin = _this.refs.static.getBoundingClientRect().top + window.pageYOffset;
      _this.setState({ height: height, origin: origin });
    };

    _this.state = {
      isSticky: false
    };
    return _this;
  }

  _createClass(Sticky, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var height = _reactDom2.default.findDOMNode(this).getBoundingClientRect().height;
      var pageY = window.pageYOffset;
      var origin = this.refs.static.getBoundingClientRect().top + pageY;
      this.setState({ pageY: pageY, height: height, origin: origin });

      Sticky.resizeWatcher.on(this.onResize);
      Sticky.scrollWatcher.on(this.onScroll);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      Sticky.resizeWatcher.off(this.onResize);
      Sticky.scrollWatcher.off(this.onScroll);
    }
  }, {
    key: 'render',


    /*
     * The special sauce.
     */
    value: function render() {
      var isSticky = this.state.isSticky;

      var className = this.props.className + ' ' + (isSticky ? this.props.stickyClass : '');

      var style = this.props.style;
      if (isSticky) {
        var stickyStyle = {
          position: 'fixed',
          top: this.context.offset,
          left: this.refs.static.getBoundingClientRect().left,
          width: this.refs.static.getBoundingClientRect().width
        };

        var bottomLimit = (this.context.rect.bottom || 0) - this.state.height - this.props.bottomOffset;
        if (this.context.offset > bottomLimit) {
          stickyStyle.top = bottomLimit;
        }

        style = _extends({}, this.props.style, stickyStyle, this.props.stickyStyle);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { ref: 'static', style: { paddingBottom: isSticky ? this.state.height : 0 } }),
        _react2.default.createElement(
          'div',
          { ref: 'fixed', className: className, style: style },
          this.props.children
        )
      );
    }
  }]);

  return Sticky;
}(_react2.default.Component);

Sticky.contextTypes = {
  container: _react2.default.PropTypes.any,
  offset: _react2.default.PropTypes.number,
  rect: _react2.default.PropTypes.object
};
Sticky.defaultProps = {
  className: '',
  style: {},
  stickyClass: 'sticky',
  stickyStyle: {},
  topOffset: 0,
  bottomOffset: 0,
  onStickyStateChange: function onStickyStateChange() {}
};
Sticky.scrollWatcher = new _watcher2.default(['scroll', 'touchstart', 'touchend']);
Sticky.resizeWatcher = new _watcher2.default(['resize']);
exports.default = Sticky;
module.exports = exports['default'];