import React from 'react';
import { Link } from 'react-router';
import cl from 'classnames';

import { LinkTo } from '../../helpers';
import { isActive } from '../../utils';

function Header({ isAuthenticated, logoutUser }) {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Leaf Admin</Link>
        </div>
        <div className="collapse navbar-collapse">
          {isAuthenticated ? (
            <ul className="nav navbar-nav">
              <li className={cl({ active: isActive('bundles') })}>
                <Link to="/bundles">Bundles</Link>
              </li>
              <li className={cl({ active: isActive('plans') })}>
                <Link to="/plans">Plans</Link>
              </li>
              <li className={cl({ active: isActive('events') })}>
                <Link to="/events">Events</Link>
              </li>
              <li className={cl({ active: isActive('specials') })}>
                <Link to="/specials">Specials</Link>
              </li>
              <li className={cl({ active: isActive('locations') })}>
                <Link to="/locations">Locations</Link>
              </li>
              <li className={cl({ active: isActive('users') })}>
                <Link to="/users">Users</Link>
              </li>
            </ul>
            ) : null}
          {isAuthenticated ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <LinkTo pureLink href="#" onClick={() => logoutUser()}>Sign Out</LinkTo>
                </li>
              </ul>            
            ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Header;