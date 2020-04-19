import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Navbar from './Navbar';
import Routes from './Routes';
import { setCurrentUser, setToken } from '../store/actions/auth';

const store = configureStore();

if(localStorage.jwtToken){
  setToken(localStorage.jwtToken);

  try {
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
      store.dispatch(setCurrentUser({}));
  }
}

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
