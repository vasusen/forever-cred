'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePickerCell = require('./DatePickerCell.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DatePickerComponent(props) {
  var onDateClick = props.onDateClick,
      activeDate = props.activeDate,
      showedMonth = props.showedMonth,
      datesRange = props.datesRange;

  var rest = (0, _utils.getUnhandledProps)(DatePickerComponent, props);
  var data = (0, _utils.getArrayOfWeeks)(showedMonth);
  var _getRow = function _getRow(week, key) {
    var days = week.map(function (day) {
      var active = (0, _utils.isActiveDate)(day, activeDate || datesRange);
      var disabled = !(0, _utils.isDayInMonth)(day, showedMonth);
      return _react2.default.createElement(_DatePickerCell.DatePickerCell, {
        onClick: onDateClick,
        active: active,
        disabled: disabled,
        data: day,
        key: day.format('DD-MM-YYYY') });
    });
    return _react2.default.createElement(
      _semanticUiReact.Table.Row,
      { key: key },
      days
    );
  };

  _getRow.handledProps = [];
  var _getTableContent = function _getTableContent(weeks) {
    return weeks.map(function (week) {
      return _getRow(week, week[0].format('YYYY-MM-DD'));
    });
  };

  return _react2.default.createElement(
    _semanticUiReact.Table.Body,
    rest,
    _getTableContent(data)
  );
}

DatePickerComponent.handledProps = ['activeDate', 'datesRange', 'onDateClick', 'showedMonth'];
DatePickerComponent.propTypes = {
  /** (event, data) => { do something } */
  onDateClick: _propTypes2.default.func.isRequired,
  /** calendar shows month of this `moment` */
  showedMonth: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Currently selected date */
  activeDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Dates range */
  datesRange: _propTypes2.default.shape({
    start: _propTypes2.default.instanceOf(_moment2.default),
    end: _propTypes2.default.instanceOf(_moment2.default)
  })
};

exports.default = DatePickerComponent;
exports.DatePickerComponent = DatePickerComponent;