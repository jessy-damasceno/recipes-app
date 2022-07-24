import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import profileIcon from '../images/profileIcon.svg';
import logo from '../images/logo.png';
import '../styles/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setLogin = () => {
    const regExp = /\w+@[a-z]+\.com/g;
    return !(email.match(regExp) && password.length > +'6');
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div className="main-container">
      <section className="login">
        <div className="avatar">
          <img src={ logo } alt="Profile Icon" className="app-logo" />
        </div>
        <form className="login-form">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              data-testid="email-input"
              placeholder="type your e-mail"
              autoComplete="off"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
            <input
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
              placeholder="type your password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </div>
          <button
            type="button"
            data-testid="login-submit-btn"
            className="login-button"
            disabled={ setLogin() }
            onClick={ handleClick }
          >
            LOGIN
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
