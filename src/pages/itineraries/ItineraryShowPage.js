import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchItinerary } from '../../actions/ItineraryActions';

import { ItineraryItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class ItineraryShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchItinerary: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchItinerary } = this.props;
    fetchItinerary(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="itineraries" itemID={itemID} />
        <ItineraryItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ itineraries: { item } }) => ({ item }), { fetchItinerary })(ItineraryShowPage);
