export const loginAction = (email) => ({ type: 'LOGIN_ACTION', email });

const currencyRequest = () => ({ type: 'REQUEST_CURRENCY' });
const currencyReceive = (currencies) => ({ type: 'RECEIVE_CURRENCY', currencies });
const failCurrency = (error) => ({ type: 'FAILED_CURRENCY_REQUEST', error });

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(currencyRequest());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const { USDT, ...treatedData } = data;
    const currencies = Object.keys(treatedData);
    dispatch(currencyReceive(currencies));
  } catch (error) {
    dispatch(failCurrency(error));
  }
};

export const expensesAction = (expenses) => ({ type: 'EXPENSES_ACTION', expenses });
