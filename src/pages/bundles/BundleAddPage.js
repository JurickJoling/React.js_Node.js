import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createBundle } from '../../actions/BundleActions';

import { BundleForm } from '../../components';

class BundleAddPage extends Component {

  static propTypes = {
    createBundle: PropTypes.func.isRequired
  };

  render() {
    const { createBundle } = this.props;
    return (
      <div className="container">
        <BundleForm onSave={bundle => createBundle(bundle)} />
      </div>
    );
  }
}

export default connect(null, { createBundle })(BundleAddPage);