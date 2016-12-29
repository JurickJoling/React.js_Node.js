import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField } from '../../../helpers';

class ItineraryForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { item, item: { heading, priority, banner }, initialize } = this.props;

    if (!isEmpty(item)) {
      initialize({
        heading,
        priority,
        banner
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(itinerary => {onSave(itinerary)})}>
        <Field name="banner" component={renderField} label="URL of banner"/>
        <Field name="heading" component={renderField} label="Name / Title"/>
        <Field name="priority" component={renderField} type="number" label="Priority" />
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
    objectId: PropTypes.string,
    heading: PropTypes.string,
    priority: PropTypes.string,
    banner: PropTypes.string,
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