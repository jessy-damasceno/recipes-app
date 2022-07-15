import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search = false }) {
  return (
    <header>
      <div>
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        />
      </div>
      {search
      && (
        <div>
          <img
            type="image"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search"
          />
        </div>
      )}
      <div>
        <h1
          className="title"
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
