import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchTags } from '../../../actions/TagActions';

import { LinkTo, renderField, renderTextareaField, renderDropdownList, renderMultiselect, renderDatePicker, renderCheckboxField } from '../../../helpers';
import { weekDays  } from '../../../utils';

class SpecialForm extends Component {
  componentDidMount() {
    const { fetchTags } = this.props;
    Promise.all([
      fetchTags({})
    ]).then(() => this.handleInitialize());
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
    const { item, tags, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(special => {onSave(special)})}>
        <Field name="incentive_name" component={renderField} label="Incentive Name" />
        <h2>Category</h2>
        <h2>Incentive Type</h2>
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
          label="Attendee Minimum"
        />
        <Field name="amount" component={renderField} type="number" label="Amount" />
        <Field name="item_name" component={renderField} label="Item Name" />
        <Field name="description" component={renderTextareaField} label="Description" />
        <h2>Redemption Options</h2>
        <Field name="promo_code" component={renderField} label="Promo Code" />
        <Field
          name="days"
          component={renderMultiselect}
          data={weekDays}
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


export default connect(({
  tags: { items: tags }
}) => ({ tags }), ({ fetchTags }))(reduxForm({ form: 'special' })(SpecialForm));