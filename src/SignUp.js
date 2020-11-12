import React, { Component } from 'react'
import request from 'superagent';
export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        this.setState({loading: true})
        const user = await request
        .post('https://secret-chamber-28719.herokuapp.com/auth/signup')
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
              <h2>Sign up page</h2>
                <form onSubmit={this.handleSubmit}>
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
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}
