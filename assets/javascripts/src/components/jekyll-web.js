import React from 'react';
import { RouteHandler } from 'react-router';

class JekyllWeb extends React.Component {

  render() {
    return (
      <div className="jekyllWeb">
        <h1>Jekyll Web</h1>
        <RouteHandler />
      </div>
    );
  }

};

export default JekyllWeb;
