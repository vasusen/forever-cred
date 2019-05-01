'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HourPicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils.js');

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOURS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

function HourPickerCell(props) {
  var onClick = props.onClick,
      hour = props.hour;

  var rest = (0, _utils.getUnhandledProps)(HourPickerCell, props);

  var onHourClick = function onHourClick(event) {
    event.stopPropagation();
    onClick(event, _extends({}, props, { value: hour }));
  };
  return _react2.default.createElement(
    _semanticUiReact.Table.Cell,
    _extends({}, rest, {
      onClick: onHourClick,
      className: 'suir-calendar time',
      textAlign: 'center' }),
    hour + ':00'
  );
}

HourPickerCell.handledProps = ['hour', 'onClick'];
function HourPicker(props) {
  var onHourClick = props.onHourClick,
      activeHour = props.activeHour;

  var rest = (0, _utils.getUnhandledProps)(HourPicker, props);

  var hours = HOURS.map(function (hour) {
    return _react2.default.createElement(HourPickerCell, {
      onClick: onHourClick,
      active: hour === activeHour,
      hour: hour,
      key: hour });
  });
  var rows = function () {
    var rows = [];
    var rowIndex = 0;
    for (var i = 0; i < hours.length; i++) {
      if (i % 4 === 0 && i !== 0) {
        rowIndex += 1;
      }
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(hours[i]);
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

HourPicker.handledProps = ['activeHour', 'onHourClick'];
HourPickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: _propTypes2.default.func.isRequired,
  hour: _propTypes2.default.string.isRequired
};

HourPicker.propTypes = {
  /** (event, data) => {} */
  onHourClick: _propTypes2.default.func.isRequired,
  activeHour: _propTypes2.default.string
};

exports.default = HourPicker;
exports.HourPicker = HourPicker;