import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testando a página de Perfil', () => {
  it('Testa se a página está montada corretamente', () => {
    renderWithRouter(<Profile />);

    screen.getByTestId('profile-email');
    screen.getByTestId('profile-done-btn');
    screen.getByTestId('profile-favorite-btn');
    screen.getByTestId('profile-logout-btn');
  });

  it('Teste do botão Done Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneRecipesButton = screen.getByTestId('profile-done-btn');

    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Teste do botão Favorite Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteRecipesButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Teste do botão Logout', () => {
    const { history } = renderWithRouter(<Profile />);

    localStorage.setItem('user', '{ "email": "email@mail.com" }');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');

    const logoutButton = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});
