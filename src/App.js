import React, { Component, PropTypes } from 'react';

import { Header } from './components';

class App extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
