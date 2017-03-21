import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { LinkTo } from '../../helpers';
import { isActive } from '../../utils';

function Header({ isAuthenticated, currentUser, logoutUser }) {
  return (
    <Navbar fluid collapseOnSelect className="navbar-admin">
      <Navbar.Header>
        <Navbar.Brand>
          <LinkTo className="leaf-brand" href="#">Test Ilija</LinkTo>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {isAuthenticated ? (
            <Nav>
              {currentUser.is_admin ? (
                  <NavItem active={isActive('plans')} href="/plans" className="plans-nav" onSelect={() => browserHistory.push('/plans')}>
                    Plans
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem  active={isActive('events')} href="/events" className="events-nav" onSelect={() => browserHistory.push('/events')}>
                    Events
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('eventTypes')} href="/eventTypes" className="eventtypes-nav" onSelect={() => browserHistory.push('/eventTypes')}>
                    Event Types
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('specials')} href="/specials" className="specials-nav" onSelect={() => browserHistory.push('/specials')}>
                    Specials
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('boosts')} href="/boosts" className="boosts-nav" onSelect={() => browserHistory.push('/boosts')}>
                    Boosts
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('locations')} href="/locations" className="locations-nav" onSelect={() => browserHistory.push('/locations')}>
                    Locations
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('locationTypes')} href="/locationTypes" className="locationtypes-nav" onSelect={() => browserHistory.push('/locationTypes')}>
                    Location Types
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('promoCodes')} href="/promoCodes" className="promo-nav" onSelect={() => browserHistory.push('/promoCodes')}>
                    PromoCodes
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('users')} href="/users" className="users-nav" onSelect={() => browserHistory.push('/users')}>
                    Users
                  </NavItem>
                ) : null}
            </Nav>
          ) : (
            <Nav>
              <NavItem active={isActive('signin')} href="/auth/signin" className="signin-nav" onSelect={() => browserHistory.push('/auth/signin')}>Sign In</NavItem>
              <NavItem active={isActive('signup')} href="/auth/signup" className="signup-nav" onSelect={() => browserHistory.push('/auth/signup')}>Sign Up</NavItem>
            </Nav>
          )}
        {isAuthenticated ? (
            <Nav pullRight>
              {currentUser.is_partner ? (
                  <NavItem active={isActive('business')} href="/business" className="business-nav" onSelect={() => browserHistory.push('/business')}>
                    Business Profile
                  </NavItem>
                ) : null}
              {currentUser.is_partner ? (
                  <NavItem active={isActive('billing')} href="/billing" className="billing-nav" onSelect={() => browserHistory.push('/billing')}>
                    Billing
                  </NavItem>
                ) : null}
              <NavItem active={isActive('profile')} href="/profile" className="profile-nav" onSelect={() => browserHistory.push('/profile')}>
                Settings
              </NavItem>
              <NavItem href="#" className="logout-nav" onSelect={() => logoutUser()}>
                Sign Out
              </NavItem>
            </Nav>
          ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;