import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField } from '../../../helpers';

class ProfileForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { currentUser, currentUser: { hours, image }, initialize } = this.props;

    if (!isEmpty(currentUser)) {
      initialize({
        hours,
        image
      });
    }
  }

  render () {
    const { errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(user => {onSave(user)})}>
        <Field name="hours" component={renderField} label="Hours"/>
        <Field name="image" component={renderField} label="Image" />
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="profile">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
}

ProfileForm.defaultProps = {
  currentUser: {}
};

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default reduxForm({ form: 'bundle' })(ProfileForm);