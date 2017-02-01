import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPromoCodes } from '../../actions/PromoCodeActions';
import { PromoCodesList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class PromoCodesIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchPromoCodes: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt'
  };

  componentDidMount() {
    const { order } = this.state;
    this.fetchData({ order });
  }

  fetchData({ search, order, filters }) {
    const { fetchPromoCodes } = this.props;
    this.setState({ search, fetched: false }, () => fetchPromoCodes({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="promoCodes/new">Create PromoCode</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>PromoCodes ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <PromoCodesList items={items} />
      </Loading>
    );
  }
}

export default connect(({ promoCodes: { items, count } }) => ({ items, count }), { fetchPromoCodes })(PromoCodesIndexPage);
