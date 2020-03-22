import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from './Navbar';
import Routes from './Routes';

const store = configureStore();

const App = () => (
    <Provider store={store}>
      <Router>
        <div className='navigation'>
          <Navbar />
          <Routes />  
        </div>
      </Router>
    </Provider>
)

export default App;
