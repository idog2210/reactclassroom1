import React from 'react';
import ReactDOM from 'react-dom';

import { RecipesProvider } from './store/RecipesContext';
import './index.css';
import App from './App';

ReactDOM.render(
  <RecipesProvider>
    <App />
  </RecipesProvider>,
  document.getElementById('root')
);
