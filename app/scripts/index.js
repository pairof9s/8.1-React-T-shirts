var React = require('react');
var ReactDOM = require('react-dom');

var AppContainer = require('./components/app.jsx');

ReactDOM.render(
  React.createElement(AppContainer),
  document.getElementById('container')
)
