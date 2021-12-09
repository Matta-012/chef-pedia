import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Meals from './pages/Meals';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/comidas" component={ Meals } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
