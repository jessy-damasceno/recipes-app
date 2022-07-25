import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Menu from './Menu';
import '../styles/Header.css';

function Header({ title, search }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <header className="header">
      <div>
        {/* <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        /> */}
        <Menu />
      </div>
      <div>
        <h1
          className={ isVisible ? 'header-title margin-fix' : 'header-title' }
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
      {search && (
        <div>
          <button
            type="button"
            data-testid="search-top-btn"
            className="search-button"
            onClick={ () => setIsVisible(!isVisible) }
          >
            {/* <img
              type="image"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Search"
            /> */}
            <BsSearch size={ 26 } />
          </button>
        </div>
      )}
      {isVisible && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
};

Header.defaultProps = {
  title: 'No title',
  search: false,
};

export default Header;
