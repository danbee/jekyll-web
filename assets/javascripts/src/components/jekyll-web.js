import React from 'react';
import { RouteHandler } from 'react-router';

let JekyllWeb = React.createClass({
  render: function () {
    return (
      <div className="jekyllWeb">
        <h1>Jekyll Web</h1>
        <RouteHandler />
      </div>
    );
  }
});

export default JekyllWeb;
