import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
