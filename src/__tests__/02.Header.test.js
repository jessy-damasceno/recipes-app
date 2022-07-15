import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando o componente Header', () => {
  it('Verifica se a página funciona corretamente', () => {
    renderWithRouter(<Header search />);

    const profileImg = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');
    const inputSearch = screen.queryByTestId('search-input');
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(profileImg).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(inputSearch).not.toBeInTheDocument();

    userEvent.click(searchBtn);

    const inputSearch2 = screen.queryByTestId('search-input');
    expect(inputSearch2).toBeInTheDocument();

    userEvent.type(inputSearch2, 'Buscando');
    expect(inputSearch2).toHaveValue('Buscando');
  });

  it('Verificando o componente sem a funcionalidade de Search', () => {
    renderWithRouter(<Header />);
    const searchBtn = screen.queryByTestId('search-top-btn');

    expect(searchBtn).not.toBeInTheDocument();
  });
});
