import React from 'react';
import Login from './components/login'
import Home from './components/home'

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Route path={'/login'} component={Login}/>
      <Route path={'/home'} component={Home}/>
    </Router>
  );
}

export default App;
