import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchBoosts } from '../../actions/BoostActions';
import { fetchPaymentMethods } from '../../actions/PaymentMethodActions';
import { PaymentMethodsList, SearchForm, PendingPayments } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class PaymentMethodsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchPaymentMethods: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt',
  };

  componentDidMount() {
    const { order } = this.state;
    this.fetchData({ order });
  }

  fetchData({ search, order, filters, include }) {
    const { currentUser, fetchBoosts, fetchPaymentMethods } = this.props;
    this.setState({ search, fetched: false }, () => Promise.all([
      fetchBoosts({ include: '' }, currentUser),
      fetchPaymentMethods({ order, search, filters }, currentUser),
    ]).then(() => this.setState({ fetched: true })));
  }

  render() {
    const { currentUser, items, boosts, count } = this.props;
    const { fetched, order } = this.state;

    console.log('currentUser', currentUser);

    return (
      <div className="container">
        <div className="row m-b">
          <h1>Pending Payments</h1>
          <PendingPayments boosts={boosts} />
        </div>
        <Loading ignoreLoader={(
          <div className="row m-b">
            <div className="col-md-2">
              <LinkTo className="btn btn-success" url="billing/new">Create Payment Method</LinkTo>
            </div>
            <div className="col-md-4">
              {fetched ? <h4>Payment Methods ({count})</h4> : null}
            </div>
            <div className="col-md-6 text-right">
              <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
            </div>
          </div>
        )} loaded={fetched}>
          <div className="row">
            <PaymentMethodsList items={items} />
          </div>
        </Loading>
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  boosts: { items: boosts },
  paymentMethods: { items, count }
}) => ({ items, count, boosts, currentUser }), { fetchBoosts, fetchPaymentMethods })(PaymentMethodsIndexPage);
