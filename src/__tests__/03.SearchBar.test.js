import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import DrinkProvider from '../context/DrinkProvider';
import FoodProvider from '../context/FoodProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FLETTER_RADIO = 'first-letter-search-radio';
const SEARCH_BUTTON = 'search-top-btn';
const CLICK_BUTTON_SEARCH = 'exec-search-btn';

describe('Teste do componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  afterEach(() => jest.clearAllMocks());

  it('Teste se os os elementos estão sendo renderizados corretamente', () => {
    renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <SearchBar />
        </DrinkProvider>
      </FoodProvider>,
    );

    screen.getByTestId(SEARCH_INPUT);
    screen.getByTestId(INGREDIENT_RADIO);
    screen.getByTestId(NAME_RADIO);
    screen.getByTestId(FLETTER_RADIO);
  });

  it('Testa se os inputs estão funcionando corretamente', () => {
    renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <SearchBar />
        </DrinkProvider>
      </FoodProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);
    const firstLetterRadio = screen.getByTestId(FLETTER_RADIO);

    expect(searchInput).toHaveValue('');
    userEvent.type(searchInput, 'banana');
    expect(searchInput).toHaveValue('banana');

    expect(ingredientRadio).toHaveProperty('checked', false);
    expect(nameSearchRadio).toHaveProperty('checked', false);
    expect(firstLetterRadio).toHaveProperty('checked', false);

    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toHaveProperty('checked', true);

    userEvent.click(nameSearchRadio);
    expect(nameSearchRadio).toHaveProperty('checked', true);

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toHaveProperty('checked', true);
  });

  it('Testa se, ao clicar no botão, o componente funciona corretamente', () => {
    // jest.spyOn(global, 'fetch');

    window.alert = jest.fn();

    renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <SearchBar />
        </DrinkProvider>
      </FoodProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId(FLETTER_RADIO);
    const button = screen.getByRole('button');

    userEvent.type(searchInput, 'aha');
    userEvent.click(firstLetterRadio);
    userEvent.click(button);

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('Testando se, ao clicar no botão, o componente funciona', () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({ json: async () => meals });

    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/foods');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);
    const searchButton = screen.getByTestId(CLICK_BUTTON_SEARCH);

    userEvent.type(searchInput, 'banana');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Testando se, ao clicar no botão, o componente funciona drinks', () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({ json: async () => drinks });

    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/drinks');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);
    const searchButton = screen.getByTestId(CLICK_BUTTON_SEARCH);

    userEvent.type(searchInput, 'Ice');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Ao clicar no botão, o componente funciona corretamente', () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({ json: async () => oneDrink });
    // global.fetch = jest.fn(fetch);

    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/drinks');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);
    const searchButton = screen.getByTestId(CLICK_BUTTON_SEARCH);

    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();

    waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
  });

  it('Testando se, ao clicar no botão, o componente funciona corretamente', () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({ json: async () => oneMeal });

    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    history.push('/foods');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);
    const searchButton = screen.getByTestId(CLICK_BUTTON_SEARCH);

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();

    waitFor(() => expect(history.location.pathname).toBe('/foods/52771'));
  });
});
