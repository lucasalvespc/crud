import axios from 'axios'
import React, { Component } from 'react'
import Main from '../templates/Main'


const headerProps = {
    icon: "fa fa-user-circle-o",
    title: "Login",
    subtitle: "Faça seu login para utilizar o nosso sistema"
}

export default class Login extends Component {
    
    state = { ...initialState }
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    getLogin(event) {
        const user = { ...this.state.user }
        var i = false
        var name
        user[event.target.name] = event.target.value
        axios.get(baseUrl).then(users =>{
            this.setState({lista: users.data})
        })
        this.state.list.forEach(users => {
            if (user.matri === users.matri && user.pass === users.pass) {
                i= true
                name = users.name;
            }
        })
        if( i){
            alert('Bem Vindo '+ name +' !')
        }
        else {
            alert("Matricula ou senha incorreta!")
        }
       


    }



    clear() {
        this.setState({ user: initialState.user })
    }
    updateField(event) {

        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    renderForm() {
        return (

            <div className="form">
                <div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Matricula</label>
                            <input
                                type="text"
                                name='matri'
                                value={this.state.user.matri}
                                placeholder="Digite sua matricula"
                                className="form-control"
                                onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>
                    <p />

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                name='pass'
                                value={this.state.user.pass}
                                placeholder="Digite sua Senha"
                                className="form-control"
                                onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.getLogin(e)}>
                            Entrar<br />
                            <i className="fa fa-save"></i>
                        </button>


                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar<br />
                            <i className="fa fa-remove"></i>
                        </button>
                    </div>
                </div>
            </div>



        )
    }
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}