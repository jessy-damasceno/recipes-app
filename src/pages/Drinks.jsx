import React from 'react';
import DrinkCategories from '../components/DrinkCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../styles/Foods.css';

function Drinks() {
  return (
    <div className="foods-page-container">
      <Header title="Drinks" search />
      <DrinkCategories />
      <Recipes cocktails />
      <Footer />
    </div>
  );
}

export default Drinks;
