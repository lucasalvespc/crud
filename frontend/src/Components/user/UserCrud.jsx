import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    icon: 'users',
    title: 'Servidor',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const initialState = {
    user: { matri:'',name: '', email: '', pass: ''  },
    list: []
}

    async()=>{
        const db = require('..api/db');
        const list=  db.selectCustomers();
}


/*matricula_S
nome_S
email_S
senha_S 
*/

export default class UserCrud extends Component {
    
    state = { ...initialState }


    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const db = require('..api/db');
        const user = this.state.user
        const result = db.insertCustomer({matricula_S: user.matri, nome_S: user.name, email_S: user.email, senha_S: user.pass });
        console.log("usuario "+user.name+" cadastrado"); 
        
        
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
                                name="matri"
                                value={this.state.user.matri}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a Matricula..." />
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
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                name="pass"
                                value={this.state.user.pass}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite sua senha..." />
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
       /* axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })*/
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>E-mail</th>
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
                <tr key={user.id_S}>
                    <td>{user.matri}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
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