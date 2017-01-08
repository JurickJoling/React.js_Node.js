import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField, renderDropdownList, renderCheckboxField } from '../../../helpers';

class LocationForm extends Component {
  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    const {
      item,
      item: {
        name, address, phone
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name, address, phone
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(location => {onSave(location)})}>
        <h2>Yelp</h2>
        <Field name="name" component={renderField} label="Location Name"/>
        <Field name="address" component={renderField} label="Address"/>
        <Field name="phone" component={renderField} label="Phone"/>
        <Field name="category" component={renderField} label="Category"/>
        <Field name="neighborhood" component={renderField} label="Neighborhood"/>
        <Field name="metro_city" component={renderField} label="Metro City"/>
        <h2>Hours of operations</h2>
        <Field name="reservations" component={renderCheckboxField} label="Takes Reservations?"/>
        <Field name="latitude" component={renderField} label="Latitude"/>
        <Field name="longitude" component={renderField} label="Longitude"/>
        <Field name="rating" component={renderField} label="Rating"/>
        <Field name="groups" component={renderCheckboxField} label="Good For Group?"/>
        <Field name="outdoor" component={renderCheckboxField} label="Outdoor Seating?"/>
        <Field
          name="type"
          component={renderDropdownList}
          data={[
            'Restaurant',
            'Theatre',
            'Event Organizer',
          ]}
          label="Location Type"
        />
        <Field name="verified" component={renderCheckboxField} label="Verified?"/>
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


export default reduxForm({ form: 'location' })(LocationForm);