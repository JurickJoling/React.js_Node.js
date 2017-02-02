import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  LinkTo,
  renderField,
  renderDropdownList,
  renderCheckboxField,
  DateStartEndList,
  renderDateTimePicker
} from '../../../helpers';

class BoostForm extends Component {

  state = {};

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const {
      item,
      item: {
        dates, start_time, with_max_budget, max_budget, end_time, boost_type
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      this.setState({ with_max_budget }, () => initialize({
        dates, start_time, with_max_budget, max_budget, end_time, boost_type
      }));
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;
    const { with_max_budget } = this.state;

    return (
      <form onSubmit={handleSubmit(boost => onSave(boost))}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="dates"
              component={DateStartEndList}
              label="Dates"
            />
          </div>
          <div className="col-md-6">
            <Field
              name="start_time"
              component={renderDateTimePicker}
              label="Start Time"
            />
            <Field
              name="with_max_budget"
              component={renderCheckboxField}
              label="Max Budget?"
              afterChange={({ target: { checked } }) => this.setState({ with_max_budget: checked })}
            />
            {with_max_budget ? null : (
              <Field
                name="end_time"
                component={renderDateTimePicker}
                label="End Time"
              />
            ) }
            {with_max_budget ? <Field name="max_budget" component={renderField} label="Max Budget"/> : null}
            <Field
              name="boost_type"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Invites Sent', value: 'invites_sent'},
                {name: 'Invites Accepted', value: 'invites_accepted'},
                {name: 'Tickets Purchased', value: 'tickets_purchased'},
                {name: 'Attendees', value: 'attendees'}
              ]}
              label="Boost Type"
            />
          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="boosts">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Boost' : 'Update Boost'}
          </button>
        </div>
      </form>
    );
  }
}

BoostForm.defaultProps = {
  item: {}
};

BoostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};


export default reduxForm({ form: 'boost' })(BoostForm);