import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPaymentMethod, updatePaymentMethod } from '../../actions/PaymentMethodActions';

import { PaymentMethodForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class PaymentMethodAddPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchPaymentMethod: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchPaymentMethod } = this.props;
    fetchPaymentMethod(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item, errorMessage, updatePaymentMethod } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs editable={false} modelsName="billing" itemID={itemID} />
        <PaymentMethodForm item={item} errorMessage={errorMessage} onSave={paymentMethod => updatePaymentMethod(itemID, paymentMethod, item)} />
      </Loading>
    );
  }
}

export default connect(({ paymentMethods: { item, errorMessage } }) => ({ item, errorMessage }), { updatePaymentMethod, fetchPaymentMethod })(PaymentMethodAddPage);