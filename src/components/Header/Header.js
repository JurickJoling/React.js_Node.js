import React from 'react';
import cl from 'classnames';

import { LinkTo } from '../../helpers';
import { isActive } from '../../utils';

function Header({ isAuthenticated, logoutUser }) {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <LinkTo className="navbar-brand" href="#">Leaf Admin</LinkTo>
        </div>
        <div className="collapse navbar-collapse">
          {isAuthenticated ? (
            <ul className="nav navbar-nav">
              <li className={cl({ active: isActive('bundles') })}>
                <LinkTo href="bundles">Bundles</LinkTo>
              </li>
              <li className={cl({ active: isActive('plans') })}>
                <LinkTo href="plans">Plans</LinkTo>
              </li>
              <li className={cl({ active: isActive('events') })}>
                <LinkTo href="events">Events</LinkTo>
              </li>
              <li className={cl({ active: isActive('specials') })}>
                <LinkTo href="specials">Specials</LinkTo>
              </li>
              <li className={cl({ active: isActive('locations') })}>
                <LinkTo href="locations">Locations</LinkTo>
              </li>
              <li className={cl({ active: isActive('users') })}>
                <LinkTo href="users">Users</LinkTo>
              </li>
            </ul>
            ) : (
              <ul className="nav navbar-nav">
                <li className={cl({ active: isActive('signin') })}>
                  <LinkTo href="auth/signin">Sign In</LinkTo>
                </li>
                <li className={cl({ active: isActive('signup') })}>
                  <LinkTo href="auth/signup">Sign Up</LinkTo>
                </li>
              </ul>
            )}
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