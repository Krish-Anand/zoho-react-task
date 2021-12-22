import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// importing the home page here
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layout/HeaderComponent';
import GroupRouter from '../src/router/routerGroup';

class App extends React.Component {
  render () {
    return (
      <Router>
      <div className="">
        <Header />
        <GroupRouter />
      </div>
      </Router>
    );
  }
}

export default App;