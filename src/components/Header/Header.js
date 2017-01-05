import React from 'react';
import { Link } from 'react-router';
import cl from 'classnames';

import { isActive } from '../../utils';

function Header() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Leaf Admin</Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className={cl({ active: isActive('bundles') })}>
              <Link to="/bundles">Bundles</Link>
            </li>
            <li className={cl({ active: isActive('plans') })}>
              <Link to="/plans">Plans</Link>
            </li>
            <li className={cl({ active: isActive('users') })}>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;