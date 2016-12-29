import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteItinerary } from '../../actions/ItineraryActions';

import { ItineraryDelete } from '../../components';
import { Tabs } from '../../helpers';

class ItineraryDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteItinerary } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="itineraries" itemID={itemID} />
        <ItineraryDelete itemID={itemID} onDelete={id => deleteItinerary(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteItinerary })(ItineraryDeletePage);