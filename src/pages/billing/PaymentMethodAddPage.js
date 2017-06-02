import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createPaymentMethod } from '../../actions/PaymentMethodActions';

import { PaymentMethodForm } from '../../components';

class PaymentMethodAddPage extends Component {

  static propTypes = {
    createPaymentMethod: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, currentUser, createPaymentMethod } = this.props;
    return (
      <div className="container">
        <div className="row m-b">
            <h3 className="addbilling">Add a Payment Method</h3>
        </div>
        <PaymentMethodForm errorMessage={errorMessage} onSave={paymentMethod => createPaymentMethod(paymentMethod, currentUser)} />
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  paymentMethods: { errorMessage }
}) => ({ errorMessage, currentUser }), { createPaymentMethod })(PaymentMethodAddPage);