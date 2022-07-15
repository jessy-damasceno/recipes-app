import React, { useContext } from 'react';
import Header from '../components/Header';
import { drinkContext } from '../context/context';
import '../styles/Foods.css';

function Drinks() {
  const { drinks } = useContext(drinkContext);
  const maxIndex = 12;

  return (
    <div>
      <Header title="Drinks" search />
      <main>
        {drinks.length > 1 && (
          <section className="food-section">
            {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => {
              if (index < maxIndex) {
                return (
                  <div
                    key={ idDrink }
                    data-testid={ `${index}-recipe-card` }
                    className="card-div"
                  >
                    <p
                      data-testid={ `${index}-card-name` }
                      className="food-name"
                    >
                      {strDrink}
                    </p>
                    <img
                      src={ strDrinkThumb }
                      alt="Dish icon"
                      data-testid={ `${index}-card-img` }
                      className="food-image"
                    />
                  </div>
                );
              }
              return '';
            })}
          </section>
        )}
      </main>
    </div>
  );
}

export default Drinks;
