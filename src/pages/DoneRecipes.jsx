import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <main>
      <Header title="Done Recipes" />
      <section>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        {/* <h3 data-testid={ `${index}-horizontal-name` }> </h3>
        <h3 data-testid={ `${index}-horizontal-top-text` }> </h3>
        <h3 data-testid={ `${index}-horizontal-done-date` }> </h3>
        <img
          src={ e }
          alt={ e }
          data-testid={ `${index}-horizontal-image` }
        />
        <h3 data-testid={ `${index}-${tags}-horizontal-tag` }> </h3>
        <img
          src={ e }
          alt={ e }
          data-testid={ `${index}-horizontal-share-btn` }
        /> */}
      </section>
    </main>
  );
}

export default DoneRecipes;
