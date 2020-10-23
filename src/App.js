import React from 'react';
import './App.css';
import classNames from 'classnames';
import TodoList from './components/todoList/index';

class App extends React.Component {
  constructor() {
    super();
    this.img = "./check.svg";
    this.state = {
      menu: [
        { title: "HOME", active: true, href: "https://www.facebook.com/chuongcnbhaf180208/" },
        { title: "DEALS", active: false, href: "https://www.facebook.com/" },
        { title: "UPLOAD", active: false, href: "https://www.facebook.com/chuongcnbhaf180208/" },
        { title: "WORK", active: false, href: "https://www.facebook.com/chuongcnbhaf180208/" },
        { title: "SETTING", active: false, href: "https://www.facebook.com/chuongcnbhaf180208/" }
      ],
      todos: [
        { title: 'Go to market', isComplete: false },
        { title: 'Buy food', isComplete: true },
        { title: 'Make dinner', isComplete: false }
      ],
      addNewJob: "",
      currentFilter: "all"
    }
    this.completeAll = this.completeAll.bind(this);

    this.changeToAll = this.changeToAll.bind(this);
    this.changeToActive = this.changeToActive.bind(this);
    this.changeToCompleted = this.changeToCompleted.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.onChange = this.onChange.bind(this);

    this.inputAddElement = React.createRef();
  };

  componentDidMount() {
    this.inputAddElement.current.focus();
  }

  onclicked = (item) => {
    return (event) => {
      const { isComplete } = item;
      const { todos } = this.state;
      const index = todos.indexOf(item);

      this.setState({
        todos: [
          ...todos.slice(0, index),
          { ...item, isComplete: !isComplete },
          ...todos.slice(index + 1)
        ]
      })
    }
  }

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return
      }

      this.setState({
        todos: [
          { title: text, isComplete: false },
          ...this.state.todos
        ],
        addNewJob : "",
      });
    }
  }

  completeAll() {
    const { todos } = this.state;
    let status = false;
    todos.forEach((todo) => {
      if (!todo.isComplete) {
        status = true;
      }
    });
    if (status) {
      this.img = "./check2.svg";
      todos.forEach((todo) => {
        todo.isComplete = true;
        this.setState({ todos: todos })
      })
    } else {
      this.img = "./check.svg";
      todos.forEach((todo) => {
        todo.isComplete = false;
        this.setState({ todos: todos })
      })
    }
  }

  changeToAll() {
    this.setState({ currentFilter: "all" });
  }
  changeToActive() {
    this.setState({ currentFilter: "active" });
  }
  changeToCompleted() {
    this.setState({ currentFilter: "completed" });
  }
  clearCompleted() {
    const work = this.state.todos;
    const todos = [];
    work.forEach(todo => {
      if (!todo.isComplete) {
        todos.push(todo);
      }
    })
    this.setState({ todos: todos })
  }
  onChange(event) {
    this.setState({ addNewJob: event.target.value });
  }

  render() {
    let todos;
    let work;
    if (this.state.currentFilter === "all") {
      todos = this.state.todos;
    }
    else if (this.state.currentFilter === "active") {
      work = this.state.todos;
      todos = [];
      work.forEach(todo => {
        if (!todo.isComplete) {
          todos.push(todo)
        }
      })
    }
    else if (this.state.currentFilter === "completed") {
      work = this.state.todos;
      todos = [];
      work.forEach(todo => {
        if (todo.isComplete) {
          todos.push(todo)
        }
      })
    }
    return (
      <div className="App">
        <div className="header">todos</div>
        <div className="todolist">
          <ul>
            <li className="todo-item header-list">
              <div>
                <img src={this.img} onClick={this.completeAll} width="32" alt=""></img>
              </div>
              <input
                type="text"
                placeholder="Enter your word"
                onKeyUp={this.onKeyUp}
                ref={this.inputAddElement}
                value={this.state.addNewJob}
                onChange={this.onChange} />
            </li>
            {todos.map((item, index) => <TodoList key={index} item={item} onClick={this.onclicked(item)} />)}
            <li className="todo-item footer-list">
              <div className="count-item">
                {todos.length} item
              </div>
              <div className="group-middle">
                <div className={classNames('middle-item', "all", { "current": this.state.currentFilter === "all" })} onClick={this.changeToAll}>
                  All
                </div>
                <div className={classNames('middle-item', "active", { "current": this.state.currentFilter === "active" })} onClick={this.changeToActive}>
                  Active
                </div>
                <div className={classNames('middle-item', "completed", { "current": this.state.currentFilter === "completed" })} onClick={this.changeToCompleted}>
                  Completed
                </div>
              </div>
              <div className="group-right" onClick={this.clearCompleted}>
                Clear Completed
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
