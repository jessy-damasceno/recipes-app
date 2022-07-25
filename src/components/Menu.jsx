import { React, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { GiHotMeal, GiKnifeFork } from 'react-icons/gi';
import { FaCocktail } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import { TiHeart } from 'react-icons/ti';
import '../styles/Menu.css';

function Menu() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <button
        className="menu-button"
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => setActive(!active) }
      >
        {active ? <GiKnifeFork size={ 28 } /> : <MdMenu size={ 32 } />}
      </button>
      <nav>
        <ul className={ active ? 'header-nav active' : 'header-nav' }>
          <li className="header-nav-items">
            <GiHotMeal size={ 20 } className="meal-icon" />
            foods
          </li>
          <li className="header-nav-items">
            <FaCocktail size={ 20 } className="drink-icon" />
            drinks
          </li>
          <li className="header-nav-items">
            <AiOutlineFileDone size={ 20 } />
            done recipes
          </li>
          <li className="header-nav-items">
            <TiHeart size={ 20 } />
            favorite recipes
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
