'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinutePicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

function MinutePickerCell(props) {
  var onClick = props.onClick,
      hour = props.hour,
      minute = props.minute;

  var rest = (0, _utils.getUnhandledProps)(MinutePickerCell, props);

  var onMinuteClick = function onMinuteClick(event) {
    event.stopPropagation();
    onClick(event, _extends({}, props, { value: minute }));
  };
  return _react2.default.createElement(
    _semanticUiReact.Table.Cell,
    _extends({}, rest, {
      onClick: onMinuteClick,
      className: 'suir-calendar time',
      textAlign: 'center' }),
    hour + ':' + minute
  );
}

MinutePickerCell.handledProps = ['hour', 'minute', 'onClick'];
function MinutePicker(props) {
  var onMinuteClick = props.onMinuteClick,
      hour = props.hour,
      activeMinute = props.activeMinute;

  var rest = (0, _utils.getUnhandledProps)(MinutePicker, props);

  var cellStyle = {
    width: '33.33333%',
    minWidth: '8em'
  };
  var minutes = MINUTES.map(function (minute) {
    return _react2.default.createElement(MinutePickerCell, {
      style: cellStyle,
      onClick: onMinuteClick,
      active: minute === activeMinute,
      hour: hour,
      minute: minute,
      key: minute });
  });
  var rows = function () {
    var rows = [];
    var rowIndex = 0;
    for (var i = 0; i < minutes.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        rowIndex += 1;
      }
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(minutes[i]);
    }
    return rows;
  }().map(function (row, i) {
    return _react2.default.createElement(
      _semanticUiReact.Table.Row,
      { key: i },
      row
    );
  });
  return _react2.default.createElement(
    _semanticUiReact.Table.Body,
    rest,
    rows
  );
}

MinutePicker.handledProps = ['activeMinute', 'hour', 'onMinuteClick'];
MinutePickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: _propTypes2.default.func.isRequired,
  hour: _propTypes2.default.string.isRequired,
  minute: _propTypes2.default.string.isRequired
};

MinutePicker.propTypes = {
  /** (event, data) => {} */
  onMinuteClick: _propTypes2.default.func.isRequired,
  /** 'hh' */
  hour: _propTypes2.default.string.isRequired,
  activeMinute: _propTypes2.default.string
};

exports.default = MinutePicker;
exports.MinutePicker = MinutePicker;