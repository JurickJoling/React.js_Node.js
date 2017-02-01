import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function PromoCodesList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>Name</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, name, createdAt }) => (
        <tr key={objectId}>
          <td>{name}</td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`promoCodes/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`promoCodes/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`promoCodes/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

PromoCodesList.propTypes = {
  items: PropTypes.array.isRequired
};

export default PromoCodesList;