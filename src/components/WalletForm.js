import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesAction, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor({ expensesState }) {
    super({ expensesState });

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      description: '',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    const { currenciesDispatch } = this.props;

    currenciesDispatch();
  }

  handleSubmit = (event) => event.preventDefault();

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchangeRates = await response.json();
      this.setState({
        exchangeRates,
      });
    } catch (error) {
      // throw new Error(error);
    }
  }

  onButtonClick = async () => {
    const { expensesDispatch } = this.props;

    await this.fetchExchangeRates();
    expensesDispatch(this.state);

    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }), this.setState({
      value: '',
      description: '',
    }));
  }

  render() {
    const { currenciesState } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
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
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            TAG:
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <button
            type="submit"
            onClick={ () => this.onButtonClick() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(fetchCurrencies()),
  expensesDispatch: (expenses) => dispatch(expensesAction(expenses)),
});

WalletForm.propTypes = {
  currenciesDispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.arrayOf.isRequired,
  expensesDispatch: PropTypes.func.isRequired,
  expensesState: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
