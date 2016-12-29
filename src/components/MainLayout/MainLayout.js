import React, { Component, PropTypes } from 'react';

import { Header, Footer } from '../../components';

class MainLayout extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default MainLayout;