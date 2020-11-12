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
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request.get('https://secret-chamber-28719.herokuapp.com/api/todos')
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
        await this.setState({todo: ''});
    }

    handleCompleteClick = async (someId) => {
        const { token } = this.props;

        await request.put(`https://secret-chamber-28719.herokuapp.com/api/todos/${someId}`)
        .set('Authorization', token);

        await this.fetchTodos();
    }

    render() {
        const {
            todo,
            // isCompleted,
            loading,
            todos,
        } = this.state;

        return (
            <div>
                Welcome to the todos page.
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a todo:
                        <input
                            value={todo}
                            onChange={(e) => this.setState({todo: e.target.value })}
                            />
                    </label>
                    {/* <label>
                        Is this completed?:
                        <input
                            value={isCompleted}
                            onChange={(e) => this.setState({isCompleted: e.target.value })}
                            />
                    </label> */}
                    <button>
                        Add a todo
                    </button>
                </form>
                {
                    loading
                            ? 'Wait a damn minute!'
                            : todos.map(todo => <div key={`${todo.todo}${todo.id}${Math.random()}`} style={{ 
                                textDecoration: todo.is_completed ? 'line-through' : 'none' }
                            }> 
                            Todo:{todo.todo}
                            {
                                todo.is_completed ? '' : <button
                                onClick={() => this.handleCompleteClick(todo.id)}>
                                Complete Task    
                                </button>
                            }
                            </div>)

                }
            </div>
        )
    }
}


// Boolean(this.state.todos.length) && this.state.todos.map(todo => <div> 
//     todo: {todo.todo}; 
//     completed: {todo.is_completed}