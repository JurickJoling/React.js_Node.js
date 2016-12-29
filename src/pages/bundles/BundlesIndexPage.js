import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/BundleActions';
import { BundlesList } from '../../components';
import { LinkTo, Loading } from '../../helpers';

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
      <div className="container">
        <LinkTo className="btn btn-success" url="bundles/new">Create Bundle</LinkTo>
        <Loading loaded={fetched}>
          <BundlesList bundles={bundles} />
        </Loading>
      </div>
    );
  }
}

export default connect(({ bundles: { items } }) => ({ bundles: items }), actions)(BundlesIndexPage);
