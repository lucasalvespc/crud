import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    icon: 'fa fa-address-book-o',
    title: 'Diario dos Estudantes',
    subtitle: 'Cadastro de presença dos discentes'
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

   
    load(user) {
        this.setState({ user })
    }

   
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Turma</th>
                        <th>Aulas</th>
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
                    <td>{user.turma}</td>
                    <td><table>
                        <tbody><td>P</td></tbody>
                    </table></td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
               
                {this.renderTable()}
            </Main>
        )
    }
}