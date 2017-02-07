import React, { PropTypes } from 'react';

import { LinkTo } from '../../helpers';

function BillingTabs() {
  return (
    <div className="row m-b">
      <div className="col-md-12">
        <div className="btn-group">
          <LinkTo button color="default" url="billing">
            Payment Methods
          </LinkTo>
          <LinkTo button color="default" url="billing/pending">
            Pending Payments
          </LinkTo>
          <LinkTo button color="default" url="billing/history">
            Payments History
          </LinkTo>
        </div>
      </div>
    </div>
  );
}

BillingTabs.defaultProps = {};

BillingTabs.propTypes = {};

export default BillingTabs;
