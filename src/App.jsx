import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Perfil } />
    </Switch>
  );
}

export default App;
