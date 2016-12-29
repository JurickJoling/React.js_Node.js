import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/BundleActions';
import { BundleItem } from '../../components';
import { Loading } from '../../helpers';

class BundleShowPage extends Component {

  static propTypes = {
    bundle: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchBundle: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchBundle } = this.props;
    fetchBundle(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { bundle } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <BundleItem bundle={bundle} />
      </Loading>
    );
  }
}

export default connect(({ bundles: { item } }) => ({ bundle: item }), actions)(BundleShowPage);
