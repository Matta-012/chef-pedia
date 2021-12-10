import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Login from './pages/Login';
import MainRecipe from './pages/MainRecipe';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/receitas-principais" component={ MainRecipe } />
      <Route path="/profile" component={ Profile } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
