import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { API_HOST, mes } from '../consts';

class ListSearch extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      boletins: [],
      delegacia_select: [],
      page: 1,
      total_pages: 1,
      visible: false,
      delegacia: undefined,
      mes: undefined,
      ano: undefined,
      cidade: undefined,
      logradouro: undefined,
      filters: {},
      isOpen: false,
      loading: false,
    };
  }

  componentDidMount(){
    this.fetchDelegacias()
  }

  fetchBoletim() {
    const { page, filters } = this.state;
    this.setState({ loading: true });
    axios.get(`${API_HOST}/avaliacao/boletim?page=${page}`, 
    { params: filters })
    .then(response => {
      const { data } = response;
      this.setState({ 
        boletins: data.results,
        total_pages: data.total_pages,
        loading: false,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDelegacias() {
    axios.get(`${API_HOST}/avaliacao/delegacia`)
    .then(response => {
      const delegacia = response.data.map(data => (
        { value: data.id_delegacia, label: data.delegacia }
      ));
      this.setState({ delegacia_select: delegacia })
    }).catch(error => {
    });
  }

  handleDelegacia = (option) => {
    if (option) {
      this.setState({ delegacia: option.value})
    }
  }

  handleMes = (option) => {
    if (option) {
      this.setState({ mes: option.value})
    }
  }

  handleAno = (e) => {
    this.setState({
      ano: e.target.value
    });
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

  geTable() {
    const { boletins, total_pages, page, loading } = this.state;
    const colums = [
      {
        Header: 'Delegacia',
        accessor: 'id_delegacia.nome_delegacia_circ',
      },
      {
        Header: 'Mês',
        accessor: 'mes',
        width: 50,
      },
      {
        Header: 'Conduta',
        accessor: 'conduta',
      },
      {
        Header: 'Rubrica',
        accessor: 'rubrica',
        width: 300,
      },
      {
        Header: 'Visualizar',
        Cell: row  => (
        <button className="btn-primary" 
        onClick={(e) => this.renderInfo(e, row.original)}>
          <i class="fas fa-eye" />
        </button>
        )
      },
      {
        Header: 'Editar',
        Cell: row  => (
        <button className="btn-primary" 
        onClick={(e) => this.editData(e, row)}>
          <i class="fas fa-edit" />
        </button>
        )
      }
    ]

    return(
      <Fragment>
          <div>
            <div className="table table-striped" style={{ marginTop: 20 }}>
              <ReactTable
                pageSize={10}
                data={boletins}
                columns={colums}
                pages={total_pages}
                page={page - 1}
                manual
                onPageChange={
                  page =>  this.setState({ page: page + 1 }, this.fetchBoletim)
                }
                previousText='Anterior'
                nextText='Próximo'
                loadingText='Carregando...'
                loading={loading}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-danger" onClick={() => this.setState({ visible: false })}>
                Retornar a busca!
              </button>
          </div>
        </div>
      </Fragment>
    )
  }

  renderInfo(e, boletim) {
    e.preventDefault()
    this.setState({ boletim, isOpen: true });
  }

  editData(e, row) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/create', {
        boletim: row.original,
    });
  }

  renderInputs() {

    const { delegacia_select } = this.state;

    return (
      <Fragment>
        <div className="form-group">
          <label>Delegacia:</label>
          <Select 
            options={delegacia_select}
            onChange={this.handleDelegacia}
            placeholder='Selecione ou pesquise o nome da delegacia...'
            isClearable
            isSearchable
          />
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <label>Mês:</label>
            <Select
              className="Select-input"
              options={mes}
              onChange={this.handleMes}
              placeholder='Selecione ou pesquise o mês...'
              isClearable
              isSearchable
            />
          </div>
          <div className="col-sm-4">
            <label>Ano:</label>
            <input
              style={{maxHeight: '38px'}}
              type="number" 
              min="2010"
              max="2019"
              className="form-control"
              value={this.state.ano}
              onChange={this.handleAno}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Cidade:</label>
          <input 
            type="text" 
            className="form-control"
            value={this.state.cidade}
            onChange={this.handleCidade}
          />
        </div>
        <div className="form-group">
          <label>Logradouro:</label>
          <input 
            type="text" 
            className="form-control"
            value={this.state.logradouro}
            onChange={this.handleLogradouro}
          />
      </div>
      </Fragment>
    )
  }

  onSubmit = (e) => {
    e.preventDefault();
    const filters = {
      id_delegacia: this.state.delegacia,
      mes: this.state.mes,
      ano: this.state.ano,
      cidade: this.state.cidade,
      logradouro: this.state.logradouro,
    };
    this.setState({ filters, visible: true, loading: true }, this.fetchBoletim);
  }

  renderModal() {
    const { isOpen, boletim } = this.state;
    return (
      <Modal classNames={{className: 'modal-wrapper'}} open={isOpen} onClose={this.onCloseModal} center>
        <h2>Informações detalhadas do boletim</h2>
        {
          boletim !== undefined && (
            <div>
              <div>
                <label>Cidade:</label>
                <span>{boletim.cidade}</span>
                <label className="pl-2">Logradouro:</label>
                <span>{boletim.logradouro}</span>
              </div>
              <div>
                <label>Número do logradouro:</label>
                <span>{boletim.numero_logradouro}</span>
                <label className="pl-2">Ano:</label>
                <span>{boletim.ano}</span>
                <label className="pl-2">Mês:</label>
                <span>{boletim.mes}</span>
              </div>
              <div>
                <label>Conduta:</label>
                <span>{boletim.conduta}</span>
              </div>
              <div>
                <label>Delegacia:</label>
                <span>{boletim.id_delegacia.delegacia}</span>
              </div>
              <div>
                <label>Conduta:</label>
                <span>{boletim.conduta}</span>
              <div>
                <label>Latitude:</label>
                <span>{boletim.latitude}</span>
                <label className="pl-2">Longitude:</label>
                <span>{boletim.longitude}</span>
              </div>
              </div>
              <div>
                <label>Rúbrica:</label>
                <span>{boletim.rubrica}</span>
              </div>
            </div>
        )}
      </Modal>
    )
  }
  
  onCloseModal = () => {
    this.setState({ isOpen: false });
  };


  render() {
    const { visible, isOpen } = this.state;
    return (
      <div>
        <h3 align="center">Lista de Boletins</h3>
        <form onSubmit={this.onSubmit}>
        <div>
          {visible 
          ? this.geTable()
          : this.renderInputs()
          }
          <div className={!visible ? "form-group" : "hide" }>
            <button type="submit" className="btn btn-primary">
              Buscar boletim...
            </button>
          </div>
        </div>
        </form>
        { isOpen && this.renderModal()}
      </div>
    );
  }
}

export default withRouter(ListSearch)
