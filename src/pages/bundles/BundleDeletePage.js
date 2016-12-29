import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteBundle } from '../../actions/BundleActions';

import { BundleDelete } from '../../components';

class BundleDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteBundle } = this.props;
    return (
      <div className="container">
        <BundleDelete itemID={itemID} onDelete={id => deleteBundle(id)} />
      </div>
    );
  }
}

export default connect(({ bundles: { item } }) => ({ bundle: item }), { deleteBundle })(BundleDeletePage);