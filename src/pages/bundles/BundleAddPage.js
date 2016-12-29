import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createBundle } from '../../actions/BundleActions';

import { BundleForm } from '../../components';

class BundleAddPage extends Component {
  render() {
    const { createBundle } = this.props;
    return (
      <div className="container">
        <BundleForm onSave={bundle => createBundle(bundle)} />
      </div>
    );
  }
}

export default connect(({ bundles: { item } }) => ({ bundle: item }), { createBundle })(BundleAddPage);