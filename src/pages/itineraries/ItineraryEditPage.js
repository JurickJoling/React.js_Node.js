import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchItinerary, updateItinerary } from '../../actions/ItineraryActions';

import { ItineraryForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class ItineraryAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updateItinerary } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="itineraries" itemID={itemID} />
        <ItineraryForm item={item} errorMessage={errorMessage} onSave={itinerary => updateItinerary(itemID, itinerary)} />
      </Loading>
    );
  }
}

export default connect(({ itineraries: { item, errorMessage } }) => ({ item, errorMessage }), { updateItinerary, fetchItinerary })(ItineraryAddPage);