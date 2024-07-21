import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import wallpaperReducer from './gallery';
import favoritesReducer from './favorites';

const rootReducer = combineReducers({
  user: userReducer,
  wallpapers: wallpaperReducer,
  favorites: favoritesReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
