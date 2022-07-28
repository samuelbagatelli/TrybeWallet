import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailState } = this.props;
    const INITIAL_EXPANSE = 0;
    return (
      <header>
        <p
          data-testid="email-field"
        >
          Email:
          { ` ${emailState}` }
        </p>
        <p
          data-testid="total-field"
        >
          Despesas: R$
          { ` ${INITIAL_EXPANSE}` }
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
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
