import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchLocations } from '../../../actions/LocationActions';
import { fetchTags } from '../../../actions/TagActions';

import { LinkTo, renderField, renderTextareaField, renderDropdownList, renderMultiselect, renderDatePicker, renderDateTimePicker, renderCheckboxField } from '../../../helpers';

class EventForm extends Component {
  componentDidMount() {
    const { fetchLocations, fetchTags } = this.props;
    Promise.all([
      fetchLocations({}),
      fetchTags({})
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const {
      item,
      item: {
        description
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        description
      });
    }
  }

  render () {
    const { item, tags, locations, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(event => {onSave(event)})}>
        <h2>Event Type</h2>
        <h2>Date + Event Name</h2>
        <Field
          name="start_time"
          component={renderDateTimePicker}
          label="Start Time"
        />
        <Field
          name="end_time"
          component={renderDateTimePicker}
          label="End Time"
        />
        <Field
          name="location_id"
          valueField="objectId"
          textField="name"
          component={renderDropdownList}
          data={locations.map(({ objectId, name }) => ({ objectId, name }))}
          label="Location"
        />
        <Field name="description" component={renderTextareaField} label="Description"/>
        <h2>Redemption</h2>
        <h2>Evenbrite</h2>
        <Field name="free" component={renderCheckboxField} label="Free?"/>
        <Field name="add_criteria" component={renderCheckboxField} label="Add Criteria?"/>
        <Field
          name="gender_criteria"
          component={renderDropdownList}
          data={['male', 'female', 'any']}
          label="Gender Criteria"
        />
        <Field
          name="age_criteria"
          component={renderDropdownList}
          data={['18-24', '25-35', '35+', 'any']}
          label="Age Criteria"
        />
        <Field name="boost" component={renderCheckboxField} label="Boost?"/>
        <h2>Boost Type</h2>
        <Field name="comments_for_reviewer" component={renderField} label="Comments For Reviewer" />
        <h2>Boost Status</h2>
        <Field name="boost_invites_sent" component={renderField} type="number" label="Boost Invites Sent" />
        <Field name="boost_invites_accepted" component={renderField} type="number" label="Boost Invites Accepted" />
        <Field name="boost_attendees" component={renderField} type="number" label="Boost Attendees" />
        <h2>Special Reference</h2>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="events">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Event' : 'Update Event'}
          </button>
        </div>
      </form>
    );
  }
}

EventForm.defaultProps = {
  item: {}
};

EventForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};


export default connect(({
  tags: { items: tags },
  locations: { items: locations },
}) => ({ tags, locations }), ({ fetchLocations, fetchTags }))(reduxForm({ form: 'event' })(EventForm));