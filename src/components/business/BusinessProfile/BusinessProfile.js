import React from 'react';

import { LinkTo } from '../../../helpers';

function BusinessProfile({ item, item: { name } }) {
  console.log('item', item);
  return (
    <div className="container">
      <div className="row m-b">
        <div className="col-md-6">
          <LinkTo className="btn btn-primary" url="business/edit">Edit Business Profile</LinkTo>
        </div>
        <div className="col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-hover table-striped table-responsive">
            <tbody>
            <tr>
              <td>Business Name</td>
              <td>{name}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BusinessProfile;
