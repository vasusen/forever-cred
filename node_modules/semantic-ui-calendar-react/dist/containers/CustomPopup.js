'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPopup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomPopup(props) {
  return _react2.default.createElement(_semanticUiReact.Popup, _extends({}, props, {
    flowing: true,
    id: 'suirCalendarPopup',
    hideOnScroll: true,
    on: 'click',
    className: 'suir-calendar popup',
    hoverable: true }));
}

CustomPopup.handledProps = [];
exports.default = CustomPopup;
exports.CustomPopup = CustomPopup;