import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
    }    

    componentDidMount = async () => {
        const response = await request.get('https://secret-chamber-28719.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)
        this.setState({todos: response.body})
    }
    render() {
        return (
            <div>
                Welcome to the plants page.
                {
                    Boolean(this.state.todos.length) && this.state.todos.map(todo => <div> 
                        todo: {todo.todo}; 
                        completed: {todo.is_completed}
                    </div>)
                }
            </div>
        )
    }
}
