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
            <span className="table-cell text">Users</span>
            <div className="table-cell numbers">{item.users_count}</div>
          </div>
        </div>
      </div>

       <div className="square">
         <div className="content">
       <div className="table">
         <span className="table-cell text">Users Added This Month</span>
         <div className="table-cell numbers">{item.new_users_count}</div>
       </div>
         </div>
       </div>

     <div className="square">
       <div className="content">
       <div className="table">
         <span className="table-cell text">Available Plans</span>
         <div className="table-cell numbers">{item.available_itineraries}</div>
       </div>
       </div>
     </div>

       <div className="square">
         <div className="content">
       <div className="table">
         <span className="table-cell text">Plans Expiring In The Next 7 Days</span>
         <div className="table-cell numbers">{item.plans_expiring_count}</div>
       </div>
         </div>
       </div>

       <table className="square">
          <tr className="table">
            <th className="table-cell text">Ages</th>
          </tr>
         <tr>
            <tr>
              <table className="table table-bordered table-hover table-striped table-responsive">
                <tr className="cell-ages">
                  {take(item.users_ages || [], 10).map(({ age, per_cent }, index) => (
                    <tr key={index}>
                      <td>{age}</td>
                      <td>{per_cent.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tr>
              </table>
            </tr>
          </tr>
       </table>
    </div>
    );
  }
};

export default connect(({ data: { item } }) => ({ item }), { fetchData })(DataTable);
