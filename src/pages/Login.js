import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (event) => event.preventDefault();

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  emailDisable = () => {
    const { email } = this.state;

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
  }

  passwordDisable = () => {
    const { password } = this.state;
    const PASSWORD_VALIDATION = 6;

    if (password.length < PASSWORD_VALIDATION) {
      return true;
    }
  }

  disabled = () => {
    if (this.emailDisable() || this.passwordDisable()) {
      return true;
    }
    return false;
  }

  linkToWallet = () => {
    const { history } = this.props;

    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const { emailDispatch } = this.props;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
          <button
            type="submit"
            disabled={ this.disabled() }
            onClick={ () => {
              this.linkToWallet();
              emailDispatch(email);
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
  push: PropTypes.func.isRequired,
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
