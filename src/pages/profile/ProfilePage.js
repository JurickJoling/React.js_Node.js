import React from 'react';
import { connect } from 'react-redux';

import { LinkTo, renderFileUploadField, } from '../../helpers';

function ProfilePage({ currentUser: { first_name, last_name, image, email, personal_phone, job_title } }) {
  return (
    <div className="container">
      <div className="row m-b">
        <div className="col-md-6">
          <h3 className="settings-profile-edit-title">Settings</h3>
          <LinkTo className="btn btn-primary" url="profile/edit">Profile</LinkTo>
        </div>
        <div className="col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-hover table-striped table-responsive">
            <tbody>
              <tr>
                <td className="col-md-3">User Photo</td>
                <td>{image}</td>
              </tr>
              <tr>
                <td className="col-md-3">First Name</td>
                <td>{first_name}</td>
              </tr>
              <tr>
                <td className="col-md-3">Last Name</td>
                <td>{last_name}</td>
              </tr>
              <tr>
                <td className="col-md-3">Email Address</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td className="col-md-3">Personal Phone Number</td>
                <td>{personal_phone}</td>
              </tr>
              <tr>
                <td className="col-md-3">Job Title</td>
                <td>{job_title}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect(({
  auth: { currentUser }
}) => ({ currentUser }))(ProfilePage);
