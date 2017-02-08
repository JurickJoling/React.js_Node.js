import React, { Component, PropTypes } from 'react';

import { LinkTo } from '../../helpers';
import { renderDate, renderDateTime } from '../../utils';

export default class PendingPayments extends Component {

  static propTypes = {
    boosts: PropTypes.array.isRequired,
    location_type: PropTypes.object.isRequired,
  };
  //
  // <th>Invites Sent</th>
  // <th>Invites Accepted</th>
  // <th>Attendees Count</th>
  // <th>Tickets Sold</th>
  //
  // <th>Price per invite sent</th>
  // <th>Price per invite accepted</th>
  // <th>Price per attendee</th>
  // <th>Price per ticket sold</th>
  //

  //
  // <td>{invites_sent}</td>
  // <td>{invites_accepted}</td>
  // <td>{attendees_count}</td>
  // <td>{tickets_sold}</td>
  //
  // <td>{location_type ? location_type.price_per_invite_sent : null}</td>
  // <td>{location_type ? location_type.price_per_invite_accepted : null}</td>
  // <td>{location_type ? location_type.price_per_attendee : null}</td>
  // <td>{location_type ? location_type.price_per_ticket_sold : null}</td>
  // <td>${location_type ? invites_sent * location_type.price_per_invite_sent + invites_accepted * location_type.price_per_invite_accepted + attendees_count * location_type.price_per_attendee + tickets_sold * location_type.price_per_ticket_sold : null}</td>
  //

  renderResults({ boost_type, boost: { invites_accepted, invites_sent } }) {
    switch (boost_type.value) {
      case 'invites_accepted':
        return `Invites Accepted: ${invites_accepted}`;

      case 'invites_sent':
        return `Invites Sent: ${invites_sent}`
    }
  }

  renderCost({ boost_type, boost: { invites_accepted, invites_sent } }) {
    const { location_type } = this.props;

    switch (boost_type.value) {
      case 'invites_accepted':
        return `Price Per Invite Accepted: ${location_type.price_per_invite_accepted}`;

      case 'invites_sent':
        return `Price per Invite Sent: ${location_type.price_per_invite_sent}`
    }
  }

  renderTotal({ boost_type, total_spend, boost: { invites_accepted, invites_sent } }) {
    const { location_type } = this.props;
    switch (boost_type.value) {
      case 'invites_accepted':
        return `$${location_type.price_per_invite_accepted * invites_accepted - total_spend}`;

      case 'invites_sent':
        return `$${location_type.price_per_invite_sent * invites_sent - total_spend}`;
    }
  }

  render() {
    const { boosts, location_type } = this.props;

    return (
      <table className="table table-bordered table-hover table-striped table-responsive">
        <thead>
        <tr>
          <th>Boost</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Max Budget</th>
          <th>Boost Type</th>
          <th>Created</th>
          <th>Location Type</th>

          <th>Results</th>
          <th>Cost</th>

          <th>Total</th>
          <th>Total Spend</th>
        </tr>
        </thead>
        <tbody>
        {boosts.map(({ objectId, name, start_time, end_time, with_max_budget, max_budget, boost_type, createdAt, total_spend, ...rest }) => (
          <tr key={objectId}>
            <td>
              <LinkTo url={`boosts/${objectId}`}>{name}</LinkTo>
            </td>

            <td>{renderDateTime(start_time)}</td>
            <td>{with_max_budget ? null : renderDateTime(end_time)}</td>
            <td>{with_max_budget ? max_budget : null}</td>
            <td>{boost_type ? boost_type.name : null}</td>
            <td>{renderDate(createdAt)}</td>

            <td>{location_type ? location_type.name : null}</td>

            <td>{this.renderResults({ boost_type, boost: rest })}</td>
            <td>{this.renderCost({ boost_type, boost: rest })}</td>
            <td>{this.renderTotal({ boost_type, total_spend, boost: rest })}</td>
            <td>{with_max_budget ? `$${total_spend} of $${max_budget}` : `$${total_spend}`}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}
