'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYears = exports.YearPickerComponent = undefined;

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

/** Return array of 12 years as strings 'YYYY'.
 * @param {number} yearsStart */
var getYears = function getYears(yearsStart) {
  var years = new Array(12);
  return _lodash2.default.fill(years, yearsStart).map(function (year, i) {
    return (year + i).toString();
  });
};

function YearPickerCell(props) {
  var onClick = props.onClick,
      year = props.year;

  var rest = (0, _utils.getUnhandledProps)(YearPickerCell, props);

  var onYearClick = function onYearClick(event) {
    event.stopPropagation();
    onClick(event, _extends({}, props, { value: year }));
  };

  return _react2.default.createElement(
    _semanticUiReact.Table.Cell,
    _extends({}, rest, {
      onClick: onYearClick,
      className: 'suir-calendar date',
      textAlign: 'center' }),
    year
  );
}

YearPickerCell.handledProps = ['onClick', 'year'];
function YearPickerComponent(props) {
  var onYearClick = props.onYearClick,
      activeYear = props.activeYear,
      yearsStart = props.yearsStart;

  var rest = (0, _utils.getUnhandledProps)(YearPickerComponent, props);

  var cellStyle = {
    width: '33.333333%',
    minWidth: '7em'
  };
  var years = getYears(yearsStart).map(function (year) {
    return _react2.default.createElement(YearPickerCell, {
      style: cellStyle,
      onClick: onYearClick,
      active: year === activeYear.toString(),
      year: year,
      key: year });
  });
  var rows = _lodash2.default.chunk(years, 3).map(function (row, i) {
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

YearPickerComponent.handledProps = ['activeYear', 'onYearClick', 'yearsStart'];
YearPickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: _propTypes2.default.func.isRequired,
  year: _propTypes2.default.string.isRequired
};

YearPickerComponent.propTypes = {
  /** (event, data) => {} */
  onYearClick: _propTypes2.default.func.isRequired,
  activeYear: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  yearsStart: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = YearPickerComponent;
exports.YearPickerComponent = YearPickerComponent;
exports.getYears = getYears;