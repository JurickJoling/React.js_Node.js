import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPlans } from '../../actions/PlanActions';
import { PlansList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class PlansIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchPlans: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt',
    include: 'bundle'
  };

  componentDidMount() {
    const { order, include } = this.state;
    this.fetchData({ order, include });
  }

  fetchData({ search, order, include, filters }) {
    const { fetchPlans } = this.props;
    this.setState({ search, fetched: false }, () => fetchPlans({ order, include, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order, include } = this.state;
    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="plans/new">Create Plan</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>Plans ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order, include })} />
          </div>
        </div>
      )} loaded={fetched}>
        <PlansList items={items} />
      </Loading>
    );
  }
}

export default connect(({ plans: { items, count } }) => ({ items, count }), { fetchPlans })(PlansIndexPage);
