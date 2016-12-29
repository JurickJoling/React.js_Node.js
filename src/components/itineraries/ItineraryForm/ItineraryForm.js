import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Promise from 'bluebird';

import { fetchBundles } from '../../../actions/BundleActions';
import { fetchTags } from '../../../actions/TagActions';

import {
  LinkTo,
  renderField,
  renderDateTimePicker,
  renderDropdownList,
  renderMultiselect,
  YelpField
} from '../../../helpers';
import { weekDays  } from '../../../utils';

class ItineraryForm extends Component {
  componentDidMount() {
    const { fetchBundles, fetchTags } = this.props;
    Promise.all([
      fetchBundles({}),
      fetchTags({})
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const { item, item: {
      bundle,
      title_event, description_event, image,
      tags, locations,
      partner, start_day, count_attended, is21_age, estimated_cost, end_day,
      reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
      repeat_daily, featured, featured_name, featured_link, first_message
    }, initialize } = this.props;

    if (!isEmpty(item)) {
      initialize({
        bundle: bundle ? { objectId: bundle.objectId } : null,
        start_day: (start_day ? start_day.iso : null),
        end_day: (end_day ? end_day.iso : null),
        title_event, description_event, image,
        tags, locations,
        partner, count_attended, is21_age, estimated_cost,
        reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
        repeat_daily, featured, featured_name, featured_link, first_message
      });
    }
  }

  render () {
    const { item, bundles, tags, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(itinerary => {onSave(itinerary)})}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="bundle"
              valueField="objectId"
              textField="heading"
              component={renderDropdownList}
              data={bundles.map(({ objectId, heading }) => ({ objectId, heading }))}
              label="Bundle"
            />
            <Field name="image" component={renderField} label="URL of banner"/>
            <Field name="title_event" component={renderField} label="Title"/>
            <Field name="description_event" component={renderField} type="textarea" label="Description" />
            <Field
              name="tags"
              component={renderMultiselect}
              data={tags.map(({ tag }) => tag)}
              label="Tags"
            />
            <Field name="locations" component={YelpField} label="Location" placeholder="Select Location" />
            <Field name="partner" component={renderField} type="checkbox" label="Partner" />
            <Field
              name="start_day"
              component={renderDateTimePicker}
              label="Start Day"
            />
            <Field name="count_attended" component={renderField} type="number" label="Number of Attendees" />
            <div>Experience Type - select - Not Found!!!</div>
            <Field name="is21_age" component={renderField} type="checkbox" label="Only 21+ Allowed" />
            <Field
              name="estimated_cost"
              component={renderDropdownList}
              data={['FREE', '$', '$$', '$$$', '$$$$', '$$$$$']}
              label="Estimate Cost"
            />
            <Field
              name="end_day"
              component={renderDateTimePicker}
              label="End Day"
            />
          </div>
          <div className="col-md-6">
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
          </div>
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

  return errors;
}

export default connect(({
  bundles: { items: bundles },
  tags: { items: tags }
}) => ({ bundles, tags }), ({ fetchBundles, fetchTags }))(reduxForm({ form: 'itinerary', validate })(ItineraryForm));