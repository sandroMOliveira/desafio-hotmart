import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Main extends Component {

  render() {
    return (
      <div className="text-center">
        <h3>Bem vindo ao sistema de cadastro de boletins</h3>
        <h4>Selecione uma das opções acima</h4>
      </div>
    );
  }
}

export default withRouter(Main);
