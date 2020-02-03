import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from './Navbar';
import MainRoutes from './Routes';

const store = configureStore();

const App = () => (
    <Provider store={store}>
      <Router>
        <div className='navigation'>
          <Navbar />
          <MainRoutes />  
        </div>
      </Router>
    </Provider>
)

export default App;
