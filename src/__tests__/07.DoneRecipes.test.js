import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodProvider from '../context/FoodProvider';
import DrinkProvider from '../context/DrinkProvider';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../helpers/renderWithRouter';

const doneData = '22/07/2022';

const DONE_RECIPES_MOCK = [
  {
    id: '52977',
    type: 'food',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: doneData,
    tags: [
      'Soup',
    ],
  },
  {
    id: '53026',
    type: 'food',
    nationality: 'Egyptian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Tamiya',
    image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    doneDate: doneData,
    tags: [],
  },
  {
    id: '17225',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Ace',
    image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
    doneDate: doneData,
    tags: [],
  },
];

describe('Testando a página DoneRecipes', () => {
  beforeEach(() => {
    window.document.execCommand = (copy) => (string) => console.log(copy, string);
    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem');
    jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPES_MOCK));
  });

  afterEach(() => cleanup());

  it('Verifica se os elementos são renderizados corretamente', async () => {
    const { history } = renderWithRouter(
      <DrinkProvider>
        <FoodProvider>
          <DoneRecipes />
        </FoodProvider>
      </DrinkProvider>,
    );

    expect(localStorage.getItem).toHaveBeenCalled();

    const pageTitle = screen.getByRole('heading', { name: /done recipes/i });
    const noFilter = screen.getByRole('button', { name: /all/i });
    const foodFilter = screen.getByRole('button', { name: /food/i });
    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    const shareIcon = screen.getAllByRole('img', { name: /share icon/i })[0];
    const arr = [pageTitle, noFilter, foodFilter, drinkFilter, shareIcon];
    const maxShare = 3;

    arr.forEach((e) => expect(e).toBeInTheDocument());

    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.getByText(/tamiya/i)).toBeInTheDocument();
    expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /share icon/i })).toHaveLength(maxShare);

    userEvent.click(foodFilter);

    // expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /share icon/i })).toHaveLength(2);

    userEvent.click(drinkFilter);

    expect(screen.getAllByRole('img', { name: /share icon/i })).toHaveLength(1);

    userEvent.click(noFilter);

    expect(screen.getAllByRole('img', { name: /share icon/i })).toHaveLength(maxShare);

    userEvent.click(screen.getAllByRole('img', { name: /share icon/i })[0]);

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await waitFor(() => {
      const copied = screen.queryByText(/link copied!/i);
      expect(copied).not.toBeInTheDocument();
    }, { timeout: 2100 });

    userEvent.click(screen.getByText(/corba/i));

    expect(history.location.pathname).toBe('/foods/52977');
  });
});
