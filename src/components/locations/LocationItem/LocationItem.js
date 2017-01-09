import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function LocationItem({
  item: {
    objectId, name, address, phone, category, neighborhood, metro_city, reservations, latitude, longitude, rating,
    groups, outdoor, type, verified, createdAt
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
          <td>Category</td>
          <td>{category}</td>
        </tr>
        <tr>
          <td>Neighborhood</td>
          <td>{neighborhood}</td>
        </tr>
        <tr>
          <td>Metro City</td>
          <td>{metro_city}</td>
        </tr>
        <tr>
          <td>Takes Reservations</td>
          <td>{reservations}</td>
        </tr>
        <tr>
          <td>Latitude</td>
          <td>{latitude}</td>
        </tr>
        <tr>
          <td>Longitude</td>
          <td>{longitude}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>{rating}</td>
        </tr>
        <tr>
          <td>Good for Groups</td>
          <td>{groups}</td>
        </tr>
        <tr>
          <td>Outdoor Seating</td>
          <td>{outdoor}</td>
        </tr>
        <tr>
          <td>Location Type</td>
          <td>{type}</td>
        </tr>
        <tr>
          <td>Verified?</td>
          <td>{verified}</td>
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