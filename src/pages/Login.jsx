import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
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
          <img src={ profileIcon } alt="Profile Icon" />
        </div>
        <form className="login-inputs">
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            placeholder="Type your email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            placeholder="Type your password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </form>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ setLogin() }
          onClick={ handleClick }
        >
          Enter
        </button>
      </section>
    </div>
  );
}

export default Login;
