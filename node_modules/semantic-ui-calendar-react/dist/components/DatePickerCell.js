'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerCell = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DatePickerCell(props) {
  var className = props.className,
      onClick = props.onClick,
      data = props.data;

  var classes = (0, _classnames2.default)(className, 'suir-calendar', 'date');
  var rest = (0, _utils.getUnhandledProps)(DatePickerCell, props);
  var onCellClick = function onCellClick(event) {
    event.stopPropagation();
    onClick(event, _extends({}, props, { value: data }));
  };
  return _react2.default.createElement(
    _semanticUiReact.Table.Cell,
    _extends({}, rest, {
      onClick: onCellClick,
      className: classes }),
    data.format('D')
  );
}

DatePickerCell.handledProps = ['className', 'data', 'onClick'];
DatePickerCell.propTypes = {
  data: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  className: _propTypes2.default.string,
  /** (event, data) => {} */
  onClick: _propTypes2.default.func
};

exports.default = DatePickerCell;
exports.DatePickerCell = DatePickerCell;