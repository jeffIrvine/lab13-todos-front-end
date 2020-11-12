import React, { Component } from 'react'
import request from 'superagent';
export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        this.setState({loading: true})
        const user = await request
        .post('https://secret-chamber-28719.herokuapp.com/auth/signin')
        .send(this.state)

        this.setState({loading: false})

        // localStorage.setItem('TOKEN', user.body.token);
        // localStorage.setItem('USERNAME', user.body.email);
        this.props.changeTokenAndUsername(user.body.email, user.body.token)
        this.props.history.push('/api/todos')
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Log in page</h2>
                    <label>
                        Username: 
                        <input 
                        value={this.state.email} 
                        onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </label>
                    <label>
                        Password: 
                        <input
                        onChange={(e) => this.setState({password: e.target.value})} 
                        value={this.state.password} 
                        type='password'
                        />
                    </label>
                    {
                        this.state.loading
                        ? 'Wait a damn minute!'
                        : <button>
                            Login!
                        </button>
                    }
                </form>
            </div>
        )
    }
}
