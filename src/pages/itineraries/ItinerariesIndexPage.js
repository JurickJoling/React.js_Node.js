import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchItineraries } from '../../actions/ItineraryActions';
import { ItinerariesList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class ItinerariesIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchItineraries: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    this.fetchData({});
  }

  fetchData({ search }) {
    const { fetchItineraries } = this.props;
    this.setState({ fetched: false }, () => fetchItineraries({ search }).then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" ignoreLoader={(
        <div className="row">
          <div className="col-md-6">
            <LinkTo className="btn btn-success" url="itineraries/new">Create Itinerary</LinkTo>
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={search => this.fetchData(search)} />
          </div>
        </div>
      )} loaded={fetched}>
        <ItinerariesList items={items} />
      </Loading>
    );
  }
}

export default connect(({ itineraries: { items } }) => ({ items }), { fetchItineraries })(ItinerariesIndexPage);
