'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

var _semanticUiReact = require('semantic-ui-react');

var _utils = require('../utils.js');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonthPicker = function (_React$Component) {
  _inherits(MonthPicker, _React$Component);

  function MonthPicker(props) {
    _classCallCheck(this, MonthPicker);

    var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props));

    _this.onMonthClick = function (event, data) {
      _this.setState({ activeMonth: data.value });
      _this.props.onMonthChange(event, data);
    };

    _this.state = {
      activeMonth: ''
    };
    return _this;
  }

  _createClass(MonthPicker, [{
    key: 'render',
    value: function render() {
      var rest = (0, _utils.getUnhandledProps)(MonthPicker, this.props);

      return _react2.default.createElement(
        _semanticUiReact.Table,
        _extends({}, rest, {
          unstackable: true,
          celled: true,
          textAlign: 'center' }),
        _react2.default.createElement(_components.MonthPickerComponent, {
          onMonthClick: this.onMonthClick,
          activeMonth: this.state.activeMonth })
      );
    }
  }]);

  return MonthPicker;
}(_react2.default.Component);

MonthPicker.handledProps = ['onMonthChange'];


MonthPicker.propTypes = {
  /** (event, data) => {} */
  onMonthChange: _propTypes2.default.func
};

MonthPicker.defaultProps = {
  onMonthChange: _utils.emptyFunction
};

exports.default = MonthPicker;
exports.MonthPicker = MonthPicker;