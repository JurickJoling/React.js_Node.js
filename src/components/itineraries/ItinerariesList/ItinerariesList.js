import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function ItinerariesList({ items }) {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
      <tr>
        <th>ObjectId</th>
        <th>Title</th>
        <th>Tags</th>
        <th>Start</th>
        <th>End</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, title_event, tags, start_day, end_day }) => (
        <tr key={objectId}>
          <td>
            <LinkTo url={`itineraries/${objectId}`}>{objectId}</LinkTo>
          </td>
          <td>{title_event}</td>
          <td>{(tags || []).join(', ')}</td>
          <td>{start_day ? renderDateTime(start_day.iso) : null}</td>
          <td>{end_day ? renderDateTime(end_day.iso) : null}</td>
          <td>
            <LinkTo className="btn btn-info" url={`itineraries/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`itineraries/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`itineraries/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

ItinerariesList.propTypes = {
  items: PropTypes.array.isRequired
};

export default ItinerariesList;