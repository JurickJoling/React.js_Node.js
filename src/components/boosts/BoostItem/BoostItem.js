import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function BoostItem({
  item: {
    objectId, dates, start_time, end_time, max_budget, createdAt
  }
}) {
  return (
    <div>
      <h1>Boost #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Dates</td>
          <td>
            {size(dates || []) > 0 ? (
                <table className="table table-bordered table-hover table-striped table-responsive">
                  <tbody>
                  {dates.map(({ date, name, start, end }, index) => (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{name}</td>
                      <td>{start}</td>
                      <td>{end}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : null}
          </td>
        </tr>
        <tr>
          <td>Start Time</td>
          <td>{renderDateTime(start_time)}</td>
        </tr>
        <tr>
          <td>End Time</td>
          <td>{renderDateTime(end_time)}</td>
        </tr>
        <tr>
          <td>Max Budget</td>
          <td>{max_budget}</td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

BoostItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default BoostItem;