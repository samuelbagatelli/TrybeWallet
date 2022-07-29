import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('It tests the Wallet component', () => {
  beforeEach(cleanup);
  it('Should be able to access the wallett page', () => {
    renderWithRouterAndRedux(<Wallet />);

    const email = screen.getByTestId('email-field');

    expect(email).toBeInTheDocument();
  });

  it('Should show the total value of expenses', () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenses = screen.getByTestId('total-field');

    expect(expenses.innerHTML).toEqual('0');
  });

  it('Should show the total value of expenses after inserting an expense', () => {
    const expensesObj = {
      id: 0,
      value: 1,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      description: '',
      exchangeRates: mockData,
    };

    const walletObj = {
      currencies: Object.keys(mockData),
      expenses: [expensesObj],
    };
    
    renderWithRouterAndRedux(<Wallet />, { initialState: { wallet: walletObj } });

    const expenses = screen.getByTestId('total-field');

    expect(expenses.innerHTML).toEqual('4.75');
  });

  it('Tests the redux global state', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByText(/adicionar despesa/i);

    fetchMock.getOnce('https://economia.awesomeapi.com.br/json/all', {
      body: mockData,
    });

    userEvent.click(button);
    await waitFor(() => expect(fetchMock.called()).toBeTruthy());
  });

  
});