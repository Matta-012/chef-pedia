import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Profile, Meals, Drinks, Explore } from './pages';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/comidas" component={ Drinks } />
      <Route path="/comidas" component={ Explore } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
