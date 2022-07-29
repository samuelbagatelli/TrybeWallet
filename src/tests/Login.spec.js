import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('It tests the Login component', () => {
  beforeEach(cleanup);
  it('Should show email and password input on the screen', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/senha:/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Should show the submit button on the screen', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByText(/entrar/i);

    expect(button).toBeInTheDocument();
  });

  it('Should have an email and password validation', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/entrar/i);

    userEvent.type(email, 'email_invalido');
    userEvent.type(password, 'senha');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/');
  });

  it('Should be able to type in the inputs, and login in the app', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/senha:/i);
    const button = screen.getByText(/entrar/i);

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
