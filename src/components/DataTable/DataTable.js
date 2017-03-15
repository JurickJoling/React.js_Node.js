import take from 'lodash/take';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../../actions/DataActions';

class DataTable extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <div className="square">
          <div className="content">
            <div className="table">
              <span className="table-cell text">Downloads</span>
              <div className="table-cell numbers">{item.installations_count}</div>
            </div>
          </div>
        </div>

        <div className="square">
          <div className="content">
            <div className="table">
              <span className="table-cell text">Users</span>
              <div className="table-cell numbers">{item.users_count}</div>
            </div>
          </div>
        </div>

        <table className="square">
          <tbody>
          <tr className="table">
            <th className="table-cell text">Tags</th>
          </tr>
          <tr>
            <td>
              <table className="table table-bordered table-hover table-striped table-responsive">
                <tbody className="cell-ages">
                {take(item.users_ages || [], 10).map(({ age, per_cent }, index) => (
                  <tr key={index}>
                    <td>{age}</td>
                    <td>{per_cent.toFixed(2)}%</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>

        <table className="square">
          <tbody>
          <tr className="table">
            <th className="table-cell text">Ages</th>
          </tr>
          <tr>
            <td>
              <table className="table table-bordered table-hover table-striped table-responsive">
                <tbody className="cell-ages">
                {take(item.users_ages || [], 10).map(({ age, per_cent }, index) => (
                  <tr key={index}>
                    <td>{age}</td>
                    <td>{per_cent.toFixed(2)}%</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>

        <div className="square">
          <div className="content">
            <div className="table">
              <span className="table-cell text">Total Invites Sent</span>
              <div className="table-cell numbers">{item.event_notifications_count}</div>
            </div>
          </div>
        </div>

        <div className="square">
          <div className="content">
            <div className="table">
              <span className="table-cell text">Total Invites Accepted</span>
              <div className="table-cell numbers">{item.accepted_event_notifications_count}</div>
            </div>
          </div>
        </div>

        <table className="square">
          <tbody>
            <tr className="table">
              <th className="table-cell text">Cities</th>
            </tr>
            <tr>
              <td>
                <table className="table table-bordered table-hover table-striped table-responsive">
                  <tbody className="cell-ages">
                    {take(item.users_ages || [], 10).map(({ age, per_cent }, index) => (
                      <tr key={index}>
                        <td>{age}</td>
                        <td>{per_cent.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="square">
          <div className="content">
            <div className="table">

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(({ data: { item } }) => ({ item }), { fetchData })(DataTable);
