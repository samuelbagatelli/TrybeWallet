import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expensesState } = this.props;
    let expensesValue = 0;
    expensesState.forEach(({ value, currency, exchangeRates }) => {
      const rate = exchangeRates[currency].ask;
      const mult = value * rate;
      const round = Math.round(mult * 100) / 100;
      expensesValue += round;
    });
    const final = expensesValue.toFixed(2);
    return final;
  }

  render() {
    const { emailState } = this.props;

    return (
      <header>
        <p
          data-testid="email-field"
        >
          Email:
          { ` ${emailState}` }
        </p>
        <p>
          Despesas: R$
          <span
            data-testid="total-field"
          >
            { this.sumExpenses() }
          </span>
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  expensesState: state.wallet.expenses,
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
  expensesState: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
