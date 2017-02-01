import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function PromoCodeItem({
  item: {
    objectId, name, amount, event_type, location_type, createdAt
  }
}) {
  return (
    <div>
      <h1>PromoCode #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>{amount}</td>
        </tr>
        <tr>
          <td>Event Type</td>
          <td>
            {event_type ? <LinkTo url={`eventTypes/${event_type.objectId}`}>{event_type.name}</LinkTo> : null}
          </td>
        </tr>
        <tr>
          <td>Location Type</td>
          <td>
            {location_type ? <LinkTo url={`locationTypes/${location_type.objectId}`}>{location_type.name}</LinkTo> : null}
          </td>
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

PromoCodeItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default PromoCodeItem;