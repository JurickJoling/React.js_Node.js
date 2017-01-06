import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocations } from '../../actions/LocationActions';
import { LocationsList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class LocationsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchLocations: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt'
  };

  componentDidMount() {
    const { order } = this.state;
    this.fetchData({ order });
  }

  fetchData({ search, order, filters }) {
    const { fetchLocations } = this.props;
    this.setState({ search, fetched: false }, () => fetchLocations({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="locations/new">Create Location</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>Locations ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <LocationsList items={items} />
      </Loading>
    );
  }
}

export default connect(({ locations: { items, count } }) => ({ items, count }), { fetchLocations })(LocationsIndexPage);
