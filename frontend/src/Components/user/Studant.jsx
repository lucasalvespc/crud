import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    icon: 'fa fa-address-card-o',
    title: 'Estudantes',
    subtitle: 'Cadastro de estudantes: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/studants'
const initialState = {
    user: {
        matricula: "",
        name: "",
        tel: "",
        tel_resp: "",
        name_resp: "",
        email: "",
        turma: "",
        turno: ""
    },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Matricula</label>
                            <input type="text" className="form-control"
                                name="matricula"
                                value={this.state.user.matricula}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a matricula..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" className="form-control"
                                name="tel"
                                value={this.state.user.tel}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Telefone..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Responsavel</label>
                            <input type="text" className="form-control"
                                name="name_resp"
                                value={this.state.user.name_resp}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do responsavel..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone do Responsavel</label>
                            <input type="text" className="form-control"
                                name="tel_resp"
                                value={this.state.user.tel_resp}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o telefone do responsavel..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Turma</label>
                            <input type="text" className="form-control"
                                name="turma"
                                value={this.state.user.turma}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a turma..." />
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Turno</label>
                            <select className="form-control"
                                name="turno"
                                value={this.state.user.turno}
                                onChange={e => this.updateField(e)}
                                >
                                    <option >Informe o turno...</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                </select>
                        </div>
                    </div>
                    
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            
                            Salvar<br/> 
                            <i className="fa fa-save"></i>
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar<br/>
                            <i className="fa fa-remove"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Telefone do <br/>Responsavel</th>
                        <th>Turma</th>
                        <th>Turno</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.matricula}</td>
                    <td>{user.name}</td>
                    <td>{user.tel_resp}</td>
                    <td>{user.turma}</td>
                    <td>{user.turno}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}