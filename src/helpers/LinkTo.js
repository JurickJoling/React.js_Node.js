import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cl from 'classnames';

function LinkTo({ className, url, children }) {
  return (
    <Link className={cl(className)} to={`/${url}`}>
      {children}
    </Link>
  );
}

LinkTo.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default LinkTo;
