import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { foodContext } from '../context/context';
import '../styles/Foods.css';

function Foods() {
  const { foods } = useContext(foodContext);
  const maxIndex = 12;

  return (
    <div>
      <Header title="Foods" search />
      <main>
        {foods?.length > 1 && (
          <section className="food-section">
            {foods.map(({ idMeal, strMeal, strMealThumb }, index) => {
              if (index < maxIndex) {
                return (
                  <div
                    key={ idMeal }
                    data-testid={ `${index}-recipe-card` }
                    className="card-div"
                  >
                    <p
                      data-testid={ `${index}-card-name` }
                      className="food-name"
                    >
                      {strMeal}
                    </p>
                    <img
                      src={ strMealThumb }
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
      <Footer />
    </div>
  );
}

export default Foods;
