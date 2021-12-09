import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Meals from './pages/Meals';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
      <Route path="/profile" component={ Perfil } />
      <Route path="/comidas" component={ Meals } />
    </Switch>
  );
}

export default App;
