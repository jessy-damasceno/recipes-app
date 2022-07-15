import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, Foods, Profile, Drinks, DoneRecipes, FavoriteRecipes } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/foods/:id" component={ Foods } />
      <Route exact path="/foods/:id/in-progress" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ Drinks } />
      <Route exact path="/drinks/:id/in-progress" component={ Drinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
