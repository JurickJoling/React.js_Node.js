import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '../../actions/EventActions';
import { EventsList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class EventsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchEvents: PropTypes.func.isRequired
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
    const { fetchEvents } = this.props;
    this.setState({ search, fetched: false }, () => fetchEvents({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="events/new">Create Event</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>Events ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <EventsList items={items} />
      </Loading>
    );
  }
}

export default connect(({ events: { items, count } }) => ({ items, count }), { fetchEvents })(EventsIndexPage);
