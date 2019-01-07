import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to={'/'}>Home</Link>
          <Link className="navbar-brand" to={'/create'}>Cadastrar</Link>
          <Link className="navbar-brand" to={'/list'}>Buscar Boletim</Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
