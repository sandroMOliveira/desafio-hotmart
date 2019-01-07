import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { API_HOST, mes } from '../consts';

class Create extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    delegacia_select: [],
    delegacia: '',
    mes_select: '',
    ano: '',
    rubrica: '',
    conduta: '',
    latitude: 0.0,
    longitude: 0.0,
    cidade:'',
    logradouro: '',
    numero_logradouro: 0,
    boletim: undefined,
  }

  componentDidMount() {
    this.verifyParams()
    this.fetchDelegacias()
  }

  verifyParams() {
    const { state } = this.props.location;
    if (state) {
      const { boletim } = state;
      this.setState({
        delegacia: {value: boletim.id_delegacia.id_delegacia, label: boletim.id_delegacia.delegacia},
        mes_select: mes.find(item => item.value === boletim.mes),
        ano: boletim.ano,
        rubrica: boletim.rubrica,
        conduta: boletim.conduta,
        latitude: boletim.latitude,
        longitude: boletim.longitude,
        cidade: boletim.cidade,
        logradouro: boletim.logradouro,
        numero_logradouro: boletim.numero_logradouro,
        boletim,
      });
    }
  }

  fetchDelegacias() {
    axios.get(`${API_HOST}/avaliacao/delegacia`)
    .then(response => {
      const delegacia = response.data.map(data => ({ value: data.id_delegacia, label: data.delegacia }))
      this.setState({ delegacia_select: delegacia })
    }).catch(error => {
    });
  }

  handleDelegacia = (option) => {
    if (option) {
      this.setState({ delegacia: option})
    }
  }

  handleMes = (option) => {
    if (option) {
      this.setState({ mes_select: option})
    }
  }

  handleAno = (e) => {
    this.setState({
      ano: e.target.value
    });
  }

  handleRubrica = (e) => {
    this.setState({
      rubrica: e.target.value
    })  
  }

  handleConduta = (e) => {
    this.setState({
      conduta: e.target.value
    })
  }

  handleLatitude = (e) => {
    this.setState({
      latitude: e.target.value
    })
  }

  handleLongitude = (e) => {
    this.setState({
      longitude: e.target.value
    })
  }

  handleCidade = (e) => {
    this.setState({
      cidade: e.target.value
    })
  }

  handleLogradouro = (e) => {
    this.setState({
      logradouro: e.target.value
    })
  }

  handleNLogradouro = (e) => {
    this.setState({
      numero_logradouro: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const { boletim } = this.state;
    const { history } = this.props;
    const data = {
      id_delegacia: this.state.delegacia.value,
      mes: this.state.mes_select.value,
      ano: this.state.ano,
      rubrica: this.state.rubrica,
      conduta: this.state.conduta,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      cidade: this.state.cidade,
      logradouro: this.state.logradouro,
      numero_logradouro: this.state.numero_logradouro,
    };

    let url = `${API_HOST}/avaliacao/boletim`;
    if (boletim) {
      axios.patch(url + `/${boletim.id}/`, data)
      .then(response => {
        toast.success('Boletim atualizado com sucesso!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        history.push('/list');
      }).catch(error => {
        toast.error('Não foi possível salvar o Boletim!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
    } else {
      axios.post(url, data)
      .then(response => {
        toast.success('Boletim cadastrado com sucesso!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        history.push('/list');
      }).catch(error => {
        toast.error('Não foi possível salvar o Boletim!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
    };
  }
 
  render() {
    const { delegacia_select, delegacia, mes_select, boletim } = this.state;
    return (
        <div style={{ marginTop: 10 }}>
          <h3 align="center">
          {
            boletim ? 'Atualizar Boletim' : 'Adicione um novo Boletim'
          }
          </h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Delegacia:  </label>
              <Select
                value={delegacia} 
                options={delegacia_select}
                onChange={this.handleDelegacia}
                placeholder='Selecione ou pesquise o nome da delegacia...'
                isClearable
                isSearchable
              />
            </div>
            <div className="form-group col-mr-3">
                <label>Mês </label>
                <Select
                value={mes_select}
                options={mes}
                onChange={this.handleMes}
                placeholder='Selecione ou pesquise o mês...'
                isClearable
                isSearchable
                />
            </div>
            <div className="form-group">
              <label>Ano: </label>
              <input 
                type="number" 
                min="2010"
                max="2019"
                placeholder='Selecione uma data entre 2000 a 2019'
                className="form-control"
                value={this.state.ano}
                onChange={this.handleAno}
                />
            </div>
            <div className="form-group">
              <label>Rubrica: </label>
              <input 
                type="text" 
                className="form-control"
                maxLength="100"
                value={this.state.rubrica}
                onChange={this.handleRubrica}
                />
            </div>
            <div className="form-group">
              <label>Conduta: </label>
              <input 
                type="text" 
                className="form-control"
                maxLength="50"
                value={this.state.conduta}
                onChange={this.handleConduta}
                />
            </div>
            <div className="form-group">
              <label>Latitude: </label>
              <input 
                type="text" 
                className="form-control"
                value={this.state.latitude}
                onChange={this.handleLatitude}
                />
            </div>
            <div className="form-group">
              <label>Longitude: </label>
              <input 
                type="text" 
                className="form-control"
                value={this.state.longitude}
                onChange={this.handleLongitude}
                />
            </div>
            <div className="form-group">
              <label>Cidade: </label>
              <input 
                type="text" 
                className="form-control"
                value={this.state.cidade}
                onChange={this.handleCidade}
                />
            </div>
            <div className="form-group">
              <label>Logradouro: </label>
              <input 
                type="text" 
                className="form-control"
                value={this.state.logradouro}
                onChange={this.handleLogradouro}
                />
            </div>
            <div className="form-group">
              <label>Numero: </label>
              <input 
                type="number"
                min="1" 
                className="form-control"
                value={this.state.numero_logradouro}
                onChange={this.handleNLogradouro}
                />
            </div>
            <div className="form-group">
                <input type="submit" 
                  value="Registrar Boletim" 
                  className="btn btn-primary"/>
            </div>
          </form>
        </div>
    )
  }
}

export default withRouter(Create)
