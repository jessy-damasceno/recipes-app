import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FoodProvider from '../context/FoodProvider';
import DrinkProvider from '../context/DrinkProvider';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Testando a página RecipeDetails', () => {
  beforeEach(() => {
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

    [spicy, shareIcon, favIcon, start].forEach((e) => expect(e).toBeInTheDocument());

    // userEvent.click(shareIcon);
    // expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

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

    [aquamarine, shareIcon, favIcon, start].forEach((e) => expect(e).toBeInTheDocument());

    // userEvent.click(shareIcon);
    // expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    userEvent.click(start);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
