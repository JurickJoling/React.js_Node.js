import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createItinerary } from '../../actions/ItineraryActions';

import { ItineraryForm } from '../../components';

class ItineraryAddPage extends Component {

  static propTypes = {
    createItinerary: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createItinerary } = this.props;
    return (
      <div className="container">
        <ItineraryForm errorMessage={errorMessage} onSave={itinerary => createItinerary(itinerary)} />
      </div>
    );
  }
}

export default connect(({ itineraries: { errorMessage } }) => ({ errorMessage }), { createItinerary })(ItineraryAddPage);