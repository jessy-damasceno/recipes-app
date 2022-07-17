import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getEmail } from '../services/localStorage';

const Profile = () => {
  const email = getEmail;
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{email}</h2>
      <section className="profile-buttons-container">
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logout }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
