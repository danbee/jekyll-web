import React from 'react';

class Spinner extends React.Component {

  render() {
    return <div id="spinner" className={this.props.show ? 'shown' : ''} />
  }

};

export default Spinner;
