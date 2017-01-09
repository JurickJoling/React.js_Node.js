import React, { PropTypes } from 'react';

import { LinkTo, BooleanField } from '../../../helpers';
import { renderDate, renderDateTime } from '../../../utils';

// Special Added (yes/no), Boost (yes/no},

function EventsList({ items }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <th>Event Type</th>
        <th>Dates</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Location</th>
        <th>Redemption</th>
        <th>Cost</th>
        <th>Special Added</th>
        <th>Boost</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, event_type, dates, start_time, end_time, redemption, cost, special_id, boost, createdAt }) => (
        <tr key={objectId}>
          <td>{event_type ? event_type.name : null}</td>
          <td>
            <table className="table table-bordered table-striped table-hover">
              <tbody>
              {dates.map(({ date, name, start, end }, index) => (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{name}</td>
                  <td>{start}</td>
                  <td>{end}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </td>
          <td>{renderDateTime(start_time)}</td>
          <td>{renderDateTime(end_time)}</td>
          <td>Location</td>
          <td>{redemption ? redemption.name : null}</td>
          <td>{cost ? cost : 'Free'}</td>
          <td>Special</td>
          <td><BooleanField value={boost} /></td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`events/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`events/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`events/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

EventsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default EventsList;