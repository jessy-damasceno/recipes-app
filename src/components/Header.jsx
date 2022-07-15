import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, search = false }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        />
      </Link>
      <div>
        <h1
          className="title"
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
      {search && (
        <div>
          {isVisible && <SearchBar />}
          <button
            type="button"
            onClick={ () => setIsVisible(!isVisible) }
          >
            <img
              type="image"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Search"
            />
          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
