import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { renderDateTime } from '../../../utils';

function BundlesList({ bundles }) {
  return (
    <div>
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
              <Link to={`/bundles/${objectId}`}>{objectId}</Link>
            </td>
            <td>{heading}</td>
            <td>{priority}</td>
            <td>{renderDateTime(createdAt)}</td>
            <td>{renderDateTime(updatedAt)}</td>
            <td>
              <Link className="btn btn-success" to={`/bundles/${objectId}`}>Show</Link>
            </td>
            <td>
              <Link className="btn btn-primary" to={`/bundles/${objectId}/edit`}>Edit</Link>
            </td>
            <td>
              <Link className="btn btn-danger" to={`/bundles/${objectId}/delete`}>Delete</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

BundlesList.propTypes = {
  bundles: PropTypes.array.isRequired
};

export default BundlesList;