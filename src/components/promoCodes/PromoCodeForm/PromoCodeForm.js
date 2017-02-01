import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Promise from 'bluebird';

import { fetchEventTypes } from '../../../actions/EventTypeActions';
import { fetchLocationTypes } from '../../../actions/LocationTypeActions';

import {
  LinkTo,
  renderField,
  renderDropdownList
} from '../../../helpers';

class PromoCodeForm extends Component {
  componentDidMount() {
    const { fetchEventTypes, fetchLocationTypes } = this.props;
    Promise.all([
      fetchEventTypes({}),
      fetchLocationTypes({})
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const {
      item,
      item: {
        name, amount, event_type, location_type
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name, amount, event_type, location_type
      });
    }
  }

  render () {
    const { item, eventTypes, locationTypes, errorMessage, handleSubmit, onSave } = this.props;
    return (
      <form onSubmit={handleSubmit(promoCode => onSave(promoCode))}>
        <div className="row">
          <div className="col-md-6">
            <Field name="name" component={renderField} label="PromoCode" />
            <Field name="amount" component={renderField} label="Amount" />
            <Field
              name="event_type"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={eventTypes.map(({ objectId, name }) => ({ objectId, name }))}
              label="Event Type"
            />
            <Field
              name="location_type"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={locationTypes.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location Type"
            />
          </div>
          <div className="col-md-6">

          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="promoCodes">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create PromoCode' : 'Update PromoCode'}
          </button>
        </div>
      </form>
    );
  }
}

PromoCodeForm.defaultProps = {
  item: {}
};

PromoCodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default connect(({
  eventTypes: { items: eventTypes },
  locationTypes: { items: locationTypes }
}) => ({ eventTypes, locationTypes }), ({ fetchEventTypes, fetchLocationTypes }))(reduxForm({ form: 'promoCode' })(PromoCodeForm));