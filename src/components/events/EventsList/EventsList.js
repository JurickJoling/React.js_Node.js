import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { LinkTo, BooleanField } from '../../../helpers';
import { renderDate, renderDateTime } from '../../../utils';

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
        <th>Special</th>
        <th>Boost</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, event_type, dates, start_time, end_time, location, redemption, cost, special, boost, createdAt }) => (
        <tr key={objectId}>
          <td>{event_type ? event_type.name : null}</td>
          <td>
            {size(dates || []) > 0 ? (
                <table className="table table-bordered table-striped table-hover">
                  <tbody>
                  {(dates || []).map(({ date, name, start, end }, index) => (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{name}</td>
                      <td>{start}</td>
                      <td>{end}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : null}
          </td>
          <td>{renderDateTime(start_time)}</td>
          <td>{renderDateTime(end_time)}</td>
          <td>{location ? <LinkTo url={`locations/${location.objectId}`}>{location.name}</LinkTo> : null}</td>
          <td>{redemption ? redemption.name : null}</td>
          <td>{cost ? cost : 'Free'}</td>
          <td>{special ? <LinkTo url={`specials/${special.objectId}`}>{special.incentive_name}</LinkTo> : null}</td>
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