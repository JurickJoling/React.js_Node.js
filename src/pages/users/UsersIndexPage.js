import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../../actions/UserActions';
import { UsersList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class UsersIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired
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
    const { fetchUsers } = this.props;
    this.setState({ search, fetched: false }, () => fetchUsers({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-6">
            <LinkTo className="btn btn-success" url="users/new">Create User</LinkTo>
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <UsersList items={items} />
      </Loading>
    );
  }
}

export default connect(({ users: { items } }) => ({ items }), { fetchUsers })(UsersIndexPage);
