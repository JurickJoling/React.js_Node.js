import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function LocationItem({
  item: {
    objectId, name, address, phone, createdAt
  }
}) {
  return (
    <div>
      <h1>Location #{objectId}</h1>
      <table className="table table-bordered table-hover">
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
          <td>Address</td>
          <td>{address}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{phone}</td>
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

LocationItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default LocationItem;