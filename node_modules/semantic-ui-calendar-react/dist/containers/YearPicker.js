'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YearPicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

var _semanticUiReact = require('semantic-ui-react');

var _utils = require('../utils.js');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearPicker = function (_React$Component) {
  _inherits(YearPicker, _React$Component);

  function YearPicker(props) {
    _classCallCheck(this, YearPicker);

    var _this = _possibleConstructorReturn(this, (YearPicker.__proto__ || Object.getPrototypeOf(YearPicker)).call(this, props));

    _this.onYearClick = function (event, data) {
      _this.setState({ activeYear: data.value });
      _this.props.onYearChange(event, data);
    };

    _this.getActiveYear = function () {
      return _this.state.activeYear || (0, _moment2.default)().year();
    };

    _this.onNextBtnClick = function () {
      _this.setState(function (_ref) {
        var yearsStart = _ref.yearsStart;

        return { yearsStart: yearsStart + 12 };
      });
    };

    _this.onPrevBtnClick = function () {
      _this.setState(function (_ref2) {
        var yearsStart = _ref2.yearsStart;

        return { yearsStart: yearsStart - 12 };
      });
    };

    _this.getContent = function () {
      var yearsStart = _this.state.yearsStart;

      var yearsRange = {
        start: yearsStart,
        end: yearsStart + 11
      };
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_components.PickerHeader, {
          onDateClick: _this.props.onHeaderDateClick,
          width: '3',
          activeYears: yearsRange,
          onPrevBtnClick: _this.onPrevBtnClick,
          onNextBtnClick: _this.onNextBtnClick }),
        _react2.default.createElement(_components.YearPickerComponent, {
          onYearClick: _this.onYearClick,
          activeYear: _this.getActiveYear(),
          yearsStart: yearsStart })
      );
    };

    _this.state = {
      activeYear: '',
      yearsStart: (0, _moment2.default)().year() - 6
    };
    return _this;
  }

  _createClass(YearPicker, [{
    key: 'render',
    value: function render() {
      var rest = (0, _utils.getUnhandledProps)(YearPicker, this.props);

      if (this.props.standalone) {
        return _react2.default.createElement(
          _semanticUiReact.Table,
          _extends({}, rest, {
            unstackable: true,
            celled: true,
            textAlign: 'center' }),
          this.getContent()
        );
      }
      return this.getContent();
    }
  }]);

  return YearPicker;
}(_react2.default.Component);

YearPicker.handledProps = ['onHeaderDateClick', 'onYearChange', 'standalone'];


YearPicker.propTypes = {
  /** (event, data) => {} */
  onYearChange: _propTypes2.default.func,
  standalone: _propTypes2.default.bool,
  onHeaderDateClick: _propTypes2.default.func
};

YearPicker.defaultProps = {
  onYearChange: _utils.emptyFunction,
  standalone: true
};

exports.default = YearPicker;
exports.YearPicker = YearPicker;