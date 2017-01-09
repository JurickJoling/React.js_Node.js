import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function EventItem({
  item: {
    objectId, description, createdAt
  }
}) {
  return (
    <div>
      <h1>Event #{objectId}</h1>
      <table className="table table-bordered table-hover">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{description}</td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

EventItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default EventItem;