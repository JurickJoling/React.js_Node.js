import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo } from '../../../helpers';

function BundleForm({ handleSubmit, onSave, bundle: { objectId, heading, priority, banner } }) {
  return (
    <form onSubmit={handleSubmit(bundle => onSave(bundle))}>
      <fieldset className="form-group">
        <label>URL of banner</label>
        <Field name="banner" component="input" className="form-control" />
      </fieldset>
      <fieldset className="form-group">
        <label>Name / Title</label>
        <Field name="heading" component="input" className="form-control" />
      </fieldset>
      <fieldset className="form-group">
        <label>Priority</label>
        <Field name="priority" component="input" type="number" className="form-control" />
      </fieldset>
      <div className="btn-group">
        <LinkTo className="btn btn-default" url="bundles">Cancel</LinkTo>
        <button action="submit" className="btn btn-primary">Create Bundle</button>
      </div>
    </form>
  );
}

BundleForm.defaultProps = {
  bundle: {}
};

BundleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  bundle: PropTypes.shape({
    objectId: PropTypes.string,
    heading: PropTypes.string,
    priority: PropTypes.string,
    banner: PropTypes.string,
  })
};

export default reduxForm({ form: 'bundle' })(BundleForm);