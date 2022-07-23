import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const FINISH_RECIPE = 'finish-recipe-btn';
const WHITE_HEART = 'http://localhost/whiteHeartIcon.svg';
const BLACK_HEART = 'http://localhost/blackHeartIcon.svg';

describe('Testando RecipeInProgress', () => {
  beforeEach(() => {
    window.document.execCommand = (copy) => (string) => console.log(copy, string);
    global.fetch = jest.fn(fetch);
  });

  afterEach(() => cleanup());

  it('Verifica o RecipeInProgress para foods', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods/52771/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const pageTitle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const img = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    const finishButton = screen.getByTestId(FINISH_RECIPE);

    expect(pageTitle).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(finishButton).toBeDisabled();

    const ingredientsList = screen.getAllByRole('checkbox');
    ingredientsList.forEach((e) => userEvent.click(e));

    expect(screen.getByTestId(FINISH_RECIPE)).not.toBeDisabled();

    userEvent.click(screen.getByRole('img', { name: /share icon/i }));

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await waitFor(() => {
      const copied = screen.queryByText(/link copied!/i);
      expect(copied).not.toBeInTheDocument();
    }, { timeout: 2100 });

    const favIcon = screen.getByRole('img', { name: /favorite icon/i });

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', BLACK_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(screen.getByTestId(FINISH_RECIPE));

    expect(history.location.pathname).toBe('/done-recipes');
    expect(screen.getByText(/arrabiata/i)).toBeInTheDocument();
  });

  it('Verifica o RecipeInProgress para drinks', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('drinks/178319/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const pageTitle = screen.getByRole('heading', { name: /aquamarine/i });
    const img = screen.getByRole('img', { name: /aquamarine/i });
    const finishButton = screen.getByTestId(FINISH_RECIPE);

    expect(pageTitle).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(finishButton).toBeDisabled();

    const ingredientsList = screen.getAllByRole('checkbox');
    ingredientsList.forEach((e) => userEvent.click(e));

    expect(screen.getByTestId(FINISH_RECIPE)).not.toBeDisabled();

    userEvent.click(screen.getByRole('img', { name: /share icon/i }));

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await waitFor(() => {
      const copied = screen.queryByText(/link copied!/i);
      expect(copied).not.toBeInTheDocument();
    }, { timeout: 2100 });

    const favIcon = screen.getByRole('img', { name: /favorite icon/i });

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', BLACK_HEART);

    userEvent.click(favIcon);

    expect(favIcon).toHaveProperty('src', WHITE_HEART);

    userEvent.click(screen.getByTestId(FINISH_RECIPE));

    expect(history.location.pathname).toBe('/done-recipes');
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });
});
