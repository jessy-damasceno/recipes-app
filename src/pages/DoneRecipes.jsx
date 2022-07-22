import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const doneRecipes = getDoneRecipes();
    setRecipes(doneRecipes);
  }, []);

  const shareFunction = (type, id) => {
    setIsClicked(true);
    clipboardCopy(`${window.location.origin}/${type}s/${id}`);
    setTimeout(() => {
      setIsClicked(false);
    }, +'2000');
  };

  const handleClick = (type) => {
    const newRecipes = getDoneRecipes();
    setRecipes(newRecipes.filter((recipe) => recipe.type === type));
  };

  return (
    <main>
      <Header title="Done Recipes" />
      <section>
        <div className="done-recipes-filters">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setRecipes(getDoneRecipes()) }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => handleClick('food') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleClick('drink') }
          >
            Drinks
          </button>
        </div>
        {isClicked && <span>Link copied!</span>}
        <div>
          {Boolean(recipes?.length) && recipes.map((e, index) => (
            <div key={ e.id }>
              <Link to={ `/${e.type}s/${e.id}` }>
                <img
                  src={ e.image }
                  alt={ e.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="done-recipes-img"
                />
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  {e.name}
                </h3>
                <h4
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {e.type === 'food'
                    ? `${e.nationality} - ${e.category}`
                    : e.alcoholicOrNot}
                </h4>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {e.doneDate}
                </p>
                {e.tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
              </Link>
              <button
                type="button"
                onClick={ () => shareFunction(e.type, e.id) }
              >
                <img
                  src={ shareIcon }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DoneRecipes;
