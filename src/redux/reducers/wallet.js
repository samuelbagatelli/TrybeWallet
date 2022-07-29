export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const wallet = (state = INITIAL_STATE, action) => {
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
  case 'EXPENSES_ACTION':
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
    });
  default:
    return state;
  }
};
