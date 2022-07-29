import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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

Table.propTypes = {
  expensesState: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Table);
