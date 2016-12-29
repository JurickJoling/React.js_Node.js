import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField } from '../../../helpers';
import { weekDays  } from '../../../utils';

class ItineraryForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { item, item: {
      title_event, description_event, image,
      tags, location,
      partner, start_day, count_attended, is21_age, estimated_cost, end_day,
      reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
      repeat_daily, featured, featured_name, featured_link, first_message
    }, initialize } = this.props;

    if (!isEmpty(item)) {
      initialize({
        title_event, description_event, image,
        tags, location,
        partner, start_day, count_attended, is21_age, estimated_cost, end_day,
        reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
        repeat_daily, featured, featured_name, featured_link, first_message
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(itinerary => {onSave(itinerary)})}>
        <div>Bundle</div>
        <Field name="image" component={renderField} label="URL of banner"/>
        <Field name="title_event" component={renderField} label="Title"/>
        <Field name="description_event" component={renderField} type="textarea" label="Description" />
        <div>Tags - select</div>
        <div>Location - Yelp</div>
        <Field name="partner" component={renderField} type="checkbox" label="Partner" />
        <div>start_day - Date</div>
        <Field name="count_attended" component={renderField} type="number" label="Number of Attendees" />
        <div>Experience Type - select - Not Found!!!</div>
        <Field name="is21_age" component={renderField} type="checkbox" label="Only 21+ Allowed" />
        <div>Estimate Cost - select</div>
        <div>end_day - Date</div>
        <Field name="is21_age" component={renderField} type="checkbox" label="Only 21+ Allowed" />
        {weekDays.map(day => (
          <Field
            key={day}
            name={day}
            component={renderField}
            type="checkbox"
            label={`Every ${last(day.split('_')).replace(/\b\w/g, l => l.toUpperCase())}`}
          />
        ))}
        <Field name="repeat_daily" component={renderField} type="checkbox" label="Repeat Daily" />
        <Field name="featured" component={renderField} type="checkbox" label="Featured" />
        <Field name="featured_name" component={renderField} label="Featured Name" />
        <Field name="featured_link" component={renderField} label="Featured Link" />
        <Field name="first_message" component={renderField} type="textarea" label="First Chat Message" />
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="itineraries">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Itinerary' : 'Update Itinerary'}
          </button>
        </div>
      </form>
    );
  }
}

ItineraryForm.defaultProps = {
  item: {}
};

ItineraryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

function validate({ priority }) {
  const errors = {};

  if (!/\d+/.test(priority)) {
    errors.priority = 'Priority must be a number';
  }

  return errors;
}

export default reduxForm({ form: 'itinerary', validate })(ItineraryForm);