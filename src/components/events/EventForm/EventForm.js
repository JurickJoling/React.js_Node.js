import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchLocations } from '../../../actions/LocationActions';
import { fetchSpecials } from '../../../actions/SpecialActions';

import {
  LinkTo,
  DateNameStartEndList,
  TextCheckboxField,
  EventbriteFinder,
  renderTextareaField,
  renderDropdownList,
  renderDateTimePicker,
  renderCheckboxField
} from '../../../helpers';

class EventForm extends Component {

  state = {};

  componentDidMount() {
    const { currentUser, fetchLocations, fetchSpecials } = this.props;
    Promise.all([
      fetchLocations({}),
      fetchSpecials({}, currentUser)
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const {
      item,
      item: {
        event_type, dates, start_time, end_time, location, description, redemption, eventbrite, cost,
        add_criteria, gender, age, boost, boost_type, comments_for_reviewer, boost_status,
        boost_invites_sent, boost_invites_accepted, boost_attendees, special
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      this.setState({ add_criteria, boost, redemption: redemption ? redemption.value : null }, () => initialize({
        event_type, dates, start_time, end_time, location, description, redemption, eventbrite, cost,
        add_criteria, gender, age, boost, boost_type, comments_for_reviewer, boost_status,
        boost_invites_sent, boost_invites_accepted, boost_attendees, special
      }));
    }
  }

  render () {
    const { item, locations, specials, errorMessage, handleSubmit, onSave } = this.props;
    const { add_criteria, boost, redemption, free } = this.state;

    return (
      <form onSubmit={handleSubmit(event => {onSave(event)})}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="event_type"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Birthday', value: 'birthday'},
                {name: 'Live Music', value: 'live_music'},
                {name: 'Theatre', value: 'theatre'},
                {name: 'Comedy', value: 'comedy'},
                {name: 'Improv', value: 'improv'},
                {name: 'Sports', value: 'sports'},
                {name: 'VIP', value: 'vip'},
                {name: 'Ladies Night', value: 'ladies_night'},
                {name: 'Holiday', value: 'holiday'},
                {name: 'Special Event', value: 'special_event'},
              ]}
              label="Event Type"
            />
            <Field
              name="dates"
              component={DateNameStartEndList}
              label="Dates"
              placeholder="Event Name"
            />
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
              name="location"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={locations.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location"
            />
            <Field name="description" component={renderTextareaField} label="Description"/>
          </div>
          <div className="col-md-6">
            <Field
              name="redemption"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Advance Tickets', value: 'advance_tickets'},
                {name: 'Only Pay at Door', value: 'only_pay_at_door'},
                {name: 'Not Required', value: 'not_required'}
              ]}
              label="Redemption"
              afterChange={({ value }) => this.setState({ redemption: value })}
            />
            {redemption === 'advance_tickets' ? (
              <Field
                name="eventbrite"
                component={EventbriteFinder}
                label="Eventbrite"
                placeholder="Select Event"
              />
            ) : null}
            <Field
              name="cost"
              component={TextCheckboxField}
              label="Cost"
              addon=".00"
              afterCheckboxChange={free => this.setState({ free })}
            />
            <Field
              name="add_criteria"
              component={renderCheckboxField}
              label="Add Criteria?"
              afterChange={({ target: { checked } }) => this.setState({ add_criteria: checked })}
            />
            {add_criteria ? (
              <Field
                name="gender"
                valueField="value"
                textField="name"
                component={renderDropdownList}
                data={[
                  {name: 'Male', value: 'male'},
                  {name: 'Female', value: 'female'},
                  {name: 'Any', value: 'any'},
                ]}
                label="Gender Criteria"
              />
              ) : null}
            {add_criteria ? (
              <Field
                name="age"
                valueField="value"
                textField="name"
                component={renderDropdownList}
                data={[
                  {name: '18-24', value: '18-24'},
                  {name: '25-35', value: '25-35'},
                  {name: '35+', value: '35+'},
                  {name: 'Any', value: 'any'}
                ]}
                label="Age Criteria"
              />
              ) : null}
            <Field
              name="boost"
              component={renderCheckboxField}
              label="Boost?"
              afterChange={({ target: { checked } }) => this.setState({ boost: checked })}
            />
            {boost ? (
              <Field
                name="boost_type"
                valueField="value"
                textField="name"
                component={renderDropdownList}
                data={compact([
                  {name: 'Invites Sent', value: 'invites_sent'},
                  {name: 'Invites Accepted', value: 'invites_accepted'},
                  (free ? null : {name: 'Tickets Purchased', value: 'tickets_purchased'}),
                  {name: 'Attendees', value: 'attendees'}
                ])}
                label="Boost Type"
              />
              ) : null}
            <Field
              name="special"
              valueField="objectId"
              textField="incentive_name"
              component={renderDropdownList}
              data={specials.map(({ objectId, incentive_name }) => ({ objectId, incentive_name }))}
              label="Special"
            />
          </div>
        </div>
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
  auth: { currentUser },
  specials: { items: specials },
  locations: { items: locations },
}) => ({ specials, locations, currentUser }), ({ fetchLocations, fetchSpecials }))(reduxForm({ form: 'event' })(EventForm));