import React from 'react';
import PropTypes from 'prop-types';

import "./style.css"

class TodoList extends React.Component {

    render() {
        let className = "todo-item";
        let img = "./check.svg"
        let { item, onClick } = this.props;
        if (item.isComplete) {
            className += " isComplete";
            img = "./check2.svg"
        }
        return (
            <li className={className}>
                <div>
                    <img src={img} onClick={onClick} width="32" alt=""></img>
                </div>
                <div className="item">
                    {item.title}
                </div>
            </li>
        )
    }
};

TodoList.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        isComplete  : PropTypes.bool.isRequired
    }),
    onClick : PropTypes.func.isRequired
}

export default TodoList