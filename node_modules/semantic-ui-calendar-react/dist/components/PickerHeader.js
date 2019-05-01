'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerHeader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PickerHeader(props) {
  var onNextBtnClick = props.onNextBtnClick,
      onPrevBtnClick = props.onPrevBtnClick,
      activeDate = props.activeDate,
      activeDatesRange = props.activeDatesRange,
      activeYears = props.activeYears,
      activeYear = props.activeYear,
      includeDay = props.includeDay,
      showWeeks = props.showWeeks,
      width = props.width,
      onDateClick = props.onDateClick;

  var rest = (0, _utils.getUnhandledProps)(PickerHeader, props);

  var _getWeekDayHeaders = function _getWeekDayHeaders() {
    return (0, _utils.getWeekDays)().map(function (weekDay) {
      return _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        {
          key: weekDay,
          className: 'suir-calendar week-day',
          colSpan: '1' },
        weekDay
      );
    });
  };

  _getWeekDayHeaders.handledProps = [];
  var cellClasses = (0, _classnames2.default)('suir-calendar', 'cell', showWeeks ? '' : 'time-picker-header');

  var buttonClasses = (0, _classnames2.default)('suir-calendar', 'button');

  var getRangeRow = function getRangeRow() {
    var getContent = function getContent() {
      var start = activeDatesRange.start,
          end = activeDatesRange.end;

      if (start && end) {
        return start.format('MMM DD, YYYY') + ' - ' + end.format('MMM DD, YYYY');
      }
      if (start) {
        return start.format('MMMM DD, YYYY') + ' - ' + '. . .';
      }
      return '. . . - . . .';
    };
    return _react2.default.createElement(
      _semanticUiReact.Table.Row,
      null,
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        { className: 'suir-calendar cell', colSpan: '7' },
        getContent()
      )
    );
  };

  getRangeRow.handledProps = [];
  var getContent = function getContent() {
    if (activeYears) {
      return activeYears.start + ' - ' + activeYears.end;
    }

    if (activeYear) {
      return activeYear;
    }

    if (activeDate) {
      return includeDay ? activeDate.format('MMMM DD, YYYY') : activeDate.format('MMMM YYYY');
    }
  };

  var headerCellStyle = { cursor: 'pointer ' };

  return _react2.default.createElement(
    _semanticUiReact.Table.Header,
    rest,
    activeDatesRange && getRangeRow(),
    _react2.default.createElement(
      _semanticUiReact.Table.Row,
      null,
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        { className: cellClasses, colSpan: '1' },
        _react2.default.createElement(_semanticUiReact.Icon, {
          fitted: true,
          className: buttonClasses,
          onClick: onPrevBtnClick,
          name: 'chevron left' })
      ),
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        {
          onClick: onDateClick,
          className: cellClasses,
          colSpan: (parseInt(width) - 2).toString() },
        _react2.default.createElement(
          'span',
          { style: headerCellStyle },
          getContent()
        )
      ),
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        { className: cellClasses, colSpan: '1' },
        _react2.default.createElement(_semanticUiReact.Icon, {
          fitted: true,
          className: buttonClasses,
          onClick: onNextBtnClick,
          name: 'chevron right' })
      )
    ),
    showWeeks && _react2.default.createElement(
      _semanticUiReact.Table.Row,
      null,
      _getWeekDayHeaders()
    )
  );
}

PickerHeader.handledProps = ['activeDate', 'activeDatesRange', 'activeYear', 'activeYears', 'className', 'includeDay', 'onDateClick', 'onNextBtnClick', 'onPrevBtnClick', 'showWeeks', 'width'];
PickerHeader.propTypes = {
  onNextBtnClick: _propTypes2.default.func.isRequired,
  onPrevBtnClick: _propTypes2.default.func.isRequired,
  /** Header's width in table columns */
  width: _propTypes2.default.string.isRequired,
  /** calendar shows date of this `moment` */
  activeDate: _propTypes2.default.instanceOf(_moment2.default),
  activeYear: _propTypes2.default.string,
  activeYears: _propTypes2.default.shape({
    start: _propTypes2.default.number,
    end: _propTypes2.default.number
  }),
  activeDatesRange: _propTypes2.default.shape({
    start: _propTypes2.default.instanceOf(_moment2.default),
    end: _propTypes2.default.instanceOf(_moment2.default)
  }),
  includeDay: _propTypes2.default.bool,
  showWeeks: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onDateClick: _propTypes2.default.func
};

PickerHeader.defaultProps = {
  includeDay: false,
  showWeeks: false
};

exports.default = PickerHeader;
exports.PickerHeader = PickerHeader;