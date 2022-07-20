import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodProvider from '../context/FoodProvider';
import DrinkProvider from '../context/DrinkProvider';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Testando o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testando a funcionalidade do Recipes na página /foods', async () => {
    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/foods');
    expect(global.fetch).toHaveBeenCalled();

    const cards = await screen.findAllByRole('img', { name: /dish icon/i });
    const breakfastCategory = await screen.findByRole('button', { name: /breakfast/i });
    const allCategories = screen.getByRole('button', { name: /all/i });
    const allCards = 12;
    const maxBreakfast = 7;

    expect(cards).toHaveLength(allCards);
    expect(breakfastCategory).toBeInTheDocument();
    expect(allCategories).toBeInTheDocument();

    userEvent.click(breakfastCategory);

    waitFor(async () => {
      const breakfastCards = await screen.findAllByRole('img', { name: /dish icon/i });
      expect(breakfastCards).toHaveLength(maxBreakfast);
    });

    userEvent.click(allCategories);

    waitFor(async () => {
      const allCategories2 = await screen.findAllByRole('img', { name: /dish icon/i });
      expect(allCategories2).toHaveLength(allCards);
    });
  });

  it('Testando a funcionalidade do Recipes na página /drinks', async () => {
    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/drinks');
    expect(global.fetch).toHaveBeenCalled();

    const cards = await screen.findAllByRole('img', { name: /dish icon/i });
    const cocoaCategory = await screen.findByRole('button', { name: /cocoa/i });
    const allCategories = screen.getByRole('button', { name: /all/i });
    const allCards = 12;
    const maxCocoaCards = 9;

    expect(cards).toHaveLength(allCards);
    expect(cocoaCategory).toBeInTheDocument();
    expect(allCategories).toBeInTheDocument();

    userEvent.click(cocoaCategory);

    waitFor(async () => {
      const cocoaCards = await screen.findAllByRole('img', { name: /dish icon/i });
      expect(cocoaCards).toHaveLength(maxCocoaCards);
    });

    userEvent.click(allCategories);

    waitFor(async () => {
      const allCategories2 = await screen.findAllByRole('img', { name: /dish icon/i });
      expect(allCategories2).toHaveLength(allCards);
    });
  });
});
