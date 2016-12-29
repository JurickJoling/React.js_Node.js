import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBundles } from '../../actions/BundleActions';
import { BundlesList, SearchForm } from '../../components';
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
    this.fetchData({});
  }

  fetchData({ search }) {
    const { fetchBundles } = this.props;
    this.setState({ fetched: false }, () => fetchBundles({ search }).then(() => this.setState({ fetched: true })));
  }

  render() {
    const { bundles } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" ignoreLoader={(
        <div className="row">
          <div className="col-md-6">
            <LinkTo className="btn btn-success" url="bundles/new">Create Bundle</LinkTo>
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={search => this.fetchData(search)} />
          </div>
        </div>
      )} loaded={fetched}>
        <BundlesList bundles={bundles} />
      </Loading>
    );
  }
}

export default connect(({ bundles: { items } }) => ({ bundles: items }), { fetchBundles })(BundlesIndexPage);
