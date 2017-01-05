import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function UsersList({ items }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, first_name, last_name, user_email, createdAt }) => (
        <tr key={objectId}>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{user_email}</td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`users/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`users/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`users/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

UsersList.propTypes = {
  items: PropTypes.array.isRequired
};

export default UsersList;