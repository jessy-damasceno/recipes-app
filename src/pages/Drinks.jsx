import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../styles/Foods.css';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" search />
      <Recipes cocktails />
      <Footer />
    </div>
  );
}

export default Drinks;
