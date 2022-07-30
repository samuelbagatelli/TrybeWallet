import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  handleClick = ({ target }) => {
    const { expensesState, expensesDeleteDispatch } = this.props;
    const parameter = Number(target.parentElement.id);

    const newExpensesState = expensesState.filter((element) => element.id !== parameter);

    expensesDeleteDispatch(newExpensesState);
  }

  render() {
    const { expensesState } = this.props;

    return (
      <>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expensesState.map(({
          id,
          value,
          currency,
          method,
          tag,
          description,
          exchangeRates,
        }) => {
          const { ask } = exchangeRates[currency];
          const toFixedAsk = Number(ask).toFixed(2);
          const cambio = Number(ask * value).toFixed(2);

          return (
            <tbody key={ id }>
              <tr>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ toFixedAsk }</td>
                <td>{ cambio }</td>
                <td>Real</td>
                <td id={ id }>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.handleClick }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          );
        }) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDeleteDispatch: (expenses) => dispatch(deleteExpenseAction(expenses)),
});

Table.propTypes = {
  expensesState: PropTypes.arrayOf.isRequired,
  expensesDeleteDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
