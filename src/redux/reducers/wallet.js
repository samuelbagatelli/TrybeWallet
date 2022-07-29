const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return ({
      ...state,
    });
  case 'RECEIVE_CURRENCY':
    return ({
      ...state,
      currencies: [...state.currencies, ...action.currencies],
    });
  case 'FAILED_CURRENCY_REQUEST':
    return ({
      ...state,
      currencies: action.error,
    });
  case 'EXPENSES_ACTION':
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
    });
  default:
    return state;
  }
};

export default wallet;
