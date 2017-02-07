import React, { PropTypes } from 'react';

import { LinkTo } from '../../helpers';
import { renderDate, renderDateTime } from '../../utils';

function PendingPayments({ boosts }) {
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
          <th>Invites Sent</th>
          <th>Invites Accepted</th>
          <th>Attendees Count</th>
          <th>Tickets Sold</th>
          <th>Price per invite sent</th>
          <th>Price per invite accepted</th>
          <th>Price per attendee</th>
          <th>Price per ticket sold</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      {boosts.map(({ objectId, name, start_time, end_time, with_max_budget, max_budget, boost_type, createdAt, invites_sent, invites_accepted, attendees_count, tickets_sold, location }) => (
        <tr key={objectId}>
          <td>
            <LinkTo url={`boosts/${objectId}`}>{name}</LinkTo>
          </td>

          <td>{renderDateTime(start_time)}</td>
          <td>{with_max_budget ? null : renderDateTime(end_time)}</td>
          <td>{with_max_budget ? max_budget : null}</td>
          <td>{boost_type ? boost_type.name : null}</td>
          <td>{renderDate(createdAt)}</td>

          <td>{invites_sent}</td>
          <td>{invites_accepted}</td>
          <td>{attendees_count}</td>
          <td>{tickets_sold}</td>
          <td>{location && location.location_type ? location.location_type.price_per_invite_sent : null}</td>
          <td>{location && location.location_type ? location.location_type.price_per_invite_accepted : null}</td>
          <td>{location && location.location_type ? location.location_type.price_per_attendee : null}</td>
          <td>{location && location.location_type ? location.location_type.price_per_ticket_sold : null}</td>
          <td>${location && location.location_type ? invites_sent * location.location_type.price_per_invite_sent + invites_accepted * location.location_type.price_per_invite_accepted + attendees_count * location.location_type.price_per_attendee + tickets_sold * location.location_type.price_per_ticket_sold : null}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

PendingPayments.propTypes = {
  boosts: PropTypes.array.isRequired,
};

export default PendingPayments;