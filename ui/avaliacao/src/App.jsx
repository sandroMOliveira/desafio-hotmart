import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap3/dist/css/bootstrap.min.css"
import './App.css';
import "react-table/react-table.css";
import NavBar from './components/NavBar';
import Main from './components/Main';
import * as pages from './pages/index';
import './assets/css/index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ToastContainer autoClose={10000} />
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={ Main } />
              <Route path='/list' component={pages.ListSearch} />
              <Route path='/create' component={pages.Create} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
