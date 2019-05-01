'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePickerComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimePickerComponent(props) {
  var selectedDate = props.selectedDate,
      onNextDayBtnClick = props.onNextDayBtnClick,
      onPrevDayBtnClick = props.onPrevDayBtnClick,
      onHourClick = props.onHourClick,
      onMinuteClick = props.onMinuteClick,
      activeHour = props.activeHour,
      activeMinute = props.activeMinute,
      mode = props.mode;


  if (mode === 'minute') {
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      selectedDate && _react2.default.createElement(_.PickerHeader, {
        width: '3',
        includeDay: true,
        activeDate: selectedDate,
        onNextBtnClick: onNextDayBtnClick,
        onPrevBtnClick: onPrevDayBtnClick }),
      _react2.default.createElement(_.MinutePicker, {
        hour: activeHour,
        activeMinute: activeMinute,
        onMinuteClick: onMinuteClick })
    );
  } else {
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      selectedDate && _react2.default.createElement(_.PickerHeader, {
        width: '4',
        includeDay: true,
        activeDate: selectedDate,
        onNextBtnClick: onNextDayBtnClick,
        onPrevBtnClick: onPrevDayBtnClick }),
      _react2.default.createElement(_.HourPicker, {
        activeHour: activeHour,
        onHourClick: onHourClick })
    );
  }
}

TimePickerComponent.handledProps = ['activeHour', 'activeMinute', 'mode', 'onHourClick', 'onMinuteClick', 'onNextDayBtnClick', 'onPrevDayBtnClick', 'selectedDate'];
TimePickerComponent.propTypes = {
  /** (event, data) => {} */
  onHourClick: _propTypes2.default.func.isRequired,
  /** (event, data) => {} */
  onMinuteClick: _propTypes2.default.func.isRequired,
  /** Show date in header if given */
  selectedDate: _propTypes2.default.instanceOf(_moment2.default),
  activeHour: _propTypes2.default.string,
  activeMinute: _propTypes2.default.string,
  onNextDayBtnClick: _propTypes2.default.func,
  onPrevDayBtnClick: _propTypes2.default.func,
  mode: _propTypes2.default.string
};

TimePickerComponent.defaultProps = {
  mode: 'hour'
};

exports.default = TimePickerComponent;
exports.TimePickerComponent = TimePickerComponent;