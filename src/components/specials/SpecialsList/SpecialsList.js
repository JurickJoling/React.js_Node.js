import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { capitalize, renderDate, renderDateTime } from '../../../utils';

function SpecialsList({ items }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <th>Incentive Name</th>
        <th>Category</th>
        <th>Incentive Type</th>
        <th>Attendee Minimum</th>
        <th>Item Name</th>
        <th>Redemption Options</th>
        <th>Promo Code</th>
        <th>Start time</th>
        <th>End time</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, incentive_name, category, incentive_type, attendee_min, item_name, redemption_options, promo_code, start_time, end_date, status, createdAt }) => (
        <tr key={objectId}>
          <td>{incentive_name}</td>
          <td>{category ? category.name : null}</td>
          <td>{incentive_type ? incentive_type.name : null}</td>
          <td>{attendee_min}</td>
          <td>{item_name}</td>
          <td>{redemption_options ? redemption_options.name : null}</td>
          <td>{promo_code}</td>
          <td>{(start_time || []).map(({ day, time }) => [capitalize(day), time].join(', ')).join('; ')}</td>
          <td></td>
          <td></td>
          <td>{renderDateTime(end_date)}</td>
          <td>{status ? status.name : null}</td>
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