import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DetailRecipe from './pages/DetailRecipe';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreLocal from './pages/ExploreLocal';
import ExploreMealsDrinks from './pages/ExploreMealsDrinks';
import FavoritesRecipes from './pages/FavoritesRecipes';
import Login from './pages/Login';
import MainRecipe from './pages/MainRecipe';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeMade from './pages/RecipeMade';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/comidas" component={ Drinks } />
      <Route path="/comidas" component={ Explore } />
      <Route path="/comidas" component={ MainRecipe } />
      <Route path="/comidas" component={ DetailRecipe } />
      <Route path="/comidas" component={ ExploreIngredients } />
      <Route path="/comidas" component={ ExploreLocal } />
      <Route path="/comidas" component={ ExploreMealsDrinks } />
      <Route path="/comidas" component={ FavoritesRecipes } />
      <Route path="/comidas" component={ RecipeInProgress } />
      <Route path="/comidas" component={ RecipeMade } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
