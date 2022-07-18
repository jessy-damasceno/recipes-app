import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import DrinkProvider from '../context/DrinkProvider';
import FoodProvider from '../context/FoodProvider';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste da tela de login', () => {
  it('Verifica se a página funciona corretamente', () => {
    const { history } = renderWithRouter(
      <FoodProvider>
        <DrinkProvider>
          <App />
        </DrinkProvider>
      </FoodProvider>,
    );

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    expect(inputEmail).toHaveValue('teste@teste.com');
    expect(inputPassword).toHaveValue('1234567');

    expect(loginButton).not.toBeDisabled();

    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/foods');
  });
});
