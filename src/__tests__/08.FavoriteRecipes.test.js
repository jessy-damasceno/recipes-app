import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodProvider from '../context/FoodProvider';
import DrinkProvider from '../context/DrinkProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from '../helpers/renderWithRouter';

const FAVORITE_RECIPES_MOCK = [
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Shot',
    id: '15288',
    image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    name: '252',
    nationality: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'food',
  },
  {
    alcoholicOrNot: '',
    category: 'Vegetarian',
    id: '53026',
    image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    name: 'Tamiya',
    nationality: 'Egyptian',
    type: 'food',
  },
];

describe('Testando a página de favoritos', () => {
  beforeEach(() => {
    window.document.execCommand = (copy) => (string) => console.log(copy, string);
    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem');
    jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
  });

  afterEach(() => {
    // jest.clearAllMocks();
    cleanup();
  });

  it('Testando se os componentes são renderizados corretamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(FAVORITE_RECIPES_MOCK));

    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <FavoriteRecipes />
        </DrinkProvider>
      </FoodProvider>,
    );

    expect(localStorage.getItem).toHaveBeenCalled();

    const pageTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    const noFilter = screen.getByRole('button', { name: /all/i });
    const foodFilter = screen.getByRole('button', { name: /food/i });
    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    const shareIcon = screen.getAllByRole('img', { name: /share icon/i })[0];
    const favIcon = screen.getAllByRole('img', { name: /favorite icon/i })[0];
    const arr = [pageTitle, profileIcon, noFilter, foodFilter, drinkFilter];

    arr.forEach((e) => expect(e).toBeInTheDocument());

    const recipeOne = screen.getByRole('heading', { name: /252/i });
    const recipeTwo = screen.getByRole('heading', { name: /corba/i });
    const recipeThree = screen.getByRole('heading', { name: /tamiya/i });

    [recipeOne, recipeTwo, recipeThree].forEach((e) => expect(e).toBeInTheDocument());

    userEvent.click(foodFilter);

    expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /252/i })).not.toBeInTheDocument();

    userEvent.click(drinkFilter);

    expect(screen.queryByRole('heading', { name: /corba/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /252/i })).toBeInTheDocument();

    userEvent.click(noFilter);

    expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /252/i })).toBeInTheDocument();

    userEvent.click(shareIcon);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await waitFor(() => {
      const copied = screen.queryByText(/link copied!/i);
      expect(copied).not.toBeInTheDocument();
    }, { timeout: 2100 });

    userEvent.click(favIcon);

    expect(screen.queryByRole('heading', { name: /252/i })).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('heading', { name: /corba/i }));

    expect(history.location.pathname).toBe('/foods/52977');
  });
});
