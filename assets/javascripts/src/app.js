//= require lodash
//= require jquery
//= require react
//= require react-router
//= require reflux

//= require moment

//= require_tree ./actions
//= require_tree ./stores
//= require_tree ./components

//= require ./config/routes

import React from 'react';
import Router from 'react-router';

import Routes from './routes.js';

Router.run(Routes, (Handler) => {
  React.render(<Handler />, document.getElementById('content'));
});
