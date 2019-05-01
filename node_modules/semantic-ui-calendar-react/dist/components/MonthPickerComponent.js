'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPickerComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils.js');

var _semanticUiReact = require('semantic-ui-react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MonthPickerCell(props) {
  var onClick = props.onClick,
      month = props.month;

  var rest = (0, _utils.getUnhandledProps)(MonthPickerCell, props);

  var onMonthClick = function onMonthClick(event) {
    event.stopPropagation();
    onClick(event, _extends({}, props, { value: month }));
  };

  return _react2.default.createElement(
    _semanticUiReact.Table.Cell,
    _extends({}, rest, {
      onClick: onMonthClick,
      className: 'suir-calendar date',
      textAlign: 'center' }),
    month
  );
}

MonthPickerCell.handledProps = ['month', 'onClick'];
function MonthPickerComponent(props) {
  var onMonthClick = props.onMonthClick,
      activeMonth = props.activeMonth;

  var rest = (0, _utils.getUnhandledProps)(MonthPickerComponent, props);

  var cellStyle = {
    width: '33.333333%',
    minWidth: '7em'
  };
  var months = (0, _utils.getMonths)().map(function (month) {
    return _react2.default.createElement(MonthPickerCell, {
      style: cellStyle,
      onClick: onMonthClick,
      active: month === activeMonth.toString(),
      month: month,
      key: month });
  });
  var rows = _lodash2.default.chunk(months, 3).map(function (row, i) {
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

MonthPickerComponent.handledProps = ['activeMonth', 'onMonthClick'];
MonthPickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: _propTypes2.default.func.isRequired,
  month: _propTypes2.default.string.isRequired
};

MonthPickerComponent.propTypes = {
  /** (event, data) => {} */
  onMonthClick: _propTypes2.default.func.isRequired,
  activeMonth: _propTypes2.default.string
};

exports.default = MonthPickerComponent;
exports.MonthPickerComponent = MonthPickerComponent;