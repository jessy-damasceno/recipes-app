import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <div className="avatar">

        <button
          type="button"
          src={ profileButton }
          data-testid="profile-top-btn"
          onClick={ onClickButton }
        >
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </button>
      </div>
      <div>
        <button
          data-testid="search-top-btn"
          type="button"
          src={ searchButton }
        >
          <input
            type="image"
            data-testid="search-top-btn"
            src={ search }
            alt="Search"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
