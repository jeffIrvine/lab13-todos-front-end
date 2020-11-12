import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        todo: '',
        isCompleted: false,
        loading: false
    }    

    componentDidMount = async () => {
        const response = await request.get('https://secret-chamber-28719.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)
        this.setState({todos: response.body})
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request.
        get('https://secret-chamber-28719.herokuapp.com/api/todos')
        .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit =async (e) => {
        const { todo, isCompleted } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            todo: todo,
            is_completed: isCompleted
        };

        await this.setState({loading: true});

        await request.post('https://secret-chamber-28719.herokuapp.com/api/todos')
        .send(newTodo)
        .set('Authorization', token);

        await this.fetchTodos();
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
