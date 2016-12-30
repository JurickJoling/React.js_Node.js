import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';

function BundlesList({ items }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <th>ObjectId</th>
        <th>Heading</th>
        <th>Priority</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, heading, priority }) => (
        <tr key={objectId}>
          <td>
            <LinkTo url={`bundles/${objectId}`}>{objectId}</LinkTo>
          </td>
          <td>{heading}</td>
          <td>{priority}</td>
          <td>
            <LinkTo className="btn btn-info" url={`bundles/${objectId}`}>Show</LinkTo>
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
  items: PropTypes.array.isRequired
};

export default BundlesList;