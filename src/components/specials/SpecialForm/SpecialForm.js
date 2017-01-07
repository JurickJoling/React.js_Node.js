import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField, renderTextareaField, renderDropdownList, renderMultiselect, renderDatePicker, renderCheckboxField } from '../../../helpers';
import { weekDays, capitalize  } from '../../../utils';

class SpecialForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const {
      item,
      item: {
        incentive_name
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        incentive_name
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(special => onSave(special))}>
        <Field name="incentive_name" component={renderField} label="Incentive Name" />
        <Field
          name="category"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Group Rate', value: 'group_rate'},
            {name: 'Special Event', value: 'special_event'},
            {name: 'Birthday', value: 'birthday'},
            {name: 'Happy Hour', value: 'happy_hour'},
            {name: 'Brunch', value: 'brunch'}
          ]}
          label="Category"
        />
        <Field
          name="incentive_type"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Fixed Amount', value: 'fixed_amount'},
            {name: '% Discount', value: 'per_cent_discount'},
            {name: 'Free Item', value: 'free_item'},
            {name: 'VIP Benefits', value: 'vip_benefits'}
          ]}
          label="Incentive Type"
        />
        <Field
          name="attendee_min"
          component={renderDropdownList}
          data={range(1, 21)}
          label="Attendee Minimum"
        />
        <Field
          name="attendee_max"
          component={renderDropdownList}
          data={range(1, 21)}
          label="Attendee Maximum"
        />
        <Field name="amount" component={renderField} type="number" label="Amount" />
        <Field name="item_name" component={renderField} label="Item Name" />
        <Field name="description" component={renderTextareaField} label="Description" />
        <Field
          name="redemption_options"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Mobile Image', value: 'mobile_image'},
            {name: 'Not Required', value: 'not_required'},
            {name: 'Promo Code', value: 'promo_code'}
          ]}
          label="Redemption Options"
        />
        <Field name="promo_code" component={renderField} label="Promo Code" />
        <Field
          name="days"
          valueField="value"
          textField="name"
          component={renderMultiselect}
          data={weekDays.map(day => ({ name: capitalize(day), value: day }))}
          label="Day of week"
        />
        <h2>Start Time</h2>
        <Field
          name="end_date"
          component={renderDatePicker}
          label="End Date"
        />
        <Field name="without_end_date" component={renderCheckboxField} label="No End Date" />
        <h2>Image Upload</h2>
        <Field
          name="status"
          valueField="value"
          textField="name"
          component={renderDropdownList}
          data={[
            {name: 'Active', value: 'active'},
            {name: 'Pending Approval', value: 'pending_approval'},
            {name: 'Expired', value: 'expired'}
          ]}
          label="Status"
        />
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="specials">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Special' : 'Update Special'}
          </button>
        </div>
      </form>
    );
  }
}

SpecialForm.defaultProps = {
  item: {}
};

SpecialForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};


export default reduxForm({ form: 'special' })(SpecialForm);