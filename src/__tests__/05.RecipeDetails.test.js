import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FoodProvider from '../context/FoodProvider';
import DrinkProvider from '../context/DrinkProvider';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const WHITE_HEART = 'http://localhost/whiteHeartIcon.svg';
const BLACK_HEART = 'http://localhost/blackHeartIcon.svg';

describe('Testando a página RecipeDetails', () => {
  beforeEach(() => {
    window.document.execCommand = (copy) => (string) => console.log(copy, string);
    global.fetch = jest.fn(fetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testando a funcionalidade do componente FoodDetails', async () => {
    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/foods/52771');

    const spicy = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    const shareIcon = screen.getByRole('img', { name: /share icon/i });
    const favIcon = screen.getByRole('img', { name: /favorite icon/i });
    const start = screen.getByTestId('start-recipe-btn');
    const ingredients = screen.getAllByTestId(/-ingredient-name-and-measure/);

    [spicy, shareIcon, favIcon, start].forEach((e) => expect(e).toBeInTheDocument());

    expect(ingredients).toHaveLength(+'8');

    expect(ingredients[0]).toHaveTextContent(/penne rigate: 1 pound/i);
    expect(ingredients[1]).toHaveTextContent(/olive oil: 1\/4 cup/i);
    expect(ingredients[2]).toHaveTextContent(/garlic: 3 cloves/i);

    expect(ingredients[0]).not.toHaveTextContent(/^penne rigate$/i);
    expect(ingredients[1]).not.toHaveTextContent(/^olive oil$/i);
    expect(ingredients[2]).not.toHaveTextContent(/^garlic$/i);

    expect(start).toHaveTextContent('Start Recipe');

    userEvent.click(shareIcon);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await waitFor(() => {
      const copied = screen.queryByText(/link copied!/i);
      expect(copied).not.toBeInTheDocument();
    }, { timeout: 2100 });

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', BLACK_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(start);
    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });

  it('Testando a funcionalidade do componente DrinkDetails', async () => {
    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/drinks/178319');

    const aquamarine = await screen.findByRole('heading', { name: /aquamarine/i });
    const shareIcon = screen.getByRole('img', { name: /share icon/i });
    const favIcon = screen.getByRole('img', { name: /favorite icon/i });
    const start = screen.getByTestId('start-recipe-btn');
    const ingredients = screen.getAllByTestId(/-ingredient-name-and-measure/);

    [aquamarine, shareIcon, favIcon, start].forEach((e) => expect(e).toBeInTheDocument());

    expect(ingredients).toHaveLength(+'3');

    expect(ingredients[0]).toHaveTextContent(/Hpnotiq : 2 oz/i);
    expect(ingredients[1]).toHaveTextContent(/Pineapple Juice : 1 oz/i);
    expect(ingredients[2]).toHaveTextContent(/Banana Liqueur : 1 oz/i);

    expect(ingredients[0]).not.toHaveTextContent(/^Hpnotiq$/i);
    expect(ingredients[1]).not.toHaveTextContent(/^Pineapple Juice$/i);
    expect(ingredients[2]).not.toHaveTextContent(/^Banana Liqueur : $/i);

    expect(start).toHaveTextContent('Start Recipe');

    userEvent.click(shareIcon);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await waitFor(() => {
      const copied = screen.queryByText(/link copied!/i);
      expect(copied).not.toBeInTheDocument();
    }, { timeout: 2100 });

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', BLACK_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(start);

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

    waitFor(() => userEvent.click(screen.getByTestId('0-ingredient-step')));
  });
});
