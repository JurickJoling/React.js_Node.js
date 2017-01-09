import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function SpecialsList({ items }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <th>Incentive Name</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, incentive_name, createdAt }) => (
        <tr key={objectId}>
          <td>{incentive_name}</td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`specials/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`specials/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`specials/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

SpecialsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default SpecialsList;