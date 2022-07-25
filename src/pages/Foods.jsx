import React from 'react';
import FoodCategories from '../components/FoodCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../styles/Foods.css';

function Foods() {
  return (
    <div className="foods-page-container">
      <Header title="Foods" search />
      <FoodCategories />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
