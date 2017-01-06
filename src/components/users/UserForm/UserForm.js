import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchTags } from '../../../actions/TagActions';

import { toBool } from '../../../utils';
import { LinkTo, renderField, renderTextareaField, renderDropdownList, renderMultiselect, renderDatePicker, renderCheckboxField } from '../../../helpers';

class UserForm extends Component {
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
        first_name, last_name, user_email, gender, age_count, bio, birthday, education_history, phone, tags, verified, is_admin
      },
      initialize
    } = this.props;

    console.log('birthday', birthday);

    if (!isEmpty(item)) {
      initialize({
        first_name, last_name, user_email, gender, age_count, bio, education_history, phone, tags,
        verified: toBool(verified),
        is_admin: toBool(is_admin),
        birthday: birthday ? moment(birthday, 'MM/DD/YYYY').utc() : null
      });
    }
  }

  render () {
    const { item, tags, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(user => {onSave(user)})}>
        <Field name="first_name" component={renderField} label="First Name"/>
        <Field name="last_name" component={renderField} label="Last Name"/>
        <Field name="user_email" component={renderField} type="email" label="Email"/>
        <Field
          name="gender"
          component={renderDropdownList}
          data={['male', 'female']}
          label="Gender"
        />
        <Field name="age_count" component={renderField} type="number" label="Age"/>
        <Field name="bio" component={renderTextareaField} label="Bio"/>
        <Field
          name="birthday"
          component={renderDatePicker}
          label="Birthday"
        />
        <Field name="education_history" component={renderField} label="Education History"/>
        <Field name="phone" component={renderField} label="Phone"/>
        <h2>Location</h2>
        <Field
          name="tags"
          component={renderMultiselect}
          data={tags.map(({ tag }) => tag)}
          label="Tags"
        />
        <Field name="verified" component={renderCheckboxField} label="Verified?"/>
        <Field name="is_admin" component={renderCheckboxField} label="Admin?"/>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="users">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create User' : 'Update User'}
          </button>
        </div>
      </form>
    );
  }
}

UserForm.defaultProps = {
  item: {}
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};


export default connect(({
  tags: { items: tags }
}) => ({ tags }), ({ fetchTags }))(reduxForm({ form: 'user' })(UserForm));