import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { currenciesDispatch } = this.props;

    currenciesDispatch();
  }

  render() {
    const { currenciesState } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
            >
              { currenciesState.map((element, idx) => (
                <option
                  value={ element }
                  key={ idx }
                >
                  { element }
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              data-testid="method-input"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de crédito</option>
              <option value="cartao-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            TAG:
            <select
              name="tag"
              data-testid="tag-input"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  currenciesDispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
