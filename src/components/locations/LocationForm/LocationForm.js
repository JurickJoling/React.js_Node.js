import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  LinkTo,
  WeekdayStartEndList,
  YelpFinder,
  renderField,
  renderDropdownList,
  renderCheckboxField
} from '../../../helpers';

class LocationForm extends Component {
  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    const {
      item,
      item: {
        name, address, phone, category, neighborhood, opentable_id, metro_city, metro_city2, hours, reservations,
        latitude, longitude, rating, groups, outdoor, location_type, verified
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name, address, phone, category, neighborhood, opentable_id, metro_city,
        metro_city2,
        hours, reservations, latitude, longitude, rating, groups, outdoor, location_type, verified
      });
    } else {
      initialize({
        metro_city2: { name: 'New York', value: 'new_york' }
      })
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave, initialize } = this.props;

    return (
      <form onSubmit={handleSubmit(location => {onSave(location)})}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="yelp"
              component={YelpFinder}
              label="Add from Yelp"
              onSelect={(business) => {
                const { name, categories, location, display_phone, rating, coordinates, hours, neighborhoods } = business;

                initialize({
                  name,
                  address: isObject(location) ? compact([location.address1, location.address2, location.address3]).join(', ') : null,
                  phone: display_phone,
                  category: (categories || []).map(c => c.title).join(', '),
                  neighborhood: (neighborhoods || []).join(', '),
                  metro_city: isObject(location) ? compact([location.city, location.state]).join(', ') : null,
                  latitude: isObject(coordinates) ? coordinates.latitude : null,
                  longitude: isObject(coordinates) ? coordinates.longitude : null,
                  rating,
                  hours
                })
              }}
            />
            <div className="btn-group m-b">
              <LinkTo className="btn btn-default" url="locations">Cancel</LinkTo>
              <button action="submit" className="btn btn-primary">
                {isEmpty(item) ? 'Create Location' : 'Update Location'}
              </button>
            </div>

            <Field
              name="location_type"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Dance Studio', value: 'dance_studio'},
                {name: 'Cinema', value: 'cinema'},
                {name: 'Restaurant', value: 'restaurant'},
                {name: 'Theater', value: 'theater'},
                {name: 'Bar', value: 'bar'},
                {name: 'Gym', value: 'gym'},
                {name: 'Amusement Park', value: 'amusement_park'},
                {name: 'City Park', value: 'city_park'},
                {name: 'Zoo', value: 'zoo'},
                {name: 'Haunted House', value: 'haunted_house'},
                {name: 'Pool Hall', value: 'pool_hall'},
                {name: 'Recreational Center', value: 'recreational_center'},
                {name: 'Game Room', value: 'game_room'},
                {name: 'Jazz Club', value: 'jazz_club'},
                {name: 'Music Cafe', value: 'music_cafe'},
                {name: 'Coffee Shop', value: 'coffee_shop'},
                {name: 'Karaoke Hall', value: 'karaoke_hall'}
              ]}
              label="Location Type"
            />
            <Field name="name" component={renderField} label="Location Name"/>
            <Field name="address" component={renderField} label="Address"/>
            <Field name="phone" component={renderField} label="Phone"/>
            <Field name="category" component={renderField} label="Category"/>
            <Field name="neighborhood" component={renderField} label="Neighborhood"/>
            <Field name="opentable_id" component={renderField} label="Opentable ID"/>
          </div>
          <div className="col-md-6">
            <Field name="metro_city" component={renderField} label="City"/>
            <Field
              name="metro_city2"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'New York', value: 'new_york'},
                {name: 'San Francisco', value: 'san_francisco'},
                {name: 'Houston', value: 'houston'},
                {name: 'Chicago', value: 'chicago'},
                {name: 'Atlanta', value: 'atlanta'},
                {name: 'Austin', value: 'austin'},
                {name: 'Washington', value: 'washington'},
                {name: 'DC', value: 'dc'},
                {name: 'Boston', value: 'boston'},
                {name: 'Los Angeles', value: 'los_angeles'},
                {name: 'Orlando', value: 'orlando'},
                {name: 'Miami', value: 'miami'},
              ]}
              label="Metro City"
            />
            <Field
              time
              name="hours"
              component={WeekdayStartEndList}
              label="Hours of operations"
            />
            <Field name="reservations" component={renderCheckboxField} label="Takes Reservations?"/>
            <Field name="latitude" component={renderField} label="Latitude"/>
            <Field name="longitude" component={renderField} label="Longitude"/>
            <Field name="rating" component={renderField} label="Rating"/>
            <Field name="outdoor" component={renderCheckboxField} label="Outdoor Seating?"/>
            <Field name="verified" component={renderCheckboxField} label="Verified?"/>
          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="locations">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Location' : 'Update Location'}
          </button>
        </div>
      </form>
    );
  }
}

LocationForm.defaultProps = {
  item: {}
};

LocationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

function validate({ location_type }) {
  const errors = {};

  if (!location_type) {
    errors.location_type = 'Location Type is required';
  }

  return errors;
}

export default reduxForm({ form: 'location', validate })(LocationForm);