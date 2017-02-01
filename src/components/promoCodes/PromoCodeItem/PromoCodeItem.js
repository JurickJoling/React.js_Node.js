import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function PromoCodeItem({
  item: {
    objectId, name, createdAt
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