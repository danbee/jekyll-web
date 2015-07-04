import React from 'react';
import { RouteHandler } from 'react-router';

import appStore from '../stores/app-store';
import Spinner from './spinner';

let getState = () => {
  return appStore.getState();
}

class JekyllWeb extends React.Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentDidMount() {
    this.unsubscribeState = appStore.listen(() => {
      this.setState(getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribeState();
  }

  render() {
    return (
      <div className="jekyllWeb">
        <h1>Jekyll Web</h1>
        <RouteHandler />
        <Spinner show={this.state.spinner} />
      </div>
    );
  }

};

export default JekyllWeb;
