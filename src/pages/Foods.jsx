import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../styles/Foods.css';

function Foods() {
  return (
    <div>
      <Header title="Foods" search />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
