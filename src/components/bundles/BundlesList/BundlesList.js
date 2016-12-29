import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function BundlesList({ bundles }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <th>ObjectId</th>
        <th>Heading</th>
        <th>Priority</th>
        <th>Created</th>
        <th>Updated</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {bundles.map(({ objectId, heading, priority, createdAt, updatedAt }) => (
        <tr key={objectId}>
          <td>
            <LinkTo url={`bundles/${objectId}`}>{objectId}</LinkTo>
          </td>
          <td>{heading}</td>
          <td>{priority}</td>
          <td>{renderDateTime(createdAt)}</td>
          <td>{renderDateTime(updatedAt)}</td>
          <td>
            <LinkTo className="btn btn-success" url={`bundles/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`bundles/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`bundles/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

BundlesList.propTypes = {
  bundles: PropTypes.array.isRequired
};

export default BundlesList;