import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function SpecialItem({
  item: {
    objectId, incentive_name, createdAt
  }
}) {
  return (
    <div>
      <h1>Special #{objectId}</h1>
      <table className="table table-bordered table-hover">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Incentive Name</td>
          <td>{incentive_name}</td>
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

SpecialItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default SpecialItem;