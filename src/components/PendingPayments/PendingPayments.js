import React, { PropTypes } from 'react';

import { Button, LinkTo } from '../../helpers';

function PendingPayments({ events }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
        <tr>
          <th>Event</th>
          <th>Location</th>
          <th>Location Type</th>
          <th>Cost</th>
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
      {events.map(({ objectId, location, cost, invites_sent, invites_accepted, attendees_count, tickets_sold }) => (
        <tr key={objectId}>
          <td>
            <LinkTo url={`events/${objectId}`}>{objectId}</LinkTo>
          </td>
          <td>
            {location ? <LinkTo url={`locations/${location.objectId}`}>{location.name}</LinkTo> : null}
          </td>
          <td>
            {location && location.location_type ? <LinkTo url={`locationTypes/${location.location_type.objectId}`}>{location.location_type.name}</LinkTo> : null}
          </td>
          <td>{cost ? cost : 'Free'}</td>
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
  events: PropTypes.array.isRequired,
};

export default PendingPayments;