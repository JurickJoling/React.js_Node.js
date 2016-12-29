import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/BundleActions';
import { BundlesList } from '../../components';
import { Loading } from '../../helpers';

class BundlesIndexPage extends Component {

  static propTypes = {
    bundles: PropTypes.array.isRequired,
    fetchBundles: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    this.props.fetchBundles().then(() => this.setState({ fetched: true }));
  }

  render() {
    const { bundles } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <BundlesList bundles={bundles} />
      </Loading>
    );
  }
}

export default connect(({ bundles: { items } }) => ({ bundles: items }), actions)(BundlesIndexPage);
